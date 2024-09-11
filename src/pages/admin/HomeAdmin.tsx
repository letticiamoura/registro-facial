import Layout from "../../components/Layout";

import { IoMdAddCircle } from "react-icons/io";

export default function HomeAdmin() {
    const classname = "w-1/5 p-5 text-2xl rounded-md shadow-md bg-orange-500 text-white hover:bg-orange-400 transition-colors hover:scale-105 duration-200";
    return(
        <Layout>
            <h2 className="py-5 text-center text-2xl font-serif font-medium">Seja bem-vindo(a) ao <span>Sistema de Frequência</span></h2>

            <div className="pt-2 px-10 flex gap-10 justify-center">
                
                <button className={classname}>
                    <IoMdAddCircle />
                    Novo aluno
                </button>
                <button className={classname}>Relatorios</button>
                <button className={classname}>Disciplinas</button>

            </div>
        </Layout>
    )
}