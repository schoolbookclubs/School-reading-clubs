import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignupParent.css';

const SignupParent = () => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('');

  const validationSchema = Yup.object({
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
      .required('رقم الجوال مطلوب'),
    schoolCode: Yup.string()
      .required('رمز المدرسة مطلوب')
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post('https://school-book-clubs-backend.vercel.app/api/parent/signup', {
        name: values.name,
        email: values.email,
        password: values.password,
        studentcodeinparent: values.studentcodeinparent,
        phone: values.phone,
        schoolCode: values.schoolCode,
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
    <div className="signup-parent-container">
      <div className="signup-parent-card">
        <h2 className="signup-parent-title">
          
          انشاء حساب ولي أمر جديد
          <i className="fas fa-user-plus"></i>
        </h2>
        <div className="text-center mb-4">
          <span role="img" aria-label="family" style={{ fontSize: '2rem' }}>👨‍👩‍👧‍👦</span>
        </div>

        {showAlert && (
          <div className={`alert ${alertVariant}`}>
            {alertMessage}
          </div>
        )}

        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            studentcodeinparent: '',
            phone: '',
            schoolCode: ''
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="signup-parent-form" dir="rtl">
              <div className="form-group">
                <label className="form-label">
                  <i className="fas fa-user"></i>
                  الاسم
                </label>
                <Field
                  type="text"
                  name="name"
                  className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
                  placeholder="ادخل الاسم"
                />
                {errors.name && touched.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>

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

              <div className="form-group">
                <label className="form-label">
                  <i className="fas fa-id-card"></i>
                  الكود الخاص بالطالب
                </label>
                <Field
                  type="text"
                  name="studentcodeinparent"
                  className={`form-control ${errors.studentcodeinparent && touched.studentcodeinparent ? 'is-invalid' : ''}`}
                  placeholder="ادخل الكود الخاص بالطالب"
                />
                {errors.studentcodeinparent && touched.studentcodeinparent && (
                  <div className="invalid-feedback">{errors.studentcodeinparent}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  <i className="fas fa-school"></i>
                  كود مدرسة الطالب
                </label>
                <Field
                  type="text"
                  name="schoolCode"
                  className={`form-control ${errors.schoolCode && touched.schoolCode ? 'is-invalid' : ''}`}
                  placeholder="ادخل كود المدرسة"
                />
                {errors.schoolCode && touched.schoolCode && (
                  <div className="invalid-feedback">{errors.schoolCode}</div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  <i className="fas fa-phone"></i>
                  رقم الجوال
                </label>
                <Field
                  type="text"
                  name="phone"
                  className={`form-control ${errors.phone && touched.phone ? 'is-invalid' : ''}`}
                  placeholder="ادخل رقم الجوال"
                />
                {errors.phone && touched.phone && (
                  <div className="invalid-feedback">{errors.phone}</div>
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
                    جاري التسجيل...
                  </>
                ) : (
                  <>
                    <i className="fas fa-user-plus"></i>
                    انشاء حساب
                  </>
                )}
              </button>

              <div className="text-center">
              لديك حساب بالفعل؟
                <span
                  style={{ color: '#3498db', cursor: 'pointer' }}
                  onClick={() => navigate('/LoginParent')}
                >
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

export default SignupParent;
