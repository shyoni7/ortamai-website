import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, DoorOpen, Info, Award, Star, TrendingUp, CheckCircle, Phone, Handshake, Users, Mail, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRoomTransition } from '@/contexts/RoomTransitionContext';
import { RoomPanel } from './RoomScene';
import GradientButton from './GradientButton';
import { SplineScene } from './ui/splite';
import { PARTNERS, TEAM, CONTACT } from '@/data/lobbyContent';

/** The interactive concierge robot standing in the lobby. */
const ROBOT_SCENE = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode';

/**
 * The interactive lobby: a horizontal panorama scrubbed by drag / arrow keys /
 * horizontal wheel / touch swipe. Five storefront "zones" map to the five
 * rooms; the front-facing room is shown on a signage card, and entering plays
 * that room's dolly-in sequence before navigating to its page.
 *
 * Vertical scroll is deliberately left alone — the page keeps scrolling
 * normally past the lobby, so the hub never traps the user.
 */

const PAN_FRAMES = { d: 96, m: 48 };

export interface Room {
  slug: string;
  frames: number;
  href: string;
  name: string;
  nameEn: string;
  desc: string;
  descEn: string;
  /** Pan-progress range in which this storefront faces the camera. */
  zone: [number, number];
}

// Zones match the 360° pan footage: it opens on the wide hall (workshop's
// sign at the far edge) then passes each storefront up close in this order.
export const ROOMS: Room[] = [
  { slug: 'workshop',    frames: 29, href: '/courses',   zone: [0, 0.13],    name: 'חדר הסדנאות',    nameEn: 'The Workshop Room',     desc: 'שיעורים וסדנאות מעשיות — יוצרים עם AI בידיים', descEn: 'Hands-on lessons and workshops' },
  { slug: 'accelerator', frames: 25, href: '/incubator', zone: [0.13, 0.36], name: 'קומת האקסלרטור', nameEn: 'The Accelerator Floor', desc: 'יזמים ועסקים בונים את הדור הבא עם AI',        descEn: 'Entrepreneurs building with AI' },
  { slug: 'academy',     frames: 26, href: '/academy',   zone: [0.36, 0.56], name: 'כיתת ההכשרות',   nameEn: 'The Academy Classroom', desc: 'קורסים מקצועיים לארגונים, עסקים ופרטיים',      descEn: 'Professional AI courses' },
  { slug: 'cyber',       frames: 37, href: '/cyber',     zone: [0.56, 0.77], name: 'חדר הסייבר',     nameEn: 'The Cyber Room',        desc: 'הכשרות אבטחת סייבר בעולם ה-AI',               descEn: 'Cyber security training' },
  { slug: 'automations', frames: 37, href: '/automations', zone: [0.77, 1],    name: 'חדר הסוכנים',    nameEn: 'The Agents Room',       desc: 'אוטומציות וסוכני AI שעובדים בשבילכם',          descEn: 'Automations and AI agents' },
];

/** Site pages that used to live in the footer / below the lobby. */
const SITE_LINKS = [
  { href: '/about',          label: 'אודות',           labelEn: 'About' },
  { href: '/courses',        label: 'קורסים ושיעורים', labelEn: 'Courses & Lessons' },
  { href: '/contact',        label: 'צור קשר',         labelEn: 'Contact' },
  { href: '/accessibility',  label: 'הצהרת נגישות',    labelEn: 'Accessibility' },
  { href: '/privacy-policy', label: 'מדיניות פרטיות',  labelEn: 'Privacy Policy' },
];

