import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Users, HeartHandshake, CheckCircle, X, Sparkles, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import GradientButton from '@/components/GradientButton';
import ScrollDownArrow from '@/components/ScrollDownArrow';
import SEO from '@/components/SEO';
import { trpc } from '@/lib/trpc';
import { DEFAULT_COURSES, type CatalogCourse } from '@shared/defaultCourses';
import { toast } from 'sonner';

type CourseItem = CatalogCourse & { id: number };

function formatPrice(price: number): string {
  return `₪${price.toLocaleString('he-IL')}`;
}

interface OrderTarget {
  course: CourseItem;
  type: 'booking' | 'eligibility_check';
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
      {/* One continuous obsidian canvas — no light/dark banding between sections. */}
      <div dir={dir} className="min-h-screen" style={{ background: '#08080C' }}>
        {/* Hero */}
        <section className="relative overflow-hidden flex flex-col justify-center" style={{ minHeight: '52svh' }}>
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <motion.div animate={{ x: [0, 60, 0], y: [0, 30, 0] }} transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-10 left-10 w-72 h-72 rounded-full blur-3xl" style={{ background: 'rgba(200,200,208,0.06)' }} />
          <motion.div animate={{ x: [0, -40, 0], y: [0, -20, 0] }} transition={{ duration: 12, repeat: Infinity, delay: 2 }}
            className="absolute bottom-10 right-10 w-80 h-80 rounded-full blur-3xl" style={{ background: 'rgba(200,200,208,0.04)' }} />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex mb-4">
              <div className="px-4 py-2 rounded-full" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(200,200,208,0.2)' }}>
                <span className="text-sm font-semibold" style={{ color: '#C8C8D0' }}>
                  {isRtl ? 'הרשמה עצמאית אונליין' : 'Book Online'}
                </span>
              </div>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
              className="text-3xl md:text-5xl font-bold text-white mb-4">
              {isRtl ? 'קורסים ושיעורים' : 'Courses & Lessons'}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(200,200,208,0.65)' }}>
              {isRtl
                ? 'בוחרים מסלול, משאירים פרטים — ואנחנו חוזרים אליכם לתיאום. בלי התחייבות ובלי תשלום באתר.'
                : 'Pick a track, leave your details — and we get back to you to arrange everything. No commitment, no online payment.'}
            </motion.p>
          </div>
          <ScrollDownArrow />
        </section>

        {/* Section 1: Main courses */}
        <section className="py-16 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              icon={GraduationCap}
              title={isRtl ? 'הקורסים שלנו' : 'Our Courses'}
              subtitle={isRtl ? 'מסלולים מלאים שלוקחים אתכם מ-0 ל-100' : 'Full tracks that take you from 0 to 100'}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mainCourses.map(course => (
                <CourseCard key={course.slug} course={course} isRtl={isRtl}
                  onOrder={() => setOrderTarget({ course, type: 'booking' })} />
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Lessons — subtle band to separate from section 1 */}
        <section className="py-16 relative"
          style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(200,200,208,0.08)', borderBottom: '1px solid rgba(200,200,208,0.08)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              icon={Users}
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
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-10" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div {...reveal} className="text-center mb-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(200,200,208,0.2)' }}>
                <HeartHandshake className="w-4 h-4" style={{ color: '#C8C8D0' }} />
                <span className="text-sm font-semibold" style={{ color: '#C8C8D0' }}>
                  {isRtl ? 'בסבסוד מלא של ORTAM AI' : 'Fully subsidized by ORTAM AI'}
                </span>
              </div>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">
                {isRtl ? 'אנחנו מחזירים לקהילה' : 'Giving Back to the Community'}
              </h2>
              <p className="text-lg max-w-2xl mx-auto mb-10" style={{ color: 'rgba(200,200,208,0.65)' }}>
                {isRtl
                  ? 'מסלולים במחיר סמלי לקהלים שמגיע להם. משאירים פרטים — ואנחנו בודקים זכאות וחוזרים אליכם טלפונית.'
                  : 'Symbolically-priced tracks for those who deserve it. Leave your details — we check eligibility and call you back.'}
              </p>
            </motion.div>
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

// Reveal animation that can never leave content invisible: no negative viewport
// margin, tiny amount, and once:true — the hidden state only exists pre-scroll.
const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.01 },
  transition: { duration: 0.5 },
} as const;

function SectionHeader({ icon: Icon, title, subtitle }: { icon: React.ElementType; title: string; subtitle: string }) {
  return (
    <motion.div {...reveal} className="text-center mb-12">
      <div className="inline-flex p-3 rounded-xl mb-4"
        style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(200,200,208,0.2)' }}>
        <Icon className="w-6 h-6" style={{ color: '#C8C8D0' }} />
      </div>
      <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">{title}</h2>
      <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(200,200,208,0.65)' }}>{subtitle}</p>
    </motion.div>
  );
}

