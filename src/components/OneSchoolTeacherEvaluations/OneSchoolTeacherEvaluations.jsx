import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../context/context.js';
import { Container, Table, Row, Col, Form } from 'react-bootstrap';
import './oneschoolteacher.css';

export default function OneSchoolTeacherEvaluations() {
  const { getTeacherRatings } = useContext(DataContext);
  const [bookRatings, setBookRatings] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRatings = async () => {
      setIsLoading(true);
      try {
        const data = await getTeacherRatings();
        if (data && data.bookRatings) {
          setBookRatings(data.bookRatings);
          if (data.bookRatings.length > 0) {
            setSelectedBook(data.bookRatings[0]);
          }
        }
      } catch (error) {
        console.error('Error fetching ratings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRatings();
  }, [getTeacherRatings]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-message">جاري تحميل تقييمات المعلمين...</div>
      </div>
    );
  }

  const handleBookChange = (event) => {
    const book = bookRatings.find(b => b.bookTitle === event.target.value);
    setSelectedBook(book);
  };

  const renderRatingRow = (skillPath, label) => {
    if (!selectedBook || !selectedBook.ratings) return null;

    return (
      <tr>
        <td>{label}</td>
        <td>{selectedBook.ratings[0]?.teacher}</td>
        <td>{selectedBook.bookTitle}</td>
        {selectedBook.ratings.map((rating, index) => (
          <td key={index}>
            {skillPath.split('.').reduce((obj, key) => obj?.[key], rating.ratings)}
          </td>
        ))}
        <td className="text-danger">
          {selectedBook.skillAverages[skillPath]}
        </td>
      </tr>
    );
  };

  if (!selectedBook) {
    return <div className='text-center my-5 fw-bold fs-5'>لا توجد تقييمات متاحة</div>;
  }


  return (
    <Container fluid className="evaluation-container py-4">
      <Row className="justify-content-center mb-4">
        <Col xs={12} className="text-center">
          <h2 className="mb-4" style={{color: '#2c3e50', fontSize: '1.5rem'}}>
            عرض تقييمات المعلمين للطلاب من خلال كتبهم
          </h2>
          <div className="d-flex justify-content-center align-items-center gap-3">
            <Form.Select 
              style={{
                maxWidth: '400px',
                padding: '10px',
                borderRadius: '8px',
                border: '2px solid #3498db',
                backgroundColor: '#fff',
                color: '#2c3e50',
                fontSize: '1rem',
                appearance: 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                backgroundImage: 'none'
              }}
              value={selectedBook.bookTitle}
              onChange={handleBookChange}
              aria-label="اختر الكتاب"
            >
              {bookRatings.map((book, index) => (
                <option key={index} value={book.bookTitle}>
                  {book.bookTitle}
                </option>
              ))}
            </Form.Select>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12}>
          <h1 className="text-center mb-4 evaluation-title">تقييمات المعلمين</h1>
          <div className="table-responsive">
            <Table bordered hover className="evaluation-table">
              <thead>
                <tr className="text-center">
                  <th className="skill-header text-dark" rowSpan="2">المهارات</th>
                  <th colSpan="2" className='text-dark'>معلومات التقييم</th>
                  <th colSpan={selectedBook.ratings.length} className='text-dark'>الطلاب</th>
                  <th rowSpan="2" className='text-danger'>متوسط المهارة</th>
                </tr>
                <tr className="text-center">
                  <th className='text-dark'>المعلم</th>
                  <th className='text-dark'>الكتاب</th>
                  {selectedBook.ratings.map((rating, index) => (
                    <th key={index} className='text-dark'>{rating.student}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Reading Skills */}
                <tr>
                  <td colSpan={selectedBook.ratings.length + 4} className="skill-group-header" style={{fontSize: '1.1rem'}}>
                    مهارات القراءة والفهم
                  </td>
                </tr>
                {renderRatingRow('readingSkills.completeReading', 'يقرأ الكتاب قراءة تامة وواعية')}
                {renderRatingRow('readingSkills.deepUnderstanding', 'تعكس مشاركاته فهمًا عميقًا')}
                {renderRatingRow('readingSkills.personalReflection', 'يناقش تأثير النص على مواقفه ومعتقداته الشخصية')}

                {/* Confidence */}
                <tr>
                  <td colSpan={selectedBook.ratings.length + 4} className="skill-group-header" style={{fontSize: '1.1rem'}}>
                    الثقة بالنفس
                  </td>
                </tr>
                {renderRatingRow('confidence', 'يشارك بثقة ويعبر عن رأيه بحرية')}

                {/* Critical Thinking */}
                <tr>
                  <td colSpan={selectedBook.ratings.length + 4} className="skill-group-header" style={{fontSize: '1.1rem'}}>
                    التفكير النقدي والإبداعي
                  </td>
                </tr>
                {renderRatingRow('criticalThinking.creativeIdeas', 'يضيف أفكار وملاحظات خلاقة للنقاش')}
                {renderRatingRow('criticalThinking.connectingExperiences', 'يربط بين النصوص المقروءة وتجارب الحياة الواقعية')}
                {renderRatingRow('criticalThinking.independentThinking', 'يميز بين الأفكار وله رأي مستقل')}

                {/* Communication Skills */}
                <tr>
                  <td colSpan={selectedBook.ratings.length + 4} className="skill-group-header" style={{fontSize: '1.1rem'}}>
                    مهارات التواصل
                  </td>
                </tr>
                {renderRatingRow('communicationSkills.clearExpression', 'يعبر عن أفكاره بلغة واضحة ودقيقة')}
                {renderRatingRow('communicationSkills.activeListening', 'يصغي إلى أقرانه باهتمام')}
                {renderRatingRow('communicationSkills.constructiveFeedback', 'يتفاعل مع آراء الآخرين بطرح أسئلة أو تقديم ردود بناءة')}

                {/* Social Skills */}
                <tr>
                  <td colSpan={selectedBook.ratings.length + 4} className="skill-group-header" style={{fontSize: '1.1rem'}}>
                    المهارات الاجتماعية
                  </td>
                </tr>
                {renderRatingRow('socialSkills.activeParticipation', 'يشارك بفعالية في النقاشات والأنشطة ')}
                {renderRatingRow('socialSkills.respectingDiversity', 'يحترم وجهات النظر المختلفة ')}
                {renderRatingRow('socialSkills.buildingFriendships', 'يكون صداقات بناءة مع أقرانه')}

                {/* General Behavior */}
                <tr>
                  <td colSpan={selectedBook.ratings.length + 4} className="skill-group-header" style={{fontSize: '1.1rem'}}>
                    السلوك العام
                  </td>
                </tr>
                {renderRatingRow('generalBehavior.collaboration', 'يتعاون مع زملائه ويشجعهم ويعزز التفاعل الإيجابي')}

                {/* Student Average Row */}
                <tr className="student-average-row">
                  <td className='text-danger'>متوسط تقييم الطالب</td>
                  <td>{selectedBook.ratings[0]?.teacher}</td>
                  <td>{selectedBook.bookTitle}</td>
                  {selectedBook.ratings.map((rating, index) => (
                    <td key={index} className="text-danger">{rating.studentAverageRating.toFixed(2)}</td>
                  ))}
                  <td className="text-danger">{selectedBook.overallAverage.toFixed(2)}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
