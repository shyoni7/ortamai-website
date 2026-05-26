import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Zap, Users, Briefcase, CheckCircle, Star, Award, TrendingUp, Brain, Sparkles, Rocket } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import MetallicSphere, { SphereVariant } from '@/components/MetallicSphere';
import ScrollDownArrow from '@/components/ScrollDownArrow';
import SEO from '@/components/SEO';
import { organizationSchema, websiteSchema } from '@/lib/seoSchemas';

const HERO_VIDEO = 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663445418346/sLtfKJCObxnFJgJI.mp4';
const HERO_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663445418346/oDFneUKwvw2xJYXYaumUdB/a00800906_______________ai______________1ztf6h7ulzz1cg0t1nwp_1_450c2a58.png';
const TRAINING_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663445418346/oDFneUKwvw2xJYXYaumUdB/81fe03d01_create_a_professional_and_modern_image_for_a_website_that_promotes_ai_training_programs_the_image_s_y01604j7g7gqe2rbe6tu_0_2b7c34bf.png';

export const ACCESSIBILITY_LOGO_URL = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663445418346/oDFneUKwvw2xJYXYaumUdB/73e8a1f5d_images_f41438b1.png';

const PARTNERS = [
  { name: 'ועד עובדים כלל ביטוח', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663445418346/oDFneUKwvw2xJYXYaumUdB/6d9c58ace__abb167b6.png' },
  { name: 'צה"ל', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663445418346/oDFneUKwvw2xJYXYaumUdB/97cb921a8_2_c2d719a3.jpeg' },
  { name: 'Tokomni', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663445418346/oDFneUKwvw2xJYXYaumUdB/40f5d2b0c_2_085f5bf7.png' },
  { name: 'Omnitelecom', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663445418346/oDFneUKwvw2xJYXYaumUdB/eb9cdb162_3_78962139.png' },
  { name: 'אוניברסיטת אריאל', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663445418346/oDFneUKwvw2xJYXYaumUdB/4a76ee3ff_566_511a27c5.jpg' },
  { name: 'לומדים ומתקדמים', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663445418346/OmLeAhuLRydXUaQC.png' },
  { name: 'MAMRAM Alumni Association', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663445418346/IyhRDVcCPTdwTkiK.png', darkBg: true },
  { name: 'ההסתדרות', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663445418346/scvBkVKTwknETAgQ.jpg' },
  { name: 'בנק לאומי', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663445418346/COWyaNxVzekIQanP.png' },
  { name: 'CyberGo', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663445418346/ZMeUfaAopZDjYSah.webp' },
];

// ── Obsidian + Platinum design tokens ──────────────────────────
const OBS   = '#08080C';          // obsidian black
const OBS2  = '#111116';          // card surface
const OBS3  = '#1A1A22';          // elevated surface
const PLAT  = '#C8C8D0';          // platinum
const PLAT2 = '#E8E8F0';          // light platinum
const WHITE = '#FFFFFF';
const DIM   = 'rgba(200,200,208,0.45)'; // dimmed platinum text

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65 } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Home() {
  const { t, lang, dir } = useLanguage();
  const isRtl = lang === 'he';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const stats = [
    { value: '30+',  label: t.stats.programs },
    { value: '98%',  label: t.stats.satisfaction },
    { value: '300+', label: t.stats.graduates },
    { value: '10+',  label: t.stats.partners },
  ];

  const pillars = [
    {
      icon: Zap,
      title: isRtl ? 'אקסלרטור ליזמים ועסקים' : 'Business Accelerator',
      desc: isRtl ? 'בנו את העסק שלכם עם AI ותקדמו מהר יותר מאי פעם. ליווי אישי, כלים מתקדמים וקהילה תומכת.' : 'Build your business with AI and grow faster than ever.',
      href: '/incubator',
      sphereVariant: 'obsidian' as SphereVariant,
    },
    {
      icon: Users,
      title: isRtl ? 'מרכז הכשרות' : 'Training Center',
      desc: isRtl ? 'קורסים מתקדמים בעולם ה-AI מהמומחים שלנו. הכשרות ייעודיות לארגונים, עסקים ואנשים פרטיים.' : 'Advanced AI courses from our experts.',
      href: '/academy',
      sphereVariant: 'platinum' as SphereVariant,
    },
    {
      icon: Briefcase,
      title: isRtl ? 'מרכז השמה' : 'Placement Center',
      desc: isRtl ? 'גישור בין מועמדים מוכשרים לארגונים מובילים. אנחנו מחברים בין כישרון לבין הזדמנות.' : 'Bridging talented candidates with leading organizations.',
      href: '/placement',
      sphereVariant: 'pearl' as SphereVariant,
    },
  ];

  const whyUs = [
    { icon: Award,       title: isRtl ? 'מומחיות מוכחת'       : 'Proven Expertise',       desc: isRtl ? 'צוות מומחים עם ניסיון רב בתחום ה-AI' : 'Expert team with extensive AI experience' },
    { icon: Star,        title: isRtl ? 'גישה מותאמת אישית'   : 'Personalized Approach',  desc: isRtl ? 'כל לקוח מקבל תוכנית מותאמת לצרכיו'  : 'Each client gets a tailored plan' },
    { icon: TrendingUp,  title: isRtl ? 'תוצאות מדידות'       : 'Measurable Results',     desc: isRtl ? 'אנו מתמקדים בתוצאות אמיתיות ומדידות'  : 'We focus on real, measurable outcomes' },
    { icon: CheckCircle, title: isRtl ? 'קהילה תומכת'         : 'Supportive Community',   desc: isRtl ? 'הצטרף לקהילה של יזמים ומקצוענים'     : 'Join a community of entrepreneurs and professionals' },
  ];

  const steps = [
    { num: '01', title: isRtl ? 'פגישת היכרות'  : 'Introduction Meeting',    desc: isRtl ? 'נבין את הצרכים והמטרות שלך'         : 'We understand your needs and goals' },
    { num: '02', title: isRtl ? 'תוכנית מותאמת' : 'Custom Plan',             desc: isRtl ? 'נבנה תוכנית עבודה מותאמת אישית'      : 'We build a personalized work plan' },
    { num: '03', title: isRtl ? 'ליווי ויישום'  : 'Guidance & Implementation',desc: isRtl ? 'נלווה אותך לאורך כל הדרך'            : 'We guide you every step of the way' },
    { num: '04', title: isRtl ? 'תוצאות ומדידה' : 'Results & Measurement',   desc: isRtl ? 'נמדוד ונשפר את התוצאות'              : 'We measure and improve results' },
  ];

  return (
    <>
    <SEO
      title={isRtl ? 'המרכז לפיתוח AI בישראל | חממה, הכשרות והשמה' : 'AI Development Center Israel | Incubator, Training & Placement'}
      description={isRtl
        ? 'ORTAM AI — הגשר בין העולם הישן לעולם ה-AI. חממה טכנולוגית, קורסי AI לארגונים ועסקים, ומרכז השמה מוכוון AI. מוביל בישראל.'
        : 'ORTAM AI — Israel\'s leading AI development center. Tech incubator, AI training for organizations, and AI-driven placement center.'}
      canonical="/"
      schema={[organizationSchema, websiteSchema]}
    />
    <div dir={dir}>

      {/* ══════════════════════════════════════════
          HERO — Obsidian black + platinum
      ══════════════════════════════════════════ */}
      <section
        className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
        style={{ background: OBS }}
      >
        {/* Very subtle dot grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `radial-gradient(circle, rgba(200,200,208,0.07) 1px, transparent 1px)`,
          backgroundSize: '44px 44px',
        }} />

        {/* Platinum glow — top right, very subtle */}
        <motion.div
          animate={{ opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${PLAT}22 0%, transparent 65%)` }}
        />
        {/* Platinum glow — bottom left */}
        <motion.div
          animate={{ opacity: [0.08, 0.16, 0.08] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute -bottom-48 -left-48 w-[480px] h-[480px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${PLAT}18 0%, transparent 65%)` }}
        />

        {/* ── Main grid ── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16 items-center">

            {/* Text column — on mobile appears BELOW the video (order-2), on desktop left/right (order-1 lg:order-1) */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className={isRtl ? 'text-center md:text-right order-2 lg:order-1' : 'text-center md:text-left order-2 lg:order-1'}
            >
              {/* Pill badge */}
              <motion.div variants={fadeUp} className="inline-flex mb-5 md:mb-8">
                <div
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs md:text-sm font-medium tracking-wide"
                  style={{
                    borderColor: 'rgba(200,200,208,0.25)',
                    background: 'rgba(200,200,208,0.06)',
                    color: PLAT,
                    letterSpacing: '0.04em',
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: PLAT }} />
                  {isRtl ? 'מרכז פיתוח AI מוביל בישראל' : "Israel's Leading AI Development Center"}
                </div>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={fadeUp}
                className="font-bold leading-[1.08] mb-4 md:mb-6"
                style={{ fontSize: 'clamp(2.2rem, 6.5vw, 5rem)', color: WHITE }}
              >
                {isRtl ? (
                  <>
                    <span style={{ color: WHITE }}>המרכז לפיתוח </span>
                    <span style={{
                      background: `linear-gradient(135deg, ${PLAT2} 0%, ${PLAT} 40%, rgba(200,200,208,0.6) 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>AI</span>
                  </>
                ) : (
                  <>
                    <span style={{ color: WHITE }}>The </span>
                    <span style={{
                      background: `linear-gradient(135deg, ${PLAT2} 0%, ${PLAT} 40%, rgba(200,200,208,0.6) 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>AI</span>
                    <span style={{ color: WHITE }}> Development Hub</span>
                  </>
                )}
              </motion.h1>

              <motion.p variants={fadeUp} className="text-base md:text-xl mb-2 md:mb-3 font-medium" style={{ color: 'rgba(255,255,255,0.72)' }}>
                {t.home.hero_subtitle}
              </motion.p>
              <motion.p variants={fadeUp} className="text-sm md:text-base mb-6 md:mb-10 leading-relaxed" style={{ color: DIM }}>
                {t.home.hero_desc}
              </motion.p>

              {/* Stats row */}
              <motion.div variants={fadeUp} className="flex flex-wrap justify-center md:justify-start gap-6 md:gap-10 mb-7 md:mb-10">
                {[
                  { v: '300+', l: isRtl ? 'בוגרים'        : 'Graduates'   },
                  { v: '98%',  l: isRtl ? 'שביעות רצון'   : 'Satisfaction' },
                  { v: '10+',  l: isRtl ? 'שותפים'        : 'Partners'    },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold" style={{ color: WHITE }}>{s.v}</div>
                    <div className="text-xs mt-0.5 tracking-wide uppercase" style={{ color: DIM }}>{s.l}</div>
                  </div>
                ))}
              </motion.div>

              {/* CTA buttons */}
              <motion.div variants={fadeUp} className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4">
                {/* Primary — white solid */}
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.03, boxShadow: `0 0 32px rgba(200,200,208,0.35)` }}
                    whileTap={{ scale: 0.97 }}
                    className="px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold text-sm md:text-base transition-all"
                    style={{ background: WHITE, color: OBS }}
                  >
                    {t.home.cta}
                  </motion.button>
                </Link>
                {/* Secondary — ghost */}
                <Link href="/about">
                  <motion.button
                    whileHover={{ scale: 1.02, borderColor: PLAT, color: WHITE }}
                    whileTap={{ scale: 0.97 }}
                    className="px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold text-sm md:text-base border transition-all"
                    style={{ borderColor: 'rgba(200,200,208,0.28)', color: PLAT, background: 'transparent' }}
                  >
                    {t.home.cta_secondary}
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Video column — mobile: order-1 (top), desktop: order-2 (right) */}
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.35, type: 'spring', stiffness: 55 }}
              className="relative order-1 lg:order-2"
            >
              {/* Floating badge top */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-5 -right-4 z-20 hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl border"
                style={{ background: OBS2, borderColor: 'rgba(200,200,208,0.18)' }}
              >
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: OBS3, border: '1px solid rgba(200,200,208,0.2)' }}>
                  <Brain className="w-4 h-4" style={{ color: PLAT }} />
                </div>
                <div>
                  <div className="text-xs font-semibold leading-none" style={{ color: WHITE }}>{isRtl ? 'AI חכם' : 'Smart AI'}</div>
                  <div className="text-xs leading-none mt-0.5" style={{ color: DIM }}>{isRtl ? 'פתרונות מתקדמים' : 'Advanced'}</div>
                </div>
              </motion.div>

              {/* Floating badge bottom */}
              <motion.div
                animate={{ y: [0, 7, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                className="absolute -bottom-5 -left-4 z-20 hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl border"
                style={{ background: OBS2, borderColor: 'rgba(200,200,208,0.18)' }}
              >
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: OBS3, border: '1px solid rgba(200,200,208,0.2)' }}>
                  <Rocket className="w-4 h-4" style={{ color: PLAT }} />
                </div>
                <div>
                  <div className="text-xs font-semibold leading-none" style={{ color: WHITE }}>{isRtl ? 'אקסלרטור' : 'Accelerator'}</div>
                  <div className="text-xs leading-none mt-0.5" style={{ color: DIM }}>{isRtl ? 'צמיחה מהירה' : 'Fast Growth'}</div>
                </div>
              </motion.div>

              {/* Video frame */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                className="relative rounded-2xl overflow-hidden border mx-2 lg:mx-0"
                style={{
                  background: OBS2,
                  borderColor: 'rgba(200,200,208,0.14)',
                  boxShadow: `0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(200,200,208,0.08)`,
                }}
              >
                {/* Chrome bar */}
                <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(200,200,208,0.1)' }}>
                  <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(255,95,86,0.6)' }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(255,189,46,0.6)' }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(39,201,63,0.6)' }} />
                  <div className="flex-1 mx-3 h-5 rounded-full flex items-center px-3" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <span className="text-xs" style={{ color: DIM }}>ortamai.ai</span>
                  </div>
                </div>
                <video src={HERO_VIDEO} autoPlay loop muted playsInline poster={HERO_IMAGE} className="w-full h-auto object-cover" />
                {/* Overlay badges */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border" style={{ background: 'rgba(8,8,12,0.85)', borderColor: 'rgba(255,255,255,0.08)' }}>
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs font-medium" style={{ color: PLAT }}>{isRtl ? 'AI פעיל' : 'AI Active'}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border" style={{ background: 'rgba(200,200,208,0.08)', borderColor: 'rgba(200,200,208,0.2)' }}>
                    <Sparkles className="w-3 h-3" style={{ color: PLAT }} />
                    <span className="text-xs font-medium" style={{ color: PLAT2 }}>{isRtl ? 'מוביל בישראל' : 'Israel #1'}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator — desktop */}
        <motion.div
          animate={{ y: [0, 8, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2.2, repeat: Infinity }}
          className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5"
        >
          <div className="w-px h-8" style={{ background: `linear-gradient(to bottom, transparent, ${PLAT}60)` }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: PLAT }} />
        </motion.div>

        {/* Scroll indicator — mobile */}
        <div className="absolute bottom-4 left-0 right-0">
          <ScrollDownArrow />
        </div>
      </section>



      {/* ══════════════════════════════════════════
          STATS — Thin dark stripe
      ══════════════════════════════════════════ */}
      <section className="py-10 md:py-14 border-y" style={{ background: OBS2, borderColor: 'rgba(200,200,208,0.1)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-1" style={{ color: WHITE }}>{stat.value}</div>
                <div className="text-xs md:text-sm tracking-wide uppercase" style={{ color: DIM }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PILLARS — Pure white
      ══════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px', amount: 0 }}
            transition={{ duration: 0.65 }}
            className="text-center mb-10 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: OBS }}>{t.home.pillars_title}</h2>
            <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">{t.home.pillars_sub}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                >
                  <Link href={pillar.href}>
                    <div
                      className="group bg-white border border-gray-100 rounded-2xl p-5 md:p-6 h-full flex flex-col items-center text-center cursor-pointer transition-all duration-300"
                      style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLDivElement;
                        el.style.borderColor = OBS;
                        el.style.boxShadow = `0 8px 40px rgba(0,0,0,0.12)`;
                        el.style.transform = 'translateY(-3px)';
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLDivElement;
                        el.style.borderColor = '#f3f4f6';
                        el.style.boxShadow = '0 2px 16px rgba(0,0,0,0.05)';
                        el.style.transform = 'translateY(0)';
                      }}
                    >
                      <MetallicSphere variant={pillar.sphereVariant} size={110} />
                      <h3 className="text-lg md:text-xl font-bold mt-4 mb-3 transition-colors" style={{ color: OBS }}>{pillar.title}</h3>
                      <p className="text-gray-500 leading-relaxed text-sm flex-1">{pillar.desc}</p>
                      <div className="mt-5 flex items-center gap-2 text-sm font-semibold" style={{ color: '#555' }}>
                        <span>{isRtl ? 'קרא עוד' : 'Learn more'}</span>
                        <ArrowIcon size={14} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHY US — Off-white #F5F5F5
      ══════════════════════════════════════════ */}
      <section className="py-16 md:py-24" style={{ background: '#F5F5F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 36 : -36 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px', amount: 0 }}
              transition={{ duration: 0.75 }}
            >
              <img
                src={TRAINING_IMAGE}
                alt={isRtl ? 'הכשרות AI' : 'AI Training'}
                className="rounded-2xl w-full h-auto"
                style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.14)' }}
              />
            </motion.div>
            <div className={isRtl ? 'text-right' : 'text-left'}>
              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                style={{ color: OBS }}
              >
                {t.home.why_title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-gray-500 text-base md:text-lg mb-8 md:mb-10"
              >
                {t.home.why_sub}
              </motion.p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                {whyUs.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: i * 0.09 }}
                      className="flex items-start gap-3 md:gap-4"
                    >
                      <div className="flex-shrink-0 p-2 rounded-lg" style={{ background: OBS, }}>
                        <Icon className="w-5 h-5" style={{ color: PLAT }} />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1 text-sm md:text-base" style={{ color: OBS }}>{item.title}</h4>
                        <p className="text-gray-500 text-xs md:text-sm">{item.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          HOW IT WORKS — White
      ══════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px', amount: 0 }}
            transition={{ duration: 0.65 }}
            className="text-center mb-10 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: OBS }}>{t.home.how_title}</h2>
            <p className="text-gray-500 text-base md:text-lg">{t.home.how_sub}</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative text-center"
              >
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px z-0" style={{ background: 'linear-gradient(to right, #d1d5db, transparent)' }} />
                )}
                <div className="relative z-10">
                  <div
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 border"
                    style={{ background: OBS, borderColor: 'transparent' }}
                  >
                    <span className="text-xl md:text-2xl font-bold" style={{ color: PLAT }}>{step.num}</span>
                  </div>
                  <h4 className="font-bold mb-2 text-sm md:text-base" style={{ color: OBS }}>{step.title}</h4>
                  <p className="text-gray-500 text-xs md:text-sm">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PARTNERS — #F5F5F5
      ══════════════════════════════════════════ */}
      <section className="py-14 md:py-20 border-y border-gray-100" style={{ background: '#F5F5F5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px', amount: 0 }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: OBS }}>{t.home.partners_title}</h2>
            <p className="text-gray-500 text-sm md:text-base">{t.home.partners_sub}</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 items-center">
            {PARTNERS.map((partner, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="rounded-xl p-3 md:p-4 flex items-center justify-center h-20 md:h-24 border transition-all duration-300 cursor-pointer"
                style={{
                  background: (partner as any).darkBg ? '#1a1a1a' : WHITE,
                  borderColor: '#e5e7eb',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = OBS;
                  el.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
                  el.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = '#e5e7eb';
                  el.style.boxShadow = 'none';
                  el.style.transform = 'translateY(0)';
                }}
              >
                <img src={partner.url} alt={partner.name} className="max-h-10 md:max-h-14 max-w-full object-contain opacity-70 hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA — Obsidian black
      ══════════════════════════════════════════ */}
      <section className="py-16 md:py-28 relative overflow-hidden" style={{ background: OBS }}>
        {/* Subtle grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `radial-gradient(circle, rgba(200,200,208,0.06) 1px, transparent 1px)`,
          backgroundSize: '44px 44px',
        }} />
        {/* Platinum glow center */}
        <motion.div
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 7, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${PLAT}18 0%, transparent 65%)` }}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px', amount: 0 }}
            transition={{ duration: 0.75 }}
          >
            {/* Thin platinum divider */}
            <div className="flex items-center justify-center gap-5 mb-7 md:mb-9">
              <div className="h-px w-20 md:w-32" style={{ background: `linear-gradient(to right, transparent, ${PLAT}50)` }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: PLAT }} />
              <div className="h-px w-20 md:w-32" style={{ background: `linear-gradient(to left, transparent, ${PLAT}50)` }} />
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6" style={{ color: WHITE }}>{t.home.final_title}</h2>
            <p className="text-base md:text-xl mb-8 md:mb-10 max-w-2xl mx-auto" style={{ color: DIM }}>{t.home.final_sub}</p>

            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: `0 0 40px rgba(200,200,208,0.4)` }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 md:px-12 md:py-5 rounded-xl font-bold text-base md:text-lg transition-all"
                style={{ background: WHITE, color: OBS }}
              >
                {t.home.final_cta}
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
}
