import React, { useContext, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ProgressBar } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { DataContext } from '../../context/context.js';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { decodeToken, getUserRole } = useContext(DataContext);
  const navigate = useNavigate();

  // Get user role
  const userRole = getUserRole();

  // Redirect if not a teacher, student or parent
  useEffect(() => {
    if (userRole !== 'معلم' && userRole !== 'طالب' && userRole !== 'ولي أمر') {
      navigate('/'); // Redirect to home or login page
    }
  }, [userRole, navigate]);

  // If not a teacher, student or parent, return null to prevent rendering
  if (userRole !== 'معلم' && userRole !== 'طالب' && userRole !== 'ولي أمر') {
    return null;
  }

  const token = localStorage.getItem('token');
  const userData = decodeToken(token);

  // Teacher Dashboard Cards
  const teacherDashboardCards = [
    {
      icon: 'fa-book',
      title: 'إضافة كتاب جديد',
      description: 'قم بإضافة كتب جديدة إلى مكتبة النادي',
      link: '/books',
      buttonText: 'أضف كتاب'
    },
    {
      icon: 'fa-book-open',
      title: 'مكتبة الكتب',
      description: 'استعراض وإدارة الكتب الخاصة بك',
      link: '/Teacherbooks',
      buttonText: 'عرض الكتب'
    },
    {
      icon: 'fa-users',
      title: 'إدارة الطلاب',
      description: 'تتبع وإدارة الطلاب في نادي القراءة',
      link: '/StudentsTeacher',
      buttonText: 'عرض الطلاب'
    }
  ];

  // Student Dashboard Cards
  const studentDashboardCards = [
    {
      icon: 'fa-book-reader',
      title: 'مكتبتي',
      description: 'استعراض الكتب التي أقرأها وأكملتها',
      link: '/LibraryStudent',
      buttonText: 'عرض الكتب'
    },
    {
      icon: 'fa-star',
      title: 'التقييم الذاتي',
      description: 'تتبع تقدمك وإنجازاتك في القراءة',
      link: '/Selfassessment',
      buttonText: 'تقييم ذاتي'
    },
    {
      icon: 'fa-trophy',
      title: 'الملف الشخصي',
      description: 'عرض الملف الشخصي بالبيانات الشخصية',
      link: '/ProfileStudent',
      buttonText: 'عرض الملف الشخصي'
    }
  ];

  // Parent Dashboard Sections
  const parentDashboardCards = [
    {
      icon: 'fa-home',
      title: 'الصفحة الرئيسية',
      description: 'لوحة متابعة أداء طفلك',
      link: '/dashboard',
      buttonText: 'متابعة'
    },
    {
      icon: 'fa-user',
      title: 'الملف الشخصي',
      description: 'إدارة معلوماتك الشخصية',
      link: '/Parentprofile',
      buttonText: 'عرض الملف'
    },
    {
      icon: 'fa-chart-line',
      title: 'تقييم الأداء',
      description: 'أدخل تقييمك بناءا علي تغير سلوك ابنك اثناء رحلته مع برنامج أندية القراءة المدرسية',
      link: '/Parentassessment',
      buttonText: 'تقييم الأداء'
    }
  ];

  // Render dashboard sections based on user role
  const renderDashboardSections = () => {
    switch (userRole) {
      case 'طالب':
        return studentDashboardCards.map((card, index) => (
          <Col key={index} md={4}>
            <Card 
              className="h-100 shadow-sm border-0 hover-lift" 
              style={{ 
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                borderRadius: '15px'
              }}
            >
              <Card.Body className="text-center">
                <div 
                  className="mb-3 mx-auto d-flex align-items-center justify-content-center" 
                  style={{
                    width: '80px', 
                    height: '80px', 
                    borderRadius: '50%', 
                    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                    color: 'white'
                  }}
                >
                  <i 
                    className={`fas ${card.icon}`} 
                    style={{ fontSize: '2.5rem' }} 
                  />
                </div>
                <Card.Title className="mb-3">{card.title}</Card.Title>
                <Card.Text className="text-muted mb-4">
                  {card.description}
                </Card.Text>
                <Link to={card.link}>
                  <Button 
                    variant="outline-primary" 
                    className="w-100"
                  >
                    {card.buttonText}
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ));
      case 'معلم':
        return teacherDashboardCards.map((card, index) => (
          <Col key={index} md={4}>
            <Card 
              className="h-100 shadow-sm border-0 hover-lift" 
              style={{ 
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                borderRadius: '15px'
              }}
            >
              <Card.Body className="text-center">
                <div 
                  className="mb-3 mx-auto d-flex align-items-center justify-content-center" 
                  style={{
                    width: '80px', 
                    height: '80px', 
                    borderRadius: '50%', 
                    background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                    color: 'white'
                  }}
                >
                  <i 
                    className={`fas ${card.icon}`} 
                    style={{ fontSize: '2.5rem' }} 
                  />
                </div>
                <Card.Title className="mb-3">{card.title}</Card.Title>
                <Card.Text className="text-muted mb-4">
                  {card.description}
                </Card.Text>
                <Link to={card.link}>
                  <Button 
                    variant="outline-primary" 
                    className="w-100"
                  >
                    {card.buttonText}
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ));
      case 'ولي أمر':
        return parentDashboardCards.map((card, index) => (
          <Col key={index} md={4}>
            <Card 
              className="h-100 shadow-sm border-0 hover-lift" 
              style={{ 
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                borderRadius: '15px'
              }}
            >
              <Card.Body className="text-center">
                <div 
                  className="mb-3 mx-auto d-flex align-items-center justify-content-center" 
                  style={{
                    width: '80px', 
                    height: '80px', 
                    borderRadius: '50%', 
                    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                    color: 'white'
                  }}
                >
                  <i 
                    className={`fas ${card.icon}`} 
                    style={{ fontSize: '2.5rem' }} 
                  />
                </div>
                <Card.Title className="mb-3">{card.title}</Card.Title>
                <Card.Text className="text-muted mb-4">
                  {card.description}
                </Card.Text>
                <Link to={card.link}>
                  <Button 
                    variant="outline-primary" 
                    className="w-100"
                  >
                    {card.buttonText}
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ));
      default:
        return [];
    }
  };

  return (
    <>
      <Helmet>
        <title>لوحة التحكم - نادي القراءة المدرسي</title>
      </Helmet>
      
      <Container className="py-5">
        {userRole === 'معلم' && (
          <>
            <div 
              className="text-center mb-5 p-4 rounded shadow-lg" 
              style={{ 
                background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)', 
                color: 'white' 
              }}
            >
              <h2 className="display-5 mb-3">
                
               مرحبا عزيزي المعلم
               <i className="fas fa-home me-3"></i>
              </h2>
              <p className="lead text-light">
                أهلاً بك في لوحة التحكم لبرنامج أندية القراءة المدرسية
              </p>
            </div>

            <Row className="g-4">
              {renderDashboardSections()}
            </Row>
          </>
        )}

        {userRole === 'طالب' && (
          <>
            <div 
              className="text-center mb-5 p-4 rounded shadow-lg" 
              style={{ 
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', 
                color: 'white' 
              }}
            >
              <h2 className="display-5 mb-3">
                
                مرحبا عزيزي الطالب
                <i className="fas fa-user-graduate me-3"></i>
              </h2>
              <p className="lead text-light">
                رحلتك في عالم القراءة تبدأ هنا! استمتع بالتعلم والاكتشاف
              </p>
            </div>

            <Row className="g-4">
              {renderDashboardSections()}
            </Row>
          </>
        )}

        {userRole === 'ولي أمر' && (
          <>
            <div 
              className="text-center mb-5 p-4 rounded shadow-lg" 
              style={{ 
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', 
                color: 'white' 
              }}
            >
              <h2 className="display-5 mb-3">
                
                مرحبا عزيزي ولي الأمر
                <i className="fas fa-user me-3"></i>
              </h2>
              <p className="lead text-light">
                أهلاً بك في لوحة التحكم لبرنامج أندية القراءة المدرسية
              </p>
            </div>

            <Row className="g-4">
              {renderDashboardSections()}
            </Row>
          </>
        )}

        <style>{`
          .hover-lift:hover {
            transform: translateY(-10px);
            box-shadow: 0 1rem 3rem rgba(0,0,0,.175) !important;
          }
        `}</style>
      </Container>
    </>
  );
}
