import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Group {
  id?: number;
  name: string;
  description: string;
  initialDate: string;
  endDate: string;
  initialTime: string;
  endTime: string;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
}

interface GroupRegisterProps {
  group: Partial<Group>;
  onClose: () => void;
  editMode: boolean;
}

export default function GroupRegister ({ group, onClose, editMode }: GroupRegisterProps) {
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
      setFormData((prev) => ({ ...prev, ...group } as Group));
    }
  }, [editMode, group]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editMode ? `http://localhost:8080/groups/${formData.id}` : 'http://localhost:8080/groups';
      const method = editMode ? axios.put : axios.post;
      const response = await method(url, formData);
      console.log('Grupo salvo:', response.data);
      onClose();
    } catch (error) {
      console.error('Erro ao salvar grupo:', error);
    }
  };

  const daysOfWeek = [
    { name: 'monday', label: 'Segunda-feira' },
    { name: 'tuesday', label: 'Terça-feira' },
    { name: 'wednesday', label: 'Quarta-feira' },
    { name: 'thursday', label: 'Quinta-feira' },
    { name: 'friday', label: 'Sexta-feira' },
    { name: 'saturday', label: 'Sábado' },
    { name: 'sunday', label: 'Domingo' },
  ];

  return (
    <div className="modal p-6 bg-white rounded-lg shadow-lg fixed top-[10vh] w-[80vw] left-[10vw]">
      <h2 className="text-2xl font-semibold mb-4">{editMode ? 'Editar Grupo' : 'Cadastrar Grupo'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['name', 'description'].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700">
              {field === 'name' ? 'Nome' : 'Descrição'}
            </label>
            <input
              type="text"
              name={field}
              // value={formData[field as keyof Group] || ''}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-orange-300"
            />
          </div>
        ))}

        <div className="grid grid-cols-2 gap-4">
          {[
            { name: 'initialDate', label: 'Data Inicial', type: 'date' },
            { name: 'endDate', label: 'Data Final', type: 'date' },
            { name: 'initialTime', label: 'Horário Inicial', type: 'time' },
            { name: 'endTime', label: 'Horário Final', type: 'time' },
          ].map(({ name, label, type }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700">{label}</label>
              <input
                type={type}
                name={name}
                // value={formData[name as keyof Group] || ''}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-orange-300"
              />
            </div>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Dias da Semana</label>
          <div className="flex flex-wrap mt-2">
            {daysOfWeek.map(({ name, label }) => (
              <label key={name} className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  name={name}
                  // checked={formData[name as keyof Group]}
                  onChange={handleChange}
                  className="h-4 w-4 text-orange-500 border-gray-300 rounded focus:ring focus:ring-orange-300"
                />
                <span className="ml-2 text-sm text-gray-700">{label}</span>
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
