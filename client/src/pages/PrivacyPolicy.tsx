import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Shield } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } };

export default function PrivacyPolicy() {
  const { lang, dir } = useLanguage();

  return (
    <div className="pt-20 min-h-screen" dir={dir}>
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-10 right-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-400 font-medium">
                {lang === 'he' ? 'מדיניות פרטיות' : 'Privacy Policy'}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {lang === 'he' ? 'מדיניות פרטיות' : 'Privacy Policy'}
            </h1>
            <p className="text-gray-400 text-lg">
              {lang === 'he' ? 'עדכון אחרון: ינואר 2025' : 'Last updated: January 2025'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="glass rounded-2xl p-8 md:p-12 space-y-8 text-gray-300 leading-relaxed"
          >
            {lang === 'he' ? (
              <>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">1. כללי</h2>
                  <p>
                    ORTAM AI ("החברה", "אנחנו") מכבדת את פרטיות המשתמשים באתר ובשירותים שלה. מדיניות פרטיות זו מסבירה כיצד אנו אוספים, משתמשים ומגנים על המידע האישי שלך.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">2. מידע שאנו אוספים</h2>
                  <p className="mb-3">אנו עשויים לאסוף את סוגי המידע הבאים:</p>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li><strong className="text-white">מידע שאתה מספק:</strong> שם, כתובת דוא"ל, מספר טלפון, שם חברה, ופרטים נוספים שאתה מזין בטפסי יצירת קשר.</li>
                    <li><strong className="text-white">מידע טכני:</strong> כתובת IP, סוג דפדפן, מערכת הפעלה, ועמודים שביקרת בהם.</li>
                    <li><strong className="text-white">עוגיות (Cookies):</strong> קבצים קטנים המאוחסנים בדפדפן שלך לשיפור חוויית הגלישה.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">3. כיצד אנו משתמשים במידע</h2>
                  <p className="mb-3">אנו משתמשים במידע שנאסף לצרכים הבאים:</p>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li>מתן מענה לפניות ויצירת קשר</li>
                    <li>שליחת עדכונים ומידע על שירותינו (בהסכמתך)</li>
                    <li>שיפור האתר והשירותים שלנו</li>
                    <li>עמידה בדרישות חוקיות</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">4. שיתוף מידע עם צדדים שלישיים</h2>
                  <p>
                    אנו לא מוכרים, משכירים או מעבירים את המידע האישי שלך לצדדים שלישיים ללא הסכמתך, למעט במקרים הבאים:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mr-4 mt-3">
                    <li>ספקי שירות הפועלים בשמנו (כגון שירותי דוא"ל)</li>
                    <li>כאשר נדרש על פי חוק</li>
                    <li>להגנה על זכויות החברה</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">5. אבטחת מידע</h2>
                  <p>
                    אנו נוקטים באמצעי אבטחה סבירים להגנה על המידע האישי שלך מפני גישה בלתי מורשית, שינוי, גילוי או מחיקה. עם זאת, אין אנו יכולים להבטיח אבטחה מוחלטת של מידע המועבר דרך האינטרנט.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">6. עוגיות (Cookies)</h2>
                  <p>
                    האתר שלנו משתמש בעוגיות לשיפור חוויית המשתמש. תוכל להגדיר את הדפדפן שלך לדחות עוגיות, אך הדבר עלול להשפיע על תפקוד האתר.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">7. זכויותיך</h2>
                  <p className="mb-3">בהתאם לחוק הגנת הפרטיות, יש לך הזכות:</p>
                  <ul className="list-disc list-inside space-y-2 mr-4">
                    <li>לעיין במידע האישי שלך המוחזק אצלנו</li>
                    <li>לתקן מידע שגוי</li>
                    <li>לבקש מחיקת המידע שלך</li>
                    <li>לבטל הסכמה לקבלת דיוור שיווקי</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">8. יצירת קשר</h2>
                  <p>
                    לשאלות בנוגע למדיניות הפרטיות שלנו, ניתן לפנות אלינו:
                  </p>
                  <div className="mt-3 glass rounded-xl p-4">
                    <p><strong className="text-white">ORTAM AI</strong></p>
                    <p>דוא"ל: <a href="mailto:info@ortamai.co.il" className="text-cyan-400 hover:underline">info@ortamai.co.il</a></p>
                    <p>טלפון: <a href="tel:+972524444474" className="text-cyan-400 hover:underline">052-4444474</a></p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">1. General</h2>
                  <p>
                    ORTAM AI ("the Company", "we") respects the privacy of users of its website and services. This Privacy Policy explains how we collect, use, and protect your personal information.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
                  <p className="mb-3">We may collect the following types of information:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong className="text-white">Information you provide:</strong> Name, email address, phone number, company name, and other details you enter in contact forms.</li>
                    <li><strong className="text-white">Technical information:</strong> IP address, browser type, operating system, and pages visited.</li>
                    <li><strong className="text-white">Cookies:</strong> Small files stored in your browser to improve browsing experience.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Information</h2>
                  <p className="mb-3">We use collected information for the following purposes:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Responding to inquiries and contact requests</li>
                    <li>Sending updates and information about our services (with your consent)</li>
                    <li>Improving our website and services</li>
                    <li>Complying with legal requirements</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">4. Sharing Information with Third Parties</h2>
                  <p>
                    We do not sell, rent, or transfer your personal information to third parties without your consent, except in the following cases:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                    <li>Service providers acting on our behalf (such as email services)</li>
                    <li>When required by law</li>
                    <li>To protect the rights of the company</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">5. Data Security</h2>
                  <p>
                    We take reasonable security measures to protect your personal information from unauthorized access, modification, disclosure, or deletion. However, we cannot guarantee absolute security of information transmitted over the internet.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">6. Cookies</h2>
                  <p>
                    Our website uses cookies to improve user experience. You can configure your browser to reject cookies, but this may affect website functionality.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">7. Your Rights</h2>
                  <p className="mb-3">In accordance with privacy protection laws, you have the right to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Access your personal information held by us</li>
                    <li>Correct inaccurate information</li>
                    <li>Request deletion of your information</li>
                    <li>Withdraw consent for marketing communications</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">8. Contact Us</h2>
                  <p>
                    For questions regarding our privacy policy, please contact us:
                  </p>
                  <div className="mt-3 glass rounded-xl p-4">
                    <p><strong className="text-white">ORTAM AI</strong></p>
                    <p>Email: <a href="mailto:info@ortamai.co.il" className="text-cyan-400 hover:underline">info@ortamai.co.il</a></p>
                    <p>Phone: <a href="tel:+972524444474" className="text-cyan-400 hover:underline">052-4444474</a></p>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
