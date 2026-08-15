// One-time asset pipeline: turns a source video into the scroll-scrub frame
// sequence served from client/public/seq/. The generated frames are committed,
// so this script never runs during deploys — only locally when footage changes.
//
// Usage:
//   node scripts/build-sequence.mjs <video-file> [outName]
//
// ffmpeg resolution order: FFMPEG_PATH env var → ffmpeg-static package (if
// installed anywhere ffmpeg-static can be resolved) → `ffmpeg` on PATH.
import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, statSync } from "node:fs";
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

const [, , input, outName = "hero"] = process.argv;
if (!input) {
  console.error("Usage: node scripts/build-sequence.mjs <video-file> [outName]");
  process.exit(1);
}

const ffmpeg = resolveFfmpeg();
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const outBase = path.join(root, "client", "public", "seq", outName);

const variants = [
  // keep 2 of every 3 frames for desktop, every 3rd for mobile.
  // The comma inside mod() must be escaped so it isn't read as a filter separator.
  { dir: "d", select: "mod(n\\,3)", width: 1600, quality: 68 },
  { dir: "m", select: "not(mod(n\\,3))", width: 900, quality: 65 },
];

for (const v of variants) {
  const dir = path.join(outBase, v.dir);
  mkdirSync(dir, { recursive: true });
  execFileSync(ffmpeg, [
    "-v", "error", "-y",
    "-i", input,
    "-vf", `select=${v.select},scale=${v.width}:-2`,
    "-vsync", "vfr",
    "-quality", String(v.quality),
    "-f", "image2",
    "-c:v", "libwebp",
    path.join(dir, "%04d.webp"),
  ], { stdio: "inherit" });
  const files = readdirSync(dir);
  const totalKb = Math.round(files.reduce((s, f) => s + statSync(path.join(dir, f)).size, 0) / 1024);
  console.log(`${v.dir}: ${files.length} frames, ${totalKb} KB total`);
}

// Poster: first frame as jpg for instant paint / no-JS fallback.
execFileSync(ffmpeg, [
  "-v", "error", "-y",
  "-i", input,
  "-vf", "select='eq(n,0)',scale=1600:-2",
  "-frames:v", "1",
  "-q:v", "4",
  path.join(outBase, "poster.jpg"),
], { stdio: "inherit" });
console.log("poster.jpg written");
