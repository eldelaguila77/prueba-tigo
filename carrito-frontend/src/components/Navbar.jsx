import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { logout, auth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const items = [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      command: () => navigate('/')
    },
    {
      label: 'Perfil',
      icon: 'pi pi-user',
      command: () => navigate('/profile')
    },
    {
      label: 'Catálogo',
      icon: 'pi pi-shopping-cart',
      command: () => navigate('/catalog')
    },
    {
        label: 'Carrito',
        icon: 'pi pi-shopping-cart',
        command: () => navigate('/cart')
    },
    /*{
      label: 'Órdenes',
      icon: 'pi pi-list',
      command: () => navigate('/ordenes')
    },*/
    {
      label: 'Cerrar sesión',
      icon: 'pi pi-sign-out',
      command: handleLogout,
      className: 'text-red-600'
    }
  ];

  return (
    <div className="shadow-md">
      <Menubar
        model={items}
        start={<span className="text-xl font-bold text-indigo-600">MiTienda</span>}
        end={
          <span className="text-sm text-gray-600 hidden sm:block">
            {auth?.user?.nombres} {auth?.user?.apellidos}
          </span>
        }
        className="px-4"
      />
    </div>
  );
};

export default Navbar;
