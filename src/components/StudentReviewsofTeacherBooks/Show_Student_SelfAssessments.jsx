import React, { useState, useEffect, useContext } from 'react';
import { Container, Form, Table, Spinner } from 'react-bootstrap';
import { DataContext } from '../../context/context';
import { jwtDecode } from 'jwt-decode';

export default function Show_Student_SelfAssessments() {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingAssessments, setIsLoadingAssessments] = useState(false);
    const [assessments, setAssessments] = useState([]);
    const { getTeacherBooks, getBookStudentSelfAssessmentsWithDetails } = useContext(DataContext);

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
        const fetchAssessments = async () => {
            if (selectedBook) {
                setIsLoadingAssessments(true);
                try {
                    const response = await getBookStudentSelfAssessmentsWithDetails(selectedBook);
                    if (response.success) {
                        setAssessments(response.data);
                    }
                } catch (error) {
                    console.error('Error fetching assessments:', error);
                } finally {
                    setIsLoadingAssessments(false);
                }
            }
        };

        fetchAssessments();
    }, [selectedBook, getBookStudentSelfAssessmentsWithDetails]);

    const handleBookChange = (e) => {
        setSelectedBook(e.target.value);
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
                    }}>التقييم الذاتي للطلاب</h2>

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
                            {isLoadingAssessments ? (
                                <div className="text-center p-5" style={{ backgroundColor: 'white', borderRadius: '15px' }}>
                                    <Spinner animation="border" role="status" variant="primary" style={{ width: '4rem', height: '4rem' }}>
                                        <span className="visually-hidden">جاري التحميل...</span>
                                    </Spinner>
                                    <h4 className="mt-3" style={{ color: '#2c3e50' }}>جاري تحميل التقييمات...</h4>
                                </div>
                            ) : assessments.length === 0 ? (
                                <div className="text-center p-5" style={{ backgroundColor: 'white', borderRadius: '15px' }}>
                                    <h4 style={{ color: '#2c3e50' }}>لا توجد تقييمات ذاتية لهذا الكتاب</h4>
                                </div>
                            ) : (
                                <Table hover bordered responsive className="mb-0">
                                    <thead>
                                        <tr>
                                            <th className="name-column" style={{ minWidth: '250px' }}>البيانات / الطالب</th>
                                            {assessments.map((assessment) => (
                                                <th key={assessment._id} style={{ minWidth: '200px' }}>
                                                    {assessment.studentId.name}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="name-column">استمتعت بالقراءة</td>
                                            {assessments.map((assessment) => (
                                                <td key={assessment._id} style={{ fontWeight: 'bold', color: '#2c3e50' }}>
                                                    {assessment.enjoyedReading}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td className="name-column">قرأت كتبا مفيدة</td>
                                            {assessments.map((assessment) => (
                                                <td key={assessment._id} style={{ fontWeight: 'bold', color: '#2c3e50' }}>
                                                    {assessment.readUsefulBooks}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td className="name-column">تعرفت علي اصدقاء جدد</td>
                                            {assessments.map((assessment) => (
                                                <td key={assessment._id} style={{ fontWeight: 'bold', color: '#2c3e50' }}>
                                                    {assessment.madeNewFriends}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td className="name-column">زادت الحوارات من فهمي للكتب</td>
                                            {assessments.map((assessment) => (
                                                <td key={assessment._id} style={{ fontWeight: 'bold', color: '#2c3e50' }}>
                                                    {assessment.conversationsImprovedUnderstanding}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td className="name-column">أستطعت التعبير عن رأيي بحرية</td>
                                            {assessments.map((assessment) => (
                                                <td key={assessment._id} style={{ fontWeight: 'bold', color: '#2c3e50' }}>
                                                    {assessment.expressedOpinionFreely}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td className="name-column">زادت ثقتي بنفسي</td>
                                            {assessments.map((assessment) => (
                                                <td key={assessment._id} style={{ fontWeight: 'bold', color: '#2c3e50' }}>
                                                    {assessment.increasedSelfConfidence}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td className="name-column">سوف أشجع زملائي على الانضمام لنادي قراءة</td>
                                            {assessments.map((assessment) => (
                                                <td key={assessment._id} style={{ fontWeight: 'bold', color: '#2c3e50' }}>
                                                    {assessment.wouldEncourageClassmates}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td className="name-column">سوف أنضم لنادي القراءة السنة القادمة</td>
                                            {assessments.map((assessment) => (
                                                <td key={assessment._id} style={{ fontWeight: 'bold', color: '#2c3e50' }}>
                                                    {assessment.willJoinNextYear}
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