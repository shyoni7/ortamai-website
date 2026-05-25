import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Eye,
  EyeOff,
  Type,
  Bold,
  Heading,
  Link2,
  Map,
  FileText,
  RotateCcw,
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ACCESSIBILITY_LOGO =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663445418346/oDFneUKwvw2xJYXYaumUdB/73e8a1f5d_images_f41438b1.png';

// ─── Helpers ────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'ortam-a11y-prefs';

interface Prefs {
  fontSize: number;
  advancedNav: boolean;
  noAnimations: boolean;
  highContrast: boolean;
  boldText: boolean;
  markHeadings: boolean;
  markLinks: boolean;
}

const DEFAULT_PREFS: Prefs = {
  fontSize: 100,
  advancedNav: false,
  noAnimations: false,
  highContrast: false,
  boldText: false,
  markHeadings: false,
  markLinks: false,
};

function loadPrefs(): Prefs {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_PREFS, ...JSON.parse(raw) };
  } catch {}
  return { ...DEFAULT_PREFS };
}

function applyPrefs(prefs: Prefs) {
  const root = document.documentElement;

  // font size
  root.style.fontSize = `${prefs.fontSize}%`;

  // CSS class toggles
  const classes: Record<keyof Omit<Prefs, 'fontSize'>, string> = {
    advancedNav: 'a11y-advanced-nav',
    noAnimations: 'a11y-no-animations',
    highContrast: 'a11y-high-contrast',
    boldText: 'a11y-bold-text',
    markHeadings: 'a11y-mark-headings',
    markLinks: 'a11y-mark-links',
  };

  (Object.keys(classes) as Array<keyof typeof classes>).forEach((key) => {
    root.classList.toggle(classes[key], prefs[key]);
  });
}

// ─── Toggle Row ──────────────────────────────────────────────────────────────

interface ToggleRowProps {
  icon: React.ReactNode;
  label: string;
  checked: boolean;
  onToggle: () => void;
}

