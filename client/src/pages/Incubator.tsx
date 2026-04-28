import React from 'react';
import { Link } from 'wouter';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Target, Lightbulb, Users, RefreshCw,
  Code2, Zap, CheckCircle2, Rocket,
  ArrowLeft
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

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
        color: 'bg-cyan-500',
        title: 'איפיון צרכי העסק וייעוץ ממומחה AI',
        desc: 'ניתוח מעמיק של העסק שלך והזדמנויות יישום AI',
        items: ['פגישת Discovery מקיפה', 'מיפוי תהליכים קיימים', 'זיהוי נקודות כאב וצוואר בקבוק'],
      },
      {
        icon: Lightbulb,
        color: 'bg-blue-500',
        title: 'הכשרות מקצועיות מותאמות לצרכי העסק שלך',
        desc: 'תוכניות הדרכה ייעודיות לצוות שלך',
        items: ['הכשרת מנהלים והנהלה', 'הדרכת צוות טכני', 'ליווי אישי לכל משתתף'],
      },
      {
        icon: Users,
        color: 'bg-purple-500',
        title: 'הדרכה וליווי צמוד עד להטמעה מלאה',
        desc: 'ליווי צמוד בכל שלב עד שתהליכי העבודה משולבים לחלוטין',
        items: ['ליווי שוטף של צוות מומחים', 'תמיכה טכנית 24/7', 'מעקב אחרי KPIs והצלחה'],
      },
      {
        icon: RefreshCw,
        color: 'bg-indigo-500',
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
        color: 'bg-cyan-500',
        title: 'Business Needs Analysis & Expert AI Consulting',
        desc: 'Deep analysis of your business and AI implementation opportunities',
        items: ['Comprehensive Discovery Meeting', 'Mapping Existing Processes', 'Identifying Pain Points & Bottlenecks'],
      },
      {
        icon: Lightbulb,
        color: 'bg-blue-500',
        title: 'Professional Training Tailored to Your Business',
        desc: 'Dedicated training programs for your team',
        items: ['Management & Leadership Training', 'Technical Team Guidance', 'Personal Mentoring for Each Participant'],
      },
      {
        icon: Users,
        color: 'bg-purple-500',
        title: 'Guidance & Close Support Until Full Adoption',
        desc: 'Close support at every stage until workflows are fully integrated',
        items: ['Ongoing Expert Team Support', '24/7 Technical Support', 'KPI & Success Tracking'],
      },
      {
        icon: RefreshCw,
        color: 'bg-indigo-500',
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
    <div dir={dir}>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative py-20 overflow-hidden" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#060d1f] via-[#0d1628] to-[#060d1f]" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        {/* Floating orbs */}
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-10 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 60, 0] }}
          transition={{ duration: 15, repeat: Infinity, delay: 2 }}
          className="absolute bottom-10 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex mb-6"
          >
            <div className="glass px-4 py-2 rounded-full">
              <span className="text-sm font-semibold text-cyan-400">{c.badge}</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            {c.hero_title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {c.hero_desc}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <Link href="/contact">
              <button className="inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-xl transition-all text-lg shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40" style={{ background: '#F5A623' }} onMouseEnter={e => (e.currentTarget.style.background='#e09610')} onMouseLeave={e => (e.currentTarget.style.background='#F5A623')}>
                {isRtl ? <ArrowLeft className="w-5 h-5" /> : null}
                {c.hero_cta}
                {!isRtl ? <ArrowLeft className="w-5 h-5 rotate-180" /> : null}
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── What You Get ─────────────────────────────────────────────────── */}
      <section className="py-24 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{c.what_title}</h2>
            <p className="text-gray-400 text-lg">{c.what_sub}</p>
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
                  className="glass rounded-2xl p-8 hover:border-cyan-400/30 transition-all"
                >
                  <div className={`flex items-start gap-5 ${isRtl ? 'flex-row-reverse text-right' : ''}`}>
                    <div className={`flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl ${b.color} shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-xl mb-1">{b.title}</h3>
                      <p className="text-gray-400 mb-4 text-sm">{b.desc}</p>
                      <ul className={`space-y-2 ${isRtl ? 'text-right' : ''}`}>
                        {b.items.map((item, j) => (
                          <motion.li
                            key={j}
                            custom={j}
                            variants={fadeUp}
                            initial="hidden"
                            animate={inView ? 'visible' : 'hidden'}
                            className={`flex items-center gap-2 text-gray-300 text-sm ${isRtl ? 'flex-row-reverse' : ''}`}
                          >
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                            {item}
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
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-4xl font-bold text-white mb-4">{c.build_title}</h2>
            <p className="text-gray-400 text-lg">{c.build_sub}</p>
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
                  className="glass rounded-2xl p-8 text-center hover:border-cyan-400/30 transition-all group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 mb-5"
                  >
                    <Icon className="w-8 h-8 text-cyan-400" />
                  </motion.div>
                  <h3 className="text-white font-bold text-xl mb-3">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Process Steps ────────────────────────────────────────────────── */}
      <section className="py-24 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-4xl font-bold text-white mb-4">{c.process_title}</h2>
            <p className="text-gray-400 text-lg">{c.process_sub}</p>
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
                  className="glass rounded-2xl p-6 text-center relative"
                >
                  {i < c.steps.length - 1 && (
                    <div className={`absolute top-1/2 ${isRtl ? '-left-2' : '-right-2'} w-4 h-0.5 bg-cyan-500/40 hidden md:block`} />
                  )}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: i * 0.12 + 0.2, type: 'spring', stiffness: 300 }}
                    className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cyan-500 text-white font-bold text-lg mb-4 mx-auto shadow-lg shadow-cyan-500/30"
                  >
                    {step.num}
                  </motion.div>
                  <h3 className="text-white font-bold text-lg mb-2">{step.label}</h3>
                  <p className="text-gray-400 text-sm">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Flexible Business Models ─────────────────────────────────────── */}
      <section className="py-16 relative">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AnimatedSection>
            <div className="glass rounded-2xl py-14 px-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{c.models_title}</h2>
              <p className="text-gray-400 text-lg">{c.models_sub}</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-900/30 to-cyan-500/10" />
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-white mb-4">{c.cta_title}</h2>
            <p className="text-gray-300 text-lg mb-8">{c.cta_sub}</p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 text-white font-bold px-10 py-4 rounded-xl transition-all text-lg shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40" style={{ background: '#F5A623' }} onMouseEnter={e => (e.currentTarget.style.background='#e09610')} onMouseLeave={e => (e.currentTarget.style.background='#F5A623')}
              >
                {isRtl ? <ArrowLeft className="w-5 h-5" /> : null}
                {c.cta_btn}
                {!isRtl ? <ArrowLeft className="w-5 h-5 rotate-180" /> : null}
              </motion.button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
