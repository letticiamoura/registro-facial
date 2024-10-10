import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

export default function Login() {
    
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const url = "https://letticiamoura.github.io/registro-facial-apiFake/api.json";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.get(url);
      const users = response.data.users;
  
      //Verificando se existe um user
      const user = users.find((user: { username: string, password: string }) => 
        user.username === username && user.password === password
      );
  
      if (user) {
        navigate('/home');
      } else {
        setError('Usuário ou senha incorretos, tente novamente');
      }
    } catch (err) {
      console.error(err);
      setError('Ocorreu um erro ao tentar fazer login');
    }
  };  

  const label = "w-full md:w-[50vw] space-y-2 text-zinc-700 text-md font-medium";
  const classname = "w-full p-2 rounded-md border border-gray-700 focus:border-none focus:ring-2 focus:ring-orange-500 outline-none md:w-[50vw]";

  return (
    <Layout>
      <h2 className="pt-20 text-center text-4xl font-bold text-orange-500 font-serif uppercase">Faça o seu Login <br />no Sistema</h2>
      <form onSubmit={handleLogin} className="pt-20 px-10 flex space-y-6 flex-col items-center">

          <label className={label}>Usuário <br />
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className={classname}
            />
          </label>
          
          <label className={label}>Senha <br />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={classname}
            />
          </label>
          
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" className="md:w-[30vw] bg-orange-500 p-2.5 rounded-md w-full text-2xl text-white" >Login</button>
      </form>
    </Layout>
  );
} 