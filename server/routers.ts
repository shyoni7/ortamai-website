import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getDb } from "./db";
import { contactSubmissions, cvSubmissions } from "../drizzle/schema";
import { notifyOwner } from "./_core/notification";
import { storagePut } from "./storage";

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

  placement: router({
    submitCv: publicProcedure
      .input(z.object({
        name: z.string().min(2).max(255),
        email: z.string().email().max(320),
        phone: z.string().max(50).optional(),
        role: z.string().max(255).optional(),
        field: z.string().max(100).optional(),
        cvBase64: z.string().optional(),
        cvFileName: z.string().max(255).optional(),
        cvMimeType: z.string().max(100).optional(),
        message: z.string().max(2000).optional(),
        lang: z.enum(["he", "en"]).default("he"),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        let cvUrl: string | null = null;
        let cvKey: string | null = null;

        // Upload CV file to S3 if provided
        if (input.cvBase64 && input.cvFileName) {
          const buffer = Buffer.from(input.cvBase64, "base64");
          const mimeType = input.cvMimeType ?? "application/octet-stream";
          const safeFileName = input.cvFileName.replace(/[^a-zA-Z0-9._-]/g, "_");
          const result = await storagePut(
            `cv-submissions/${Date.now()}_${safeFileName}`,
            buffer,
            mimeType
          );
          cvUrl = result.url;
          cvKey = result.key;
        }

        await db.insert(cvSubmissions).values({
          name: input.name,
          email: input.email,
          phone: input.phone ?? null,
          role: input.role ?? null,
          field: input.field ?? null,
          cvUrl,
          cvKey,
          message: input.message ?? null,
          lang: input.lang,
        });

        await notifyOwner({
          title: `📄 קורות חיים חדשים מ-${input.name}`,
          content: `שם: ${input.name}\nאימייל: ${input.email}\nטלפון: ${input.phone ?? "לא צוין"}\nתפקיד מבוקש: ${input.role ?? "לא צוין"}\nתחום: ${input.field ?? "לא צוין"}\n${cvUrl ? `קישור לקורות חיים: ${cvUrl}` : "לא צורף קובץ"}\n\nהודעה:\n${input.message ?? "ללא הודעה"}`,
        });

        return { success: true };
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
