// Assembles the multi-clip "journey" scroll sequence: outside → lobby →
// workshop room → academy classroom → accelerator floor. Each clip contributes
// a curated source-frame range; output frames are renumbered into one
// continuous sequence under client/public/seq/journey/. Prints the chapter
// boundaries as progress values for the Home overlays.
//
// Usage: node scripts/build-journey.mjs <hero.mov> <room1.mov> <room2.mp4> <room3.mp4>
// ffmpeg resolution: FFMPEG_PATH env → ffmpeg-static → PATH (same as build-sequence).
import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, renameSync, rmSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

function resolveFfmpeg() {
  if (process.env.FFMPEG_PATH) return process.env.FFMPEG_PATH;
  try {
    return createRequire(import.meta.url)("ffmpeg-static");
  } catch {
    return "ffmpeg";
  }
}

const [, , heroSrc, room1Src, room2Src, room3Src] = process.argv;
if (!heroSrc || !room1Src || !room2Src || !room3Src) {
  console.error("Usage: node scripts/build-journey.mjs <hero> <room1> <room2> <room3>");
  process.exit(1);
}

// Curated cut of each clip. keep = inclusive source-frame range,
// dStep/mStep = take every Nth kept frame for desktop/mobile.
// width caps avoid upscaling the 720p room footage.
const CLIPS = [
  { label: "approach",   input: heroSrc,  keep: [0, 49],     dStep: 1.5, mStep: 3, dWidth: 1600, chapter: true },
  { label: "lobby",      input: heroSrc,  keep: [144, 216],  dStep: 1.5, mStep: 3, dWidth: 1600, chapter: true },
  { label: "workshop",   input: room1Src, keep: [55, 143],   dStep: 2,   mStep: 4, dWidth: 1280, chapter: true },
  { label: "classroom",  input: room2Src, keep: [80, 180],   dStep: 2,   mStep: 4, dWidth: 1280, chapter: true },
  { label: "accelerator",input: room3Src, keep: [216, 342],  dStep: 3,   mStep: 6, dWidth: 1280, chapter: true },
];

const ffmpeg = resolveFfmpeg();
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const outBase = path.join(root, "client", "public", "seq", "journey");
rmSync(outBase, { recursive: true, force: true });

// dStep 1.5 means "keep 2 of 3" (the hero's original cadence); integers mean every Nth.
function selectExpr(step, [a, b]) {
  const range = `between(n\\,${a}\\,${b})`;
  if (step === 1.5) return `mod(n\\,3)*${range}`;
  return `not(mod(n\\,${step}))*${range}`;
}

const counts = { d: [], m: [] };
for (const variantDef of [
  { dir: "d", width: c => c.dWidth, step: c => c.dStep, quality: 68 },
  { dir: "m", width: () => 900, step: c => c.mStep, quality: 65 },
]) {
  const dir = path.join(outBase, variantDef.dir);
  mkdirSync(dir, { recursive: true });
  let cursor = 0;
  for (const clip of CLIPS) {
    const tmp = path.join(outBase, `tmp-${variantDef.dir}-${clip.label}`);
    mkdirSync(tmp, { recursive: true });
    execFileSync(ffmpeg, [
      "-v", "error", "-y",
      "-i", clip.input,
      "-vf", `select=${selectExpr(variantDef.step(clip), clip.keep)},scale=${variantDef.width(clip)}:-2`,
      "-vsync", "vfr",
      "-quality", String(variantDef.quality),
      "-f", "image2",
      "-c:v", "libwebp",
      path.join(tmp, "%04d.webp"),
    ], { stdio: "inherit" });
    const files = readdirSync(tmp).sort();
    for (const f of files) {
      cursor += 1;
      renameSync(path.join(tmp, f), path.join(dir, `${String(cursor).padStart(4, "0")}.webp`));
    }
    rmSync(tmp, { recursive: true, force: true });
    counts[variantDef.dir].push({ label: clip.label, frames: files.length });
  }
  const all = readdirSync(dir);
  const totalKb = Math.round(all.reduce((s, f) => s + statSync(path.join(dir, f)).size, 0) / 1024);
  console.log(`${variantDef.dir}: ${all.length} frames, ${totalKb} KB`);
}

// Poster from the very first frame of the journey.
execFileSync(ffmpeg, [
  "-v", "error", "-y",
  "-i", CLIPS[0].input,
  "-vf", "select=eq(n\\,0),scale=1600:-2",
  "-frames:v", "1", "-q:v", "4",
  path.join(outBase, "poster.jpg"),
], { stdio: "inherit" });

// Chapter boundaries as progress values, per variant.
for (const v of ["d", "m"]) {
  const total = counts[v].reduce((s, c) => s + c.frames, 0);
  let acc = 0;
  const cuts = [];
  for (const c of counts[v].slice(0, -1)) {
    acc += c.frames;
    cuts.push(+(acc / (total - 1)).toFixed(4));
  }
  console.log(`${v}: chapters ${counts[v].map(c => `${c.label}=${c.frames}`).join(", ")} | cuts at [${cuts.join(", ")}]`);
}
