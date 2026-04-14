import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, FileText, Rocket, TrendingUp } from "lucide-react";

export default function ProcessSteps() {
  const steps = [
    {
      icon: MessageSquare,
      title: "שיחת ייעוץ ראשונית",
      description: "נכיר את הצרכים והאתגרים שלכם"
    },
    {
      icon: FileText,
      title: "בניית תוכנית מותאמת",
      description: "נגדיר יחד את היעדים והאבני דרך"
    },
    {
      icon: Rocket,
      title: "יישום ופיילוט",
      description: "נבצע POC ונבדוק התאמה בסביבה אמיתית"
    },
    {
      icon: TrendingUp,
      title: "סקאלה והרחבה",
      description: "נרחיב את הפתרון לכלל הארגון"
    }
  ];

  return (
    <div className="relative">
      <div className="hidden lg:block absolute top-16 right-1/2 left-1/2 h-0.5 bg-gradient-to-l from-cyan-400/50 via-purple-400/50 to-cyan-400/50 transform -translate-x-1/2" 
           style={{ width: '80%' }} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative"
          >
            <div className="absolute -top-4 right-1/2 transform translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg z-10 shadow-lg">
              {index + 1}
            </div>

            <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-8 pt-10 text-center hover:border-cyan-400/50 transition-all duration-300 h-full">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4">
                <step.icon className="w-8 h-8 text-cyan-400" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3">
                {step.title}
              </h3>
              
              <p className="text-gray-400 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}