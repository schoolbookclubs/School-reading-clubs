import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignupStudent.css';

const validationSchema = Yup.object({
  name: Yup.string().required('الاسم مطلوب'),
  email: Yup.string().email('البريد الإلكتروني غير صالح').required('البريد الإلكتروني مطلوب'),
  password: Yup.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل').required('كلمة المرور مطلوبة'),
  schoolCode: Yup.string().required('رمز المدرسة مطلوب'),
  grade: Yup.string().required('الصف الدراسي مطلوب'),
});

const SignupStudent = () => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('');

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('https://school-book-clubs-backend.vercel.app/api/student/signup', values);
      setAlertVariant('success');
      setAlertMessage(response.data.message);
      setShowAlert(true);
      setTimeout(() => {
        navigate('/LoginStudent');
      }, 2000);
    } catch (error) {
      setAlertVariant('error');
      console.log(error.response.data.message);
      setAlertMessage(error.response.data.message || 'حدث خطأ أثناء إنشاء الحساب');
      setShowAlert(true);
    }
    setSubmitting(false);
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">
         
          انشاء حساب جديد للطالب
          <i className="fas fa-user-graduate"></i>
        </h2>
        {/* <div class="alert alert-warning" role="alert">
          تنبية هام : عزيزي الطالب يجب عليك ادخال بريد الكتروني صالح موجود بالفعل حتي نتمكن من ارسال الكود الشخصي الخاص بك
    </div> */}
        {showAlert && (
          <div className={`alert ${alertVariant}`}>
            {alertMessage}
            <button className="alert-close" onClick={() => setShowAlert(false)}>×</button>
          </div>
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
            <Form className="signup-form" dir="rtl">
              <div className="form-group">
                <label>
                  <i className="fas fa-user"></i>
                  الاسم
                </label>
                <input
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="ادخل الاسم"
                  className={touched.name && errors.name ? 'error' : ''}
                />
                {touched.name && errors.name && (
                  <div className="error-message">{errors.name}</div>
                )}
              </div>

              <div className="form-group">
                <label>
                  <i className="fas fa-envelope"></i>
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="ادخل البريد الإلكتروني"
                  className={touched.email && errors.email ? 'error' : ''}
                />
                {touched.email && errors.email && (
                  <div className="error-message">{errors.email}</div>
                )}
              </div>

              <div className="form-group">
                <label>
                  <i className="fas fa-lock"></i>
                  كلمة المرور
                </label>
                <input
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="ادخل كلمة المرور"
                  className={touched.password && errors.password ? 'error' : ''}
                />
                {touched.password && errors.password && (
                  <div className="error-message">{errors.password}</div>
                )}
              </div>

              <div className="form-group">
                <label>
                  <i className="fas fa-school"></i>
                  رمز المدرسة
                </label>
                <input
                  type="text"
                  name="schoolCode"
                  value={values.schoolCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="ادخل رمز المدرسة"
                  className={touched.schoolCode && errors.schoolCode ? 'error' : ''}
                />
                {touched.schoolCode && errors.schoolCode && (
                  <div className="error-message">{errors.schoolCode}</div>
                )}
              </div>

              <div className="form-group">
                <label>
                  <i className="fas fa-graduation-cap"></i>
                  الصف الدراسي
                </label>
                <input
                  type="text"
                  name="grade"
                  value={values.grade}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="أدخل الصف الدراسي"
                  className={touched.grade && errors.grade ? 'error' : ''}
                />
                {touched.grade && errors.grade && (
                  <div className="error-message">{errors.grade}</div>
                )}
              </div>

              <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    جاري إنشاء الحساب...
                  </>
                ) : (
                  <>
                    <i className="fas fa-user-plus"></i>
                    إنشاء حساب
                  </>
                )}
              </button>

              <div className="login-link">
                لديك حساب بالفعل؟{' '}
                <span onClick={() => navigate('/LoginStudent')}>
                  تسجيل الدخول
                </span>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignupStudent;
