/**
 * ============================================================================
 * لِسَان | LISAN — موسوعة التشغيل والملكية والتسليم النهائي (app.js)
 * المستودع الثالث (خاص بالإدارة العليا فقط)
 * ============================================================================
 * - الدخول محصور بالبريد المالك الرسمي: asmaabdaoui709@gmail.com
 * - كلمة المرور التأسيسية الأولى: Lisan@2026#Owner (قابلة للتغيير والاستعادة عبر البريد)
 * - محرك بحث عربي ذكي يغطي كافة الصلاحيات والميزات والحلول وأصول المشروع
 * ============================================================================
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

/* ============================================================================
 * 1. إعدادات الربط والهوية المالكية
 * ============================================================================ */
const firebaseConfig = {
  apiKey: "AIzaSyAem1ULSfM9RdKXZPW36fZI8RoI-gvW-lo",
  authDomain: "lisan-b7f25.firebaseapp.com",
  projectId: "lisan-b7f25",
  storageBucket: "lisan-b7f25.firebasestorage.app",
  messagingSenderId: "1068695535462",
  appId: "1:1068695535462:web:aac5c38525898fa30812a7",
  measurementId: "G-4HVJE22SXL"
};

const OWNER_EMAIL = "asmaabdaoui709@gmail.com";
const INITIAL_BOOTSTRAP_PASS = "Lisan@2026#Owner";
const CHECKLIST_STORAGE_KEY = "lisan_handover_day1_checklist_v1";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/* ============================================================================
 * 2. قاعدة المعرفة الكاملة للمشروع (5 محاور شاملة)
 * ============================================================================ */
const DAY1_TASKS = [
  {
    id: "d1-change-manual-pass",
    title: "تغيير كلمة مرور هذا الدليل عبر البريد الرسمي",
    desc: "من قسم «السيادة والملكية التقنية» اضغط زر إرسال رابط تغيير كلمة المرور إلى البريد الموحد asmaabdaoui709@gmail.com لاستبدال كلمة المرور التأسيسية بكلمة سرية خاصة بكم."
  },
  {
    id: "d1-admin-pass",
    title: "الدخول لغرفة العمليات وتغيير كلمة مرور الأدمن الافتراضية",
    desc: "سجّل الدخول لأول مرة في غرفة العمليات (smallisan-admin) بـ Admin وكلمة المرور 123456، ثم ادخل فوراً إلى صندوق «حسابي والسجلات» لتغيير كلمة المرور وتعيين الرمز السريع (4 أرقام)."
  },
  {
    id: "d1-branding-support",
    title: "ضبط الهوية وقنوات التواصل مع الدعم الفني",
    desc: "من صندوق «الهوية والدعم والسيو» أضف رقم واتساب الإدارة، بريد الدعم، شعار المنصة الرسمي، اللون المعتمد، ورسالة الترحيب الآلي للزوار."
  },
  {
    id: "d1-pages",
    title: "مراجعة صياغة الصفحات التعريفية الثلاث",
    desc: "افتح صندوق «الصفحات التعريفية» وراجع نصوص (من نحن، الرسالة والمنهجية، الخصوصية وشروط الاستخدام) وعدّلها بما يناسب رؤيتكم الرسمية."
  },
  {
    id: "d1-first-item",
    title: "نشر أول مادة علمية حقيقية",
    desc: "فور نشر أول مادة أو مصطلح من صندوق «إدارة المحتوى»، تختفي المواد التجريبية تلقائياً وتبدأ المنصة بعرض محتواكم الرسمي."
  },
  {
    id: "d1-domain-auth",
    title: "عند شراء الدومين من Cloudflare: إضافته في Firebase",
    desc: "بعد ربط الدومين الرسمي في Cloudflare Pages، لا تنسَ إضافته في Firebase ← Authentication ← Settings ← Authorized domains حتى يعمل تسجيل الدخول بـ Google وروابط تفعيل البريد بدون أي خطأ."
  }
];

const PUBLIC_SECTIONS_GUIDE = [
  {
    title: "1. المكتبة اللسانية",
    branches: "ملخصات النظريات اللسانية • كتب ومراجع وروابط علمية • مقالات وأبحاث مختارة",
    how: "تعرض الكتب والملخصات مع غلاف وملخص وعدد المشاهدات، وتدعم قراءة ملفات PDF المضمنة من Google Drive ومشاهدة الفيديوهات."
  },
  {
    title: "2. المعجم اللساني",
    branches: "اللسانيات العامة • التطبيقية • التداولية • الحاسوبية",
    how: "مخصص للمصطلحات اللسانية؛ يعرض المصطلح بالعربية والمقابل الإنجليزي (يُكتب في خانة العنوان الفرعي) مع شرح مبسط ووسوم بحث."
  },
  {
    title: "3. اختبر معارفك",
    branches: "اختبارات في فروع اللسانيات • أسئلة اختيار من متعدد • تحديات أسبوعية",
    how: "محرك اختبارات تفاعلي يصحح الإجابة فورياً مع عرض الشرح العلمي، ويحفظ النتيجة آلياً في سجل درجات الطالب الموثق."
  },
  {
    title: "4. فضاء الباحث اللساني",
    branches: "إعداد مذكرة ماستر • منهجية تحليل المدونة • التوثيق العلمي • أدوات البحث",
    how: "مساحة إرشادية لطلبة الدراسات العليا تتضمن أدلة منهجية ونماذج تطبيقية وروابط أدوات بحثية."
  },
  {
    title: "5. محاضرات ودروس",
    branches: "علم الأصوات • الصرف والنحو • الدلالة والتداولية • تحليل الخطاب",
    how: "مزودة بمشغل يوتيوب ذكي يتوقف تلقائياً بمجرد تمرير القارئ للشاشة بعيداً عن الفيديو للحفاظ على التركيز."
  },
  {
    title: "6. فضاء التبادل العلمي",
    branches: "مشاريع الطلبة • الملتقيات • مسابقات علمية • تجارب البحث",
    how: "يستقبل مشاريع وتجارب الطلبة الموثقين ويحولها أولاً لصندوق «مساهمات الطلبة» في غرفة العمليات لتراجعها الإدارة قبل النشر."
  }
];

const PUBLIC_EXPERIENCE_GUIDE = [
  {
    title: "رحلة تسجيل وتوثيق الطالب (التحقق المزدوج)",
    body: "يسجل الطالب عبر البريد وكلمة المرور (فيصله رابط تفعيل حقيقي لبريده) أو بضغطة واحدة عبر Google (فيُعتمد بريده مؤكَّداً آلياً). لا يمكن تكرار نفس البريد لحسابين أبداً. بعد تأكيد البريد ينتقل الحساب لتبويب «بانتظار المراجعة» لدى الإدارة. صورة البطاقة الجامعية التي يرفعها الطالب سرية تماماً وتراها الإدارة فقط."
  },
  {
    title: "سجل الدرجات الخاص، نافذة التأكيد، والشارات",
    body: "تُحفظ درجات الاختبارات في ملف الطالب الخاص ولا يراها أي زائر افتراضياً. إذا أراد الطالب إظهارها للزوار في ملفه العام، تظهر له نافذة تأكيد صريحة («هل أنت متأكد من ذلك؟»). كما يمنح النظام شارات تحفيزية تلقائية: (طالب موثق، بريد جامعي، باحث مساهم، متفوق اللسانيات عند 3 اختبارات بدرجة 90% فأكثر)."
  },
  {
    title: "دردشة الدعم الفني للزوار وفاقدي الحسابات",
    body: "الزر العائم «الدعم الفني» متاح للجميع حتى بدون تسجيل دخول حتى يتمكن من فقد حسابه من التواصل. يرحب به النظام الآلي ويعرض أبرز المشكلات، وعند الإرسال يولّد النظام معرّف تذكرة موحّداً غير قابل للتكرار مثل (LISAN-48291735) ليستخدمه الزائر في متابعة رد الكادر البشري في أي وقت."
  },
  {
    title: "تجربة القراءة الذكية والأمان",
    body: "تتضمن صفحة القراءة: وضع الورق الدافئ (Sepia) المريح للعين، أزرار تكبير وتصغير الخط، تكبير الصور المدمجة (Lightbox)، قارئ PDF مدمج، وتحذير أمان تلقائي قبل فتح أي رابط خارجي يغادر المنصة."
  }
];

