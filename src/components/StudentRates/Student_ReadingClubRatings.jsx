import React, { useContext, useEffect, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { DataContext } from '../../context/context';
import {jwtDecode} from 'jwt-decode';

export default function Student_ReadingClubRatings() {
    const [evaluations, setEvaluations] = useState([]);
    const { getStudentReadingClubEvaluations } = useContext(DataContext);
    const [studentName, setStudentName] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEvaluations = async () => {
            setIsLoading(true);
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const decoded = jwtDecode(token);
                    const response = await getStudentReadingClubEvaluations(decoded.id);
                    if (response.success) {
                        setEvaluations(response.data);
                        if (response.data.length > 0) {
                            setStudentName(response.data[0].studentId.name);
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching evaluations:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchEvaluations();
    }, [getStudentReadingClubEvaluations]);

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
                .evaluation-text {
                    white-space: pre-wrap;
                    text-align: right;
                    padding: 10px;
                    background-color: #f8f9fa;
                    border-radius: 4px;
                    margin: 5px 0;
                }
            `}</style>

            <Container fluid>
                <h2 className="text-center mb-4">تقييمات نادي القراءة</h2>
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
                    <div className="table-wrapper">
                        <table className="custom-table">
                            <thead>
                                <tr>
                                    <th>كيف تغيرت نظرتك للقراءة بعد الانضمام للنادي؟
                                    </th>
                                    <th>ما هو أكثر شيء استفدت منه في النادي؟
                                    </th>
                                    <th>هل تشعر بتحسن في مهاراتك القرائية؟ كيف؟</th>
                                    <th>أكثر شيء أعجبك في النادي
                                    </th>
                                    <th>أكثر شيء لم يعجبك في النادي
                                    </th>
                                    <th>ما الكتب التي قرأتها وتريد أن تضيفها إلى قائمة نادي القراءة القادم
                                    </th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {evaluations.map((evaluation) => (
                                    <tr key={evaluation._id}>
                                        <td>
                                            <div className="evaluation-text">
                                                {evaluation.readingPerspectiveChange}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="evaluation-text">
                                                {evaluation.mostBeneficialAspect}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="evaluation-text">
                                                {evaluation.readingSkillsImprovement}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="evaluation-text">
                                                {evaluation.mostLikedAspect}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="evaluation-text">
                                                {evaluation.leastLikedAspect}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="evaluation-text">
                                                {evaluation.booksToAddToNextList}
                                            </div>
                                        </td>
                                        
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Container>
        </div>
    );
}