function CourseCard({ course, isRtl, onOrder }: { course: CourseItem; isRtl: boolean; onOrder: () => void }) {
  const title = isRtl ? course.title : course.titleEn ?? course.title;
  const subtitle = isRtl ? course.subtitle : course.subtitleEn ?? course.subtitle;
  const description = isRtl ? course.description : course.descriptionEn ?? course.description;
  const badge = isRtl ? course.badge : course.badgeEn ?? course.badge;
  const perLesson = course.priceUnit === 'lesson';

  return (
    <motion.div {...reveal}
      className="rounded-2xl p-6 flex flex-col transition-all group hover:-translate-y-1"
      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(200,200,208,0.25)' }}>
      <div className="flex items-start justify-between mb-3 gap-2">
        <h3 className="text-xl font-bold text-white leading-snug">{title}</h3>
        {badge && (
          <span className="flex-shrink-0 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap"
            style={{ background: 'rgba(200,200,208,0.15)', color: '#C8C8D0' }}>
            {badge}
          </span>
        )}
      </div>
      {subtitle && <p className="text-sm font-medium mb-2" style={{ color: 'rgba(200,200,208,0.85)' }}>{subtitle}</p>}
      {description && <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(200,200,208,0.55)' }}>{description}</p>}

      <div className="mt-auto">
        <div className="flex items-baseline gap-2 mb-4 pt-4" style={{ borderTop: '1px solid rgba(200,200,208,0.12)' }}>
          <span className="text-3xl font-bold text-white">{formatPrice(course.price)}</span>
          <span className="text-sm" style={{ color: 'rgba(200,200,208,0.55)' }}>
            {perLesson ? (isRtl ? 'למפגש' : 'per lesson') : (isRtl ? 'לקורס המלא' : 'full course')}
          </span>
        </div>
        <GradientButton size="sm" className="w-full justify-center" onClick={onOrder}>
          {isRtl ? 'הזמנת מקום' : 'Book a Spot'}
        </GradientButton>
      </div>
    </motion.div>
  );
}

function SubsidizedCard({ course, isRtl, onOrder }: { course: CourseItem; isRtl: boolean; onOrder: () => void }) {
  const title = isRtl ? course.title : course.titleEn ?? course.title;
  const subtitle = isRtl ? course.subtitle : course.subtitleEn ?? course.subtitle;
  const description = isRtl ? course.description : course.descriptionEn ?? course.description;
  const audience = isRtl ? course.audience : course.audienceEn ?? course.audience;

  return (
    <motion.div {...reveal}
      className="rounded-2xl p-6 flex flex-col transition-all"
      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(200,200,208,0.25)' }}>
      <div className="flex items-start justify-between mb-3 gap-2">
        <h3 className="text-xl font-bold text-white leading-snug">{title}</h3>
        <span className="flex-shrink-0 inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap"
          style={{ background: 'rgba(200,200,208,0.15)', color: '#C8C8D0' }}>
          <Sparkles className="w-3 h-3" />
          {isRtl ? 'מסובסד' : 'Subsidized'}
        </span>
      </div>
      {audience && (
        <p className="text-sm font-semibold mb-2" style={{ color: '#C8C8D0' }}>
          {isRtl ? `מיועד ל${audience}` : `For ${audience}`}
        </p>
      )}
      {subtitle && <p className="text-sm mb-2" style={{ color: 'rgba(200,200,208,0.8)' }}>{subtitle}</p>}
      {description && <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(200,200,208,0.55)' }}>{description}</p>}

      <div className="mt-auto">
        <div className="flex items-baseline gap-3 mb-1">
          <span className="text-3xl font-bold text-white">{formatPrice(course.price)}</span>
          {course.originalPrice != null && course.originalPrice > course.price && (
            <span className="text-lg line-through" style={{ color: 'rgba(200,200,208,0.4)' }}>
              {formatPrice(course.originalPrice)}
            </span>
          )}
        </div>
        <p className="text-xs mb-4" style={{ color: 'rgba(200,200,208,0.5)' }}>
          {isRtl ? 'המחיר למי שנמצאו זכאים, בכפוף לבדיקה' : 'Price for eligible applicants, subject to verification'}
        </p>
        <GradientButton size="sm" className="w-full justify-center" onClick={onOrder}>
          {isRtl ? 'בדיקת זכאות' : 'Check Eligibility'}
        </GradientButton>
      </div>
    </motion.div>
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
  const [submitted, setSubmitted] = useState(false);

  const submitOrder = trpc.courses.submitOrder.useMutation({
    onSuccess: () => setSubmitted(true),
    onError: () => {
      toast.error(isRtl
        ? 'משהו השתבש בשליחה. נסו שוב או צרו קשר בוואטסאפ'
        : 'Something went wrong. Please try again or contact us on WhatsApp');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || form.name.trim().length < 2 || !form.phone.trim() || form.phone.trim().length < 5) {
      toast.error(isRtl ? 'אנא מלאו שם וטלפון' : 'Please fill in name and phone');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error(isRtl ? 'אנא הזינו כתובת מייל תקינה' : 'Please enter a valid email');
      return;
    }
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

  const inputClass = "w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#C8C8D0]/50 transition-colors";

  return (
    <div dir={dir} className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        className="relative bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} aria-label={isRtl ? 'סגירה' : 'Close'}
          className={`absolute top-4 ${isRtl ? 'left-4' : 'right-4'} p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors`}>
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="p-8 text-center">
            <div className="inline-flex p-4 rounded-full bg-green-50 mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {isRtl ? 'הפרטים התקבלו!' : 'Got it!'}
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {isEligibility
                ? (isRtl
                  ? 'צוות ORTAM AI יבדוק את הזכאות ויחזור אליך טלפונית בהקדם.'
                  : 'The ORTAM AI team will check your eligibility and call you back soon.')
                : (isRtl
                  ? 'ניצור איתך קשר תוך יום עסקים לתיאום מועד והסדרת התשלום.'
                  : 'We will contact you within one business day to arrange a date and payment.')}
            </p>
            <GradientButton size="sm" onClick={onClose}>{isRtl ? 'סגירה' : 'Close'}</GradientButton>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
            <div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#1A1A22] text-[#C8C8D0]">
                {isEligibility
                  ? (isRtl ? 'בדיקת זכאות — מסלול מסובסד' : 'Eligibility check — subsidized track')
                  : (isRtl ? 'הזמנת מקום' : 'Booking')}
              </span>
              <h3 className="text-xl font-bold text-gray-900 mt-3">{title}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {isEligibility
                  ? (isRtl
                    ? 'משאירים פרטים ואנחנו בודקים זכאות וחוזרים אליכם. ההרשמה אינה מחייבת.'
                    : 'Leave your details and we will verify eligibility and get back to you. Not binding.')
                  : (isRtl
                    ? `${formatPrice(course.price)} ${course.priceUnit === 'lesson' ? 'למפגש' : 'לקורס המלא'} · התשלום מוסדר בהמשך, לא באתר`
                    : `${formatPrice(course.price)} ${course.priceUnit === 'lesson' ? 'per lesson' : 'full course'} · Payment is arranged later, not on the site`)}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                {isRtl ? 'שם מלא *' : 'Full name *'}
              </label>
              <input type="text" value={form.name} className={inputClass}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                placeholder={isRtl ? 'ישראל ישראלי' : 'John Doe'} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                {isRtl ? 'טלפון *' : 'Phone *'}
              </label>
              <input type="tel" value={form.phone} className={inputClass}
                onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                placeholder="050-000-0000" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                {isRtl ? 'מייל *' : 'Email *'}
              </label>
              <input type="email" value={form.email} className={inputClass}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                placeholder="email@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                {isEligibility
                  ? (isRtl ? 'ספרו לנו קצת על עצמכם' : 'Tell us a bit about yourself')
                  : (isRtl ? 'הערות (לא חובה)' : 'Notes (optional)')}
              </label>
              <textarea rows={3} value={form.message} className={inputClass}
                onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                placeholder={isEligibility
                  ? (isRtl ? 'למשל: שירות מילואים, העסק שלי, המצב המשפחתי — מה שרלוונטי למסלול' : 'Anything relevant to the track')
                  : (isRtl ? 'שאלות, העדפת ימים/שעות...' : 'Questions, preferred days/times...')} />
            </div>

            {/* Hidden native submit keeps Enter-to-submit working; the visible CTA drives the same handler. */}
            <button type="submit" className="hidden" aria-hidden="true" tabIndex={-1} />
            <GradientButton size="md" className="w-full justify-center"
              onClick={() => { if (!submitOrder.isPending) handleSubmit({ preventDefault: () => {} } as React.FormEvent); }}>
              {submitOrder.isPending
                ? (isRtl ? 'שולח...' : 'Sending...')
                : isEligibility
                  ? (isRtl ? 'שליחה לבדיקת זכאות' : 'Submit for eligibility check')
                  : (isRtl ? 'שליחת הזמנה' : 'Send booking request')}
            </GradientButton>
            <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-1">
              <Clock className="w-3 h-3" />
              {isRtl ? 'נחזור אליכם תוך יום עסקים' : 'We reply within one business day'}
            </p>
          </form>
        )}
      </motion.div>
    </div>
  );
}
