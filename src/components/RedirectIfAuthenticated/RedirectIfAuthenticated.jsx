// RedirectIfAuthenticated.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { DataContext } from '../../context/context.js';

const RedirectIfAuthenticated = ({ children }) => {
  const { getUserRole } = useContext(DataContext);
  const token = localStorage.getItem('token');
  const role = getUserRole();

  if (token && role) {
    // إذا كان المستخدم مسجل الدخول، قم بتوجيهه إلى لوحة التحكم
    return <Navigate to="/dashboard" replace />;
  }

  // إذا لم يكن المستخدم مسجل الدخول، اعرض المحتوى
  return children;
};

export default RedirectIfAuthenticated;
