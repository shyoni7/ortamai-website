import { sql } from "drizzle-orm";
import { courses } from "../drizzle/schema";
import { DEFAULT_COURSES } from "../shared/defaultCourses";
import { getDb } from "./db";

// The production deployment applies no migration step, so course tables are
// created on demand the first time they are needed. Statements mirror
// drizzle/0004_lazy_silver_centurion.sql.

let ensured = false;

export async function ensureCourseTables(): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  if (ensured) return true;

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS \`courses\` (
      \`id\` int AUTO_INCREMENT NOT NULL,
      \`slug\` varchar(64) NOT NULL,
      \`section\` enum('courses','lessons','subsidized') NOT NULL,
      \`title\` varchar(255) NOT NULL,
      \`titleEn\` varchar(255),
      \`subtitle\` varchar(255),
      \`subtitleEn\` varchar(255),
      \`description\` text,
      \`descriptionEn\` text,
      \`highlights\` text,
      \`highlightsEn\` text,
      \`price\` int NOT NULL,
      \`originalPrice\` int,
      \`priceUnit\` enum('course','lesson') NOT NULL DEFAULT 'course',
      \`badge\` varchar(100),
      \`badgeEn\` varchar(100),
      \`audience\` varchar(255),
      \`audienceEn\` varchar(255),
      \`sortOrder\` int NOT NULL DEFAULT 0,
      \`visible\` boolean NOT NULL DEFAULT true,
      \`createdAt\` timestamp NOT NULL DEFAULT (now()),
      \`updatedAt\` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
      CONSTRAINT \`courses_id\` PRIMARY KEY(\`id\`),
      CONSTRAINT \`courses_slug_unique\` UNIQUE(\`slug\`)
    )
  `);
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS \`course_orders\` (
      \`id\` int AUTO_INCREMENT NOT NULL,
      \`courseSlug\` varchar(64),
      \`courseTitle\` varchar(255) NOT NULL,
      \`type\` enum('booking','eligibility_check') NOT NULL,
      \`name\` varchar(255) NOT NULL,
      \`email\` varchar(320) NOT NULL,
      \`phone\` varchar(50) NOT NULL,
      \`message\` text,
      \`status\` enum('new','contacted','closed','not_eligible') NOT NULL DEFAULT 'new',
      \`lang\` varchar(5) DEFAULT 'he',
      \`createdAt\` timestamp NOT NULL DEFAULT (now()),
      \`updatedAt\` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
      CONSTRAINT \`course_orders_id\` PRIMARY KEY(\`id\`)
    )
  `);

  // Columns added after the table first shipped. MySQL has no portable
  // "ADD COLUMN IF NOT EXISTS", so a duplicate-column error is the success case.
  for (const column of ["highlights", "highlightsEn"]) {
    try {
      await db.execute(sql.raw(`ALTER TABLE \`courses\` ADD COLUMN \`${column}\` text`));
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      if (!/duplicate column|already exists/i.test(message)) {
        console.warn(`[Courses] Could not add column ${column}:`, message);
      }
    }
  }

  ensured = true;
  return true;
}

/** Insert the built-in catalog into an empty courses table. */
export async function seedDefaultCourses(): Promise<number> {
  const db = await getDb();
  if (!db) return 0;
  await ensureCourseTables();

  const existing = await db.select({ id: courses.id }).from(courses).limit(1);
  if (existing.length > 0) return 0;

  await db.insert(courses).values(DEFAULT_COURSES.map(course => ({ ...course })));
  return DEFAULT_COURSES.length;
}
