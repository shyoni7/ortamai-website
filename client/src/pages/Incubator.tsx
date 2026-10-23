import React, { useState } from 'react';
import { Link } from 'wouter';
import {
  Target, Lightbulb, Users,
  Code2, Zap, CheckCircle2, Rocket,
  ArrowLeft, ArrowRight, Send, CheckCheck, AlertCircle, CalendarCheck,
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { trpc } from '@/lib/trpc';
import SEO from '@/components/SEO';
import { consultingServiceSchema } from '@/lib/seoSchemas';
import '@/styles/consulting.css';

// ─── Content ─────────────────────────────────────────────────────────────────
const CONTENT = {
  he: {
    hero_title: 'ייעוץ אסטרטגיית AI לעסקים',
    hero_title_2: 'עם ORTAM AI',
    hero_desc:
      'עסק שלא יעבוד עם AI ישאר תקוע מאחור. בנינו את תהליך הייעוץ שלנו כדי לוודא שאתם מתקדמים עם התקופה ולא נתקעים מאחור.',
    hero_cta: 'ספרו לנו על העסק שלכם',

    what_title: 'מה תקבלו בייעוץ אסטרטגיית AI של ORTAM AI?',
    what_sub: 'תהליך מלא ומובנה להצלחה שלכם',

    benefits: [
      {
        icon: Target,
        title: 'איפיון צרכי העסק וייעוץ ממומחה AI',
        desc: 'ניתוח מעמיק של העסק שלך והזדמנויות יישום AI',
        items: ['פגישת Discovery מקיפה', 'מיפוי תהליכים קיימים', 'זיהוי נקודות כאב וצוואר בקבוק'],
      },
      {
        icon: Lightbulb,
        title: 'הכשרות מקצועיות מותאמות לצרכי העסק שלך',
        desc: 'תוכניות הדרכה ייעודיות לצוות שלך',
        items: ['הכשרת מנהלים והנהלה', 'הדרכת צוות טכני', 'ליווי אישי לכל משתתף'],
      },
      {
        icon: Users,
        title: 'הדרכה וליווי צמוד עד להטמעה מלאה',
        desc: 'ליווי צמוד בכל שלב עד שתהליכי העבודה משולבים לחלוטין',
        items: ['ליווי שוטף של צוות מומחים', 'ליווי ותמיכה לאורך כל תקופת ההטמעה', 'מעקב אחרי KPIs והצלחה'],
      },
    ],

    build_title: 'מה אנחנו בונים?',
    build_sub: 'פתרונות AI מותאמים לכל צורך עסקי',
    build_items: [
      { icon: Code2, title: 'סוכני AI מתקדמים', desc: 'פיתוח סוכנים חכמים לאוטומציה של תהליכים עסקיים' },
      { icon: Zap, title: 'אינטגרציות חכמות', desc: 'חיבור מערכות קיימות עם יכולות AI באמצעות n8n ו-Make' },
      { icon: Rocket, title: 'POC ופיילוטים', desc: 'יישום מהיר של הוכחות היתכנות לבדיקת ערך' },
    ],

    process_title: 'תהליך העבודה שלנו',
    process_sub: 'מרעיון לייישום בארבעה שלבים פשוטים',
    steps: [
      { num: '1', label: 'Discovery', desc: 'הבנת הצרכים וההזדמנויות' },
      { num: '2', label: 'MVP/POC', desc: 'פיתוח גרסת הוכחה ראשונית' },
      { num: '3', label: 'Pilot', desc: 'בדיקה בסביבה אמיתית' },
      { num: '4', label: 'Scale', desc: 'הרחבה לכלל הארגון' },
    ],

    models_title: 'מודלים עסקיים גמישים',
    models_sub: 'מצאו את המודל המתאים ביותר לצרכים שלכם',
    models: [
      { title: 'ריטיינר חודשי', desc: 'ליווי שוטף וגישה קבועה לצוות המומחים — מתקדמים יחד, חודש אחרי חודש' },
      { title: 'פרויקט ממוקד', desc: 'היקף ותוצר מוגדרים מראש — מהאיפיון ועד המסירה, במחיר סגור' },
      { title: 'הדרכות וליווי לפי שעות', desc: 'גמישות מלאה לצרכים נקודתיים — הדרכה, ייעוץ או ליווי בדיוק כשצריך' },
    ],

    close_title: 'מוכנים לקחת את ה\u2011AI שלכם לשלב הבא?',
    close_sub: 'קבעו פגישת ייעוץ עם מומחי ה-AI של ORTAM.',
    close_btn: 'קבעו פגישת ייעוץ',
  },
  en: {
    hero_title: 'AI Strategy Consulting for Businesses',
    hero_title_2: 'with ORTAM AI',
    hero_desc:
      "A business that doesn't work with AI will fall behind. We built our consulting process to ensure you advance with the times and don't get left behind.",
    hero_cta: 'Tell Us About Your Business',

    what_title: 'What Will You Get from ORTAM AI Strategy Consulting?',
    what_sub: 'A complete, structured path to your success',

    benefits: [
      {
        icon: Target,
        title: 'Business Needs Analysis & Expert AI Consulting',
        desc: 'Deep analysis of your business and AI implementation opportunities',
        items: ['Comprehensive Discovery Meeting', 'Mapping Existing Processes', 'Identifying Pain Points & Bottlenecks'],
      },
      {
        icon: Lightbulb,
        title: 'Professional Training Tailored to Your Business',
        desc: 'Dedicated training programs for your team',
        items: ['Management & Leadership Training', 'Technical Team Guidance', 'Personal Mentoring for Each Participant'],
      },
      {
        icon: Users,
        title: 'Guidance & Close Support Until Full Adoption',
        desc: 'Close support at every stage until workflows are fully integrated',
        items: ['Ongoing Expert Team Support', 'Guidance and support throughout the implementation period', 'KPI & Success Tracking'],
      },
    ],

    build_title: 'What Do We Build?',
    build_sub: 'AI solutions tailored to every business need',
    build_items: [
      { icon: Code2, title: 'Advanced AI Agents', desc: 'Developing smart agents to automate business processes' },
      { icon: Zap, title: 'Smart Integrations', desc: 'Connecting existing systems with AI capabilities via n8n and Make' },
      { icon: Rocket, title: 'POC & Pilots', desc: 'Rapid implementation of proof-of-concept to test value' },
    ],

    process_title: 'Our Work Process',
    process_sub: 'From idea to implementation in four simple steps',
    steps: [
      { num: '1', label: 'Discovery', desc: 'Understanding needs and opportunities' },
      { num: '2', label: 'MVP/POC', desc: 'Developing initial proof of concept' },
      { num: '3', label: 'Pilot', desc: 'Testing in a real environment' },
      { num: '4', label: 'Scale', desc: 'Expanding to the entire organization' },
    ],

    models_title: 'Flexible Business Models',
    models_sub: 'Find the model that best suits your needs',
    models: [
      { title: 'Monthly Retainer', desc: 'Ongoing guidance and steady access to our expert team, month after month' },
      { title: 'Scoped Project', desc: 'A pre-defined scope and deliverable — from discovery to handoff, at a fixed price' },
      { title: 'Training & Hourly Support', desc: 'Full flexibility for focused needs — training, consulting or guidance exactly when needed' },
    ],

    close_title: 'Ready to take your AI to the next level?',
    close_sub: 'Schedule a consultation with ORTAM AI experts.',
    close_btn: 'Schedule a Consultation',
  },
};

function SectionHeader({ id, title, sub }: { id: string; title: string; sub: string }) {
  return (
    <div className="mb-10 md:mb-14 text-start">
      <h2 id={id} className="text-3xl md:text-5xl font-bold max-w-4xl" style={{ color: 'var(--h-ink)' }}>{title}</h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed max-w-[65ch]" style={{ color: 'var(--h-ink-2)' }}>{sub}</p>
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function Incubator() {
  const { lang, dir } = useLanguage();
  const isRtl = lang === 'he';
  const c = isRtl ? CONTENT.he : CONTENT.en;
  const Arrow = isRtl ? ArrowLeft : ArrowRight;

  return (
    <>
    <SEO
      title={isRtl ? 'ייעוץ אסטרטגיית AI לעסקים' : 'AI Strategy Consulting for Businesses'}
      description={isRtl
        ? 'ייעוץ אסטרטגיית AI לעסקים: אבחון עסקי ומיפוי תהליכים, הכשרת צוותים, פיילוטים מהירים, סוכני AI ואינטגרציות, וליווי מקצועי עד יישום.'
        : 'AI strategy consulting for businesses: business diagnosis and process mapping, team training, rapid pilots, AI agents and integrations, and hands-on implementation guidance.'}
      canonical="/consulting"
      schema={consultingServiceSchema}
    />
    <div dir={dir} className="cns-page">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section aria-labelledby="cns-title" style={{ background: 'var(--h-dark)' }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 md:py-24 text-start">
          <h1
            id="cns-title"
            className="h-rise text-white font-extrabold leading-[1.05] max-w-4xl"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)' }}
          >
            {c.hero_title}
            <span className="block mt-2" style={{ color: '#B9AAFF' }}>{c.hero_title_2}</span>
          </h1>
          <p className="h-rise h-rise-2 mt-5 md:mt-7 text-lg md:text-xl leading-relaxed max-w-[60ch]" style={{ color: 'var(--h-on-dark)' }}>
            {c.hero_desc}
          </p>
          <div className="h-rise h-rise-3 mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link href="/contact" className="h-btn cns-btn-violet">
              <span>{c.hero_cta}</span>
              <Arrow size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── What You Get ─────────────────────────────────────────────────── */}
      <section aria-labelledby="cns-what" className="py-16 md:py-24" style={{ background: 'var(--h-ground)' }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeader id="cns-what" title={c.what_title} sub={c.what_sub} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {c.benefits.map(b => {
              const Icon = b.icon;
              return (
                <article key={b.title} className="cns-card p-6 md:p-8 flex flex-col text-start">
                  <span className="cns-icon mb-5"><Icon className="w-6 h-6" aria-hidden="true" /></span>
                  <h3 className="text-xl md:text-2xl font-bold leading-snug" style={{ color: 'var(--h-ink)' }}>{b.title}</h3>
                  <p className="mt-2 text-base leading-relaxed" style={{ color: 'var(--h-ink-2)' }}>{b.desc}</p>
                  <ul className="mt-5 border-t" style={{ borderColor: 'var(--h-line)' }}>
                    {b.items.map(item => (
                      <li key={item} className="py-3 border-b flex items-start gap-3 text-base" style={{ borderColor: 'var(--h-line)', color: 'var(--h-ink)' }}>
                        <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" style={{ color: 'var(--c-violet)' }} aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── What We Build ────────────────────────────────────────────────── */}
      <section aria-labelledby="cns-build" className="py-16 md:py-24" style={{ background: 'var(--h-paper)' }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeader id="cns-build" title={c.build_title} sub={c.build_sub} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {c.build_items.map(item => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="cns-card p-6 md:p-8 text-start">
                  <span className="cns-icon mb-5"><Icon className="w-6 h-6" aria-hidden="true" /></span>
                  <h3 className="text-xl md:text-2xl font-bold" style={{ color: 'var(--h-ink)' }}>{item.title}</h3>
                  <p className="mt-3 text-base leading-relaxed" style={{ color: 'var(--h-ink-2)' }}>{item.desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Process Steps ────────────────────────────────────────────────── */}
      <section aria-labelledby="cns-process" className="py-16 md:py-24" style={{ background: 'var(--h-ground)' }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeader id="cns-process" title={c.process_title} sub={c.process_sub} />
          <ol className="grid gap-10 md:gap-8 sm:grid-cols-2 md:grid-cols-4">
            {c.steps.map((step, i) => (
              <li key={step.num} className="text-start border-t-2 pt-6"
                style={{ borderColor: i === 0 ? 'var(--c-violet)' : 'var(--h-line)' }}>
                <span className="cns-step-num" aria-hidden="true">{step.num}</span>
                <h3 className="mt-4 text-xl md:text-2xl font-bold" style={{ color: 'var(--h-ink)' }}>
                  <span className="sr-only">{isRtl ? `שלב ${step.num}: ` : `Step ${step.num}: `}</span>
                  {step.label}
                </h3>
                <p className="mt-2 text-base leading-relaxed" style={{ color: 'var(--h-ink-2)' }}>{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Flexible Business Models ─────────────────────────────────────── */}
      <section aria-labelledby="cns-models" className="py-16 md:py-24" style={{ background: 'var(--h-paper)' }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeader id="cns-models" title={c.models_title} sub={c.models_sub} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {c.models.map(model => (
              <article key={model.title} className="cns-card p-6 md:p-8 text-start">
                <h3 className="text-xl md:text-2xl font-bold" style={{ color: 'var(--h-ink)' }}>{model.title}</h3>
                <p className="mt-3 text-base leading-relaxed" style={{ color: 'var(--h-ink-2)' }}>{model.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Consultation Form ──────────────────────────────────────────────────── */}
      <ConsultationForm isRtl={isRtl} />

      {/* ── Closing CTA ── */}
      <section aria-labelledby="cns-close" style={{ background: 'var(--h-dark)' }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 md:py-24 text-start">
          <h2 id="cns-close" className="text-white font-extrabold leading-[1.08] max-w-3xl" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            {c.close_title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed max-w-[60ch]" style={{ color: 'var(--h-on-dark)' }}>{c.close_sub}</p>
          <div className="mt-8">
            <Link href="/contact" className="h-btn h-btn-light">
              <CalendarCheck size={19} aria-hidden="true" />
              <span>{c.close_btn}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}

// ─── Consultation Form Component ────────────────────────────────────────────────────
function ConsultationForm({ isRtl }: { isRtl: boolean }) {
  const [form, setForm] = useState({ businessName: '', firstName: '', email: '', phone: '', about: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [missing, setMissing] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);

  const mutation = trpc.incubator.submitConsultation.useMutation({
    onSuccess: () => setSubmitted(true),
    onError: () => setError(isRtl ? 'אירעה שגיאה. נסה שוב.' : 'An error occurred. Please try again.'),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMissing(false);
    if (!form.businessName || !form.firstName || !form.email || !form.phone) {
      setMissing(true);
      setError(isRtl ? 'אנא מלא את כל השדות הנדרשים.' : 'Please fill in all required fields.');
      return;
    }
    if (!privacyConsent) {
      setError(isRtl ? 'יש לאשר את מדיניות הפרטיות.' : 'Please accept the privacy policy.');
      return;
    }
    mutation.mutate({ ...form, lang: isRtl ? 'he' : 'en' });
  };

  const labels = {
    title: isRtl ? 'ספרו לנו קצת על החברה שלכם' : 'Tell us about your company',
    sub: isRtl ? 'נחזור אליכם בהקדם לתיאום שיחת האיפיון' : 'We\'ll get back to you soon',
    businessName: isRtl ? 'שם העסק' : 'Business Name',
    firstName: isRtl ? 'שם פרטי' : 'First Name',
    email: isRtl ? 'אימייל' : 'Email',
    phone: isRtl ? 'טלפון' : 'Phone',
    about: isRtl ? 'ספר לנו קצת על העסק שלך' : 'Tell us about your business',
    aboutPlaceholder: isRtl ? 'מה העסק עושה? מה האתגרים שלכם? כיצד AI יכול לעזור?' : 'What does your business do? What are your challenges?',
    cta: isRtl ? 'תאם שיחת איפיון' : 'Schedule a Discovery Call',
    successTitle: isRtl ? 'תודה! קיבלנו את הפנייה שלכם' : 'Thank you! We received your request',
    successSub: isRtl ? 'נחזור אליכם בהקדם לתיאום שיחת האיפיון.' : 'We\'ll be in touch shortly to schedule your discovery call.',
  };

  const fieldProps = (key: 'businessName' | 'firstName' | 'email' | 'phone') => ({
    id: `cns-${key}`,
    value: form[key],
    'aria-required': true,
    'aria-invalid': missing && !form[key] ? true : undefined,
    'aria-describedby': error ? 'cns-form-error' : undefined,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [key]: e.target.value })),
    className: 'cns-field',
  });

  return (
    <section aria-labelledby="cns-form-title" className="py-16 md:py-24" style={{ background: 'var(--h-ground)' }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid gap-10 lg:grid-cols-12 lg:gap-14 items-start">
        <div className="lg:col-span-5 text-start">
          <h2 id="cns-form-title" className="text-3xl md:text-5xl font-bold" style={{ color: 'var(--h-ink)' }}>{labels.title}</h2>
          <p className="mt-4 text-base md:text-lg leading-relaxed max-w-[50ch]" style={{ color: 'var(--h-ink-2)' }}>{labels.sub}</p>
        </div>

        <div className="lg:col-span-7">
          {submitted ? (
            <div className="cns-card p-8 md:p-10 text-center" role="status">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: '#E7F6EC' }}>
                <CheckCheck className="w-8 h-8" style={{ color: '#1F7A3D' }} aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--h-ink)' }}>{labels.successTitle}</h3>
              <p style={{ color: 'var(--h-ink-2)' }}>{labels.successSub}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="cns-card p-6 md:p-8 space-y-5 text-start">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="cns-businessName" className="cns-label">
                    {labels.businessName} <span className="cns-req" aria-hidden="true">*</span>
                  </label>
                  <input type="text" autoComplete="organization" {...fieldProps('businessName')}
                    placeholder={isRtl ? 'שם החברה / העסק' : 'Company name'} />
                </div>
                <div>
                  <label htmlFor="cns-firstName" className="cns-label">
                    {labels.firstName} <span className="cns-req" aria-hidden="true">*</span>
                  </label>
                  <input type="text" autoComplete="given-name" {...fieldProps('firstName')}
                    placeholder={isRtl ? 'שמך הפרטי' : 'Your first name'} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="cns-email" className="cns-label">
                    {labels.email} <span className="cns-req" aria-hidden="true">*</span>
                  </label>
                  <input type="email" autoComplete="email" {...fieldProps('email')}
                    placeholder="name@company.com" dir="ltr" />
                </div>
                <div>
                  <label htmlFor="cns-phone" className="cns-label">
                    {labels.phone} <span className="cns-req" aria-hidden="true">*</span>
                  </label>
                  <input type="tel" autoComplete="tel" {...fieldProps('phone')}
                    placeholder="05X-XXX-XXXX" dir="ltr" />
                </div>
              </div>

              <div>
                <label htmlFor="cns-about" className="cns-label">{labels.about}</label>
                <textarea
                  id="cns-about"
                  value={form.about}
                  onChange={e => setForm(f => ({ ...f, about: e.target.value }))}
                  placeholder={labels.aboutPlaceholder}
                  rows={4}
                  className="cns-field resize-none"
                />
              </div>

              {/* Privacy consent */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="incubator-privacy"
                  checked={privacyConsent}
                  onChange={e => setPrivacyConsent(e.target.checked)}
                  className="cns-check mt-0.5"
                />
                <label htmlFor="incubator-privacy" className="text-[0.95rem] cursor-pointer leading-relaxed" style={{ color: 'var(--h-ink-2)' }}>
                  {isRtl ? (
                    <>אני מאשר/ת את{' '}<a href="/privacy-policy" className="underline underline-offset-2 font-semibold" style={{ color: 'var(--h-blue)' }} target="_blank" rel="noopener noreferrer">מדיניות הפרטיות</a>{' '}ומסכים/ה שהמידע שאני מספק/ת ישמר בהתאם לדרישות החוק</>
                  ) : (
                    <>I accept the{' '}<a href="/privacy-policy" className="underline underline-offset-2 font-semibold" style={{ color: 'var(--h-blue)' }} target="_blank" rel="noopener noreferrer">Privacy Policy</a>{' '}and agree that my information will be stored in accordance with legal requirements</>
                  )}
                </label>
              </div>

              {error && (
                <p id="cns-form-error" role="alert" className="cns-error">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-px" aria-hidden="true" />
                  <span>{error}</span>
                </p>
              )}

              <button
                type="submit"
                disabled={mutation.isPending || !privacyConsent}
                className="h-btn cns-btn-violet w-full"
                style={{ minHeight: '3.5rem', fontSize: '1.05rem' }}
              >
                {mutation.isPending ? (
                  <span className="cns-spinner" aria-hidden="true" />
                ) : (
                  <Send className="w-5 h-5" aria-hidden="true" />
                )}
                {labels.cta}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
