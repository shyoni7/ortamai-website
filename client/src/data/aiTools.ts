// AI tools guide data. Free-plan details are taken as-is from the source guide
// document and have not been verified against each vendor yet (QA pending).

export type CategoryId = 'chat' | 'research' | 'image' | 'video' | 'slides' | 'audio' | 'dev';

/** yes = has a free plan, no = paid or trial only, unknown = not stated in the source. */
export type FreeStatus = 'yes' | 'no' | 'unknown';

export interface Bi { he: string; en: string }

export interface AiTool {
  name: string;
  url: string;
  category: CategoryId;
  desc: Bi;
  free: FreeStatus;
  freeNote?: Bi;
  /** Short origin tag, e.g. Israeli or Chinese company. */
  origin?: 'il' | 'cn';
}

export const CATEGORIES: { id: CategoryId; label: Bi }[] = [
  { id: 'chat', label: { he: 'צ׳אט וכתיבה', en: 'Chat & writing' } },
  { id: 'research', label: { he: 'מחקר ומסמכים', en: 'Research & documents' } },
  { id: 'image', label: { he: 'תמונות', en: 'Images' } },
  { id: 'video', label: { he: 'וידאו', en: 'Video' } },
  { id: 'slides', label: { he: 'מצגות', en: 'Presentations' } },
  { id: 'audio', label: { he: 'מוזיקה וקול', en: 'Music & voice' } },
  { id: 'dev', label: { he: 'אתרים, אפליקציות וקוד', en: 'Sites, apps & code' } },
];

