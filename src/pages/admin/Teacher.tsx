import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaAngleLeft } from "react-icons/fa";
import { MdOutlineAdd } from "react-icons/md";
import StudentRegister from './PersonRegister';

interface Teacher {
  id: number;
  name: string;
  lastname: string;
  cpf: string;
  birthDate: string;
  email: string;
}

export default function Students() {

  const navigate = useNavigate();

  const [data, setData] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

  // const url = "https://letticiamoura.github.io/registro-facial-apiFake/api.json";
  const url = "http://localhost:8080/persons/teachers"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(url);
        setData(res.data);
        setLoading(false);
      } catch (error) {
        setError('Erro ao buscar dados da API');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Você tem certeza que deseja excluir este professor?")) {
      try {
        await axios.delete(`http://localhost:8080/persons/${id}`);
        setData(prevData => prevData.filter(teacher => teacher.id !== id));
      } catch (error) {
        setError('Erro ao excluir professor');
      }
    }
  };
  

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  const handleOpen = () => setOpen(!open);

  const labelStyle = "block text-sm font-medium text-orange-500";
  const inputStyle = "w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-orange-500";

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-serif font-extrabold text-center mb-8 text-orange-500">Lista de Professores</h1>
      
      <div className="mb-4 py-3 flex justify-between">
        <button
          onClick={() => navigate(-1)}
          className="text-orange-500 rounded-md hover:bg-orange-600 hover:text-white hover:transition-colors">
          <FaAngleLeft size={50} />
        </button>
        <button onClick={handleOpen}
          className="bg-orange-500 text-white px-2 py-2 rounded-full hover:bg-orange-600 hover:scale-105 hover:transition-colors hover:delay-300">
          <MdOutlineAdd size={30} className="hover:scale-110 hover:transition-transform hover:delay-300" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-orange-500 shadow-md">
          <thead className="bg-orange-500">
            <tr>
              <th className="px-4 py-2 text-white">Id</th>
              <th className="px-4 py-2 text-white">Nome</th>
              <th className="px-4 py-2 text-white">CPF</th>
              <th className="px-4 py-2 text-white">Email</th>
              <th className="px-4 py-2 text-white">Aniversário</th>
              <th className="px-4 py-2 text-white">Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.map((teacher) => (
              <tr key={teacher.id} className="bg-white hover:bg-orange-100 text-center">
                <td className="border px-2 p-1">{teacher.id}</td>
                <td className="border px-2 p-1">{teacher.name} {teacher.lastname}</td>
                <td className="border px-2 p-1">{teacher.cpf}</td>
                <td className="border px-2 p-1">{teacher.email}</td>
                <td className="border px-2 p-1">{teacher.birthDate}</td>
                <td className="border px-2 p-1">
                  <div className="flex justify-center items-center">
                    <button onClick={() =>  navigate(`/edit/${teacher.id}`)} className="text-white px-2 p-1 rounded-md hover:scale-110 mr-2">
                      <FaEdit size={20} color='green' />
                    </button>
                    <button 
                      onClick={() => handleDelete(teacher.id)} 
                      className="text-white px-2 p-1 rounded-md hover:scale-110">
                      <FaTrash size={20} color="red" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {
        open &&
          <StudentRegister name="Professor"/>
      }
    </div>
  );
}
