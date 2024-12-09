import React, { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { DataContext } from '../../context/context';
import MainNavbar from '../Navbar/Navbar';

const Layout = () => {
  const { getUserRole } = useContext(DataContext);
  const token = localStorage.getItem('token');
  const role = getUserRole();

  // Log for debugging
  useEffect(() => {
    console.log('Token:', token);
    console.log('Role:', role);
  }, [token, role]);

  return (
    <div className="layout">
      {token && role && <MainNavbar />}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
