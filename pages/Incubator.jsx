import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Rocket, Code, Zap, Target, CheckCircle, Users, Lightbulb, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import ScrollProgress from "../components/ui/ScrollProgress";
import ProcessTimeline from "../components/ui/ProcessTimeline";
import MagneticButton from "../components/ui/MagneticButton";
import { useLanguage } from "../components/LanguageContext";
import { t } from "../components/translations";

export default function Incubator() {
  const { lang } = useLanguage();
  const tr = t[lang].incubator;

  const acceleratorProcess = [
    {
      icon: Target,
      title: lang === "he" ? "איפיון צרכי העסק וייעוץ ממומחה AI" : "Business Needs Assessment & AI Expert Consultation",
      description: lang === "he" ? "ניתוח מעמיק של העסק שלך והזדמנויות יישום AI" : "In-depth analysis of your business and AI implementation opportunities",
      details: lang === "he"
        ? ["פגישת Discovery מקיפה", "מיפוי תהליכים קיימים", "זיהוי נקודות כאב וצווארי בקבוק"]
        : ["Comprehensive Discovery meeting", "Mapping existing processes", "Identifying pain points and bottlenecks"]
    },
    {
      icon: Lightbulb,
      title: lang === "he" ? "הכשרות מקצועיות מותאמות לצרכי העסק שלך" : "Tailored Professional Training for Your Business",
      description: lang === "he" ? "תוכניות הדרכה ייעודיות לצוות שלך" : "Dedicated training programs for your team",
      details: lang === "he"
        ? ["הכשרת מנהלים והנהלה", "הדרכת צוות טכני", "ליווי אישי לכל משתתף"]
        : ["Management & executive training", "Technical team coaching", "Personal mentoring for each participant"]
    },
    {
      icon: Users,
      title: lang === "he" ? "הדרכה וליווי צמוד עד להטמעה מלאה" : "Guidance & Close Support Until Full Integration",
      description: lang === "he" ? "ליווי צמוד בכל שלב עד שתהליכי העבודה משולבים לחלוטין" : "Close support at every stage until work processes are fully integrated",
      details: lang === "he"
        ? ["ליווי שוטף של צוות מומחים", "תמיכה טכנית 24/7", "מעקב אחרי KPIs והצלחה"]
        : ["Ongoing expert team support", "24/7 technical support", "KPI & success tracking"]
    },
    {
      icon: RefreshCw,
      title: lang === "he" ? "עדכון גרסה כל חצי שנה" : "Version Update Every Six Months",
      description: lang === "he" ? "תמיד עם הכלים הכי מתקדמים ומדויקים בשוק" : "Always with the most advanced and accurate tools on the market",
      details: lang === "he"
        ? ["עדכונים טכנולוגיים שוטפים", "שיפורים מבוססי פידבק", "התאמה לשינויים בשוק"]
        : ["Ongoing technology updates", "Feedback-based improvements", "Adaptation to market changes"]
    }
  ];

  const offerings = [
    {
      icon: Code,
      title: lang === "he" ? "סוכני AI מתקדמים" : "Advanced AI Agents",
      description: lang === "he" ? "פיתוח סוכנים חכמים לאוטומציה של תהליכים עסקיים" : "Developing smart agents to automate business processes"
    },
    {
      icon: Zap,
      title: lang === "he" ? "אינטגרציות חכמות" : "Smart Integrations",
      description: lang === "he" ? "חיבור מערכות קיימות עם יכולות AI באמצעות n8n ו-Make" : "Connecting existing systems with AI capabilities via n8n and Make"
    },
    {
      icon: Target,
      title: lang === "he" ? "POC ופיילוטים" : "POCs & Pilots",
      description: lang === "he" ? "יישום מהיר של הוכחות היתכנות לבדיקת ערך" : "Fast implementation of proof-of-concept to test value"
    }
  ];

  const process = [
    { title: "Discovery", description: lang === "he" ? "הבנת הצרכים והזדמנויות" : "Understanding needs and opportunities" },
    { title: "MVP/POC", description: lang === "he" ? "פיתוח גרסת הוכחה ראשונית" : "Developing an initial proof version" },
    { title: "Pilot", description: lang === "he" ? "בדיקה בסביבה אמיתית" : "Testing in a real environment" },
    { title: "Scale", description: lang === "he" ? "הרחבה לכלל הארגון" : "Scaling across the organization" }
  ];

  const economicModels = lang === "he"
    ? ["ריטיינר חודשי + תשלום לפי שימוש", "Success Fees - תשלום לפי תוצאות", "NTE Cap - תקרת עלות מובטחת", "מודל Exit/Scale - השקעה משותפת"]
    : ["Monthly retainer + usage-based payment", "Success Fees — pay by results", "NTE Cap — guaranteed cost ceiling", "Exit/Scale model — shared investment"];

  return (
    <div>
      <ScrollProgress color="cyan" />

      {/* Hero */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-500 mb-6">
              <Rocket className="w-10 h-10 text-white" />
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
              {tr.hero_title}
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              {tr.hero_desc}
            </p>

            <Link to={createPageUrl("InitialConsultation")}>
              <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold">
                {tr.hero_cta}
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950/30">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">{tr.what_title}</h2>
            <p className="text-xl text-gray-400">{tr.what_sub}</p>
          </motion.div>
          <ProcessTimeline steps={acceleratorProcess} />
        </div>
      </section>

      {/* What We Build */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">{tr.build_title}</h2>
            <p className="text-xl text-gray-400">{tr.build_sub}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offerings.map((offering, index) => (
              <motion.div key={offering.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <Card className="p-8 bg-slate-900/50 border-white/10 hover:border-cyan-400/50 transition-all h-full">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-4">
                    <offering.icon className="w-7 h-7 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{offering.title}</h3>
                  <p className="text-gray-400">{offering.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950/30">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">{tr.process_title}</h2>
            <p className="text-xl text-gray-400">{tr.process_sub}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {process.map((step, index) => (
              <motion.div key={step.title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="relative">
                <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -left-3 w-6 h-0.5 bg-cyan-400/30" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Economic Models */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">{tr.models_title}</h2>
            <p className="text-xl text-gray-400">{tr.models_sub}</p>
          </motion.div>

          <Card className="p-8 bg-slate-900/50 border-white/10">
            <div className="space-y-4">
              {economicModels.map((model, index) => (
                <motion.div key={index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="flex items-start gap-3 p-4 rounded-lg hover:bg-cyan-400/5 transition-colors">
                  <CheckCircle className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-lg">{model}</span>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950/30">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gradient-to-l from-cyan-500/20 to-blue-500/20 rounded-3xl p-12 border border-white/10 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">{tr.cta_title}</h2>
            <p className="text-xl text-gray-300 mb-8">{tr.cta_sub}</p>
            <Link to={createPageUrl("Contact")}>
              <MagneticButton size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold text-lg px-10 py-6">
                {tr.cta_btn}
                <ArrowLeft className="mr-2 h-5 w-5" />
              </MagneticButton>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}