import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './ForgetPasswordTeacher.css';

const ForgetPasswordTeacher = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('');

  const validationSchema = Yup.object({
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
      setAlertMessage(response?.data?.message || 'تم تغيير كلمة المرور بنجاح');
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
    <div className="forget-password-teacher-container">
      <div className="forget-password-teacher-card">
        <h2 className="forget-password-teacher-title">
          تغيير كلمة مرور المعلم
          <i className="fas fa-key"></i>
        </h2>

        

        {showAlert && (
          <div className={`alert ${alertVariant}`}>
            {alertMessage}
          </div>
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
            <Form className="forget-password-teacher-form" dir="rtl">
              <div className="form-group">
                <label className="form-label">
                  <i className="fas fa-envelope"></i>
                  البريد الإلكتروني
                </label>
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

              <div className="form-group">
                <label className="form-label">
                  <i className="fas fa-lock"></i>
                  كلمة المرور الجديدة
                </label>
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

              <div className="form-group">
                <label className="form-label">
                  <i className="fas fa-lock"></i>
                  تأكيد كلمة المرور
                </label>
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

              <button
                type="submit"
                className="btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner-border"></div>
                    جاري تغيير كلمة المرور...
                  </>
                ) : (
                  <>
                    <i className="fas fa-sync"></i>
                    تغيير كلمة المرور
                  </>
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ForgetPasswordTeacher;
