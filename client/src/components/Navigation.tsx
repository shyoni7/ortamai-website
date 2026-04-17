import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-strong shadow-lg' : 'bg-transparent'}`}
      dir={dir}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" aria-label="ORTAM AI - דף הבית">
            <motion.div className="flex items-center gap-1 cursor-pointer" whileHover={{ scale: 1.02 }}>
              <span className="text-2xl font-bold text-gradient-cyan">ORTAM</span>
              <span className="text-2xl font-bold text-white"> AI</span>
            </motion.div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <motion.span
                  className={`px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors duration-200 ${location === link.href ? 'text-cyan-400 bg-cyan-400/10' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}
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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
              aria-label={lang === 'he' ? 'Switch to English' : 'עבור לעברית'}
            >
              <Globe size={14} />
              <span>{lang === 'he' ? 'EN' : 'עב'}</span>
            </button>

            <Link href="/contact">
              <motion.button className="hidden md:block btn-primary text-sm px-5 py-2.5" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                {t.nav.cta}
              </motion.button>
            </Link>

            <button
              className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
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
            className="lg:hidden glass-strong border-t border-white/10"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span className={`block px-4 py-3 rounded-lg text-sm font-medium cursor-pointer transition-colors ${location === link.href ? 'text-cyan-400 bg-cyan-400/10' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}>
                    {link.label}
                  </span>
                </Link>
              ))}
              <Link href="/contact">
                <button className="w-full btn-primary text-sm py-3 mt-3">{t.nav.cta}</button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
