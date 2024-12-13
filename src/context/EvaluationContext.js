import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const submitReadingClubEvaluation = async (evaluationData) => {
  try {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    // Decode token to get studentId
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const decodedToken = jwtDecode(token);
    const studentId = decodedToken.id;

    // Prepare full evaluation data
    const fullEvaluationData = {
      studentId,
      ...evaluationData
    };

    // Make API call
    const response = await axios.post(
      'https://school-book-clubs-backend.vercel.app/api/ReadingClubEvaluation', 
      fullEvaluationData,
      
    );

    return response.data;
  } catch (error) {
    console.error('Error submitting reading club evaluation:', error);
    throw error;
  }
};
