import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaAngleLeft } from "react-icons/fa";
import { MdOutlineAdd } from "react-icons/md";
import PersonRegister from './PersonRegister';
import Card from '../../components/Card';
import logo from "../../assets/logo.png";
import LoadingPage from '../../components/LoadingPage';

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

  const url = "http://localhost:8080/persons";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(url, {
          headers: {
            'ngrok-skip-browser-warning': 'true',
          },
        });
  
        const studentsWithoutTeachers = res.data.filter((person: Student) => !person.isTeacher);
  
        setData(studentsWithoutTeachers);
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

  if (loading) return <LoadingPage />;
  if (error) return <p>{error}</p>;

  const handleOpen = () => setOpen(!open);

  return (
    <div className="bg-slate-300/30">

      <div className="bg-slate-950 w-full rounded-bl-[20px] rounded-br-[20px] flex justify-center items-center">
        
        <img src={logo} alt="Logo Adda" className="h-16" />
        <h1 className="py-8 text-3xl font-serif font-extrabold text-center text-white">Lista de Estudantes</h1>

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

      {data.map((student) => {

        //Formatando a data de nascimento
        const formattedDate = new Intl.DateTimeFormat('pt-BR').format(new Date(student.birthDate));

        return (
          <div key={student.id} className="py-5 container px-10 m-auto">
            <Card
              Ccpf={student.cpf}
              Cname={student.name} 
              Clastname={student.lastname} 
              Cimage={`data:image/jpeg;base64,${student.photo}`} 
              Ccurso={student.groups.map(group => group.name)} 
              CbirthDate={formattedDate}  // Passando a data formatada
              Cedit={() => navigate(`/edit/${student.id}`)}
              Cremove={() => handleDelete(student.id)}
            />
          </div>
        );
      })}

      {open && <PersonRegister name="Estudante" />}
    </div>
  );
}
