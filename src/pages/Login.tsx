import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { FormEvent, useEffect, useState } from "react";

export default function Login() {
    const navigate = useNavigate();

    const [autentic, setAutentic] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleLogin = (e: FormEvent) => {
        e.preventDefault();
        setSubmitted(true); 
        
        const validEmail = "admin@gmail.com";
        const validPassword = "admin";

        if (email === validEmail && password === validPassword) {
            setAutentic(true);
        } else {
            setAutentic(false);
        }
    };

    useEffect(() => {
        if (autentic === true) {
            navigate("/home");
        } else if (submitted && autentic === false) {
            alert("Email ou Senha incorreto");
        }
    }, [autentic, navigate, submitted]);

    const label = "w-full space-y-2 text-zinc-700 text-md font-medium";
    const classname = "w-full p-2 rounded-md border border-gray-700 focus:border-none focus:ring-2 focus:ring-orange-500 outline-none";

    return (
        <Layout>
            <h2 className="pt-20 text-center text-4xl font-bold text-orange-500 font-serif uppercase">Faça seu Login <br />no Sistema</h2>
            <form onSubmit={handleLogin} className="pt-20 px-10 flex space-y-6 flex-col items-center">
                <label htmlFor="email" className={label}>Usuário <br />
                    <input 
                        type="text" 
                        placeholder="Seu usuário" 
                        required 
                        className={classname} 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </label>
                <label htmlFor="password" className={label}>Senha <br />
                    <input 
                        type="password" 
                        placeholder="********" 
                        required 
                        className={classname} 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </label>
                <button type="submit" className="pt-5 w-full">
                    <input type="submit" value="Entrar" className="bg-orange-500 p-2.5 rounded-md w-full text-2xl text-white" />
                </button>
            </form>
        </Layout>
    );
}