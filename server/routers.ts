import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import { asc, desc, eq } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "./db";
import { contactSubmissions, courseOrders, courses, cvSubmissions, incubatorSubmissions } from "../drizzle/schema";
import { DEFAULT_COURSES } from "../shared/defaultCourses";
import { ENV } from "./_core/env";
import { notifyOwner } from "./_core/notification";
import { storagePut } from "./storage";
import {
  sendContactEmail,
  sendConsultationEmail,
  sendCourseOrderConfirmationEmail,
  sendCourseOrderEmail,
  sendCvEmail,
} from "./email";
import {
  clearAdminCookie,
  isAdminConfigured,
  isAdminRequest,
  setAdminCookie,
  verifyAdminPassword,
} from "./adminAuth";
import { ensureCourseTables, seedDefaultCourses } from "./coursesDb";

// The site must keep accepting form submissions even when optional backends
// (MySQL, Manus notification/storage APIs) are unavailable — e.g. when hosted
// on Vercel with only SMTP configured. Each submission is delivered on a
// best-effort basis to every configured channel and fails only if none worked.
async function attempt(label: string, fn: () => Promise<unknown>): Promise<boolean> {
  try {
    await fn();
    return true;
  } catch (err) {
    console.error(`[${label}] delivery failed:`, err);
    return false;
  }
}

// Guards procedures behind the password-cookie admin session (see adminAuth.ts).
const adminOnly = publicProcedure.use(async ({ ctx, next }) => {
  if (!isAdminRequest(ctx.req)) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Admin session required" });
  }
  return next();
});

