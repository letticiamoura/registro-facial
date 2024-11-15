import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaAngleLeft } from 'react-icons/fa';

interface Student {
  id: number;
  name: string;
  lastname: string;
  cpf: string;
  isTeacher: boolean;
  birthDate: string;
  photo: string;
  email: string;
  groups: Group[];
}

interface Group {
  id: number;
  name: string;
}

export default function StudentEdit() {

  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<Partial<Student>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/persons/${id}`);
        setFormData(res.data);
      } catch (error) {
        setError('Erro ao buscar dados do estudante');
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.patch(`http://localhost:8080/persons/${id}`, formData);
      console.log('Atualizado com sucesso:', res.data);
      navigate(-1);
    } catch (error) {
      setError('Erro ao atualizar dados');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4 md:p-8 w-full">

      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-500 rounded-lg hover:bg-blue-100 p-2 hover:bg-blue hover:text-white"
        >
          <FaAngleLeft size={40} />
        </button>
        <h2 className="text-2xl md:text-4xl font-bold text-blue-500 mx-auto font-serif">
          Informações do Estudante
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-10">

        <div className="p-4 space-y-5 rounded-md bg-white shadow-md">
          <img
            src={`data:image/jpeg;base64,${formData.photo}`}
            alt={`${formData.name} ${formData.lastname}`}
            className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-blue border-2"
          />
          <div className="flex flex-col justify-center items-center space-y-5">
            <p>
              <strong>Nome:</strong> {formData.name} {formData.lastname}
            </p>
            <p>
              <strong>CPF:</strong> {formData.cpf}
            </p>
            <p>
              <strong>E-mail:</strong> {formData.email}
            </p>
            <p>
              <strong>Grupos:</strong>{' '}
              {formData.groups && formData.groups.length > 0 ? formData.groups[0].name : 'Sem Grupo'}
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-xl md:text-3xl font-bold mb-4 text-blue-500 text-center">
            Editar Estudante
          </h2>
          <form onSubmit={handleSubmit}>
            {[
              { label: 'Nome', name: 'name', type: 'text', placeholder: formData.name || '' },
              { label: 'Sobrenome', name: 'lastname', type: 'text', placeholder: formData.lastname || '' },
              { label: 'CPF', name: 'cpf', type: 'text', placeholder: formData.cpf || '' },
              { label: 'E-mail', name: 'email', type: 'email', placeholder: formData.email || '' },
            ].map((field) => (
              <div className="mb-4" key={field.name}>
                <label className="block text-sm font-medium text-blue">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-light-blue"
                />
              </div>
            ))}
            <button
              type="submit"
              className="bg-blue text-white px-4 py-2 rounded-md hover:bg-ligth-blue w-full"
            >
              {loading ? 'Atualizando...' : 'Salvar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};