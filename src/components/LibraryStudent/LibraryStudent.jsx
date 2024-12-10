import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../../context/context.js';
import { FaStar, FaBook, FaSpinner, FaCheckCircle } from 'react-icons/fa';
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
        <h2>تم إرسال تقييمك بنجاح!</h2>
        <p>شكراً لك على مشاركة رأيك</p>
        <div className="success-popup-animation"></div>
      </div>
    </div>
  );
};

const BookRatingModal = ({ book, onClose, onSubmit, submitting }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState({
    mainCharacters: '',
    characterTraits: '',
    keySummary: '',
    favoriteQuotes: '',
    hypotheticalChanges: '',
    overallOpinion: '',
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
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    // Check if rating is selected
    if (rating === 0) {
      newErrors.rating = 'يرجى اختيار تقييم للكتاب';
    }

    // Check all text fields
    Object.keys(review).forEach(key => {
      if (!review[key].trim() && key !== 'readingStartDate' && key !== 'readingEndDate') {
        newErrors[key] = 'هذا الحقل مطلوب';
      }
    });

    // Check recommendation
    if (!review.recommendBook) {
      newErrors.recommendBook = 'يرجى اختيار توصيتك للكتاب';
    }

    // Validate reading dates
    if (!review.readingStartDate) {
      newErrors.readingStartDate = 'يرجى إدخال تاريخ بدء القراءة';
    }

    if (!review.readingEndDate) {
      newErrors.readingEndDate = 'يرجى إدخال تاريخ انتهاء القراءة';
    }

    // Ensure end date is after start date
    if (review.readingStartDate && review.readingEndDate) {
      const startDate = new Date(review.readingStartDate);
      const endDate = new Date(review.readingEndDate);

      if (endDate < startDate) {
        newErrors.readingEndDate = 'يجب أن يكون تاريخ الانتهاء بعد تاريخ البدء';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRatingChange = (value) => {
    setRating(value);
    // Clear rating error when a rating is selected
    if (errors.rating) {
      const newErrors = {...errors};
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

    // Clear specific field error when it's filled
    if (errors[name]) {
      const newErrors = {...errors};
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({
        ...review,
        rating
      });
      
      // Add 2-second delay before showing success popup
      setTimeout(() => {
        setShowSuccessPopup(true);
      }, 2000);
    }
  };

  const handleSuccessPopupClose = () => {
    setShowSuccessPopup(false);
    onClose();
  };

  // If success popup is shown, render it
  if (showSuccessPopup) {
    return <SuccessPopup onClose={handleSuccessPopupClose} />;
  }

  return (
    <div className="book-rating-modal">
      <div className="modal-content">
        <h2>تقييم كتاب {book.title}</h2>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar 
              key={star} 
              color={star <= rating ? "#ffc107" : "#e4e5e9"}
              onClick={() => handleRatingChange(star)}
              className="star-icon"
            />
          ))}
          {errors.rating && <p className="error-message">{errors.rating}</p>}
        </div>
        <div className="review-section">
          <div className="review-group">
            <h3>الشخصيات والأحداث</h3>
            <textarea 
              name="mainCharacters"
              placeholder="الشخصيات الرئيسية"
              value={review.mainCharacters}
              onChange={handleReviewChange}
              required
            />
            {errors.mainCharacters && <p className="error-message">{errors.mainCharacters}</p>}
            
            <textarea 
              name="characterTraits"
              placeholder="صفات الشخصيات"
              value={review.characterTraits}
              onChange={handleReviewChange}
              required
            />
            {errors.characterTraits && <p className="error-message">{errors.characterTraits}</p>}
            
            <textarea 
              name="keySummary"
              placeholder="ملخص لأهم الأحداث"
              value={review.keySummary}
              onChange={handleReviewChange}
              required
            />
            {errors.keySummary && <p className="error-message">{errors.keySummary}</p>}
          </div>

          <div className="review-group">
            <h3>التقييم والرأي</h3>
            <textarea 
              name="favoriteQuotes"
              placeholder="عبارات أعجبتني"
              value={review.favoriteQuotes}
              onChange={handleReviewChange}
              required
            />
            {errors.favoriteQuotes && <p className="error-message">{errors.favoriteQuotes}</p>}
            
            <textarea 
              name="hypotheticalChanges"
              placeholder="لو كنت أنا الكاتب لغيرت"
              value={review.hypotheticalChanges}
              onChange={handleReviewChange}
              required
            />
            {errors.hypotheticalChanges && <p className="error-message">{errors.hypotheticalChanges}</p>}
            
            <textarea 
              name="overallOpinion"
              placeholder="رأيي بشكل عام في الكتاب"
              value={review.overallOpinion}
              onChange={handleReviewChange}
              required
            />
            {errors.overallOpinion && <p className="error-message">{errors.overallOpinion}</p>}
            
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
              placeholder="ملخص لأهم الأفكار"
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
              placeholder="لو كنت أنا الكاتب ماذا كنت ستضيف أو تغيير؟"
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

export default function LibraryStudent() {
  const { fetchBooksBySchoolCode, submitBookRating } = useContext(DataContext);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await fetchBooksBySchoolCode();
        setBooks(booksData.books || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, [fetchBooksBySchoolCode]);

  const handleBookRating = async (book, reviewData) => {
    try {
      setSubmitting(true);
      
      const response = await submitBookRating(book._id, {
        mainCharacters: reviewData.mainCharacters,
        characterTraits: reviewData.characterTraits,
        keySummary: reviewData.keySummary,
        favoriteQuotes: reviewData.favoriteQuotes,
        hypotheticalChanges: reviewData.hypotheticalChanges,
        overallOpinion: reviewData.overallOpinion,
        recommendBook: reviewData.recommendBook,
        authorStyle: reviewData.authorStyle,
        keyIdeas: reviewData.keyIdeas,
        likedIdeas: reviewData.likedIdeas,
        dislikedIdeas: reviewData.dislikedIdeas,
        memorableQuotes: reviewData.memorableQuotes,
        potentialAdditions: reviewData.potentialAdditions,
        personalImpact: reviewData.personalImpact,
        readingStartDate: reviewData.readingStartDate,
        readingEndDate: reviewData.readingEndDate,
        bookRating: Math.max(1, reviewData.rating || 0)
      });
      
      // Show success alert
      alert('تم إرسال تقييمك بنجاح! شكراً لك على مشاركة رأيك.');
      
      // Optional: Show success message or update UI
      console.log('Book rating submitted successfully:', response);
      
      // Add 2-second delay before showing success popup
      setTimeout(() => {
        setSubmitting(false);
        setSelectedBook(null);
      }, 2000);
    } catch (error) {
      console.error('Failed to submit book rating:', error);
      // Show error alert
      alert('حدث خطأ أثناء إرسال التقييم. يرجى المحاولة مرة أخرى.');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <FaSpinner className="spinner-icon" />
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
              <p><strong>المعلم:</strong> {book.teacher.name}</p>
              <div className="book-actions">
                <a 
                  href={book.bookLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="book-link-btn text-decoration-none"
                >
                  <FaBook /> رابط الكتاب
                </a>
                <button 
                  onClick={() => setSelectedBook(book)} 
                  className="rate-book-btn"
                >
                  قيّم الكتاب
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
    </div>
  );
}
