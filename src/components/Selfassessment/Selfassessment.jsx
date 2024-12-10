import React, { useState, useContext } from 'react';
import { Container, Row, Col, Button, Card, Spinner } from 'react-bootstrap';
import { FaStar, FaCheckCircle } from 'react-icons/fa';
import { DataContext } from '../../context/context.js';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import './Selfassessment.css';

const Selfassessment = () => {
  const navigate = useNavigate();
  const { submitStudentSelfAssessment } = useContext(DataContext);
  const [ratings, setRatings] = useState({
    enjoyedReading: 0,
    readUsefulBooks: 0,
    madeNewFriends: 0,
    conversationsImprovedUnderstanding: 0,
    expressedOpinionFreely: 0,
    increasedSelfConfidence: 0,
    wouldEncourageClassmates: 0,
    willJoinNextYear: 0
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const assessmentQuestions = [
    { key: 'enjoyedReading', text: 'استمتعت بالقراءة' },
    { key: 'readUsefulBooks', text: 'قرأت كتبًا مفيدة' },
    { key: 'madeNewFriends', text: 'تعرفت على أصدقاء جدد' },
    { key: 'conversationsImprovedUnderstanding', text: 'زادت الحوارات من فهمي للكتب' },
    { key: 'expressedOpinionFreely', text: 'أستطعت التعبير عن رأيي بحرية' },
    { key: 'increasedSelfConfidence', text: 'زادت ثقتي بنفسي' },
    { key: 'wouldEncourageClassmates', text: 'سوف أشجع زملائي على الانضمام لنادي قراءة' },
    { key: 'willJoinNextYear', text: 'سوف أنضم لنادي القراءة السنة القادمة' }
  ];

  const handleRatingChange = (key, rating) => {
    setRatings(prev => ({
      ...prev,
      [key]: rating
    }));
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      
      // Get student ID from token
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const decodedToken = jwtDecode(token);
      const studentId = decodedToken.id;

      if (!studentId) {
        throw new Error('Unable to extract student ID from token');
      }

      // Prepare assessment data
      const assessmentData = {
        studentId,
        enjoyedReading: ratings.enjoyedReading,
        readUsefulBooks: ratings.readUsefulBooks,
        madeNewFriends: ratings.madeNewFriends,
        conversationsImprovedUnderstanding: ratings.conversationsImprovedUnderstanding,
        expressedOpinionFreely: ratings.expressedOpinionFreely,
        increasedSelfConfidence: ratings.increasedSelfConfidence,
        wouldEncourageClassmates: ratings.wouldEncourageClassmates,
        willJoinNextYear: ratings.willJoinNextYear
      };

      // Submit assessment
      await submitStudentSelfAssessment(assessmentData);
      
      // Show success state
      setSubmitted(true);
    } catch (error) {
      console.error('Failed to submit self assessment:', error);
      alert(error.response?.data?.message || error.message || 'حدث خطأ أثناء إرسال التقييم. يرجى المحاولة مرة أخرى.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    // Navigate back to dashboard
    navigate('/dashboard');
  };

  const RatingStars = ({ value, onChange }) => {
    return (
      <div className="rating-stars">
        {[1, 2, 3, 4, 5].map(star => (
          <FaStar 
            key={star} 
            className={`star ${value >= star ? 'active' : ''}`}
            onClick={() => onChange(star)}
          />
        ))}
      </div>
    );
  };

  if (submitted) {
    return (
      <Container className="success-container">
        <Card className="success-card">
          <div className="success-content">
            <FaCheckCircle className="success-icon" />
            <h2>شكرًا لك!</h2>
            <p>لقد أكملت التقييم الذاتي بنجاح</p>
            <Button 
              variant="primary" 
              onClick={handleClose}
              className="close-button"
            >
              إغلاق
            </Button>
          </div>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="selfassessment-container">
      <Card className="assessment-card">
        <Card.Header>
          <h2>التقييم الذاتي للطالب</h2>
          <h4 className='text-light'>قيّم تجربتك في أندية القراءة المدرسية</h4>
        </Card.Header>
        <Card.Body>
          {assessmentQuestions.map(question => (
            <Row key={question.key} className="assessment-row">
              <Col xs={12} md={8}>
                <span className="question-text">{question.text}</span>
              </Col>
              <Col xs={12} md={4}>
                <RatingStars 
                  value={ratings[question.key]} 
                  onChange={(rating) => handleRatingChange(question.key, rating)}
                />
              </Col>
            </Row>
          ))}
        </Card.Body>
        <Card.Footer>
          <Button 
            variant="primary" 
            onClick={handleSubmit}
            disabled={submitting || Object.values(ratings).some(rating => rating === 0)}
            className="submit-button"
          >
            {submitting ? (
              <>
                <Spinner 
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="mr-2"
                />
                جارٍ الإرسال...
              </>
            ) : (
              'إرسال التقييم'
            )}
          </Button>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default Selfassessment;
