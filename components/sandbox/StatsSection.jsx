import React from "react";
import { motion } from "framer-motion";

export default function StatsSection() {
  const stats = [
    { number: "50+", label: "פרויקטים מוצלחים" },
    { number: "95%", label: "שביעות רצון לקוחות" },
    { number: "1000+", label: "בוגרי הכשרות" },
    { number: "20+", label: "שותפים אסטרטגיים" }
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
              className="text-center"
            >
              <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-l from-cyan-400 to-purple-400 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}