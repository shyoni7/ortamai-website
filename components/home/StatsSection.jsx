import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import CounterAnimation from "../ui/CounterAnimation";
import { useLanguage } from "../LanguageContext";

export default function StatsSection() {
  const shouldReduceMotion = useReducedMotion();
  const { lang } = useLanguage();
  const isEn = lang === "en";
  
  const stats = [
    { number: 15, suffix: "+", label: isEn ? "Dedicated Training Programs" : "הכשרות ייעודיות" },
    { number: 93, suffix: "%", label: isEn ? "Client Satisfaction" : "שביעות רצון לקוחות" },
    { number: 100, suffix: "+", label: isEn ? "Course Graduates" : "בוגרי הקורסים שלנו" },
    { number: 5, suffix: "+", label: isEn ? "Strategic Partners" : "שותפים אסטרטגיים" }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-l from-cyan-900/20 to-purple-900/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={!shouldReduceMotion ? { 
                scale: 1.1,
                y: -10,
                transition: { duration: 0.3 }
              } : {}}
              className="text-center group cursor-default"
            >
              <motion.div 
                className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-l from-cyan-400 to-purple-400 mb-2"
                whileHover={!shouldReduceMotion ? {
                  scale: 1.2,
                  transition: { duration: 0.3 }
                } : {}}
              >
                <CounterAnimation 
                  end={stat.number} 
                  suffix={stat.suffix}
                  duration={2}
                />
              </motion.div>
              <div className="text-gray-400 text-sm font-medium group-hover:text-gray-300 transition-colors">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}