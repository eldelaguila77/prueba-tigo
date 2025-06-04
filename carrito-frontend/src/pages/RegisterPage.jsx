import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import axios from 'axios';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombres: '',
    apellidos: '',
    direccionEnvio: '',
    email: '',
    fechaNacimiento: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/auth/register', form);
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError('No se pudo registrar el usuario');
    }
  };

  return (
    <>
        <div className="flex justify-center items-center min-h-screen px-2">
        <form onSubmit={handleSubmit} className="p-6 shadow-md rounded-lg bg-white w-full max-w-md space-y-4">
            <h2 className="text-xl font-semibold text-center">Registro</h2>

            {[
            { label: 'Nombres', name: 'nombres' },
            { label: 'Apellidos', name: 'apellidos' },
            { label: 'Dirección de Envío', name: 'direccionEnvio' },
            { label: 'Email', name: 'email' },
            { label: 'Fecha de Nacimiento', name: 'fechaNacimiento', type: 'date' }
            ].map(({ label, name, type }) => (
            <div key={name}>
                <label className="block mb-1">{label}</label>
                <InputText
                name={name}
                value={form[name]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none p-2"
                type={type || 'text'}
                />
            </div>
            ))}

            <div>
            <label className="block mb-1">Contraseña</label>
            <Password
                name="password"
                value={form.password}
                onChange={handleChange}
                feedback={false}
                toggleMask
                className="w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none p-2"
            />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button label="Registrarse" className="w-full" />
        </form>
        </div>

        <p className="text-center text-sm">
        ¿Ya tienes cuenta? <a href="/login" className="text-blue-500 hover:underline">Inicia sesión</a>
        </p>
    </>
  );
};

export default RegisterPage;
