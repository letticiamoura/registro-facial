import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { RiAdminFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";

export default function Home() {
    const navigate = useNavigate();
    
    const handleLogin = () => navigate('/login');
    const handleRegister = () => navigate('/register');

    const classname="h-40 w-3/4 md:w-1/6 p-3 text-2xl font-medium font-serif text-white bg-orange-500 rounded-md text-center hover:bg-orange-400 transition-colors hover:scale-105 duration-200";
    return(
        <Layout>
            <div className="px-5 pt-52 flex gap-5 justify-center items-center">
                <button onClick={handleLogin} className={classname}> <RiAdminFill size={60} className="m-auto" /> Admin</button>
                <button onClick={handleRegister} className={classname}> <FaUser size={60} className="m-auto" /> Aluno</button>
            </div>
        </Layout>
    )
}