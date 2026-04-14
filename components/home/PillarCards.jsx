import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rocket, GraduationCap, Users, ArrowLeft } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "../LanguageContext";
import { t } from "../translations";

export default function PillarCards() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const shouldReduceMotion = useReducedMotion();
  const { lang } = useLanguage();
  const tr = t[lang];

  const pillars = [
    {
      icon: Rocket,
      title: lang === "he" ? "חממה טכנולוגית" : "Tech Incubator",
      description: lang === "he"
        ? "פיתוח פתרונות AI מותאמים אישית, סוכנים חכמים ואוטומציות שמשנים את כללי המשחק"
        : "Custom AI solutions, smart agents, and automations that change the game",
      features: lang === "he"
        ? ["פיתוח מוצרי AI מותאמים", "יישום פיילוטים מהירים", "מודלים עסקיים גמישים", "ליווי עד להצלחה"]
        : ["Custom AI product development", "Fast pilot implementation", "Flexible business models", "Support until success"],
      color: "from-cyan-500 to-blue-500",
      link: createPageUrl("Incubator"),
      bgPattern: "bg-cyan-500/5"
    },
    {
      icon: GraduationCap,
      title: lang === "he" ? "אקדמיית AI" : "AI Academy",
      description: lang === "he"
        ? "הכשרות מתקדמות מותאמות תפקיד וארגון - ממנהלים ועד משתמשי קצה"
        : "Advanced training tailored by role and organization — from managers to end users",
      features: lang === "he"
        ? ["מסלולי הכשרה מותאמים אישית", "הדרכות פרונטליות וגיבוי דיגיטלי", "תכנים מעודכנים ורלוונטיים", "תעודות והסמכות"]
        : ["Personalized training tracks", "In-person and digital training", "Updated and relevant content", "Certificates and accreditations"],
      color: "from-purple-500 to-pink-500",
      link: createPageUrl("Academy"),
      bgPattern: "bg-purple-500/5"
    },
    {
      icon: Users,
      title: lang === "he" ? "מרכז השמה" : "Placement Center",
      description: lang === "he"
        ? "גישור בין מועמדים מוכשרים לארגונים, עם חניכה והטמעה מלאה"
        : "Bridging talented candidates and organizations with full mentorship and integration",
      features: lang === "he"
        ? ["איתור והכשרת מועמדים איכותיים", "חניכה בפרויקטים אמיתיים", "הטמעה בארגון הלקוח", "SLA ובקרת איכות"]
        : ["Sourcing and training quality candidates", "Mentoring in real projects", "Integration into the client organization", "SLA & quality control"],
      color: "from-orange-500 to-red-500",
      link: createPageUrl("Placement"),
      bgPattern: "bg-orange-500/5"
    }
  ];

  const learnMore = lang === "he" ? "למידע נוסף" : "Learn More";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {pillars.map((pillar, index) => {
        const isHovered = hoveredIndex === index;
        const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;

        return (
          <motion.div
            key={pillar.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            animate={shouldReduceMotion ? {} : {
              scale: isHovered ? 1.05 : isOtherHovered ? 0.95 : 1,
              opacity: isOtherHovered ? 0.6 : 1,
              z: isHovered ? 50 : 0,
              rotateY: isHovered ? 5 : 0,
            }}
            style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
          >
            <Card
              className={`group relative overflow-hidden bg-slate-900/50 border-white/10 hover:border-cyan-400/50 transition-all duration-300 h-full ${pillar.bgPattern}`}
              style={{ boxShadow: isHovered ? "0 25px 50px -12px rgba(6, 182, 212, 0.25)" : "none" }}
            >
              <div className="p-8">
                <motion.div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${pillar.color} mb-6`}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.1, rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <pillar.icon className="w-8 h-8 text-white" />
                </motion.div>

                <h3 className="text-2xl font-bold text-white mb-4">{pillar.title}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{pillar.description}</p>

                <ul className="space-y-3 mb-8">
                  {pillar.features.map((feature, i) => (
                    <motion.li key={i} className="flex items-start gap-3 text-gray-300" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${pillar.color} mt-2 flex-shrink-0`} />
                      <span className="text-sm">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <Link to={pillar.link}>
                  <Button className={`w-full bg-gradient-to-br ${pillar.color} text-white hover:opacity-90 font-semibold group-hover:shadow-lg transition-all duration-300`}>
                    {learnMore}
                    <ArrowLeft className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>

              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-l ${pillar.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
              <div className={`absolute inset-0 bg-gradient-to-br ${pillar.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}