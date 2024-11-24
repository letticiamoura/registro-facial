import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

export default function ImageUploadForm() {
  const [imageBase64, setImageBase64] = useState<string>('');
  const [imageName, setImageName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [receivedImages, setReceivedImages] = useState<{ photoBase64: string, referenceImgBase64: string } | null>(null);

  // Função para converter a imagem para base64
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // Verifica se o arquivo é uma imagem
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione um arquivo de imagem.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        // Quando a leitura da imagem terminar, salvar o base64 e o nome da imagem
        setImageBase64(reader.result as string);
        setImageName(file.name);
      };
      reader.readAsDataURL(file); // Lê o arquivo como base64
    }
  };

  // Função de envio do formulário
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!imageBase64) {
      alert("Por favor, selecione uma imagem.");
      return;
    }

    // Remover o prefixo "data:image/png;base64," ou similar
    const base64String = imageBase64.split(',')[1];

    setLoading(true);
    setError('');

    try {
      // Envia o base64 para o backend com a chave "photo"
      const response = await axios.post('http://localhost:8080/attendances', {
        photoBase64: base64String,  // Alteração aqui para a chave "photo"
      });

      console.log("Resposta do servidor:", response.data);

      console.log("img1=",response.data.data.photoBase64)
      
      // Supondo que o servidor retorne as imagens base64
      const { photoBase64, referenceImgBase64 } = response.data.data;

      // Atualizando as imagens recebidas
      console.log(photoBase64);
      console.log(referenceImgBase64);
      
      setReceivedImages({ photoBase64, referenceImgBase64 });

      alert('Imagem enviada com sucesso!');
    } catch (err) {
      console.error('Erro ao enviar imagem:', err);
      setError('Ocorreu um erro ao enviar a imagem.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-blue">Envio de Imagem para Comparação</h2>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="mb-4">
          <label className="block text-gray-700">Selecione a Imagem:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-ligth-blue"
          />
        </div>

        <button
          type="submit"
          disabled={loading} // Desabilita o botão enquanto o upload está em andamento
          className={`w-full py-2 ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue hover:bg-ligth-blue'} text-white rounded transition duration-300`}
        >
          {loading ? 'Enviando...' : 'Enviar Imagem'}
        </button>
      </form>

      {/* Exibindo as imagens após o envio */}
      {receivedImages && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Imagens Recebidas do Servidor:</h3>
          <div className="flex space-x-4">
            {/* Imagem principal */}
            <div>
              <h4 className="text-lg font-medium">Imagem Principal:</h4>
              <img
                src={`data:image/jpeg;base64,${receivedImages.photoBase64}`}
                alt="Imagem principal"
                className="w-48 h-48 object-cover rounded-md"
              />
            </div>

            {/* Imagem de referência */}
            <div>
              <h4 className="text-lg font-medium">Imagem de Referência:</h4>
              <img
                src={`data:image/jpeg;base64,${receivedImages.referenceImgBase64}`}
                alt="Imagem de referência"
                className="w-48 h-48 object-cover rounded-md"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
