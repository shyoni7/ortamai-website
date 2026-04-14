import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

import PillarCards from "../components/sandbox/PillarCards";
import ValueProps from "../components/sandbox/ValueProps";
import ProcessSteps from "../components/sandbox/ProcessSteps";
import StatsSection from "../components/sandbox/StatsSection";
import DynamicHeroVideo from "../components/sandbox/DynamicHeroVideo";

export default function SandboxHome() {
  const { data: contents } = useQuery({
    queryKey: ['home-content'],
    queryFn: async () => {
      const allContents = await base44.entities.Content.list();
      return allContents.filter(c => c.page === 'Home' && c.is_active);
    },
    initialData: []
  });

  const getContent = (section, defaultValue = '') => {
    const content = contents.find(c => c.section === section);
    return content?.content_he || defaultValue;
  };

  return (
    <div className="relative overflow-hidden">
      {/* Sandbox Banner */}
      <div className="fixed top-20 left-0 right-0 bg-orange-500 text-white text-center py-2 z-40">
        <p className="font-bold">🔧 מצב ארגז חול - שינויים כאן לא ישפיעו על האתר המקורי</p>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 mt-12">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative max-w-7xl mx-auto text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {getContent('hero_title', 'הגשר בין העולם הישן')}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-cyan-400 to-purple-400">
                לעולם של AI
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              {getContent('hero_subtitle', 'חממה טכנולוגית • הכשרות מתקדמות • מרכז השמה')}
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}>
              <DynamicHeroVideo />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex justify-center">
              <Link to={createPageUrl("Contact")}>
                <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold text-lg px-8 py-6">
                  תאמו שיחה עכשיו
                  <ArrowLeft className="mr-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              שלושת עמודי התווך שלנו
            </h2>
            <p className="text-xl text-gray-400">
              פתרון מקיף לכל צורך בעולם ה-AI
            </p>
          </motion.div>

          <PillarCards />
        </div>
      </section>

      <StatsSection />

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              למה לבחור ב-ORTAM AI?
            </h2>
            <p className="text-xl text-gray-400">
              יתרונות שמבדילים אותנו מכל השאר
            </p>
          </motion.div>

          <ValueProps />
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              איך זה עובד?
            </h2>
            <p className="text-xl text-gray-400">
              תהליך פשוט ויעיל להצלחה שלכם
            </p>
          </motion.div>

          <ProcessSteps />
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}>
            <h2 className="text-3xl font-bold text-white mb-4">
              הם כבר סומכים עלינו
            </h2>
            <p className="text-gray-400 mb-12">
              שותפים ומוסדות מובילים שעובדים איתנו
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i}
                  className="w-40 h-24 bg-slate-800/50 rounded-lg border border-white/10 flex items-center justify-center hover:border-cyan-400/50 transition-colors">
                  <span className="text-gray-500">לוגו שותף {i}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-l from-cyan-500/20 to-purple-500/20 rounded-3xl p-12 border border-white/10 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              מוכנים להתחיל את המסע?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              בואו נדבר על איך נוכל לעזור לכם להשתלב בעולם ה-AI
            </p>
            <Link to={createPageUrl("Contact")}>
              <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold text-lg px-10 py-6">
                תאמו שיחת ייעוץ חינם
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}