
import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const phoneNumber = "972523381822";
  
  // ההודעה שתישלח - בלי אמוג'י בסוף
  const message = "שלום! הגעתי מהאתר של ORTAM AI ואשמח לקבל מידע נוסף";
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  React.useEffect(() => {
    const showTimer = setTimeout(() => setShowTooltip(true), 3000);
    const hideTimer = setTimeout(() => setShowTooltip(false), 8000);
    
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: -20, scale: 0.8 }}
        animate={{ 
          opacity: showTooltip ? 1 : 0,
          x: showTooltip ? 0 : -20,
          scale: showTooltip ? 1 : 0.8
        }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-20 left-0 bg-white rounded-2xl shadow-2xl p-4 mb-2 min-w-[200px]"
        style={{
          display: showTooltip ? 'block' : 'none',
          pointerEvents: showTooltip ? 'auto' : 'none'
        }}
      >
        <button
          onClick={() => setShowTooltip(false)}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="text-right pr-2">
          <p className="text-gray-900 font-semibold mb-1">💬 יש שאלה?</p>
          <p className="text-gray-600 text-sm">דברו איתנו בוואטסאפ!</p>
        </div>
        <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white transform rotate-45" />
      </motion.div>

      {/* הכפתור */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="block"
        whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
      >
        <motion.div
          className="relative w-16 h-16 rounded-full shadow-2xl cursor-pointer overflow-hidden"
          animate={shouldReduceMotion ? {} : {
            boxShadow: isHovered 
              ? "0 20px 40px rgba(34, 197, 94, 0.4)" 
              : "0 10px 30px rgba(34, 197, 94, 0.3)"
          }}
        >
          {/* אפקט Ripple */}
          {!shouldReduceMotion && (
            <>
              <motion.div
                className="absolute inset-0 bg-green-400 rounded-full"
                animate={{
                  scale: [1, 1.5, 1.5],
                  opacity: [0.5, 0.2, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
              <motion.div
                className="absolute inset-0 bg-green-400 rounded-full"
                animate={{
                  scale: [1, 1.5, 1.5],
                  opacity: [0.5, 0.2, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 1
                }}
              />
            </>
          )}

          {/* אייקון וואטסאפ */}
          <motion.img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68e574c17d6cef9aeff80637/e06702e0c_.png"
            alt="WhatsApp"
            className="w-full h-full object-cover relative z-10"
            animate={shouldReduceMotion ? {} : {
              rotate: isHovered ? [0, -5, 5, -5, 0] : 0
            }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>

        {/* Badge */}
        <motion.div
          className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          <span className="text-white text-xs font-bold">1</span>
        </motion.div>
      </motion.a>

      {/* טקסט מתחת */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="hidden md:block absolute -bottom-6 left-0 right-0 text-center"
      >
        <span className="text-xs text-gray-600 font-medium whitespace-nowrap">
          זמינים עכשיו
        </span>
      </motion.div>
    </div>
  );
}