/** Catches Spline runtime failures so the lobby degrades to the CSS sphere. */
class RobotBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/** CSS stand-in for the robot: the spinning AI atom sphere from the old site. */
function RobotFallback() {
  const R = 'rgba(136,153,187';
  return (
    <div className="w-full h-full flex items-center justify-center pointer-events-none">
      <div className="relative" style={{ width: 'min(180px, 40vw)', height: 'min(180px, 40vw)' }}>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 5, repeat: Infinity, ease: 'linear' }} className="absolute inset-0">
          <div className="absolute inset-0" style={{ transform: 'rotateX(75deg)', borderRadius: '50%', border: '2px solid transparent', borderTopColor: `${R},0.9)`, borderRightColor: `${R},0.9)`, boxShadow: `0 0 10px ${R},0.5)` }} />
          <div className="absolute w-3 h-3 rounded-full bg-white" style={{ top: '-5px', left: '50%', marginLeft: '-6px', boxShadow: `0 0 10px rgba(255,255,255,0.95), 0 0 20px ${R},0.9)` }} />
        </motion.div>
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 7, repeat: Infinity, ease: 'linear' }} className="absolute inset-0">
          <div className="absolute inset-0" style={{ transform: 'rotateX(65deg) rotateZ(45deg)', borderRadius: '50%', border: '2px solid transparent', borderBottomColor: `${R},0.6)`, borderLeftColor: `${R},0.6)`, boxShadow: `0 0 8px ${R},0.4)` }} />
        </motion.div>
        <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute rounded-full flex items-center justify-center" style={{
            inset: '18%',
            background: [
              'radial-gradient(circle at 32% 28%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 22%)',
              'radial-gradient(circle at 50% 50%, #C8C8D0 0%, #08080C 45%, #0d1228 100%)',
            ].join(', '),
            boxShadow: `0 0 40px ${R},0.55), inset 0 0 16px rgba(20,28,60,0.5)`,
          }}>
          <span className="font-black text-white select-none" style={{ fontSize: 'clamp(18px, 4vw, 26px)', textShadow: '0 0 12px rgba(255,255,255,0.8)' }}>AI</span>
        </motion.div>
      </div>
    </div>
  );
}

/** A holographic bubble the robot "projects"; click opens its content shelf. */
function HoloBubble({ icon: Icon, label, onOpen, className = '', delay = 0 }: {
  icon: React.ElementType;
  label: string;
  onOpen: () => void;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.button
      onClick={e => { e.stopPropagation(); onOpen(); }}
      onPointerDown={e => e.stopPropagation()}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, y: [0, -7, 0] }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale: { duration: 0.5, delay },
        y: { duration: 4.5 + delay * 2, repeat: Infinity, ease: 'easeInOut', delay },
      }}
      whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
      className={`absolute overflow-hidden rounded-2xl px-3.5 md:px-4 py-2 md:py-2.5 text-xs md:text-sm font-bold cursor-pointer pointer-events-auto ${className}`}
      style={{
        background: 'linear-gradient(160deg, rgba(90,180,255,0.24), rgba(90,180,255,0.08))',
        border: '1px solid rgba(140,210,255,0.55)',
        color: '#D6EEFF',
        textShadow: '0 0 12px rgba(120,200,255,0.9)',
        boxShadow: '0 0 26px rgba(90,180,255,0.3), inset 0 0 18px rgba(90,180,255,0.15)',
        backdropFilter: 'blur(6px)',
      }}>
      <span aria-hidden className="absolute inset-0 pointer-events-none"
        style={{ background: 'repeating-linear-gradient(0deg, rgba(150,215,255,0.12) 0px, rgba(150,215,255,0.12) 1px, transparent 1px, transparent 3px)' }} />
      <span className="relative flex items-center gap-1.5 whitespace-nowrap">
        <Icon className="w-4 h-4 flex-shrink-0" />
        {label}
      </span>
    </motion.button>
  );
}

function roomAt(progress: number): number {
  const i = ROOMS.findIndex(r => progress >= r.zone[0] && progress <= r.zone[1]);
  return i === -1 ? ROOMS.length - 1 : i;
}

function frameUrl(folder: string, index: number): string {
  return `/seq/${folder}/${String(index + 1).padStart(4, '0')}.webp`;
}

function drawCover(
  canvas: HTMLCanvasElement,
  img: HTMLImageElement,
  zoom = 1,
  /** -0.5..0.5 — slides the crop window sideways across the zoomed frame. */
  shiftX = 0,
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const { width: cw, height: ch } = canvas;
  const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight) * zoom;
  const dw = img.naturalWidth * scale;
  const dh = img.naturalHeight * scale;
  const spareX = dw - cw;
  ctx.drawImage(img, (cw - dw) / 2 - spareX * shiftX, (ch - dh) / 2, dw, dh);
}

