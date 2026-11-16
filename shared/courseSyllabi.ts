/**
 * Full syllabi for the main courses, keyed by catalog slug.
 * Price and card copy live in the course catalog (defaultCourses.ts / DB);
 * this file holds only the detailed program shown on /courses/:slug.
 */

export interface Bilingual<T = string> {
  he: T;
  en: T;
}

export interface SyllabusSession {
  title: Bilingual;
  /** What the session covers. */
  topics: Bilingual<string[]>;
  /** The hands-on outcome of the session. */
  practice: Bilingual;
}

export interface CourseSyllabus {
  slug: string;
  sessionCount: number;
  hoursPerSession: number;
  totalHours: number;
  format: Bilingual;
  intro: Bilingual;
  audience: Bilingual<string[]>;
  outcomes: Bilingual<string[]>;
  requirements: Bilingual<string[]>;
  sessions: SyllabusSession[];
  /** Share image for link previews (1200 x 630), a path under /images/og. */
  ogImage?: string;
  /** Optional coded animation in the page hero, with the intro as its subtitles. */
  heroDemo?: { kind: "claude-code"; captions: Bilingual<string[]> };
  /** Optional silent looping clip blended into the page hero. */
  heroVideo?: {
    src: string;
    poster: string;
    alt: Bilingual;
    /** The course intro, split into subtitle lines shown over the clip in turn. */
    captions: Bilingual<string[]>;
  };
}

