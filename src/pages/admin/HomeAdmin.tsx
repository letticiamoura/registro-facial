import Layout from "../../components/Layout";

import { FaBookReader } from "react-icons/fa";
import { HiDocument } from "react-icons/hi2";
import { BsFillPeopleFill } from "react-icons/bs";
import { GiTeacher } from "react-icons/gi";
import { MdOutlineLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoIosAlarm } from "react-icons/io";

export default function HomeAdmin() {
    
    const classname = "w-[45vw] flex-col flex-wrap sm:w-2/3 lg:w-[15vw] p-5 text-xl rounded-md border-orange-500 text-slate-950 shadow-blue drop-shadow-lg shadow-md transition-colors hover:bg-blue hover:text-white hover:shadow-black/20 hover:scale-105 duration-200 bg-white font-serif";

    return(
        <Layout>
            <h2 className="py-8 uppercase text-blue text-center text-2xl font-serif font-medium">Seja bem-vindo(a) ao <br /> <span className="font-extrabold">Sistema de Frequência</span></h2>

            <div className="px-10 space-y-10 flex-col">
                
                <div className="hidden sm:flex space-x-10 text-center justify-center items-center">
                    <Link to="/students" className={classname}>
                        <BsFillPeopleFill size={60} className="m-auto"/>
                        Estudantes
                    </Link>
                    <Link to="/teacher" className={classname}>
                        <GiTeacher size={60} className="m-auto" />
                        Professores
                    </Link>
                    <Link to="/group" className={classname}>
                        <FaBookReader size={60} className="m-auto" />
                        Disciplinas
                    </Link>
                </div>
                
                <div className="hidden sm:flex space-x-10 text-center justify-center items-center">
                    <Link to="/relatorio" className={classname}>
                        <HiDocument size={60} className="m-auto" />
                        Relatórios
                    </Link>
                    <button className={classname}>
                        <IoIosAlarm size={60} className="m-auto" />
                        Turmas
                    </button>
                    <Link to="/" className={classname}>
                        <MdOutlineLogout size={60} className="m-auto" />
                        Sair
                    </Link>
                </div>

                {/**CELULAR */}

                <div className="sm:hidden text-center flex space-x-10 justify-center items-center">
                    <Link to="/students" className={classname}>
                        <BsFillPeopleFill size={60} className="m-auto"/>
                        Estudantes
                    </Link>
                    <Link to="/teacher" className={classname}>
                        <GiTeacher size={60} className="m-auto" />
                        Professores
                    </Link>
                </div>

                <div className="sm:hidden flex text-center space-x-10 justify-center items-center">
                    <button className={classname}>
                        <FaBookReader size={60} className="m-auto" />
                        Disciplinas
                    </button>
                    <button className={classname}>
                        <HiDocument size={60} className="m-auto" />
                        Relatórios
                    </button>
                </div>

                <div className="sm:hidden flex text-center space-x-10 justify-center items-center">
                    <button className={classname}>
                        <IoIosAlarm size={60} className="m-auto" />
                        Turmas
                    </button>
                    <Link to="/" className={classname}>
                        <MdOutlineLogout size={60} className="m-auto" />
                        Sair
                    </Link>
                </div>
            </div>
        </Layout>
    )
}