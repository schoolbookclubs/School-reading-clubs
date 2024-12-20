import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { FaBook, FaSmile, FaChalkboardTeacher, FaCheckCircle } from 'react-icons/fa';
import { DataContext } from '../../context/context';
import './Parentassessment.css';

const Parentassessment = () => {
  const { submitParentAssessment } = useContext(DataContext);
  
  const [ratings, setRatings] = useState({
    generalBehavior: null,
    readingEnthusiasm: null,
    readingInterests: null,
    communicationSkills: null,
    socialSkills: null,
    academicPerformance: null,
    criticalThinking: null
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showIntroduction, setShowIntroduction] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const assessmentQuestions = [
    { 
      key: 'generalBehavior', 
      text: 'لاحظت تحسن في سلوك ابني العام', 
      icon: <FaSmile className="question-icon" /> 
    },
    { 
      key: 'readingEnthusiasm', 
      text: 'زاد حماس ابني للقراءة والمطالعة', 
      icon: <FaBook className="question-icon" /> 
    },
    { 
      key: 'readingInterests', 
      text: 'تنوعت اهتمامات ابني القرائية', 
      icon: <FaBook className="question-icon" /> 
    },
    { 
      key: 'communicationSkills', 
      text: 'تطورت مهاراته في التواصل', 
      icon: <FaChalkboardTeacher className="question-icon" /> 
    },
    { 
      key: 'socialSkills', 
      text: 'اكتسب ابني مهارات اجتماعية بشكل ملحوظ', 
      icon: <FaSmile className="question-icon" /> 
    },
    { 
      key: 'academicPerformance', 
      text: 'انعكس انضمام ابني في النادي على مستواه الدراسي في بقية المواد بشكل إيجابي', 
      icon: <FaChalkboardTeacher className="question-icon" /> 
    },
    { 
      key: 'criticalThinking', 
      text: 'تطور تفكيره العام وحسه النقدي', 
      icon: <FaChalkboardTeacher className="question-icon" /> 
    }
  ];

  const handleRatingChange = (key, value) => {
    setRatings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const renderRatingBoxes = (key) => {
    return [1, 2, 3, 4, 5].map(num => (
      <div 
        key={num} 
        className={`rating-box ${ratings[key] === num ? 'selected' : ''}`}
        onClick={() => handleRatingChange(key, num)}
      >
        {num}
      </div>
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Prepare assessment data
      const assessmentData = {
        generalBehavior: ratings.generalBehavior,
        readingEnthusiasm: ratings.readingEnthusiasm,
        readingInterests: ratings.readingInterests,
        communicationSkills: ratings.communicationSkills,
        socialSkills: ratings.socialSkills,
        academicPerformance: ratings.academicPerformance,
        criticalThinking: ratings.criticalThinking
      };

      // Submit assessment
      await submitParentAssessment(assessmentData);

      // Show success modal
      setShowSuccessModal(true);
      
      // Reset ratings after successful submission
      setRatings({
        generalBehavior: null,
        readingEnthusiasm: null,
        readingInterests: null,
        communicationSkills: null,
        socialSkills: null,
        academicPerformance: null,
        criticalThinking: null
      });

    } catch (error) {
      setModalMessage({
        type: 'error',
        message: error.response?.data?.message || 'حدث خطأ أثناء إرسال التقييم'
      });
      setShowModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const IntroductionMessage = () => (
    <div className="introduction-message-container">
      <div className="introduction-message-card">
        <div className="introduction-message-icon">
          <i className="fas fa-book-reader"></i>
        </div>
        <h2 className="introduction-message-title">رسالة مهمة</h2>
        <p className="introduction-message-text">
          سيساعدنا تقييمكم على تطوير برنامج أندية القراءة المدرسية وقياس تأثيره على تحسين مستوى الطلاب المعرفي. 
          سينظر إلى النتائج بدون أسماء الطلاب، حيث أن الاستبيان لا يقيس مستوى الطالب وإنما نتائج البرنامج وتأثيره.
        </p>
        <p className="introduction-message-rating-guide">
          يرجى تقييم مدى رضاكم عن تجربة انضمام ابنكم لبرنامج أندية القراءة المدرسية 
          حيث 1 اقل تقييم و 5 اعلي تقييم
        </p>
        <button 
          className="introduction-message-button"
          onClick={() => setShowIntroduction(false)}
        >
          فهمت، متابعة
        </button>
      </div>
    </div>
  );

  const handleClose = () => setShowModal(false);

  return (
    <Container className="parent-assessment-container">
      {showIntroduction ? (
        <IntroductionMessage />
      ) : (
        <div>
          <Helmet>
            <title>تقييم الأداء | نادي القراءة المدرسي</title>
          </Helmet>

          <Row className="justify-content-center">
            <Col md={10}>
              <Card className="assessment-card">
                <Card.Header className="assessment-header">
                  <h2>تقييم أداء طفلي</h2>
                  <h4 className='text-light'>قيّم تأثير برنامج أندية القراءة المدرسية على تطور طفلك</h4>
                </Card.Header>

                <Card.Body>
                  <Form onSubmit={handleSubmit}>
                    {assessmentQuestions.map(question => (
                      <Form.Group key={question.key} className="mb-4 rating-group">
                        <Row>
                          <Col xs={12} md={8} className="d-flex align-items-center">
                            {question.icon}
                            <Form.Label className="rating-label">{question.text}</Form.Label>
                          </Col>
                          <Col xs={12} md={4} className="text-end rating-boxes-container">
                            {renderRatingBoxes(question.key)}
                          </Col>
                        </Row>
                      </Form.Group>
                    ))}

                    <div className="text-center mt-4">
                      <Button 
                        variant="primary" 
                        type="submit" 
                        className="submit-button"
                        disabled={isSubmitting || Object.values(ratings).some(rating => rating === null)}
                        style={{
                          opacity: isSubmitting ? 0.7 : 1,
                          cursor: isSubmitting ? 'not-allowed' : 'pointer'
                        }}
                      >
                        {isSubmitting ? 'جاري إرسال التقييم...' : 'إرسال التقييم'}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Success Modal */}
          <Modal 
            show={showSuccessModal} 
            onHide={() => setShowSuccessModal(false)}
            centered
            className="success-modal"
          >
            <Modal.Body className="text-center p-5">
              <FaCheckCircle className="success-icon mb-4" />
              <h2 className="success-title mb-3">تهانينا!</h2>
              <p className="success-message mb-4">
                شكرًا لمشاركتك في برنامج أندية القراءة المدرسية
              </p>
              <Button 
                variant="primary" 
                onClick={() => setShowSuccessModal(false)}
                className="close-button"
              >
                إغلاق
              </Button>
            </Modal.Body>
          </Modal>

          {/* Error Modal */}
          <Modal 
            show={showModal} 
            onHide={handleClose}
            centered
            dir="rtl"
          >
            <Modal.Header 
              style={{ 
                backgroundColor: modalMessage.type === 'success' ? '#4CAF50' : '#f44336',
                color: 'white',
                border: 'none'
              }}
            >
              <Modal.Title>
                {modalMessage.type === 'success' ? 'عملية ناجحة' : 'فشل ارسال التقييم'}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body
              style={{
                padding: '20px',
                fontSize: '1.1rem',
                textAlign: 'center'
              }}
            >
              {modalMessage.message}
            </Modal.Body>
          </Modal>
        </div>
      )}
    </Container>
  );
};

export default Parentassessment;
