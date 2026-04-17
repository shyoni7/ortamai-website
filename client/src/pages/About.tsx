import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Award, Heart, Lightbulb } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

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
  },
  {
    name: { he: 'יונתן גרבינסקי', en: 'Yonatan Grabinski' },
    role: { he: 'ראש מחלקת שיווק', en: 'Head of Marketing' },
    img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663445418346/oDFneUKwvw2xJYXYaumUdB/d80b2174c_unnamed1_80eb8d9d.png',
  },
  {
    name: { he: 'שי נחום', en: 'Shai Nachum' },
    role: { he: 'ראש מחלקת סייבר', en: 'Head of Cyber' },
    img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663445418346/oDFneUKwvw2xJYXYaumUdB/c6e9d27b9_image_e458dc33.png',
  },
];

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

export default function About() {
  const { t, lang, dir } = useLanguage();
  const isRtl = lang === 'he';

  const values = [
    { icon: Award, title: t.about.excellence, desc: t.about.excellence_desc },
    { icon: Heart, title: t.about.commitment, desc: t.about.commitment_desc },
    { icon: Lightbulb, title: t.about.innovation, desc: t.about.innovation_desc },
  ];

  return (
    <div dir={dir}>
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e27] via-[#0d1235] to-[#0a0e27]" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <motion.div animate={{ x: [0,50,0], y: [0,30,0] }} transition={{ duration: 10, repeat: Infinity }} className="absolute top-20 right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-5xl md:text-6xl font-bold text-gradient-cyan mb-6">
            {t.about.hero_title}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-xl text-gray-300">
            {isRtl ? 'אנחנו מאמינים שה-AI הוא לא רק טכנולוגיה – זו מהפכה' : 'We believe AI is not just technology – it is a revolution'}
          </motion.p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: isRtl ? 40 : -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className={isRtl ? 'text-right' : 'text-left'}>
              <h2 className="text-3xl font-bold text-white mb-6">{t.about.who}</h2>
              <p className="text-gray-300 mb-4 leading-relaxed">{t.about.p1}</p>
              <p className="text-gray-300 leading-relaxed">{t.about.p2}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: isRtl ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">{t.about.vision_title}</h3>
              <p className="text-gray-300 leading-relaxed mb-6">{t.about.vision_text}</p>
              <h3 className="text-2xl font-bold text-white mb-4">{t.about.mission_title}</h3>
              <p className="text-gray-300 leading-relaxed mb-3">{t.about.mission_p1}</p>
              <p className="text-gray-300 leading-relaxed mb-3">{t.about.mission_p2}</p>
              <p className="text-gray-300 leading-relaxed">{t.about.mission_p3}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl font-bold text-white text-center mb-12">
            {t.about.values_title}
          </motion.h2>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div key={i} variants={fadeUp} className="glass rounded-2xl p-8 text-center hover:border-cyan-400/40 transition-all">
                  <div className="inline-flex p-4 rounded-full bg-cyan-400/10 mb-4">
                    <Icon className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{v.title}</h3>
                  <p className="text-gray-400">{v.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">{t.about.team_title}</h2>
            <p className="text-gray-400 text-lg">{t.about.team_sub}</p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM.map((member, i) => (
              <motion.div key={i} variants={fadeUp} className="glass rounded-2xl overflow-hidden hover:border-cyan-400/40 transition-all group">
                <div className="relative h-56 overflow-hidden">
                  <img src={member.img} alt={member.name[lang]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e27] to-transparent" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-white font-bold">{member.name[lang]}</h3>
                  <p className="text-cyan-400 text-sm">{member.role[lang]}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10" />
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-bold text-white mb-4">{t.about.cta_title}</h2>
            <p className="text-gray-300 text-lg mb-8">{t.about.cta_sub}</p>
            <Link href="/contact">
              <motion.button className="btn-primary text-lg px-10 py-4" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                {t.about.cta_btn}
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