export const COURSE_SYLLABI: CourseSyllabus[] = [
  {
    slug: "claude-code-mastery",
    ogImage: "/images/og/claude-code.jpg",
    heroDemo: {
      kind: "claude-code",
      captions: {
        he: [
          "שישה מפגשים מעשיים, מההתקנה הראשונה ועד מוצר עובד באוויר",
          "בכל מפגש בונים משהו אמיתי",
          "ובסוף: פרויקט גמר אישי לעסק או לרעיון שלכם",
        ],
        en: [
          "Six hands-on sessions, from first install to a live product",
          "Every session ends with something real",
          "And at the end: your own capstone project",
        ],
      },
    },
    sessionCount: 6,
    hoursPerSession: 5,
    totalHours: 30,
    format: { he: "פרונטלי, בכיתה", en: "In person, in class" },
    intro: {
      he: "שישה מפגשים מעשיים שלוקחים אתכם מההתקנה הראשונה ועד מוצר עובד באוויר. בכל מפגש בונים משהו אמיתי, ובמפגשים האחרונים כל משתתף בונה פרויקט גמר אישי לעסק או לרעיון שלו.",
      en: "Six hands-on sessions that take you from the first install to a working product online. Every session ends with something real, and in the final sessions each participant builds a personal capstone project for their own business or idea.",
    },
    audience: {
      he: [
        "בעלי עסקים ויזמים שרוצים לבנות כלים בעצמם, בלי לחכות למתכנת",
        "אנשי שיווק, תפעול ומוצר שרוצים להפוך רעיונות למוצרים עובדים",
        "מי שלא כתב שורת קוד: מתחילים מאפס מוחלט",
        "מפתחים שרוצים לעבוד מהר ונכון יותר עם Claude Code",
      ],
      en: [
        "Business owners and founders who want to build tools themselves",
        "Marketing, operations and product people turning ideas into working products",
        "Complete beginners: we start from absolute zero",
        "Developers who want to work faster and better with Claude Code",
      ],
    },
    outcomes: {
      he: [
        "פרויקט גמר אישי שעובד באוויר",
        "שיטת עבודה מסודרת: לתכנן, לבנות, לבדוק ולתקן עם Claude Code",
        "יכולת לחבר את Claude Code לכלים של העסק ולבנות אוטומציות",
        "ביטחון לבנות את הפרויקט הבא לבד",
      ],
      en: [
        "A personal capstone project, live online",
        "A clear working method: plan, build, test and fix with Claude Code",
        "The ability to connect Claude Code to your business tools and build automations",
        "The confidence to build your next project on your own",
      ],
    },
    requirements: {
      he: [
        "מחשב נייד אישי",
        "מנוי Claude בתשלום (חובה). המנוי נרכש בנפרד על ידי המשתתף ואינו כלול במחיר הקורס",
        "אין צורך בניסיון קודם בתכנות",
      ],
      en: [
        "A personal laptop",
        "A paid Claude subscription (required). Purchased separately by the participant, not included in the course price",
        "No prior programming experience needed",
      ],
    },
    sessions: [
      {
        title: { he: "מתחילים מאפס: Claude Code על המחשב שלכם", en: "Starting from zero: Claude Code on your machine" },
        topics: {
          he: [
            "מה זה Claude Code ובמה הוא שונה מצ'אט רגיל",
            "התקנה והגדרה ראשונה, צעד אחר צעד",
            "הטרמינל בלי פחד: הפקודות שבאמת צריך",
            "איך מבקשים נכון: מרעיון להנחיה ברורה",
          ],
          en: [
            "What Claude Code is and how it differs from a regular chat",
            "Installation and first setup, step by step",
            "The terminal without fear: the commands you actually need",
            "Asking well: from an idea to a clear instruction",
          ],
        },
        practice: {
          he: "בונים דף נחיתה אישי ראשון",
          en: "Build your first personal landing page",
        },
      },
      {
        title: { he: "שיטת העבודה: לתכנן, לבנות, לתקן", en: "The method: plan, build, fix" },
        topics: {
          he: [
            "מצב תכנון: לחשוב לפני שבונים",
            "קובץ CLAUDE.md: ללמד את Claude את הפרויקט שלכם",
            "Git ו-GitHub: שמירת גרסאות וחזרה אחורה בבטחה",
            "כשמשהו נשבר: איך מאתרים ומתקנים באגים",
          ],
          en: [
            "Plan mode: think before you build",
            "CLAUDE.md: teaching Claude your project",
            "Git and GitHub: saving versions and rolling back safely",
            "When something breaks: finding and fixing bugs",
          ],
        },
        practice: {
          he: "בונים אתר מלא עם כמה עמודים ושומרים אותו ב-GitHub",
          en: "Build a full multi-page website and save it on GitHub",
        },
      },
      {
        title: { he: "עולים לאוויר: מאתר לאפליקציה אמיתית", en: "Going live: from a site to a real app" },
        topics: {
          he: [
            "העלאה לאוויר וחיבור דומיין",
            "טפסים, מסד נתונים ושמירת מידע",
            "הרשמה והתחברות משתמשים",
            "התאמה לנייד ובדיקה לפני שמשחררים",
          ],
          en: [
            "Deploying and connecting a domain",
            "Forms, a database and storing data",
            "User sign-up and login",
            "Mobile fit and checks before release",
          ],
        },
        practice: {
          he: "אפליקציה עם נתונים אמיתיים, זמינה בכתובת משלכם",
          en: "An app with real data, available at your own address",
        },
      },
      {
        title: { he: "חיבורים ואוטומציות לעסק", en: "Connections and automations for your business" },
        topics: {
          he: [
            "MCP: לחבר את Claude Code לכלים חיצוניים",
            "עבודה עם מייל, יומן, גיליונות ומסמכים",
            "אוטומציות שחוסכות עבודה ידנית חוזרת",
            "עבודה עם קבצים ונתונים: דוחות, ניתוחים וסיכומים",
          ],
          en: [
            "MCP: connecting Claude Code to external tools",
            "Working with email, calendar, spreadsheets and documents",
            "Automations that remove repetitive manual work",
            "Working with files and data: reports, analysis and summaries",
          ],
        },
        practice: {
          he: "בונים אוטומציה אחת לתהליך אמיתי מהעסק שלכם",
          en: "Build one automation for a real process from your business",
        },
      },
      {
        title: { he: "רמת המקצוענים", en: "Working like a pro" },
        topics: {
          he: [
            "Skills ופקודות מותאמות אישית",
            "סוכני משנה ועבודה במקביל על כמה משימות",
            "Hooks והרשאות: שליטה במה ש-Claude עושה",
            "אבטחה, סודות ושליטה בעלויות",
          ],
          en: [
            "Skills and custom commands",
            "Subagents and parallel work on several tasks",
            "Hooks and permissions: controlling what Claude does",
            "Security, secrets and cost control",
          ],
        },
        practice: {
          he: "מאפיינים ומתחילים לבנות את פרויקט הגמר האישי",
          en: "Scope and start building your personal capstone project",
        },
      },
      {
        title: { he: "פרויקט גמר: מרעיון למוצר באוויר", en: "Capstone: from idea to a live product" },
        topics: {
          he: [
            "בנייה מודרכת של פרויקט הגמר, עם ליווי אישי",
            "בדיקות, ליטוש ועלייה לאוויר",
            "הצגת הפרויקטים וקבלת משוב",
            "מה הלאה: איך ממשיכים לבנות ולהתעדכן לבד",
          ],
          en: [
            "Guided capstone build with personal support",
            "Testing, polish and going live",
            "Project presentations and feedback",
            "What next: how to keep building and stay current on your own",
          ],
        },
        practice: {
          he: "פרויקט גמר אישי שעובד באוויר",
          en: "A personal capstone project, live online",
        },
      },
    ],
  },
  {
    slug: "ai-filmmaker-studio",
    ogImage: "/images/og/ai-studio.jpg",
    heroVideo: {
      src: "/videos/ai-studio-hero.mp4",
      poster: "/videos/ai-studio-hero.jpg",
      alt: {
        he: "סרטון אנימציה שנוצר ב-AI: בוסקו, כלב ראפר, נכנס לסטודיו הווידאו שלו ומתיישב לערוך סרט",
        en: "AI-generated animation: Bosco, a rapper dog, walks into his video studio and sits down to edit a film",
      },
      captions: {
        he: [
          "שישה מפגשים מעשיים שבהם בונים סטודיו AI מלא",
          "נכסים חזותיים, אווטארים, סרטוני ליפ סינק וסרטוני עלילה",
          "לומדים לכתוב תסריט ולהפוך אותו לפרומפטים מדויקים",
          "ומסיימים עם סרט גמר ותיק עבודות ראשון",
        ],
        en: [
          "Six hands-on sessions in which you build a complete AI studio",
          "Visual assets, avatars, lip-sync videos and narrative films",
          "Learn to write a script and turn it into precise prompts",
          "Finish with a capstone film and a first portfolio",
        ],
      },
    },
    sessionCount: 6,
    hoursPerSession: 5,
    totalHours: 30,
    format: { he: "פרונטלי, בכיתה", en: "In person, in class" },
    intro: {
      he: "שישה מפגשים מעשיים שבהם בונים סטודיו AI מלא: נכסים חזותיים, אווטארים, סרטוני ליפ סינק וסרטוני עלילה. לומדים לכתוב תסריט ולהפוך אותו לפרומפטים מדויקים, ומסיימים עם סרט גמר ותיק עבודות ראשון.",
      en: "Six hands-on sessions in which you build a complete AI studio: visual assets, avatars, lip-sync videos and narrative films. You learn to write a script and turn it into precise prompts, and finish with a capstone film and a first portfolio.",
    },
    audience: {
      he: [
        "בעלי עסקים שרוצים להפיק תוכן וידאו בעצמם",
        "אנשי שיווק, סושיאל ותוכן",
        "יוצרים, צלמים ועורכים שרוצים להוסיף AI לארגז הכלים",
        "מי שמתחיל מאפס: אין צורך בניסיון בצילום או בעריכה",
      ],
      en: [
        "Business owners who want to produce video content themselves",
        "Marketing, social and content people",
        "Creators, photographers and editors adding AI to their toolkit",
        "Complete beginners: no filming or editing experience needed",
      ],
    },
    outcomes: {
      he: [
        "אווטאר אישי בכמה סגנונות, מוכן לשימוש חוזר",
        "סרטון אווטאר מדבר עם ליפ סינק",
        "סרטון עלילה קצר, מתכנון וסטוריבורד ועד עריכה סופית",
        "ספריית נכסים דיגיטליים ושיטת עבודה מתסריט לפרומפט",
      ],
      en: [
        "A personal avatar in several styles, ready to reuse",
        "A talking avatar video with lip sync",
        "A short narrative film, from planning and storyboard to final edit",
        "A digital asset library and a script-to-prompt working method",
      ],
    },
    requirements: {
      he: [
        "מחשב נייד אישי",
        "מנויים לכלי ה-AI שבהם עובדים בקורס. המנויים נרכשים בנפרד על ידי המשתתף ואינם כלולים במחיר הקורס",
        "אין צורך בניסיון קודם בצילום, בעריכה או ב-AI",
      ],
      en: [
        "A personal laptop",
        "Subscriptions to the AI tools used in the course. Purchased separately by the participant, not included in the course price",
        "No prior filming, editing or AI experience needed",
      ],
    },
    sessions: [
      {
        title: { he: "יסודות הסטודיו: תמונות, אסטים ונכסים דיגיטליים", en: "Studio foundations: images, assets and digital properties" },
        topics: {
          he: [
            "מפת הכלים: איזה כלי מתאים לאיזו משימה",
            "שפת הצילום: שוט, זווית, תאורה ותנועת מצלמה",
            "יצירת תמונות ברמה מקצועית",
            "בניית ספריית נכסים: דמויות, לוקיישנים, מוצרים ואלמנטים גרפיים",
          ],
          en: [
            "The tool map: which tool fits which job",
            "The language of film: shot, angle, lighting and camera movement",
            "Creating professional-grade images",
            "Building an asset library: characters, locations, products and graphic elements",
          ],
        },
        practice: {
          he: "ספריית נכסים ראשונה בסגנון אחיד לפרויקט שלכם",
          en: "A first asset library in a consistent style for your project",
        },
      },
      {
        title: { he: "בניית אווטאר בסגנונות שונים", en: "Building an avatar in different styles" },
        topics: {
          he: [
            "אווטאר מבוסס עליכם ואווטאר דמיוני",
            "סגנונות: ריאליסטי, אנימציה, תלת ממד ואיור",
            "שמירה על עקביות הדמות בין תמונות וסצנות",
            "קול לדמות: בחירה, עיצוב ושיבוט קול",
          ],
          en: [
            "An avatar based on you and a fictional avatar",
            "Styles: realistic, animation, 3D and illustration",
            "Keeping the character consistent across images and scenes",
            "A voice for the character: choosing, designing and cloning a voice",
          ],
        },
        practice: {
          he: "אווטאר אישי בשלושה סגנונות, עם קול משלו",
          en: "A personal avatar in three styles, with its own voice",
        },
      },
      {
        title: { he: "ליפ סינק וסרטוני אווטאר מדברים", en: "Lip sync and talking avatar videos" },
        topics: {
          he: [
            "מטקסט לדמות מדברת: תהליך העבודה המלא",
            "ליפ סינק מדויק לעברית ולאנגלית",
            "הבעה, קצב ושפת גוף שנראים טבעיים",
            "תרגום ודיבוב של סרטון קיים לשפות אחרות",
          ],
          en: [
            "From text to a talking character: the full workflow",
            "Accurate lip sync in Hebrew and English",
            "Expression, pacing and body language that look natural",
            "Translating and dubbing an existing video into other languages",
          ],
        },
        practice: {
          he: "סרטון אווטאר מדבר, מוכן לפרסום ברשתות",
          en: "A talking avatar video, ready to publish on social",
        },
      },
      {
        title: { he: "מתסריט לפרומפטים מדויקים", en: "From script to precise prompts" },
        topics: {
          he: [
            "כתיבת תסריט קצר: רעיון, מבנה ומסר",
            "פירוק התסריט לסצנות ולשוטים",
            "הגדרת השפה החזותית של הסרט: סגנון, צבע ואווירה",
            "הפיכת כל שוט לפרומפט מדויק: דמות, פעולה, מצלמה, תאורה וסגנון",
          ],
          en: [
            "Writing a short script: idea, structure and message",
            "Breaking the script into scenes and shots",
            "Defining the film's visual language: style, colour and mood",
            "Turning each shot into a precise prompt: character, action, camera, lighting and style",
          ],
        },
        practice: {
          he: "תסריט מלא, מפורק לשוטים, ורשימת פרומפטים לסרט הגמר",
          en: "A full script, broken into shots, and a prompt list for your capstone film",
        },
      },
      {
        title: { he: "סרטוני עלילה: תכנון, סטוריבורד וצילום עם AI", en: "Narrative films: planning, storyboard and shooting with AI" },
        topics: {
          he: [
            "תכנון ההפקה: רשימת שוטים, דמויות, לוקיישנים וסדר עבודה",
            "סטוריבורד מלא לסרט: פריים מפתח לכל שוט, בעזרת AI",
            "מטקסט לווידאו ומתמונה לווידאו: מתי משתמשים במה",
            "עקביות של דמויות ולוקיישנים ושליטה בתנועת המצלמה",
            "בחירת טייקים, תיקונים ויצירה מחדש",
          ],
          en: [
            "Production planning: shot list, characters, locations and order of work",
            "A full storyboard for the film: a key frame for every shot, made with AI",
            "Text to video and image to video: when to use which",
            "Consistent characters and locations, and control of camera movement",
            "Selecting takes, fixing and regenerating",
          ],
        },
        practice: {
          he: "סטוריבורד מלא וכל השוטים של סרט הגמר מוכנים לעריכה",
          en: "A full storyboard and all the shots of your capstone film, ready for editing",
        },
      },
      {
        title: { he: "עריכה, סאונד ופרויקט גמר", en: "Editing, sound and capstone" },
        topics: {
          he: [
            "עריכה: רצף, קצב ומעברים",
            "מוזיקה, קריינות ואפקטים קוליים ב-AI",
            "כתוביות וייצוא בפורמטים לכל רשת",
            "זכויות יוצרים ושימוש אחראי בדמויות ובקולות",
          ],
          en: [
            "Editing: sequence, pacing and transitions",
            "AI music, voice-over and sound effects",
            "Subtitles and export formats for every platform",
            "Copyright and responsible use of likenesses and voices",
          ],
        },
        practice: {
          he: "הקרנת סרטי הגמר ותיק עבודות ראשון",
          en: "Capstone screening and a first portfolio",
        },
      },
    ],
  },
  {
    slug: "fde-ai-implementers",
    sessionCount: 6,
    hoursPerSession: 5,
    totalHours: 30,
    format: { he: "פרונטלי, בכיתה", en: "In person, in class" },
    intro: {
      he: "קורס FDE (Forward Deployed Engineer) מכשיר מטמיעי AI: אנשי המקצוע שלוקחים בעיה עסקית והופכים אותה לפתרון AI שעובד בארגון. שישה מפגשים מעשיים על הטמעת AI מקצה לקצה: אפיון, פיתוח עם AI, סוכני AI ואוטומציות, פיתוח מאובטח והכשרת עובדים.",
      en: "The FDE (Forward Deployed Engineer) course trains AI implementers: the professionals who take a business problem and turn it into an AI solution that works inside the organization. Six hands-on sessions covering AI implementation end to end: scoping, building with AI, AI agents and automations, secure development and employee training.",
    },
    audience: {
      he: [
        "מפתחים ואנשי טכנולוגיה שרוצים להוביל הטמעת AI בארגונים",
        "אנשי תפעול, מערכות מידע ודיגיטל שאחראים על כלי AI בארגון",
        "יועצים ומנהלי פרויקטים שמלווים לקוחות בהטמעת AI",
        "בוגרי קורס Claude Code או בעלי ניסיון בסיסי בפיתוח עם AI",
      ],
      en: [
        "Developers and technologists who want to lead AI implementation in organizations",
        "Operations, IT and digital people responsible for AI tools at work",
        "Consultants and project managers guiding clients through AI adoption",
        "Graduates of the Claude Code course or people with basic experience building with AI",
      ],
    },
    outcomes: {
      he: [
        "מסמך אפיון ותוכנית הטמעת AI לארגון אמיתי",
        "פיילוט עובד שמחובר לידע ולמערכות של הארגון",
        "סוכן AI ואוטומציה שמבצעים תהליך עבודה שלם",
        "שיטת עבודה לפיתוח מאובטח, בדיקות והכשרת עובדים",
      ],
      en: [
        "A scoping document and an AI implementation plan for a real organization",
        "A working pilot connected to the organization's knowledge and systems",
        "An AI agent and an automation that run a complete workflow",
        "A working method for secure development, testing and employee training",
      ],
    },
    requirements: {
      he: [
        "מחשב נייד אישי",
        "מנוי Claude בתשלום (נדרש לעבודה עם Claude Code). המנוי נרכש בנפרד על ידי המשתתף ואינו כלול במחיר הקורס",
        "היכרות בסיסית עם Claude Code או עם פיתוח בעזרת AI",
      ],
      en: [
        "A personal laptop",
        "A paid Claude subscription (required for Claude Code). Purchased separately by the participant, not included in the course price",
        "Basic familiarity with Claude Code or with building software using AI",
      ],
    },
    sessions: [
      {
        title: { he: "מהו FDE: אפיון והטמעת AI בארגון", en: "What an FDE does: scoping and implementing AI in an organization" },
        topics: {
          he: [
            "התפקיד: Forward Deployed Engineer, מטמיע AI שעובד צמוד ללקוח",
            "מיפוי תהליכים עסקיים ואיתור המקומות שבהם AI חוסך זמן וכסף",
            "בחירת מקרה שימוש: ערך עסקי, היתכנות, סיכון ומדדי הצלחה",
            "כתיבת מסמך אפיון ותוכנית הטמעה שהנהלה יכולה לאשר",
          ],
          en: [
            "The role: Forward Deployed Engineer, an AI implementer working alongside the customer",
            "Mapping business processes and finding where AI saves time and money",
            "Choosing a use case: business value, feasibility, risk and success metrics",
            "Writing a scoping document and an implementation plan management can approve",
          ],
        },
        practice: {
          he: "מסמך אפיון למקרה שימוש אמיתי מהארגון שלכם",
          en: "A scoping document for a real use case from your own organization",
        },
      },
      {
        title: { he: "פיתוח עם AI: Claude Code ווייב קודינג לפיילוט מהיר", en: "Building with AI: Claude Code and vibe coding for a fast pilot" },
        topics: {
          he: [
            "סביבת העבודה של מטמיע AI: Claude Code, טרמינל ו-Git",
            "וייב קודינג בצורה מקצועית: מפרומפט לקוד עובד, בלי לאבד שליטה",
            "בניית פיילוט (POC) בתוך ימים במקום חודשים",
            "עבודה עם API של מודלי שפה: פרומפטים, עלויות ובחירת מודל",
          ],
          en: [
            "The AI implementer's workspace: Claude Code, the terminal and Git",
            "Vibe coding done professionally: from prompt to working code without losing control",
            "Building a pilot (POC) in days instead of months",
            "Working with LLM APIs: prompts, costs and model choice",
          ],
        },
        practice: {
          he: "פיילוט עובד ראשון למקרה השימוש שבחרתם",
          en: "A first working pilot for the use case you chose",
        },
      },
      {
        title: { he: "חיבור ה-AI לידע ולמערכות של הארגון", en: "Connecting AI to the organization's knowledge and systems" },
        topics: {
          he: [
            "RAG: איך נותנים למודל לענות מתוך המסמכים והנתונים של הארגון",
            "חיבור למערכות קיימות: CRM, ERP, מייל, דרייב ומסדי נתונים",
            "MCP וחיבורי API: לתת ל-AI כלים לפעול ולא רק לענות",
            "איכות נתונים, הרשאות ומה אסור שהמודל יראה",
          ],
          en: [
            "RAG: letting the model answer from the organization's own documents and data",
            "Connecting to existing systems: CRM, ERP, email, drive and databases",
            "MCP and API connections: giving AI tools to act, not only to answer",
            "Data quality, permissions and what the model must never see",
          ],
        },
        practice: {
          he: "עוזר AI שעונה מתוך מסמכי הארגון ומחובר למערכת אחת לפחות",
          en: "An AI assistant that answers from company documents and connects to at least one system",
        },
      },
      {
        title: { he: "סוכני AI ואוטומציות לתהליכי עבודה", en: "AI agents and automations for business workflows" },
        topics: {
          he: [
            "מה ההבדל בין צ'אטבוט, אוטומציה וסוכן AI, ומתי בוחרים בכל אחד",
            "תכנון סוכן: מטרה, כלים, זיכרון וגבולות",
            "אוטומציות מקצה לקצה: טריגרים, תזמון ואישור אנושי בנקודות רגישות",
            "כמה סוכנים שעובדים יחד על משימה אחת",
          ],
          en: [
            "Chatbot, automation or AI agent: the difference and when to pick each",
            "Designing an agent: goal, tools, memory and limits",
            "End-to-end automations: triggers, scheduling and human approval at sensitive points",
            "Several agents working together on one task",
          ],
        },
        practice: {
          he: "סוכן AI שמבצע תהליך עבודה שלם מהארגון שלכם",
          en: "An AI agent that runs a complete workflow from your organization",
        },
      },
      {
        title: { he: "פיתוח מאובטח, סייבר AI ובדיקות איכות", en: "Secure development, AI cyber security and quality testing" },
        topics: {
          he: [
            "פיתוח מאובטח עם AI: סודות, הרשאות וסקירת קוד שנכתב על ידי מודל",
            "סייבר AI: הזרקת פרומפטים, דליפת מידע ואיך מתגוננים",
            "פרטיות, רגולציה ומדיניות שימוש ב-AI בארגון",
            "בדיקות והערכה (evals): איך יודעים שהמערכת עונה נכון לאורך זמן",
          ],
          en: [
            "Secure development with AI: secrets, permissions and reviewing model-written code",
            "AI cyber security: prompt injection, data leaks and how to defend against them",
            "Privacy, regulation and an AI usage policy for the organization",
            "Testing and evals: knowing the system keeps answering correctly over time",
          ],
        },
        practice: {
          he: "בדיקת אבטחה וסט בדיקות איכות לפיילוט שבניתם",
          en: "A security review and a quality test suite for the pilot you built",
        },
      },
      {
        title: { he: "עלייה לאוויר, הכשרת עובדים ופרויקט גמר", en: "Going live, employee training and the capstone" },
        topics: {
          he: [
            "מפיילוט לייצור: פריסה, ניטור, עלויות ותחזוקה",
            "הכשרת עובדים וסדנאות AI פנימיות: איך גורמים לאנשים להשתמש באמת",
            "ניהול שינוי ומדידת החזר השקעה (ROI) של הטמעת AI",
            "הצגת הפתרון להנהלה ובניית תיק עבודות של מטמיע AI",
          ],
          en: [
            "From pilot to production: deployment, monitoring, costs and maintenance",
            "Employee training and internal AI workshops: getting people to really use it",
            "Change management and measuring the ROI of an AI implementation",
            "Presenting the solution to management and building an AI implementer portfolio",
          ],
        },
        practice: {
          he: "הצגת פרויקט הגמר: פתרון AI עובד, עם תוכנית הטמעה והכשרה",
          en: "Capstone presentation: a working AI solution with a rollout and training plan",
        },
      },
    ],
  },
];

export function getSyllabus(slug: string): CourseSyllabus | undefined {
  return COURSE_SYLLABI.find(s => s.slug === slug);
}
