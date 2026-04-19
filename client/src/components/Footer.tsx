import React from 'react';
import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t, dir, lang } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-background/50" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="text-2xl font-bold text-gradient-cyan mb-3">ORTAM AI</div>
            <p className="text-gray-400 text-sm leading-relaxed">{t.footer.tagline}</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">{lang === 'he' ? 'ניווט מהיר' : 'Quick Links'}</h3>
            <div className="space-y-2">
              {[
                { href: '/', label: t.nav.home },
                { href: '/about', label: t.nav.about },
                { href: '/incubator', label: t.nav.incubator },
                { href: '/academy', label: t.nav.academy },
                { href: '/placement', label: t.nav.placement },
                { href: '/contact', label: t.nav.contact },
              ].map(link => (
                <Link key={link.href} href={link.href}>
                  <span className="block text-gray-400 hover:text-cyan-400 text-sm transition-colors cursor-pointer">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">{lang === 'he' ? 'צור קשר' : 'Contact'}</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>ortamai.il@gmail.com</p>
              <a
                href="https://wa.me/972528083800"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-cyan-400 transition-colors"
              >
                WhatsApp: 052-808-3800
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {year} ORTAM AI. {t.footer.rights}</p>
          <div className="flex gap-4">
            <Link href="/accessibility">
              <span className="hover:text-cyan-400 transition-colors cursor-pointer">{t.footer.accessibility}</span>
            </Link>
            <Link href="/privacy">
              <span className="hover:text-cyan-400 transition-colors cursor-pointer">{lang === 'he' ? 'מדיניות פרטיות' : 'Privacy Policy'}</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
