import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Cookie } from "lucide-react";
import { useLanguage } from "../LanguageContext";

export default function CookieConsent() {
  const { lang } = useLanguage();
  const isEn = lang === "en";
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowConsent(false);
  };

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
        >
          <Card className="max-w-4xl mx-auto p-6 bg-white border-gray-200 shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                <Cookie className="w-6 h-6 text-cyan-600" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {isEn ? "Cookie Usage" : "שימוש בעוגיות"}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {isEn
                    ? "We use cookies to improve your browsing experience, analyze site traffic, and offer personalized content. Continuing to browse the site constitutes consent to the use of cookies."
                    : "אנו משתמשים בעוגיות כדי לשפר את חוויית הגלישה שלך, לנתח תנועה באתר ולהציע תוכן מותאם אישית. המשך הגלישה באתר מהווה הסכמה לשימוש בעוגיות."}
                </p>
                
                <div className="flex gap-3">
                  <Button
                    onClick={handleAccept}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold"
                  >
                    {isEn ? "I Agree" : "אני מסכים"}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}