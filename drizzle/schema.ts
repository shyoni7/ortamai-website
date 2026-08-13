import { boolean, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Contact form submissions
export const contactSubmissions = mysqlTable("contact_submissions", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  company: varchar("company", { length: 255 }),
  message: text("message").notNull(),
  lang: varchar("lang", { length: 5 }).default("he"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = typeof contactSubmissions.$inferInsert;

// CV / Placement submissions
export const cvSubmissions = mysqlTable("cv_submissions", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  role: varchar("role", { length: 255 }),
  field: varchar("field", { length: 100 }),
  cvUrl: text("cvUrl"),
  cvKey: text("cvKey"),
  message: text("message"),
  lang: varchar("lang", { length: 5 }).default("he"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type CvSubmission = typeof cvSubmissions.$inferSelect;
export type InsertCvSubmission = typeof cvSubmissions.$inferInsert;

// Incubator / Accelerator consultation form submissions
export const incubatorSubmissions = mysqlTable("incubator_submissions", {
  id: int("id").autoincrement().primaryKey(),
  businessName: varchar("businessName", { length: 255 }).notNull(),
  firstName: varchar("firstName", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  about: text("about"),
  lang: varchar("lang", { length: 5 }).default("he"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type IncubatorSubmission = typeof incubatorSubmissions.$inferSelect;
export type InsertIncubatorSubmission = typeof incubatorSubmissions.$inferInsert;

// Bookable catalog items shown on the /courses page, editable from /admin.
// When the table is empty or the DB is unreachable the site falls back to
// the built-in catalog in shared/defaultCourses.ts.
export const courses = mysqlTable("courses", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 64 }).notNull().unique(),
  section: mysqlEnum("section", ["courses", "lessons", "subsidized"]).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  titleEn: varchar("titleEn", { length: 255 }),
  subtitle: varchar("subtitle", { length: 255 }),
  subtitleEn: varchar("subtitleEn", { length: 255 }),
  description: text("description"),
  descriptionEn: text("descriptionEn"),
  /** Price in whole shekels. */
  price: int("price").notNull(),
  /** Pre-discount price in whole shekels, shown struck through (subsidized tracks). */
  originalPrice: int("originalPrice"),
  priceUnit: mysqlEnum("priceUnit", ["course", "lesson"]).default("course").notNull(),
  badge: varchar("badge", { length: 100 }),
  badgeEn: varchar("badgeEn", { length: 100 }),
  /** Eligible audience for subsidized tracks (e.g. "מילואימניקים בעלי עסקים"). */
  audience: varchar("audience", { length: 255 }),
  audienceEn: varchar("audienceEn", { length: 255 }),
  sortOrder: int("sortOrder").default(0).notNull(),
  visible: boolean("visible").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Course = typeof courses.$inferSelect;
export type InsertCourse = typeof courses.$inferInsert;

// Booking requests and subsidized-track eligibility checks from /courses.
export const courseOrders = mysqlTable("course_orders", {
  id: int("id").autoincrement().primaryKey(),
  /** Snapshot of the ordered item, kept even if the course is later edited/removed. */
  courseSlug: varchar("courseSlug", { length: 64 }),
  courseTitle: varchar("courseTitle", { length: 255 }).notNull(),
  type: mysqlEnum("type", ["booking", "eligibility_check"]).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  message: text("message"),
  status: mysqlEnum("status", ["new", "contacted", "closed", "not_eligible"]).default("new").notNull(),
  lang: varchar("lang", { length: 5 }).default("he"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CourseOrder = typeof courseOrders.$inferSelect;
export type InsertCourseOrder = typeof courseOrders.$inferInsert;