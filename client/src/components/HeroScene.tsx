import { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { buildSlides, SW, SH, type Lang, type Slide, type Target } from './hero/particleSlides';

// Home hero background: a real-looking classroom in daylight. The wall
// screen in the photo plays a live particle presentation, mapped onto the
// screen with a perspective transform so it reads as part of the room.

const IMG_W = 1376;
const IMG_H = 768;
// Screen corners inside the photo, in image pixels: TL, TR, BR, BL.
const QUAD: [number, number][] = [[131, 56], [629, 84], [629, 379], [132, 389]];
const ZOOM = 1.04;

export interface SlideCaption { id: string; caption: string; href: string }

interface Props {
  lang: Lang;
  src: string;
  srcSmall: string;
  captions: SlideCaption[];
  logoSrc: string;
}

type Pt = [number, number];

// 3x3 homography mapping the 4 src points onto the 4 dst points.
function homography(src: Pt[], dst: Pt[]) {
  const A: number[][] = [];
  const b: number[] = [];
  for (let i = 0; i < 4; i++) {
    const [x, y] = src[i];
    const [u, v] = dst[i];
    A.push([x, y, 1, 0, 0, 0, -u * x, -u * y]); b.push(u);
    A.push([0, 0, 0, x, y, 1, -v * x, -v * y]); b.push(v);
  }
  // Gaussian elimination.
  for (let c = 0; c < 8; c++) {
    let p = c;
    for (let r = c + 1; r < 8; r++) if (Math.abs(A[r][c]) > Math.abs(A[p][c])) p = r;
    [A[c], A[p]] = [A[p], A[c]]; [b[c], b[p]] = [b[p], b[c]];
    for (let r = 0; r < 8; r++) {
      if (r === c) continue;
      const f = A[r][c] / A[c][c];
      for (let k = c; k < 8; k++) A[r][k] -= f * A[c][k];
      b[r] -= f * b[c];
    }
  }
  const h = b.map((v, i) => v / A[i][i]);
  return [h[0], h[1], h[2], h[3], h[4], h[5], h[6], h[7], 1];
}

function invert3(m: number[]) {
  const [a, b, c, d, e, f, g, h, i] = m;
  const A = e * i - f * h, B = -(d * i - f * g), C = d * h - e * g;
  const det = a * A + b * B + c * C;
  return [A, -(b * i - c * h), b * f - c * e, B, a * i - c * g, -(a * f - c * d), C, -(a * h - b * g), a * e - b * d].map(v => v / det);
}

function apply3(m: number[], x: number, y: number): Pt {
  const w = m[6] * x + m[7] * y + m[8];
  return [(m[0] * x + m[1] * y + m[2]) / w, (m[3] * x + m[4] * y + m[5]) / w];
}

function mix(a: string, b: string, t: number) {
  const pa = [1, 3, 5].map(i => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map(i => parseInt(b.slice(i, i + 2), 16));
  return `rgb(${pa.map((v, i) => Math.round(v + (pb[i] - v) * t)).join(',')})`;
}

export default function HeroScene({ lang, src, srcSmall, captions, logoSrc }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(0);
  const [inks, setInks] = useState<{ ink: string; id: string; duration: number }[]>([]);
  const mirrored = lang === 'en';

  useEffect(() => {
    const root = rootRef.current, scene = sceneRef.current, img = imgRef.current;
    const slideEl = slideRef.current, canvas = canvasRef.current;
    if (!root || !scene || !img || !slideEl || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    let disposed = false;
    let raf = 0;
    let visible = true;
    let slides: Slide[] = [];

    // geometry
    let W = 0, H = 0, mobile = false;
    let toScreen = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    let toSlide = toScreen;
    const par = { x: 0, y: 0, tx: 0, ty: 0 };
    const pointer = { x: -1e4, y: -1e4, inside: false };
    const off = { x: 0, y: 0 }; // current scene translation

    // particles
    const N = window.innerWidth < 768 ? 1400 : 2200;
    const px = new Float32Array(N), py = new Float32Array(N);
    const vx = new Float32Array(N), vy = new Float32Array(N);
    const tx = new Float32Array(N), ty = new Float32Array(N);
    const col = new Uint8Array(N), on = new Uint8Array(N);
    for (let i = 0; i < N; i++) { px[i] = Math.random() * SW; py[i] = Math.random() * SH; tx[i] = px[i]; ty[i] = py[i]; }

    let idx = 0, slideStart = 0, stageIdx = -1;
    let stageTargets: Target[] = [];
    let caught: null | { x: number; y: number; t: number } = null;

    const layout = () => {
      const r = root.getBoundingClientRect();
      W = r.width; H = r.height;
      mobile = W < 1024;
      let scale: number, left: number, top: number;
      if (mobile) {
        scale = (W * 0.94) / (QUAD[1][0] - QUAD[0][0]);
        left = W / 2 - ((QUAD[0][0] + QUAD[1][0]) / 2) * scale;
        top = 20 - QUAD[0][1] * scale;
      } else {
        scale = Math.max(W / IMG_W, H / IMG_H) * ZOOM;
        left = -14;
        // Keep the whole screen below the fixed nav while the photo still covers the hero.
        top = Math.min(0, Math.max(H - IMG_H * scale, 36 - QUAD[0][1] * scale));
      }
      const iw = IMG_W * scale, ih = IMG_H * scale;
      const x0 = mirrored ? W - left - iw : left;
      Object.assign(img.style, {
        width: `${iw}px`, height: `${ih}px`, left: `${x0}px`, top: `${top}px`,
        transform: mirrored ? 'scaleX(-1)' : 'none',
        maskImage: mobile ? 'linear-gradient(to bottom, #000 72%, transparent 100%)' : 'none',
        WebkitMaskImage: mobile ? 'linear-gradient(to bottom, #000 72%, transparent 100%)' : 'none',
      });
      let q = QUAD.map(([x, y]) => [left + x * scale, top + y * scale] as Pt);
      if (mirrored) q = [q[1], q[0], q[3], q[2]].map(([x, y]) => [W - x, y] as Pt);
      toScreen = homography([[0, 0], [SW, 0], [SW, SH], [0, SH]], q);
      toSlide = invert3(toScreen);
      const m = toScreen;
      slideEl.style.transform = `matrix3d(${m[0]},${m[3]},0,${m[6]},${m[1]},${m[4]},0,${m[7]},0,0,1,0,${m[2]},${m[5]},0,${m[8]})`;
      const qw = Math.hypot(q[1][0] - q[0][0], q[1][1] - q[0][1]);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cw = Math.round(Math.min(1400, Math.max(480, qw * dpr * 1.15)));
      canvas.width = cw;
      canvas.height = Math.round((cw * SH) / SW);
      const bottom = Math.max(q[2][1], q[3][1]);
      root.parentElement?.style.setProperty('--hero-screen-bottom', `${Math.round(bottom)}px`);
    };

    const setStage = (targets: Target[], kick: boolean) => {
      stageTargets = targets;
      const n = targets.length;
      const stride = n > N ? n / N : 1;
      for (let i = 0; i < N; i++) {
        if (i < Math.min(n, N)) {
          const t = targets[Math.floor(i * stride)];
          tx[i] = t.x; ty[i] = t.y; col[i] = t.c; on[i] = 1;
        } else {
          tx[i] = Math.random() * SW; ty[i] = Math.random() * SH; col[i] = 0; on[i] = 0;
        }
        if (kick) {
          const a = Math.random() * Math.PI * 2, s = 10 + Math.random() * 22;
          vx[i] += Math.cos(a) * s; vy[i] += Math.sin(a) * s;
        }
      }
    };

    const goTo = (n: number, now: number) => {
      idx = n % slides.length;
      slideStart = now;
      stageIdx = -1;
      caught = null;
      setActive(idx);
    };

    const step = (now: number) => {
      const s = slides[idx];
      const ts = now - slideStart;
      if (ts > s.duration) { goTo(idx + 1, now); return step(now); }
      let si = 0;
      s.stages.forEach((st, i) => { if (ts >= st.at) si = i; });
      const stage = s.stages[si];
      if (si !== stageIdx) {
        setStage(stage.targets, stageIdx === -1 || si > 0);
        stageIdx = si;
      }

      const he = lang === 'he';
      if (stage.mode === 'typing') {
        const shown = Math.floor(Math.min(1, ts / 1600) * Math.min(N, stageTargets.length));
        // Letters appear in reading order; the rest wait at the caret's start.
        for (let i = 0; i < Math.min(N, stageTargets.length); i++) {
          const t = stageTargets[i];
          if (i < shown) { tx[i] = t.x; ty[i] = t.y; on[i] = 1; } else { tx[i] = he ? SW * 0.95 : SW * 0.05; ty[i] = SH * 0.44; on[i] = 0; }
        }
      } else if (stage.mode === 'wave') {
        const M = Math.min(N, 1500), rows = 13, cols = Math.ceil(M / rows);
        const calm = caught ? Math.max(0.25, 1 - (ts - caught.t) / 900) : 1;
        for (let i = 0; i < M; i++) {
          const r = i % rows, c = Math.floor(i / rows);
          const span = SW * 1.1;
          let x = ((c / cols) * span + ts * 0.11 * (he ? -1 : 1)) % span;
          if (x < 0) x += span;
          x -= SW * 0.05;
          tx[i] = x;
          ty[i] = 150 + r * 56 + Math.sin(x * 0.006 + ts * 0.0016 + r * 0.55) * 30 * calm;
          col[i] = 0; on[i] = 1;
        }
        // The anomaly: a knot moving against the flow until it is caught.
        let ax: number, ay: number;
        if (caught) { ax = caught.x; ay = caught.y; } else {
          ax = SW / 2 + Math.sin(ts * 0.0012) * 430 * (he ? 1 : -1);
          ay = SH * 0.5 + Math.sin(ts * 0.0021 + 1) * 210;
          const pp = apply3(toSlide, pointer.x - off.x, pointer.y - off.y);
          const near = pointer.inside && Math.hypot(pp[0] - ax, pp[1] - ay) < 150;
          if (near || ts > 3300) caught = { x: ax, y: ay, t: ts };
        }
        for (let k = 0; k < 46; k++) {
          const i = M + k;
          if (i >= N) break;
          const a = k * 0.62 + ts * 0.004;
          const rr = caught ? 18 + (k % 4) * 6 : 14 + Math.sin(ts * 0.01 + k) * 10;
          tx[i] = ax + Math.cos(a) * rr; ty[i] = ay + Math.sin(a) * rr; col[i] = 1; on[i] = 1;
        }
        for (let i = M + 46; i < N; i++) on[i] = 0;
      } else if (stage.mode === 'noise') {
        for (let i = 0; i < Math.min(N, stageTargets.length); i++) {
          const t = stageTargets[i];
          tx[i] = t.x + Math.sin(ts * 0.0023 + i * 1.7) * 46;
          ty[i] = t.y + Math.cos(ts * 0.0019 + i * 2.3) * 46;
        }
      }

      // physics
      const p = pointer.inside ? apply3(toSlide, pointer.x - off.x, pointer.y - off.y) : null;
      const R = 170;
      for (let i = 0; i < N; i++) {
        let ax = (tx[i] - px[i]) * 0.022, ay = (ty[i] - py[i]) * 0.022;
        if (p) {
          const dx = px[i] - p[0], dy = py[i] - p[1];
          const d2 = dx * dx + dy * dy;
          if (d2 < R * R && d2 > 1) {
            const d = Math.sqrt(d2), f = (1 - d / R) * 7;
            ax += (dx / d) * f; ay += (dy / d) * f;
          }
        }
        vx[i] = (vx[i] + ax) * 0.84;
        vy[i] = (vy[i] + ay) * 0.84;
        px[i] += vx[i]; py[i] += vy[i];
      }
    };

    const draw = (now: number) => {
      const s = slides[idx];
      const ts = now - slideStart;
      const prev = slides[(idx + slides.length - 1) % slides.length];
      const k = canvas.width / SW;
      ctx.setTransform(k, 0, 0, k, 0, 0);
      ctx.fillStyle = ts < 520 ? mix(prev.bg, s.bg, 1 - Math.pow(1 - ts / 520, 3)) : s.bg;
      ctx.fillRect(0, 0, SW, SH);

      // Inactive particles: faint dust.
      ctx.globalAlpha = 0.22;
      ctx.fillStyle = s.colors[0];
      for (let i = 0; i < N; i++) if (!on[i]) ctx.fillRect(px[i], py[i], 4, 4);
      ctx.globalAlpha = 1;
      // Formed particles shimmer slightly so the slide never sits still.
      for (let c = 0; c < s.colors.length; c++) {
        ctx.fillStyle = s.colors[c];
        for (let i = 0; i < N; i++) {
          if (!on[i] || col[i] !== c) continue;
          const z = 7 + Math.sin(ts * 0.004 + i * 0.37) * 1.6;
          ctx.fillRect(px[i] - z / 2, py[i] - z / 2, z, z);
        }
      }

      if (s.labels && ts > s.labels.at && ts < s.labels.until) {
        const a = Math.min(1, (ts - s.labels.at) / 300, (s.labels.until - ts) / 250);
        ctx.globalAlpha = Math.max(0, a);
        ctx.font = '700 50px Rubik, Heebo, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.direction = lang === 'he' ? 'rtl' : 'ltr';
        for (const l of s.labels.items) {
          const w = ctx.measureText(l.text).width + 56;
          ctx.fillStyle = s.colors[1];
          ctx.beginPath();
          ctx.roundRect(l.x - w / 2, l.y - 38, w, 76, 38);
          ctx.fill();
          ctx.fillStyle = s.colors[0];
          ctx.fillText(l.text, l.x, l.y + 2);
        }
        ctx.textBaseline = 'alphabetic';
        ctx.globalAlpha = 1;
      }

      if (s.id === 'cyber' && caught && ts < s.stages[1].at) {
        const a = Math.min(1, (ts - caught.t) / 250);
        ctx.strokeStyle = s.colors[1];
        ctx.lineWidth = 6;
        ctx.globalAlpha = a;
        ctx.beginPath();
        ctx.arc(caught.x, caught.y, 70 + (1 - a) * 60, 0, Math.PI * 2);
        ctx.stroke();
        ctx.font = '700 44px Rubik, Heebo, sans-serif';
        ctx.fillStyle = s.colors[1];
        ctx.textAlign = 'center';
        ctx.direction = lang === 'he' ? 'rtl' : 'ltr';
        ctx.fillText(lang === 'he' ? 'חריגה זוהתה' : 'Anomaly found', caught.x, caught.y - 105);
        ctx.globalAlpha = 1;
      }
    };

    const frame = (now: number) => {
      par.x += (par.tx - par.x) * 0.07;
      par.y += (par.ty - par.y) * 0.07;
      const sy = mobile ? 0 : Math.min(window.scrollY, H) * 0.12;
      off.x = par.x; off.y = par.y + sy;
      scene.style.transform = `translate3d(${off.x}px, ${off.y}px, 0)`;
      step(now);
      draw(now);
      if (visible && !document.hidden) raf = requestAnimationFrame(frame);
    };

    const resume = () => {
      cancelAnimationFrame(raf);
      if (!reduced && visible && !document.hidden && slides.length) raf = requestAnimationFrame(frame);
    };

    const onPointer = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top; pointer.inside = true;
      par.tx = -((pointer.x / r.width) - 0.5) * 14;
      par.ty = -((pointer.y / r.height) - 0.5) * 8;
    };
    const onLeave = () => { pointer.inside = false; par.tx = 0; par.ty = 0; };

    const logo = new Image();
    logo.src = logoSrc;
    Promise.all([
      document.fonts?.load('800 100px Rubik').catch(() => null),
      document.fonts?.load('700 100px Rubik').catch(() => null),
      logo.decode().catch(() => null),
    ]).then(() => {
      if (disposed) return;
      slides = buildSlides(lang, logo.complete && logo.naturalWidth ? logo : null);
      setInks(slides.map(s => ({ ink: s.ink, id: s.id, duration: s.duration })));
      layout();
      const now = performance.now();
      if (reduced) {
        // A still frame: the first course slide, already formed.
        idx = 1; slideStart = now - 6000; stageIdx = -1; setActive(1);
        step(now);
        for (let i = 0; i < N; i++) { px[i] = tx[i]; py[i] = ty[i]; }
        draw(now);
      } else {
        goTo(0, now);
        resume();
      }
    });

    const ro = new ResizeObserver(() => { layout(); if (reduced && slides.length) draw(performance.now()); });
    ro.observe(root);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; resume(); });
    io.observe(root);
    document.addEventListener('visibilitychange', resume);
    const host = root.parentElement ?? root;
    if (finePointer && !reduced) {
      host.addEventListener('pointermove', onPointer);
      host.addEventListener('pointerleave', onLeave);
    }
    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect();
      document.removeEventListener('visibilitychange', resume);
      host.removeEventListener('pointermove', onPointer);
      host.removeEventListener('pointerleave', onLeave);
    };
  }, [lang, logoSrc, mirrored]);

  const slideId = inks[active]?.id;
  const ink = inks[active]?.ink ?? '#2A2622';
  const cap = captions.find(c => c.id === slideId);
  const lightInk = parseInt(ink.slice(1, 3), 16) > 128;

  return (
    <div ref={rootRef} className="absolute inset-0 -z-10 overflow-hidden">
      <div ref={sceneRef} className="absolute inset-0">
        <img
          ref={imgRef}
          src={src}
          srcSet={`${srcSmall} 900w, ${src} 1376w`}
          sizes="(max-width: 767px) 260vw, 100vw"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="absolute max-w-none hero-scene-photo"
        />
        <div
          ref={slideRef}
          className="absolute left-0 top-0 hero-slide"
          style={{ width: SW, height: SH, transformOrigin: '0 0' }}
          dir={lang === 'he' ? 'rtl' : 'ltr'}
        >
          <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0" style={{ width: SW, height: SH }} />
          {slideId && slideId !== 'logo' && (
            <img
              src={logoSrc}
              alt=""
              aria-hidden="true"
              className="absolute"
              style={{ top: 56, insetInlineStart: 64, height: 64, filter: lightInk ? 'brightness(0) invert(1)' : 'brightness(0)', opacity: 0.9 }}
            />
          )}
          {cap && (
            <Link
              href={cap.href}
              className="absolute flex items-center gap-6 font-bold hero-slide-cta"
              style={{ bottom: 56, insetInlineStart: 64, insetInlineEnd: 64, color: ink, fontSize: 46, fontFamily: 'Rubik, Heebo, sans-serif' }}
              aria-label={cap.caption}
            >
              <span key={cap.id} className="hero-slide-caption">{cap.caption}</span>
              <span aria-hidden="true" className="ms-auto flex gap-3">
                {inks.slice(1).map((s, i) => (
                  <span key={s.id} className="block rounded-full overflow-hidden" style={{ width: 70, height: 10, background: lightInk ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.18)' }}>
                    {i + 1 === active && <span key={`p${active}`} className="block h-full hero-slide-progress" style={{ background: ink, animationDuration: `${s.duration}ms` }} />}
                    {i + 1 < active && <span className="block h-full w-full" style={{ background: ink }} />}
                  </span>
                ))}
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
