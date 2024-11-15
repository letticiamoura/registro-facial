import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaAngleLeft } from "react-icons/fa";
import { MdOutlineAdd } from "react-icons/md";
import StudentRegister from './PersonRegister';

interface Student {
  id: number;
  name: string;
  lastname: string;
  cpf: string;
  isTeacher: boolean;
  birthDate: string;
  photo: string;
  email: string;
  groups: [Group];
}

interface Group {
  id: number;
  name: string;
}

export default function Students() {

  const navigate = useNavigate();

  const [data, setData] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false); 
  const [currentStudent, setCurrentStudent] = useState<Partial<Student>>({}); // Estado para armazenar o estudante atual

  const url = "http://localhost:8080/persons/students";

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
    if (window.confirm("Você tem certeza que deseja excluir este Aluno?")) {
      try {
        await axios.delete(`http://localhost:8080/persons/${id}`);
        setData(prevData => prevData.filter(teacher => teacher.id !== id));
      } catch (error) {
        setError('Erro ao excluir Aluno');
      }
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  const handleOpen = () => setOpen(!open);

  // const handleEdit = (student: Student) => {
  //   setCurrentStudent(student);
  //   setEditMode(true);
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  //   setEditMode(false); 
  //   setCurrentStudent({});
  // };

  // const handleClick = () => {
  //   console.log('dados para atualizar=', currentStudent );
  // };

  // const handleSubmit = (e: Event) => {
  //   e.preventDefault();
  //   console.log('Dados do formulário:', currentStudent);
  // };

  const tHeader = [
    {id: 1, name: "Foto"},
    {id: 2, name: "Nome"},
    {id: 3, name: "CPF"}, 
    {id: 4, name: "E-mail"},
    {id: 5, name: "E-mail"}, 
    {id: 6, name: "Ações"}
  ];

  //const labelStyle = "block text-sm font-medium text-orange-500";
  //const inputStyle = "w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-orange-500";

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-serif font-extrabold text-center mb-8 text-blue">Lista de Estudantes</h1>
      
      <div className="mb-4 py-3 flex justify-between">
        <button
          onClick={() => navigate(-1)}
          className="text-blue rounded-md hover:bg-blue hover:text-white hover:transition-colors">
          <FaAngleLeft size={50} />
        </button>
        <button onClick={handleOpen}
          className="bg-blue text-white px-2 py-2 rounded-full hover:bg-ligth-blue hover:scale-105 hover:transition-colors hover:delay-300">
          <MdOutlineAdd size={30} className="hover:scale-110 hover:transition-transform hover:delay-300" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-green shadow-md">
          <thead className="bg-blue">
            <tr>
              {
                tHeader.map((item) => (
                  <th key={item.id} className="px-4 py-2 text-white">{item.name}</th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {data.map((student) => (
              <tr key={student.id} className="bg-white hover:bg-ligth-blue/5 text-center">
                <td className="border px-2 p-1">
                  <img
                     src={`data:image/jpeg;base64,${student.photo}`}
                    alt={`${student.name} ${student.lastname}`}
                    className="w-16 h-16 object-cover rounded-full mx-auto"
                  />
                </td>
                <td className="border px-2 p-1">{student.name} {student.lastname}</td>
                <td className="border px-2 p-1">{student.cpf}</td>
                <td className="border px-2 p-1">{student.email}</td>
                <td className="border px-2 p-1"> {student.groups && student.groups.length > 0 
                                                  ? student.groups[0].name 
                                                  : 'Sem Grupo'}</td>
                <td className="border px-2 p-1">
                  <div className="flex justify-center items-center">

                    <button onClick={() =>  navigate(`/edit/${student.id}`)} className="text-white px-2 p-1 rounded-md hover:scale-110 mr-2">
  
                      <FaEdit size={20} color="green" />
                    </button>
                    
                    <button 
                      onClick={() => handleDelete(student.id)} 
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
      <StudentRegister name="Estudante" />
    }

    </div>

  );
}