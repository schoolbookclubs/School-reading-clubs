import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { DataContext } from '../../context/context.js';
import { FaUser, FaEnvelope, FaSchool, FaIdBadge } from 'react-icons/fa';

export default function ProfileStudent() {
  const { decodeToken } = useContext(DataContext);
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedData = decodeToken(token);
        setStudentData(decodedData);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      setLoading(false);
    }
  }, [decodeToken]);

  if (loading) {
    return (
      <Container fluid className="vh-100 d-flex align-items-center justify-content-center" 
        style={{ 
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 9999
        }}
      >
        <div className="text-center">
          <div 
            className="mb-4 mx-auto" 
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(255, 255, 255, 0.18)'
            }}
          >
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
          <h2 className="display-5 text-white mb-3">جارٍ تحميل بياناتك</h2>
          <p className="lead text-white-50">
            يرجى الانتظار قليلاً... نحضر لك ملفك الشخصي
          </p>
        </div>
      </Container>
    );
  }

  return (
    <>
      <Helmet>
        <title>الملف الشخصي - نادي القراءة المدرسي</title>
      </Helmet>
      
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card 
              className="shadow-lg border-0" 
              style={{ 
                borderRadius: '20px', 
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
              }}
            >
              <div 
                className="p-5 text-center text-white" 
                style={{ 
                  background: 'rgba(255,255,255,0.2)', 
                  backdropFilter: 'blur(10px)' 
                }}
              >
                <div 
                  className="mx-auto mb-4" 
                  style={{
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
                  }}
                >
                  <FaUser style={{ fontSize: '4rem', color: 'white' }} />
                </div>
                <h2 className="display-6 mb-3">{studentData?.name || 'الملف الشخصي'}</h2>
                <Badge bg="light" text="dark" className="mb-3">
                  <FaUser className="me-2" />طالب
                </Badge>
              </div>

              <Card.Body className="p-5 bg-white">
                <Row className="mb-4">
                  <Col md={6} className="mb-3">
                    <div className="d-flex align-items-center">
                      <FaEnvelope className="me-3 text-primary" style={{ fontSize: '1.5rem' }} />
                      <div>
                        <h6 className="mb-1 text-muted text-end">البريد الإلكتروني</h6>
                        <p className="mb-0">{studentData?.email || 'غير متوفر'}</p>
                      </div>
                    </div>
                  </Col>
                  <Col md={6} className="mb-3">
                    <div className="d-flex align-items-center">
                      <FaIdBadge className="me-3 text-success" style={{ fontSize: '1.5rem' }} />
                      <div>
                        <h6 className="mb-1 text-muted">كود الطالب</h6>
                        <p className="mb-0">{studentData?.studentCode || 'غير متوفر'}</p>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <div className="d-flex align-items-center">
                      <FaSchool className="me-3 text-info" style={{ fontSize: '1.5rem' }} />
                      <div>
                        <h6 className="mb-1 text-muted">كود المدرسة</h6>
                        <p className="mb-0">{studentData?.schoolCode || 'غير متوفر'}</p>
                      </div>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="d-flex align-items-center">
                      <FaUser className="me-3 text-warning" style={{ fontSize: '1.5rem' }} />
                      <div>
                        <h6 className="mb-1 text-muted">الصف</h6>
                        <p className="mb-0">{studentData?.grade || 'غير متوفر'}</p>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
