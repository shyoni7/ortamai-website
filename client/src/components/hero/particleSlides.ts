// Particle presentation projected onto the classroom screen in the home hero.
// Each slide is a short illustrated story drawn by one swarm of particles,
// ending on the service name. Slides are light, like projector light on a
// white screen: charcoal drawing plus one accent colour per slide.

export const SW = 1600; // slide logical width
export const SH = 950; // slide logical height

export type Lang = 'he' | 'en';

export interface Target { x: number; y: number; c: number }

export type Mode = 'shape' | 'typing' | 'soc';

export interface Stage {
  at: number; // ms from slide start
  mode: Mode;
  targets: Target[];
  /** typing: targets from this index on appear in order over typeMs */
  typeFrom?: number;
  typeMs?: number;
}

export interface Slide {
  id: string;
  bg: string;
  ink: string;
  accent: string;
  /** particle colours by index: 0 ink, 1 accent, 2 secondary */
  colors: string[];
  duration: number;
  stages: Stage[];
  labels?: { at: number; until: number; items: { x: number; y: number; text: string }[] };
}

const BG = '#FBF8F3';
const INK = '#26221E';

// ── sampling ──────────────────────────────────────────────────────

const scratch = typeof document !== 'undefined' ? document.createElement('canvas') : null;
const FONT = 'Rubik, Heebo, sans-serif';

// Draw with pure red/green/blue/black to tag colour indexes, then sample.
const TAG = { ink: '#000000', accent: '#ff0000', second: '#0000ff' };
const tagOf = (rgb: number[]) => (rgb[0] > 150 && rgb[1] < 90 ? 1 : rgb[2] > 150 && rgb[0] < 90 ? 2 : 0);

function sample(draw: (ctx: CanvasRenderingContext2D) => void, step: number): Target[] {
  if (!scratch) return [];
  const k = 0.5;
  scratch.width = SW * k;
  scratch.height = SH * k;
  const ctx = scratch.getContext('2d', { willReadFrequently: true })!;
  ctx.setTransform(k, 0, 0, k, 0, 0);
  ctx.clearRect(0, 0, SW, SH);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  draw(ctx);
  const { data, width, height } = ctx.getImageData(0, 0, scratch.width, scratch.height);
  const s = Math.max(1, Math.round(step * k));
  const out: Target[] = [];
  for (let y = 0; y < height; y += s) {
    for (let x = 0; x < width; x += s) {
      const i = (y * width + x) * 4;
      if (data[i + 3] > 140) out.push({ x: x / k, y: y / k, c: tagOf([data[i], data[i + 1], data[i + 2]]) });
    }
  }
  return out;
}

function text(ctx: CanvasRenderingContext2D, s: string, x: number, y: number, size: number, lang: Lang, color = TAG.ink, weight = 700, maxW = 1400) {
  let z = size;
  ctx.font = `${weight} ${z}px ${FONT}`;
  while (ctx.measureText(s).width > maxW && z > 18) { z -= 4; ctx.font = `${weight} ${z}px ${FONT}`; }
  ctx.direction = lang === 'he' ? 'rtl' : 'ltr';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = color;
  ctx.fillText(s, x, y);
}

function rrect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

function arrow(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) {
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  const a = Math.atan2(y2 - y1, x2 - x1), h = 30;
  ctx.beginPath();
  ctx.moveTo(x2 - Math.cos(a - 0.5) * h, y2 - Math.sin(a - 0.5) * h);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x2 - Math.cos(a + 0.5) * h, y2 - Math.sin(a + 0.5) * h);
  ctx.stroke();
}

