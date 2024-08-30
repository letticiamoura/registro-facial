import { useState } from 'react';

interface IFormProps {
  onSubmit: (cpf: string, turma: string) => void;
}

export default function Form({ onSubmit }: IFormProps) {

  const [cpf, setCpf] = useState('');
  const [turma, setTurma] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(cpf, turma);

    //Limpa os campos após o click
    setCpf('');
    setTurma('');
  };

  return (
    
    <form onSubmit={handleSubmit} className="pb-3 px-5 flex flex-col justify-center m-auto space-y-6">

      <div className="flex flex-col gap-2">
        <label htmlFor="cpf" className="text-sm font-medium text-gray-700">
          Digite seu CPF:
        </label>
        <input
          type="text"
          id="cpf"
          name="cpf"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          placeholder="XXX.XXX.XXX-XX"
          required
          className="p-3 border border-gray-300 rounded-md"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="turmas" className="block text-sm font-medium text-gray-700">
          Informe sua Turma:
        </label>
        <select
          name="turmas"
          id="turmas"
          value={turma}
          onChange={(e) => setTurma(e.target.value)}
          required
          className="p-3 border border-gray-300 rounded-md"
        >
          <option value="adm">Administração</option>
          <option value="enf">Enfermagem</option>
          <option value="elt">Eletrotécnica</option>
          <option value="log">Logística</option>
        </select>
      </div>

      <button
        type="submit"
        className="p-2.5 text-2xl font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 transition-colors duration-200"
      >
        Registrar
      </button>

    </form>
  );
}
