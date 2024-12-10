import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, Alert, Spinner } from 'react-bootstrap';
import { DataContext } from '../../context/context.js';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default function StudentsTeacher() {
  const { fetchStudentsBySchoolCode, rateStudent } = useContext(DataContext);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [ratingData, setRatingData] = useState({
    readingSkills: {
      completeReading: 0,
      deepUnderstanding: 0,
      personalReflection: 0
    },
    confidence: 0,
    criticalThinking: {
      creativeIdeas: 0,
      connectingExperiences: 0,
      independentThinking: 0
    },
    communicationSkills: {
      clearExpression: 0,
      activeListening: 0,
      constructiveFeedback: 0
    },
    socialSkills: {
      activeParticipation: 0,
      respectingDiversity: 0,
      buildingFriendships: 0
    },
    generalBehavior: {
      collaboration: 0
    }
  });

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const response = await fetchStudentsBySchoolCode();
        const studentsData = Array.isArray(response) ? response : 
                              (response.students ? response.students : []);
        
        setStudents(studentsData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching students:', err);
        setError(err);
        setLoading(false);
      }
    };

    loadStudents();
  }, [fetchStudentsBySchoolCode]);

  const handleOpenRatingModal = (student) => {
    Swal.fire({
      title: 'دليل التقييم',
      html: `
        <div style="text-align: right; direction: rtl;">
          <h3>🌟 نظام التقييم</h3>
          <p>يتم تقييم الطالب من 1 إلى 5 درجات</p>
          <div class="rating-guide">
            <div class="rating-level">
              <strong>1 (ضعيف) 📉</strong>
              <p>أداء محدود يحتاج إلى تحسين كبير</p>
            </div>
            <div class="rating-level">
              <strong>2 (مقبول) 🟨</strong>
              <p>أداء أساسي مع مساحة للتطوير</p>
            </div>
            <div class="rating-level">
              <strong>3 (جيد) 🟢</strong>
              <p>أداء جيد ومتوسط</p>
            </div>
            <div class="rating-level">
              <strong>4 (جيد جداً) 🌟</strong>
              <p>أداء متميز وفوق المتوسط</p>
            </div>
            <div class="rating-level">
              <strong>5 (ممتاز) 🏆</strong>
              <p>أداء استثنائي ومتفوق</p>
            </div>
          </div>
        </div>
      `,
      icon: 'info',
      confirmButtonText: 'فهمت، أريد التقييم',
      customClass: {
        popup: 'custom-swal-popup',
        title: 'custom-swal-title',
        content: 'custom-swal-content'
      },
      didOpen: () => {
        const style = document.createElement('style');
        style.innerHTML = `
          .custom-swal-popup { 
            background-color: #f0f4f8 !important; 
            border-radius: 15px !important;
            font-family: 'Cairo', sans-serif !important;
          }
          .custom-swal-title { 
            color: #2c3e50 !important; 
            font-weight: bold !important;
          }
          .rating-guide {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-top: 15px;
          }
          .rating-level {
            background-color: white;
            border-radius: 10px;
            padding: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
          }
          .rating-level:hover {
            transform: scale(1.02);
          }
          .rating-level strong {
            color: #3498db;
            display: block;
            margin-bottom: 5px;
          }
          .rating-level p {
            color: #7f8c8d;
            margin: 0;
          }
        `;
        document.head.appendChild(style);
      }
    }).then((result) => {
      if (result.isConfirmed) {
        setSelectedStudent(student);
        setShowStudentModal(true);
      }
    });
  };

  const handleCloseRatingModal = () => {
    setShowStudentModal(false);
    setSelectedStudent(null);
    setRatingData({
      readingSkills: {
        completeReading: 0,
        deepUnderstanding: 0,
        personalReflection: 0
      },
      confidence: 0,
      criticalThinking: {
        creativeIdeas: 0,
        connectingExperiences: 0,
        independentThinking: 0
      },
      communicationSkills: {
        clearExpression: 0,
        activeListening: 0,
        constructiveFeedback: 0
      },
      socialSkills: {
        activeParticipation: 0,
        respectingDiversity: 0,
        buildingFriendships: 0
      },
      generalBehavior: {
        collaboration: 0
      }
    });
  };

  const handleRatingChange = (category, subcategory, value) => {
    setRatingData(prevData => {
      if (subcategory) {
        return {
          ...prevData,
          [category]: {
            ...prevData[category],
            [subcategory]: value
          }
        };
      }
      return {
        ...prevData,
        [category]: value
      };
    });
  };

  const handleSubmitRating = async () => {
    try {
      if (!selectedStudent) return;

      await rateStudent(selectedStudent._id, ratingData);
      
      alert('تم تقييم الطالب بنجاح');
      
      handleCloseRatingModal();
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('حدث خطأ أثناء تقييم الطالب');
    }
  };

  const renderRatingInputs = (category, subcategories = null) => {
    if (subcategories) {
      return Object.keys(subcategories).map(subcat => (
        <Form.Group key={subcat} className="mb-3">
          <Form.Label>{getArabicLabel(subcat)}</Form.Label>
          <Form.Control 
            type="number" 
            min="0" 
            max="5" 
            value={ratingData[category][subcat]} 
            onChange={(e) => handleRatingChange(category, subcat, parseInt(e.target.value))}
          />
        </Form.Group>
      ));
    }
    
    return (
      <Form.Group className="mb-3">
        <Form.Label>{getArabicLabel(category)}</Form.Label>
        <Form.Control 
          type="number" 
          min="0" 
          max="5" 
          value={ratingData[category]} 
          onChange={(e) => handleRatingChange(category, null, parseInt(e.target.value))}
        />
      </Form.Group>
    );
  };

  const getArabicLabel = (key) => {
    const labels = {
      completeReading: 'القراءة الكاملة',
      deepUnderstanding: 'الفهم العميق',
      personalReflection: 'التأمل الشخصي',
      
      confidence: 'الثقة',
      
      creativeIdeas: 'الأفكار الإبداعية',
      connectingExperiences: 'ربط التجارب',
      independentThinking: 'التفكير المستقل',
      
      clearExpression: 'التعبير الواضح',
      activeListening: 'الاستماع الفعال',
      constructiveFeedback: 'التغذية الراجعة البناءة',
      
      activeParticipation: 'المشاركة الفعالة',
      respectingDiversity: 'احترام التنوع',
      buildingFriendships: 'بناء الصداقات',
      
      collaboration: 'التعاون'
    };
    
    return labels[key] || key;
  };

  if (loading) {
    return (
      <Container fluid className="vh-100 d-flex align-items-center justify-content-center" 
        style={{ 
          background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 9999
        }}
      >
        <div className="text-center">
          <div 
            className="mb-4 mx-auto" 
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(255, 255, 255, 0.18)'
            }}
          >
            <Spinner 
              animation="border" 
              variant="light" 
              style={{ width: '80px', height: '80px', borderWidth: '6px' }} 
            />
          </div>
          <h2 className="display-5 text-white mb-3">جارٍ تحميل بيانات الطلاب</h2>
          <p className="lead text-white-50">
            يرجى الانتظار قليلاً... نحضر لك قائمة الطلاب
          </p>
          <div 
            className="mt-4 mx-auto" 
            style={{ 
              width: '200px', 
              height: '6px', 
              background: 'rgba(255,255,255,0.3)', 
              borderRadius: '10px' 
            }}
          >
            <div 
              className="h-100" 
              style={{ 
                width: '50%', 
                background: 'white', 
                borderRadius: '10px', 
                animation: 'loadingProgress 1.5s infinite' 
              }}
            ></div>
          </div>
        </div>

        <style>{`
          @keyframes loadingProgress {
            0% { width: 0%; }
            50% { width: 100%; }
            100% { width: 0%; }
          }
        `}</style>
      </Container>
    );
  }

  return (
    <Container>
      <h2 className="text-center mb-4">قائمة الطلاب</h2>
      {error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <Row>
          {students.map((student) => (
            <Col key={student._id} md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{student.name}</Card.Title>
                  <Card.Text>
                    <strong>الرقم المدرسي:</strong> {student.schoolCode}<br />
                    <strong>البريد الإلكتروني:</strong> {student.email}
                  </Card.Text>
                  <Button 
                    variant="primary" 
                    onClick={() => handleOpenRatingModal(student)}
                  >
                    تقييم الطالب
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Modal 
        show={showStudentModal} 
        onHide={handleCloseRatingModal}
        centered
        size="lg"
      >
        <Modal.Title className="text-center mt-3">تفاصيل الطالب وتقييمه</Modal.Title>
        <Modal.Body>
          {selectedStudent && (
            <Form>
              <h4 className="mb-4">تقييم الطالب: {selectedStudent.name}</h4>
              
              <h5>مهارات القراءة</h5>
              {renderRatingInputs('readingSkills', ratingData.readingSkills)}
              
              <h5>الثقة</h5>
              {renderRatingInputs('confidence')}
              
              <h5>التفكير النقدي</h5>
              {renderRatingInputs('criticalThinking', ratingData.criticalThinking)}
              
              <h5>مهارات التواصل</h5>
              {renderRatingInputs('communicationSkills', ratingData.communicationSkills)}
              
              <h5>المهارات الاجتماعية</h5>
              {renderRatingInputs('socialSkills', ratingData.socialSkills)}
              
              <h5>السلوك العام</h5>
              {renderRatingInputs('generalBehavior', ratingData.generalBehavior)}
              
              <Button 
                variant="primary" 
                onClick={handleSubmitRating}
                className="w-100 mt-3"
              >
                حفظ التقييم
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
}
