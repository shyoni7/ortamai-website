import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getDb } from "./db";
import { contactSubmissions } from "../drizzle/schema";
import { notifyOwner } from "./_core/notification";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  contact: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(2).max(255),
        email: z.string().email().max(320),
        phone: z.string().max(50).optional(),
        company: z.string().max(255).optional(),
        message: z.string().min(5).max(5000),
        lang: z.enum(["he", "en"]).default("he"),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        await db.insert(contactSubmissions).values({
          name: input.name,
          email: input.email,
          phone: input.phone ?? null,
          company: input.company ?? null,
          message: input.message,
          lang: input.lang,
        });

        await notifyOwner({
          title: `📬 פנייה חדשה מ-${input.name}`,
          content: `שם: ${input.name}\nאימייל: ${input.email}\nטלפון: ${input.phone ?? "לא צוין"}\nחברה: ${input.company ?? "לא צוין"}\n\nהודעה:\n${input.message}`,
        });

        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
