import { useLayoutEffect } from 'react';
import ScrollSequence, { SequenceOverlay } from '@/components/ScrollSequence';
import LobbyHub from '@/components/LobbyHub';
import { RETURN_TO_LOBBY_KEY } from '@/components/RoomScene';
import { useLanguage } from '@/contexts/LanguageContext';
import SEO from '@/components/SEO';
import { organizationSchema, websiteSchema } from '@/lib/seoSchemas';

const PLAT  = '#C8C8D0';
const WHITE = '#FFFFFF';

/**
 * The home page IS the journey: a scroll-scrubbed flight from space into the
 * building that lands in the interactive lobby — and ends there. Everything
 * the old page kept below the fold now lives inside the lobby itself (the
 * info stand and the rooms), so there is no half-lobby / half-page state.
 */
export default function Home() {
  const { t, lang, dir } = useLanguage();
  const isRtl = lang === 'he';

  // Coming back from a room lands straight in the lobby (the page's end),
  // not at the top of the flight.
  useLayoutEffect(() => {
    let returning = false;
    try {
      returning = sessionStorage.getItem(RETURN_TO_LOBBY_KEY) === '1';
      if (returning) sessionStorage.removeItem(RETURN_TO_LOBBY_KEY);
    } catch { /* private mode */ }
    if (returning) window.scrollTo(0, document.documentElement.scrollHeight);
  }, []);

  return (
    <>
    <SEO
      title={isRtl ? 'המרכז לפיתוח AI בישראל | חממה, הכשרות וסדנאות' : 'AI Development Center Israel | Incubator, Training & Workshops'}
      description={isRtl
        ? 'ORTAM AI — הגשר בין העולם הישן לעולם ה-AI. חממה טכנולוגית, קורסי AI לארגונים ועסקים, וסדנאות מעשיות. מוביל בישראל.'
        : 'ORTAM AI — Israel\'s leading AI development center. Tech incubator, AI training for organizations, and hands-on workshops.'}
      canonical="/"
      schema={[organizationSchema, websiteSchema]}
    />
    <div dir={dir}>

      {/* ══════════════════════════════════════════
          THE JOURNEY — scroll-driven flight into the ORTAM building,
          landing in the interactive lobby (the end of the page).
      ══════════════════════════════════════════ */}
      <div id="journey-seq">
      <ScrollSequence name="journey" desktopFrames={81} mobileFrames={42} heightVh={360}
        cutAt={[0.4125]}>

        {/* In space, facing the building */}
        <SequenceOverlay from={0} to={0.2} className="items-start justify-center">
          <div className="text-center px-4 pt-[16svh]">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs md:text-sm font-medium mb-5"
              style={{ borderColor: 'rgba(200,200,208,0.35)', background: 'rgba(8,8,12,0.55)', color: PLAT, backdropFilter: 'blur(8px)' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: PLAT }} />
              {isRtl ? 'מרכז פיתוח AI מוביל בישראל' : "Israel's Leading AI Development Center"}
            </div>
            <h1 className="font-bold leading-[1.05] tracking-wide" dir="ltr"
              style={{ fontSize: 'clamp(3rem, 9vw, 7rem)', color: WHITE, textShadow: '0 2px 24px rgba(0,0,0,0.8)' }}>
              ORTAM <span className="text-gradient-cyan">AI</span>
            </h1>
            <p className="mt-2 text-base md:text-xl font-medium" style={{ color: 'rgba(200,200,208,0.9)', textShadow: '0 1px 12px rgba(0,0,0,0.8)' }}>
              {isRtl ? 'המרכז לפיתוח AI' : 'The AI Development Center'}
            </p>
            <p className="mt-5 text-sm md:text-base flex flex-col items-center gap-2" style={{ color: 'rgba(200,200,208,0.85)' }}>
              {isRtl ? 'גללו כדי להיכנס' : 'Scroll to enter'}
              <span className="inline-block w-px h-10" style={{ background: `linear-gradient(to bottom, ${PLAT}, transparent)` }} />
            </p>
          </div>
        </SequenceOverlay>

        {/* Approaching the entrance */}
        <SequenceOverlay from={0.22} to={0.39} className="items-center justify-center">
          <div className="text-center px-4 max-w-3xl mx-auto">
            <h2 className="font-bold mb-4" style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)', color: WHITE, textShadow: '0 2px 24px rgba(0,0,0,0.85)' }}>
              {t.home.hero_subtitle}
            </h2>
            <p className="text-base md:text-xl" style={{ color: 'rgba(200,200,208,0.9)', textShadow: '0 1px 12px rgba(0,0,0,0.8)' }}>
              {t.home.hero_desc}
            </p>
          </div>
        </SequenceOverlay>

        {/* Entering the lobby */}
        <SequenceOverlay from={0.45} to={0.68} className="items-center justify-center">
          <div className="text-center px-4">
            <h2 className="font-bold" style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)', color: WHITE, textShadow: '0 2px 24px rgba(0,0,0,0.9)' }}>
              {isRtl ? 'ברוכים הבאים למרכז לפיתוח AI' : 'Welcome to the AI Development Center'}
            </h2>
          </div>
        </SequenceOverlay>

      </ScrollSequence>

      {/* ══════════════════════════════════════════
          THE INTERACTIVE LOBBY — drag to look around, click to enter a room.
          This is where the page ends; the site continues inside the rooms.
      ══════════════════════════════════════════ */}
      <LobbyHub />
      </div>
    </div>
    </>
  );
}
