import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export default function PrivacyPolicy() {
  const { lang } = useLanguage();
  const isRtl = lang === 'he';

  return (
    <div className="min-h-screen bg-gray-50" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-700 via-violet-700 to-indigo-700 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 bg-white/15 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              {isRtl ? 'מדיניות פרטיות' : 'Privacy Policy'}
            </h1>
            <p className="text-purple-200 text-lg">
              {isRtl ? 'אנו מכבדים את פרטיותכם ופועלים על פי חוק הגנת הפרטיות' : 'We respect your privacy and comply with privacy protection law'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link href="/">
            <a className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 text-sm font-medium mb-8 transition-colors">
              <ArrowRight className="w-4 h-4" />
              {isRtl ? 'חזרה לדף הבית' : 'Back to Home'}
            </a>
          </Link>

          <div className="space-y-5">
            {[
              {
                title: isRtl ? '1. מבוא' : '1. Introduction',
                body: isRtl
                  ? <p>מדיניות פרטיות זו מסבירה כיצד <strong>ORTAM AI LTD</strong> (להלן: "החברה", "אנו", "אנחנו") אוספת, משתמשת, ומגינה על המידע האישי שלך כאשר אתה משתמש באתר שלנו או בשירותים שלנו.</p>
                  : <p>This Privacy Policy explains how <strong>ORTAM AI LTD</strong> collects, uses, and protects your personal information when you use our website or services.</p>,
              },
              {
                title: isRtl ? '2. איסוף מידע' : '2. Information We Collect',
                body: isRtl
                  ? <><p className="mb-3">אנו אוספים מידע שאתה מספק לנו מרצונך, לרבות:</p><ul className="list-disc list-inside space-y-1 text-gray-600 pr-2"><li>שם מלא</li><li>כתובת דואר אלקטרוני</li><li>מספר טלפון</li><li>שם חברה/ארגון</li><li>תוכן הודעות ופניות שאתה שולח אלינו</li><li>קורות חיים וקבצים שאתה מעלה דרך הטפסים באתר</li></ul></>
                  : <><p className="mb-3">We collect information you voluntarily provide, including:</p><ul className="list-disc list-inside space-y-1 text-gray-600 pl-2"><li>Full name</li><li>Email address</li><li>Phone number</li><li>Company/organization name</li><li>Messages and inquiries you send us</li><li>CVs and files uploaded through our forms</li></ul></>,
              },
              {
                title: isRtl ? '3. שימוש במידע' : '3. How We Use Information',
                body: isRtl
                  ? <><p className="mb-3">אנו משתמשים במידע שנאסף למטרות הבאות:</p><ul className="list-disc list-inside space-y-1 text-gray-600 pr-2"><li>מתן שירותים והצעות מחיר</li><li>תקשורת עם לקוחות ומועמדים</li><li>שיפור השירותים שלנו</li><li>עמידה בדרישות חוקיות</li></ul></>
                  : <><p className="mb-3">We use collected information for:</p><ul className="list-disc list-inside space-y-1 text-gray-600 pl-2"><li>Providing services and quotes</li><li>Communicating with clients and candidates</li><li>Improving our services</li><li>Complying with legal requirements</li></ul></>,
              },
              {
                title: isRtl ? '4. אחסון ואבטחת מידע' : '4. Storage & Data Security',
                body: isRtl
                  ? <><p className="mb-3"><strong>כל המידע שאתה שולח אלינו, לרבות קורות חיים וטפסים, נשמר בענן של גוגל (Google Cloud Platform).</strong></p><p>אנו נוקטים באמצעי אבטחה סבירים להגנה על המידע שלך. המידע נשמר רק למשך הזמן הנדרש למטרות עבורן נאסף.</p></>
                  : <><p className="mb-3"><strong>All information you submit, including CVs and forms, is stored on Google Cloud Platform.</strong></p><p>We take reasonable security measures to protect your data and retain it only as long as necessary.</p></>,
              },
              {
                title: isRtl ? '5. שיתוף מידע עם צדדים שלישיים' : '5. Sharing with Third Parties',
                body: isRtl
                  ? <><p className="mb-3">אנו לא נמכור, נשכיר או נשתף את המידע האישי שלך, למעט:</p><ul className="list-disc list-inside space-y-1 text-gray-600 pr-2"><li>כאשר נדרש על פי חוק</li><li>לספקי שירות שעובדים מטעמנו (כגון שירותי ענן)</li><li>במקרה של מיזוג, רכישה או מכירת נכסים</li></ul></>
                  : <><p className="mb-3">We will not sell, rent, or share your personal information, except:</p><ul className="list-disc list-inside space-y-1 text-gray-600 pl-2"><li>When required by law</li><li>Service providers acting on our behalf</li><li>In case of merger, acquisition, or asset sale</li></ul></>,
              },
              {
                title: isRtl ? '6. זכויותיך' : '6. Your Rights',
                body: isRtl
                  ? <><p className="mb-3">על פי חוק הגנת הפרטיות, יש לך את הזכויות הבאות:</p><ul className="space-y-2 text-gray-600 pr-2"><li><strong>זכות עיון:</strong> לקבל מידע על הנתונים האישיים שלך</li><li><strong>זכות תיקון:</strong> לבקש תיקון של מידע לא מדויק</li><li><strong>זכות מחיקה:</strong> לבקש מחיקת המידע האישי שלך</li><li><strong>זכות להתנגדות:</strong> להתנגד לשימוש במידע שלך למטרות שיווקיות</li></ul></>
                  : <><p className="mb-3">Under privacy protection law, you have the right to:</p><ul className="space-y-2 text-gray-600 pl-2"><li><strong>Access:</strong> Receive information about your personal data we hold</li><li><strong>Correction:</strong> Request correction of inaccurate data</li><li><strong>Deletion:</strong> Request deletion of your personal data</li><li><strong>Objection:</strong> Object to use of your data for marketing</li></ul></>,
              },
              {
                title: isRtl ? '7. קובצי Cookie' : '7. Cookies',
                body: isRtl
                  ? <p>אתר זה משתמש בקובצי Cookie כדי לשפר את חוויית המשתמש. באפשרותך לשלוט בהעדפות ה-Cookie שלך דרך הגדרות הדפדפן.</p>
                  : <p>This site uses cookies to improve user experience. You can control cookie preferences through your browser settings.</p>,
              },
              {
                title: isRtl ? '8. שינויים במדיניות' : '8. Policy Changes',
                body: isRtl
                  ? <p>אנו שומרים לעצמנו את הזכות לעדכן מדיניות פרטיות זו מעת לעת. שינויים מהותיים יפורסמו באתר.</p>
                  : <p>We reserve the right to update this Privacy Policy at any time. Material changes will be published on the site.</p>,
              },
              {
                title: isRtl ? '9. יצירת קשר' : '9. Contact Us',
                body: (
                  <div className="space-y-1 text-gray-600">
                    <p>{isRtl ? 'לשאלות בנוגע למדיניות הפרטיות:' : 'For questions about this Privacy Policy:'}</p>
                    <p className="mt-3"><a href="mailto:yoni.ortam@gmail.com" className="text-purple-600 hover:underline">yoni.ortam@gmail.com</a></p>
                    <p><a href="tel:052-338-1822" className="text-purple-600 hover:underline">052-338-1822</a></p>
                    <p>{isRtl ? "רח' אילת 26, תל אביב יפו" : "26 Eilat St., Tel Aviv-Jaffa"}</p>
                  </div>
                ),
              },
            ].map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">{section.title}</h2>
                <div className="text-gray-600 leading-relaxed">{section.body}</div>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-gray-400 text-sm mt-10">
            {isRtl ? 'מדיניות פרטיות זו עודכנה לאחרונה ב-15 בינואר 2025' : 'This Privacy Policy was last updated on January 15, 2025'}
          </p>
        </div>
      </section>
    </div>
  );
}
