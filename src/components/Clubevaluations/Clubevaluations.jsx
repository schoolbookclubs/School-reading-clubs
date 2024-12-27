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
          console.log("responseclubevaluations , " , response);
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

  const evaluationQuestions = [
    { field: 'readingPerspectiveChange', label: 'كيف تغيرت نظرتك للقراءة بعد الانضمام للنادي؟' },
    { field: 'mostBeneficialAspect', label: 'ما هو أكثر شيء استفدت منه في النادي؟' },
    { field: 'readingSkillsImprovement', label: 'هل تشعر بتحسن في مهاراتك القرائية؟ كيف؟' },
    { field: 'mostLikedAspect', label: 'أكثر شيء أعجبك في النادي' },
    { field: 'leastLikedAspect', label: 'أكثر شيء لم يعجبك في النادي' },
    { field: 'booksToAddToNextList', label: 'الكتب المقترحة للقائمة القادمة', isList: true }
  ];

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
          <h1 className="evaluation-title">تقييمات الطلاب علي أندية القراءة المدرسية</h1>
          <div className="no-data-message text-dark">لا توجد تقييمات متاحة</div>
        </Container>
      </div>
    );
  }

  return (
    <div className="club-evaluations">
      <Container className="evaluation-container">
        <h1 className="evaluation-title">تقييمات الطلاب علي أندية القراءة المدرسية</h1>
        <div className="table-responsive">
          <Table responsive bordered hover className="evaluation-table">
            <thead>
              <tr>
                <th className='text-dark fw-bold text-center' style={{ fontSize: '18px', width: '25%' }}>التقييمات</th>
                {evaluations.map((evaluation) => (
                  <th 
                    key={evaluation._id} 
                    className="text-dark fw-bold text-center" 
                    style={{ fontSize: '18px' }}
                  >
                    {evaluation.studentId.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {evaluationQuestions.map(({ field, label, isList }) => (
                <tr key={field}>
                  <td className="fw-bold text-dark">{label}</td>
                  {evaluations.map((evaluation) => (
                    <td 
                      key={`${field}-${evaluation._id}`} 
                      className="evaluation-text"
                      style={{ textAlign: 'right', padding: '10px' }}
                    >
                      {isList ? (
                        <ul className="books-list" style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                          {evaluation[field]
                            .filter(book => book && book.trim())
                            .map((book, index) => (
                              <li key={index} style={{ marginBottom: '5px' }}>{book}</li>
                            ))}
                        </ul>
                      ) : (
                        evaluation[field]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
}