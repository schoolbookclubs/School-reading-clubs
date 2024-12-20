import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faUserGraduate, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Student_Rates() {
    const navigate = useNavigate();

    return (
        <Container className="py-5">
            <Row className="g-4">
                <Col md={4}>
                    <Card 
                        className="h-100 shadow-sm hover-card text-center cursor-pointer"
                        onClick={() => navigate('/Student_SchoolBookRatings')}
                    >
                        <Card.Body className="d-flex flex-column">
                            <div className="text-primary mb-3">
                                <FontAwesomeIcon icon={faBook} size="3x" />
                            </div>
                            <Card.Title className="mb-3">تقييمات الكتب المدرسية</Card.Title>
                            <Card.Text className="text-muted">
                                مرجع لتقييماتك للكتب المقروءة وتحسين تجربة القراءة
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card 
                        className="h-100 shadow-sm hover-card text-center cursor-pointer"
                        onClick={() => navigate('/Student_SelfAssessments')}
                    >
                        <Card.Body className="d-flex flex-column">
                            <div className="text-success mb-3">
                                <FontAwesomeIcon icon={faUserGraduate} size="3x" />
                            </div>
                            <Card.Title className="mb-3">التقييمات الذاتية</Card.Title>
                            <Card.Text className="text-muted">
                                مرجع لتقييماتك الذاتية وتحسين تجربة القراءة
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card 
                        className="h-100 shadow-sm hover-card text-center cursor-pointer"
                        onClick={() => navigate('/Student_ReadingClubRatings')}
                    >
                        <Card.Body className="d-flex flex-column">
                            <div className="text-warning mb-3">
                                <FontAwesomeIcon icon={faUsers} size="3x" />
                            </div>
                            <Card.Title className="mb-3">تقييماتك علي اندية القراءة المدرسية</Card.Title>
                            <Card.Text className="text-muted">
                                مرجع لتقييماتك علي اندية القراءة المدرسية
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <style jsx>{`
                .hover-card {
                    transition: transform 0.3s ease-in-out;
                }
                .hover-card:hover {
                    transform: translateY(-5px);
                }
                .cursor-pointer {
                    cursor: pointer;
                }
            `}</style>
        </Container>
    );
}