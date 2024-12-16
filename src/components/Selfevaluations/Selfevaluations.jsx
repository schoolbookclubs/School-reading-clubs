import React, { useContext, useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { DataContext } from '../../context/context';
import './selfevaluations.css';

export default function Selfevaluations() {
  const { getStudentSelfAssessments } = useContext(DataContext);
  const [assessments, setAssessments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAssessments = async () => {
      setIsLoading(true);
      try {
        const response = await getStudentSelfAssessments();
        if (response && Array.isArray(response.assessments)) {
          setAssessments(response.assessments);
        } else {
          console.error('Invalid data format received:', response);
          setAssessments([]);
        }
      } catch (error) {
        console.error('Error fetching assessments:', error);
        setAssessments([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssessments();
  }, [getStudentSelfAssessments]);

  const getRatingClass = (rating) => {
    if (rating >= 4.5) return 'rating-excellent';
    if (rating >= 4) return 'rating-good';
    if (rating >= 3) return 'rating-average';
    return 'rating-poor';
  };

  const translateRatingField = (field) => {
    const translations = {
      enjoyedReading: 'استمتعت بالقراءة',
      readUsefulBooks: 'قرأت كتباً مفيدة',
      madeNewFriends: 'تعرفت على أصدقاء جدد',
      conversationsImprovedUnderstanding: 'زادت الحوارات من فهمي للكتب',
      expressedOpinionFreely: 'أستطعت التعبير عن رأيي بحرية',
      increasedSelfConfidence: 'زادت ثقتي بنفسي',
      wouldEncourageClassmates: 'سوف أشجع زملائي على الانضمام لنادي قراءة',
      willJoinNextYear: 'سوف أنضم لنادي القراءة السنة القادمة'
    };
    return translations[field] || field;
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-message">جاري تحميل التقييمات الذاتية...</div>
      </div>
    );
  }

  if (!assessments.length) {
    return (
      <div className="self-evaluations">
        <Container className="evaluation-container">
          <h1 className="evaluation-title">التقييمات الذاتية للطلاب</h1>
          <div className="no-data-message">لا توجد تقييمات متاحة</div>
        </Container>
      </div>
    );
  }

  return (
    <div className="self-evaluations">
      <Container className="evaluation-container">
        <h1 className="evaluation-title">التقييمات الذاتية للطلاب</h1>
        <div className="table-responsive">
          <Table className="evaluation-table" bordered hover>
            <thead>
              <tr>
                <th>اسم الطالب</th>
                <th>عنوان الكتاب</th>
                <th>استمتعت بالقراءة</th>
                <th>قرأت كتباً مفيدة</th>
                <th>كونت صداقات جديدة</th>
                <th>المناقشات حسنت فهمي</th>
                <th>عبرت عن رأيي بحرية</th>
                <th>زادت ثقتي بنفسي</th>
                <th>سأشجع زملائي</th>
                <th>سأشارك العام القادم</th>
                <th>معدل التقييم</th>
              </tr>
            </thead>
            <tbody>
              {assessments.map((assessment) => (
                <tr key={`${assessment.student._id}-${assessment.book._id}`}>
                  <td>{assessment.student.name}</td>
                  <td>{assessment.book.title}</td>
                  <td className={`rating-cell ${getRatingClass(assessment.ratings.enjoyedReading)}`}>
                    {assessment.ratings.enjoyedReading}/5
                  </td>
                  <td className={`rating-cell ${getRatingClass(assessment.ratings.readUsefulBooks)}`}>
                    {assessment.ratings.readUsefulBooks}/5
                  </td>
                  <td className={`rating-cell ${getRatingClass(assessment.ratings.madeNewFriends)}`}>
                    {assessment.ratings.madeNewFriends}/5
                  </td>
                  <td className={`rating-cell ${getRatingClass(assessment.ratings.conversationsImprovedUnderstanding)}`}>
                    {assessment.ratings.conversationsImprovedUnderstanding}/5
                  </td>
                  <td className={`rating-cell ${getRatingClass(assessment.ratings.expressedOpinionFreely)}`}>
                    {assessment.ratings.expressedOpinionFreely}/5
                  </td>
                  <td className={`rating-cell ${getRatingClass(assessment.ratings.increasedSelfConfidence)}`}>
                    {assessment.ratings.increasedSelfConfidence}/5
                  </td>
                  <td className={`rating-cell ${getRatingClass(assessment.ratings.wouldEncourageClassmates)}`}>
                    {assessment.ratings.wouldEncourageClassmates}/5
                  </td>
                  <td className={`rating-cell ${getRatingClass(assessment.ratings.willJoinNextYear)}`}>
                    {assessment.ratings.willJoinNextYear}/5
                  </td>
                  <td className={`average-rating ${getRatingClass(assessment.averageRating)}`}>
                    {assessment.averageRating.toFixed(1)}/5
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