import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card } from "@/components/ui/card";
import { Shield, Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-100 mb-4">
              <Shield className="w-8 h-8 text-cyan-600" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              מדיניות פרטיות
            </h1>
            <p className="text-xl text-gray-300">
              אנו מכבדים את פרטיותכם ופועלים על פי חוק הגנת הפרטיות
            </p>
          </div>

          <Card className="bg-white p-8 md:p-12">
            <div className="prose prose-lg max-w-none" dir="rtl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. מבוא</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                מדיניות פרטיות זו מסבירה כיצד <strong>ORTAM AI LTD</strong> (להלן: "החברה", "אנו", "אנחנו") אוספת, משתמשת, ומגינה על המידע האישי שלך כאשר אתה משתמש באתר שלנו או בשירותים שלנו.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. איסוף מידע</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                אנו אוספים מידע שאתה מספק לנו מרצונך, לרבות:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                <li>שם מלא</li>
                <li>כתובת דואר אלקטרוני</li>
                <li>מספר טלפון</li>
                <li>שם חברה/ארגון</li>
                <li>תוכן הודעות ופניות שאתה שולח אלינו</li>
                <li>קורות חיים וקבצים שאתה מעלה דרך הטפסים באתר</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. שימוש במידע</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                אנו משתמשים במידע שנאסף למטרות הבאות:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                <li>מתן שירותים והצעות מחיר</li>
                <li>תקשורת עם לקוחות ומועמדים</li>
                <li>שיפור השירותים שלנו</li>
                <li>עמידה בדרישות חוקיות</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. אחסון ואבטחת מידע</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>כל המידע שאתה שולח אלינו, לרבות קורות חיים וטפסים, נשמר בענן של גוגל (Google Cloud Platform).</strong>
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                אנו נוקטים באמצעי אבטחה סבירים להגנה על המידע שלך מפני אובדן, גישה לא מורשית, שינוי או גילוי. אולם, יש לזכור כי אף שיטת העברה או אחסון אינה מאובטחת ב-100%.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                המידע מאוחסן על שרתים מאובטחים בהתאם לתקני אבטחת מידע מובילים בתעשייה, ונשמר רק למשך הזמן הנדרש למטרות עבורן נאסף או על פי דרישות החוק.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. שיתוף מידע עם צדדים שלישיים</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                אנו לא נמכור, נשכיר או נשתף את המידע האישי שלך עם צדדים שלישיים, למעט במקרים הבאים:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                <li>כאשר נדרש על פי חוק</li>
                <li>לספקי שירות שעובדים מטעמנו (כגון שירותי ענן)</li>
                <li>במקרה של מיזוג, רכישה או מכירת נכסים</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. זכויותיך</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                על פי חוק הגנת הפרטיות, יש לך את הזכויות הבאות:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                <li><strong>זכות עיון:</strong> לקבל מידע על הנתונים האישיים שלך המצויים אצלנו</li>
                <li><strong>זכות תיקון:</strong> לבקש תיקון של מידע לא מדויק</li>
                <li><strong>זכות מחיקה:</strong> לבקש מחיקת המידע האישי שלך</li>
                <li><strong>זכות להתנגדות:</strong> להתנגד לשימוש במידע שלך למטרות שיווקיות</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. קובצי Cookie</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                אתר זה משתמש בקובצי Cookie כדי לשפר את חוויית המשתמש. באפשרותך לשלוט בהעדפות ה-Cookie שלך דרך הגדרות הדפדפן או דרך באנר ה-Cookie באתר.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. שינויים במדיניות הפרטיות</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                אנו שומרים לעצמנו את הזכות לעדכן מדיניות פרטיות זו מעת לעת. שינויים מהותיים יפורסמו באתר ויכנסו לתוקף מיד עם פרסומם.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. יצירת קשר</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                לשאלות או בקשות בנוגע למדיניות הפרטיות או לזכויותיך, אנא פנה אלינו:
              </p>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-cyan-600" />
                  <span className="text-gray-900 font-medium">yoni.ortam@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-cyan-600" />
                  <span className="text-gray-900 font-medium" dir="ltr">052-338-1822</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-cyan-600" />
                  <span className="text-gray-900 font-medium">רח' אילת 26, תל אביב יפו</span>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  מדיניות פרטיות זו עודכנה לאחרונה ב-15 בינואר 2025
                </p>
              </div>
            </div>
          </Card>

          <div className="mt-8 text-center">
            <Link to={createPageUrl("Home")}>
              <button className="text-cyan-400 hover:text-cyan-300 underline">
                חזרה לדף הבית
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}