import { Link } from 'wouter';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const IMG = '/images/home';

interface Course {
  id: string;
  title: string;
  line: string;
  img: string;
  alt: string;
  href: string;
  /** chip shown on the flagship card only */
  badge?: string;
}

// Four featured courses on the home page. Claude Code is the flagship and
// gets the large dark card; the studio course comes second.
export default function FeaturedCourses({ he }: { he: boolean }) {
  const Arrow = he ? ArrowLeft : ArrowRight;

  const courses: Course[] = [
    {
      id: 'claude-code',
      title: he ? 'קורס Claude Code' : 'Claude Code Course',
      line: he
        ? 'בונים אפליקציות, אתרים ואוטומציות עם AI. מאפס ועד פרויקט אמיתי שעולה לאוויר.'
        : 'Build apps, websites and automations with AI. From zero to a real project that goes live.',
      img: `${IMG}/course-claude-code.webp`,
      alt: he ? 'מפתח עובד בערב על מחשב נייד עם עורך קוד פתוח' : 'A developer working in the evening with a code editor open',
      href: '/courses',
      badge: he ? 'הקורס הדגל שלנו' : 'Our flagship course',
    },
    {
      id: 'studio',
      title: he ? 'סטודיו AI ליוצרי תוכן' : 'AI Studio for Creators',
      line: he
        ? 'מפרומפט לסרט. הופכים רעיון לווידאו ולתמונות ברמה מקצועית.'
        : 'From prompt to film. Turn an idea into professional video and images.',
      img: `${IMG}/course-ai-studio.webp`,
      alt: he ? 'יוצרת תוכן עורכת וידאו בסטודיו ביתי' : 'A creator editing video in a home studio',
      href: '/courses',
    },
    {
      id: 'agents',
      title: he ? 'סוכני AI ואוטומציות לעסקים' : 'AI Agents & Automation for Business',
      line: he
        ? 'סוכנים שעונים, מתאמים ומעדכנים בשבילכם, וכל הכלים של העסק בזרימה אחת.'
        : 'Agents that answer, schedule and update for you, with all your business tools in one flow.',
      img: `${IMG}/course-ai-agents.webp`,
      alt: he ? 'טאבלט על דלפק של עסק קטן מציג תרשים זרימה של אוטומציה' : 'A tablet on a small business counter showing an automation flow',
      href: '/courses',
    },
    {
      id: 'cyber',
      title: he ? 'סייבר AI לאנשי אבטחת מידע' : 'Cyber AI for Security Professionals',
      line: he
        ? 'ניטור, זיהוי וניתוח איומים בעידן ה-AI. מכירים את הכלים של התוקפים ועובדים איתם בצד המגן.'
        : 'Monitoring, detection and threat analysis in the AI era. Know the attackers’ tools and use them on defence.',
      img: `${IMG}/course-cyber-ai.webp`,
      alt: he ? 'אנליסט אבטחה מול מסכי ניטור' : 'A security analyst in front of monitoring screens',
      href: '/academy',
    },
  ];

  const [flagship, ...rest] = courses;

  return (
    <section aria-labelledby="featured-title" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="featured-title" className="text-3xl md:text-5xl font-bold max-w-3xl">
            {he ? 'הקורסים שלנו' : 'Our courses'}
          </h2>
          <Link href="/courses" className="h-link inline-flex items-center gap-2 font-bold text-lg" style={{ color: 'var(--h-link)' }}>
            {he ? 'לכל הקורסים' : 'All courses'}
            <Arrow size={18} className="h-link-arrow" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 md:mt-14 grid gap-5 md:gap-6 md:grid-cols-12">
          <Link href={flagship.href} className="fc-card fc-flagship md:col-span-8 md:row-span-2">
            <img src={flagship.img} alt={flagship.alt} loading="lazy" className="fc-flagship-img" />
            <span aria-hidden="true" className="fc-flagship-shade" />
            <span className="fc-flagship-body">
              {flagship.badge && <span className="fc-badge">{flagship.badge}</span>}
              <span className="fc-title fc-title-xl">{flagship.title}</span>
              <span className="fc-line">{flagship.line}</span>
              <span className="fc-more">
                {he ? 'לפרטים על הקורס' : 'Course details'}
                <Arrow size={18} className="h-link-arrow" aria-hidden="true" />
              </span>
            </span>
          </Link>

          {rest.map((c, i) => (
            <Link key={c.id} href={c.href} className={`fc-card fc-light ${i === 0 ? 'md:col-span-4 md:row-span-2' : 'md:col-span-6'}`}>
              <span className={`fc-media ${i === 0 ? 'fc-media-tall' : ''}`}>
                <img src={c.img} alt={c.alt} loading="lazy" />
              </span>
              <span className="fc-light-body">
                <span className="fc-title">{c.title}</span>
                <span className="fc-line">{c.line}</span>
                <span className="fc-more">
                  {he ? 'לפרטים' : 'Details'}
                  <Arrow size={17} className="h-link-arrow" aria-hidden="true" />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
