import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Clock, CheckCircle, ArrowLeft } from "lucide-react";

export default function CourseAI() {
  const modules = [
    {
      number: 1,
      title: "ניהול זמן ותפעול העסק",
      duration: "10 שעות",
      focus: "תלמדו לנהל את הזמן והמשימות באופן אוטומטי - AI שמתכנן את היום שלכם, מנהל את היומן, מזכיר על משימות, ומסנכרן בין כל המערכות:",
      result: "היכולת לנהל את הזמן באופן אוטומטי וחכם, לחבר AI לכל המערכות שלכם, ולחסוך 10-15 שעות עבודה בשבוע",
      tools: "ChatGPT, Claude, Gemini, n8n, Notion AI",
      topics: [
        "חיבור AI ליומן Google Calendar לתזמון פגישות ומשימות אוטומטי",
        "בניית סוכני AI שמנהלים את רשימת המשימות ומזכירים על דדליינים",
        "אוטומציות עם n8n - סנכרון אוטומטי בין מיילים, משימות ויומן",
        "יצירת דשבורד אישי ב-Notion AI לניהול כל העסק במקום אחד"
      ]
    },
    {
      number: 2,
      title: "שיווק ויצירת תוכן ברמה מקצועית",
      duration: "12 שעות",
      focus: "תבנו אסטרטגיית שיווק מלאה מונעת AI - ממחקר שוק מעמיק, דרך יצירת תוכן אוטומטית, ועד משפכי המרה וניתוח ביצועים:",
      result: "הידע לבנות אסטרטגיית שיווק מלאה, ליצור תוכן איכותי בקלות, ולהפעיל קמפיינים שמייצרים לידים באופן עצמאי",
      tools: "Perplexity AI, ChatGPT, Claude, n8n",
      topics: [
        "מחקר שוק ומתחרים מעמיק עם Perplexity AI - זיהוי הזדמנויות שיווקיות",
        "בניית סוכן AI לכתיבה ופרסום פוסטים אוטומטי ברשתות החברתיות",
        "יצירת מאמרי בלוג, תכני SEO וקמפיינים שיווקיים מלאים",
        "בניית משפך שיווקי מונע AI - מלידים ועד המרה + ניתוח תוצאות"
      ]
    },
    {
      number: 3,
      title: "סטודיו יצירה וגרפיקה באמצעות AI",
      duration: "20 שעות",
      focus: "תהפכו להיות סטודיו יצירה שלם - תייצרו תמונות, לוגואים, סרטונים, אנימציות ותוכן ויזואלי ברמה מקצועית. כל מה שהיה צריך מעצב, צלם, סטודיו וידאו ואולפן הקלטה - עכשיו תעשו בעצמכם:",
      result: "הבנה מלאה במיתוג באמצעות AI • יכולת ליצור ככל שתצטרכו תמונות ממותגות לשיווק וסרטוני AI לפרסום • ידע ביצירת סרטוני הסברה באמצעות AI • Reels לרשתות ועוד",
      tools: "Nano Banana, Flux 1.1 Pro, Ideogram v2, Recraft V3, Sora 2, Veo 3, Kling AI, Synthesia, ElevenLabs, Canva, CapCut",
      topics: [
        "מיתוג מלא: עיצוב לוגו וזהות מותג עם Recraft V3 ו-Ideogram v2",
        "תמונות לשיווק: צילומי מוצר, באנרים ופוסטים עם Flux 1.1 Pro ו-Nano Banana",
        "סרטוני פרסומת: יצירת סרטונים מקצועיים מטקסט עם Sora 2, Veo 3 ו-Kling AI",
        "סרטוני הסבר: הפקת סרטונים עם דוברים וירטואליים באמצעות Synthesia",
        "פס קול ודיבוב: יצירת קריינות, מוזיקה ודיבוב מקצועי עם ElevenLabs",
        "עריכה וגימור: שילוב הכל ב-Canva ו-CapCut לתוצאה מוכנה לפרסום"
      ]
    },
    {
      number: 4,
      title: "שירות לקוחות אוטומטי וצ'אטבוטים חכמים",
      duration: "10 שעות",
      focus: "תקימו מערכת שירות 24/7 - צ'אטבוט חכם שעונה על 80% מהפניות, מנתב שאלות מורכבות, ומשפר את חווית הלקוח באופן משמעותי:",
      result: "הידע לבנות מערכת שירות 24/7 שעובדת באופן אוטומטי, משפרת חוויית לקוח ומקצרת זמני תגובה באופן דרמטי",
      tools: "Tidio, ManyChat, Chatbase, Intercom, Zendesk AI, HubSpot AI",
      topics: [
        "בניית צ'אטבוט חכם לאתר, פייסבוק, ווטסאפ ואינסטגרם",
        "מערכת FAQ אוטומטית + ניתוב פניות מורכבות לצוות",
        "אוטומציה של תשובות למיילים ופניות + מעקב שביעות רצון"
      ]
    },
    {
      number: 5,
      title: "ניהול כספים וניתוח עסקי",
      duration: "8 שעות",
      focus: "תנהלו את הכספים בצורה חכמה - דשבורדים אוטומטיים, תחזיות הכנסות, זיהוי הזדמנויות לחיסכון, וניתוח מתחרים מעמיק:",
      result: "היכולת לנתח את המצב העסקי בצורה מדויקת, לחזות הכנסות עתידיות, ולזהות הזדמנויות לשיפור רווחיות",
      tools: "ChatGPT Advanced Data Analysis, Claude, Rows, QuickBooks AI",
      topics: [
        "יצירת דשבורד אוטומטי לניתוח דוחות כספיים ומעקב KPI",
        "חיזוי תזרים מזומנים והכנסות עתידיות ל-6 חודשים קדימה",
        "ניתוח מתחרים ומחקר שוק + זיהוי הזדמנויות לשיפור רווחיות"
      ]
    },
    {
      number: 6,
      title: "בניית אתרים ללא ידע בתכנות",
      duration: "10 שעות",
      focus: "תבנו אתרים מקצועיים באמצעות AI - מאתר מלא ועד דפי נחיתה ממירים, הכל ללא כתיבת קוד, עם אופטימיזציה לקידום בגוגל:",
      result: "הידע לבנות אתרים ודפי נחיתה מקצועיים ללא צורך במתכנת, כולל אופטימיזציה לקידום וטפסי המרה",
      tools: "ChatGPT, Claude, Cursor, v0.dev, Replit, Bubble, Webflow",
      topics: [
        "בניית אתרים מלאים עם v0.dev, Cursor ו-Claude - קוד נקי ומקצועי",
        "יצירת דפי נחיתה ממירים עם טפסים ואינטגרציות",
        "אופטימיזציה לקידום אתרים (SEO) באמצעות AI"
      ]
    },
    {
      number: 7,
      title: "סוכני AI מתקדמים ואוטומציות עסקיות",
      duration: "12 שעות",
      focus: "תבנו צוות AI שעובד עבורכם 24/7 - סוכנים מותאמים אישית שמנהלים מכירות, תוכן, שירות, וניתוח נתונים, כולם במקביל:",
      result: "הידע לבנות צוות סוכני AI שעובדים עבורכם 24/7 - מכירות, תוכן, שירות וניתוח נתונים - והיכולת להפוך חלקים שלמים מהעסק לאוטומטיים",
      tools: "GPTs, Claude Projects, AgentGPT, AutoGPT, LangChain, n8n",
      topics: [
        "בניית סוכני AI מותאמים אישית עם GPTs ו-Claude Projects",
        "יצירת סוכן מכירות שמנהל לידים, עוקב אחרי לקוחות ומזהה הזדמנויות",
        "סוכן תוכן שמייצר ומפרסם פוסטים אוטומטית + סוכן שירות 24/7",
        "שילוב סוכנים עם n8n לאוטומציות מתקדמות וניהול תהליכים"
      ]
    }
  ];

  const included = [
    "80 שעות לימוד מקיף",
    "חומרי לימוד דיגיטליים",
    "תרגול אינטנסיבי",
    "תמיכה וליווי 6 חודשים",
    "תבניות ופרומפטים מוכנים",
    "גישה לקהילת בוגרים"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-b-4 border-cyan-500">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              קורס AI מעשי לעסקים קטנים
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              80 שעות הכשרה מקיפה - מאפס ועד אוטומציה מלאה
            </p>
            
            <div className="text-5xl font-bold text-cyan-600 mb-2">
              ₪6,900
            </div>
            <div className="text-lg text-gray-600 mb-8">
              (פחות מ-₪87/שעה)
            </div>

            <Link to={createPageUrl("Contact")}>
              <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-lg px-10 py-6 shadow-lg">
                התחילו עכשיו
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Intro Text */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-700 leading-relaxed mb-4 text-lg">
            <strong className="text-gray-900">עצמאים ובעלי עסקים קטנים</strong> שרוצים להוביל את העסק שלהם לעידן ה-AI ולחסוך אלפי שקלים בחודש.
          </p>
          <p className="text-gray-700 leading-relaxed text-lg">
            הקורס מיועד למי שמחפש <strong className="text-gray-900">פתרונות מעשיים ומיידיים</strong> - לא תיאוריה, אלא כלים שעובדים מהיום הראשון. <strong className="text-gray-900">אין צורך בידע מוקדם.</strong>
          </p>
        </div>
      </section>

      {/* Summary Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-8 text-center bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl font-bold text-cyan-600 mb-2">7</div>
              <div className="text-sm text-gray-600">מודולים</div>
            </Card>
            <Card className="p-8 text-center bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl font-bold text-cyan-600 mb-2">80</div>
              <div className="text-sm text-gray-600">שעות לימוד</div>
            </Card>
            <Card className="p-8 text-center bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl font-bold text-cyan-600 mb-2">24/7</div>
              <div className="text-sm text-gray-600">תמיכה וליווי</div>
            </Card>
            <Card className="p-8 text-center bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl font-bold text-cyan-600 mb-2">100%</div>
              <div className="text-sm text-gray-600">מעשי ויישומי</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            תוכן הקורס המלא
          </h2>

          <div className="space-y-8">
            {modules.map((module, index) => (
              <motion.div
                key={module.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-gray-900 text-white p-6 flex items-center gap-4">
                    <div className="bg-cyan-500 text-white w-12 h-12 rounded flex items-center justify-center font-bold flex-shrink-0 text-lg">
                      {module.number}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">{module.title}</h3>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Clock className="w-5 h-5" />
                      <span className="text-sm">{module.duration}</span>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-white">
                    <p className="text-gray-700 mb-5 leading-relaxed text-base">
                      {module.focus}
                    </p>
                    
                    <div className="bg-cyan-50 border-r-4 border-cyan-500 p-4 rounded-sm mb-4">
                      <div className="font-semibold text-gray-900 mb-2">מה תקבלו בסוף:</div>
                      <div className="text-gray-700">{module.result}</div>
                    </div>

                    {/* נושאי הלימוד */}
                    <div className="bg-gray-50 p-4 rounded-sm border border-gray-200 mb-4">
                      <ul className="space-y-2">
                        {module.topics.map((topic, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-700 text-sm">
                            <CheckCircle className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-sm border border-gray-200">
                      <span className="font-semibold text-gray-900">כלים אפשריים למודול זה: </span>
                      <span className="text-gray-600">{module.tools}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Section - Simple Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              הערך שתקבלו מהקורס
            </h2>
            <p className="text-xl text-gray-600">
              נתונים משוערים בהתבסס על ניסיון בוגרי הקורס
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-8 text-center bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-5xl font-bold text-cyan-600 mb-2">30-40</div>
                <div className="text-sm text-gray-600 mb-2">שעות חיסכון</div>
                <div className="text-xs text-gray-500">בחודש</div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-8 text-center bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-5xl font-bold text-cyan-600 mb-2">50-70%</div>
                <div className="text-sm text-gray-600 mb-2">חיסכון בספקים</div>
                <div className="text-xs text-gray-500">עלות חודשית</div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-8 text-center bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-5xl font-bold text-cyan-600 mb-2">35%</div>
                <div className="text-sm text-gray-600 mb-2">עליה בתפוקה</div>
                <div className="text-xs text-gray-500">ממוצע</div>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Card className="p-8 bg-white border-gray-200 shadow-md inline-block">
              <p className="text-2xl text-gray-900 mb-2">
                <strong className="text-cyan-600">ROI:</strong> החזר ההשקעה תוך 1-2 חודשים
              </p>
              <p className="text-sm text-gray-500">
                * התוצאות משתנות בהתאם לסוג העסק והיישום בפועל
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            מה כולל מחיר הקורס?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {included.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-6 bg-white border-gray-200 text-center h-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-gray-700 font-medium">{item}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              מוכנים להתחיל?
            </h2>
            <p className="text-2xl text-gray-300 mb-8">
              הצטרפו למאות עצמאים ועסקים שכבר משתמשים ב-AI כדי לצמוח
            </p>
            
            <Link to={createPageUrl("Contact")}>
              <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xl px-12 py-7 shadow-xl">
                הרשמה לקורס - ₪6,900
                <ArrowLeft className="mr-2 h-6 w-6" />
              </Button>
            </Link>

            <p className="text-gray-400 mt-6">
              יש לכם שאלות? <Link to={createPageUrl("Contact")} className="text-cyan-400 hover:text-cyan-300 underline">צרו איתנו קשר</Link>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer Contact */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t-4 border-cyan-500 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            ORTAM AI - מובילים את העסקים הקטנים לעידן ה-AI
          </h3>
          <div className="text-gray-600 space-y-2">
            <p>yoni.ortam@gmail.com</p>
            <p dir="ltr">052-3381822</p>
            <p>www.ortamai.com</p>
          </div>
          <p className="text-gray-500 text-sm mt-8">
            © 2024 ORTAM AI LTD - כל הזכויות שמורות
          </p>
        </div>
      </section>
    </div>
  );
}