import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaAngleLeft } from "react-icons/fa";
import { MdOutlineAdd } from "react-icons/md";

interface Student {
  id: number;
  nome: string;
  cpf: string;
  nascimento: string;
  matricula: string;
  cursoId: string;
}

interface Course {
  id: number;
  nome: string;
}

export default function Students() {
  const navigate = useNavigate();

  const [data, setData] = useState<Student[]>([]);
  const [dataCourse, setDataCourse] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

  const url = "https://letticiamoura.github.io/registro-facial-apiFake/api.json";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(url);
        setData(res.data.students);
        setDataCourse(res.data.courses);
        setLoading(false);
      } catch (error) {
        setError('Erro ao buscar dados da API');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  const handleOpen = () => setOpen(!open);

  const labelStyle = "block text-sm font-medium text-orange-500";
  const inputStyle = "w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-orange-500";

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-serif font-extrabold text-center mb-8 text-orange-500">Lista de Estudantes</h1>
      
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
              <th className="px-4 py-2 text-white">Nome</th>
              <th className="px-4 py-2 text-white">CPF</th>
              <th className="px-4 py-2 text-white">Matrícula</th>
              <th className="px-4 py-2 text-white">Curso</th>
              <th className="px-4 py-2 text-white">Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.map((student) => (
              <tr key={student.id} className="bg-white hover:bg-orange-100 text-center">
                <td className="border px-2 p-1">{student.nome}</td>
                <td className="border px-2 p-1">{student.cpf}</td>
                <td className="border px-2 p-1">{student.matricula}</td>
                <td className="border px-2 p-1">{student.cursoId}</td>
                <td className="border px-2 p-1">
                  <div className="flex justify-center items-center">
                    <button className="text-white px-2 p-1 rounded-md hover:scale-110 mr-2">
                      <FaEdit size={20} color="green" />
                    </button>
                    <button className="text-white px-2 p-1 rounded-md hover:scale-110">
                      <FaTrash size={20} color="red" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Form - Conditionally Rendered */}
      {open && (
        <form className="mt-8 bg-zinc-100 p-6 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-orange-500">Cadastrar novo aluno</h2>
          <div className="mb-4">
            <label className={labelStyle}>Nome</label>
            <input
              type="text"
              name="name"
              className={inputStyle}
              placeholder="Digite o nome"
              required
            />
          </div>
          <div className="mb-4">
            <label className={labelStyle}>CPF</label>
            <input
              type="text"
              name="cpf"
              className={inputStyle}
              placeholder="Digite o CPF"
              required
            />
          </div>
          <div className="mb-4">
            <label className={labelStyle}>Matrícula</label>
            <input
              type="text"
              name="matricula"
              className={inputStyle}
              placeholder="Digite a matrícula"
              required
            />
          </div>
          <div className="mb-4">
            <label className={labelStyle}>Curso</label>
            <input
              type="text"
              name="curso"
              className={inputStyle}
              placeholder="Digite o curso"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 w-full">
            Cadastrar
          </button>
        </form>
      )}
    </div>
  );
}
