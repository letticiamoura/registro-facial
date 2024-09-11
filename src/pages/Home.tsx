import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export default function Home() {
    const navigate = useNavigate();
    
    const handleLogin = () => navigate('/login');
    const handleRegister = () => navigate('/register');

    const classname="w-3/4 md:w-1/6 p-3 text-2xl font-medium font-serif text-white bg-orange-500 rounded-md text-center hover:bg-orange-400 transition-colors hover:scale-105 duration-200";
    return(
        <Layout>
            <div className="px-5 pt-64 flex gap-10 justify-center items-center">
                <button onClick={handleLogin} className={classname}>Admin</button>
                <button onClick={handleRegister} className={classname}>Aluno</button>
            </div>
        </Layout>
    )
}