const ADMIN_BOXES_GUIDE = [
  {
    title: "1. شؤون الطلبة والعضويات",
    purpose: "مراجعة طلبات الحسابات بعد تأكيد البريد، معاينة البطاقة الجامعية السرية (مع زر حذفها بعد التحقق حفظاً للخصوصية)، وتطبيق التدرج العادل في التعامل مع الحسابات مع إرسال إشعارات فورية للطلبة."
  },
  {
    title: "2. الدعم الفني والتذاكر",
    purpose: "استقبال جميع تذاكر الدعم المفتوحة، البحث الفوري برقم التذكرة الموحّد (LISAN-...) أو اسم المستفيد، الرد الحي داخل المحادثة، إشعار الطالب تلقائياً بالرد، وإغلاق أو إعادة فتح التذكرة."
  },
  {
    title: "3. إدارة المحتوى والمواد",
    purpose: "إضافة وتعديل وحذف المواد العلمية عبر المحرر الأكاديمي الحر (يدعم رفع/لصق/سحب الصور في أي سطر والتحكم بحجمها وشرحها، المعاينة الحية قبل النشر، الحفظ التلقائي للمسودات، وروابط يوتيوب وPDF)."
  },
  {
    title: "4. بنك الاختبارات",
    purpose: "إنشاء اختبارات اختيار من متعدد، تحديد مستوى الصعوبة، وكتابة التفسير اللساني الذي يظهر للطالب فور إجابته."
  },
  {
    title: "5. مساهمات الطلبة",
    purpose: "صندوق انتظار لكل مشروع أو تجربة أرسلها طالب؛ يمكنك تعديلها قبل النشر ثم اعتمادها بضغطة زر فيصل للطالب إشعار تهنئة فوري، أو رفضها مع رسالة ملاحظة لطيفة."
  },
  {
    title: "6. الصفحات التعريفية",
    purpose: "تعديل نصوص وعناوين الصفحات الثابتة (من نحن، الرسالة والمنهجية، الخصوصية والشروط)، إخفاؤها أو إظهارها، أو إنشاء صفحات إضافية جديدة مثل «الأسئلة الشائعة»."
  },
  {
    title: "7. الأقسام والفروع",
    purpose: "تغيير اسم أي قسم من الأقسام الستة أو وصفه أو لونه المميز، وإضافة أو تعديل أو حذف الفروع الداخلية (كل فرع في سطر)."
  },
  {
    title: "8. مفاتيح الميزات (تحكم ثلاثي)",
    purpose: "تحويل أي ميزة أو قسم في الموقع العام بضغطة زر بين 3 حالات: (مفعّل) أو (قريباً) أو (مخفي تماماً)."
  },
  {
    title: "9. الهوية والدعم والسيو",
    purpose: "تغيير الشعار واللون (ينعكسان فوراً في الموقع العام وغرفة العمليات معاً)، ضبط سياسة البطاقة الجامعية، إضافة أرقام تواصل الدعم، وتوليد ملف خريطة الموقع sitemap.xml لمحركات البحث."
  },
  {
    title: "10. فريق الإدارة والدعم",
    purpose: "إنشاء حسابات للمشرفين وموظفي الدعم بصورهم ونبذهم التعريفية، ومنح كل شخص الصلاحيات التي يحتاجها فقط، مع بحث ذكي يلتقط أي كلمة داخل نبذة الموظف."
  },
  {
    title: "11. حسابي والسجلات",
    purpose: "تعديل صورتك الشخصية ونبذتك، ضبط الرمز السريع (4 أرقام) والثقة بالمتصفح، تغيير كلمة المرور، ومراجعة سجل النشاطات الذي يوثق كل عملية تمت ومن نفذها."
  }
];

const PERMISSIONS_GUIDE = [
  {
    key: "manage_content",
    name: "إضافة وتعديل المحتوى",
    canDo: "ينشر مواد جديدة (كتب، مصطلحات، محاضرات، أبحاث)، يرفع الصور ويعدل النصوص وحالة النشر (منشور/مسودة).",
    cannotDo: "لا يستطيع حذف المواد نهائياً إلا إذا مُنح صلاحية الحذف، ولا يصل لإعدادات الموقع أو الفريق.",
    recommendedFor: "محررو المحتوى والمشرفون العلميون."
  },
  {
    key: "delete_content",
    name: "حذف المواد والمحتوى نهائياً",
    canDo: "يظهر له زر «حذف» الأحمر بجانب كل مادة لإزالتها بشكل دائم من قاعدة البيانات.",
    cannotDo: "صلاحية حساسة؛ لا تمنح تعديلاً بذاتها بل تُضاف مع صلاحية إدارة المحتوى عند الحاجة.",
    recommendedFor: "رئيس التحرير والإدارة العليا فقط."
  },
  {
    key: "approve_submissions",
    name: "مراجعة واعتماد مساهمات الطلبة",
    canDo: "يفتح صندوق مساهمات الطلبة، يقرأ المشاريع المرسلة، يعدّلها، يعتمد نشرها أو يرفضها مع إرسال إشعار للطالب.",
    cannotDo: "لا يصل لبيانات توثيق الحسابات أو البطاقات الجامعية السرية.",
    recommendedFor: "لجنة مراجعة الأبحاث ومشرف فضاء التبادل."
  },
  {
    key: "manage_quizzes",
    name: "إدارة بنك الاختبارات والأسئلة",
    canDo: "ينشئ اختبارات جديدة، يضيف ويحذف الأسئلة والخيارات والشروحات العلمية، ويحذف الاختبارات.",
    cannotDo: "لا يستطيع تعديل المقالات أو درجات الطلبة المسجلة.",
    recommendedFor: "الأساتذة ومعدّو الاختبارات اللسانية."
  },
  {
    key: "manage_students",
    name: "إدارة شؤون الطلبة وتوثيق العضويات",
    canDo: "يطلع على طلبات التسجيل، يرى صورة البطاقة الجامعية السرية ويحذفها بعد التوثيق، يعتمد الحسابات، يرسل تحذيرات، ويقيّد أو يعلّق الحسابات ويطلع على درجات الطالب.",
    cannotDo: "لا يصل لتذاكر الدعم إلا إذا مُنح صلاحية الدعم، ولا يتحكم في الموظفين الآخرين.",
    recommendedFor: "مسؤول شؤون الطلبة والتوثيق (شخص موثوق لخصوصية البطاقات)."
  },
  {
    key: "manage_support",
    name: "موظف دعم فني (إدارة التذاكر)",
    canDo: "يفتح صندوق «الدعم الفني والتذاكر»، يبحث برقم التذكرة LISAN-، يرد على الزوار وفاقدي الحسابات، ويغلق أو يعيد فتح التذاكر.",
    cannotDo: "لا يستطيع العبث بالمحتوى أو الأقسام أو إعدادات المنصة أو حذف حسابات. إذا أردت له معالجة حسابات مقيدة أضف معه «شؤون الطلبة».",
    recommendedFor: "موظف خدمة العملاء والدعم الفني."
  },
  {
    key: "manage_pages",
    name: "إدارة الصفحات التعريفية",
    canDo: "يعدّل نصوص صفحات (من نحن، المنهجية، الخصوصية)، يخفيها أو يظهرها، وينشئ صفحات تعريفية جديدة.",
    cannotDo: "لا يتحكم في الأقسام الستة أو الألوان والشعار.",
    recommendedFor: "الإدارة العليا ومسؤول الصياغة القانونية والتعريفية."
  },
  {
    key: "manage_sections",
    name: "تعديل الأقسام الستة وفروعها",
    canDo: "يغيّر مسميات الأقسام الستة وأوصافها وألوانها ويضيف أو يحذف الفروع الداخلية.",
    cannotDo: "لا يستطيع إخفاء القسم بالكامل (هذا ضمن مفاتيح الميزات).",
    recommendedFor: "الإدارة العليا ومنسق البنية الأكاديمية."
  },
  {
    key: "manage_features",
    name: "التحكم الثلاثي بالميزات (Feature Flags)",
    canDo: "يُفعّل أو يُخفي أو يضع (قريباً) لأي قسم أو ميزة في المنصة مثل الحسابات وكشف الدرجات والدعم والبحث.",
    cannotDo: "صلاحية عالية التأثير على واجهة الموقع العام.",
    recommendedFor: "الإدارة العليا فقط."
  },
  {
    key: "manage_settings",
    name: "هوية المنصة وبيانات الدعم والسيو",
    canDo: "يغيّر اسم المنصة وشعارها ولونها وشريط الإعلان، يضبط سياسة البطاقة الجامعية وأرقام واتساب الدعم، ويولّد خريطة sitemap.xml.",
    cannotDo: "لا يضيف موظفين جدد ولا يغيّر صلاحياتهم.",
    recommendedFor: "الإدارة العليا فقط."
  },
  {
    key: "manage_admins",
    name: "إدارة فريق المشرفين والصلاحيات",
    canDo: "يضيف موظفين جدد، يعدّل صلاحياتهم، يوقف حساب موظف مؤقتاً، أو يحذف حسابات المشرفين الفرعيين.",
    cannotDo: "لا يستطيع حذف أو إيقاف حساب «الأدمن الرئيسي».",
    recommendedFor: "المدير العام (الإدارة العليا فقط)."
  },
  {
    key: "view_logs",
    name: "الاطلاع على سجل النشاطات",
    canDo: "يشاهد ويبحث في سجل العمليات الأخيرة (من نشر، من عدّل، من وثّق طالباً، من ردّ على تذكرة).",
    cannotDo: "السجل للقراءة فقط؛ محمي في قواعد البيانات ولا يمكن لأي شخص حذفه أو تعديله.",
    recommendedFor: "الإدارة العليا ومراقب الجودة."
  }
];

