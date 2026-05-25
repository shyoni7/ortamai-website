import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Zap, Users, Briefcase, CheckCircle, Star, Award, TrendingUp, Brain, Sparkles, Cpu, Rocket } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import GradientButton from '@/components/GradientButton';
import HologramCube from '@/components/HologramCube';

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
  { name: 'ההסתדרות', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663445418346/WKUUzzJlnhdfzzJB.png' },
  { name: 'בנק לאומי', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663445418346/COWyaNxVzekIQanP.png' },
  { name: 'CyberGo', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663445418346/ZMeUfaAopZDjYSah.webp' },
];

// Design tokens — Hybrid Premium
const GOLD = '#D4A017';
const GOLD_LIGHT = '#F0C040';
const DARK_BG = '#0A0A0F';
const DARK_CARD = '#111118';
const DARK_BORDER = 'rgba(212,160,23,0.18)';
const SILVER = '#8B8FA8';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function Home() {
  const { t, lang, dir } = useLanguage();
  const isRtl = lang === 'he';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const stats = [
    { value: '30+', label: t.stats.programs },
    { value: '98%', label: t.stats.satisfaction },
    { value: '300+', label: t.stats.graduates },
    { value: '10+', label: t.stats.partners },
  ];

  const pillars = [
    {
      icon: Zap,
      title: isRtl ? 'אקסלרטור ליזמים ועסקים' : 'Business Accelerator',
      desc: isRtl ? 'בנו את העסק שלכם עם AI ותקדמו מהר יותר מאי פעם. ליווי אישי, כלים מתקדמים וקהילה תומכת.' : 'Build your business with AI and grow faster than ever. Personal guidance, advanced tools, and a supportive community.',
      href: '/incubator',
      cubeColor: '#D4A017',
      holoLines: isRtl ? ['יזמות AI', 'ליווי אישי'] : ['AI Ventures', 'Personal Guidance'],
    },
    {
      icon: Users,
      title: isRtl ? 'מרכז הכשרות' : 'Training Center',
      desc: isRtl ? 'קורסים מתקדמים בעולם ה-AI מהמומחים שלנו. הכשרות ייעודיות לארגונים, עסקים ואנשים פרטיים.' : 'Advanced AI courses from our experts. Dedicated training for organizations, businesses, and individuals.',
      href: '/academy',
      cubeColor: '#8B8FA8',
      holoLines: isRtl ? ['קורסי AI', 'הכשרות ייעודיות'] : ['AI Courses', 'Expert Training'],
    },
    {
      icon: Briefcase,
      title: isRtl ? 'מרכז השמה' : 'Placement Center',
      desc: isRtl ? 'גישור בין מועמדים מוכשרים לארגונים מובילים. אנחנו מחברים בין כישרון לבין הזדמנות.' : 'Bridging talented candidates with leading organizations. We connect talent with opportunity.',
      href: '/placement',
      cubeColor: '#C0C0C0',
      holoLines: isRtl ? ['השמה מקצועית', 'כישרון + הזדמנות'] : ['Professional Placement', 'Talent + Opportunity'],
    },
  ];

  const whyUs = [
    { icon: Award, title: isRtl ? 'מומחיות מוכחת' : 'Proven Expertise', desc: isRtl ? 'צוות מומחים עם ניסיון רב בתחום ה-AI' : 'Expert team with extensive AI experience' },
    { icon: Star, title: isRtl ? 'גישה מותאמת אישית' : 'Personalized Approach', desc: isRtl ? 'כל לקוח מקבל תוכנית מותאמת לצרכיו' : 'Each client gets a tailored plan' },
    { icon: TrendingUp, title: isRtl ? 'תוצאות מדידות' : 'Measurable Results', desc: isRtl ? 'אנו מתמקדים בתוצאות אמיתיות ומדידות' : 'We focus on real, measurable outcomes' },
    { icon: CheckCircle, title: isRtl ? 'קהילה תומכת' : 'Supportive Community', desc: isRtl ? 'הצטרף לקהילה של יזמים ומקצוענים' : 'Join a community of entrepreneurs and professionals' },
  ];

  const steps = [
    { num: '01', title: isRtl ? 'פגישת היכרות' : 'Introduction Meeting', desc: isRtl ? 'נבין את הצרכים והמטרות שלך' : 'We understand your needs and goals' },
    { num: '02', title: isRtl ? 'תוכנית מותאמת' : 'Custom Plan', desc: isRtl ? 'נבנה תוכנית עבודה מותאמת אישית' : 'We build a personalized work plan' },
    { num: '03', title: isRtl ? 'ליווי ויישום' : 'Guidance & Implementation', desc: isRtl ? 'נלווה אותך לאורך כל הדרך' : 'We guide you every step of the way' },
    { num: '04', title: isRtl ? 'תוצאות ומדידה' : 'Results & Measurement', desc: isRtl ? 'נמדוד ונשפר את התוצאות' : 'We measure and improve results' },
  ];

  return (
    <div dir={dir}>

      {/* ══════════════════════════════════════════════════════
          HERO — Dark luxury with gold accents
      ══════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
        style={{ background: DARK_BG }}
      >
        {/* Subtle noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
        }} />

        {/* Fine grid lines */}
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(212,160,23,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(212,160,23,0.04) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />

        {/* Gold glow orb — top right */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.4, 0.25] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${GOLD}30 0%, transparent 70%)` }}
        />
        {/* Silver glow orb — bottom left */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${SILVER}25 0%, transparent 70%)` }}
        />

        {/* ── Main content ── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-center">

            {/* ── Text column ── */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className={isRtl ? 'text-center md:text-right order-1' : 'text-center md:text-left order-1'}
            >
              {/* Badge */}
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-4 md:mb-8">
                <motion.div
                  animate={{ boxShadow: [`0 0 0px ${GOLD}00`, `0 0 20px ${GOLD}50`, `0 0 0px ${GOLD}00`] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full border"
                  style={{
                    background: `rgba(212,160,23,0.08)`,
                    borderColor: `rgba(212,160,23,0.35)`,
                  }}
                >
                  <Sparkles className="w-3 h-3 md:w-4 md:h-4" style={{ color: GOLD }} />
                  <span className="text-xs md:text-sm font-semibold" style={{ color: GOLD_LIGHT }}>
                    {isRtl ? 'מרכז פיתוח AI מוביל בישראל' : "Israel's Leading AI Development Center"}
                  </span>
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: GOLD }} />
                </motion.div>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={fadeUp}
                className="font-bold mb-3 md:mb-6 leading-tight text-white"
                style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)' }}
              >
                {isRtl ? (
                  <>
                    <span className="text-white">המרכז לפיתוח </span>
                    <span style={{
                      background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 50%, ${GOLD} 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>AI</span>
                  </>
                ) : (
                  <>
                    <span className="text-white">The </span>
                    <span style={{
                      background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 50%, ${GOLD} 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>AI</span>
                    <span className="text-white"> Development Hub</span>
                  </>
                )}
              </motion.h1>

              <motion.p variants={fadeUp} className="text-base md:text-xl mb-2 md:mb-4 font-medium" style={{ color: 'rgba(255,255,255,0.75)' }}>
                {t.home.hero_subtitle}
              </motion.p>

              <motion.p variants={fadeUp} className="text-sm md:text-base mb-5 md:mb-10 leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                {t.home.hero_desc}
              </motion.p>

              {/* Mini stats row */}
              <motion.div variants={fadeUp} className="flex flex-wrap justify-center md:justify-start gap-5 md:gap-8 mb-6 md:mb-10">
                {[
                  { v: '300+', l: isRtl ? 'בוגרים' : 'Graduates' },
                  { v: '98%', l: isRtl ? 'שביעות רצון' : 'Satisfaction' },
                  { v: '10+', l: isRtl ? 'שותפים' : 'Partners' },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold" style={{ color: GOLD }}>{s.v}</div>
                    <div className="text-xs mt-0.5" style={{ color: SILVER }}>{s.l}</div>
                  </div>
                ))}
              </motion.div>

              {/* CTA buttons */}
              <motion.div variants={fadeUp} className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4">
                {/* Primary gold CTA */}
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.04, boxShadow: `0 0 30px ${GOLD}60` }}
                    whileTap={{ scale: 0.97 }}
                    className="px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold text-sm md:text-base transition-all"
                    style={{
                      background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 100%)`,
                      color: '#0A0A0F',
                      boxShadow: `0 4px 24px ${GOLD}40`,
                    }}
                  >
                    {t.home.cta}
                  </motion.button>
                </Link>
                {/* Secondary ghost CTA */}
                <Link href="/about">
                  <motion.button
                    whileHover={{ scale: 1.03, borderColor: GOLD, color: GOLD_LIGHT }}
                    whileTap={{ scale: 0.97 }}
                    className="px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold text-sm md:text-base border transition-all"
                    style={{
                      borderColor: 'rgba(255,255,255,0.2)',
                      color: 'rgba(255,255,255,0.75)',
                      background: 'rgba(255,255,255,0.04)',
                    }}
                  >
                    {t.home.cta_secondary}
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

            {/* ── Video column — hidden on mobile (shown in section below) ── */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, type: 'spring', stiffness: 60 }}
              className="relative order-2 hidden lg:block"
            >
              {/* Floating badge — top */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-5 -right-4 z-20 flex items-center gap-2 px-3 py-2 rounded-xl border"
                style={{ background: DARK_CARD, borderColor: DARK_BORDER }}
              >
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` }}>
                  <Brain className="w-4 h-4" style={{ color: DARK_BG }} />
                </div>
                <div>
                  <div className="text-xs font-bold leading-none text-white">{isRtl ? 'AI חכם' : 'Smart AI'}</div>
                  <div className="text-xs leading-none mt-0.5" style={{ color: SILVER }}>{isRtl ? 'פתרונות מתקדמים' : 'Advanced'}</div>
                </div>
              </motion.div>

              {/* Floating badge — bottom */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                className="absolute -bottom-5 -left-4 z-20 flex items-center gap-2 px-3 py-2 rounded-xl border"
                style={{ background: DARK_CARD, borderColor: DARK_BORDER }}
              >
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${SILVER}, #C0C0C0)` }}>
                  <Rocket className="w-4 h-4" style={{ color: DARK_BG }} />
                </div>
                <div>
                  <div className="text-xs font-bold leading-none text-white">{isRtl ? 'אקסלרטור' : 'Accelerator'}</div>
                  <div className="text-xs leading-none mt-0.5" style={{ color: SILVER }}>{isRtl ? 'צמיחה מהירה' : 'Fast Growth'}</div>
                </div>
              </motion.div>

              {/* Video frame */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative rounded-2xl overflow-hidden border"
                style={{
                  background: DARK_CARD,
                  borderColor: DARK_BORDER,
                  boxShadow: `0 30px 80px rgba(0,0,0,0.6), 0 0 60px ${GOLD}15`,
                }}
              >
                {/* Chrome top bar */}
                <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ background: 'rgba(255,255,255,0.04)', borderColor: DARK_BORDER }}>
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  <div className="flex-1 mx-3 h-5 rounded-full flex items-center px-3" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <span className="text-xs" style={{ color: SILVER }}>ortamai.ai</span>
                  </div>
                </div>
                <video
                  src={HERO_VIDEO}
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={HERO_IMAGE}
                  className="w-full h-auto object-cover"
                />
                {/* Overlay badges */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <motion.div
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border"
                    style={{ background: 'rgba(10,10,15,0.85)', borderColor: 'rgba(255,255,255,0.1)' }}
                  >
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs font-semibold text-white">{isRtl ? 'AI פעיל' : 'AI Active'}</span>
                  </motion.div>
                  <motion.div
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border"
                    style={{ background: `rgba(212,160,23,0.12)`, borderColor: `rgba(212,160,23,0.3)` }}
                  >
                    <Sparkles className="w-3 h-3" style={{ color: GOLD }} />
                    <span className="text-xs font-semibold" style={{ color: GOLD_LIGHT }}>{isRtl ? 'מוביל בישראל' : 'Israel #1'}</span>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        >
          <div className="w-px h-8" style={{ background: `linear-gradient(to bottom, transparent, ${GOLD}80)` }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: GOLD }} />
        </motion.div>
      </section>

      {/* ── Mobile Video Section — only on mobile/tablet ── */}
      <section className="lg:hidden px-4 py-6" style={{ background: DARK_BG }}>
        <div className="max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-2xl overflow-hidden border"
            style={{ background: DARK_CARD, borderColor: DARK_BORDER, boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${GOLD}10` }}
          >
            <div className="flex items-center gap-2 px-4 py-2 border-b" style={{ background: 'rgba(255,255,255,0.04)', borderColor: DARK_BORDER }}>
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              <div className="flex-1 mx-3 h-4 rounded-full flex items-center px-3" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <span className="text-xs" style={{ color: SILVER }}>ortamai.ai</span>
              </div>
            </div>
            <video src={HERO_VIDEO} autoPlay loop muted playsInline poster={HERO_IMAGE} className="w-full h-auto object-cover" />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          STATS — Dark stripe with gold numbers
      ══════════════════════════════════════════════════════ */}
      <section className="py-10 md:py-16 border-y" style={{ background: '#0D0D14', borderColor: DARK_BORDER }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-1" style={{ color: GOLD }}>{stat.value}</div>
                <div className="text-xs md:text-sm" style={{ color: SILVER }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PILLARS — White background, clean cards
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px', amount: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-10 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">{t.home.pillars_title}</h2>
            <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">{t.home.pillars_sub}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {pillars.map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group"
              >
                <Link href={pillar.href}>
                  <div
                    className="bg-white border border-gray-100 rounded-2xl p-5 md:p-6 transition-all duration-300 cursor-pointer h-full flex flex-col items-center text-center"
                    style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = GOLD;
                      (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 40px ${GOLD}20`;
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = '#f3f4f6';
                      (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 20px rgba(0,0,0,0.06)';
                    }}
                  >
                    <HologramCube color={pillar.cubeColor} title={pillar.title} lines={pillar.holoLines} />
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mt-4 mb-3 group-hover:text-amber-600 transition-colors">{pillar.title}</h3>
                    <p className="text-gray-500 leading-relaxed text-sm flex-1">{pillar.desc}</p>
                    <div className="mt-5 flex items-center gap-2 text-sm font-semibold transition-colors group-hover:opacity-100 opacity-70" style={{ color: GOLD }}>
                      <span>{isRtl ? 'קרא עוד' : 'Learn more'}</span>
                      <ArrowIcon size={14} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WHY US — Very light gray
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24" style={{ background: '#F8F8F8' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px', amount: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={TRAINING_IMAGE}
                alt={isRtl ? 'הכשרות AI' : 'AI Training'}
                className="rounded-2xl w-full h-auto"
                style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}
              />
            </motion.div>
            <div className={isRtl ? 'text-right' : 'text-left'}>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
              >
                {t.home.why_title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
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
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="flex items-start gap-3 md:gap-4"
                    >
                      <div className="flex-shrink-0 p-2 rounded-lg" style={{ background: `${GOLD}15` }}>
                        <Icon className="w-5 h-5" style={{ color: GOLD }} />
                      </div>
                      <div>
                        <h4 className="text-gray-900 font-semibold mb-1 text-sm md:text-base">{item.title}</h4>
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

      {/* ══════════════════════════════════════════════════════
          HOW IT WORKS — White background
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px', amount: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-10 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">{t.home.how_title}</h2>
            <p className="text-gray-500 text-base md:text-lg">{t.home.how_sub}</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative text-center"
              >
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px z-0" style={{ background: `linear-gradient(to right, ${GOLD}50, transparent)` }} />
                )}
                <div className="relative z-10">
                  <div
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-2"
                    style={{ background: `${GOLD}10`, borderColor: `${GOLD}40` }}
                  >
                    <span className="text-xl md:text-2xl font-bold" style={{ color: GOLD }}>{step.num}</span>
                  </div>
                  <h4 className="text-gray-900 font-bold mb-2 text-sm md:text-base">{step.title}</h4>
                  <p className="text-gray-500 text-xs md:text-sm">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PARTNERS — Light gray
      ══════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20 border-y border-gray-100" style={{ background: '#F8F8F8' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px', amount: 0 }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{t.home.partners_title}</h2>
            <p className="text-gray-500 text-sm md:text-base">{t.home.partners_sub}</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 items-center">
            {PARTNERS.map((partner, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-xl p-3 md:p-4 flex items-center justify-center h-20 md:h-24 border transition-all duration-300"
                style={{
                  background: (partner as any).darkBg ? '#1a1a1a' : 'white',
                  borderColor: '#e5e7eb',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = GOLD;
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 4px 20px ${GOLD}20`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = '#e5e7eb';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                }}
              >
                <img
                  src={partner.url}
                  alt={partner.name}
                  className="max-h-10 md:max-h-14 max-w-full object-contain opacity-75 hover:opacity-100 transition-opacity"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CTA — Dark luxury with gold
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-28 relative overflow-hidden" style={{ background: DARK_BG }}>
        {/* Grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(212,160,23,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(212,160,23,0.04) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
        {/* Gold glow center */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${GOLD}25 0%, transparent 70%)` }}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px', amount: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Gold divider line */}
            <div className="flex items-center justify-center gap-4 mb-6 md:mb-8">
              <div className="h-px w-16 md:w-24" style={{ background: `linear-gradient(to right, transparent, ${GOLD}80)` }} />
              <Sparkles className="w-5 h-5" style={{ color: GOLD }} />
              <div className="h-px w-16 md:w-24" style={{ background: `linear-gradient(to left, transparent, ${GOLD}80)` }} />
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">{t.home.final_title}</h2>
            <p className="text-base md:text-xl mb-8 md:mb-10 max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.55)' }}>{t.home.final_sub}</p>

            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: `0 0 40px ${GOLD}70` }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 md:px-12 md:py-5 rounded-xl font-bold text-base md:text-lg transition-all"
                style={{
                  background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 100%)`,
                  color: '#0A0A0F',
                  boxShadow: `0 4px 30px ${GOLD}50`,
                }}
              >
                {t.home.final_cta}
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
