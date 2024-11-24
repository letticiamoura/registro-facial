import { FaEdit, FaTrash } from "react-icons/fa";

interface ICardProps {
  Cname: string;
  Clastname: string;
  Ccpf: string;
  Cimage: string;
  Ccurso: string[];
  CbirthDate: string;
  Cedit: () => void;
  Cremove: () => void;
}

export default function Card({ Cname, CbirthDate, Ccpf, Cimage, Ccurso, Clastname, Cedit, Cremove }: ICardProps) {
    
  return (
    <div className="px-5 bg-blue h-auto sm:w-full flex flex-col lg:flex-row justify-around items-center rounded-md shadow-lg shadow-black/20 py-5">
      <img src={Cimage} alt={Cname} className="bg-white h-24 w-24 rounded-full" />
      <div className="flex flex-col gap-5 justify-center items-start text-lg md:text-xl text-zinc-200/80">
        <div className="flex gap-20 md:gap-20">
            <h2>Nome: <strong className="text-zinc-200">{Cname} {Clastname}</strong></h2>
            <h2>Curso: <strong className="text-zinc-200">{Ccurso.join(", ")}</strong></h2>
        </div>
        <div className="flex gap-5 md:gap-20">
        <h2>CPF: <strong className="text-zinc-200">{Ccpf}</strong></h2>
        <h2>Data de aniversário: <strong className="text-zinc-200">{CbirthDate}</strong></h2>
        </div>
      </div>
      <div className="py-2 flex gap-3 justify-center items-center md:flex-col md:gap-5">
        <button onClick={Cedit}><FaEdit size={30} color="green" /></button>
        <button onClick={Cremove}><FaTrash size={30} color="red" /></button>
      </div>
    </div>
  );
}
