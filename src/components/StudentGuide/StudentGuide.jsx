import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { FaBook, FaUsers, FaCommentDots, FaLightbulb } from 'react-icons/fa';
import './StudentGuide.css';

const StudentGuide = () => {
  const [selectedSection, setSelectedSection] = useState(null);

  const benefits = [
    "مشاركة اهتمامات",
    "بناء صداقات هادفة",
    "اكتساب ثقافة وتوسيع مدارك",
    "تطوير للتفكير النقدي",
    "تطوير للمهارات لغوية",
    "تطوير مهارات الحوار الفعال",
    "تطوير مهارات شخصية كإدارة الوقت والاجتماعات والعمل الجماعي"
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
          <h2>دليل الطالب</h2>
          <div className="header-underline"></div>
        </section>

        <Row className="intro-section mb-5">
          <Col>
            <Card className="full-introduction-card">
              <Card.Body>
                <Card.Title className="text-center mb-4">المقدمة</Card.Title>
                <Card.Text>
                  <p>
                    تنتشر نوادي القراءة حول العالم وهي حلقات نقاشية يجتمع فيها مجموعة من الأشخاص بشكل دوري لمناقشة كتاب ويتبادلون آراءهم حول الأفكار التي قرؤوها وأسلوب الكتابة.
                  </p>
                  <p>
                    تدور بين الأعضاء أحاديث مسلية ومفيدة، ويطورون مهارات التفكير والتعبير والتنظيم والقيادة. وتعود هذه المناقشات على أعضاء المجموعة بالكثير من الفوائد التي تميزها عن القراءة المنفردة، بعض من هذه الفوائد:
                  </p>
                  <ul className="benefits-list px-5">
                    {benefits.map((benefit, index) => (
                      <li style={{listStyle:"none",textAlign:"justify"}} key={index}>{benefit}</li>
                    ))}
                  </ul>
                  <p className="mt-4">
                    بانضمامك لنادي القراءة المدرسي فإنك تؤسسك لمستقبل زاهر تتمتع فيه بمهارات اجتماعية ولغوية وفكرية وتساهم بدورك في رفعة وطنك ومجتمعك، فقد تصبح كاتبًا في يوم ما أو مفكرًا أو عالمًا، وستكسبك القراءة القدرة على التعامل مع تحديات الحياة والنجاح في المسار الذي تختاره في حياتك الشخصية والمهنية.
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
                <Card.Title className="text-center mb-4">نظام أندية القراءة المدرسية</Card.Title>
                <Card.Text>
                  <ul className='px-5'>
                    <li style={{listStyle:"none",textAlign:"justify"}}>تقام اجتماعات نادي القراءة شهريًا. يجتمع فيها أعضاء النادي ويناقشون كتبًا اختاروا قراءتها.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>يتولى أحد أعضاء النادي إدارة جلسة المناقشة، وهذه فرصة لاكتساب مهارات القيادة وإدارة الحوار.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>يشرف أمين المكتبة على لقاءات الطلبة ويقدم لهم الإرشاد والدعم.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>يشجع النادي القراءة للمتعة، ويعزز النقاش، ويبني مجتمعًا طلابيًا قارئًا.</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="joining-process mb-5">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="text-center mb-4">كيفية الانضمام للنادي</Card.Title>
                <Card.Text>
                  <p>يفتح باب التسجيل للراغبين من الطلاب بالانضمام.</p>
                  <p>يتم اختيار الطلبة كأعضاء في النادي للمشاركة الفاعلة في كافة اجتماعاته على مدار العام الدراسي والتي تتضمن حلقات النقاش الشهرية والأنشطة المصاحبة لها والرحلات المدرسية، ولقاءات أولياء الأمور.</p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="why-join-reading-club mb-5">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="text-center mb-4">لماذا تنضم لنادي القراءة؟</Card.Title>
                <Card.Text>
                  <ul className='px-5'>
                    <li style={{listStyle:"none",textAlign:"justify"}}><strong>تجعل القراءة ممتعة:</strong> تخرج أندية الكتب القراءة من الصف وتجعلها شيئًا يمكنك الاستمتاع به مع الأصدقاء. ستغوص في قصص مشوقة وتتحدث عما تحبه (أو لا تحبه!) حول هذه الكتب.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}><strong>تساعدك في تكوين صداقات:</strong> ستلتقي بأشخاص جدد يشاركونك اهتمامك بالكتب. هذه الصداقات يمكن أن تنمو من خلال تجارب القراءة المشتركة والمناقشات الممتعة.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}><strong>تعزز مهارات القراءة لديك:</strong> مع المزيد من القراءة، تتحسن مفرداتك وفهمك وقدراتك التحليلية بشكل طبيعي. بالإضافة إلى ذلك، ستمنحك مناقشة الكتب مع الآخرين رؤى جديدة وتساعدك على التفكير بعمق.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}><strong>استكشاف كتب متنوعة:</strong> سواء من الكتب التي ستقرؤها أو من الاستماع إلى آراء زملائك في النادي، ستتعرف على وجهات نظر مختلفة وتطّلع على أنواع كتب جديدة، ومنها ستتمكن من اختيار الأنسب لك وتكوّن ذوقك الأدبي الخاص.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}><strong>تحسين مهارات التواصل:</strong> مشاركة أفكارك في المناقشات يمنحك أريحية في التحدث أمام الآخرين وشرح أفكارك بوضوح.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}><strong>زيادة الثقة بالنفس:</strong> التحدث عن الكتب في مجموعة يعزز ثقتك بنفسك وقدرتك على إيصال وجهة نظرك.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}><strong>المشاركة في أنشطة مسلية:</strong> أندية الكتب تنظم أحيانًا فعاليات مبتكرة كالمشاريع الإبداعية واللقاءات مع المؤلفين، وتعرفك على الأفلام المرتبطة بالكتب التي قرأتها.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}><strong>تعزيز الإبداع والخيال:</strong> القراءة تُشعل خيالك، ومناقشات أندية الكتب تتيح لك فرصة استكشاف أفكار إبداعية مختلفة.</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="book-selection mb-5">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="text-center mb-4">ما الكتب التي ستقرؤها وكيف يتم اختيارها؟</Card.Title>
                <Card.Text>
                  <p>الكتب كثير ومتنوعة ولكل شخص ميوله وذوقه الأدبي الخاص، ستتضمن كتب نادي القراءة خيارات تناسب كافة الأذواق والتطلعات. قد لا تعجبك كل الكتب ولكنها ستعرفك على أساليب جديدة وتوسع مداركك. استغل هذه البيئة للتعرف مع زملائك على نقاط التشابه والاختلاف بينكم.</p>
                  <ul className='px-5'>
                    <li style={{listStyle:"none",textAlign:"justify"}}>كتب نادي القراءة هي كتب للمطالعة الحرة خارج المنهج التعليمي.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>ستطرح قوائم بالكتب من مختلف ميادين الثقافة والأدب.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>ستختار مع زملائك في النادي الكتب الشهرية التي ستناقشونها عن طريق القرعة أو التصويت.</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="book-types mb-5">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="text-center mb-4">أنواع الكتب</Card.Title>
                <Card.Text>
                  <ul className='px-5'>
                    <li style={{listStyle:"none",textAlign:"justify"}}><strong>الخيالية:</strong> من المغامرات إلى الخيال العلمي، الكتب الخيالية تنقلك إلى عوالم جديدة ومغامرات مشوقة.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}><strong>الواقعية:</strong> تعلم عن أشخاص حقيقيين، وأماكن، وأحداث. الكتب الواقعية تفتح نوافذ على عوالم مختلفة.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}><strong>الكتب المصورة:</strong> هذه الكتب مثالية لمن يحبون الفن. الروايات المصورة تجمع بين القصص الرائعة والرسوم التوضيحية.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}><strong>الكلاسيكيات والأعمال الحديثة:</strong> غالبًا ما تجمع أندية الكتب بين الكلاسيكيات الخالدة والأعمال الحديثة المشهورة، مما يمنحك الفرصة لتجربة مجموعة متنوعة من الأساليب والقصص.</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="reading-club-atmosphere mb-5">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="text-center mb-4">أندية القراءة توفر جوًا من المرح والإثارة!</Card.Title>
                <Card.Text>
                  <ul className='px-5'>
                    <li style={{listStyle:"none",textAlign:"justify"}}><strong>أسئلة تثير التفكير:</strong> خلال المناقشات، ستستكشف أسئلة مثل "لماذا قامت الشخصية بهذا التصرف؟" أو "ماذا كنت ستفعل في هذا الموقف؟" تساعدك على التفكير بعمق حول القصة والشخصيات.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}><strong>احترام الآراء المختلفة:</strong> كل شخص لديه أفكاره وآراؤه الخاصة، وهذا ما يجعل المناقشات مثيرة! ستكتسب احترام وجهات نظر الآخرين ورؤية الكتاب من زوايا جديدة.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}><strong>المرح والضحك:</strong> المناقشات ليست جادة دائمًا - هناك مساحة كبيرة للمرح والنكات وحتى النقاشات الخفيفة حول الأجزاء المفضلة (أو الأقل تفضيلاً) من الكتاب.</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="reading-club-preparation mb-5">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="text-center mb-4">الإعداد لاجتماعات نادي القراءة</Card.Title>
                <Card.Text>
                  <ul className='px-5'>
                    <li style={{listStyle:"none",textAlign:"justify"}}><strong>التزم بجدول القراءة:</strong> الالتزام بجدول القراءة يساعدك على المساهمة في المحادثات والاندماج مع المجموعة.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}><strong>تدوين الملاحظات أثناء القراءة:</strong> دوّن أفكارك أو أسئلتك أثناء القراءة. سيجعل ذلك المناقشات أكثر إثارة، وستجد الكثير لمشاركته.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}><strong>حضّر بطاقة تقييم الكتاب:</strong> بعد إتمام قراءة الكتاب اكتب رأيك في بطاقة تقييم الكتاب، شارك آرائك أثناء الاجتماع بقراءة تقييمك أو التعبير الحر عن أفكارك.</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="reading-club-role mb-5">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="text-center mb-4">دورك في نادي القراءة</Card.Title>
                <Card.Text>
                  <ul className='px-5'>
                    <li style={{listStyle:"none",textAlign:"justify"}}><strong>كن منفتحًا على الكتب الجديدة:</strong> حتى لو لم يكن الكتاب يبدو كاختيارك المعتاد، جربه. قد تتفاجأ بمدى استمتاعك به!</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}><strong>شارك بفاعلية:</strong> سواء كنت تطرح أسئلة، أو تجيب عليها، أو تستمع بانتباه، فإن مشاركتك تجعل النادي ممتعًا للجميع. لا توجد إجابة صحيحة أو خاطئة، ورأيك له قيمة.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}><strong>تقبّل وجهات النظر:</strong> حتى لو لم تتفق مع رأي شخص ما، فإن الاستماع واحترام وجهة نظره يساعد في خلق بيئة ودية ومنفتحة.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}><strong>المساهمة بأفكار إبداعية:</strong> تحدث عما أعجبك في الكتاب، أو ما فاجأك، أو ما لم يكن واضحًا بالنسبة لك. كل مساهمة تضيف إلى إثراء النقاش.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}><strong>استمتع!</strong> أندية الكتب تهدف إلى المتعة. سواء كنت تناقش تطور الحبكة أو تضحك على شخصية مضحكة، كل ذلك جزء من التجربة.</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="reading-club-participants mb-5">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="text-center mb-4">المشاركون في نادي القراءة</Card.Title>
                <Card.Text>
                  <ul className='px-5'>
                    <li style={{listStyle:"none",textAlign:"justify"}}>يحدد مدير للجلسة من أحد الطلاب ليطرح أسئلة ويدير الحوار بين المشاركين.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>يدون الطلاب تقييمهم للكتاب قبل الاجتماع بملء بطاقة تقييم الكتاب ويشاركون بعرض آرائهم أثناء الاجتماع.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>يقدم المشرف التربوي الدعم لمدير الجلسة قبل الاجتماع بمراجعة الأسئلة والمحاور التي أعدها لإدارة الاجتماع.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>ييسر المشرف التربوي الحوار أثناء الاجتماع بدعم مدير الجلسة وتشجيع الحضور على المشاركة الفاعلة.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>يمكن دعوة أولياء الأمور لبعض الجلسات كنشاط مصاحب ما بعد المناقشة.</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="meeting-evaluation mb-5">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="text-center mb-4">تقييم الاجتماعات والبرنامج</Card.Title>
                <Card.Text>
                  <p>لتحسين جودة البرنامج وقياس أثره، ستساهم مع زملائك في تقييم مدى استفادتكم، والمشاركة برأيكم عبر:</p>
                  <ul className='px-5'>
                    <li style={{listStyle:"none",textAlign:"justify"}}>تقييم الطلاب الذاتي</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}>تقييم الطلاب للكتاب</li>
                  </ul>
                  <p>تُجمع التقييمات على مدى البرنامج وتُحلل لتتبع تطور الطلاب وأثر مشاركتهم في رفع مهاراتهم وقدراتهم.</p>
                  <p>سيشارك في تقييم البرنامج والاجتماعات أولياء الأمور والمعلمون بتعبئة استبيانات لقياس مدى تطور مهارات الطلاب اللغوية والاجتماعية والفكرية.</p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="overcoming-challenges mb-5">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="text-center mb-4">تجاوز التحديات</Card.Title>
                <Card.Text>
                  <p>كأي نشاط جديد تبدأه قد تواجهك بعض التحديات في بداية أو منتصف هذه الرحلة، بالتأقلم معها والعمل على تجاوزها، ستحقق تقدمًا في حب القراءة وسيكون وقت النقاش من أمتع الأنشطة التي تشارك بها:</p>
                  <ul className='px-5'>
                    <li style={{listStyle:"none",textAlign:"justify"}}><strong>اختيار الكتب:</strong> إن لم يعجبك الكتاب، ابحث عن مصادر تلخص هذا الكتاب، قد تجد فيه فائدة لم تكن تتوقعها، ربما تجد فيلمًا مقتبسًا عن قصة الكتاب، أو تسجيل بودكاست، أو ملخص مرئي. بعض الكتب كالدواء المر الذي نتناوله لنتقوى.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}><strong>الشعور بالإحراج:</strong> من فوائد أندية القراءة هي توفير بيئة آمنة للتعبير والمشاركة، كل زملائك في نفس مستواك وكل واحد منكم يشجع الآخر، استغل هذه الفرصة للتجاوز الخوف فلا توجد أحكام أو طريقة واحد صحيحة للتفكير.</li>
                    <li style={{listStyle:"none",textAlign:"justify"}}><strong>الشعور بالملل:</strong> خذ فترات للراحة، واجعل لك طقوسًا للقراءة تزيد من متعتها، كأن توفر إضاءة مناسبة، وجوًا معتدلًا مع كوب من مشروبك الدافئ المفضل. تحدث مع أصدقائك عن رأيك المبدئي قبل الاجتماع وأين وصلت في القراءة، وربما تحددون سباقًا بينكم لمن ينهي الكتاب أولًا، ومن يلاحظ أكبر عدد من الملاحظات الجديدة.</li>
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

        {selectedSection && (
          <Modal show={!!selectedSection} onHide={closeSectionModal}>
            <Modal.Header closeButton>
              <Modal.Title>{selectedSection.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedSection.content}
            </Modal.Body>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default StudentGuide;
