import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DataContextFunction from './context/context.js';
import Layout from './components/layout/Layout.jsx';
import WelcomePage from './components/WelcomePage/WelcomePage.jsx';
import { ToastContainer } from 'react-toastify';
import ForgetPasswordstudent from './components/ForgetPasswordstudent/ForgetPasswordstudent.jsx';
import ForgotPasswordParent from './components/ForgetPasswordparent/ForgetPasswordparent.jsx';
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
import ProfileStudent from './components/ProfileStudent/ProfileStudent.jsx';
import LibraryStudent from './components/LibraryStudent/LibraryStudent.jsx';
import Parentprofile from './components/Parentprofile/Parentprofile.jsx';
import Parentassessment from './components/Parentassessment/Parentassessment.jsx';
import StudentBag from './components/StudentBag/StudentBag.jsx';
import StudentGuide from './components/StudentGuide/StudentGuide.jsx';
import TeacherGuide from './components/TeacherGuide/TeacherGuide.jsx';
import ReadingClubEvaluation from './components/ReadingClubEvaluation/ReadingClubEvaluation.jsx';
import ParentGuide from './components/ParentGuide/ParentGuide.jsx';
import OneSchoolTeacherEvaluations from './components/OneSchoolTeacherEvaluations/OneSchoolTeacherEvaluations.jsx';
import OneSchoolStusentEvaluations from './components/OneSchoolStusentEvaluations/OneSchoolStusentEvaluations.jsx';
import OneSchoolParentEvaluations from './components/OneSchoolParentEvaluations/OneSchoolParentEvaluations.jsx';
import Bookevaluations from './components/Bookevaluations/Bookevaluations.jsx';
import Selfevaluations from './components/Selfevaluations/Selfevaluations.jsx';
import Clubevaluations from './components/Clubevaluations/Clubevaluations.jsx';
import AttendanceoneSchool from './components/AttendanceoneSchool/AttendanceoneSchool.jsx';
import ReadingBooksNumberoneSchool from './components/ReadingBooksNumberoneSchool/ReadingBooksNumberoneSchool.jsx';

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
          path: '/ForgotPasswordParent', 
          element: <RedirectIfAuthenticated><ForgotPasswordParent /></RedirectIfAuthenticated> 
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
          path: '/Parentprofile', 
          element: <Protected><Parentprofile /></Protected> 
        },
        { 
          path: '/Parentprofile', 
          element: <Protected><Parentprofile /></Protected> 
        },
        { 
          path: '/ParentGuide', 
          element: <Protected><ParentGuide /></Protected> 
        },
        {
          path: '/ReadingClubEvaluation',
          element: <Protected><ReadingClubEvaluation /></Protected>
        },
        { 
          path: '/Parentassessment', 
          element: <Protected><Parentassessment /></Protected> 
        },
        { 
          path: '/StudentBag', 
          element: <Protected><StudentBag /></Protected> 
        },
        { 
          path: '/StudentGuide', 
          element: <Protected><StudentGuide /></Protected> 
        },
        { 
          path: '/TeacherGuide', 
          element: <Protected><TeacherGuide /></Protected> 
        },
        {
          path: '/admin/OneSchoolTeacherEvaluations',
          element: <Protected><OneSchoolTeacherEvaluations /></Protected>
        },
        {
          path: '/admin/OneSchoolStusentEvaluations',
          element: <Protected><OneSchoolStusentEvaluations /></Protected>
        },
        {
          path: '/admin/OneSchoolParentEvaluations',
          element: <Protected><OneSchoolParentEvaluations /></Protected>
        }
        ,{
          path: '/admin/Bookevaluations',
          element: <Protected><Bookevaluations /></Protected>
        }
        ,{
          path: '/admin/Selfevaluations',
          element: <Protected><Selfevaluations /></Protected>
        }
        ,{
          path: '/admin/Clubevaluations',
          element: <Protected><Clubevaluations /></Protected>
        }
        ,{
          path: '/admin/AttendanceoneSchool',
          element: <Protected><AttendanceoneSchool /></Protected>
        }
        ,{
          path: '/admin/ReadingBooksNumberoneSchool',
          element: <Protected><ReadingBooksNumberoneSchool /></Protected>
        }
        ,
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
