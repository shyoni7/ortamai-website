import React from 'react';
import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t, dir, lang } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer
      dir={dir}
      style={{ background: '#08080C', borderTop: '1px solid rgba(200,200,208,0.1)' }}
    >
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-10">

          {/* Brand */}
          <div>
            <img
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663445418346/DUvoZJgmUPGXkGcy.png"
              alt="ORTAM AI"
              className="h-9 w-auto object-contain mb-4"
              style={{ filter: 'brightness(1.1)' }}
            />
            <p style={{ color: 'rgba(200,200,208,0.55)', fontSize: '0.875rem', lineHeight: '1.7' }}>
              {t.footer.tagline}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3
              className="font-semibold text-sm uppercase tracking-widest mb-5"
              style={{ color: '#C8C8D0', letterSpacing: '0.12em' }}
            >
              {lang === 'he' ? 'ניווט מהיר' : 'Quick Links'}
            </h3>
            <div className="space-y-2.5">
              {[
                { href: '/', label: t.nav.home },
                { href: '/about', label: t.nav.about },
                { href: '/incubator', label: t.nav.incubator },
                { href: '/academy', label: t.nav.academy },
                { href: '/placement', label: t.nav.placement },
                { href: '/contact', label: t.nav.contact },
              ].map(link => (
                <Link key={link.href} href={link.href}>
                  <span
                    className="block text-sm cursor-pointer transition-colors duration-200"
                    style={{ color: 'rgba(200,200,208,0.55)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#C8C8D0')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(200,200,208,0.55)')}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="font-semibold text-sm uppercase tracking-widest mb-5"
              style={{ color: '#C8C8D0', letterSpacing: '0.12em' }}
            >
              {lang === 'he' ? 'צור קשר' : 'Contact'}
            </h3>
            <div className="space-y-2.5 text-sm" style={{ color: 'rgba(200,200,208,0.55)' }}>
              <p>info@ortamai.com</p>
              <a
                href="https://wa.me/972523381822"
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-colors duration-200"
                style={{ color: 'rgba(200,200,208,0.55)' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#C8C8D0')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(200,200,208,0.55)')}
              >
                WhatsApp: 052-338-1822
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm"
          style={{ borderTop: '1px solid rgba(200,200,208,0.08)', color: 'rgba(200,200,208,0.35)' }}
        >
          <p>© {year} ORTAM AI. {t.footer.rights}</p>
          <div className="flex gap-5">
            <Link href="/accessibility">
              <span
                className="cursor-pointer transition-colors duration-200"
                style={{ color: 'rgba(200,200,208,0.35)' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#C8C8D0')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(200,200,208,0.35)')}
              >
                {t.footer.accessibility}
              </span>
            </Link>
            <Link href="/privacy">
              <span
                className="cursor-pointer transition-colors duration-200"
                style={{ color: 'rgba(200,200,208,0.35)' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#C8C8D0')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(200,200,208,0.35)')}
              >
                {lang === 'he' ? 'מדיניות פרטיות' : 'Privacy Policy'}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
