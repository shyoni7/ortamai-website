import React from "react";
import { Card } from "@/components/ui/card";
import { Zap, Target, TrendingUp, Shield, Users, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../LanguageContext";
import { t } from "../translations";

export default function ValueProps() {
  const { lang } = useLanguage();

  const valuesData = {
    he: [
      { icon: Zap, title: "פיתוח מהיר", description: "מ-POC ליישום בשבועות, לא בחודשים" },
      { icon: Target, title: "התאמה מדויקת", description: "פתרונות מותאמים לצרכים הייחודיים שלכם" },
      { icon: TrendingUp, title: "ROI מוכח", description: "חיסכון של עד 70% בעלויות תפעול" },
      { icon: Shield, title: "בטיחות ואבטחה", description: "תקני אבטחה ופרטיות מובילים" },
      { icon: Users, title: "צוות מומחים", description: "מהנדסי AI ומדעני נתונים מנוסים" },
      { icon: Lightbulb, title: "חדשנות מתמדת", description: "שימוש בטכנולוגיות המתקדמות ביותר" }
    ],
    en: [
      { icon: Zap, title: "Fast Development", description: "From POC to implementation in weeks, not months" },
      { icon: Target, title: "Precise Fit", description: "Solutions tailored to your unique needs" },
      { icon: TrendingUp, title: "Proven ROI", description: "Save up to 70% in operational costs" },
      { icon: Shield, title: "Safety & Security", description: "Leading security and privacy standards" },
      { icon: Users, title: "Expert Team", description: "Experienced AI engineers and data scientists" },
      { icon: Lightbulb, title: "Continuous Innovation", description: "Using the most advanced technologies" }
    ]
  };

  const values = valuesData[lang];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {values.map((value, index) => (
        <motion.div
          key={value.title}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.2 } }}
        >
          <Card className="p-6 bg-slate-900/30 border-white/10 hover:border-cyan-400/30 hover:bg-slate-900/50 transition-all duration-300 group h-full hover:shadow-xl hover:shadow-cyan-500/10">
            <div className="flex items-start gap-4">
              <motion.div
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0"
                whileHover={{ rotate: 360, scale: 1.1, transition: { duration: 0.6 } }}
              >
                <value.icon className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
              </motion.div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{value.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">{value.description}</p>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}