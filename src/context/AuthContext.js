import React, { createContext, useState, useContext } from 'react';
import API from '../api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('adminToken'));

  const login = async (email, password) => {
    const res = await API.post('/admin/login', { email, password });
    localStorage.setItem('adminToken', res.data.token);
    setToken(res.data.token);
    setAdmin(res.data.admin);
    return true;
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};