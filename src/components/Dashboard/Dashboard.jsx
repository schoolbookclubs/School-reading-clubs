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

  // Redirect if not a teacher, student, parent or admin
  useEffect(() => {
    if (userRole !== 'معلم' && userRole !== 'طالب' && userRole !== 'ولي أمر' && userRole !== 'مشرف') {
      navigate('/'); // Redirect to home or login page
    }
  }, [userRole, navigate]);

  // If not a teacher, student, parent or admin, return null to prevent rendering
  if (userRole !== 'معلم' && userRole !== 'طالب' && userRole !== 'ولي أمر' && userRole !== 'مشرف') {
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
      title: 'الكتب والتقييم',
      description: 'استعراض وإدارة الكتب الخاصة بك',
      link: '/Teacherbooks',
      buttonText: 'عرض الكتب'
    },
    {
      icon: 'fa-paper-plane',
      title: 'دليل المعلم',
      description: 'اقرأ دليل المعلم وتتبع التعليمات والارشادات',
      link: '/TeacherGuide',
      buttonText: 'عرض دليل المعلم'
    }
  ];

  // Student Dashboard Cards
  const studentDashboardCards = [
    {
      icon: 'fa-book-reader',
      title: 'الكتب والتقييم',
      description: 'استعراض وتقييم الكتب الخاصة بك',
      link: '/LibraryStudent',
      buttonText: 'عرض الكتب وتقييمها'
    },
    {
      icon: 'fa-book-open',
      title: 'دليل الطالب',
      description: 'تتبع التعليمات والارشادات في الدليل الخاص بك',
      link: '/StudentGuide',
      buttonText: 'افتح دليل الطالب'
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
      icon: 'fa-book-reader',
      title: 'دليل ولي الامر',
      description: 'اقراء دليل ولي الامر وتتبع التعليمات والارشادات',
      link: '/ParentGuide',
      buttonText: 'دليل ولي الامر'
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

  // Admin Dashboard Cards and Sections
  const adminDashboardCards = [
    {
      icon: 'fa-chalkboard-teacher',
      title: 'تقييمات المعلمين',
      description: 'تحليل شامل لتقييمات المعلمين للطلاب',
      link: '/admin/OneSchoolTeacherEvaluations',
      color: 'linear-gradient(135deg, #ff6b6b 0%, #ff9a9a 100%)',
      details: [
        { label: 'عرض المعلمين', value: '', icon: 'fa-user-tie' },
        { label: 'متوسط التقييم', value: '', icon: 'fa-star' },
        { label: 'تقارير مكتملة', value: '', icon: 'fa-check-circle' }
      ]
    },
    {
      icon: 'fa-graduation-cap',
      title: 'تقييمات الطلاب',
      description: 'تتبع دقيق لأداء الطلاب في نادي الكتاب',
      link: '/admin/OneSchoolStusentEvaluations',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      details: [
        { label: 'عرض الطلاب', value: '', icon: 'fa-users' },
        { label: 'تقييم القراءة', value: '', icon: 'fa-book-open' },
        { label: 'التقييم الذاتي', value: '', icon: 'fa-chart-line' }
      ]
    },
    {
      icon: 'fa-user-friends',
      title: 'تقييمات أولياء الأمور',
      description: 'مراجعة معمقة لتقييمات أولياء الأمور',
      link: '/admin/OneSchoolParentEvaluations',
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      details: [
        { label: 'عرض أولياء الأمور', value: '', icon: 'fa-user-shield' },
        { label: 'رضائهم بالنادي', value: '', icon: 'fa-smile' },
        { label: 'تقييم اداء طالبه', value: '', icon: 'fa-clipboard-check' }
      ]
    }
  ];

  // Render admin dashboard
  const renderAdminDashboard = () => {
    return (
      <Container fluid className="p-4 admin-dashboard" style={{ 
        background: 'linear-gradient(to bottom right, #f4f4f4, #e9e9e9)',
        minHeight: '100vh'
      }}>
        <Helmet>
          <title>لوحة تحكم المشرف - نادي الكتاب المدرسي</title>
        </Helmet>
        
        <Row className="mb-5">
          <Col>
            <div 
              className="text-center p-4 rounded-4 shadow-lg" 
              style={{ 
                background: 'linear-gradient(to right, #6a11cb 0%, #2575fc 100%)', 
                color: 'white',
                transform: 'perspective(500px) rotateX(2deg)'
              }}
            >
              <h1 
                className="display-4 mb-3" 
                style={{ 
                  fontWeight: 'bold',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                لوحة تحكم المشرف
              </h1>
              <p className="lead text-light">
                مركز التحليل والتقييم الشامل لأندية القراءة المدرسية
              </p>
            </div>
          </Col>
        </Row>
        
        <Row className="g-4">
          {adminDashboardCards.map((card, index) => (
            <Col key={index} md={4}>
              <Card 
                className="h-100 shadow-lg border-0 admin-card overflow-hidden" 
                style={{ 
                  borderRadius: '25px',
                  transition: 'all 0.4s ease',
                  transform: 'scale(1)',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.1)';
                }}
              >
                <div 
                  className="card-header text-center p-4" 
                  style={{ 
                    background: card.color,
                    color: 'white',
                    clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0 100%)',
                    position: 'relative',
                    zIndex: 1
                  }}
                >
                  <i 
                    className={`fas ${card.icon}`} 
                    style={{ fontSize: '3.5rem', opacity: 0.9 }} 
                  />
                  <h3 className="mt-3 mb-0">{card.title}</h3>
                </div>
                <Card.Body className="text-center p-4">
                  <Card.Text className="text-muted mb-4">
                    {card.description}
                  </Card.Text>
                  
                  <Row className="g-3 mb-4">
                    {card.details.map((detail, idx) => (
                      <Col key={idx} xs={4}>
                        <div 
                          className="p-3 rounded-3 shadow-sm" 
                          style={{ 
                            background: 'rgba(255,255,255,0.8)', 
                            border: '1px solid rgba(0,0,0,0.05)' 
                          }}
                        >
                          <i 
                            className={`fas ${detail.icon} mb-2`} 
                            style={{ 
                              fontSize: '1.5rem', 
                              color: card.color.split(' ')[5] 
                            }} 
                          />
                          <h6 className="mb-1">{detail.value}</h6>
                          <small className="text-muted">{detail.label}</small>
                        </div>
                      </Col>
                    ))}
                  </Row>
                  
                  <Link to={card.link} className="w-100">
                    <Button 
                      variant="outline-primary" 
                      className="w-100 btn-lg"
                      style={{ 
                        borderRadius: '50px',
                        background: 'linear-gradient(to right, #6a11cb 0%, #2575fc 100%)',
                        color: 'white',
                        border: 'none'
                      }}
                    >
                      عرض التقارير والتقييمات
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  };

  // Render dashboard sections based on user role
  const renderDashboardSections = () => {
    switch (userRole) {
      case 'مشرف':
        return renderAdminDashboard();
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

        {userRole === 'مشرف' && (
          <>
            {renderAdminDashboard()}
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
