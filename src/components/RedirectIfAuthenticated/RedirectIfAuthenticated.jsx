import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { DataContext } from '../../context/context.js';

const RedirectIfAuthenticated = ({ children }) => {
  const { getUserRole } = useContext(DataContext);
  const token = localStorage.getItem('token');
  const role = getUserRole();

  if (token && role) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default RedirectIfAuthenticated;
