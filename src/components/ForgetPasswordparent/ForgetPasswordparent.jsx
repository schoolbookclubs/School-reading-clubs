import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form, Container, Row, Col, Card, Spinner } from "react-bootstrap";
import axios from "axios";
import * as Yup from 'yup';
import { Formik } from 'formik';

const ForgotPasswordParent = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
      email: Yup.string()
          .email('البريد الإلكتروني غير صالح')
          .required('البريد الإلكتروني مطلوب'),
      verificationCode: Yup.string()
          .required('رمز التحقق مطلوب')
          .length(6, 'رمز التحقق يجب أن يكون 6 أرقام'),
      newPassword: Yup.string()
          .min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل')
          .required('كلمة المرور الجديدة مطلوبة'),
      confirmPassword: Yup.string()
          .oneOf([Yup.ref('newPassword')], 'كلمات المرور غير متطابقة')
          .required('تأكيد كلمة المرور مطلوب')
  });

  const handleSubmit = async (values, { setSubmitting }) => {
      setIsLoading(true);
      try {
          const response = await axios.post(
              "https://school-book-clubs-backend.vercel.app/api/parent/verify-code-reset-password",
              values
          );
          setModalMessage(response.data.message);
          setIsSuccess(true);
          setShowModal(true);
          setTimeout(() => {
              navigate("/LoginParent");
          }, 2000);
      } catch (error) {
          setModalMessage(
              error.response?.data?.message || "حدث خطأ أثناء تغيير كلمة المرور"
          );
          setIsSuccess(false);
          setShowModal(true);
      } finally {
          setIsLoading(false);
          setSubmitting(false);
      }
  };

  const handleCloseModal = () => {
      setShowModal(false);
      if (isSuccess) {
          navigate("/LoginStudent");
      }
  };

  return (
      <Container className="mt-5">
          <Row className="justify-content-center">
              <Col md={6}>
                  <Card className="p-4 shadow-lg border-0" style={{ borderRadius: '15px' }}>
                      <Card.Body>
                          <h2 className="text-center mb-4" style={{ color: '#2c3e50' }}>تغيير كلمة المرور</h2>
                          <Formik
                              initialValues={{
                                  email: '',
                                  verificationCode: '',
                                  newPassword: '',
                                  confirmPassword: ''
                              }}
                              validationSchema={validationSchema}
                              onSubmit={handleSubmit}
                          >
                              {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
                                  <Form noValidate onSubmit={handleSubmit} dir="rtl">
                                      <Form.Group className="mb-3">
                                          <Form.Label style={{ color: '#34495e' }}>البريد الإلكتروني</Form.Label>
                                          <Form.Control
                                              type="email"
                                              name="email"
                                              value={values.email}
                                              onChange={handleChange}
                                              isInvalid={touched.email && errors.email}
                                              placeholder="أدخل بريدك الإلكتروني"
                                              className="py-2"
                                              style={{ borderRadius: '10px' }}
                                          />
                                          <Form.Control.Feedback type="invalid">
                                              {errors.email}
                                          </Form.Control.Feedback>
                                      </Form.Group>

                                      <Form.Group className="mb-3">
                                          <Form.Label style={{ color: '#34495e' }}>رمز التحقق</Form.Label>
                                          <Form.Control
                                              type="text"
                                              name="verificationCode"
                                              value={values.verificationCode}
                                              onChange={handleChange}
                                              isInvalid={touched.verificationCode && errors.verificationCode}
                                              placeholder="أدخل رمز التحقق"
                                              className="py-2"
                                              style={{ borderRadius: '10px' }}
                                          />
                                          <Form.Control.Feedback type="invalid">
                                              {errors.verificationCode}
                                          </Form.Control.Feedback>
                                      </Form.Group>

                                      <Form.Group className="mb-3">
                                          <Form.Label style={{ color: '#34495e' }}>كلمة المرور الجديدة</Form.Label>
                                          <Form.Control
                                              type="password"
                                              name="newPassword"
                                              value={values.newPassword}
                                              onChange={handleChange}
                                              isInvalid={touched.newPassword && errors.newPassword}
                                              placeholder="أدخل كلمة المرور الجديدة"
                                              className="py-2"
                                              style={{ borderRadius: '10px' }}
                                          />
                                          <Form.Control.Feedback type="invalid">
                                              {errors.newPassword}
                                          </Form.Control.Feedback>
                                      </Form.Group>

                                      <Form.Group className="mb-4">
                                          <Form.Label style={{ color: '#34495e' }}>تأكيد كلمة المرور</Form.Label>
                                          <Form.Control
                                              type="password"
                                              name="confirmPassword"
                                              value={values.confirmPassword}
                                              onChange={handleChange}
                                              isInvalid={touched.confirmPassword && errors.confirmPassword}
                                              placeholder="أدخل تأكيد كلمة المرور"
                                              className="py-2"
                                              style={{ borderRadius: '10px' }}
                                          />
                                          <Form.Control.Feedback type="invalid">
                                              {errors.confirmPassword}
                                          </Form.Control.Feedback>
                                      </Form.Group>

                                      <Button 
                                          variant="primary" 
                                          type="submit" 
                                          className="w-100 py-2"
                                          style={{ 
                                              borderRadius: '10px',
                                              background: '#3498db',
                                              transition: 'all 0.3s ease'
                                          }}
                                          disabled={isLoading || isSubmitting}
                                      >
                                          {(isLoading || isSubmitting) ? (
                                              <>
                                                  <Spinner
                                                      as="span"
                                                      animation="border"
                                                      size="sm"
                                                      role="status"
                                                      aria-hidden="true"
                                                      className="me-2"
                                                  />
                                                  جاري المعالجة...
                                              </>
                                          ) : (
                                              'تغيير كلمة المرور'
                                          )}
                                      </Button>
                                  </Form>
                              )}
                          </Formik>
                      </Card.Body>
                  </Card>
              </Col>
          </Row>

          <Modal 
              show={showModal} 
              onHide={handleCloseModal} 
              centered 
              dir="rtl"
              className="custom-modal"
          >
              <Modal.Header style={{
                  background: isSuccess ? '#2ecc71' : '#e74c3c',
                  color: 'white',
                  borderBottom: 'none',
                  borderRadius: '15px 15px 0 0',
                  padding: '1.5rem'
              }}>
                  <Modal.Title>
                      {isSuccess ? "✓ نجاح" : "⚠ خطأ"}
                  </Modal.Title>
              </Modal.Header>
              <Modal.Body style={{
                  padding: '2rem',
                  fontSize: '1.1rem',
                  textAlign: 'center'
              }}>
                  <p className={isSuccess ? "text-success" : "text-danger"}>
                      {modalMessage}
                  </p>
              </Modal.Body>
              <Modal.Footer style={{
                  borderTop: 'none',
                  padding: '1rem 2rem',
                  justifyContent: 'center'
              }}>
                  <Button 
                      variant={isSuccess ? "success" : "danger"} 
                      onClick={handleCloseModal}
                      style={{
                          borderRadius: '8px',
                          padding: '0.5rem 2rem',
                          width: '120px'
                      }}
                  >
                      إغلاق
                  </Button>
              </Modal.Footer>
          </Modal>
      </Container>
  );
};

export default ForgotPasswordParent;
