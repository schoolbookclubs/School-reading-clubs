import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaBook, FaUserCheck, FaArrowLeft } from 'react-icons/fa';

export default function StudentReviewsofTeacherBooks() {
    const navigate = useNavigate();

    return (
        <div style={{ 
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            padding: '3rem 0',
            direction: 'rtl'
        }}>
            <Container>
                <h2 className="text-center mb-5" style={{
                    color: '#2c3e50',
                    fontWeight: 'bold',
                    fontSize: '2.5rem',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                }}>متابعة تقييمات الطلاب</h2>

                <Row className="justify-content-center g-4">
                    <Col xs={12} md={6}>
                        <Card 
                            className="h-100 review-card"
                            onClick={() => navigate('/Show_Student_SchoolBookRatings')}
                            style={{
                                borderRadius: '20px',
                                border: 'none',
                                boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                overflow: 'hidden',
                                background: 'white'
                            }}
                            onMouseOver={e => {
                                e.currentTarget.style.transform = 'translateY(-10px)';
                                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
                            }}
                            onMouseOut={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
                            }}
                        >
                            <div style={{
                                background: 'linear-gradient(45deg, #00b09b 0%, #96c93d 100%)',
                                padding: '2rem',
                                textAlign: 'center',
                                color: 'white'
                            }}>
                                <FaBook size={50} />
                                <h3 className="mt-3 mb-2 text-light">تقييمات الكتب</h3>
                                <p className="mb-0 text-light">متابعة تقييمات الطلاب للكتب المدرسية</p>
                            </div>
                            <Card.Body className="text-center">
                                <p style={{ fontSize: '1.1rem', color: '#666' }}>
                                    عرض جميع تقييمات الطلاب للكتب وآرائهم حولها
                                </p>
                                <div className="mt-3 d-flex align-items-center justify-content-center" style={{ color: '#00b09b' }}>
                                    <span className="me-2">عرض التقييمات</span>
                                    <FaArrowLeft />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col xs={12} md={6}>
                        <Card 
                            className="h-100 review-card"
                            onClick={() => navigate('/Show_Student_SelfAssessments')}
                            style={{
                                borderRadius: '20px',
                                border: 'none',
                                boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                overflow: 'hidden',
                                background: 'white'
                            }}
                            onMouseOver={e => {
                                e.currentTarget.style.transform = 'translateY(-10px)';
                                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
                            }}
                            onMouseOut={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
                            }}
                        >
                            <div style={{
                                background: 'linear-gradient(45deg, #FF512F 0%, #F09819 100%)',
                                padding: '2rem',
                                textAlign: 'center',
                                color: 'white'
                            }}>
                                <FaUserCheck size={50} />
                                <h3 className="mt-3 mb-2 text-light">التقييم الذاتي</h3>
                                <p className="mb-0 text-light">متابعة التقييمات الذاتية للطلاب</p>
                            </div>
                            <Card.Body className="text-center">
                                <p style={{ fontSize: '1.1rem', color: '#666' }}>
                                    عرض جميع التقييمات الذاتية للطلاب وتطورهم
                                </p>
                                <div className="mt-3 d-flex align-items-center justify-content-center" style={{ color: '#FF512F' }}>
                                    <span className="me-2">عرض التقييمات</span>
                                    <FaArrowLeft />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}