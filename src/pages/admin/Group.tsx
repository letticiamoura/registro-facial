import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaAngleLeft } from "react-icons/fa";
import { MdOutlineAdd } from "react-icons/md";
import GroupRegister from './GroupRegister'; // Assegure-se de que o caminho está correto

interface Group {
  id: number;
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

export default function Group() {
  const navigate = useNavigate();

  const [data, setData] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentGroup, setCurrentGroup] = useState<Partial<Group>>({}); // Estado para armazenar o grupo atual

  const url = "http://localhost:8080/groups";

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
    if (window.confirm("Você tem certeza que deseja excluir este grupo?")) {
      try {
        await axios.delete(`http://localhost:8080/groups/${id}`);
        setData(prevData => prevData.filter(group => group.id !== id));
      } catch (error) {
        setError('Erro ao excluir grupo');
      }
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  const handleOpen = () => setOpen(!open);

  const handleEdit = (group: Group) => {
    setCurrentGroup(group);
    setEditMode(true);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setCurrentGroup({});
  };

  const tHeader = [
    { id: 1, name: "Nome" },
    { id: 2, name: "Descrição" },
    { id: 3, name: "Data Inicial" },
    { id: 4, name: "Data Final" },
    { id: 5, name: "Horário Inicial" },
    { id: 6, name: "Horário Final" },
    { id: 7, name: "Ações" }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-serif font-extrabold text-center mb-8 text-orange-500">Lista de Grupos</h1>

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
              {tHeader.map((item) => (
                <th key={item.id} className="px-4 py-2 text-white">{item.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((group) => (
              <tr key={group.id} className="bg-white hover:bg-orange-100 text-center">
                <td className="border px-2 p-1">{group.name}</td>
                <td className="border px-2 p-1">{group.description}</td>
                <td className="border px-2 p-1">{group.initialDate}</td>
                <td className="border px-2 p-1">{group.endDate}</td>
                <td className="border px-2 p-1">{group.initialTime}</td>
                <td className="border px-2 p-1">{group.endTime}</td>
                <td className="border px-2 p-1">
                  <div className="flex justify-center items-center">
                    <button onClick={() => handleEdit(group)} className="text-white px-2 p-1 rounded-md hover:scale-110 mr-2">
                      <FaEdit size={20} color="green" />
                    </button>
                    <button
                      onClick={() => handleDelete(group.id)}
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

      {open && <GroupRegister group={currentGroup} onClose={handleClose} editMode={editMode} />} {/* Passando o grupo atual e o estado de edição para o componente GroupRegister */}
    </div>
  );
}
