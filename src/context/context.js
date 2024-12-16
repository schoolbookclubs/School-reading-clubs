import { createContext, useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

export const DataContext = createContext();

export default function DataContextFunction({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userRole, setUserRole] = useState(null);
  const [teacherId, setTeacherId] = useState(null);

  useEffect(() => {
    if (token) {
      const decoded = decodeToken(token);
      setUserRole(decoded?.role || null);
      setTeacherId(decoded?.id || null);
    } else {
      setUserRole(null);
      setTeacherId(null);
    }
  }, [token]);

  const decodeToken = (token) => {
    try {
     
      return jwtDecode(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  // Book-related API methods
  const createBook = async (bookData) => {
    try {
      // Ensure teacher ID is included in form data
      bookData.append('teacher', teacherId);

      const response = await axios.post('https://school-book-clubs-backend.vercel.app/api/Book', bookData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating book:', error);
      throw error;
    }
  };

  const fetchTeacherBooks = async () => {
    try {
      const response = await axios.get('https://school-book-clubs-backend.vercel.app/api/Book', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching teacher books:', error);
      throw error;
    }
  };

  const updateBook = async (bookId, bookData) => {
    try {
      const response = await axios.put(`https://school-book-clubs-backend.vercel.app/api/Book/${bookId}`, bookData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error updating book:', error);
      throw error;
    }
  };

  const deleteBook = async (bookId) => {
    try {
      const response = await axios.delete(`https://school-book-clubs-backend.vercel.app/api/Book/${bookId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting book:', error);
      throw error;
    }
  };

  const getLoginPath = () => {
    switch (userRole) {
      case 'طالب':
        return '/LoginStudent';
      case 'معلم':
        return '/LoginTeacher';
      case 'مشرف':
        return '/LoginSupervisor';
      case 'ولي أمر':
        return '/LoginParent';
      default:
        return '/';
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    window.location.href = '/';
  };

  // Add a method to manually set token and trigger role update
  const setTokenAndUpdateRole = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const fetchStudentsBySchoolCode = async () => {
    try {
      const decodedToken = decodeToken(token);
      const response = await axios.post('https://school-book-clubs-backend.vercel.app/api/student/AllStudentsBySchoolCode', 
        { schoolCode: decodedToken?.schoolCode },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data.data;
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  };

  const rateStudent = async (studentId, ratingData) => {
    try {
      const decodedToken = decodeToken(token);
      const teacherId = decodedToken.id;
      const schoolCode = decodedToken.schoolCode;

      // Ensure all required fields are present
      const completeRatingData = {
        teacher: teacherId,
        student: studentId,
        book: ratingData.bookId,
        schoolCode: schoolCode,
        audience: ratingData.ratings.audience || 'لا',
        readingSkills: {
          completeReading: ratingData.ratings.readingSkills.completeReading || 1,
          deepUnderstanding: ratingData.ratings.readingSkills.deepUnderstanding || 1,
          personalReflection: ratingData.ratings.readingSkills.personalReflection || 1
        },
        confidence: ratingData.ratings.confidence || 1,
        criticalThinking: {
          creativeIdeas: ratingData.ratings.criticalThinking.creativeIdeas || 1,
          connectingExperiences: ratingData.ratings.criticalThinking.connectingExperiences || 1,
          independentThinking: ratingData.ratings.criticalThinking.independentThinking || 1
        },
        communicationSkills: {
          clearExpression: ratingData.ratings.communicationSkills.clearExpression || 1,
          activeListening: ratingData.ratings.communicationSkills.activeListening || 1,
          constructiveFeedback: ratingData.ratings.communicationSkills.constructiveFeedback || 1
        },
        socialSkills: {
          activeParticipation: ratingData.ratings.socialSkills.activeParticipation || 1,
          respectingDiversity: ratingData.ratings.socialSkills.respectingDiversity || 1,
          buildingFriendships: ratingData.ratings.socialSkills.buildingFriendships || 1
        },
        generalBehavior: {
          collaboration: ratingData.ratings.generalBehavior.collaboration || 1
        }
      };
      
      const response = await axios.post(
        `https://school-book-clubs-backend.vercel.app/api/RateTeacher/${teacherId}/${studentId}`, 
        completeRatingData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      return response.data;
    } catch (error) {
      console.error('Error rating student:', error.response?.data || error.message);
      throw error;
    }
  };

  const fetchBooksBySchoolCode = async () => {
    try {
      const decodedToken = decodeToken(token);
      const response = await axios.post('https://school-book-clubs-backend.vercel.app/api/Book/getBooksBySchoolCode', 
        { schoolCode: decodedToken?.schoolCode },
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching books by school code:', error);
      throw error;
    }
  };

  const submitBookRating = async (bookId, reviewData) => {
    try {
      const decodedToken = decodeToken(token);
      const studentId = decodedToken?.id;

      const ratingPayload = {
        studentId,
        bookId,
        ...reviewData
      };

      const response = await axios.post('https://school-book-clubs-backend.vercel.app/api/RateingStudentBook/create', 
        ratingPayload,
       
      );
      return response.data;
    } catch (error) {
      console.error('Error submitting book rating:', error);
      console.error('Error submitting book rating:', error);
      throw error;
    }
  };

  // Student Self Assessment API Method
  const submitSelfAssessment = async (bookId, assessmentData) => {
    try {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const studentId = decodedToken.id;
      const schoolCode = decodedToken.schoolCode;

      // Ensure all fields are present and have a value
      const selfAssessmentPayload = {
        studentId: studentId,
        bookId: bookId,
        schoolCode: schoolCode,
        enjoyedReading: assessmentData.enjoyedReading || 0,
        readUsefulBooks: assessmentData.readUsefulBooks || 0,
        madeNewFriends: assessmentData.madeNewFriends || 0,
        conversationsImprovedUnderstanding: assessmentData.conversationsImprovedUnderstanding || 0,
        expressedOpinionFreely: assessmentData.expressedOpinionFreely || 0,
        increasedSelfConfidence: assessmentData.increasedSelfConfidence || 0,
        wouldEncourageClassmates: assessmentData.wouldEncourageClassmates || 0,
        willJoinNextYear: assessmentData.willJoinNextYear || 0
      };

      const response = await axios.post(
        `https://school-book-clubs-backend.vercel.app/api/StudentSelfAssessment/create`, 
        selfAssessmentPayload,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      // Check if response indicates success
      if (response.data && response.data.success) {
        return {
          success: true,
          message: response.data.message || 'تم إرسال التقييم بنجاح'
        };
      } else {
        throw new Error(response.data.message || 'فشل إرسال التقييم');
      }
    } catch (error) {
      console.error('Error submitting student self-assessment:', error);
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'حدث خطأ أثناء إرسال التقييم'
      };
    }
  };

  const submitParentAssessment = async (assessmentData) => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      // Ensure token exists
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Decode token to get parentId
      const decodedToken = jwtDecode(token);
      
      // Prepare full assessment data with parentId
      const schoolCode = decodedToken.schoolCode;
      const fullAssessmentData = {
        ...assessmentData,
        parentId: decodedToken._id,
        schoolCode
      };

      const response = await axios.post(
        'https://school-book-clubs-backend.vercel.app/api/ParentAssessment/create', 
        fullAssessmentData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error submitting parent assessment:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  const getTeacherRatings = async () => {
    try {
      const decoded = decodeToken(token);
      const schoolCode = decoded?.schoolCode;
      if (!schoolCode) throw new Error('School code not found in token');

      const response = await axios.get(`https://school-book-clubs-backend.vercel.app/api/RateTeacher/oneschool/${schoolCode}/Teachersratings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching teacher ratings:', error);
      return null;
    }
  };

  const getStudentBookRatings = async () => {
    try {
      const decoded = decodeToken(token);
      const schoolCode = decoded?.schoolCode;
      if (!schoolCode) throw new Error('School code not found in token');

      const response = await axios.get(`https://school-book-clubs-backend.vercel.app/api/RateingStudentBook/RateingStudentBookbyschoolcode/${schoolCode}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching student book ratings:', error);
      return null;
    }
  };

  const getStudentSelfAssessments = async () => {
    try {
      const decoded = decodeToken(token);
      const schoolCode = decoded?.schoolCode;
      if (!schoolCode) throw new Error('School code not found in token');

      const response = await axios.get(`https://school-book-clubs-backend.vercel.app/api/StudentSelfAssessment/oneschool/${schoolCode}/StudentsSelfAssessments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching student self assessments:', error);
      return null;
    }
  };

  const getReadingClubEvaluations = async () => {
    try {
      const decoded = decodeToken(token);
      const schoolCode = decoded?.schoolCode;
      if (!schoolCode) throw new Error('School code not found in token');

      const response = await axios.get(`https://school-book-clubs-backend.vercel.app/api/ReadingClubEvaluation/oneschool/${schoolCode}/ReadingClubEvaluations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching reading club evaluations:', error);
      return null;
    }
  };

  const getParentAssessments = async () => {
    try {
      const decoded = decodeToken(token);
      const schoolCode = decoded?.schoolCode;
      if (!schoolCode) throw new Error('School code not found in token');

      const response = await axios.get(`https://school-book-clubs-backend.vercel.app/api/ParentAssessment/parentAssessmentsByschoolCode/${schoolCode}/parentAssessments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching parent assessments:', error);
      return null;
    }
  };

  const getSchoolAttendance = async () => {
    try {
      const decoded = decodeToken(token);
      const schoolCode = decoded?.schoolCode;
      if (!schoolCode) throw new Error('School code not found in token');

      const response = await axios.get(`https://school-book-clubs-backend.vercel.app/api/RateTeacher/attendance/oneschool/${schoolCode}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching school attendance:', error);
      return null;
    }
  };

  const getUniqueSchoolBooks = async () => {
    try {
      const decoded = decodeToken(token);
      const schoolCode = decoded?.schoolCode;
      if (!schoolCode) throw new Error('School code not found in token');

      const response = await axios.get(`https://school-book-clubs-backend.vercel.app/api/RateingStudentBook/uniquebooksoneschool/${schoolCode}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching unique books:', error);
      return null;
    }
  };

  return (
    <DataContext.Provider
      value={{
        token,
        teacherId,
        decodeToken,
        getUserRole: () => userRole,
        getLoginPath,
        logout,
        setTokenAndUpdateRole,
        createBook,
        fetchTeacherBooks,
        deleteBook,
        updateBook,
        fetchStudentsBySchoolCode,
        rateStudent,
        fetchBooksBySchoolCode,
        submitBookRating,
        submitSelfAssessment,
        submitParentAssessment,
        getTeacherRatings,
        getStudentBookRatings,
        getStudentSelfAssessments,
        getReadingClubEvaluations,
        getParentAssessments,
        getSchoolAttendance,
        getUniqueSchoolBooks
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
