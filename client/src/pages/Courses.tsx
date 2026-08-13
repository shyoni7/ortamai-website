import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap, Users, HeartHandshake, CheckCircle, X, Sparkles, Clock,
  Code2, Clapperboard, Globe, UserRound, Palette, Star,
} from 'lucide-react';
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
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex mb-5">
              <div className="px-4 py-2 rounded-full" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(200,200,208,0.2)' }}>
                <span className="text-sm font-semibold" style={{ color: '#C8C8D0' }}>
                  {isRtl ? 'הרשמה עצמאית אונליין' : 'Book Online'}
                </span>
              </div>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-4">
              <span className="text-white">{isRtl ? 'קורסים ' : 'Courses '}</span>
              <span className="text-gradient-cyan">{isRtl ? 'ושיעורים' : '& Lessons'}</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg max-w-2xl mx-auto mb-8" style={{ color: 'rgba(200,200,208,0.65)' }}>
              {isRtl
                ? 'בוחרים מסלול, משאירים פרטים — ואנחנו חוזרים אליכם לתיאום.'
                : 'Pick a track, leave your details — and we get back to you to arrange everything.'}
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-3 flex-wrap">
              {(isRtl
                ? ['בלי התחייבות', 'בלי תשלום באתר', 'תיאום אישי טלפוני']
                : ['No commitment', 'No online payment', 'Personal phone follow-up']
              ).map(chip => (
                <div key={chip} className="px-4 py-2 rounded-full flex items-center gap-2"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(200,200,208,0.15)' }}>
                  <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: '#C8C8D0' }} />
                  <span className="text-sm" style={{ color: 'rgba(200,200,208,0.8)' }}>{chip}</span>
                </div>
              ))}
            </motion.div>
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-7">
              {mainCourses.map((course, i) => (
                <FlagshipCard key={course.slug} course={course} index={i} isRtl={isRtl}
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

/**
 * Premium card for the three flagship courses. Layered depth per the
 * "Modern Dark" style: ambient glow, frosted surface, gradient hairline,
 * an oversized index numeral, and the course's own "what you get" bullets so
 * the visual weight is carried by real content rather than decoration.
 */
function FlagshipCard({ course, index, isRtl, onOrder }: {
  course: CourseItem; index: number; isRtl: boolean; onOrder: () => void;
}) {
  const title = isRtl ? course.title : course.titleEn ?? course.title;
  const subtitle = isRtl ? course.subtitle : course.subtitleEn ?? course.subtitle;
  const badge = isRtl ? course.badge : course.badgeEn ?? course.badge;
  const bullets = ((isRtl ? course.highlights : course.highlightsEn ?? course.highlights) ?? '')
    .split('\n').map(b => b.trim()).filter(Boolean);
  const featured = course.slug === FEATURED_SLUG;
  const Icon = cardIcon(course);

  return (
    <motion.article {...reveal} transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative rounded-3xl h-full">
      {/* Ambient glow — strongest behind the flagship course */}
      <div aria-hidden className="absolute -inset-px rounded-3xl pointer-events-none"
        style={{
          background: featured
            ? 'linear-gradient(150deg, rgba(200,200,208,0.75), rgba(200,200,208,0.12) 45%, rgba(200,200,208,0.28))'
            : 'linear-gradient(150deg, rgba(200,200,208,0.35), rgba(200,200,208,0.06) 50%, rgba(200,200,208,0.16))',
        }} />
      <div className="relative rounded-3xl h-full flex flex-col p-7 overflow-hidden transition-transform duration-300 hover:-translate-y-1.5"
        style={{
          background: 'linear-gradient(165deg, #14141B 0%, #0B0B10 55%, #08080C 100%)',
          boxShadow: featured
            ? '0 0 40px rgba(200,200,208,0.14), inset 0 1px 0 rgba(255,255,255,0.06)'
            : 'inset 0 1px 0 rgba(255,255,255,0.04)',
        }}>
        {/* Oversized index numeral as a watermark */}
        <span aria-hidden className={`absolute -top-4 ${isRtl ? 'left-3' : 'right-3'} text-[7rem] font-bold leading-none select-none`}
          style={{ color: 'rgba(200,200,208,0.05)' }}>
          {String(index + 1).padStart(2, '0')}
        </span>

        {featured && (
          <div className="inline-flex self-start items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-4"
            style={{ background: '#C8C8D0', color: '#08080C' }}>
            <Star className="w-3.5 h-3.5" fill="#08080C" />
            {isRtl ? 'הקורס המבוקש' : 'Most Popular'}
          </div>
        )}

        <div className="relative flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl flex-shrink-0"
            style={{ background: 'rgba(200,200,208,0.1)', border: '1px solid rgba(200,200,208,0.22)' }}>
            <Icon className="w-6 h-6" style={{ color: '#C8C8D0' }} />
          </div>
          {badge && (
            <span className="text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap"
              style={{ background: 'rgba(200,200,208,0.1)', color: '#C8C8D0', border: '1px solid rgba(200,200,208,0.2)' }}>
              {badge}
            </span>
          )}
        </div>

        <h3 className="relative text-2xl font-bold text-white leading-snug mb-2">{title}</h3>
        {subtitle && (
          <p className="relative text-sm leading-relaxed mb-5" style={{ color: 'rgba(200,200,208,0.7)' }}>{subtitle}</p>
        )}

        {bullets.length > 0 && (
          <ul className="relative space-y-2.5 mb-6">
            {bullets.map(b => (
              <li key={b} className="flex items-start gap-2.5 text-sm" style={{ color: 'rgba(200,200,208,0.9)' }}>
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#C8C8D0' }} />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="relative mt-auto">
          <div className="flex items-baseline gap-2 mb-4 pt-5" style={{ borderTop: '1px solid rgba(200,200,208,0.14)' }}>
            <span className="text-4xl font-bold text-white tracking-tight">{formatPrice(course.price)}</span>
            <span className="text-sm" style={{ color: 'rgba(200,200,208,0.55)' }}>
              {isRtl ? 'לקורס המלא' : 'full course'}
            </span>
          </div>
          <GradientButton size="md" className="w-full justify-center" onClick={onOrder}>
            {isRtl ? 'הזמנת מקום' : 'Book a Spot'}
          </GradientButton>
        </div>
      </div>
    </motion.article>
  );
}

function CourseCard({ course, isRtl, onOrder }: { course: CourseItem; isRtl: boolean; onOrder: () => void }) {
  const title = isRtl ? course.title : course.titleEn ?? course.title;
  const subtitle = isRtl ? course.subtitle : course.subtitleEn ?? course.subtitle;
  const description = isRtl ? course.description : course.descriptionEn ?? course.description;
  const badge = isRtl ? course.badge : course.badgeEn ?? course.badge;
  const bullets = ((isRtl ? course.highlights : course.highlightsEn ?? course.highlights) ?? '')
    .split('\n').map(b => b.trim()).filter(Boolean);
  const perLesson = course.priceUnit === 'lesson';
  const featured = course.slug === FEATURED_SLUG;
  const Icon = cardIcon(course);

  return (
    <motion.div {...reveal}
      className={`relative rounded-2xl p-6 flex flex-col transition-all duration-300 group hover:-translate-y-1.5 ${featured ? 'glow-cyan' : 'hover:glow-cyan'}`}
      style={{
        background: featured
          ? 'linear-gradient(160deg, rgba(200,200,208,0.12) 0%, rgba(255,255,255,0.04) 45%)'
          : 'rgba(255,255,255,0.05)',
        border: featured ? '1px solid rgba(200,200,208,0.5)' : '1px solid rgba(200,200,208,0.2)',
      }}>
      {featured && (
        <div className="absolute -top-3.5 right-6 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
          style={{ background: '#C8C8D0', color: '#08080C' }}>
          <Star className="w-3.5 h-3.5" fill="#08080C" />
          {isRtl ? 'הקורס המבוקש' : 'Most Popular'}
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <div className="p-2.5 rounded-xl"
          style={{ background: 'rgba(200,200,208,0.1)', border: '1px solid rgba(200,200,208,0.2)' }}>
          <Icon className="w-5 h-5" style={{ color: '#C8C8D0' }} />
        </div>
        {badge && (
          <span className="text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap"
            style={{ background: 'rgba(200,200,208,0.12)', color: '#C8C8D0', border: '1px solid rgba(200,200,208,0.2)' }}>
            {badge}
          </span>
        )}
      </div>

      <h3 className="text-xl font-bold text-white leading-snug mb-2">{title}</h3>
      {subtitle && <p className="text-sm font-medium mb-3" style={{ color: 'rgba(200,200,208,0.9)' }}>{subtitle}</p>}
      {bullets.length > 0 ? (
        <ul className="space-y-2 mb-5">
          {bullets.map(b => (
            <li key={b} className="flex items-start gap-2 text-sm" style={{ color: 'rgba(200,200,208,0.7)' }}>
              <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'rgba(200,200,208,0.8)' }} />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      ) : (
        description && <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(200,200,208,0.55)' }}>{description}</p>
      )}

      <div className="mt-auto">
        <div className="flex items-baseline gap-2 mb-4 pt-4" style={{ borderTop: '1px solid rgba(200,200,208,0.12)' }}>
          <span className="text-3xl font-bold text-white tracking-tight">{formatPrice(course.price)}</span>
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
  const bullets = ((isRtl ? course.highlights : course.highlightsEn ?? course.highlights) ?? '')
    .split('\n').map(b => b.trim()).filter(Boolean);

  const discount = course.originalPrice != null && course.originalPrice > course.price
    ? Math.round((1 - course.price / course.originalPrice) * 100)
    : null;

  return (
    <motion.div {...reveal}
      className="rounded-2xl p-6 flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:glow-cyan"
      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(200,200,208,0.25)' }}>
      <div className="flex items-center justify-between mb-4">
        <div className="p-2.5 rounded-xl"
          style={{ background: 'rgba(200,200,208,0.1)', border: '1px solid rgba(200,200,208,0.2)' }}>
          <HeartHandshake className="w-5 h-5" style={{ color: '#C8C8D0' }} />
        </div>
        <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap"
          style={{ background: 'rgba(200,200,208,0.12)', color: '#C8C8D0', border: '1px solid rgba(200,200,208,0.2)' }}>
          <Sparkles className="w-3 h-3" />
          {isRtl ? 'מסובסד' : 'Subsidized'}
        </span>
      </div>

      <h3 className="text-xl font-bold text-white leading-snug mb-2">{title}</h3>
      {audience && (
        <p className="text-sm font-semibold mb-3" style={{ color: '#C8C8D0' }}>
          {isRtl ? `מיועד ל${audience}` : `For ${audience}`}
        </p>
      )}
      {subtitle && <p className="text-sm mb-3" style={{ color: 'rgba(200,200,208,0.85)' }}>{subtitle}</p>}
      {bullets.length > 0 ? (
        <ul className="space-y-2 mb-5">
          {bullets.map(b => (
            <li key={b} className="flex items-start gap-2 text-sm" style={{ color: 'rgba(200,200,208,0.7)' }}>
              <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'rgba(200,200,208,0.8)' }} />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      ) : (
        description && <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(200,200,208,0.55)' }}>{description}</p>
      )}

      <div className="mt-auto">
        <div className="pt-4" style={{ borderTop: '1px solid rgba(200,200,208,0.12)' }}>
          <div className="flex items-baseline gap-3 mb-1 flex-wrap">
            <span className="text-3xl font-bold text-white tracking-tight">{formatPrice(course.price)}</span>
            {course.originalPrice != null && course.originalPrice > course.price && (
              <>
                <span className="text-lg line-through" style={{ color: 'rgba(200,200,208,0.45)' }}>
                  {formatPrice(course.originalPrice)}
                </span>
                {discount != null && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md"
                    style={{ background: '#C8C8D0', color: '#08080C' }}>
                    {isRtl ? `חיסכון ${discount}%` : `${discount}% off`}
                  </span>
                )}
              </>
            )}
          </div>
          <p className="text-xs mb-4" style={{ color: 'rgba(200,200,208,0.5)' }}>
            {isRtl ? 'המחיר למי שנמצאו זכאים, בכפוף לבדיקה' : 'Price for eligible applicants, subject to verification'}
          </p>
        </div>
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

  const fieldClass = (hasError: boolean) =>
    `w-full px-4 py-3 rounded-xl bg-gray-50 border text-gray-900 placeholder-gray-400 focus:outline-none transition-colors ${
      hasError ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-gray-500'
    }`;

  return (
    <div dir={dir} className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer" onClick={onClose} />
      <motion.div initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="relative bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} aria-label={isRtl ? 'סגירה' : 'Close'} type="button"
          className={`absolute top-3 ${isRtl ? 'left-3' : 'right-3'} w-11 h-11 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer`}>
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
              <label htmlFor="order-name" className="block text-sm font-medium text-gray-600 mb-1">
                {isRtl ? 'שם מלא *' : 'Full name *'}
              </label>
              <input id="order-name" type="text" value={form.name} className={fieldClass(!!errors.name)}
                aria-invalid={!!errors.name} aria-describedby={errors.name ? 'order-name-err' : undefined}
                onChange={e => { setForm(p => ({ ...p, name: e.target.value })); setErrors(p => ({ ...p, name: undefined })); }}
                placeholder={isRtl ? 'ישראל ישראלי' : 'John Doe'} />
              {errors.name && <p id="order-name-err" className="text-xs text-red-600 mt-1">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="order-phone" className="block text-sm font-medium text-gray-600 mb-1">
                {isRtl ? 'טלפון *' : 'Phone *'}
              </label>
              <input id="order-phone" type="tel" value={form.phone} className={fieldClass(!!errors.phone)}
                aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'order-phone-err' : undefined}
                onChange={e => { setForm(p => ({ ...p, phone: e.target.value })); setErrors(p => ({ ...p, phone: undefined })); }}
                placeholder="050-000-0000" />
              {errors.phone && <p id="order-phone-err" className="text-xs text-red-600 mt-1">{errors.phone}</p>}
            </div>
            <div>
              <label htmlFor="order-email" className="block text-sm font-medium text-gray-600 mb-1">
                {isRtl ? 'מייל *' : 'Email *'}
              </label>
              <input id="order-email" type="email" value={form.email} className={fieldClass(!!errors.email)}
                aria-invalid={!!errors.email} aria-describedby={errors.email ? 'order-email-err' : undefined}
                onChange={e => { setForm(p => ({ ...p, email: e.target.value })); setErrors(p => ({ ...p, email: undefined })); }}
                placeholder="email@example.com" />
              {errors.email && <p id="order-email-err" className="text-xs text-red-600 mt-1">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="order-message" className="block text-sm font-medium text-gray-600 mb-1">
                {isEligibility
                  ? (isRtl ? 'ספרו לנו קצת על עצמכם' : 'Tell us a bit about yourself')
                  : (isRtl ? 'הערות (לא חובה)' : 'Notes (optional)')}
              </label>
              <textarea id="order-message" rows={3} value={form.message} className={fieldClass(false)}
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
