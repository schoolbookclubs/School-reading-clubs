import React, { useContext, useState, useEffect, useRef } from 'react';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DataContext } from '../../context/context.js';
import './Navbar.css';

const MainNavbar = () => {
  const { getUserRole, logout } = useContext(DataContext);
  const role = getUserRole();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLinkClick = () => {
    setIsDropdownOpen(false);
  };

  const getNavItems = () => {
    if (!role) {
      console.warn('No user role detected in Navbar');
      return null;
    }

    const renderMainLinks = (links) => {
      return links.slice(0, 4).map((link, index) => (
        <Nav.Link key={index} as={Link} to={link.to} onClick={handleLinkClick}>
          {link.text}
        </Nav.Link>
      ));
    };

    const renderDropdownLinks = (links) => {
      if (links.length <= 4) return null;
      return (
        <div ref={dropdownRef} style={{ position: 'relative' }}>
          <div className="dropdown-toggle" onClick={toggleDropdown}>
            المزيد
          </div>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              {links.slice(4).map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  onClick={handleLinkClick}
                >
                  {link.text}
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    };

    let links = [];
    switch (role) {
      case 'طالب':
        links = [
          { to: '/dashboard', text: 'لوحة التحكم' },
          { to: '/ProfileStudent', text: 'الملف الشخصي' },
          { to: '/LibraryStudent', text: 'الكتب والتقييم' },
          { to: '/StudentBag', text: 'حقيبة القارئ' },
          { to: '/StudentGuide', text: 'دليل الطالب' },
          { to: '/ReadingClubEvaluation', text: 'تقييم نادي القراءة' },
          { to: '/Student_Rates', text: 'تقييمات الطالب' }
        ];
        break;
      case 'معلم':
        links = [
          { to: '/dashboard', text: 'الصفحة الرئيسية' },
          { to: '/books', text: 'اضافة كتاب' },
          { to: '/Teacherbooks', text: 'الكتب و التقييم' },
          { to: '/TeacherEvaluationsOfStudents', text: 'تقييمات المعلم للطلاب' },
          { to: '/StudentReviewsofTeacherBooks', text: 'تقييمات الطلاب لكتب المعلم' },
          { to: '/TeacherGuide', text: 'دليل المعلم' }
        ];
        break;
      case 'مشرف':
        links = [
          { to: '/dashboard', text: 'لوحة التحكم' },
          { to: '/admin/OneSchoolTeacherEvaluations', text: 'تقييم المعلمين' },
          { to: '/admin/OneSchoolStusentEvaluations', text: 'تقييم الطلاب' },
          { to: '/admin/OneSchoolParentEvaluations', text: 'تقييم اولياء الامور' },
          { to: '/admin/AttendanceoneSchool', text: 'الحضور والغياب' },
          { to: '/admin/ReadingBooksNumberoneSchool', text: 'عدد الكتب المقروءة' }
        ];
        break;
      case 'ولي أمر':
        links = [
          { to: '/dashboard', text: 'لوحة التحكم' },
          { to: '/Parentprofile', text: 'بياناتي الشخصية' },
          { to: '/Parentassessment', text: 'تقييم ولي الامر' },
          { to: '/ShowParentassessments', text: 'عرض التقييمات' },
          { to: '/ParentGuide', text: 'دليل ولي الامر' }
        ];
        break;
      default:
        return null;
    }

    return (
      <>
        {renderMainLinks(links)}
        {renderDropdownLinks(links)}
      </>
    );
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