export function shuffle<T>(arr: T[], seed = 1): T[] {
  let s = seed;
  const r = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Service name, large, with a sprinkle of accent.
function title(s: string, lang: Lang) {
  return shuffle(sample(ctx => text(ctx, s, SW / 2, SH * 0.45, 230, lang, TAG.ink, 800, SW * 0.86), 9), 3).map((t, i) => (i % 5 === 0 ? { ...t, c: 1 } : t));
}

// ── slides ────────────────────────────────────────────────────────

export interface Assets { logo: HTMLImageElement | null; handshake: HTMLImageElement | null }

export function buildSlides(lang: Lang, assets: Assets): Slide[] {
  const he = lang === 'he';
  // Mirror x for right-to-left layouts so stories read in the visitor's direction.
  const mx = (x: number) => (he ? SW - x : x);

  // 0 · logo
  const logo: Slide = {
    id: 'logo', bg: BG, ink: INK, accent: '#F07022',
    colors: [INK, '#F07022', '#F7B267'],
    duration: 4600,
    stages: [{
      at: 0, mode: 'shape',
      targets: shuffle(assets.logo
        ? sample(ctx => {
            const img = assets.logo!;
            const k = Math.min((SW * 0.74) / img.naturalWidth, (SH * 0.34) / img.naturalHeight);
            const w = img.naturalWidth * k, h = img.naturalHeight * k;
            ctx.drawImage(img, (SW - w) / 2, SH * 0.45 - h / 2, w, h);
            // Recolour: orange mark to the accent tag, everything else ink.
            const d = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
            for (let i = 0; i < d.data.length; i += 4) {
              const isOrange = d.data[i] > 170 && d.data[i + 1] < 170 && d.data[i + 2] < 120;
              d.data[i] = isOrange ? 255 : 0; d.data[i + 1] = 0; d.data[i + 2] = 0;
            }
            ctx.putImageData(d, 0, 0);
          }, 7)
        : sample(ctx => text(ctx, 'ORTAM AI', SW / 2, SH * 0.45, 240, 'en'), 8), 5),
    }],
  };

  // 1 · AI courses: a chat request becomes a product plan
  const prompt = he ? 'תתכנן לי מוצר חדש' : 'Plan a new product for me';
  const chatFrame = sample(ctx => {
    ctx.strokeStyle = TAG.ink; ctx.lineWidth = 9;
    rrect(ctx, 260, 150, 1080, 640, 36); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(260, 240); ctx.lineTo(1340, 240); ctx.stroke();
    ctx.fillStyle = TAG.ink;
    [0, 1, 2].forEach(i => { ctx.beginPath(); ctx.arc(mx(320 + i * 46), 195, 12, 0, Math.PI * 2); ctx.fill(); });
    // user bubble
    ctx.strokeStyle = TAG.accent; ctx.lineWidth = 8;
    rrect(ctx, he ? 560 : 320, 300, 720, 120, 60); ctx.stroke();
    // reply placeholder and input bar
    ctx.fillStyle = TAG.second;
    [0, 1, 2].forEach(i => { ctx.beginPath(); ctx.arc(mx(380 + i * 54), 500, 16, 0, Math.PI * 2); ctx.fill(); });
    ctx.strokeStyle = TAG.ink; ctx.lineWidth = 7;
    rrect(ctx, 320, 690, 960, 64, 32); ctx.stroke();
  }, 9);
  const promptText = sample(ctx => text(ctx, prompt, he ? 920 : 680, 362, 62, lang, TAG.ink, 700, 640), 6)
    .sort((a, b) => (he ? b.x - a.x : a.x - b.x));
  const steps = he ? ['רעיון', 'משתמשים', 'MVP', 'השקה'] : ['Idea', 'Users', 'MVP', 'Launch'];
  const plan = sample(ctx => {
    text(ctx, he ? 'תוכנית מוצר' : 'Product plan', SW / 2, 175, 64, lang, TAG.ink, 800);
    const bw = 280, bh = 150, gap = 70, total = bw * 4 + gap * 3, x0 = (SW - total) / 2, y = 330;
    steps.forEach((s, i) => {
      const x = he ? x0 + (3 - i) * (bw + gap) : x0 + i * (bw + gap);
      ctx.strokeStyle = i === 2 ? TAG.accent : TAG.ink; ctx.lineWidth = 9;
      rrect(ctx, x, y, bw, bh, 26); ctx.stroke();
      text(ctx, s, x + bw / 2, y + bh / 2, 62, lang, i === 2 ? TAG.accent : TAG.ink, 800, bw - 36);
      if (i < 3) {
        ctx.strokeStyle = TAG.accent; ctx.lineWidth = 8;
        if (he) arrow(ctx, x - 8, y + bh / 2, x - gap + 12, y + bh / 2);
        else arrow(ctx, x + bw + 8, y + bh / 2, x + bw + gap - 12, y + bh / 2);
      }
    });
    // timeline with milestones
    ctx.strokeStyle = TAG.ink; ctx.lineWidth = 8;
    ctx.beginPath(); ctx.moveTo(x0, 640); ctx.lineTo(x0 + total, 640); ctx.stroke();
    ctx.fillStyle = TAG.second;
    [0, 1, 2, 3].forEach(i => { ctx.beginPath(); ctx.arc(x0 + bw / 2 + i * (bw + gap), 640, 18, 0, Math.PI * 2); ctx.fill(); });
    ctx.fillStyle = TAG.ink;
    [0, 1, 2].forEach(i => { rrect(ctx, x0 + bw / 2 + i * (bw + gap) - 6, 690 + (i % 2) * 40, 230, 22, 11); ctx.fill(); });
  }, 9);
  const ai: Slide = {
    id: 'ai', bg: BG, ink: INK, accent: '#F07022',
    colors: [INK, '#F07022', '#F7B267'],
    duration: 9800,
    stages: [
      { at: 0, mode: 'typing', targets: [...chatFrame, ...promptText], typeFrom: chatFrame.length, typeMs: 1500 },
      { at: 3000, mode: 'shape', targets: shuffle(plan, 7) },
      { at: 6000, mode: 'shape', targets: title(he ? 'קורסי AI' : 'AI Courses', lang) },
    ],
  };

  // 2 · Cyber AI: a working SOC screen; one alert gets resolved
  const soc = sample(ctx => {
    ctx.strokeStyle = TAG.ink; ctx.lineWidth = 8;
    rrect(ctx, 200, 140, 1200, 680, 28); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(200, 220); ctx.lineTo(1400, 220); ctx.stroke();
    text(ctx, 'SOC', mx(290), 181, 48, 'en', TAG.ink, 800);
    ctx.fillStyle = TAG.accent;
    ctx.beginPath(); ctx.arc(mx(1340), 181, 14, 0, Math.PI * 2); ctx.fill();
    // chart panel (the line itself is animated separately)
    const cx = he ? 760 : 250;
    rrect(ctx, cx, 260, 590, 300, 20); ctx.stroke();
    // alerts list
    const ax = he ? 250 : 880;
    rrect(ctx, ax, 260, 470, 520, 20); ctx.stroke();
    for (let i = 0; i < 5; i++) {
      const y = 320 + i * 92;
      ctx.fillStyle = TAG.ink;
      if (i !== 1) { ctx.beginPath(); ctx.arc(he ? ax + 430 : ax + 40, y, 13, 0, Math.PI * 2); ctx.fill(); }
      rrect(ctx, he ? ax + 60 : ax + 80, y - 10, [300, 220, 260, 180, 240][i], 20, 10); ctx.fill();
    }
    // bars
    for (let i = 0; i < 9; i++) {
      const h = [80, 140, 100, 180, 120, 200, 90, 160, 130][i];
      ctx.fillStyle = i === 5 ? TAG.accent : TAG.ink;
      rrect(ctx, cx + 30 + i * 62, 780 - h, 34, h, 8); ctx.fill();
    }
  }, 9);
  const cyber: Slide = {
    id: 'cyber', bg: BG, ink: INK, accent: '#12A26B',
    colors: [INK, '#12A26B', '#E5533D'],
    duration: 9400,
    stages: [
      { at: 0, mode: 'soc', targets: shuffle(soc, 17) },
      { at: 5600, mode: 'shape', targets: title(he ? 'קורסי סייבר AI' : 'Cyber AI Courses', lang) },
    ],
  };

  // 3 · Placement: graduate and employer meet and shake hands
  const people = (apart: number) => assets.handshake
    ? sample(ctx => {
        const img = assets.handshake!;
        const k = (SH * 0.62) / img.naturalHeight;
        const w = img.naturalWidth * k, h = img.naturalHeight * k;
        const x = (SW - w) / 2, y = SH * 0.47 - h / 2;
        // left and right halves drawn apart, then joined
        ctx.drawImage(img, 0, 0, img.naturalWidth / 2, img.naturalHeight, x - apart, y, w / 2, h);
        ctx.drawImage(img, img.naturalWidth / 2, 0, img.naturalWidth / 2, img.naturalHeight, x + w / 2 + apart, y, w / 2, h);
        if (!apart) {
          // the joined hands glow in the accent colour
          ctx.globalCompositeOperation = 'source-atop';
          ctx.fillStyle = TAG.accent;
          ctx.beginPath(); ctx.arc(SW / 2, y + h * 0.37, h * 0.09, 0, Math.PI * 2); ctx.fill();
          ctx.globalCompositeOperation = 'source-over';
        }
      }, 7)
    : sample(ctx => text(ctx, he ? 'בוגר/ת + מעסיק/ה' : 'Graduate + Employer', SW / 2, SH / 2, 140, lang), 8);
  const placement: Slide = {
    id: 'placement', bg: BG, ink: INK, accent: '#E5487E',
    colors: [INK, '#E5487E', '#F7A8C2'],
    duration: 9000,
    stages: [
      { at: 0, mode: 'shape', targets: shuffle(people(230), 9) },
      { at: 1700, mode: 'shape', targets: shuffle(people(0), 9) },
      { at: 5200, mode: 'shape', targets: title(he ? 'השמה לבוגרים' : 'Graduate Placement', lang) },
    ],
    labels: {
      at: 2200, until: 5000,
      items: [
        { x: SW / 2 - 330, y: 120, text: he ? 'בוגר/ת' : 'Graduate' },
        { x: SW / 2 + 330, y: 120, text: he ? 'מעסיק/ה' : 'Employer' },
      ],
    },
  };

  // 4 · AI strategy: a small business plugs in AI and grows
  // Growth charts rise to the right in both languages, so this story is not mirrored.
  const shop = (x0: number, s: number, withAi: boolean) => sample(ctx => {
    ctx.save();
    ctx.translate(x0, 230); ctx.scale(s, s);
    ctx.strokeStyle = TAG.ink; ctx.lineWidth = 9 / s;
    // building, awning, door, window, sign
    ctx.strokeRect(0, 120, 480, 400);
    ctx.beginPath(); ctx.moveTo(-30, 120); ctx.lineTo(510, 120); ctx.lineTo(480, 40); ctx.lineTo(0, 40); ctx.closePath(); ctx.stroke();
    for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.arc(-30 + 45 + i * 90, 120, 45, 0, Math.PI); ctx.stroke(); }
    ctx.strokeRect(300, 280, 120, 240);
    ctx.strokeRect(50, 260, 200, 150);
    ctx.beginPath(); ctx.moveTo(150, 260); ctx.lineTo(150, 410); ctx.moveTo(50, 335); ctx.lineTo(250, 335); ctx.stroke();
    ctx.restore();
    if (withAi) {
      // a rising line out of the shop, nodes feeding it
      ctx.strokeStyle = TAG.accent; ctx.lineWidth = 10;
      const sx = (860), sy = 720;
      const pts: [number, number][] = [[sx, sy], [(980), 640], [(1080), 670], [(1200), 500], [(1300), 420], [(1430), 230]];
      ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke();
      arrow(ctx, pts[4][0], pts[4][1], pts[5][0], pts[5][1]);
      ctx.fillStyle = TAG.second;
      pts.slice(1, 5).forEach(([x, y]) => { ctx.beginPath(); ctx.arc(x, y, 16, 0, Math.PI * 2); ctx.fill(); });
      ctx.strokeStyle = TAG.ink; ctx.lineWidth = 7;
      ctx.beginPath(); ctx.moveTo((860), 780); ctx.lineTo((1480), 780); ctx.moveTo((860), 780); ctx.lineTo((860), 200); ctx.stroke();
      text(ctx, '+AI', 1060, 300, 96, 'en', TAG.accent, 800);
    }
  }, 8);
  const strategy: Slide = {
    id: 'strategy', bg: BG, ink: INK, accent: '#6A4BFF',
    colors: [INK, '#6A4BFF', '#B9A8FF'],
    duration: 9400,
    stages: [
      { at: 0, mode: 'shape', targets: shuffle(shop(SW / 2 - 240, 1, false), 13) },
      { at: 2100, mode: 'shape', targets: shuffle(shop(120, 0.92, true), 13) },
      { at: 5600, mode: 'shape', targets: title(he ? 'ייעוץ אסטרטגיית AI' : 'AI Strategy Consulting', lang) },
    ],
  };

  return [logo, ai, cyber, placement, strategy];
}

