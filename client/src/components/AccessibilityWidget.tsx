import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Accessibility, X, ZoomIn, ZoomOut, Eye, Type, Contrast } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AccessibilityWidget() {
  const { lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [underlineLinks, setUnderlineLinks] = useState(false);

  const increaseFontSize = () => {
    const newSize = Math.min(fontSize + 10, 150);
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}%`;
  };

  const decreaseFontSize = () => {
    const newSize = Math.max(fontSize - 10, 80);
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}%`;
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    document.documentElement.classList.toggle('high-contrast');
  };

  const toggleUnderlineLinks = () => {
    setUnderlineLinks(!underlineLinks);
    document.documentElement.classList.toggle('underline-links');
  };

  const resetAll = () => {
    setFontSize(100);
    setHighContrast(false);
    setUnderlineLinks(false);
    document.documentElement.style.fontSize = '100%';
    document.documentElement.classList.remove('high-contrast', 'underline-links');
  };

  const isHe = lang === 'he';

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="glass-strong rounded-2xl p-4 mb-3 w-56"
            dir={isHe ? 'rtl' : 'ltr'}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-semibold text-sm">{isHe ? 'נגישות' : 'Accessibility'}</h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white" aria-label="סגור">
                <X size={16} />
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-xs">{isHe ? 'גודל טקסט' : 'Text Size'}</span>
                <div className="flex items-center gap-2">
                  <button onClick={decreaseFontSize} className="p-1 rounded glass hover:bg-white/10 text-gray-300 hover:text-white" aria-label={isHe ? 'הקטן טקסט' : 'Decrease text'}>
                    <ZoomOut size={14} />
                  </button>
                  <span className="text-xs text-cyan-400 w-8 text-center">{fontSize}%</span>
                  <button onClick={increaseFontSize} className="p-1 rounded glass hover:bg-white/10 text-gray-300 hover:text-white" aria-label={isHe ? 'הגדל טקסט' : 'Increase text'}>
                    <ZoomIn size={14} />
                  </button>
                </div>
              </div>
              <button
                onClick={toggleHighContrast}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-colors ${highContrast ? 'bg-cyan-400/20 text-cyan-400' : 'glass text-gray-300 hover:text-white'}`}
                aria-pressed={highContrast}
              >
                <Contrast size={14} />
                {isHe ? 'ניגודיות גבוהה' : 'High Contrast'}
              </button>
              <button
                onClick={toggleUnderlineLinks}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-colors ${underlineLinks ? 'bg-cyan-400/20 text-cyan-400' : 'glass text-gray-300 hover:text-white'}`}
                aria-pressed={underlineLinks}
              >
                <Type size={14} />
                {isHe ? 'הדגש קישורים' : 'Underline Links'}
              </button>
              <button
                onClick={resetAll}
                className="w-full px-3 py-2 rounded-lg text-xs glass text-gray-400 hover:text-white transition-colors"
              >
                {isHe ? 'איפוס' : 'Reset'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full glass-strong flex items-center justify-center text-cyan-400 hover:text-white hover:bg-cyan-400/20 transition-colors shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isHe ? 'פתח תפריט נגישות' : 'Open accessibility menu'}
        aria-expanded={isOpen}
      >
        <Accessibility size={20} />
      </motion.button>
    </div>
  );
}
