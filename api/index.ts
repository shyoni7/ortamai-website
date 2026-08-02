// Vercel serverless entry point: wraps the Express API (OAuth callback + tRPC)
// so /api/* works on Vercel. Static client files are served from dist/public
// (see vercel.json). The long-running server in server/_core/index.ts is used
// for local dev / non-serverless hosting only.
import "dotenv/config";
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "../server/_core/oauth";
import { appRouter } from "../server/routers";
import { createContext } from "../server/_core/context";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

registerOAuthRoutes(app);

app.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

export default app;
