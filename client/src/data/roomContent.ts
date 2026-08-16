/**
 * Content displayed inside the room experiences. Hebrew is the primary
 * language; English falls back to the Hebrew text where not provided.
 * Owner-editable copy — syllabi here are the initial drafts.
 */

export interface SyllabusModule {
  title: string;
  topics: string[];
}

export interface CyberCourse {
  slug: string;
  name: string;
  nameEn: string;
  tagline: string;
  duration: string;
  level: string;
  syllabus: SyllabusModule[];
  outcomes: string[];
}

export const CYBER_COURSES: CyberCourse[] = [
  {
    slug: 'soc-analyst',
    name: 'SOC Analyst',
    nameEn: 'SOC Analyst',
    tagline: 'הכשרת אנליסטים למרכז בקרת אבטחה — המקצוע המבוקש בסייבר',
    duration: '6 חודשים · 3 חודשי ליווי',
    level: 'מתחילים — לא נדרש רקע קודם',
    syllabus: [
      { title: 'יסודות הסייבר והרשתות', topics: ['מבוא לאבטחת מידע ומודל התקיפה', 'רשתות TCP/IP ופרוטוקולים', 'מערכות הפעלה Windows ו-Linux'] },
      { title: 'עבודת ה-SOC בפועל', topics: ['ניטור אירועים ב-SIEM', 'זיהוי וניתוח התרעות', 'תעדוף ואסקלציה של אירועים'] },
      { title: 'ניתוח איומים', topics: ['ניתוח לוגים ותעבורת רשת', 'זיהוי נוזקות ודפוסי תקיפה', 'MITRE ATT&CK בעבודה היומיומית'] },
      { title: 'תרגול ומעבדות', topics: ['סימולציות אירועי אמת ב-Lab ייעודי', 'כתיבת דוחות אירוע', 'פרויקט גמר: תחקיר אירוע מקצה לקצה'] },
    ],
    outcomes: ['מוכנות לתפקיד SOC Tier 1', 'תיק תחקירים אישי', 'הכנה לראיונות עבודה בתחום'],
  },
  {
    slug: 'threat-hunting',
    name: 'Threat Hunting',
    nameEn: 'Threat Hunting',
    tagline: 'ציד איומים יזום — לחשוב כמו תוקף, לפעול כמו מגן',
    duration: '4 חודשים',
    level: 'מתקדמים — לבוגרי SOC או בעלי ניסיון',
    syllabus: [
      { title: 'מתודולוגיות ציד', topics: ['Hypothesis-Driven Hunting', 'מודיעין איומים (CTI) ומקורותיו', 'בניית השערות ציד'] },
      { title: 'כלים וטכניקות', topics: ['שאילתות מתקדמות ב-SIEM וב-EDR', 'ניתוח התנהגות אנומלית', 'ציד ברשת, ב-Endpoint ובענן'] },
      { title: 'עבודה עם AI', topics: ['שימוש ב-AI להאצת תחקירים', 'אוטומציה של תהליכי ציד', 'בניית Playbooks חכמים'] },
      { title: 'קמפיין ציד מלא', topics: ['תרגיל ציד מבוסס תרחיש אמת', 'תיעוד והצגת ממצאים', 'המלצות מיגון ארגוניות'] },
    ],
    outcomes: ['יכולת הובלת צידי איומים עצמאיים', 'שליטה בכלי Hunting מובילים', 'חשיבה התקפית לטובת ההגנה'],
  },
  {
    slug: 'digital-forensics',
    name: 'Digital Forensics',
    nameEn: 'Digital Forensics',
    tagline: 'זיהוי פלילי דיגיטלי — לשחזר את מה שקרה, ראיה אחר ראיה',
    duration: '5 חודשים',
    level: 'בינוני — נדרשת היכרות בסיסית עם מערכות',
    syllabus: [
      { title: 'יסודות הפורנזיקה', topics: ['עקרונות שימור ראיות דיגיטליות', 'שרשרת משמורת (Chain of Custody)', 'היבטים משפטיים ואתיים'] },
      { title: 'חקירת מערכות', topics: ['פורנזיקת דיסק וזיכרון', 'ניתוח Artifacts ב-Windows', 'שחזור קבצים ופעילות משתמש'] },
      { title: 'חקירת רשת ונייד', topics: ['ניתוח תעבורה וזיהוי חדירות', 'פורנזיקה של מכשירים ניידים', 'חקירה בסביבות ענן'] },
      { title: 'תיק חקירה מלא', topics: ['תרחיש חקירה מקצה לקצה', 'כתיבת חוות דעת מקצועית', 'הצגת ממצאים בפני גורמים עסקיים'] },
    ],
    outcomes: ['יכולת ניהול חקירה דיגיטלית מלאה', 'שליטה בכלי פורנזיקה מקצועיים', 'כתיבת דוחות קבילים'],
  },
];

export interface AcceleratorService {
  slug: string;
  name: string;
  nameEn: string;
  short: string;
  details: string[];
}

export const ACCELERATOR_SERVICES: AcceleratorService[] = [
  {
    slug: 'discovery',
    name: 'איפיון וייעוץ AI',
    nameEn: 'AI Discovery & Consulting',
    short: 'מיפוי העסק וזיהוי הזדמנויות ה-AI שלו',
    details: ['פגישת Discovery מקיפה על העסק והתהליכים', 'מיפוי נקודות כאב וצווארי בקבוק', 'תוכנית יישום מסודרת עם סדרי עדיפויות'],
  },
  {
    slug: 'training',
    name: 'הכשרות לצוות',
    nameEn: 'Team Training',
    short: 'מכשירים את האנשים שלך לעבוד עם AI',
    details: ['הכשרת מנהלים והנהלה', 'הדרכות מותאמות לכל מחלקה', 'ליווי אישי לכל משתתף עד לשליטה'],
  },
  {
    slug: 'implementation',
    name: 'הטמעה וליווי',
    nameEn: 'Implementation & Support',
    short: 'מלווים עד שה-AI עובד אצלך בשוטף',
    details: ['ליווי צמוד של צוות מומחים', 'בניית תהליכי עבודה חדשים', 'מעקב תוצאות ושיפור מתמיד'],
  },
  {
    slug: 'solutions',
    name: 'פיתוח פתרונות',
    nameEn: 'Custom Solutions',
    short: 'סוכני AI, אוטומציות ואינטגרציות לעסק שלך',
    details: ['פיתוח סוכני AI חכמים לתהליכים עסקיים', 'אינטגרציות עם המערכות הקיימות (n8n, Make)', 'POC מהיר לבדיקת ערך לפני השקעה'],
  },
];

/** External destination for the automations floating body. */
export const AUTOMATIONS_URL = 'https://app.ortamai.com/';
