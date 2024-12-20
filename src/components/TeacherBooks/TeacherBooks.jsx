import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button, Modal, Table, Form, Spinner, Toast } from 'react-bootstrap';
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

  // Toast notification states
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success');

  // Modals and editing states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // State for storing ratings per book
  const [bookRatings, setBookRatings] = useState({});

  // Notification Modal state
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationVariant, setNotificationVariant] = useState('success');

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
  const evaluationCriteria = [
   
    {
      id: 'attendance',
      name: 'الحضور',
      type: 'attendance',
      category: 'attendance'
    },
    
    // Reading Skills Group Header
    {
      id: 'readingSkillsHeader',
      name: 'مهارات القراءة والفهم',
      type: 'header',
      category: 'readingSkills'
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
    
    // Confidence Group Header
    {
      id: 'confidenceHeader',
      name: 'الثقة بالنفس',
      type: 'header',
      category: 'confidence'
    },
    {
      id: 'confidenceExpression',
      name: 'يشارك بثقة ويعبر عن رأيه بحرية',
      type: 'rating',
      category: 'confidence'
    },
    
    // Critical Thinking Group Header
    {
      id: 'criticalThinkingHeader',
      name: 'التفكير النقدي والابداعي',
      type: 'header',
      category: 'criticalThinking'
    },
    {
      id: 'creativeIdeas',
      name: 'يضيف أفكار وملاحظات خلاقة للنقاش',
      type: 'rating',
      category: 'criticalThinking'
    },
    {
      id: 'lifeConnectionThinking',
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
    
    // Communication Skills Group Header
    {
      id: 'communicationSkillsHeader',
      name: 'مهارات التواصل',
      type: 'header',
      category: 'communicationSkills'
    },
    {
      id: 'clearCommunication',
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
      id: 'constructiveInteraction',
      name: 'يتفاعل مع آراء الآخرين بطرح أسئلة أو تقديم ردود بناءة',
      type: 'rating',
      category: 'communicationSkills'
    },
    
    // Social Skills Group Header
    {
      id: 'socialSkillsHeader',
      name: 'المهارات الاجتماعية',
      type: 'header',
      category: 'socialSkills'
    },
    {
      id: 'activeParticipation',
      name: 'يشارك بفعالية في النقاشات والأنشطة',
      type: 'rating',
      category: 'socialSkills'
    },
    {
      id: 'respectDiversity',
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
    
    // General Behavior Group Header
    {
      id: 'generalBehaviorHeader',
      name: 'السلوك العام',
      type: 'header',
      category: 'generalBehavior'
    },
    {
      id: 'collaboration',
      name: 'يتعاون مع زملائه ويشجعهم ويعزز التفاعل الإيجابي',
      type: 'rating',
      category: 'generalBehavior'
    }
  ];

  // Initialize student ratings with empty values
  const initializeStudentRatings = () => {
    const defaultRatings = {};
    students.forEach(student => {
      defaultRatings[student._id] = {};  // Empty object for each student
    });
    return defaultRatings;
  };

  // State for student ratings
  const [studentRatings, setStudentRatings] = useState(initializeStudentRatings());

  // Reset ratings when changing books
  const handleBookSelect = (book) => {
    setSelectedBook(book);
    setStudentRatings({}); // Reset all student ratings when selecting a new book
  };

  // Update handleRatingChange to store ratings per book
  const handleRatingChange = (student, skillId, value) => {
    const correctStudentId = student._id || student.id;
    
    // تحويل القيمة إلى رقم إذا كانت قيمة عددية وليست "اختر"
    const processedValue = value === "اختر" ? undefined : 
                         skillId === 'attendance' ? value : 
                         parseInt(value);
    
    if (processedValue === undefined) {
      // إذا تم اختيار "اختر"، نزيل القيمة من التقييمات
      setStudentRatings(prevRatings => {
        const newRatings = {
          ...prevRatings,
          [correctStudentId]: {
            ...(prevRatings[correctStudentId] || {})
          }
        };
        delete newRatings[correctStudentId][skillId];
        return newRatings;
      });
    } else {
      // إذا تم اختيار قيمة حقيقية، نضيفها للتقييمات
      setStudentRatings(prevRatings => ({
        ...prevRatings,
        [correctStudentId]: {
          ...(prevRatings[correctStudentId] || {}),
          [skillId]: processedValue
        }
      }));
    }
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

  // Function to show notification
  const showNotification = (message, variant) => {
    setNotificationMessage(message);
    setNotificationVariant(variant);
    setShowNotificationModal(true);
  };

  // Handle rating submission
  const handleRatingSubmit = async (ratings) => {
    if (!selectedBook || !selectedStudent) return;

    try {
      const ratingData = {
        bookId: selectedBook._id,
        ratings: {
          audience: ratings.audience || 'لا',
          completeReading: ratings.completeReading || 1,
          deepUnderstanding: ratings.deepUnderstanding || 1,
          personalReflection: ratings.personalReflection || 1,
          confidence: ratings.confidence || 1,
          creativeIdeas: ratings.creativeIdeas || 1,
          connectingExperiences: ratings.connectingExperiences || 1,
          independentThinking: ratings.independentThinking || 1,
          clearExpression: ratings.clearExpression || 1,
          activeListening: ratings.activeListening || 1,
          constructiveFeedback: ratings.constructiveFeedback || 1,
          activeParticipation: ratings.activeParticipation || 1,
          respectingDiversity: ratings.respectingDiversity || 1,
          buildingFriendships: ratings.buildingFriendships || 1,
          collaboration: ratings.collaboration || 1
        }
      };

      const response = await rateStudent([selectedStudent], ratingData);
      showNotification(response.message, 'success');
      
      // إغلاق النافذة وإعادة تعيين الحالة
      setShowRatingModal(false);
      setSelectedBook(null);
      setSelectedStudent(null);
      setStudentRatings({});
    } catch (error) {
      if (error.ratedStudents) {
        // عرض رسالة عن الطلاب المقيمين مسبقاً
        showNotification(error.message, 'danger');
      } else {
        // عرض رسالة الخطأ العامة
        showNotification(error.message, 'danger');
      }
    }
  };

  // Submit all ratings for multiple students
  const submitAllRatings = async () => {
    if (!selectedBook || Object.keys(studentRatings).length === 0) return;

    // Validate that all students have all required ratings
    const hasEmptyRatings = students.some(student => {
      const studentRating = studentRatings[student._id] || {};
      return evaluationCriteria
        .filter(criteria => criteria.type === 'rating' || criteria.type === 'attendance')
        .some(criteria => !studentRating[criteria.id] || studentRating[criteria.id] === "اختر");
    });

    if (hasEmptyRatings) {
      showNotification('يجب تقييم جميع المهارات لكل طالب', 'warning');
      return;
    }

    setIsRatingSubmitting(true);
    try {
      const ratedStudentIds = Object.keys(studentRatings).filter(studentId => 
        Object.keys(studentRatings[studentId]).length > 0
      );

      if (ratedStudentIds.length === 0) {
        showNotification('لم يتم اختيار أي طالب للتقييم', 'warning');
        return;
      }

      // إرسال التقييم لكل طالب على حدة
      for (const studentId of ratedStudentIds) {
        const ratingData = {
          bookId: selectedBook._id,
          ratings: {
            attendance: studentRatings[studentId]?.attendance || 'لا',
            completeReading: studentRatings[studentId]?.completeReading || 1,
            deepUnderstanding: studentRatings[studentId]?.deepUnderstanding || 1,
            personalReflection: studentRatings[studentId]?.personalReflection || 1,
            confidenceExpression: studentRatings[studentId]?.confidenceExpression || 1,
            creativeIdeas: studentRatings[studentId]?.creativeIdeas || 1,
            lifeConnectionThinking: studentRatings[studentId]?.lifeConnectionThinking || 1,
            independentThinking: studentRatings[studentId]?.independentThinking || 1,
            clearCommunication: studentRatings[studentId]?.clearCommunication || 1,
            activeListening: studentRatings[studentId]?.activeListening || 1,
            constructiveInteraction: studentRatings[studentId]?.constructiveInteraction || 1,
            activeParticipation: studentRatings[studentId]?.activeParticipation || 1,
            respectDiversity: studentRatings[studentId]?.respectDiversity || 1,
            buildingFriendships: studentRatings[studentId]?.buildingFriendships || 1,
            collaboration: studentRatings[studentId]?.collaboration || 1
          }
        };

        const response = await rateStudent(studentId, ratingData);
        showNotification(response.message, 'success');
      }
      
      setShowRatingModal(false);
      setSelectedBook(null);
      setStudentRatings({});
    } catch (error) {
      if (error.ratedStudents) {
        showNotification(error.message, 'danger');
      } else {
        showNotification(error.message, 'danger');
      }
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

  // Update the openRatingModal function
  const openRatingModal = (book) => {
    handleBookSelect(book);
    setShowRatingModal(true);
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
          <Modal.Header className="bg-primary text-white text-center">
            <Modal.Title className='text-center w-100'>
              تقييم أداء الطلاب - {selectedBook?.title}
            </Modal.Title>
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
                  {evaluationCriteria.map((skill) => (
                    <tr key={skill.id}>
                      {skill.type === 'header' ? (
                        <td colSpan={students.length + 1} className="bg-light fw-bold text-right">{skill.name}</td>
                      ) : (
                        <>
                          <td className="font-weight-bold text-right">{skill.name}</td>
                          {students.map((student) => (
                            <td className='w-25' key={student._id}>
                              {renderRatingSelect(student, skill)}
                            </td>
                          ))}
                        </>
                      )}
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
              disabled={isRatingSubmitting || Object.keys(studentRatings).length === 0 || !Object.values(studentRatings).some(ratings => Object.keys(ratings).length > 0)}
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
          
          جاري تحميل كتبك...
          <i className="fas fa-book me-2"></i>
        </h4>
        <p className="text-muted">يرجى الانتظار قليلاً</p>
      </div>
    </div>
  );
  if (error) return <div className="text-danger">{error}</div>;

  // Render book cards
  const renderBookCards = () => {
    return books.map((book) => (
      <Col key={book._id} md={4} className="mb-4">
        <Card className="h-100">
          <Card.Img 
            variant="top" 
            src={book.bookImage} 
            alt={book.title}
            style={{ height: '350px', width: '100%', objectFit: 'cover' }}
          />
          <Card.Body>
            <Card.Title>{book.title}</Card.Title>
            <Card.Text>
              المؤلف: {book.author}<br />
              {book.illustrator && <>الرسام: {book.illustrator}<br /></>}
              عدد الصفحات: {book.numberOfPages}<br />
              تاريخ المناقشة: {new Date(book.Discussiondate).toLocaleDateString('ar-EG')}
            </Card.Text>
            <div className="d-flex justify-content-between">
              <Button 
                variant="primary" 
                onClick={() => openRatingModal(book)}
              >
                تقييم الطلاب
              </Button>
              <Button 
                variant="warning" 
                onClick={() => {
                  setSelectedBook(book);
                  setShowUpdateModal(true);
                }}
              >
                تعديل
              </Button>
              <Button 
                variant="danger" 
                onClick={() => {
                  setSelectedBook(book);
                  setShowDeleteModal(true);
                }}
              >
                حذف
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    ));
  };

  // تحديث جزء عرض التقييمات في Modal
  const renderRatingSelect = (student, skill) => {
    const value = studentRatings[student._id]?.[skill.id] || "اختر";
    
    return (
      <Form.Control
        as="select"
        size="sm"
        value={value}
        onChange={(e) => handleRatingChange(student, skill.id, e.target.value)}
        className="text-center"
      >
        <option value="اختر">اختر</option>
        {skill.id === 'attendance' ? (
          <>
            <option value="نعم">نعم</option>
            <option value="لا">لا</option>
          </>
        ) : (
          [1, 2, 3, 4, 5].map((rating) => (
            <option key={rating} value={rating}>
              {rating}
            </option>
          ))
        )}
      </Form.Control>
    );
  };

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
          {renderBookCards()}
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

      {/* Notification Modal */}
      <Modal
        show={showNotificationModal}
        onHide={() => setShowNotificationModal(false)}
        centered
      >
        <Modal.Header  className={`bg-${notificationVariant} text-white`}>
          <Modal.Title>
            {notificationVariant === 'success' && 'نجاح'}
            {notificationVariant === 'warning' && 'تنبيه'}
            {notificationVariant === 'danger' && 'خطأ'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{notificationMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNotificationModal(false)}>
            إغلاق
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Notification */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={3000}
        autohide
        className={`position-fixed top-0 end-0 m-4 bg-${toastVariant}`}
        style={{ zIndex: 9999 }}
      >
        <Toast.Header>
          <strong className="me-auto">{toastVariant === 'success' ? 'نجاح' : 'خطأ'}</strong>
        </Toast.Header>
        <Toast.Body className={toastVariant === 'success' ? 'text-dark' : 'text-white'}>
          {toastMessage}
        </Toast.Body>
      </Toast>
    </Container>
  );
}