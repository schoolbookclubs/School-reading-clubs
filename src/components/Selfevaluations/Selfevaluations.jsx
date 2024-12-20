import React, { useContext, useEffect, useState } from 'react';
import { Container, Table, Form } from 'react-bootstrap';
import { DataContext } from '../../context/context';
import './selfevaluations.css';

export default function Selfevaluations() {
  const { getStudentSelfAssessments } = useContext(DataContext);
  const [assessments, setAssessments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState('');

  useEffect(() => {
    const fetchAssessments = async () => {
      setIsLoading(true);
      try {
        const response = await getStudentSelfAssessments();
        if (response && Array.isArray(response.assessments)) {
          setAssessments(response.assessments);
          // Extract unique books from assessments
          const uniqueBooks = [...new Map(response.assessments.map(assessment => 
            [assessment.book._id, assessment.book]
          )).values()];
          setBooks(uniqueBooks);
          if (uniqueBooks.length > 0) {
            setSelectedBook(uniqueBooks[0]._id);
          }
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

  const filteredAssessments = selectedBook
    ? assessments.filter(assessment => assessment.book._id === selectedBook)
    : assessments;

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

        <Form.Group className="mb-4">
          <Form.Label className="text-dark">اختر الكتاب:</Form.Label>
          <Form.Select
            value={selectedBook}
            onChange={(e) => setSelectedBook(e.target.value)}
            className="mb-3"
          >
            {books.map((book) => (
              <option key={book._id} value={book._id}>
                {book.title}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <div className="table-responsive">
          <Table className="evaluation-table" bordered hover>
            <thead>
              <tr>
                <th className='text-dark' rowSpan="2">معايير التقييم</th>
                <th style={{textAlign: 'center'}} className='text-dark ' colSpan={filteredAssessments.length}>اسم الطالب</th>
              </tr>
              <tr>
                {filteredAssessments.map((assessment) => (
                  <th key={`student-${assessment.student._id}`} className='text-dark text-center'>
                    {assessment.student.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>عنوان الكتاب</td>
                {filteredAssessments.map((assessment) => (
                  <td key={`book-${assessment.book._id}`}>{assessment.book.title}</td>
                ))}
              </tr>
              <tr>
                <td>استمتعت بالقراءة</td>
                {filteredAssessments.map((assessment) => (
                  <td key={`reading-${assessment.student._id}`} className={`rating-cell ${getRatingClass(assessment.ratings.enjoyedReading)}`}>
                    {assessment.ratings.enjoyedReading}
                  </td>
                ))}
              </tr>
              <tr>
                <td>قرأت كتباً مفيدة</td>
                {filteredAssessments.map((assessment) => (
                  <td key={`useful-${assessment.student._id}`} className={`rating-cell ${getRatingClass(assessment.ratings.readUsefulBooks)}`}>
                    {assessment.ratings.readUsefulBooks}
                  </td>
                ))}
              </tr>
              <tr>
                <td>كونت صداقات جديدة</td>
                {filteredAssessments.map((assessment) => (
                  <td key={`friends-${assessment.student._id}`} className={`rating-cell ${getRatingClass(assessment.ratings.madeNewFriends)}`}>
                    {assessment.ratings.madeNewFriends}
                  </td>
                ))}
              </tr>
              <tr>
                <td>المناقشات حسنت فهمي</td>
                {filteredAssessments.map((assessment) => (
                  <td key={`understanding-${assessment.student._id}`} className={`rating-cell ${getRatingClass(assessment.ratings.conversationsImprovedUnderstanding)}`}>
                    {assessment.ratings.conversationsImprovedUnderstanding}
                  </td>
                ))}
              </tr>
              <tr>
                <td>عبرت عن رأيي بحرية</td>
                {filteredAssessments.map((assessment) => (
                  <td key={`opinion-${assessment.student._id}`} className={`rating-cell ${getRatingClass(assessment.ratings.expressedOpinionFreely)}`}>
                    {assessment.ratings.expressedOpinionFreely}
                  </td>
                ))}
              </tr>
              <tr>
                <td>زادت ثقتي بنفسي</td>
                {filteredAssessments.map((assessment) => (
                  <td key={`confidence-${assessment.student._id}`} className={`rating-cell ${getRatingClass(assessment.ratings.increasedSelfConfidence)}`}>
                    {assessment.ratings.increasedSelfConfidence}
                  </td>
                ))}
              </tr>
              <tr>
                <td>سأشجع زملائي</td>
                {filteredAssessments.map((assessment) => (
                  <td key={`encourage-${assessment.student._id}`} className={`rating-cell ${getRatingClass(assessment.ratings.wouldEncourageClassmates)}`}>
                    {assessment.ratings.wouldEncourageClassmates}
                  </td>
                ))}
              </tr>
              <tr>
                <td>سأشارك العام القادم</td>
                {filteredAssessments.map((assessment) => (
                  <td key={`nextYear-${assessment.student._id}`} className={`rating-cell ${getRatingClass(assessment.ratings.willJoinNextYear)}`}>
                    {assessment.ratings.willJoinNextYear}
                  </td>
                ))}
              </tr>
              <tr>
                <td className='text-danger'>معدل التقييم</td>
                {filteredAssessments.map((assessment) => (
                  <td key={`average-${assessment.student._id}`} className={`average-rating ${getRatingClass(assessment.averageRating)} text-danger`}>
                    {assessment.averageRating.toFixed(1)}
                  </td>
                ))}
              </tr>
              <tr>
               
              </tr>
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
}