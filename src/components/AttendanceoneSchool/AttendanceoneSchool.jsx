import React, { useContext, useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { DataContext } from '../../context/context';
import './attendance.css';

export default function AttendanceoneSchool() {
  const { getSchoolAttendance } = useContext(DataContext);
  const [attendance, setAttendance] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      setIsLoading(true);
      try {
        const response = await getSchoolAttendance();
        if (response?.attendance) {
          setAttendance(response.attendance);
        } else {
          console.error('Invalid data format received:', response);
          setAttendance([]);
        }
      } catch (error) {
        console.error('Error fetching attendance:', error);
        setAttendance([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAttendance();
  }, [getSchoolAttendance]);

  const getAttendanceStatusClass = (status) => {
    return status === 'نعم' ? 'status-present' : 'status-absent';
  };

  if (isLoading) {
    return (
      <div className="attendance-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-message">جاري تحميل بيانات الحضور...</div>
        </div>
      </div>
    );
  }

  if (!attendance.length) {
    return (
      <div className="attendance-page">
        <Container className="attendance-container">
          <h1 className="attendance-title">سجل الحضور والغياب</h1>
          <div className="no-data-message">لا توجد بيانات حضور متاحة</div>
        </Container>
      </div>
    );
  }

  return (
    <div className="attendance-page">
      <Container className="attendance-container">
        <h1 className="attendance-title">سجل الحضور والغياب</h1>
        <div className="table-responsive">
          <Table className="attendance-table" hover>
            <thead>
              <tr>
                <th>اسم الطالب</th>
                <th>كتاب المناقشة</th>
                <th>حالة الحضور</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((record, index) => (
                <tr key={index}>
                  <td>
                    <div className="student-name">
                      <i className="fas fa-user-graduate"></i>
                      {record.student.name}
                    </div>
                  </td>
                  <td className="book-title">{record.book.title}</td>
                  <td>
                    <span className={`attendance-status ${getAttendanceStatusClass(record.attended)}`}>
                      {record.attended === 'نعم' ? 'حاضر' : 'غائب'}
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