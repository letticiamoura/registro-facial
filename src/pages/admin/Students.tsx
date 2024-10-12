import { Link } from "react-router-dom";

import { FaChevronLeft } from "react-icons/fa";
import { IoAddCircleSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

import axios from "axios";

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

  const [ data, setData ] = useState<Student[]>([]);
  
  const [ dataCourse, setDataCourse ] = useState<Course[]>([]);
  
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState('');
  const [ open, setOpen ] = useState(false);

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

  const label = "w-full md:w-[50vw] md:m-auto space-y-2 text-zinc-700 text-md font-medium";
  const classname = "w-full p-2 rounded-md border border-gray-700 focus:border-none focus:ring-2 focus:ring-orange-500 outline-none md:w-[50vw]";

  return (
      <main className="w-full bg-orange-500 h-screen">
        <header className="w-auto space-x-10 flex items-center justify-center md:justify-around py-10">
            <Link to="/home"> <FaChevronLeft size={50} color="white" className="hover:scale-110 transition-all" /> </Link>
            <h1 className="text-4xl font-serif font-bold text-white uppercase">Alunos</h1>
            <button onClick={handleOpen}> <IoAddCircleSharp size={65} color="white" className="hover:scale-110 transition-all" /> </button>
        </header>
        <div className="w-full overflow-x-auto">
            <table className="min-w-full table-auto text-center bg-white rounded-lg shadow-lg">
                <thead>
                <tr className="bg-orange-300 text-white border-b border-orange-400">
                    <th className="px-4 py-2">Nome</th>
                    <th className="px-4 py-2">CPF</th>
                    <th className="px-4 py-2">Matrícula</th>
                    <th className="px-4 py-2">Curso</th>
                    <th className="px-4 py-2">Ação</th>
                </tr>
                </thead>
                <tbody>
                {data.map((student) => (
                    <tr key={student.id} className="border-b border-orange-100 bg-orange-50 hover:bg-orange-100 text-gray-700">
                    <td className="px-4 py-2">{student.nome}</td>
                    <td className="px-4 py-2">{student.cpf}</td>
                    <td className="px-4 py-2">{student.matricula}</td>
                    <td className="px-4 py-2">{student.cursoId}</td>
                    <td className="px-4 py-2">
                        <div className="flex justify-center space-x-3">
                        <button> <FaEdit size={20} color="green" /> </button>
                        <button> <FaTrash size={20} color="red" /> </button>
                        </div>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

        {  
            open &&   
                <div className="absolute left-0 right-0 bottom-0 m-auto top-0 flex flex-col justify-center items-center mt-4 transition-all">
                    <div className="space-y-2 h-3/4 w-3/4 bg-zinc-100 rounded-md p-5 shadow-md">
                        <div className="py-2 flex items-center justify-between">
                            <h1 className="text-center font-bold text-4xl font-serif text-orange-500">Cadastro</h1>
                            <h1 onClick={handleOpen} className="text-4xl font-medium font-serif text-orange-500 hover:scale-105 transition-all">X</h1>
                        </div>
                        <form className="flex flex-col space-y-5">
                            <label className={label}>Nome <br />
                                <input
                                    type="text"
                                    placeholder="Digite o nome do aluno..."
                                    className={classname}
                                    required
                                />
                            </label>
                            <label className={label}>CPF <br />
                                <input
                                    type="text"
                                    placeholder="Ex: XXX.XXX.XXX-XX"
                                    className={classname}
                                    required
                                />
                            </label>
                            <label className={label}>Matrícula <br />
                                <input
                                    type="text"
                                    placeholder="Ex: 202301"
                                    className={classname}
                                    required
                                />
                            </label>
                            <label className={label}> Curso <br />
                                <select name="courses" id="course" className={classname} required>
                                    {dataCourse.map((course) => (
                                        <option key={course.id} value={course.id}>
                                        {course.nome}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <button
                                type="submit"
                                className="md:w-2/4 w-full m-auto p-2.5 text-2xl font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 transition-colors duration-200 disabled:bg-gray-400"
                                >
                                Cadastrar
                            </button>
                        </form>
                    </div>
                </div>
        }

      </main>
  );
}
