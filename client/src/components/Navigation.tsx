import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, Bot } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const OBS   = '#08080C';
const OBS2  = '#111116';
const PLAT  = '#C8C8D0';
const WHITE = '#FFFFFF';

export default function Navigation() {
  const { lang, setLang, t, dir } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
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

  // When scrolled: white bg with subtle shadow. When at top: dark/transparent to blend with hero.
  const navBg = scrolled
    ? 'rgba(255,255,255,0.97)'
    : OBS;
  const navBorder = scrolled
    ? 'rgba(0,0,0,0.08)'
    : 'rgba(200,200,208,0.1)';
  const navShadow = scrolled
    ? '0 2px 20px rgba(0,0,0,0.08)'
    : 'none';

  const linkColor = (href: string) => {
    const isActive = location === href;
    if (scrolled) {
      return isActive ? OBS : '#555';
    }
    return isActive ? WHITE : PLAT;
  };

  const linkBg = (href: string) => {
    const isActive = location === href;
    if (scrolled) {
      return isActive ? 'rgba(0,0,0,0.06)' : 'transparent';
    }
    return isActive ? 'rgba(200,200,208,0.12)' : 'transparent';
  };

  const linkHoverColor = scrolled ? OBS : WHITE;
  const linkHoverBg = scrolled ? 'rgba(0,0,0,0.05)' : 'rgba(200,200,208,0.1)';

  return (
    <nav
      role="navigation"
      aria-label="ניווט ראשי"
      dir={dir}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 50,
        background: navBg,
        borderBottom: `1px solid ${navBorder}`,
        boxShadow: navShadow,
        transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-20">

          {/* Logo */}
          <Link href="/" aria-label="ORTAM AI - דף הבית">
            <motion.div className="flex items-center cursor-pointer" whileHover={{ scale: 1.02 }}>
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663445418346/DUvoZJgmUPGXkGcy.png"
                alt="ORTAM AI"
                className="h-8 md:h-10 w-auto object-contain"
                style={{ filter: scrolled ? 'none' : 'brightness(1.1)' }}
              />
            </motion.div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <motion.span
                  className="px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200"
                  style={{
                    color: linkColor(link.href),
                    background: linkBg(link.href),
                  }}
                  whileHover={{
                    y: -1,
                    color: linkHoverColor,
                    background: linkHoverBg,
                  }}
                >
                  {link.label}
                </motion.span>
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === 'he' ? 'en' : 'he')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                color: scrolled ? '#666' : PLAT,
                background: 'transparent',
              }}
              aria-label={lang === 'he' ? 'Switch to English' : 'עבור לעברית'}
            >
              <Globe size={14} />
              <span>{lang === 'he' ? 'EN' : 'עב'}</span>
            </button>

            {/* WhatsApp CTA — desktop */}
            <div className="hidden md:block">
              <a
                href="https://app.ortamai.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                  boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)',
                }}
              >
                <Bot size={13} className="shrink-0" />
                <span>{lang === 'he' ? 'צרו סוכן אוטומטי לוואטסאפ' : 'Create WhatsApp AI Agent'}</span>
              </a>
            </div>

            {/* Hamburger */}
            <button
              className="lg:hidden p-2 rounded-lg transition-colors"
              style={{ color: scrolled ? '#555' : PLAT }}
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'סגור תפריט' : 'פתח תפריט'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: OBS2,
              borderTop: `1px solid rgba(200,200,208,0.1)`,
            }}
            className="lg:hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    className="block px-4 py-3 rounded-lg text-sm font-medium cursor-pointer transition-all"
                    style={{
                      color: location === link.href ? WHITE : PLAT,
                      background: location === link.href ? 'rgba(200,200,208,0.12)' : 'transparent',
                    }}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
              <div className="mt-3 flex justify-center pb-1">
                <a
                  href="https://app.ortamai.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                    boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)',
                  }}
                >
                  <Bot size={15} className="shrink-0" />
                  <span>{lang === 'he' ? 'צרו סוכן אוטומטי לוואטסאפ' : 'Create WhatsApp AI Agent'}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
