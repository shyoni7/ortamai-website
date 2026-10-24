import React, { useState } from 'react';
import {
  GraduationCap, Users, HeartHandshake, CheckCircle, X, Sparkles, Clock,
  Code2, Clapperboard, Globe, UserRound, Palette, Star,
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import SEO from '@/components/SEO';
import { trpc } from '@/lib/trpc';
import { DEFAULT_COURSES, type CatalogCourse } from '@shared/defaultCourses';
import { toast } from 'sonner';
import '@/styles/courses.css';

type CourseItem = CatalogCourse & { id: number };

function formatPrice(price: number): string {
  return `₪${price.toLocaleString('he-IL')}`;
}

// Card icon per catalog item, with a section-level fallback for admin-created ones.
const CARD_ICONS: Record<string, React.ElementType> = {
  'claude-code-mastery': Code2,
  'ai-beginners': Sparkles,
  'ai-filmmaker-studio': Clapperboard,
  'build-website-ai': Globe,
  'claude-code-one-on-one': UserRound,
  'create-together-media': Palette,
};
const SECTION_ICONS: Record<string, React.ElementType> = {
  courses: GraduationCap,
  lessons: Users,
  subsidized: HeartHandshake,
};
function cardIcon(course: { slug: string; section: string }): React.ElementType {
  return CARD_ICONS[course.slug] ?? SECTION_ICONS[course.section] ?? GraduationCap;
}

/** The flagship course gets a highlighted card. */
const FEATURED_SLUG = 'claude-code-mastery';

interface OrderTarget {
  course: CourseItem;
  type: 'booking' | 'eligibility_check';
}

function splitBullets(text: string | null | undefined): string[] {
  return (text ?? '').split('\n').map(b => b.trim()).filter(Boolean);
}

export default function Courses() {
  const { lang, dir } = useLanguage();
  const isRtl = lang === 'he';

  const coursesQuery = trpc.courses.list.useQuery(undefined, {
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  // The built-in catalog keeps the page fully functional even if the API is down.
  const allCourses: CourseItem[] = (coursesQuery.data as CourseItem[] | undefined)
    ?? DEFAULT_COURSES.filter(c => c.visible).map((c, i) => ({ ...c, id: -(i + 1) }));

  const mainCourses = allCourses.filter(c => c.section === 'courses');
  const lessons = allCourses.filter(c => c.section === 'lessons');
  const subsidized = allCourses.filter(c => c.section === 'subsidized');

  const [orderTarget, setOrderTarget] = useState<OrderTarget | null>(null);

  return (
    <>
      <SEO
        title={isRtl ? 'קורסים ושיעורים | הזמנת מקום אונליין — ORTAM AI' : 'Courses & Lessons | Book Online — ORTAM AI'}
        description={isRtl
          ? 'קורסי AI ו-Claude Code, שיעורים קבוצתיים ופרטיים ומסלולים חברתיים מסובסדים — הזמנת מקום אונליין. מ-0 ל-100 עם ORTAM AI.'
          : 'AI & Claude Code courses, group and private lessons, and subsidized community tracks — book your spot online with ORTAM AI.'}
        canonical="/courses"
      />
      <div dir={dir}>
        {/* Hero */}
        <section aria-labelledby="courses-title" style={{ background: 'var(--h-dark)' }}>
          <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 md:py-24 text-start">
            <h1
              id="courses-title"
              className="h-rise text-white font-extrabold leading-[1.05] max-w-4xl"
              style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)' }}
            >
              {isRtl ? 'קורסים ושיעורים' : 'Courses & Lessons'}
            </h1>
            <p className="h-rise h-rise-2 mt-5 md:mt-7 text-lg md:text-xl leading-relaxed max-w-[60ch]" style={{ color: 'var(--h-on-dark)' }}>
              {isRtl
                ? 'בוחרים מסלול, משאירים פרטים — ואנחנו חוזרים אליכם לתיאום.'
                : 'Pick a track, leave your details — and we get back to you to arrange everything.'}
            </p>
            <ul className="h-rise h-rise-3 mt-8 md:mt-10 flex flex-col sm:flex-row sm:flex-wrap gap-x-7 gap-y-3">
              {(isRtl
                ? ['בלי התחייבות', 'בלי תשלום באתר', 'תיאום אישי טלפוני']
                : ['No commitment', 'No online payment', 'Personal phone follow-up']
              ).map(chip => (
                <li key={chip} className="flex items-center gap-2.5 text-base font-medium" style={{ color: 'var(--h-on-dark)' }}>
                  <CheckCircle className="w-5 h-5 shrink-0" style={{ color: 'var(--h-accent)' }} aria-hidden="true" />
                  <span>{chip}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section 1: Main courses */}
        <section aria-labelledby="main-courses-title" className="py-16 md:py-24" style={{ background: 'var(--h-ground)' }}>
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeader
              id="main-courses-title"
              title={isRtl ? 'הקורסים שלנו' : 'Our Courses'}
              subtitle={isRtl ? 'מסלולים מלאים שלוקחים אתכם מ-0 ל-100' : 'Full tracks that take you from 0 to 100'}
            />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-7">
              {mainCourses.map(course => (
                <FlagshipCard key={course.slug} course={course} isRtl={isRtl}
                  onOrder={() => setOrderTarget({ course, type: 'booking' })} />
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Lessons */}
        <section aria-labelledby="lessons-title" className="py-16 md:py-24" style={{ background: 'var(--h-paper)' }}>
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeader
              id="lessons-title"
              title={isRtl ? 'שיעורים קבוצתיים ופרטיים' : 'Group & Private Lessons'}
              subtitle={isRtl
                ? 'רוצים לטעום לפני שקופצים לקורס מלא? מפגש אחד, בתשלום לפי מפגש, בלי התחייבות'
                : 'Want a taste before a full course? A single session, pay per lesson, no commitment'}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {lessons.map(course => (
                <CourseCard key={course.slug} course={course} isRtl={isRtl}
                  onOrder={() => setOrderTarget({ course, type: 'booking' })} />
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Subsidized community tracks */}
        <section aria-labelledby="subsidized-title" className="py-16 md:py-24" style={{ background: 'var(--h-ground)' }}>
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-10 md:mb-14 text-start">
              <h2 id="subsidized-title" className="text-3xl md:text-5xl font-bold" style={{ color: 'var(--h-ink)' }}>
                {isRtl ? 'אנחנו מחזירים לקהילה' : 'Giving Back to the Community'}
              </h2>
              <p className="mt-4 text-base md:text-lg leading-relaxed max-w-[65ch]" style={{ color: 'var(--h-ink-2)' }}>
                {isRtl
                  ? 'מסלולים במחיר סמלי לקהלים שמגיע להם. משאירים פרטים — ואנחנו בודקים זכאות וחוזרים אליכם טלפונית.'
                  : 'Symbolically-priced tracks for those who deserve it. Leave your details — we check eligibility and call you back.'}
              </p>
              <p className="mt-4 inline-flex items-center gap-2 text-base font-semibold" style={{ color: 'var(--h-ink)' }}>
                <HeartHandshake className="w-5 h-5 shrink-0" style={{ color: 'var(--h-accent-ink)' }} aria-hidden="true" />
                {isRtl ? 'בסבסוד מלא של ORTAM AI' : 'Fully subsidized by ORTAM AI'}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {subsidized.map(course => (
                <SubsidizedCard key={course.slug} course={course} isRtl={isRtl}
                  onOrder={() => setOrderTarget({ course, type: 'eligibility_check' })} />
              ))}
            </div>
          </div>
        </section>

        {orderTarget && (
          <OrderDialog target={orderTarget} isRtl={isRtl} dir={dir} lang={lang}
            onClose={() => setOrderTarget(null)} />
        )}
      </div>
    </>
  );
}

function SectionHeader({ id, title, subtitle }: { id: string; title: string; subtitle: string }) {
  return (
    <div className="mb-10 md:mb-14 text-start">
      <h2 id={id} className="text-3xl md:text-5xl font-bold" style={{ color: 'var(--h-ink)' }}>{title}</h2>
      <p className="mt-4 text-base md:text-lg leading-relaxed max-w-[65ch]" style={{ color: 'var(--h-ink-2)' }}>{subtitle}</p>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5 mb-6">
      {items.map(b => (
        <li key={b} className="flex items-start gap-2.5 text-[0.95rem] leading-relaxed" style={{ color: 'var(--h-ink)' }}>
          <CheckCircle className="w-[18px] h-[18px] mt-[3px] shrink-0" style={{ color: 'var(--h-accent-ink)' }} aria-hidden="true" />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  );
}

// A price of 0 means the price is given on request.
const onRequest = (price: number) => price <= 0;

function PriceRow({ price, unit, isRtl }: { price: number; unit: string; isRtl: boolean }) {
  return (
    <div className="flex items-baseline gap-2 mb-5 pt-5 border-t" style={{ borderColor: 'var(--h-line)' }}>
      {onRequest(price) ? (
        <span className="font-bold text-lg" style={{ fontFamily: 'Rubik, Heebo, sans-serif', color: 'var(--h-ink)' }}>
          {isRtl ? 'המחיר נמסר בשיחה' : 'Price on request'}
        </span>
      ) : (
        <>
          <span className="font-extrabold tracking-tight tabular-nums" style={{ fontFamily: 'Rubik, Heebo, sans-serif', fontSize: '2.1rem', color: 'var(--h-ink)' }}>
            {formatPrice(price)}
          </span>
          <span className="text-sm" style={{ color: 'var(--h-ink-2)' }}>{unit}</span>
        </>
      )}
    </div>
  );
}

function FeaturedPill({ isRtl }: { isRtl: boolean }) {
  return (
    <span className="crs-pill crs-pill-accent">
      <Star className="w-3.5 h-3.5" fill="currentColor" aria-hidden="true" />
      {isRtl ? 'הקורס המבוקש' : 'Most Popular'}
    </span>
  );
}

/** Card for the main courses; the flagship course gets an orange outline. */
function FlagshipCard({ course, isRtl, onOrder }: {
  course: CourseItem; isRtl: boolean; onOrder: () => void;
}) {
  const title = isRtl ? course.title : course.titleEn ?? course.title;
  const subtitle = isRtl ? course.subtitle : course.subtitleEn ?? course.subtitle;
  const badge = isRtl ? course.badge : course.badgeEn ?? course.badge;
  const bullets = splitBullets(isRtl ? course.highlights : course.highlightsEn ?? course.highlights);
  const featured = course.slug === FEATURED_SLUG;
  const Icon = cardIcon(course);

  return (
    <article className={`crs-card ${featured ? 'is-featured' : ''} h-full flex flex-col p-6 md:p-7 text-start`}>
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <span className="crs-icon"><Icon className="w-5 h-5" aria-hidden="true" /></span>
        {badge && <span className="crs-pill">{badge}</span>}
        {featured && <FeaturedPill isRtl={isRtl} />}
      </div>

      <h3 className="text-2xl font-bold leading-snug mb-2" style={{ color: 'var(--h-ink)' }}>{title}</h3>
      {subtitle && (
        <p className="text-base leading-relaxed mb-5" style={{ color: 'var(--h-ink-2)' }}>{subtitle}</p>
      )}
      {bullets.length > 0 && <BulletList items={bullets} />}

      <div className="mt-auto">
        <PriceRow price={course.price} unit={isRtl ? 'לקורס המלא' : 'full course'} isRtl={isRtl} />
        <button type="button" className="h-btn h-btn-accent crs-btn-block" onClick={onOrder}>
          {onRequest(course.price) ? (isRtl ? 'צרו קשר לפרטים' : 'Contact us for details') : (isRtl ? 'הזמנת מקום' : 'Book a Spot')}
        </button>
      </div>
    </article>
  );
}

function CourseCard({ course, isRtl, onOrder }: { course: CourseItem; isRtl: boolean; onOrder: () => void }) {
  const title = isRtl ? course.title : course.titleEn ?? course.title;
  const subtitle = isRtl ? course.subtitle : course.subtitleEn ?? course.subtitle;
  const description = isRtl ? course.description : course.descriptionEn ?? course.description;
  const badge = isRtl ? course.badge : course.badgeEn ?? course.badge;
  const bullets = splitBullets(isRtl ? course.highlights : course.highlightsEn ?? course.highlights);
  const perLesson = course.priceUnit === 'lesson';
  const featured = course.slug === FEATURED_SLUG;
  const Icon = cardIcon(course);

  return (
    <article className={`crs-card ${featured ? 'is-featured' : ''} h-full flex flex-col p-6 text-start`}>
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <span className="crs-icon"><Icon className="w-5 h-5" aria-hidden="true" /></span>
        {badge && <span className="crs-pill">{badge}</span>}
        {featured && <FeaturedPill isRtl={isRtl} />}
      </div>

      <h3 className="text-xl font-bold leading-snug mb-2" style={{ color: 'var(--h-ink)' }}>{title}</h3>
      {subtitle && <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--h-ink-2)' }}>{subtitle}</p>}
      {bullets.length > 0 ? (
        <BulletList items={bullets} />
      ) : (
        description && <p className="text-[0.95rem] leading-relaxed mb-6" style={{ color: 'var(--h-ink-2)' }}>{description}</p>
      )}

      <div className="mt-auto">
        <PriceRow price={course.price}
          unit={perLesson ? (isRtl ? 'למפגש' : 'per lesson') : (isRtl ? 'לקורס המלא' : 'full course')} isRtl={isRtl} />
        <button type="button" className="h-btn h-btn-accent crs-btn-block" onClick={onOrder}>
          {onRequest(course.price) ? (isRtl ? 'צרו קשר לפרטים' : 'Contact us for details') : (isRtl ? 'הזמנת מקום' : 'Book a Spot')}
        </button>
      </div>
    </article>
  );
}

function SubsidizedCard({ course, isRtl, onOrder }: { course: CourseItem; isRtl: boolean; onOrder: () => void }) {
  const title = isRtl ? course.title : course.titleEn ?? course.title;
  const subtitle = isRtl ? course.subtitle : course.subtitleEn ?? course.subtitle;
  const description = isRtl ? course.description : course.descriptionEn ?? course.description;
  const audience = isRtl ? course.audience : course.audienceEn ?? course.audience;
  const bullets = splitBullets(isRtl ? course.highlights : course.highlightsEn ?? course.highlights);

  const discount = course.originalPrice != null && course.originalPrice > course.price
    ? Math.round((1 - course.price / course.originalPrice) * 100)
    : null;

  return (
    <article className="crs-card h-full flex flex-col p-6 text-start">
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <span className="crs-icon"><HeartHandshake className="w-5 h-5" aria-hidden="true" /></span>
        <span className="crs-pill">
          <Sparkles className="w-3 h-3" aria-hidden="true" />
          {isRtl ? 'מסובסד' : 'Subsidized'}
        </span>
      </div>

      <h3 className="text-xl font-bold leading-snug mb-2" style={{ color: 'var(--h-ink)' }}>{title}</h3>
      {audience && (
        <p className="text-[0.95rem] font-semibold mb-3" style={{ color: 'var(--h-ink)' }}>
          {isRtl ? `מיועד ל${audience}` : `For ${audience}`}
        </p>
      )}
      {subtitle && <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--h-ink-2)' }}>{subtitle}</p>}
      {bullets.length > 0 ? (
        <BulletList items={bullets} />
      ) : (
        description && <p className="text-[0.95rem] leading-relaxed mb-6" style={{ color: 'var(--h-ink-2)' }}>{description}</p>
      )}

      <div className="mt-auto">
        <div className="pt-5 border-t" style={{ borderColor: 'var(--h-line)' }}>
          <div className="flex items-baseline gap-3 mb-1 flex-wrap">
            <span className="font-extrabold tracking-tight tabular-nums" style={{ fontFamily: 'Rubik, Heebo, sans-serif', fontSize: '2.1rem', color: 'var(--h-ink)' }}>
              {formatPrice(course.price)}
            </span>
            {course.originalPrice != null && course.originalPrice > course.price && (
              <>
                <span className="text-lg line-through" style={{ color: 'var(--h-ink-2)' }}>
                  {formatPrice(course.originalPrice)}
                </span>
                {discount != null && (
                  <span className="crs-pill crs-pill-accent">
                    {isRtl ? `חיסכון ${discount}%` : `${discount}% off`}
                  </span>
                )}
              </>
            )}
          </div>
          <p className="text-sm mb-5" style={{ color: 'var(--h-ink-2)' }}>
            {isRtl ? 'המחיר למי שנמצאו זכאים, בכפוף לבדיקה' : 'Price for eligible applicants, subject to verification'}
          </p>
        </div>
        <button type="button" className="h-btn crs-btn-block" style={{ background: 'var(--h-dark)', color: '#fff' }} onClick={onOrder}>
          {isRtl ? 'בדיקת זכאות' : 'Check Eligibility'}
        </button>
      </div>
    </article>
  );
}

function OrderDialog({ target, isRtl, dir, lang, onClose }: {
  target: OrderTarget;
  isRtl: boolean;
  dir: 'rtl' | 'ltr';
  lang: 'he' | 'en';
  onClose: () => void;
}) {
  const { course, type } = target;
  const isEligibility = type === 'eligibility_check';
  const title = isRtl ? course.title : course.titleEn ?? course.title;

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<{ name?: string; phone?: string; email?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const submitOrder = trpc.courses.submitOrder.useMutation({
    onSuccess: () => setSubmitted(true),
    onError: () => {
      toast.error(isRtl
        ? 'משהו השתבש בשליחה. נסו שוב או צרו קשר בוואטסאפ'
        : 'Something went wrong. Please try again or contact us on WhatsApp');
    },
  });

  // Esc closes the dialog, matching the backdrop click.
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitOrder.isPending) return;
    // Errors render next to their own field rather than as a detached toast.
    const next: typeof errors = {};
    if (form.name.trim().length < 2) next.name = isRtl ? 'נא להזין שם מלא' : 'Please enter your full name';
    if (form.phone.trim().length < 5) next.phone = isRtl ? 'נא להזין מספר טלפון' : 'Please enter a phone number';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = isRtl ? 'כתובת מייל אינה תקינה' : 'Invalid email address';
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    submitOrder.mutate({
      courseSlug: course.slug,
      courseTitle: course.title,
      type,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      message: form.message.trim() || undefined,
      lang,
    });
  };

  return (
    <div dir={dir} className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog" aria-modal="true" aria-label={title}>
      <div className="crs-backdrop absolute inset-0 cursor-pointer" onClick={onClose} />
      <div className="crs-dialog relative w-full max-w-md max-h-[90vh] overflow-y-auto text-start">
        <button onClick={onClose} aria-label={isRtl ? 'סגירה' : 'Close'} type="button"
          className="crs-close absolute top-3 end-3 cursor-pointer">
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        {submitted ? (
          <div className="p-8 text-center">
            <div className="inline-flex p-4 rounded-full mb-4" style={{ background: '#E7F6EC' }}>
              <CheckCircle className="w-10 h-10" style={{ color: '#1F7A3D' }} aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--h-ink)' }}>
              {isRtl ? 'הפרטים התקבלו!' : 'Got it!'}
            </h3>
            <p className="mb-6 leading-relaxed" style={{ color: 'var(--h-ink-2)' }}>
              {isEligibility
                ? (isRtl
                  ? 'צוות ORTAM AI יבדוק את הזכאות ויחזור אליך טלפונית בהקדם.'
                  : 'The ORTAM AI team will check your eligibility and call you back soon.')
                : (isRtl
                  ? 'ניצור איתך קשר תוך יום עסקים לתיאום מועד והסדרת התשלום.'
                  : 'We will contact you within one business day to arrange a date and payment.')}
            </p>
            <button type="button" className="h-btn h-btn-accent" onClick={onClose}>{isRtl ? 'סגירה' : 'Close'}</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-8 space-y-5">
            <div className="pe-10">
              <span className="crs-pill">
                {isEligibility
                  ? (isRtl ? 'בדיקת זכאות — מסלול מסובסד' : 'Eligibility check — subsidized track')
                  : onRequest(course.price)
                    ? (isRtl ? 'בקשת פרטים' : 'Request details')
                    : (isRtl ? 'הזמנת מקום' : 'Booking')}
              </span>
              <h3 className="text-xl md:text-2xl font-bold mt-3" style={{ color: 'var(--h-ink)' }}>{title}</h3>
              <p className="text-[0.95rem] leading-relaxed mt-2" style={{ color: 'var(--h-ink-2)' }}>
                {isEligibility
                  ? (isRtl
                    ? 'משאירים פרטים ואנחנו בודקים זכאות וחוזרים אליכם. ההרשמה אינה מחייבת.'
                    : 'Leave your details and we will verify eligibility and get back to you. Not binding.')
                  : onRequest(course.price)
                    ? (isRtl
                      ? 'משאירים פרטים ואנחנו חוזרים אליכם עם כל הפרטים על הקורס. ההשארה אינה מחייבת.'
                      : 'Leave your details and we will get back to you with everything about the course. Not binding.')
                    : (isRtl
                      ? `${formatPrice(course.price)} ${course.priceUnit === 'lesson' ? 'למפגש' : 'לקורס המלא'} · התשלום מוסדר בהמשך, לא באתר`
                      : `${formatPrice(course.price)} ${course.priceUnit === 'lesson' ? 'per lesson' : 'full course'} · Payment is arranged later, not on the site`)}
              </p>
            </div>

            <div>
              <label htmlFor="order-name" className="crs-label">
                {isRtl ? 'שם מלא *' : 'Full name *'}
              </label>
              <input id="order-name" type="text" autoComplete="name" value={form.name} className="crs-field"
                aria-invalid={!!errors.name} aria-describedby={errors.name ? 'order-name-err' : undefined}
                onChange={e => { setForm(p => ({ ...p, name: e.target.value })); setErrors(p => ({ ...p, name: undefined })); }}
                placeholder={isRtl ? 'ישראל ישראלי' : 'John Doe'} />
              {errors.name && <p id="order-name-err" className="crs-error">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="order-phone" className="crs-label">
                {isRtl ? 'טלפון *' : 'Phone *'}
              </label>
              <input id="order-phone" type="tel" autoComplete="tel" value={form.phone} className="crs-field"
                aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'order-phone-err' : undefined}
                onChange={e => { setForm(p => ({ ...p, phone: e.target.value })); setErrors(p => ({ ...p, phone: undefined })); }}
                placeholder="050-000-0000" />
              {errors.phone && <p id="order-phone-err" className="crs-error">{errors.phone}</p>}
            </div>
            <div>
              <label htmlFor="order-email" className="crs-label">
                {isRtl ? 'מייל *' : 'Email *'}
              </label>
              <input id="order-email" type="email" autoComplete="email" value={form.email} className="crs-field"
                aria-invalid={!!errors.email} aria-describedby={errors.email ? 'order-email-err' : undefined}
                onChange={e => { setForm(p => ({ ...p, email: e.target.value })); setErrors(p => ({ ...p, email: undefined })); }}
                placeholder="email@example.com" />
              {errors.email && <p id="order-email-err" className="crs-error">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="order-message" className="crs-label">
                {isEligibility
                  ? (isRtl ? 'ספרו לנו קצת על עצמכם' : 'Tell us a bit about yourself')
                  : (isRtl ? 'הערות (לא חובה)' : 'Notes (optional)')}
              </label>
              <textarea id="order-message" rows={3} value={form.message} className="crs-field"
                onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                placeholder={isEligibility
                  ? (isRtl ? 'למשל: שירות מילואים, העסק שלי, המצב המשפחתי — מה שרלוונטי למסלול' : 'Anything relevant to the track')
                  : (isRtl ? 'שאלות, העדפת ימים/שעות...' : 'Questions, preferred days/times...')} />
            </div>

            <button type="submit" className="h-btn h-btn-accent crs-btn-block" aria-busy={submitOrder.isPending}>
              {submitOrder.isPending
                ? (isRtl ? 'שולח...' : 'Sending...')
                : isEligibility
                  ? (isRtl ? 'שליחה לבדיקת זכאות' : 'Submit for eligibility check')
                  : onRequest(course.price)
                    ? (isRtl ? 'שליחת פרטים' : 'Send my details')
                    : (isRtl ? 'שליחת הזמנה' : 'Send booking request')}
            </button>
            <p className="text-sm text-center flex items-center justify-center gap-1.5" style={{ color: 'var(--h-ink-2)' }}>
              <Clock className="w-4 h-4" aria-hidden="true" />
              {isRtl ? 'נחזור אליכם תוך יום עסקים' : 'We reply within one business day'}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
