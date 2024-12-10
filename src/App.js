import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DataContextFunction from './context/context.js';
import Layout from './components/layout/Layout.jsx';
import WelcomePage from './components/WelcomePage/WelcomePage.jsx';
import { ToastContainer } from 'react-toastify';
import ForgetPasswordstudent from './components/ForgetPasswordstudent/ForgetPasswordstudent.jsx';
import ForgetPasswordParent from './components/ForgetPasswordparent/ForgetPasswordparent.jsx';
import ForgetPasswordteacher from './components/ForgetPasswordteacher/ForgetPasswordteacher.jsx';
import ForgotPasswordsupervisor from './components/ForgetPasswordsupervisor/ForgetPasswordsupervisor.jsx';
import RedirectIfAuthenticated from './components/RedirectIfAuthenticated/RedirectIfAuthenticated.jsx';
import Notfoundpage from './components/Notfoundpage/Notfoundpage.jsx';
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
import Dashboard from './components/Dashboard/Dashboard.jsx';
import AddBooks from './components/AddBooks/AddBooks.jsx';
import TeacherBooks from './components/TeacherBooks/TeacherBooks.jsx';
import StudentsTeacher from './components/StudentsTeacher/StudentsTeacher.jsx';
import ProfileStudent from './components/ProfileStudent/ProfileStudent.jsx';
import LibraryStudent from './components/LibraryStudent/LibraryStudent.jsx';
import Selfassessment from './components/Selfassessment/Selfassessment.jsx';
import Parentprofile from './components/Parentprofile/Parentprofile.jsx';
import Parentassessment from './components/Parentassessment/Parentassessment.jsx';
export default function App() {
  const router = createBrowserRouter([
    {
      path: '',
      element: <Layout />,
      children: [
        { index: true, element: <RedirectIfAuthenticated><WelcomePage /></RedirectIfAuthenticated> },
        { path: '/dashboard', element: <Protected><Dashboard /></Protected> },
        { path: '/ProfileStudent', element: <Protected><ProfileStudent /></Protected> },
        { path: '/books', element: <Protected><AddBooks /></Protected> },
        { path: '/LibraryStudent', element: <Protected><LibraryStudent /></Protected> },
        { path: '/Teacherbooks', element: <Protected><TeacherBooks /></Protected> },
        { path: '/Selfassessment', element: <Protected><Selfassessment /></Protected> },
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
        { 
          path: '/CompleteProfileTeacher', 
          element: <RedirectIfAuthenticated><CompleteProfileTeacher /></RedirectIfAuthenticated> 
        },
        { 
          path: '/CompleteProfileSupervisor', 
          element: <RedirectIfAuthenticated><CompleteProfileSupervisor /></RedirectIfAuthenticated> 
        },
        { 
          path: '/ForgetPasswordstudent', 
          element: <RedirectIfAuthenticated>  <ForgetPasswordstudent /></RedirectIfAuthenticated> 
        },
        { 
          path: '/ForgetPasswordParent', 
          element: <RedirectIfAuthenticated><ForgetPasswordParent /></RedirectIfAuthenticated> 
        },
        { 
          path: '/ForgetPasswordteacher', 
          element: <RedirectIfAuthenticated><ForgetPasswordteacher /></RedirectIfAuthenticated> 
        },
        { 
          path: '/ForgotPasswordsupervisor', 
          element: <RedirectIfAuthenticated><ForgotPasswordsupervisor /></RedirectIfAuthenticated> 
        },
        { 
          path: '/StudentsTeacher', 
          element: <Protected><StudentsTeacher /></Protected> 
        },
        { 
          path: '/Parentprofile', 
          element: <Protected><Parentprofile /></Protected> 
        },
        { 
          path: '/Parentprofile', 
          element: <Protected><Parentprofile /></Protected> 
        },
        { 
          path: '/Parentassessment', 
          element: <Protected><Parentassessment /></Protected> 
        },
        { 
          path: '*', 
          element: <Notfoundpage /> 
        }
      ]
    }
  ]);

  return (
    <DataContextFunction>
      <RouterProvider router={router} />
      <ToastContainer />
    </DataContextFunction>
  );
}
