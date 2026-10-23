// Particle presentation shown on the classroom screen in the home hero.
// Every slide is a small story told by one swarm of particles: a "before"
// shape that reorganizes into an "after", then the slide's verb.

export const SW = 1600; // slide logical width
export const SH = 1000; // slide logical height

export type Lang = 'he' | 'en';

export interface Target { x: number; y: number; c: number }

export type Mode = 'shape' | 'typing' | 'wave' | 'noise';

export interface Stage {
  at: number; // ms from slide start
  mode: Mode;
  targets: Target[];
}

export interface Slide {
  id: string;
  bg: string;
  /** caption and chrome colour on this background */
  ink: string;
  colors: string[];
  duration: number;
  stages: Stage[];
  labels?: { at: number; until: number; items: { x: number; y: number; text: string }[] };
}

// ── sampling helpers ──────────────────────────────────────────────

const scratch = typeof document !== 'undefined' ? document.createElement('canvas') : null;

function sampleCanvas(draw: (ctx: CanvasRenderingContext2D) => void, step: number, c: number | ((x: number, y: number, rgba: number[]) => number)): Target[] {
  if (!scratch) return [];
  const scale = 0.5;
  scratch.width = SW * scale;
  scratch.height = SH * scale;
  const ctx = scratch.getContext('2d', { willReadFrequently: true })!;
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  ctx.clearRect(0, 0, SW, SH);
  draw(ctx);
  const { data, width } = ctx.getImageData(0, 0, scratch.width, scratch.height);
  const out: Target[] = [];
  const s = Math.max(1, Math.round(step * scale));
  for (let y = 0; y < scratch.height; y += s) {
    for (let x = 0; x < width; x += s) {
      const i = (y * width + x) * 4;
      if (data[i + 3] > 128) {
        const lx = x / scale, ly = y / scale;
        out.push({ x: lx, y: ly, c: typeof c === 'function' ? c(lx, ly, [data[i], data[i + 1], data[i + 2]]) : c });
      }
    }
  }
  return out;
}

export function textTargets(text: string, opts: { lang: Lang; size: number; cx: number; cy: number; weight?: number; step?: number; c?: number; maxW?: number }) {
  const { lang, size, cx, cy, weight = 800, step = 9, c = 0, maxW = SW * 0.86 } = opts;
  return sampleCanvas(ctx => {
    let s = size;
    ctx.font = `${weight} ${s}px Rubik, Heebo, sans-serif`;
    while (ctx.measureText(text).width > maxW && s > 20) {
      s -= 4;
      ctx.font = `${weight} ${s}px Rubik, Heebo, sans-serif`;
    }
    ctx.direction = lang === 'he' ? 'rtl' : 'ltr';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#000';
    ctx.fillText(text, cx, cy);
  }, step, c);
}

function rectTargets(x: number, y: number, w: number, h: number, step: number, c: number): Target[] {
  const out: Target[] = [];
  for (let yy = y; yy <= y + h; yy += step) for (let xx = x; xx <= x + w; xx += step) out.push({ x: xx, y: yy, c });
  return out;
}

function discTargets(cx: number, cy: number, r: number, step: number, c: number): Target[] {
  const out: Target[] = [];
  for (let yy = -r; yy <= r; yy += step) for (let xx = -r; xx <= r; xx += step) if (xx * xx + yy * yy <= r * r) out.push({ x: cx + xx, y: cy + yy, c });
  return out;
}

function ringTargets(cx: number, cy: number, r: number, n: number, c: number): Target[] {
  return Array.from({ length: n }, (_, i) => ({ x: cx + Math.cos((i / n) * Math.PI * 2) * r, y: cy + Math.sin((i / n) * Math.PI * 2) * r, c }));
}

export function imageTargets(img: HTMLImageElement, box: { x: number; y: number; w: number; h: number }, step: number, colorOf: (rgb: number[]) => number) {
  return sampleCanvas(ctx => {
    const k = Math.min(box.w / img.naturalWidth, box.h / img.naturalHeight);
    const w = img.naturalWidth * k, h = img.naturalHeight * k;
    ctx.drawImage(img, box.x + (box.w - w) / 2, box.y + (box.h - h) / 2, w, h);
  }, step, (_x, _y, rgb) => colorOf(rgb));
}