const FEATURES_TRI_GUIDE = [
  {
    name: "نظام حسابات وعضويات الطلبة",
    benefit: "يحوّل الزوار إلى أعضاء موثقين بملف أكاديمي وسجل درجات.",
    whenOn: "في الوضع الطبيعي للمجتمع الأكاديمي.",
    whenSoon: "قبل إطلاق التسجيل الرسمي لتشويق الطلبة بوجود عضويات قادمة.",
    whenOff: "إذا أردتم تشغيل المنصة كمكتبة مفتوحة للقراءة فقط بدون أي تسجيل."
  },
  {
    name: "كشف الطالب لدرجاته علناً",
    benefit: "يسمح للطالب باختيار مشاركة درجاته في ملفه العام بعد نافذة تأكيد صريحة.",
    whenOn: "لتشجيع التنافس الشريف وإبراز المتفوقين برغبتهم.",
    whenSoon: "إذا كنتم تخططون لإتاحتها في موسم اختبارات قادم.",
    whenOff: "إذا أردتم إبقاء جميع درجات الطلبة سرية تماماً ولا يملك أحد خيار كشفها."
  },
  {
    name: "مركز ودردشة الدعم الفني",
    benefit: "يتيح للزوار وفاقدي الحسابات فتح تذاكر برقم موحّد LISAN- والتواصل مع موظف الدعم.",
    whenOn: "دائماً عند توفر موظف لمتابعة التذاكر.",
    whenSoon: "أثناء تجهيز فريق خدمة العملاء.",
    whenOff: "إذا أردتم إيقاف استقبال التذاكر مؤقتاً والاكتفاء بروابط التواصل في التذييل."
  },
  {
    name: "الصفحات التعريفية (من نحن، الخصوصية...)",
    benefit: "تبني الثقة القانونية والأكاديمية للموقع وتظهر في التذييل.",
    whenOn: "دائماً بعد مراجعة نصوصها.",
    whenSoon: "أثناء إعادة صياغة اللوائح التعريفية.",
    whenOff: "لإخفاء روابط الصفحات من التذييل مؤقتاً."
  },
  {
    name: "الأقسام الستة (المكتبة، المعجم، الاختبارات، الباحث، المحاضرات، التبادل)",
    benefit: "تنظيم المعرفة في 6 صناديق مستقلة.",
    whenOn: "بمجرد توفر محتوى كافٍ في القسم.",
    whenSoon: "ممتازة جداً لقسم لم تضيفوا فيه مواد بعد! يظهر الصندوق بشارة «قريباً» فيعرف الزائر وجود القسم دون أن يصطدم بصفحة فارغة.",
    whenOff: "إذا قررتم إلغاء القسم أو إخفاءه تماماً عن الجمهور."
  },
  {
    name: "إرسال مشاريع ومساهمات الطلبة",
    benefit: "زر المشاركة في فضاء التبادل العلمي لاستقبال مشاريع الطلبة.",
    whenOn: "عندما تكون لجنة المراجعة مستعدة لاستقبال مشاريع جديدة.",
    whenSoon: "في فترات إغلاق التقديم بين المواسم الأكاديمية.",
    whenOff: "عند الاكتفاء بنشر مشاريع تختارها الإدارة بنفسها."
  },
  {
    name: "محرك البحث الذكي وشريط الإحصائيات وشريط الإعلانات",
    benefit: "تسهيل الوصول للمحتوى وإبراز حيوية المنصة والتنبيهات العاجلة.",
    whenOn: "يُنصح بتفعيل البحث دائماً، وشريط الإعلانات عند وجود خبر مهم.",
    whenSoon: "نادر الاستخدام للبحث؛ يُفضل إبقاؤه مفعّلاً.",
    whenOff: "لإخفاء شريط الإحصائيات في البداية إذا كان عدد المواد لا يزال قليلاً."
  },
  {
    name: "أدوات القراءة (تكبير الخط، الورق الدافئ، المشاركة، تحذير الروابط الخارجية)",
    benefit: "ترفع جودة القراءة الأكاديمية وتحمي الزائر من الروابط الخارجية.",
    whenOn: "يُنصح بإبقائها مفعّلة دائماً لأنها تضيف طابعاً احترافياً ومريحاً للقارئ.",
    whenSoon: "عند تجربة ميزة جديدة قبل فتحها.",
    whenOff: "إذا رغبتم في تبسيط شريط القراءة لأقصى حد."
  }
];

