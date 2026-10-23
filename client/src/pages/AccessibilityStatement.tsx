import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AccessibilityStatement() {
  const { lang, dir } = useLanguage();
  const isRtl = lang === 'he';

  return (
    <div dir={dir} className="min-h-screen">
      <section style={{ background: 'var(--h-dark)' }}>
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-16 md:py-24">
          <h1 className="h-rise font-extrabold text-white leading-[1.05]" style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)' }}>
            {isRtl ? 'הצהרת נגישות' : 'Accessibility Statement'}
          </h1>
          <p className="mt-4" style={{ color: 'var(--h-on-dark)' }}>
            {isRtl ? 'עודכן: 15/11/2025' : 'Updated: 15/11/2025'}
          </p>
        </div>
      </section>
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <div className="legal-card space-y-6">
            {isRtl ? (
              <>
                <p>ORTAM AI מחויבת לנגישות דיגיטלית ומשתדלת לאפשר לאנשים עם מוגבלויות להשתמש באתר שלנו בצורה נוחה ומלאה.</p>
                <h2 className="text-xl md:text-2xl font-bold">מה אנחנו עושים?</h2>
                <ul className="list-disc ps-5 space-y-2">
                  <li>האתר בנוי בהתאם לתקן WCAG 2.1 ברמה AA</li>
                  <li>ניתן לנווט באתר באמצעות מקלדת בלבד</li>
                  <li>כל התמונות כוללות טקסט חלופי (alt text)</li>
                  <li>ניגודיות צבעים עומדת בדרישות הנגישות</li>
                  <li>האתר תומך בקוראי מסך</li>
                  <li>ניתן להגדיל את גודל הטקסט ללא פגיעה בתצוגה</li>
                </ul>
                <h2 className="text-xl md:text-2xl font-bold">יצירת קשר בנושא נגישות</h2>
                <p>אם נתקלתם בבעיית נגישות באתר, אנא צרו איתנו קשר:</p>
                <ul className="list-disc ps-5 space-y-2">
                  <li>אימייל: info@ortamai.com</li>
                  <li>טלפון: 052-338-1822</li>
                </ul>
                <p>נשתדל לטפל בפנייה בתוך 5 ימי עסקים.</p>
              </>
            ) : (
              <>
                <p>ORTAM AI is committed to digital accessibility and strives to enable people with disabilities to use our website comfortably and fully.</p>
                <h2 className="text-xl md:text-2xl font-bold">What We Do</h2>
                <ul className="list-disc ps-5 space-y-2">
                  <li>The site is built according to WCAG 2.1 Level AA standard</li>
                  <li>The site can be navigated using keyboard only</li>
                  <li>All images include alternative text (alt text)</li>
                  <li>Color contrast meets accessibility requirements</li>
                  <li>The site supports screen readers</li>
                  <li>Text size can be increased without affecting display</li>
                </ul>
                <h2 className="text-xl md:text-2xl font-bold">Contact Us About Accessibility</h2>
                <p>If you encounter an accessibility issue on the site, please contact us:</p>
                <ul className="list-disc ps-5 space-y-2">
                  <li>Email: info@ortamai.com</li>
                  <li>Phone: 052-338-1822</li>
                </ul>
                <p>We will try to handle your inquiry within 5 business days.</p>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
