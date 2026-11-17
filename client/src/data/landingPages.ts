import type { Faq } from './faqs';

/**
 * Topic pages: one page per search topic the site had no page for. Each explains the
 * topic in plain words, answers the common questions and points to the course or
 * service that teaches it. Facts about courses come from the catalog and the syllabi.
 */

type B<T = string> = { he: T; en: T };

export interface LandingSection {
  title: B;
  paragraphs?: B<string[]>;
  bullets?: B<string[]>;
}

export interface LandingLink {
  href: string;
  title: B;
  note: B;
}

export interface LandingPage {
  path: string;
  /** <title> and meta description. */
  metaTitle: B;
  metaDescription: B;
  eyebrow: B;
  h1: B;
  lead: B;
  sections: LandingSection[];
  linksTitle: B;
  links: LandingLink[];
  faq: Faq[];
  cta: { title: B; label: B; href: string };
}

const COURSE = {
  claudeCode: {
    href: '/courses/claude-code-mastery',
    title: { he: 'לשלוט ב-Claude Code: מ-0 ל-100', en: 'Mastering Claude Code: 0 to 100' },
    note: { he: 'קורס קלוד קוד מלא · 6 מפגשים, 30 שעות · 2,900 ש"ח', en: 'The full Claude Code course · 6 sessions, 30 hours · 2,900 ILS' },
  },
  studio: {
    href: '/courses/ai-filmmaker-studio',
    title: { he: 'AI STUDIO - קורס ליוצרי סרטים ומדיה', en: 'AI STUDIO - A Course for Film and Media Creators' },
    note: { he: 'קורס יצירת וידאו ב-AI · 6 מפגשים, 30 שעות · 2,900 ש"ח', en: 'AI video creation course · 6 sessions, 30 hours · 2,900 ILS' },
  },
  fde: {
    href: '/courses/fde-ai-implementers',
    title: { he: 'קורס FDE - מטמיעי AI בארגונים', en: 'FDE Course - AI Implementers for Organizations' },
    note: { he: 'הטמעת AI מקצה לקצה · 106 שעות · 8,900 ש"ח', en: 'AI implementation end to end · 106 hours · 8,900 ILS' },
  },
  cyber: {
    href: '/courses#cyber-ai-security',
    title: { he: 'סייבר AI לאנשי אבטחת מידע', en: 'Cyber AI for Security Professionals' },
    note: { he: 'ניטור, זיהוי וניתוח איומים בעידן ה-AI', en: 'Monitoring, detection and threat analysis in the AI era' },
  },
  agents: {
    href: '/courses#ai-agents-automation',
    title: { he: 'סוכני AI ואוטומציות לעסקים', en: 'AI Agents & Automation for Business' },
    note: { he: 'סוכנים שעובדים בשבילכם, וכל הכלים של העסק בזרימה אחת', en: 'Agents that work for you, with all your business tools in one flow' },
  },
  website: {
    href: '/courses#build-website-ai',
    title: { he: 'בונים אתר עם AI', en: 'Build a Website with AI' },
    note: { he: 'שיעור קבוצתי אחד · 450 ש"ח למפגש', en: 'A single group lesson · 450 ILS per session' },
  },
  media: {
    href: '/courses#create-together-media',
    title: { he: 'בוא ניצור ביחד', en: "Let's Create Together" },
    note: { he: 'שיעור יצירת מדיה ב-AI · 450 ש"ח למפגש', en: 'An AI media creation lesson · 450 ILS per session' },
  },
  academy: {
    href: '/academy',
    title: { he: 'הכשרות AI לארגונים', en: 'AI Training for Organizations' },
    note: { he: 'תוכניות לפי מחלקות: מנהלים, שיווק, משאבי אנוש ועוד', en: 'Programs by department: management, marketing, HR and more' },
  },
  consulting: {
    href: '/consulting',
    title: { he: 'ייעוץ אסטרטגיית AI', en: 'AI Strategy Consulting' },
    note: { he: 'אבחון, פיילוטים מהירים וליווי עד יישום', en: 'Assessment, fast pilots and guidance through to implementation' },
  },
} satisfies Record<string, LandingLink>;

