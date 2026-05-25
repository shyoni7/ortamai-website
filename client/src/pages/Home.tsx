import React from 'react';
import { Link } from 'wouter';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowLeft, ArrowRight, Zap, Users, Briefcase, CheckCircle, Star, Award, TrendingUp, Brain, Sparkles, Cpu, Rocket } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import GradientButton from '@/components/GradientButton';
import HologramCube from '@/components/HologramCube';
import { useRef } from 'react';

const HERO_VIDEO = 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663445418346/sLtfKJCObxnFJgJI.mp4';
const HERO_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663445418346/oDFneUKwvw2xJYXYaumUdB/a00800906_______________ai______________1ztf6h7ulzz1cg0t1nwp_1_450c2a58.png';
const TRAINING_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663445418346/oDFneUKwvw2xJYXYaumUdB/81fe03d01_create_a_professional_and_modern_image_for_a_website_that_promotes_ai_training_programs_the_image_s_y01604j7g7gqe2rbe6tu_0_2b7c34bf.png';

// Accessibility logo URL - used for the floating accessibility button
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
      color: 'from-blue-700 to-blue-900',
      cubeColor: '#4B6CB7',
      holoLines: isRtl ? ['יזמות AI', 'ליווי אישי'] : ['AI Ventures', 'Personal Guidance'],
    },
    {
      icon: Users,
      title: isRtl ? 'מרכז הכשרות' : 'Training Center',
      desc: isRtl ? 'קורסים מתקדמים בעולם ה-AI מהמומחים שלנו. הכשרות ייעודיות לארגונים, עסקים ואנשים פרטיים.' : 'Advanced AI courses from our experts. Dedicated training for organizations, businesses, and individuals.',
      href: '/academy',
      color: 'from-blue-700 to-blue-900',
      cubeColor: '#2D3A6B',
      holoLines: isRtl ? ['קורסי AI', 'הכשרות ייעודיות'] : ['AI Courses', 'Expert Training'],
    },
    {
      icon: Briefcase,
      title: isRtl ? 'מרכז השמה' : 'Placement Center',
      desc: isRtl ? 'גישור בין מועמדים מוכשרים לארגונים מובילים. אנחנו מחברים בין כישרון לבין הזדמנות.' : 'Bridging talented candidates with leading organizations. We connect talent with opportunity.',
      href: '/placement',
      color: 'from-blue-700 to-blue-900',
      cubeColor: '#8899BB',
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
      {/* ── HERO ── Modern 3D redesign */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #f0f4fb 0%, #ffffff 40%, #eaf0f8 70%, #dce8f5 100%)' }}>

        {/* Animated dot-grid background */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #4B6CB720 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />

        {/* 3D Sphere — large, top-right — hidden on mobile to prevent overflow */}
        <motion.div
          animate={{ y: [0, -28, 0], x: [0, 12, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="sphere-3d sphere-3d-primary absolute -top-24 -right-24 w-[320px] h-[320px] md:w-[520px] md:h-[520px] opacity-60 md:opacity-70 pointer-events-none"
        />

        {/* 3D Sphere — medium, bottom-left — smaller on mobile */}
        <motion.div
          animate={{ y: [0, 22, 0], x: [0, -14, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="sphere-3d sphere-3d-secondary absolute -bottom-32 -left-32 w-[260px] h-[260px] md:w-[420px] md:h-[420px] opacity-50 md:opacity-60 pointer-events-none"
        />

        {/* 3D Sphere — small accent — hidden on mobile */}
        <motion.div
          animate={{ y: [0, -18, 0], x: [0, 20, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="sphere-3d sphere-3d-accent absolute top-1/2 left-[15%] w-48 h-48 opacity-50 hidden md:block pointer-events-none"
        />

        {/* ── Main content ── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-16 items-center">

            {/* ── Text column ── */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className={isRtl ? 'text-right order-1' : 'text-left order-1'}
            >
              {/* Badge */}
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-3 md:mb-8">
                <motion.div
                  animate={{ boxShadow: ['0 0 0px #4B6CB740', '0 0 20px #4B6CB760', '0 0 0px #4B6CB740'] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="flex items-center gap-2 bg-white border border-blue-300 px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-sm"
                >
                  <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-blue-600" />
                  <span className="text-xs md:text-sm font-semibold text-blue-800">
                    {isRtl ? 'מרכז פיתוח AI מוביל בישראל' : "Israel's Leading AI Development Center"}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                </motion.div>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={fadeUp}
                className="font-bold mb-2 md:mb-6 leading-tight"
                style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)' }}
              >
                <span className="text-gradient-cyan">{t.home.hero_title}</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="text-lg md:text-xl lg:text-2xl text-gray-700 mb-3 font-medium">
                {t.home.hero_subtitle}
              </motion.p>

              <motion.p variants={fadeUp} className="text-sm md:text-base text-gray-500 mb-4 md:mb-10 leading-relaxed">
                {t.home.hero_desc}
              </motion.p>

              {/* Mini stats row */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-3 md:gap-6 mb-5 md:mb-10">
                {[{ v: '300+', l: isRtl ? 'בוגרים' : 'Graduates' }, { v: '98%', l: isRtl ? 'שביעות רצון' : 'Satisfaction' }, { v: '10+', l: isRtl ? 'שותפים' : 'Partners' }].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="text-xl md:text-2xl font-bold" style={{ color: '#F59E0B' }}>{s.v}</div>
                    <div className="text-xs text-gray-400">{s.l}</div>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-3 md:gap-4">
                <GradientButton href="/contact" size="md">
                  {t.home.cta}
                </GradientButton>
                <Link href="/about">
                  <motion.button
                    className="btn-secondary text-sm md:text-base px-5 py-3 md:px-8 md:py-4"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {t.home.cta_secondary}
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

            {/* ── Video/visual column — hidden on mobile (shown in section below) ── */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, type: 'spring', stiffness: 60 }}
              className="relative order-2 pt-2 pb-2 px-1 md:pt-8 md:pb-8 md:px-6 hidden lg:block"
            >
              {/* Floating badge — top right of video column — hidden on small mobile */}
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-5 -right-4 z-20 hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl border border-blue-300/70 backdrop-blur-md shadow-lg"
                style={{ background: 'rgba(255,255,255,0.88)' }}
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-800 leading-none">{isRtl ? 'AI חכם' : 'Smart AI'}</div>
                  <div className="text-xs text-gray-400 leading-none mt-0.5">{isRtl ? 'פתרונות מתקדמים' : 'Advanced'}</div>
                </div>
              </motion.div>

              {/* Floating badge — bottom left of video column — hidden on small mobile */}
              <motion.div
                animate={{ y: [0, 8, 0], rotate: [0, -1.5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                className="absolute -bottom-5 -left-4 z-20 hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl border border-blue-300/70 backdrop-blur-md shadow-lg"
                style={{ background: 'rgba(255,255,255,0.88)' }}
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center">
                  <Rocket className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-800 leading-none">{isRtl ? 'אקסלרטור' : 'Accelerator'}</div>
                  <div className="text-xs text-gray-400 leading-none mt-0.5">{isRtl ? 'צמיחה מהירה' : 'Fast Growth'}</div>
                </div>
              </motion.div>

              {/* Glow ring behind card */}
              <div className="absolute inset-0 rounded-3xl" style={{ background: 'radial-gradient(ellipse at center, #4B6CB730 0%, transparent 70%)', transform: 'scale(1.1)', zIndex: 0 }} />

              {/* Main video card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-blue-300/60"
                style={{
                  background: 'rgba(255,255,255,0.6)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 30px 80px rgba(75,108,183,0.2), 0 0 0 1px rgba(75,108,183,0.15)',
                  zIndex: 1,
                }}
              >
                {/* Top bar — glass chrome */}
                <div className="flex items-center gap-2 px-4 py-2 md:py-3 border-b border-blue-300/60" style={{ background: 'rgba(255,255,255,0.8)' }}>
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-400" />
                  <div className="flex-1 mx-3 h-4 md:h-5 rounded-full bg-gray-100 flex items-center px-3">
                    <span className="text-xs text-gray-400">ortamai.ai</span>
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

                {/* Bottom overlay badge */}
                <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4 flex items-center justify-between">
                  <motion.div
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex items-center gap-1.5 md:gap-2 px-2 py-1.5 md:px-3 md:py-2 rounded-xl backdrop-blur-md border border-white/40"
                    style={{ background: 'rgba(255,255,255,0.75)' }}
                  >
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs font-semibold text-gray-700">{isRtl ? 'AI פעיל' : 'AI Active'}</span>
                  </motion.div>
                  <motion.div
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                    className="flex items-center gap-1.5 md:gap-2 px-2 py-1.5 md:px-3 md:py-2 rounded-xl backdrop-blur-md border border-blue-300/50"
                    style={{ background: 'rgba(75,108,183,0.15)' }}
                  >
                    <Sparkles className="w-3 h-3 text-blue-700" />
                    <span className="text-xs font-semibold text-blue-800">{isRtl ? 'מוביל בישראל' : 'Israel #1'}</span>
                  </motion.div>
                </div>
              </motion.div>

              {/* 3D depth shadow cards behind — hidden on mobile for cleanliness */}
              <div
                className="absolute inset-0 rounded-3xl -z-10 hidden sm:block"
                style={{
                  background: 'linear-gradient(135deg, #4B6CB720, #2D3A6B15)',
                  transform: 'translate(12px, 12px) scale(0.97)',
                  border: '1px solid rgba(75,108,183,0.2)',
                }}
              />
              <div
                className="absolute inset-0 rounded-3xl -z-20 hidden sm:block"
                style={{
                  background: 'linear-gradient(135deg, #4B6CB710, #2D3A6B08)',
                  transform: 'translate(22px, 22px) scale(0.94)',
                  border: '1px solid rgba(75,108,183,0.1)',
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Mobile Video Section — shown only on mobile/tablet, below hero ── */}
      <section className="lg:hidden px-4 py-6" style={{ background: 'linear-gradient(135deg, #f0f4fb 0%, #ffffff 60%, #eaf0f8 100%)' }}>
        <div className="max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-2xl overflow-hidden shadow-xl border border-blue-300/60"
            style={{ background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(12px)', boxShadow: '0 20px 60px rgba(75,108,183,0.2)' }}
          >
            {/* Top bar */}
            <div className="flex items-center gap-2 px-4 py-2 border-b border-blue-300/60" style={{ background: 'rgba(255,255,255,0.8)' }}>
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              <div className="flex-1 mx-3 h-4 rounded-full bg-gray-100 flex items-center px-3">
                <span className="text-xs text-gray-400">ortamai.ai</span>
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
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-xl backdrop-blur-md border border-white/40" style={{ background: 'rgba(255,255,255,0.75)' }}>
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-semibold text-gray-700">{isRtl ? 'AI פעיל' : 'AI Active'}</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-xl backdrop-blur-md border border-blue-300/50" style={{ background: 'rgba(75,108,183,0.15)' }}>
                <Sparkles className="w-3 h-3 text-blue-700" />
                <span className="text-xs font-semibold text-blue-800">{isRtl ? 'מוביל בישראל' : 'Israel #1'}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section — light gray stripe */}
      <section className="py-10 md:py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2" style={{ color: '#F59E0B' }}>{stat.value}</div>
                <div className="text-gray-500 text-xs md:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars Section — white background */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px", amount: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-10 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">{t.home.pillars_title}</h2>
            <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">{t.home.pillars_sub}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {pillars.map((pillar, i) => (
              <div
                key={i}
                className="bg-white border border-gray-100 rounded-2xl p-5 md:p-6 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-200/50 transition-all duration-300 group cursor-pointer"
              >
                <Link href={pillar.href}>
                  <div className="flex flex-col items-center text-center">
                    {/* Hologram cube animation */}
                    <HologramCube
                      color={pillar.cubeColor}
                      title={pillar.title}
                      lines={pillar.holoLines}
                    />
                    {/* Card text */}
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mt-4 mb-3 group-hover:text-blue-700 transition-colors">{pillar.title}</h3>
                    <p className="text-gray-500 leading-relaxed text-sm">{pillar.desc}</p>
                    <div className="mt-5 flex items-center gap-2 text-blue-700 text-sm font-medium">
                      <span>{isRtl ? 'קרא עוד' : 'Learn more'}</span>
                      <ArrowIcon size={14} />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section — light purple-tinted background */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 via-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px", amount: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={TRAINING_IMAGE}
                alt={isRtl ? 'הכשרות AI' : 'AI Training'}
                className="rounded-2xl w-full h-auto shadow-xl shadow-blue-200/50"
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
                    <div
                      key={i}
                      className="flex items-start gap-3 md:gap-4"
                    >
                      <div className="flex-shrink-0 p-2 rounded-lg" style={{ background: i % 2 === 0 ? 'rgba(245,158,11,0.12)' : 'rgb(243 232 255)' }}>
                        <Icon className="w-5 h-5" style={{ color: i % 2 === 0 ? '#F59E0B' : '#3A5298' }} />
                      </div>
                      <div>
                        <h4 className="text-gray-900 font-semibold mb-1 text-sm md:text-base">{item.title}</h4>
                        <p className="text-gray-500 text-xs md:text-sm">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works — white background */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px", amount: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-10 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">{t.home.how_title}</h2>
            <p className="text-gray-500 text-base md:text-lg">{t.home.how_sub}</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {steps.map((step, i) => (
              <div
                key={i}
                className="relative text-center"
              >
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-blue-300/70 to-transparent z-0" />
                )}
                <div className="relative z-10">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-blue-50 border-2 border-blue-300 flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl md:text-2xl font-bold text-gradient-cyan">{step.num}</span>
                  </div>
                  <h4 className="text-gray-900 font-bold mb-2 text-sm md:text-base">{step.title}</h4>
                  <p className="text-gray-500 text-xs md:text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section — light gray background */}
      <section className="py-14 md:py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px", amount: 0 }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{t.home.partners_title}</h2>
            <p className="text-gray-500 text-sm md:text-base">{t.home.partners_sub}</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 items-center">
            {PARTNERS.map((partner, i) => (
              <div
                key={i}
                className={`border rounded-xl p-3 md:p-4 flex items-center justify-center h-20 md:h-24 hover:border-blue-300 hover:shadow-md transition-all ${
                  (partner as any).darkBg
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-white border-gray-100'
                }`}
              >
                <img
                  src={partner.url}
                  alt={partner.name}
                  className="max-h-10 md:max-h-14 max-w-full object-contain opacity-80 hover:opacity-100 transition-all"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section — dark purple background for contrast */}
      <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-br from-[#0d1228] via-[#1a2a4a] to-[#0d1228]">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px", amount: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">{t.home.final_title}</h2>
            <p className="text-gray-300 text-base md:text-xl mb-8 md:mb-10 max-w-2xl mx-auto">{t.home.final_sub}</p>
            <GradientButton href="/contact" size="lg">
              {t.home.final_cta}
            </GradientButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
