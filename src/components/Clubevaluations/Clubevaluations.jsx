import React, { useContext, useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { DataContext } from '../../context/context';
import './clubevaluations.css';

export default function Clubevaluations() {
  const { getReadingClubEvaluations } = useContext(DataContext);
  const [evaluations, setEvaluations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvaluations = async () => {
      setIsLoading(true);
      try {
        const response = await getReadingClubEvaluations();
        if (response?.success && Array.isArray(response.data)) {
          setEvaluations(response.data);
        } else {
          console.error('Invalid data format received:', response);
          setEvaluations([]);
        }
      } catch (error) {
        console.error('Error fetching evaluations:', error);
        setEvaluations([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvaluations();
  }, [getReadingClubEvaluations]);

  const translateField = (field) => {
    const translations = {
      readingPerspectiveChange: 'كيف تغيرت نظرتك للقراءة بعد الانضمام للنادي؟',
      mostBeneficialAspect: 'ما هو أكثر شيء استفدت منه في النادي؟',
      readingSkillsImprovement: 'هل تشعر بتحسن في مهاراتك القرائية؟ كيف؟',
      mostLikedAspect: 'أكثر شيء أعجبك في النادي',
      leastLikedAspect: 'أكثر شيء لم يعجبك في النادي',
      booksToAddToNextList: 'ما الكتب التي قرأتها وتريد أن تضيفها إلى قائمة نادي القراءة القادم'
    };
    return translations[field] || field;
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-message">جاري تحميل تقييمات نادي القراءة...</div>
      </div>
    );
  }

  if (!evaluations.length) {
    return (
      <div className="club-evaluations">
        <Container className="evaluation-container">
          <h1 className="evaluation-title">تقييمات نادي القراءة المدرسي</h1>
          <div className="no-data-message text-dark">لا توجد تقييمات متاحة</div>
        </Container>
      </div>
    );
  }

  return (
    <div className="club-evaluations">
      <Container className="evaluation-container">
        <h1 className="evaluation-title">تقييمات نادي القراءة المدرسي</h1>
        <div className="table-responsive">
          <Table responsive bordered hover className="evaluation-table">
            <thead>
              <tr>
                <th className='text-dark fw-bold' style={{ fontSize: '20px' }}>التقييمات</th>
                {evaluations.map((evaluation) => (
                  <th key={evaluation._id} className="student-name text-dark fw-bold" style={{ fontSize: '20px' }}>{evaluation.studentId.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>كيف تغيرت نظرتك للقراءة بعد الانضمام للنادي؟</td>
                {evaluations.map((evaluation) => (
                  <td key={evaluation._id} className="evaluation-text">{evaluation.readingPerspectiveChange}</td>
                ))}
              </tr>
              <tr>
                <td>ما هو أكثر شيء استفدت منه في النادي؟</td>
                {evaluations.map((evaluation) => (
                  <td key={evaluation._id} className="evaluation-text">{evaluation.mostBeneficialAspect}</td>
                ))}
              </tr>
              <tr>
                <td>هل تشعر بتحسن في مهاراتك القرائية؟ كيف؟</td>
                {evaluations.map((evaluation) => (
                  <td key={evaluation._id} className="evaluation-text">{evaluation.readingSkillsImprovement}</td>
                ))}
              </tr>
              <tr>
                <td>أكثر شيء أعجبك في النادي</td>
                {evaluations.map((evaluation) => (
                  <td key={evaluation._id} className="evaluation-text">{evaluation.mostLikedAspect}</td>
                ))}
              </tr>
              <tr>
                <td>أكثر شيء لم يعجبك في النادي</td>
                {evaluations.map((evaluation) => (
                  <td key={evaluation._id} className="evaluation-text">{evaluation.leastLikedAspect}</td>
                ))}
              </tr>
              <tr>
                <td>ما الكتب التي قرأتها وتريد أن تضيفها إلى قائمة نادي القراءة القادم</td>
                {evaluations.map((evaluation) => (
                  <td key={evaluation._id}>
                    <ul className="books-list">
                      {evaluation.booksToAddToNextList.map((book, index) => (
                        <li key={index}>{book}</li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
             
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
}