const FAIR_ACTIONS_GUIDE = [
  { label: "اعتماد وتوثيق / رفع التقييد", tone: "ok", desc: "يمنح الطالب كامل الصلاحيات (اختبارات، حفظ درجات، مساهمات، وملف عام موثق) ويرسل له إشعاراً بالقبول." },
  { label: "تنبيه أو تحذير ودي", tone: "warn", desc: "لا يقيّد أي ميزة في حساب الطالب؛ فقط يرسل له رسالة تنبيه محترمة في صندوق إشعاراته لتصحيح سلوك أو ملاحظة." },
  { label: "تقييد النشر والمساهمات فقط", tone: "warn", desc: "إجراء متوازن يمنع الطالب مؤقتاً من إرسال مشاريع جديدة مع بقاء حقه في القراءة وخوض الاختبارات." },
  { label: "وضع القراءة فقط", tone: "warn", desc: "يسمح للطالب بتصفح المنصة والاطلاع على سجله السابق فقط، مع إيقاف الاختبارات والمساهمات مؤقتاً." },
  { label: "إخفاء الملف الشخصي العام", tone: "info", desc: "يبقى الحساب نشطاً بالكامل لصاحبه، لكن بطاقته العامة تختفي عن الزوار عند الحاجة لخصوصية أو مراجعة." },
  { label: "طلب استكمال بيانات / إعادة للمراجعة", tone: "info", desc: "يُستخدم عند وجود نقص في بيانات الجامعة أو عدم وضوح البطاقة الجامعية؛ فيعدّل الطالب بياناته ويعيد الإرسال." },
  { label: "تعليق مؤقت للحساب", tone: "danger", desc: "أقصى إجراء للمخالفات الجسيمة؛ يجمّد تفاعل الحساب ويعرض للطالب سبب التعليق مع زر مباشر للتواصل مع الدعم الفني للاعتراض أو التوضيح." }
];

const TROUBLESHOOTING_GUIDE = [
  {
    q: "عند الضغط على «المتابعة باستخدام Google» تظهر رسالة خطأ أو تفشل النافذة",
    a: "السبب الأشهر هو أن رابط الاستضافة أو الدومين الجديد غير مضاف في النطاقات المصرح بها. ادخل إلى Firebase ← Authentication ← Settings ← Authorized domains وأضف الدومين (بدون https://). والسبب الثاني قد يكون فتح الموقع من متصفح داخلي لتطبيق (مثل واتساب) يحظر النوافذ المنبثقة؛ يُنصح بفتحه في Chrome أو Safari."
  },
  {
    q: "طالب سجّل بالبريد ولم تصله رسالة التفعيل",
    a: "اطلب منه فحص مجلد الرسائل غير المرغوب فيها (Spam / Junk) أولاً، ثم الضغط على «إعادة إرسال الرابط» داخل ملفه الشخصي. أو يمكنه الدخول مباشرة بنفس بريده عبر زر Google فيُعتمد بريده مؤكَّداً تلقائياً."
  },
  {
    q: "أحد المشرفين نسي الرمز السريع (4 أرقام) لغرفة العمليات",
    a: "في شاشة إدخال الأرقام الأربعة يوجد زر «نسيت الرمز السريع؟ غيّره بكلمة المرور». يضغط عليه، يدخل اسم المستخدم وكلمة المرور الأصلية، ويضع رمزاً سريعاً جديداً فوراً."
  },
  {
    q: "نسينا كلمة مرور الأدمن الرئيسي (Admin) في غرفة العمليات بالكامل!",
    a: "خطة استعادة السيطرة الطارئة: ادخل بالبريد الموحد (asmaabdaoui709@gmail.com) إلى Firebase ← Firestore Database ← مجموعة admins ← احذف مستند super-admin-root (أو افرغ المجموعة إذا أردت). فور فتح صفحة غرفة العمليات مجدداً، سيعيد النظام تلقائياً تأسيس حساب Admin بكلمة المرور 123456 لتدخل وتغيّرها فوراً."
  },
  {
    q: "نسينا كلمة مرور هذا الدليل (المستودع الثالث)",
    a: "في شاشة دخول الدليل اضغط «نسيت كلمة المرور؟ إرسال رابط الاستعادة إلى البريد الرسمي»، سيصلك رابط مشفر من Firebase إلى بريد asmaabdaoui709@gmail.com لتعيين كلمة مرور جديدة خلال ثوانٍ."
  },
  {
    q: "غيّرنا الشعار أو الألوان أو أضفنا مادة ولم تظهر فوراً على الجوال",
    a: "تُحفظ التعديلات لحظياً في Firebase، لكن المتصفح قد يحتفظ بنسخة قديمة مؤقتة (Cache). قم بسحب الصفحة للأسفل للتحديث (Refresh) وستظهر التعديلات فوراً."
  },
  {
    q: "كيف نجعل مقالات ومصطلحات المنصة تظهر في نتائج بحث جوجل؟",
    a: "بعد ربط الدومين الرسمي، ادخل في غرفة العمليات إلى «الهوية والدعم والسيو» ← اكتب رابط الدومين في خانة مولّد خريطة الموقع ← اضغط «توليد الخريطة» ثم حمّل ملف sitemap.xml وارفعه في مستودع smallisan على GitHub، ثم أضف الرابط في Google Search Console."
  },
  {
    q: "كيف نحافظ على خصوصية صور البطاقات الجامعية للطلبة بعد توثيقهم؟",
    a: "داخل نافذة «مراجعة وإجراءات» لكل طالب في صندوق شؤون الطلبة، بمجرد التحقق من بطاقته واعتماد حسابه، اضغط زر «حذف الوثيقة للخصوصية» لإزالة رابط صورة البطاقة نهائياً من قاعدة البيانات."
  }
];

const OWNERSHIP_ASSETS = [
  {
    name: "منصة Firebase — قاعدة البيانات والمصادقة (المشروع: lisan-b7f25)",
    role: "القلب التشغيلي للمنصة: تحتوي على قاعدة بيانات Firestore (10 مجموعات: الإعدادات، الصفحات، المحتوى، الاختبارات، المشرفين، الطلبة، الدرجات، الإشعارات، التذاكر، السجلات) ونظام Authentication لتفعيل البريد ودخول Google واستعادة كلمات المرور.",
    loginNote: "سجّل الدخول بحساب Google الموحد: asmaabdaoui709@gmail.com",
    links: [
      { label: "لوحة مشروع Firebase الرئيسية", url: "https://console.firebase.google.com/project/lisan-b7f25/overview" },
      { label: "قاعدة البيانات (Firestore)", url: "https://console.firebase.google.com/project/lisan-b7f25/firestore" },
      { label: "المصادقة والنطاقات (Auth)", url: "https://console.firebase.google.com/project/lisan-b7f25/authentication/users" }
    ]
  },
  {
    name: "منصة GitHub — مخزن الأكواد المصدرية والمستودعات الثلاثة",
    role: "تضم كامل ملفات البرمجة الخاصة بكم بشكل آمن ودائم. للتشغيل اليومي لا تحتاج الإدارة لتعديل الأكواد أبداً، ولكن ملكيتها تضمن استقلالكم التام لو أردتم تطوير المنصة مستقبلاً مع أي مبرمج.",
    loginNote: "سجّل الدخول عبر نفس البريد الموحد: asmaabdaoui709@gmail.com",
    repos: [
      { code: "smallisan", desc: "المستودع العام: يحتوي على واجهة الموقع التي يزورها الطلبة والزوار (index.html, style.css, app.js)." },
      { code: "smallisan-admin", desc: "مستودع غرفة العمليات: يحتوي على لوحة التحكم الخاصة بالإدارة والمشرفين وموظفي الدعم." },
      { code: "مستودع الدليل (الحالي)", desc: "هذا الدليل الشامل للتشغيل والملكية، محفوظ على GitHub Pages كمرجع دائم للإدارة العليا." }
    ],
    links: [
      { label: "الدخول إلى حساب GitHub", url: "https://github.com/login" }
    ]
  },
  {
    name: "منصة Cloudflare — شراء الدومين واستضافة Pages",
    role: "تتولى ربط مستودعات GitHub ونشرها على الإنترنت بسرعة عالية وشهادة أمان HTTPS مجانية، كما تُستخدم لشراء الدومين الرسمي للمنصة وربطه بـ smallisan و smallisan-admin.",
    loginNote: "سجّل الدخول بنفس البريد الموحد: asmaabdaoui709@gmail.com",
    steps: [
      "اشترِ الدومين الرسمي من قسم Domain Registration في Cloudflare.",
      "ادخل إلى Workers & Pages ← مشروع الموقع العام (المربوط بمستودع smallisan) ← Custom domains ← أضف الدومين الرئيسي (مثلاً lisan.com).",
      "لمشروع غرفة العمليات (المربوط بمستودع smallisan-admin) ← أضف نطاقاً فرعياً خاصاً (مثلاً ops.lisan.com).",
      "خطوة إلزامية بعد الربط: ادخل إلى Firebase ← Authentication ← Settings ← Authorized domains وأضف الدومين الجديد ليعمل تسجيل دخول Google وروابط البريد."
    ],
    links: [
      { label: "لوحة تحكم Cloudflare", url: "https://dash.cloudflare.com/" }
    ]
  },
  {
    name: "خادم الصور (ImgBB)",
    role: "تُضغط جميع الصور (أغلفة الكتب، صور المقالات، شعار المنصة، صور الموظفين والطلبة) تلقائياً داخل المتصفح قبل رفعها إلى ImgBB للحصول على روابط سريعة لا تستهلك مساحة Firebase المجانية.",
    loginNote: "يعمل تلقائياً من داخل الكود دون أي تدخل من الإدارة.",
    links: [
      { label: "موقع ImgBB", url: "https://imgbb.com/" }
    ]
  }
];

