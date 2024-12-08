import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomePage.css';
import { Helmet } from 'react-helmet';
import { Container, Row, Col } from 'react-bootstrap';

export default function WelcomePage() {
  const userTypes = [
    {
      title: 'الطلاب',
      description: 'منصة تفاعلية للطلاب من مختلف المراحل العمرية للمشاركة في نادي الكتاب',
      icon: '📚',
      path: '/LoginStudent'
    },
    {
      title: 'أولياء الأمور',
      description: 'متابعة تقدم أبنائكم ومشاركتهم في البرنامج',
      icon: '👨‍👩‍👧‍👦',
      path: '/LoginParent'
    },
    {
      title: 'المعلمون',
      description: 'تقييم ومتابعة تقدم الطلاب في القراءة والفهم',
      icon: '👨‍🏫',
      path: '/LoginTeacher'
    },
    {
      title: 'المشرفون',
      description: 'إدارة البرنامج ومتابعة أداء الطلاب والمعلميين في تطوير مهارات القراءة',
      icon: '👨‍💼',
      path: '/LoginSupervisor'
    }
   
  ];

  const evaluationTypes = [
    {
      title: 'تقييم الكتب',
      description: 'تقييم الطلاب للكتب التي قرؤوها'
    },
    {
      title: 'تقييم البرنامج',
      description: 'تقييم مدى استفادة الطلاب من البرنامج'
    },
    {
      title: 'تقييم المعلمين',
      description: 'تقييم أداء وتقدم الطلاب من قبل المعلمين'
    },
    {
      title: 'تقييم أولياء الأمور',
      description: 'تقييم تقدم الطلاب من قبل أولياء أمورهم'
    }
  ];

  return (
    <div className="welcome-page">
      <Helmet>
        <title>برنامج اندية القراءة المدرسية</title>
        <meta name="description" content="برنامج نادي الكتاب المدرسي - تعزيز القراءة والتعلم" />
      </Helmet>

      <section className="hero-section">
        <Container>
          <div className="hero-content text-center">
            <h1 className="main-title">مرحباً بكم في برنامج اندية القراءة المدرسية</h1>
            <p className="lead text-light">منصة تعليمية متكاملة لتعزيز القراءة والتعلم</p>
          </div>
        </Container>
      </section>

      <section className="about-section">
        <Container>
          <div className="section-content">
            <h2 className="section-title">عن البرنامج</h2>
            <p className="about-text">
              يهدف برنامج اندية القراءة المدرسية إلى تعزيز حب القراءة وتطوير المهارات اللغوية والفكرية
              لدى الطلاب من خلال برنامج متكامل يشمل القراءة والمناقشة والتقييم.
            </p>
          </div>
        </Container>
      </section>

      <section className="user-types-section">
        <Container>
          <h2 className="section-title">الدخول حسب نوع المستخدم</h2>
          <div className="user-types-grid">
            {userTypes.map((type, index) => (
              <div key={index} className="user-type-item">
                <span className="user-icon">{type.icon}</span>
                <h3>{type.title}</h3>
                <p>{type.description}</p>
                <Link to={type.path} className="login-button">
                  تسجيل الدخول
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="evaluation-section">
        <Container>
          <h2 className="section-title">نظام التقييم والمتابعة</h2>
          <div className="evaluation-grid">
            {evaluationTypes.map((type, index) => (
              <div key={index} className="evaluation-item">
                <h3>{type.title}</h3>
                <p>{type.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="features-section">
        <Container>
          <h2 className="section-title">مميزات البرنامج</h2>
          <div className="features-grid">
            <div className="feature-item">
              <h3>تحليل البيانات</h3>
              <p>تحليل شامل لنتائج التقييم ومستوى التقدم</p>
            </div>
            <div className="feature-item">
              <h3>تقارير تفصيلية</h3>
              <p>مخرجات كمية ونوعية لتقييم فعالية البرنامج</p>
            </div>
            <div className="feature-item">
              <h3>متابعة مستمرة</h3>
              <p>نظام متكامل لمتابعة تقدم الطلاب</p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
