import { Link } from "react-router-dom";
import Layout from "../../components/Layout";

export default function HomeAdmin() {
    const classname = "px-5 py-10 text-2xl rounded-md shadow-md bg-orange-500 text-white";
    return(
        <Layout>
            <h2 className="py-5 text-center text-2xl font-serif font-medium">Seja bem-vindo(a) ao <span>Sistema de Frequência</span></h2>

            <div className="pt-2 px-10 flex gap-10">

                <Link to="/new-register" className={classname}>Novo Aluno</Link>
                <Link to="/new-register" className={classname}>Relatorio</Link>
                <Link to="/new-register" className={classname}>Novo Aluno</Link>

            </div>
        </Layout>
    )
}