// Deterministic shuffle so targets interleave and particles travel far.
export function shuffle<T>(arr: T[], seed = 1): T[] {
  let s = seed;
  const r = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ── slide content ─────────────────────────────────────────────────

const VERB_AT = 4600;

export function buildSlides(lang: Lang, logo: HTMLImageElement | null): Slide[] {
  const he = lang === 'he';
  const rtl = (x: number) => (he ? SW - x : x);
  // The verb, with a sprinkle of the slide's accent so it is never one flat colour.
  const verb = (text: string) =>
    shuffle(textTargets(text, { lang, size: 330, cx: SW / 2, cy: SH * 0.46, step: 9, c: 0 }), 3).map((t, i) => (i % 6 === 0 ? { ...t, c: 1 } : t));

  // 0 · logo
  const logoT = logo
    ? imageTargets(logo, { x: SW * 0.12, y: SH * 0.3, w: SW * 0.76, h: SH * 0.36 }, 8, rgb => (rgb[0] > 180 && rgb[1] < 160 ? 1 : 0))
    : textTargets('ORTAM AI', { lang: 'en', size: 260, cx: SW / 2, cy: SH * 0.48 });
  const intro: Slide = {
    id: 'logo',
    ink: '#2A2622',
    bg: '#F07022',
    colors: ['#FFF6EC', '#2A2622', '#FFD3A8'],
    duration: 4800,
    stages: [{ at: 0, mode: 'shape', targets: shuffle(logoT, 5) }],
  };

  // 1 · AI courses: a typed request turns into finished work
  const prompt = he ? 'תכין לי תוכנית עבודה לרבעון' : 'Draft my plan for next quarter';
  const bubble = [
    ...textTargets(prompt, { lang, size: 96, cx: SW / 2, cy: SH * 0.44, weight: 700, step: 6, c: 0, maxW: SW * 0.8 }),
  ].sort((a, b) => (he ? b.x - a.x : a.x - b.x));
  const docLTR: Target[] = [
    ...rectTargets(350, 220, 900, 70, 9, 1),
    ...[900, 760, 840, 620, 700].flatMap((w, i) => rectTargets(350, 340 + i * 62, w, 22, 9, 0)),
    ...[120, 190, 260].flatMap((h, i) => rectTargets(1300 + i * 90, 680 - h, 60, h, 9, 2)),
  ];
  const doc = he ? docLTR.map(t => ({ ...t, x: SW - t.x })) : docLTR;
  const ai: Slide = {
    id: 'ai',
    ink: '#231A12',
    bg: '#FFC53D',
    colors: ['#231A12', '#E2481F', '#FFF4DE'],
    duration: 9400,
    stages: [
      { at: 0, mode: 'typing', targets: bubble },
      { at: 2900, mode: 'shape', targets: shuffle(doc, 7) },
      { at: 5200, mode: 'shape', targets: verb(he ? 'לומדים' : 'Learn') },
    ],
  };

  // 2 · Cyber AI: one signal behaves differently inside the flow
  const cyber: Slide = {
    id: 'cyber',
    ink: '#F4FFF6',
    bg: '#0E9F6E',
    colors: ['#F4FFF6', '#FFD447', '#06402B'],
    duration: 8600,
    stages: [
      { at: 0, mode: 'wave', targets: [] },
      { at: VERB_AT, mode: 'shape', targets: verb(he ? 'מזהים' : 'Detect') },
    ],
  };

  // 3 · Placement: scattered graduates find their teams
  const roles = he ? ['אנליסט/ית AI', 'מנהל/ת אוטומציות', 'SOC Analyst', 'מפתח/ת סוכנים'] : ['AI Analyst', 'Automation Lead', 'SOC Analyst', 'Agent Developer'];
  const spots = [
    { x: 360, y: 330 },
    { x: 1240, y: 300 },
    { x: 470, y: 720 },
    { x: 1130, y: 700 },
  ];
  const clusters = spots.flatMap((p, i) => [...discTargets(p.x, p.y, 120, 11, i % 2 ? 2 : 0), ...ringTargets(p.x, p.y, 150, 70, 1)]);
  const scatter: Target[] = Array.from({ length: 900 }, (_, i) => ({ x: 80 + ((i * 397) % 1440), y: 80 + ((i * 631) % 840), c: i % 3 === 0 ? 2 : 0 }));
  const placement: Slide = {
    id: 'placement',
    ink: '#2B0A18',
    bg: '#FF5C93',
    colors: ['#FFF1F5', '#3A0B22', '#FFD23F'],
    duration: 8600,
    stages: [
      { at: 0, mode: 'noise', targets: scatter },
      { at: 1300, mode: 'shape', targets: shuffle(clusters, 11) },
      { at: VERB_AT, mode: 'shape', targets: verb(he ? 'משתלבים' : 'Get placed') },
    ],
    labels: { at: 1900, until: VERB_AT - 200, items: spots.map((p, i) => ({ x: p.x, y: p.y + 205, text: roles[i] })) },
  };

  // 4 · AI strategy: the noise lines up into one route
  const route: Target[] = [];
  const pts = Array.from({ length: 220 }, (_, i) => {
    const t = i / 219;
    return { x: rtl(160 + t * 1280), y: 640 - Math.sin(t * Math.PI * 1.1) * 260 + t * -60 };
  });
  pts.forEach((p, i) => {
    for (let k = -2; k <= 2; k++) route.push({ x: p.x, y: p.y + k * 8, c: 0 });
    if (i % 54 === 0 || i === 219) route.push(...discTargets(p.x, p.y, 38, 9, 2));
  });
  const fog: Target[] = Array.from({ length: 1100 }, (_, i) => ({ x: 60 + ((i * 523) % 1480), y: 60 + ((i * 277) % 880), c: i % 4 === 0 ? 2 : 0 }));
  const strategy: Slide = {
    id: 'strategy',
    ink: '#F3EEFF',
    bg: '#6A4BFF',
    colors: ['#F3EEFF', '#FFC53D', '#FF8A5B'],
    duration: 8600,
    stages: [
      { at: 0, mode: 'noise', targets: fog },
      { at: 1700, mode: 'shape', targets: route },
      { at: VERB_AT, mode: 'shape', targets: verb(he ? 'מתכננים' : 'Plan') },
    ],
  };

  return [intro, ai, cyber, placement, strategy];
}
