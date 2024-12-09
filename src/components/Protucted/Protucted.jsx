import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { DataContext } from '../../context/context.js';

const Protected = ({ children }) => {
  const { getUserRole, getLoginPath } = useContext(DataContext);
  const token = localStorage.getItem('token');
  const role = getUserRole();

  // Add more robust logging and error handling
  useEffect(() => {
    console.log('Protected Route - Token:', !!token);
    console.log('Protected Route - Role:', role);
  }, [token, role]);

  // More comprehensive authentication check
  if (!token) {
    console.warn('No token found, redirecting to login');
    return <Navigate to="/" replace />;
  }

  if (!role) {
    console.warn('No role found, redirecting to login path');
    return <Navigate to={getLoginPath()} replace />;
  }

  return children;
};

export default Protected;
