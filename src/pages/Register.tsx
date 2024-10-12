import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import Layout from '../components/Layout';

export default function Form() {
  const webcamRef = useRef<Webcam>(null);

  const [cpf, setCpf] = useState('');
  const [turma, setTurma] = useState('');

  const allTurmas = [
    {id: 1, title: "Selecione uma Turma"},
    {id: 2, title: "Administração"},
    {id: 3, title: "Enfermagem"},
    {id: 4, title: "Eletrotécnica"},
    {id: 5, title: "Logística"}
  ]

  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [capturedCpf, setCapturedCpf] = useState<string | null>(null);
  const [capturedTurma, setCapturedTurma] = useState<string | null>(null);
  const [isCameraAccessible, setIsCameraAccessible] = useState(true);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);

      // Salva os valores do CPF e da Turma
      setCapturedCpf(cpf);
      setCapturedTurma(turma);

      // Dados do formulário
      const formData = {
        cpf,
        turma,
        foto: imageSrc,
      };

      // Limpa os campos após o clique
      setCpf("");
      setTurma("");

      // Após 1 minuto a imagem sumirá
      setTimeout(() => {
        setCapturedImage(null);
        setCapturedCpf(null);
        setCapturedTurma(null);
      }, 60000);

      alert("Frequência Realizada!");
      console.log('Dados do Formulário:', formData);
    } else {
      alert("Erro ao realizar frequência!");
      console.error('A câmera não está acessível');
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
            className="bg-orange-600 border-2 border-orange-500 h-72 w-72 rounded-full object-cover"
            videoConstraints={{
              facingMode: 'user',
            }}
          />
          <p className="px-5 pt-2 text-center">
            <span className="font-bold text-orange-500 text-md">Sorria!</span> Seu close de hoje vai direto para o álbum de presença!
          </p>
        </div>
      ) : (
        <p className="text-red-500">
          Permissão de acesso à câmera negada.
        </p>
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
          className="md:w-2/4 w-full m-auto p-2.5 text-2xl font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 transition-colors duration-200 disabled:bg-gray-400"
        >
          Registrar
        </button>
      </form>

      {capturedImage && (
        <div className="absolute left-0 right-0 bottom-0 m-auto top-0 flex flex-col justify-center items-center mt-4">
          <div className="space-y-10 bg-orange-500 h-[70vh] w-[60vw] flex flex-col justify-center items-center">
            <button className="text-4xl font-extrabold text-white flex justify-end">X</button>
            <h2 className="text-xl font-serif font-medium mb-2 text-orange-500">Registro Capturado:</h2>
            <img src={capturedImage} alt="Captura do Aluno" className="border h-60 w-60 object-cover border-gray-300 rounded-full" />
            {capturedCpf && <p className="text-white">CPF: {capturedCpf}</p>}
          </div>
        </div>
      )}
    </Layout>
  );
}
