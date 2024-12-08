import { createContext } from 'react';

export const DataContext = createContext();

export default function DataContextFunction({ children }) {
  const token = localStorage.getItem("token");

  function decodeToken(token) {
    try {
      const [, payloadBase64] = token.split('.');
      
      const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  function getUserRole() {
    const token = localStorage.getItem('token');
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
