/**
 * Frequently asked questions, shown on the page and published as FAQPage structured data.
 * Answers state only what the site already commits to: prices, hours, format and
 * requirements come from the course catalog and the syllabi.
 */

export interface Faq {
  q: { he: string; en: string };
  a: { he: string; en: string };
}

/** /courses: choosing between the courses. */
export const COURSES_FAQ: Faq[] = [
  {
    q: { he: 'מה קורס ה-AI הכי מתאים למתחילים?', en: 'Which AI course is best for beginners?' },
    a: {
      he: 'למתחילים בלי רקע טכני מתאים הקורס "מה AI יכול לעשות בשבילך?": כתיבת פרומפטים, כלים מעשיים לעבודה ולעסק ותרגול על משימות אמיתיות, במחיר 1,500 ש"ח. מי שרוצה לבנות אתרים ואפליקציות יכול להתחיל ישר בקורס Claude Code, שמתחיל מאפס מוחלט ואינו דורש ניסיון בתכנות.',
      en: 'For beginners with no technical background, "What Can AI Do for You?" is the best fit: prompt writing, practical tools for work and business, and practice on real tasks, for 1,500 ILS. If you want to build websites and apps, you can start directly with the Claude Code course, which begins from absolute zero and needs no programming experience.',
    },
  },
  {
    q: { he: 'מה הקורס הכי מקיף לקלוד קוד (Claude Code)?', en: 'What is the most comprehensive Claude Code course?' },
    a: {
      he: 'הקורס המקיף ביותר שלנו לקלוד קוד הוא "לשלוט ב-Claude Code: מ-0 ל-100": 6 מפגשים פרונטליים, 30 שעות, מההתקנה הראשונה ועד פרויקט גמר אישי שעובד באוויר, במחיר 2,900 ש"ח. מי שרוצה ללכת רחוק יותר, עד הטמעת AI בארגונים, ימשיך לקורס FDE של 106 שעות.',
      en: 'Our most comprehensive Claude Code course is "Mastering Claude Code: 0 to 100": 6 in-person sessions, 30 hours, from first install to a personal capstone project that runs live, for 2,900 ILS. To go further, all the way to implementing AI in organizations, continue to the 106-hour FDE course.',
    },
  },
  {
    q: { he: 'איזה קורס מתאים למי שרוצה ללמוד יצירת וידאו ב-AI?', en: 'Which course teaches AI video creation?' },
    a: {
      he: 'AI STUDIO - קורס ליוצרי סרטים ומדיה: 6 מפגשים, 30 שעות, 2,900 ש"ח. לומדים ליצור תמונות ונכסים, אווטארים, סרטוני ליפ סינק וסרטוני עלילה, ומסיימים עם סרט גמר ותיק עבודות ראשון. מי שרוצה רק לטעום יכול להתחיל בשיעור הקבוצתי "בוא ניצור ביחד" ב-450 ש"ח למפגש.',
      en: 'AI STUDIO - A Course for Film and Media Creators: 6 sessions, 30 hours, 2,900 ILS. You learn to create images and assets, avatars, lip-sync videos and narrative films, and finish with a capstone film and a first portfolio. For a taste first, the group lesson "Let\'s Create Together" is 450 ILS per session.',
    },
  },
  {
    q: { he: 'מה זה קורס FDE ולמי הוא מתאים?', en: 'What is the FDE course and who is it for?' },
    a: {
      he: 'FDE הוא Forward Deployed Engineer: מטמיע AI שלוקח בעיה עסקית והופך אותה לפתרון AI שעובד בארגון. קורס FDE שלנו הוא 106 שעות ב-10 מודולים, במחיר 8,900 ש"ח, ומתאים למפתחים, לאנשי מערכות מידע ותפעול, ליועצים ולמי שרוצה הסבה מקצועית לתפקיד מטמיע AI.',
      en: 'FDE stands for Forward Deployed Engineer: an AI implementer who takes a business problem and turns it into an AI solution that works inside the organization. Our FDE course is 106 hours in 10 modules, priced at 8,900 ILS, and suits developers, IT and operations people, consultants and career changers.',
    },
  },
  {
    q: { he: 'צריך רקע בתכנות כדי ללמוד וייב קודינג ופיתוח עם AI?', en: 'Do I need a programming background to learn vibe coding and building with AI?' },
    a: {
      he: 'לא. קורס Claude Code מתחיל מאפס מוחלט ומתאים גם למי שלא כתב שורת קוד. בוייב קודינג מתארים ל-AI במילים מה רוצים לבנות, והוא כותב את הקוד. בקורס לומדים איך לבקש נכון, לבדוק את התוצאה ולתקן.',
      en: 'No. The Claude Code course starts from absolute zero and suits people who have never written a line of code. In vibe coding you describe in words what you want to build and the AI writes the code. The course teaches you to ask well, check the result and fix it.',
    },
  },
  {
    q: { he: 'איזה קורס מתאים לבעלי עסקים שרוצים סוכני AI ואוטומציות?', en: 'Which course suits business owners who want AI agents and automations?' },
    a: {
      he: 'הקורס "סוכני AI ואוטומציות לעסקים": בונים סוכני AI שעונים ללקוחות, מתאמים ומעדכנים, ומחברים את הכלים של העסק לאוטומציות שחוסכות עבודה ידנית. המחיר נמסר בשיחה.',
      en: '"AI Agents & Automation for Business": you build AI agents that answer customers, schedule and update, and connect your business tools into automations that cut manual work. The price is given on request.',
    },
  },
  {
    q: { he: 'כמה עולה קורס AI ב-ORTAM AI?', en: 'How much does an AI course at ORTAM AI cost?' },
    a: {
      he: 'קורס AI למתחילים עולה 1,500 ש"ח. קורס Claude Code וקורס AI STUDIO עולים 2,900 ש"ח כל אחד. קורס FDE למטמיעי AI עולה 8,900 ש"ח. שיעור קבוצתי בודד עולה 450 ש"ח ושיעור פרטי 550 ש"ח. המחירים הם למשתתף.',
      en: 'The beginners AI course costs 1,500 ILS. The Claude Code course and the AI STUDIO course cost 2,900 ILS each. The FDE course for AI implementers costs 8,900 ILS. A single group lesson is 450 ILS and a private lesson 550 ILS. Prices are per participant.',
    },
  },
  {
    q: { he: 'מנויי כלי ה-AI כלולים במחיר הקורס?', en: 'Are AI tool subscriptions included in the course price?' },
    a: {
      he: 'לא. המנויים לכלי ה-AI נרכשים בנפרד על ידי המשתתף. לקורס Claude Code ולקורס FDE נדרש מנוי Claude בתשלום.',
      en: 'No. Subscriptions to the AI tools are purchased separately by the participant. The Claude Code course and the FDE course require a paid Claude subscription.',
    },
  },
  {
    q: { he: 'אפשר לנסות שיעור אחד לפני שנרשמים לקורס מלא?', en: 'Can I try a single lesson before a full course?' },
    a: {
      he: 'כן. יש שיעורים קבוצתיים בתשלום לפי מפגש, בלי התחייבות: "בונים אתר עם AI" ו"בוא ניצור ביחד" ב-450 ש"ח למפגש, ושיעור פרטי "Claude Code אחד-על-אחד" ב-550 ש"ח.',
      en: 'Yes. There are group lessons paid per session, with no commitment: "Build a Website with AI" and "Let\'s Create Together" at 450 ILS per session, and the private "Claude Code 1-on-1" lesson at 550 ILS.',
    },
  },
  {
    q: { he: 'איך נרשמים לקורס?', en: 'How do I sign up for a course?' },
    a: {
      he: 'לוחצים על "הזמנת מקום" בעמוד הקורס ומשאירים פרטים. אין תשלום באתר: אנחנו חוזרים אליכם לתיאום.',
      en: 'Click "Book a Spot" on the course page and leave your details. There is no online payment: we get back to you to arrange everything.',
    },
  },
  {
    q: { he: 'יש סדנאות AI והכשרת עובדים לארגונים?', en: 'Do you offer AI workshops and employee training for organizations?' },
    a: {
      he: 'כן. ORTAM AI בונה תוכניות AI וסייבר AI סביב העבודה של הצוות שלכם, לפי מחלקות: מנהלים, שיווק, משאבי אנוש, מכירות, פיתוח, כספים ועוד.',
      en: 'Yes. ORTAM AI builds AI and Cyber AI programs around your team\'s work, by department: management, marketing, HR, sales, development, finance and more.',
    },
  },
  {
    q: { he: 'יש קורסים מסובסדים?', en: 'Are there subsidized courses?' },
    a: {
      he: 'כן. יש מסלולים במחיר מסובסד למשרתי מילואים בעלי עסקים, לנשים חד-הוריות ולחיילים משוחררים. הזכאות נבדקת בשיחת טלפון.',
      en: 'Yes. There are subsidized tracks for reserve soldiers who own a business, for single mothers and for discharged soldiers. Eligibility is checked by phone.',
    },
  },
];

