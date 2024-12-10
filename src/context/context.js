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
      const id = decodedToken.id;
      
      const response = await axios.post(
        `https://school-book-clubs-backend.vercel.app/api/RateTeacher/${id}/${studentId}`, 
        ratingData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      return response.data;
    } catch (error) {
      console.error('Error rating student:', error);
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
  const submitStudentSelfAssessment = async (assessmentData) => {
    try {
      // Validate assessment data before sending
      if (!assessmentData.studentId) {
        throw new Error('Student ID is required');
      }

      const response = await axios.post(
        'https://school-book-clubs-backend.vercel.app/api/StudentSelfAssessment/create', 
        assessmentData
      );
      return response.data;
    } catch (error) {
      // Log detailed error information
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      });

      // Throw a more informative error
      if (error.response) {
        // The request was made and the server responded with a status code
        throw new Error(error.response.data.message || 'Failed to submit self assessment');
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error('No response received from server');
      } else {
        // Something happened in setting up the request
        throw new Error('Error setting up the request');
      }
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
      const fullAssessmentData = {
        ...assessmentData,
        parentId: decodedToken._id
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
        submitStudentSelfAssessment,
        submitParentAssessment
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
