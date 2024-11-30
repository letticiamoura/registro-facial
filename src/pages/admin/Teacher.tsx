import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaAngleLeft } from "react-icons/fa";
import { MdOutlineAdd } from "react-icons/md";
import StudentRegister from './PersonRegister';
import logo from "../../assets/logo.png";
import Card from '../../components/Card';

interface Teacher {
  id: number;
  name: string;
  lastname: string;
  cpf: string;
  birthDate: string;
  email: string;
  photo: string;
  isTeacher: boolean; // Certifique-se de que essa propriedade exista no seu modelo
}

export default function Students() {
  const navigate = useNavigate();
  const [data, setData] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

  const url = "http://localhost:8080/persons";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(url);
        // Filtrando os dados para incluir apenas professores (isTeacher === true)
        const filteredTeachers = res.data.filter((person: Teacher) => person.isTeacher === true);
        setData(filteredTeachers);
      } catch (error) {
        setError('Erro ao buscar dados da API');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Você tem certeza que deseja excluir este professor?")) {
      try {
        await axios.delete(`http://localhost:8080/persons/${id}`);
        setData((prevData) => prevData.filter((teacher) => teacher.id !== id));
      } catch {
        setError('Erro ao excluir professor');
      }
    }
  };

  const formatDate = (date: string): string => {
    try {
      return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
    } catch {
      return "Data inválida";
    }
  };

  const handleOpen = () => setOpen(!open);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">

      <div className="bg-slate-950 w-full rounded-bl-[20px] rounded-br-[20px] flex justify-center items-center">
        
        <img src={logo} alt="Logo Adda" className="h-16" />
        <h1 className="py-8 text-3xl font-serif font-extrabold text-center text-white">Lista de Professores</h1>

      </div>

      <div className="mb-4 py-3 flex justify-between px-20">
          <button
            onClick={() => navigate(-1)}
            className="text-blue rounded-md hover:bg-blue hover:text-white hover:transition-colors">
            <FaAngleLeft size={50} />
          </button>
          <button onClick={handleOpen}
            className="bg-blue text-white font-extrabold px-2 py-2 rounded-full hover:bg-ligth-blue hover:scale-105 hover:transition-colors hover:delay-300">
            <MdOutlineAdd size={30} className="hover:scale-110 hover:transition-transform hover:delay-300" />
          </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-blue shadow-md">
          <thead className="bg-blue">
            <tr>
              <th className="px-4 py-2 text-white">Foto</th>
              <th className="px-4 py-2 text-white">Nome</th>
              <th className="px-4 py-2 text-white">CPF</th>
              <th className="px-4 py-2 text-white">Email</th>
              <th className="px-4 py-2 text-white">Aniversário</th>
              <th className="px-4 py-2 text-white">Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.map((teacher) => (
              <tr key={teacher.id} className="bg-white hover:bg-blue/5 text-center">
                <td className="border px-2 py-1">
                  <img
                    src={`data:image/jpeg;base64,${teacher.photo}`}
                    alt={`${teacher.name} ${teacher.lastname}`}
                    className="w-16 h-16 object-cover rounded-full mx-auto"
                  />
                </td>
                <td className="border px-2 py-1">{teacher.name} {teacher.lastname}</td>
                <td className="border px-2 py-1">{teacher.cpf}</td>
                <td className="border px-2 py-1">{teacher.email}</td>
                <td className="border px-2 py-1">{formatDate(teacher.birthDate)}</td>
                <td className="border px-2 py-1">
                  <div className="flex justify-center items-center">
                    <button
                      onClick={() => navigate(`/edit/${teacher.id}`)}
                      className="text-white px-2 py-1 rounded-md hover:scale-110 mr-2"
                      aria-label={`Editar ${teacher.name}`}
                    >
                      <FaEdit size={20} color="green" />
                    </button>
                    <button
                      onClick={() => handleDelete(teacher.id)}
                      className="text-white px-2 py-1 rounded-md hover:scale-110"
                      aria-label={`Excluir ${teacher.name}`}
                    >
                      <FaTrash size={20} color="red" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div key={Teacher.id} className="py-5 container px-10 m-auto">
            <Card
              Ccpf={Teacher.cpf}
              Cname={Teacher.name} 
              Clastname={Teacher.lastname} 
              Cimage={`data:image/jpeg;base64,${Teacher.photo}`} 
              Ccurso={Teacher.groups.map(group => group.name)} 
              CbirthDate={formattedDate}  // Passando a data formatada
              Cedit={() => navigate(`/edit/${Teacher.id}`)}
              Cremove={() => handleDelete(Teacher.id)}
            />
          </div>

      </div>

      {open && <StudentRegister name="Professor" />}
    </div>
  );
}