export const LANDING_PAGES: LandingPage[] = [
  // ─── Vibe coding ───
  {
    path: '/vibe-coding',
    metaTitle: {
      he: 'וייב קודינג: קורס פיתוח עם AI בלי רקע בתכנות',
      en: 'Vibe Coding: Learn to Build Software with AI',
    },
    metaDescription: {
      he: 'מה זה וייב קודינג, איך בונים אתרים ואפליקציות בשיחה עם AI, ואיך לומדים את זה נכון: קורס קלוד קוד (Claude Code) של 30 שעות, שיעורים בודדים וקורס FDE.',
      en: 'What vibe coding is, how to build websites and apps in conversation with AI, and how to learn it properly: a 30-hour Claude Code course, single lessons and the FDE course.',
    },
    eyebrow: { he: 'וייב קודינג · פיתוח עם AI', en: 'Vibe coding · Building with AI' },
    h1: { he: 'וייב קודינג: לבנות תוכנה בשיחה עם AI', en: 'Vibe Coding: Building Software in Conversation with AI' },
    lead: {
      he: 'וייב קודינג (Vibe Coding) הוא דרך לבנות אתרים, אפליקציות ואוטומציות בלי לכתוב קוד בעצמכם: מתארים ל-AI במילים מה רוצים, והוא כותב, מריץ ומתקן. ב-ORTAM AI לומדים את זה בכיתה, עם קלוד קוד (Claude Code), מאפס ועד מוצר שעובד באוויר.',
      en: 'Vibe coding is a way to build websites, apps and automations without writing the code yourself: you describe in words what you want, and the AI writes, runs and fixes it. At ORTAM AI you learn it in class, with Claude Code, from zero to a product that runs live.',
    },
    sections: [
      {
        title: { he: 'מה זה וייב קודינג?', en: 'What is vibe coding?' },
        paragraphs: {
          he: [
            'וייב קודינג הוא פיתוח תוכנה בשפה טבעית. במקום לכתוב שורות קוד, כותבים בקשה: "תבנה לי אתר למסעדה עם תפריט מנות". כלי ה-AI כותב את הקוד, מריץ אותו ומראה את התוצאה, ואתם ממשיכים לכוון אותו בשיחה.',
            'את המונח טבע חוקר ה-AI אנדריי קרפתי בפברואר 2025, ומאז הוא הפך לשם המקובל לפיתוח עם AI על ידי אנשים שאינם מתכנתים.',
          ],
          en: [
            'Vibe coding is software development in natural language. Instead of writing lines of code you write a request: "Build me a restaurant website with a menu". The AI tool writes the code, runs it and shows the result, and you keep steering it in conversation.',
            'The term was coined by AI researcher Andrej Karpathy in February 2025, and has since become the common name for building with AI by people who are not programmers.',
          ],
        },
      },
      {
        title: { he: 'מה אפשר לבנות בוייב קודינג?', en: 'What can you build with vibe coding?' },
        bullets: {
          he: [
            'דף נחיתה ואתר מלא עם כמה עמודים',
            'אפליקציה עם נתונים אמיתיים, בכתובת משלכם',
            'אוטומציה לתהליך אמיתי מהעסק',
            'כלים פנימיים שחוסכים עבודה ידנית',
          ],
          en: [
            'A landing page and a full multi-page website',
            'An app with real data, at your own address',
            'An automation for a real process in your business',
            'Internal tools that cut manual work',
          ],
        },
      },
      {
        title: { he: 'וייב קודינג מקצועי: לא רק לבקש, גם לבדוק', en: 'Professional vibe coding: not only asking, also checking' },
        paragraphs: {
          he: [
            'קל לקבל מ-AI משהו שנראה עובד. קשה יותר לקבל משהו שעובד גם מחר, מאובטח ואפשר להמשיך לפתח אותו. לכן בקורס קלוד קוד לומדים שיטת עבודה מסודרת: לתכנן, לבנות, לבדוק ולתקן, לשמור גרסאות ב-GitHub ולהעלות לאוויר.',
          ],
          en: [
            'It is easy to get something from AI that looks like it works. It is harder to get something that still works tomorrow, is secure and can keep growing. That is why the Claude Code course teaches an orderly method: plan, build, test and fix, keep versions on GitHub and go live.',
          ],
        },
      },
    ],
    linksTitle: { he: 'איפה לומדים וייב קודינג ב-ORTAM AI', en: 'Where to learn vibe coding at ORTAM AI' },
    links: [COURSE.claudeCode, COURSE.website, COURSE.fde],
    faq: [
      {
        q: { he: 'מה זה וייב קודינג?', en: 'What is vibe coding?' },
        a: {
          he: 'וייב קודינג הוא בניית תוכנה בשיחה עם AI: מתארים במילים מה רוצים לבנות, וכלי ה-AI כותב את הקוד, מריץ אותו ומתקן אותו. כך אפשר לבנות אתרים, אפליקציות ואוטומציות גם בלי רקע בתכנות.',
          en: 'Vibe coding is building software in conversation with AI: you describe in words what you want to build, and the AI tool writes the code, runs it and fixes it. This lets you build websites, apps and automations even without a programming background.',
        },
      },
      {
        q: { he: 'צריך לדעת לתכנת כדי ללמוד וייב קודינג?', en: 'Do I need to know how to code to learn vibe coding?' },
        a: {
          he: 'לא. קורס Claude Code שלנו מתחיל מאפס מוחלט ומתאים גם למי שלא כתב שורת קוד. לומדים איך לבקש נכון, איך לבדוק את התוצאה ואיך לתקן.',
          en: 'No. Our Claude Code course starts from absolute zero and suits people who have never written a line of code. You learn how to ask well, how to check the result and how to fix it.',
        },
      },
      {
        q: { he: 'מה ההבדל בין וייב קודינג לפיתוח עם AI?', en: 'What is the difference between vibe coding and building with AI?' },
        a: {
          he: 'פיתוח עם AI הוא השם הרחב לכל עבודת פיתוח שנעזרת ב-AI, גם של מתכנתים מנוסים. וייב קודינג הוא הצורה שבה ה-AI כותב את רוב הקוד ואתם מכוונים אותו בשפה טבעית.',
          en: 'Building with AI is the broad name for any development work assisted by AI, including by experienced programmers. Vibe coding is the form in which the AI writes most of the code and you steer it in natural language.',
        },
      },
      {
        q: { he: 'באיזה כלי לומדים וייב קודינג?', en: 'Which tool do you learn vibe coding with?' },
        a: {
          he: 'בקלוד קוד (Claude Code) של Anthropic. לקורס נדרש מנוי Claude בתשלום, שנרכש בנפרד על ידי המשתתף.',
          en: 'With Claude Code by Anthropic. The course requires a paid Claude subscription, purchased separately by the participant.',
        },
      },
      {
        q: { he: 'מה קורס הוייב קודינג הכי מקיף שלכם?', en: 'What is your most comprehensive vibe coding course?' },
        a: {
          he: '"לשלוט ב-Claude Code: מ-0 ל-100": 6 מפגשים, 30 שעות, 2,900 ש"ח, עם פרויקט גמר אישי שעובד באוויר. מי שרוצה להפוך את זה למקצוע ימשיך לקורס FDE של 106 שעות.',
          en: '"Mastering Claude Code: 0 to 100": 6 sessions, 30 hours, 2,900 ILS, with a personal capstone that runs live. To turn it into a profession, continue to the 106-hour FDE course.',
        },
      },
      {
        q: { he: 'אפשר לנסות וייב קודינג בשיעור אחד?', en: 'Can I try vibe coding in a single lesson?' },
        a: {
          he: 'כן. בשיעור הקבוצתי "בונים אתר עם AI" מתחילים מרעיון ומסיימים עם אתר חי באוויר, ב-450 ש"ח למפגש. יש גם שיעור פרטי, "Claude Code אחד-על-אחד", ב-550 ש"ח.',
          en: 'Yes. In the group lesson "Build a Website with AI" you start with an idea and finish with a live website, for 450 ILS per session. There is also a private lesson, "Claude Code 1-on-1", for 550 ILS.',
        },
      },
    ],
    cta: {
      title: { he: 'רוצים ללמוד וייב קודינג בצורה מסודרת?', en: 'Want to learn vibe coding properly?' },
      label: { he: 'לסילבוס קורס Claude Code', en: 'See the Claude Code syllabus' },
      href: '/courses/claude-code-mastery',
    },
  },

  // ─── Workshops and employee training ───
  {
    path: '/ai-workshops',
    metaTitle: {
      he: 'סדנאות AI והכשרת עובדים לארגונים | הטמעת AI',
      en: 'AI Workshops and Employee Training for Organizations',
    },
    metaDescription: {
      he: 'סדנאות AI והכשרת עובדים שנבנות סביב העבודה של הצוות שלכם: מנהלים, שיווק, משאבי אנוש, מכירות, פיתוח וכספים. הטמעת AI בארגון, מאבחון ועד יישום.',
      en: 'AI workshops and employee training built around your team\'s work: management, marketing, HR, sales, development and finance. AI implementation from assessment to rollout.',
    },
    eyebrow: { he: 'סדנאות AI · הכשרת עובדים · הטמעת AI', en: 'AI workshops · Employee training · AI implementation' },
    h1: { he: 'סדנאות AI והכשרת עובדים לארגונים', en: 'AI Workshops and Employee Training for Organizations' },
    lead: {
      he: 'כלי AI לא משנים ארגון עד שהעובדים יודעים לעבוד איתם. ORTAM AI בונה סדנאות AI ותוכניות הכשרת עובדים סביב העבודה האמיתית של הצוות שלכם, ומלווה הטמעת AI בארגון מהאבחון ועד היישום.',
      en: 'AI tools do not change an organization until its people know how to work with them. ORTAM AI builds AI workshops and employee training programs around your team\'s real work, and supports AI implementation from assessment to rollout.',
    },
    sections: [
      {
        title: { he: 'הכשרת עובדים לפי מחלקות', en: 'Employee training by department' },
        paragraphs: {
          he: ['כל מחלקה עובדת אחרת, ולכן לכל אחת יש תוכנית משלה:'],
          en: ['Every department works differently, so each has its own program:'],
        },
        bullets: {
          he: [
            'הכשרת AI למנהלים ולבכירים: קבלת החלטות, ניהול צוות ואסטרטגיה',
            'הכשרת AI למחלקת שיווק: תוכן, תמונות ווידאו, ניתוח שוק ואוטומציה שיווקית',
            'הכשרת AI למשאבי אנוש: גיוס ומיון, ניהול עובדים ונתוני HR',
            'הכשרת AI למכירות, למנהלי מוצר ופרויקטים, לכספים ולמחלקת פיתוח',
            'הכשרות סייבר AI לצוותי אבטחת מידע',
          ],
          en: [
            'AI training for managers and executives: decision making, team management and strategy',
            'AI training for marketing: content, images and video, market analysis and marketing automation',
            'AI training for HR: recruiting and screening, people management and HR data',
            'AI training for sales, product and project managers, finance and development teams',
            'Cyber AI training for information security teams',
          ],
        },
      },
      {
        title: { he: 'מסדנה אחת ועד הטמעת AI מלאה', en: 'From a single workshop to full AI implementation' },
        paragraphs: {
          he: [
            'אפשר להתחיל בסדנת AI ממוקדת לצוות אחד, ואפשר לבנות תהליך הטמעת AI מלא. בליווי הייעוצי התהליך כולל אבחון עסקי ומיפוי תהליכים, הכשרת צוותים, פיילוטים מהירים, סוכני AI ואינטגרציות, וליווי מקצועי עד יישום.',
          ],
          en: [
            'You can start with a focused AI workshop for one team, or build a full AI implementation process. With consulting, the process includes a business assessment and process mapping, team training, fast pilots, AI agents and integrations, and professional guidance through to implementation.',
          ],
        },
      },
      {
        title: { he: 'רוצים מטמיע AI משלכם בארגון?', en: 'Want an AI implementer of your own?' },
        paragraphs: {
          he: [
            'ארגון שרוצה יכולת פנימית יכול לשלוח עובד לקורס FDE: 106 שעות שמכשירות מטמיעי AI לאפיין, לבנות, לאבטח ולפרוס פתרונות AI, ולהכשיר את העובדים שישתמשו בהם.',
          ],
          en: [
            'An organization that wants an in-house capability can send an employee to the FDE course: 106 hours that train AI implementers to scope, build, secure and deploy AI solutions, and to train the people who will use them.',
          ],
        },
      },
    ],
    linksTitle: { he: 'מסלולים לארגונים', en: 'Paths for organizations' },
    links: [COURSE.academy, COURSE.consulting, COURSE.fde, COURSE.cyber],
    faq: [
      {
        q: { he: 'מה ההבדל בין סדנת AI לקורס AI?', en: 'What is the difference between an AI workshop and an AI course?' },
        a: {
          he: 'סדנת AI היא מפגש ממוקד לצוות, סביב משימות העבודה שלו. קורס הוא תוכנית של כמה מפגשים שבונה מיומנות עמוקה, למשל קורס Claude Code של 30 שעות או קורס FDE של 106 שעות.',
          en: 'An AI workshop is a focused session for a team, built around its own work tasks. A course is a multi-session program that builds a deep skill, such as the 30-hour Claude Code course or the 106-hour FDE course.',
        },
      },
      {
        q: { he: 'לאילו מחלקות יש הכשרת עובדים ב-AI?', en: 'Which departments do you train?' },
        a: {
          he: 'מנהלים ובכירים, שיווק, משאבי אנוש, מכירות, מנהלי מוצר ופרויקטים, כספים וחשבונאות, מחלקות פיתוח וצוותי אבטחת מידע.',
          en: 'Managers and executives, marketing, HR, sales, product and project managers, finance and accounting, development teams and information security teams.',
        },
      },
      {
        q: { he: 'מה זה הטמעת AI בארגון?', en: 'What does implementing AI in an organization mean?' },
        a: {
          he: 'הטמעת AI היא התהליך שבו ארגון מכניס כלי AI לעבודה היומיומית: מאבחנים וממפים תהליכים, בוחרים מקרי שימוש, מריצים פיילוט, מחברים למערכות הארגון ומכשירים את העובדים.',
          en: 'AI implementation is the process by which an organization brings AI tools into daily work: assessing and mapping processes, choosing use cases, running a pilot, connecting to company systems and training employees.',
        },
      },
      {
        q: { he: 'כמה עולה סדנת AI לארגון?', en: 'How much does an AI workshop for an organization cost?' },
        a: {
          he: 'אין מחירון קבוע באתר להכשרות לארגונים. התוכנית נבנית סביב הצוות שלכם, ולכן המחיר נמסר בשיחה.',
          en: 'There is no fixed price list on the site for organizational training. The program is built around your team, so the price is given in a conversation.',
        },
      },
      {
        q: { he: 'איך מתחילים?', en: 'How do we start?' },
        a: {
          he: 'משאירים פרטים בעמוד יצירת הקשר או שולחים הודעת WhatsApp, ואנחנו חוזרים אליכם לשיחת היכרות.',
          en: 'Leave your details on the contact page or send a WhatsApp message, and we get back to you for an introductory call.',
        },
      },
    ],
    cta: {
      title: { he: 'רוצים תוכנית הכשרה לצוות שלכם?', en: 'Want a training program for your team?' },
      label: { he: 'דברו איתנו', en: 'Talk to us' },
      href: '/contact',
    },
  },

  // ─── AI video creation ───
  {
    path: '/ai-video-creation',
    metaTitle: {
      he: 'קורס יצירת וידאו ב-AI | סטודיו AI ליוצרים',
      en: 'AI Video Creation Course | AI Studio for Creators',
    },
    metaDescription: {
      he: 'קורס יצירת וידאו ב-AI: אווטארים, ליפ סינק, סרטוני עלילה, תסריט ופרומפטים. סטודיו AI מלא ב-6 מפגשים, 30 שעות, למי שרוצה להיות AI creator.',
      en: 'An AI video creation course: avatars, lip sync, narrative films, scripts and prompts. A complete AI studio in 6 sessions, 30 hours, for anyone who wants to become an AI creator.',
    },
    eyebrow: { he: 'יצירת וידאו ב-AI · סטודיו AI · AI Creator', en: 'AI video creation · AI studio · AI creator' },
    h1: { he: 'קורס יצירת וידאו ב-AI: סטודיו AI משלכם', en: 'AI Video Creation Course: Your Own AI Studio' },
    lead: {
      he: 'היום אפשר להפיק סרטון שלם בלי מצלמה, בלי שחקנים ובלי אולפן. בקורס יצירת הווידאו של ORTAM AI בונים סטודיו AI מלא ולומדים להיות AI creator: מהרעיון והתסריט ועד סרט גמור שאפשר לפרסם.',
      en: 'Today you can produce a whole film without a camera, actors or a studio. In ORTAM AI\'s video creation course you build a complete AI studio and learn to be an AI creator: from idea and script to a finished film you can publish.',
    },
    sections: [
      {
        title: { he: 'מה זה סטודיו AI?', en: 'What is an AI studio?' },
        paragraphs: {
          he: [
            'סטודיו AI הוא ערכת כלים ושיטת עבודה להפקת תוכן: כלים ליצירת תמונות, לווידאו, לאווטארים, לקול ולמוזיקה, ומעליהם תהליך מסודר שמתחיל בתסריט ונגמר בעריכה. מי שעובד כך נקרא AI creator: יוצר שמפיק תוכן מקצועי בעזרת AI.',
          ],
          en: [
            'An AI studio is a toolkit and a working method for producing content: tools for images, video, avatars, voice and music, and above them an orderly process that starts with a script and ends in the edit. A person working this way is called an AI creator: someone who produces professional content with AI.',
          ],
        },
      },
      {
        title: { he: 'מה לומדים בקורס יצירת וידאו ב-AI', en: 'What the AI video creation course covers' },
        bullets: {
          he: [
            'יסודות הסטודיו: תמונות, אסטים ונכסים דיגיטליים',
            'בניית אווטאר בסגנונות שונים, עם קול משלו',
            'ליפ סינק וסרטוני אווטאר מדברים',
            'מתסריט לפרומפטים מדויקים',
            'סרטוני עלילה: תכנון, סטוריבורד וצילום עם AI',
            'עריכה, סאונד ופרויקט גמר',
          ],
          en: [
            'Studio foundations: images, assets and digital properties',
            'Building an avatar in different styles, with its own voice',
            'Lip sync and talking avatar videos',
            'From script to precise prompts',
            'Narrative films: planning, storyboard and shooting with AI',
            'Editing, sound and a capstone',
          ],
        },
      },
      {
        title: { he: 'למי זה מתאים', en: 'Who it is for' },
        bullets: {
          he: [
            'בעלי עסקים שרוצים להפיק תוכן וידאו בעצמם',
            'אנשי שיווק, סושיאל ותוכן',
            'יוצרים, צלמים ועורכים שרוצים להוסיף AI לארגז הכלים',
            'מי שמתחיל מאפס: אין צורך בניסיון בצילום או בעריכה',
          ],
          en: [
            'Business owners who want to produce video content themselves',
            'Marketing, social and content people',
            'Creators, photographers and editors adding AI to their toolkit',
            'Complete beginners: no filming or editing experience needed',
          ],
        },
      },
    ],
    linksTitle: { he: 'איפה לומדים יצירת וידאו ב-ORTAM AI', en: 'Where to learn AI video creation at ORTAM AI' },
    links: [COURSE.studio, COURSE.media],
    faq: [
      {
        q: { he: 'מה הקורס הכי מקיף ליצירת וידאו ב-AI?', en: 'What is the most comprehensive AI video creation course?' },
        a: {
          he: 'הקורס המקיף ביותר שלנו ליצירת וידאו הוא AI STUDIO - קורס ליוצרי סרטים ומדיה: 6 מפגשים, 30 שעות, 2,900 ש"ח, מתמונות ואווטארים ועד סרט גמר ותיק עבודות.',
          en: 'Our most comprehensive video creation course is AI STUDIO - A Course for Film and Media Creators: 6 sessions, 30 hours, 2,900 ILS, from images and avatars to a capstone film and a portfolio.',
        },
      },
      {
        q: { he: 'מה זה AI creator?', en: 'What is an AI creator?' },
        a: {
          he: 'AI creator הוא יוצר תוכן שמפיק סרטונים, תמונות וסאונד בעזרת כלי AI, במקום או לצד צילום ועריכה מסורתיים.',
          en: 'An AI creator is a content creator who produces videos, images and sound with AI tools, instead of or alongside traditional filming and editing.',
        },
      },
      {
        q: { he: 'צריך ניסיון בצילום או בעריכה כדי ללמוד יצירת וידאו ב-AI?', en: 'Do I need filming or editing experience to learn AI video creation?' },
        a: {
          he: 'לא. הקורס מתחיל משפת הצילום הבסיסית (שוט, זווית, תאורה ותנועת מצלמה) ומתאים גם למי שמתחיל מאפס.',
          en: 'No. The course starts from the basic language of film (shot, angle, lighting and camera movement) and suits complete beginners.',
        },
      },
      {
        q: { he: 'אילו סרטונים יוצרים בקורס?', en: 'What kinds of videos do you make in the course?' },
        a: {
          he: 'סרטון אווטאר מדבר עם ליפ סינק, מוכן לפרסום ברשתות, וסרטון עלילה קצר, מתכנון וסטוריבורד ועד עריכה סופית.',
          en: 'A talking avatar video with lip sync, ready to publish on social networks, and a short narrative film, from planning and storyboard to the final edit.',
        },
      },
      {
        q: { he: 'מנויי כלי ה-AI כלולים במחיר?', en: 'Are the AI tool subscriptions included in the price?' },
        a: {
          he: 'לא. המנויים לכלי ה-AI שבהם עובדים בקורס נרכשים בנפרד על ידי המשתתף.',
          en: 'No. Subscriptions to the AI tools used in the course are purchased separately by the participant.',
        },
      },
      {
        q: { he: 'אפשר להתחיל בשיעור אחד?', en: 'Can I start with a single lesson?' },
        a: {
          he: 'כן. בשיעור הקבוצתי "בוא ניצור ביחד" מפיקים יחד סרטונים, תמונות ומוזיקה עם כלי AI, ב-450 ש"ח למפגש.',
          en: 'Yes. In the group lesson "Let\'s Create Together" we produce videos, images and music with AI tools together, for 450 ILS per session.',
        },
      },
    ],
    cta: {
      title: { he: 'רוצים לבנות סטודיו AI משלכם?', en: 'Want to build your own AI studio?' },
      label: { he: 'לסילבוס קורס AI STUDIO', en: 'See the AI STUDIO syllabus' },
      href: '/courses/ai-filmmaker-studio',
    },
  },

  // ─── Secure development ───
  {
    path: '/secure-ai-development',
    metaTitle: {
      he: 'פיתוח מאובטח עם AI וסייבר AI | הכשרות',
      en: 'Secure Development with AI and Cyber AI Training',
    },
    metaDescription: {
      he: 'פיתוח מאובטח בעידן ה-AI: הסיכונים בקוד שנכתב על ידי מודל, הזרקת פרומפטים ודליפת מידע, ואיך לומדים להתגונן: קורס סייבר AI ומודול פיתוח מאובטח בקורס FDE.',
      en: 'Secure development in the AI era: the risks of model-written code, prompt injection and data leaks, and how to learn to defend: the Cyber AI course and the secure development module of the FDE course.',
    },
    eyebrow: { he: 'פיתוח מאובטח · סייבר AI', en: 'Secure development · Cyber AI' },
    h1: { he: 'פיתוח מאובטח עם AI', en: 'Secure Development with AI' },
    lead: {
      he: 'פיתוח עם AI מאפשר לבנות מהר מאוד, וגם לטעות מהר מאוד. פיתוח מאובטח הוא הדרך לוודא שמה שנבנה עם AI לא חושף סודות, לא מדליף מידע ולא נותן לתוקף דרך פנימה. ב-ORTAM AI זה נלמד כחלק מהכשרות הסייבר AI ומקורס FDE.',
      en: 'Building with AI lets you move very fast, and make mistakes very fast. Secure development is how you make sure that what you build with AI does not expose secrets, leak data or give an attacker a way in. At ORTAM AI it is taught as part of the Cyber AI training and the FDE course.',
    },
    sections: [
      {
        title: { he: 'מה משתנה באבטחה כשמפתחים עם AI', en: 'What changes in security when you build with AI' },
        bullets: {
          he: [
            'קוד שנכתב על ידי מודל צריך סקירה: הוא יכול לעבוד ועדיין להיות פרוץ',
            'סודות והרשאות: מפתחות וסיסמאות שלא אמורים להגיע לקוד או למודל',
            'הזרקת פרומפטים: טקסט זדוני שגורם למערכת AI לפעול נגד ההוראות שלה',
            'דליפת מידע: מה המודל רואה, ומה אסור שיראה',
            'פרטיות, רגולציה ומדיניות שימוש ב-AI בארגון',
          ],
          en: [
            'Model-written code needs review: it can work and still be vulnerable',
            'Secrets and permissions: keys and passwords that must not reach the code or the model',
            'Prompt injection: malicious text that makes an AI system act against its instructions',
            'Data leaks: what the model sees, and what it must never see',
            'Privacy, regulation and an AI usage policy for the organization',
          ],
        },
      },
      {
        title: { he: 'פיתוח מאובטח בקורס FDE', en: 'Secure development in the FDE course' },
        paragraphs: {
          he: [
            'בקורס FDE יש מודול של 12 שעות על פיתוח מאובטח, סייבר AI ובדיקות איכות. המשתתפים מבצעים בדיקת אבטחה לפיילוט שבנו וכותבים לו סט בדיקות (evals), כדי לדעת שהמערכת ממשיכה לענות נכון לאורך זמן.',
          ],
          en: [
            'The FDE course includes a 12-hour module on secure development, AI cyber security and quality testing. Participants run a security review of the pilot they built and write a test suite (evals) for it, to know the system keeps answering correctly over time.',
          ],
        },
      },
      {
        title: { he: 'סייבר AI לאנשי אבטחת מידע', en: 'Cyber AI for security professionals' },
        paragraphs: {
          he: [
            'לצוותי אבטחת מידע יש קורס ייעודי: מכירים את הכלים שהתוקפים משתמשים בהם ועובדים איתם בצד המגן. ניטור, זיהוי איומים וניתוח אירועי אבטחה בסביבה מבוססת AI.',
          ],
          en: [
            'Security teams have a dedicated course: getting to know the tools attackers use and putting them to work on defence. Monitoring, threat detection and security incident analysis in an AI-driven environment.',
          ],
        },
      },
    ],
    linksTitle: { he: 'איפה לומדים פיתוח מאובטח וסייבר AI', en: 'Where to learn secure development and Cyber AI' },
    links: [COURSE.cyber, COURSE.fde, COURSE.academy],
    faq: [
      {
        q: { he: 'מה זה פיתוח מאובטח?', en: 'What is secure development?' },
        a: {
          he: 'פיתוח מאובטח הוא בניית תוכנה כך שהאבטחה היא חלק מהתהליך ולא תוספת בסוף: ניהול סודות והרשאות, סקירת קוד, בדיקות ושמירה על פרטיות המידע.',
          en: 'Secure development means building software so that security is part of the process and not an afterthought: managing secrets and permissions, code review, testing and protecting data privacy.',
        },
      },
      {
        q: { he: 'האם קוד שנכתב על ידי AI בטוח?', en: 'Is AI-written code secure?' },
        a: {
          he: 'לא באופן אוטומטי. קוד שנכתב על ידי מודל יכול לעבוד ועדיין להכיל חולשות, ולכן צריך לסקור ולבדוק אותו. זה חלק ממה שלומדים במודול הפיתוח המאובטח של קורס FDE.',
          en: 'Not automatically. Model-written code can work and still contain weaknesses, so it has to be reviewed and tested. This is part of what the secure development module of the FDE course teaches.',
        },
      },
      {
        q: { he: 'מה זה סייבר AI?', en: 'What is Cyber AI?' },
        a: {
          he: 'סייבר AI הוא תחום האבטחה בעידן ה-AI: גם הגנה על מערכות AI מפני מתקפות כמו הזרקת פרומפטים, וגם שימוש בכלי AI לניטור, לזיהוי איומים ולניתוח אירועי אבטחה.',
          en: 'Cyber AI is security in the AI era: both protecting AI systems from attacks such as prompt injection, and using AI tools for monitoring, threat detection and security incident analysis.',
        },
      },
      {
        q: { he: 'מה זה הזרקת פרומפטים (Prompt Injection)?', en: 'What is prompt injection?' },
        a: {
          he: 'הזרקת פרומפטים היא מתקפה שבה טקסט זדוני, למשל בתוך מסמך או דף אינטרנט, גורם למערכת AI להתעלם מההוראות שלה ולבצע פעולה אחרת, כמו חשיפת מידע.',
          en: 'Prompt injection is an attack in which malicious text, for example inside a document or a web page, makes an AI system ignore its instructions and do something else, such as exposing data.',
        },
      },
      {
        q: { he: 'איזה קורס מתאים לאנשי אבטחת מידע?', en: 'Which course suits security professionals?' },
        a: {
          he: 'הקורס "סייבר AI לאנשי אבטחת מידע": ניטור, זיהוי וניתוח איומים בעידן ה-AI. המחיר נמסר בשיחה.',
          en: '"Cyber AI for Security Professionals": monitoring, detection and threat analysis in the AI era. The price is given on request.',
        },
      },
    ],
    cta: {
      title: { he: 'רוצים הכשרת סייבר AI או פיתוח מאובטח לצוות?', en: 'Want Cyber AI or secure development training for your team?' },
      label: { he: 'דברו איתנו', en: 'Talk to us' },
      href: '/contact',
    },
  },
];

export function getLandingPage(path: string): LandingPage | undefined {
  return LANDING_PAGES.find(p => p.path === path);
}
