import type { ReactNode } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, ArrowRight, MessageCircle, CalendarCheck } from 'lucide-react';
import HeroScene from '@/components/HeroScene';
import { useLanguage } from '@/contexts/LanguageContext';
import SEO from '@/components/SEO';
import { organizationSchema, websiteSchema } from '@/lib/seoSchemas';

const WHATSAPP_NUMBER = '972523381822';
const IMG = '/images/home';

const CLIENTS = [
  { name: 'ועד עובדים כלל ביטוח', nameEn: 'Clal Insurance Workers Committee', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663445418346/oDFneUKwvw2xJYXYaumUdB/6d9c58ace__abb167b6.png' },
  { name: 'צה"ל', nameEn: 'IDF', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663445418346/oDFneUKwvw2xJYXYaumUdB/97cb921a8_2_c2d719a3.jpeg' },
  { name: 'Tokomni', nameEn: 'Tokomni', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663445418346/oDFneUKwvw2xJYXYaumUdB/40f5d2b0c_2_085f5bf7.png' },
  { name: 'Omnitelecom', nameEn: 'Omnitelecom', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663445418346/oDFneUKwvw2xJYXYaumUdB/eb9cdb162_3_78962139.png' },
  { name: 'אוניברסיטת אריאל', nameEn: 'Ariel University', url: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663445418346/oDFneUKwvw2xJYXYaumUdB/4a76ee3ff_566_511a27c5.jpg' },
  { name: 'לומדים ומתקדמים', nameEn: 'Lomdim Umitkadmim', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663445418346/OmLeAhuLRydXUaQC.png' },
  { name: 'עמותת בוגרי ממר"ם', nameEn: 'MAMRAM Alumni Association', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663445418346/IyhRDVcCPTdwTkiK.png', darkBg: true },
  { name: 'ההסתדרות', nameEn: 'Histadrut', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663445418346/scvBkVKTwknETAgQ.jpg' },
  { name: 'בנק לאומי', nameEn: 'Bank Leumi', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663445418346/COWyaNxVzekIQanP.png' },
  { name: 'CyberGo', nameEn: 'CyberGo', url: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663445418346/ZMeUfaAopZDjYSah.webp' },
];

export default function Home() {
  const { lang, dir } = useLanguage();
  const he = lang === 'he';
  const Arrow = he ? ArrowLeft : ArrowRight;

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    he ? 'שלום, אשמח לקבל מידע על הקורסים של ORTAM AI' : "Hi, I'd like more information about ORTAM AI courses",
  )}`;

  const ctaPrivate = he ? 'קבלו מידע בוואטסאפ' : 'Get info on WhatsApp';
  const ctaOrg = he ? 'תאמו שיחת ייעוץ והתאמה' : 'Book a consultation call';

  const tracks = [
    {
      id: 'ai',
      title: he ? 'הכשרות AI' : 'AI Training',
      body: he
        ? 'מהצעד הראשון ועד בניית מוצרים אמיתיים. לומדים לעבוד עם הכלים שמשנים כל מקצוע, בכיתה, עם מרצה ועם תרגול על משימות מהעבודה.'
        : 'From the first step to building real products. Learn the tools that are changing every profession, in a classroom, with an instructor and hands-on practice on real work tasks.',
      courses: he
        ? ['מה AI יכול לעשות בשבילך? למתחילים', 'לשלוט ב-Claude Code: מ-0 ל-100', 'בונים אתר עם AI', 'סטודיו AI ליוצרי סרטים']
        : ['What Can AI Do for You? For beginners', 'Mastering Claude Code: 0 to 100', 'Building a Website with AI', 'AI Studio for Filmmakers'],
      href: '/courses',
      link: he ? 'לכל הקורסים' : 'All courses',
      img: `${IMG}/class-applause.webp`,
      alt: he ? 'משתתפים מוחאים כפיים בסיום מפגש בכיתה' : 'Participants applauding at the end of a class session',
    },
    {
      id: 'cyber',
      title: he ? 'הכשרות סייבר AI' : 'Cyber AI Training',
      body: he
        ? 'מתקפות מבוססות AI דורשות מגינים שמכירים את הכלים מבפנים. ניטור, זיהוי איומים וניתוח אירועים, כולל מסלול SOC Analyst בשיתוף CyberGo.'
        : 'AI-powered attacks need defenders who know the tools from the inside. Monitoring, threat detection and incident analysis, including a SOC Analyst track with CyberGo.',
      courses: he
        ? ['מסלול SOC Analyst בשיתוף CyberGo', 'ניטור וזיהוי איומים', 'ניתוח אירועי אבטחה']
        : ['SOC Analyst track with CyberGo', 'Monitoring and threat detection', 'Security incident analysis'],
      href: '/academy',
      link: he ? 'למסלולי הסייבר' : 'Cyber tracks',
      img: `${IMG}/cyber-ai-session.webp`,
      alt: he ? 'מפגש סייבר AI, על המסך שקף על מעבר מאיומים מסורתיים למתקפות מבוססות AI' : 'Cyber AI session with a slide on the shift from traditional threats to AI-powered attacks',
    },
  ];

  const facts = [
    { value: '15', label: he ? 'תוכניות הכשרה' : 'training programs' },
    { value: '15', label: he ? 'כיתות שסיימו' : 'classes completed' },
    { value: '~300', label: he ? 'בוגרים' : 'graduates' },
    { value: '10+', label: he ? 'ארגונים לקוחות' : 'client organizations' },
  ];

  const steps = [
    { title: he ? 'שיחת התאמה' : 'A fit call', body: he ? 'מבינים מה אתם צריכים: תפקיד, צוות, רמת ידע.' : 'We learn what you need: role, team, level.' },
    { title: he ? 'בוחרים מסלול' : 'Pick a track', body: he ? 'קורס פתוח לפרטיים, או תוכנית שנבנית לארגון.' : 'An open course for individuals, or a program built for your organization.' },
    { title: he ? 'לומדים בכיתה' : 'Learn in class', body: he ? 'מרצה, תרגול ומשימות אמיתיות. לא רק הרצאות.' : 'An instructor, practice and real tasks. Not just lectures.' },
    { title: he ? 'יוצאים לעבודה' : 'Back to work', body: he ? 'מסיימים עם תעודה וכלים, ובוגרים יכולים להיעזר במרכז ההשמה.' : 'Finish with a certificate and tools; graduates can use our placement center.' },
  ];

  return (
    <>
      <SEO
        title={he ? 'הכשרות AI וסייבר AI לארגונים ולאנשים פרטיים' : 'AI and Cyber AI Training for Organizations and Individuals'}
        description={he
          ? 'ORTAM AI: הכשרות AI והכשרות סייבר AI בכיתה, לארגונים ולאנשים פרטיים. 15 תוכניות, כ-300 בוגרים ומרכז השמה לבוגרים.'
          : 'ORTAM AI: classroom AI and Cyber AI training for organizations and individuals. 15 programs, about 300 graduates, and a placement center for graduates.'}
        canonical="/"
        schema={[organizationSchema, websiteSchema]}
      />
      <div dir={dir} className="home-v2">

        {/* Hero */}
        <section className="relative isolate overflow-hidden" style={{ background: 'var(--h-navy-deep)' }}>
          <HeroScene
            src={`${IMG}/ai-hero-classroom.webp`}
            srcSmall={`${IMG}/ai-hero-classroom-sm.webp`}
            mirrored={!he}
          />
          {/* Keeps the headline readable: darker toward the text side, and on small screens overall */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10"
            style={{
              background: `linear-gradient(${he ? 270 : 90}deg, rgba(10,20,48,0.82) 0%, rgba(10,20,48,0.45) 45%, rgba(10,20,48,0) 75%), linear-gradient(0deg, rgba(10,20,48,0.7) 0%, rgba(10,20,48,0) 35%)`,
            }}
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 md:hidden" style={{ background: 'rgba(10,20,48,0.45)' }} />
          <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-16 pb-20 md:pt-28 md:pb-32 min-h-[62svh] md:min-h-[78svh] flex flex-col justify-center">
            <div className="max-w-3xl text-start">
              <h1
                className="h-rise text-white font-extrabold leading-[1.02]"
                style={{ fontSize: 'clamp(2.9rem, 8.2vw, 6rem)' }}
              >
                {he ? (
                  <>לומדים AI.<br /><span style={{ color: 'var(--h-orange)' }}>עובדים</span> עם AI.</>
                ) : (
                  <>Learn AI.<br /><span style={{ color: 'var(--h-orange)' }}>Work</span> with AI.</>
                )}
              </h1>
              <p className="h-rise h-rise-2 mt-6 md:mt-8 text-lg md:text-2xl leading-relaxed max-w-2xl" style={{ color: 'rgba(255,255,255,0.86)' }}>
                {he
                  ? 'הכשרות AI והכשרות סייבר AI בכיתה, לארגונים ולאנשים פרטיים.'
                  : 'Classroom AI and Cyber AI training, for organizations and individuals.'}
              </p>
              <div className="h-rise h-rise-3 mt-9 md:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="h-btn h-btn-orange">
                  <MessageCircle size={19} aria-hidden="true" />
                  <span>{ctaPrivate}</span>
                </a>
                <Link href="/contact" className="h-btn h-btn-light">
                  <CalendarCheck size={19} aria-hidden="true" />
                  <span>{ctaOrg}</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Two doors */}
        <section aria-labelledby="doors-title" className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <h2 id="doors-title" className="text-3xl md:text-5xl font-bold max-w-3xl" style={{ color: 'var(--h-ink)' }}>
              {he ? 'שתי דרכים להתחיל' : 'Two ways to start'}
            </h2>
            <div className="mt-10 md:mt-14 grid gap-6 md:gap-8 md:grid-cols-2">
              <Door
                img={`${IMG}/ai-private-learner.webp`}
                alt={he ? 'אישה לומדת על מחשב נייד בבית בשעות הערב' : 'A woman learning on a laptop at home in the evening'}
                title={he ? 'לאנשים פרטיים' : 'For individuals'}
                body={he
                  ? 'רוצים להסב מקצוע, להתקדם בעבודה או פשוט להבין מה AI יכול לעשות בשבילכם? קורסים פתוחים לכל אחד, גם בלי רקע טכני.'
                  : 'Changing careers, moving up at work, or just curious what AI can do for you? Open courses, no technical background needed.'}
                action={
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="h-btn h-btn-orange">
                    <MessageCircle size={18} aria-hidden="true" />
                    <span>{ctaPrivate}</span>
                  </a>
                }
              />
              <Door
                img={`${IMG}/ai-org-workshop.webp`}
                alt={he ? 'סדנת AI לצוות בחדר ישיבות, מרצה מול מסך' : 'An AI workshop for a team in a meeting room, instructor at a screen'}
                title={he ? 'לארגונים' : 'For organizations'}
                body={he
                  ? 'תוכנית הכשרה שנבנית סביב העבודה של הצוות שלכם: AI לעבודה היומיומית, אוטומציות, וסייבר AI לצוותי אבטחה.'
                  : 'A training program built around your team’s work: AI for daily work, automation, and Cyber AI for security teams.'}
                action={
                  <Link href="/contact" className="h-btn h-btn-navy">
                    <CalendarCheck size={18} aria-hidden="true" />
                    <span>{ctaOrg}</span>
                  </Link>
                }
              />
            </div>
          </div>
        </section>

        {/* Tracks */}
        <section aria-labelledby="tracks-title" className="py-16 md:py-24" style={{ background: 'var(--h-paper)' }}>
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <h2 id="tracks-title" className="text-3xl md:text-5xl font-bold max-w-3xl">
              {he ? 'מה לומדים' : 'What you learn'}
            </h2>
            <div className="mt-12 md:mt-16 space-y-16 md:space-y-24">
              {tracks.map((track, i) => (
                <article key={track.id} className="grid gap-8 md:gap-14 md:grid-cols-12 items-center">
                  <div className={`md:col-span-7 ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                    <img
                      src={track.img}
                      alt={track.alt}
                      loading="lazy"
                      className="w-full aspect-[16/10] object-cover rounded-[20px]"
                      style={{ boxShadow: '0 24px 60px -30px rgba(14,26,51,0.45)' }}
                    />
                  </div>
                  <div className="md:col-span-5 text-start">
                    <h3 className="text-2xl md:text-4xl font-bold">{track.title}</h3>
                    <p className="mt-4 text-base md:text-lg leading-relaxed max-w-[60ch]" style={{ color: 'var(--h-ink-2)' }}>{track.body}</p>
                    <ul className="mt-6 border-t" style={{ borderColor: 'var(--h-line)' }}>
                      {track.courses.map(c => (
                        <li key={c} className="py-3 border-b text-base font-medium flex items-center gap-3" style={{ borderColor: 'var(--h-line)' }}>
                          <span aria-hidden="true" className="inline-block w-2 h-2 rounded-full shrink-0" style={{ background: 'var(--h-orange)' }} />
                          {c}
                        </li>
                      ))}
                    </ul>
                    <Link href={track.href} className="h-link mt-6 inline-flex items-center gap-2 font-bold text-lg" style={{ color: 'var(--h-blue)' }}>
                      {track.link}
                      <Arrow size={18} className="h-link-arrow" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* From our classrooms + facts */}
        <section aria-labelledby="class-title" className="py-16 md:py-24" style={{ background: 'var(--h-navy)' }}>
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <h2 id="class-title" className="text-3xl md:text-5xl font-bold text-white max-w-3xl">
              {he ? 'מהכיתות שלנו' : 'From our classrooms'}
            </h2>
            <p className="mt-4 text-base md:text-lg max-w-2xl" style={{ color: 'rgba(255,255,255,0.8)' }}>
              {he
                ? 'תמונות אמיתיות ממפגשים וטקסי סיום. טשטשנו פנים ופרטים מזהים כדי לשמור על פרטיות המשתתפים.'
                : 'Real photos from sessions and graduations. Faces and identifying details are blurred to protect participants’ privacy.'}
            </p>
            <div className="mt-10 grid md:grid-cols-12 gap-3 md:gap-4">
              <img src={`${IMG}/cyber-lab.webp`} alt={he ? 'מרצה מציג תרשים רשת לכיתת סייבר' : 'Instructor presenting a network diagram to a cyber class'} loading="lazy" className="md:col-span-7 w-full aspect-[4/3] object-cover rounded-[16px]" />
              <img src={`${IMG}/graduation-handshake.webp`} alt={he ? 'לחיצת יד בטקס חלוקת תעודות' : 'A handshake at a certificate ceremony'} loading="lazy" className="md:col-span-5 w-full aspect-[4/3] md:aspect-auto md:h-full object-cover rounded-[16px]" />
            </div>
            <dl className="mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 border-t pt-10" style={{ borderColor: 'rgba(255,255,255,0.16)' }}>
              {facts.map(f => (
                <div key={f.label} className="text-start">
                  <dt className="sr-only">{f.label}</dt>
                  <dd>
                    <span className="block font-extrabold text-white leading-none tabular-nums" style={{ fontFamily: 'Rubik, Heebo, sans-serif', fontSize: 'clamp(2.6rem, 5vw, 4rem)' }} dir="ltr">
                      {f.value}
                    </span>
                    <span className="block mt-3 text-base" style={{ color: 'rgba(255,255,255,0.78)' }} aria-hidden="true">{f.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Placement */}
        <section aria-labelledby="placement-title" className="py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8 text-start">
              <h2 id="placement-title" className="text-3xl md:text-4xl font-bold">
                {he ? 'אחרי הקורס: מרכז השמה לבוגרים' : 'After the course: placement for graduates'}
              </h2>
              <p className="mt-4 text-base md:text-lg leading-relaxed max-w-[62ch]" style={{ color: 'var(--h-ink-2)' }}>
                {he
                  ? 'בוגרים שרוצים להשתלב בתפקיד שדורש AI יכולים להגיש קורות חיים למרכז ההשמה שלנו. ומעסיקים שמחפשים עובדים עם הכשרת AI מוזמנים לפנות.'
                  : 'Graduates looking for a role that needs AI skills can submit a CV to our placement center. Employers looking for AI-trained staff are welcome to reach out.'}
              </p>
            </div>
            <div className="md:col-span-4 md:text-end">
              <Link href="/placement" className="h-link inline-flex items-center gap-2 font-bold text-lg" style={{ color: 'var(--h-blue)' }}>
                {he ? 'למרכז ההשמה' : 'Placement center'}
                <Arrow size={18} className="h-link-arrow" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* Clients */}
        <section aria-labelledby="clients-title" className="py-16 md:py-20 border-y" style={{ background: 'var(--h-paper)', borderColor: 'var(--h-line)' }}>
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <h2 id="clients-title" className="text-2xl md:text-3xl font-bold">
              {he ? 'בין לקוחותינו' : 'Among our clients'}
            </h2>
            <ul className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-6 gap-y-8 items-center">
              {CLIENTS.map(c => (
                <li key={c.name} className="flex items-center justify-center h-16 md:h-20">
                  <img
                    src={c.url}
                    alt={he ? c.name : c.nameEn}
                    loading="lazy"
                    className={`max-h-12 md:max-h-14 max-w-[140px] w-auto object-contain ${c.darkBg ? 'rounded-md p-2' : ''}`}
                    style={c.darkBg ? { background: 'var(--h-navy-deep)' } : undefined}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* How it works */}
        <section aria-labelledby="how-title" className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <h2 id="how-title" className="text-3xl md:text-5xl font-bold">
              {he ? 'איך זה עובד' : 'How it works'}
            </h2>
            <ol className="mt-12 grid gap-10 md:gap-8 md:grid-cols-4">
              {steps.map((s, i) => (
                <li key={s.title} className="text-start border-t-2 pt-6" style={{ borderColor: i === 0 ? 'var(--h-orange)' : 'var(--h-line)' }}>
                  <span className="block text-sm font-bold tabular-nums" style={{ color: 'var(--h-orange-deep)' }}>
                    {he ? `שלב ${i + 1}` : `Step ${i + 1}`}
                  </span>
                  <h3 className="mt-2 text-xl md:text-2xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-base leading-relaxed" style={{ color: 'var(--h-ink-2)' }}>{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Close */}
        <section aria-labelledby="close-title" className="relative isolate overflow-hidden" style={{ background: 'var(--h-navy-deep)' }}>
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10"
            style={{ background: 'radial-gradient(80% 120% at 85% 100%, rgba(240,112,34,0.32) 0%, rgba(43,84,199,0.22) 45%, rgba(10,20,48,0) 75%)' }}
          />
          <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20 md:py-28 text-start">
            <h2 id="close-title" className="text-white font-extrabold leading-[1.05] max-w-3xl" style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.25rem)' }}>
              {he ? 'הקורס הבא שלכם מתחיל בשיחה אחת.' : 'Your next course starts with one conversation.'}
            </h2>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="h-btn h-btn-orange">
                <MessageCircle size={19} aria-hidden="true" />
                <span>{ctaPrivate}</span>
              </a>
              <Link href="/contact" className="h-btn h-btn-light">
                <CalendarCheck size={19} aria-hidden="true" />
                <span>{ctaOrg}</span>
              </Link>
            </div>
            <p className="mt-10 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
              {he ? 'יזמים ועסקים קטנים? ' : 'Entrepreneurs and small businesses? '}
              <Link href="/incubator" className="underline underline-offset-4 decoration-1" style={{ color: 'rgba(255,255,255,0.9)' }}>
                {he ? 'לאקסלרטור' : 'See the accelerator'}
              </Link>
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

function Door({ img, alt, title, body, action }: { img: string; alt: string; title: string; body: string; action: ReactNode }) {
  return (
    <article className="flex flex-col rounded-[24px] overflow-hidden" style={{ background: 'var(--h-paper)', boxShadow: '0 1px 0 var(--h-line), 0 20px 50px -34px rgba(14,26,51,0.5)' }}>
      <img src={img} alt={alt} loading="lazy" className="w-full aspect-[3/2] object-cover" />
      <div className="flex flex-col flex-1 p-6 md:p-9 text-start">
        <h3 className="text-2xl md:text-3xl font-bold">{title}</h3>
        <p className="mt-3 text-base md:text-lg leading-relaxed flex-1" style={{ color: 'var(--h-ink-2)' }}>{body}</p>
        <div className="mt-7">{action}</div>
      </div>
    </article>
  );
}