/* ============================================================================
 * 3. الحالة المركزية والأيقونات
 * ============================================================================ */
const state = {
  user: null,
  activeSection: "day1", // day1 | public | admin | troubleshooting | ownership
  checklist: {}
};

const ICONS = {
  lock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  sliders: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>`,
  wrench: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
  crown: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  external: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
  copy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`
};

/* ============================================================================
 * 4. مساعدات النص والبحث العربي الذكي والإشعارات
 * ============================================================================ */
function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalizeArabic(text = "") {
  return String(text)
    .toLowerCase()
    .replace(/[\u064B-\u065F\u0670\u0640]/g, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/\s+/g, " ")
    .trim();
}

function showToast(msg, type = "default") {
  const container = document.getElementById("toast-container");
  if (!container) return;
  const el = document.createElement("div");
  el.className = `glass-toast ${type}`;
  el.textContent = msg;
  container.appendChild(el);
  setTimeout(() => el.classList.add("show"), 20);
  setTimeout(() => { el.classList.remove("show"); setTimeout(() => el.remove(), 300); }, 3800);
}

function loadChecklist() {
  try { state.checklist = JSON.parse(localStorage.getItem(CHECKLIST_STORAGE_KEY) || "{}"); }
  catch { state.checklist = {}; }
}

function toggleChecklistItem(id, checked) {
  state.checklist[id] = checked;
  localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(state.checklist));
}

/* ============================================================================
 * 5. بوابة الحماية الحصرية للإدارة العليا + استعادة كلمة المرور عبر البريد الرسمي
 * ============================================================================ */
function renderAuthGate() {
  const gate = document.getElementById("auth-gate");
  const appShell = document.getElementById("manual-app");
  if (!gate || !appShell) return;
  appShell.hidden = true;
  gate.hidden = false;

  const box = document.getElementById("auth-gate-box");
  box.innerHTML = `
    <div class="auth-badge">${ICONS.lock}</div>
    <span class="pill-badge">مرجع خاص بالإدارة العليا</span>
    <h1 class="auth-title">موسوعة التشغيل والملكية — لِسَان</h1>
    <p class="auth-subtitle">الدخول محصور حصرياً بالبريد الرسمي المالك للمشروع حفاظاً على خصوصية أصول المنصة.</p>

    <form id="owner-login-form" class="auth-form">
      <div class="form-group">
        <label for="owner-email-input">البريد الإلكتروني المالك</label>
        <input type="email" id="owner-email-input" required dir="ltr" placeholder="name@gmail.com" autocomplete="username" />
      </div>
      <div class="form-group">
        <label for="owner-pass-input">كلمة المرور</label>
        <input type="password" id="owner-pass-input" required placeholder="••••••••" autocomplete="current-password" />
      </div>
      <div id="gate-err" class="auth-error" hidden></div>
      <div id="gate-ok" class="auth-success" hidden></div>
      <button type="submit" class="btn-primary-glass full-width" id="owner-login-btn">فتح موسوعة التشغيل والملكية</button>
    </form>

    <div class="gate-footer">
      <button type="button" class="text-link-btn" id="owner-reset-pass-btn">نسيت كلمة المرور؟ إرسال رابط الاستعادة إلى البريد الرسمي</button>
      <p class="light-hint">يُرسل رابط إعادة التعيين تلقائياً من Firebase إلى البريد الرسمي المالك للمشروع فقط.</p>
    </div>
  `;

  const errEl = document.getElementById("gate-err");
  const okEl = document.getElementById("gate-ok");

  document.getElementById("owner-login-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    errEl.hidden = true;
    okEl.hidden = true;

    const email = document.getElementById("owner-email-input").value.trim().toLowerCase();
    const pass = document.getElementById("owner-pass-input").value;
    const btn = document.getElementById("owner-login-btn");

    if (email !== OWNER_EMAIL) {
      errEl.textContent = "عذراً، هذا الدليل حصري للبريد الرسمي المالك للمشروع فقط.";
      errEl.hidden = false;
      return;
    }

    btn.disabled = true;
    btn.textContent = "جارٍ التحقق الآمن...";

    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (err) {
      // التأسيس التلقائي عند أول دخول بكلمة المرور الافتراضية فقط
      if ((err.code === "auth/user-not-found" || err.code === "auth/invalid-credential") && pass === INITIAL_BOOTSTRAP_PASS) {
        try {
          await createUserWithEmailAndPassword(auth, email, pass);
          showToast("تم تأسيس بوابة الإدارة العليا والدخول بنجاح ✓");
          return;
        } catch (createErr) {
          if (createErr.code === "auth/email-already-in-use") {
            errEl.textContent = "تم تغيير كلمة المرور مسبقاً؛ يرجى إدخال كلمتك الجديدة أو طلب رابط الاستعادة أدناه.";
          } else {
            errEl.textContent = "تعذر إتمام الدخول حالياً؛ تحقق من اتصال الإنترنت.";
          }
          errEl.hidden = false;
          btn.disabled = false;
          btn.textContent = "فتح موسوعة التشغيل والملكية";
          return;
        }
      }

      errEl.textContent = err.code === "auth/too-many-requests"
        ? "محاولات كثيرة متتالية؛ انتظر قليلاً أو استخدم رابط استعادة كلمة المرور أدناه."
        : "كلمة المرور غير صحيحة. يمكنك استعادتها فوراً عبر البريد الرسمي أدناه.";
      errEl.hidden = false;
      btn.disabled = false;
      btn.textContent = "فتح موسوعة التشغيل والملكية";
    }
  });

  document.getElementById("owner-reset-pass-btn")?.addEventListener("click", async () => {
    errEl.hidden = true;
    okEl.hidden = true;
    try {
      await sendPasswordResetEmail(auth, OWNER_EMAIL);
      okEl.textContent = `تم إرسال رابط استعادة وتغيير كلمة المرور إلى البريد الرسمي (${OWNER_EMAIL}). افحص البريد الوارد أو الرسائل غير المرغوب فيها.`;
      okEl.hidden = false;
    } catch (err) {
      errEl.textContent = err.code === "auth/user-not-found"
        ? "لم يُؤسَّس الحساب بعد — سجل الدخول أولاً بكلمة المرور التأسيسية التي سلمها لك المطور ثم غيّرها."
        : "تعذر إرسال الرابط حالياً؛ حاول بعد قليل.";
      errEl.hidden = false;
    }
  });
}

