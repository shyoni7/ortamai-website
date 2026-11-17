import { Link } from 'wouter';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import SEO from '@/components/SEO';
import FaqSection from '@/components/FaqSection';
import { faqSchema } from '@/data/faqs';
import type { LandingPage } from '@/data/landingPages';
import '@/styles/courses.css';

const BASE_URL = 'https://ortamai.com';

/** A topic page: what the topic is, where to learn it at ORTAM AI, and its common questions. */
export default function Landing({ page }: { page: LandingPage }) {
  const { lang, dir } = useLanguage();
  const he = lang === 'he';
  const Arrow = he ? ArrowLeft : ArrowRight;

  return (
    <>
      <SEO
        title={page.metaTitle[lang]}
        description={page.metaDescription[lang]}
        canonical={page.path}
        schema={[
          faqSchema(page.faq, lang),
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'ORTAM AI', item: BASE_URL },
              { '@type': 'ListItem', position: 2, name: page.h1[lang], item: `${BASE_URL}${page.path}` },
            ],
          },
        ]}
      />
      <div dir={dir}>
        <section aria-labelledby="landing-title" style={{ background: 'var(--h-dark)' }}>
          <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 md:py-20 text-start">
            <p className="h-rise text-sm md:text-base font-semibold tracking-wide" style={{ color: 'var(--h-accent)' }}>
              {page.eyebrow[lang]}
            </p>
            <h1
              id="landing-title"
              className="h-rise mt-4 text-white font-extrabold leading-[1.08] max-w-4xl"
              style={{ fontSize: 'clamp(2.1rem, 5.2vw, 3.9rem)' }}
            >
              {page.h1[lang]}
            </h1>
            <p className="h-rise h-rise-2 mt-6 text-lg md:text-xl leading-relaxed max-w-[65ch]" style={{ color: 'var(--h-on-dark)' }}>
              {page.lead[lang]}
            </p>
            <Link href={page.cta.href} className="h-rise h-rise-3 h-btn h-btn-accent mt-8">
              {page.cta.label[lang]}
              <Arrow className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="py-14 md:py-20" style={{ background: 'var(--h-paper)' }}>
          <div className="mx-auto max-w-4xl px-5 sm:px-8 text-start space-y-12 md:space-y-14">
            {page.sections.map(s => (
              <div key={s.title.en}>
                <h2 className="text-2xl md:text-3xl font-bold mb-5" style={{ color: 'var(--h-ink)' }}>
                  {s.title[lang]}
                </h2>
                {s.paragraphs?.[lang].map(p => (
                  <p key={p} className="text-lg leading-relaxed mb-4 max-w-[70ch]" style={{ color: 'var(--h-ink-2)' }}>{p}</p>
                ))}
                {s.bullets && (
                  <ul className="space-y-3 mt-2">
                    {s.bullets[lang].map(b => (
                      <li key={b} className="flex items-start gap-2.5 text-lg leading-relaxed" style={{ color: 'var(--h-ink)' }}>
                        <CheckCircle className="w-[18px] h-[18px] mt-[7px] shrink-0" style={{ color: 'var(--h-accent-ink)' }} aria-hidden="true" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="landing-links" className="py-14 md:py-20" style={{ background: 'var(--h-ground)' }}>
          <div className="mx-auto max-w-7xl px-5 sm:px-8 text-start">
            <h2 id="landing-links" className="text-3xl md:text-4xl font-bold mb-6 md:mb-8" style={{ color: 'var(--h-ink)' }}>
              {page.linksTitle[lang]}
            </h2>
            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {page.links.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="lp-link crs-card">
                    <span className="lp-link-title">{l.title[lang]}</span>
                    <span className="lp-link-note">{l.note[lang]}</span>
                    <span className="lp-link-go">
                      {he ? 'לפרטים' : 'Details'}
                      <Arrow className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <FaqSection items={page.faq} lang={lang} background="var(--h-paper)" />

        <section style={{ background: 'var(--h-dark)' }}>
          <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 md:py-20 text-start">
            <h2 className="text-white text-3xl md:text-4xl font-bold max-w-3xl leading-tight">
              {page.cta.title[lang]}
            </h2>
            <Link href={page.cta.href} className="h-btn h-btn-accent mt-7">
              {page.cta.label[lang]}
              <Arrow className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
