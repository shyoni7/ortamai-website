import React, { useState } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Users, Award, BookOpen, X, ChevronDown, ChevronUp, Building, Star, CheckCircle, ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import SEO from '@/components/SEO';
import { academyServiceSchema } from '@/lib/seoSchemas';
import '@/styles/academy.css';

const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663445418346/oDFneUKwvw2xJYXYaumUdB';
const AI_TRAINING_IMAGE = `${CDN}/81fe03d01_create_a_professional_and_modern_image_for_a_website_that_promotes_ai_training_programs_the_image_s_y01604j7g7gqe2rbe6tu_0_2b7c34bf.png`;
const MINISTRY_LOGO = `${CDN}/73e8a1f5d_images_f41438b1.png`;
const HERO_IMAGE = `${CDN}/a00800906_______________ai______________1ztf6h7ulzz1cg0t1nwp_1_450c2a58.png`;

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
    color: 'from-gray-900 to-gray-900',
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
    color: 'from-gray-900 to-gray-900',
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
    color: 'from-[#1A1A22] to-[#111116]',
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
    color: 'from-[#2A2A32] to-[#1A1A22]',
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
    color: 'from-[#08080C] to-[#1A1A22]',
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
    color: 'from-[#1A1A22] to-[#111116]',
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
    color: 'from-[#2A2A32] to-[#08080C]',
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
    color: 'from-gray-900 to-gray-900',
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
    color: 'from-gray-900 to-gray-900',
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
    color: 'from-gray-900 to-gray-900',
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
    color: 'from-[#1A1A22] to-[#111116]',
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
    color: 'from-[#2A2A32] to-[#08080C]',
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
    color: 'from-[#08080C] to-[#1A1A22]',
    icon: Building,
  },
  {
    title: 'מטמיע מערכות AI',
    titleEn: 'AI Systems Implementer',
    desc: 'את הקורס הרשמי של משרד העבודה למטמיעי מערכות AI כתבנו ובנינו ב-ORTAM AI. הכשרה מקצועית להטמעת מערכות AI בארגונים, בפיקוח משרד העבודה.',
    descEn: 'ORTAM AI wrote and built the Ministry of Labor’s official course for AI systems implementers. Professional training in implementing AI systems in organizations, supervised by the Ministry of Labor.',
    duration: '3 חודשים',
    durationEn: '3 months',
    level: 'מתקדם',
    levelEn: 'Advanced',
    color: 'from-[#2A2A32] to-[#1A1A22]',
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
    color: 'from-cyan-600 to-gray-900',
    icon: Building,
    externalLink: 'https://cybergo.co.il/',
  },
];

