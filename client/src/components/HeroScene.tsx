import { useEffect, useRef } from 'react';

// Hero background: an AI-generated classroom photo with a live neural
// network drawn over the wall screen. Signals leave the screen and travel
// toward the learners; the pointer lights up nearby nodes; scroll and
// pointer move the photo and the network at different depths.

const IMG_W = 1376;
const IMG_H = 768;
// The glowing wall screen inside the photo, in image pixels.
const SCREEN = { x0: 0, y0: 90, x1: 430, y1: 460 };
// Headroom so pointer and scroll parallax never expose the photo's edges.
const ZOOM = 1.12;

type Node = { bx: number; by: number; x: number; y: number; phase: number; r: number; screen: boolean };
type Pulse = { from: number; to: number; t: number; hops: number; speed: number };

interface Props {
  src: string;
  srcSmall: string;
  /** Mirror the scene so the screen sits on the reading-start side (LTR). */
  mirrored: boolean;
}

export default function HeroScene({ src, srcSmall, mirrored }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const photo = photoRef.current;
    const canvas = canvasRef.current;
    if (!root || !photo || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;

    let W = 0, H = 0, dpr = 1;
    let nodes: Node[] = [];
    let edges: number[][] = [];
    let screenRect = { x0: 0, y0: 0, x1: 0, y1: 0 };
    const pulses: Pulse[] = [];
    const pointer = { x: -9999, y: -9999, tx: 0, ty: 0, nx: 0, ny: 0 };
    let start = performance.now();
    let lastSpawn = 0;
    let raf = 0;
    let visible = true;

    // Deterministic noise so the layout is stable across resizes.
    let seed = 7;
    const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;

    const layout = () => {
      const rect = root.getBoundingClientRect();
      W = rect.width; H = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;

      // object-fit: cover at left center, then the wrapper's scale about its centre.
      const cover = Math.max(W / IMG_W, H / IMG_H);
      const scale = cover * ZOOM;
      const ox = (W / 2) * (1 - ZOOM);
      const oy = (H - IMG_H * scale) / 2;
      screenRect = {
        x0: ox + SCREEN.x0 * scale,
        y0: oy + SCREEN.y0 * scale,
        x1: ox + SCREEN.x1 * scale,
        y1: oy + SCREEN.y1 * scale,
      };

      seed = 7;
      const count = Math.round(Math.min(90, Math.max(30, (W * H) / 15000)));
      nodes = [];
      for (let i = 0; i < count; i++) {
        const onScreen = i < count * 0.55;
        let x: number, y: number;
        if (onScreen) {
          x = screenRect.x0 + rand() * (screenRect.x1 - screenRect.x0);
          y = screenRect.y0 + rand() * (screenRect.y1 - screenRect.y0);
        } else {
          // Thin out with distance from the screen so the text side stays calm.
          x = screenRect.x1 + Math.pow(rand(), 1.6) * (W - screenRect.x1);
          y = H * 0.08 + rand() * H * 0.84;
        }
        nodes.push({ bx: x, by: y, x, y, phase: rand() * Math.PI * 2, r: onScreen ? 1.4 + rand() * 1.6 : 1 + rand() * 1.2, screen: onScreen });
      }
      const maxD = Math.max(90, Math.min(W, H) * 0.17);
      edges = nodes.map((a, i) => {
        const near: [number, number][] = [];
        nodes.forEach((b, j) => {
          if (i === j) return;
          const d = Math.hypot(a.bx - b.bx, a.by - b.by);
          if (d < maxD) near.push([j, d]);
        });
        return near.sort((p, q) => p[1] - q[1]).slice(0, 4).map(p => p[0]);
      });
    };

    const spawnPulse = () => {
      const candidates = nodes.map((n, i) => (n.screen ? i : -1)).filter(i => i >= 0);
      if (!candidates.length) return;
      const from = candidates[Math.floor(Math.random() * candidates.length)];
      const to = nextHop(from);
      if (to < 0) return;
      pulses.push({ from, to, t: 0, hops: 0, speed: 0.012 + Math.random() * 0.01 });
    };

    // Prefer neighbours further from the screen, so signals flow outward.
    const nextHop = (i: number) => {
      const opts = edges[i].filter(j => nodes[j].bx > nodes[i].bx - 10);
      const pool = opts.length ? opts : edges[i];
      return pool.length ? pool[Math.floor(Math.random() * pool.length)] : -1;
    };

    const draw = (now: number) => {
      const t = (now - start) / 1000;
      const intro = reduced ? 1 : Math.min(1, t / 1.6);
      const ease = 1 - Math.pow(1 - intro, 3);

      // Depth: pointer offset eases toward its target.
      pointer.nx += (pointer.tx - pointer.nx) * 0.06;
      pointer.ny += (pointer.ty - pointer.ny) * 0.06;
      const scrollY = Math.min(window.scrollY, H);
      photo.style.transform = `translate3d(${pointer.nx * -10}px, ${scrollY * 0.18 + pointer.ny * -6}px, 0) scale(${ZOOM})`;
      const cx = pointer.nx * -18;
      const cy = scrollY * 0.1 + pointer.ny * -10;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.translate(cx, cy);

      for (const n of nodes) {
        const drift = reduced ? 0 : 1;
        n.x = n.bx + Math.sin(t * 0.35 + n.phase) * 6 * drift;
        n.y = n.by + Math.cos(t * 0.3 + n.phase * 1.3) * 5 * drift;
      }

      // Screen glow breathes with the signal traffic.
      const glow = 0.18 + 0.06 * Math.sin(t * 1.1) + Math.min(0.12, pulses.length * 0.01);
      const sx = (screenRect.x0 + screenRect.x1) / 2, sy = (screenRect.y0 + screenRect.y1) / 2;
      const gr = ctx.createRadialGradient(sx, sy, 0, sx, sy, (screenRect.x1 - screenRect.x0) * 0.9);
      gr.addColorStop(0, `rgba(90,150,255,${glow * ease})`);
      gr.addColorStop(1, 'rgba(90,150,255,0)');
      ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = gr;
      ctx.fillRect(sx - W, sy - H, W * 2, H * 2);

      const px = pointer.x - cx, py = pointer.y - cy;
      const lit = (n: Node) => {
        const d = Math.hypot(n.x - px, n.y - py);
        return d < 170 ? 1 - d / 170 : 0;
      };

      // Edges draw in from the screen outward during the intro.
      ctx.lineWidth = 1;
      nodes.forEach((a, i) => {
        const reveal = Math.min(1, Math.max(0, (ease * W * 1.2 - (a.bx - screenRect.x0)) / 200));
        if (reveal <= 0) return;
        for (const j of edges[i]) {
          if (j < i) continue;
          const b = nodes[j];
          const l = Math.max(lit(a), lit(b));
          const base = a.screen && b.screen ? 0.32 : 0.16;
          ctx.strokeStyle = `rgba(140,180,255,${(base + l * 0.5) * reveal})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      });

      for (const n of nodes) {
        const reveal = Math.min(1, Math.max(0, (ease * W * 1.2 - (n.bx - screenRect.x0)) / 200));
        if (reveal <= 0) continue;
        const l = lit(n);
        ctx.fillStyle = l > 0.05 ? `rgba(255,170,110,${(0.6 + l * 0.4) * reveal})` : `rgba(170,205,255,${(n.screen ? 0.85 : 0.55) * reveal})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + l * 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Signals.
      if (!reduced && intro >= 1 && now - lastSpawn > 420 && pulses.length < 14) {
        spawnPulse();
        lastSpawn = now;
      }
      for (let k = pulses.length - 1; k >= 0; k--) {
        const p = pulses[k];
        p.t += p.speed * 2.2;
        if (p.t >= 1) {
          p.hops++;
          const nxt = nextHop(p.to);
          if (p.hops > 4 || nxt < 0) { pulses.splice(k, 1); continue; }
          p.from = p.to; p.to = nxt; p.t = 0;
        }
        const a = nodes[p.from], b = nodes[p.to];
        const x = a.x + (b.x - a.x) * p.t, y = a.y + (b.y - a.y) * p.t;
        const fade = 1 - p.hops / 5;
        const g = ctx.createRadialGradient(x, y, 0, x, y, 14);
        g.addColorStop(0, `rgba(255,150,70,${0.95 * fade})`);
        g.addColorStop(1, 'rgba(240,112,34,0)');
        ctx.fillStyle = g;
        ctx.fillRect(x - 14, y - 14, 28, 28);
      }
      ctx.globalCompositeOperation = 'source-over';

      if (!reduced && visible) raf = requestAnimationFrame(draw);
    };

    const onPointer = (e: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      const lx = mirrored ? rect.right - e.clientX : e.clientX - rect.left;
      pointer.x = lx;
      pointer.y = e.clientY - rect.top;
      pointer.tx = (lx / rect.width - 0.5) * 2;
      pointer.ty = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    const onLeave = () => { pointer.x = -9999; pointer.y = -9999; pointer.tx = 0; pointer.ty = 0; };
    const resume = () => {
      cancelAnimationFrame(raf);
      if (!reduced && visible && !document.hidden) raf = requestAnimationFrame(draw);
    };

    layout();
    draw(performance.now());
    if (reduced) start = performance.now() - 2000;

    const ro = new ResizeObserver(() => { layout(); if (reduced) draw(performance.now()); });
    ro.observe(root);
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; resume(); });
    io.observe(root);
    const onVis = () => resume();
    document.addEventListener('visibilitychange', onVis);
    const host = root.parentElement ?? root;
    if (finePointer && !reduced) {
      host.addEventListener('pointermove', onPointer);
      host.addEventListener('pointerleave', onLeave);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      host.removeEventListener('pointermove', onPointer);
      host.removeEventListener('pointerleave', onLeave);
    };
  }, [mirrored]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="absolute inset-0 -z-10 overflow-hidden"
      style={{ transform: mirrored ? 'scaleX(-1)' : undefined }}
    >
      <div ref={photoRef} className="absolute inset-0 hero-scene-photo" style={{ transform: `scale(${ZOOM})` }}>
        <img
          src={src}
          srcSet={`${srcSmall} 800w, ${src} 1376w`}
          sizes="100vw"
          alt=""
          fetchPriority="high"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'left center' }}
        />
      </div>
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
