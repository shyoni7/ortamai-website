import React, {
  createContext, useCallback, useContext, useEffect, useMemo, useRef, useState,
} from 'react';

/**
 * Scroll-driven image sequence ("scrollytelling"): a tall pinned section whose
 * scroll progress scrubs through pre-extracted video frames drawn on a canvas,
 * so the camera flight advances and rewinds with the user's wheel.
 *
 * - Frames live in /seq/<name>/d (desktop) and /seq/<name>/m (mobile).
 * - Progressive preload: every 8th frame first, then the rest; until a frame
 *   arrives, the nearest loaded one is drawn, so scrubbing never goes blank.
 * - prefers-reduced-motion / Save-Data: no pinning, the poster renders instead
 *   and overlay content flows as a normal static section.
 */

interface SequenceState {
  /** 0..1 scroll progress through the pinned section. */
  progress: number;
  staticMode: boolean;
}

const SequenceContext = createContext<SequenceState>({ progress: 0, staticMode: true });

interface ScrollSequenceProps {
  /** Folder under /seq/, e.g. "hero". */
  name: string;
  desktopFrames: number;
  mobileFrames: number;
  /** Pinned scroll length, in viewport heights. */
  heightVh?: number;
  children?: React.ReactNode;
}

function frameUrl(name: string, variant: 'd' | 'm', index: number): string {
  return `/seq/${name}/${variant}/${String(index + 1).padStart(4, '0')}.webp`;
}

export default function ScrollSequence({
  name, desktopFrames, mobileFrames, heightVh = 450, children,
}: ScrollSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const currentFrameRef = useRef(-1);
  const rafRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [staticMode, setStaticMode] = useState(false);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const variant: 'd' | 'm' = isMobile ? 'm' : 'd';
  const frameCount = isMobile ? mobileFrames : desktopFrames;

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = (navigator as any).connection?.saveData === true;
    if (reduced || saveData) setStaticMode(true);
  }, []);

  // Draw a frame cover-fit; fall back to the nearest loaded frame.
  const draw = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const images = imagesRef.current;
    const ready = (im: HTMLImageElement | null | undefined): im is HTMLImageElement =>
      Boolean(im && im.complete && im.naturalWidth > 0);

    let img: HTMLImageElement | null = ready(images[index]) ? images[index] : null;
    for (let offset = 1; offset < images.length && !img; offset++) {
      if (ready(images[index - offset])) img = images[index - offset];
      else if (ready(images[index + offset])) img = images[index + offset];
    }
    if (!img) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { width: cw, height: ch } = canvas;
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
  }, []);

  // Progressive preload.
  useEffect(() => {
    if (staticMode) return;
    const images: (HTMLImageElement | null)[] = new Array(frameCount).fill(null);
    imagesRef.current = images;
    let cancelled = false;

    const load = (index: number) => {
      if (cancelled || images[index]) return;
      const img = new Image();
      img.src = frameUrl(name, variant, index);
      img.onload = () => {
        if (cancelled) return;
        // Repaint if this is (or is near) the frame currently on screen.
        if (Math.abs(index - currentFrameRef.current) < 8) draw(currentFrameRef.current);
      };
      images[index] = img;
    };

    for (let i = 0; i < frameCount; i += 8) load(i);
    load(frameCount - 1);
    const fillTimer = window.setTimeout(() => {
      for (let i = 0; i < frameCount; i++) load(i);
    }, 400);

    return () => { cancelled = true; window.clearTimeout(fillTimer); };
  }, [name, variant, frameCount, staticMode, draw]);

  // Scroll → progress → frame, throttled to animation frames.
  useEffect(() => {
    if (staticMode) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      currentFrameRef.current = -1;
      update();
    };

    const update = () => {
      const rect = container.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const p = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;
      setProgress(p);
      const frame = Math.min(frameCount - 1, Math.round(p * (frameCount - 1)));
      if (frame !== currentFrameRef.current) {
        currentFrameRef.current = frame;
        draw(frame);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    resize();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resize);
    };
  }, [frameCount, staticMode, draw]);

  const state = useMemo<SequenceState>(() => ({ progress, staticMode }), [progress, staticMode]);

  if (staticMode) {
    // Reduced-motion / data-saver: poster background, content in normal flow.
    return (
      <SequenceContext.Provider value={{ progress: 1, staticMode: true }}>
        <section className="relative" style={{ background: '#08080C' }}>
          <img src={`/seq/${name}/poster.jpg`} alt="" aria-hidden
            className="absolute inset-0 w-full h-full object-cover opacity-40" />
          <div className="relative z-10">{children}</div>
        </section>
      </SequenceContext.Provider>
    );
  }

  return (
    <SequenceContext.Provider value={state}>
      <div ref={containerRef} className="relative" style={{ height: `${heightVh}vh`, background: '#08080C' }}>
        <div className="sticky top-0 overflow-hidden" style={{ height: '100svh' }}>
          <img src={`/seq/${name}/poster.jpg`} alt="" aria-hidden
            className="absolute inset-0 w-full h-full object-cover" />
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
          {children}
        </div>
      </div>
    </SequenceContext.Provider>
  );
}

/**
 * Overlay shown while sequence progress is inside [from, to].
 * Fades and drifts at the range edges; keeps mounted for SEO (hidden via CSS).
 */
export function SequenceOverlay({ from, to, className = '', children }: {
  from: number;
  to: number;
  className?: string;
  children: React.ReactNode;
}) {
  const { progress, staticMode } = useContext(SequenceContext);

  if (staticMode) {
    return <div className={className}>{children}</div>;
  }

  const fadeSpan = Math.min(0.06, (to - from) / 3);
  let opacity = 0;
  if (progress >= from && progress <= to) {
    // Ranges touching the sequence edges stay fully visible at that edge.
    const fadeIn = from <= 0 ? 1 : Math.min(1, (progress - from) / fadeSpan);
    const fadeOut = to >= 1 ? 1 : Math.min(1, (to - progress) / fadeSpan);
    opacity = Math.min(fadeIn, fadeOut);
  }
  const drift = (1 - opacity) * 24;

  return (
    <div
      className={`absolute inset-0 flex pointer-events-none ${className}`}
      style={{
        opacity,
        transform: `translateY(${drift}px)`,
        transition: 'opacity 120ms linear, transform 120ms linear',
        visibility: opacity === 0 ? 'hidden' : 'visible',
      }}
      aria-hidden={opacity === 0}
    >
      {/* Interactive children re-enable pointer events themselves */}
      {children}
    </div>
  );
}

/** Hook for custom overlay behaviors (e.g. scroll hint that hides after start). */
export function useSequenceProgress(): SequenceState {
  return useContext(SequenceContext);
}
