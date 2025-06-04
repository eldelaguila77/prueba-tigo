import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/'); // o dashboard
    } catch (err) {
      setError('Credenciales inválidas');
    }
  };

  return (
    <>
        <div className="flex justify-center items-center min-h-screen">
        <form onSubmit={handleSubmit} className="p-6 shadow-md rounded-lg bg-white w-96 space-y-4">
            <h2 className="text-xl font-semibold text-center">Iniciar sesión</h2>

            <div>
            <label className="block mb-1">Email</label>
            <InputText value={email} onChange={e => setEmail(e.target.value)} className="w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none p-2" />
            </div>

            <div>
            <label className="block mb-1">Contraseña</label>
            <Password value={password} onChange={e => setPassword(e.target.value)} feedback={false} toggleMask className="w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none p-2" />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button label="Ingresar" className="w-full" />
        </form>
        </div>

        <p className="text-center text-sm mt-4">
        ¿No tienes cuenta? <a href="/register" className="text-blue-500 hover:underline">Regístrate aquí</a>
        </p>
    </>
  );
};

export default LoginPage;
