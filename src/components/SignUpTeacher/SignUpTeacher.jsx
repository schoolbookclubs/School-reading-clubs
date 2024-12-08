import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, Card, Form as BootstrapForm, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const SignUpTeacher = () => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('الاسم مطلوب')
      .min(2, 'الاسم يجب أن يكون حرفين على الأقل'),
    email: Yup.string()
      .email('البريد الإلكتروني غير صالح')
      .required('البريد الإلكتروني مطلوب'),
    password: Yup.string()
      .required('كلمة المرور مطلوبة')
      .min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post('http://localhost:4000/api/auth/signup', {
        name: values.name,
        email: values.email,
        password: values.password,
        role: 'معلم'
      });

      setAlertVariant('success');
      setAlertMessage(response?.data?.message);
      setShowAlert(true);
      resetForm();
      
      setTimeout(() => {
        navigate('/LoginTeacher');
      }, 1500);

    } catch (error) {
      setAlertVariant('danger');
      setAlertMessage(error.response?.data?.message || 'حدث خطأ أثناء إنشاء الحساب');
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
            <h2 className="text-center mb-4">
            <i className="fa-solid fa-user-tie me-2"></i> 
انشاء حساب جديد للمعلم</h2>
              
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
                initialValues={{ name: '', email: '', password: '' }}
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
                      <BootstrapForm.Label className="fs-5">اسم المعلم</BootstrapForm.Label>
                      <BootstrapForm.Control
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.name && errors.name}
                      />
                      <BootstrapForm.Control.Feedback type="invalid">
                        {errors.name}
                      </BootstrapForm.Control.Feedback>
                    </BootstrapForm.Group>

                    <BootstrapForm.Group className="mb-3">
                      <BootstrapForm.Label className="fs-5">البريد الإلكتروني الخاص بالمعلم</BootstrapForm.Label>
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
                      <BootstrapForm.Label className="fs-5">كلمة المرور</BootstrapForm.Label>
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
                      {isSubmitting ? 'جاري إنشاء الحساب...' : 'إنشاء حساب'}
                    </Button>
                  </Form>
                )}
              </Formik>

              <div className="text-center mt-3">
                <p className="mb-0">
                <Button
                    variant="link"
                    className="p-0 fs-5 text-decoration-none"
                    onClick={() => navigate('/LoginTeacher')}
                  >
                    تسجيل الدخول
                  </Button>
                  لديك حساب بالفعل؟{' '}
                  
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );

};

export default SignUpTeacher;
