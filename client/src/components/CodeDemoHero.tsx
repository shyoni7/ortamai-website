import { useEffect, useState } from 'react';
import { Check, Lock } from 'lucide-react';

/**
 * Looping hero animation for the Claude Code course: a request is typed into a
 * terminal, Claude works through its steps, and a website assembles in a browser
 * window beside it. The course intro runs underneath as subtitles.
 *
 * One clock drives everything, so the terminal, the preview and the subtitles
 * never drift apart. Under reduced motion the finished state is shown, still.
 */

const LOOP = 12; // seconds
const TYPE_START = 0.5;
const TYPE_END = 3.1;
const FADE_OUT = 11.4;

const COPY = {
  he: {
    prompt: 'תבנה לי דף נחיתה לעסק שלי',
    steps: ['מתכנן את העמוד', 'כותב את הקוד', 'מעלה לאוויר'],
    done: 'האתר שלך באוויר',
    url: 'mybusiness.co.il',
    live: 'באוויר',
    label: 'אנימציה: בקשה אחת ל-Claude Code הופכת לאתר שעולה לאוויר',
  },
  en: {
    prompt: 'Build a landing page for my business',
    steps: ['Planning the page', 'Writing the code', 'Deploying'],
    done: 'Your site is live',
    url: 'mybusiness.com',
    live: 'Live',
    label: 'Animation: one request to Claude Code becomes a live website',
  },
};

/** When each step starts working and when it completes. */
const STEPS = [
  { start: 3.5, done: 4.7 },
  { start: 4.9, done: 6.7 },
  { start: 6.9, done: 8.0 },
];
const DONE_AT = 8.2;

/** When each block of the preview page appears. */
const SHOW = { nav: 4.1, title: 4.5, text: 5.3, button: 5.7, card1: 6.0, card2: 6.25, card3: 6.5, live: 8.0 };

export default function CodeDemoHero({ lang, captions }: { lang: 'he' | 'en'; captions: string[] }) {
  const copy = COPY[lang];
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

  return (
    <>
      <div className={`cdh-stage${lang === 'he' ? ' is-rtl' : ''}${!still && now >= FADE_OUT ? ' is-leaving' : ''}`} role="img" aria-label={copy.label}>
        {/* Terminal */}
        <div className="cdh-win cdh-term" dir="ltr">
          <div className="cdh-bar">
            <i /><i /><i />
            <span className="cdh-bar-title">claude</span>
          </div>
          <div className="cdh-term-body">
            <p className="cdh-dim">~/my-business $ claude</p>
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
          </div>
        </div>

        {/* Browser preview */}
        <div className="cdh-win cdh-browser" dir="ltr">
          <div className="cdh-bar">
            <i /><i /><i />
            <span className={`cdh-url${on(SHOW.live)}`}>
              <Lock aria-hidden="true" />{copy.url}
            </span>
            <span className={`cdh-live${on(SHOW.live)}`}>{copy.live}</span>
          </div>
          <div className="cdh-page">
            <div className={`cdh-b cdh-nav${on(SHOW.nav)}`}><u /><span /><span /><span /></div>
            <div className={`cdh-b cdh-title${on(SHOW.title)}`}><span /><span /></div>
            <div className={`cdh-b cdh-text${on(SHOW.text)}`}><span /><span /></div>
            <div className={`cdh-b cdh-button${on(SHOW.button)}`} />
            <div className="cdh-cards">
              <div className={`cdh-b cdh-card${on(SHOW.card1)}`} />
              <div className={`cdh-b cdh-card${on(SHOW.card2)}`} />
              <div className={`cdh-b cdh-card${on(SHOW.card3)}`} />
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
