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

  // Updated skills array with comprehensive rating options
  const skills = [
    {
      id: 'attendance',
      name: 'الحضور',
      type: 'boolean'
    },
    {
      id: 'completeReading',
      name: 'يقرأ الكتاب قراءة تامة وواعية',
      type: 'rating',
      category: 'readingSkills'
    },
    {
      id: 'deepUnderstanding',
      name: 'تعكس مشاركاته فهمًا عميقًا',
      type: 'rating',
      category: 'readingSkills'
    },
    {
      id: 'personalReflection',
      name: 'يناقش تأثير النص على مواقفه ومعتقداته الشخصية',
      type: 'rating',
      category: 'readingSkills'
    },
    {
      id: 'confidence',
      name: 'يشارك بثقة ويعبر عن رأيه بحرية',
      type: 'rating'
    },
    {
      id: 'creativeIdeas',
      name: 'يضيف أفكار وملاحظات خلاقة للنقاش',
      type: 'rating',
      category: 'criticalThinking'
    },
    {
      id: 'connectingExperiences',
      name: 'يربط بين النصوص المقروءة وتجارب الحياة الواقعية',
      type: 'rating',
      category: 'criticalThinking'
    },
    {
      id: 'independentThinking',
      name: 'يميز بين الأفكار وله رأي مستقل',
      type: 'rating',
      category: 'criticalThinking'
    },
    {
      id: 'clearExpression',
      name: 'يعبر عن أفكاره بلغة واضحة ودقيقة',
      type: 'rating',
      category: 'communicationSkills'
    },
    {
      id: 'activeListening',
      name: 'يصغي إلى أقرانه باهتمام',
      type: 'rating',
      category: 'communicationSkills'
    },
    {
      id: 'constructiveFeedback',
      name: 'يتفاعل مع آراء الآخرين بطرح أسئلة أو تقديم ردود بناءة',
      type: 'rating',
      category: 'communicationSkills'
    },
    {
      id: 'activeParticipation',
      name: 'يشارك بفعالية في النقاشات والأنشطة',
      type: 'rating',
      category: 'socialSkills'
    },
    {
      id: 'respectingDiversity',
      name: 'يحترم وجهات النظر المختلفة',
      type: 'rating',
      category: 'socialSkills'
    },
    {
      id: 'buildingFriendships',
      name: 'يكون صداقات بناءة مع أقرانه',
      type: 'rating',
      category: 'socialSkills'
    },
    {
      id: 'collaboration',
      name: 'يتعاون مع زملائه ويشجعهم ويعزز التفاعل الإيجابي',
      type: 'rating',
      category: 'generalBehavior'
    }
  ];

  // Initialize student ratings with default values
  const initializeStudentRatings = () => {
    const defaultRatings = {};
    students.forEach(student => {
      defaultRatings[student._id] = {
        // Boolean skills
        attendance: 'لا',

        // Reading Skills
        completeReading: 1,
        deepUnderstanding: 1,
        personalReflection: 1,

        // Confidence
        confidence: 1,

        // Critical Thinking
        creativeIdeas: 1,
        connectingExperiences: 1,
        independentThinking: 1,

        // Communication Skills
        clearExpression: 1,
        activeListening: 1,
        constructiveFeedback: 1,

        // Social Skills
        activeParticipation: 1,
        respectingDiversity: 1,
        buildingFriendships: 1,

        // General Behavior
        collaboration: 1
      };
    });
    return defaultRatings;
  };

  // State for student ratings
  const [studentRatings, setStudentRatings] = useState(initializeStudentRatings());

  // Updated function to handle student ratings
  const updateStudentRating = (studentId, skillId, value) => {
    // Ensure we're using the correct student object
    const student = students.find(s => s.id === studentId || s._id === studentId);
    
    if (!student) {
      console.error('Student not found:', studentId);
      return;
    }

    // Use the correct student ID
    const correctStudentId = student._id || student.id;

    setStudentRatings(prevRatings => ({
      ...prevRatings,
      [correctStudentId]: {
        ...(prevRatings[correctStudentId] || {}),
        [skillId]: value
      }
    }));
  };

  // Add new state for loading and success
  const [isRatingSubmitting, setIsRatingSubmitting] = useState(false);
  const [showRatingSuccessModal, setShowRatingSuccessModal] = useState(false);

  // State for handling submission result
  const [submissionResult, setSubmissionResult] = useState({
    show: false,
    success: false,
    message: ''
  });

  // New function to submit all ratings
  const submitAllRatings = async () => {
    setIsRatingSubmitting(true);
    
    try {
      // Prepare ratings for all students
      const allRatings = students.map(student => {
        const studentRating = studentRatings[student._id] || {};
        
        return {
          studentId: student._id,
          bookId: selectedBook._id,
          ratings: {
            audience: studentRating.attendance || 'لا',
            readingSkills: {
              completeReading: studentRating.completeReading || 1,
              deepUnderstanding: studentRating.deepUnderstanding || 1,
              personalReflection: studentRating.personalReflection || 1
            },
            confidence: studentRating.confidence || 1,
            criticalThinking: {
              creativeIdeas: studentRating.creativeIdeas || 1,
              connectingExperiences: studentRating.connectingExperiences || 1,
              independentThinking: studentRating.independentThinking || 1
            },
            communicationSkills: {
              clearExpression: studentRating.clearExpression || 1,
              activeListening: studentRating.activeListening || 1,
              constructiveFeedback: studentRating.constructiveFeedback || 1
            },
            socialSkills: {
              activeParticipation: studentRating.activeParticipation || 1,
              respectingDiversity: studentRating.respectingDiversity || 1,
              buildingFriendships: studentRating.buildingFriendships || 1
            },
            generalBehavior: {
              collaboration: studentRating.collaboration || 1
            }
          }
        };
      });

      // Log ratings for debugging
      console.log('Submitting Ratings:', JSON.stringify(allRatings, null, 2));

      // Submit ratings for all students
      const results = await Promise.all(
        allRatings.map(rating => {
          // Validate student ID before submission
          if (!rating.studentId) {
            console.error('Invalid student ID:', rating);
            return Promise.resolve(false);
          }
          return rateStudent(rating.studentId, rating);
        })
      );

      // Check if all submissions were successful
      const allSuccessful = results.every(result => result);

      // Set submission result
      setSubmissionResult({
        show: true,
        success: allSuccessful,
        message: allSuccessful 
          ? 'تم تسجيل التقييمات بنجاح' 
          : 'حدث خطأ أثناء تسجيل بعض التقييمات'
      });

      // Close modal if successful
      if (allSuccessful) {
        setShowRatingModal(false);
      }
    } catch (error) {
      console.error('Error submitting ratings:', error);
      
      // Set error submission result
      setSubmissionResult({
        show: true,
        success: false,
        message: error.message || 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى'
      });
    } finally {
      setIsRatingSubmitting(false);
    }
  };

  // Submission Result Modal
  const SubmissionResultModal = () => {
    return (
      <Modal 
        show={submissionResult.show} 
        onHide={() => setSubmissionResult({ show: false, success: false, message: '' })}
        centered
        size="lg"
      >
        <Modal.Body className="text-center p-5">
          <div 
            style={{ 
              backgroundColor: submissionResult.success ? '#2ecc71' : '#e74c3c', 
              color: 'white', 
              borderRadius: '50%', 
              width: '150px', 
              textAlign: 'center',
              height: '150px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 30px',
              fontSize: '72px'
            }}
          >
            {submissionResult.success ? '✓' : '✗'}
          </div>
          <h2 style={{ 
            color: submissionResult.success ? '#27ae60' : '#c0392b', 
            marginBottom: '20px' ,
            textAlign: 'center',
          }}>
            {submissionResult.success ? 'عملية ناجحة' : 'خطأ في العملية'}
          </h2>
          <p style={{ 
            color: submissionResult.success ? '#2c3e50' : '#7f8c8d', 
            fontSize: '18px',
            marginBottom: '30px',
            textAlign: 'center'
          }}>
            {submissionResult.message}
          </p>
          <Button 
            variant={submissionResult.success ? 'success' : 'danger'}
            onClick={() => setSubmissionResult({ show: false, success: false, message: '' })}
            style={{ 
              padding: '10px 30px', 
              fontSize: '16px' ,
              textAlign: 'center'
            }}
            className='mx-auto d-block'
          >
            {submissionResult.success ? 'إغلاق' : 'المحاولة مرة أخرى'}
          </Button>
        </Modal.Body>
      </Modal>
    );
  };

  // Render rating modal with a traditional table
  const renderRatingModal = () => {
    return (
      <>
        <Modal 
          show={showRatingModal} 
          onHide={() => setShowRatingModal(false)} 
          size="xl" 
          centered 
          dialogClassName="rating-modal"
        >
          <Modal.Header  className="bg-primary text-white text-center">
            <Modal.Title className='text-center'>تقييم أداء الطلاب</Modal.Title>
          </Modal.Header>
          <Modal.Body className="d-flex justify-content-center">
            <div className="table-responsive" style={{width: '95%'}}>
              <table className="table table-bordered table-striped text-center">
                <thead className="thead-light">
                  <tr>
                    <th className="align-middle">المهارات</th>
                    {students.map((student) => (
                      <th key={student._id} className="align-middle">{student.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {skills.map((skill) => (
                    <tr key={skill.id}>
                      <td className="font-weight-bold text-right">{skill.name}</td>
                      {students.map((student) => (
                        <td key={student._id}>
                          {skill.type === 'boolean' ? (
                            <Form.Control
                              as="select"
                              size="sm"
                              value={studentRatings[student._id]?.[skill.id] || 'لا'}
                              onChange={(e) => updateStudentRating(student._id, skill.id, e.target.value)}
                              className="text-center"
                            >
                              <option value="نعم">نعم</option>
                              <option value="لا">لا</option>
                            </Form.Control>
                          ) : (
                            <Form.Control
                              as="select"
                              size="sm"
                              value={studentRatings[student._id]?.[skill.id] || 1}
                              onChange={(e) => updateStudentRating(student._id, skill.id, e.target.value)}
                              className="text-center"
                            >
                              {[1, 2, 3, 4, 5].map((rating) => (
                                <option key={rating} value={rating}>
                                  {rating}
                                </option>
                              ))}
                            </Form.Control>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button 
              variant="secondary" 
              onClick={() => setShowRatingModal(false)}
            >
              إلغاء
            </Button>
            <Button 
              variant="primary" 
              onClick={submitAllRatings}
              disabled={isRatingSubmitting}
            >
              {isRatingSubmitting ? <Spinner animation="border" size="sm" /> : 'حفظ التقييمات'}
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Submission Result Modal */}
        <SubmissionResultModal />
      </>
    );
  };

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

      {renderRatingModal()}
    </Container>
  );
}