import React, { useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import { Modal } from 'react-bootstrap';
import { submitReadingClubEvaluation } from '../../context/EvaluationContext';
import './ReadingClubEvaluation.css';

export default function ReadingClubEvaluation() {
  const [formData, setFormData] = useState({
    readingPerspectiveChange: '',
    mostBeneficialAspect: '',
    readingSkillsImprovement: '',
    mostLikedAspect: '',
    leastLikedAspect: '',
    booksToAddToNextList: ''
  });

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const schoolCode = decodedToken.schoolCode;

      const response = await submitReadingClubEvaluation({
        ...formData,
        schoolCode
      });

      setModalMessage({
        type: 'success',
        message: 'تم إرسال تقييمك بنجاح!'
      });
      setShowModal(true);
      
      // Reset form after successful submission
      setFormData({
        readingPerspectiveChange: '',
        mostBeneficialAspect: '',
        readingSkillsImprovement: '',
        mostLikedAspect: '',
        leastLikedAspect: '',
        booksToAddToNextList: ''
      });

      // Hide modal after 2 seconds
      setTimeout(() => {
        setShowModal(false);
      }, 2000);

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

  const questions = [
    { 
      label: 'كيف تغيرت نظرتك للقراءة بعد الانضمام للنادي؟', 
      name: 'readingPerspectiveChange' 
    },
    { 
      label: 'ما هو أكثر شيء استفدت منه في النادي؟', 
      name: 'mostBeneficialAspect' 
    },
    { 
      label: 'هل تشعر بتحسن في مهاراتك القرائية؟ كيف؟', 
      name: 'readingSkillsImprovement' 
    },
    { 
      label: 'أكثر شيء أعجبك في النادي', 
      name: 'mostLikedAspect' 
    },
    { 
      label: 'أكثر شيء لم يعجبك في النادي', 
      name: 'leastLikedAspect' 
    },
    { 
      label: 'ما الكتب التي قرأتها وتريد أن تضيفها إلى قائمة نادي القراءة القادم', 
      name: 'booksToAddToNextList' 
    }
  ];

  return (
    <div className="" style={{  
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
      fontFamily: 'Tajawal, sans-serif',
      direction: 'rtl',
      padding: '2rem'
    }}>
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

      <div className="" style={{ 
        backgroundColor: 'white',
        borderRadius: '20px',
        boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '700px',
        padding: '2.5rem',
        animation: 'fadeIn 0.6s ease-out'
      }}>
        <h1 className="evaluation-title">تقييم نادي القراءة</h1>
        
        <form onSubmit={handleSubmit}>
          {questions.map(({ label, name }) => (
            <div key={name} className="form-group">
              <label htmlFor={name} className="form-label">{label}</label>
              <textarea
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="form-textarea"
                placeholder="اكتب إجابتك هنا..."
                required
                disabled={isSubmitting}
              />
            </div>
          ))}
          
          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
            style={{
              opacity: isSubmitting ? 0.7 : 1,
              cursor: isSubmitting ? 'not-allowed' : 'pointer'
            }}
          >
            {isSubmitting ? 'جاري إرسال التقييم...' : 'إرسال التقييم'}
          </button>
        </form>
      </div>
    </div>
  );
}