export const TOOLS: AiTool[] = [
  // Chat & writing
  {
    name: 'Claude', url: 'https://claude.ai', category: 'chat',
    desc: {
      he: 'עוזר AI של Anthropic. מצטיין בכתיבה, עברית טבעית, ניתוח מסמכים ארוכים וקוד.',
      en: 'Anthropic\'s AI assistant. Strong at writing, natural Hebrew, long-document analysis and code.',
    },
    free: 'yes',
    freeNote: { he: 'מוגבל בהודעות. המודלים המתקדמים במנוי בתשלום', en: 'Message limits. Top models require a paid plan' },
  },
  {
    name: 'ChatGPT', url: 'https://chatgpt.com', category: 'chat',
    desc: {
      he: 'העוזר של OpenAI. כתיבה, חיפוש ברשת, ניתוח נתונים ויצירת תמונות בשיחה.',
      en: 'OpenAI\'s assistant. Writing, web search, data analysis and image creation in chat.',
    },
    free: 'yes',
    freeNote: { he: 'מוגבל', en: 'Limited' },
  },
  {
    name: 'Gemini', url: 'https://gemini.google.com', category: 'chat',
    desc: {
      he: 'העוזר של Google. משתלב ב-Gmail, Docs ו-Drive ובודק עובדות מול החיפוש של Google.',
      en: 'Google\'s assistant. Works inside Gmail, Docs and Drive and checks facts against Google Search.',
    },
    free: 'yes',
    freeNote: { he: 'גרסה בסיסית', en: 'Basic version' },
  },
  {
    name: 'DeepSeek', url: 'https://www.deepseek.com', category: 'chat', origin: 'cn',
    desc: {
      he: 'מודלים סיניים חזקים בחשיבה, מתמטיקה וקוד, במחירי API נמוכים מאוד.',
      en: 'Chinese models strong in reasoning, math and code, with very low API prices.',
    },
    free: 'yes',
    freeNote: { he: 'קוד פתוח, אפשר להוריד ולהריץ מקומית', en: 'Open source, can be downloaded and run locally' },
  },
  {
    name: 'Qwen', url: 'https://chat.qwen.ai', category: 'chat', origin: 'cn',
    desc: {
      he: 'סדרת מודלים פתוחים של עליבאבא. חזקה בקוד ובשפות רבות.',
      en: 'Alibaba\'s open model family. Strong in code and many languages.',
    },
    free: 'yes',
    freeNote: { he: 'מודלים פתוחים', en: 'Open models' },
  },
  {
    name: 'Kimi', url: 'https://www.kimi.com', category: 'chat', origin: 'cn',
    desc: {
      he: 'עוזר מחקר עם חלון הקשר ארוך במיוחד, לניתוח ספרים ומסמכים ארוכים.',
      en: 'Research assistant with a very long context window for books and long documents.',
    },
    free: 'unknown',
  },
  {
    name: 'AI21 Labs', url: 'https://www.ai21.com', category: 'chat', origin: 'il',
    desc: {
      he: 'חברה ישראלית. מודלי Jamba מהירים עם הקשר ארוך, ופלטפורמת Maestro לסוכנים בארגונים.',
      en: 'Israeli company. Fast long-context Jamba models and the Maestro platform for enterprise agents.',
    },
    free: 'yes',
    freeNote: { he: 'מודלי Jamba בקוד פתוח', en: 'Jamba models are open source' },
  },
  {
    name: 'Notion AI', url: 'https://www.notion.com/product/ai', category: 'chat',
    desc: {
      he: 'AI בתוך Notion: שכתוב, סיכום והרחבה של טקסט ישירות במסמכים.',
      en: 'AI inside Notion: rewrite, summarize and expand text right in your docs.',
    },
    free: 'unknown',
  },
  {
    name: 'Jasper', url: 'https://www.jasper.ai', category: 'chat',
    desc: {
      he: 'כלי כתיבה לצוותי שיווק עם תבניות לקמפיינים ושמירה על קול המותג. יקר יחסית.',
      en: 'Writing tool for marketing teams with campaign templates and brand voice. Relatively expensive.',
    },
    free: 'unknown',
  },
  {
    name: 'Copy.ai', url: 'https://www.copy.ai', category: 'chat',
    desc: {
      he: 'כלי כתיבה שיווקית עם תבניות מוכנות לקמפיינים ו-SEO.',
      en: 'Marketing writing tool with ready templates for campaigns and SEO.',
    },
    free: 'unknown',
  },

  // Research & documents
  {
    name: 'NotebookLM', url: 'https://notebooklm.google.com', category: 'research',
    desc: {
      he: 'מעלים קבצים וקישורים ושואלים שאלות. התשובות מבוססות רק על המקורות שהעליתם, ויש גם סיכום בפורמט פודקאסט.',
      en: 'Upload files and links and ask questions. Answers rely only on your sources, plus a podcast-style summary.',
    },
    free: 'yes',
    freeNote: { he: 'חינמי לגמרי', en: 'Completely free' },
  },
  {
    name: 'Perplexity', url: 'https://www.perplexity.ai', category: 'research',
    desc: {
      he: 'מנוע חיפוש ומחקר שעונה בתשובה מסודרת עם מקורות וציטוטים.',
      en: 'Search and research engine that answers with structured replies, sources and citations.',
    },
    free: 'yes',
    freeNote: { he: 'גרסה בסיסית', en: 'Basic version' },
  },
  {
    name: 'ChatPDF', url: 'https://www.chatpdf.com', category: 'research',
    desc: {
      he: 'מעלים מסמך אחד ושואלים עליו שאלות. פשוט ומהיר לשימוש נקודתי.',
      en: 'Upload a single document and ask about it. Simple and quick for one-off use.',
    },
    free: 'unknown',
  },

  // Images
  {
    name: 'Nano Banana (Google)', url: 'https://gemini.google.com', category: 'image',
    desc: {
      he: 'יצירה ועריכה של תמונות בשיחה, שמירה על דמויות עקביות וכתיבת טקסט בעברית בתוך התמונה.',
      en: 'Create and edit images in conversation, keep characters consistent and render Hebrew text in the image.',
    },
    free: 'yes',
    freeNote: { he: 'חינם ב-Gemini וב-Google AI Studio', en: 'Free in Gemini and Google AI Studio' },
  },
  {
    name: 'Midjourney', url: 'https://www.midjourney.com', category: 'image',
    desc: {
      he: 'האסתטיקה והסגנון האמנותי הכי חזקים. מתאים לקריאייטיב, עיצוב וקמפיינים.',
      en: 'The strongest aesthetics and artistic style. Great for creative, design and campaigns.',
    },
    free: 'no',
  },
  {
    name: 'FLUX', url: 'https://bfl.ai', category: 'image',
    desc: {
      he: 'תמונות ריאליסטיות מאוד, הבנת הנחיות מורכבות וטקסט מדויק בתוך התמונה.',
      en: 'Highly realistic images, complex prompt understanding and accurate text in the image.',
    },
    free: 'yes',
    freeNote: { he: 'דרך ספקים או גרסת קוד פתוח', en: 'Through providers or the open-source version' },
  },
  {
    name: 'Adobe Firefly', url: 'https://firefly.adobe.com', category: 'image',
    desc: {
      he: 'משולב בכלי Adobe. בטוח לשימוש מסחרי, עם הרחבת תמונות והחלפת אובייקטים.',
      en: 'Built into Adobe tools. Commercially safe, with image expansion and object replacement.',
    },
    free: 'unknown',
  },
  {
    name: 'Canva', url: 'https://www.canva.com', category: 'image',
    desc: {
      he: 'כלי העיצוב המוכר עם כלי AI מובנים: עיצוב אוטומטי, יצירת תמונות ותרגום.',
      en: 'The familiar design tool with built-in AI: auto design, image generation and translation.',
    },
    free: 'yes',
  },
  {
    name: 'Stable Diffusion', url: 'https://stability.ai', category: 'image',
    desc: {
      he: 'מודל קוד פתוח להתקנה על המחשב, עם שליטה מלאה בתנוחות ובסגנון.',
      en: 'Open-source model to install on your computer, with full control over poses and style.',
    },
    free: 'yes',
    freeNote: { he: 'קוד פתוח, התקנה מקומית', en: 'Open source, local install' },
  },
  {
    name: 'Bria AI', url: 'https://bria.ai', category: 'image', origin: 'il',
    desc: {
      he: 'חברה ישראלית. תמונות ווידאו ממודלים שאומנו רק על תוכן מורשה, בטוח לשימוש מסחרי.',
      en: 'Israeli company. Images and video from models trained only on licensed content, commercially safe.',
    },
    free: 'unknown',
  },

  // Video
  {
    name: 'Runway', url: 'https://runwayml.com', category: 'video',
    desc: {
      he: 'וידאו מטקסט או מתמונה עם שליטה מדויקת בתנועת המצלמה. תוצאות קולנועיות.',
      en: 'Video from text or image with precise camera control. Cinematic results.',
    },
    free: 'yes',
    freeNote: { he: 'קרדיטים ראשוניים', en: 'Starter credits' },
  },
  {
    name: 'Kling AI', url: 'https://klingai.com', category: 'video', origin: 'cn',
    desc: {
      he: 'פיזיקה ותנועות גוף מציאותיות, קליפים של 5 עד 10 שניות.',
      en: 'Realistic physics and body motion, 5 to 10 second clips.',
    },
    free: 'yes',
    freeNote: { he: 'מכסה יומית מוגבלת', en: 'Limited daily quota' },
  },
  {
    name: 'Luma Dream Machine', url: 'https://lumalabs.ai', category: 'video',
    desc: {
      he: 'וידאו מהיר עם זוויות צילום דינמיות ותנועה מורכבת.',
      en: 'Fast video with dynamic camera angles and complex motion.',
    },
    free: 'unknown',
  },
  {
    name: 'Hailuo AI', url: 'https://hailuoai.video', category: 'video', origin: 'cn',
    desc: {
      he: 'דמויות אנושיות טבעיות והבעות פנים מדויקות, בלי עיוותים.',
      en: 'Natural human characters and accurate facial expressions, without distortion.',
    },
    free: 'unknown',
  },
  {
    name: 'Pika', url: 'https://pika.art', category: 'video',
    desc: {
      he: 'אפקטים מיוחדים ושינוי אובייקטים בוידאו, מותאם לרשתות חברתיות.',
      en: 'Special effects and object changes in video, made for social media.',
    },
    free: 'unknown',
  },
  {
    name: 'HeyGen', url: 'https://www.heygen.com', category: 'video',
    desc: {
      he: 'סרטונים עם אווטארים מדברים, שכפול קול ודיבוב לעשרות שפות.',
      en: 'Videos with talking avatars, voice cloning and dubbing into dozens of languages.',
    },
    free: 'yes',
    freeNote: { he: 'דקה בודדת', en: 'A single minute' },
  },
  {
    name: 'D-ID', url: 'https://www.d-id.com', category: 'video', origin: 'il',
    desc: {
      he: 'חברה ישראלית. אווטאר מדבר מתמונה אחת וטקסט או אודיו, לסרטוני הדרכה ושיווק.',
      en: 'Israeli company. A talking avatar from one photo plus text or audio, for training and marketing videos.',
    },
    free: 'unknown',
  },
  {
    name: 'LTX Studio', url: 'https://ltx.studio', category: 'video', origin: 'il',
    desc: {
      he: 'של Lightricks הישראלית. מרעיון לתסריט, לוח תכנון, שוטים ועריכה במקום אחד.',
      en: 'By Israeli Lightricks. From idea to script, storyboard, shots and editing in one place.',
    },
    free: 'unknown',
  },
  {
    name: 'Decart', url: 'https://www.decart.ai', category: 'video', origin: 'il',
    desc: {
      he: 'חברה ישראלית. Oasis מייצר עולם וידאו אינטראקטיבי בזמן אמת שאפשר לנווט בו.',
      en: 'Israeli company. Oasis generates an interactive real-time video world you can move through.',
    },
    free: 'unknown',
  },

  // Presentations
  {
    name: 'Gamma', url: 'https://gamma.app', category: 'slides',
    desc: {
      he: 'מזינים נושא או מסמך ומקבלים מצגת או דף אינטרנט מעוצב תוך דקה. תומך בעברית.',
      en: 'Enter a topic or document and get a designed deck or web page in a minute. Supports Hebrew.',
    },
    free: 'yes',
    freeNote: { he: 'קרדיטים מוגבלים', en: 'Limited credits' },
  },
  {
    name: 'Genspark', url: 'https://www.genspark.ai', category: 'slides',
    desc: {
      he: 'סוכני AI למחקר ולהפקת מצגות, מסמכים וגיליונות. ייצוא ל-PPTX, PDF ו-Google Slides.',
      en: 'AI agents for research and for creating decks, docs and sheets. Exports to PPTX, PDF and Google Slides.',
    },
    free: 'yes',
    freeNote: { he: 'קרדיטים יומיים עד תקרה מצטברת', en: 'Daily credits up to a cumulative cap' },
  },
  {
    name: 'Beautiful.ai', url: 'https://www.beautiful.ai', category: 'slides',
    desc: {
      he: 'מזינים תוכן והשקף מסתדר לבד לפי חוקי עיצוב מקצועיים.',
      en: 'Enter content and the slide lays itself out by professional design rules.',
    },
    free: 'no',
    freeNote: { he: 'תקופת ניסיון בלבד', en: 'Trial only' },
  },
  {
    name: 'Tome', url: 'https://tome.app', category: 'slides',
    desc: {
      he: 'סטוריטלינג אינטראקטיבי שמשלב טקסט, תמונות AI ותוכן מוטמע.',
      en: 'Interactive storytelling that mixes text, AI images and embedded content.',
    },
    free: 'unknown',
  },
  {
    name: 'Microsoft Copilot', url: 'https://www.microsoft.com/microsoft-365/copilot', category: 'slides',
    desc: {
      he: 'לארגונים ב-Microsoft 365. הופך מסמך Word למצגת PowerPoint מעוצבת.',
      en: 'For Microsoft 365 organizations. Turns a Word document into a designed PowerPoint deck.',
    },
    free: 'unknown',
  },

  // Music & voice
  {
    name: 'Suno', url: 'https://suno.com', category: 'audio',
    desc: {
      he: 'שיר מלא עם מילים, לחן ושירה בכל סגנון. תומך גם בעברית.',
      en: 'A full song with lyrics, melody and vocals in any style. Also supports Hebrew.',
    },
    free: 'yes',
    freeNote: { he: '50 קרדיטים ביום', en: '50 credits a day' },
  },
  {
    name: 'Udio', url: 'https://www.udio.com', category: 'audio',
    desc: {
      he: 'מתחרה של Suno עם סאונד צלול ושליטה מתקדמת במבנה השיר.',
      en: 'A Suno competitor with clear sound and advanced control over song structure.',
    },
    free: 'unknown',
  },
  {
    name: 'ElevenLabs', url: 'https://elevenlabs.io', category: 'audio',
    desc: {
      he: 'קריינות טבעית מטקסט ושכפול קול, כולל עברית.',
      en: 'Natural text-to-speech and voice cloning, including Hebrew.',
    },
    free: 'yes',
    freeNote: { he: '10,000 תווים בחודש', en: '10,000 characters a month' },
  },
  {
    name: 'Soundraw', url: 'https://soundraw.io', category: 'audio',
    desc: {
      he: 'מוזיקת רקע לסרטונים, עם שליטה באורך ובקצב ובלי בעיות זכויות יוצרים.',
      en: 'Background music for videos, with control over length and tempo and no copyright issues.',
    },
    free: 'unknown',
  },

  // Sites, apps & code
  {
    name: 'Base44', url: 'https://base44.com', category: 'dev', origin: 'il',
    desc: {
      he: 'ישראלי, נרכש בידי Wix. מתארים בשפה טבעית ומקבלים אפליקציה עם מסד נתונים והתחברות משתמשים.',
      en: 'Israeli, acquired by Wix. Describe it in plain language and get an app with a database and user login.',
    },
    free: 'unknown',
  },
  {
    name: 'Lovable', url: 'https://lovable.dev', category: 'dev',
    desc: {
      he: 'בונים אפליקציה מלאה בדפדפן מתוך תיאור, כולל מסד נתונים, בלי להתקין כלום.',
      en: 'Build a full app in the browser from a description, database included, nothing to install.',
    },
    free: 'yes',
    freeNote: { he: 'קרדיטים בסיסיים', en: 'Basic credits' },
  },
  {
    name: 'Bolt.new', url: 'https://bolt.new', category: 'dev',
    desc: {
      he: 'בונים אפליקציה מלאה בדפדפן מתוך תיאור, כולל הרצה ומסד נתונים.',
      en: 'Build a full app in the browser from a description, with hosting and a database.',
    },
    free: 'yes',
    freeNote: { he: 'קרדיטים בסיסיים', en: 'Basic credits' },
  },
  {
    name: 'v0', url: 'https://v0.app', category: 'dev',
    desc: {
      he: 'של Vercel. מתארים ממשק ומקבלים קוד React מעוצב שאפשר להעלות לאוויר.',
      en: 'By Vercel. Describe an interface and get styled React code ready to deploy.',
    },
    free: 'yes',
    freeNote: { he: 'קרדיטים חודשיים', en: 'Monthly credits' },
  },
  {
    name: 'Replit', url: 'https://replit.com', category: 'dev',
    desc: {
      he: 'סוכן שמקבל רעיון, כותב את הקוד, מתקן שגיאות ומעלה את האתר לאוויר.',
      en: 'An agent that takes an idea, writes the code, fixes errors and publishes the site.',
    },
    free: 'unknown',
  },
  {
    name: 'Cursor', url: 'https://cursor.com', category: 'dev',
    desc: {
      he: 'סביבת פיתוח עם AI מובנה שעורך ובודק קבצים רבים בפקודה אחת. למי שכותב קוד.',
      en: 'A code editor with built-in AI that edits and checks many files at once. For people who code.',
    },
    free: 'yes',
    freeNote: { he: 'מוגבל', en: 'Limited' },
  },
  {
    name: 'GitHub Copilot', url: 'https://github.com/features/copilot', category: 'dev',
    desc: {
      he: 'השלמת קוד אוטומטית, תיעוד ובדיקות בתוך סביבות הפיתוח המוכרות.',
      en: 'Code completion, documentation and tests inside popular code editors.',
    },
    free: 'unknown',
  },
  {
    name: 'Qodo', url: 'https://www.qodo.ai', category: 'dev', origin: 'il',
    desc: {
      he: 'ישראלי. כותב בדיקות לקוד, סוקר שינויים ומאתר באגים.',
      en: 'Israeli. Writes tests, reviews code changes and finds bugs.',
    },
    free: 'unknown',
  },
  {
    name: 'Tabnine', url: 'https://www.tabnine.com', category: 'dev', origin: 'il',
    desc: {
      he: 'ישראלי. השלמת קוד מאובטחת לארגונים עם דרישות פרטיות.',
      en: 'Israeli. Secure code completion for organizations with privacy requirements.',
    },
    free: 'unknown',
  },
];