export default function LobbyHub() {
  const { t, lang, dir } = useLanguage();
  const isRtl = lang === 'he';
  const { enterRoom, active: entering } = useRoomTransition();
  const [openPanel, setOpenPanel] = useState<'info' | 'partners' | 'team' | null>(null);
  // The Spline robot mounts only after the visitor first lands in the lobby,
  // so its ~2MB runtime never competes with the flight sequence.
  const [robotArmed, setRobotArmed] = useState(false);
  const robotWrapRef = useRef<HTMLDivElement>(null);
  const robotScheduledRef = useRef(false);
  const robotTimerRef = useRef(0);
  const draggingRef = useRef(false);

  // Arm the robot off the critical path: a beat after landing, at browser
  // idle, and never in the middle of a drag — panning must stay smooth while
  // the runtime loads and compiles.
  const scheduleRobot = useCallback(() => {
    if (robotScheduledRef.current) return;
    robotScheduledRef.current = true;
    const tryArm = () => {
      if (draggingRef.current) {
        robotTimerRef.current = window.setTimeout(tryArm, 900);
        return;
      }
      const ric = (window as any).requestIdleCallback as
        | undefined
        | ((cb: () => void, opts?: { timeout: number }) => number);
      if (ric) ric(() => setRobotArmed(true), { timeout: 3500 });
      else setRobotArmed(true);
    };
    robotTimerRef.current = window.setTimeout(tryArm, 1200);
  }, []);
  useEffect(() => () => window.clearTimeout(robotTimerRef.current), []);

  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const panImagesRef = useRef<(HTMLImageElement | null)[]>([]);
  // Start at the panorama's opening frame — the same wide view the flight
  // lands on, so the takeover is invisible.
  const progressRef = useRef(0);
  const currentFrameRef = useRef(-1);
  const [roomIndex, setRoomIndex] = useState(0);
  const [staticMode, setStaticMode] = useState(false);
  // The hub sits one viewport under the journey's final frames and crossfades
  // in over them (the images nearly match), so there is a single, continuous
  // lobby rather than a second copy sliding in.
  const [fade, setFade] = useState(0);
  const fadeRef = useRef(0);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const variant = isMobile ? 'm' : 'd';
  const frameCount = PAN_FRAMES[variant];

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || (navigator as any).connection?.saveData === true) setStaticMode(true);
  }, []);


  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const exact = progressRef.current * (frameCount - 1);
    const index = Math.min(frameCount - 1, Math.round(exact));
    const images = panImagesRef.current;
    let img = images[index];
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let o = 1; o < images.length && (!img || !img.complete || img.naturalWidth === 0); o++) {
        const b = images[index - o]; const a = images[index + o];
        if (b?.complete && b.naturalWidth > 0) img = b;
        else if (a?.complete && a.naturalWidth > 0) img = a;
      }
    }
    if (!img || !img.complete || img.naturalWidth === 0) return;
    currentFrameRef.current = index;
    // Slight zoom + a crop window that leans with the rotation gives the flat
    // frames physical depth while dragging. The lean follows a sine wave so
    // it stays continuous across the circular wrap point.
    drawCover(canvas, img, 1.08, Math.sin(progressRef.current * Math.PI * 2) * 0.15);
  }, [frameCount]);

  // The robot is anchored to a fixed spot in the panorama (the arrival view),
  // not to the screen: rotating away slides it out of frame like a real body
  // standing in the hall, and rotating back brings it home.
  const ROBOT_ANCHOR = 0; // pan progress where the robot stands
  // One storefront zone is ~0.2 of the circle, so that's roughly the progress
  // delta that carries a fixed object one viewport-width sideways.
  const ROBOT_SPAN = 0.2;
  const placeRobot = useCallback(() => {
    const el = robotWrapRef.current;
    if (!el) return;
    // Shortest distance around the circular panorama.
    const d = ((progressRef.current - ROBOT_ANCHOR + 1.5) % 1) - 0.5;
    el.style.transform = `translateX(${(-d / ROBOT_SPAN) * window.innerWidth}px)`;
    el.style.visibility = Math.abs(d) > ROBOT_SPAN ? 'hidden' : 'visible';
  }, []);

  // Takeover driver. The hub is either fully on or fully off — never a
  // translucent blend the user can park inside (that ghosted two images).
  // The instant swap is invisible because the panorama's first frame matches
  // the journey's final frame, and while the hub is off its pan is pinned to
  // that first frame so both directions of the swap always align.
  useEffect(() => {
    if (staticMode) return;
    let raf = 0;
    let settleTimer = 0;
    const alignedNow = () => {
      const section = sectionRef.current;
      if (!section) return 0;
      return 1 - section.getBoundingClientRect().top / window.innerHeight;
    };
    const update = () => {
      const aligned = alignedNow();
      const next = aligned >= 0.995 ? 1 : 0;
      if (next !== fadeRef.current) {
        fadeRef.current = next;
        setFade(next);
        if (next === 1) scheduleRobot();
        if (next === 0) {
          // Rewind the panorama so the next swap starts from the matching frame.
          progressRef.current = 0;
          setRoomIndex(0);
          placeRobot();
          requestAnimationFrame(drawFrame);
        }
      }
    };
    const settle = () => {
      // If the scroll rests inside the handoff window, glide to alignment so
      // the page never sits half-way between flight and lobby.
      const section = sectionRef.current;
      if (!section) return;
      const aligned = alignedNow();
      if (aligned > 0.55 && aligned < 0.995) {
        window.scrollTo({ top: window.scrollY + section.getBoundingClientRect().top, behavior: 'smooth' });
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(settle, 160);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(settleTimer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [staticMode, drawFrame, placeRobot, scheduleRobot]);

  // Seat the robot at its anchor when it first mounts and keep it seated
  // through window resizes.
  useEffect(() => {
    if (!robotArmed) return;
    placeRobot();
    window.addEventListener('resize', placeRobot);
    return () => window.removeEventListener('resize', placeRobot);
  }, [robotArmed, placeRobot]);

  // Preload panorama + entry sequences once the hub first approaches the viewport.
  useEffect(() => {
    if (staticMode) return;
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      const images: (HTMLImageElement | null)[] = new Array(frameCount).fill(null);
      panImagesRef.current = images;
      const load = (i: number) => {
        if (images[i]) return;
        const img = new Image();
        img.src = frameUrl(`pan/${variant}`, i);
        img.onload = () => { currentFrameRef.current = -1; drawFrame(); };
        images[i] = img;
      };
      for (let i = 0; i < frameCount; i += 6) load(i);
      window.setTimeout(() => { for (let i = 0; i < frameCount; i++) load(i); }, 500);
      // Entry sequences load lazily with lowest priority.
      window.setTimeout(() => {
        for (const room of ROOMS) {
          for (let i = 0; i < room.frames; i++) {
            const img = new Image();
            img.loading = 'lazy' as any;
            img.src = frameUrl(`enter/${room.slug}`, i);
          }
        }
      }, 2500);
    };
    const observer = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) { start(); observer.disconnect(); }
    }, { rootMargin: '600px' });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [frameCount, variant, staticMode, drawFrame]);

  // Canvas sizing.
  useEffect(() => {
    if (staticMode) return;
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const resize = () => {
      canvas.width = section.clientWidth;
      canvas.height = section.clientHeight;
      currentFrameRef.current = -1;
      drawFrame();
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [staticMode, drawFrame]);

  // Masks the panorama's seam: the footage doesn't close a perfect loop, so
  // crossing the wrap point plays a quick whip-pan blur that reads as
  // "kept turning" instead of a hard cut.
  const whipTimerRef = useRef(0);
  const triggerWhip = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    window.clearTimeout(whipTimerRef.current);
    canvas.style.transition = 'filter 90ms ease-in';
    canvas.style.filter = 'blur(14px) brightness(1.15)';
    whipTimerRef.current = window.setTimeout(() => {
      canvas.style.transition = 'filter 260ms ease-out';
      canvas.style.filter = 'none';
    }, 110);
  }, []);

  // The lobby is a full circle: progress wraps around in both directions.
  const setProgress = useCallback((p: number) => {
    const wrapped = ((p % 1) + 1) % 1;
    if (p > 1 || p < 0) triggerWhip();
    progressRef.current = wrapped;
    setRoomIndex(roomAt(wrapped));
    placeRobot();
    requestAnimationFrame(drawFrame);
  }, [drawFrame, triggerWhip, placeRobot]);

  // Drag / horizontal-wheel / keyboard interactions.
  useEffect(() => {
    if (staticMode) return;
    const section = sectionRef.current;
    if (!section) return;

    let dragging = false;
    let lastX = 0;
    let velocity = 0;
    let momentumRaf = 0;

    const momentum = () => {
      velocity *= 0.93;
      if (Math.abs(velocity) < 0.0004) return;
      setProgress(progressRef.current + velocity);
      momentumRaf = requestAnimationFrame(momentum);
    };

    const onPointerDown = (e: PointerEvent) => {
      if (fadeRef.current < 1) return; // rotation unlocks only after the takeover
      dragging = true;
      draggingRef.current = true;
      lastX = e.clientX;
      velocity = 0;
      cancelAnimationFrame(momentumRaf);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      const delta = -dx / (section.clientWidth * 1.2);
      velocity = delta;
      // Dragging the scene: pull left → look right.
      setProgress(progressRef.current + delta);
    };
    const onPointerUp = () => {
      draggingRef.current = false;
      if (!dragging) return;
      dragging = false;
      // Let the rotation glide to a stop instead of freezing mid-gesture.
      momentumRaf = requestAnimationFrame(momentum);
    };

    const onWheel = (e: WheelEvent) => {
      if (fadeRef.current < 1) return;
      // Only horizontal intent (trackpads / shift+wheel); vertical scroll passes through.
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        setProgress(progressRef.current + e.deltaX / 1500);
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (fadeRef.current < 1) return;
      const rect = section.getBoundingClientRect();
      if (rect.top > window.innerHeight * 0.5 || rect.bottom < window.innerHeight * 0.5) return;
      if (e.key === 'ArrowLeft') setProgress(progressRef.current - 0.06);
      if (e.key === 'ArrowRight') setProgress(progressRef.current + 0.06);
    };

    section.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    section.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    return () => {
      section.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      section.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
    };
  }, [staticMode, setProgress]);

  const room = ROOMS[roomIndex];
  // Arrows go all the way around the circle: past the last room they wrap
  // back to the first, and vice versa.
  const stepRoom = (delta: number) => {
    const next = (roomIndex + delta + ROOMS.length) % ROOMS.length;
    const [from, to] = ROOMS[next].zone;
    if ((roomIndex === ROOMS.length - 1 && next === 0) || (roomIndex === 0 && next === ROOMS.length - 1)) {
      triggerWhip();
    }
    setProgress((from + to) / 2);
  };

  useEffect(() => () => window.clearTimeout(whipTimerRef.current), []);

  if (staticMode) {
    // Reduced-motion: a plain doors grid instead of the panorama.
    return (
      <section dir={dir} className="relative py-16" style={{ background: '#08080C' }}>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-white text-center mb-8">
            {isRtl ? 'החדרים שלנו' : 'Our Rooms'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ROOMS.map(r => (
              <a key={r.slug} href={r.href} className="glass rounded-2xl p-5 block">
                <h3 className="font-bold text-white mb-1">{isRtl ? r.name : r.nameEn}</h3>
                <p className="text-sm" style={{ color: 'rgba(200,200,208,0.7)' }}>{isRtl ? r.desc : r.descEn}</p>
              </a>
            ))}
          </div>
          {/* The page ends here — surface the site links the footer used to hold. */}
          <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            {SITE_LINKS.map(l => (
              <Link key={l.href} href={l.href}>
                <span className="cursor-pointer underline underline-offset-4" style={{ color: 'rgba(200,200,208,0.7)' }}>
                  {isRtl ? l.label : l.labelEn}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
    <section ref={sectionRef} dir={dir}
      className="relative overflow-hidden select-none touch-pan-y"
      style={{
        height: '100svh',
        // Overlap the journey's final viewport and crossfade in over it —
        // one continuous lobby instead of a second copy sliding up.
        marginTop: '-100svh',
        zIndex: 5,
        opacity: fade,
        transition: 'opacity 200ms ease',
        pointerEvents: fade < 1 ? 'none' : 'auto',
        cursor: entering ? 'default' : 'grab',
      }}
      aria-label={isRtl ? 'הלובי האינטראקטיבי' : 'Interactive lobby'}>
      <img src="/seq/pan/poster.jpg" alt="" aria-hidden
        className="absolute inset-0 w-full h-full object-cover" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Top hint */}
      <div className="absolute top-0 inset-x-0 pt-[4svh] text-center pointer-events-none">
        <span className="inline-block px-4 py-2 rounded-full text-sm font-medium"
          style={{ background: 'rgba(8,8,12,0.6)', color: '#C8C8D0', backdropFilter: 'blur(8px)', border: '1px solid rgba(200,200,208,0.25)' }}>
          {isRtl ? 'גררו ימינה ושמאלה כדי להסתובב בלובי' : 'Drag left and right to look around the lobby'}
        </span>
      </div>

      {/* The concierge robot: an interactive 3D figure standing in the hall,
          projecting holographic bubbles with the center's story. */}
      {robotArmed && (
        <div ref={robotWrapRef} className="absolute inset-x-0 flex justify-center pointer-events-none"
          style={{ bottom: '17svh', willChange: 'transform' }}>
          {/* No stopPropagation here: drag gestures that start on the robot
              bubble up to the section and pan the lobby like anywhere else.
              The robot's own head-tracking uses mousemove, which still works. */}
          <div className="relative pointer-events-auto"
            style={{ width: 'min(560px, 94vw)', height: 'min(44svh, 430px)' }}>
            <RobotBoundary fallback={<RobotFallback />}>
              <SplineScene scene={ROBOT_SCENE} className="w-full h-full" />
            </RobotBoundary>

            {/* Holographic bubbles the robot projects */}
            <HoloBubble icon={Info} label={isRtl ? 'הכירו את המרכז' : 'About the center'}
              onOpen={() => setOpenPanel('info')} delay={0.2}
              className="top-0 left-1/2 -translate-x-1/2" />
            <HoloBubble icon={Handshake} label={isRtl ? 'השותפים והלקוחות שלנו' : 'Our partners & clients'}
              onOpen={() => setOpenPanel('partners')} delay={0.45}
              className="top-[26%] start-0" />
            <HoloBubble icon={Users} label={isRtl ? 'הצוות והחזון' : 'Our team & vision'}
              onOpen={() => setOpenPanel('team')} delay={0.7}
              className="top-[40%] end-0" />
          </div>
        </div>
      )}

      {/* Signage card + arrows */}
      <div className="absolute bottom-0 inset-x-0 pb-[6svh] flex flex-col items-center gap-4 pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <button onClick={() => stepRoom(isRtl ? 1 : -1)} aria-label={isRtl ? 'לחנות הבאה' : 'Previous room'}
            className="w-11 h-11 flex items-center justify-center rounded-full cursor-pointer transition-transform hover:scale-110"
            style={{ background: 'rgba(8,8,12,0.75)', border: '1px solid rgba(200,200,208,0.35)', color: '#C8C8D0' }}>
            <ChevronLeft className="w-5 h-5" />
          </button>

          <motion.div key={room.slug} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-center px-6 py-4 rounded-2xl min-w-[min(320px,72vw)]"
            style={{ background: 'rgba(8,8,12,0.78)', border: '1px solid rgba(200,200,208,0.4)', backdropFilter: 'blur(12px)', boxShadow: '0 16px 48px rgba(0,0,0,0.45)' }}>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-0.5">{isRtl ? room.name : room.nameEn}</h2>
            <p className="text-xs md:text-sm mb-3" style={{ color: 'rgba(200,200,208,0.8)' }}>{isRtl ? room.desc : room.descEn}</p>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
              onClick={() => enterRoom(room)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm cursor-pointer"
              style={{ background: '#FFFFFF', color: '#08080C' }}>
              <DoorOpen className="w-4 h-4" />
              {isRtl ? 'היכנסו' : 'Enter'}
            </motion.button>
          </motion.div>

          <button onClick={() => stepRoom(isRtl ? -1 : 1)} aria-label={isRtl ? 'לחנות הקודמת' : 'Next room'}
            className="w-11 h-11 flex items-center justify-center rounded-full cursor-pointer transition-transform hover:scale-110"
            style={{ background: 'rgba(8,8,12,0.75)', border: '1px solid rgba(200,200,208,0.35)', color: '#C8C8D0' }}>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Zone dots */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {ROOMS.map((r, i) => (
            <button key={r.slug} onClick={() => setProgress((r.zone[0] + r.zone[1]) / 2)}
              aria-label={isRtl ? r.name : r.nameEn}
              className="w-2.5 h-2.5 rounded-full cursor-pointer transition-all"
              style={{ background: i === roomIndex ? '#FFFFFF' : 'rgba(200,200,208,0.35)', transform: i === roomIndex ? 'scale(1.3)' : 'none' }} />
          ))}
        </div>
      </div>

    </section>

    {/* Sign shelves — rendered outside the section so opening them never
        starts a pan drag. */}
    <RoomPanel open={openPanel === 'info'} onClose={() => setOpenPanel(null)}
      title={isRtl ? 'ORTAM AI — המרכז לפיתוח AI' : 'ORTAM AI — The AI Development Center'}>
      <div className="space-y-7">
        {/* Numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
          {[
            { value: '30+',  label: t.stats.programs },
            { value: '98%',  label: t.stats.satisfaction },
            { value: '300+', label: t.stats.graduates },
            { value: '10+',  label: t.stats.partners },
          ].map(s => (
            <div key={s.label} className="rounded-2xl py-4 px-2"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(200,200,208,0.15)' }}>
              <div className="text-2xl font-bold text-white" dir="ltr">{s.value}</div>
              <div className="text-xs mt-1" style={{ color: 'rgba(200,200,208,0.7)' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Why us */}
        <div>
          <h3 className="font-bold text-white mb-3">{isRtl ? 'למה ORTAM AI' : 'Why ORTAM AI'}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { icon: Award,       title: isRtl ? 'מומחיות מוכחת'     : 'Proven Expertise',      desc: isRtl ? 'צוות מומחים עם ניסיון רב בתחום ה-AI'  : 'Expert team with extensive AI experience' },
              { icon: Star,        title: isRtl ? 'גישה מותאמת אישית' : 'Personalized Approach', desc: isRtl ? 'כל לקוח מקבל תוכנית מותאמת לצרכיו'   : 'Each client gets a tailored plan' },
              { icon: TrendingUp,  title: isRtl ? 'תוצאות מדידות'     : 'Measurable Results',    desc: isRtl ? 'אנו מתמקדים בתוצאות אמיתיות ומדידות'  : 'We focus on real, measurable outcomes' },
              { icon: CheckCircle, title: isRtl ? 'קהילה תומכת'       : 'Supportive Community',  desc: isRtl ? 'הצטרפו לקהילה של יזמים ומקצוענים'     : 'Join a community of entrepreneurs and professionals' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3 rounded-2xl p-3.5"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(200,200,208,0.15)' }}>
                <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#C8C8D0' }} />
                <div>
                  <p className="font-semibold text-white text-sm">{title}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(200,200,208,0.7)' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How we work */}
        <div>
          <h3 className="font-bold text-white mb-3">{isRtl ? 'איך זה עובד' : 'How it works'}</h3>
          <ol className="space-y-2">
            {[
              { title: isRtl ? 'פגישת היכרות'  : 'Introduction Meeting',        desc: isRtl ? 'נבין את הצרכים והמטרות שלכם'   : 'We understand your needs and goals' },
              { title: isRtl ? 'תוכנית מותאמת' : 'Custom Plan',                 desc: isRtl ? 'נבנה תוכנית עבודה מותאמת אישית' : 'We build a personalized work plan' },
              { title: isRtl ? 'ליווי ויישום'  : 'Guidance & Implementation',   desc: isRtl ? 'נלווה אתכם לאורך כל הדרך'       : 'We guide you every step of the way' },
              { title: isRtl ? 'תוצאות ומדידה' : 'Results & Measurement',       desc: isRtl ? 'נמדוד ונשפר את התוצאות'         : 'We measure and improve results' },
            ].map((s, i) => (
              <li key={s.title} className="flex items-center gap-3 text-sm">
                <span className="w-7 h-7 flex-shrink-0 flex items-center justify-center rounded-full font-bold text-xs"
                  style={{ background: 'rgba(200,200,208,0.12)', color: '#E8E8F0', border: '1px solid rgba(200,200,208,0.25)' }}>
                  {i + 1}
                </span>
                <span className="text-white font-medium">{s.title}</span>
                <span style={{ color: 'rgba(200,200,208,0.6)' }}>· {s.desc}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Site links (the old footer) */}
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 pt-1 text-sm">
          {SITE_LINKS.map(l => (
            <Link key={l.href} href={l.href}>
              <span className="cursor-pointer underline underline-offset-4 transition-colors hover:text-white"
                style={{ color: 'rgba(200,200,208,0.65)' }}>
                {isRtl ? l.label : l.labelEn}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </RoomPanel>

    {/* Partners shelf */}
    <RoomPanel open={openPanel === 'partners'} onClose={() => setOpenPanel(null)}
      title={isRtl ? 'השותפים והלקוחות שלנו' : 'Our Partners & Clients'}>
      <div className="space-y-5">
        <p style={{ color: 'rgba(200,200,208,0.85)' }}>
          {isRtl
            ? 'ארגונים מובילים במשק כבר צועדים איתנו אל עולם ה-AI.'
            : "Leading organizations are already walking into the AI world with us."}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {PARTNERS.map(partner => (
            <div key={partner.name} title={partner.name}
              className="rounded-xl p-3 flex items-center justify-center h-20"
              style={{
                background: partner.darkBg ? '#14141B' : '#FFFFFF',
                border: '1px solid rgba(200,200,208,0.2)',
              }}>
              <img src={partner.url} alt={partner.name} loading="lazy"
                className="max-h-12 max-w-full object-contain" />
            </div>
          ))}
        </div>
      </div>
    </RoomPanel>

    {/* Team & vision shelf */}
    <RoomPanel open={openPanel === 'team'} onClose={() => setOpenPanel(null)}
      title={isRtl ? 'הצוות והחזון' : 'Our Team & Vision'}>
      <div className="space-y-6">
        <div>
          <h3 className="font-bold text-white mb-2">{t.about.vision_title}</h3>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(200,200,208,0.85)' }}>
            {t.about.vision_text}
          </p>
        </div>

        <div>
          <h3 className="font-bold text-white mb-3">{t.about.team_title}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {TEAM.map(member => (
              <div key={member.name.en} className="text-center">
                <img src={member.img} alt={isRtl ? member.name.he : member.name.en} loading="lazy"
                  className={`w-full aspect-square object-cover rounded-2xl mb-2 ${member.imgPosition ?? ''}`}
                  style={{ border: '1px solid rgba(200,200,208,0.25)' }} />
                <p className="font-semibold text-white text-sm leading-tight">{isRtl ? member.name.he : member.name.en}</p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(200,200,208,0.65)' }}>{isRtl ? member.role.he : member.role.en}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {[
            { icon: Mail,          label: CONTACT.email,        href: `mailto:${CONTACT.email}` },
            { icon: Phone,         label: CONTACT.phoneDisplay, href: CONTACT.phoneHref },
            { icon: MessageCircle, label: 'WhatsApp',           href: CONTACT.whatsappHref },
          ].map(({ icon: Icon, label, href }) => (
            <a key={href} href={href} target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl py-2.5 px-3 text-sm transition-colors hover:bg-white/10"
              dir="ltr"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(200,200,208,0.2)', color: '#E8E8F0' }}>
              <Icon className="w-4 h-4 flex-shrink-0" style={{ color: '#C8C8D0' }} />
              {label}
            </a>
          ))}
        </div>

        <GradientButton href="/contact" size="md" className="w-full justify-center">
          {isRtl ? 'דברו איתנו' : 'Talk to us'}
        </GradientButton>

        <div className="text-center">
          <Link href="/about">
            <span className="cursor-pointer text-sm underline underline-offset-4 transition-colors hover:text-white"
              style={{ color: 'rgba(200,200,208,0.65)' }}>
              {isRtl ? 'לסיפור המלא — עמוד האודות' : 'The full story — our About page'}
            </span>
          </Link>
        </div>
      </div>
    </RoomPanel>
    </>
  );
}
