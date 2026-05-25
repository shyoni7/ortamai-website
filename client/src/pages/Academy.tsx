import React, { useState } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Users, Award, BookOpen, X, ChevronDown, ChevronUp, Building, Star, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import GradientButton from '@/components/GradientButton';

const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663445418346/oDFneUKwvw2xJYXYaumUdB';
const AI_TRAINING_IMAGE = `${CDN}/81fe03d01_create_a_professional_and_modern_image_for_a_website_that_promotes_ai_training_programs_the_image_s_y01604j7g7gqe2rbe6tu_0_2b7c34bf.png`;
const MINISTRY_LOGO = `${CDN}/73e8a1f5d_images_f41438b1.png`;
const HERO_IMAGE = `${CDN}/a00800906_______________ai______________1ztf6h7ulzz1cg0t1nwp_1_450c2a58.png`;

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

interface Module {
  title: string;
  duration: string;
  topics: string[];
}

interface TrainingProgram {
  id: string;
  title: string;
  titleEn: string;
  audience: string;
  audienceEn: string;
  hours: string;
  level: string;
  levelEn: string;
  image: string;
  color: string;
  modules: Module[];
  modulesEn: Module[];
  outcomes: string[];
  outcomesEn: string[];
  tools: string[];
}

interface PublicCourse {
  title: string;
  titleEn: string;
  desc: string;
  descEn: string;
  duration: string;
  durationEn: string;
  level: string;
  levelEn: string;
  color: string;
  icon: React.ElementType;
}

