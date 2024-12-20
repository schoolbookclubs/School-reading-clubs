import React, { useContext, useEffect, useState } from 'react';
import { Container, Table, Form } from 'react-bootstrap';
import { DataContext } from '../../context/context';
import './bookevaluations.css';

export default function Bookevaluations() {
  const { getStudentBookRatings } = useContext(DataContext);
  const [ratings, setRatings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState('');

  useEffect(() => {
    const fetchRatings = async () => {
      setIsLoading(true);
      try {
        const data = await getStudentBookRatings();
        if (data?.ratings) {
          setRatings(data.ratings);
          // Extract unique books from ratings
          const uniqueBooks = [...new Set(data.ratings.map(rating => rating.bookId))];
          setBooks(uniqueBooks);
          if (uniqueBooks.length > 0) {
            setSelectedBook(uniqueBooks[0]._id);
          }
        }
      } catch (error) {
        console.error('Error fetching ratings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRatings();
  }, [getStudentBookRatings]);

  const filteredRatings = selectedBook
    ? ratings.filter(rating => rating.bookId._id === selectedBook)
    : [];

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
          <Table className="evaluation-table">
            <thead>
              <tr>
                <th className='text-dark' rowSpan="2">معايير التقييم</th>
                <th className='text-dark' colSpan={filteredRatings.length}>اسماء الطلاب</th>
              </tr>
              <tr>
                {filteredRatings.map((rating) => (
                  <th key={`student-${rating._id}`} className='text-dark'>
                    {rating.studentId.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>عنوان الكتاب</td>
                {filteredRatings.map((rating) => (
                  <td key={`book-${rating._id}`}>{rating.bookId.title}</td>
                ))}
              </tr>
              <tr>
                <td>توصية بالكتاب</td>
                {filteredRatings.map((rating) => (
                  <td key={`recommend-${rating._id}`} className={rating.recommendBook === 'نعم' ? 'recommend-yes' : 'recommend-no'}>
                    {rating.recommendBook}
                  </td>
                ))}
              </tr>
              <tr>
                <td>أسلوب الكاتب</td>
                {filteredRatings.map((rating) => (
                  <td key={`style-${rating._id}`}>{rating.authorStyle}</td>
                ))}
              </tr>
              <tr>
                <td>الأفكار الرئيسية</td>
                {filteredRatings.map((rating) => (
                  <td key={`ideas-${rating._id}`}>{rating.keyIdeas}</td>
                ))}
              </tr>
              <tr>
                <td>أفكار اعجبتني</td>
                {filteredRatings.map((rating) => (
                  <td key={`liked-${rating._id}`}>{rating.likedIdeas}</td>
                ))}
              </tr>
              <tr>
                <td>الأفكار لم تعجبني</td>
                {filteredRatings.map((rating) => (
                  <td key={`disliked-${rating._id}`}>{rating.dislikedIdeas}</td>
                ))}
              </tr>
              <tr>
                <td>اقتباسات مميزة</td>
                {filteredRatings.map((rating) => (
                  <td key={`quotes-${rating._id}`}>{rating.memorableQuotes}</td>
                ))}
              </tr>
              <tr>
                <td>إضافات مقترحة</td>
                {filteredRatings.map((rating) => (
                  <td key={`additions-${rating._id}`}>{rating.potentialAdditions}</td>
                ))}
              </tr>
              <tr>
                <td>التأثير الشخصي</td>
                {filteredRatings.map((rating) => (
                  <td key={`impact-${rating._id}`}>{rating.personalImpact}</td>
                ))}
              </tr>
              <tr>
                <td>تقييم الكتاب</td>
                {filteredRatings.map((rating) => (
                  <td key={`rating-${rating._id}`} className={`rating-cell ${getRatingColor(rating.bookRating)}`}>
                    {rating.bookRating}
                  </td>
                ))}
              </tr>
              <tr>
                <td>تاريخ البدء</td>
                {filteredRatings.map((rating) => (
                  <td key={`start-${rating._id}`} className="date-cell">
                    {new Date(rating.readingStartDate).toLocaleDateString('ar-EG')}
                  </td>
                ))}
              </tr>
              <tr>
                <td>تاريخ الانتهاء</td>
                {filteredRatings.map((rating) => (
                  <td key={`end-${rating._id}`} className="date-cell">
                    {new Date(rating.readingEndDate).toLocaleDateString('ar-EG')}
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

const getRatingColor = (rating) => {
  if (rating >= 4) return 'good-rating';
  if (rating >= 3) return 'average-rating';
  return 'poor-rating';
};