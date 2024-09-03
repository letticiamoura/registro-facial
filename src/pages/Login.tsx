import { Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function Login() {
    const handleLogin = () => {}

    const label = "w-full space-y-2 text-zinc-700 text-md font-medium"
    const classname = "w-full p-2 rounded-md border border-gray-700 focus:border-none focus:ring-2 focus:ring-orange-500 outline-none";

    return(
        <Layout>
            <h2 className="pt-20 text-center text-4xl font-bold text-orange-500 font-serif uppercase">Faça seu Login <br />no Sistema</h2>
            <form onSubmit={handleLogin} className="pt-20 px-10 flex space-y-6 flex-col items-center">
                <label htmlFor="name" className={label}>Usuário <br />
                    <input type="text" placeholder="Seu usuário" required className={classname} />
                </label>
                <label htmlFor="name" className={label}>Senha <br />
                    <input type="password" placeholder="********" required className={classname} />
                </label>
                <Link to="/home" className="pt-5 w-full">
                    <input type="submit" value="Entrar" className="bg-orange-500 p-2.5 rounded-md w-full text-2xl text-white" />
                </Link>
            </form>
        </Layout>
    )
}