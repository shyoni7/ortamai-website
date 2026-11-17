/**
 * Build step: turn the single-page app into one real HTML file per page.
 *
 *   vite build  ->  dist/public/index.html (empty shell + assets)
 *   this script ->  dist/public/<route>.html for every public page, plus 404.html
 *
 * Each file holds the page's own <title>, description, share tags, structured
 * data and rendered content. The app still boots on top and takes over.
 */
import fs from "node:fs";
import path from "node:path";
import { createServer } from "vite";
import { COURSE_SYLLABI } from "../shared/courseSyllabi";
import { LANDING_PAGES } from "../client/src/data/landingPages";

const ROOT = path.resolve(import.meta.dirname, "..");
const DIST = path.join(ROOT, "dist/public");

/** Every public page. Keep in step with the routes in client/src/App.tsx. */
export const ROUTES = [
  "/", "/courses", ...COURSE_SYLLABI.map(s => `/courses/${s.slug}`),
  "/academy", "/consulting", "/placement", "/about", "/contact",
  ...LANDING_PAGES.map(p => p.path),
  "/ai-guide", "/ai-guide/advanced", "/accessibility", "/privacy",
];

const HEAD_SLOT = /<!--app-head-->[\s\S]*?<!--\/app-head-->/;
const ROOT_SLOT = '<div id="root"></div>';

async function main() {
  const template = fs.readFileSync(path.join(DIST, "index.html"), "utf8");
  if (!HEAD_SLOT.test(template) || !template.includes(ROOT_SLOT)) {
    throw new Error("prerender: index.html is missing the head or root slot");
  }
  // The untouched shell: used for pages that only exist in the browser (admin).
  fs.writeFileSync(path.join(DIST, "admin.html"), template.replace(HEAD_SLOT, '<title>ORTAM AI</title>\n    <meta name="robots" content="noindex, nofollow" />'));

  process.env.PRERENDER = "1";
  const vite = await createServer({
    configFile: path.join(ROOT, "vite.config.ts"),
    server: { middlewareMode: true, hmr: false, watch: null, ws: false },
    optimizeDeps: { noDiscovery: true, include: [] },
    appType: "custom",
    logLevel: "error",
  });

  try {
    const { render } = (await vite.ssrLoadModule("/src/entry-server.tsx")) as {
      render: (url: string) => { html: string; head: string };
    };

    const pages: [route: string, file: string][] = [
      ...ROUTES.map(r => [r, r === "/" ? "index.html" : `${r.slice(1)}.html`] as [string, string]),
      ["/__not-found__", "404.html"],
    ];

    for (const [route, file] of pages) {
      const { html, head } = render(route);
      if (!head.includes("<title")) throw new Error(`prerender: ${route} rendered without a <title>`);
      if (html.length < 2000) throw new Error(`prerender: ${route} rendered almost nothing (${html.length} bytes)`);
      const out = template
        .replace(HEAD_SLOT, head)
        .replace(ROOT_SLOT, `<div id="root">${html}</div>`);
      const target = path.join(DIST, file);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, out);
      console.log(`prerendered ${route.padEnd(34)} -> ${file} (${(out.length / 1024).toFixed(0)} KB)`);
    }
  } finally {
    await vite.close().catch(() => {});
  }
}

// Exit explicitly: the Vite server can keep handles open after close().
main().then(() => process.exit(0), err => { console.error(err); process.exit(1); });
