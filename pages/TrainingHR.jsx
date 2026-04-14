import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Clock, CheckCircle, ArrowLeft, UserCheck, Heart, Sparkles } from "lucide-react";
import { useLanguage } from "../components/LanguageContext";

export default function TrainingHR() {
  const { lang } = useLanguage();
  const isEn = lang === 'en';

  const modules = isEn ? [
    {
      number: 1,
      title: "AI for Smart Recruiting & Candidate Management",
      duration: "6 hours",
      focus: "Using AI to improve recruitment processes — from CV screening to crafting attractive job postings to smart interviews. You'll learn to identify quality candidates faster and improve candidate experience:",
      result: "Save 60% of CV screening time, write attractive job postings in 5 minutes, and run an automated, professional recruitment process.",
      tools: "ChatGPT, Claude, Notion AI, Lever, Greenhouse, HireVue",
      topics: [
        "Writing compelling and clear job descriptions (JDs) with AI",
        "Automated CV screening — quickly identifying suitable candidates",
        "Creating personalized interview questions tailored to the role",
        "Interview preparation — analyzing profiles and identifying strengths",
        "Automated candidate feedback — professional and human",
        "Building Candidate Personas with AI for fit identification"
      ]
    },
    {
      number: 2,
      title: "Performance Management & Employee Development",
      duration: "7 hours",
      focus: "Using AI for smart performance management — tracking goals, writing quality feedback, building personal development plans, and analyzing team status. You'll learn to give feedback that improves performance and identify needs early:",
      result: "The ability to give quality, personalized feedback, build accurate development plans, and identify issues or opportunities in the team early.",
      tools: "ChatGPT, Claude, Lattice, Culture Amp, 15Five, BambooHR",
      topics: [
        "Writing professional and constructive employee feedback — positive and negative",
        "Creating data-driven Individual Development Plans (IDPs)",
        "Preparation for 1-on-1s and Performance Reviews",
        "Analyzing performance data and identifying team trends",
        "Building personalized career tracks",
        "Early identification of Burnout, dissatisfaction, or high potential",
        "Creating personalized Onboarding plans for each role"
      ]
    },
    {
      number: 3,
      title: "Organizational Communication & Employee Culture",
      duration: "5 hours",
      focus: "Improving internal and external communication with AI — employee announcements, crisis management, satisfaction surveys, and building positive organizational culture:",
      result: "Clearer and more effective communication, the ability to identify and resolve organizational culture issues, and improved employee mood and engagement.",
      tools: "ChatGPT, Claude, Slido, Officevibe, TINYpulse, Slack AI",
      topics: [
        "Writing employee communications — news, changes, announcements",
        "Crisis management and sensitive communication",
        "Creating smart satisfaction and Pulse Surveys",
        "Analyzing survey responses and identifying recurring themes",
        "Building clear HR policies and procedures",
        "Planning team events and culture-improvement initiatives",
        "International communication — professional-level translation and processing"
      ]
    },
    {
      number: 4,
      title: "Data Management, Automations & Processes",
      duration: "6 hours",
      focus: "Automating routine HR tasks and analyzing employee data. You'll build dashboards, identify important insights, and make work more efficient with AI:",
      result: "Save 10–15 hours per week on routine tasks, easily analyze complex data, and make data-driven decisions.",
      tools: "ChatGPT Advanced Data Analysis, Claude, Excel AI, Power BI, Notion AI",
      topics: [
        "Building a comprehensive HR dashboard — tracking turnover, hiring, performance",
        "Analyzing employee data and identifying important trends",
        "Forecasts — Attrition prediction, Succession planning",
        "Automating recurring tasks — sending reminders, tracking goals",
        "Creating professional reports automatically",
        "Managing compliance and policy with AI",
        "Building a Knowledge Base for employee FAQs"
      ]
    }
  ] : [
    {
      number: 1,
      title: "AI לגיוס וניהול מועמדים חכם",
      duration: "6 שעות",
      focus: "שימוש ב-AI לשיפור תהליכי הגיוס - מסינון קורות חיים, דרך ניסוח משרות מושכות, ועד ראיונות חכמים. תלמדו לזהות מועמדים איכותיים מהר יותר ולשפר את חוויית המועמד:",
      result: "חיסכון של 60% בזמן סינון קו\"ח, יכולת לנסח משרות מושכות ב-5 דקות, וכלים לניהול תהליך גיוס אוטומטי ומקצועי",
      tools: "ChatGPT, Claude, Notion AI, Lever, Greenhouse, HireVue",
      topics: [
        "ניסוח תיאורי תפקיד (JD) מושכים וברורים עם AI",
        "סינון קורות חיים אוטומטי - זיהוי מועמדים מתאימים במהירות",
        "יצירת שאלות מותאמות אישית לראיונות בהתאם לתפקיד",
        "הכנה לראיונות - ניתוח פרופילים וזיהוי נקודות חוזק",
        "משוב אוטומטי למועמדים - מקצועי ואנושי",
        "בניית Candidate Personas עם AI לזיהוי התאמה"
      ]
    },
    {
      number: 2,
      title: "ניהול ביצועים ופיתוח עובדים",
      duration: "7 שעות",
      focus: "שימוש ב-AI לניהול ביצועים חכם - מעקב אחר יעדים, כתיבת משוב איכותי, בניית תוכניות פיתוח אישיות, וניתוח מצב הצוות. תלמדו לתת משוב שמשפר ביצועים ולזהות צרכים מוקדם:",
      result: "היכולת לתת משוב איכותי ומותאם אישית, לבנות תוכניות פיתוח מדויקות, ולזהות מוקדם בעיות או הזדמנויות בצוות",
      tools: "ChatGPT, Claude, Lattice, Culture Amp, 15Five, BambooHR",
      topics: [
        "כתיבת משוב מקצועי ובונה לעובדים - חיובי ושלילי",
        "יצירת תוכניות פיתוח אישיות (IDP) מבוססות נתונים",
        "הכנה לשיחות 1-on-1 ו-Performance Reviews",
        "ניתוח נתוני ביצועים וזיהוי טרנדים בצוות",
        "בניית מסלולי קריירה מותאמים אישית",
        "זיהוי מוקדם של Burnout, חוסר שביעות רצון או פוטנציאל גבוה",
        "יצירת תוכניות Onboarding מותאמות אישית לכל תפקיד"
      ]
    },
    {
      number: 3,
      title: "תקשורת ארגונית ותרבות עובדים",
      duration: "5 שעות",
      focus: "שיפור התקשורת הפנימית והחיצונית עם AI - הודעות לעובדים, ניהול משברים, סקרי שביעות רצון, ובניית תרבות ארגונית חיובית. תלמדו לתקשר טוב יותר ולחזק את המחויבות של העובדים:",
      result: "תקשורת ברורה ויעילה יותר, יכולת לזהות ולפתור בעיות בתרבות הארגונית, ושיפור מצב הרוח והמעורבות של העובדים",
      tools: "ChatGPT, Claude, Slido, Officevibe, TINYpulse, Slack AI",
      topics: [
        "כתיבת הודעות לעובדים - חדשות, שינויים, הכרזות",
        "ניהול משברים ותקשורת רגישה",
        "יצירת סקרי שביעות רצון ו-Pulse Surveys חכמים",
        "ניתוח תשובות סקרים וזיהוי נושאים חוזרים",
        "בניית מדיניות HR ונהלים ברורים",
        "תכנון אירועי צוות ויוזמות לשיפור התרבות",
        "תקשורת בינלאומית - תרגום ועיבוד תכנים ברמה מקצועית"
      ]
    },
    {
      number: 4,
      title: "ניהול נתונים, אוטומציות ותהליכים",
      duration: "6 שעות",
      focus: "אוטומציה של משימות HR שגרתיות וניתוח נתוני עובדים. תלמדו לבנות דשבורדים, לזהות insights חשובים, ולהפוך את העבודה ליעילה יותר עם AI:",
      result: "חיסכון של 10-15 שעות בשבוע על משימות שגרתיות, יכולת לנתח נתונים מורכבים בקלות, וקבלת החלטות מבוססות נתונים",
      tools: "ChatGPT Advanced Data Analysis, Claude, Excel AI, Power BI, Notion AI",
      topics: [
        "בניית דשבורד HR מקיף - מעקב אחר turnover, hiring, ביצועים",
        "ניתוח נתוני עובדים וזיהוי טרנדים חשובים",
        "תחזיות - Attrition prediction, Succession planning",
        "אוטומציה של משימות חוזרות - שליחת תזכורות, מעקב יעדים",
        "יצירת דוחות מקצועיים אוטומטית",
        "ניהול compliance ומדיניות עם AI",
        "בניית Knowledge Base לשאלות נפוצות של עובדים"
      ]
    }
  ];

  const included = isEn
    ? ["24 hours of comprehensive study", "Reference materials & templates", "Real case studies", "6 months of support & mentoring", "Ready-made prompts", "Training certificate"]
    : ["24 שעות לימוד מקיף", "חומרי עזר ותבניות", "מקרי בוחן אמיתיים", "תמיכה וליווי 6 חודשים", "פרומפטים מוכנים לשימוש", "תעודת הכשרה"];

  const txt = isEn ? {
    h1: "AI Training for HR",
    subtitle: "24 hours of practical training for HR professionals — smarter people management with AI",
    badge1: "Intermediate",
    badge2: "HR Teams",
    cta: "Get a Quote",
    intro1: "For HR professionals who want to focus on people, not tasks — practical training teaching how to use AI for smart recruiting, performance management, and improving organizational culture.",
    intro2: "Designed for HR professionals who want to improve efficiency and create real value for employees and the organization. No prior technical knowledge required.",
    modulesLabel: "Modules",
    hoursLabel: "Study Hours",
    practicalLabel: "Practical",
    monthsLabel: "Months Support",
    modulesTitle: "Full Training Content",
    resultLabel: "What you'll get by the end:",
    toolsLabel: "Possible tools for this module: ",
    whyTitle: "Why AI Training for HR?",
    whySub: "Estimated figures based on graduate experience",
    roiLabel: "ROI: Return on investment within one month",
    roiNote: "* Results vary depending on organization type and actual implementation",
    includedTitle: "What's Included in the Training Price?",
    ctaTitle: "Ready to Upgrade Your HR Department?",
    ctaSub: "Join dozens of HR departments already using AI for smarter people management"
  } : {
    h1: "הכשרת AI למחלקת משאבי אנוש",
    subtitle: "24 שעות הכשרה מעשית לאנשי HR - ניהול אנשים חכם יותר עם AI",
    badge1: "בינוני",
    badge2: "אנשי HR",
    cta: "קבלו הצעת מחיר",
    intro1: "לאנשי HR שרוצים להתמקד באנשים, לא במשימות - הכשרה מעשית שמלמדת איך להשתמש ב-AI לגיוס חכם, ניהול ביצועים, ושיפור תרבות ארגונית.",
    intro2: "ההכשרה מיועדת לאנשי משאבי אנוש שרוצים לשפר את היעילות ולהתמקד ביצירת ערך אמיתי לעובדים ולארגון. אין צורך בידע טכני מוקדם.",
    modulesLabel: "מודולים",
    hoursLabel: "שעות לימוד",
    practicalLabel: "מעשי",
    monthsLabel: "חודשי ליווי",
    modulesTitle: "תוכן ההכשרה המלא",
    resultLabel: "מה תקבלו בסוף:",
    toolsLabel: "כלים אפשריים למודול זה: ",
    whyTitle: "למה הכשרת AI לאנשי HR?",
    whySub: "נתונים משוערים בהתבסס על ניסיון בוגרי ההכשרה",
    roiLabel: "ROI: החזר השקעה תוך חודש אחד",
    roiNote: "* התוצאות משתנות בהתאם לסוג הארגון והיישום בפועל",
    includedTitle: "מה כולל מחיר ההכשרה?",
    ctaTitle: "מוכנים לשדרג את מחלקת ה-HR?",
    ctaSub: "הצטרפו לעשרות מחלקות HR שכבר משתמשות ב-AI לניהול אנשים חכם יותר"
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-b-4 border-pink-500">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-pink-100 mb-6">
              <UserCheck className="w-10 h-10 text-pink-600" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">{txt.h1}</h1>
            <p className="text-xl text-gray-600 mb-8">{txt.subtitle}</p>
            <div className="flex items-center justify-center gap-4 mb-8">
              <Badge className="bg-pink-100 text-pink-800 border-0 text-lg px-4 py-2"><Heart className="w-5 h-5 ml-2" />{txt.badge1}</Badge>
              <Badge className="bg-pink-100 text-pink-800 border-0 text-lg px-4 py-2"><Sparkles className="w-5 h-5 ml-2" />{txt.badge2}</Badge>
            </div>
            <Link to={createPageUrl("Contact")}>
              <Button size="lg" className="bg-pink-600 hover:bg-pink-700 text-white font-bold text-lg px-10 py-6 shadow-lg">
                {txt.cta}<ArrowLeft className="mr-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-700 leading-relaxed mb-4 text-lg"><strong className="text-gray-900">{txt.intro1}</strong></p>
          <p className="text-gray-700 leading-relaxed text-lg">{txt.intro2}</p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[["4", txt.modulesLabel], ["24", txt.hoursLabel], ["100%", txt.practicalLabel], ["6", txt.monthsLabel]].map(([num, label]) => (
              <Card key={label} className="p-8 text-center bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl font-bold text-pink-600 mb-2">{num}</div>
                <div className="text-sm text-gray-600">{label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">{txt.modulesTitle}</h2>
          <div className="space-y-8">
            {modules.map((module, index) => (
              <motion.div key={module.number} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <Card className="overflow-hidden border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-gray-900 text-white p-6 flex items-center gap-4">
                    <div className="bg-pink-600 text-white w-12 h-12 rounded flex items-center justify-center font-bold flex-shrink-0 text-lg">{module.number}</div>
                    <div className="flex-1"><h3 className="text-xl font-semibold">{module.title}</h3></div>
                    <div className="flex items-center gap-2 text-gray-300"><Clock className="w-5 h-5" /><span className="text-sm">{module.duration}</span></div>
                  </div>
                  <div className="p-6 bg-white">
                    <p className="text-gray-700 mb-5 leading-relaxed text-base">{module.focus}</p>
                    <div className="bg-pink-50 border-r-4 border-pink-600 p-4 rounded-sm mb-4">
                      <div className="font-semibold text-gray-900 mb-2">{txt.resultLabel}</div>
                      <div className="text-gray-700">{module.result}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-sm border border-gray-200 mb-4">
                      <ul className="space-y-2">
                        {module.topics.map((topic, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-700 text-sm">
                            <CheckCircle className="w-4 h-4 text-pink-600 flex-shrink-0 mt-0.5" /><span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-sm border border-gray-200">
                      <span className="font-semibold text-gray-900">{txt.toolsLabel}</span>
                      <span className="text-gray-600">{module.tools}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{txt.whyTitle}</h2>
            <p className="text-xl text-gray-600">{txt.whySub}</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {(isEn
              ? [["60%", "Savings in recruiting time", "screening & analysis"], ["10-15", "Hours saved", "per week"], ["40%", "Improvement in employee experience", "average"]]
              : [["60%", "חיסכון בזמן גיוס", "סינון וניתוח"], ["10-15", "שעות חיסכון", "בשבוע"], ["40%", "שיפור בחווית עובד", "ממוצע"]]
            ).map(([num, label, unit], i) => (
              <motion.div key={label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="p-8 text-center bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-5xl font-bold text-pink-600 mb-2">{num}</div>
                  <div className="text-sm text-gray-600 mb-2">{label}</div>
                  <div className="text-xs text-gray-500">{unit}</div>
                </Card>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
            <Card className="p-8 bg-white border-gray-200 shadow-md inline-block">
              <p className="text-2xl text-gray-900 mb-2"><strong className="text-pink-600">{txt.roiLabel}</strong></p>
              <p className="text-sm text-gray-500">{txt.roiNote}</p>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">{txt.includedTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {included.map((item, index) => (
              <motion.div key={item} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
                <Card className="p-6 bg-white border-gray-200 text-center h-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-gray-700 font-medium">{item}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">{txt.ctaTitle}</h2>
            <p className="text-2xl text-gray-300 mb-8">{txt.ctaSub}</p>
            <Link to={createPageUrl("Contact")}>
              <Button size="lg" className="bg-pink-600 hover:bg-pink-700 text-white font-bold text-xl px-12 py-7 shadow-xl">
                {isEn ? "Let's Talk" : "בואו נדבר על ההכשרה"}<ArrowLeft className="mr-2 h-6 w-6" />
              </Button>
            </Link>
            <p className="text-gray-400 mt-6">
              {isEn ? "Have questions? " : "יש לכם שאלות? "}
              <Link to={createPageUrl("Contact")} className="text-pink-400 hover:text-pink-300 underline">
                {isEn ? "Contact us" : "צרו איתנו קשר"}
              </Link>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}