import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { FaBook, FaUsers, FaCommentDots, FaLightbulb } from 'react-icons/fa';
import './TeacherGuide.css';

const TeacherGuide = () => {
  const [selectedSection, setSelectedSection] = useState(null);

  const benefits = [
    "اكتساب ثقافة وتوسيع مدارك",
    "تطوير للتفكير النقدي",
    "تطوير للمهارات لغوية",
    "تطوير مهارات الحوار الفعال",
    "بناء صداقات هادفة",
    "مشاركة اهتمامات بناءة",
    "مشاركة اهتمامات بناءة"
  ];

  const openSectionModal = (section) => {
    setSelectedSection(section);
  };

  const closeSectionModal = () => {
    setSelectedSection(null);
  };

  return (
    <div className="parent-guide-container">
      <div className="parent-guide-content">
        <section className="guide-header">
          <h1>برنامج أندية القراءة المدرسية</h1>
          <h2>دليل المشرف التربوي</h2>
          <div className="header-underline"></div>
        </section>

        <Row className="intro-section mb-5">
          <Col>
            <Card className="full-introduction-card">
              <Card.Body>
                <Card.Title className="text-center mb-4">المقدمة</Card.Title>
                <Card.Text>
                  <p>
                  برنامج أندية القراءة المدرسية هو برنامج وطني ثقافي يطمح إلى خلق جيل واعي وقارئ عن طريق إنشاء أندية قرائية في المدارس لمختلف المراحل التعليمية حيث يكتسب الطلاب مهارات التعلم الذاتي، وحب القراءة والمشاركة بآرائهم مع أقرانهم، مما يعزز فهم الطالب لما يقرأ، ويرفع من قدرته على التعبير عن نفسه، ويزرع لديه شغف العلم والمشاركة الفاعلة في العملية المعرفية
                  </p>
                  <p>
                  يهتم البرنامج بتنمية مهارات الطلاب من حيث
                  </p>
                  <ul className="benefits-list px-5">
                    {benefits.map((benefit, index) => (
                      <li style={{listStyle:"none",textAlign:"justify"}} key={index}>{benefit}</li>
                    ))}
                  </ul>
                  <p className="mt-4">
                    دوركم كمشرفين تربويين يتجاوز مجرد الإشراف، بل هو رسالة سامية في بناء جيل واعٍ ومثقف، قادر على التفكير النقدي والتعبير عن نفسه بثقة وإبداع.
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="reading-club-system mb-5">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="text-center mb-4">أهداف البرنامج بعيدة المدى</Card.Title>
                <Card.Text>
                  <ul className='px-5'>
                    <li style={{listStyle:"none",textAlign:"justify"}}>خلق جيل قارئ</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>تطوير حركة النقد في دولة الإمارات العربية المتحدة</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>رفع الوعي بأهمية المشاركة في الفعاليات الثقافية</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>رفع وعي المجتمع بأهمية المشاركة في الفعاليات</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>تطوير الناتج الأدبي المحلي</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="reading-club-system mb-5">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="text-center mb-4">نظام أندية القراءة المدرسية</Card.Title>
                <Card.Text>
                  <ul className='px-5'>
                    <li style={{listStyle:"none",textAlign:"justify"}}>تقام اجتماعات نادي القراءة شهريًا لتجمع الطلاب الملتحقين بالنادي لمناقشة كتب يختارها الطلاب لقراءتها ونقاشها.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>يتولى أحد الطلبة إدارة جلسة المناقشة مما يعزز حس المسؤولية وروح القيادة.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>يشرف أمين المكتبة على لقاءات الطلبة ويوجه لهم الإرشاد والدعم.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>يشجع النادي القراءة للمتعة، ويعزز النقاش، ويبني مجتمعًا طلابيًا قارئًا.</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="joining-section mb-5">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="text-center mb-4">كيفية الانضمام للنادي</Card.Title>
                <Card.Text>
                  <p>
                    الانضمام للنادي ينبع من رغبة شخصية لدى الطلاب وتحفيز من أولياء الأمور ودعم من المشرفين التربويين.
                    يفتح باب التسجيل للانضمام لنادي القراءة. يتم اختيار الطلبة كأعضاء في النادي للمشاركة الفاعلة في كافة اجتماعاته على مدار العام الدراسي والتي تتضمن حلقات النقاش الشهرية والأنشطة المصاحبة لها والرحلات المدرسية، ولقاءات أولياء الأمور.
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="book-selection mb-5">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="text-center mb-4">ما الكتب التي سيقرؤها الطلاب وكيف يتم اختيارها؟</Card.Title>
                <Card.Text>
                  <ul className='px-5'>
                    <li style={{listStyle:"none",textAlign:"justify"}}>كتب نادي القراءة هي كتب للمطالعة الحرة خارج المنهج التعليمي.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>ستطرح قوائم بالكتب من مختلف ميادين الثقافة والأدب لتعريف الطلاب على عدة أنواع من الكتب.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>تتضمن القوائم كتبًا ملائمة لكل مرحلة عمرية.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>يختار الطلاب الكتب الشهرية التي سيناقشونها مع أقرانهم عن طريق القرعة أو التصويت.</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="program-stages mb-5">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="text-center mb-4">مراحل برنامج أندية القراءة المدرسية</Card.Title>
                <Card.Text>
                  <ul className='px-5'>
                    <li style={{listStyle:"none",textAlign:"justify"}}>الإعلان عن البرنامج وفتح باب التسجيل فيه للطلاب.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>دعوة أولياء الأمور لحضور الجلسة التوعية بأندية القراءة.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>دعوة الطلاب لحضور الندوة التعريفية بأندية القراءة.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>استقبال طلبات التسجيل من الطلاب واختيار المشاركين في البرنامج.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>عقد اجتماع افتتاح نادي القراءة والتعريف بأنواع الكتب والقوائم المتاحة.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>تحديد موعد للاجتماع الأول واختيار كتاب لمناقشته.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>استلام الطلاب للكتاب.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>عقد الاجتماع الأول.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>في كل اجتماع يتم تحديد الكتاب الذي سيناقش في الجلسة التالية.</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="library-role mb-5">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="text-center mb-4">دور أمناء المكتبات في البرنامج</Card.Title>
                <p>أندية القراءة تخلق فرصة للأبناء للتعرف على ميولهم وعلى ما يجري في العالم من حولهم ويريهم عوالم لا تتاح لهم زيارتها إلّا عن طريق الكتب، كالتعرف على طبائع الشعوب ومختلف العلوم وعلى تطور البشرية عبر العصور. فدور أمناء المكتبات هو توفير الدعم اللازم للطلاب وتوجيهم لاختيار الكتب الملائمة لمستواهم وتوسيع دائرة معارفهم، والإسهام وفي خلق بيئة صحية بين أعضاء النادي قائمة على التفاهم والتعاون</p>
                <Card.Text>
                  <ul className='px-5'>
                    <li style={{listStyle:"none",textAlign:"justify"}}>تعريف الطلاب بالكتب الملائمة لميولهم ومستوياتهم القرائية ومساعدتهم في عملية اختيار الكتاب.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>تحفيز الطلاب أثناء المناقشة على المشاركة بآرائهم والاستماع إلى آراء زملائهم وتوسيع دائرة التفكير والتحليل.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>ربط مادة الكتاب بأمثلة من الحياة والمنهج الدراسي.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>توفير مواد قرائية إضافية للطلاب الراغبين بتوسيع قراءاتهم.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>تعريف الطلاب بكتب متنوعة المجالات والأساليب والثقافات.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>إعداد مكان الاجتماع وابتكار أنشطة مساندة للقراءة والمناقشة لإضفاء جو من العفوية والصداقة.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>تقديم التوجيه للطلاب في حال الحاجة ودعمهم لتحصيل أعلى فائدة ومتعة من المشاركة.</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="meeting-schedule mb-5">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="text-center mb-4">تحديد مواعيد الاجتماعات</Card.Title>
                <Card.Text>
                  <ul className='px-5'>
                    <li style={{listStyle:"none",textAlign:"justify"}}>اختيار موعد دائم لعقد الاجتماعات (يوم ووقت محدد من كل شهر).</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>الحرص على أن يكون الوقت كافيًا ليتمكن الطلاب من قراءة الكتاب قبل المناقشة.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>توفير بعض المرونة لمراعاة الفروقات في قدرات المشاركين.</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="meeting-preparation mb-5">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="text-center mb-4">الإعداد للاجتماعات</Card.Title>
                <Card.Text>
                  <ul className='px-5'>
                    <li style={{listStyle:"none",textAlign:"justify"}}>يحدد مدير للجلسة من أحد الطلاب ليطرح أسئلة ويدير الحوار بين المشاركين.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>يدون الطلاب تقييمهم للكتاب قبل الاجتماع بملء بطاقة تقييم الكتاب.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>يقدم المشرف التربوي الدعم لمدير الجلسة قبل الاجتماع بمراجعة الأسئلة والمحاور التي أعدها لإدارة الاجتماع.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>ييسر المشرف التربوي الحوار أثناء الاجتماع بدعم مدير الجلسة وتشجيع الحضور على المشاركة الفاعلة.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>يمكن دعوة أولياء الأمور لبعض الجلسات كنشاط مصاحب ما بعد المناقشة.</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="constructive-discussions mb-5">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="text-center mb-4">تحفيز نقاشات بناءة</Card.Title>
                <Card.Text>
                  <ul className='px-5'>
                    <li style={{listStyle:"none",textAlign:"justify"}}>مساعدة مدير الجلسة على إعداد أسئلة هادفة تشجع المشاركين على التفكير النقدي والحوار.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>خلق بيئة آمنة ترحب بالحضور وتحفزهم على إبداء آرائهم.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>احترام وجهات النظر أثناء النقاش.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>تشجيع الطلاب الذين يميلون إلى الاستماع للمشاركة في المناقشة وحث المتحدثين على الإصغاء لأقرانهم.</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="interactive-environment mb-5">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="text-center mb-4">أساليب تعزيز البيئة التفاعلية في نادي القراءة</Card.Title>
                <Card.Text>
                  <ul className='px-5'>
                    <li style={{listStyle:"none",textAlign:"justify"}}>تشجيع الطلاب على أخذ زمام القيادة وتعزيز ثقتهم بمشاركاتهم.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>تنويع وسائل التعلم المساندة كاستخدام التكنولوجيا (الكتب الالكترونية، الصوتية، والمواد التفاعلية).</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>بناء علاقة ودية مع الطلاب بحيث تكون مرجعًا للاستفسار والاستزادة.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>تعريف الطلاب على المكتبات في المدينة، وإن أمكن التنسيق لزيارة إحدى المكتبات.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>إبقاء الوالدين على اطلاع بأنشطة النادي وتحفيزهم على مشاركة أبنائهم قراءة الكتب ومناقشتها معهم في المنزل.</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="program-evaluation mb-5">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="text-center mb-4">تقييم الاجتماعات والبرنامج</Card.Title>
                <Card.Text>
                  <p>يجري تقييم البرنامج على ثلاثة مستويات:</p>
                  <ul className='px-5'>
                    <li style={{listStyle:"none",textAlign:"justify"}}>تقييم المشرف التربوي للطلاب.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>تقييم الطلاب الذاتي.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>تقييم الطلاب للكتاب.</li>
                  </ul>
                  <p>
                    تُجمع التقييمات على مدى البرنامج وتُحلل لتتبع تطور الطلاب وأثر مشاركتهم في رفع مهاراتهم وقدراتهم.
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="impact-measurement mb-5">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="text-center mb-4">قياس الأثر</Card.Title>
                <Card.Text>
                  <p>يُقيّم البرنامج بمؤشرات كمية ونوعية للتعرف على النتائج وتحسين الجودة في السنوات القادمة:</p>
                  <h5 className="mt-3">مؤشرات قياس الأداء الكمية</h5>
                  <ul className='px-5'>
                    <li style={{listStyle:"none",textAlign:"justify"}}>عدد المدارس</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>عدد الطلاب</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>عدد الكتب المقروءة</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>عدد المواضيع</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>معدل حضور الطلاب</li>
                  </ul>
                  <h5 className="mt-3">مؤشرات قياس الأداء النوعية</h5>
                  <ul className='px-5'>
                    <li style={{listStyle:"none",textAlign:"justify"}}>تصميم استبيانات تقييس تطور الطلاب في النواحي التالية:</li>
                    <ul>
                      <li style={{listStyle:"none",textAlign:"justify"}}>مهارات التفكير</li>
                      <li style={{listStyle:"none",textAlign:"justify"}}>المهارات الاجتماعية</li>
                      <li style={{listStyle:"none",textAlign:"justify"}}>المهارات اللغوية</li>
                      <li style={{listStyle:"none",textAlign:"justify"}}>السلوك العام</li>
                    </ul>
                  </ul>
                  <p>يجيب عن الاستبيانات أولياء الأمور والمدرسين بالإضافة إلى التقييم الذاتي للطلاب وتقييمهم للكتب.</p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="challenges-overcoming mb-5">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="text-center mb-4">تجاوز التحديات</Card.Title>
                <Card.Text>
                  <p>
                    كأي نشاط جديد تبدأ به قد تواجهك بعض التحديات في بداية أو منتصف هذه الرحلة، بالتأقلم معها والعمل على
                    تجاوزها، ستحقق مع الطلاب تقدمًا في حب القراءة ويكون وقت النقاش من أمتع الأنشطة التي يشاركون بها:
                  </p>
                  <ul className='px-5'>
                    <li style={{listStyle:"none",textAlign:"justify"}}>
                      <strong>اختيار الكتب:</strong> من الوارد أن لا يتفق جميع الطلاب على كتاب للقراءة، وهذا طبيعي فلكل
                      ميوله. مهمتك هي الموازنة بين آراء الطلاب وجعل الاختلاف وسيلة للعب كاقتراح قرعة أو تصويت أو أن يختار
                      كل طالب كتابًا لشهر معين أو أن يساهم الطلاب في التعريف بالكتب التي يحبونها. وتشجيع الطلاب على قراءة
                      الكتب حتى وإن لم تكن من اختيارهم لأنها ستساهم في توسيع معارفهم وذوقهم الأدبي.
                    </li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>
                      <strong>اختلاف وجهات النظر:</strong> ليس من الضروري أن يتفق الجميع على رأي معين في النقاش، فبعض الطلاب
                      قد يحبون شخصية لا تروق لغيرهم أو يميلون إلى أسلوب لا يناسب طلابًا آخرين، وهنا تكمن فائدة أندية القراءة
                      بتقبل وجهات النظر المختلفة واحترامها. تعزيز هذه القيمة ضروري من أجل خلق جيل واعي وقادر على التعايش.
                    </li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>
                      <strong>التعامل مع عدم الاهتمام:</strong> إذا أظهر الطلاب عدم اهتمام بالقراءة، اقترح عليهم أساليب
                      مختلفة كالكتب الصوتية أو مشاهدة فيلم مستند على رواية أو التنويع من الكتب كالروايات المصورة وتطبيقات
                      القراءة ليكتشفوا ما يجذبهم.
                    </li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="final-reminder mb-5">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="text-center mb-4">تذكير أخير!</Card.Title>
                <Card.Text>
                  <p>
                    نجاح برنامج أندية القراءة المدرسية يعتمد اعتمادًا أساسيًا على المشرفين التربويين، فأنتم رواد هذه الرحلة
                    وبكم تعزز فائدتها ويتحقق أثرها. وستكون هذه التجربة ذكرى باقية لدى المشاركين فمعكم يمكن أن يبدأ الطالب
                    مسيرته المعرفية الذاتية التي سترافقه طيلة حياته. وهنا نقاط تلخص دوركم السامي في النادي:
                  </p>
                  <ul className='px-5'>
                    <li style={{listStyle:"none",textAlign:"justify"}}>تشجيع النقاشات الأدبية: طرح الأسئلة المفتوحة وتوجيه النقاش نحو استكشاف الأفكار الرئيسية في الكتب.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>تحفيز التفكير النقدي: تشجيع الطلاب على التعبير عن آرائهم الشخصية وتحليل النصوص الأدبية.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>المشاركة الفعالة: مشاركة المدرسين في القراءة والنقاش لتكون قدوة إيجابية للطلاب.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>تنظيم الأنشطة: تنظيم أنشطة تفاعلية مثل العروض التقديمية أو ورش العمل التي تعزز حب القراءة.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>تحسين الفهم والاستيعاب: تحفيز الطلاب على التفكير بعمق حول ما يقرؤونه.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>بناء الثقة بالنفس: توفير مساحة آمنة للطلاب للتعبير عن آرائهم.</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <section className="wisdom-section">
          <div className="wisdom-container">
            <p className="wisdom-quote">
              "العقول الصغيرة تناقش الأشخاص
              <br />
              العقول المتوسطة تناقش الأحداث
              <br />
              العقول الكبيرة تناقش الأفكار"
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TeacherGuide;