const courseFieldsInput = z.object({
  section: z.enum(["courses", "lessons", "subsidized"]),
  title: z.string().min(1).max(255),
  titleEn: z.string().max(255).nullish(),
  subtitle: z.string().max(255).nullish(),
  subtitleEn: z.string().max(255).nullish(),
  description: z.string().max(5000).nullish(),
  descriptionEn: z.string().max(5000).nullish(),
  price: z.number().int().min(0).max(1000000),
  originalPrice: z.number().int().min(0).max(1000000).nullish(),
  priceUnit: z.enum(["course", "lesson"]),
  badge: z.string().max(100).nullish(),
  badgeEn: z.string().max(100).nullish(),
  audience: z.string().max(255).nullish(),
  audienceEn: z.string().max(255).nullish(),
  sortOrder: z.number().int().min(0).max(10000),
  visible: z.boolean(),
});

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
        let cvUrl: string | null = null;
        let cvKey: string | null = null;
        let cvAttachment: { filename: string; content: Buffer; contentType: string } | undefined;

        if (input.cvBase64 && input.cvFileName) {
          const buffer = Buffer.from(input.cvBase64, "base64");
          const mimeType = input.cvMimeType ?? "application/octet-stream";
          const safeFileName = input.cvFileName.replace(/[^a-zA-Z0-9._-]/g, "_");
          cvAttachment = { filename: safeFileName, content: buffer, contentType: mimeType };

          // Upload to Manus storage only when its credentials are configured
          if (ENV.forgeApiUrl && ENV.forgeApiKey) {
            await attempt("Storage", async () => {
              const result = await storagePut(
                `cv-submissions/${Date.now()}_${safeFileName}`,
                buffer,
                mimeType
              );
              cvUrl = result.url;
              cvKey = result.key;
            });
          }
        }

        const emailed = await attempt("Email", () =>
          sendCvEmail({
            name: input.name,
            email: input.email,
            phone: input.phone,
            role: input.role,
            field: input.field,
            message: input.message,
            attachment: cvAttachment,
          })
        );

        const db = await getDb();
        const stored = db
          ? await attempt("DB", () =>
              db.insert(cvSubmissions).values({
                name: input.name,
                email: input.email,
                phone: input.phone ?? null,
                role: input.role ?? null,
                field: input.field ?? null,
                cvUrl,
                cvKey,
                message: input.message ?? null,
                lang: input.lang,
              })
            )
          : false;

        await attempt("Notification", () =>
          notifyOwner({
            title: `📄 קורות חיים חדשים מ-${input.name}`,
            content: `שם: ${input.name}\nאימייל: ${input.email}\nטלפון: ${input.phone ?? "לא צוין"}\nתפקיד מבוקש: ${input.role ?? "לא צוין"}\nתחום: ${input.field ?? "לא צוין"}\n${cvUrl ? `קישור לקורות חיים: ${cvUrl}` : "לא צורף קובץ"}\n\nהודעה:\n${input.message ?? "ללא הודעה"}`,
          })
        );

        if (!stored && !emailed) throw new Error("Submission could not be delivered");

        return { success: true };
      }),
  }),

  incubator: router({
    submitConsultation: publicProcedure
      .input(z.object({
        businessName: z.string().min(1).max(255),
        firstName: z.string().min(1).max(255),
        email: z.string().email().max(320),
        phone: z.string().min(1).max(50),
        about: z.string().max(3000).optional(),
        lang: z.enum(["he", "en"]).default("he"),
      }))
      .mutation(async ({ input }) => {
        const emailed = await attempt("Email", () =>
          sendConsultationEmail({
            businessName: input.businessName,
            firstName: input.firstName,
            email: input.email,
            phone: input.phone,
            about: input.about,
          })
        );

        const db = await getDb();
        const stored = db
          ? await attempt("DB", () =>
              db.insert(incubatorSubmissions).values({
                businessName: input.businessName,
                firstName: input.firstName,
                email: input.email,
                phone: input.phone,
                about: input.about ?? null,
                lang: input.lang,
              })
            )
          : false;

        await attempt("Notification", () =>
          notifyOwner({
            title: `🚀 בקשת ייעוץ חדשה מ-${input.firstName} (${input.businessName})`,
            content: `שם פרטי: ${input.firstName}\nשם עסק: ${input.businessName}\nאימייל: ${input.email}\nטלפון: ${input.phone}\n\nעל העסק:\n${input.about ?? "לא צוין"}`,
          })
        );

        if (!stored && !emailed) throw new Error("Submission could not be delivered");

        return { success: true };
      }),
  }),

  courses: router({
    list: publicProcedure.query(async () => {
      const db = await getDb();
      if (db) {
        try {
          await ensureCourseTables();
          const rows = await db
            .select()
            .from(courses)
            .where(eq(courses.visible, true))
            .orderBy(asc(courses.sortOrder), asc(courses.id));
          if (rows.length > 0) return rows;
        } catch (err) {
          console.error("[Courses] DB read failed, using default catalog:", err);
        }
      }
      return DEFAULT_COURSES.filter(c => c.visible).map((c, i) => ({ ...c, id: -(i + 1) }));
    }),

    submitOrder: publicProcedure
      .input(z.object({
        courseSlug: z.string().max(64).optional(),
        courseTitle: z.string().min(1).max(255),
        type: z.enum(["booking", "eligibility_check"]),
        name: z.string().min(2).max(255),
        email: z.string().email().max(320),
        phone: z.string().min(5).max(50),
        message: z.string().max(3000).optional(),
        lang: z.enum(["he", "en"]).default("he"),
      }))
      .mutation(async ({ input }) => {
        const payload = {
          type: input.type,
          courseTitle: input.courseTitle,
          name: input.name,
          email: input.email,
          phone: input.phone,
          message: input.message,
        };

        const emailed = await attempt("Email", () => sendCourseOrderEmail(payload));

        const db = await getDb();
        const stored = db
          ? await attempt("DB", async () => {
              await ensureCourseTables();
              await db.insert(courseOrders).values({
                courseSlug: input.courseSlug ?? null,
                courseTitle: input.courseTitle,
                type: input.type,
                name: input.name,
                email: input.email,
                phone: input.phone,
                message: input.message ?? null,
                lang: input.lang,
              });
            })
          : false;

        await attempt("Notification", () =>
          notifyOwner({
            title:
              input.type === "eligibility_check"
                ? `🤝 בקשת בדיקת זכאות: ${input.courseTitle} — ${input.name}`
                : `🎓 הזמנת קורס חדשה: ${input.courseTitle} — ${input.name}`,
            content: `קורס: ${input.courseTitle}\nשם: ${input.name}\nאימייל: ${input.email}\nטלפון: ${input.phone}\n\nהודעה:\n${input.message ?? "ללא הודעה"}`,
          })
        );

        if (!stored && !emailed) throw new Error("Submission could not be delivered");

        // Customer confirmation is a courtesy — never fail the order over it.
        await attempt("ConfirmationEmail", () => sendCourseOrderConfirmationEmail(payload));

        return { success: true };
      }),
  }),

  admin: router({
    me: publicProcedure.query(async ({ ctx }) => ({
      isAdmin: isAdminRequest(ctx.req),
      configured: isAdminConfigured(),
      dbAvailable: Boolean(await getDb()),
    })),

    login: publicProcedure
      .input(z.object({ password: z.string().min(1).max(255) }))
      .mutation(async ({ ctx, input }) => {
        if (!isAdminConfigured()) {
          throw new TRPCError({
            code: "PRECONDITION_FAILED",
            message: "ADMIN_PASSWORD is not configured on the server",
          });
        }
        if (!verifyAdminPassword(input.password)) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Wrong password" });
        }
        setAdminCookie(ctx.req, ctx.res);
        return { success: true } as const;
      }),

    logout: publicProcedure.mutation(({ ctx }) => {
      clearAdminCookie(ctx.req, ctx.res);
      return { success: true } as const;
    }),

    listCourses: adminOnly.query(async () => {
      const db = await getDb();
      if (!db) return { dbAvailable: false as const, courses: [] };
      await ensureCourseTables();
      // First admin visit on an empty table: load the built-in catalog so
      // editing starts from the real content instead of a blank screen.
      await seedDefaultCourses();
      const rows = await db
        .select()
        .from(courses)
        .orderBy(asc(courses.section), asc(courses.sortOrder), asc(courses.id));
      return { dbAvailable: true as const, courses: rows };
    }),

    createCourse: adminOnly
      .input(courseFieldsInput)
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Database not configured" });
        await ensureCourseTables();
        const slug = `custom-${Date.now().toString(36)}`;
        await db.insert(courses).values({ ...input, slug });
        return { success: true } as const;
      }),

    updateCourse: adminOnly
      .input(courseFieldsInput.extend({ id: z.number().int().positive() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Database not configured" });
        const { id, ...fields } = input;
        await db.update(courses).set(fields).where(eq(courses.id, id));
        return { success: true } as const;
      }),

    deleteCourse: adminOnly
      .input(z.object({ id: z.number().int().positive() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Database not configured" });
        await db.delete(courses).where(eq(courses.id, input.id));
        return { success: true } as const;
      }),

    listOrders: adminOnly.query(async () => {
      const db = await getDb();
      if (!db) return { dbAvailable: false as const, orders: [] };
      await ensureCourseTables();
      const rows = await db
        .select()
        .from(courseOrders)
        .orderBy(desc(courseOrders.createdAt))
        .limit(500);
      return { dbAvailable: true as const, orders: rows };
    }),

    updateOrderStatus: adminOnly
      .input(z.object({
        id: z.number().int().positive(),
        status: z.enum(["new", "contacted", "closed", "not_eligible"]),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Database not configured" });
        await db.update(courseOrders).set({ status: input.status }).where(eq(courseOrders.id, input.id));
        return { success: true } as const;
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
        const emailed = await attempt("Email", () =>
          sendContactEmail({
            name: input.name,
            email: input.email,
            phone: input.phone,
            subject: input.company ? `פנייה מ-${input.company}` : 'פנייה מהאתר',
            message: input.message,
          })
        );

        const db = await getDb();
        const stored = db
          ? await attempt("DB", () =>
              db.insert(contactSubmissions).values({
                name: input.name,
                email: input.email,
                phone: input.phone ?? null,
                company: input.company ?? null,
                message: input.message,
                lang: input.lang,
              })
            )
          : false;

        await attempt("Notification", () =>
          notifyOwner({
            title: `📬 פנייה חדשה מ-${input.name}`,
            content: `שם: ${input.name}\nאימייל: ${input.email}\nטלפון: ${input.phone ?? "לא צוין"}\nחברה: ${input.company ?? "לא צוין"}\n\nהודעה:\n${input.message}`,
          })
        );

        if (!stored && !emailed) throw new Error("Submission could not be delivered");

        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
