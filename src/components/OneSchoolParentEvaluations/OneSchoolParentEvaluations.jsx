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
          <div className="no-data-message text-dark">لا توجد تقييمات متاحة</div>
        </Container>
      </div>
    );
  }

  return (
    <div className="parent-evaluations">
      <Container className="evaluation-container">
        <h1 className="evaluation-title">تقييمات أولياء الأمور</h1>
        <div className="table-responsive">
          <Table responsive bordered hover className="evaluation-table">
            <thead>
              <tr>
                <th className="text-dark fw-bold" style={{ fontSize: '20px' }}>التقييمات</th>
                {assessments.map((assessment) => (
                  <th key={assessment._id} className="text-dark fw-bold" style={{ fontSize: '20px' }}>
                    {assessment.parent.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>كود الطالب</td>
                {assessments.map((assessment) => (
                  <td key={assessment._id} className="student-code text-center">
                    {assessment.parent.studentcodeinparent}
                  </td>
                ))}
              </tr>
              <tr>
                <td>السلوك العام</td>
                {assessments.map((assessment) => (
                  <td key={assessment._id} className={`rating-cell ${getRatingClass(assessment.ratings.generalBehavior)} text-center`}>
                    {assessment.ratings.generalBehavior}
                    <span className="rating-label">{translateRating('generalBehavior')}</span>
                  </td>
                ))}
              </tr>
              <tr>
                <td>الشغف بالقراءة</td>
                {assessments.map((assessment) => (
                  <td key={assessment._id} className={`rating-cell ${getRatingClass(assessment.ratings.readingEnthusiasm)} text-center`}>
                    {assessment.ratings.readingEnthusiasm}
                    <span className="rating-label">{translateRating('readingEnthusiasm')}</span>
                  </td>
                ))}
              </tr>
              <tr>
                <td>الاهتمامات القرائية</td>
                {assessments.map((assessment) => (
                  <td key={assessment._id} className={`rating-cell ${getRatingClass(assessment.ratings.readingInterests)} text-center`}>
                    {assessment.ratings.readingInterests}
                    <span className="rating-label">{translateRating('readingInterests')}</span>
                  </td>
                ))}
              </tr>
              <tr>
                <td>مهارات التواصل</td>
                {assessments.map((assessment) => (
                  <td key={assessment._id} className={`rating-cell ${getRatingClass(assessment.ratings.communicationSkills)} text-center`}>
                    {assessment.ratings.communicationSkills}
                    <span className="rating-label">{translateRating('communicationSkills')}</span>
                  </td>
                ))}
              </tr>
              <tr>
                <td>المهارات الاجتماعية</td>
                {assessments.map((assessment) => (
                  <td key={assessment._id} className={`rating-cell ${getRatingClass(assessment.ratings.socialSkills)} text-center`}>
                    {assessment.ratings.socialSkills}
                    <span className="rating-label">{translateRating('socialSkills')}</span>
                  </td>
                ))}
              </tr>
              <tr>
                <td>الأداء الأكاديمي</td>
                {assessments.map((assessment) => (
                  <td key={assessment._id} className={`rating-cell ${getRatingClass(assessment.ratings.academicPerformance)} text-center`}>
                    {assessment.ratings.academicPerformance}
                    <span className="rating-label">{translateRating('academicPerformance')}</span>
                  </td>
                ))}
              </tr>
              <tr>
                <td>التفكير النقدي</td>
                {assessments.map((assessment) => (
                  <td key={assessment._id} className={`rating-cell ${getRatingClass(assessment.ratings.criticalThinking)} text-center`}>
                    {assessment.ratings.criticalThinking}
                    <span className="rating-label">{translateRating('criticalThinking')}</span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="fw-bold">متوسط التقييم</td>
                {assessments.map((assessment) => (
                  <td key={assessment._id} className={`average-rating ${getRatingClass(assessment.averageRating)} text-center`}>
                    {assessment.averageRating.toFixed(1)}
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
