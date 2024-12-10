import React, { useState, useContext } from 'react';
import { Container, Row, Col, Card, Form, Button, Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { DataContext } from '../../context/context.js';

export default function AddBooks() {
  const { createBook, teacherId, decodeToken } = useContext(DataContext);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Validation schema
  const bookValidationSchema = Yup.object().shape({
    title: Yup.string().required('عنوان الكتاب مطلوب'),
    author: Yup.string().required('اسم المؤلف مطلوب'),
    illustrator: Yup.string(),
    numberOfPages: Yup.number()
      .positive('عدد الصفحات يجب أن يكون رقمًا موجبًا')
      .integer('عدد الصفحات يجب أن يكون رقمًا صحيحًا')
      .nullable(),
    bookLink: Yup.string().url('رابط الكتاب يجب أن يكون رابطًا صحيحًا').nullable(),
    bookImage: Yup.mixed().required('صورة الكتاب مطلوبة')
  });

  const handleBookSubmit = async (values, { setSubmitting, resetForm }) => {
    const token = localStorage.getItem('token');
    const decodedToken = decodeToken(token);
    const schoolCode = decodedToken.schoolCode;

    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('author', values.author);
    formData.append('schoolCode', schoolCode);
    if (values.illustrator) formData.append('illustrator', values.illustrator);
    if (values.numberOfPages) formData.append('numberOfPages', values.numberOfPages);
    if (values.bookLink) formData.append('bookLink', values.bookLink);
    formData.append('bookImage', values.bookImage);

    try {
      const response = await createBook(formData, teacherId);
      
      // Show success modal
      setSuccessMessage(response.status || 'تم إضافة الكتاب بنجاح');
      setShowSuccessModal(true);
      
      // Reset form
      resetForm();
    } catch (error) {
      // Show error modal or handle error
      setSuccessMessage(error.response?.data?.message || 'حدث خطأ أثناء إضافة الكتاب');
      setShowSuccessModal(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg">
            <Card.Body className="p-5">
              <h2 className="text-center mb-4">
                <i className="fas fa-book-medical me-2"></i>
                إضافة كتاب جديد
              </h2>

              <Formik
                initialValues={{
                  title: '',
                  author: '',
                  illustrator: '',
                  numberOfPages: '',
                  bookLink: '',
                  bookImage: null
                }}
                validationSchema={bookValidationSchema}
                onSubmit={handleBookSubmit}
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
                      <Form.Label>صورة الكتاب *</Form.Label>
                      <Form.Control
                        type="file"
                        name="bookImage"
                        onChange={(event) => {
                          setFieldValue('bookImage', event.currentTarget.files[0]);
                        }}
                        onBlur={handleBlur}
                        isInvalid={touched.bookImage && errors.bookImage}
                        accept="image/*"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.bookImage}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Button 
                      variant="primary" 
                      type="submit" 
                      className="w-100 mt-3"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'جاري الإضافة...' : 'إضافة الكتاب'}
                    </Button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Success Modal */}
      <Modal 
        show={showSuccessModal} 
        onHide={() => setShowSuccessModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>نتيجة العملية</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <i 
            className="fas fa-check-circle text-success mb-3" 
            style={{ fontSize: '4rem' }}
          ></i>
          <p className="fs-5">{successMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="primary" 
            onClick={() => setShowSuccessModal(false)}
          >
            إغلاق
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
