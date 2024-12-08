import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { DataContext } from '../../context/context';
import MainNavbar from '../Navbar/Navbar';

const Layout = () => {
  const { getUserRole } = useContext(DataContext);
  const token = localStorage.getItem('token');
  const role = getUserRole();

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
