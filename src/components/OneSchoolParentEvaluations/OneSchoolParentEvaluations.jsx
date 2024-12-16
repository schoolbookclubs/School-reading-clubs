import React, { useContext, useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { DataContext } from '../../context/context';
import './oneschoolparent.css';

export default function OneSchoolParentEvaluations() {
  const { getParentAssessments } = useContext(DataContext);
  const [assessments, setAssessments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAssessments = async () => {
      setIsLoading(true);
      try {
        const response = await getParentAssessments();
        if (response?.assessments) {
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
  }, [getParentAssessments]);

  const getRatingClass = (rating) => {
    if (rating >= 4.5) return 'rating-excellent';
    if (rating >= 4) return 'rating-good';
    if (rating >= 3) return 'rating-average';
    return 'rating-poor';
  };

  const translateRating = (field) => {
    const translations = {
      generalBehavior: 'لاحظت تحسن في سلوك ابني العام',
      readingEnthusiasm: 'زاد حماس ابني للقراءة والمطالعة',
      readingInterests: 'تنوعت اهتمامات ابني القرائية',
      communicationSkills: 'تطورت مهاراته في التواصل',
      socialSkills: 'اكتسب ابني مهارات اجتماعية بشكل ملحوظ',
      academicPerformance: 'انعكس انضمام ابني في النادي على مستواه الدراسي في بقية المواد بشكل إيجابي',
      criticalThinking: 'تطور تفكيره العام وحسه النقدي'
    };
    return translations[field] || field;
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-message">جاري تحميل تقييمات أولياء الأمور...</div>
      </div>
    );
  }

  if (!assessments.length) {
    return (
      <div className="parent-evaluations">
        <Container className="evaluation-container">
          <h1 className="evaluation-title">تقييمات أولياء الأمور</h1>
          <div className="no-data-message">لا توجد تقييمات متاحة</div>
        </Container>
      </div>
    );
  }

  return (
    <div className="parent-evaluations">
      <Container className="evaluation-container">
        <h1 className="evaluation-title">تقييمات أولياء الأمور</h1>
        <div className="table-responsive">
          <Table className="evaluation-table" bordered hover>
            <thead>
              <tr>
                <th>اسم ولي الأمر</th>
                <th>كود الطالب</th>
                <th>السلوك العام</th>
                <th>حماس القراءة</th>
                <th>الاهتمامات القرائية</th>
                <th>مهارات التواصل</th>
                <th>المهارات الاجتماعية</th>
                <th>المستوى الدراسي</th>
                <th>التفكير النقدي</th>
                <th>متوسط التقييم</th>
              </tr>
            </thead>
            <tbody>
              {assessments.map((assessment) => (
                <tr key={assessment.parent._id}>
                  <td className="parent-name">{assessment.parent.name}</td>
                  <td className="student-code">{assessment.parent.studentcodeinparent}</td>
                  <td className={`rating-cell ${getRatingClass(assessment.ratings.generalBehavior)} text-center`}>
                    {assessment.ratings.generalBehavior}/5
                    <span className="rating-label">{translateRating('generalBehavior')}</span>
                  </td>
                  <td className={`rating-cell ${getRatingClass(assessment.ratings.readingEnthusiasm)} text-center`}>
                    {assessment.ratings.readingEnthusiasm}/5
                    <span className="rating-label">{translateRating('readingEnthusiasm')}</span>
                  </td>
                  <td className={`rating-cell ${getRatingClass(assessment.ratings.readingInterests)} text-center`}>
                    {assessment.ratings.readingInterests}/5
                    <span className="rating-label">{translateRating('readingInterests')}</span>
                  </td>
                  <td className={`rating-cell ${getRatingClass(assessment.ratings.communicationSkills)} text-center`}>
                    {assessment.ratings.communicationSkills}/5
                    <span className="rating-label">{translateRating('communicationSkills')}</span>
                  </td>
                  <td className={`rating-cell ${getRatingClass(assessment.ratings.socialSkills)} text-center`}>
                    {assessment.ratings.socialSkills}/5
                    <span className="rating-label">{translateRating('socialSkills')}</span>
                  </td>
                  <td className={`rating-cell ${getRatingClass(assessment.ratings.academicPerformance)} text-center`}>
                    {assessment.ratings.academicPerformance}/5
                    <span className="rating-label">{translateRating('academicPerformance')}</span>
                  </td>
                  <td className={`rating-cell ${getRatingClass(assessment.ratings.criticalThinking)} text-center`}>
                    {assessment.ratings.criticalThinking}/5
                    <span className="rating-label">{translateRating('criticalThinking')}</span>
                  </td>
                  <td className={`average-rating ${getRatingClass(assessment.averageRating)} text-center`}>
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
