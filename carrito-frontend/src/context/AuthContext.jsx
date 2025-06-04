// src/context/AuthContext.jsx
import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem('token');
    const authData = JSON.parse(localStorage.getItem('auth'));
    return token ? { token, user: authData?.user } : null;
  });

  const login = async (email, password) => {
    try {
        //axios.defaults.withCredentials = true;
      const res = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        password
      });

        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        axios.defaults.headers.common['Content-Type'] = 'application/json';

      const resGetProfile = await axios.get('http://localhost:8080/api/users/email?email=' + email);

      const token = res.data.token;
      localStorage.setItem('token', token);
        localStorage.setItem('auth', JSON.stringify({ token, user: resGetProfile.data }));
      setAuth({ token, user: resGetProfile.data });
    } catch (err) {
      console.error('Login failed', err);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth(null);
  };

  const updateUser = (newUser) => {
    const updatedAuth = { ...auth, user: newUser };
    setAuth(updatedAuth);
    localStorage.setItem('auth', JSON.stringify(updatedAuth));
  };
  

  return (
    <AuthContext.Provider value={{ auth, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
