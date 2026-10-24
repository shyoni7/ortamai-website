import React from 'react';
import { Link } from 'wouter';
import { Award, Heart, Lightbulb, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import SEO from '@/components/SEO';
import '@/styles/about.css';

const TEAM = [
  {
    name: { he: 'יהונתן השלי', en: 'Yehonatan HaSheli' },
    role: { he: 'מנכ"ל ומייסד', en: 'CEO & Founder' },
    img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663445418346/oDFneUKwvw2xJYXYaumUdB/5ef60b582___________________ortam_ai_____________________4k_pcqitx1aqs9138twyuwm_0_632aaebc.png',
  },
  {
    name: { he: 'אריאל אלבוים', en: 'Ariel Alboim' },
    role: { he: 'ראש מחלקת הכשרות', en: 'Head of Training' },
    img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663445418346/oDFneUKwvw2xJYXYaumUdB/d27b06cde_105_2760d0fa.jpg',
    imgPosition: 'object-top',
  },
  {
    name: { he: 'יונתן גרבינסקי', en: 'Yonatan Grabinski' },
    role: { he: 'ראש מחלקת שיווק', en: 'Head of Marketing' },
    img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663445418346/oDFneUKwvw2xJYXYaumUdB/d80b2174c_unnamed1_80eb8d9d.png',
  },
  {
    name: { he: 'שי נחום', en: 'Shai Nachum' },
    role: { he: 'CTO', en: 'CTO' },
    img: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663445418346/rXJVQOjCqHBhECGn.jpeg',
  },
];

const CARD_STYLE: React.CSSProperties = {
  background: 'var(--h-paper)',
  border: '1px solid var(--h-line)',
  borderRadius: 20,
  boxShadow: '0 20px 50px -34px rgba(31, 16, 41,0.5)',
};

export default function About() {
  const { t, lang, dir } = useLanguage();
  const isRtl = lang === 'he';
  const Arrow = isRtl ? ArrowLeft : ArrowRight;

  const values = [
    { icon: Award, title: t.about.excellence, desc: t.about.excellence_desc },
    { icon: Heart, title: t.about.commitment, desc: t.about.commitment_desc },
    { icon: Lightbulb, title: t.about.innovation, desc: t.about.innovation_desc },
  ];

  const stats = [
    // Same confirmed figures as the home page.
    { value: '~300', label: isRtl ? 'בוגרים' : 'Graduates' },
    { value: '15',   label: isRtl ? 'תוכניות הכשרה' : 'Training programs' },
    { value: '15',   label: isRtl ? 'כיתות שסיימו' : 'Classes completed' },
    { value: '10+',  label: isRtl ? 'ארגונים לקוחות' : 'Client organizations' },
  ];

  return (
    <>
    <SEO
      title={isRtl ? 'אודות ORTAM AI | החזון, הצוות והסיפור' : 'About ORTAM AI | Vision, Team & Story'}
      description={isRtl
        ? 'ORTAM AI בנויה על חזון של הטמעת AI בישראל. קראו אודות הצוות, הערכים והדרך שלנו לבניית עתיד AI לארגונים, יזמים ועובדים בישראל.'
        : 'ORTAM AI is built on a vision of embedding AI across Israel. Learn about our team, values, and mission to build an AI-ready workforce.'}
      canonical="/about"
    />
    <div dir={dir} className="about-v2">
      {/* ── HERO ── */}
      <section aria-labelledby="about-title" style={{ background: 'var(--h-dark)' }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-14 pb-14 md:pt-24 md:pb-20 text-start">
          <h1
            id="about-title"
            className="h-rise text-white font-extrabold leading-[1.05] max-w-4xl"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)' }}
          >
            {isRtl ? (
              <><span style={{ color: 'var(--h-accent)' }}>אנחנו</span>{' '}בונים<br />את עתיד ה-AI</>
            ) : (
              <>We <span style={{ color: 'var(--h-accent)' }}>Build</span><br />the AI Future</>
            )}
          </h1>
          <p className="h-rise h-rise-2 mt-6 md:mt-8 text-lg md:text-xl leading-relaxed max-w-[60ch]" style={{ color: 'var(--h-on-dark)' }}>
            {isRtl
              ? 'אנחנו מאמינים שה-AI הוא לא רק טכנולוגיה – זו מהפכה. אנחנו כאן כדי להוביל אותה יחד איתך.'
              : 'We believe AI is not just technology – it is a revolution. We are here to lead it together with you.'}
          </p>
          <div className="h-rise h-rise-3 mt-9 md:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link href="/contact" className="h-btn h-btn-accent">
              {isRtl ? 'צור קשר' : 'Contact Us'}
            </Link>
            <Link href="/" className="h-btn h-btn-light">
              {isRtl ? 'חזרה לדף הבית' : 'Back to Home'}
            </Link>
          </div>

          <dl
            className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6 border-t pt-8 md:pt-10"
            style={{ borderColor: 'rgba(255, 255, 255,0.16)' }}
          >
            {stats.map(s => (
              <div key={s.label} className="text-start">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span
                    className="block font-extrabold text-white leading-none tabular-nums"
                    style={{ fontFamily: 'Rubik, Heebo, sans-serif', fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)' }}
                    dir="ltr"
                  >
                    {s.value}
                  </span>
                  <span className="block mt-3 text-base" style={{ color: 'var(--h-on-dark-2)' }} aria-hidden="true">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section aria-labelledby="who-title" className="py-16 md:py-24" style={{ background: 'var(--h-ground)' }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid gap-10 lg:gap-16 lg:grid-cols-12 items-start">
          <div className="lg:col-span-6 text-start">
            <h2 id="who-title" className="text-3xl md:text-5xl font-bold" style={{ color: 'var(--h-ink)' }}>{t.about.who}</h2>
            <p className="mt-5 text-lg md:text-xl font-medium leading-relaxed max-w-[60ch]" style={{ color: 'var(--h-ink)' }}>{t.about.who_text}</p>
            <p className="mt-5 text-base md:text-lg leading-relaxed max-w-[65ch]" style={{ color: 'var(--h-ink-2)' }}>{t.about.p1}</p>
            <p className="mt-4 text-base md:text-lg leading-relaxed max-w-[65ch]" style={{ color: 'var(--h-ink-2)' }}>{t.about.p2}</p>
          </div>
          <div className="lg:col-span-6 p-6 md:p-10 text-start" style={CARD_STYLE}>
            <h3 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--h-ink)' }}>{t.about.vision_title}</h3>
            <p className="mt-3 text-base md:text-lg leading-relaxed" style={{ color: 'var(--h-ink-2)' }}>{t.about.vision_text}</p>
            <div className="my-7 md:my-8 border-t" style={{ borderColor: 'var(--h-line)' }} />
            <h3 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--h-ink)' }}>{t.about.mission_title}</h3>
            <p className="mt-3 text-base md:text-lg leading-relaxed" style={{ color: 'var(--h-ink-2)' }}>{t.about.mission_p1}</p>
            <p className="mt-3 text-base md:text-lg leading-relaxed" style={{ color: 'var(--h-ink-2)' }}>{t.about.mission_p2}</p>
            <p className="mt-3 text-base md:text-lg leading-relaxed" style={{ color: 'var(--h-ink-2)' }}>{t.about.mission_p3}</p>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section aria-labelledby="values-title" className="py-16 md:py-24" style={{ background: 'var(--h-paper)' }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 id="values-title" className="text-3xl md:text-5xl font-bold text-start" style={{ color: 'var(--h-ink)' }}>
            {t.about.values_title}
          </h2>
          <ul className="mt-10 md:mt-14 grid gap-5 md:gap-6 md:grid-cols-3">
            {values.map(v => {
              const Icon = v.icon;
              return (
                <li key={v.title} className="p-6 md:p-8 text-start" style={CARD_STYLE}>
                  <span
                    className="inline-flex items-center justify-center w-12 h-12 rounded-full"
                    style={{ background: 'rgba(61, 220, 151,0.12)' }}
                    aria-hidden="true"
                  >
                    <Icon className="w-6 h-6" style={{ color: 'var(--h-accent-ink)' }} />
                  </span>
                  <h3 className="mt-5 text-xl md:text-2xl font-bold" style={{ color: 'var(--h-ink)' }}>{v.title}</h3>
                  <p className="mt-2 text-base leading-relaxed" style={{ color: 'var(--h-ink-2)' }}>{v.desc}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section aria-labelledby="team-title" className="py-16 md:py-24" style={{ background: 'var(--h-ground)' }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 id="team-title" className="text-3xl md:text-5xl font-bold text-start" style={{ color: 'var(--h-ink)' }}>{t.about.team_title}</h2>
          <p className="mt-4 text-base md:text-lg max-w-[60ch] text-start" style={{ color: 'var(--h-ink-2)' }}>{t.about.team_sub}</p>
          <ul className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {TEAM.map(member => (
              <li key={member.name.en} className="about-team-card overflow-hidden" style={CARD_STYLE}>
                <div className="aspect-[4/3] sm:aspect-[4/5] overflow-hidden" style={{ background: 'var(--h-ground)' }}>
                  <img
                    src={member.img}
                    alt={member.name[lang]}
                    loading="lazy"
                    className={`about-team-img w-full h-full object-cover ${'imgPosition' in member ? (member as any).imgPosition : 'object-center'}`}
                  />
                </div>
                <div className="p-5 text-start">
                  <h3 className="text-lg md:text-xl font-bold" style={{ color: 'var(--h-ink)' }}>{member.name[lang]}</h3>
                  <p className="mt-1 text-base" style={{ color: 'var(--h-ink-2)' }}>{member.role[lang]}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── CTA ── */}
      <section aria-labelledby="about-cta-title" style={{ background: 'var(--h-dark)' }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20 md:py-28 text-start">
          <h2
            id="about-cta-title"
            className="text-white font-extrabold leading-[1.05] max-w-3xl"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.75rem)' }}
          >
            {t.about.cta_title}
          </h2>
          <p className="mt-5 text-lg md:text-xl max-w-[60ch]" style={{ color: 'var(--h-on-dark)' }}>{t.about.cta_sub}</p>
          <div className="mt-10">
            <Link href="/contact" className="h-btn h-btn-accent">
              {t.about.cta_btn}
              <Arrow size={18} className="h-link-arrow" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
