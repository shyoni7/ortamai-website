// One-time asset pipeline: turns a source video into the scroll-scrub frame
// sequence served from client/public/seq/. The generated frames are committed,
// so this script never runs during deploys — only locally when footage changes.
//
// Usage:
//   node scripts/build-sequence.mjs <video-file> [outName] [--keep a-b,c-d]
//
// --keep limits output to the given SOURCE frame ranges (inclusive, 0-based),
// e.g. --keep 0-49,144-216 drops the middle of the shot. Output files always
// renumber sequentially from 0001.
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

const args = process.argv.slice(2);
const keepIdx = args.indexOf("--keep");
const keepArg = keepIdx >= 0 ? args.splice(keepIdx, 2)[1] : null;
const [input, outName = "hero"] = args;
if (!input) {
  console.error("Usage: node scripts/build-sequence.mjs <video-file> [outName] [--keep a-b,c-d]");
  process.exit(1);
}

// "0-49,144-216" → "(between(n\,0\,49)+between(n\,144\,216))"
const keepExpr = keepArg
  ? "*(" + keepArg.split(",").map(r => {
      const [a, b] = r.split("-").map(Number);
      if (!Number.isInteger(a) || !Number.isInteger(b)) {
        console.error(`Bad --keep range: ${r}`);
        process.exit(1);
      }
      return `between(n\\,${a}\\,${b})`;
    }).join("+") + ")"
  : "";

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
    "-vf", `select=${v.select}${keepExpr},scale=${v.width}:-2`,
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
