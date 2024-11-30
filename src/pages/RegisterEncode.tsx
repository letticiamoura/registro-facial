import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import Layout from '../components/Layout';

export default function Form() {
  const webcamRef = useRef<Webcam>(null);

  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCameraAccessible, setIsCameraAccessible] = useState(true);
  const [faceEncoding, setFaceEncoding] = useState<string | null>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(() => {
        setIsCameraAccessible(true);
      })
      .catch((err) => {
        console.error('Erro ao tentar acessar a câmera:', err.message);
        setIsCameraAccessible(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();

      if (imageSrc) {
        // Remove o cabeçalho da string Base64
        const base64Image = imageSrc.replace(/^data:image\/(png|jpeg);base64,/, '');

        setCapturedImage(imageSrc);

        try {
          // Faz a requisição para a API
          const response = await axios.post(
            'http://127.0.0.1:8000/identify',
            { image_base64: base64Image },
            { headers: { 'Content-Type': 'application/json' } }
          );

          // Verifica se a API retornou o campo esperado
          if (response.data?.encoding) {
            setFaceEncoding(response.data.encoding);
            alert('Codificação do rosto obtida com sucesso!');
          } else {
            console.error('Resposta inesperada da API:', response.data);
            alert('Erro: A API não retornou a codificação esperada.');
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error('Erro de requisição:', error.response?.data || error.message);
            alert('Erro ao identificar o rosto: ' + (error.response?.data?.message || 'Verifique os logs.'));
          } else {
            console.error('Erro desconhecido:', error);
            alert('Erro desconhecido ao identificar o rosto.');
          }
        }
      } else {
        alert('Erro ao capturar a imagem!');
      }
    } else {
      alert('Erro ao realizar identificação! A câmera não está acessível.');
    }
  };

  return (
    <Layout>
      {isCameraAccessible ? (
        <div className="flex flex-col py-5 items-center">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/png"
            className="bg-blue border-2 border-blue h-72 w-72 rounded-full object-cover"
            videoConstraints={{
              facingMode: 'user',
            }}
          />
          <p className="px-5 pt-2 text-center">
            <span className="font-bold text-blue text-md">Sorria!</span> Seu close de hoje vai direto para o reconhecimento facial!
          </p>
        </div>
      ) : (
        <p className="text-red-500">Permissão de acesso à câmera negada.</p>
      )}

      <form onSubmit={handleSubmit} className="pb-3 px-5 flex flex-col justify-center m-auto space-y-6">
        <button
          type="submit"
          disabled={!isCameraAccessible}
          className="md:w-2/4 w-full m-auto p-2.5 text-2xl font-medium rounded-md text-white bg-blue hover:bg-light-blue transition-colors duration-200 disabled:bg-gray-400"
        >
          Identificar Rosto
        </button>
      </form>

      {faceEncoding && (
        <div className="mt-5 text-center">
          <h2 className="text-lg font-bold text-blue">Codificação do Rosto:</h2>
          <pre className="text-sm text-gray-700 bg-gray-200 p-4 rounded-md">
            {faceEncoding}
          </pre>
        </div>
      )}
    </Layout>
  );
}
