import React, { useState } from 'react';
import {jwtDecode} from 'jwt-decode';
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

  const [submissionStatus, setSubmissionStatus] = useState({
    success: false,
    error: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const schoolCode = decodedToken.schoolCode;

      await submitReadingClubEvaluation({
        ...formData,
        schoolCode
      });
      setSubmissionStatus({ success: true, error: false });
      
      // Reset form after successful submission
      setFormData({
        readingPerspectiveChange: '',
        mostBeneficialAspect: '',
        readingSkillsImprovement: '',
        mostLikedAspect: '',
        leastLikedAspect: '',
        booksToAddToNextList: ''
      });

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSubmissionStatus({ success: false, error: false });
      }, 3000);

    } catch (error) {
      setSubmissionStatus({ success: false, error: true });
      
      // Hide error message after 3 seconds
      setTimeout(() => {
        setSubmissionStatus({ success: false, error: false });
      }, 3000);
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
    <div className="reading-club-evaluation-container">
      <div className="evaluation-card">
        {submissionStatus.success && (
          <div style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '15px',
            borderRadius: '10px',
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            تم إرسال تقييمك بنجاح!
          </div>
        )}

        {submissionStatus.error && (
          <div style={{
            backgroundColor: '#f44336',
            color: 'white',
            padding: '15px',
            borderRadius: '10px',
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            حدثت مشكلة أثناء إرسال التقييم
          </div>
        )}

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
              />
            </div>
          ))}
          
          <button type="submit" className="submit-button">
            إرسال التقييم
          </button>
        </form>
      </div>
    </div>
  );
}
