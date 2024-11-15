import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Group {
  id?: number; // ID do grupo, opcional se estiver criando um novo
  name: string; // Nome do grupo
  description: string; // Descrição do grupo
  initialDate: string; // Data inicial
  endDate: string; // Data final
  initialTime: string; // Horário inicial
  endTime: string; // Horário final
  monday: boolean; // Se o grupo se reúne na segunda-feira
  tuesday: boolean; // Se o grupo se reúne na terça-feira
  wednesday: boolean; // Se o grupo se reúne na quarta-feira
  thursday: boolean; // Se o grupo se reúne na quinta-feira
  friday: boolean; // Se o grupo se reúne na sexta-feira
  saturday: boolean; // Se o grupo se reúne no sábado
  sunday: boolean; // Se o grupo se reúne no domingo
}

interface GroupRegisterProps {
  group: Partial<Group>; // Permite que o objeto seja parcialmente preenchido
  onClose: () => void; // Função chamada ao fechar o modal
  editMode: boolean; // Indica se está em modo de edição
}

const GroupRegister: React.FC<GroupRegisterProps> = ({ group, onClose, editMode }) => {
  const [formData, setFormData] = useState<Group>({
    name: '',
    description: '',
    initialDate: '',
    endDate: '',
    initialTime: '',
    endTime: '',
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

  useEffect(() => {
    if (editMode && group) {
      setFormData({ ...group } as Group);
    }
  }, [editMode, group]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Enviar dados do grupo
      const response = await axios.post('http://localhost:8080/groups', formData);
      console.log('Grupo salvo:', response.data);
      onClose(); // Fecha o modal após salvar
    } catch (error) {
      console.error('Erro ao salvar grupo:', error);
    }
  };

  return (
    <div className="modal p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">{editMode ? 'Editar Grupo' : 'Cadastrar Grupo'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-orange-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Descrição</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-orange-300"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Data Inicial</label>
            <input
              type="date"
              name="initialDate"
              value={formData.initialDate}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-orange-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Data Final</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-orange-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Horário Inicial</label>
            <input
              type="time"
              name="initialTime"
              value={formData.initialTime}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-orange-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Horário Final</label>
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-orange-300"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Dias da Semana</label>
          <div className="flex flex-wrap">
            {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
              <label key={day} className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  name={day}
                  checked={formData[day as keyof Group]}
                  onChange={handleChange}
                  className="h-4 w-4 text-orange-500 border-gray-300 rounded focus:ring focus:ring-orange-300"
                />
                <span className="ml-2 text-sm text-gray-700 capitalize">{day}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md transition-colors"
          >
            Fechar
          </button>
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md transition-colors"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
};

export default GroupRegister;
