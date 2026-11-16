/**
 * Server entry, used only at build time by scripts/prerender.ts.
 * Renders one route to an HTML string plus its <head> tags, so every page ships
 * as real HTML: crawlers, link previews and AI engines that do not run
 * JavaScript still get the title, description and content.
 */
import { renderToString } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { Router } from "wouter";
import { trpc } from "@/lib/trpc";
import App from "./App";

/** Tags React hoists to <head>: on the server they come out first, ahead of the markup. */
const HEAD_TAGS = /^(?:<link\b[^>]*\/>|<meta\b[^>]*\/>|<title>[\s\S]*?<\/title>)+/;

export function render(url: string): { html: string; head: string } {
  // Queries never run during a server render; pages fall back to their built-in data.
  const queryClient = new QueryClient({ defaultOptions: { queries: { enabled: false, retry: false } } });
  const trpcClient = trpc.createClient({ links: [httpBatchLink({ url: "/api/trpc", transformer: superjson })] });

  const html = renderToString(
    <HelmetProvider>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <Router ssrPath={url}>
            <App />
          </Router>
        </QueryClientProvider>
      </trpc.Provider>
    </HelmetProvider>
  );

  const head = html.match(HEAD_TAGS)?.[0] ?? "";
  return { html: html.slice(head.length), head: head.replace(/></g, ">\n    <") };
}
