import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, Card, Form as BootstrapForm, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupStudent = () => {
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
    schoolCode: Yup.string()
      .required('رمز المدرسة مطلوب'),
    grade: Yup.string()
      .required('الصف مطلوب')
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post('https://school-book-clubs-backend.vercel.app/api/student/signup', {
        name: values.name,
        email: values.email,
        password: values.password,
        schoolCode: values.schoolCode,
        grade : values.grade,
        role: 'طالب'
      });

      setAlertVariant('success');
      setAlertMessage(response?.data?.message);
      setShowAlert(true);
      resetForm();
      
      setTimeout(() => {
        navigate('/LoginStudent');
      }, 3000);

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
            انشاء حساب جديد للطالب <i className="fas fa-user-graduate me-2"></i></h2>
              
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
                initialValues={{ name: '', email: '', password: '', schoolCode: '', grade: '' }}
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
                      <BootstrapForm.Label className="fs-5">الاسم</BootstrapForm.Label>
                      <BootstrapForm.Control
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="ادخل الاسم"
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
                        onBlur={handleBlur}
                        placeholder="ادخل البريد الإلكتروني"
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
                        placeholder="ادخل كلمة المرور"
                        isInvalid={touched.password && errors.password}
                      />
                      <BootstrapForm.Control.Feedback type="invalid">
                        {errors.password}
                      </BootstrapForm.Control.Feedback>
                    </BootstrapForm.Group>

                    <BootstrapForm.Group className="mb-3">
                      <BootstrapForm.Label className="fs-5">رمز المدرسة</BootstrapForm.Label>
                      <BootstrapForm.Control
                        type="text"
                        name="schoolCode"
                        value={values.schoolCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="ادخل رمز المدرسة"
                        isInvalid={touched.schoolCode && errors.schoolCode}
                      />
                      <BootstrapForm.Control.Feedback type="invalid">
                        {errors.schoolCode}
                      </BootstrapForm.Control.Feedback>
                    </BootstrapForm.Group>

                    <BootstrapForm.Group className="mb-3">
                      <BootstrapForm.Label className="fs-5">الصف الدراسي</BootstrapForm.Label>
                      <BootstrapForm.Control
                        type="text"
                        name="grade"
                        value={values.grade}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="أدخل الصف الدراسي"
                        isInvalid={touched.grade && errors.grade}
                      />
                      <BootstrapForm.Control.Feedback type="invalid">
                        {errors.grade}
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
                لديك حساب بالفعل؟{' '}
                <Button
                    variant="link"
                    className="p-0 fs-5 text-decoration-none"
                    onClick={() => navigate('/LoginStudent')}
                  >
                    تسجيل الدخول
                  </Button>
                
                  
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupStudent;
