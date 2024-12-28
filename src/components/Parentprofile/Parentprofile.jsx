import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import './Parentprofile.css';

const Parentprofile = () => {
  const [userData, setUserData] = useState({
    email: '',
    name: '',
    role: '',
    studentCode: '',
    phone: ''
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        // Decode token to get initial user data
        const decodedToken = jwtDecode(token);
        setUserData({
          email: decodedToken.email,
          name: decodedToken.name,
          role: decodedToken.role,
          studentCode: decodedToken.studentCode || 'غير محدد',
          phone: decodedToken.phone || 'غير محدد',
          studentName: decodedToken.studentName
        });
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  const handleEditProfile = async () => {
    try {
      // Implement profile update logic here
      // This is a placeholder - replace with actual API call
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'https://school-book-clubs-backend.vercel.app/api/parent/update', 
        editedData,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      // Update local state with new data
      setUserData(prev => ({...prev, ...editedData}));
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('حدث خطأ أثناء تحديث الملف الشخصي');
    }
  };
console.log("userData , " , userData)
  return (
    <>
      <Helmet>
        <title>الملف الشخصي | نادي القراءة المدرسي</title>
      </Helmet>

      <Container className="profile-container">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="profile-card">
              <Card.Header className="profile-header">
                <div className="profile-icon">
                  <i className="fas fa-user-circle"></i>
                </div>
                <h2>الملف الشخصي</h2>
              </Card.Header>
              
              <Card.Body>
                <Row className="profile-info">
                  <Col md={6} className="mb-3">
                    <strong>البريد الإلكتروني:</strong>
                    <p>{userData.email}</p>
                  </Col>
                  <Col md={6} className="mb-3">
                    <strong>الاسم:</strong>
                    <p>{userData.name}</p>
                  </Col>
                  <Col md={6} className="mb-3">
                    <strong>الدور:</strong>
                    <p>{userData.role}</p>
                  </Col>
                  <Col md={6} className="mb-3">
                    <strong>كود الطالب:</strong>
                    <p>{userData.studentCode}</p>
                  </Col>
                  <Col md={6} className="mb-3">
                    <strong>رقم الهاتف:</strong>
                    <p>{userData.phone}</p>
                  </Col>
                  <Col md={6} className="mb-3">
                    <strong>اسم الطالب:</strong>
                    <p>{userData.studentName}</p>
                  </Col>
                </Row>
              </Card.Body>
              
            </Card>
          </Col>
        </Row>

        {/* Edit Profile Modal */}
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>تعديل الملف الشخصي</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>البريد الإلكتروني</Form.Label>
                <Form.Control 
                  type="email" 
                  value={editedData.email || ''}
                  onChange={(e) => setEditedData(prev => ({...prev, email: e.target.value}))}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>الاسم</Form.Label>
                <Form.Control 
                  type="text" 
                  value={editedData.name || ''}
                  onChange={(e) => setEditedData(prev => ({...prev, name: e.target.value}))}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>رقم الهاتف</Form.Label>
                <Form.Control 
                  type="text" 
                  value={editedData.phone || ''}
                  onChange={(e) => setEditedData(prev => ({...prev, phone: e.target.value}))}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              إلغاء
            </Button>
            <Button variant="primary" onClick={handleEditProfile}>
              حفظ التغييرات
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default Parentprofile;
