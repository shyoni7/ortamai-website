import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { Check, Lock } from 'lucide-react';
import { DEMO_BACKDROP, DEMO_LABELS, demoDishes } from '@/data/demoDishes';

// The live site in the demo pulls in GSAP, so it loads after the hero text.
const DishOrbitCarousel = lazy(() => import('@/components/ui/dish-orbit-carousel'));

/**
 * Looping hero animation for the Claude Code course. It opens on a terminal alone,
 * where a request for a restaurant website is typed. Only once the request is sent
 * does a browser window appear beside it, and the site comes together inside:
 * first a wireframe, then the real page, then its menu, and finally the dishes
 * start to move. The browser is labelled as an example, so nobody takes the page
 * for a restaurant's. The course intro runs underneath as subtitles.
 *
 * One clock drives the terminal, the browser and the subtitles, so they never
 * drift apart. Under reduced motion the finished state is shown, still.
 */

const LOOP = 16; // seconds
const TYPE_START = 0.5;
const TYPE_END = 3.2;
const SUBMIT_AT = 3.45; // the request is sent: the terminal steps aside, the browser opens
const FADE_OUT = 15.4;
const DISH_EVERY = 2100; // ms between dishes once the site is animated

const COPY = {
  he: {
    prompt: 'תבנה לי אתר למסעדה שלי, עם תפריט מנות',
    steps: ['מעצב את האתר', 'בונה את התפריט', 'מוסיף אנימציות', 'מעלה לאוויר'],
    done: 'האתר של המסעדה באוויר',
    url: 'my-restaurant.co.il',
    live: 'באוויר',
    example: 'דוגמה: אתר שתלמדו לבנות',
    label: 'אנימציה: בקשה אחת ל-Claude Code הופכת לאתר מסעדה חי, עם תפריט מנות מונפש',
  },
  en: {
    prompt: 'Build a website for my restaurant, with a menu',
    steps: ['Designing the site', 'Building the menu', 'Adding animations', 'Deploying'],
    done: 'Your restaurant site is live',
    url: 'my-restaurant.com',
    live: 'Live',
    example: 'Example: a site you will learn to build',
    label: 'Animation: one request to Claude Code becomes a live restaurant website with an animated menu',
  },
};

/** When each step starts working and when it completes. */
const STEPS = [
  { start: 3.8, done: 5.3 }, // design: wireframe, then the real page
  { start: 5.5, done: 6.9 }, // menu: dish card and thumbnails arrive
  { start: 7.1, done: 8.3 }, // animations: the dishes start to turn
  { start: 8.5, done: 9.5 }, // deploy: address bar and live badge
];
const DONE_AT = 9.7;
const WIREFRAME_AT = 4.3;

