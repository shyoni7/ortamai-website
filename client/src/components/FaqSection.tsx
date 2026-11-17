import type { Faq } from '@/data/faqs';

/**
 * Questions and answers as native disclosure rows. Every answer is in the HTML
 * whether or not its row is open, so search engines and AI assistants read all of it.
 * The matching FAQPage schema is added by the page through its SEO tag.
 */
export default function FaqSection({ items, lang, title, background = 'var(--h-ground)' }: {
  items: Faq[];
  lang: 'he' | 'en';
  title?: string;
  background?: string;
}) {
  const he = lang === 'he';
  return (
    <section aria-labelledby="faq-title" className="py-14 md:py-20" style={{ background }}>
      <div className="mx-auto max-w-4xl px-5 sm:px-8 text-start">
        <h2 id="faq-title" className="text-3xl md:text-4xl font-bold mb-6 md:mb-8" style={{ color: 'var(--h-ink)' }}>
          {title ?? (he ? 'שאלות נפוצות' : 'Frequently Asked Questions')}
        </h2>
        <div className="faq-list">
          {items.map((f, i) => (
            <details key={f.q.en} className="faq-item" open={i === 0}>
              <summary>
                <h3>{f.q[lang]}</h3>
              </summary>
              <p>{f.a[lang]}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