const trainingPrograms: TrainingProgram[] = [
  {
    id: 'managers',
    title: 'הכשרת AI למנהלים',
    titleEn: 'AI Training for Managers',
    audience: 'מנהלים',
    audienceEn: 'Managers',
    hours: '28',
    level: 'בינוני',
    levelEn: 'Intermediate',
    image: `${CDN}/81fe03d01_create_a_professional_and_modern_image_for_a_website_that_promotes_ai_training_programs_the_image_s_y01604j7g7gqe2rbe6tu_0_2b7c34bf.png`,
    color: 'from-blue-700 to-blue-900',
    modules: [
      { title: 'מבוא ל-AI ניהולי', duration: '4 שעות', topics: ['הבנת עולם ה-AI', 'כלים ניהוליים מבוססי AI', 'ChatGPT למנהלים'] },
      { title: 'קבלת החלטות עם AI', duration: '6 שעות', topics: ['ניתוח נתונים עם AI', 'דוחות אוטומטיים', 'תחזיות ומגמות'] },
      { title: 'ניהול צוות בעידן ה-AI', duration: '6 שעות', topics: ['אוטומציה של תהליכים', 'מדידת ביצועים', 'שיפור פרודוקטיביות'] },
      { title: 'תקשורת ניהולית עם AI', duration: '6 שעות', topics: ['כתיבת מסמכים מקצועיים', 'מצגות אוטומטיות', 'תקשורת פנים-ארגונית'] },
      { title: 'אסטרטגיה ו-AI', duration: '6 שעות', topics: ['תכנון אסטרטגי עם AI', 'ניתוח מתחרים', 'חדשנות ארגונית'] },
    ],
    modulesEn: [
      { title: 'Introduction to Managerial AI', duration: '4 hours', topics: ['Understanding the AI world', 'AI-based management tools', 'ChatGPT for managers'] },
      { title: 'Decision Making with AI', duration: '6 hours', topics: ['Data analysis with AI', 'Automated reports', 'Forecasts and trends'] },
      { title: 'Team Management in the AI Era', duration: '6 hours', topics: ['Process automation', 'Performance measurement', 'Productivity improvement'] },
      { title: 'Managerial Communication with AI', duration: '6 hours', topics: ['Writing professional documents', 'Automated presentations', 'Internal communication'] },
      { title: 'Strategy and AI', duration: '6 hours', topics: ['Strategic planning with AI', 'Competitor analysis', 'Organizational innovation'] },
    ],
    outcomes: ['שיפור קבלת החלטות', 'הגברת פרודוקטיביות הצוות', 'אוטומציה של תהליכים ניהוליים', 'יתרון תחרותי'],
    outcomesEn: ['Improved decision making', 'Increased team productivity', 'Automation of management processes', 'Competitive advantage'],
    tools: ['ChatGPT', 'Claude', 'Notion AI', 'Microsoft Copilot', 'Gamma'],
  },
  {
    id: 'marketing',
    title: 'הכשרת AI למחלקת שיווק',
    titleEn: 'AI Training for Marketing',
    audience: 'אנשי שיווק',
    audienceEn: 'Marketing Professionals',
    hours: '44',
    level: 'בינוני',
    levelEn: 'Intermediate',
    image: `${CDN}/a00800906_______________ai______________1ztf6h7ulzz1cg0t1nwp_1_450c2a58.png`,
    color: 'from-blue-700 to-slate-500',
    modules: [
      { title: 'AI לכתיבת תוכן שיווקי', duration: '8 שעות', topics: ['כתיבת קופי עם AI', 'יצירת תוכן לרשתות חברתיות', 'SEO עם AI'] },
      { title: 'יצירת תמונות ווידאו עם AI', duration: '10 שעות', topics: ['Midjourney ו-DALL-E', 'עריכת וידאו עם AI', 'עיצוב גרפי אוטומטי'] },
      { title: 'ניתוח שוק ומתחרים', duration: '8 שעות', topics: ['ניתוח מתחרים עם AI', 'מחקר שוק', 'זיהוי טרנדים'] },
      { title: 'אוטומציה שיווקית', duration: '10 שעות', topics: ['Email marketing עם AI', 'ניהול קמפיינים', 'Chatbots שיווקיים'] },
      { title: 'מדידה ואנליטיקה', duration: '8 שעות', topics: ['Google Analytics עם AI', 'דוחות ביצועים', 'אופטימיזציה'] },
    ],
    modulesEn: [
      { title: 'AI for Marketing Content Writing', duration: '8 hours', topics: ['Copywriting with AI', 'Social media content creation', 'SEO with AI'] },
      { title: 'Image and Video Creation with AI', duration: '10 hours', topics: ['Midjourney and DALL-E', 'Video editing with AI', 'Automated graphic design'] },
      { title: 'Market and Competitor Analysis', duration: '8 hours', topics: ['Competitor analysis with AI', 'Market research', 'Trend identification'] },
      { title: 'Marketing Automation', duration: '10 hours', topics: ['Email marketing with AI', 'Campaign management', 'Marketing chatbots'] },
      { title: 'Measurement and Analytics', duration: '8 hours', topics: ['Google Analytics with AI', 'Performance reports', 'Optimization'] },
    ],
    outcomes: ['הגדלת ROI של קמפיינים', 'חיסכון בזמן יצירת תוכן', 'שיפור איכות התוכן', 'אוטומציה של תהליכים'],
    outcomesEn: ['Increased campaign ROI', 'Time savings in content creation', 'Improved content quality', 'Process automation'],
    tools: ['ChatGPT', 'Midjourney', 'Canva AI', 'HubSpot AI', 'Jasper'],
  },
  {
    id: 'hr',
    title: 'הכשרת AI למחלקת משאבי אנוש',
    titleEn: 'AI Training for HR',
    audience: 'אנשי HR',
    audienceEn: 'HR Professionals',
    hours: '24',
    level: 'בינוני',
    levelEn: 'Intermediate',
    image: `https://d2xsxph8kpxj0f.cloudfront.net/310519663445418346/oDFneUKwvw2xJYXYaumUdB/ai-hr-training-2pXxBJCLzZXaMJGK8nFghw.webp`,
    color: 'from-emerald-500 to-teal-600',
    modules: [
      { title: 'AI בגיוס ומיון', duration: '6 שעות', topics: ['סינון קורות חיים עם AI', 'ראיונות עבודה חכמים', 'הערכת מועמדים'] },
      { title: 'ניהול עובדים עם AI', duration: '6 שעות', topics: ['מעקב ביצועים', 'תכנון הכשרות', 'שימור עובדים'] },
      { title: 'תקשורת ארגונית', duration: '6 שעות', topics: ['כתיבת נהלים', 'תקשורת פנימית', 'ניהול קונפליקטים'] },
      { title: 'ניתוח נתוני HR', duration: '6 שעות', topics: ['דוחות כוח אדם', 'חיזוי עזיבות', 'אנליטיקת עובדים'] },
    ],
    modulesEn: [
      { title: 'AI in Recruitment and Screening', duration: '6 hours', topics: ['CV screening with AI', 'Smart job interviews', 'Candidate evaluation'] },
      { title: 'Employee Management with AI', duration: '6 hours', topics: ['Performance tracking', 'Training planning', 'Employee retention'] },
      { title: 'Organizational Communication', duration: '6 hours', topics: ['Writing procedures', 'Internal communication', 'Conflict management'] },
      { title: 'HR Data Analysis', duration: '6 hours', topics: ['Workforce reports', 'Turnover prediction', 'Employee analytics'] },
    ],
    outcomes: ['קיצור זמן גיוס', 'שיפור חוויית עובד', 'אוטומציה של תהליכי HR', 'החלטות מבוססות נתונים'],
    outcomesEn: ['Reduced recruitment time', 'Improved employee experience', 'HR process automation', 'Data-driven decisions'],
    tools: ['ChatGPT', 'LinkedIn AI', 'Workday AI', 'BambooHR', 'Notion AI'],
  },
  {
    id: 'executives',
    title: 'הכשרת AI לבכירים',
    titleEn: 'AI Training for Executives',
    audience: 'מנהלים בכירים',
    audienceEn: 'Senior Executives',
    hours: '20',
    level: 'מתקדמים',
    levelEn: 'Advanced',
    image: `${CDN}/df766e802_________ai_____________pcmer0eadzd5v32fb1re_1_0986f3c0.png`,
    color: 'from-yellow-500 to-orange-600',
    modules: [
      { title: 'AI כאסטרטגיה עסקית', duration: '5 שעות', topics: ['מגמות AI גלובליות', 'הזדמנויות עסקיות', 'ניהול סיכונים'] },
      { title: 'הטמעת AI בארגון', duration: '5 שעות', topics: ['מפת דרכים לאימוץ AI', 'ניהול שינוי', 'ROI של AI'] },
      { title: 'AI וממשל תאגידי', duration: '5 שעות', topics: ['אתיקה של AI', 'רגולציה ותקנות', 'אחריות תאגידית'] },
      { title: 'חדשנות ועתיד', duration: '5 שעות', topics: ['טרנדים עתידיים', 'מודלים עסקיים חדשים', 'הכנת הארגון לעתיד'] },
    ],
    modulesEn: [
      { title: 'AI as Business Strategy', duration: '5 hours', topics: ['Global AI trends', 'Business opportunities', 'Risk management'] },
      { title: 'AI Implementation in Organizations', duration: '5 hours', topics: ['AI adoption roadmap', 'Change management', 'AI ROI'] },
      { title: 'AI and Corporate Governance', duration: '5 hours', topics: ['AI ethics', 'Regulations and compliance', 'Corporate responsibility'] },
      { title: 'Innovation and the Future', duration: '5 hours', topics: ['Future trends', 'New business models', 'Preparing the organization for the future'] },
    ],
    outcomes: ['חזון אסטרטגי ברור', 'יכולת הובלת שינוי', 'הבנת הזדמנויות AI', 'יתרון תחרותי'],
    outcomesEn: ['Clear strategic vision', 'Ability to lead change', 'Understanding AI opportunities', 'Competitive advantage'],
    tools: ['ChatGPT', 'Claude', 'Perplexity', 'Microsoft Copilot', 'Gemini'],
  },
  {
    id: 'product',
    title: 'הכשרת AI למנהלי מוצר ופרויקטים',
    titleEn: 'AI Training for Product & Project Managers',
    audience: 'מנהלי מוצר ופרויקטים',
    audienceEn: 'Product & Project Managers',
    hours: '32',
    level: 'מתקדמים',
    levelEn: 'Advanced',
    image: `${CDN}/81fe03d01_create_a_professional_and_modern_image_for_a_website_that_promotes_ai_training_programs_the_image_s_y01604j7g7gqe2rbe6tu_0_2b7c34bf.png`,
    color: 'from-blue-500 to-indigo-600',
    modules: [
      { title: 'AI בניהול מוצר', duration: '8 שעות', topics: ['מחקר משתמשים עם AI', 'כתיבת PRD', 'תעדוף פיצ\'רים'] },
      { title: 'ניהול פרויקטים חכם', duration: '8 שעות', topics: ['תכנון פרויקטים עם AI', 'ניהול סיכונים', 'מעקב אחר התקדמות'] },
      { title: 'ניתוח נתונים ומדידה', duration: '8 שעות', topics: ['KPIs ומטריקות', 'ניתוח A/B', 'דוחות אוטומטיים'] },
      { title: 'תקשורת ושיתוף פעולה', duration: '8 שעות', topics: ['תיעוד טכני', 'מצגות לסטייקהולדרים', 'ניהול צוות מרוחק'] },
    ],
    modulesEn: [
      { title: 'AI in Product Management', duration: '8 hours', topics: ['User research with AI', 'PRD writing', 'Feature prioritization'] },
      { title: 'Smart Project Management', duration: '8 hours', topics: ['Project planning with AI', 'Risk management', 'Progress tracking'] },
      { title: 'Data Analysis and Measurement', duration: '8 hours', topics: ['KPIs and metrics', 'A/B analysis', 'Automated reports'] },
      { title: 'Communication and Collaboration', duration: '8 hours', topics: ['Technical documentation', 'Stakeholder presentations', 'Remote team management'] },
    ],
    outcomes: ['שיפור תהליכי ניהול', 'קיצור זמן פיתוח', 'החלטות מבוססות נתונים', 'שיפור תקשורת'],
    outcomesEn: ['Improved management processes', 'Reduced development time', 'Data-driven decisions', 'Improved communication'],
    tools: ['ChatGPT', 'Jira AI', 'Notion AI', 'Miro AI', 'Linear'],
  },
  {
    id: 'developers',
    title: 'הכשרת AI למחלקת פיתוח',
    titleEn: 'AI Training for Development Teams',
    audience: 'מפתחים',
    audienceEn: 'Developers',
    hours: '36',
    level: 'מתקדמים',
    levelEn: 'Advanced',
    image: `${CDN}/df766e802_________ai_____________pcmer0eadzd5v32fb1re_1_0986f3c0.png`,
    color: 'from-green-500 to-emerald-600',
    modules: [
      { title: 'AI-Assisted Coding', duration: '10 שעות', topics: ['GitHub Copilot', 'Code review עם AI', 'Debugging אוטומטי'] },
      { title: 'בניית אפליקציות AI', duration: '10 שעות', topics: ['OpenAI API', 'LangChain', 'RAG ו-Vector DBs'] },
      { title: 'No-Code ו-Low-Code', duration: '8 שעות', topics: ['Make/Zapier', 'Bubble', 'Webflow AI'] },
      { title: 'DevOps ו-AI', duration: '8 שעות', topics: ['CI/CD עם AI', 'ניטור אוטומטי', 'אבטחה עם AI'] },
    ],
    modulesEn: [
      { title: 'AI-Assisted Coding', duration: '10 hours', topics: ['GitHub Copilot', 'Code review with AI', 'Automated debugging'] },
      { title: 'Building AI Applications', duration: '10 hours', topics: ['OpenAI API', 'LangChain', 'RAG and Vector DBs'] },
      { title: 'No-Code and Low-Code', duration: '8 hours', topics: ['Make/Zapier', 'Bubble', 'Webflow AI'] },
      { title: 'DevOps and AI', duration: '8 hours', topics: ['CI/CD with AI', 'Automated monitoring', 'Security with AI'] },
    ],
    outcomes: ['הגדלת מהירות פיתוח', 'שיפור איכות קוד', 'בניית מוצרי AI', 'אוטומציה של תהליכים'],
    outcomesEn: ['Increased development speed', 'Improved code quality', 'Building AI products', 'Process automation'],
    tools: ['GitHub Copilot', 'Cursor', 'OpenAI API', 'LangChain', 'Vercel AI'],
  },
  {
    id: 'finance',
    title: 'הכשרת AI לחשבונאות ופיננסים',
    titleEn: 'AI Training for Accounting & Finance',
    audience: 'אנשי כספים וחשבונאות',
    audienceEn: 'Finance & Accounting Professionals',
    hours: '28',
    level: 'בינוני',
    levelEn: 'Intermediate',
    image: `${CDN}/a00800906_______________ai______________1ztf6h7ulzz1cg0t1nwp_1_450c2a58.png`,
    color: 'from-orange-500 to-red-600',
    modules: [
      { title: 'AI בניתוח פיננסי', duration: '7 שעות', topics: ['ניתוח דוחות כספיים', 'חיזוי תזרים מזומנים', 'ניתוח סיכונים'] },
      { title: 'אוטומציה חשבונאית', duration: '7 שעות', topics: ['הנהלת חשבונות אוטומטית', 'עיבוד חשבוניות', 'דיווח אוטומטי'] },
      { title: 'Excel ו-AI', duration: '7 שעות', topics: ['Excel Copilot', 'נוסחאות מתקדמות', 'ויזואליזציה של נתונים'] },
      { title: 'ביקורת ותאימות', duration: '7 שעות', topics: ['זיהוי חריגות', 'ניהול סיכוני עמידה', 'דיווח רגולטורי'] },
    ],
    modulesEn: [
      { title: 'AI in Financial Analysis', duration: '7 hours', topics: ['Financial statement analysis', 'Cash flow forecasting', 'Risk analysis'] },
      { title: 'Accounting Automation', duration: '7 hours', topics: ['Automated bookkeeping', 'Invoice processing', 'Automated reporting'] },
      { title: 'Excel and AI', duration: '7 hours', topics: ['Excel Copilot', 'Advanced formulas', 'Data visualization'] },
      { title: 'Audit and Compliance', duration: '7 hours', topics: ['Anomaly detection', 'Compliance risk management', 'Regulatory reporting'] },
    ],
    outcomes: ['חיסכון בזמן עיבוד', 'הפחתת שגיאות', 'ניתוח מעמיק יותר', 'עמידה ברגולציה'],
    outcomesEn: ['Processing time savings', 'Error reduction', 'Deeper analysis', 'Regulatory compliance'],
    tools: ['Excel Copilot', 'ChatGPT', 'Power BI AI', 'QuickBooks AI', 'Sage AI'],
  },
  {
    id: 'sales',
    title: 'הכשרת AI למנהלי מכירות',
    titleEn: 'AI Training for Sales Managers',
    audience: 'אנשי מכירות',
    audienceEn: 'Sales Professionals',
    hours: '24',
    level: 'בינוני',
    levelEn: 'Intermediate',
    image: `https://d2xsxph8kpxj0f.cloudfront.net/310519663445418346/oDFneUKwvw2xJYXYaumUdB/ai-sales-training-WwFySQp2o7ZLLoVoh8dAo3.webp`,
    color: 'from-slate-500 to-slate-700',
    modules: [
      { title: 'AI בתהליך המכירה', duration: '6 שעות', topics: ['חיפוש לידים עם AI', 'כתיבת הצעות מחיר', 'מעקב אחר לקוחות'] },
      { title: 'CRM ו-AI', duration: '6 שעות', topics: ['Salesforce AI', 'HubSpot AI', 'ניהול פייפליין'] },
      { title: 'תקשורת מכירתית', duration: '6 שעות', topics: ['כתיבת אימיילים', 'סקריפטים למכירה', 'מצגות מכירה'] },
      { title: 'ניתוח ביצועי מכירות', duration: '6 שעות', topics: ['דוחות מכירות', 'חיזוי הכנסות', 'אופטימיזציה'] },
    ],
    modulesEn: [
      { title: 'AI in the Sales Process', duration: '6 hours', topics: ['Lead generation with AI', 'Writing proposals', 'Customer follow-up'] },
      { title: 'CRM and AI', duration: '6 hours', topics: ['Salesforce AI', 'HubSpot AI', 'Pipeline management'] },
      { title: 'Sales Communication', duration: '6 hours', topics: ['Email writing', 'Sales scripts', 'Sales presentations'] },
      { title: 'Sales Performance Analysis', duration: '6 hours', topics: ['Sales reports', 'Revenue forecasting', 'Optimization'] },
    ],
    outcomes: ['הגדלת שיעורי המרה', 'קיצור מחזור מכירות', 'שיפור חוויית לקוח', 'הגדלת הכנסות'],
    outcomesEn: ['Increased conversion rates', 'Shorter sales cycle', 'Improved customer experience', 'Revenue growth'],
    tools: ['ChatGPT', 'Salesforce AI', 'HubSpot AI', 'Apollo AI', 'Gong'],
  },
];

