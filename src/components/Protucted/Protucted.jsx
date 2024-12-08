import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { DataContext } from '../../context/context.js';
import MainNavbar from '../Navbar/Navbar.jsx';

const Protected = ({ children }) => {
  const { getUserRole, getLoginPath } = useContext(DataContext);
  const token = localStorage.getItem('token');
  const role = getUserRole();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (!role) {
    return <Navigate to={getLoginPath(role)} replace />;
  }

  return (
    <>
      <MainNavbar />
      {children}
    </>
  );
};

export default Protected;
