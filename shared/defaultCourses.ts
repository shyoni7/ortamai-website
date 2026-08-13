/**
 * Built-in course catalog — the source of truth until the admin edits courses
 * in the DB, and the fallback whenever the DB is unreachable or empty.
 * Prices are whole shekels. The admin panel can seed these rows into the DB
 * and edit everything from there.
 */

export type CourseSection = "courses" | "lessons" | "subsidized";
export type PriceUnit = "course" | "lesson";

export interface CatalogCourse {
  slug: string;
  section: CourseSection;
  title: string;
  titleEn: string | null;
  subtitle: string | null;
  subtitleEn: string | null;
  description: string | null;
  descriptionEn: string | null;
  price: number;
  originalPrice: number | null;
  priceUnit: PriceUnit;
  badge: string | null;
  badgeEn: string | null;
  audience: string | null;
  audienceEn: string | null;
  sortOrder: number;
  visible: boolean;
}

export const DEFAULT_COURSES: CatalogCourse[] = [
  // ─── Section 1: main courses ───
  {
    slug: "claude-code-mastery",
    section: "courses",
    title: "לשלוט ב-Claude Code: מ-0 ל-100",
    titleEn: "Mastering Claude Code: 0 to 100",
    subtitle: "6 מפגשים. מאפס מוחלט לבניית מוצרים אמיתיים",
    subtitleEn: "6 sessions. From absolute zero to building real products",
    description:
      "המסלול המלא לשליטה ב-Claude Code — הכלי שמאפשר לכל אחד לבנות אפליקציות, אתרים ואוטומציות בעזרת AI. שישה מפגשים מעשיים, מהתקנה ראשונה ועד פרויקט אמיתי שעולה לאוויר.",
    descriptionEn:
      "The complete path to mastering Claude Code — the tool that lets anyone build apps, websites and automations with AI. Six hands-on sessions, from first install to a real project going live.",
    price: 5900,
    originalPrice: null,
    priceUnit: "course",
    badge: "6 מפגשים",
    badgeEn: "6 sessions",
    audience: null,
    audienceEn: null,
    sortOrder: 1,
    visible: true,
  },
  {
    slug: "ai-beginners",
    section: "courses",
    title: "מה AI יכול לעשות בשבילך?",
    titleEn: "What Can AI Do for You?",
    subtitle: "כניסה קלה לעולם ה-AI — למתחילים, בלי רקע טכני",
    subtitleEn: "An easy entry into the world of AI — for beginners, no technical background",
    description:
      "הקורס שהופך אתכם ממשתמשים סקרנים למי שעובדים עם AI ביום-יום: כתיבת פרומפטים, כלים מעשיים לעבודה ולעסק, ותרגול על משימות אמיתיות שלכם.",
    descriptionEn:
      "The course that turns curious users into everyday AI practitioners: prompt writing, practical tools for work and business, and hands-on practice on your own real tasks.",
    price: 3900,
    originalPrice: null,
    priceUnit: "course",
    badge: "למתחילים",
    badgeEn: "Beginners",
    audience: null,
    audienceEn: null,
    sortOrder: 2,
    visible: true,
  },
  {
    slug: "ai-filmmaker-studio",
    section: "courses",
    title: "להיות יוצר סרטים — סטודיו AI מקצועי",
    titleEn: "Become a Filmmaker — Professional AI Studio",
    subtitle: "מפרומפט לסרט: הפקת וידאו ותמונות ברמה מקצועית",
    subtitleEn: "From prompt to film: professional-grade video and image production",
    description:
      "סטודיו AI מקצועי משלכם: הפקת סרטונים, תמונות וסאונד עם כלי ה-AI המתקדמים בעולם. מהרעיון והתסריט ועד סרט גמור שאפשר לפרסם.",
    descriptionEn:
      "Your own professional AI studio: producing videos, images and sound with the world's leading AI tools. From idea and script to a finished, publishable film.",
    price: 2900,
    originalPrice: null,
    priceUnit: "course",
    badge: null,
    badgeEn: null,
    audience: null,
    audienceEn: null,
    sortOrder: 3,
    visible: true,
  },

  // ─── Section 2: group & private lessons, pay per session ───
  {
    slug: "build-website-ai",
    section: "lessons",
    title: "בונים אתר עם AI",
    titleEn: "Building a Website with AI",
    subtitle: "לבנות כמו מומחה — מרעיון לאתר חי",
    subtitleEn: "Build like an expert — from idea to a live website",
    description:
      "שיעור קבוצתי מעשי: מתחילים מרעיון ומסיימים עם אתר אמיתי באוויר, בעזרת כלי AI — בלי מעצב ובלי מתכנת.",
    descriptionEn:
      "A hands-on group lesson: start with an idea and finish with a real website live on the internet, using AI tools — no designer, no developer.",
    price: 450,
    originalPrice: null,
    priceUnit: "lesson",
    badge: "קבוצתי",
    badgeEn: "Group",
    audience: null,
    audienceEn: null,
    sortOrder: 1,
    visible: true,
  },
  {
    slug: "claude-code-one-on-one",
    section: "lessons",
    title: "Claude Code אחד-על-אחד — מפצחים את השיטה",
    titleEn: "Claude Code 1-on-1 — Cracking the Method",
    subtitle: "ליווי אישי, מותאם בדיוק לפרויקט שלך",
    subtitleEn: "Personal guidance, tailored exactly to your project",
    description:
      "שיעור פרטי אחד-על-אחד עם מומחה Claude Code: עובדים על הפרויקט שלכם, מפצחים את השיטה, ויוצאים עם התקדמות אמיתית ותוכנית עבודה.",
    descriptionEn:
      "A private 1-on-1 lesson with a Claude Code expert: we work on your project, crack the method, and you leave with real progress and a work plan.",
    price: 550,
    originalPrice: null,
    priceUnit: "lesson",
    badge: "1 על 1",
    badgeEn: "1-on-1",
    audience: null,
    audienceEn: null,
    sortOrder: 2,
    visible: true,
  },
  {
    slug: "create-together-media",
    section: "lessons",
    title: "בוא ניצור ביחד",
    titleEn: "Let's Create Together",
    subtitle: "שיעורי יצירת מדיה ב-AI — וידאו, תמונה וסאונד",
    subtitleEn: "AI media creation lessons — video, image and sound",
    description:
      "שיעור קבוצתי של יצירה: מפיקים ביחד סרטונים, תמונות ומוזיקה עם כלי AI. מגיעים עם רעיון — יוצאים עם תוצר מוכן.",
    descriptionEn:
      "A group creation lesson: together we produce videos, images and music with AI tools. Come with an idea — leave with a finished piece.",
    price: 450,
    originalPrice: null,
    priceUnit: "lesson",
    badge: "קבוצתי",
    badgeEn: "Group",
    audience: null,
    audienceEn: null,
    sortOrder: 3,
    visible: true,
  },

  // ─── Section 3: subsidized community tracks (eligibility check, not booking) ───
  {
    slug: "subsidized-business-reservists",
    section: "subsidized",
    title: "AI לבעלי עסקים — מסלול מילואימניקים",
    titleEn: "AI for Business Owners — Reservists Track",
    subtitle: "קורס ה-AI המלא לבעלי עסקים, בסבסוד מלא של ORTAM AI",
    subtitleEn: "The full AI course for business owners, fully subsidized by ORTAM AI",
    description:
      "קורס AI לבעלי עסקים במחיר מסובסד למשרתי מילואים: כלים מעשיים לייעול העסק, שיווק, תוכן ואוטומציה — כהוקרה על השירות.",
    descriptionEn:
      "An AI course for business owners at a subsidized price for reserve soldiers: practical tools for streamlining the business, marketing, content and automation — in appreciation of your service.",
    price: 750,
    originalPrice: 3900,
    priceUnit: "course",
    badge: "מסובסד",
    badgeEn: "Subsidized",
    audience: "מילואימניקים בעלי עסקים",
    audienceEn: "Reservists who own a business",
    sortOrder: 1,
    visible: true,
  },
  {
    slug: "subsidized-single-mothers",
    section: "subsidized",
    title: "AI למתחילים — מסלול לנשים חד-הוריות",
    titleEn: "AI for Beginners — Single Mothers Track",
    subtitle: "כל הקורס במחיר סמלי, בסבסוד מלא של ORTAM AI",
    subtitleEn: "The full course at a symbolic price, fully subsidized by ORTAM AI",
    description:
      "קורס AI למתחילים במסלול מסובסד לנשים חד-הוריות: כניסה בטוחה לעולם ה-AI, כלים לעבודה ולפרנסה, וליווי צמוד לאורך כל הדרך.",
    descriptionEn:
      "A beginners' AI course on a subsidized track for single mothers: a safe entry into the world of AI, tools for work and income, and close guidance all the way.",
    price: 550,
    originalPrice: 6900,
    priceUnit: "course",
    badge: "מסובסד",
    badgeEn: "Subsidized",
    audience: "נשים חד-הוריות",
    audienceEn: "Single mothers",
    sortOrder: 2,
    visible: true,
  },
  {
    slug: "subsidized-discharged-soldiers",
    section: "subsidized",
    title: "בניית סוכני AI — מסלול חיילים משוחררים",
    titleEn: "Building AI Agents — Discharged Soldiers Track",
    subtitle: "הקורס המבוקש במחיר סמלי, בסבסוד מלא של ORTAM AI",
    subtitleEn: "Our most in-demand course at a symbolic price, fully subsidized by ORTAM AI",
    description:
      "קורס בניית סוכני AI במסלול מסובסד לחיילים משוחררים: המקצוע החם של עולם ה-AI, מהיסודות ועד בניית סוכנים עובדים — פתיחת דלת לקריירה.",
    descriptionEn:
      "An AI-agent-building course on a subsidized track for discharged soldiers: the hottest profession in AI, from the basics to working agents — a door-opener to a career.",
    price: 550,
    originalPrice: 4900,
    priceUnit: "course",
    badge: "מסובסד",
    badgeEn: "Subsidized",
    audience: "חיילים משוחררים",
    audienceEn: "Discharged soldiers",
    sortOrder: 3,
    visible: true,
  },
];
