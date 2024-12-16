import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../../context/context.js';
import { FaStar, FaBook, FaSpinner, FaCheckCircle, FaExclamationCircle, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';
import {jwtDecode} from 'jwt-decode';
import './LibraryStudent.css';

// Success Popup Component
const SuccessPopup = ({ onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="success-popup">
      <div className="success-popup-content">
        <FaCheckCircle className="success-icon" />
        <h2 >تم إرسال تقييمك بنجاح!</h2>
        <p >شكراً لك على مشاركة رأيك</p>
        <div className="success-popup-animation"></div>
      </div>
    </div>
  );
};

// Improved API Response Modal Component
const APIResponseModal = ({ type, message, onClose }) => {
  const getModalStyles = () => {
    switch(type) {
      case 'success':
        return {
          icon: <FaCheckCircle className="text-success modal-icon" />,
          title: 'نجاح العملية',
          bgClass: 'bg-success-soft'
        };
      case 'error':
        return {
          icon: <FaExclamationCircle className="text-danger modal-icon" />,
          title: 'خطأ في العملية',
          bgClass: 'bg-danger-soft'
        };
      case 'warning':
        return {
          icon: <FaExclamationTriangle className="text-warning modal-icon" />,
          title: 'تحذير',
          bgClass: 'bg-warning-soft'
        };
      default:
        return {
          icon: <FaInfoCircle className="text-info modal-icon" />,
          title: 'معلومات',
          bgClass: 'bg-info-soft'
        };
    }
  };

  const { icon, title, bgClass } = getModalStyles();

  return (
    <div className="api-response-modal">
      <div className={`api-response-content ${bgClass}`}>
        <div className="api-response-header">
          {icon}
          <h3>{title}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="api-response-body">
          <p>{message}</p>
        </div>
        <div className="api-response-footer">
          <button onClick={onClose} className="btn-confirm">
            حسنًا
          </button>
        </div>
      </div>
    </div>
  );
};

const BookRatingModal = ({ book, onClose, onSubmit, submitting }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState({
    recommendBook: '',
    authorStyle: '',
    keyIdeas: '',
    likedIdeas: '',
    dislikedIdeas: '',
    memorableQuotes: '',
    potentialAdditions: '',
    personalImpact: '',
    readingStartDate: '',
    readingEndDate: ''
  });
  const [errors, setErrors] = useState({});
  const [showAPIResponseModal, setShowAPIResponseModal] = useState(false);
  const [apiResponse, setAPIResponse] = useState({ type: '', message: '' });
  const decodedToken = jwtDecode(localStorage.getItem('token'));

  const validateForm = () => {
    const newErrors = {};
    
    // Check if rating is selected
    if (rating === 0) {
      newErrors.rating = 'يرجى اختيار تقييم للكتاب';
    }

    // Validate required fields
    const requiredFields = [
      'recommendBook', 'authorStyle', 'keyIdeas', 
      'likedIdeas', 'dislikedIdeas', 'memorableQuotes', 
      'potentialAdditions', 'personalImpact',
      'readingStartDate', 'readingEndDate'
    ];

    requiredFields.forEach(field => {
      if (!review[field] || review[field].trim() === '') {
        newErrors[field] = `هذا الحقل مطلوب`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRatingChange = (star) => {
    setRating(star);
    // Clear rating error when a rating is selected
    if (errors.rating) {
      const newErrors = { ...errors };
      delete newErrors.rating;
      setErrors(newErrors);
    }
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReview(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear specific field error when user starts typing
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        // Sanitize and validate data before submission
        const sanitizedReview = Object.keys(review).reduce((acc, key) => {
          // Trim all string values and ensure they are not empty
          const value = typeof review[key] === 'string' ? review[key].trim() : review[key];
          
          if (value === '') {
            throw new Error(`Field ${key} cannot be empty`);
          }
          
          acc[key] = value;
          return acc;
        }, {});

        // Validate rating
        if (rating < 1 || rating > 5) {
          throw new Error('Invalid book rating');
        }

        const submissionData = {
          ...sanitizedReview,
          bookRating: rating,  // Rename rating to bookRating to match backend
          schoolCode: decodedToken.schoolCode // Add schoolCode
        };

        const response = await onSubmit(submissionData);
        
        // Only set success modal if submission is successful
        setAPIResponse({ 
          type: 'success', 
          message: 'تم إرسال تقييمك بنجاح!' 
        });
        setShowAPIResponseModal(true);
      } catch (error) {
        console.error('Book rating submission error:', error);
        
        // More detailed error handling
        const errorMessage = 
          error.response?.data?.message || 
          error.message || 
          'حدث خطأ أثناء إرسال التقييم. يرجى المحاولة مرة أخرى.';

        setAPIResponse({ 
          type: 'error', 
          message: errorMessage 
        });
        setShowAPIResponseModal(true);
      }
    }
  };

  const handleAPIResponseModalClose = () => {
    setShowAPIResponseModal(false);
    onClose();
  };

  // If API response modal is to be shown, render it
  if (showAPIResponseModal) {
    return (
      <APIResponseModal 
        type={apiResponse.type}
        message={apiResponse.message}
        onClose={handleAPIResponseModalClose}
      />
    );
  }

  return (
    <div className="book-rating-modal">
      <div className="modal-content">
        <div className="reading-date">
          <span>تاريخ القراءة: {new Date().toLocaleDateString('ar-EG', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>

        <h2 className='py-3 text-center'>تقييم كتاب {book.title}</h2>

        {/* التقييم العام */}
       

        <div className="review-section">
        

          <div className="review-group">
            
          <div className="overall-rating">
          <h3>التقييم العام</h3>
          <div className="rating-display">
            <span className="rating-number">{rating}/5</span>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar 
                  key={star} 
                  color={star <= rating ? "#ffc107" : "#e4e5e9"}
                  onClick={() => handleRatingChange(star)}
                  className="star-icon"
                />
              ))}
            </div>
          </div>
          {errors.rating && <p className="error-message">{errors.rating}</p>}
        </div>
            {/* اوصي بقراءته */}
            <div className="recommend-section">
              <label>أوصي بقراءته:</label>
              <div>
                <label>
                  <input 
                    type="radio" 
                    name="recommendBook" 
                    value="نعم"
                    checked={review.recommendBook === "نعم"}
                    onChange={handleReviewChange}
                  /> نعم
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="recommendBook" 
                    value="لا"
                    checked={review.recommendBook === "لا"}
                    onChange={handleReviewChange}
                  /> لا
                </label>
              </div>
              {errors.recommendBook && <p className="error-message">{errors.recommendBook}</p>}
            </div>
          </div>
          <div className="review-group reading-dates-container">
            <h3>تاريخ القراءة</h3>
            <div className="date-input-group">
              <div className="date-input-wrapper">
                <label htmlFor="readingStartDate" className="date-label">
                  <span className="date-label-icon">📖</span>
                  تاريخ بدء القراءة
                </label>
                <input 
                  type="date"
                  id="readingStartDate"
                  name="readingStartDate"
                  className="date-input"
                  value={review.readingStartDate}
                  onChange={handleReviewChange}
                  required
                />
                {errors.readingStartDate && <p className="error-message">{errors.readingStartDate}</p>}
              </div>
              
              <div className="date-input-wrapper">
                <label htmlFor="readingEndDate" className="date-label">
                  <span className="date-label-icon">🏁</span>
                  تاريخ انتهاء القراءة
                </label>
                <input 
                  type="date"
                  id="readingEndDate"
                  name="readingEndDate"
                  className="date-input"
                  value={review.readingEndDate}
                  onChange={handleReviewChange}
                  required
                />
                {errors.readingEndDate && <p className="error-message">{errors.readingEndDate}</p>}
              </div>
            </div>
            {(errors.readingStartDate || errors.readingEndDate) && (
              <div className="date-validation-info">
                <p>💡 تأكد من اختيار تاريخ البدء قبل تاريخ الانتهاء</p>
              </div>
            )}
          </div>
          <div className="review-group">
            <h3>أسلوب الكتابة والأفكار</h3>
            <textarea 
              name="authorStyle"
              placeholder="رأيك بأسلوب الكاتب"
              value={review.authorStyle}
              onChange={handleReviewChange}
              required
            />
            {errors.authorStyle && <p className="error-message">{errors.authorStyle}</p>}
            
            <textarea 
              name="keyIdeas"
              placeholder="ملخص لأهم الأفكار والأحداث"
              value={review.keyIdeas}
              onChange={handleReviewChange}
              required
            />
            {errors.keyIdeas && <p className="error-message">{errors.keyIdeas}</p>}
            
            <textarea 
              name="likedIdeas"
              placeholder="أفكار أعجبتك"
              value={review.likedIdeas}
              onChange={handleReviewChange}
              required
            />
            {errors.likedIdeas && <p className="error-message">{errors.likedIdeas}</p>}
            
            <textarea 
              name="dislikedIdeas"
              placeholder="أفكار لم تعجبك"
              value={review.dislikedIdeas}
              onChange={handleReviewChange}
              required
            />
            {errors.dislikedIdeas && <p className="error-message">{errors.dislikedIdeas}</p>}
          </div>

          <div className="review-group">
            <h3>الاقتباسات والتأثير الشخصي</h3>
            <textarea 
              name="memorableQuotes"
              placeholder="عبارات واقتباسات مميزة"
              value={review.memorableQuotes}
              onChange={handleReviewChange}
              required
            />
            {errors.memorableQuotes && <p className="error-message">{errors.memorableQuotes}</p>}
            
            <textarea 
              name="potentialAdditions"
              placeholder="لو كنت أنا الكاتب ماذا كنت ستضيف أو تغيير في الكتاب ؟"
              value={review.potentialAdditions}
              onChange={handleReviewChange}
              required
            />
            {errors.potentialAdditions && <p className="error-message">{errors.potentialAdditions}</p>}
            
            <textarea 
              name="personalImpact"
              placeholder="أفكار أو أحداث لامستك شخصيًا"
              value={review.personalImpact}
              onChange={handleReviewChange}
              required
            />
            {errors.personalImpact && <p className="error-message">{errors.personalImpact}</p>}
          </div>

         
        </div>
        <div className="modal-actions">
          <button 
            onClick={handleSubmit} 
            className="submit-btn" 
            disabled={submitting}
          >
            {submitting ? 'جارٍ الإرسال...' : 'إرسال التقييم'}
          </button>
          <button 
            onClick={onClose} 
            className="cancel-btn" 
            disabled={submitting}
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
};

// Self Assessment Modal Component
const SelfAssessmentModal = ({ book, onClose, onSubmit }) => {
  const [assessment, setAssessment] = useState({
    enjoyedReading: 1,
    readUsefulBooks: 1,
    madeNewFriends: 1,
    conversationsImprovedUnderstanding: 1,
    expressedOpinionFreely: 1,
    increasedSelfConfidence: 1,
    wouldEncourageClassmates: 1,
    willJoinNextYear: 1
  });

  const [submitting, setSubmitting] = useState(false);
  const [showAPIResponseModal, setShowAPIResponseModal] = useState(false);
  const [apiResponse, setAPIResponse] = useState({ type: '', message: '' });
  const [validationError, setValidationError] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const decodedToken = jwtDecode(localStorage.getItem('token'));

  const assessmentLabels = {
    enjoyedReading: 'استمتعت بالقراءة',
    readUsefulBooks: 'قرأت كتبًا مفيدة',
    madeNewFriends: 'تعرفت على أصدقاء جدد',
    conversationsImprovedUnderstanding: 'زادت الحوارات من فهمي للكتب',
    expressedOpinionFreely: 'أستطعت التعبير عن رأيي بحرية',
    increasedSelfConfidence: 'زادت ثقتي بنفسي',
    wouldEncourageClassmates: 'سوف أشجع زملائي على الانضمام لنادي قراءة',
    willJoinNextYear: 'سوف أنضم لنادي القراءة السنة القادمة'
  };

  const handleRatingChange = (field, value) => {
    setAssessment(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setValidationError(null);
      setErrorMessage('');
      
      // Convert numeric ratings to string and add validation
      const assessmentData = Object.keys(assessment).reduce((acc, field) => {
        const value = assessment[field];
        
        // Validate that value is a number and within expected range
        if (typeof value !== 'number' || value < 1 || value > 5) {
          throw new Error(`Invalid rating for ${field}: ${value}`);
        }
        
        // Convert to string for potential backend requirements
        acc[field] = value.toString();
        return acc;
      }, {
        // Explicitly add these fields with empty values to satisfy backend validation
        readingMotivation: '',
        readingChallenges: '',
        personalGrowth: '',
        futureReadingPlans: ''
      });

      const response = await onSubmit({
        ...assessmentData,
        schoolCode: decodedToken.schoolCode // Add schoolCode
      });
      
      // Only set success modal if submission is successful
      setAPIResponse({ 
        type: 'success', 
        message: 'تم إرسال التقييم الذاتي بنجاح!' 
      });
      setShowAPIResponseModal(true);
    } catch (error) {
      console.error('Error submitting self-assessment:', error);
      
      // More robust error handling
      const errorDetails = 
        error.response?.data?.message || 
        error.message || 
        'حدث خطأ غير متوقع أثناء إرسال التقييم الذاتي. يرجى المحاولة مرة أخرى.';
      
      setAPIResponse({ 
        type: 'error', 
        message: errorDetails 
      });
      setShowAPIResponseModal(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleAPIResponseModalClose = () => {
    setShowAPIResponseModal(false);
    onClose();
  };

  return (
    <div className="self-assessment-modal">
      <div className="modal-content">
        <h2>التقييم الذاتي لكتاب {book.title}</h2>
        
        {Object.keys(assessment).map(field => (
          <div key={field} className="assessment-item">
            <label>{assessmentLabels[field]}</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar 
                  key={star} 
                  color={star <= assessment[field] ? "#ffc107" : "#e4e5e9"}
                  onClick={() => handleRatingChange(field, star)}
                  className="star-icon"
                />
              ))}
            </div>
            {validationError && validationError[field] && (
              <p className="error-message">{validationError[field]}</p>
            )}
          </div>
        ))}

        <div className="modal-actions">
          <button 
            onClick={handleSubmit} 
            disabled={submitting}
            className={`submit-btn ${submitting ? 'submitting' : ''}`}
          >
            {submitting ? (
              <>
                <FaSpinner className="spinner" /> جاري الإرسال...
              </>
            ) : (
              'إرسال التقييم'
            )}
          </button>
          <button onClick={onClose} disabled={submitting} className="cancel-btn">
            إلغاء
          </button>
        </div>
        
        {errorMessage && (
          <div className="error-message">
            <p>{errorMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default function LibraryStudent() {
  const { 
    fetchBooksBySchoolCode, 
    submitBookRating, 
    submitSelfAssessment 
  } = useContext(DataContext);
  
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedBookForSelfAssessment, setSelectedBookForSelfAssessment] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showAPIResponseModal, setShowAPIResponseModal] = useState(false);
  const [apiResponse, setAPIResponse] = useState({ type: '', message: '' });

  // Unified method to show API response
  const showAPIResponse = (type, message) => {
    setAPIResponse({ type, message });
    setShowAPIResponseModal(true);
  };

  // Fetch books with improved error handling
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const booksData = await fetchBooksBySchoolCode();
      
      // Ensure books is an array
      const books = Array.isArray(booksData) 
        ? booksData 
        : booksData.books || booksData.data || [];
      
      setBooks(books);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching books:', error);
      showAPIResponse('error', error.message || 'حدث خطأ أثناء جلب الكتب');
      setBooks([]); // Ensure books is an empty array on error
    }
  };

  // Handle book rating submission
  const handleBookRating = async (book, ratingData) => {
    try {
      setSubmitting(true);
      
      // Validate rating data
      const requiredFields = [
        'recommendBook', 'authorStyle', 'keyIdeas', 
        'likedIdeas', 'dislikedIdeas', 'memorableQuotes', 
        'potentialAdditions', 'personalImpact'
      ];

      const missingFields = requiredFields.filter(field => 
        !ratingData[field] || ratingData[field].trim() === ''
      );

      if (ratingData.rating === 0) {
        missingFields.push('التقييم');
      }

      if (missingFields.length > 0) {
        throw new Error(`يرجى ملء جميع الحقول المطلوبة: ${missingFields.join(', ')}`);
      }

      await submitBookRating(book, ratingData);
      
      showAPIResponse('success', 'تم إرسال تقييم الكتاب بنجاح');
      setSelectedBook(null);
    } catch (error) {
      showAPIResponse('error', error.message || 'حدث خطأ أثناء إرسال التقييم');
      
      // Optional: log the error for debugging
      console.error('Book Rating Error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle self-assessment submission
  const handleSelfAssessment = async (book, assessmentData) => {
    try {
      setSubmitting(true);
      
      // Create a new object with only the required fields for star ratings
      const filteredAssessmentData = {
        enjoyedReading: assessmentData.enjoyedReading,
        readUsefulBooks: assessmentData.readUsefulBooks,
        madeNewFriends: assessmentData.madeNewFriends,
        conversationsImprovedUnderstanding: assessmentData.conversationsImprovedUnderstanding,
        expressedOpinionFreely: assessmentData.expressedOpinionFreely,
        increasedSelfConfidence: assessmentData.increasedSelfConfidence,
        wouldEncourageClassmates: assessmentData.wouldEncourageClassmates,
        willJoinNextYear: assessmentData.willJoinNextYear,
        
        // Add empty strings for fields causing validation issues
        readingMotivation: '',
        readingChallenges: '',
        personalGrowth: '',
        futureReadingPlans: ''
      };

      await submitSelfAssessment(book, filteredAssessmentData);
      
      showAPIResponse('success', 'تم إرسال التقييم الذاتي بنجاح');
      setSelectedBookForSelfAssessment(null);
    } catch (error) {
      showAPIResponse('error', error.message || 'حدث خطأ أثناء إرسال التقييم الذاتي');
      
      // Optional: log the error for debugging
      console.error('Self Assessment Error:', error);
    } finally {
      setSubmitting(false);
    }
  };
  // Close API response modal
  const closeAPIResponseModal = () => {
    setShowAPIResponseModal(false);
    setAPIResponse({ type: '', message: '' });
  };

  useEffect(() => {
    fetchBooks();
  }, [fetchBooksBySchoolCode]);

  if (loading) {
    return (
      <div className="" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <div className="" style={{textAlign: 'center',animation: 'pulse 1.5s infinite'}}>
          <FaSpinner className="spinner-icon" style={{fontSize: '4rem', color: '#3498db', marginBottom: '15px', animation: 'spin 1s linear infinite'}} />
          <p>جارٍ تحميل الكتب...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="library-student-container">
      <h1>مكتبة الكتب المدرسية</h1>
      <div className="books-grid">
        {books.map((book) => (
          <div key={book._id} className="book-card">
            <img 
              src={book.bookImage} 
              alt={book.title} 
              className="book-image"
            />
            <div className="book-details">
              <h3>{book.title}</h3>
              <p><strong>المؤلف:</strong> {book.author}</p>
              <p><strong>الرسام:</strong> {book.illustrator}</p>
              <p><strong>عدد الصفحات:</strong> {book.numberOfPages}</p>
              <p><strong>رمز المدرسة:</strong> {book.schoolCode}</p>
              <p><strong>تاريخ المناقشة:</strong> {book.Discussiondate ? new Date(book.Discussiondate).toLocaleDateString('ar-EG', { day: 'numeric', month: 'numeric', year: 'numeric' }) : 'غير محدد'} </p>
              <div className="book-actions">
                <button 
                  onClick={() => setSelectedBook(book)} 
                  className="btn btn-success p-0"
                >
                  بطاقة تقييم الكتاب
                </button>
                <button 
                  onClick={() => setSelectedBookForSelfAssessment(book)} 
                  className="btn btn-primary p-0"
                >
                  التقييم الذاتي للطالب
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedBook && (
        <BookRatingModal 
          book={selectedBook} 
          onClose={() => setSelectedBook(null)}
          onSubmit={(reviewData) => handleBookRating(selectedBook, reviewData)}
          submitting={submitting}
        />
      )}
      {selectedBookForSelfAssessment && (
        <SelfAssessmentModal 
          book={selectedBookForSelfAssessment} 
          onClose={() => setSelectedBookForSelfAssessment(null)}
          onSubmit={(assessmentData) => handleSelfAssessment(selectedBookForSelfAssessment, assessmentData)}
        />
      )}
      {showAPIResponseModal && (
        <APIResponseModal 
          type={apiResponse.type}
          message={apiResponse.message}
          onClose={closeAPIResponseModal}
        />
      )}
    </div>
  );
};