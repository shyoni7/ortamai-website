import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navigation() {
  const { lang, setLang, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dir = lang === 'he' ? 'rtl' : 'ltr';

  const navItems = [
    { label: t.nav.home, href: '#' },
    { label: t.nav.incubator, href: '#' },
    { label: t.nav.academy, href: '#' },
    { label: t.nav.placement, href: '#' },
    { label: t.nav.about, href: '#' },
    { label: t.nav.contact, href: '#' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0"
          >
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              ORTAM AI
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="text-sm font-medium text-foreground/80 hover:text-cyan-400 transition-colors relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </motion.a>
            ))}
          </div>

          {/* Language Toggle & CTA */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLang(lang === 'he' ? 'en' : 'he')}
              className="px-3 py-1.5 rounded-full border border-cyan-400/50 text-xs font-semibold text-cyan-400 hover:bg-cyan-400/10 transition-colors"
            >
              {lang === 'he' ? 'EN' : 'עב'}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4 space-y-2"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block px-4 py-2 text-sm font-medium text-foreground/80 hover:text-cyan-400 hover:bg-white/5 rounded-lg transition-colors"
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  );
}
