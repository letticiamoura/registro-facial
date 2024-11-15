import { FaAngleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Relatorio() {

    const handleGerarRelatorio = () => {}
 
    const navigate = useNavigate();

  return (
    <div className="px-10">
      
      <button
          onClick={() => navigate(-1)}
          className="text-orange-500 rounded-md hover:bg-orange-600 hover:text-white hover:transition-colors">
          <FaAngleLeft size={50} />
        </button>
      <div className="mb-4 py-3 flex justify-around">
        <h2 className="text-4xl font-serif font-medium text-orange-500">Relatórios</h2>
      </div>

      <div className="flex flex-col space-y-10">
        <div className="py-5 bg-orange-300 w-full px-10">
            <h2 className="text-2xl font-medium pb-5 text-white">Lista de Alunos ativos</h2>
            <button onClick={handleGerarRelatorio} className="hover:scale-105 bg-orange-400 py-2 px-2 rounded-md text-white">Gerar relatório</button>
        </div>

        <div className="py-5 bg-orange-300 w-full px-10">
            <h2 className="text-2xl font-medium pb-5 text-white">Lista de Professores ativos</h2>
            <button onClick={handleGerarRelatorio} className="hover:scale-105 bg-orange-400 py-2 px-2 rounded-md text-white">Gerar relatório</button>
        </div>
      </div>

    </div>
  );
}
