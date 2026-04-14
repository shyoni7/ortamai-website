import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Users, Target, TrendingUp, CheckCircle, Briefcase, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import ScrollProgress from "../components/ui/ScrollProgress";
import ProcessTimeline from "../components/ui/ProcessTimeline";
import MagneticButton from "../components/ui/MagneticButton";
import { useLanguage } from "../components/LanguageContext";
import { t } from "../components/translations";

export default function Placement() {
  const { lang } = useLanguage();
  const tr = t[lang].placement;

  const forEmployers = lang === "he"
    ? ["מועמדים מוכשרים ומוכנים לעבודה", "תהליך מיון וסינון איכותי", "חניכה והטמעה מלווה", "SLA ומעקב צמוד", "מודלים כלכליים גמישים"]
    : ["Skilled and work-ready candidates", "Quality screening and selection process", "Mentored onboarding and integration", "SLA & close follow-up", "Flexible financial models"];

  const forCandidates = lang === "he"
    ? ["הכשרה מקצועית מתקדמת", "ניסיון מעשי בפרויקטים אמיתיים", "ליווי אישי וחניכה", "הכנה למשרה", "השמה בחברות מובילות"]
    : ["Advanced professional training", "Hands-on experience in real projects", "Personal mentoring and coaching", "Job preparation", "Placement in leading companies"];

  const placementProcess = [
    {
      icon: Target,
      title: lang === "he" ? "איתור מועמדים" : "Candidate Sourcing",
      description: lang === "he" ? "מיון קפדני של כישרונות מהשוק" : "Careful screening of market talent",
      details: lang === "he"
        ? ["סינון קורות חיים ראשוני", "ראיונות טלפוניים", "מבחני התאמה טכניים"]
        : ["Initial CV screening", "Phone interviews", "Technical fit assessments"]
    },
    {
      icon: Users,
      title: lang === "he" ? "הכשרה מעמיקה" : "In-Depth Training",
      description: lang === "he" ? "תוכנית למידה מותאמת אישית" : "Personalized learning program",
      details: lang === "he"
        ? ["קורסי AI מקצועיים", "הדרכות ייעודיות לתפקיד", "כלים וטכנולוגיות מתקדמים"]
        : ["Professional AI courses", "Role-specific coaching", "Advanced tools and technologies"]
    },
    {
      icon: TrendingUp,
      title: lang === "he" ? "פרויקט מעשי" : "Practical Project",
      description: lang === "he" ? "ניסיון בעבודה אמיתית" : "Real-world work experience",
      details: lang === "he"
        ? ["עבודה על פרויקטים ממשיים", "ליווי של מנטורים מנוסים", "בניית תיק עבודות"]
        : ["Working on real projects", "Guidance from experienced mentors", "Building a portfolio"]
    },
    {
      icon: CheckCircle,
      title: lang === "he" ? "השמה והטמעה" : "Placement & Integration",
      description: lang === "he" ? "מעבר חלק לארגון הלקוח" : "Smooth transition to the client organization",
      details: lang === "he"
        ? ["ליווי בתקופת ההתאקלמות", "תמיכה שוטפת", "מעקב אחרי הצלחה"]
        : ["Support during the onboarding period", "Ongoing support", "Success tracking"]
    }
  ];

  return (
    <div>
      <ScrollProgress color="orange" />

      {/* Hero */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-orange-500 to-red-500 mb-6">
              <Users className="w-10 h-10 text-white" />
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">{tr.hero_title}</h1>
            <p className="text-xl text-gray-300 mb-8">{tr.hero_desc}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl("SubmitJob")}>
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-bold">
                  <Briefcase className="ml-2 h-5 w-5" />
                  {tr.employer_btn}
                </Button>
              </Link>
              <Link to={createPageUrl("Contact")}>
                <Button size="lg" variant="outline" className="border-orange-400 text-orange-400 hover:bg-orange-400/10">
                  <UserPlus className="ml-2 h-5 w-5" />
                  {tr.candidate_btn}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950/30">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">{tr.how_title}</h2>
            <p className="text-xl text-gray-400">{tr.how_sub}</p>
          </motion.div>
          <ProcessTimeline steps={placementProcess} />
        </div>
      </section>

      {/* For Employers & Candidates */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="w-10 h-10 text-orange-400" />
                <h2 className="text-3xl font-bold text-white">{tr.employers_title}</h2>
              </div>
              <p className="text-gray-400 mb-6">{tr.employers_sub}</p>
              <Card className="p-6 bg-slate-900/50 border-white/10">
                <div className="space-y-3">
                  {forEmployers.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>
              </Card>
              <Link to={createPageUrl("SubmitJob")}>
                <Button className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-bold">
                  {tr.hire_btn}
                  <ArrowLeft className="mr-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-3 mb-6">
                <UserPlus className="w-10 h-10 text-orange-400" />
                <h2 className="text-3xl font-bold text-white">{tr.candidates_title}</h2>
              </div>
              <p className="text-gray-400 mb-6">{tr.candidates_sub}</p>
              <Card className="p-6 bg-slate-900/50 border-white/10">
                <div className="space-y-3">
                  {forCandidates.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>
              </Card>
              <Link to={createPageUrl("Contact")}>
                <Button className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-bold">
                  {tr.join_btn}
                  <ArrowLeft className="mr-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gradient-to-l from-orange-500/20 to-red-500/20 rounded-3xl p-12 border border-white/10 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">{tr.cta_title}</h2>
            <p className="text-xl text-gray-300 mb-8">{tr.cta_sub}</p>
            <Link to={createPageUrl("Contact")}>
              <MagneticButton size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg px-10 py-6">
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