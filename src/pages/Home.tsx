import { Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function Home() {
    return(
        <Layout>
            <div className="px-5 pt-64 flex gap-10 justify-center items-center">
                <Link to="/login" className="p-3 text-2xl font-medium font-serif text-white bg-orange-500 rounded-md w-2/3 text-center">Administrador</Link>
                <Link to="/register"  className="p-3 text-2xl font-medium font-serif text-white bg-orange-500 rounded-md w-2/3 text-center">Aluno</Link>
            </div>
        </Layout>
    )
}