import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { FaBook, FaUsers, FaClock, FaPalette, FaQuestionCircle, FaGlobeAmericas, FaCompass, FaCommentDots, FaClipboardList, FaSmile, FaLanguage, FaBalanceScale, FaCommentAlt, FaHeadphones } from 'react-icons/fa';
import './StudentBag.css';

const StudentBag = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSection, setSelectedSection] = useState('');
  const [showEffectiveDialogueSkillsModal, setShowEffectiveDialogueSkillsModal] = useState(false);
  const [selectedDialogueSkill, setSelectedDialogueSkill] = useState(null);

  const sections = [
    {
      title: 'بنك الأسئلة',
      icon: <FaQuestionCircle />,
      description: 'مجموعة متنوعة من الأسئلة لإدارة نقاشات نادي القراءة',
      content: `
        <div class="question-bank-content">
          <div class="full-text-section">
            <p>يجتمع أعضاء نادي القراءة وفق جدول منظم ويحدد مدير للاجتماع يطرح الأسئلة ويدير الحوار بين المشاركين. تختلف الأسئلة باختلاف نوع الكتاب إذا كان كتابًا روائيًا أو غير روائي وهنا مجموعة من الأسئلة لمساعدة مدير الاجتماع على إدارة النقاش:</p>
            
            <div class="main-points">
              <h4>هنالك خمسة محاور رئيسية يمكن أن يتم التركيز عليها عند نقاش أي كتاب:</h4>
              <ul>
                <li>• ما رأي الأعضاء بفكرة الكتاب وأسلوبه بشكل عام؟</li>
                <li>• كيف أثر الكتاب في زيادة وعي القارئ؟</li>
                <li>• هل تذكر القارئ مواقف معينة حدثت له أثناء قراءة الكتاب؟</li>
                <li>• هل يمكن تطبيق الأفكار التي تم ذكرها في الكتاب في حياة القراء؟ وكيف؟</li>
                <li>• ما الأفكار التي تتفق معها والأفكار التي تختلف معها في الكتاب؟</li>
              </ul>
            </div>

            <div class="novel-discussion">
              <h4>في حال نقاش قصة أو رواية هناك ثلاثة محاور رئيسية تدور حولها النقاشات:</h4>
              
              <div class="discussion-section">
                <h5>1- الشخصيات المذكورة في الكتاب:</h5>
                <ul>
                  <li>• ما رأي الأعضاء في الشخصية المذكورة في الكتاب هل أعجبتهم أم لم تعجبهم؟ ولماذا؟</li>
                  <li>• بِمَ تتصف هذه الشخصيات؟ وما هي المواقف التي أشارت إلى صفاتها؟</li>
                  <li>• لمَ أقدمت هذه الشخصية على فعل شيء معين؟ وما هو السبب؟ وكيف يتم تقييم فعل تلك الشخصية؟</li>
                  <li>• ما هو تعليقك على الشخصية في حال كنت صديقاً لها؟ وهل تذكرك بشخص تعرفه؟</li>
                  <li>• هل حدث أن عشت نفس الموقف وأحسست بنفس شعور الشخصية؟</li>
                  <li>• اختر إحدى الشخصيات المذكورة في القصة، وفي حال صادفت هذه الشخصية ماذا ستقول لها؟</li>
                </ul>
              </div>

              <div class="discussion-section">
                <h5>2- أحداث الكتاب وأساسيات الكتابة:</h5>
                <ul>
                  <li>• رأيهم عن أهم فقرة في الكتاب، ماذا حصل فيها؟ ولماذا؟</li>
                  <li>• ما هو شعورهم عندما قرؤوا تفاصيل هذه الحادثة؟ هل سبق لأحد الحاضرين أن حصل معه مثلها؟ وما هي ردة فعله على ذلك؟</li>
                  <li>• اختاروا إحدى الشخصيات المذكورة في الكتاب، ما هو الشيء الذي تريدون تغييره من أحداث القصة؟</li>
                </ul>
              </div>

              <div class="discussion-section">
                <h5>3- بعض الأسئلة التي يمكن طرحها فيما يتعلق بنهاية القصة:</h5>
                <ul>
                  <li>• هل أعجب الأعضاء بالنهاية أو لم تعجبهم، ولماذا؟ وما هو البديل في حال لم تعجبهم؟ وهل كانت مفاجأة لهم؟</li>
                  <li>• من هو أكثر المستفيدين من تلك الشخصيات من الأحداث؟ وهل أثرت على إحدى الشخصيات الأخرى؟</li>
                  <li>• هل كانت القصة محفزة للقارئ؟ وما هو مغزى هذه القصة؟</li>
                </ul>
              </div>
            </div>

            <div class="fun-questions">
              <h4>سين جيم: لزيادة جو من الحماسة في الاجتماع يتم تحضير عدد من الأسئلة المتنوعة وغير متوقعة ويكون جواب السؤال مختصراً مثلا:</h4>
              <ul>
                <li>• في أي مدينة وقعت الأحداث؟</li>
                <li>• من الشخصية التي قامت بعمل معين؟</li>
                <li>• متى ولد الكاتب؟</li>
                <li>• في أي صفحة ذكر حدث معين؟</li>
                <li>• صف لباس شخصية معينة في حدث معين تم ذكره في القصة.</li>
              </ul>
            </div>
          </div>
        </div>
      `
    },
    {
      title: 'إدارة الوقت',
      icon: <FaClock />,
      description: 'استراتيجيات فعالة لإدارة وقت اجتماعات نادي القراءة',
      content: `
        <div class="time-management-content">
          <div class="full-text-section">
            <p>أثناء الاجتماع، على الحضور الالتزام بقواعد التوقيت والمشاركة بالتساوي بالتعبير عن رأيهم وترك فرصة لزملائهم للمشاركة بدون مقاطعة. يمكن أن يعين أحد الأعضاء لمراقبة الوقت وتنبيه زملاءه في حال الإطالة في موضوع معين. ويحرص مدير الحوار على تغطية جميع محاور النقاش أثناء الاجتماع بتخصيص وقت مناسب لكل محور بحسب أهميته.</p>
            
            <div class="time-management-details">
              <div class="detail-section">
                <h4>مبادئ أساسية لإدارة الوقت</h4>
                <ul>
                  <li>
                    <span class="icon">⏰</span>
                    الالتزام بقواعد التوقيت
                  </li>
                  <li>
                    <span class="icon">🤝</span>
                    المشاركة المتساوية في التعبير عن الرأي
                  </li>
                  <li>
                    <span class="icon">🤫</span>
                    احترام الآخرين وعدم المقاطعة
                  </li>
                </ul>
              </div>

              <div class="detail-section">
                <h4>دور مراقب الوقت</h4>
                <ul>
                  <li>
                    <span class="icon">👀</span>
                    تعيين عضو لمراقبة الوقت
                  </li>
                  <li>
                    <span class="icon">⏱️</span>
                    تنبيه الأعضاء عند الإطالة في موضوع معين
                  </li>
                  <li>
                    <span class="icon">📊</span>
                    ضمان توزيع عادل للوقت
                  </li>
                </ul>
              </div>

              <div class="detail-section">
                <h4>مسؤولية مدير الحوار</h4>
                <ul>
                  <li>
                    <span class="icon">🗂️</span>
                    تغطية جميع محاور النقاش
                  </li>
                  <li>
                    <span class="icon">⏳</span>
                    تخصيص وقت مناسب لكل محور
                  </li>
                  <li>
                    <span class="icon">🎯</span>
                    مراعاة أهمية كل محور
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      `
    },
    {
      title: 'الأنشطة',
      icon: <FaUsers />,
      description: 'أنشطة تفاعلية وممتعة لإثراء تجربة نادي القراءة',
      content: `
        <div class="activities-content">
          <div class="full-text-section">
            <p>تضيف الأنشطة المصاحبة لنادي القراءة جوًا من الألفة والتسلية وتعلم مهارات جديدة. تعد فقرة النشاطات فقرة اختيارية ولكنها تزيد من متعة الاجتماع. يتطوع أحد الأعضاء لإدارة فقرة النشاط بعد مناقشة الكتاب. يكون النشاط على شكل لعبة أو عمل فني يشترك فيه الحضور. ويكون متعلقاً بموضوع الكتاب أو القراءة بشكل عام.</p>
            
            <div class="activities-intro">
              <h4>ومن الأنشطة المقترحة:</h4>
            </div>

            <div class="activities-grid">
              <div class="activity-card">
                <h5>1. نشاط رسم المخيلة</h5>
                <p>قم بتوزيع أوراق على جميع الأعضاء، واطلب منهم رسم موقف من القصة كما يتخيلونه، عند الانتهاء من الرسم يقومون بوضع رسوماتهم في ظرف كبير، ثم يطلب من كل عضو سحب إحدى الرسومات ووصف اللوحة.</p>
              </div>

              <div class="activity-card">
                <h5>2. صنع محدد الصفحات</h5>
                <p>يطلب من كل عضو أن يقص مستطيلاً (بطول أربعة عشر سنتمتراً وعرض أربعة سنتمترات) من ورق مقوى وربطه بخيط من أحد طرفيه، وعلى كل عضو أن يبتكر تصميماً لهذا المحدد له علاقة بالقصة.</p>
              </div>

              <div class="activity-card">
                <h5>3. تصميم ساندة للكتب</h5>
                <p>بالإمكان الاستعانة بحجارة مناسبة الحجم ملساء يتم تلوينها وتزيينها لتستخدم ساندة للكتب في مكتبة المنزل.</p>
              </div>

              <div class="activity-card">
                <h5>4. دليل القرّاء</h5>
                <p>بالإمكان الاستعانة ببطاقات صغيرة تباع في المكتبات ووضعها في علبة خاصة من إعداد الأعضاء ذات شكل مناسب، يكتب على البطاقات اسم الكتاب والمؤلف والشخصيات المذكورة ونبذة عن الكتاب. تعتبر هذه البطاقات دليلاً شخصياً لكل عضو.</p>
              </div>

              <div class="activity-card">
                <h5>5. تصميم لافتة إعلانية</h5>
                <p>ينقسم الأعضاء إلى عدة فرق مكونة من ثلاثة أشخاص، ويقومون بتصميم لافتة لفيلم يحكي قصة الكتاب ثم تعرض لتبادل الآراء حولها.</p>
              </div>

              <div class="activity-card">
                <h5>6. تصميم لعبة عائلية للكتاب</h5>
                <p>تصميم لعبة عائلية ذات علاقة بالكتاب وذلك بقص نماذج من الكرتون المقوى تمثل الشخصيات الواردة في القصة.</p>
              </div>

              <div class="activity-card">
                <h5>7. تأليف قاموس شخصي</h5>
                <p>يغني القاموس اللغوي الأعضاء بحيث يحضر كل عضو دفتراً مقسمة صفحاته أبجدياً، ويدوّن كل منهم في دفتره الكلمات الجديدة التي تعلمها مع معناها.</p>
              </div>

              <div class="activity-card">
                <h5>8. كتاب مذكرات الاجتماعات</h5>
                <p>يستخدمه كل عضو لتدوين الأحداث (كطباعة صورة لغلاف الكتاب وإلصاقها في إحدى صفحات الدفتر، مع صور المشاركين في الاجتماع وأسمائهم وكتابة المواضيع التي تم نقاشها، وتاريخ الاجتماع).</p>
              </div>

              <div class="activity-card">
                <h5>9. كتاب المذكرات الشخصية</h5>
                <p>يضيف فيه كل عضو بعض المذكرات عن اللقاءات.</p>
              </div>

              <div class="activity-card">
                <h5>10. كتابة رسالة جماعية لمؤلف الكتاب</h5>
                <p>تتضمن آراءهم حول الكتاب وستصله عبر مؤسسة الطباعة والنشر المذكورة في الكتاب.</p>
              </div>

              <div class="activity-card">
                <h5>11. استضافة مؤلف الكتاب</h5>
                <p>للحديث عن تجربته وتوقيع كتابه.</p>
              </div>
            </div>
          </div>
        </div>
      `
    },
    {
      title: "مهارات الحوار الفعال",
      icon: <FaCommentAlt />,
      description: "تعلم مهارات التواصل الفعال في نادي القراءة",
      modalContent: () => (
        <div className="dialogue-skills-section">
          <p className="section-intro">
            مهارات الحوار الفعال هي أساس النجاح في نادي القراءة. 
            إنها تساعدك على التواصل بشكل أفضل، وفهم وجهات النظر المختلفة، 
            وبناء علاقات إيجابية مع الأعضاء الآخرين.
          </p>
          <Button 
            variant="primary" 
            onClick={() => setShowEffectiveDialogueSkillsModal(true)}
            className="dialogue-skills-button"
          >
            <FaCommentAlt /> استكشف مهارات الحوار
          </Button>
        </div>
      )
    }
  ];

  const dialogueSkills = [
    {
      title: "الانفتاح وتقبل وجهات النظر المختلفة",
      fullText: `من أهم المهارات التي ستتمى لديكم من خلال نادي القراءة، مهارات الحوار الفعال. على الأعضاء التحلي بالصفات الآتية:الانفتاح وتقبل وجهات النظر المختلفة: إن الهدف من نادي القراءة هو توسيع المدارك وتنمية الثقافة. ومن الطبيعي أن تتكون قناعات مختلفة عن الكتاب لدى المشاركين في الحوار كل بحسب خبراته وخلفيته الثقافية والاجتماعية. ومن المهم الانفتاح على هذه الآراء بذلك تتكون لدى العضو سعة أفق للاستفادة من تجارب الآخرين وتقبل وجهات نظرهم.`,
      description: "الانفتاح على آراء الآخرين وتوسيع المدارك",
      icon: <FaGlobeAmericas />
    },
    {
      title: "التركيز على محور الحوار",
      fullText: `التركيز على محور الحوار: بتجنب الأحاديث الخارجة عن موضوع الكتاب كالموضوعات الشخصية، والتي تؤدي إلى تشتيت الأعضاء وعدم تحقيق الاستفادة المرجوة.`,
      description: "البقاء مركزًا على موضوع النقاش الرئيسي",
      icon: <FaCompass />
    },
    {
      title: "آداب الحديث",
      fullText: `آداب الحديث: من أساسيات الحوار الفعال المشاركة الإيجابية بانتقاء الكلمات البناءة والتي تنشر جو من السلام والاحترام في الاجتماع وتعزز ثقة المشاركين بأنفسهم وغيرهم.`,
      description: "اختيار الكلمات البناءة والمحترمة",
      icon: <FaCommentDots />
    },
    {
      title: "حسن الاستماع والإنصات",
      fullText: `حسن الاستماع والانصات للمتحدث: وكما أن للحديث آداب، للاستماع أيضاً آداب بالإنصات للمشاركين وعدم الإلتهاء بأمور أخرى أو المقاطعة مما يؤدي إلى تشتيت الأفكار وإثارة للشحناء.`,
      description: "الإنصات الكامل للمتحدثين دون مقاطعة",
      icon: <FaHeadphones />
    },
    {
      title: "إعطاء فرص متساوية للمشاركة",
      fullText: `إعطاء فرص متساوية للحضور للمشاركة في الحوار وتشجيع زملائك الآخرين على إبداء آرائهم لإثراء النقاش: تختلف شخصيات المشاركين فمنهم من يميل للمشاركة في النقاش وإبداء رأيه بأريحية ومنهم من يميل إلى الاستماع أكثر من النقاش. إن دورك تشجيع الجميع للمشاركة لتنمية مهاراتهم. فينمي العضو المتحدث مهارات الاستماع وينمي العضو المستمع مهارات التعبير بأريحية.`,
      description: "تشجيع جميع الأعضاء على المشاركة",
      icon: <FaUsers />
    },
    {
      title: "تجهيز النقاط قبل الحوار",
      fullText: `تجهيز النقاط قبل الحوار، وتدوينها لتذكرها: في جو الاجتماع، تتنوع النقاط المعروضة ووجهات النظر مما قد يؤدي لنسيان نقاط مهمة كنت قد فكرت بها. لذلك من الجيد تدوين النقاط التي تود مناقشتها قبل الاجتماع واحضارها معك لتتأكد من أن لديك ما تضيفه لزملائك ومما يزيد من قوة استيعابك للمادة عند مشاركتها مع غيرك.`,
      description: "تدوين النقاط المهمة قبل الاجتماع",
      icon: <FaClipboardList />
    },
    {
      title: "الثقة بالنفس",
      fullText: `الثقة بالنفس: أنت الآن في مرحلة تنمية لنفسك وتطوير لمهاراتك في بيئة يتشارك فيها الجميع الهدف ذاته. فلا يوجد ما تخاف منه. إن ثقة بنفسك يؤثر مباشرة على ثقة الآخرين بك، فكلما زادت ثقتك بنفسك، زادت مصداقيتك وثقة الآخرين بك. وعليك التمييز بين الثقة والغرور فلا تزيد لدرجة التعالي على زملائك. لأن من علامات الثقة بالنفس اكساب الآخرين أيضاً ثقة بأنفسهم.`,
      description: "تطوير الثقة بالنفس دون غرور",
      icon: <FaSmile />
    },
    {
      title: "لغة الجسد ونبرة الصوت",
      fullText: `لغة الجسد ونبرة الصوت: تساهم التعبيرات الشفهية وهي الكلمات بنسبة 7% فقط من فعالية التواصل أما الباقي فيعتمد على التعبيرات غير اللفظية وهي نبرة الصوت والتي تساهم بنسبة 38% ولغة الجسد والتي تساهم بنسبة 55% في فعالية التواصل. ولغة الجسد تشمل إيماءات وتعبيرات الوجه وحركات الجسد كاليدين والرجلين وطريقة الجلوس. والتي تعطي انطباعاً على مقدار الانفتاح والصدق والثقة والاهتمام. ومن المهم أن يكون العضو واعياً للغة جسده وأن يتحدث بنبرة صوت مناسبة لتعكس انطباعاً جيداً عنه.`,
      description: "أهمية لغة الجسد والتواصل غير اللفظي",
      icon: <FaLanguage />
    },
    {
      title: "صح وخطأ في النقاش",
      fullText: `صح وخطأ في النقاش: في النقاش تخلى عن فكرة الإجابات الصحيحة والإجابات الخاطئة واستبدلها بفكرة وجهات نظر مختلفة. إن تعدد وجهات النظر يزيد من متعة الحوار ويثري الجلسات النقاشية. في حال اختلاف وجهة نظرك مع أحد زملائك يمكنك التعبير عن ذلك بإضافة رأيك دون نفي رأي زميلك. 

لا تقل: "لا أوافق على هذا الكلام"
وقل: "هذا رأي جديد، يختلف عن رأيي"

لا تقل: "هذا الكلام خاطئ"
قل: "لدي وجهة نظر مختلفة أود مشاركتكم إياها "`,
      description: "التركيز على التنوع في وجهات النظر",
      icon: <FaBalanceScale />
    }
  ];

  const handleSectionClick = (section) => {
    setSelectedSection(section);
    
    // Special handling for Effective Dialogue Skills
    if (section.title === "مهارات الحوار الفعال") {
      setShowEffectiveDialogueSkillsModal(true);
      return;
    }
    
    setShowModal(true);
  };

  const DetailedSkillModal = () => {
    return (
      <Modal 
        show={!!selectedDialogueSkill} 
        onHide={() => setSelectedDialogueSkill(null)} 
        size="lg" 
        centered 
        className="detailed-dialogue-skill-modal"
      >
        {selectedDialogueSkill && (
          <>
            <Modal.Header >
              <Modal.Title>
                {selectedDialogueSkill.icon}
                {selectedDialogueSkill.title}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="detailed-skill-content">
                <p>{selectedDialogueSkill.fullText}</p>
              </div>
            </Modal.Body>
          </>
        )}
      </Modal>
    );
  };

  const EffectiveDialogueSkillsModal = () => {
    return (
      <Modal 
        show={showEffectiveDialogueSkillsModal} 
        onHide={() => setShowEffectiveDialogueSkillsModal(false)} 
        size="xl" 
        centered 
        className="dialogue-skills-modal"
      >
        <Modal.Header >
          <Modal.Title>
            <FaCommentAlt /> مهارات الحوار الفعال 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="dialogue-skills-content">
            <p className="intro-text">
              تعد مهارات الحوار الفعال من أهم المهارات التي ستتطور لديكم من خلال نادي القراءة. 
              إليك التوجيهات الأساسية لمشاركة فعالة وبناءة.
            </p>
            <div className="skills-grid">
              {dialogueSkills.map((skill, index) => (
                <div key={index} className="skill-card">
                  <div className="skill-icon">{skill.icon}</div>
                  <h5>{skill.title}</h5>
                  <p>{skill.description}</p>
                  <Button 
                    variant="primary" 
                    onClick={() => {
                      setSelectedDialogueSkill(skill);
                      setShowEffectiveDialogueSkillsModal(false);
                    }}
                  >
                    اعرف المزيد
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <Container fluid className="student-bag-container">
      <Row className="text-center mb-4">
        <Col>
          <h1 className="page-title">برنامج أندية القراءة المدرسية</h1>
          <h2 className="page-subtitle">حقيبة القارئ</h2>
        </Col>
      </Row>

      <Row className="welcome-section text-center mb-4">
        <Col>
          <Card className="welcome-card">
            <Card.Body>
              <Card.Text>
                أهلاً بك عضوًا عزيزًا في نادي القراءة، سنخوض سويًا نقاشات عميقة ونتعرف على أفكار ومعلومات تثرينا وتزيدنا وعيًا ومعرفة.
                ولتكون رحلة القراءة أكثر نفعًا ومرحًا ستجد هنا كل ما تحتاج لمعرفته عن الإعداد للاجتماعات والمشاركة في النقاشات.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {sections.map((section, index) => (
          <Col key={index} md={6} lg={3} className="mb-4">
            <Card 
              className="section-card" 
              onClick={() => handleSectionClick(section)}
            >
              <Card.Body className="text-center">
                <div className="section-icon">{section.icon}</div>
                <Card.Title>{section.title}</Card.Title>
                <Card.Text>{section.description}</Card.Text>
                <Button variant="primary">اعرف المزيد</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal 
        show={showModal} 
        onHide={() => setShowModal(false)} 
        size="lg" 
        centered
        className="student-bag-modal"
      >
        <Modal.Header className="modal-header-custom">
          <div className="modal-header-content">
            <Modal.Title>{selectedSection.title}</Modal.Title>
            <button 
              type="button" 
              className="btn-close" 
              aria-label="Close" 
              onClick={() => setShowModal(false)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </Modal.Header>
        <Modal.Body 
          dangerouslySetInnerHTML={{ 
            __html: selectedSection.content || '' 
          }} 
        />
      </Modal>

      

      <EffectiveDialogueSkillsModal />
      <DetailedSkillModal />
    </Container>
  );
};

export default StudentBag;
