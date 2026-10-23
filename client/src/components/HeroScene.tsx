import { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { buildSlides, socAlert, socLine, SW, SH, type Lang, type Slide, type Target } from './hero/particleSlides';

// Home hero background: a classroom in daylight with a ceiling projector.
// The projector throws a live particle presentation onto the screen (mapped
// with a perspective transform), and its beam carries a little dust.

const IMG_W = 1376;
const IMG_H = 768;
// Projected area of the screen inside the photo, in image pixels: TL, TR, BR, BL.
const QUAD: [number, number][] = [[253, 162], [660, 162], [660, 403], [254, 403]];
// Projector lens in the photo.
const LENS: [number, number] = [344, 100];
// Part of the photo shown on narrow screens: projector, screen and the students' heads.
const CROP = { w: 735, h: 585 };
const ZOOM = 1.04;

export interface SlideCaption { id: string; caption: string; href: string }

interface Props {
  lang: Lang;
  src: string;
  srcSmall: string;
  captions: SlideCaption[];
  logoSrc: string;
  handshakeSrc: string;
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

const hex = (c: string) => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));

export default function HeroScene({ lang, src, srcSmall, captions, logoSrc, handshakeSrc }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const beamRef = useRef<HTMLCanvasElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(0);
  const [meta, setMeta] = useState<{ id: string; ink: string; accent: string; duration: number }[]>([]);
  const mirrored = lang === 'en';

  useEffect(() => {
    const root = rootRef.current, scene = sceneRef.current, img = imgRef.current;
    const slideEl = slideRef.current, canvas = canvasRef.current, beam = beamRef.current;
    if (!root || !scene || !img || !slideEl || !canvas || !beam) return;
    const ctx = canvas.getContext('2d');
    const bctx = beam.getContext('2d');
    if (!ctx || !bctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    let disposed = false, raf = 0, visible = true;
    let slides: Slide[] = [];

    let W = 0, H = 0, narrow = false, dpr = 1;
    let toSlide = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    let quad: Pt[] = [];
    let lens: Pt = [0, 0];
    const par = { x: 0, y: 0, tx: 0, ty: 0 };
    const off = { x: 0, y: 0 };
    const pointer = { x: -1e4, y: -1e4, inside: false };

    const N = window.innerWidth < 1024 ? 1500 : 2300;
    const px = new Float32Array(N), py = new Float32Array(N);
    const vx = new Float32Array(N), vy = new Float32Array(N);
    const tx = new Float32Array(N), ty = new Float32Array(N);
    const col = new Uint8Array(N), on = new Uint8Array(N);
    for (let i = 0; i < N; i++) { px[i] = Math.random() * SW; py[i] = Math.random() * SH; tx[i] = px[i]; ty[i] = py[i]; }

    // Dust in the projector beam: position along the beam and across it.
    const DUST = 70;
    const dust = Array.from({ length: DUST }, () => ({ t: Math.random(), u: Math.random(), s: 0.4 + Math.random() * 0.8, p: Math.random() * 6.28 }));

    let idx = 0, slideStart = 0, stageIdx = -1;
    let stageTargets: Target[] = [];
    let resolved = false;

    const layout = () => {
      const r = root.getBoundingClientRect();
      W = r.width; H = r.height;
      narrow = W < 1024;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      let scale: number, left: number, top: number;
      if (narrow) {
        scale = W / CROP.w;
        left = 0;
        top = 0;
      } else {
        scale = Math.max(W / IMG_W, H / IMG_H) * ZOOM;
        left = -14;
        top = Math.max(H - IMG_H * scale, -10);
      }
      const iw = IMG_W * scale, ih = IMG_H * scale;
      const fx = (x: number) => (mirrored ? W - x : x);
      const fade = narrow ? `linear-gradient(to bottom, #000 ${CROP.h * scale - 70}px, transparent ${CROP.h * scale}px)` : 'none';
      Object.assign(img.style, {
        width: `${iw}px`, height: `${ih}px`, top: `${top}px`,
        left: `${mirrored ? W - left - iw : left}px`,
        transform: mirrored ? 'scaleX(-1)' : 'none',
        maskImage: fade, WebkitMaskImage: fade,
      });
      let q = QUAD.map(([x, y]) => [fx(left + x * scale), top + y * scale] as Pt);
      if (mirrored) q = [q[1], q[0], q[3], q[2]];
      quad = q;
      lens = [fx(left + LENS[0] * scale), top + LENS[1] * scale];
      const m = homography([[0, 0], [SW, 0], [SW, SH], [0, SH]], q);
      toSlide = invert3(m);
      slideEl.style.transform = `matrix3d(${m[0]},${m[3]},0,${m[6]},${m[1]},${m[4]},0,${m[7]},0,0,1,0,${m[2]},${m[5]},0,${m[8]})`;
      const qw = Math.hypot(q[1][0] - q[0][0], q[1][1] - q[0][1]);
      const cw = Math.round(Math.min(1400, Math.max(560, qw * dpr * 1.2)));
      canvas.width = cw;
      canvas.height = Math.round((cw * SH) / SW);
      beam.width = Math.round(W * dpr); beam.height = Math.round(H * dpr);
      beam.style.width = `${W}px`; beam.style.height = `${H}px`;
      const bottom = narrow ? CROP.h * scale : Math.max(q[2][1], q[3][1]);
      root.parentElement?.style.setProperty('--hero-screen-bottom', `${Math.round(bottom)}px`);
    };

    const setStage = (targets: Target[], kick: boolean) => {
      stageTargets = targets;
      const n = targets.length, stride = n > N ? n / N : 1;
      for (let i = 0; i < N; i++) {
        if (i < Math.min(n, N)) {
          const t = targets[Math.floor(i * stride)];
          tx[i] = t.x; ty[i] = t.y; col[i] = t.c; on[i] = 1;
        } else {
          tx[i] = Math.random() * SW; ty[i] = Math.random() * SH; col[i] = 0; on[i] = 0;
        }
        if (kick) {
          const a = Math.random() * Math.PI * 2, s = 8 + Math.random() * 18;
          vx[i] += Math.cos(a) * s; vy[i] += Math.sin(a) * s;
        }
      }
    };

    const goTo = (n: number, now: number) => {
      idx = n % slides.length;
      slideStart = now;
      stageIdx = -1;
      resolved = false;
      setActive(idx);
    };

    const slidePointer = () => (pointer.inside ? apply3(toSlide, pointer.x - off.x, pointer.y - off.y) : null);

    const step = (now: number) => {
      const s = slides[idx];
      const ts = now - slideStart;
      if (ts > s.duration) { goTo(idx + 1, now); step(now); return; }
      let si = 0;
      s.stages.forEach((st, i) => { if (ts >= st.at) si = i; });
      const stage = s.stages[si];
      if (si !== stageIdx) { setStage(stage.targets, true); stageIdx = si; }
      const p = slidePointer();

      if (stage.mode === 'typing' && stage.typeFrom !== undefined) {
        const from = stage.typeFrom, n = Math.min(N, stageTargets.length);
        const shown = from + Math.floor(Math.min(1, ts / (stage.typeMs ?? 1500)) * (n - from));
        for (let i = from; i < n; i++) {
          const t = stageTargets[i];
          if (i < shown) { tx[i] = t.x; ty[i] = t.y; on[i] = 1; } else { tx[i] = lang === 'he' ? 1220 : 380; ty[i] = 362; on[i] = 0; }
        }
      } else if (stage.mode === 'soc') {
        // Keep room for the live chart line and the alert on top of the static dashboard.
        const base = Math.min(N - 190, stageTargets.length);
        const line = socLine(lang, ts, 150);
        const ax = lang === 'he' ? 680 : 920;
        if (!resolved && ((p && Math.hypot(p[0] - ax, p[1] - 412) < 120) || ts > 3200)) resolved = true;
        const alert = socAlert(lang, ts, resolved);
        const dyn = [...line, ...alert];
        for (let k = 0; k < dyn.length && base + k < N; k++) {
          const i = base + k;
          tx[i] = dyn[k].x; ty[i] = dyn[k].y; col[i] = dyn[k].c; on[i] = 1;
        }
        for (let i = base + dyn.length; i < N; i++) on[i] = 0;
      }

      const R = 160;
      for (let i = 0; i < N; i++) {
        let ax = (tx[i] - px[i]) * 0.024, ay = (ty[i] - py[i]) * 0.024;
        if (p) {
          const dx = px[i] - p[0], dy = py[i] - p[1];
          const d2 = dx * dx + dy * dy;
          if (d2 < R * R && d2 > 1) {
            const d = Math.sqrt(d2), f = (1 - d / R) * 7;
            ax += (dx / d) * f; ay += (dy / d) * f;
          }
        }
        vx[i] = (vx[i] + ax) * 0.83;
        vy[i] = (vy[i] + ay) * 0.83;
        px[i] += vx[i]; py[i] += vy[i];
      }
    };

    const drawSlide = (now: number) => {
      const s = slides[idx];
      const ts = now - slideStart;
      const k = canvas.width / SW;
      // Thicker dots when the screen is small so the drawings stay legible.
      const dot = narrow ? 10.5 : 8.5;
      ctx.setTransform(k, 0, 0, k, 0, 0);
      // Projector hotspot: a touch brighter in the middle, softer at the edges.
      const g = ctx.createRadialGradient(SW * 0.5, SH * 0.45, 80, SW * 0.5, SH * 0.5, SW * 0.7);
      g.addColorStop(0, '#FFFDF9');
      g.addColorStop(1, '#EFE9E0');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, SW, SH);

      ctx.globalAlpha = 0.16;
      ctx.fillStyle = s.colors[0];
      for (let i = 0; i < N; i++) if (!on[i]) ctx.fillRect(px[i], py[i], 4, 4);
      ctx.globalAlpha = 1;
      for (let c = 0; c < s.colors.length; c++) {
        ctx.fillStyle = s.colors[c];
        for (let i = 0; i < N; i++) {
          if (!on[i] || col[i] !== c) continue;
          const z = dot + Math.sin(ts * 0.004 + i * 0.37) * 1.4;
          ctx.fillRect(px[i] - z / 2, py[i] - z / 2, z, z);
        }
      }

      if (s.labels && ts > s.labels.at && ts < s.labels.until) {
        const a = Math.max(0, Math.min(1, (ts - s.labels.at) / 300, (s.labels.until - ts) / 250));
        ctx.globalAlpha = a;
        ctx.font = `700 46px Rubik, Heebo, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.direction = lang === 'he' ? 'rtl' : 'ltr';
        for (const l of s.labels.items) {
          const w = ctx.measureText(l.text).width + 56;
          ctx.fillStyle = s.accent;
          ctx.beginPath(); ctx.roundRect(l.x - w / 2, l.y - 36, w, 72, 36); ctx.fill();
          ctx.fillStyle = '#FFFFFF';
          ctx.fillText(l.text, l.x, l.y + 2);
        }
        ctx.textBaseline = 'alphabetic';
        ctx.globalAlpha = 1;
      }
    };

    const drawBeam = (now: number) => {
      bctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bctx.clearRect(0, 0, W, H);
      if (!quad.length) return;
      const s = slides[idx];
      const [ar, ag, ab] = hex(s.accent);
      const tint = (a: number) => `rgba(${Math.round(255 * 0.8 + ar * 0.2)},${Math.round(248 * 0.8 + ag * 0.2)},${Math.round(232 * 0.8 + ab * 0.2)},${a})`;
      const [cx, cy] = [(quad[0][0] + quad[2][0]) / 2, (quad[0][1] + quad[2][1]) / 2];
      bctx.globalCompositeOperation = 'screen';
      // The cone: lens to the four screen corners.
      const grad = bctx.createLinearGradient(lens[0], lens[1], cx, cy);
      grad.addColorStop(0, tint(0.34));
      grad.addColorStop(1, tint(0.06));
      bctx.fillStyle = grad;
      bctx.beginPath();
      bctx.moveTo(lens[0], lens[1]);
      const hull = [quad[1], quad[2], quad[3], quad[0]];
      // Order corners by angle around the lens so the polygon is convex.
      hull.sort((a, b) => Math.atan2(a[1] - lens[1], a[0] - lens[0]) - Math.atan2(b[1] - lens[1], b[0] - lens[0]));
      hull.forEach(([x, y]) => bctx.lineTo(x, y));
      bctx.closePath();
      bctx.fill();
      // Spill of the slide's light onto the wall.
      const rw = Math.hypot(quad[1][0] - quad[0][0], quad[1][1] - quad[0][1]);
      const spill = bctx.createRadialGradient(cx, cy, rw * 0.35, cx, cy, rw * 0.9);
      spill.addColorStop(0, tint(0.16));
      spill.addColorStop(1, tint(0));
      bctx.fillStyle = spill;
      bctx.fillRect(cx - rw, cy - rw, rw * 2, rw * 2);
      // Dust motes drifting through the beam.
      const t = now / 1000;
      for (const d of dust) {
        d.t += 0.0009 * d.s;
        if (d.t > 1) { d.t = 0.04; d.u = Math.random(); }
        const e = quad[0], f = quad[1], gq = quad[2], hq = quad[3];
        const left = [e[0] + (hq[0] - e[0]) * d.u, e[1] + (hq[1] - e[1]) * d.u];
        const right = [f[0] + (gq[0] - f[0]) * d.u, f[1] + (gq[1] - f[1]) * d.u];
        const v = 0.15 + 0.7 * ((Math.sin(d.p + t * 0.3) + 1) / 2);
        const sx = left[0] + (right[0] - left[0]) * v, sy = left[1] + (right[1] - left[1]) * v;
        const x = lens[0] + (sx - lens[0]) * d.t, y = lens[1] + (sy - lens[1]) * d.t;
        const a = 0.5 * Math.sin(Math.PI * d.t) * (0.5 + 0.5 * Math.sin(t * 2 + d.p));
        bctx.fillStyle = `rgba(255,250,236,${Math.max(0, a)})`;
        bctx.beginPath(); bctx.arc(x, y, 1.1 + d.s, 0, Math.PI * 2); bctx.fill();
      }
      bctx.globalCompositeOperation = 'source-over';
    };

    const frame = (now: number) => {
      par.x += (par.tx - par.x) * 0.07;
      par.y += (par.ty - par.y) * 0.07;
      const sy = narrow ? 0 : Math.min(window.scrollY, H) * 0.12;
      off.x = par.x; off.y = par.y + sy;
      scene.style.transform = `translate3d(${off.x}px, ${off.y}px, 0)`;
      step(now);
      drawSlide(now);
      drawBeam(now);
      if (visible && !document.hidden) raf = requestAnimationFrame(frame);
    };

    const resume = () => {
      cancelAnimationFrame(raf);
      if (!reduced && visible && !document.hidden && slides.length) raf = requestAnimationFrame(frame);
    };

    const onPointer = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top; pointer.inside = true;
      par.tx = -((pointer.x / r.width) - 0.5) * 12;
      par.ty = -((pointer.y / r.height) - 0.5) * 7;
    };
    const onLeave = () => { pointer.inside = false; par.tx = 0; par.ty = 0; };

    const load = (u: string) => { const im = new Image(); im.src = u; return im.decode().then(() => im).catch(() => null); };
    Promise.all([
      document.fonts?.load('800 100px Rubik').catch(() => null),
      document.fonts?.load('700 100px Rubik').catch(() => null),
      load(logoSrc),
      load(handshakeSrc),
    ]).then(([, , logo, handshake]) => {
      if (disposed) return;
      slides = buildSlides(lang, { logo, handshake });
      setMeta(slides.map(s => ({ id: s.id, ink: s.ink, accent: s.accent, duration: s.duration })));
      layout();
      const now = performance.now();
      if (reduced) {
        // A still frame: the courses slide, already formed.
        goTo(1, now - 7000);
        step(now);
        for (let i = 0; i < N; i++) { px[i] = tx[i]; py[i] = ty[i]; }
        drawSlide(now);
        drawBeam(now);
      } else {
        goTo(0, now);
        resume();
      }
    });

    const ro = new ResizeObserver(() => { layout(); if (reduced && slides.length) { drawSlide(performance.now()); drawBeam(performance.now()); } });
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
  }, [lang, logoSrc, handshakeSrc, mirrored]);

  const cur = meta[active];
  const cap = captions.find(c => c.id === cur?.id);

  return (
    <div ref={rootRef} className="absolute inset-0 -z-10 overflow-hidden">
      <div ref={sceneRef} className="absolute inset-0">
        <img
          ref={imgRef}
          src={src}
          srcSet={`${srcSmall} 900w, ${src} 1376w`}
          sizes="(max-width: 1023px) 190vw, 100vw"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="absolute max-w-none hero-scene-photo"
        />
        <canvas ref={beamRef} aria-hidden="true" className="absolute inset-0 pointer-events-none" />
        <div
          ref={slideRef}
          className="absolute left-0 top-0 hero-slide"
          style={{ width: SW, height: SH, transformOrigin: '0 0' }}
          dir={lang === 'he' ? 'rtl' : 'ltr'}
        >
          <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0" style={{ width: SW, height: SH }} />
          {cur && cur.id !== 'logo' && (
            <img src={logoSrc} alt="" aria-hidden="true" className="absolute" style={{ top: 48, insetInlineEnd: 60, height: 60 }} />
          )}
          {cap && cur && (
            <Link
              href={cap.href}
              className="absolute flex items-center gap-6 font-bold hero-slide-cta"
              style={{ bottom: 44, insetInlineStart: 60, insetInlineEnd: 60, color: cur.ink, fontSize: 44, fontFamily: 'Rubik, Heebo, sans-serif' }}
              aria-label={cap.caption}
            >
              <span key={cap.id} className="hero-slide-caption">{cap.caption}</span>
              <span aria-hidden="true" className="ms-auto flex gap-3">
                {meta.slice(1).map((s, i) => (
                  <span key={s.id} className="block rounded-full overflow-hidden" style={{ width: 64, height: 10, background: 'rgba(38,34,30,0.14)' }}>
                    {i + 1 === active && <span key={`p${active}`} className="block h-full hero-slide-progress" style={{ background: s.accent, animationDuration: `${s.duration}ms` }} />}
                    {i + 1 < active && <span className="block h-full w-full" style={{ background: 'rgba(38,34,30,0.45)' }} />}
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