/* ============================================================================
 * 6. عرض المحاور الخمسة للموسوعة
 * ============================================================================ */
const NAV_TABS = [
  { id: "day1", label: "اليوم الأول", icon: ICONS.check, accent: "#16a34a" },
  { id: "public", label: "المنصة العامة", icon: ICONS.globe, accent: "#0071e3" },
  { id: "admin", label: "غرفة العمليات", icon: ICONS.sliders, accent: "#5e5ce6" },
  { id: "troubleshooting", label: "المشكلات وحلولها", icon: ICONS.wrench, accent: "#d97706" },
  { id: "ownership", label: "السيادة والملكية", icon: ICONS.crown, accent: "#b88a44" }
];

function switchTab(tabId) {
  state.activeSection = tabId;
  renderManualApp();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderManualApp() {
  const gate = document.getElementById("auth-gate");
  const appShell = document.getElementById("manual-app");
  if (!gate || !appShell) return;
  gate.hidden = true;
  appShell.hidden = false;

  // شريط التبويبات العليا
  const navWrap = document.getElementById("manual-tabs-nav");
  if (navWrap) {
    navWrap.innerHTML = NAV_TABS.map((t) => `
      <button type="button" class="nav-pill-tab ${state.activeSection === t.id ? "active" : ""}" data-tab="${t.id}" style="--tab-accent: ${t.accent}">
        <span class="tab-ico">${t.icon}</span>
        <span>${t.label}</span>
      </button>
    `).join("");

    navWrap.querySelectorAll("[data-tab]").forEach((btn) => {
      btn.addEventListener("click", () => switchTab(btn.dataset.tab));
    });
  }

  const main = document.getElementById("manual-main");
  if (!main) return;

  switch (state.activeSection) {
    case "public": return renderPublicGuide(main);
    case "admin": return renderAdminGuide(main);
    case "troubleshooting": return renderTroubleshootingGuide(main);
    case "ownership": return renderOwnershipGuide(main);
    default: return renderDay1Guide(main);
  }
}

/* ---------- المحور 1: قائمة اليوم الأول ---------- */
function renderDay1Guide(container) {
  const doneCount = DAY1_TASKS.filter((t) => state.checklist[t.id]).length;
  const pct = Math.round((doneCount / DAY1_TASKS.length) * 100);

  container.innerHTML = `
    <section class="glass-card hero-banner heritage-frame">
      <span class="pill-badge ok">محور الاستلام والتشغيل السريع</span>
      <h1>مرحباً بالإدارة العليا لمنصة لِسَان | LISAN</h1>
      <p>صُممت هذه الموسوعة لتكون المرجع الدائم والمستقل لكل صغيرة وكبيرة في المنصة؛ من التشغيل اليومي، وحتى مفاتيح الملكية التقنية الكاملة واستعادة السيطرة دون الحاجة لأي وسيط.</p>
      <div class="progress-summary">
        <div class="progress-head"><span>جاهزية التشغيل لليوم الأول</span><strong>${doneCount} من ${DAY1_TASKS.length} (${pct}%)</strong></div>
        <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
      </div>
    </section>

    <section class="section-block">
      <h2 class="block-heading">قائمة المهام التفاعلية عند الاستلام (تُحفظ تلقائياً)</h2>
      <div class="checklist-stack">
        ${DAY1_TASKS.map((t, i) => {
          const checked = Boolean(state.checklist[t.id]);
          return `
            <label class="glass-card checklist-card ${checked ? "done" : ""} stagger-in" style="--stagger:${i}">
              <input type="checkbox" class="day1-chk" data-task-id="${t.id}" ${checked ? "checked" : ""} />
              <div>
                <h3>${t.title}</h3>
                <p>${t.desc}</p>
              </div>
            </label>
          `;
        }).join("")}
      </div>
    </section>

    <section class="section-block">
      <h2 class="block-heading">خريطة سريعة لأقسام هذا الدليل</h2>
      <div class="bento-grid-2">
        ${NAV_TABS.filter((x) => x.id !== "day1").map((t, i) => `
          <article class="glass-card quick-nav-card heritage-card stagger-in" style="--stagger:${i}; --card-accent:${t.accent}" data-jump-tab="${t.id}" tabindex="0" role="button">
            <div class="card-ico-box" style="--card-accent:${t.accent}">${t.icon}</div>
            <h3>${t.label}</h3>
            <p>${t.id === "public" ? "الأقسام الستة، عضويات الطلبة، الدرجات، والدعم الفني للزوار."
              : t.id === "admin" ? "الصناديق الـ 11، الصلاحيات الـ 12، الميزات الثلاثية، والتقييد العادل."
              : t.id === "troubleshooting" ? "حلول فورية لأشهر المشكلات وخطة استعادة كلمة مرور الأدمن."
              : "البريد المالك الموحد، روابط Firebase وGitHub وCloudflare وربط الدومين."}</p>
          </article>
        `).join("")}
      </div>
    </section>
  `;

  container.querySelectorAll(".day1-chk").forEach((chk) => {
    chk.addEventListener("change", () => {
      toggleChecklistItem(chk.dataset.taskId, chk.checked);
      renderDay1Guide(container);
    });
  });

  container.querySelectorAll("[data-jump-tab]").forEach((el) => {
    el.addEventListener("click", () => switchTab(el.dataset.jumpTab));
  });
}

/* ---------- المحور 2: دليل المنصة العامة (smallisan) ---------- */
function renderPublicGuide(container) {
  container.innerHTML = `
    <section class="glass-card hero-banner heritage-frame">
      <span class="pill-badge">المستودع العام: smallisan</span>
      <h1>دليل المنصة العامة (واجهة الطلبة والزوار)</h1>
      <p>كيف تعمل المنصة أمام الزائر والطالب، كيف نتحقق من هوية الطالب الحقيقي، وكيف يعمل الدعم الفني والتبادل العلمي.</p>
    </section>

    <section class="section-block">
      <h2 class="block-heading">الأقسام الأكاديمية الستة وفروعها</h2>
      <div class="bento-grid-2">
        ${PUBLIC_SECTIONS_GUIDE.map((s, i) => `
          <article class="glass-card info-card heritage-card stagger-in" style="--stagger:${i}">
            <h3>${s.title}</h3>
            <p class="branch-line">${s.branches}</p>
            <p>${s.how}</p>
          </article>
        `).join("")}
      </div>
    </section>

    <section class="section-block">
      <h2 class="block-heading">تجربة الطالب، الموثوقية، الخصوصية، والدعم</h2>
      <div class="cards-stack">
        ${PUBLIC_EXPERIENCE_GUIDE.map((item, i) => `
          <article class="glass-card info-card stagger-in" style="--stagger:${i}">
            <h3>${item.title}</h3>
            <p>${item.body}</p>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

/* ---------- المحور 3: الموسوعة الشاملة لغرفة العمليات (smallisan-admin) ---------- */
function renderAdminGuide(container) {
  container.innerHTML = `
    <section class="glass-card hero-banner heritage-frame">
      <span class="pill-badge">مستودع الإدارة: smallisan-admin</span>
      <h1>الموسوعة الشاملة لغرفة العمليات</h1>
      <p>شرح تفصيلي للصناديق الـ 11، مصفوفة الصلاحيات الـ 12، نظام التحكم الثلاثي بالميزات (مفعّل / قريباً / مخفي)، والإجراءات العادلة لحسابات الطلبة.</p>
    </section>

    <!-- 1. الصناديق الـ 11 -->
    <section class="section-block">
      <h2 class="block-heading">أولاً: شرح صناديق غرفة العمليات (11 صندوقاً)</h2>
      <div class="bento-grid-2">
        ${ADMIN_BOXES_GUIDE.map((b, i) => `
          <article class="glass-card info-card heritage-card stagger-in" style="--stagger:${Math.min(i, 8)}">
            <h3>${b.title}</h3>
            <p>${b.purpose}</p>
          </article>
        `).join("")}
      </div>
    </section>

    <!-- 2. دليل الصلاحيات الـ 12 -->
    <section class="section-block">
      <h2 class="block-heading">ثانياً: دليل منح الصلاحيات للموظفين (12 صلاحية دقيقة)</h2>
      <p class="block-lead">عند إضافة موظف جديد في صندوق «فريق الإدارة والدعم»، تحدد له مربعات الاختيار المناسبة فقط. مثال: لإنشاء <strong>موظف دعم فني فقط</strong> حدد مربع «موظف دعم فني» وحده، فيفتح له صندوق التذاكر فقط ولا يرى باقي صناديق المنصة.</p>
      <div class="cards-stack">
        ${PERMISSIONS_GUIDE.map((p) => `
          <article class="glass-card perm-guide-card">
            <div class="perm-head">
              <h3>${p.name}</h3>
              <span class="pill-badge neutral">${p.recommendedFor}</span>
            </div>
            <div class="perm-cols">
              <div class="perm-ok"><strong>ما يستطيع فعله:</strong> ${p.canDo}</div>
              <div class="perm-limit"><strong>الحدود والحماية:</strong> ${p.cannotDo}</div>
            </div>
          </article>
        `).join("")}
      </div>
    </section>

    <!-- 3. دليل التحكم الثلاثي بالميزات -->
    <section class="section-block">
      <h2 class="block-heading">ثالثاً: دليل التحكم الثلاثي بالميزات (مفعّل / قريباً / مخفي)</h2>
      <p class="block-lead">يمنحكم النظام 3 حالات فورية لكل ميزة وقسم: <strong>مفعّل</strong> (يعمل بشكل طبيعي)، <strong>قريباً</strong> (يظهر للمستخدم مع رسالة أنيقة بأنها ستتوفر قريباً)، و<strong>مخفي</strong> (يختفي تماماً كأنه غير موجود).</p>
      <div class="cards-stack">
        ${FEATURES_TRI_GUIDE.map((f) => `
          <article class="glass-card feature-guide-card">
            <h3>${f.name}</h3>
            <p class="feat-benefit"><strong>الفائدة:</strong> ${f.benefit}</p>
            <div class="tri-explain-grid">
              <div class="tri-ex on"><strong>متى نُفعّلها:</strong> ${f.whenOn}</div>
              <div class="tri-ex soon"><strong>متى نضعها «قريباً»:</strong> ${f.whenSoon}</div>
              <div class="tri-ex off"><strong>متى نُخفيها:</strong> ${f.whenOff}</div>
            </div>
          </article>
        `).join("")}
      </div>
    </section>

    <!-- 4. دليل الإجراءات العادلة للطلبة -->
    <section class="section-block">
      <h2 class="block-heading">رابعاً: دليل التدرج العادل لإدارة حسابات الطلبة</h2>
      <p class="block-lead">حتى لا يُظلم أي طالب، يوفر النظام تدرجاً عادلاً بدلاً من الحظر المباشر، وكل إجراء يُرفق برسالة توضيحية تصل فوراً إلى صندوق إشعارات الطالب:</p>
      <div class="bento-grid-2">
        ${FAIR_ACTIONS_GUIDE.map((a) => `
          <article class="glass-card fair-card tone-${a.tone}">
            <h3>${a.label}</h3>
            <p>${a.desc}</p>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

/* ---------- المحور 4: المشكلات المتوقعة وحلولها الفورية ---------- */
function renderTroubleshootingGuide(container) {
  container.innerHTML = `
    <section class="glass-card hero-banner heritage-frame">
      <span class="pill-badge warn">دليل الطوارئ والصيانة الذاتية</span>
      <h1>المشكلات المتوقعة وحلولها الفورية</h1>
      <p>أشهر المواقف التقنية أو التشغيلية التي قد تصادفكم مع حلها المباشر خطوة بخطوة، بما فيها استعادة كلمة مرور الأدمن الرئيسي.</p>
    </section>

    <section class="section-block">
      <div class="cards-stack">
        ${TROUBLESHOOTING_GUIDE.map((item, i) => `
          <details class="glass-card faq-card stagger-in" style="--stagger:${i}" ${i === 0 ? "open" : ""}>
            <summary><strong>${item.q}</strong></summary>
            <div class="faq-answer"><p>${item.a}</p></div>
          </details>
        `).join("")}
      </div>
    </section>
  `;
}

/* ---------- المحور 5: قسم السيادة والملكية التقنية ---------- */
function renderOwnershipGuide(container) {
  container.innerHTML = `
    <section class="glass-card hero-banner ownership-hero heritage-frame">
      <span class="pill-badge gold">وثيقة السيادة والملكية الكاملة</span>
      <h1>قسم السيادة والملكية التقنية للمشروع</h1>
      <p>كافة الأصول التقنية لمنصة <strong>لِسَان | LISAN</strong> مملوكة بالكامل للإدارة العليا ومربوطة ببريد واحد موحّد يضمن لكم السيطرة المطلقة واستعادة الوصول في أي وقت.</p>
    </section>

    <!-- بطاقة البريد المالك الموحد -->
    <section class="glass-card owner-email-card heritage-frame">
      <div>
        <span class="pill-badge gold">المفتاح المركزي للملكية (البريد الموحّد)</span>
        <h2 dir="ltr" class="owner-email-display">${OWNER_EMAIL}</h2>
        <p>جميع حسابات المشروع (<strong>Firebase</strong> لقاعدة البيانات، <strong>GitHub</strong> لمستودعات الكود، و<strong>Cloudflare</strong> للاستضافة والدومين) مرتبطة بهذا البريد الموحّد. بتسجيل دخولك بهذا البريد على هاتفك أو حاسوبك تملك السيطرة الكاملة على كل جزء في المنصة. <em>(لم نُدرج كلمة المرور هنا حفاظاً على الأمان لأنها قد تتغير في أي وقت).</em></p>
      </div>
      <div class="owner-email-actions">
        <button type="button" class="btn-primary-glass" id="copy-owner-email-btn">${ICONS.copy} نسخ البريد الموحد</button>
        <button type="button" class="tool-btn" id="send-change-pass-btn">إرسال رابط تغيير كلمة مرور هذا الدليل</button>
      </div>
    </section>

    <!-- بطاقات الأصول والروابط المباشرة -->
    <section class="section-block">
      <h2 class="block-heading">الأصول التقنية والروابط المباشرة</h2>
      <div class="cards-stack">
        ${OWNERSHIP_ASSETS.map((asset, i) => `
          <article class="glass-card asset-card stagger-in" style="--stagger:${i}">
            <h3>${asset.name}</h3>
            <p>${asset.role}</p>
            <p class="asset-login-note">🔑 ${asset.loginNote}</p>

            ${asset.repos ? `
              <div class="repos-box">
                ${asset.repos.map((r) => `
                  <div class="repo-row">
                    <code dir="ltr">${r.code}</code>
                    <span>${r.desc}</span>
                  </div>
                `).join("")}
              </div>
            ` : ""}

            ${asset.steps ? `
              <ol class="asset-steps">
                ${asset.steps.map((st) => `<li>${st}</li>`).join("")}
              </ol>
            ` : ""}

            <div class="asset-links-row">
              ${asset.links.map((lk) => `
                <a href="${lk.url}" target="_blank" rel="noopener noreferrer" class="btn-primary-glass">
                  ${ICONS.external} ${lk.label}
                </a>
              `).join("")}
            </div>
          </article>
        `).join("")}
      </div>
    </section>

    <!-- بطاقة خطة استعادة السيطرة الطارئة -->
    <section class="glass-card emergency-card">
      <h3>🚨 خطة الطوارئ: استعادة السيطرة على غرفة العمليات (smallisan-admin)</h3>
      <p>إذا فقدت الإدارة كلمة مرور الأدمن الرئيسي أو تلاعب أحد بالصلاحيات، يمكنكم استعادة السيطرة الكاملة خلال دقيقة واحدة دون أي مبرمج:</p>
      <ol>
        <li>سجّلوا الدخول بالبريد الموحد (<strong dir="ltr">${OWNER_EMAIL}</strong>) إلى رابط <strong>Firestore</strong> أعلاه.</li>
        <li>افتحوا مجموعة <code>admins</code>، ثم احذفوا مستند الأدمن المقفل (أو المستند <code>super-admin-root</code>).</li>
        <li>افتحوا رابط غرفة العمليات مجدداً؛ سيعيد النظام فوراً تأسيس حساب <code>Admin</code> بكلمة مرور <code>123456</code>، فتدخلون وتغيّرونها وتضبطون الفريق بالكامل.</li>
      </ol>
    </section>
  `;

  document.getElementById("copy-owner-email-btn")?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(OWNER_EMAIL);
      showToast("تم نسخ البريد الموحد بنجاح ✓");
    } catch {
      showToast(OWNER_EMAIL);
    }
  });

  document.getElementById("send-change-pass-btn")?.addEventListener("click", async () => {
    try {
      await sendPasswordResetEmail(auth, OWNER_EMAIL);
      showToast(`تم إرسال رابط تغيير كلمة المرور إلى ${OWNER_EMAIL} ✓`);
    } catch {
      showToast("تعذر إرسال الرابط حالياً، حاول بعد لحظات", "error");
    }
  });
}

