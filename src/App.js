import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DataContextFunction from './context/context';
import Layout from './components/layout/Layout.jsx';
import WelcomePage from './components/WelcomePage/WelcomePage.jsx';
import { ToastContainer } from 'react-toastify';
import ForgetPasswordstudent from './components/ForgetPasswordstudent/ForgetPasswordstudent.jsx';
import ForgetPasswordParent from './components/ForgetPasswordparent/ForgetPasswordparent.jsx';
import ForgetPasswordteacher from './components/ForgetPasswordteacher/ForgetPasswordteacher.jsx';
import ForgotPasswordsupervisor from './components/ForgetPasswordsupervisor/ForgetPasswordsupervisor.jsx';
import RedirectIfAuthenticated from './components/RedirectIfAuthenticated/RedirectIfAuthenticated.jsx';
import Notfoundpage from './components/Notfoundpage/Notfoundpage.jsx';
import HomePage from './components/HomePage/HomePage.jsx';
import Protected from './components/Protucted/Protucted.jsx';
import LoginStudent from './components/LoginStudent/LoginStudent.jsx';
import SignupStudent from './components/SignupStudent/SignupStudent.jsx';
import LoginTeacher from './components/LoginTeacher/LoginTeacher.jsx';
import SignUpTeacher from './components/SignUpTeacher/SignUpTeacher.jsx';
import LoginParent from './components/LoginParent/LoginParent.jsx';
import SignupParent from './components/SignupParent/SignupParent.jsx';
import CompleteProfileTeacher from './components/CompleteProfileTeacher/CompleteProfileTeacher.jsx';
import CompleteProfileSupervisor from './components/CompleteProfileSupervisor/CompleteProfileSupervisor.jsx';
import LoginSupervisor from './components/LoginSupervisor/LoginSupervisor.jsx';

export default function App() {
  // Set up the router LoginStudent
  //LoginSupervisor
  let router = createBrowserRouter([
    {
      path: '',
      element: <Layout />,
      children: [
        { index: true, element: <WelcomePage /> },
        { path: '/HomePage', element: <Protected><HomePage /></Protected> },
        { 
          path: '/LoginStudent', 
          element: <RedirectIfAuthenticated><LoginStudent /></RedirectIfAuthenticated> 
        },
        { 
          path: '/LoginTeacher', 
          element: <RedirectIfAuthenticated><LoginTeacher /></RedirectIfAuthenticated> 
        },
        { 
          path: '/LoginParent', 
          element: <RedirectIfAuthenticated><LoginParent /></RedirectIfAuthenticated> 
        },
        { 
          path: '/LoginSupervisor', 
          element: <RedirectIfAuthenticated><LoginSupervisor /></RedirectIfAuthenticated> 
        },

        { 
          path: '/SignupStudent', 
          element: <RedirectIfAuthenticated><SignupStudent /></RedirectIfAuthenticated> 
        },
        { 
          path: '/SignupTeacher', 
          element: <RedirectIfAuthenticated><SignUpTeacher /></RedirectIfAuthenticated> 
        },
        { 
          path: '/SignupParent', 
          element: <RedirectIfAuthenticated><SignupParent /></RedirectIfAuthenticated> 
        },
        { path: '/forgot-password-student', element: <ForgetPasswordstudent /> },
        { path: '/forgot-password-parent', element: <ForgetPasswordParent /> },
        { path: '/forgot-password-teacher', element: <ForgetPasswordteacher /> },
        { path: '/forgot-password-supervisor', element: <ForgotPasswordsupervisor /> },
        { path: '/complete-profile-teacher', element: <CompleteProfileTeacher /> },
        { path: '/complete-profile-supervisor', element: <CompleteProfileSupervisor /> },
        { path: "*", element: <Notfoundpage /> }
      ]
    }
  ]);

  return (
    <DataContextFunction>
      <RouterProvider router={router} />
      <ToastContainer /> {/* Include ToastContainer here if you need to display notifications */}
    </DataContextFunction>
  );
}
