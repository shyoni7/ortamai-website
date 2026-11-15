import { useState } from 'react';
import { Link, useParams } from 'wouter';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import SEO from '@/components/SEO';
import { trpc } from '@/lib/trpc';
import { DEFAULT_COURSES } from '@shared/defaultCourses';
import { getSyllabus } from '@shared/courseSyllabi';
import { OrderDialog, type CourseItem } from './Courses';
import NotFound from './NotFound';
import '@/styles/courses.css';

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map(item => (
        <li key={item} className="flex items-start gap-2.5 leading-relaxed" style={{ color: 'var(--h-ink)' }}>
          <CheckCircle className="w-[18px] h-[18px] mt-[5px] shrink-0" style={{ color: 'var(--h-accent-ink)' }} aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function CourseSyllabus() {
  const { slug = '' } = useParams<{ slug: string }>();
  const { lang, dir } = useLanguage();
  const he = lang === 'he';
  const [ordering, setOrdering] = useState(false);

  const coursesQuery = trpc.courses.list.useQuery(undefined, {
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const syllabus = getSyllabus(slug);
  // Price and title follow the live catalog; the built-in one is the fallback.
  const fallback = DEFAULT_COURSES.find(c => c.slug === slug);
  const course: CourseItem | undefined =
    (coursesQuery.data as CourseItem[] | undefined)?.find(c => c.slug === slug)
    ?? (fallback ? { ...fallback, id: -1 } : undefined);

  if (!syllabus || !course) return <NotFound />;

  const title = he ? course.title : course.titleEn ?? course.title;
  const subtitle = he ? course.subtitle : course.subtitleEn ?? course.subtitle;
  const hasPrice = course.price > 0;
  const price = `₪${course.price.toLocaleString('he-IL')}`;
  const Arrow = he ? ArrowLeft : ArrowRight;
  const BackArrow = he ? ArrowRight : ArrowLeft;

  const facts = [
    { value: String(syllabus.sessionCount), label: he ? 'מפגשים' : 'sessions' },
    { value: String(syllabus.totalHours), label: he ? 'שעות לימוד' : 'hours of study' },
    { value: he ? `${syllabus.hoursPerSession} שעות` : `${syllabus.hoursPerSession} hours`, label: he ? 'כל מפגש' : 'per session' },
    { value: he ? 'פרונטלי' : 'In person', label: he ? 'לימוד בכיתה' : 'classroom teaching' },
  ];

  const cta = hasPrice ? (he ? 'הזמנת מקום' : 'Book a Spot') : (he ? 'צרו קשר לפרטים' : 'Contact us for details');

  return (
    <>
      <SEO
        title={he ? `${title}: סילבוס מלא` : `${title}: Full Syllabus`}
        description={syllabus.intro[lang]}
        canonical={`/courses/${slug}`}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: title,
          description: syllabus.intro[lang],
          provider: { '@type': 'Organization', name: 'ORTAM AI', sameAs: 'https://ortamai.com' },
          ...(hasPrice && {
            offers: { '@type': 'Offer', price: course.price, priceCurrency: 'ILS', category: 'Paid' },
          }),
          hasCourseInstance: {
            '@type': 'CourseInstance',
            courseMode: 'Onsite',
            courseWorkload: `PT${syllabus.totalHours}H`,
          },
        }}
      />
      <div dir={dir}>
        {/* Hero */}
        <section aria-labelledby="syllabus-title" style={{ background: 'var(--h-dark)' }}>
          <div className="mx-auto max-w-7xl px-5 sm:px-8 py-12 md:py-20 text-start">
            <Link href="/courses" className="inline-flex items-center gap-2 min-h-11 text-base font-medium" style={{ color: 'var(--h-on-dark)' }}>
              <BackArrow className="w-4 h-4" aria-hidden="true" />
              {he ? 'כל הקורסים' : 'All courses'}
            </Link>
            <h1
              id="syllabus-title"
              className="h-rise mt-4 text-white font-extrabold leading-[1.08] max-w-4xl"
              style={{ fontSize: 'clamp(2.1rem, 5.2vw, 3.9rem)' }}
            >
              {title}
            </h1>
            {subtitle && (
              <p className="h-rise h-rise-2 mt-5 text-lg md:text-xl leading-relaxed max-w-[60ch]" style={{ color: 'var(--h-on-dark)' }}>
                {subtitle}
              </p>
            )}
            <dl className="h-rise h-rise-3 syl-facts mt-8 md:mt-10 max-w-3xl">
              {facts.map(f => (
                <div key={f.label} className="syl-fact flex flex-col-reverse justify-end">
                  <dt className="syl-fact-label">{f.label}</dt>
                  <dd className="syl-fact-value">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Program + booking */}
        <section aria-labelledby="program-title" className="py-14 md:py-20" style={{ background: 'var(--h-ground)' }}>
          <div className="mx-auto max-w-7xl px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_22rem] gap-10 lg:gap-12 text-start">
            <div>
              <p className="text-lg md:text-xl leading-relaxed max-w-[65ch] mb-10 md:mb-12" style={{ color: 'var(--h-ink-2)' }}>
                {syllabus.intro[lang]}
              </p>
              <h2 id="program-title" className="text-3xl md:text-4xl font-bold mb-6 md:mb-8" style={{ color: 'var(--h-ink)' }}>
                {he ? 'תוכנית הלימודים' : 'The Program'}
              </h2>
              <ol className="space-y-4">
                {syllabus.sessions.map((s, i) => (
                  <li key={s.title.en} className="syl-session">
                    <span className="syl-num" aria-hidden="true">{i + 1}</span>
                    <div>
                      <p className="text-sm font-semibold mb-1" style={{ color: 'var(--h-ink-2)' }}>
                        {he ? `מפגש ${i + 1} · ${syllabus.hoursPerSession} שעות` : `Session ${i + 1} · ${syllabus.hoursPerSession} hours`}
                      </p>
                      <h3 className="text-xl md:text-2xl font-bold leading-snug mb-4" style={{ color: 'var(--h-ink)' }}>
                        {s.title[lang]}
                      </h3>
                      <ul className="space-y-2 list-disc ps-5 leading-relaxed" style={{ color: 'var(--h-ink-2)' }}>
                        {s.topics[lang].map(t => <li key={t}>{t}</li>)}
                      </ul>
                      <p className="syl-practice">
                        <strong>{he ? 'יוצאים עם: ' : 'You leave with: '}</strong>
                        {s.practice[lang]}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <aside aria-label={he ? 'הרשמה לקורס' : 'Course booking'}>
              <div className="crs-card syl-aside p-6 md:p-7">
                {hasPrice ? (
                  <>
                    <p className="font-extrabold tracking-tight tabular-nums leading-none" style={{ fontFamily: 'Rubik, Heebo, sans-serif', fontSize: '2.6rem', color: 'var(--h-ink)' }}>
                      {price}
                    </p>
                    <p className="mt-2 text-[0.95rem]" style={{ color: 'var(--h-ink-2)' }}>
                      {he
                        ? `למשתתף, לקורס המלא · ${syllabus.sessionCount} מפגשים, ${syllabus.totalHours} שעות`
                        : `per participant, full course · ${syllabus.sessionCount} sessions, ${syllabus.totalHours} hours`}
                    </p>
                  </>
                ) : (
                  <p className="font-bold text-xl" style={{ color: 'var(--h-ink)' }}>
                    {he ? 'המחיר נמסר בשיחה' : 'Price on request'}
                  </p>
                )}
                <button type="button" className="h-btn h-btn-accent crs-btn-block mt-6" onClick={() => setOrdering(true)}>
                  {cta}
                  <Arrow className="w-4 h-4" aria-hidden="true" />
                </button>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--h-ink-2)' }}>
                  {he
                    ? 'בלי תשלום באתר. משאירים פרטים ואנחנו חוזרים אליכם לתיאום.'
                    : 'No online payment. Leave your details and we get back to you.'}
                </p>
                <div className="mt-6 pt-6 border-t" style={{ borderColor: 'var(--h-line)' }}>
                  <h2 className="text-base font-bold mb-3" style={{ color: 'var(--h-ink)' }}>
                    {he ? 'מה צריך להביא' : 'What you need'}
                  </h2>
                  <CheckList items={syllabus.requirements[lang]} />
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* Audience + outcomes */}
        <section className="py-14 md:py-20" style={{ background: 'var(--h-paper)' }}>
          <div className="mx-auto max-w-7xl px-5 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 text-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: 'var(--h-ink)' }}>
                {he ? 'למי הקורס מתאים' : 'Who it is for'}
              </h2>
              <CheckList items={syllabus.audience[lang]} />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: 'var(--h-ink)' }}>
                {he ? 'עם מה יוצאים מהקורס' : 'What you leave with'}
              </h2>
              <CheckList items={syllabus.outcomes[lang]} />
            </div>
          </div>
        </section>

        {/* Close */}
        <section style={{ background: 'var(--h-dark)' }}>
          <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 md:py-20 text-start">
            <h2 className="text-white text-3xl md:text-4xl font-bold max-w-3xl leading-tight">
              {he ? 'רוצים לשריין מקום במחזור הקרוב?' : 'Want a spot in the next class?'}
            </h2>
            <button type="button" className="h-btn h-btn-accent mt-7" onClick={() => setOrdering(true)}>
              {cta}
              <Arrow className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </section>

        {ordering && (
          <OrderDialog target={{ course, type: 'booking' }} isRtl={he} dir={dir} lang={lang}
            onClose={() => setOrdering(false)} />
        )}
      </div>
    </>
  );
}
