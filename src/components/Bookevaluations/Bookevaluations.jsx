import React, { useContext, useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { DataContext } from '../../context/context';
import './bookevaluations.css';

export default function Bookevaluations() {
  const { getStudentBookRatings } = useContext(DataContext);
  const [ratings, setRatings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRatings = async () => {
      setIsLoading(true);
      try {
        const data = await getStudentBookRatings();
        if (data?.ratings) {
          setRatings(data.ratings);
        }
      } catch (error) {
        console.error('Error fetching ratings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRatings();
  }, [getStudentBookRatings]);

  const getRatingColor = (rating) => {
    if (rating >= 4) return 'good-rating';
    if (rating >= 3) return 'average-rating';
    return 'poor-rating';
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-message">جاري تحميل تقييمات الكتب...</div>
      </div>
    );
  }

  return (
    <div className="book-evaluations">
      <Container className="evaluation-container">
        <h1 className="evaluation-title">تقييمات الطلاب للكتب</h1>
        <div className="table-responsive">
          <Table className="evaluation-table" bordered hover>
            <thead>
              <tr>
                <th>اسم الطالب</th>
                <th>عنوان الكتاب</th>
                <th>توصية بالكتاب</th>
                <th>أسلوب الكاتب</th>
                <th>الأفكار الرئيسية</th>
                <th>أفكار اعجبتني</th>
                <th>الأفكار لم تعجبني</th>
                <th>اقتباسات مميزة</th>
                <th>إضافات مقترحة</th>
                <th>التأثير الشخصي</th>
                <th>تقييم الكتاب</th>
                <th>تاريخ البدء</th>
                <th>تاريخ الانتهاء</th>
              </tr>
            </thead>
            <tbody>
              {ratings.map((rating) => (
                <tr key={rating._id}>
                  <td>{rating.studentId.name}</td>
                  <td>{rating.bookId.title}</td>
                  <td className={rating.recommendBook === 'نعم' ? 'recommend-yes' : 'recommend-no'}>
                    {rating.recommendBook}
                  </td>
                  <td>{rating.authorStyle}</td>
                  <td>{rating.keyIdeas}</td>
                  <td>{rating.likedIdeas}</td>
                  <td>{rating.dislikedIdeas}</td>
                  <td>{rating.memorableQuotes}</td>
                  <td>{rating.potentialAdditions}</td>
                  <td>{rating.personalImpact}</td>
                  <td className={`rating-cell ${getRatingColor(rating.bookRating)}`}>
                    {rating.bookRating}/5
                  </td>
                  <td className="date-cell">
                    {new Date(rating.readingStartDate).toLocaleDateString('ar-EG')}
                  </td>
                  <td className="date-cell">
                    {new Date(rating.readingEndDate).toLocaleDateString('ar-EG')}
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