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
          <div className="no-data-message">لا توجد تقييمات متاحة</div>
        </Container>
      </div>
    );
  }

  return (
    <div className="club-evaluations">
      <Container className="evaluation-container">
        <h1 className="evaluation-title">تقييمات نادي القراءة المدرسي</h1>
        <div className="table-responsive">
          <Table className="evaluation-table" bordered hover>
            <thead>
              <tr>
                <th>اسم الطالب</th>
                <th>اسم النادي</th>
                <th>كيف تغيرت نظرتك للقراءة بعد الانضمام للنادي؟</th>
                <th>ما هو أكثر شيء استفدت منه في النادي؟</th>
                <th>هل تشعر بتحسن في مهاراتك القرائية؟ كيف؟</th>
                <th>أكثر شيء أعجبك في النادي</th>
                <th>أكثر شيء لم يعجبك في النادي</th>
                <th>ما الكتب التي قرأتها وتريد أن تضيفها إلى قائمة نادي القراءة القادم</th>
              </tr>
            </thead>
            <tbody>
              {evaluations.map((evaluation) => (
                <tr key={evaluation._id}>
                  <td className="student-name">{evaluation.studentId.name}</td>
                  <td className="club-name">نادي القراءة المدرسي</td>
                  <td className="evaluation-text">{evaluation.readingPerspectiveChange}</td>
                  <td className="evaluation-text">{evaluation.mostBeneficialAspect}</td>
                  <td className="evaluation-text">{evaluation.readingSkillsImprovement}</td>
                  <td className="evaluation-text">{evaluation.mostLikedAspect}</td>
                  <td className="evaluation-text">{evaluation.leastLikedAspect}</td>
                  <td>
                    <ul className="books-list">
                      {evaluation.booksToAddToNextList.map((book, index) => (
                        <li key={index}>{book}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
}