interface PublicCourse {
  title: string;
  titleEn: string;
  desc: string;
  descEn: string;
  duration: string;
  durationEn: string;
  level: string;
  levelEn: string;
  color: string;
  icon: React.ElementType;
  ministrySupervised?: boolean;
  externalLink?: string;
}

const publicCourses: PublicCourse[] = [
  {
    title: 'AI לעסקים',
    titleEn: 'AI for Business',
    desc: 'קורס מקיף לשימוש ב-AI לשיפור תהליכים עסקיים. מתאים לכל בעל עסק ויזם.',
    descEn: 'A comprehensive course for using AI to improve business processes. Suitable for all business owners and entrepreneurs.',
    duration: '8 שבועות',
    durationEn: '8 weeks',
    level: 'מתחילים',
    levelEn: 'Beginners',
    color: 'from-blue-700 to-blue-900',
    icon: BookOpen,
  },
  {
    title: 'פרומפטינג מתקדם',
    titleEn: 'Advanced Prompting',
    desc: 'שליטה מלאה בכתיבת פרומפטים יעילים לכל מטרה. הדרך לתוצאות מדויקות מ-AI.',
    descEn: 'Full mastery of writing effective prompts for any purpose. The way to get precise results from AI.',
    duration: '4 שבועות',
    durationEn: '4 weeks',
    level: 'בינוני',
    levelEn: 'Intermediate',
    color: 'from-blue-700 to-slate-500',
    icon: Star,
  },
  {
    title: 'AI לשיווק',
    titleEn: 'AI for Marketing',
    desc: 'שימוש ב-AI לשיפור קמפיינים, יצירת תוכן ואוטומציה שיווקית.',
    descEn: 'Using AI to improve campaigns, content creation, and marketing automation.',
    duration: '6 שבועות',
    durationEn: '6 weeks',
    level: 'בינוני',
    levelEn: 'Intermediate',
    color: 'from-emerald-500 to-teal-600',
    icon: Award,
  },
  {
    title: 'אוטומציה עם AI',
    titleEn: 'Automation with AI',
    desc: 'בניית תהליכי אוטומציה חכמים לעסק עם Make, Zapier וכלי AI מתקדמים.',
    descEn: 'Building smart automation processes for business with Make, Zapier, and advanced AI tools.',
    duration: '6 שבועות',
    durationEn: '6 weeks',
    level: 'מתקדם',
    levelEn: 'Advanced',
    color: 'from-orange-500 to-red-600',
    icon: CheckCircle,
  },
  {
    title: 'No-Code AI',
    titleEn: 'No-Code AI',
    desc: 'בניית אפליקציות ואוטומציות ללא קוד עם כלי AI חדשניים.',
    descEn: 'Building applications and automations without code using innovative AI tools.',
    duration: '5 שבועות',
    durationEn: '5 weeks',
    level: 'מתחילים',
    levelEn: 'Beginners',
    color: 'from-blue-500 to-indigo-600',
    icon: Building,
  },
  {
    title: 'מטמיע מערכות AI',
    titleEn: 'AI Systems Implementer',
    desc: 'הקורס הרשמי היחיד בישראל להטמעת מערכות AI בארגונים. הכשרה מקצועית בפיקוח משרד העבודה.',
    descEn: 'The only official course in Israel for AI systems implementation in organizations. Professional training supervised by the Ministry of Labor.',
    duration: '3 חודשים',
    durationEn: '3 months',
    level: 'מתקדם',
    levelEn: 'Advanced',
    color: 'from-yellow-500 to-orange-600',
    icon: Award,
    ministrySupervised: true,
  },
  {
    title: 'SOC Analyst – CyberGo',
    titleEn: 'SOC Analyst – CyberGo',
    desc: 'קורס מקצועי להכשרת אנליסטים בתחום אבטחת סייבר. תכנית מקיפה הכוללת ניטור, זיהוי איומים וניתוח אירועי אבטחה.',
    descEn: 'Professional course for training cybersecurity analysts. A comprehensive program including monitoring, threat detection, and security incident analysis.',
    duration: '6 חודשים',
    durationEn: '6 months',
    level: 'מתחילים',
    levelEn: 'Beginners',
    color: 'from-cyan-600 to-blue-700',
    icon: Building,
    externalLink: 'https://cybergo.co.il/',
  },
];

