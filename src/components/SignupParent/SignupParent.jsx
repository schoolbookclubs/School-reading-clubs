import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, Card, Form as BootstrapForm, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupParent = () => {
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
    studentcodeinparent: Yup.string()
      .required('رمز الطالب مطلوب'),
    phone: Yup.string()
      .required('رقم الجوال مطلوب')
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post('https://school-book-clubs-backend.vercel.app/api/parent/signup', {
        name: values.name,
        email: values.email,
        password: values.password,
        studentcodeinparent: values.studentcodeinparent,
        phone: values.phone,
        role: 'ولي أمر'
      });

      setAlertVariant('success');
      setAlertMessage(response?.data?.message);
      setShowAlert(true);
      resetForm();
      
      setTimeout(() => {
        navigate('/LoginParent');
      }, 4000);

    } catch (error) {
      setAlertVariant('danger');
      setAlertMessage(error.response?.data?.message || 'حدث خطأ أثناء إنشاء الحساب');
      setShowAlert(true);
    }
    setSubmitting(false);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow">
            <Card.Body className="p-4">
              <h2 className="text-center mb-4" style={{ color: '#2c3e50' }}>انشاء حساب ولي أمر جديد</h2>
              <h2 className="text-center"> 👨‍👩‍👧‍👦</h2>
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
                initialValues={{
                  name: '',
                  email: '',
                  password: '',
                  studentcodeinparent: '',
                  phone: ''
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
                  <Form dir='rtl' noValidate onSubmit={handleSubmit}>
                    <BootstrapForm.Group className="mb-3">
                      <BootstrapForm.Label className="fs-5">الاسم</BootstrapForm.Label>
                      <BootstrapForm.Control
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        isInvalid={touched.name && errors.name}
                      />
                      <BootstrapForm.Control.Feedback type="invalid">
                        {errors.name}
                      </BootstrapForm.Control.Feedback>
                    </BootstrapForm.Group>

                    <BootstrapForm.Group className="mb-3">
                      <BootstrapForm.Label className="fs-5">البريد الإلكتروني</BootstrapForm.Label>
                      <BootstrapForm.Control
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
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
                        isInvalid={touched.password && errors.password}
                      />
                      <BootstrapForm.Control.Feedback type="invalid">
                        {errors.password}
                      </BootstrapForm.Control.Feedback>
                    </BootstrapForm.Group>

                    <BootstrapForm.Group className="mb-3">
                      <BootstrapForm.Label className="fs-5">رمز الطالب المدرسي</BootstrapForm.Label>
                      <BootstrapForm.Control
                        type="text"
                        name="studentcodeinparent"
                        value={values.studentcodeinparent}
                        onChange={handleChange}
                        isInvalid={touched.studentcodeinparent && errors.studentcodeinparent}
                      />
                      <BootstrapForm.Control.Feedback type="invalid">
                        {errors.studentcodeinparent}
                      </BootstrapForm.Control.Feedback>
                    </BootstrapForm.Group>

                    <BootstrapForm.Group className="mb-3">
                      <BootstrapForm.Label className="fs-5">رقم الجوال</BootstrapForm.Label>
                      <BootstrapForm.Control
                        type="text"
                        name="phone"
                        value={values.phone}
                        onChange={handleChange}
                        isInvalid={touched.phone && errors.phone}
                      />
                      <BootstrapForm.Control.Feedback type="invalid">
                        {errors.phone}
                      </BootstrapForm.Control.Feedback>
                    </BootstrapForm.Group>

                    <div className="d-grid">
                      <Button
                        variant="primary"
                        type="submit"
                        className="mb-3 fs-5"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'جاري التسجيل...' : 'انشاء حساب'}
                      </Button>
                    </div>
                    <div className="text-center mt-3">
                <p className="mb-0">
                لديك حساب بالفعل؟{' '}
                <Button
                    variant="link"
                    className="p-0 fs-5 text-decoration-none"
                    onClick={() => navigate('/LoginParent')}
                  >
                    تسجيل الدخول
                  </Button>
                  
                  
                </p>
              </div>
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

export default SignupParent;
