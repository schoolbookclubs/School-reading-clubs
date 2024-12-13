import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button, Modal, Table, Form, Spinner } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { DataContext } from '../../context/context.js';
import "./TeacherBooks.css"
export default function TeacherBooks() {
  const { fetchTeacherBooks, deleteBook, updateBook, fetchStudentsBySchoolCode, rateStudent } = useContext(DataContext);
  const [books, setBooks] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modals and editing states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Validation schema for book update
  const bookUpdateSchema = Yup.object().shape({
    title: Yup.string().required('عنوان الكتاب مطلوب'),
    author: Yup.string().required('اسم المؤلف مطلوب'),
    illustrator: Yup.string(),
    numberOfPages: Yup.number()
      .positive('عدد الصفحات يجب أن يكون رقمًا موجبًا')
      .integer('عدد الصفحات يجب أن يكون رقمًا صحيحًا')
      .nullable(),
    Discussiondate: Yup.date().required('تاريخ المناقشة'),
  });

  // Fetch books on component mount
  useEffect(() => {
    const loadBooks = async () => {
      try {
        const response = await fetchTeacherBooks();
        setBooks(response.data || []);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'حدث خطأ أثناء جلب الكتب');
        setLoading(false);
      }
    };

    loadBooks();
  }, [fetchTeacherBooks]);

  // Fetch students for rating
  useEffect(() => {
    const loadStudents = async () => {
      try {
        const studentsData = await fetchStudentsBySchoolCode();
        setStudents(studentsData);
      } catch (err) {
        console.error('Error fetching students:', err);
      }
    };

    loadStudents();
  }, []);

  // Delete book handler
  const handleDeleteBook = async () => {
    if (!selectedBook) return;

    try {
      await deleteBook(selectedBook._id);
      
      // Remove book from local state
      setBooks(books.filter(book => book._id !== selectedBook._id));
      
      // Close modal
      setShowDeleteModal(false);
      setSelectedBook(null);
    } catch (err) {
      console.error('Error deleting book:', err);
      setError(err.response?.data?.message || 'حدث خطأ أثناء حذف الكتاب');
    }
  };

  // Update book handler
  const handleUpdateBook = async (values, { setSubmitting }) => {
    if (!selectedBook) return;

    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('author', values.author);
    if (values.illustrator) formData.append('illustrator', values.illustrator);
    if (values.numberOfPages) formData.append('numberOfPages', values.numberOfPages);
    if (values.Discussiondate) formData.append('Discussiondate', values.Discussiondate);
    if (values.bookImage) formData.append('bookImage', values.bookImage);

    try {
      const response = await updateBook(selectedBook._id, formData);
      
      // Update book in local state
      setBooks(books.map(book => 
        book._id === selectedBook._id ? response.data : book
      ));
      
      // Close modal
      setShowUpdateModal(false);
      setSelectedBook(null);
    } catch (err) {
      console.error('Error updating book:', err);
      setError(err.response?.data?.message || 'حدث خطأ أثناء تحديث الكتاب');
    } finally {
      setSubmitting(false);
    }
  };

  // State to manage individual student ratings
  const [studentRatings, setStudentRatings] = useState({});

  // Update rating for a specific student and criteria
  const updateStudentRating = (studentId, category, subCategory, value) => {
    setStudentRatings(prev => ({
      ...prev,
      [studentId]: {
        ...(prev[studentId] || {}),
        [subCategory]: value
      }
    }));
  };

  // Add new state for loading and success
  const [isRatingSubmitting, setIsRatingSubmitting] = useState(false);
  const [showRatingSuccessModal, setShowRatingSuccessModal] = useState(false);

  // Rating submission handler
  const handleRatingSubmit = async (studentId, bookId) => {
    const ratingData = {
      book: bookId,
      audience: studentRatings[studentId]?.audience || 'لا',
      readingSkills: {
        completeReading: studentRatings[studentId]?.completeReading || 1,
        deepUnderstanding: studentRatings[studentId]?.deepUnderstanding || 1,
        personalReflection: studentRatings[studentId]?.personalReflection || 1
      },
      confidence: studentRatings[studentId]?.confidence || 1,
      criticalThinking: {
        creativeIdeas: studentRatings[studentId]?.creativeIdeas || 1,
        connectingExperiences: studentRatings[studentId]?.connectingExperiences || 1,
        independentThinking: studentRatings[studentId]?.independentThinking || 1
      },
      communicationSkills: {
        clearExpression: studentRatings[studentId]?.clearExpression || 1,
        activeListening: studentRatings[studentId]?.activeListening || 1,
        constructiveFeedback: studentRatings[studentId]?.constructiveFeedback || 1
      },
      socialSkills: {
        activeParticipation: studentRatings[studentId]?.activeParticipation || 1,
        respectingDiversity: studentRatings[studentId]?.respectingDiversity || 1,
        buildingFriendships: studentRatings[studentId]?.buildingFriendships || 1
      },
      generalBehavior: {
        collaboration: studentRatings[studentId]?.collaboration || 1
      }
    };

    return await rateStudent(studentId, ratingData);
  };

  // New function to submit all ratings
  const submitAllRatings = async () => {
    setIsRatingSubmitting(true);
    try {
      // Create an array of promises for all student ratings
      const ratingPromises = students.map(student => 
        handleRatingSubmit(student._id, selectedBook._id)
      );

      // Wait for all ratings to be submitted
      await Promise.all(ratingPromises);

      // Show success modal
      setShowRatingSuccessModal(true);
    } catch (error) {
      console.error('Error submitting ratings:', error);
      alert('حدث خطأ أثناء تسجيل التقييمات');
    } finally {
      setIsRatingSubmitting(false);
    }
  };

  // Rating Modal Component
  const RatingModal = () => (
    <>
      <Modal 
        show={showRatingModal} 
        onHide={() => setShowRatingModal(false)}
        size="xxl"
        fullscreen={true}
        centered
        className="rating-modal"
        style={{ 
          maxWidth: '99%', 
          margin: '0 auto',
          minWidth: '95%'
        }}
      >
        <Modal.Header  style={{ backgroundColor: '#f8f9fa' }}>
          <Modal.Title className="w-100 text-center">
            <h5 className="mb-0" style={{ color: '#2c3e50' }}>
              تقييم المعلم اداء الطلاب في كتاب: {selectedBook?.title}
            </h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ 
          backgroundColor: '#f4f6f7', 
          maxHeight: '90vh', 
          overflowY: 'auto',
          overflowX: 'auto'
        }}>
          <div style={{ 
            width: '100%', 
            overflowX: 'auto', 
            overflowY: 'auto',
            maxHeight: '80vh'
          }}>
            <Table 
              responsive 
              bordered 
              hover 
              style={{ 
                backgroundColor: 'white', 
                width: '200%', 
                tableLayout: 'fixed',
                borderCollapse: 'separate',
                borderSpacing: '0 10px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
              className="rating-table"
            >
              <thead style={{ 
                backgroundColor: '#3498db', 
                color: 'white',
                position: 'sticky',
                top: 0,
                zIndex: 10
              }}>
                <tr style={{ textAlign: 'center' }}>
                  <th style={{ width: '20%', padding: '20px', verticalAlign: 'middle' }}>اسم الطالب</th>
                  <th style={{ width: '20%', padding: '20px', verticalAlign: 'middle' }}>الحضور</th>
                  <th style={{ width: '20%', padding: '20px', verticalAlign: 'middle' }}>
                    مهارات القراءة
                    <div style={{ fontSize: '0.8em', fontWeight: 'normal' }}>
                      <div>القراءة الكاملة</div>
                      <div>الفهم العميق</div>
                      <div>التأمل الشخصي</div>
                    </div>
                  </th>
                  <th style={{ width: '20%', padding: '20px', verticalAlign: 'middle' }}>الثقة</th>
                  <th style={{ width: '20%', padding: '20px', verticalAlign: 'middle' }}>
                    التفكير النقدي
                    <div style={{ fontSize: '0.8em', fontWeight: 'normal' }}>
                      <div>الأفكار الإبداعية</div>
                      <div>ربط التجارب</div>
                      <div>التفكير المستقل</div>
                    </div>
                  </th>
                  <th style={{ width: '20%', padding: '20px', verticalAlign: 'middle' }}>
                    مهارات التواصل
                    <div style={{ fontSize: '0.8em', fontWeight: 'normal' }}>
                      <div>التعبير الواضح</div>
                      <div>الاستماع الفعال</div>
                      <div>التغذية الراجعة البناءة</div>
                    </div>
                  </th>
                  <th style={{ width: '20%', padding: '20px', verticalAlign: 'middle' }}>
                    المهارات الاجتماعية
                    <div style={{ fontSize: '0.8em', fontWeight: 'normal' }}>
                      <div>المشاركة الفعالة</div>
                      <div>احترام التنوع</div>
                      <div>بناء الصداقات</div>
                    </div>
                  </th>
                  <th style={{ width: '20%', padding: '20px', verticalAlign: 'middle' }}>السلوك العام</th>
                </tr>
              </thead>
              <tbody>
                {students.map(student => (
                  <tr 
                    key={student._id} 
                    style={{ 
                      backgroundColor: '#f8f9fa', 
                      transition: 'background-color 0.3s ease',
                      margin: '10px 0'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e9ecef'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                  >
                    <td style={{ textAlign: 'center', padding: '15px', verticalAlign: 'middle' }}>
                      {student.name}
                    </td>
                    <td style={{ textAlign: 'center', padding: '15px', verticalAlign: 'middle' }}>
                      <Form.Select 
                        size="sm" 
                        value={studentRatings[student._id]?.audience || 'لا'}
                        onChange={(e) => updateStudentRating(
                          student._id, 
                          'audience', 
                          'audience', 
                          e.target.value
                        )}
                      >
                        <option value="نعم">نعم</option>
                        <option value="لا">لا</option>
                      </Form.Select>
                    </td>
                    <td style={{ textAlign: 'center', padding: '15px', verticalAlign: 'middle' }}>
                      {['completeReading', 'deepUnderstanding', 'personalReflection'].map((subCategory) => (
                        <Form.Select 
                          key={subCategory}
                          size="sm" 
                          className="mb-2"
                          value={studentRatings[student._id]?.[subCategory] || 1}
                          onChange={(e) => updateStudentRating(
                            student._id, 
                            'readingSkills', 
                            subCategory, 
                            parseInt(e.target.value)
                          )}
                        >
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <option key={rating} value={rating}>{rating}</option>
                          ))}
                        </Form.Select>
                      ))}
                    </td>
                    <td style={{ textAlign: 'center', padding: '15px', verticalAlign: 'middle' }}>
                      <Form.Select 
                        size="sm" 
                        value={studentRatings[student._id]?.confidence || 1}
                        onChange={(e) => updateStudentRating(
                          student._id, 
                          'confidence', 
                          'confidence', 
                          parseInt(e.target.value)
                        )}
                      >
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <option key={rating} value={rating}>{rating}</option>
                        ))}
                      </Form.Select>
                    </td>
                    <td style={{ textAlign: 'center', padding: '15px', verticalAlign: 'middle' }}>
                      {['creativeIdeas', 'connectingExperiences', 'independentThinking'].map((subCategory) => (
                        <Form.Select 
                          key={subCategory}
                          size="sm" 
                          className="mb-2"
                          value={studentRatings[student._id]?.[subCategory] || 1}
                          onChange={(e) => updateStudentRating(
                            student._id, 
                            'criticalThinking', 
                            subCategory, 
                            parseInt(e.target.value)
                          )}
                        >
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <option key={rating} value={rating}>{rating}</option>
                          ))}
                        </Form.Select>
                      ))}
                    </td>
                    <td style={{ textAlign: 'center', padding: '15px', verticalAlign: 'middle' }}>
                      {['clearExpression', 'activeListening', 'constructiveFeedback'].map((subCategory) => (
                        <Form.Select 
                          key={subCategory}
                          size="sm" 
                          className="mb-2"
                          value={studentRatings[student._id]?.[subCategory] || 1}
                          onChange={(e) => updateStudentRating(
                            student._id, 
                            'communicationSkills', 
                            subCategory, 
                            parseInt(e.target.value)
                          )}
                        >
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <option key={rating} value={rating}>{rating}</option>
                          ))}
                        </Form.Select>
                      ))}
                    </td>
                    <td style={{ textAlign: 'center', padding: '15px', verticalAlign: 'middle' }}>
                      {['activeParticipation', 'respectingDiversity', 'buildingFriendships'].map((subCategory) => (
                        <Form.Select 
                          key={subCategory}
                          size="sm" 
                          className="mb-2"
                          value={studentRatings[student._id]?.[subCategory] || 1}
                          onChange={(e) => updateStudentRating(
                            student._id, 
                            'socialSkills', 
                            subCategory, 
                            parseInt(e.target.value)
                          )}
                        >
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <option key={rating} value={rating}>{rating}</option>
                          ))}
                        </Form.Select>
                      ))}
                    </td>
                    <td style={{ textAlign: 'center', padding: '15px', verticalAlign: 'middle' }}>
                      <Form.Select 
                        size="sm" 
                        value={studentRatings[student._id]?.collaboration || 1}
                        onChange={(e) => updateStudentRating(
                          student._id, 
                          'generalBehavior', 
                          'collaboration', 
                          parseInt(e.target.value)
                        )}
                      >
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <option key={rating} value={rating}>{rating}</option>
                        ))}
                      </Form.Select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ 
          backgroundColor: '#f8f9fa', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <Button 
            variant="secondary" 
            onClick={() => setShowRatingModal(false)}
            style={{ marginLeft: 'auto' }}
            disabled={isRatingSubmitting}
          >
            إغلاق
          </Button>
          <Button 
            variant="primary" 
            onClick={submitAllRatings}
            disabled={isRatingSubmitting}
            style={{ 
              marginRight: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {isRatingSubmitting ? (
              <>
                <Spinner 
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  style={{ marginLeft: '10px' }}
                />
                جاري الرفع...
              </>
            ) : (
              'رفع التقييمات'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* Success Modal */}
      <RatingSuccessModal />
    </>
  );

  // Success Modal Component
  const RatingSuccessModal = () => (
    <Modal 
      show={showRatingSuccessModal} 
      onHide={() => {
        setShowRatingSuccessModal(false);
      }}
      centered
    >
      <Modal.Body className="text-center p-5">
        <div style={{ 
          backgroundColor: '#2ecc71', 
          color: 'white', 
          borderRadius: '50%', 
          width: '100px', 
          height: '100px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          margin: '0 auto 20px',
          fontSize: '48px'
        }}>
          ✓
        </div>
        <h3 style={{ color: '#2c3e50', marginBottom: '20px' }}>
          تم رفع التقييمات بنجاح
        </h3>
        <p style={{ color: '#7f8c8d' }}>
          تم تسجيل تقييمات الطلاب بنجاح في قاعدة البيانات
        </p>
        <Button 
          variant="primary" 
          onClick={() => setShowRatingSuccessModal(false)}
          style={{ marginTop: '20px' }}
        >
          إغلاق
        </Button>
      </Modal.Body>
    </Modal>
  );

  // Render loading or error state
  if (loading) return (
    <div 
      className="d-flex justify-content-center align-items-center" 
      style={{ 
        height: '100vh', 
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        zIndex: 1000 
      }}
    >
      <div className="text-center">
        <div 
          className="spinner-grow text-primary" 
          role="status" 
          style={{ 
            width: '4rem', 
            height: '4rem', 
            animation: 'spinner-grow 1.5s linear infinite' 
          }}
        >
          <span className="visually-hidden">جاري التحميل...</span>
        </div>
        <h4 className="mt-3 text-primary">
          <i className="fas fa-book me-2"></i>
          جاري تحميل كتبك...
        </h4>
        <p className="text-muted">يرجى الانتظار قليلاً</p>
      </div>
    </div>
  );
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">
        
        الكتب
        <i className="fas fa-book me-2"></i>
      </h2>

      {books.length === 0 ? (
        <div className="text-center">
          <p>لم تقم بإضافة أي كتب بعد</p>
        </div>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {books.map((book) => (
            <Col key={book._id}>
              <Card className="h-100 shadow-sm">
                <Card.Img 
                  variant="top" 
                  src={book.bookImage} 
                  style={{ 
                    height: '250px', 
                    objectFit: 'cover' 
                  }} 
                />
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <Card.Text>
                    <strong>المؤلف:</strong> {book.author}<br />
                    <strong>الرسام:</strong> {book.illustrator || 'غير محدد'}<br />
                    <strong>عدد الصفحات:</strong> {book.numberOfPages || 'غير محدد'}<br />
                    <strong>تاريخ المناقشة:</strong> {book.Discussiondate ? new Date(book.Discussiondate).toLocaleDateString('ar-EG', { day: 'numeric', month: 'numeric', year: 'numeric' }) : 'غير محدد'}
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button 
                      variant="warning" 
                      size="sm"
                      onClick={() => {
                        setSelectedBook(book);
                        setShowUpdateModal(true);
                      }}
                    >
                      تعديل
                    </Button>
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={() => {
                        setSelectedBook(book);
                        setShowDeleteModal(true);
                      }}
                    >
                      حذف
                    </Button>
                    <Button 
                      variant="success" 
                      size="sm"
                      onClick={() => {
                        setSelectedBook(book);
                        setShowRatingModal(true);
                      }}
                    >
                     تقييم الطلاب
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Delete Confirmation Modal */}
      <Modal 
        show={showDeleteModal} 
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header >
          <Modal.Title>تأكيد الحذف</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          هل أنت متأكد من رغبتك في حذف كتاب "{selectedBook?.title}"؟
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={() => setShowDeleteModal(false)}
          >
            إلغاء
          </Button>
          <Button 
            variant="danger" 
            onClick={handleDeleteBook}
          >
            حذف
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Update Book Modal */}
      <Modal 
        show={showUpdateModal} 
        onHide={() => setShowUpdateModal(false)}
        centered
        size="lg"
      >
        <Modal.Header >
          <Modal.Title>تعديل كتاب</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBook && (
            <Formik
              initialValues={{
                title: selectedBook.title,
                author: selectedBook.author,
                illustrator: selectedBook.illustrator || '',
                numberOfPages: selectedBook.numberOfPages || '',
                Discussiondate: selectedBook.Discussiondate || '',
                bookImage: null
              }}
              validationSchema={bookUpdateSchema}
              onSubmit={handleUpdateBook}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                isSubmitting
              }) => (
                <Form onSubmit={handleSubmit} dir="rtl">
                  <Form.Group className="mb-3">
                    <Form.Label>عنوان الكتاب *</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.title && errors.title}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.title}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>المؤلف *</Form.Label>
                    <Form.Control
                      type="text"
                      name="author"
                      value={values.author}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.author && errors.author}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.author}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>الرسام</Form.Label>
                    <Form.Control
                      type="text"
                      name="illustrator"
                      value={values.illustrator}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>عدد الصفحات</Form.Label>
                    <Form.Control
                      type="number"
                      name="numberOfPages"
                      value={values.numberOfPages}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.numberOfPages && errors.numberOfPages}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.numberOfPages}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>تاريخ المناقشة *</Form.Label>
                    <Form.Control
                      type="date"
                      name="Discussiondate"
                      value={values.Discussiondate ? new Date(values.Discussiondate).toISOString().split('T')[0] : ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.Discussiondate && errors.Discussiondate}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.Discussiondate}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>صورة الكتاب (اختياري)</Form.Label>
                    <Form.Control
                      type="file"
                      name="bookImage"
                      onChange={(event) => {
                        setFieldValue('bookImage', event.currentTarget.files[0]);
                      }}
                      onBlur={handleBlur}
                      accept="image/*"
                    />
                  </Form.Group>

                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="w-100 mt-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'جاري التحديث...' : 'تحديث الكتاب'}
                  </Button>
                </Form>
              )}
            </Formik>
          )}
        </Modal.Body>
      </Modal>

      <RatingModal />
    </Container>
  );
}