export default function Academy() {
  const { lang } = useLanguage();
  const isRtl = lang === 'he';
  const dir = isRtl ? 'rtl' : 'ltr';
  const [selectedProgram, setSelectedProgram] = useState<TrainingProgram | null>(null);
  const [expandedModule, setExpandedModule] = useState<number | null>(null);

  const getLevelColor = (level: string) => {
    if (level === 'בינוני' || level === 'Intermediate') return 'bg-blue-100 text-blue-700 border border-blue-200';
    if (level === 'מתקדמים' || level === 'Advanced') return 'bg-blue-100 text-blue-700 border border-blue-200';
    return 'bg-blue-100 text-blue-800 border border-blue-300';
  };

  return (
    <div dir={dir} className="min-h-screen">
      {/* Hero + Training Programs — unified single section */}
      <section className="relative overflow-hidden flex flex-col justify-center" style={{ minHeight: '100svh' }}>
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <motion.div animate={{ x: [0, 60, 0], y: [0, 30, 0] }} transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-10 left-10 w-72 h-72 bg-blue-200/40 rounded-full blur-3xl" />
        <motion.div animate={{ x: [0, -40, 0], y: [0, -20, 0] }} transition={{ duration: 12, repeat: Infinity, delay: 2 }}
          className="absolute bottom-10 right-10 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
          {/* Hero row: text left, 3D object right */}
          <div className="flex flex-col lg:flex-row items-center gap-8 mb-12">
            {/* Text */}
            <div className="flex-1 text-center lg:text-right">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex mb-4">
                <div className="bg-white border border-gray-200 px-4 py-2 rounded-full">
                  <span className="text-sm font-semibold text-blue-700">{isRtl ? 'מרכז הכשרות AI' : 'AI Training Center'}</span>
                </div>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
                className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                {isRtl ? 'מסלולי ההכשרה שלנו' : 'Our Training Programs'}
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg text-gray-600 mb-6 max-w-xl mx-auto lg:mx-0">
                {isRtl
                  ? 'הכשרות מותאמות לכל מחלקה ותפקיד. בנינו תוכניות ייחודיות שמביאות תוצאות מדידות לארגון שלכם.'
                  : 'Training tailored for every department and role. We built unique programs that deliver measurable results for your organization.'}
              </motion.p>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                className="flex items-center justify-center lg:justify-end gap-4 flex-wrap">
                <div className="bg-white border border-gray-200 px-4 py-2 rounded-full flex items-center gap-2">
                  <Award className="w-4 h-4" style={{ color: '#F59E0B' }} />
                  <span className="text-sm text-gray-600">{isRtl ? 'קורס מוסמך' : 'Certified Course'}</span>
                </div>
                <div className="bg-white border border-gray-200 px-4 py-2 rounded-full flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-bold" style={{ color: '#F59E0B' }}>{isRtl ? '+250 בוגרים' : '+250 Graduates'}</span>
                </div>
              </motion.div>
            </div>

            {/* 3D Animated Education Object */}
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}
              className="flex-shrink-0 flex items-center justify-center" style={{ width: 'min(220px, 60vw)', height: 'min(220px, 60vw)' }}>
              <div style={{ perspective: '800px', width: '220px', height: '220px' }}>
                {/* Outer orbit ring */}
                <div style={{
                  position: 'absolute', width: '220px', height: '220px',
                  borderRadius: '50%',
                  border: '2px solid rgba(139,92,246,0.35)',
                  animation: 'academy-orbit1 8s linear infinite',
                  transformStyle: 'preserve-3d',
                  transform: 'rotateX(70deg)',
                }} />
                {/* Inner orbit ring */}
                <div style={{
                  position: 'absolute', width: '160px', height: '160px',
                  top: '30px', left: '30px',
                  borderRadius: '50%',
                  border: '2px solid rgba(75,108,183,0.4)',
                  animation: 'academy-orbit2 5s linear infinite reverse',
                  transformStyle: 'preserve-3d',
                  transform: 'rotateX(70deg) rotateZ(45deg)',
                }} />

                {/* Central 3D book */}
                <div style={{
                  position: 'absolute', top: '60px', left: '60px',
                  width: '100px', height: '100px',
                  animation: 'academy-float 4s ease-in-out infinite',
                  transformStyle: 'preserve-3d',
                }}>
                  {/* Book body */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(135deg, #2D3A6B 0%, #4B6CB7 50%, #8899BB 100%)',
                    borderRadius: '6px 14px 14px 6px',
                    boxShadow: '0 20px 50px rgba(45,58,107,0.5), 0 4px 15px rgba(45,58,107,0.3)',
                  }} />
                  {/* Book spine */}
                  <div style={{
                    position: 'absolute', top: 0, bottom: 0, left: 0, width: '14px',
                    background: 'linear-gradient(180deg, #5b21b6, #2D3A6B)',
                    borderRadius: '6px 0 0 6px',
                    boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.2)',
                  }} />
                  {/* Book pages lines */}
                  {[0,1,2,3].map(i => (
                    <div key={i} style={{
                      position: 'absolute',
                      top: `${22 + i * 14}px`, left: '22px', right: '10px', height: '3px',
                      background: 'rgba(255,255,255,0.3)',
                      borderRadius: '2px',
                    }} />
                  ))}
                  {/* AI text on book */}
                  <div style={{
                    position: 'absolute', top: '50%', left: '55%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '22px', fontWeight: 900, color: 'white',
                    textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                    letterSpacing: '-1px',
                  }}>AI</div>
                  {/* Specular shine */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 45%)',
                    borderRadius: '6px 14px 14px 6px',
                  }} />
                </div>

                {/* Orbiting dot 1 — graduation cap */}
                <div style={{
                  position: 'absolute', top: '0px', left: '100px',
                  width: '28px', height: '28px',
                  background: 'linear-gradient(135deg, #4B6CB7, #2D3A6B)',
                  borderRadius: '50%',
                  boxShadow: '0 4px 12px rgba(75,108,183,0.6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '14px',
                  animation: 'academy-orbit1 8s linear infinite',
                  transformOrigin: '-86px 110px',
                }}>🎓</div>

                {/* Orbiting dot 2 — star */}
                <div style={{
                  position: 'absolute', top: '75px', left: '185px',
                  width: '22px', height: '22px',
                  background: 'linear-gradient(135deg, #8899BB, #4B6CB7)',
                  borderRadius: '50%',
                  boxShadow: '0 4px 10px rgba(136,153,187,0.6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '11px',
                  animation: 'academy-orbit2 5s linear infinite reverse',
                  transformOrigin: '-75px 35px',
                }}>⭐</div>

                {/* Orbiting dot 3 — lightbulb */}
                <div style={{
                  position: 'absolute', top: '180px', left: '90px',
                  width: '24px', height: '24px',
                  background: 'linear-gradient(135deg, #4B6CB7, #2D3A6B)',
                  borderRadius: '50%',
                  boxShadow: '0 4px 10px rgba(139,92,246,0.6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '12px',
                  animation: 'academy-orbit1 8s linear infinite',
                  animationDelay: '-4s',
                  transformOrigin: '20px -70px',
                }}>💡</div>
              </div>
            </motion.div>
          </div>

          {/* Training Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainingPrograms.map((program, idx) => (
              <div
                key={program.id}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden hover:border-blue-300 transition-all group cursor-pointer"
                onClick={() => setSelectedProgram(program)}
              >
                {/* Card Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={program.image}
                    alt={isRtl ? program.title : program.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/20 to-transparent" />

                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors leading-snug">
                    {isRtl ? program.title : program.titleEn}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-5">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-blue-700" />
                      <span>{isRtl ? program.audience : program.audienceEn}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span>{program.hours} {isRtl ? 'שעות' : 'hours'}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="flex-1 btn-primary text-sm py-2.5 text-center"
                      onClick={(e) => { e.stopPropagation(); setSelectedProgram(program); }}
                    >
                      {isRtl ? 'צפה בסילבוס' : 'View Syllabus'}
                    </button>
                    <Link href="/contact">
                      <button
                        className="flex-1 bg-white border border-gray-200 text-sm py-2.5 text-center text-blue-700 hover:text-gray-900 hover:bg-blue-100 transition-all rounded-lg"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {isRtl ? 'לפרטים' : 'Details'}
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Public Courses Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-100/30 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px", amount: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              {isRtl ? 'קורסים פתוחים לציבור' : 'Public Courses'}
            </h2>
            <p className="text-gray-500 text-lg">
              {isRtl ? 'קורסים מקצועיים לאנשים פרטיים ועסקים קטנים' : 'Professional courses for individuals and small businesses'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {publicCourses.map((course, i) => {
              const Icon = course.icon;
              return (
                <div
                  key={i}
                  className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 hover:border-blue-300 transition-all group"
                >
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${course.color} mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                    {isRtl ? course.title : course.titleEn}
                  </h3>
                  <p className="text-gray-500 mb-4 text-sm leading-relaxed">
                    {isRtl ? course.desc : course.descEn}
                  </p>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{isRtl ? course.duration : course.durationEn}</span>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getLevelColor(isRtl ? course.level : course.levelEn)}`}>
                      {isRtl ? course.level : course.levelEn}
                    </span>
                  </div>
                  {course.ministrySupervised && (
                    <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg bg-yellow-50 border border-yellow-500/30">
                      <Award className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                      <span className="text-xs text-yellow-700 font-medium">
                        {isRtl ? 'בפיקוח משרד העבודה' : 'Supervised by Ministry of Labor'}
                      </span>
                    </div>
                  )}
                  <div className="w-full">
                    {course.externalLink ? (
                      <a href={course.externalLink} target="_blank" rel="noopener noreferrer" className="block w-full">
                        <GradientButton size="sm" className="w-full justify-center">
                          {isRtl ? 'הירשם לקורס' : 'Enroll Now'}
                        </GradientButton>
                      </a>
                    ) : (
                      <GradientButton href="/contact" size="sm" className="w-full justify-center">
                        {isRtl ? 'הירשם לקורס' : 'Enroll Now'}
                      </GradientButton>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Corporate Training CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px", amount: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img src={AI_TRAINING_IMAGE} alt="Corporate Training" className="rounded-2xl w-full glow-purple" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: isRtl ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px", amount: 0 }}
              transition={{ duration: 0.8 }}
              className={isRtl ? 'text-right' : 'text-left'}
            >
              <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-blue-700 to-slate-500 mb-6">
                <Building className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                {isRtl ? 'הכשרה ארגונית מותאמת אישית' : 'Customized Corporate Training'}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {isRtl
                  ? 'אנו בונים תוכניות הכשרה מותאמות לצרכים הספציפיים של הארגון שלכם. נגיע אליכם, נלמד את התהליכים שלכם ונבנה הכשרה שמביאה תוצאות מדידות.'
                  : 'We build training programs tailored to your organization\'s specific needs. We\'ll come to you, learn your processes, and build training that delivers measurable results.'}
              </p>
              <GradientButton href="/contact" size="md">
                {isRtl ? 'צרו קשר לפרטים' : 'Contact Us for Details'}
              </GradientButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Syllabus Modal */}
      <AnimatePresence>
        {selectedProgram && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => { setSelectedProgram(null); setExpandedModule(null); }}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white border border-gray-200 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className={`sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-200 p-6 flex items-start justify-between gap-4 z-10`}>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                    {isRtl ? selectedProgram.title : selectedProgram.titleEn}
                  </h2>
                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    <span className="flex items-center gap-1.5 text-sm text-gray-500">
                      <Users className="w-4 h-4 text-blue-700" />
                      {isRtl ? selectedProgram.audience : selectedProgram.audienceEn}
                    </span>
                    <span className="flex items-center gap-1.5 text-sm text-gray-500">
                      <Clock className="w-4 h-4 text-blue-600" />
                      {selectedProgram.hours} {isRtl ? 'שעות הכשרה' : 'training hours'}
                    </span>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getLevelColor(isRtl ? selectedProgram.level : selectedProgram.levelEn)}`}>
                      {isRtl ? selectedProgram.level : selectedProgram.levelEn}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => { setSelectedProgram(null); setExpandedModule(null); }}
                  className="p-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-100 transition-colors flex-shrink-0"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Modules */}
                <div>
                  <h3 className="text-lg font-bold text-blue-700 mb-4">
                    {isRtl ? '📋 מודולי ההכשרה' : '📋 Training Modules'}
                  </h3>
                  <div className="space-y-3">
                    {(isRtl ? selectedProgram.modules : selectedProgram.modulesEn).map((module, i) => (
                      <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                        <button
                          className="w-full flex items-center justify-between p-4 text-right hover:bg-white/5 transition-colors"
                          onClick={() => setExpandedModule(expandedModule === i ? null : i)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                              {i + 1}
                            </div>
                            <div className={isRtl ? 'text-right' : 'text-left'}>
                              <p className="font-semibold text-gray-900 text-sm">{module.title}</p>
                              <p className="text-xs text-gray-500">{module.duration}</p>
                            </div>
                          </div>
                          {expandedModule === i ? (
                            <ChevronUp className="w-4 h-4 text-blue-700 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
                          )}
                        </button>
                        <AnimatePresence>
                          {expandedModule === i && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 pb-4 border-t border-gray-100">
                                <ul className="mt-3 space-y-2">
                                  {module.topics.map((topic, j) => (
                                    <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                                      {topic}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tools */}
                <div>
                  <h3 className="text-lg font-bold text-blue-800 mb-3">
                    {isRtl ? '🛠️ כלים שנלמד' : '🛠️ Tools We Cover'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProgram.tools.map((tool, i) => (
                      <span key={i} className="px-3 py-1.5 bg-blue-100 border border-blue-300 rounded-full text-sm text-blue-700 border border-blue-300">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Outcomes */}
                <div>
                  <h3 className="text-lg font-bold text-emerald-700 mb-3">
                    {isRtl ? '✅ מה תקבלו בסיום?' : '✅ What You\'ll Gain'}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {(isRtl ? selectedProgram.outcomes : selectedProgram.outcomesEn).map((outcome, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        {outcome}
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-2">
                  <div className="w-full">
                    <GradientButton href="/contact" size="md" className="w-full justify-center" onClick={() => setSelectedProgram(null)}>
                      {isRtl ? 'מעוניינים בהכשרה? צרו קשר' : 'Interested? Contact Us'}
                    </GradientButton>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
