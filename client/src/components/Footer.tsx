import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t, dir, lang } = useLanguage();
  const year = new Date().getFullYear();
  const he = lang === 'he';

  const links = [
    { href: '/courses', label: t.nav.courses },
    { href: '/academy', label: t.nav.academy },
    { href: '/placement', label: t.nav.placement },
    { href: '/consulting', label: t.nav.incubator },
    { href: '/about', label: t.nav.about },
    { href: '/contact', label: t.nav.contact },
  ];

  return (
    <footer dir={dir} className="site-footer">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-14 pb-8 md:pt-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="/" aria-label={he ? 'ORTAM AI, דף הבית' : 'ORTAM AI, home'} className="inline-block rounded-lg">
              <img src="/images/brand/ortam-logo.png" alt="ORTAM AI" className="h-9 w-auto" />
            </Link>
            <p className="mt-4 text-base leading-relaxed max-w-[42ch]" style={{ color: 'var(--h-ink-2)' }}>
              {t.footer.tagline}
            </p>
          </div>

          <nav aria-label={he ? 'ניווט בפוטר' : 'Footer navigation'} className="md:col-span-4">
            <h2 className="site-footer-title">{he ? 'ניווט' : 'Navigate'}</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1">
              {links.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="site-footer-link">{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className="site-footer-title">{he ? 'צור קשר' : 'Contact'}</h2>
            <ul className="mt-4 space-y-1">
              <li><a href="mailto:info@ortamai.com" className="site-footer-link" dir="ltr">info@ortamai.com</a></li>
              <li>
                <a href="https://wa.me/972523381822" target="_blank" rel="noopener noreferrer" className="site-footer-link">
                  WhatsApp: <span dir="ltr">052-338-1822</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm" style={{ borderColor: 'var(--h-line)', color: 'var(--h-ink-2)' }}>
          <p>© {year} ORTAM AI. {t.footer.rights}</p>
          <div className="flex gap-6">
            <Link href="/accessibility" className="site-footer-link">{t.footer.accessibility}</Link>
            <Link href="/privacy" className="site-footer-link">{he ? 'מדיניות פרטיות' : 'Privacy Policy'}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
