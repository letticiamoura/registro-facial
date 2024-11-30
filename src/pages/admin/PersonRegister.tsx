import React, { useState } from 'react';
import axios from 'axios';

interface IRegister {
  name: string;
}

export default function StudentRegister({ name }: IRegister) {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    cpf: '',
    email: '',
    birthDate: '',
    isTeacher: false,
    photo: '', // Armazenará a string Base64
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({
          ...prev,
          photo: reader.result as string, // Base64 da imagem
        }));
      };
      reader.readAsDataURL(file); // Converte o arquivo para Base64
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      name: formData.name,
      lastname: formData.lastname,
      cpf: formData.cpf,
      email: formData.email,
      birthDate: formData.birthDate,
      isTeacher: formData.isTeacher,
      photoBase64: formData.photo, // Base64 da imagem
    };

    try {
      const res = await axios.post('http://localhost:8080/persons', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(`${name} cadastrado com sucesso:`, res.data);
      alert(`${name} cadastrado com sucesso!`);
    } catch (error) {
      setError(`Erro ao cadastrar ${name}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen p-8 fixed top-20 left-[1vw] w-full overflow-y-auto pb-20 pt-20">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-blue-500 text-center">
            Cadastrar Novo {name}
          </h2>
          <h2 className="text-3xl font-extrabold text-blue-500">X</h2>
        </div>
        <form onSubmit={handleSubmit}>
          {[
            { label: 'Nome', name: 'name', type: 'text', required: true },
            { label: 'Sobrenome', name: 'lastname', type: 'text' },
            { label: 'CPF', name: 'cpf', type: 'text', required: true },
            { label: 'E-mail', name: 'email', type: 'email', required: true },
            { label: 'Data de Nascimento', name: 'birthDate', type: 'date', required: true },
          ].map(({ label, name, type, required }, index) => (
            <div key={index} className="mb-4">
              <label className="block text-sm font-medium text-blue-500">{label}</label>
              <input
                type={type}
                name={name}
                //value={formData[name as keyof typeof formData]}
                onChange={handleChange}
                required={required}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
          <div className="mb-4">
            <label className="block text-sm font-medium text-blue-500">Foto</label>
            <input
              type="file"
              accept="/*"
              onChange={handleFileChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {name !== 'Estudante' && (
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="isTeacher"
                  checked={formData.isTeacher}
                  onChange={(e) =>
                    setFormData({ ...formData, isTeacher: e.target.checked })
                  }
                  className="form-checkbox h-5 w-5 text-blue-500"
                />
                <span className="ml-2 text-sm font-medium text-blue-500">
                  {formData.isTeacher ? 'É Professor?' : 'Não é Professor'}
                </span>
              </label>
            </div>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full bg-blue">
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}
