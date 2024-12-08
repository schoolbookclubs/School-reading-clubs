import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Container, Button } from 'react-bootstrap';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Container fluid style={styles.container}>
      <Helmet>
        <title>الصفحة غير موجودة - أندية القراءة المدرسية</title>
        <meta name="description" content="صفحة غير موجودة - أندية القراءة المدرسية" />
      </Helmet>
      
      <div style={styles.content}>
        <div style={styles.bookIcon}>📚</div>
        <h1 style={styles.header}>404</h1>
        <h2 style={styles.subHeader}>عذراً، هذه الصفحة غير موجودة</h2>
        <p style={styles.text}>
          يبدو أنك قد وصلت إلى صفحة غير موجودة في مكتبتنا
        </p>
        <p style={styles.text}>
          دعنا نعود إلى الصفحة الرئيسية لنواصل رحلة القراءة والمعرفة
        </p>
        <Button 
          variant="primary"
          size="lg"
          style={styles.button}
          onClick={() => navigate('/')}
        >
          العودة للصفحة الرئيسية
        </Button>
      </div>
    </Container>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
    textAlign: 'center',
    direction: 'rtl'
  },
  content: {
    padding: '2rem',
    borderRadius: '15px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    margin: '0 auto'
  },
  bookIcon: {
    fontSize: '64px',
    marginBottom: '1rem'
  },
  header: {
    fontSize: '72px',
    color: '#0d6efd',
    marginBottom: '0.5rem',
    fontWeight: 'bold'
  },
  subHeader: {
    fontSize: '28px',
    color: '#495057',
    marginBottom: '1.5rem',
    fontWeight: 'bold'
  },
  text: {
    fontSize: '18px',
    color: '#6c757d',
    marginBottom: '1rem',
    lineHeight: '1.6'
  },
  button: {
    marginTop: '1.5rem',
    padding: '0.8rem 2rem',
    fontSize: '18px',
    borderRadius: '8px',
    backgroundColor: '#0d6efd',
    border: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px rgba(13, 110, 253, 0.2)',
    '&:hover': {
      backgroundColor: '#0b5ed7',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 8px rgba(13, 110, 253, 0.3)'
    }
  }
};