/* ============================================================================
 * 7. محرك البحث العربي الذكي الشامل (Spotlight)
 * ============================================================================ */
function buildSearchIndex() {
  const idx = [];
  DAY1_TASKS.forEach((t) => idx.push({ tab: "day1", tag: "اليوم الأول", title: t.title, body: t.desc }));
  PUBLIC_SECTIONS_GUIDE.forEach((s) => idx.push({ tab: "public", tag: "المنصة العامة", title: s.title, body: `${s.branches} ${s.how}` }));
  PUBLIC_EXPERIENCE_GUIDE.forEach((x) => idx.push({ tab: "public", tag: "تجربة الطالب", title: x.title, body: x.body }));
  ADMIN_BOXES_GUIDE.forEach((b) => idx.push({ tab: "admin", tag: "صندوق عمليات", title: b.title, body: b.purpose }));
  PERMISSIONS_GUIDE.forEach((p) => idx.push({ tab: "admin", tag: "صلاحية", title: p.name, body: `${p.canDo} ${p.cannotDo} ${p.recommendedFor}` }));
  FEATURES_TRI_GUIDE.forEach((f) => idx.push({ tab: "admin", tag: "ميزة ثلاثية", title: f.name, body: `${f.benefit} ${f.whenOn} ${f.whenSoon} ${f.whenOff}` }));
  FAIR_ACTIONS_GUIDE.forEach((a) => idx.push({ tab: "admin", tag: "إجراء عادل", title: a.label, body: a.desc }));
  TROUBLESHOOTING_GUIDE.forEach((t) => idx.push({ tab: "troubleshooting", tag: "حل مشكلة", title: t.q, body: t.a }));
  OWNERSHIP_ASSETS.forEach((a) => idx.push({ tab: "ownership", tag: "ملكية وأصول", title: a.name, body: `${a.role} ${OWNER_EMAIL} ${(a.steps || []).join(" ")} ${(a.repos || []).map((r) => `${r.code} ${r.desc}`).join(" ")}` }));
  return idx;
}

