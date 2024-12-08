import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const ForgetPassword = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('البريد الإلكتروني غير صالح')
      .required('البريد الإلكتروني مطلوب'),
    newPassword: Yup.string()
      .min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل')
      .required('كلمة المرور الجديدة مطلوبة'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'كلمة المرور غير متطابقة')
      .required('تأكيد كلمة المرور مطلوب')
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post('https://school-book-clubs-backend.vercel.app/api/Teacher/forget-password', values);
      setAlertVariant('success');
      setAlertMessage(response?.data?.message);
      setShowAlert(true);
      resetForm();
    } catch (error) {
      setAlertVariant('danger');
      setAlertMessage(error.response?.data?.message || 'حدث خطأ أثناء تغيير كلمة المرور');
      setShowAlert(true);
    }
    setSubmitting(false);
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow">
            <Card.Body className="p-4">
              <h2 className="text-center mb-4" style={{ color: '#2c3e50' }}>تغيير كلمة مرور المعلم</h2>
              
              {showAlert && (
                <Alert 
                  variant={alertVariant} 
                  onClose={() => setShowAlert(false)} 
                  dismissible
                  className="mb-4"
                >
                  {alertMessage}
                </Alert>
              )}

              <Formik
                initialValues={{
                  email: '',
                  newPassword: '',
                  confirmPassword: ''
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form dir='rtl'>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">البريد الإلكتروني</label>
                      <Field
                        type="email"
                        name="email"
                        className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
                        placeholder="أدخل بريدك الإلكتروني"
                      />
                      {errors.email && touched.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="newPassword" className="form-label">كلمة المرور الجديدة</label>
                      <Field
                        type="password"
                        name="newPassword"
                        className={`form-control ${errors.newPassword && touched.newPassword ? 'is-invalid' : ''}`}
                        placeholder="أدخل كلمة المرور الجديدة"
                      />
                      {errors.newPassword && touched.newPassword && (
                        <div className="invalid-feedback">{errors.newPassword}</div>
                      )}
                    </div>

                    <div className="mb-4">
                      <label htmlFor="confirmPassword" className="form-label">تأكيد كلمة المرور</label>
                      <Field
                        type="password"
                        name="confirmPassword"
                        className={`form-control ${errors.confirmPassword && touched.confirmPassword ? 'is-invalid' : ''}`}
                        placeholder="أدخل تأكيد كلمة المرور"
                      />
                      {errors.confirmPassword && touched.confirmPassword && (
                        <div className="invalid-feedback">{errors.confirmPassword}</div>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-100 btn btn-primary btn-lg"
                      disabled={isSubmitting}
                      style={{ 
                        backgroundColor: '#3498db',
                        borderColor: '#3498db'
                      }}
                    >
                      {isSubmitting ? 'جاري المعالجة...' : 'تغيير كلمة المرور'}
                    </Button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgetPassword;
