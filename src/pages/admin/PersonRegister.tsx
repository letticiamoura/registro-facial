import React, { useState } from 'react';
import axios from 'axios';
interface IRegister  {
  name: string;
}
export default function StudentRegister ({name}: IRegister) {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    cpf: '',
    email: '',
    birthDate: '',
    isTeacher: false,
    photo: null as File | null,
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
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      photo: file, // Armazena o arquivo diretamente
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('lastname', formData.lastname);
    data.append('cpf', formData.cpf);
    data.append('email', formData.email);
    data.append('birthDate', formData.birthDate);
    data.append('isTeacher', String(formData.isTeacher));
    if (formData.photo) {
      data.append('photo', formData.photo); 
    }

    try {
      const res = await axios.post('http://localhost:8080/persons', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(`${name} cadastrado com sucesso:`, res.data);
      alert(`${name} cadastrado com sucesso!`)
    } catch (error) {
      setError(`Erro ao cadastrar ${name}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen p-8 fixed top-20 left-[1vw] w-full overflow-y-auto pb-20 pt-20">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8">
        <div className="flex items-center justify-center mb-6 space-x-20">
          <h2 className="text-2xl font-bold text-center text-blue">Cadastrar Novo {name}</h2>
          <h2 className="text-3xl text-blue font-extrabold">X</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-orange-500">Nome</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-orange-500">Sobrenome</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-orange-500">CPF</label>
            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-orange-500">E-mail</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-orange-500">Data de Nascimento</label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-orange-500">Foto</label>
            <input
              type="file"
              accept="/*"
              onChange={handleFileChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="isTeacher"
                checked={formData.isTeacher}
                onChange={(e) => setFormData({ ...formData, isTeacher: e.target.checked })}
                className="form-checkbox h-5 w-5 text-orange-500"
              />
              <span className="ml-2 text-sm font-medium text-orange-500">É Professor?</span>
            </label>
          </div>
          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};
