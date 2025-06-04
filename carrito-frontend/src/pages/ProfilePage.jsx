import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { classNames } from 'primereact/utils';
import axios from 'axios';

const ProfilePage = () => {
  const { auth, updateUser } = useAuth();
  const [form, setForm] = useState({
    nombres: '',
    apellidos: '',
    direccionEnvio: '',
    email: '',
    fechaNacimiento: null,
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    console.log("auth", auth);
    if (auth?.user) {

        console.log("auth", auth);
      setForm({
        nombres: auth.user.nombres || '',
        apellidos: auth.user.apellidos || '',
        direccionEnvio: auth.user.direccionEnvio || '',
        email: auth.user.email || '',
        fechaNacimiento: new Date(auth.user.fechaNacimiento) || null,
      });
    }
  }, [auth]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (e) => {
    setForm((prev) => ({ ...prev, fechaNacimiento: e.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!form.nombres || !form.email) return;

    try {
      setLoading(true);
      const response = await axios.put(
        'http://localhost:8080/api/users/' + auth.user.id, // cambia si tu endpoint difiere
        {
          ...form,
          fechaNacimiento: form.fechaNacimiento.toISOString().split('T')[0],
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      updateUser(response.data); // actualiza en contexto
      alert('Perfil actualizado exitosamente');
    } catch (error) {
      console.error(error);
      alert('Error al actualizar perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Perfil de Usuario</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <div>
          <label htmlFor="nombres">Nombres: </label>
          <InputText
            id="nombres"
            name="nombres"
            value={form.nombres}
            onChange={handleChange}
            className={classNames({ 'p-invalid': submitted && !form.nombres })}
          />
        </div>

        <div>
          <label htmlFor="apellidos">Apellidos: </label>
          <InputText
            id="apellidos"
            name="apellidos"
            value={form.apellidos}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="direccionEnvio">Dirección de Envío: </label>
          <InputText
            id="direccionEnvio"
            name="direccionEnvio"
            value={form.direccionEnvio}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="email">Correo electrónico: </label>
          <InputText
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            className={classNames({ 'p-invalid': submitted && !form.email })}
          />
        </div>

        <div>
          <label htmlFor="fechaNacimiento">Fecha de nacimiento: </label>
          <Calendar
            id="fechaNacimiento"
            name="fechaNacimiento"
            value={form.fechaNacimiento}
            onChange={handleDateChange}
            showIcon
            dateFormat="yy-mm-dd"
          />
        </div>

        <div className="flex justify-end mt-4">
          <Button label="Guardar Cambios" type="submit" loading={loading} />
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
