import React, { useState, useEffect, useContext } from 'react';
import { Container, Form, Table, Spinner } from 'react-bootstrap';
import { DataContext } from '../../context/context';
import { jwtDecode } from 'jwt-decode';

export default function Show_Student_SchoolBookRatings() {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingRatings, setIsLoadingRatings] = useState(false);
    const [ratings, setRatings] = useState([]);
    const { getTeacherBooks, getBookStudentRatingsWithDetails } = useContext(DataContext);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const decoded = jwtDecode(token);
                    const response = await getTeacherBooks(decoded.id);
                    if (response.success) {
                        setBooks(response.data);
                        if (response.data.length > 0) {
                            setSelectedBook(response.data[0]._id);
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching books:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBooks();
    }, [getTeacherBooks]);

    useEffect(() => {
        const fetchRatings = async () => {
            if (selectedBook) {
                setIsLoadingRatings(true);
                try {
                    const response = await getBookStudentRatingsWithDetails(selectedBook);
                    if (response.success) {
                        setRatings(response.data);
                    }
                } catch (error) {
                    console.error('Error fetching ratings:', error);
                } finally {
                    setIsLoadingRatings(false);
                }
            }
        };

        fetchRatings();
    }, [selectedBook, getBookStudentRatingsWithDetails]);

    const handleBookChange = (e) => {
        setSelectedBook(e.target.value);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('ar-EG', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">تقييمات الطلاب للكتب</h2>
            
            <Form.Group className="mb-4">
                <Form.Label>اختر الكتاب:</Form.Label>
                <Form.Select
                    value={selectedBook}
                    onChange={handleBookChange}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <option>يرجى الانتظار لعرض الكتب المتاحة...</option>
                    ) : books.length === 0 ? (
                        <option>لا يوجد كتب متاحة حالياً</option>
                    ) : (
                        books.map((book) => (
                            <option key={book._id} value={book._id}>
                                {book.title}
                            </option>
                        ))
                    )}
                </Form.Select>
            </Form.Group>

            {isLoadingRatings ? (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">جاري التحميل...</span>
                    </Spinner>
                </div>
            ) : ratings.length > 0 ? (
                <div className="table-responsive">
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>البيانات / الطالب</th>
                                {ratings.map((rating) => (
                                    <th key={rating._id}>{rating.studentId.name}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>تقييم الكتاب من خمس نجوم</td>
                                {ratings.map((rating) => (
                                    <td key={rating._id} style={{ fontWeight: 'bold', color: '#2c3e50' }}>
                                        {rating.bookRating}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td>أوصي بقراءته</td>
                                {ratings.map((rating) => (
                                    <td key={rating._id} >
                                        {rating.recommendBook}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td>تاريخ البدء بالقراءة</td>
                                {ratings.map((rating) => (
                                    <td key={rating._id} >
                                        {formatDate(rating.readingStartDate)}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td>تاريخ الانتهاء من القراءة</td>
                                {ratings.map((rating) => (
                                    <td key={rating._id} >
                                        {formatDate(rating.readingEndDate)}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td>رأيك بأسلوب الكاتب</td>
                                {ratings.map((rating) => (
                                    <td key={rating._id}>
                                        <p>{rating.authorStyle}</p>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td>ملخص لأهم الأفكار أو الأحداث</td>
                                {ratings.map((rating) => (
                                    <td key={rating._id}>
                                        <p>{rating.keyIdeas}</p>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td>أفكار أعجبتك</td>
                                {ratings.map((rating) => (
                                    <td key={rating._id}>
                                        <p>{rating.likedIdeas}</p>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td>أفكار لم تعجبك</td>
                                {ratings.map((rating) => (
                                    <td key={rating._id}>
                                        <p>{rating.dislikedIdeas}</p>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td>عبارات واقتباسات مميزة</td>
                                {ratings.map((rating) => (
                                    <td key={rating._id}>
                                        <p>{rating.memorableQuotes}</p>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td>لو كنت أنت الكاتب ماذا كنت ستضيف أو تغيير في الكتاب؟</td>
                                {ratings.map((rating) => (
                                    <td key={rating._id}>
                                        <p>{rating.potentialAdditions}</p>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td>أفكار أو أحداث لامستك شخصيًا</td>
                                {ratings.map((rating) => (
                                    <td key={rating._id}>
                                        <p>{rating.personalImpact}</p>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </Table>
                </div>
            ) : (
                <div className="text-center">لا توجد تقييمات متاحة لهذا الكتاب</div>
            )}
        </Container>
    );
}