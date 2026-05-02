import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Zap, Users, Briefcase, CheckCircle, Star, Award, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import GradientButton from '@/components/GradientButton';
import HologramCube from '@/components/HologramCube';

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
      color: 'from-purple-500 to-violet-600',
      cubeColor: '#A855F7',
      holoLines: isRtl ? ['יזמות AI', 'ליווי אישי'] : ['AI Ventures', 'Personal Guidance'],
    },
    {
      icon: Users,
      title: isRtl ? 'מרכז הכשרות' : 'Training Center',
      desc: isRtl ? 'קורסים מתקדמים בעולם ה-AI מהמומחים שלנו. הכשרות ייעודיות לארגונים, עסקים ואנשים פרטיים.' : 'Advanced AI courses from our experts. Dedicated training for organizations, businesses, and individuals.',
      href: '/academy',
      color: 'from-violet-700 to-purple-400',
      cubeColor: '#7C3AED',
      holoLines: isRtl ? ['קורסי AI', 'הכשרות ייעודיות'] : ['AI Courses', 'Expert Training'],
    },
    {
      icon: Briefcase,
      title: isRtl ? 'מרכז השמה' : 'Placement Center',
      desc: isRtl ? 'גישור בין מועמדים מוכשרים לארגונים מובילים. אנחנו מחברים בין כישרון לבין הזדמנות.' : 'Bridging talented candidates with leading organizations. We connect talent with opportunity.',
      href: '/placement',
      color: 'from-purple-400 to-violet-500',
      cubeColor: '#C084FC',
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
      {/* Hero Section — light silver/white background with purple accents */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-purple-50">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 grid-pattern opacity-40" />

        {/* Soft purple orbs */}
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-violet-200/30 rounded-full blur-3xl"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text content */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className={isRtl ? 'text-right' : 'text-left'}
            >
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-6">
                <div className="bg-purple-100 border border-purple-200 px-4 py-2 rounded-full">
                  <span className="text-sm font-semibold text-purple-700">
                    {isRtl ? '🚀 מרכז פיתוח AI מוביל בישראל' : '🚀 Israel\'s Leading AI Development Center'}
                  </span>
                </div>
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="text-gradient-cyan">{t.home.hero_title}</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="text-xl md:text-2xl text-gray-700 mb-3 font-medium">
                {t.home.hero_subtitle}
              </motion.p>

              <motion.p variants={fadeUp} className="text-base text-gray-500 mb-10">
                {t.home.hero_desc}
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                <GradientButton href="/contact" size="lg">
                  {t.home.cta}
                </GradientButton>
                <Link href="/about">
                  <motion.button
                    className="btn-secondary text-base px-8 py-4"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {t.home.cta_secondary}
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Hero video */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-purple-200/50 border border-purple-100">
                <video
                  src={HERO_VIDEO}
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={HERO_IMAGE}
                  className="w-full h-auto object-cover rounded-2xl"
                />
                {/* Decorative corner accents */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-purple-400/50 rounded-tl-2xl" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-purple-400/30 rounded-br-2xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section — light gray stripe */}
      <section className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, i) => (
              <motion.div key={i} variants={fadeUp} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-gradient-cyan mb-2">{stat.value}</div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pillars Section — white background */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">{t.home.pillars_title}</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">{t.home.pillars_sub}</p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {pillars.map((pillar, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-100/50 transition-all duration-300 group cursor-pointer"
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
                    <h3 className="text-xl font-bold text-gray-900 mt-4 mb-3 group-hover:text-purple-600 transition-colors">{pillar.title}</h3>
                    <p className="text-gray-500 leading-relaxed text-sm">{pillar.desc}</p>
                    <div className="mt-5 flex items-center gap-2 text-purple-600 text-sm font-medium">
                      <span>{isRtl ? 'קרא עוד' : 'Learn more'}</span>
                      <ArrowIcon size={14} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Us Section — light purple-tinted background */}
      <section className="py-24 bg-gradient-to-br from-purple-50 via-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={TRAINING_IMAGE}
                alt={isRtl ? 'הכשרות AI' : 'AI Training'}
                className="rounded-2xl w-full h-auto shadow-xl shadow-purple-100/50"
              />
            </motion.div>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={isRtl ? 'text-right' : 'text-left'}
            >
              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {t.home.why_title}
              </motion.h2>
              <motion.p variants={fadeUp} className="text-gray-500 text-lg mb-10">
                {t.home.why_sub}
              </motion.p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {whyUs.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div key={i} variants={fadeUp} className="flex items-start gap-4">
                      <div className="flex-shrink-0 p-2 rounded-lg bg-purple-100">
                        <Icon className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="text-gray-900 font-semibold mb-1">{item.title}</h4>
                        <p className="text-gray-500 text-sm">{item.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works — white background */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t.home.how_title}</h2>
            <p className="text-gray-500 text-lg">{t.home.how_sub}</p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {steps.map((step, i) => (
              <motion.div key={i} variants={fadeUp} className="relative text-center">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-purple-300/70 to-transparent z-0" />
                )}
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-full bg-purple-50 border-2 border-purple-200 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-gradient-cyan">{step.num}</span>
                  </div>
                  <h4 className="text-gray-900 font-bold mb-2">{step.title}</h4>
                  <p className="text-gray-500 text-sm">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Partners Section — light gray background */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.home.partners_title}</h2>
            <p className="text-gray-500">{t.home.partners_sub}</p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center"
          >
            {PARTNERS.map((partner, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white border border-gray-100 rounded-xl p-4 flex items-center justify-center h-20 hover:border-purple-200 hover:shadow-md transition-all"
              >
                <img
                  src={partner.url}
                  alt={partner.name}
                  className="max-h-12 max-w-full object-contain opacity-70 hover:opacity-100 transition-all"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section — dark purple background for contrast */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-[#1A1A2E] via-[#2D1B69] to-[#1A1A2E]">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{t.home.final_title}</h2>
            <p className="text-gray-300 text-xl mb-10 max-w-2xl mx-auto">{t.home.final_sub}</p>
            <GradientButton href="/contact" size="lg">
              {t.home.final_cta}
            </GradientButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
