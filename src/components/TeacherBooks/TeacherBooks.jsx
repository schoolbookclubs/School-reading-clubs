import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { DataContext } from '../../context/context.js';

export default function TeacherBooks() {
  const { fetchTeacherBooks, deleteBook, updateBook } = useContext(DataContext);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modals and editing states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  // Validation schema for book update
  const bookUpdateSchema = Yup.object().shape({
    title: Yup.string().required('عنوان الكتاب مطلوب'),
    author: Yup.string().required('اسم المؤلف مطلوب'),
    illustrator: Yup.string(),
    numberOfPages: Yup.number()
      .positive('عدد الصفحات يجب أن يكون رقمًا موجبًا')
      .integer('عدد الصفحات يجب أن يكون رقمًا صحيحًا')
      .nullable(),
    bookLink: Yup.string().url('رابط الكتاب يجب أن يكون رابطًا صحيحًا').nullable(),
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
    if (values.bookLink) formData.append('bookLink', values.bookLink);
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
        <i className="fas fa-book me-2"></i>
        كتبي
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
                    {book.bookLink && (
                      <div className="mt-2">
                        <a 
                          href={book.bookLink} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-primary text-decoration-none"
                        >
                          <i className="fas fa-external-link-alt me-2"></i>
                          فتح الكتاب
                        </a>
                      </div>
                    )}
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
        <Modal.Header closeButton>
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
        <Modal.Header closeButton>
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
                bookLink: selectedBook.bookLink || '',
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
                    <Form.Label>رابط الكتاب</Form.Label>
                    <Form.Control
                      type="url"
                      name="bookLink"
                      value={values.bookLink}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.bookLink && errors.bookLink}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.bookLink}
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
    </Container>
  );
}
