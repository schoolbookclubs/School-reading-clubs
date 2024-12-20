import React, { useContext, useEffect, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { DataContext } from '../../context/context';
import {jwtDecode} from 'jwt-decode';

export default function ShowParentassessments() {
    const [assessments, setAssessments] = useState([]);
    const { getParentAssessmentsWithDetails } = useContext(DataContext);
    const [parentName, setParentName] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAssessments = async () => {
            setIsLoading(true);
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const decoded = jwtDecode(token);
                    const response = await getParentAssessmentsWithDetails(decoded._id);
                    if (response.success) {
                        setAssessments(response.data);
                        if (response.data.length > 0) {
                            setParentName(response.data[0].parentId.name);
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
    }, [getParentAssessmentsWithDetails]);

    const ratingFields = [
        { key: 'generalBehavior', label: 'لاحظت تحسن في سلوك ابني العام' },
        { key: 'readingEnthusiasm', label: 'زاد حماس ابني للقراءة والمطالعة' },
        { key: 'readingInterests', label: 'تنوعت اهتمامات ابني القرائية' },
        { key: 'communicationSkills', label: 'تطورت مهاراته في التواصل' },
        { key: 'socialSkills', label: 'اكتسب ابني مهارات اجتماعية بشكل ملحوظ' },
        { key: 'academicPerformance', label: 'انعكس انضمام ابني في النادي على مستواه الدراسي في بقية المواد بشكل إيجابي' },
        { key: 'criticalThinking', label: 'تطور تفكيره العام وحسه النقدي' }
    ];

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
                .rating-cell {
                    font-weight: bold;
                    font-size: 1.2rem;
                }
                .rating-1 { color: #dc3545; }
                .rating-2 { color: #fd7e14; }
                .rating-3 { color: #ffc107; }
                .rating-4 { color: #20c997; }
                .rating-5 { color: #198754; }
            `}</style>

            <Container fluid>
                <h2 className="text-center mb-4">تقييمات ولي الأمر</h2>
                {parentName && (
                    <h4 className="text-center mb-4 text-primary">ولي الأمر: {parentName}</h4>
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
                                    {ratingFields.map(field => (
                                        <th key={field.key}>{field.label}</th>
                                    ))}
                                     
                                </tr>
                            </thead>
                            <tbody>
                                {assessments.map((assessment) => (
                                    <tr key={assessment._id}>
                                        {ratingFields.map(field => (
                                            <td key={field.key}>
                                                <div className={`rating-cell rating-${assessment[field.key]}`}>
                                                    {assessment[field.key]}
                                                </div>
                                            </td>
                                        ))}
                                         
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