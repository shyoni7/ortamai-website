import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, DoorOpen } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRoomTransition } from '@/contexts/RoomTransitionContext';

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
  { slug: 'cyber',       frames: 37, href: '/academy',   zone: [0.56, 0.77], name: 'חדר הסייבר',     nameEn: 'The Cyber Room',        desc: 'הכשרות אבטחת סייבר בעולם ה-AI',               descEn: 'Cyber security training' },
  { slug: 'automations', frames: 37, href: '/courses',   zone: [0.77, 1],    name: 'חדר הסוכנים',    nameEn: 'The Agents Room',       desc: 'אוטומציות וסוכני AI שעובדים בשבילכם',          descEn: 'Automations and AI agents' },
];

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
  const { lang, dir } = useLanguage();
  const isRtl = lang === 'he';
  const { enterRoom, active: entering } = useRoomTransition();

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

  // Crossfade driver: fully visible once the section reaches the viewport top.
  useEffect(() => {
    if (staticMode) return;
    let raf = 0;
    const update = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      // Swap in only over the journey's very last frames (which match the
      // panorama's opening frame) — a long blend ghosts mismatched images.
      const aligned = 1 - rect.top / window.innerHeight; // 0..1 as hub reaches viewport top
      const next = Math.min(1, Math.max(0, (aligned - 0.85) / 0.15));
      if (Math.abs(next - fadeRef.current) > 0.01) {
        fadeRef.current = next;
        setFade(next);
      }
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [staticMode]);

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
    // frames physical depth while dragging.
    drawCover(canvas, img, 1.08, (progressRef.current - 0.5) * 0.35);
  }, [frameCount]);

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

  const setProgress = useCallback((p: number) => {
    progressRef.current = Math.min(1, Math.max(0, p));
    setRoomIndex(roomAt(progressRef.current));
    requestAnimationFrame(drawFrame);
  }, [drawFrame]);

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
      dragging = true;
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
      if (!dragging) return;
      dragging = false;
      // Let the rotation glide to a stop instead of freezing mid-gesture.
      momentumRaf = requestAnimationFrame(momentum);
    };

    const onWheel = (e: WheelEvent) => {
      // Only horizontal intent (trackpads / shift+wheel); vertical scroll passes through.
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        setProgress(progressRef.current + e.deltaX / 1500);
      }
    };

    const onKey = (e: KeyboardEvent) => {
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
  const stepRoom = (delta: number) => {
    const next = Math.min(ROOMS.length - 1, Math.max(0, roomIndex + delta));
    const [from, to] = ROOMS[next].zone;
    setProgress((from + to) / 2);
  };

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
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} dir={dir}
      className="relative overflow-hidden select-none touch-pan-y"
      style={{
        height: '100svh',
        // Overlap the journey's final viewport and crossfade in over it —
        // one continuous lobby instead of a second copy sliding up.
        marginTop: '-100svh',
        zIndex: 5,
        opacity: fade,
        pointerEvents: fade < 0.1 ? 'none' : 'auto',
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
  );
}
