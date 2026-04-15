import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Users, Briefcase } from 'lucide-react';

export default function Home() {
  const { lang, t } = useLanguage();
  const dir = lang === 'he' ? 'rtl' : 'ltr';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <div className="pt-20" dir={dir}>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 grid-pattern opacity-30" />

        {/* Animated Gradient Orbs */}
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 right-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        />

        {/* Content */}
        <motion.div
          className="container mx-auto px-4 relative z-10 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-block mb-6"
          >
            <div className="glass px-4 py-2 rounded-full">
              <span className="text-sm font-semibold text-cyan-400">
                {lang === 'he' ? '🚀 עתידני ומודרני' : '🚀 Futuristic & Modern'}
              </span>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              {t.home.hero_title}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-foreground/80 mb-4 max-w-2xl mx-auto"
          >
            {t.home.hero_subtitle}
          </motion.p>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg text-foreground/60 mb-8 max-w-2xl mx-auto"
          >
            {t.home.hero_desc}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button className="group relative px-8 py-4 rounded-lg font-semibold text-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-2 text-background group-hover:text-foreground transition-colors">
                {t.home.cta}
                <ArrowRight size={20} />
              </span>
            </button>
            <button className="px-8 py-4 rounded-lg font-semibold text-lg border border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 transition-colors">
              {lang === 'he' ? 'למד עוד' : 'Learn More'}
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Pillars Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.home.pillars_title}
            </h2>
            <p className="text-lg text-foreground/60">
              {t.home.pillars_sub}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: lang === 'he' ? 'אקסלרטור ליזמים ועסקים' : 'Business Accelerator',
                desc: lang === 'he' 
                  ? 'בנו את העסק שלכם עם AI ותקדמו מהר יותר מאי פעם'
                  : 'Build your business with AI and grow faster than ever'
              },
              {
                icon: Users,
                title: lang === 'he' ? 'מרכז הכשרות' : 'Training Center',
                desc: lang === 'he'
                  ? 'קורסים מתקדמים בעולם ה-AI מהמומחים שלנו'
                  : 'Advanced AI courses from our experts'
              },
              {
                icon: Briefcase,
                title: lang === 'he' ? 'מרכז השמה' : 'Placement Center',
                desc: lang === 'he'
                  ? 'גישור בין מועמדים מוכשרים לארגונים מובילים'
                  : 'Connect talented candidates with leading organizations'
              }
            ].map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={index}
                  className="glass p-8 rounded-xl hover:border-cyan-400/50 transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="mb-4 inline-block p-3 bg-cyan-400/10 rounded-lg group-hover:bg-cyan-400/20 transition-colors">
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{pillar.title}</h3>
                  <p className="text-foreground/60">{pillar.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="glass p-12 rounded-2xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">
              {t.home.final_title}
            </h2>
            <p className="text-lg text-foreground/60 mb-8 max-w-2xl mx-auto">
              {t.home.final_sub}
            </p>
            <button className="group relative px-8 py-4 rounded-lg font-semibold text-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-2 justify-center text-background group-hover:text-foreground transition-colors">
                {t.home.final_cta}
              </span>
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
