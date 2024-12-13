import React from 'react';
import { motion } from 'framer-motion';

const TeacherGuide = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center py-12 px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            برنامج أندية القراءة المدرسية
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mt-4">
            دليل المشرفين التربويين
          </h2>
        </div>

        {/* Content Sections */}
        <div className="p-8 space-y-8">
          {/* Introduction Section */}
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="bg-blue-50 rounded-xl p-6 border-r-4 border-blue-500"
          >
            <h3 className="text-2xl font-bold text-blue-800 mb-4">المقدمة</h3>
            <p className="text-gray-700 leading-relaxed text-justify">
              برنامج أندية القراءة المدرسية هو برنامج وطني ثقافي يطمح إلى خلق جيل واعي وقارئ عن طريق إنشاء أندية قرائية في المدارس لمختلف المراحل التعليمية حيث يكتسب الطلاب مهارات التعلم الذاتي، وحب القراءة والمشاركة بآرائهم مع أقرانهم، مما يعزز فهم الطالب لما يقرأ، ويرفع من قدرته على التعبير عن نفسه، ويزرع لديه شغف العلم والمشاركة الفاعلة في العملية المعرفية.
            </p>
          </motion.section>

          {/* Program Focus Areas */}
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="bg-green-50 rounded-xl p-6 border-r-4 border-green-500"
          >
            <h3 className="text-2xl font-bold text-green-800 mb-4">يهتم البرنامج بتنمية مهارات الطلاب من حيث:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>اكتساب ثقافة وتوسيع مدارك</li>
              <li>تطوير للتفكير النقدي</li>
              <li>تطوير للمهارات لغوية</li>
              <li>تطوير مهارات الحوار الفعال</li>
              <li>بناء صداقات هادفة</li>
              <li>مشاركة اهتمامات بناءة</li>
              <li>تطوير مهارات شخصية كإدارة الوقت والاجتماعات والعمل الجماعي</li>
            </ul>
          </motion.section>

          {/* Long-term Goals */}
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="bg-purple-50 rounded-xl p-6 border-r-4 border-purple-500"
          >
            <h3 className="text-2xl font-bold text-purple-800 mb-4">أهداف البرنامج بعيدة المدى:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>خلق جيل قارئ</li>
              <li>تطوير حركة النقد في دولة الإمارات العربية المتحدة</li>
              <li>رفع الوعي بأهمية المشاركة في الفعاليات الثقافية</li>
              <li>رفع وعي المجتمع بأهمية المشاركة في الفعاليات</li>
              <li>تطوير الناتج الأدبي المحلي</li>
            </ul>
          </motion.section>

          {/* Reading Club System */}
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="bg-orange-50 rounded-xl p-6 border-r-4 border-orange-500"
          >
            <h3 className="text-2xl font-bold text-orange-800 mb-4">نظام أندية القراءة المدرسية</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>تقام اجتماعات نادي القراءة شهريًا لتجمع الطلاب الملتحقين بالنادي لمناقشة كتب يختارها الطلاب لقراءتها ونقاشها.</li>
              <li>يتولى أحد الطلبة إدارة جلسة المناقشة مما يعزز حس المسؤولية وروح القيادة.</li>
              <li>يشرف أمين المكتبة على لقاءات الطلبة ويوجه لهم الإرشاد والدعم.</li>
              <li>يشجع النادي القراءة للمتعة، ويعزز النقاش، ويبني مجتمعًا طلابيًا قارئًا.</li>
            </ul>
          </motion.section>

          {/* Remaining Sections */}
          {[
            {
              title: 'الانضمام للنادي',
              content: [
                'الانضمام للنادي ينبع من رغبة شخصية لدى الطلاب وتحفيز من أولياء الأمور ودعم من المشرفين التربويين.',
                'يفتح باب التسجيل للانضمام لنادي القراءة.',
                'يتم اختيار الطلبة كأعضاء في النادي للمشاركة الفاعلة في كافة اجتماعاته على مدار العام الدراسي والتي تتضمن حلقات النقاش الشهرية والأنشطة المصاحبة لها والرحلات المدرسية، ولقاءات أولياء الأمور.'
              ],
              bgColor: 'bg-teal-50',
              borderColor: 'border-teal-500'
            },
            {
              title: 'الكتب التي سيقرؤها الطلاب',
              content: [
                'كتب نادي القراءة هي كتب للمطالعة الحرة خارج المنهج التعليمي.',
                'ستطرح قوائم بالكتب من مختلف ميادين الثقافة والأدب لتعريف الطلاب على عدة أنواع من الكتب.',
                'تتضمن القوائم كتبًا ملائمة لكل مرحلة عمرية.',
                'يختار الطلاب الكتب الشهرية التي سيناقشونها مع أقرانهم عن طريق القرعة أو التصويت.'
              ],
              bgColor: 'bg-indigo-50',
              borderColor: 'border-indigo-500'
            },
            {
              title: 'مراحل برنامج أندية القراءة المدرسية',
              content: [
                'الإعلان عن البرنامج وفتح باب التسجيل فيه للطلاب.',
                'دعوة أولياء الأمور لحضور الجلسة التوعية بأندية القراءة.',
                'دعوة الطلاب لحضور الندوة التعريفية بأندية القراءة.',
                'استقبال طلبات التسجيل من الطلاب واختيار المشاركين في البرنامج.',
                'عقد اجتماع افتتاح نادي القراءة والتعريف بأنواع الكتب والقوائم المتاحة.',
                'تحديد موعد للاجتماع الأول واختيار كتاب لمناقشته.',
                'استلام الطلاب للكتاب.',
                'عقد الاجتماع الأول.',
                'في كل اجتماع يتم تحديد الكتاب الذي سيناقش في الجلسة التالية.'
              ],
              bgColor: 'bg-red-50',
              borderColor: 'border-red-500'
            },
            {
              title: 'دور أمناء المكتبات في البرنامج',
              content: [
                'أندية القراءة تخلق فرصة للأبناء للتعرف على ميولهم وعلى ما يجري في العالم من حولهم ويريهم عوالم لا تتاح لهم زيارتها إلّا عن طريق الكتب.',
                'دور أمناء المكتبات هو توفير الدعم اللازم للطلاب وتوجيهم لاختيار الكتب الملائمة لمستواهم وتوسيع دائرة معارفهم.',
                'تعريف الطلاب بالكتب الملائمة لميولهم ومستوياتهم القرائية ومساعدتهم في عملية اختيار الكتاب.',
                'تحفيز الطلاب أثناء المناقشة على المشاركة بآرائهم والاستماع إلى آراء زملائهم وتوسيع دائرة التفكير والتحليل.',
                'ربط مادة الكتاب بأمثلة من الحياة والمنهج الدراسي.',
                'توفير مواد قرائية إضافية للطلاب الراغبين بتوسيع قراءاتهم.',
                'تعريف الطلاب بكتب متنوعة المجالات والأساليب والثقافات.',
                'إعداد مكان الاجتماع وابتكار أنشطة مساندة للقراءة والمناقشة لإضفاء جو من العفوية والصداقة.',
                'تقديم التوجيه للطلاب في حال الحاجة ودعمهم لتحصيل أعلى فائدة ومتعة من المشاركة.'
              ],
              bgColor: 'bg-pink-50',
              borderColor: 'border-pink-500'
            },
            {
              title: 'تحديد مواعيد الاجتماعات',
              content: [
                'اختيار موعد دائم لعقد الاجتماعات (يوم ووقت محدد من كل شهر).',
                'الحرص على أن يكون الوقت كافيًا ليتمكن الطلاب من قراءة الكتاب قبل المناقشة.',
                'توفير بعض المرونة لمراعاة الفروقات في قدرات المشاركين.'
              ],
              bgColor: 'bg-yellow-50',
              borderColor: 'border-yellow-500'
            },
            {
              title: 'الإعداد للاجتماعات',
              content: [
                'يحدد مدير للجلسة من أحد الطلاب ليطرح أسئلة ويدير الحوار بين المشاركين.',
                'يدون الطلاب تقييمهم للكتاب قبل الاجتماع بملء بطاقة تقييم الكتاب.',
                'يقدم المشرف التربوي الدعم لمدير الجلسة قبل الاجتماع بمراجعة الأسئلة والمحاور التي أعدها لإدارة الاجتماع.',
                'ييسر المشرف التربوي الحوار أثناء الاجتماع بدعم مدير الجلسة وتشجيع الحضور على المشاركة الفاعلة.',
                'يمكن دعوة أولياء الأمور لبعض الجلسات كنشاط مصاحب ما بعد المناقشة.'
              ],
              bgColor: 'bg-emerald-50',
              borderColor: 'border-emerald-500'
            },
            {
              title: 'تحفيز نقاشات بناءة',
              content: [
                'مساعدة مدير الجلسة على إعداد أسئلة هادفة تشجع المشاركين على التفكير النقدي والحوار.',
                'خلق بيئة آمنة ترحب بالحضور وتحفزهم على إبداء آرائهم.',
                'احترام وجهات النظر أثناء النقاش.',
                'تشجيع الطلاب الذين يميلون إلى الاستماع للمشاركة في المناقشة وحث المتحدثين على الإصغاء لأقرانهم.'
              ],
              bgColor: 'bg-cyan-50',
              borderColor: 'border-cyan-500'
            }
          ].map((section, index) => (
            <motion.section 
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 + (index * 0.2), duration: 0.8 }}
              className={`${section.bgColor} rounded-xl p-6 border-r-4 ${section.borderColor}`}
            >
              <h3 className={`text-2xl font-bold text-${section.borderColor.replace('border-', '')}-800 mb-4`}>
                {section.title}
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {section.content.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherGuide;