function ToggleRow({ icon, label, checked, onToggle }: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-3">
        <span className="text-gray-500 flex-shrink-0">{icon}</span>
        <span className="text-gray-800 text-sm font-medium">{label}</span>
      </div>
      {/* Toggle switch */}
      <button
        role="switch"
        aria-checked={checked}
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1 ${
          checked ? 'bg-gray-800' : 'bg-gray-200'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function AccessibilityWidget() {
  const { lang } = useLanguage();
  const isHe = lang === 'he';

  const [isOpen, setIsOpen] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>(loadPrefs);

  // Apply prefs on mount and whenever they change
  useEffect(() => {
    applyPrefs(prefs);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  }, [prefs]);

  const toggle = useCallback(
    (key: keyof Omit<Prefs, 'fontSize'>) => {
      setPrefs((p) => ({ ...p, [key]: !p[key] }));
    },
    []
  );

  const changeFontSize = useCallback((delta: number) => {
    setPrefs((p) => ({
      ...p,
      fontSize: Math.min(150, Math.max(80, p.fontSize + delta)),
    }));
  }, []);

  const resetAll = useCallback(() => {
    setPrefs({ ...DEFAULT_PREFS });
  }, []);

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[9999]">
      {/* ── Panel ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop (mobile) */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              key="panel"
              initial={{ opacity: 0, x: 40, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              dir="rtl"
              className="
                absolute bottom-16 right-0
                w-[300px] max-h-[80vh]
                bg-white rounded-2xl shadow-2xl border border-gray-200
                flex flex-col overflow-hidden
              "
              role="dialog"
              aria-modal="true"
              aria-label={isHe ? 'תפריט נגישות' : 'Accessibility menu'}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
                <h2 className="text-gray-900 font-bold text-base">
                  {isHe ? 'תפריט נגישות' : 'Accessibility'}
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-700 transition-colors p-1 rounded-lg hover:bg-gray-100"
                  aria-label={isHe ? 'סגור תפריט נגישות' : 'Close accessibility menu'}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto px-5 py-2">

                {/* Advanced Navigation */}
                <ToggleRow
                  icon={<Eye size={18} />}
                  label={isHe ? 'ניגודיות מוקדמת' : 'Enhanced Contrast'}
                  checked={prefs.advancedNav}
                  onToggle={() => toggle('advancedNav')}
                />

                {/* No Animations */}
                <ToggleRow
                  icon={<EyeOff size={18} />}
                  label={isHe ? 'ביטול אנימציות / תנובתיות' : 'Disable Animations'}
                  checked={prefs.noAnimations}
                  onToggle={() => toggle('noAnimations')}
                />

                {/* High Contrast */}
                <ToggleRow
                  icon={
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 2a10 10 0 0 1 0 20V2z" fill="currentColor" stroke="none" />
                    </svg>
                  }
                  label="Contrast"
                  checked={prefs.highContrast}
                  onToggle={() => toggle('highContrast')}
                />

                {/* Font Size */}
                <div className="py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-gray-500 flex-shrink-0"><Type size={18} /></span>
                    <span className="text-gray-800 text-sm font-medium">
                      {isHe ? 'גודל טקסט' : 'Text Size'}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={() => changeFontSize(-10)}
                      disabled={prefs.fontSize <= 80}
                      className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-lg font-light"
                      aria-label={isHe ? 'הקטן טקסט' : 'Decrease text'}
                    >
                      −
                    </button>
                    <span className="text-gray-800 font-semibold text-sm w-14 text-center">
                      {prefs.fontSize}%
                    </span>
                    <button
                      onClick={() => changeFontSize(10)}
                      disabled={prefs.fontSize >= 150}
                      className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-lg font-light"
                      aria-label={isHe ? 'הגדל טקסט' : 'Increase text'}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Bold Text */}
                <ToggleRow
                  icon={<Bold size={18} />}
                  label={isHe ? 'נטוי קריא' : 'Bold Text'}
                  checked={prefs.boldText}
                  onToggle={() => toggle('boldText')}
                />

                {/* Mark Headings */}
                <ToggleRow
                  icon={<Heading size={18} />}
                  label={isHe ? 'סימון כותרות' : 'Mark Headings'}
                  checked={prefs.markHeadings}
                  onToggle={() => toggle('markHeadings')}
                />

                {/* Mark Links */}
                <ToggleRow
                  icon={<Link2 size={18} />}
                  label={isHe ? 'סימון קישורים והיצמדים' : 'Mark Links'}
                  checked={prefs.markLinks}
                  onToggle={() => toggle('markLinks')}
                />

                {/* Accessibility Statement */}
                <div className="pt-3 pb-1 space-y-1">
                  <a
                    href="/accessibility"
                    className="flex items-center gap-3 py-2 text-gray-600 hover:text-gray-900 text-sm transition-colors"
                  >
                    <FileText size={18} className="text-gray-400 flex-shrink-0" />
                    <span>{isHe ? 'הצהרת נגישות' : 'Accessibility Statement'}</span>
                  </a>
                  <a
                    href="/"
                    className="flex items-center gap-3 py-2 text-gray-600 hover:text-gray-900 text-sm transition-colors"
                  >
                    <Map size={18} className="text-gray-400 flex-shrink-0" />
                    <span>{isHe ? 'מפת האתר' : 'Site Map'}</span>
                  </a>
                </div>
              </div>

              {/* Footer – Reset */}
              <div className="px-5 py-4 border-t border-gray-100 flex-shrink-0">
                <button
                  onClick={resetAll}
                  className="w-full py-2.5 rounded-xl border border-red-300 text-red-500 hover:bg-red-50 text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw size={15} />
                  {isHe ? 'אפס הגדרות נגישות' : 'Reset Accessibility Settings'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Trigger Button ── */}
      <motion.button
        onClick={() => setIsOpen((v) => !v)}
        className="w-11 h-11 md:w-14 md:h-14 rounded-full overflow-hidden shadow-lg hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isHe ? 'פתח תפריט נגישות' : 'Open accessibility menu'}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        <img
          src={ACCESSIBILITY_LOGO}
          alt={isHe ? 'נגישות' : 'Accessibility'}
          className="w-full h-full object-cover"
        />
      </motion.button>
    </div>
  );
}