export interface Toolkit {
  price: string;
  title: Bi;
  who: Bi;
  items: Bi[];
}

export const TOOLKITS: Toolkit[] = [
  {
    price: '$0',
    title: { he: 'ארגז כלים חינמי', en: 'Free toolkit' },
    who: { he: 'מספיק לרוב הצרכים, בלי לשלם', en: 'Covers most needs, at no cost' },
    items: [
      { he: 'כתיבה ושיחה: Claude ו-ChatGPT בגרסה החינמית', en: 'Chat and writing: free Claude and ChatGPT' },
      { he: 'מסמכים ומחקר: NotebookLM', en: 'Documents and research: NotebookLM' },
      { he: 'חיפוש: Perplexity בגרסה הבסיסית', en: 'Search: Perplexity basic' },
      { he: 'תמונות: FLUX או Canva', en: 'Images: FLUX or Canva' },
      { he: 'מצגות: Gamma בקרדיטים החינמיים', en: 'Presentations: Gamma free credits' },
      { he: 'אתרים ואפליקציות: v0', en: 'Sites and apps: v0' },
    ],
  },
  {
    price: '$20',
    title: { he: 'מנוי אחד בתשלום', en: 'One paid plan' },
    who: { he: 'לפרילנסרים ועובדי ידע שרוצים יותר', en: 'For freelancers and knowledge workers who want more' },
    items: [
      { he: 'Claude Pro או ChatGPT Plus, כ-$20 בחודש', en: 'Claude Pro or ChatGPT Plus, about $20 a month' },
      { he: 'Claude: כתיבה עמוקה, קוד, פרויקטים ועברית', en: 'Claude: deep writing, code, projects and Hebrew' },
      { he: 'ChatGPT: ניתוח נתונים והפעלת מחשב', en: 'ChatGPT: data analysis and computer use' },
      { he: 'ולצדם בחינם: NotebookLM, Gamma ו-FLUX', en: 'Plus free: NotebookLM, Gamma and FLUX' },
    ],
  },
  {
    price: '$60-$100',
    title: { he: 'סביבה מקצועית מלאה', en: 'Full professional setup' },
    who: { he: 'למפתחים, יוצרי תוכן ומנהלי מוצר', en: 'For developers, creators and product managers' },
    items: [
      { he: 'Claude Pro או Team, כ-$20-$30', en: 'Claude Pro or Team, about $20-$30' },
      { he: 'Cursor Pro לפיתוח, כ-$20', en: 'Cursor Pro for coding, about $20' },
      { he: 'Midjourney, כ-$30, או קרדיטים ב-Runway', en: 'Midjourney, about $30, or Runway credits' },
      { he: 'ElevenLabs לקריינות, כ-$5', en: 'ElevenLabs for voice, about $5' },
      { he: 'מפתח API לאוטומציות, כ-$10-$15 לפי שימוש', en: 'An API key for automations, about $10-$15 pay as you go' },
    ],
  },
];
