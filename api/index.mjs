// Vercel serverless function entry. The actual Express app lives in
// server/vercelApp.ts and is bundled into dist/server-app.mjs by
// `pnpm build` (which Vercel runs before packaging this function), so this
// file has a single traceable import and no TypeScript compilation step.
export { default } from "../dist/server-app.mjs";
