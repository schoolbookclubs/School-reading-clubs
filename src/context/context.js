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

      // تجهيز البيانات للإرسال
      const completeRatingData = {
        bookId: ratingData.bookId,
        schoolCode: schoolCode,
        audience: ratingData.ratings.attendance,
        readingSkills: {
          completeReading: parseInt(ratingData.ratings.completeReading),
          deepUnderstanding: parseInt(ratingData.ratings.deepUnderstanding),
          personalReflection: parseInt(ratingData.ratings.personalReflection)
        },
        confidence: parseInt(ratingData.ratings.confidenceExpression),
        criticalThinking: {
          creativeIdeas: parseInt(ratingData.ratings.creativeIdeas),
          connectingExperiences: parseInt(ratingData.ratings.lifeConnectionThinking),
          independentThinking: parseInt(ratingData.ratings.independentThinking)
        },
        communicationSkills: {
          clearExpression: parseInt(ratingData.ratings.clearCommunication),
          activeListening: parseInt(ratingData.ratings.activeListening),
          constructiveFeedback: parseInt(ratingData.ratings.constructiveInteraction)
        },
        socialSkills: {
          activeParticipation: parseInt(ratingData.ratings.activeParticipation),
          respectingDiversity: parseInt(ratingData.ratings.respectDiversity),
          buildingFriendships: parseInt(ratingData.ratings.buildingFriendships)
        },
        generalBehavior: {
          collaboration: parseInt(ratingData.ratings.collaboration)
        }
      };

      console.log('تقييمات المعلم للطالب:', completeRatingData);
      
      const response = await axios.post(
        `https://school-book-clubs-backend.vercel.app/api/RateTeacher/${teacherId}/${studentId}`,
        completeRatingData
      );

      return {
        message: response.data.message,
        rating: response.data.rating
      };
    } catch (error) {
      console.error('Error rating student:', error);
      throw {
        message: error.response?.data?.message || 'حدث خطأ أثناء إنشاء التقييم',
        error: error.response?.data?.error
      };
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

      const response = await axios.post(
        `https://school-book-clubs-backend.vercel.app/api/RateingStudentBook/student/${studentId}/book/${bookId}`,
        {
          schoolCode: decodedToken?.schoolCode,
          ...reviewData
        }
      );

      return {
        success: true,
        message: response.data.message || 'تم إضافة تقييم الكتاب بنجاح',
        data: response.data.data
      };
    } catch (error) {
      console.error('Error submitting book rating:', error);
      throw {
        success: false,
        message: error.response?.data?.message || 'حدث خطأ أثناء إضافة تقييم الكتاب',
        error: error.response?.data?.error
      };
    }
  };

  // Student Self Assessment API Method
  const submitSelfAssessment = async (studentId, bookId, assessmentData) => {
    try {
      const response = await axios.post(
        `https://school-book-clubs-backend.vercel.app/api/StudentSelfAssessment/student/${studentId}/book/${bookId}`,
        {
          schoolCode: assessmentData.schoolCode,
          enjoyedReading: assessmentData.enjoyedReading,
          readUsefulBooks: assessmentData.readUsefulBooks,
          madeNewFriends: assessmentData.madeNewFriends,
          conversationsImprovedUnderstanding: assessmentData.conversationsImprovedUnderstanding,
          expressedOpinionFreely: assessmentData.expressedOpinionFreely,
          increasedSelfConfidence: assessmentData.increasedSelfConfidence,
          wouldEncourageClassmates: assessmentData.wouldEncourageClassmates,
          willJoinNextYear: assessmentData.willJoinNextYear
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        success: response.data.success,
        message: response.data.message,
        data: response.data.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "حدث خطأ أثناء إضافة التقييم الذاتي",
        error: error.message
      };
    }
  };

  const getSelfAssessment = async (studentId, bookId) => {
    try {
      const response = await axios.get(
        `https://school-book-clubs-backend.vercel.app/api/StudentSelfAssessment/student/${studentId}/book/${bookId}`
      );
      return {
        success: response.data.success,
        message: response.data.message,
        data: response.data.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "حدث خطأ أثناء جلب التقييم الذاتي",
        data: []
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
       
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching teacher ratings:', error);
      return null;
    }
  };

  const getTeacherRatingsforStudentsByteacherId = async () => {
    try {
      const decoded = decodeToken(token);
      const teacherId = decoded?.id;
      if (!teacherId) throw new Error('id of teacher not found in token');
      console.log("teacherId in getTeacherRatingsforStudentsByteacherId:", teacherId);
      const response = await axios.get(`https://school-book-clubs-backend.vercel.app/api/RateTeacher/teacherrates/${teacherId}`);
        
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

      const response = await axios.get(`https://school-book-clubs-backend.vercel.app/api/StudentSelfAssessment/oneschool/${schoolCode}/StudentsSelfAssessments`);

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
      console.log(response.data);
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
  const getBookRating = async (bookId) => {
    try {
      const decodedToken = decodeToken(token);
      const studentId = decodedToken?.id;

      const response = await axios.get(
        `https://school-book-clubs-backend.vercel.app/api/RateingStudentBook/student/${studentId}/book/${bookId}`
      );
      
      return {
        success: true,
        message: response.data.message,
        data: response.data.data
      };
    } catch (error) {
      console.error('Error getting book rating:', error);
      throw {
        success: false,
        message: error.response?.data?.message || 'حدث خطأ أثناء جلب تقييم الكتاب',
        error: error.response?.data?.error
      };
    }
  };

  // Add the function to get student ratings
  async function getStudentRatingsBooks(studentId) {
    try {
      const { data } = await axios.get(
        `https://school-book-clubs-backend.vercel.app/api/RateingStudentBook/getStudentRatingsBooksWithDetails/${studentId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return data;
    } catch (error) {
      console.error('Error fetching student ratings:', error);
      return { success: false, data: [] };
    }
  }

  // Add the function to get student self assessments
  async function getStudentSelfAssessmentsWithDetails(studentId) {
    try {
      const { data } = await axios.get(
        `https://school-book-clubs-backend.vercel.app/api/StudentSelfAssessment/getStudentSelfAssessmentsWithDetails/${studentId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return data;
    } catch (error) {
      console.error('Error fetching student self assessments:', error);
      return { success: false, data: [] };
    }
  }

  // Add the function to get student reading club evaluations
  async function getStudentReadingClubEvaluations(studentId) {
    try {
      const { data } = await axios.get(
        `https://school-book-clubs-backend.vercel.app/api/ReadingClubEvaluation/getStudentEvaluationsWithDetails/${studentId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      return data;
    } catch (error) {
      console.error('Error fetching student reading club evaluations:', error);
      return { success: false, data: [] };
    }
  }

  // Add the function to get parent assessments with details
  async function getParentAssessmentsWithDetails(parentId) {
    try {
      const { data } = await axios.get(
        `https://school-book-clubs-backend.vercel.app/api/ParentAssessment/getParentAssessmentsWithDetails/${parentId}`,
        
      );
      return data;
    } catch (error) {
      console.error('Error fetching parent assessments:', error);
      return { success: false, data: [] };
    }
  }

  // Add function to get teacher's books
  async function getTeacherBooks(teacherId) {
    try {
      const { data } = await axios.get(
        `https://school-book-clubs-backend.vercel.app/api/Book/teacher/${teacherId}/books`
      );
      return data;
    } catch (error) {
      console.error('Error fetching teacher books:', error);
      return { success: false, data: [] };
    }
  }

  // Add function to get book student ratings with details
  async function getBookStudentRatingsWithDetails(bookId) {
    try {
      const { data } = await axios.get(
        `https://school-book-clubs-backend.vercel.app/api/RateingStudentBook/getBookStudentRatingsWithDetails/${bookId}`
      );
      return data;
    } catch (error) {
      console.error('Error fetching book student ratings:', error);
      return { success: false, data: [] };
    }
  }

  const getBookStudentSelfAssessmentsWithDetails = async (bookId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `https://school-book-clubs-backend.vercel.app/api/StudentSelfAssessment/getBookStudentSelfAssessmentsWithDetails/${bookId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching student self assessments:', error);
      return { success: false, data: [] };
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
        getSelfAssessment,
        getBookRating,
        submitParentAssessment,
        getTeacherRatings,
        getTeacherRatingsforStudentsByteacherId,
        getStudentBookRatings,
        getStudentSelfAssessments,
        getReadingClubEvaluations,
        getParentAssessments,
        getSchoolAttendance,
        getUniqueSchoolBooks,
        getStudentRatingsBooks,
        getStudentSelfAssessmentsWithDetails,
        getStudentReadingClubEvaluations,
        getParentAssessmentsWithDetails,
        getTeacherBooks,
        getBookStudentRatingsWithDetails,
        getBookStudentSelfAssessmentsWithDetails,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}