import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, Card, Form as BootstrapForm, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function LoginTeacher() {
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState('success');

    const validationSchema = Yup.object().shape({
      email: Yup.string()
        .email('البريد الإلكتروني غير صالح')
        .required('البريد الإلكتروني مطلوب'),
      password: Yup.string()
        .required('كلمة المرور مطلوبة')
        .min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
    });

    const handleSubmit = async (values) => {
      try {
        const { data } = await axios.post('https://school-book-clubs-backend.vercel.app/api/Teacher/loginTeacher', values);
        
        if (data.message === 'success') {
          // تخزين التوكن في localStorage
          localStorage.setItem('token', data.token);
          setAlertVariant('success');
          setAlertMessage('تم تسجيل الدخول بنجاح');
          setShowAlert(true);
          
          setTimeout(() => {
            navigate('/dashboard');
          }, 2000);
        }
      } catch (error) {
        setAlertVariant('danger');
        setAlertMessage('فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.');
        setShowAlert(true);
      }
    };

    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="shadow">
              <Card.Body className="p-4">
              <h2 className="text-center mb-4">
              تسجيل الدخول للمعلم <i className="fa-solid fa-user-tie me-2"></i> 
    
  </h2>              
                {showAlert && (
                  <Alert 
                    variant={alertVariant} 
                    onClose={() => setShowAlert(false)} 
                    dismissible
                  >
                    {alertMessage}
                  </Alert>
                )}

                <Formik
                  initialValues={{ email: '', password: '' }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    isSubmitting,
                  }) => (
                    <Form dir="rtl" className="text-end">
                      <BootstrapForm.Group className="mb-3">
                        <BootstrapForm.Label className="fs-5" >البريد الإلكتروني للمعلم</BootstrapForm.Label>
                        <BootstrapForm.Control
                          type="email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.email && errors.email}
                        />
                        <BootstrapForm.Control.Feedback type="invalid">
                          {errors.email}
                        </BootstrapForm.Control.Feedback>
                      </BootstrapForm.Group>

                      <BootstrapForm.Group className="mb-3">
                        <BootstrapForm.Label className="fs-5">كلمة المرور الخاصة بالمعلم</BootstrapForm.Label>
                        <BootstrapForm.Control
                          type="password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.password && errors.password}
                        />
                        <BootstrapForm.Control.Feedback type="invalid">
                          {errors.password}
                        </BootstrapForm.Control.Feedback>
                      </BootstrapForm.Group>

                      <Button
                        variant="primary"
                        type="submit"
                        className="w-100 mb-3 fs-5"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'جاري التسجيل...' : 'تسجيل الدخول'}
                      </Button>
                    </Form>
                  )}
                </Formik>

                <div className="text-center mt-3">
                  <p className="mb-1">
                    <Button
                      variant="link"
                      className="p-0 fs-5 text-decoration-none"
                      onClick={() => navigate('/forgot-password-teacher')}
                    >
                      هل نسيت كلمة المرور؟
                    </Button>
                  </p>
                  
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );

}
