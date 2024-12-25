import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../../context/context.js';
import { FaStar, FaBook, FaSpinner, FaCheckCircle, FaExclamationCircle, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';
import {jwtDecode} from 'jwt-decode';
import './LibraryStudent.css';
import { Modal as BootstrapModal, Alert } from 'react-bootstrap';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [review, setReview] = useState(() => {
    // Try to load saved review from localStorage
    const savedReview = localStorage.getItem(`book-review-${book._id}`);
    return savedReview ? JSON.parse(savedReview) : {
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
    };
  });
  const [errors, setErrors] = useState({});
  const [showAPIResponseModal, setShowAPIResponseModal] = useState(false);
  const [apiResponse, setAPIResponse] = useState({ type: '', message: '' });
  const decodedToken = jwtDecode(localStorage.getItem('token'));

  // Save to localStorage whenever review changes
  useEffect(() => {
    localStorage.setItem(`book-review-${book._id}`, JSON.stringify(review));
  }, [review, book._id]);

  // Load saved rating from localStorage
  useEffect(() => {
    const savedRating = localStorage.getItem(`book-rating-${book._id}`);
    if (savedRating) {
      setRating(parseInt(savedRating));
    }
  }, [book._id]);

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
    localStorage.setItem(`book-rating-${book._id}`, star.toString());
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
      setShowConfirmation(true);
    }
  };

  const handleConfirmedSubmit = async () => {
    setIsSubmitting(true);
    try {
      const sanitizedReview = Object.keys(review).reduce((acc, key) => {
        const value = typeof review[key] === 'string' ? review[key].trim() : review[key];
        
        if (value === '') {
          throw new Error(`Field ${key} cannot be empty`);
        }
        
        acc[key] = value;
        return acc;
      }, {});

      if (rating < 1 || rating > 5) {
        throw new Error('Invalid book rating');
      }

      const submissionData = {
        ...sanitizedReview,
        bookRating: rating,
        schoolCode: decodedToken.schoolCode
      };

      const response = await onSubmit(submissionData);
      
      if (response.success) {
        // Clear localStorage after successful submission
        localStorage.removeItem(`book-review-${book._id}`);
        localStorage.removeItem(`book-rating-${book._id}`);
        onClose();
      }
    } catch (error) {
      console.error('Book rating submission error:', error);
      setAPIResponse({ 
        type: 'error', 
        message: error.response?.data?.message || error.message || 'حدث خطأ أثناء إرسال التقييم'
      });
      setShowAPIResponseModal(true);
    } finally {
      setIsSubmitting(false);
      setShowConfirmation(false);
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
        {showConfirmation ? (
          <div className="confirmation-modal">
            <h3>تأكيد إرسال التقييم</h3>
            <p>هذا التقييم نهائي ولا يمكن التغيير فيه لاحقًا</p>
            <div className="modal-actions">
              <button 
                onClick={handleConfirmedSubmit} 
                disabled={isSubmitting}
                className="btn btn-success"
              >
                {isSubmitting ? 'جاري الإرسال...' : 'تأكيد وإرسال'}
              </button>
              <button 
                onClick={() => setShowConfirmation(false)} 
                disabled={isSubmitting}
                className="cancel-btn"
              >
                رجوع
              </button>
            </div>
          </div>
        ) : (
          <div>
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
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <FaSpinner className="fa-spin" />
                ) : (
                  'إرسال التقييم'
                )}
              </button>
              <button 
                onClick={onClose} 
                className="cancel-btn" 
                disabled={isSubmitting}
              >
                إلغاء
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Self Assessment Modal Component
const SelfAssessmentModal = ({ book, onClose, onSubmit }) => {
  const { submitSelfAssessment } = useContext(DataContext);
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

      const result = await submitSelfAssessment(
        decodedToken.id,
        book._id,
        {
          schoolCode: decodedToken.schoolCode,
          ...assessment
        }
      );

      setAPIResponse({
        type: result.success ? 'success' : 'error',
        message: result.message
      });
      setShowAPIResponseModal(true);

      if (result.success) {
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (error) {
      setAPIResponse({
        type: 'error',
        message: error.message || 'حدث خطأ أثناء إضافة التقييم الذاتي'
      });
      setShowAPIResponseModal(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleAPIResponseModalClose = () => {
    setShowAPIResponseModal(false);
    if (apiResponse.type === 'success') {
      onClose();
    }
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

        {showAPIResponseModal && (
          <APIResponseModal
            type={apiResponse.type}
            message={apiResponse.message}
            onClose={handleAPIResponseModalClose}
          />
        )}
      </div>
    </div>
  );
};

export default function LibraryStudent() {
  const { 
    fetchBooksBySchoolCode, 
    submitBookRating, 
    getBookRating,
    submitSelfAssessment,
    getSelfAssessment 
  } = useContext(DataContext);
  
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedBookForSelfAssessment, setSelectedBookForSelfAssessment] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showAPIResponseModal, setShowAPIResponseModal] = useState(false);
  const [apiResponse, setAPIResponse] = useState({ type: '', message: '' });
  const [loadingRatingButton, setLoadingRatingButton] = useState(null);
  const [loadingSelfAssessmentButton, setLoadingSelfAssessmentButton] = useState(null);

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

  const handleBookRatingSubmit = async (reviewData) => {
    try {
      const result = await submitBookRating(selectedBook._id, reviewData);
      
      if (result.success) {
        setShowAPIResponseModal(false);
        setShowAPIResponseModal(true);
        setAPIResponse({
          type: 'success',
          message: result.message
        });
      }
      return result;
    } catch (error) {
      // Let the BookRatingModal handle the error display
      throw error;
    }
  };

  const handleRateBookClick = async (book) => {
    setLoadingRatingButton(book._id);
    try {
      const result = await getBookRating(book._id);
      
      if (result.data && result.data.length > 0) {
        // Book has already been rated
        setAPIResponse({
          type: 'warning',
          message: 'تم تقييم هذا الكتاب مسبقاً'
        });
        setShowAPIResponseModal(true);
      } else {
        // Book hasn't been rated, show rating modal directly
        setSelectedBook(book);
      }
    } catch (error) {
      // Only show error if it's not a "no rating found" error
      if (error.message !== 'لم يتم العثور على تقييم لهذا الكتاب') {
        console.error('Error checking book rating:', error);
        setAPIResponse({
          type: 'error',
          message: error.message || 'حدث خطأ أثناء التحقق من تقييم الكتاب'
        });
        setShowAPIResponseModal(true);
      } else {
        // If no rating found, show rating modal directly
        setSelectedBook(book);
      }
    } finally {
      setLoadingRatingButton(null);
    }
  };

  const handleSelfAssessmentClick = async (book) => {
    setLoadingSelfAssessmentButton(book._id);
    try {
      const decodedToken = jwtDecode(localStorage.getItem('token'));
      const result = await getSelfAssessment(decodedToken.id, book._id);
      
      if (result.success && result.data.length > 0) {
        setAPIResponse({
          type: 'warning',
          message: 'تم التقييم الذاتي لهذا الكتاب مسبقاً'
        });
        setShowAPIResponseModal(true);
      } else {
        setSelectedBookForSelfAssessment(book);
      }
    } catch (error) {
      console.error('Error checking self assessment:', error);
      setAPIResponse({
        type: 'error',
        message: 'حدث خطأ أثناء التحقق من التقييم الذاتي'
      });
      setShowAPIResponseModal(true);
    } finally {
      setLoadingSelfAssessmentButton(null);
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
                  className="btn btn-success p-0"
                  onClick={() => handleRateBookClick(book)}
                  disabled={loadingRatingButton === book._id}
                >
                  {loadingRatingButton === book._id ? (
                    'انتظر قليلا...'
                  ) : (
                    'بطاقة تقييم الكتاب'
                  )}
                </button>
                <button 
                  onClick={() => handleSelfAssessmentClick(book)}
                  className="btn btn-primary p-0"
                  disabled={loadingSelfAssessmentButton === book._id}
                >
                  {loadingSelfAssessmentButton === book._id ? (
                    'انتظر قليلا...'
                  ) : (
                    'التقييم الذاتي للطالب'
                  )}
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
          onSubmit={handleBookRatingSubmit}
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