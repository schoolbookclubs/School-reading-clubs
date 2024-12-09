import React, { useContext } from 'react';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DataContext } from '../../context/context.js';
import './Navbar.css';

const MainNavbar = () => {
  const { getUserRole, logout } = useContext(DataContext);
  const role = getUserRole();

  const getNavItems = () => {
    if (!role) {
      console.warn('No user role detected in Navbar');
      return null;
    }

    switch (role) {
      case 'طالب':
        return (
          <>
            <Nav.Link as={Link} to="/dashboard">لوحة التحكم</Nav.Link>
            <Nav.Link as={Link} to="/profile">الملف الشخصي</Nav.Link>
            <Nav.Link as={Link} to="/books">الكتب</Nav.Link>
          </>
        );
      case 'معلم':
        return (
          <>
            <Nav.Link as={Link} to="/dashboard">لوحة التحكم</Nav.Link>
            <Nav.Link as={Link} to="/students">الطلاب</Nav.Link>
            <Nav.Link as={Link} to="/books">الكتب</Nav.Link>
          </>
        );
      case 'مشرف':
        return (
          <>
            <Nav.Link as={Link} to="/dashboard">لوحة التحكم</Nav.Link>
            <Nav.Link as={Link} to="/teachers">المعلمين</Nav.Link>
            <Nav.Link as={Link} to="/reports">التقارير</Nav.Link>
          </>
        );
      case 'ولي أمر':
        return (
          <>
            <Nav.Link as={Link} to="/dashboard">لوحة التحكم</Nav.Link>
            <Nav.Link as={Link} to="/children">أبنائي</Nav.Link>
            <Nav.Link as={Link} to="/progress">متابعة التقدم</Nav.Link>
          </>
        );
      default:
        console.warn(`Unhandled user role: ${role}`);
        return null;
    }
  };

  return (
    <BootstrapNavbar bg="light" expand="lg" className="rtl-navbar">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/dashboard">برنامج أندية القراءة المدرسية</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">{getNavItems()}</Nav>
          <Nav>
            {role && (
              <Nav.Link onClick={logout} className="text-danger">
                تسجيل الخروج
              </Nav.Link>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default MainNavbar;
