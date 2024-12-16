import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../context/context';
import { Container, Table, Row, Col } from 'react-bootstrap';
import './oneschoolteacher.css';

export default function OneSchoolTeacherEvaluations() {
  const { getTeacherRatings } = useContext(DataContext);
  const [ratings, setRatings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRatings = async () => {
      setIsLoading(true);
      try {
        const data = await getTeacherRatings();
        if (data) {
          setRatings(data.detailedRatings);
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

  return (
    <Container fluid className="evaluation-container py-4">
      <Row className="justify-content-center">
        <Col xs={12}>
          <h1 className="text-center mb-4 evaluation-title">تقييمات المعلمين</h1>
          <div className="table-responsive">
            <Table bordered hover className="evaluation-table">
              <thead>
                <tr className="text-center">
                  <th className="name-column" rowSpan="2">اسم المعلم</th>
                  <th className="name-column" rowSpan="2">اسم الطالب</th>
                  <th colSpan="3" className="text-center group-header">مهارات القراءة والفهم</th>
                  <th colSpan="1" className="text-center group-header">الثقة بالنفس</th>
                  <th colSpan="3" className="text-center group-header">التفكير النقدي والإبداعي</th>
                  <th colSpan="3" className="text-center group-header">مهارات التواصل</th>
                  <th colSpan="3" className="text-center group-header">المهارات الاجتماعية</th>
                  <th colSpan="1" className="text-center group-header">السلوك العام</th>
                  <th className="average-column" rowSpan="2">متوسط التقييمات</th>
                </tr>
                <tr className="text-center">
                  <th>يقرأ الكتاب قراءة تامة وواعية</th>
                  <th>تعكس مشاركاته فهمًا عميقًا</th>
                  <th>يناقش تأثير النص على مواقفه ومعتقداته الشخصية</th>
                  <th>يشارك بثقة ويعبر عن رأيه بحرية</th>
                  <th>يضيف أفكار وملاحظات خلاقة للنقاش</th>
                  <th>يربط بين النصوص المقروءة وتجارب الحياة الواقعية</th>
                  <th>يميز بين الأفكار وله رأي مستقل</th>
                  <th>يعبر عن أفكاره بلغة واضحة ودقيقة</th>
                  <th>يصغي إلى أقرانه باهتمام</th>
                  <th>يتفاعل مع آراء الآخرين بطرح أسئلة أو تقديم ردود بناءة</th>
                  <th>يشارك بفعالية في النقاشات والأنشطة </th>
                  <th>يحترم وجهات النظر المختلفة </th>
                  <th>يكون صداقات بناءة مع أقرانه</th>
                  <th>يتعاون مع زملائه ويشجعهم ويعزز التفاعل الإيجابي</th>
                </tr>
              </thead>
              <tbody>
                {ratings.map((rating, index) => (
                  <tr key={index} className="text-center">
                    <td className="name-column">{rating.teacher.name}</td>
                    <td className="name-column">{rating.student.name}</td>
                    <td className='text-center'>{rating.ratings.readingSkills.completeReading}</td>
                    <td className='text-center'>{rating.ratings.readingSkills.deepUnderstanding}</td>
                    <td className='text-center'>{rating.ratings.readingSkills.personalReflection}</td>
                    <td className='text-center'>{rating.ratings.confidence}</td>
                    <td className='text-center'>{rating.ratings.criticalThinking.creativeIdeas}</td>
                    <td className='text-center'>{rating.ratings.criticalThinking.connectingExperiences}</td>
                    <td className='text-center'>{rating.ratings.criticalThinking.independentThinking}</td>
                    <td className='text-center'>{rating.ratings.communicationSkills.clearExpression}</td>
                    <td className='text-center'>{rating.ratings.communicationSkills.activeListening}</td>
                    <td className='text-center'>{rating.ratings.communicationSkills.constructiveFeedback}</td>
                    <td className='text-center'>{rating.ratings.socialSkills.activeParticipation}</td>
                    <td className='text-center'>{rating.ratings.socialSkills.respectingDiversity}</td>
                    <td className='text-center'>{rating.ratings.socialSkills.buildingFriendships}</td>
                    <td className='text-center'>{rating.ratings.generalBehavior.collaboration}</td>
                    <td className="average-column">{rating.averageRating.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
