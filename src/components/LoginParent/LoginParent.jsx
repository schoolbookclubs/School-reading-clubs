import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginParent.css';
import { DataContext } from '../../context/context.js';
import { useContext } from 'react';

const LoginParent = () => {
  const navigate = useNavigate();
  const { setTokenAndUpdateRole } = useContext(DataContext);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('');

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('البريد الإلكتروني غير صالح')
      .required('البريد الإلكتروني مطلوب'),
    password: Yup.string()
      .required('كلمة المرور مطلوبة')
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { data } = await axios.post('https://school-book-clubs-backend.vercel.app/api/parent/login', values);
      
      if (data.message === 'تم تسجيل الدخول بنجاح') {
        setTokenAndUpdateRole(data.token);
        setAlertVariant('success');
        setAlertMessage('تم تسجيل الدخول بنجاح');
        setShowAlert(true);
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      }
    } catch (error) {
      setAlertVariant('danger');
      setAlertMessage(error.response?.data?.message || 'حدث خطأ أثناء تسجيل الدخول');
      setShowAlert(true);
    }
    setSubmitting(false);
  };

  return (
    <div className="login-parent-container">
      <div className="login-parent-card">
        <h2 className="login-parent-title">
          
          تسجيل دخول ولي الأمر
          <i className="fas fa-user-plus"></i>
        </h2>
        

        {showAlert && (
          <div className={`alert ${alertVariant}`}>
            {alertMessage}
          </div>
        )}

        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="login-parent-form" dir="rtl">
              <div className="form-group">
                <label className="form-label">
                  <i className="fas fa-envelope"></i>
                  البريد الإلكتروني
                </label>
                <Field
                  type="email"
                  name="email"
                  className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
                  placeholder="ادخل البريد الإلكتروني"
                />
                {errors.email && touched.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  <i className="fas fa-lock"></i>
                  كلمة المرور
                </label>
                <Field
                  type="password"
                  name="password"
                  className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
                  placeholder="ادخل كلمة المرور"
                />
                {errors.password && touched.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner-border"></div>
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
                  className="link"
                  onClick={() => navigate('/SignupParent')}
                >
                  إنشاء حساب جديد
                </span>
                <span
                  className="link"
                  onClick={() => navigate('/ForgotPasswordParent')}
                >
                  نسيت كلمة المرور؟
                </span>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginParent;
