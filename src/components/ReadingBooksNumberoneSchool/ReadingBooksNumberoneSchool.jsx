import React, { useContext, useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { DataContext } from '../../context/context';
import './readingbooks.css';

export default function ReadingBooksNumberoneSchool() {
  const { getUniqueSchoolBooks } = useContext(DataContext);
  const [booksData, setBooksData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBooksData = async () => {
      setIsLoading(true);
      try {
        const response = await getUniqueSchoolBooks();
        if (response?.data) {
          setBooksData(response.data);
        } else {
          console.error('Invalid data format received:', response);
          setBooksData(null);
        }
      } catch (error) {
        console.error('Error fetching books data:', error);
        setBooksData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooksData();
  }, [getUniqueSchoolBooks]);

  if (isLoading) {
    return (
      <div className="reading-stats-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-message">جاري تحميل إحصائيات القراءة...</div>
        </div>
      </div>
    );
  }

  if (!booksData || !booksData.books.length) {
    return (
      <div className="reading-stats-page">
        <Container className="reading-stats-container">
          <h1 className="reading-stats-title">إحصائيات القراءة</h1>
          <div className="no-data-message text-dark">لا توجد بيانات قراءة متاحة</div>
        </Container>
      </div>
    );
  }

  return (
    <div className="reading-stats-page">
      <Container className="reading-stats-container">
        <h1 className="reading-stats-title">إحصائيات القراءة</h1>
        
        <div className="total-books-card">
          <div className="total-books-label">إجمالي الكتب المقروءة</div>
          <div className="total-books-number">{booksData.totalUniqueBooks}</div>
        </div>

        <div className="table-responsive">
          <Table className="reading-stats-table" hover>
            <thead>
              <tr>
                <th>اسم الكتاب</th>
                <th>عدد مرات القراءة من قبل الطلاب</th>
              </tr>
            </thead>
            <tbody>
              {booksData.books.map((bookData, index) => (
                <tr key={index}>
                  <td>
                    <div className="book-title">
                      <i className="fas fa-book"></i>
                      {bookData.book.title}
                    </div>
                  </td>
                  <td>
                    <span className="read-count">
                      {bookData.readCount} مرة
                    </span>
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