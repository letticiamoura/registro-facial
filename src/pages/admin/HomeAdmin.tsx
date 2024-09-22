import Layout from "../../components/Layout";

import { IoMdAddCircle } from "react-icons/io";
import { FaBookReader } from "react-icons/fa";
import { HiDocument } from "react-icons/hi2";
import { BsFillPeopleFill } from "react-icons/bs";
import { GiTeacher } from "react-icons/gi";
import { IoInformationCircle } from "react-icons/io5";

export default function HomeAdmin() {
    const classname = "w-[45vw] flex-wrap sm:w-2/3 lg:w-[15vw] p-5 text-xl rounded-md shadow-md bg-orange-500 text-white hover:bg-orange-400 transition-colors hover:scale-105 duration-200";
    return(
        <Layout>
            <h2 className="py-8 uppercase text-orange-500 text-center text-2xl font-serif font-medium">Seja bem-vindo(a) ao <br /> <span className="font-extrabold">Sistema de Frequência</span></h2>

            <div className="px-10 space-y-10 flex-col">
                
                <div className="hidden sm:flex space-x-10 justify-center items-center">
                    <button className={classname}>
                        <IoMdAddCircle size={60} className="m-auto"/>
                        Cadastrar
                    </button>
                    <button className={classname}>
                        <HiDocument size={60} className="m-auto" />
                        Relatorios
                    </button>
                    <button className={classname}>
                        <FaBookReader size={60} className="m-auto" />
                        Disciplinas
                    </button>
                </div>
                
                <div className="hidden sm:flex space-x-10 justify-center items-center">
                    <button className={classname}>
                        <BsFillPeopleFill size={60} className="m-auto" />
                        Estudantes
                    </button>
                    <button className={classname}>
                        <GiTeacher size={60} className="m-auto" />
                        Professores
                    </button>
                    <button className={classname}>
                        <FaBookReader size={60} className="m-auto" />
                        Disciplinas
                    </button>
                </div>

                {/**CELULAR */}

                <div className="sm:hidden flex space-x-10 justify-center items-center">
                    <button className={classname}>
                        <IoMdAddCircle size={60} className="m-auto"/>
                        Cadastrar
                    </button>
                    <button className={classname}>
                        <HiDocument size={60} className="m-auto" />
                        Relatorios
                    </button>
                </div>

                <div className="sm:hidden flex space-x-10 justify-center items-center">
                    <button className={classname}>
                        <FaBookReader size={60} className="m-auto" />
                        Disciplinas
                    </button>
                    <button className={classname}>
                        <BsFillPeopleFill size={60} className="m-auto" />
                        Estudantes
                    </button>
                </div>

                <div className="sm:hidden flex space-x-10 justify-center items-center">
                    <button className={classname}>
                        <GiTeacher size={60} className="m-auto" />
                        Professores
                    </button>
                    <button className={classname}>
                        <IoInformationCircle size={60} className="m-auto" />
                        Informação
                    </button>
                </div>
            </div>
        </Layout>
    )
}