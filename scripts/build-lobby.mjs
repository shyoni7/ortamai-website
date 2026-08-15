// Builds all cinematic assets for the interactive home experience:
//  - seq/journey  : vertical scrub, space → entrance → lobby arrival
//  - seq/pan      : horizontal lobby panorama, scrubbed by drag/arrows
//  - seq/enter/*  : one dolly-in entry sequence per storefront, auto-played on click
//
// Usage:
//   node scripts/build-lobby.mjs <hero> <pan> <room1-workshop> <room2-academy> <room3-accelerator> <roomA-automations> <roomB-cyber>
//
// Frames are committed; nothing runs at deploy time. ffmpeg resolution:
// FFMPEG_PATH env → ffmpeg-static → PATH.
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

const [, , heroSrc, panSrc, workshopSrc, academySrc, acceleratorSrc, automationsSrc, cyberSrc] = process.argv;
if (!cyberSrc) {
  console.error("Usage: node scripts/build-lobby.mjs <hero> <pan> <workshop> <academy> <accelerator> <automations> <cyber>");
  process.exit(1);
}

const ffmpeg = resolveFfmpeg();
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const seqBase = path.join(root, "client", "public", "seq");

function extract({ input, outDir, select, width, quality }) {
  mkdirSync(outDir, { recursive: true });
  execFileSync(ffmpeg, [
    "-v", "error", "-y",
    "-i", input,
    "-vf", `select=${select},scale=${width}:-2`,
    "-vsync", "vfr",
    "-quality", String(quality),
    "-f", "image2",
    "-c:v", "libwebp",
    path.join(outDir, "%04d.webp"),
  ], { stdio: "inherit" });
  return readdirSync(outDir).length;
}

function poster(input, outDir, frame = 0) {
  execFileSync(ffmpeg, [
    "-v", "error", "-y",
    "-i", input,
    "-vf", `select=eq(n\\,${frame}),scale=1600:-2`,
    "-frames:v", "1", "-q:v", "4",
    path.join(outDir, "poster.jpg"),
  ], { stdio: "inherit" });
}

function report(label, dir) {
  const files = readdirSync(dir).filter(f => f.endsWith(".webp"));
  const kb = Math.round(files.reduce((s, f) => s + statSync(path.join(dir, f)).size, 0) / 1024);
  console.log(`${label}: ${files.length} frames, ${kb} KB`);
}

// ── Vertical journey: approach (source 0-49) + lobby arrival (144-216), 2-of-3 ──
{
  const out = path.join(seqBase, "journey");
  rmSync(out, { recursive: true, force: true });
  for (const v of [{ dir: "d", w: 1600, q: 68 }, { dir: "m", w: 900, q: 65 }]) {
    const dir = path.join(out, v.dir);
    const sel = v.dir === "d" ? "mod(n\\,3)" : "not(mod(n\\,3))";
    extract({
      input: heroSrc, outDir: dir, width: v.w, quality: v.q,
      select: `${sel}*(between(n\\,0\\,49)+between(n\\,144\\,216))`,
    });
    report(`journey/${v.dir}`, dir);
  }
  poster(heroSrc, out);
}

// ── Lobby panorama: full clip, horizontal scrub ──
{
  const out = path.join(seqBase, "pan");
  rmSync(out, { recursive: true, force: true });
  for (const v of [{ dir: "d", w: 1600, q: 68, step: 4 }, { dir: "m", w: 900, q: 65, step: 6 }]) {
    const dir = path.join(out, v.dir);
    extract({ input: panSrc, outDir: dir, width: v.w, quality: v.q, select: `not(mod(n\\,${v.step}))` });
    report(`pan/${v.dir}`, dir);
  }
  poster(panSrc, out);
}

// ── Entry sequences: single set per room (auto-played, not scrubbed) ──
const ENTRIES = [
  // slug, input, keep-range (source frames), step
  { slug: "workshop",    input: workshopSrc,    keep: [55, 143],  step: 3 },
  { slug: "academy",     input: academySrc,     keep: [80, 180],  step: 4 },
  { slug: "accelerator", input: acceleratorSrc, keep: [216, 342], step: 5 },
  { slug: "automations", input: automationsSrc, keep: [0, 144],   step: 4 },
  { slug: "cyber",       input: cyberSrc,       keep: [0, 144],   step: 4 },
];
for (const e of ENTRIES) {
  const dir = path.join(seqBase, "enter", e.slug);
  rmSync(dir, { recursive: true, force: true });
  extract({
    input: e.input, outDir: dir, width: 1280, quality: 66,
    select: `not(mod(n\\,${e.step}))*between(n\\,${e.keep[0]}\\,${e.keep[1]})`,
  });
  report(`enter/${e.slug}`, dir);
}
