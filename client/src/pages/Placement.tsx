import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { User, Building, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

export default function Placement() {
  const { t, lang, dir } = useLanguage();
  const isRtl = lang === 'he';

  const benefits = [t.placement.benefit1, t.placement.benefit2, t.placement.benefit3, t.placement.benefit4];

  return (
    <div dir={dir}>
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e27] via-[#0d1235] to-[#0a0e27]" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-5xl md:text-6xl font-bold text-gradient-cyan mb-6">
            {t.placement.hero_title}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-xl text-gray-300">
            {t.placement.hero_sub}
          </motion.p>
        </div>
      </section>

      {/* Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Candidates */}
            <motion.div variants={fadeUp} className="glass rounded-2xl p-10 hover:border-cyan-400/40 transition-all">
              <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 mb-6">
                <User className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">{t.placement.candidate_title}</h2>
              <p className="text-gray-300 leading-relaxed mb-6">{t.placement.candidate_desc}</p>
              <div className="space-y-3 mb-8">
                {benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{b}</span>
                  </div>
                ))}
              </div>
              <Link href="/contact">
                <button className="btn-primary w-full py-3">{t.placement.cta}</button>
              </Link>
            </motion.div>

            {/* Employers */}
            <motion.div variants={fadeUp} className="glass rounded-2xl p-10 hover:border-purple-400/40 transition-all">
              <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 mb-6">
                <Building className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">{t.placement.employer_title}</h2>
              <p className="text-gray-300 leading-relaxed mb-6">{t.placement.employer_desc}</p>
              <div className="space-y-3 mb-8">
                {benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{b}</span>
                  </div>
                ))}
              </div>
              <Link href="/contact">
                <button className="w-full py-3 rounded-xl border border-purple-400/50 text-purple-400 hover:bg-purple-400/10 transition-colors font-semibold">{t.placement.cta}</button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
