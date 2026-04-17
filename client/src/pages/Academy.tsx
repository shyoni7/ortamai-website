import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Clock, Award, BookOpen, Building } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const AI_TRAINING_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663445418346/oDFneUKwvw2xJYXYaumUdB/81fe03d01_create_a_professional_and_modern_image_for_a_website_that_promotes_ai_training_programs_the_image_s_y01604j7g7gqe2rbe6tu_0_2b7c34bf.png';
const MINISTRY_LOGO = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663445418346/oDFneUKwvw2xJYXYaumUdB/73e8a1f5d_images_f41438b1.png';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

export default function Academy() {
  const { t, lang, dir } = useLanguage();
  const isRtl = lang === 'he';

  const courses = [
    { icon: BookOpen, title: t.academy.course1_title, desc: t.academy.course1_desc, duration: t.academy.course1_duration, color: 'from-cyan-500 to-blue-600' },
    { icon: BookOpen, title: t.academy.course2_title, desc: t.academy.course2_desc, duration: t.academy.course2_duration, color: 'from-purple-500 to-pink-600' },
    { icon: BookOpen, title: t.academy.course3_title, desc: t.academy.course3_desc, duration: t.academy.course3_duration, color: 'from-emerald-500 to-teal-600' },
    { icon: BookOpen, title: t.academy.course4_title, desc: t.academy.course4_desc, duration: t.academy.course4_duration, color: 'from-orange-500 to-red-600' },
  ];

  return (
    <div dir={dir}>
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e27] via-[#0d1235] to-[#0a0e27]" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex mb-6">
            <div className="glass px-4 py-2 rounded-full">
              <span className="text-sm font-semibold text-cyan-400">{isRtl ? '📚 מרכז הכשרות AI' : '📚 AI Training Center'}</span>
            </div>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-5xl md:text-6xl font-bold text-gradient-cyan mb-6">
            {t.academy.hero_title}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-xl text-gray-300 mb-8">
            {t.academy.hero_sub}
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex items-center justify-center gap-4 flex-wrap">
            <div className="glass px-4 py-2 rounded-full flex items-center gap-2">
              <Award className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-gray-300">{t.academy.certified}</span>
            </div>
            <div className="glass px-4 py-2 rounded-full flex items-center gap-2">
              <img src={MINISTRY_LOGO} alt="Ministry of Labor" className="h-5 object-contain" />
              <span className="text-sm text-gray-300">{t.academy.ministry}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl font-bold text-white text-center mb-12">
            {t.academy.courses_title}
          </motion.h2>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {courses.map((course, i) => {
              const Icon = course.icon;
              return (
                <motion.div key={i} variants={fadeUp} className="glass rounded-2xl p-8 hover:border-cyan-400/40 transition-all group">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${course.color} mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{course.title}</h3>
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">{course.desc}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <Link href="/contact">
                      <button className="btn-primary text-sm px-4 py-2">{t.academy.enroll_cta}</button>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Corporate Training */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: isRtl ? 40 : -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <img src={AI_TRAINING_IMAGE} alt={t.academy.corporate_title} className="rounded-2xl w-full glow-purple" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: isRtl ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className={isRtl ? 'text-right' : 'text-left'}>
              <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 mb-6">
                <Building className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">{t.academy.corporate_title}</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">{t.academy.corporate_desc}</p>
              <Link href="/contact">
                <motion.button className="btn-primary text-base px-8 py-4" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  {isRtl ? 'צרו קשר לפרטים' : 'Contact Us for Details'}
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
