import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'he' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations[Language];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations = {
  he: {
    nav: {
      home: "בית",
      incubator: "אקסלרטור ליזמים ועסקים",
      academy: "מרכז הכשרות",
      placement: "מרכז השמה",
      about: "אודות",
      contact: "צור קשר",
      cta: "תאמו שיחה"
    },
    home: {
      hero_title: "המרכז לפיתוח AI",
      hero_subtitle: "גשר בין העולם הישן לעולם של AI",
      hero_desc: "חממה טכנולוגית • הכשרות מתקדמות • מרכז השמה",
      cta: "תאמו שיחה עכשיו",
      pillars_title: "שלושת עמודי התווך שלנו",
      pillars_sub: "פתרון מקיף לכל צורך בעולם ה-AI",
      why_title: "למה לבחור ב-ORTAM AI?",
      why_sub: "יתרונות שמבדילים אותנו מכל השאר",
      how_title: "איך זה עובד?",
      how_sub: "תהליך פשוט ויעיל להצלחה שלכם",
      partners_title: "הם כבר סומכים עלינו",
      partners_sub: "שותפים ומוסדות מובילים שעובדים איתנו",
      final_title: "מוכנים להתחיל את המסע?",
      final_sub: "בואו נדבר על איך נוכל לעזור לכם להשתלב בעולם ה-AI",
      final_cta: "תאמו שיחת ייעוץ חינם"
    },
    about: {
      hero_title: "בואו להכיר אותנו",
      who: "מי אנחנו?",
      who_text: "יזמי טכנולוגיה עם ניסיון עשיר בפיתוח, בהדרכה ובבינה מלאכותית.",
      p1: "ORTAM AI פיתחה עבור משרד העבודה את הקורס הרשמי היחיד בארץ, המוכר ומפוקח על ידי המדינה ובשנתיים האחרונות אנו מכשירים גם חיילים וחיילות משוחררים מטעם משרד הביטחון.",
      p2: "את הידע שצברנו לאורך 15 שנות יזמות טכנולוגית ורדיפה מתמדת אחרי חדשנות, אנו מתרגמים לפתרונות ידידותיים, פשוטים להבנה ומעשיים ללקוחותינו.",
      vision_title: "החזון שלנו",
      vision_text: 'אנו ב-ORTAM AI חולמים על עולם שבו כל אדם מצויד ביכולת להתמודד עם כל משימה, עולם שבו אתגרים הופכים להזדמנויות. עולם של תבונה וקבלת החלטות נכונה. עולם שבו חדשנות וידע מהווים את "אור התמיד" – עם בינה מלאכותית במרכזו.',
      mission_title: "המשימה שלנו",
      mission_p1: "המשימה שלנו ב-ORTAM AI היא לבנות גשר בין העולם הישן לעולם החדש של הבינה המלאכותית.",
      mission_p2: "בכל יום אנו פוגשים עובדים, יזמים ובעלי עסקים שחוששים מבינה מלאכותית, משוכנעים שהטכנולוגיה לא בשבילם או שלא תעבוד עבורם. אולם בכל פעם מחדש אנו מוכיחים – עבודה נכונה עם AI פותחת דלתות ליכולות שלא הכרת, מגדילה תפוקה, חוסכת זמן יקר ומשאבים.",
      mission_p3: "באמצעות שיטת ORTAM לעבודה עם AI, אנו מביאים את הבשורה לכל עובד, יזם ועסק בישראל.",
      values_title: "הערכים שלנו",
      excellence: "מצוינות",
      excellence_desc: "אנו שואפים למצוינות בכל מה שאנו עושים",
      commitment: "מחויבות",
      commitment_desc: "מחויבים להצלחת הלקוחות והשותפים שלנו",
      innovation: "חדשנות",
      innovation_desc: "תמיד בחזית הטכנולוגיה והחדשנות",
      team_title: "הצוות שלנו",
      team_sub: "האנשים שמובילים את החזון",
      cta_title: "רוצים להכיר אותנו יותר?",
      cta_sub: "בואו נפגש ונדבר על איך נוכל לעזור לכם",
      cta_btn: "צרו קשר"
    }
  },
  en: {
    nav: {
      home: "Home",
      incubator: "Business Accelerator",
      academy: "Training Center",
      placement: "Placement Center",
      about: "About",
      contact: "Contact",
      cta: "Schedule a Call"
    },
    home: {
      hero_title: "The AI Development Center",
      hero_subtitle: "Bridging the Old World and the AI World",
      hero_desc: "Tech Incubator • Advanced Training • Placement Center",
      cta: "Schedule a Call Now",
      pillars_title: "Our Three Pillars",
      pillars_sub: "A comprehensive solution for every AI need",
      why_title: "Why Choose ORTAM AI?",
      why_sub: "Advantages that set us apart from everyone else",
      how_title: "How Does It Work?",
      how_sub: "A simple and effective process for your success",
      partners_title: "They Already Trust Us",
      partners_sub: "Leading partners and institutions working with us",
      final_title: "Ready to Start the Journey?",
      final_sub: "Let's talk about how we can help you integrate into the AI world",
      final_cta: "Schedule a Free Consultation Call"
    },
    about: {
      hero_title: "Let's Get to Know Us",
      who: "Who We Are?",
      who_text: "Technology entrepreneurs with rich experience in development, training, and artificial intelligence.",
      p1: "ORTAM AI developed the only official course in the country for the Ministry of Labor, recognized and supervised by the state, and in recent years we have been training discharged soldiers and soldiers on behalf of the Ministry of Defense.",
      p2: "The knowledge we have accumulated over 15 years of technological entrepreneurship and constant pursuit of innovation, we translate into friendly, easy-to-understand and practical solutions for our clients.",
      vision_title: "Our Vision",
      vision_text: "At ORTAM AI, we dream of a world where every person is equipped with the ability to handle any task, a world where challenges become opportunities. A world of wisdom and right decision-making. A world where innovation and knowledge constitute the eternal light – with artificial intelligence at its core.",
      mission_title: "Our Mission",
      mission_p1: "Our mission at ORTAM AI is to build a bridge between the old world and the new world of artificial intelligence.",
      mission_p2: "Every day we meet employees, entrepreneurs and business owners who are afraid of artificial intelligence, convinced that technology is not for them or won't work for them. But again and again we prove – working correctly with AI opens doors to abilities you didn't know, increases productivity, saves precious time and resources.",
      mission_p3: "Through the ORTAM method of working with AI, we bring the good news to every employee, entrepreneur and business in Israel.",
      values_title: "Our Values",
      excellence: "Excellence",
      excellence_desc: "We strive for excellence in everything we do",
      commitment: "Commitment",
      commitment_desc: "Committed to the success of our clients and partners",
      innovation: "Innovation",
      innovation_desc: "Always at the forefront of technology and innovation",
      team_title: "Our Team",
      team_sub: "The people leading the vision",
      cta_title: "Want to Know Us Better?",
      cta_sub: "Let's meet and talk about how we can help you",
      cta_btn: "Contact Us"
    }
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('he');

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
