import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card } from "@/components/ui/card";
import { Map, Home, Briefcase, GraduationCap, Users, User, Phone, BookOpen, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function SiteMap() {
  const sections = [
    {
      title: "עמודים ראשיים",
      icon: Home,
      pages: [
        { name: "דף הבית", href: createPageUrl("Home"), icon: Home },
        { name: "אקסלרטור ליזמים ועסקים", href: createPageUrl("Incubator"), icon: Briefcase },
        { name: "מרכז הכשרות", href: createPageUrl("Academy"), icon: GraduationCap },
        { name: "מרכז השמה", href: createPageUrl("Placement"), icon: Users },
        { name: "אודות", href: createPageUrl("About"), icon: User },
        { name: "צור קשר", href: createPageUrl("Contact"), icon: Phone },
      ]
    },
    {
      title: "קורסים והכשרות",
      icon: BookOpen,
      pages: [
        { name: "קורס AI לעסקים ועצמאים", href: createPageUrl("CourseAI"), icon: BookOpen },
      ]
    },
    {
      title: "מידע ונגישות",
      icon: FileText,
      pages: [
        { name: "הצהרת נגישות", href: createPageUrl("AccessibilityStatement"), icon: FileText },
        { name: "מפת האתר", href: createPageUrl("SiteMap"), icon: Map },
      ]
    }
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-100 mb-4">
              <Map className="w-8 h-8 text-cyan-600" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              מפת האתר
            </h1>
            <p className="text-xl text-gray-300">
              כל הדפים והמידע באתר במקום אחד
            </p>
          </div>

          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center">
                      <section.icon className="w-5 h-5 text-cyan-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {section.title}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section.pages.map((page) => (
                      <Link
                        key={page.href}
                        to={page.href}
                        className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-cyan-500 hover:bg-cyan-50 transition-all group"
                      >
                        <page.icon className="w-5 h-5 text-gray-400 group-hover:text-cyan-600 transition-colors" />
                        <span className="text-gray-700 group-hover:text-cyan-600 font-medium transition-colors">
                          {page.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="bg-white p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                צריכים עזרה למצוא משהו?
              </h3>
              <p className="text-gray-600 mb-6">
                אם אתם לא מוצאים את מה שאתם מחפשים, אתם מוזמנים ליצור איתנו קשר
              </p>
              <Link to={createPageUrl("Contact")}>
                <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
                  צרו קשר
                </button>
              </Link>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}