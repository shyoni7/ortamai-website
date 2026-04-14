import React from "react";
import { Card } from "@/components/ui/card";
import { Zap, Target, TrendingUp, Shield, Users, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

export default function ValueProps() {
  const values = [
    {
      icon: Zap,
      title: "פיתוח מהיר",
      description: "מ-POC ליישום בשבועות, לא בחודשים"
    },
    {
      icon: Target,
      title: "התאמה מדויקת",
      description: "פתרונות מותאמים לצרכים הייחודיים שלכם"
    },
    {
      icon: TrendingUp,
      title: "ROI מוכח",
      description: "חיסכון של עד 70% בעלויות תפעול"
    },
    {
      icon: Shield,
      title: "בטיחות ואבטחה",
      description: "תקני אבטחה ופרטיות מובילים"
    },
    {
      icon: Users,
      title: "צוות מומחים",
      description: "מהנדסי AI ומדעני נתונים מנוסים"
    },
    {
      icon: Lightbulb,
      title: "חדשנות מתמדת",
      description: "שימוש בטכנולוגיות המתקדמות ביותר"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {values.map((value, index) => (
        <motion.div
          key={value.title}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
        >
          <Card className="p-6 bg-slate-900/30 border-white/10 hover:border-cyan-400/30 hover:bg-slate-900/50 transition-all duration-300 group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <value.icon className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}