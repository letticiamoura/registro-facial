import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import Layout from '../components/Layout';

export default function Form() {
  const webcamRef = useRef<Webcam>(null);

  const [cpf, setCpf] = useState('');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [capturedCpf, setCapturedCpf] = useState<string | null>(null);
  const [capturedTime, setCapturedTime] = useState<string | null>(null);
  const [isCameraAccessible, setIsCameraAccessible] = useState(true);

  // Novo estado para armazenar a imagem Base64 retornada pela API
  const [returnedBase64Image, setReturnedBase64Image] = useState<string | null>(null);

  // Estado para controlar a visibilidade do modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Estado para armazenar o status do reconhecimento
  const [isRecognized, setIsRecognized] = useState<boolean | null>(null);

  const url = 'http://localhost:8080/attendances';

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
        // Remover o cabeçalho da string Base64
        const base64Image = imageSrc.replace(/^data:image\/(png|jpeg);base64,/, "");

        setCapturedImage(imageSrc);
        setCapturedCpf(cpf);
        setCapturedTime(new Date().toLocaleString());

        const formData = {
          cpf,
          photoBase64: base64Image, // Enviar apenas a parte Base64, sem o cabeçalho
        };

        try {
          const response = await axios.post(url, formData, {
            headers: {
              'Content-Type': 'application/json',
            },
          });

          // Armazene o estado do reconhecimento
          const identified = response.data.data?.identified ?? false;
          setIsRecognized(identified);
          console.log(response.data.data);

          // Se o reconhecimento foi feito, armazene a imagem de referência
          if (identified && response.data.data?.referenceImgBase64) {
            setReturnedBase64Image(response.data.data.referenceImgBase64);
          }

          // Exibir o modal com a foto ou a mensagem de erro
          setIsModalVisible(true);

          // Fechar o modal automaticamente após 15 segundos
          setTimeout(() => {
            setIsModalVisible(false);
          }, 6000); // 15 segundos

        } catch (error) {
          console.error('Erro ao enviar os dados:', error);
          alert('Erro ao realizar frequência.');
        }

        // Limpar campos e estados após o envio
        setCpf('');
      } else {
        alert('Erro ao capturar a imagem!');
      }
    } else {
      alert('Erro ao realizar frequência! A câmera não está acessível.');
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
            <span className="font-bold text-blue text-md">Sorria!</span> Seu close de hoje vai direto para o álbum de presença!
          </p>
        </div>
      ) : (
        <p className="text-red-500">Permissão de acesso à câmera negada.</p>
      )}

      <form onSubmit={handleSubmit} className="pb-3 px-5 flex flex-col justify-center m-auto space-y-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="cpf" className="w-full md:w-2/4 m-auto text-sm font-medium text-gray-700">
            Digite seu CPF:
          </label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="XXX.XXX.XXX-XX"
            required
            className="md:w-2/4 w-full m-auto p-3 md:p-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          disabled={!isCameraAccessible}
          className="md:w-2/4 w-full m-auto p-2.5 text-2xl font-medium rounded-md text-white bg-blue hover:bg-light-blue transition-colors duration-200 disabled:bg-gray-400"
        >
          Registrar
        </button>
      </form>

      {isModalVisible && (
        <div className="absolute left-0 right-0 bottom-0 m-auto top-0 rounded-md flex flex-col justify-center items-center mt-4">
          <div className="space-y-10 bg-blue h-[90vh] w-[80vw] sm:w-[60vw] md:w-[50vw] flex flex-col justify-center items-center p-6 rounded-lg shadow-lg">
            <div className="mb-4 flex flex-row-reverse gap-4 justify-center items-center">
              <button
                onClick={() => setIsModalVisible(false)}
                className="text-4xl font-extrabold text-white flex justify-end z-40"
              >
                X
              </button>
              <h2 className="text-xl font-serif font-medium text-white">
                {isRecognized ? 'Registro Capturado' : 'Presença Não Registrada!'}
              </h2>
            </div>

            {isRecognized ? (
              <img
                src={`data:image/png;base64,${returnedBase64Image || capturedImage}`}
                alt="Captura do Aluno"
                className="border h-60 w-60 object-cover border-gray-300 rounded-full"
              />
            ) : (
              <p className="text-white">Presença Não Registrada!</p>
            )}

            {isRecognized && capturedCpf && (
              <p className="text-white">CPF: {capturedCpf}</p>
            )}

            {isRecognized && capturedTime && (
              <p className="text-white">Horário da Captura: {capturedTime}</p>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}
