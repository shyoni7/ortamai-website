import React from 'react';
import { Link } from 'wouter';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  Target, Lightbulb, Users, RefreshCw,
  Code2, Zap, CheckCircle2, Rocket,
  ArrowLeft, Send, CheckCheck
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { trpc } from '@/lib/trpc';

// ─── Reusable animation variants ─────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: 60 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: i * 0.12 },
  }),
};

const fadeRight = {
  hidden: { opacity: 0, x: -60 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: i * 0.12 },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

// ─── Section wrapper that triggers animation when in view ────────────────────
function AnimatedSection({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Content ─────────────────────────────────────────────────────────────────
const CONTENT = {
  he: {
    badge: 'אקסלרטור AI',
    hero_title: 'אקסלרטור ליזמים ועסקים',
    hero_desc:
      'עסק שלא יעבוד עם AI ישאר תקוע מאחור. בנינו את האקסלרטור שלנו כדי לוודא שאתם מתקדמים עם התקופה ולא נתקעים מאחור.',
    hero_cta: 'ספרו לנו על העסק שלכם',

    what_title: 'מה תקבלו באקסלרטור של ORTAM AI?',
    what_sub: 'תהליך מלא ומובנה להצלחה שלכם',

    benefits: [
      {
        icon: Target,
        color: 'bg-purple-600',
        title: 'איפיון צרכי העסק וייעוץ ממומחה AI',
        desc: 'ניתוח מעמיק של העסק שלך והזדמנויות יישום AI',
        items: ['פגישת Discovery מקיפה', 'מיפוי תהליכים קיימים', 'זיהוי נקודות כאב וצוואר בקבוק'],
      },
      {
        icon: Lightbulb,
        color: 'bg-violet-600',
        title: 'הכשרות מקצועיות מותאמות לצרכי העסק שלך',
        desc: 'תוכניות הדרכה ייעודיות לצוות שלך',
        items: ['הכשרת מנהלים והנהלה', 'הדרכת צוות טכני', 'ליווי אישי לכל משתתף'],
      },
      {
        icon: Users,
        color: 'bg-purple-700',
        title: 'הדרכה וליווי צמוד עד להטמעה מלאה',
        desc: 'ליווי צמוד בכל שלב עד שתהליכי העבודה משולבים לחלוטין',
        items: ['ליווי שוטף של צוות מומחים', 'תמיכה טכנית 24/7', 'מעקב אחרי KPIs והצלחה'],
      },
      {
        icon: RefreshCw,
        color: 'bg-indigo-600',
        title: 'עדכון גרסה כל חצי שנה',
        desc: 'תמיד עם הכלים הכי מתקדמים ומדויקים בשוק',
        items: ['עדכונים טכנולוגיים שוטפים', 'שיפורים מבוססי פידבק', 'התאמה לשינויים בשוק'],
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

    cta_title: 'מוכנים להתחיל?',
    cta_sub: 'ספרו לנו על העסק שלכם ונבנה יחד תוכנית מותאמת',
    cta_btn: 'ספרו לנו על העסק שלכם',
  },
  en: {
    badge: 'AI Accelerator',
    hero_title: 'Business & Entrepreneur Accelerator',
    hero_desc:
      "A business that doesn't work with AI will fall behind. We built our accelerator to ensure you advance with the times and don't get left behind.",
    hero_cta: 'Tell Us About Your Business',

    what_title: 'What Will You Get in the ORTAM AI Accelerator?',
    what_sub: 'A complete, structured path to your success',

    benefits: [
      {
        icon: Target,
        color: 'bg-purple-600',
        title: 'Business Needs Analysis & Expert AI Consulting',
        desc: 'Deep analysis of your business and AI implementation opportunities',
        items: ['Comprehensive Discovery Meeting', 'Mapping Existing Processes', 'Identifying Pain Points & Bottlenecks'],
      },
      {
        icon: Lightbulb,
        color: 'bg-violet-600',
        title: 'Professional Training Tailored to Your Business',
        desc: 'Dedicated training programs for your team',
        items: ['Management & Leadership Training', 'Technical Team Guidance', 'Personal Mentoring for Each Participant'],
      },
      {
        icon: Users,
        color: 'bg-purple-700',
        title: 'Guidance & Close Support Until Full Adoption',
        desc: 'Close support at every stage until workflows are fully integrated',
        items: ['Ongoing Expert Team Support', '24/7 Technical Support', 'KPI & Success Tracking'],
      },
      {
        icon: RefreshCw,
        color: 'bg-indigo-600',
        title: 'Version Update Every 6 Months',
        desc: 'Always equipped with the most advanced and accurate tools on the market',
        items: ['Ongoing Technology Updates', 'Feedback-Based Improvements', 'Adaptation to Market Changes'],
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

    cta_title: 'Ready to Start?',
    cta_sub: "Tell us about your business and we'll build a tailored plan together",
    cta_btn: 'Tell Us About Your Business',
  },
};

// ─── Component ───────────────────────────────────────────────────────────────
export default function Incubator() {
  const { lang, dir } = useLanguage();
  const isRtl = lang === 'he';
  const c = isRtl ? CONTENT.he : CONTENT.en;

  return (
    <div dir={dir} className="bg-white">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          minHeight: '200px',
          background: 'linear-gradient(135deg, #1a1560 0%, #2d1b8e 30%, #3b2aaa 55%, #1e1080 80%, #120d5e 100%)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* ── Background glow blobs ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Right glow */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -right-20 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.5) 0%, rgba(109,40,217,0.2) 50%, transparent 75%)' }}
          />
          {/* Left glow */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute -left-10 top-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)' }}
          />
          {/* Subtle wave lines */}
          <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="wave-lines" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M0 40 Q20 20 40 40 Q60 60 80 40" stroke="rgba(167,139,250,0.6)" strokeWidth="1" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#wave-lines)" />
          </svg>
        </div>

        {/* ── Main content row ── */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-12">
          <div className={`flex items-center gap-10 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>

            {/* ── 3D AI Atom Sphere ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: 'backOut' }}
              className="flex-shrink-0 relative"
              style={{ width: 190, height: 190 }}
            >
              {/* ── BACK halves of rings (behind sphere) ── */}

              {/* Ring 1 back half */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 pointer-events-none"
                style={{ zIndex: 0 }}
              >
                <div className="absolute inset-0" style={{
                  transform: 'rotateX(75deg)',
                  borderRadius: '50%',
                  border: '2px solid transparent',
                  borderTopColor: 'rgba(192,132,252,0.0)',
                  borderBottomColor: 'rgba(192,132,252,0.55)',
                  borderLeftColor: 'rgba(192,132,252,0.55)',
                  borderRightColor: 'rgba(192,132,252,0.0)',
                  boxShadow: '0 0 8px rgba(192,132,252,0.3)',
                }} />
              </motion.div>

              {/* Ring 2 back half */}
              <motion.div
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 pointer-events-none"
                style={{ zIndex: 0 }}
              >
                <div className="absolute inset-0" style={{
                  transform: 'rotateX(65deg) rotateZ(45deg)',
                  borderRadius: '50%',
                  border: '2px solid transparent',
                  borderTopColor: 'rgba(167,139,250,0.0)',
                  borderBottomColor: 'rgba(167,139,250,0.5)',
                  borderLeftColor: 'rgba(167,139,250,0.5)',
                  borderRightColor: 'rgba(167,139,250,0.0)',
                  boxShadow: '0 0 6px rgba(167,139,250,0.25)',
                }} />
              </motion.div>

              {/* ── Core 3D sphere (middle layer) ── */}
              <motion.div
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute rounded-full"
                style={{
                  inset: '22px',
                  zIndex: 1,
                  background: [
                    'radial-gradient(circle at 32% 28%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 22%)',
                    'radial-gradient(circle at 70% 72%, rgba(46,16,101,0.7) 0%, rgba(46,16,101,0) 45%)',
                    'radial-gradient(circle at 50% 50%, #c084fc 0%, #7c3aed 40%, #4c1d95 75%, #2e1065 100%)',
                  ].join(', '),
                  boxShadow: '0 0 40px rgba(139,92,246,0.7), 0 0 80px rgba(109,40,217,0.4), inset 0 0 20px rgba(46,16,101,0.5)',
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="font-black text-white select-none"
                    style={{ fontSize: '22px', textShadow: '0 0 12px rgba(255,255,255,0.8)', letterSpacing: '-0.5px' }}
                  >
                    AI
                  </span>
                </div>
              </motion.div>

              {/* ── FRONT halves of rings (in front of sphere) ── */}

              {/* Ring 1 front half + orbiting dot */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 pointer-events-none"
                style={{ zIndex: 2 }}
              >
                <div className="absolute inset-0" style={{
                  transform: 'rotateX(75deg)',
                  borderRadius: '50%',
                  border: '2px solid transparent',
                  borderTopColor: 'rgba(192,132,252,0.9)',
                  borderBottomColor: 'rgba(192,132,252,0.0)',
                  borderLeftColor: 'rgba(192,132,252,0.0)',
                  borderRightColor: 'rgba(192,132,252,0.9)',
                  boxShadow: '0 0 10px rgba(192,132,252,0.5)',
                }} />
                {/* Orbiting dot — top of ring (front) */}
                <div
                  className="absolute w-3 h-3 rounded-full bg-white"
                  style={{
                    top: '-5px',
                    left: '50%',
                    marginLeft: '-6px',
                    boxShadow: '0 0 10px rgba(255,255,255,0.95), 0 0 20px rgba(192,132,252,0.9)',
                  }}
                />
              </motion.div>

              {/* Ring 2 front half + orbiting dot */}
              <motion.div
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 pointer-events-none"
                style={{ zIndex: 2 }}
              >
                <div className="absolute inset-0" style={{
                  transform: 'rotateX(65deg) rotateZ(45deg)',
                  borderRadius: '50%',
                  border: '2px solid transparent',
                  borderTopColor: 'rgba(167,139,250,0.85)',
                  borderBottomColor: 'rgba(167,139,250,0.0)',
                  borderLeftColor: 'rgba(167,139,250,0.0)',
                  borderRightColor: 'rgba(167,139,250,0.85)',
                  boxShadow: '0 0 8px rgba(167,139,250,0.4)',
                }} />
                {/* Orbiting dot */}
                <div
                  className="absolute w-2.5 h-2.5 rounded-full bg-purple-200"
                  style={{
                    top: '-5px',
                    left: '50%',
                    marginLeft: '-5px',
                    boxShadow: '0 0 8px rgba(192,132,252,0.9), 0 0 16px rgba(139,92,246,0.6)',
                  }}
                />
              </motion.div>

              {/* Outer glow */}
              <motion.div
                animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.08, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{ zIndex: 0, boxShadow: '0 0 50px rgba(139,92,246,0.5), 0 0 100px rgba(109,40,217,0.25)' }}
              />
            </motion.div>

            {/* ── Text column ── */}
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className={`flex-1 ${isRtl ? 'text-right' : 'text-left'}`}
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight"
              >
                {isRtl ? 'מוכנים לקחת את ה-AI שלכם לשלב הבא?' : 'Ready to take your AI to the next level?'}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="text-purple-200 text-base md:text-lg mb-7 leading-relaxed"
              >
                {isRtl
                  ? 'קבעו פגישת ייעוץ עם מומחי ה-AI של ORTAM.'
                  : 'Schedule a consultation with ORTAM AI experts.'}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.04, x: isRtl ? -4 : 4 }}
                    whileTap={{ scale: 0.97 }}
                    className={`inline-flex items-center gap-3 bg-white text-[#2d1b8e] font-bold px-7 py-3.5 rounded-xl text-base shadow-lg hover:shadow-purple-500/30 transition-shadow ${
                      isRtl ? 'flex-row-reverse' : ''
                    }`}
                    style={{ boxShadow: '0 4px 24px rgba(139,92,246,0.25)' }}
                  >
                    <span>{isRtl ? 'קבעו פגישת ייעוץ' : 'Schedule a Consultation'}</span>
                    <motion.span
                      animate={{ x: isRtl ? [-3, 0, -3] : [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <ArrowLeft className={`w-5 h-5 ${isRtl ? '' : 'rotate-180'}`} />
                    </motion.span>
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── What You Get ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className={`mb-16 ${isRtl ? 'text-right' : 'text-center'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{c.what_title}</h2>
            <p className="text-gray-500 text-lg">{c.what_sub}</p>
          </AnimatedSection>

          <div className="space-y-6">
            {c.benefits.map((b, i) => {
              const Icon = b.icon;
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: '-60px' });
              return (
                <motion.div
                  key={i}
                  ref={ref}
                  custom={i}
                  variants={isRtl ? fadeLeft : fadeRight}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md hover:border-purple-300 transition-all"
                  dir={isRtl ? 'rtl' : 'ltr'}
                >
                  <div className="flex items-start gap-5">
                    <div className={`flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl ${b.color} shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-gray-900 font-bold text-xl mb-1">{b.title}</h3>
                      <p className="text-gray-500 mb-4 text-sm">{b.desc}</p>
                      <ul className="space-y-2">
                        {b.items.map((item, j) => (
                          <motion.li
                            key={j}
                            custom={j}
                            variants={fadeUp}
                            initial="hidden"
                            animate={inView ? 'visible' : 'hidden'}
                            className="flex items-center gap-2 text-gray-700 text-sm"
                          >
                            <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
                            <span>{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── What We Build ────────────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className={`mb-14 ${isRtl ? 'text-right' : 'text-center'}`}>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{c.build_title}</h2>
            <p className="text-gray-500 text-lg">{c.build_sub}</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {c.build_items.map((item, i) => {
              const Icon = item.icon;
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: '-60px' });
              return (
                <motion.div
                  key={i}
                  ref={ref}
                  custom={i}
                  variants={scaleIn}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  className={`bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md hover:border-purple-300 transition-all group ${isRtl ? 'text-right' : 'text-center'}`}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className={`inline-flex p-4 rounded-2xl mb-5 ${isRtl ? '' : 'mx-auto'}`}
                    style={{ background: i % 2 === 0 ? 'rgba(245,158,11,0.12)' : 'rgb(243 232 255)', border: i % 2 === 0 ? '1px solid rgba(245,158,11,0.3)' : '1px solid rgb(233 213 255)' }}
                  >
                    <Icon className="w-8 h-8" style={{ color: i % 2 === 0 ? '#F59E0B' : '#9333ea' }} />
                  </motion.div>
                  <h3 className="text-gray-900 font-bold text-xl mb-3">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Process Steps ────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className={`mb-14 ${isRtl ? 'text-right' : 'text-center'}`}>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{c.process_title}</h2>
            <p className="text-gray-500 text-lg">{c.process_sub}</p>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(isRtl ? [...c.steps].reverse() : c.steps).map((step, i) => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: '-60px' });
              return (
                <motion.div
                  key={step.num}
                  ref={ref}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  className={`bg-white border border-gray-200 rounded-2xl p-6 shadow-sm relative ${isRtl ? 'text-right' : 'text-center'}`}
                  dir={isRtl ? 'rtl' : 'ltr'}
                >
                  {i < c.steps.length - 1 && (
                    <div className={`absolute top-1/2 ${isRtl ? '-left-2' : '-right-2'} w-4 h-0.5 bg-purple-300 hidden md:block`} />
                  )}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: i * 0.12 + 0.2, type: 'spring', stiffness: 300 }}
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-full text-white font-bold text-lg mb-4 shadow-lg ${isRtl ? '' : 'mx-auto'}`}
                    style={{ background: i % 2 === 0 ? '#F59E0B' : '#9333ea', boxShadow: i % 2 === 0 ? '0 4px 14px rgba(245,158,11,0.35)' : '0 4px 14px rgba(147,51,234,0.35)' }}
                  >
                    {step.num}
                  </motion.div>
                  <h3 className="text-gray-900 font-bold text-lg mb-2">{step.label}</h3>
                  <p className="text-gray-500 text-sm">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Flexible Business Models ─────────────────────────────────────── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AnimatedSection>
            <div className="bg-white border border-gray-200 rounded-2xl py-14 px-8 shadow-sm">
              <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-3 ${isRtl ? 'text-right' : 'text-center'}`}>{c.models_title}</h2>
              <p className={`text-gray-500 text-lg ${isRtl ? 'text-right' : 'text-center'}`}>{c.models_sub}</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Consultation Form ─────────────────────────────────────────────── */}
      <ConsultationForm isRtl={isRtl} />
    </div>
  );
}

// ─── Consultation Form Component ─────────────────────────────────────────────
function ConsultationForm({ isRtl }: { isRtl: boolean }) {
  const [form, setForm] = useState({ businessName: '', firstName: '', email: '', phone: '', about: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [privacyConsent, setPrivacyConsent] = useState(false);

  const mutation = trpc.incubator.submitConsultation.useMutation({
    onSuccess: () => setSubmitted(true),
    onError: (e) => setError(isRtl ? 'אירעה שגיאה. נסה שוב.' : 'An error occurred. Please try again.'),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.businessName || !form.firstName || !form.email || !form.phone) {
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
    sub: isRtl ? 'נחזור אליכם תוך 24 שעות לתיאום שיחת האיפיון' : 'We\'ll get back to you within 24 hours',
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

  return (
    <section className="py-24 bg-gradient-to-br from-purple-700 via-violet-700 to-indigo-700 relative overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      {/* decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="max-w-2xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px", amount: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 text-center">{labels.title}</h2>
          <p className="text-purple-200 text-center mb-10">{labels.sub}</p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-10 text-center border border-white/20"
            >
              <div className="w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCheck className="w-8 h-8 text-green-300" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{labels.successTitle}</h3>
              <p className="text-purple-200">{labels.successSub}</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 space-y-5">
              {/* Row: business name + first name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-purple-100 text-sm font-medium mb-1.5">
                    {labels.businessName} <span className="text-red-300">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.businessName}
                    onChange={e => setForm(f => ({ ...f, businessName: e.target.value }))}
                    placeholder={isRtl ? 'שם החברה / העסק' : 'Company name'}
                    className="w-full bg-white/10 border border-white/25 rounded-xl px-4 py-3 text-white placeholder-purple-300/60 focus:outline-none focus:border-white/60 focus:bg-white/15 transition"
                  />
                </div>
                <div>
                  <label className="block text-purple-100 text-sm font-medium mb-1.5">
                    {labels.firstName} <span className="text-red-300">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                    placeholder={isRtl ? 'שמך הפרטי' : 'Your first name'}
                    className="w-full bg-white/10 border border-white/25 rounded-xl px-4 py-3 text-white placeholder-purple-300/60 focus:outline-none focus:border-white/60 focus:bg-white/15 transition"
                  />
                </div>
              </div>

              {/* Row: email + phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-purple-100 text-sm font-medium mb-1.5">
                    {labels.email} <span className="text-red-300">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="name@company.com"
                    className="w-full bg-white/10 border border-white/25 rounded-xl px-4 py-3 text-white placeholder-purple-300/60 focus:outline-none focus:border-white/60 focus:bg-white/15 transition"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-purple-100 text-sm font-medium mb-1.5">
                    {labels.phone} <span className="text-red-300">*</span>
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    placeholder="05X-XXX-XXXX"
                    className="w-full bg-white/10 border border-white/25 rounded-xl px-4 py-3 text-white placeholder-purple-300/60 focus:outline-none focus:border-white/60 focus:bg-white/15 transition"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* About textarea */}
              <div>
                <label className="block text-purple-100 text-sm font-medium mb-1.5">{labels.about}</label>
                <textarea
                  value={form.about}
                  onChange={e => setForm(f => ({ ...f, about: e.target.value }))}
                  placeholder={labels.aboutPlaceholder}
                  rows={4}
                  className="w-full bg-white/10 border border-white/25 rounded-xl px-4 py-3 text-white placeholder-purple-300/60 focus:outline-none focus:border-white/60 focus:bg-white/15 transition resize-none"
                />
              </div>

              {/* Privacy consent */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="incubator-privacy"
                  checked={privacyConsent}
                  onChange={e => setPrivacyConsent(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-white cursor-pointer flex-shrink-0"
                />
                <label htmlFor="incubator-privacy" className="text-sm text-purple-200 cursor-pointer leading-relaxed">
                  {isRtl ? (
                    <>אני מאשר/ת את{' '}<a href="/privacy-policy" className="text-white underline hover:text-purple-100" target="_blank" rel="noopener noreferrer">מדיניות הפרטיות</a>{' '}ומסכים/ה שהמידע שאני מספק/ת ישמר בהתאם לדרישות החוק</>
                  ) : (
                    <>I accept the{' '}<a href="/privacy-policy" className="text-white underline hover:text-purple-100" target="_blank" rel="noopener noreferrer">Privacy Policy</a>{' '}and agree that my information will be stored in accordance with legal requirements</>
                  )}
                </label>
              </div>

              {/* Error */}
              {error && <p className="text-red-300 text-sm">{error}</p>}

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={mutation.isPending || !privacyConsent}
                whileHover={{ scale: mutation.isPending ? 1 : 1.02 }}
                whileTap={{ scale: mutation.isPending ? 1 : 0.98 }}
                className="w-full flex items-center justify-center gap-2 bg-white text-purple-700 font-bold py-4 rounded-xl text-lg hover:bg-purple-50 transition-colors shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {mutation.isPending ? (
                  <span className="animate-spin w-5 h-5 border-2 border-purple-400 border-t-purple-700 rounded-full" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
                {labels.cta}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
