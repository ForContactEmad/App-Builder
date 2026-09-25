// ============================================
// APP Builder — Main Logic
// ============================================

// ----- بيانات المهام -----
const TASKS = [
  { id: "00", slug: "idea-detail", title: "تفصيل الفكرة", description: "تحويل فكرتك إلى نسخة أولى واضحة يمكن تطويرها.", duration: "12 دقيقة", stage: "التحضير" },
  { id: "01", slug: "target-audience", title: "تحديد الجمهور", description: "من هو مستخدم تطبيقك؟ حدد الفئة المستهدفة بدقة.", duration: "15 دقيقة", stage: "التحضير" },
  { id: "02", slug: "core-features", title: "الميزات الأساسية", description: "اختيار الميزات التي لا يمكن للتطبيق أن يعمل بدونها.", duration: "20 دقيقة", stage: "التحضير" },
  { id: "03", slug: "user-flow", title: "مسار المستخدم", description: "رسم رحلة المستخدم من فتح التطبيق حتى تحقيق الهدف.", duration: "25 دقيقة", stage: "التحضير" },
  { id: "04", slug: "screens-list", title: "قائمة الشاشات", description: "تحديد كل الشاشات المطلوبة في النسخة الأولى.", duration: "18 دقيقة", stage: "التصميم" },
  { id: "05", slug: "app-identity", title: "هوية التطبيق", description: "حسم شكل تطبيقك: الألوان والخطوط والشاشات والشعار. الشكل وحده، لا الوظائف.", duration: "34 دقيقة", stage: "التصميم" },
  { id: "06", slug: "wireframes", title: "المخططات الأولية", description: "رسم تخطيطي بسيط لكل شاشة قبل التصميم النهائي.", duration: "30 دقيقة", stage: "التصميم" },
  { id: "07", slug: "ui-design", title: "تصميم الواجهات", description: "تحويل المخططات إلى واجهات نهائية جاهزة للتنفيذ.", duration: "45 دقيقة", stage: "التصميم" },
  { id: "08", slug: "design-system", title: "نظام التصميم", description: "توحيد الألوان والخطوط والمكونات لضمان الاتساق.", duration: "25 دقيقة", stage: "التصميم" },
  { id: "09", slug: "tech-stack", title: "اختيار التقنيات", description: "تحديد الأدوات واللغات التي ستبني بها التطبيق.", duration: "20 دقيقة", stage: "التنفيذ" },
  { id: "10", slug: "setup-project", title: "تهيئة المشروع", description: "إنشاء المشروع وربط الأدوات الأساسية.", duration: "30 دقيقة", stage: "التنفيذ" },
  { id: "11", slug: "build-core", title: "بناء الوظائف الأساسية", description: "تنفيذ الميزات الجوهرية التي يقوم عليها التطبيق.", duration: "60 دقيقة", stage: "التنفيذ" },
  { id: "12", slug: "integrate-apis", title: "ربط الخدمات الخارجية", description: "دمج واجهات البرمجة (APIs) والخدمات التي يحتاجها التطبيق.", duration: "40 دقيقة", stage: "التنفيذ" },
  { id: "13", slug: "testing", title: "الاختبار", description: "تجربة التطبيق واكتشاف الأخطاء قبل النشر.", duration: "35 دقيقة", stage: "الإطلاق" },
  { id: "14", slug: "prepare-release", title: "تجهيز النسخة للنشر", description: "تحضير الأيقونات والشاشات والنصوص المطلوبة للنشر.", duration: "30 دقيقة", stage: "الإطلاق" },
  { id: "15", slug: "publish-google-play", title: "النشر على Google Play", description: "تجهيز Android ورفعه إلى مسار الاختبار المناسب لحسابك.", duration: "40 دقيقة", stage: "الإطلاق", free: true },
  { id: "16", slug: "publish-app-store", title: "النشر على App Store", description: "تجهيز iOS ورفعه إلى TestFlight ثم المراجعة.", duration: "45 دقيقة", stage: "الإطلاق" },
  { id: "17", slug: "post-launch", title: "ما بعد الإطلاق", description: "متابعة الأداء والتقييمات وإصلاح المشاكل الأولى.", duration: "25 دقيقة", stage: "الإطلاق" },
  { id: "18", slug: "next-iterations", title: "التحديثات القادمة", description: "التخطيط للنسخة التالية بناءً على ملاحظات المستخدمين.", duration: "20 دقيقة", stage: "الإطلاق" },
];

const STAGES = ["التحضير", "التصميم", "التنفيذ", "الإطلاق"];

// ----- عناصر DOM -----
const tabsContainer = document.getElementById('stage-tabs');
const gridContainer = document.getElementById('tasks-grid');

// ----- عرض التبويبات -----
function renderTabs() {
  if (!tabsContainer) return;

  const allBtn = document.createElement('button');
  allBtn.className = 'tab active';
  allBtn.textContent = 'الكل';
  allBtn.dataset.stage = 'الكل';
  tabsContainer.appendChild(allBtn);

  STAGES.forEach((stage) => {
    const btn = document.createElement('button');
    btn.className = 'tab';
    btn.textContent = stage;
    btn.dataset.stage = stage;
    tabsContainer.appendChild(btn);
  });

  tabsContainer.addEventListener('click', (e) => {
    const tab = e.target.closest('.tab');
    if (!tab) return;

    // تحديث الحالة
   