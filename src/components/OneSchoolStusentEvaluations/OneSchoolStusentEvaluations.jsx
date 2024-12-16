import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaBook, FaUserCheck, FaUsers } from 'react-icons/fa';
import './oneschoolstudent.css';

export default function OneSchoolStusentEvaluations() {
  const navigate = useNavigate();

  const evaluationCards = [
    {
      title: 'بطاقات تقييم الكتب',
      description: 'عرض وإدارة تقييمات الطلاب للكتب المقروءة',
      icon: <FaBook className="card-icon books-card" />,
      path: '/admin/Bookevaluations',
      className: 'books-card'
    },
    {
      title: 'التقييمات الذاتية',
      description: 'متابعة التقييمات الذاتية للطلاب وتطورهم',
      icon: <FaUserCheck className="card-icon self-assessment-card" />,
      path: '/admin/Selfevaluations',
      className: 'self-assessment-card'
    },
    {
      title: 'تقييمات أندية القراءة',
      description: 'تقييمات الطلاب في أندية القراءة المدرسية',
      icon: <FaUsers className="card-icon reading-club-card" />,
      path: '/admin/Clubevaluations',
      className: 'reading-club-card'
    }
  ];

  return (
    <div className="student-evaluations">
      <Container>
        <h1 className="evaluation-title">تقييمات الطلاب</h1>
        <div className="cards-container">
          <Row className="justify-content-center">
            {evaluationCards.map((card, index) => (
              <Col key={index} xs={12} md={6} lg={4} className="mb-4">
                <Card 
                  className={`evaluation-card ${card.className}`}
                  onClick={() => navigate(card.path)}
                >
                  <Card.Body className="card-body">
                    {card.icon}
                    <Card.Title className="card-title">{card.title}</Card.Title>
                    <Card.Text className="card-text">
                      {card.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </div>
  );
}