export default function CodeDemoHero({ lang, captions }: { lang: 'he' | 'en'; captions: string[] }) {
  const copy = COPY[lang];
  const dishes = useMemo(() => demoDishes(lang), [lang]);
  const [t, setT] = useState(0);
  const [still, setStill] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStill(true);
      return;
    }
    const started = performance.now();
    const id = window.setInterval(() => {
      // Paused tabs do not need the clock.
      if (document.hidden) return;
      setT(((performance.now() - started) / 1000) % LOOP);
    }, 80);
    return () => window.clearInterval(id);
  }, []);

  // The still version is the finished frame.
  const now = still ? FADE_OUT - 0.1 : t;
  const typed = still
    ? copy.prompt
    : copy.prompt.slice(0, Math.max(0, Math.ceil(((now - TYPE_START) / (TYPE_END - TYPE_START)) * copy.prompt.length)));
  const typing = !still && now >= TYPE_START && now < TYPE_END + 0.3;
  const on = (at: number) => (now >= at ? ' is-on' : '');
  const line = Math.min(captions.length - 1, Math.floor((t / LOOP) * captions.length));

  const split = now >= SUBMIT_AT;
  const designed = now >= STEPS[0].done;
  const hasMenu = now >= STEPS[1].done;
  const animated = now >= STEPS[2].done;
  const live = now >= STEPS[3].done;

  // Phones show one status line instead of the whole step list.
  const active = STEPS.findIndex(s => now >= s.start && now < s.done);
  const lastDone = STEPS.reduce((acc, s, i) => (now >= s.done ? i : acc), -1);
  const status = now >= DONE_AT
    ? { text: copy.done, done: true }
    : active >= 0
      ? { text: copy.steps[active], done: false }
      : lastDone >= 0
        ? { text: copy.steps[lastDone], done: true }
        : null;

  return (
    <>
      <div
        className={`cdh-stage${lang === 'he' ? ' is-rtl' : ''}${split ? ' is-split' : ''}${!still && now >= FADE_OUT ? ' is-leaving' : ''}`}
        role="img" aria-label={copy.label}
      >
        {/* Terminal */}
        <div className="cdh-win cdh-term" dir="ltr">
          <div className="cdh-bar">
            <i /><i /><i />
            <span className="cdh-bar-title">claude</span>
          </div>
          <div className="cdh-term-body">
            <p className="cdh-dim">~/my-restaurant $ claude</p>
            <p className="cdh-prompt" dir="auto">
              <span className="cdh-chevron">&gt;</span> {typed}
              {typing && <span className="cdh-caret" />}
            </p>
            {STEPS.map((s, i) => (
              <p key={copy.steps[i]} dir="auto"
                className={`cdh-step${on(s.start)}${now >= s.done ? ' is-done' : ''}`}>
                <span className="cdh-mark">{now >= s.done ? <Check aria-hidden="true" /> : <b />}</span>
                {copy.steps[i]}
              </p>
            ))}
            <p dir="auto" className={`cdh-final${on(DONE_AT)}`}>
              <span className="cdh-mark"><Check aria-hidden="true" /></span>
              {copy.done}
            </p>
            <p dir="auto" className={`cdh-status${status ? ' is-on' : ''}${status?.done ? ' is-done' : ''}`}>
              <span className="cdh-mark">{status?.done ? <Check aria-hidden="true" /> : <b />}</span>
              {status?.text}
            </p>
          </div>
        </div>

        {/* Browser: the restaurant site being built */}
        <div className="cdh-win cdh-browser" dir="ltr">
          <span className="cdh-tag" dir={lang === 'he' ? 'rtl' : 'ltr'}>{copy.example}</span>
          <div className="cdh-bar">
            <i /><i /><i />
            <span className={`cdh-url${live ? ' is-on' : ''}`}>
              <Lock aria-hidden="true" />{copy.url}
            </span>
            <span className={`cdh-live${live ? ' is-on' : ''}`}>{copy.live}</span>
          </div>
          <div className={`cdh-site${designed ? ' is-designed' : ''}${hasMenu ? ' has-menu' : ''}`}>
            {/* Wireframe, before the design lands */}
            <div className={`cdh-wire${on(WIREFRAME_AT)}`} aria-hidden="true">
              <span className="cdh-w-plate" />
              <span className="cdh-w-t1" />
              <span className="cdh-w-t2" />
              <span className="cdh-w-card" />
              <span className="cdh-w-strip"><i /><i /><i /><i /></span>
            </div>
            {/* The real, live site. Decorative here, so it is kept out of the tab order. */}
            <div className="cdh-live-site" inert aria-hidden="true">
              <Suspense fallback={null}>
                <DishOrbitCarousel
                  dishes={dishes}
                  backdrop={DEMO_BACKDROP}
                  labels={DEMO_LABELS[lang]}
                  height="100%"
                  layout="canvas"
                  scroll={false}
                  autoplay={animated && !still ? DISH_EVERY : undefined}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      {/* Screen readers get the intro once, as a plain paragraph. */}
      <p className="sr-only">{captions.join('. ')}.</p>
      <p className="syl-caption" aria-hidden="true">
        {still
          ? <span>{captions.join('. ')}.</span>
          : <span key={line} className="syl-caption-line">{captions[line]}</span>}
      </p>
    </>
  );
}
