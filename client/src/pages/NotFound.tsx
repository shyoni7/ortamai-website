import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';

export default function NotFound() {
  const { lang, dir } = useLanguage();
  const he = lang === 'he';

  return (
    <section dir={dir} className="min-h-[70svh] flex items-center" style={{ background: 'var(--h-dark)' }}>
      <div className="mx-auto max-w-3xl px-5 sm:px-8 py-20 text-start">
        <p className="font-extrabold text-white leading-none" style={{ fontFamily: 'Rubik, Heebo, sans-serif', fontSize: 'clamp(4rem, 14vw, 8rem)' }}>404</p>
        <h1 className="mt-4 text-2xl md:text-4xl font-bold text-white">{he ? 'העמוד לא נמצא' : 'Page not found'}</h1>
        <p className="mt-3 text-lg max-w-[50ch]" style={{ color: 'var(--h-on-dark)' }}>
          {he ? 'ייתכן שהעמוד הועבר או נמחק.' : 'The page may have been moved or deleted.'}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link href="/" className="h-btn h-btn-accent">{he ? 'לדף הבית' : 'Go home'}</Link>
          <Link href="/courses" className="h-btn h-btn-light">{he ? 'לקורסים' : 'See courses'}</Link>
        </div>
      </div>
    </section>
  );
}
