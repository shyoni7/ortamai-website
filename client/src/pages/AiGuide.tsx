import { useMemo, useState, type ReactNode } from 'react';
import { Link } from 'wouter';
import { ArrowUpRight, CheckCircle, CircleSlash, HelpCircle, Plug, Wallet, GraduationCap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import SEO from '@/components/SEO';
import { CATEGORIES, TOOLS, TOOLKITS, type AiTool, type CategoryId, type FreeStatus } from '@/data/aiTools';
import '@/styles/ai-guide.css';

type Filter = 'all' | CategoryId;

export default function AiGuide() {
  const { lang, dir } = useLanguage();
  const he = lang === 'he';
  const [category, setCategory] = useState<Filter>('all');
  const [freeOnly, setFreeOnly] = useState(false);

  const catLabel = (id: CategoryId) => CATEGORIES.find(c => c.id === id)!.label[lang];

  const visible = useMemo(
    () => TOOLS.filter(t => (category === 'all' || t.category === category) && (!freeOnly || t.free === 'yes')),
    [category, freeOnly],
  );
  const freeCount = TOOLS.filter(t => t.free === 'yes').length;

  return (
    <>
      <SEO
        title={he ? 'מדריך AI למתחילים: כלי AI לפי תחום ומי חינמי' : 'AI Guide for Beginners: AI Tools by Category'}
        description={he
          ? 'מדריך AI למתחילים: טבלה מסודרת של כלי AI לכתיבה, מחקר, תמונות, וידאו, מצגות, קול ובניית אפליקציות, עם הסבר, קישור להרשמה ומי מציע מסלול חינמי.'
          : 'AI guide for beginners: a clear table of AI tools for writing, research, images, video, slides, voice and app building, with explanations, sign-up links and free plans.'}
        canonical="/ai-guide"
      />
      <div dir={dir}>
        {/* Hero */}
        <section aria-labelledby="guide-title" style={{ background: 'var(--h-dark)' }}>
          <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 md:py-24 text-start">
            <h1
              id="guide-title"
              className="h-rise text-white font-extrabold leading-[1.05] max-w-4xl"
              style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)' }}
            >
              {he ? 'מדריך AI למתחילים' : 'AI Guide for Beginners'}
            </h1>
            <p className="h-rise h-rise-2 mt-5 md:mt-7 text-lg md:text-xl leading-relaxed max-w-[60ch]" style={{ color: 'var(--h-on-dark)' }}>
              {he
                ? 'אילו כלי AI קיימים, מה כל אחד עושה, ואיפה אפשר להתחיל בחינם. בוחרים תחום, נכנסים לכלי ונרשמים.'
                : 'Which AI tools exist, what each one does, and where you can start for free. Pick a category, open a tool and sign up.'}
            </p>
            <ul className="h-rise h-rise-3 mt-8 md:mt-10 flex flex-col sm:flex-row sm:flex-wrap gap-x-7 gap-y-3">
              {[
                he ? `${TOOLS.length} כלים ב-${CATEGORIES.length} תחומים` : `${TOOLS.length} tools in ${CATEGORIES.length} categories`,
                he ? `${freeCount} עם מסלול חינמי` : `${freeCount} with a free plan`,
                he ? 'קישור הרשמה לכל כלי' : 'A sign-up link for every tool',
              ].map(chip => (
                <li key={chip} className="flex items-center gap-2.5 text-base font-medium" style={{ color: 'var(--h-on-dark)' }}>
                  <CheckCircle className="w-5 h-5 shrink-0" style={{ color: 'var(--h-accent)' }} aria-hidden="true" />
                  <span>{chip}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Tools table */}
        <section aria-labelledby="tools-title" className="py-14 md:py-20" style={{ background: 'var(--h-ground)' }}>
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-8 text-start">
              <h2 id="tools-title" className="text-3xl md:text-5xl font-bold" style={{ color: 'var(--h-ink)' }}>
                {he ? 'טבלת הכלים' : 'The tools'}
              </h2>
              <p className="mt-4 text-base md:text-lg leading-relaxed max-w-[65ch]" style={{ color: 'var(--h-ink-2)' }}>
                {he
                  ? 'סננו לפי תחום, או הציגו רק כלים שאפשר להתחיל בהם בחינם. הקישור בכל שורה מוביל לאתר הרשמי של הכלי.'
                  : 'Filter by category, or show only tools you can start with for free. Each link goes to the tool\'s official site.'}
              </p>
            </div>

            <div className="aig-filters" role="group" aria-label={he ? 'סינון לפי תחום' : 'Filter by category'}>
              <FilterChip active={category === 'all'} onClick={() => setCategory('all')}>
                {he ? 'הכל' : 'All'}
              </FilterChip>
              {CATEGORIES.map(c => (
                <FilterChip key={c.id} active={category === c.id} onClick={() => setCategory(c.id)}>
                  {c.label[lang]}
                </FilterChip>
              ))}
            </div>
            <label className="aig-toggle mt-4">
              <input type="checkbox" checked={freeOnly} onChange={e => setFreeOnly(e.target.checked)} />
              <span>{he ? 'רק כלים עם מסלול חינמי' : 'Only tools with a free plan'}</span>
            </label>

            <p className="mt-5 text-sm" style={{ color: 'var(--h-ink-2)' }} aria-live="polite">
              {he ? `מוצגים ${visible.length} כלים` : `Showing ${visible.length} tools`}
            </p>

            {/* Desktop table */}
            <div className="aig-table-wrap mt-3 hidden md:block">
              <table className="aig-table">
                <thead>
                  <tr>
                    <th scope="col">{he ? 'כלי' : 'Tool'}</th>
                    <th scope="col">{he ? 'תחום' : 'Category'}</th>
                    <th scope="col">{he ? 'מה הוא עושה' : 'What it does'}</th>
                    <th scope="col" className="aig-col-free">{he ? 'מסלול חינמי' : 'Free plan'}</th>
                    <th scope="col">{he ? 'הרשמה' : 'Sign up'}</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map(tool => (
                    <tr key={tool.name}>
                      <th scope="row" className="aig-name">
                        <span>{tool.name}</span>
                        <OriginTag tool={tool} he={he} />
                      </th>
                      <td className="aig-cat">{catLabel(tool.category)}</td>
                      <td className="aig-desc">{tool.desc[lang]}</td>
                      <td className="aig-col-free"><FreeBadge tool={tool} he={he} /></td>
                      <td><SignupLink tool={tool} he={he} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <ul className="mt-3 grid gap-4 md:hidden">
              {visible.map(tool => (
                <li key={tool.name} className="aig-card">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold" style={{ color: 'var(--h-ink)' }}>
                        {tool.name} <OriginTag tool={tool} he={he} />
                      </h3>
                      <p className="text-sm mt-0.5" style={{ color: 'var(--h-ink-2)' }}>{catLabel(tool.category)}</p>
                    </div>
                    <SignupLink tool={tool} he={he} />
                  </div>
                  <p className="mt-3 text-[0.95rem] leading-relaxed" style={{ color: 'var(--h-ink)' }}>{tool.desc[lang]}</p>
                  <div className="mt-4"><FreeBadge tool={tool} he={he} /></div>
                </li>
              ))}
            </ul>

            {visible.length === 0 && (
              <p className="mt-6 text-base" style={{ color: 'var(--h-ink-2)' }}>
                {he ? 'אין כלים שמתאימים לסינון הזה.' : 'No tools match this filter.'}
              </p>
            )}

            <p className="mt-6 text-sm leading-relaxed max-w-[75ch]" style={{ color: 'var(--h-ink-2)' }}>
              {he
                ? 'מחירים, מכסות ומסלולים חינמיים משתנים לעיתים קרובות. כדאי לבדוק באתר הכלי לפני הרשמה. "לא צוין" אומר שאין לנו מידע מאומת על מסלול חינמי.'
                : 'Prices, quotas and free plans change often. Check the tool\'s site before signing up. "Not stated" means we have no verified information about a free plan.'}
            </p>
          </div>
        </section>

        {/* Toolkits by budget */}
        <section aria-labelledby="kits-title" className="py-14 md:py-20" style={{ background: 'var(--h-paper)' }}>
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-10 text-start">
              <h2 id="kits-title" className="text-3xl md:text-5xl font-bold" style={{ color: 'var(--h-ink)' }}>
                {he ? 'מאיפה להתחיל: ארגז כלים לפי תקציב' : 'Where to start: a toolkit for every budget'}
              </h2>
              <p className="mt-4 text-base md:text-lg leading-relaxed max-w-[65ch]" style={{ color: 'var(--h-ink-2)' }}>
                {he ? 'שלוש חבילות מוכנות. אפשר להתחיל בחינם ולהוסיף מנוי כשצריך.' : 'Three ready-made bundles. Start free and add a plan when you need one.'}
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {TOOLKITS.map((kit, i) => (
                <article key={kit.price} className={`aig-kit ${i === 0 ? 'is-free' : ''}`}>
                  <div className="flex items-center gap-3">
                    <span className="aig-kit-icon"><Wallet className="w-5 h-5" aria-hidden="true" /></span>
                    <span className="aig-kit-price" dir="ltr">{kit.price}</span>
                    <span className="text-sm" style={{ color: 'var(--h-ink-2)' }}>{he ? 'בחודש' : 'a month'}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold" style={{ color: 'var(--h-ink)' }}>{kit.title[lang]}</h3>
                  <p className="mt-1 text-[0.95rem]" style={{ color: 'var(--h-ink-2)' }}>{kit.who[lang]}</p>
                  <ul className="mt-5 space-y-2.5">
                    {kit.items.map(item => (
                      <li key={item.en} className="flex items-start gap-2.5 text-[0.95rem] leading-relaxed" style={{ color: 'var(--h-ink)' }}>
                        <CheckCircle className="w-[18px] h-[18px] mt-[3px] shrink-0" style={{ color: 'var(--h-accent-ink)' }} aria-hidden="true" />
                        <span>{item[lang]}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Go deeper */}
        <section aria-labelledby="deeper-title" className="py-14 md:py-20" style={{ background: 'var(--h-ground)' }}>
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="aig-deeper">
              <span className="aig-kit-icon"><Plug className="w-5 h-5" aria-hidden="true" /></span>
              <div className="text-start">
                <h2 id="deeper-title" className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--h-ink)' }}>
                  {he ? 'רוצים להעמיק? חיבור כלי AI למערכות שלכם' : 'Want to go deeper? Connect AI to your own systems'}
                </h2>
                <p className="mt-3 text-base md:text-lg leading-relaxed max-w-[65ch]" style={{ color: 'var(--h-ink-2)' }}>
                  {he
                    ? 'מעבר לצ׳אט, אפשר לחבר מודלי AI לקבצים, למסדי נתונים ולכלים שאתם כבר עובדים איתם. עושים את זה דרך API, דרך פרוטוקול MCP, או דרך פלטפורמות אוטומציה כמו Make ו-n8n.'
                    : 'Beyond chat, you can connect AI models to files, databases and the tools you already use, through APIs, the MCP protocol, or automation platforms like Make and n8n.'}
                </p>
                <Link href="/ai-guide/advanced" className="h-btn h-btn-dark mt-6">
                  {he ? 'למדריך המתקדם' : 'To the advanced guide'}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Course CTA */}
        <section aria-labelledby="learn-title" className="py-14 md:py-20" style={{ background: 'var(--h-dark)' }}>
          <div className="mx-auto max-w-7xl px-5 sm:px-8 text-start">
            <GraduationCap className="w-9 h-9" style={{ color: 'var(--h-accent)' }} aria-hidden="true" />
            <h2 id="learn-title" className="mt-4 text-3xl md:text-4xl font-bold text-white">
              {he ? 'רוצים ללמוד לעבוד עם הכלים האלה?' : 'Want to learn to work with these tools?'}
            </h2>
            <p className="mt-3 text-base md:text-lg leading-relaxed max-w-[60ch]" style={{ color: 'var(--h-on-dark)' }}>
              {he ? 'בקורסים שלנו עובדים עם הכלים בכיתה, צעד אחר צעד.' : 'In our courses you work with the tools in class, step by step.'}
            </p>
            <Link href="/courses" className="h-btn h-btn-accent mt-7">
              {he ? 'לקורסים שלנו' : 'See our courses'}
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" className="aig-chip" aria-pressed={active} onClick={onClick}>
      {children}
    </button>
  );
}

const FREE_META: Record<FreeStatus, { he: string; en: string; Icon: typeof CheckCircle }> = {
  yes: { he: 'יש', en: 'Yes', Icon: CheckCircle },
  no: { he: 'אין', en: 'No', Icon: CircleSlash },
  unknown: { he: 'לא צוין', en: 'Not stated', Icon: HelpCircle },
};

function FreeBadge({ tool, he }: { tool: AiTool; he: boolean }) {
  const meta = FREE_META[tool.free];
  return (
    <div className="aig-free">
      <span className={`aig-badge is-${tool.free}`}>
        <meta.Icon className="w-4 h-4" aria-hidden="true" />
        {he ? meta.he : meta.en}
      </span>
      {tool.freeNote && <span className="aig-free-note">{he ? tool.freeNote.he : tool.freeNote.en}</span>}
    </div>
  );
}

function OriginTag({ tool, he }: { tool: AiTool; he: boolean }) {
  if (!tool.origin) return null;
  const label = tool.origin === 'il' ? (he ? 'ישראלי' : 'Israeli') : (he ? 'סיני' : 'Chinese');
  return <span className={`aig-origin is-${tool.origin}`}>{label}</span>;
}

function SignupLink({ tool, he }: { tool: AiTool; he: boolean }) {
  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="aig-link"
      aria-label={he ? `הרשמה ל-${tool.name} (נפתח בחלון חדש)` : `Sign up for ${tool.name} (opens in a new tab)`}
    >
      <span>{he ? 'לאתר' : 'Visit'}</span>
      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
    </a>
  );
}
