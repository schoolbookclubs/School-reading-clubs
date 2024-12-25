import React, { useState, useContext } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DataContext } from '../../context/context.js';
import './LoginStudent.css';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('البريد الإلكتروني غير صالح')
    .required('البريد الإلكتروني مطلوب'),
  password: Yup.string()
    .required('كلمة المرور مطلوبة')
});

const LoginStudent = () => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('');
  const { setTokenAndUpdateRole } = useContext(DataContext);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { data } = await axios.post('https://school-book-clubs-backend.vercel.app/api/student/login', values);
      console.log(data);
      if (data.success == true) {
        setTokenAndUpdateRole(data.token);
        setAlertVariant("success");
        setAlertMessage("تم تسجيل الدخول بنجاح");
        setShowAlert(true);
        setTimeout(() => {
          navigate("/dashboard"); 
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setAlertVariant("danger");
      setAlertMessage(error.response.data.message);
      setShowAlert(true);
    }
    setSubmitting(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">
          
          تسجيل دخول الطالب
          <i className="fas fa-user-graduate"></i>
        </h2>
        
        {showAlert && (
          <div className={`alert ${alertVariant}`}>
            {alertMessage}
            <button className="alert-close" onClick={() => setShowAlert(false)}>×</button>
          </div>
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
            <Form className="login-form" dir="rtl">
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

              <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    جاري تسجيل الدخول...
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt"></i>
                    تسجيل الدخول
                  </>
                )}
              </button>

              <div className="links-container">
                <span 
                  className="forgot-password-link"
                  onClick={() => navigate('/ChangeStudentPassword')}
                >
                  <i className="fas fa-key"></i>
                  نسيت كلمة المرور؟
                </span>
                
                <span 
                  className="signup-link"
                  onClick={() => navigate('/SignupStudent')}
                >
                  <i className="fas fa-user-plus"></i>
                  إنشاء حساب جديد
                </span>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginStudent;