export default function Academy() {
  const { lang } = useLanguage();
  const isRtl = lang === 'he';
  const dir = isRtl ? 'rtl' : 'ltr';
  const Arrow = isRtl ? ArrowLeft : ArrowRight;
  const [selectedProgram, setSelectedProgram] = useState<TrainingProgram | null>(null);
  const [expandedModule, setExpandedModule] = useState<number | null>(null);

  const closeModal = () => { setSelectedProgram(null); setExpandedModule(null); };

  return (
    <>
    <SEO
      title={isRtl ? 'קורסי AI לארגונים ועסקים | מרכז הכשרות ORTAM AI' : 'AI Courses for Organizations & Businesses | ORTAM AI Academy'}
      description={isRtl
        ? 'הכשרות AI מעשיות לארגונים, מנהלים, צוותי שיווק, פיננסים ומשאבי אנוש. קורס AI למורים, בינה מלאכותית בחינוך, הכשרת AI לעולם העבודה החדש.'
        : 'Practical AI training for organizations, managers, marketing, finance, and HR teams. AI courses for teachers, AI in education, and workforce upskilling.'}
      canonical="/academy"
      schema={academyServiceSchema}
    />
    <div dir={dir} className="academy-v2 min-h-screen">
      {/* Hero */}
      <section aria-labelledby="academy-title" style={{ background: 'var(--h-dark)' }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 md:py-24 text-start">
          <h1
            id="academy-title"
            className="h-rise text-white font-extrabold leading-[1.05] max-w-4xl"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)' }}
          >
            {isRtl ? 'מסלולי ההכשרה שלנו' : 'Our Training Programs'}
          </h1>
          <p className="h-rise h-rise-2 mt-5 md:mt-7 text-lg md:text-xl leading-relaxed max-w-[60ch]" style={{ color: 'var(--h-on-dark)' }}>
            {isRtl
              ? 'הכשרות מותאמות לכל מחלקה ותפקיד. בנינו תוכניות ייחודיות שמביאות תוצאות מדידות לארגון שלכם.'
              : 'Training tailored for every department and role. We built unique programs that deliver measurable results for your organization.'}
          </p>
          <ul className="h-rise h-rise-3 mt-7 flex flex-wrap gap-x-6 gap-y-3" style={{ color: 'var(--h-on-dark)' }}>
            <li className="flex items-center gap-2 text-base">
              <Award className="w-5 h-5 shrink-0" style={{ color: 'var(--h-accent)' }} aria-hidden="true" />
              {isRtl ? 'קורס מוסמך' : 'Certified Course'}
            </li>
            <li className="flex items-center gap-2 text-base font-bold">
              <Users className="w-5 h-5 shrink-0" style={{ color: 'var(--h-accent)' }} aria-hidden="true" />
              <span>{isRtl ? 'כ-300 בוגרים' : '~300 graduates'}</span>
            </li>
          </ul>
          <div className="h-rise h-rise-3 mt-9 md:mt-10 flex flex-col sm:flex-row gap-3">
            <Link href="/contact" className="h-btn h-btn-accent">
              {isRtl ? 'צרו קשר לפרטים' : 'Contact Us for Details'}
              <Arrow size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Training programs */}
      <section aria-label={isRtl ? 'מסלולי ההכשרה' : 'Training programs'} className="py-16 md:py-24" style={{ background: 'var(--h-ground)' }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-7">
            {trainingPrograms.map((program) => (
              <article
                key={program.id}
                className="academy-card academy-program flex flex-col overflow-hidden cursor-pointer"
                onClick={() => setSelectedProgram(program)}
              >
                <div className="aspect-[2/1] sm:aspect-[16/10] overflow-hidden" style={{ background: 'var(--h-ground)' }}>
                  <img
                    src={program.image}
                    alt={isRtl ? program.title : program.titleEn}
                    loading="lazy"
                    className="academy-program-img w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 md:p-6 flex flex-col flex-1 text-start">
                  <h3 className="text-xl font-bold leading-snug" style={{ color: 'var(--h-ink)' }}>
                    {isRtl ? program.title : program.titleEn}
                  </h3>
                  <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-sm" style={{ color: 'var(--h-ink-2)' }}>
                    <li className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>{isRtl ? program.audience : program.audienceEn}</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>{program.hours} {isRtl ? 'שעות' : 'hours'}</span>
                    </li>
                  </ul>
                  <div className="mt-auto pt-6 flex items-center justify-between gap-3 flex-wrap">
                    <button
                      type="button"
                      className="h-btn academy-btn-dark"
                      onClick={(e) => { e.stopPropagation(); setSelectedProgram(program); }}
                    >
                      {isRtl ? 'צפה בסילבוס' : 'View Syllabus'}
                    </button>
                    <Link
                      href="/contact"
                      className="h-link academy-text-link inline-flex items-center gap-2 font-bold"
                      onClick={(e: React.MouseEvent) => e.stopPropagation()}
                    >
                      {isRtl ? 'לפרטים' : 'Details'}
                      <Arrow size={16} className="h-link-arrow" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Public courses */}
      <section aria-labelledby="public-title" className="py-16 md:py-24" style={{ background: 'var(--h-paper)' }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 id="public-title" className="text-3xl md:text-5xl font-bold max-w-3xl" style={{ color: 'var(--h-ink)' }}>
            {isRtl ? 'קורסים פתוחים לציבור' : 'Public Courses'}
          </h2>
          <p className="mt-4 text-base md:text-lg leading-relaxed max-w-[65ch]" style={{ color: 'var(--h-ink-2)' }}>
            {isRtl ? 'קורסים מקצועיים לאנשים פרטיים ועסקים קטנים' : 'Professional courses for individuals and small businesses'}
          </p>

          <div className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
            {publicCourses.map((course, i) => {
              const Icon = course.icon;
              const isCyber = !!course.externalLink;
              return (
                <article
                  key={i}
                  className={`academy-card academy-course flex flex-col p-6 md:p-7 text-start ${isCyber ? 'is-cyber' : ''}`}
                >
                  <div className="academy-icon-tile" aria-hidden="true">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="mt-5 text-xl md:text-2xl font-bold leading-snug" style={{ color: 'var(--h-ink)' }}>
                    {isRtl ? course.title : course.titleEn}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed max-w-[65ch]" style={{ color: 'var(--h-ink-2)' }}>
                    {isRtl ? course.desc : course.descEn}
                  </p>
                  <div className="mt-5 flex items-center justify-between gap-3 flex-wrap">
                    <span className="flex items-center gap-2 text-sm" style={{ color: 'var(--h-ink-2)' }}>
                      <Clock className="w-4 h-4 shrink-0" aria-hidden="true" />
                      {isRtl ? course.duration : course.durationEn}
                    </span>
                    <span className="academy-pill">
                      {isRtl ? course.level : course.levelEn}
                    </span>
                  </div>
                  {course.ministrySupervised && (
                    <p className="academy-note mt-4">
                      <Award className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>{isRtl ? 'בפיקוח משרד העבודה' : 'Supervised by Ministry of Labor'}</span>
                    </p>
                  )}
                  <div className="mt-auto pt-6">
                    {course.externalLink ? (
                      <a
                        href={course.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-btn academy-btn-cyber w-full"
                      >
                        {isRtl ? 'הירשם לקורס' : 'Enroll Now'}
                        <ExternalLink size={16} aria-hidden="true" />
                      </a>
                    ) : (
                      <Link href="/courses" className="h-btn academy-btn-dark w-full">
                        {isRtl ? 'הירשם לקורס' : 'Enroll Now'}
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Corporate training CTA */}
      <section aria-labelledby="corporate-title" style={{ background: 'var(--h-dark)' }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6">
            <img
              src={AI_TRAINING_IMAGE}
              alt="Corporate Training"
              loading="lazy"
              className="w-full aspect-[16/10] object-cover rounded-[20px]"
            />
          </div>
          <div className="lg:col-span-6 text-start">
            <h2 id="corporate-title" className="text-white font-extrabold leading-[1.08] max-w-[20ch]" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)' }}>
              {isRtl ? 'הכשרה ארגונית מותאמת אישית' : 'Customized Corporate Training'}
            </h2>
            <p className="mt-5 text-lg leading-relaxed max-w-[60ch]" style={{ color: 'var(--h-on-dark)' }}>
              {isRtl
                ? 'אנו בונים תוכניות הכשרה מותאמות לצרכים הספציפיים של הארגון שלכם. נגיע אליכם, נלמד את התהליכים שלכם ונבנה הכשרה שמביאה תוצאות מדידות.'
                : 'We build training programs tailored to your organization\'s specific needs. We\'ll come to you, learn your processes, and build training that delivers measurable results.'}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="h-btn h-btn-accent">
                {isRtl ? 'צרו קשר לפרטים' : 'Contact Us for Details'}
                <Arrow size={18} aria-hidden="true" />
              </Link>
            </div>
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
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
            onClick={closeModal}
          >
            <div className="absolute inset-0" style={{ background: 'rgba(42, 18, 56,0.62)' }} />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="syllabus-title"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="academy-modal relative w-full sm:max-w-2xl max-h-[88svh] overflow-y-auto text-start"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="academy-modal-head sticky top-0 z-10 p-5 md:p-6 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h2 id="syllabus-title" className="text-2xl md:text-3xl font-bold leading-tight" style={{ color: 'var(--h-ink)' }}>
                    {isRtl ? selectedProgram.title : selectedProgram.titleEn}
                  </h2>
                  <div className="flex items-center gap-x-4 gap-y-2 mt-3 flex-wrap text-sm" style={{ color: 'var(--h-ink-2)' }}>
                    <span className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 shrink-0" aria-hidden="true" />
                      {isRtl ? selectedProgram.audience : selectedProgram.audienceEn}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 shrink-0" aria-hidden="true" />
                      {selectedProgram.hours} {isRtl ? 'שעות הכשרה' : 'training hours'}
                    </span>
                    <span className="academy-pill">
                      {isRtl ? selectedProgram.level : selectedProgram.levelEn}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closeModal}
                  aria-label={isRtl ? 'סגירה' : 'Close'}
                  className="academy-icon-btn shrink-0"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              <div className="p-5 md:p-6 space-y-8">
                {/* Modules */}
                <div>
                  <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--h-ink)' }}>
                    {isRtl ? '📋 מודולי ההכשרה' : '📋 Training Modules'}
                  </h3>
                  <ol className="academy-modules">
                    {(isRtl ? selectedProgram.modules : selectedProgram.modulesEn).map((module, i) => (
                      <li key={i}>
                        <button
                          type="button"
                          className="academy-module-btn w-full flex items-center justify-between gap-3 text-start"
                          aria-expanded={expandedModule === i}
                          onClick={() => setExpandedModule(expandedModule === i ? null : i)}
                        >
                          <span className="flex items-center gap-3 min-w-0">
                            <span className="academy-module-num" aria-hidden="true">{i + 1}</span>
                            <span className="min-w-0">
                              <span className="block font-semibold text-base" style={{ color: 'var(--h-ink)' }}>{module.title}</span>
                              <span className="block text-sm" style={{ color: 'var(--h-ink-2)' }}>{module.duration}</span>
                            </span>
                          </span>
                          {expandedModule === i ? (
                            <ChevronUp className="w-5 h-5 shrink-0" style={{ color: 'var(--h-ink)' }} aria-hidden="true" />
                          ) : (
                            <ChevronDown className="w-5 h-5 shrink-0" style={{ color: 'var(--h-ink-2)' }} aria-hidden="true" />
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
                              <ul className="academy-topics">
                                {module.topics.map((topic, j) => (
                                  <li key={j} className="flex items-center gap-2.5 text-base" style={{ color: 'var(--h-ink-2)' }}>
                                    <span className="inline-block w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--h-accent)' }} aria-hidden="true" />
                                    {topic}
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Tools */}
                <div>
                  <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--h-ink)' }}>
                    {isRtl ? '🛠️ כלים שנלמד' : '🛠️ Tools We Cover'}
                  </h3>
                  <ul className="flex flex-wrap gap-2">
                    {selectedProgram.tools.map((tool, i) => (
                      <li key={i} className="academy-pill" dir="ltr">{tool}</li>
                    ))}
                  </ul>
                </div>

                {/* Outcomes */}
                <div>
                  <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--h-ink)' }}>
                    {isRtl ? '✅ מה תקבלו בסיום?' : '✅ What You\'ll Gain'}
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {(isRtl ? selectedProgram.outcomes : selectedProgram.outcomesEn).map((outcome, i) => (
                      <li key={i} className="flex items-center gap-2 text-base" style={{ color: 'var(--h-ink-2)' }}>
                        <CheckCircle className="w-5 h-5 shrink-0" style={{ color: 'var(--h-accent-ink)' }} aria-hidden="true" />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="pt-1">
                  <Link href="/contact" className="h-btn h-btn-accent w-full" onClick={() => setSelectedProgram(null)}>
                    {isRtl ? 'מעוניינים בהכשרה? צרו קשר' : 'Interested? Contact Us'}
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
}
