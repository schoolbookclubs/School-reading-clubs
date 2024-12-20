import React, { useContext, useEffect, useState } from 'react';
import { Container, Table, Form, Spinner } from 'react-bootstrap';
import { DataContext } from '../../context/context';
import {jwtDecode} from 'jwt-decode';

export default function Student_SelfAssessments() {
    const [assessments, setAssessments] = useState([]);
    const [selectedBook, setSelectedBook] = useState('all');
    const [uniqueBooks, setUniqueBooks] = useState([]);
    const { getStudentSelfAssessmentsWithDetails } = useContext(DataContext);
    const [studentName, setStudentName] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAssessments = async () => {
            setIsLoading(true);
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const decoded = jwtDecode(token);
                    const response = await getStudentSelfAssessmentsWithDetails(decoded.id);
                    if (response.success) {
                        setAssessments(response.data);
                        const books = [...new Set(response.data.map(assessment => assessment.bookId.title))];
                        setUniqueBooks(books);
                        if (response.data.length > 0) {
                            setStudentName(response.data[0].studentId.name);
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching assessments:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAssessments();
    }, [getStudentSelfAssessmentsWithDetails]);

    const filteredAssessments = selectedBook === 'all' 
        ? assessments 
        : assessments.filter(assessment => assessment.bookId.title === selectedBook);

    return (
        <div className="table-container">
            <style jsx>{`
                .table-container {
                    padding: 20px;
                    direction: rtl;
                }
                .custom-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                    background-color: white;
                }
                .custom-table th,
                .custom-table td {
                    border: 1px solid #dee2e6;
                    padding: 12px;
                    min-width: 150px;
                    vertical-align: middle;
                    text-align: center;
                    white-space: normal;
                    word-wrap: break-word;
                }
                .custom-table th {
                    background-color: #f8f9fa;
                    font-weight: bold;
                    position: sticky;
                    top: 0;
                    z-index: 1;
                }
                .table-wrapper {
                    overflow-x: auto;
                    margin-top: 20px;
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
                    border-radius: 8px;
                }
                .table-wrapper::-webkit-scrollbar {
                    height: 8px;
                }
                .table-wrapper::-webkit-scrollbar-track {
                    background: #f1f1f1;
                }
                .table-wrapper::-webkit-scrollbar-thumb {
                    background: #888;
                    border-radius: 4px;
                }
                .custom-table tr:nth-child(even) {
                    background-color: #f8f9fa;
                }
                .custom-table tr:hover {
                    background-color: #f2f2f2;
                }
                .select-container {
                    width: 50%;
                    margin: 0 auto 20px;
                }
                @media (max-width: 768px) {
                    .select-container {
                        width: 100%;
                    }
                    .table-container {
                        padding: 10px;
                    }
                }
                .rating-cell {
                    font-weight: bold;
                    color: #0d6efd;
                }
                .loading-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 300px;
                    text-align: center;
                }
                .loading-spinner {
                    margin-bottom: 15px;
                }
                .loading-text {
                    color: #6c757d;
                    font-size: 1.2rem;
                    margin-top: 10px;
                }
            `}</style>

            <Container fluid>
                <h2 className="text-center mb-4">التقييمات الذاتية للكتب</h2>
                {studentName && (
                    <h4 className="text-center mb-4 text-primary">الطالب: {studentName}</h4>
                )}

                {isLoading ? (
                    <div className="loading-container">
                        <div className="loading-spinner">
                            {/* <Spinner animation="border" variant="primary" /> */}
                        </div>
                        <div className="loading-text">جاري تحميل التقييمات...</div>
                    </div>
                ) : (
                    <>
                        <div className="select-container">
                            <Form.Select 
                                value={selectedBook}
                                onChange={(e) => setSelectedBook(e.target.value)}
                                className="form-select"
                            >
                                <option value="all">جميع الكتب</option>
                                {uniqueBooks.map((book, index) => (
                                    <option key={index} value={book}>{book}</option>
                                ))}
                            </Form.Select>
                        </div>

                        <div className="table-wrapper">
                            <table className="custom-table">
                                <thead>
                                    <tr>
                                        <th>عنوان الكتاب</th>
                                        <th>استمتعت بالقراءة</th>
                                        <th>قرأت كتبا مفيدة</th>
                                        <th>تعرفت علي اصدقاء جدد</th>
                                        <th>زادت الحوارات من فهمي للكتب</th>
                                        <th>أستطعت التعبير عن رأيي بحرية</th>
                                        <th>زادت ثقتي بنفسي</th>
                                        <th>سوف أشجع زملائي على الانضمام لنادي قراءة</th>
                                        <th>سوف أنضم لنادي القراءة السنة القادمة</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAssessments.map((assessment) => (
                                        <tr key={assessment._id}>
                                            <td>{assessment.bookId.title}</td>
                                            <td className="rating-cell">{assessment.enjoyedReading}</td>
                                            <td className="rating-cell">{assessment.readUsefulBooks}</td>
                                            <td className="rating-cell">{assessment.madeNewFriends}</td>
                                            <td className="rating-cell">{assessment.conversationsImprovedUnderstanding}</td>
                                            <td className="rating-cell">{assessment.expressedOpinionFreely}</td>
                                            <td className="rating-cell">{assessment.increasedSelfConfidence}</td>
                                            <td className="rating-cell">{assessment.wouldEncourageClassmates}</td>
                                            <td className="rating-cell">{assessment.willJoinNextYear}</td>
                                            
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </Container>
        </div>
    );
}
