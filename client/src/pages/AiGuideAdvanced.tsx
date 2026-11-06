import { Link } from 'wouter';
import { ArrowUpRight, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import SEO from '@/components/SEO';
import type { Bi } from '@/data/aiTools';
import '@/styles/ai-guide.css';

interface LinkItem { name: string; url: string; desc: Bi }

const MCP_PARTS: { name: string; desc: Bi }[] = [
  {
    name: 'MCP Host',
    desc: { he: 'התוכנה שבה עובד המודל, למשל Claude Desktop או סביבת פיתוח.', en: 'The app the model runs in, for example Claude Desktop or a code editor.' },
  },
  {
    name: 'MCP Client',
    desc: { he: 'הרכיב שמחבר בין המודל לשרת.', en: 'The piece that connects the model to a server.' },
  },
  {
    name: 'MCP Server',
    desc: {
      he: 'שרת קטן שחושף יכולת או מידע: קבצים במחשב, GitHub, מסד נתונים כמו PostgreSQL או Jira.',
      en: 'A small server that exposes a capability or data: local files, GitHub, a database like PostgreSQL, or Jira.',
    },
  },
];

const APIS: LinkItem[] = [
  {
    name: 'Anthropic API (Claude)', url: 'https://www.anthropic.com/api',
    desc: {
      he: 'גישה למודלי Claude מתוך הקוד שלכם, עם הקשר ארוך מאוד, תמיכה מובנית ב-MCP וסוכנים שמפעילים מחשב.',
      en: 'Access Claude models from your code, with very long context, built-in MCP support and computer-use agents.',
    },
  },
  {
    name: 'OpenAI API (ChatGPT)', url: 'https://platform.openai.com',
    desc: {
      he: 'גישה למודלי OpenAI, כולל מודלי חשיבה, הפעלת כלים (Tool Calling) ומולטי-מודאל בזמן אמת.',
      en: 'Access OpenAI models, including reasoning models, tool calling and real-time multimodal.',
    },
  },
  {
    name: 'Google Gemini API', url: 'https://aistudio.google.com',
    desc: {
      he: 'דרך Google AI Studio. חלון הקשר ענק, טקסט, אודיו ווידאו, ותמחור תחרותי.',
      en: 'Through Google AI Studio. A huge context window, text, audio and video, and competitive pricing.',
    },
  },
];

const PLATFORMS: LinkItem[] = [
  {
    name: 'Make', url: 'https://www.make.com',
    desc: {
      he: 'אוטומציה בלי קוד. למשל: מייל חדש נשלח לניתוח ב-AI, והתוצאה נשמרת בטבלה או נשלחת ל-Slack.',
      en: 'No-code automation. For example: a new email goes to AI for analysis and the result is saved or sent to Slack.',
    },
  },
  {
    name: 'Zapier', url: 'https://zapier.com',
    desc: { he: 'אוטומציה בלי קוד, עם חיבורים לאלפי אפליקציות.', en: 'No-code automation with connections to thousands of apps.' },
  },
  {
    name: 'n8n', url: 'https://n8n.io',
    desc: {
      he: 'אוטומציה בקוד פתוח שאפשר להתקין על שרת משלכם, עם תמיכה בסוכני AI ושליטה מלאה בפרטיות.',
      en: 'Open-source automation you can self-host, with AI agent support and full privacy control.',
    },
  },
  {
    name: 'LangChain', url: 'https://www.langchain.com',
    desc: {
      he: 'ספריית קוד למפתחים לבניית סוכנים ויישומי RAG (חיפוש במידע שלכם ותשובה על בסיסו).',
      en: 'A developer library for building agents and RAG apps (search your data and answer from it).',
    },
  },
  {
    name: 'LlamaIndex', url: 'https://www.llamaindex.ai',
    desc: {
      he: 'ספריית קוד לחיבור מודלים למסמכים ולמאגרי מידע של הארגון.',
      en: 'A developer library for connecting models to your organization\'s documents and data.',
    },
  },
  {
    name: 'OpenRouter', url: 'https://openrouter.ai',
    desc: {
      he: 'מפתח API אחד לגישה למאות מודלים מספקים שונים, עם גיבוי אוטומטי כששרת נופל.',
      en: 'One API key for hundreds of models from different providers, with automatic fallback when one is down.',
    },
  },
];

export default function AiGuideAdvanced() {
  const { lang, dir } = useLanguage();
  const he = lang === 'he';
  const Back = he ? ArrowRight : ArrowLeft;

  return (
    <>
      <SEO
        title={he ? 'מדריך AI מתקדם: MCP, API ואוטומציות' : 'Advanced AI Guide: MCP, APIs and Automation'}
        description={he
          ? 'הסבר פשוט על חיבור כלי AI למערכות: מה זה MCP, איך עובדים עם API של Claude, OpenAI ו-Google, ופלטפורמות אוטומציה כמו Make, Zapier ו-n8n.'
          : 'A plain explanation of connecting AI to your systems: what MCP is, working with the Claude, OpenAI and Google APIs, and automation platforms like Make, Zapier and n8n.'}
        canonical="/ai-guide/advanced"
      />
      <div dir={dir}>
        <section aria-labelledby="adv-title" style={{ background: 'var(--h-dark)' }}>
          <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 md:py-20 text-start">
            <Link href="/ai-guide" className="inline-flex items-center gap-2 text-base font-medium" style={{ color: 'var(--h-on-dark)' }}>
              <Back className="w-4 h-4" aria-hidden="true" />
              {he ? 'חזרה למדריך למתחילים' : 'Back to the beginner guide'}
            </Link>
            <h1
              id="adv-title"
              className="h-rise mt-6 text-white font-extrabold leading-[1.08] max-w-4xl"
              style={{ fontSize: 'clamp(2.1rem, 5vw, 3.75rem)' }}
            >
              {he ? 'חיבור כלי AI למערכות שלכם' : 'Connecting AI to your systems'}
            </h1>
            <p className="h-rise h-rise-2 mt-5 text-lg md:text-xl leading-relaxed max-w-[62ch]" style={{ color: 'var(--h-on-dark)' }}>
              {he
                ? 'כדי להוציא יותר מכלי AI, כדאי להכיר שלוש דרכי חיבור: פרוטוקול MCP, ממשקי API ופלטפורמות אוטומציה.'
                : 'To get more out of AI tools, it helps to know three ways to connect them: the MCP protocol, APIs and automation platforms.'}
            </p>
          </div>
        </section>

        {/* MCP */}
        <section aria-labelledby="mcp-title" className="py-14 md:py-20" style={{ background: 'var(--h-ground)' }}>
          <div className="mx-auto max-w-7xl px-5 sm:px-8 text-start">
            <h2 id="mcp-title" className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--h-ink)' }}>
              {he ? '1. מה זה MCP?' : '1. What is MCP?'}
            </h2>
            <p className="mt-4 text-base md:text-lg leading-relaxed max-w-[70ch]" style={{ color: 'var(--h-ink-2)' }}>
              {he
                ? 'MCP (Model Context Protocol) הוא תקן פתוח ש-Anthropic פרסמה בנובמבר 2024. הוא נותן דרך אחידה ובטוחה לחבר מודל AI למקורות מידע וכלים. אפשר לחשוב עליו כמו על חיבור USB לבינה מלאכותית: במקום לבנות חיבור נפרד לכל כלי, מחברים פעם אחת לפי התקן.'
                : 'MCP (Model Context Protocol) is an open standard Anthropic published in November 2024. It gives a uniform, secure way to connect an AI model to data sources and tools. Think of it as USB for AI: instead of a custom integration per tool, you connect once using the standard.'}
            </p>
            <ol className="mt-8 grid gap-4 md:grid-cols-3">
              {MCP_PARTS.map((p, i) => (
                <li key={p.name} className="aig-block">
                  <span className="aig-step-num">{i + 1}</span>
                  <h3 className="mt-3 text-lg font-bold" dir="ltr" style={{ color: 'var(--h-ink)', textAlign: he ? 'right' : 'left' }}>{p.name}</h3>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed" style={{ color: 'var(--h-ink-2)' }}>{p.desc[lang]}</p>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-base md:text-lg leading-relaxed max-w-[70ch]" style={{ color: 'var(--h-ink)' }}>
              {he
                ? 'בפועל: מגדירים שרתי MCP ב-Claude Desktop, ו-Claude יכול לקרוא קבצים מהמחשב, לשאול את מסד הנתונים של הארגון או לנהל משימות ב-Jira ישירות מהצ׳אט, תחת הרשאות שאתם קובעים.'
                : 'In practice: set up MCP servers in Claude Desktop, and Claude can read files on your computer, query your company database or manage Jira tasks right from the chat, under permissions you control.'}
            </p>
            <a href="https://modelcontextprotocol.io" target="_blank" rel="noopener noreferrer" className="aig-link mt-5">
              <span>{he ? 'האתר הרשמי של MCP' : 'Official MCP site'}</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </section>

        <LinkSection
          id="api-title"
          bg="var(--h-paper)"
          title={he ? '2. חיבור ישיר דרך API' : '2. Direct connection through an API'}
          intro={he
            ? 'API מאפשר לשלב AI בתוך המוצרים והמערכות שלכם, בלי לעבור דרך ממשק הצ׳אט. מתאים למפתחים, ומשלמים לפי שימוש.'
            : 'An API lets you build AI into your own products and systems, without going through the chat interface. Meant for developers, and you pay per use.'}
          items={APIS}
          he={he}
        />

        <LinkSection
          id="platforms-title"
          bg="var(--h-ground)"
          title={he ? '3. פלטפורמות אוטומציה וחיבור' : '3. Automation and integration platforms'}
          intro={he
            ? 'כלים שמחברים בין AI לשירותים אחרים. חלקם בלי קוד בכלל, וחלקם ספריות למפתחים.'
            : 'Tools that connect AI to other services. Some need no code at all, others are developer libraries.'}
          items={PLATFORMS}
          he={he}
        />

        <section className="py-12 md:py-16" style={{ background: 'var(--h-dark)' }}>
          <div className="mx-auto max-w-7xl px-5 sm:px-8 flex flex-col sm:flex-row gap-4 text-start">
            <Link href="/ai-guide" className="h-btn h-btn-light">{he ? 'חזרה לטבלת הכלים' : 'Back to the tools table'}</Link>
            <Link href="/courses" className="h-btn h-btn-accent">{he ? 'לקורסים שלנו' : 'See our courses'}</Link>
          </div>
        </section>
      </div>
    </>
  );
}

function LinkSection({ id, bg, title, intro, items, he }: {
  id: string; bg: string; title: string; intro: string; items: LinkItem[]; he: boolean;
}) {
  return (
    <section aria-labelledby={id} className="py-14 md:py-20" style={{ background: bg }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 text-start">
        <h2 id={id} className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--h-ink)' }}>{title}</h2>
        <p className="mt-4 text-base md:text-lg leading-relaxed max-w-[70ch]" style={{ color: 'var(--h-ink-2)' }}>{intro}</p>
        <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map(item => (
            <li key={item.name} className="aig-block flex flex-col">
              <h3 className="text-lg font-bold" style={{ color: 'var(--h-ink)' }}>{item.name}</h3>
              <p className="mt-1.5 mb-4 text-[0.95rem] leading-relaxed" style={{ color: 'var(--h-ink-2)' }}>{item.desc[he ? 'he' : 'en']}</p>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="aig-link mt-auto self-start"
                aria-label={he ? `${item.name}, נפתח בחלון חדש` : `${item.name}, opens in a new tab`}
              >
                <span>{he ? 'לאתר' : 'Visit'}</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
