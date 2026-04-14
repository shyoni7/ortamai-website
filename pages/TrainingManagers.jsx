import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Clock, CheckCircle, ArrowLeft, Users, TrendingUp, Target } from "lucide-react";
import { useLanguage } from "../components/LanguageContext";

export default function TrainingManagers() {
  const { lang } = useLanguage();
  const isEn = lang === 'en';

  const modules = isEn ? [
    {
      number: 1,
      title: "AI Literacy for Managers — What You Need to Know",
      duration: "6 hours",
      focus: "A deep understanding of what AI is, how it works, and its potential and limitations. You'll learn the business language of AI, how to evaluate opportunities, and the differences between models:",
      result: "The ability to understand AI's real capabilities, identify business opportunities, and make informed decisions about AI investments.",
      tools: "ChatGPT, Claude, Gemini, Perplexity AI",
      topics: [
        "What AI, Machine Learning, and Generative AI are — the business basics",
        "Differences between models (ChatGPT, Claude, Gemini) — when to use each",
        "AI limitations and challenges — what's possible and what isn't",
        "Successful use cases in leading organizations worldwide and in Israel",
        "AI ROI — how to measure return on investment"
      ]
    },
    {
      number: 2,
      title: "AI for Daily Management — Time, Tasks & Decision-Making",
      duration: "8 hours",
      focus: "Using AI for time management, task prioritization, strategic planning, and data-driven decision-making. You'll build systems to manage your day efficiently and analyze information fast:",
      result: "Save 10–15 hours per week, prioritize correctly, and get tools for fast, data-driven decision-making.",
      tools: "ChatGPT, Claude, Motion, Reclaim.ai, Notion AI, Advanced Data Analysis",
      topics: [
        "Automated daily and weekly planning — smart calendar",
        "AI-driven task and project prioritization — Eisenhower matrix",
        "Analyzing financial and sales reports with AI — fast insights",
        "Future forecasts — sales forecasting & demand planning",
        "Building a management dashboard with Notion AI",
        "Automatic sync of calendar, tasks and communications"
      ]
    },
    {
      number: 3,
      title: "Communication & Team Management with AI",
      duration: "7 hours",
      focus: "Improving managerial communication and teamwork with AI — writing emails, preparing presentations, giving feedback, and running meetings efficiently:",
      result: "Save 5–7 hours per week on communication, improve quality of employee feedback, and manage your team more effectively.",
      tools: "ChatGPT, Claude, Gamma.app, Beautiful.ai, Fireflies.ai, Lattice",
      topics: [
        "Writing professional emails — speed, accuracy, and the right tone",
        "Creating impressive presentations in 5 minutes with Gamma.app",
        "Writing professional and constructive employee feedback",
        "Building data-driven personal development plans",
        "Automatic meeting summaries and action items with Fireflies.ai",
        "Preparing for successful 1-on-1s and leading discussions",
        "International communication — translation and professional editing"
      ]
    },
    {
      number: 4,
      title: "Strategic Planning & Leading Organizational Change",
      duration: "7 hours",
      focus: "Using AI for strategic planning, project management, and risk management. You'll learn to lead change, build plans, and successfully implement AI across the organization:",
      result: "The ability to build detailed strategic plans, identify risks and opportunities early, and successfully lead organizational change.",
      tools: "ChatGPT, Claude, Miro AI, Asana, Monday.com, FigJam",
      topics: [
        "Building an annual strategic plan with AI — vision, goals, measurement",
        "Data- and trend-driven SWOT analysis",
        "Identifying innovation opportunities with AI",
        "Project management — planning, tracking and automatic reporting",
        "Risk identification and management",
        "Building an AI implementation plan — step by step",
        "Handling resistance and leading cultural change",
        "Building an AI-driven organizational culture"
      ]
    }
  ] : [
    {
      number: 1,
      title: "AI Literacy למנהלים - מה חשוב לדעת",
      duration: "6 שעות",
      focus: "הבנה מעמיקה של מה זה AI, איך הוא עובד, ומה הפוטנציאל והמגבלות שלו. תלמדו את השפה העסקית של AI, תבינו איך להעריך הזדמנויות, ותכירו את ההבדלים בין מודלים שונים:",
      result: "היכולת להבין את היכולות האמיתיות של AI, לזהות הזדמנויות עסקיות, ולקבל החלטות מושכלות לגבי השקעות ב-AI",
      tools: "ChatGPT, Claude, Gemini, Perplexity AI",
      topics: [
        "מה זה AI, Machine Learning ו-Generative AI - הבסיס העסקי",
        "הבדלים בין מודלים שונים (ChatGPT, Claude, Gemini) - מתי להשתמש בכל אחד",
        "מגבלות ואתגרים של AI - למה לא הכל אפשרי ומה כן",
        "מקרי שימוש מוצלחים בארגונים מובילים בעולם ובישראל",
        "ROI של AI - איך למדוד החזר השקעה"
      ]
    },
    {
      number: 2,
      title: "AI לניהול יומיומי - זמן, משימות וקבלת החלטות",
      duration: "8 שעות",
      focus: "שימוש ב-AI לניהול זמן, תעדוף משימות, תכנון אסטרטגי וקבלת החלטות מבוססת נתונים. תלמדו לבנות מערכות שעוזרות לכם לנהל את היום ביעילות ולנתח מידע מהר:",
      result: "חיסכון של 10-15 שעות בשבוע, יכולת לתעדף נכון, וכלים שמסייעים בקבלת החלטות מהירות ומדויקות על בסיס נתונים",
      tools: "ChatGPT, Claude, Motion, Reclaim.ai, Notion AI, Advanced Data Analysis",
      topics: [
        "תכנון יומי ושבועי אוטומטי עם AI - יומן חכם",
        "תעדוף משימות ופרויקטים - מטריצת אייזנהאואר מונעת AI",
        "ניתוח דוחות כספיים ומכירות עם AI - insights מהירים",
        "תחזיות עתידיות - sales forecasting ו-demand planning",
        "בניית דשבורד מנהלים עם Notion AI לניהול כל העסק",
        "סנכרון אוטומטי של יומן, משימות ותקשורת"
      ]
    },
    {
      number: 3,
      title: "תקשורת וניהול צוותים עם AI",
      duration: "7 שעות",
      focus: "שיפור התקשורת הניהולית ועבודת הצוות עם AI - כתיבת מיילים, הכנת מצגות, משוב לעובדים, וניהול פגישות. תלמדו לתקשר טוב יותר ולנהל את הצוות ביעילות:",
      result: "חיסכון של 5-7 שעות בשבוע על תקשורת, שיפור איכות המשוב לעובדים, וניהול צוות יעיל יותר",
      tools: "ChatGPT, Claude, Gamma.app, Beautiful.ai, Fireflies.ai, Lattice",
      topics: [
        "כתיבת מיילים מקצועיים - מהירות, דיוק וטון נכון",
        "יצירת מצגות מרשימות ב-5 דקות עם Gamma.app ו-Beautiful.ai",
        "כתיבת משוב מקצועי ובונה לעובדים",
        "בניית תכניות פיתוח אישיות מבוססות נתונים",
        "סיכום פגישות אוטומטי ו-action items עם Fireflies.ai",
        "הכנה לשיחות 1-on-1 מוצלחות והובלת דיונים",
        "תקשורת בינלאומית - תרגום ועריכה ברמה מקצועית"
      ]
    },
    {
      number: 4,
      title: "תכנון אסטרטגי והובלת שינוי ארגוני",
      duration: "7 שעות",
      focus: "שימוש ב-AI לתכנון אסטרטגי, ניהול פרויקטים, וניהול סיכונים. תלמדו להוביל תהליכי שינוי, לבנות תוכניות, ולהטמיע AI בארגון בצורה מוצלחת:",
      result: "היכולת לבנות תוכניות אסטרטגיות מפורטות, לזהות סיכונים והזדמנויות מוקדם, ולהוביל שינוי ארגוני בהצלחה",
      tools: "ChatGPT, Claude, Miro AI, Asana, Monday.com, FigJam",
      topics: [
        "בניית תכנית אסטרטגית שנתית עם AI - חזון, יעדים ומדידה",
        "ניתוח SWOT מבוסס נתונים וטרנדים בשוק",
        "זיהוי הזדמנויות לחדשנות עם AI בארגון",
        "ניהול פרויקטים - תכנון, מעקב ודיווח אוטומטי",
        "זיהוי וניהול סיכונים בפרויקטים",
        "בניית תוכנית הטמעת AI בארגון - צעד אחר צעד",
        "התמודדות עם התנגדויות והובלת שינוי תרבותי",
        "בניית תרבות ארגונית מונעת AI וחדשנות"
      ]
    }
  ];

  const included = isEn
    ? ["28 hours of comprehensive study", "Reference materials & summaries", "Real case studies", "6 months of support & mentoring", "Ready-made templates & prompts", "Training certificate"]
    : ["28 שעות לימוד מקיף", "חומרי עזר וסיכומים", "מקרי בוחן אמיתיים", "תמיכה וליווי 6 חודשים", "תבניות ופרומפטים מוכנים", "תעודת הכשרה"];

  const txt = isEn ? {
    h1: "AI Training for Managers",
    subtitle: "28 hours of practical training for managers — smarter management with AI",
    badge1: "Advanced",
    badge2: "Managers",
    cta: "Get a Quote",
    intro1: "For managers who want to lead in the AI era — practical training that teaches how to use AI for smarter management, faster decision-making, and strategic planning.",
    intro2: "Designed for managers at various levels who want to improve efficiency and lead their teams into the new era. No prior technical knowledge required.",
    modulesLabel: "Modules",
    hoursLabel: "Study Hours",
    practicalLabel: "Practical",
    monthsLabel: "Months Support",
    modulesTitle: "Full Training Content",
    resultLabel: "What you'll get by the end:",
    toolsLabel: "Possible tools for this module: ",
    whyTitle: "Why AI Training for Managers?",
    whySub: "Estimated figures based on graduate experience",
    savingLabel: "Hours saved",
    savingUnit: "per week",
    decisionLabel: "Improvement in decision-making",
    decisionUnit: "speed & accuracy",
    teamLabel: "Improvement in team output",
    teamUnit: "average",
    roiLabel: "ROI: Return on investment within one month",
    roiNote: "* Results vary depending on management type and actual implementation",
    includedTitle: "What's Included in the Training Price?",
    ctaTitle: "Ready to Lead in the AI Era?",
    ctaSub: "Join hundreds of managers already using AI to manage better",
    ctaBtn: "Let's Talk About the Training",
    contactLink: "Have questions? Contact us"
  } : {
    h1: "הכשרת AI למנהלים",
    subtitle: "28 שעות הכשרה מעשית למנהלים - ניהול חכם יותר עם AI",
    badge1: "מתקדמים",
    badge2: "מנהלים",
    cta: "קבלו הצעת מחיר",
    intro1: "למנהלים שרוצים להוביל בעידן ה-AI - הכשרה מעשית שמלמדת איך להשתמש ב-AI לניהול חכם יותר, קבלת החלטות מהירה, ותכנון אסטרטגי.",
    intro2: "ההכשרה מיועדת למנהלים ברמות שונות שרוצים לשפר את היעילות ולהוביל את הצוות שלהם לעידן החדש. אין צורך בידע טכני מוקדם.",
    modulesLabel: "מודולים",
    hoursLabel: "שעות לימוד",
    practicalLabel: "מעשי",
    monthsLabel: "חודשי ליווי",
    modulesTitle: "תוכן ההכשרה המלא",
    resultLabel: "מה תקבלו בסוף:",
    toolsLabel: "כלים אפשריים למודול זה: ",
    whyTitle: "למה הכשרת AI למנהלים?",
    whySub: "נתונים משוערים בהתבסס על ניסיון בוגרי ההכשרה",
    savingLabel: "שעות חיסכון",
    savingUnit: "בשבוע",
    decisionLabel: "שיפור בקבלת החלטות",
    decisionUnit: "מהירות ודיוק",
    teamLabel: "שיפור בתפוקת הצוות",
    teamUnit: "ממוצע",
    roiLabel: "ROI: החזר השקעה תוך חודש אחד",
    roiNote: "* התוצאות משתנות בהתאם לסוג הניהול והיישום בפועל",
    includedTitle: "מה כולל מחיר ההכשרה?",
    ctaTitle: "מוכנים להוביל בעידן ה-AI?",
    ctaSub: "הצטרפו למאות מנהלים שכבר משתמשים ב-AI כדי לנהל טוב יותר",
    ctaBtn: "בואו נדבר על ההכשרה",
    contactLink: "יש לכם שאלות? צרו איתנו קשר"
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-b-4 border-cyan-500">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-cyan-100 mb-6">
              <Users className="w-10 h-10 text-cyan-600" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">{txt.h1}</h1>
            <p className="text-xl text-gray-600 mb-8">{txt.subtitle}</p>
            <div className="flex items-center justify-center gap-4 mb-8">
              <Badge className="bg-cyan-100 text-cyan-800 border-0 text-lg px-4 py-2"><Target className="w-5 h-5 ml-2" />{txt.badge1}</Badge>
              <Badge className="bg-cyan-100 text-cyan-800 border-0 text-lg px-4 py-2"><TrendingUp className="w-5 h-5 ml-2" />{txt.badge2}</Badge>
            </div>
            <Link to={createPageUrl("Contact")}>
              <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-lg px-10 py-6 shadow-lg">
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
            {[["4", txt.modulesLabel], ["28", txt.hoursLabel], ["100%", txt.practicalLabel], ["6", txt.monthsLabel]].map(([num, label]) => (
              <Card key={label} className="p-8 text-center bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl font-bold text-cyan-600 mb-2">{num}</div>
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
                    <div className="bg-cyan-600 text-white w-12 h-12 rounded flex items-center justify-center font-bold flex-shrink-0 text-lg">{module.number}</div>
                    <div className="flex-1"><h3 className="text-xl font-semibold">{module.title}</h3></div>
                    <div className="flex items-center gap-2 text-gray-300"><Clock className="w-5 h-5" /><span className="text-sm">{module.duration}</span></div>
                  </div>
                  <div className="p-6 bg-white">
                    <p className="text-gray-700 mb-5 leading-relaxed text-base">{module.focus}</p>
                    <div className="bg-cyan-50 border-r-4 border-cyan-600 p-4 rounded-sm mb-4">
                      <div className="font-semibold text-gray-900 mb-2">{txt.resultLabel}</div>
                      <div className="text-gray-700">{module.result}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-sm border border-gray-200 mb-4">
                      <ul className="space-y-2">
                        {module.topics.map((topic, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-700 text-sm">
                            <CheckCircle className="w-4 h-4 text-cyan-600 flex-shrink-0 mt-0.5" /><span>{topic}</span>
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
            {[["10-15", txt.savingLabel, txt.savingUnit], ["50%", txt.decisionLabel, txt.decisionUnit], ["35%", txt.teamLabel, txt.teamUnit]].map(([num, label, unit], i) => (
              <motion.div key={label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="p-8 text-center bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-5xl font-bold text-cyan-600 mb-2">{num}</div>
                  <div className="text-sm text-gray-600 mb-2">{label}</div>
                  <div className="text-xs text-gray-500">{unit}</div>
                </Card>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
            <Card className="p-8 bg-white border-gray-200 shadow-md inline-block">
              <p className="text-2xl text-gray-900 mb-2"><strong className="text-cyan-600">{txt.roiLabel}</strong></p>
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
              <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xl px-12 py-7 shadow-xl">
                {txt.ctaBtn}<ArrowLeft className="mr-2 h-6 w-6" />
              </Button>
            </Link>
            <p className="text-gray-400 mt-6">
              {isEn ? "Have questions? " : "יש לכם שאלות? "}
              <Link to={createPageUrl("Contact")} className="text-cyan-400 hover:text-cyan-300 underline">
                {isEn ? "Contact us" : "צרו איתנו קשר"}
              </Link>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}