import Layout from "../../components/Layout";

import { FaBookReader } from "react-icons/fa";
import { HiDocument } from "react-icons/hi2";
import { BsFillPeopleFill } from "react-icons/bs";
import { GiTeacher } from "react-icons/gi";
import { IoInformationCircle } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import { Link } from "react-router-dom";

export default function HomeAdmin() {
    // const classname = "w-[45vw] flex-col flex-wrap sm:w-2/3 lg:w-[15vw] p-5 text-xl rounded-md shadow-md bg-orange-500 text-white hover:bg-orange-400 transition-colors hover:scale-105 duration-200";

    const classname = "w-[45vw] flex-col flex-wrap sm:w-2/3 lg:w-[15vw] p-5 text-xl rounded-md border-orange-500 text-orange-500 shadow-orange-500 drop-shadow-lg shadow-md transition-colors hover:bg-orange-500 hover:text-white hover:shadow-black/50  hover:scale-105 duration-200";

    return(
        <Layout>
            <h2 className="py-8 uppercase text-orange-500 text-center text-2xl font-serif font-medium">Seja bem-vindo(a) ao <br /> <span className="font-extrabold">Sistema de Frequência</span></h2>

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
                    <button className={classname}>
                        <FaBookReader size={60} className="m-auto" />
                        Disciplinas
                    </button>
                </div>
                
                <div className="hidden sm:flex space-x-10 text-center justify-center items-center">
                    <button className={classname}>
                        <HiDocument size={60} className="m-auto" />
                        Relatórios
                    </button>
                    <button className={classname}>
                        <IoInformationCircle size={60} className="m-auto" />
                        Informações
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
                    <button className={classname}>
                        <GiTeacher size={60} className="m-auto" />
                        Professores
                    </button>
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
                        <IoInformationCircle size={60} className="m-auto" />
                        Informação
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