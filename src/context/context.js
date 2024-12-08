import { createContext } from 'react';
import { jwtDecode } from 'jwt-decode';

export const DataContext = createContext();

export default function DataContextFunction({ children }) {
  const token = localStorage.getItem("token");

  function decodeToken(token) {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  function getUserRole() {
    if (!token) return null;
    const decodedToken = decodeToken(token);
    return decodedToken?.role || null;
  }

  function getLoginPath(role) {
    switch (role) {
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
  }

  function logout() {
    localStorage.removeItem('token');
    window.location.href = '/';
  }

  return (
    <DataContext.Provider
      value={{
        token,
        decodeToken,
        getUserRole,
        getLoginPath,
        logout
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
