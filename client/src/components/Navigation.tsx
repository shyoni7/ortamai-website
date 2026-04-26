import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import GradientButton from '@/components/GradientButton';

export default function Navigation() {
  const { lang, setLang, t, dir } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/incubator', label: t.nav.incubator },
    { href: '/academy', label: t.nav.academy },
    { href: '/placement', label: t.nav.placement },
    { href: '/about', label: t.nav.about },
    { href: '/contact', label: t.nav.contact },
  ];

  return (
    <nav
      role="navigation"
      aria-label="ניווט ראשי"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-sm border-b border-gray-100`}
      dir={dir}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" aria-label="ORTAM AI - דף הבית">
            <motion.div className="flex items-center cursor-pointer" whileHover={{ scale: 1.02 }}>
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663445418346/IRPaHXJaeSVGQomy.webp"
                alt="ORTAM AI"
                className="h-10 w-auto object-contain"
              />
            </motion.div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <motion.span
                  className={`px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors duration-200 ${location === link.href ? 'text-orange-500 bg-orange-50' : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'}`}
                  whileHover={{ y: -1 }}
                >
                  {link.label}
                </motion.span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'he' ? 'en' : 'he')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 hover:text-orange-500 hover:bg-orange-50 transition-colors"
              aria-label={lang === 'he' ? 'Switch to English' : 'עבור לעברית'}
            >
              <Globe size={14} />
              <span>{lang === 'he' ? 'EN' : 'עב'}</span>
            </button>

            <div className="hidden md:block">
              <GradientButton href="/contact" size="sm">
                {t.nav.cta}
              </GradientButton>
            </div>

            <button
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-orange-500 hover:bg-orange-50 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'סגור תפריט' : 'פתח תפריט'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-md"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span className={`block px-4 py-3 rounded-lg text-sm font-medium cursor-pointer transition-colors ${location === link.href ? 'text-orange-500 bg-orange-50' : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'}`}>
                    {link.label}
                  </span>
                </Link>
              ))}
              <div className="mt-3 flex justify-center">
                <GradientButton href="/contact" size="sm">
                  {t.nav.cta}
                </GradientButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
