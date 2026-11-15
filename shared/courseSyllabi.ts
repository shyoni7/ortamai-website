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
}

export const COURSE_SYLLABI: CourseSyllabus[] = [
  {
    slug: "claude-code-mastery",
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
        "סרטון עלילה קצר, מתסריט ועד עריכה סופית",
        "ספריית נכסים דיגיטליים ושיטת עבודה מתסריט לפרומפט",
      ],
      en: [
        "A personal avatar in several styles, ready to reuse",
        "A talking avatar video with lip sync",
        "A short narrative film, from script to final edit",
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
            "סטוריבורד בעזרת AI",
            "הפיכת כל שוט לפרומפט מדויק: דמות, פעולה, מצלמה, תאורה וסגנון",
          ],
          en: [
            "Writing a short script: idea, structure and message",
            "Breaking the script into scenes and shots",
            "Storyboarding with AI",
            "Turning each shot into a precise prompt: character, action, camera, lighting and style",
          ],
        },
        practice: {
          he: "תסריט מלא, סטוריבורד ורשימת פרומפטים לסרט הגמר",
          en: "A full script, storyboard and prompt list for your capstone film",
        },
      },
      {
        title: { he: "סרטוני עלילה: מצלמים עם AI", en: "Narrative films: shooting with AI" },
        topics: {
          he: [
            "מטקסט לווידאו ומתמונה לווידאו: מתי משתמשים במה",
            "עקביות של דמויות ולוקיישנים לאורך הסרט",
            "שליטה בתנועת מצלמה ובתנועה בתוך הפריים",
            "בחירת טייקים, תיקונים ויצירה מחדש",
          ],
          en: [
            "Text to video and image to video: when to use which",
            "Consistent characters and locations throughout the film",
            "Controlling camera movement and motion within the frame",
            "Selecting takes, fixing and regenerating",
          ],
        },
        practice: {
          he: "כל השוטים של סרט הגמר מוכנים לעריכה",
          en: "All the shots of your capstone film, ready for editing",
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
];

export function getSyllabus(slug: string): CourseSyllabus | undefined {
  return COURSE_SYLLABI.find(s => s.slug === slug);
}
