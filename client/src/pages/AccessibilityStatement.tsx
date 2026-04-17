import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AccessibilityStatement() {
  const { lang, dir } = useLanguage();
  const isRtl = lang === 'he';

  return (
    <div dir={dir} className="min-h-screen">
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e27] via-[#0d1235] to-[#0a0e27]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-bold text-gradient-cyan mb-4">
            {isRtl ? 'הצהרת נגישות' : 'Accessibility Statement'}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-gray-400 mb-12">
            {isRtl ? 'עודכן: 15/11/2025' : 'Updated: 15/11/2025'}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-2xl p-8 space-y-6 text-gray-300 leading-relaxed">
            {isRtl ? (
              <>
                <p>ORTAM AI מחויבת לנגישות דיגיטלית ומשתדלת לאפשר לאנשים עם מוגבלויות להשתמש באתר שלנו בצורה נוחה ומלאה.</p>
                <h2 className="text-xl font-bold text-white">מה אנחנו עושים?</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  <li>האתר בנוי בהתאם לתקן WCAG 2.1 ברמה AA</li>
                  <li>ניתן לנווט באתר באמצעות מקלדת בלבד</li>
                  <li>כל התמונות כוללות טקסט חלופי (alt text)</li>
                  <li>ניגודיות צבעים עומדת בדרישות הנגישות</li>
                  <li>האתר תומך בקוראי מסך</li>
                  <li>ניתן להגדיל את גודל הטקסט ללא פגיעה בתצוגה</li>
                </ul>
                <h2 className="text-xl font-bold text-white">יצירת קשר בנושא נגישות</h2>
                <p>אם נתקלתם בבעיית נגישות באתר, אנא צרו איתנו קשר:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>אימייל: ortamai.il@gmail.com</li>
                  <li>טלפון: 052-808-3800</li>
                </ul>
                <p>נשתדל לטפל בפנייה בתוך 5 ימי עסקים.</p>
              </>
            ) : (
              <>
                <p>ORTAM AI is committed to digital accessibility and strives to enable people with disabilities to use our website comfortably and fully.</p>
                <h2 className="text-xl font-bold text-white">What We Do</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>The site is built according to WCAG 2.1 Level AA standard</li>
                  <li>The site can be navigated using keyboard only</li>
                  <li>All images include alternative text (alt text)</li>
                  <li>Color contrast meets accessibility requirements</li>
                  <li>The site supports screen readers</li>
                  <li>Text size can be increased without affecting display</li>
                </ul>
                <h2 className="text-xl font-bold text-white">Contact Us About Accessibility</h2>
                <p>If you encounter an accessibility issue on the site, please contact us:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Email: ortamai.il@gmail.com</li>
                  <li>Phone: 052-808-3800</li>
                </ul>
                <p>We will try to handle your inquiry within 5 business days.</p>
              </>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
