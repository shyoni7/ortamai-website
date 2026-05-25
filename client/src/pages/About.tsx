import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Award, Heart, Lightbulb, Users, BookOpen, Building2, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import GradientButton from '@/components/GradientButton';

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
    imgPosition: 'object-top',
  },
  {
    name: { he: 'יונתן גרבינסקי', en: 'Yonatan Grabinski' },
    role: { he: 'ראש מחלקת שיווק', en: 'Head of Marketing' },
    img: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663445418346/oDFneUKwvw2xJYXYaumUdB/d80b2174c_unnamed1_80eb8d9d.png',
  },
  {
    name: { he: 'שי נחום', en: 'Shai Nachum' },
    role: { he: 'CTO', en: 'CTO' },
    img: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663445418346/rXJVQOjCqHBhECGn.jpeg',
  },
];

const VP = { once: true, amount: 0 };

export default function About() {
  const { t, lang, dir } = useLanguage();
  const isRtl = lang === 'he';

  const values = [
    { icon: Award, title: t.about.excellence, desc: t.about.excellence_desc },
    { icon: Heart, title: t.about.commitment, desc: t.about.commitment_desc },
    { icon: Lightbulb, title: t.about.innovation, desc: t.about.innovation_desc },
  ];

  const stats = [
    { icon: Users,    value: '+300', label: isRtl ? 'בוגרים' : 'Graduates' },
    { icon: BookOpen, value: '+10',  label: isRtl ? 'תוכניות' : 'Programs' },
    { icon: Building2,value: '98%',  label: isRtl ? 'שביעות רצון' : 'Satisfaction' },
    { icon: Star,     value: '+50',  label: isRtl ? 'שותפים עסקיים' : 'Partners' },
  ];

  return (
    <div dir={dir}>
      {/* ── HERO ── */}
      <section
        className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
        style={{ background: '#08080C' }}
      >
        {/* Dot-grid background */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, rgba(200,200,208,0.07) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />

        {/* 3D Spheres */}
        <div
          className="sphere-3d sphere-3d-primary hidden md:block"
          style={{ width: 480, height: 480, top: '-60px', right: '-80px', opacity: 0.85 }}
        />
        <div
          className="sphere-3d sphere-3d-secondary hidden md:block"
          style={{ width: 260, height: 260, bottom: '40px', left: '-60px', opacity: 0.7 }}
        />
        <div
          className="sphere-3d sphere-3d-accent"
          style={{ width: 120, height: 120, top: '30%', left: '12%', opacity: 0.5 }}
        />

        {/* Orange warm glow accent */}
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-24 right-1/4 w-72 h-72 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(200,200,208,0.04)' }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center md:items-end md:text-right max-w-2xl mx-auto md:mr-0 md:ml-auto">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(200,200,208,0.2)' }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#C8C8D0' }} />
              <span className="text-sm font-semibold" style={{ color: '#C8C8D0' }}>
                {isRtl ? 'מרכז ה-AI המוביל בישראל' : 'Israel\'s Leading AI Center'}
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight"
            >
              {isRtl ? (
                <>
                  <span className="text-gradient-cyan">אנחנו</span>{' '}בונים<br />את עתיד ה-AI
                </>
              ) : (
                <>
                  We <span className="text-gradient-cyan">Build</span><br />the AI Future
                </>
              )}
            </motion.h1>

            {/* Sub-heading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-base md:text-lg lg:text-xl mb-5 md:mb-8 leading-relaxed max-w-xl" style={{ color: 'rgba(200,200,208,0.65)' }}
            >
              {isRtl
                ? 'אנחנו מאמינים שה-AI הוא לא רק טכנולוגיה – זו מהפכה. אנחנו כאן כדי להוביל אותה יחד איתך.'
                : 'We believe AI is not just technology – it is a revolution. We are here to lead it together with you.'}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-4 justify-center md:justify-end w-full"
            >
              <GradientButton href="/contact" size="lg">
                {isRtl ? 'צור קשר' : 'Contact Us'}
              </GradientButton>
              <Link href="/">
                <button className="btn-secondary">
                  {isRtl ? 'חזרה לדף הבית' : 'Back to Home'}
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="hidden sm:grid mt-8 md:mt-16 lg:mt-20 grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
          >
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={i}
                  className="backdrop-blur-sm rounded-2xl p-3 md:p-5 flex flex-col items-center text-center" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(200,200,208,0.12)' }}
                >
                  <div className="inline-flex p-2 rounded-xl mb-3" style={{ background: 'rgba(200,200,208,0.1)' }}>
                    <Icon className="w-5 h-5" style={{ color: '#C8C8D0' }} />
                  </div>
                  <span className="text-2xl md:text-3xl font-bold text-white">{s.value}</span>
                  <span className="text-sm mt-1" style={{ color: 'rgba(200,200,208,0.55)' }}>{s.label}</span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VP}
              transition={{ duration: 0.8 }}
              className={isRtl ? 'text-right' : 'text-left'}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-3">{t.about.who}</h2>
              <p className="text-lg text-gray-900 font-medium mb-5 leading-relaxed">{t.about.who_text}</p>
              <p className="text-gray-600 mb-4 leading-relaxed">{t.about.p1}</p>
              <p className="text-gray-600 leading-relaxed">{t.about.p2}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: isRtl ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VP}
              transition={{ duration: 0.8 }}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.about.vision_title}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">{t.about.vision_text}</p>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.about.mission_title}</h3>
              <p className="text-gray-600 leading-relaxed mb-3">{t.about.mission_p1}</p>
              <p className="text-gray-600 leading-relaxed mb-3">{t.about.mission_p2}</p>
              <p className="text-gray-600 leading-relaxed">{t.about.mission_p3}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-800/30 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gray-900 text-center mb-12"
          >
            {t.about.values_title}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={i}
                  className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 text-center hover:border-gray-200 transition-all"
                >
                  <div className="inline-flex p-4 rounded-full bg-[#C8C8D0]/10 mb-4">
                    <Icon className="w-8 h-8 text-gray-900" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{v.title}</h3>
                  <p className="text-gray-500">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.about.team_title}</h2>
            <p className="text-gray-500 text-lg">{t.about.team_sub}</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM.map((member, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden hover:border-gray-200 transition-all group"
              >
                <div className="relative h-56 overflow-hidden">
                  <img src={member.img} alt={member.name[lang]} className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${'imgPosition' in member ? (member as any).imgPosition : 'object-center'}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-gray-900 font-bold">{member.name[lang]}</h3>
                  <p className="text-gray-900 text-sm">{member.role[lang]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#C8C8D0]/5 via-gray-800/30 to-[#C8C8D0]/5" />
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VP}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.about.cta_title}</h2>
            <p className="text-gray-600 text-lg mb-8">{t.about.cta_sub}</p>
            <GradientButton href="/contact" size="lg">
              {t.about.cta_btn}
            </GradientButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
