import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, GraduationCap, BookOpen, Users, Award, Clock } from "lucide-react";
import { motion } from "framer-motion";

import ScrollProgress from "../components/ui/ScrollProgress";
import MagneticButton from "../components/ui/MagneticButton";
import { useLanguage } from "../components/LanguageContext";

export default function Academy() {
  const { lang } = useLanguage();

  const trainingPrograms = lang === "he" ? [
    { title: "הכשרת AI למנהלים", audience: "מנהלים", duration: "28 שעות הכשרה", level: "מתקדמים", image: "/images/df766e802_________ai_____________pcmer0eadzd5v32fb1re_1.png", linkTo: "TrainingManagers" },
    { title: "הכשרת AI למחלקת שיווק", audience: "אנשי שיווק", duration: "44 שעות הכשרה", level: "בינוני", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", linkTo: "TrainingMarketing" },
    { title: "הכשרת AI למחלקת משאבי אנוש", audience: "אנשי HR", duration: "24 שעות הכשרה", level: "בינוני", image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80", linkTo: "TrainingHR" },
    { title: "הכשרת AI למחלקת פיתוח", audience: "מפתחים ואנשי טכנולוגיה", duration: "80 שעות הכשרה", level: "מתקדמים", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80", linkTo: "TrainingDevelopers" },
    { title: "הכשרת AI לבכירים", audience: "הנהלה בכירה", duration: "24 שעות הכשרה", level: "מנהלים", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80", linkTo: "TrainingExecutives" },
    { title: "הכשרת AI למנהלי מוצר ומנהלי פרויקטים", audience: "Product & Project Managers", duration: "40 שעות הכשרה", level: "מתקדמים", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80", linkTo: "TrainingProductManagers" },
    { title: "הכשרת AI למחלקת כספים והנהלת חשבונות", audience: "אנשי פיננסים", duration: "18 שעות הכשרה", level: "מתקדמים", image: "/images/a00800906_______________ai______________1ztf6h7ulzz1cg0t1nwp_1.png", linkTo: "TrainingFinance" },
    { title: "הכשרת AI ליועצי השקעות ובנקאים", audience: "מומחי פיננסים", duration: "24 שעות הכשרה", level: "מתקדמים", image: "/images/81fe03d01_create_a_professional_and_modern_image_for_a_website_that_promotes_ai_training_programs_the_image_s_y01604j7g7gqe2rbe6tu_0.png", linkTo: "TrainingInvestment" }
  ] : [
    { title: "AI Training for Managers", audience: "Managers", duration: "28 training hours", level: "Advanced", image: "/images/df766e802_________ai_____________pcmer0eadzd5v32fb1re_1.png", linkTo: "TrainingManagers" },
    { title: "AI Training for Marketing", audience: "Marketing Teams", duration: "44 training hours", level: "Intermediate", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", linkTo: "TrainingMarketing" },
    { title: "AI Training for HR", audience: "HR Professionals", duration: "24 training hours", level: "Intermediate", image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80", linkTo: "TrainingHR" },
    { title: "AI Training for Developers", audience: "Developers & Tech Teams", duration: "80 training hours", level: "Advanced", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80", linkTo: "TrainingDevelopers" },
    { title: "AI Training for Executives", audience: "Senior Management", duration: "24 training hours", level: "Executive", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80", linkTo: "TrainingExecutives" },
    { title: "AI Training for Product & Project Managers", audience: "Product & Project Managers", duration: "40 training hours", level: "Advanced", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80", linkTo: "TrainingProductManagers" },
    { title: "AI Training for Finance & Accounting", audience: "Finance Professionals", duration: "18 training hours", level: "Advanced", image: "/images/a00800906_______________ai______________1ztf6h7ulzz1cg0t1nwp_1.png", linkTo: "TrainingFinance" },
    { title: "AI Training for Investment Advisors & Bankers", audience: "Finance Experts", duration: "24 training hours", level: "Advanced", image: "/images/81fe03d01_create_a_professional_and_modern_image_for_a_website_that_promotes_ai_training_programs_the_image_s_y01604j7g7gqe2rbe6tu_0.png", linkTo: "TrainingInvestment" }
  ];

  const courses = lang === "he" ? [
    { title: "קורס AI לעסקים ועצמאים", duration: "80 שעות", level: "כל הרמות", description: "הקורס המעשי והמקיף ביותר לעסקים קטנים ועצמאים - מאפס ועד אוטומציה מלאה", linkTo: "CourseAI", isExternal: false },
    { title: "קורס מטמיע מערכות AI בארגונים", duration: "446 שעות", level: "מתקדמים", description: "הקורס היחיד בארץ המפוקח על ידי המדינה - המקיף והעמוק ביותר ללימודי AI", linkTo: "https://www.ariel.ac.il/wp/externalcertificate/%D7%9E%D7%98%D7%9E%D7%99%D7%A2%D7%99-%D7%9E%D7%A2%D7%A8%D7%9B%D7%95%D7%AA-ai/", isExternal: true },
    { title: "קורס Prompt Engineering", duration: "20 שעות", level: "בינוני", description: "שליטה בכתיבת פרומפטים מתקדמים", linkTo: "Contact", isExternal: false },
    { title: "קורס פיתוח תוכנה No Code / Low Code (Vibe Coding)", duration: "40 שעות", level: "מתחילים-בינוני", description: "פיתוח אפליקציות ללא קוד", linkTo: "Contact", isExternal: false },
    { title: "קורס AI לשמאים", duration: "36 שעות", level: "מתקדמים", description: "AI לתחום השמאות והערכת שווי", linkTo: "Contact", isExternal: false }
  ] : [
    { title: "AI Course for Businesses & Freelancers", duration: "80 hours", level: "All Levels", description: "The most practical and comprehensive course for small businesses and freelancers — from zero to full automation", linkTo: "CourseAI", isExternal: false },
    { title: "AI Systems Integrator Course", duration: "446 hours", level: "Advanced", description: "The only government-supervised course in Israel — the most comprehensive AI study program", linkTo: "https://www.ariel.ac.il/wp/externalcertificate/%D7%9E%D7%98%D7%9E%D7%99%D7%A2%D7%99-%D7%9E%D7%A2%D7%A8%D7%9B%D7%95%D7%AA-ai/", isExternal: true },
    { title: "Prompt Engineering Course", duration: "20 hours", level: "Intermediate", description: "Master writing advanced prompts", linkTo: "Contact", isExternal: false },
    { title: "No Code / Low Code Development (Vibe Coding)", duration: "40 hours", level: "Beginner–Intermediate", description: "Build applications without code", linkTo: "Contact", isExternal: false },
    { title: "AI Course for Appraisers", duration: "36 hours", level: "Advanced", description: "AI for the appraisal and valuation field", linkTo: "Contact", isExternal: false }
  ];

  const benefits = lang === "he" ? [
    "הכשרות מותאמות אישית לצרכי הארגון",
    "שילוב הדרכות פרונטליות וגיבוי דיגיטלי",
    "ספרייה דיגיטלית עם תכנים מעודכנים",
    "תעודות והסמכות",
    "ליווי והטמעה ארוכת טווח",
    "קבוצות למידה ותמיכת עמיתים"
  ] : [
    "Customized training for organizational needs",
    "Blend of in-person and digital training",
    "Digital library with updated content",
    "Certificates and accreditations",
    "Long-term support and integration",
    "Learning groups and peer support"
  ];

  const hero_title = lang === "he" ? "מרכז הכשרות מקצועיות" : "Professional Training Center";
  const hero_desc = lang === "he" ? "הכשרות מתקדמות מותאמות תפקיד וארגון - ממנהלים ועד משתמשי קצה" : "Advanced training tailored by role and organization — from managers to end users";
  const hero_cta = lang === "he" ? "קבלו הצעת מחיר להכשרה" : "Get a Training Quote";
  const programs_title = lang === "he" ? "מסלולי ההכשרה שלנו" : "Our Training Programs";
  const programs_sub = lang === "he" ? "הכשרות מותאמות לכל מחלקה ותפקיד" : "Training tailored to every department and role";
  const academy_title = lang === "he" ? "אקדמיית AI" : "AI Academy";
  const academy_sub = lang === "he" ? "קורסים ומסלולי לימוד AI שלנו" : "Our AI courses and study programs";
  const why_title = lang === "he" ? "למה לבחור במרכז ההכשרות שלנו?" : "Why Choose Our Training Center?";
  const learn_more = lang === "he" ? "קבלת עוד פרטים" : "Learn More";
  const cta_title = lang === "he" ? "מוכנים להשקיע בצוות שלכם?" : "Ready to Invest in Your Team?";
  const cta_sub = lang === "he" ? "בואו נבנה תוכנית הכשרה מותאמת לארגון שלכם" : "Let's build a training plan tailored to your organization";
  const cta_btn = lang === "he" ? "קבלו הצעת מחיר מותאמת" : "Get a Custom Quote";
  const mit_title = lang === "he" ? "מחקר MIT" : "MIT Research";
  const mit_text = lang === "he"
    ? 'במחקר שערך MIT נמצא כי עובדים מיומנים המשתמשים בגנרטיב AI מסוגלים להעלות את ביצועיהם כמעט ב-40% יחסית לעובדים שלא השתמשו ב-AI, אך זה תלוי בסוג המשימות ובמגבלות הכלים.'
    : 'An MIT study found that skilled workers using generative AI can improve their performance by nearly 40% compared to those who did not use AI, depending on task type and tool limitations.';

  return (
    <div>
      <ScrollProgress color="purple" />

      {/* Hero */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-fuchsia-500 to-pink-500 mb-6 shadow-2xl shadow-fuchsia-500/60">
              <GraduationCap className="w-10 h-10 text-white drop-shadow-lg" />
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">{hero_title}</h1>
            <p className="text-xl text-gray-300 mb-8">{hero_desc}</p>
            <Link to={createPageUrl("Contact")}>
              <MagneticButton size="lg" className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-bold shadow-2xl shadow-fuchsia-500/50 border border-fuchsia-400">
                {hero_cta}
                <ArrowLeft className="mr-2 h-5 w-5" />
              </MagneticButton>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Training Programs */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950/30">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">{programs_title}</h2>
            <p className="text-xl text-gray-400">{programs_sub}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainingPrograms.map((program, index) => (
              <motion.div key={program.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
                <Link to={createPageUrl(program.linkTo)}>
                  <Card className="bg-slate-900/50 border-white/10 hover:border-fuchsia-500/60 hover:shadow-xl hover:shadow-fuchsia-500/20 transition-all h-full overflow-hidden group cursor-pointer">
                    <div className="relative h-48 overflow-hidden">
                      <img src={program.image} alt={program.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                      <Badge variant="outline" className="absolute top-4 left-4 border-fuchsia-400/60 text-fuchsia-400 bg-slate-900/80 backdrop-blur-sm shadow-lg shadow-fuchsia-500/30">
                        {program.level}
                      </Badge>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-3">{program.title}</h3>
                      <div className="space-y-2 text-sm text-gray-400">
                        <div className="flex items-center gap-2"><Users className="w-4 h-4" />{program.audience}</div>
                        <div className="flex items-center gap-2"><Clock className="w-4 h-4" />{program.duration}</div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MIT Research Stat */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Card className="bg-white border-gray-200 shadow-xl p-12">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-6">
                  <Award className="w-8 h-8 text-gray-700" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide">{mit_title}</h3>
                <div className="text-7xl font-bold text-gray-900 mb-6">40%</div>
                <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">{mit_text}</p>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500 italic">Massachusetts Institute of Technology Research</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Academy Courses */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950/30">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-pink-500 mb-4 shadow-2xl shadow-fuchsia-500/60">
              <GraduationCap className="w-8 h-8 text-white drop-shadow-lg" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">{academy_title}</h2>
            <p className="text-xl text-gray-400">{academy_sub}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course, index) => (
              <motion.div key={course.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <Card className="bg-white border-gray-200 shadow-xl hover:shadow-2xl transition-all h-full p-8 flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-fuchsia-100 flex items-center justify-center shadow-md shadow-fuchsia-500/20">
                      <BookOpen className="w-6 h-6 text-fuchsia-600" />
                    </div>
                    <Badge className="bg-fuchsia-100 text-fuchsia-700 border-0 font-semibold shadow-sm shadow-fuchsia-500/20">{course.level}</Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">{course.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed flex-1">{course.description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-200">
                    <Clock className="w-4 h-4" />{course.duration}
                  </div>
                  {course.isExternal ? (
                    <a href={course.linkTo} target="_blank" rel="noopener noreferrer" className="mt-auto">
                      <Button className="w-full bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-semibold shadow-xl shadow-fuchsia-500/40 border border-fuchsia-400">
                        {learn_more}<ArrowLeft className="mr-2 h-4 w-4" />
                      </Button>
                    </a>
                  ) : (
                    <Link to={createPageUrl(course.linkTo)} className="mt-auto">
                      <Button className="w-full bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-semibold shadow-xl shadow-fuchsia-500/40 border border-fuchsia-400">
                        {learn_more}<ArrowLeft className="mr-2 h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">{why_title}</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div key={benefit} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="flex items-start gap-3 p-4 bg-slate-900/50 rounded-lg border border-white/10">
                <Award className="w-6 h-6 text-fuchsia-400 flex-shrink-0 mt-0.5 drop-shadow-[0_0_8px_rgba(217,70,239,0.6)]" />
                <span className="text-gray-300">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gradient-to-l from-fuchsia-500/20 to-pink-500/20 rounded-3xl p-12 border border-fuchsia-500/40 shadow-2xl shadow-fuchsia-500/20 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">{cta_title}</h2>
            <p className="text-xl text-gray-300 mb-8">{cta_sub}</p>
            <Link to={createPageUrl("Contact")}>
              <MagneticButton size="lg" className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-bold text-lg px-10 py-6 shadow-2xl shadow-fuchsia-500/50 border border-fuchsia-400">
                {cta_btn}<ArrowLeft className="mr-2 h-5 w-5" />
              </MagneticButton>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}