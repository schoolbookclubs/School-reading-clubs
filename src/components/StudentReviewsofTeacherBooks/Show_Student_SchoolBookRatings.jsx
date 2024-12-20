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
        <>
            <style>
                {`
                    .remove-arrow {
                        -webkit-appearance: none !important;
                        -moz-appearance: none !important;
                        appearance: none !important;
                        background-image: none !important;
                    }
                    .remove-arrow::-ms-expand {
                        display: none !important;
                    }
                    .table-hover tbody tr:hover {
                        background-color: rgba(0,0,0,.075);
                    }
                    .table th {
                        background-color: #f8f9fa;
                        font-weight: bold;
                        white-space: nowrap;
                        min-width: 200px;
                        padding: 1rem !important;
                    }
                    .table td {
                        min-width: 200px;
                        padding: 1.5rem !important;
                        vertical-align: top !important;
                        border: 1px solid #dee2e6 !important;
                    }
                    .custom-table {
                        background-color: white;
                        border-radius: 15px;
                        overflow: hidden;
                        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                    }
                    .table-container {
                        overflow-x: auto;
                        margin: 0 -1.5rem;
                    }
                    .table {
                        border: 1px solid #dee2e6;
                    }
                    .table thead th {
                        border: 1px solid #dee2e6 !important;
                        border-bottom: 2px solid #dee2e6 !important;
                    }
                    .name-column {
                        position: sticky;
                        left: 0;
                        background-color: #f8f9fa;
                        z-index: 1;
                    }
                    .table td p {
                        margin: 0;
                        white-space: pre-wrap;
                        word-wrap: break-word;
                    }
                `}
            </style>
            <div style={{ 
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                padding: '3rem 0',
                direction: 'rtl'
            }}>
                <Container>
                    <h2 className="text-center mb-5" style={{
                        color: '#2c3e50',
                        fontWeight: 'bold',
                        fontSize: '2.5rem',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                    }}>تقييمات الطلاب للكتب</h2>

                    <div className="select-container" style={{
                        maxWidth: '600px',
                        margin: '0 auto',
                        padding: '2rem',
                        background: 'white',
                        borderRadius: '15px',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                        marginBottom: '3rem'
                    }}>
                        <Form.Group className="mb-4">
                            <Form.Label style={{
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                color: '#2c3e50',
                                marginBottom: '1rem'
                            }}>اختر الكتاب:</Form.Label>
                            <Form.Select
                                value={selectedBook}
                                onChange={handleBookChange}
                                style={{
                                    padding: '0.8rem',
                                    fontSize: '1.1rem',
                                    borderRadius: '10px',
                                    border: '2px solid #e9ecef',
                                    transition: 'all 0.3s ease',
                                    backgroundImage: 'none',
                                    backgroundColor: 'white'
                                }}
                                className="remove-arrow"
                                disabled={isLoading}
                            >
                                {books.map((book) => (
                                    <option key={book._id} value={book._id}>
                                        {book.title}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </div>

                    <div className="custom-table">
                        <div className="table-container">
                            {isLoadingRatings ? (
                                <div className="text-center p-5" style={{ backgroundColor: 'white', borderRadius: '15px' }}>
                                    <Spinner animation="border" role="status" variant="primary" style={{ width: '4rem', height: '4rem' }}>
                                        <span className="visually-hidden">جاري التحميل...</span>
                                    </Spinner>
                                    <h4 className="mt-3" style={{ color: '#2c3e50' }}>جاري تحميل التقييمات...</h4>
                                </div>
                            ) : ratings.length === 0 ? (
                                <div className="text-center p-5" style={{ backgroundColor: 'white', borderRadius: '15px' }}>
                                    <h4 style={{ color: '#2c3e50' }}>لا توجد تقييمات لهذا الكتاب</h4>
                                </div>
                            ) : (
                                <Table hover bordered responsive className="mb-0">
                                    <thead>
                                        <tr>
                                            <th className="name-column" style={{ minWidth: '250px' }}>البيانات / الطالب</th>
                                            {ratings.map((rating) => (
                                                <th key={rating._id} style={{ minWidth: '200px' }}>
                                                    {rating.studentId.name}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="name-column">تقييم الكتاب من خمس نجوم</td>
                                            {ratings.map((rating) => (
                                                <td key={rating._id} style={{ fontWeight: 'bold', color: '#2c3e50' }}>
                                                    {rating.bookRating}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td className="name-column">أوصي بقراءته</td>
                                            {ratings.map((rating) => (
                                                <td key={rating._id} >
                                                    {rating.recommendBook}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td className="name-column">تاريخ البدء بالقراءة</td>
                                            {ratings.map((rating) => (
                                                <td key={rating._id} >
                                                    {formatDate(rating.readingStartDate)}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td className="name-column">تاريخ الانتهاء من القراءة</td>
                                            {ratings.map((rating) => (
                                                <td key={rating._id} >
                                                    {formatDate(rating.readingEndDate)}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td className="name-column">رأيك بأسلوب الكاتب</td>
                                            {ratings.map((rating) => (
                                                <td key={rating._id}>
                                                    <p>{rating.authorStyle}</p>
                                                </td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td className="name-column">ملخص لأهم الأفكار أو الأحداث</td>
                                            {ratings.map((rating) => (
                                                <td key={rating._id}>
                                                    <p>{rating.keyIdeas}</p>
                                                </td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td className="name-column">أفكار أعجبتك</td>
                                            {ratings.map((rating) => (
                                                <td key={rating._id}>
                                                    <p>{rating.likedIdeas}</p>
                                                </td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td className="name-column">أفكار لم تعجبك</td>
                                            {ratings.map((rating) => (
                                                <td key={rating._id}>
                                                    <p>{rating.dislikedIdeas}</p>
                                                </td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td className="name-column">عبارات واقتباسات مميزة</td>
                                            {ratings.map((rating) => (
                                                <td key={rating._id}>
                                                    <p>{rating.memorableQuotes}</p>
                                                </td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td className="name-column">لو كنت أنت الكاتب ماذا كنت ستضيف أو تغيير في الكتاب؟</td>
                                            {ratings.map((rating) => (
                                                <td key={rating._id}>
                                                    <p>{rating.potentialAdditions}</p>
                                                </td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td className="name-column">أفكار أو أحداث لامستك شخصيًا</td>
                                            {ratings.map((rating) => (
                                                <td key={rating._id}>
                                                    <p>{rating.personalImpact}</p>
                                                </td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </Table>
                            )}
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}