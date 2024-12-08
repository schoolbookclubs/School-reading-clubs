import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

export default function Dashboard() {
  return (
    <>
      <Helmet>
        <title>لوحة التحكم | نوادي القراءة المدرسية</title>
      </Helmet>
      
      <Container className="py-5">
        <h2 className="text-center mb-4">لوحة التحكم</h2>
        
        <Row className="g-4">
          <Col md={4}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title>إحصائيات النادي</Card.Title>
                <Card.Text>
                  <ul className="list-unstyled">
                    <li>عدد الطلاب: 0</li>
                    <li>عدد الكتب: 0</li>
                    <li>عدد المجموعات: 0</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={4}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title>النشاطات الحالية</Card.Title>
                <Card.Text>
                  <ul className="list-unstyled">
                    <li>مجموعات القراءة النشطة: 0</li>
                    <li>المناقشات الجارية: 0</li>
                    <li>التحديات القرائية: 0</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={4}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title>المهام</Card.Title>
                <Card.Text>
                  <ul className="list-unstyled">
                    <li>مهام معلقة: 0</li>
                    <li>تقارير للمراجعة: 0</li>
                    <li>طلبات الانضمام: 0</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
