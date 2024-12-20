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
        <Container className="mt-4">
            <h2 className="text-center mb-4">التقييمات الذاتية للطلاب</h2>
            
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

            {isLoadingAssessments ? (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">جاري التحميل...</span>
                    </Spinner>
                </div>
            ) : assessments.length > 0 ? (
                <div className="table-responsive">
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>معايير التقييم</th>
                                {assessments.map((assessment) => (
                                    <th key={assessment._id}>{assessment.studentId.name}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>استمتعت بالقراءة</td>
                                {assessments.map((assessment) => (
                                    <td key={`enjoyedReading-${assessment._id}`}>
                                        {assessment.enjoyedReading}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td>قرأت كتباً مفيدة</td>
                                {assessments.map((assessment) => (
                                    <td key={`readUsefulBooks-${assessment._id}`}>
                                        {assessment.readUsefulBooks}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td>تعرفت علي اصدقاء جدد</td>
                                {assessments.map((assessment) => (
                                    <td key={`madeNewFriends-${assessment._id}`}>
                                        {assessment.madeNewFriends}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td>زادت الحوارات من فهمي للكتب</td>
                                {assessments.map((assessment) => (
                                    <td key={`conversationsImproved-${assessment._id}`}>
                                        {assessment.conversationsImprovedUnderstanding}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td>أستطعت التعبير عن رأيي بحرية</td>
                                {assessments.map((assessment) => (
                                    <td key={`expressedOpinion-${assessment._id}`}>
                                        {assessment.expressedOpinionFreely}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td>زادت ثقتي بنفسي</td>
                                {assessments.map((assessment) => (
                                    <td key={`confidence-${assessment._id}`}>
                                        {assessment.increasedSelfConfidence}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td>سوف أشجع زملائي على الانضمام لنادي قراءة</td>
                                {assessments.map((assessment) => (
                                    <td key={`encourage-${assessment._id}`}>
                                        {assessment.wouldEncourageClassmates}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td>سوف أنضم لنادي القراءة السنة القادمة</td>
                                {assessments.map((assessment) => (
                                    <td key={`nextYear-${assessment._id}`}>
                                        {assessment.willJoinNextYear}
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