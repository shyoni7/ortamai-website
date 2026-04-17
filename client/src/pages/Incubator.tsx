import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Users, Zap, Globe, DollarSign } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

export default function Incubator() {
  const { t, lang, dir } = useLanguage();
  const isRtl = lang === 'he';

  const features = [
    { icon: Users, title: t.incubator.feature1_title, desc: t.incubator.feature1_desc },
    { icon: Zap, title: t.incubator.feature2_title, desc: t.incubator.feature2_desc },
    { icon: Globe, title: t.incubator.feature3_title, desc: t.incubator.feature3_desc },
    { icon: DollarSign, title: t.incubator.feature4_title, desc: t.incubator.feature4_desc },
  ];

  return (
    <div dir={dir}>
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e27] via-[#0d1235] to-[#0a0e27]" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <motion.div animate={{ x: [0,50,0], y: [0,30,0] }} transition={{ duration: 10, repeat: Infinity }} className="absolute top-20 left-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex mb-6">
            <div className="glass px-4 py-2 rounded-full">
              <span className="text-sm font-semibold text-cyan-400">{isRtl ? '🚀 אקסלרטור AI' : '🚀 AI Accelerator'}</span>
            </div>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-5xl md:text-6xl font-bold text-gradient-cyan mb-6">
            {t.incubator.hero_title}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-xl text-gray-300">
            {t.incubator.hero_sub}
          </motion.p>
        </div>
      </section>

      {/* About */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-2xl p-10">
            <p className="text-gray-300 text-lg leading-relaxed mb-4">{t.incubator.p1}</p>
            <p className="text-gray-300 text-lg leading-relaxed">{t.incubator.p2}</p>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl font-bold text-white text-center mb-12">
            {t.incubator.what_title}
          </motion.h2>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div key={i} variants={fadeUp} className="glass rounded-2xl p-6 text-center hover:border-cyan-400/40 transition-all">
                  <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-bold mb-2">{f.title}</h3>
                  <p className="text-gray-400 text-sm">{f.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10" />
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-bold text-white mb-4">{t.incubator.apply_title}</h2>
            <p className="text-gray-300 text-lg mb-8">{t.incubator.apply_sub}</p>
            <Link href="/contact">
              <motion.button className="btn-primary text-lg px-10 py-4" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                {t.incubator.apply_cta}
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
