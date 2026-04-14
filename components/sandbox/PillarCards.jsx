import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rocket, GraduationCap, Users, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function PillarCards() {
  const pillars = [
    {
      icon: Rocket,
      title: "חממה טכנולוגית",
      description: "פיתוח פתרונות AI מותאמים אישית, סוכנים חכמים ואוטומציות שמשנים את כללי המשחק",
      features: [
        "פיתוח מוצרי AI מותאמים",
        "יישום פיילוטים מהירים",
        "מודלים עסקיים גמישים",
        "ליווי עד להצלחה"
      ],
      color: "from-cyan-500 to-blue-500",
      link: createPageUrl("Incubator"),
      bgPattern: "bg-cyan-500/5"
    },
    {
      icon: GraduationCap,
      title: "אקדמיית AI",
      description: "הכשרות מתקדמות מותאמות תפקיד וארגון - ממנהלים ועד משתמשי קצה",
      features: [
        "מסלולי הכשרה מותאמים אישית",
        "הדרכות פרונטליות וגיבוי דיגיטלי",
        "תכנים מעודכנים ורלוונטיים",
        "תעודות והסמכות"
      ],
      color: "from-purple-500 to-pink-500",
      link: createPageUrl("Academy"),
      bgPattern: "bg-purple-500/5"
    },
    {
      icon: Users,
      title: "מרכז השמה",
      description: "גישור בין מועמדים מוכשרים לארגונים, עם חניכה והטמעה מלאה",
      features: [
        "איתור והכשרת מועמדים איכותיים",
        "חניכה בפרויקטים אמיתיים",
        "הטמעה בארגון הלקוח",
        "SLA ובקרת איכות"
      ],
      color: "from-orange-500 to-red-500",
      link: createPageUrl("Placement"),
      bgPattern: "bg-orange-500/5"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {pillars.map((pillar, index) => (
        <motion.div
          key={pillar.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className={`group relative overflow-hidden bg-slate-900/50 border-white/10 hover:border-cyan-400/50 transition-all duration-300 h-full ${pillar.bgPattern}`}>
            <div className="p-8">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${pillar.color} mb-6 group-hover:scale-110 transition-transform`}>
                <pillar.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">
                {pillar.title}
              </h3>

              <p className="text-gray-400 mb-6 leading-relaxed">
                {pillar.description}
              </p>

              <ul className="space-y-3 mb-8">
                {pillar.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${pillar.color} mt-2 flex-shrink-0`} />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link to={pillar.link}>
                <Button 
                  className={`w-full bg-gradient-to-br ${pillar.color} text-white hover:opacity-90 font-semibold`}
                >
                  למידע נוסף
                  <ArrowLeft className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-l ${pillar.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
          </Card>
        </motion.div>
      ))}
    </div>
  );
}