const SEARCH_INDEX = buildSearchIndex();

function openSpotlight() {
  const m = document.getElementById("spotlight-modal");
  const inp = document.getElementById("spotlight-input");
  if (!m) return;
  m.hidden = false;
  setTimeout(() => inp?.focus(), 30);
  renderSpotlightResults(inp?.value || "");
}

function closeSpotlight() {
  const m = document.getElementById("spotlight-modal");
  if (m) m.hidden = true;
}

function renderSpotlightResults(raw) {
  const wrap = document.getElementById("spotlight-results");
  if (!wrap) return;
  const norm = normalizeArabic(raw);
  if (!norm) {
    wrap.innerHTML = `<div class="spotlight-hint">ابحث عن أي كلمة مثل: <strong>صلاحية، دومين، Cloudflare، تذكرة، بطاقة، درجات، قريباً، استعادة، GitHub</strong>...</div>`;
    return;
  }
  const tokens = norm.split(" ").filter(Boolean);
  const hits = SEARCH_INDEX.filter((item) => {
    const hay = normalizeArabic(`${item.title} ${item.body} ${item.tag}`);
    return tokens.every((tk) => hay.includes(tk));
  }).slice(0, 14);

  if (!hits.length) {
    wrap.innerHTML = `<div class="spotlight-hint">لا توجد نتائج مطابقة لـ "${escapeHtml(raw)}"</div>`;
    return;
  }

  wrap.innerHTML = hits.map((h) => `
    <button type="button" class="spotlight-row" data-go-tab="${h.tab}">
      <div class="spotlight-row-main">
        <strong>${escapeHtml(h.title)}</strong>
        <span>${escapeHtml(h.body.slice(0, 110))}...</span>
      </div>
      <span class="pill-badge">${h.tag}</span>
    </button>
  `).join("");

  wrap.querySelectorAll("[data-go-tab]").forEach((btn) => {
    btn.addEventListener("click", () => {
      closeSpotlight();
      switchTab(btn.dataset.goTab);
    });
  });
}

/* ============================================================================
 * 8. نقطة الانطلاق
 * ============================================================================ */
function init() {
  loadChecklist();

  document.getElementById("manual-brand-home")?.addEventListener("click", () => switchTab("day1"));
  document.getElementById("open-spotlight-btn")?.addEventListener("click", openSpotlight);
  document.getElementById("close-spotlight-btn")?.addEventListener("click", closeSpotlight);
  document.getElementById("spotlight-modal")?.addEventListener("click", (e) => {
    if (e.target.id === "spotlight-modal") closeSpotlight();
  });
  document.getElementById("spotlight-input")?.addEventListener("input", (e) => renderSpotlightResults(e.target.value));

  document.getElementById("owner-logout-btn")?.addEventListener("click", async () => {
    await signOut(auth);
    showToast("تم تسجيل الخروج من موسوعة التشغيل");
  });

  document.addEventListener("keydown", (e) => {
    if (!state.user) return;
    if ((e.key === "/" || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k")) &&
        !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) {
      e.preventDefault();
      openSpotlight();
    } else if (e.key === "Escape") {
      closeSpotlight();
    }
  });

  onAuthStateChanged(auth, async (user) => {
    if (user && (user.email || "").toLowerCase() === OWNER_EMAIL) {
      state.user = user;
      renderManualApp();
    } else {
      if (user) await signOut(auth).catch(() => {});
      state.user = null;
      renderAuthGate();
    }
  });
}

document.addEventListener("DOMContentLoaded", init);