/** /courses/:slug: questions about one course. */
export const SYLLABUS_FAQ: Record<string, Faq[]> = {
  'claude-code-mastery': [
    {
      q: { he: 'מה זה קלוד קוד (Claude Code)?', en: 'What is Claude Code?' },
      a: {
        he: 'קלוד קוד (Claude Code) הוא כלי של חברת Anthropic שבו מתארים במילים מה רוצים לבנות, וה-AI כותב את הקוד, מריץ אותו ומתקן אותו על המחשב שלכם. בשונה מצ\'אט רגיל, הוא עובד ישירות על קבצי הפרויקט.',
        en: 'Claude Code is a tool by Anthropic in which you describe in words what you want to build, and the AI writes the code, runs it and fixes it on your computer. Unlike a regular chat, it works directly on your project files.',
      },
    },
    {
      q: { he: 'צריך ניסיון בתכנות כדי להשתתף בקורס קלוד קוד?', en: 'Do I need programming experience for the Claude Code course?' },
      a: {
        he: 'לא. הקורס מתחיל מאפס מוחלט: התקנה, הטרמינל והפקודות שבאמת צריך. הוא מתאים גם למפתחים שרוצים לעבוד מהר ונכון יותר.',
        en: 'No. The course starts from absolute zero: installation, the terminal and the commands you actually need. It also suits developers who want to work faster and better.',
      },
    },
    {
      q: { he: 'מה בונים בקורס קלוד קוד?', en: 'What do you build in the Claude Code course?' },
      a: {
        he: 'בכל מפגש בונים משהו אמיתי: דף נחיתה אישי, אתר מלא עם כמה עמודים, אפליקציה עם נתונים אמיתיים בכתובת משלכם ואוטומציה לתהליך מהעסק. בסוף כל משתתף מעלה לאוויר פרויקט גמר אישי.',
        en: 'Every session ends with something real: a personal landing page, a full multi-page website, an app with real data at your own address, and an automation for a process from your business. At the end each participant ships a personal capstone project.',
      },
    },
    {
      q: { he: 'כמה זמן נמשך קורס קלוד קוד וכמה הוא עולה?', en: 'How long is the Claude Code course and what does it cost?' },
      a: {
        he: '6 מפגשים פרונטליים בכיתה, 5 שעות כל מפגש, 30 שעות בסך הכול. המחיר 2,900 ש"ח למשתתף.',
        en: '6 in-person classroom sessions of 5 hours each, 30 hours in total. The price is 2,900 ILS per participant.',
      },
    },
    {
      q: { he: 'איזה מנוי צריך לקורס?', en: 'Which subscription do I need?' },
      a: {
        he: 'מנוי Claude בתשלום, חובה. המנוי נרכש בנפרד על ידי המשתתף ואינו כלול במחיר הקורס. בנוסף צריך מחשב נייד אישי.',
        en: 'A paid Claude subscription, which is required. It is purchased separately by the participant and is not included in the course price. You also need a personal laptop.',
      },
    },
    {
      q: { he: 'מה ההבדל בין קורס קלוד קוד לוייב קודינג?', en: 'What is the difference between the Claude Code course and vibe coding?' },
      a: {
        he: 'וייב קודינג הוא שיטת העבודה: לבנות תוכנה בשיחה עם AI. קלוד קוד הוא הכלי. בקורס לומדים וייב קודינג בצורה מסודרת: לתכנן, לבנות, לבדוק ולתקן, כדי שהתוצאה תעבוד גם מחוץ להדגמה.',
        en: 'Vibe coding is the way of working: building software in conversation with AI. Claude Code is the tool. The course teaches vibe coding in an orderly way: plan, build, test and fix, so the result works outside a demo too.',
      },
    },
  ],
  'ai-filmmaker-studio': [
    {
      q: { he: 'מה לומדים בקורס יצירת וידאו ב-AI?', en: 'What do you learn in the AI video creation course?' },
      a: {
        he: 'יצירת תמונות ונכסים דיגיטליים, בניית אווטאר בסגנונות שונים, סרטוני ליפ סינק, כתיבת תסריט והפיכתו לפרומפטים מדויקים, סרטוני עלילה עם תכנון וסטוריבורד, עריכה וסאונד.',
        en: 'Creating images and digital assets, building an avatar in different styles, lip-sync videos, writing a script and turning it into precise prompts, narrative films with planning and a storyboard, editing and sound.',
      },
    },
    {
      q: { he: 'צריך ניסיון בצילום או בעריכה?', en: 'Do I need filming or editing experience?' },
      a: {
        he: 'לא. הקורס מתאים גם למי שמתחיל מאפס, וגם ליוצרים, צלמים ועורכים שרוצים להוסיף AI לארגז הכלים.',
        en: 'No. The course suits complete beginners as well as creators, photographers and editors adding AI to their toolkit.',
      },
    },
    {
      q: { he: 'עם מה יוצאים מהקורס?', en: 'What do you leave the course with?' },
      a: {
        he: 'אווטאר אישי בכמה סגנונות, סרטון אווטאר מדבר, סרטון עלילה קצר, ספריית נכסים דיגיטליים, סרט גמר ותיק עבודות ראשון של יוצר AI.',
        en: 'A personal avatar in several styles, a talking avatar video, a short narrative film, a digital asset library, a capstone film and a first AI creator portfolio.',
      },
    },
    {
      q: { he: 'כמה זמן נמשך קורס AI STUDIO וכמה הוא עולה?', en: 'How long is the AI STUDIO course and what does it cost?' },
      a: {
        he: '6 מפגשים פרונטליים בכיתה, 5 שעות כל מפגש, 30 שעות בסך הכול. המחיר 2,900 ש"ח למשתתף.',
        en: '6 in-person classroom sessions of 5 hours each, 30 hours in total. The price is 2,900 ILS per participant.',
      },
    },
    {
      q: { he: 'מנויי כלי הווידאו כלולים במחיר?', en: 'Are the video tool subscriptions included?' },
      a: {
        he: 'לא. המנויים לכלי ה-AI שבהם עובדים בקורס נרכשים בנפרד על ידי המשתתף ואינם כלולים במחיר הקורס.',
        en: 'No. Subscriptions to the AI tools used in the course are purchased separately by the participant and are not included in the course price.',
      },
    },
    {
      q: { he: 'הסרטון בראש העמוד נוצר ב-AI?', en: 'Was the video at the top of this page made with AI?' },
      a: {
        he: 'כן. הסרטון של בוסקו, הכלב הראפר, נוצר כולו ב-AI. זה סוג התוצרים שלומדים להפיק בקורס.',
        en: 'Yes. The clip of Bosco, the rapper dog, was made entirely with AI. It is the kind of work you learn to produce in the course.',
      },
    },
  ],
  'fde-ai-implementers': [
    {
      q: { he: 'מה זה FDE?', en: 'What is an FDE?' },
      a: {
        he: 'FDE הוא Forward Deployed Engineer, בעברית מטמיע AI: איש מקצוע שעובד צמוד ללקוח, מאפיין בעיה עסקית, בונה לה פתרון AI ומעלה אותו לעבודה אמיתית בארגון.',
        en: 'FDE stands for Forward Deployed Engineer, an AI implementer: a professional who works alongside the customer, scopes a business problem, builds an AI solution for it and puts it to real work inside the organization.',
      },
    },
    {
      q: { he: 'למי מתאים קורס FDE?', en: 'Who is the FDE course for?' },
      a: {
        he: 'למפתחים ואנשי טכנולוגיה שרוצים להוביל הטמעת AI, לאנשי תפעול, מערכות מידע ודיגיטל, ליועצים ולמנהלי פרויקטים, ולמי שרוצה הסבה מקצועית לתפקיד מטמיע AI. אין צורך בניסיון קודם בתכנות.',
        en: 'Developers and technologists who want to lead AI implementation, operations, IT and digital people, consultants and project managers, and career changers aiming for an AI implementer role. No prior programming experience is needed.',
      },
    },
    {
      q: { he: 'מה לומדים בקורס מטמיעי AI?', en: 'What does the AI implementers course cover?' },
      a: {
        he: 'אפיון והטמעת AI בארגון, פיתוח עם AI ב-Claude Code ווייב קודינג, מודלי שפה ו-API, RAG ונתונים, חיבור למערכות ארגוניות ו-MCP, סוכני AI ואוטומציות, פיתוח מאובטח וסייבר AI, פריסה וניטור, הכשרת עובדים ופרויקט גמר.',
        en: 'Scoping and implementing AI in an organization, building with AI using Claude Code and vibe coding, language models and APIs, RAG and data, connecting to company systems and MCP, AI agents and automations, secure development and AI cyber security, deployment and monitoring, employee training and a capstone.',
      },
    },
    {
      q: { he: 'כמה שעות קורס FDE וכמה הוא עולה?', en: 'How many hours is the FDE course and what does it cost?' },
      a: {
        he: '106 שעות לימוד ב-10 מודולים, פרונטלי בכיתה. המחיר 8,900 ש"ח למשתתף.',
        en: '106 hours of study in 10 modules, in person in class. The price is 8,900 ILS per participant.',
      },
    },
    {
      q: { he: 'מה ההבדל בין קורס FDE לקורס Claude Code?', en: 'How does the FDE course differ from the Claude Code course?' },
      a: {
        he: 'קורס Claude Code (30 שעות) מלמד לבנות מוצר בעצמכם. קורס FDE (106 שעות) מלמד להטמיע AI אצל לקוח או בארגון: אפיון, חיבור לנתונים ולמערכות, סוכני AI, אבטחה, פריסה והכשרת העובדים שישתמשו בפתרון.',
        en: 'The Claude Code course (30 hours) teaches you to build a product yourself. The FDE course (106 hours) teaches you to implement AI for a customer or an organization: scoping, connecting to data and systems, AI agents, security, deployment and training the employees who will use the solution.',
      },
    },
    {
      q: { he: 'מה פרויקט הגמר בקורס?', en: 'What is the capstone project?' },
      a: {
        he: 'הטמעת AI אמיתית מקצה לקצה: בוחרים ארגון ובעיה עסקית, מאפיינים, בונים, מאבטחים ופורסים את הפתרון, ומציגים אותו להנהלה. הפרויקט נכנס לתיק העבודות.',
        en: 'A real AI implementation end to end: you choose an organization and a business problem, scope, build, secure and deploy the solution, and present it to management. The project goes into your portfolio.',
      },
    },
  ],
};

/** FAQPage structured data for the questions as shown in one language. */
export function faqSchema(items: Faq[], lang: 'he' | 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: lang,
    mainEntity: items.map(f => ({
      '@type': 'Question',
      name: f.q[lang],
      acceptedAnswer: { '@type': 'Answer', text: f.a[lang] },
    })),
  };
}
