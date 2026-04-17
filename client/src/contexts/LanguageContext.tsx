import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'he' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations[Language];
  dir: 'rtl' | 'ltr';
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
      accessibility: "נגישות",
      cta: "תאמו שיחה"
    },
    home: {
      hero_title: "המרכז לפיתוח AI",
      hero_subtitle: "גשר בין העולם הישן לעולם של AI",
      hero_desc: "חממה טכנולוגית • הכשרות מתקדמות • מרכז השמה",
      cta: "תאמו שיחה עכשיו",
      cta_secondary: "גלה עוד",
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
    stats: {
      programs: "הכשרות ייעודיות",
      satisfaction: "שביעות רצון לקוחות",
      graduates: "בוגרי הקורסים שלנו",
      partners: "שותפים אסטרטגיים"
    },
    about: {
      hero_title: "בואו להכיר אותנו",
      who: "מי אנחנו?",
      who_text: "יזמי טכנולוגיה עם ניסיון עשיר בפיתוח, בהדרכה ובבינה מלאכותית.",
      p1: "ORTAM AI פיתחה עבור משרד העבודה את הקורס הרשמי היחיד בארץ, המוכר ומפוקח על ידי המדינה ובשנתיים האחרונות אנו מכשירים גם חיילים וחיילות משוחררים מטעם משרד הביטחון.",
      p2: "את הידע שצברנו לאורך 15 שנות יזמות טכנולוגית ורדיפה מתמדת אחרי חדשנות, אנו מתרגמים לפתרונות ידידותיים, פשוטים להבנה ומעשיים ללקוחותינו.",
      vision_title: "החזון שלנו",
      vision_text: "אנו ב-ORTAM AI חולמים על עולם שבו כל אדם מצויד ביכולת להתמודד עם כל משימה, עולם שבו אתגרים הופכים להזדמנויות. עולם של תבונה וקבלת החלטות נכונה. עולם שבו חדשנות וידע מהווים את \"אור התמיד\" – עם בינה מלאכותית במרכזו.",
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
    },
    incubator: {
      hero_title: "אקסלרטור ליזמים ועסקים",
      hero_sub: "בנו את העסק שלכם עם AI ותקדמו מהר יותר מאי פעם",
      what_title: "מה אנחנו מציעים?",
      programs_title: "תוכניות האקסלרטור",
      apply_title: "מוכן להצטרף?",
      apply_sub: "הגש מועמדות לתוכנית האקסלרטור שלנו",
      apply_cta: "הגש מועמדות",
      p1: "תוכנית האקסלרטור של ORTAM AI מיועדת ליזמים ובעלי עסקים שרוצים לשלב AI בפעילות העסקית שלהם ולהתקדם מהר יותר.",
      p2: "אנו מציעים ליווי אישי, כלים מתקדמים, קהילה תומכת ורשת קשרים עסקיים שתסייע לכם לצמוח.",
      feature1_title: "ליווי אישי",
      feature1_desc: "מנטור אישי שילווה אתכם לאורך כל הדרך",
      feature2_title: "כלים מתקדמים",
      feature2_desc: "גישה לכלי AI המתקדמים ביותר",
      feature3_title: "קהילה",
      feature3_desc: "רשת של יזמים ועסקים מצליחים",
      feature4_title: "מימון",
      feature4_desc: "סיוע בגיוס מימון ומשקיעים"
    },
    academy: {
      hero_title: "מרכז הכשרות",
      hero_sub: "קורסים מתקדמים בעולם ה-AI מהמומחים שלנו",
      courses_title: "הקורסים שלנו",
      corporate_title: "הכשרות לארגונים",
      corporate_desc: "תוכניות הכשרה מותאמות לארגונים וחברות. נבנה יחד תוכנית שתענה על הצרכים הספציפיים של הארגון שלך.",
      enroll_cta: "הירשם לקורס",
      course1_title: "AI לעסקים",
      course1_desc: "קורס מקיף לשימוש ב-AI לשיפור תהליכים עסקיים",
      course1_duration: "8 שבועות",
      course2_title: "פרומפטינג מתקדם",
      course2_desc: "שליטה מלאה בכתיבת פרומפטים יעילים",
      course2_duration: "4 שבועות",
      course3_title: "AI לשיווק",
      course3_desc: "שימוש ב-AI לשיפור קמפיינים ותוכן שיווקי",
      course3_duration: "6 שבועות",
      course4_title: "אוטומציה עם AI",
      course4_desc: "בניית תהליכי אוטומציה חכמים לעסק",
      course4_duration: "6 שבועות",
      certified: "קורס מוסמך",
      ministry: "מוכר על ידי משרד העבודה"
    },
    placement: {
      hero_title: "מרכז השמה",
      hero_sub: "גישור בין מועמדים מוכשרים לארגונים מובילים",
      for_candidates: "למועמדים",
      for_employers: "למעסיקים",
      candidate_title: "מחפש עבודה בתחום ה-AI?",
      candidate_desc: "אנחנו מחברים בין כישרון לבין הזדמנות. הצוות שלנו ילווה אותך לאורך כל תהליך החיפוש.",
      employer_title: "מחפש מועמדים מוכשרים?",
      employer_desc: "יש לנו מאגר של מועמדים מוסמכים ומיומנים בתחום ה-AI. נמצא לך את האנשים הנכונים.",
      cta: "צור קשר",
      benefit1: "מאגר מועמדים מוסמכים",
      benefit2: "תהליך מהיר ויעיל",
      benefit3: "ליווי מקצועי",
      benefit4: "התאמה מדויקת"
    },
    contact: {
      hero_title: "צור קשר",
      hero_sub: "אנחנו כאן בשבילך. שלח לנו הודעה ונחזור אליך בהקדם",
      form_name: "שם מלא *",
      form_email: "כתובת אימייל *",
      form_phone: "טלפון",
      form_company: "חברה / ארגון",
      form_message: "הודעה *",
      form_submit: "שלח הודעה",
      form_success: "ההודעה נשלחה בהצלחה! נחזור אליך בהקדם.",
      form_error: "אירעה שגיאה. אנא נסה שוב.",
      info_title: "פרטי התקשרות",
      whatsapp: "דברו איתנו בוואטסאפ",
      address: "ישראל",
      phone_label: "טלפון",
      email_label: "אימייל"
    },
    accessibility: {
      title: "הצהרת נגישות",
      updated: "הצהרת הנגישות עודכנה בתאריך 15/11/25"
    },
    footer: {
      rights: "כל הזכויות שמורות",
      privacy: "מדיניות פרטיות",
      accessibility: "הצהרת נגישות",
      tagline: "גשר בין העולם הישן לעולם של AI"
    },
    whatsapp: {
      tooltip: "יש שאלה? דברו איתנו בוואטסאפ!"
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
      accessibility: "Accessibility",
      cta: "Schedule a Call"
    },
    home: {
      hero_title: "The AI Development Center",
      hero_subtitle: "Bridging the Old World and the AI World",
      hero_desc: "Tech Incubator • Advanced Training • Placement Center",
      cta: "Schedule a Call Now",
      cta_secondary: "Learn More",
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
    stats: {
      programs: "Dedicated Training Programs",
      satisfaction: "Client Satisfaction",
      graduates: "Course Graduates",
      partners: "Strategic Partners"
    },
    about: {
      hero_title: "Let's Get to Know Us",
      who: "Who We Are?",
      who_text: "Technology entrepreneurs with rich experience in development, training, and artificial intelligence.",
      p1: "ORTAM AI developed the only official course in the country for the Ministry of Labor, recognized and supervised by the state, and in recent years we have been training discharged soldiers on behalf of the Ministry of Defense.",
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
    },
    incubator: {
      hero_title: "Business Accelerator",
      hero_sub: "Build your business with AI and grow faster than ever",
      what_title: "What Do We Offer?",
      programs_title: "Accelerator Programs",
      apply_title: "Ready to Join?",
      apply_sub: "Apply to our accelerator program",
      apply_cta: "Apply Now",
      p1: "The ORTAM AI accelerator program is designed for entrepreneurs and business owners who want to integrate AI into their business activities and advance faster.",
      p2: "We offer personal guidance, advanced tools, a supportive community and a business network that will help you grow.",
      feature1_title: "Personal Mentoring",
      feature1_desc: "A personal mentor who will guide you every step of the way",
      feature2_title: "Advanced Tools",
      feature2_desc: "Access to the most advanced AI tools",
      feature3_title: "Community",
      feature3_desc: "A network of successful entrepreneurs and businesses",
      feature4_title: "Funding",
      feature4_desc: "Assistance in raising funding and investors"
    },
    academy: {
      hero_title: "Training Center",
      hero_sub: "Advanced AI courses from our experts",
      courses_title: "Our Courses",
      corporate_title: "Corporate Training",
      corporate_desc: "Customized training programs for organizations and companies. We'll build a plan that meets your organization's specific needs.",
      enroll_cta: "Enroll Now",
      course1_title: "AI for Business",
      course1_desc: "A comprehensive course for using AI to improve business processes",
      course1_duration: "8 weeks",
      course2_title: "Advanced Prompting",
      course2_desc: "Full mastery of writing effective prompts",
      course2_duration: "4 weeks",
      course3_title: "AI for Marketing",
      course3_desc: "Using AI to improve campaigns and marketing content",
      course3_duration: "6 weeks",
      course4_title: "Automation with AI",
      course4_desc: "Building smart automation processes for business",
      course4_duration: "6 weeks",
      certified: "Certified Course",
      ministry: "Recognized by the Ministry of Labor"
    },
    placement: {
      hero_title: "Placement Center",
      hero_sub: "Bridging talented candidates with leading organizations",
      for_candidates: "For Candidates",
      for_employers: "For Employers",
      candidate_title: "Looking for a job in AI?",
      candidate_desc: "We connect talent with opportunity. Our team will guide you throughout the entire job search process.",
      employer_title: "Looking for talented candidates?",
      employer_desc: "We have a pool of qualified and skilled AI candidates. We'll find the right people for you.",
      cta: "Contact Us",
      benefit1: "Certified candidate pool",
      benefit2: "Fast and efficient process",
      benefit3: "Professional guidance",
      benefit4: "Precise matching"
    },
    contact: {
      hero_title: "Contact Us",
      hero_sub: "We're here for you. Send us a message and we'll get back to you soon",
      form_name: "Full Name *",
      form_email: "Email Address *",
      form_phone: "Phone",
      form_company: "Company / Organization",
      form_message: "Message *",
      form_submit: "Send Message",
      form_success: "Message sent successfully! We'll get back to you soon.",
      form_error: "An error occurred. Please try again.",
      info_title: "Contact Information",
      whatsapp: "Chat with us on WhatsApp",
      address: "Israel",
      phone_label: "Phone",
      email_label: "Email"
    },
    accessibility: {
      title: "Accessibility Statement",
      updated: "Accessibility statement updated: 15/11/25"
    },
    footer: {
      rights: "All rights reserved",
      privacy: "Privacy Policy",
      accessibility: "Accessibility Statement",
      tagline: "Bridging the old world with the AI world"
    },
    whatsapp: {
      tooltip: "Have a question? Chat with us on WhatsApp!"
    }
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('he');
  const dir = lang === 'he' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang], dir }}>
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
