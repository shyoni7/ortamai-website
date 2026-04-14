import React from "react";
import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function AccessibilityStatement() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              הצהרת נגישות
            </h1>
          </div>

          <Card className="bg-white p-8 md:p-12">
            <div className="prose prose-lg max-w-none" dir="rtl">
              <p className="text-gray-600 mb-6">
                הצהרת הנגישות עודכנה בתאריך 15/11/25
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                [אורתם AI], [ארגון להכשרת מקצועית והדרכה בתחום ה AI]. אנו פועלים רבות על מנת
                להנגיש את הארגון ואת אתר האינטרנט שלנו לאנשים עם מוגבלות על מנת לקדם
                שוויון זכויות ושקיפות לכלל אנשים עם מוגבלות [אנו נאפשר לכל אדם ללמוד בקורסים
                שלנו כיצד לעבוד עם AI]
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                מהות אתר אינטרנט נגיש
              </h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                אתר אינטרנט נגיש, הינו אתר המאפשר לאדם עם מוגבלות, לגלוש באותה רמת יעילות
                והנאה כנגולשים אחרים, תוך שימוש ביכולות המערכת עליה הוא פועל ובאמצעות
                טכנולוגיות מסייעות לנגישות.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                ביצוע התאמות הנגישות באתר האינטרנט
              </h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                התאמות הנגישות באתר בוצעו בהתאם לסימן ג': שירות האינטרנט בתקנות שוויון
                זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות) התשע"ג 2013, לתקן הישראלי
                ת"י 5568 המבוסס על הנחיות WCAG 2.0, האתר הונגש לרמה [AA\AAA] [ובכפוף
                לשינויים והתאמות שבוצעו במסמך התקן הישראלי.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                האתר תומך בשימוש בטכנולוגיות מסייעות כגון תוכנות הקראת מסך, בגלישה בעזרת
                מקלדת על ידי שימוש במקשי ה-Tab ו-Shift+Tab למעבר בין קישורים, מקשי החיצים,
                מקש ה-Enter לבחירה, מקש ה-Esc ליציאה מתפריטים וחלונות, לחיצה על H או על
                מספר למעבר בין כותרות.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                האתר נבדק [באופן קבוע / כל 6 חודשים] כדי להבטיח את תחזוקת נגישות האתר.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                הצהרה על עמידה חלקית בתקן במקרה של תכני צד ג' (אם קיימים)
              </h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                בדפי האתר הבאים <a href="https://ortamai.com/Academy" className="text-cyan-600 hover:text-cyan-700 underline">https://ortamai.com/Academy</a> נגישות הדף תלויה בתכנים שאינם של
                הארגון (תכני צד ג') ולכן אנחנו מצהירים על עמידה חלקית בתקן עבור דפים אילו.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                ישימות מיטבית לנגישות באתר האינטרנט
              </h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                באתר אינטרנט זה, ניתן לגלוש בצורה מיטבית ונגישה באמצעות הדפדפנים הנפוצים
                ומומלץ להשתמש בדפדפנים הבאים: Edge / Firefox / Opera / Safari / Lynx /
                Chrome ובתוכנת קוראות מסך [Voiceover / Jaws/ NVDA].
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                שלבי ההנגשה בהם נמצא האתר
              </h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                אנו עובדים במרץ על הנגשת האתר ומאמינים שרובו כבר מונגש אך, אנו מעריכים
                שהנגשת האתר תושלם עד לתאריך ה30/1/26. עד לתאריך זה, ניתן להגדיל את
                הטקסט ולבצע פעולות נגישות רבות אך לא את כול.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                הסדרי נגישות בארגון
              </h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                נגישות היא ערך חשוב בארגון שלנו ואנו מקפידים כי הקורסים שלנו יערכו בכיתות מתאימות
                ולכל שאלה או פניה לאדם הזקוק לנגישות ניתן לפנות אלינו אישית בטלפון 052-3381822
                ולקבל מענה אישי.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                דרכי פניה לבקשות, תקלות נגישות והצעות לשיפור:
              </h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                במידה ומצאתם באתר האינטרנט בעיה בנושא הנגישות או שהנכם זקוקים עזרה, אתם
                מוזמנים לפנות אלינו דרך רכז הנגישות של הארגון:
              </p>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-6">
                <p className="text-gray-900 font-semibold mb-2">אריאל אלבוים</p>
                <p className="text-gray-700 mb-1" dir="ltr">050-8785807</p>
                <p className="text-gray-700">yoni.ortam@gmail.com</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}