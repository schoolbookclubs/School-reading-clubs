import { createContext, useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';

export const DataContext = createContext();

export default function DataContextFunction({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (token) {
      const decoded = decodeToken(token);
      setUserRole(decoded?.role || null);
    } else {
      setUserRole(null);
    }
  }, [token]);

  const decodeToken = (token) => {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  const getLoginPath = () => {
    switch (userRole) {
      case 'طالب':
        return '/LoginStudent';
      case 'معلم':
        return '/LoginTeacher';
      case 'مشرف':
        return '/LoginSupervisor';
      case 'ولي أمر':
        return '/LoginParent';
      default:
        return '/';
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    window.location.href = '/';
  };

  // Add a method to manually set token and trigger role update
  const setTokenAndUpdateRole = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  return (
    <DataContext.Provider
      value={{
        token,
        decodeToken,
        getUserRole: () => userRole,
        getLoginPath,
        logout,
        setTokenAndUpdateRole,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