// SOC line chart: points along a moving signal inside the chart panel.
export function socLine(lang: Lang, ts: number, n: number): Target[] {
  const he = lang === 'he';
  const x0 = he ? 790 : 280, w = 530, base = 470;
  return Array.from({ length: n }, (_, i) => {
    const u = i / (n - 1);
    const x = x0 + u * w;
    const spike = Math.exp(-Math.pow((u - ((ts * 0.00012) % 1)) * 9, 2)) * 120;
    return { x, y: base - Math.sin(u * 14 + ts * 0.004) * 28 - spike, c: 1 };
  });
}

// SOC alert: the flagged row, red while open and accent once resolved.
export function socAlert(lang: Lang, ts: number, resolved: boolean): Target[] {
  const he = lang === 'he';
  const ax = he ? 250 : 880;
  const cx = he ? ax + 430 : ax + 40, cy = 412;
  if (!resolved) {
    const r = 16 + Math.sin(ts * 0.012) * 6;
    return Array.from({ length: 30 }, (_, i) => ({ x: cx + Math.cos(i * 0.21) * r * (i % 3 === 0 ? 0.4 : 1), y: cy + Math.sin(i * 0.21) * r * (i % 3 === 0 ? 0.4 : 1), c: 2 }));
  }
  // check mark
  const pts: Target[] = [];
  for (let i = 0; i <= 10; i++) pts.push({ x: cx - 18 + i * 1.6, y: cy + i * 1.8, c: 1 });
  for (let i = 0; i <= 18; i++) pts.push({ x: cx - 2 + i * 2.2, y: cy + 18 - i * 3, c: 1 });
  return pts;
}
