import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Globe, CalendarCheck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const LOGO = '/images/brand/ortam-logo.png';

export default function Navigation() {
  const { lang, setLang, t, dir } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const he = lang === 'he';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  // Lock page scroll behind the open mobile menu.
  useEffect(() => {
    document.documentElement.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.documentElement.style.overflow = ''; };
  }, [isOpen]);

  const navLinks = [
    { href: '/courses', label: t.nav.courses },
    { href: '/academy', label: t.nav.academy },
    { href: '/placement', label: t.nav.placement },
    { href: '/consulting', label: t.nav.incubator },
    { href: '/about', label: t.nav.about },
    { href: '/contact', label: t.nav.contact },
  ];

  const ctaLabel = he ? 'תאמו שיחה' : 'Book a call';
  const isActive = (href: string) => location === href;

  return (
    <nav
      aria-label={he ? 'ניווט ראשי' : 'Main navigation'}
      dir={dir}
      className={`site-nav fixed inset-x-0 top-0 z-50 ${scrolled || isOpen ? 'is-scrolled' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-14 md:h-20">
          <Link href="/" aria-label={he ? 'ORTAM AI, דף הבית' : 'ORTAM AI, home'} className="shrink-0 rounded-lg">
            <img src={LOGO} alt="ORTAM AI" className="h-7 md:h-9 w-auto" />
          </Link>

          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className="site-nav-link"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5 md:gap-3">
            <button
              type="button"
              onClick={() => setLang(he ? 'en' : 'he')}
              className="site-nav-lang"
              aria-label={he ? 'Switch to English' : 'עבור לעברית'}
            >
              <Globe size={16} aria-hidden="true" />
              <span>{he ? 'EN' : 'עב'}</span>
            </button>
            <span className="hidden sm:block">
              <Link href="/contact" className="h-btn h-btn-orange site-nav-cta whitespace-nowrap">
                <CalendarCheck size={17} aria-hidden="true" />
                <span>{ctaLabel}</span>
              </Link>
            </span>
            <button
              type="button"
              className="lg:hidden site-nav-burger"
              onClick={() => setIsOpen(o => !o)}
              aria-label={isOpen ? (he ? 'סגירת תפריט' : 'Close menu') : (he ? 'פתיחת תפריט' : 'Open menu')}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div id="mobile-menu" className="lg:hidden site-nav-sheet">
          <ul className="px-5 pt-2 pb-6 max-w-7xl mx-auto">
            {navLinks.map((link, i) => (
              <li key={link.href} style={{ animationDelay: `${i * 35}ms` }} className="site-nav-sheet-item">
                <Link href={link.href} aria-current={isActive(link.href) ? 'page' : undefined} className="site-nav-sheet-link">
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-5 site-nav-sheet-item" style={{ animationDelay: `${navLinks.length * 35}ms` }}>
              <Link href="/contact" className="h-btn h-btn-orange w-full">
                <CalendarCheck size={18} aria-hidden="true" />
                <span>{ctaLabel}</span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
