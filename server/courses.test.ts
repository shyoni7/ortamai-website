import { beforeEach, describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import { ADMIN_COOKIE_NAME, createAdminToken } from "./adminAuth";
import { DEFAULT_COURSES } from "../shared/defaultCourses";
import { getDb } from "./db";

vi.mock("./db", () => ({
  getDb: vi.fn().mockResolvedValue({
    insert: vi.fn().mockReturnValue({
      values: vi.fn().mockResolvedValue(undefined),
    }),
    execute: vi.fn().mockResolvedValue(undefined),
  }),
}));

vi.mock("./coursesDb", () => ({
  ensureCourseTables: vi.fn().mockResolvedValue(true),
  seedDefaultCourses: vi.fn().mockResolvedValue(0),
}));

vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createContext(cookie?: string): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: cookie ? { cookie } : {},
    } as TrpcContext["req"],
    res: {
      cookie: vi.fn(),
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("courses.submitOrder", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("submits a booking request successfully", async () => {
    const caller = appRouter.createCaller(createContext());
    const result = await caller.courses.submitOrder({
      courseSlug: "claude-code-mastery",
      courseTitle: "לשלוט ב-Claude Code: מ-0 ל-100",
      type: "booking",
      name: "ישראל ישראלי",
      email: "israel@example.com",
      phone: "050-000-0000",
      message: "מעדיף מפגשי ערב",
      lang: "he",
    });
    expect(result).toEqual({ success: true });
  });

  it("submits an eligibility check successfully", async () => {
    const caller = appRouter.createCaller(createContext());
    const result = await caller.courses.submitOrder({
      courseSlug: "subsidized-single-mothers",
      courseTitle: "AI למתחילים — מסלול לנשים חד-הוריות",
      type: "eligibility_check",
      name: "דנה כהן",
      email: "dana@example.com",
      phone: "052-000-0000",
      lang: "he",
    });
    expect(result).toEqual({ success: true });
  });

  it("rejects an invalid email", async () => {
    const caller = appRouter.createCaller(createContext());
    await expect(
      caller.courses.submitOrder({
        courseTitle: "קורס",
        type: "booking",
        name: "ישראל ישראלי",
        email: "not-an-email",
        phone: "050-000-0000",
        lang: "he",
      })
    ).rejects.toThrow();
  });

  it("rejects a missing phone", async () => {
    const caller = appRouter.createCaller(createContext());
    await expect(
      caller.courses.submitOrder({
        courseTitle: "קורס",
        type: "booking",
        name: "ישראל ישראלי",
        email: "israel@example.com",
        phone: "",
        lang: "he",
      })
    ).rejects.toThrow();
  });
});

describe("courses.list", () => {
  it("falls back to the built-in catalog when the DB is unavailable", async () => {
    vi.mocked(getDb).mockResolvedValueOnce(null as never);
    const caller = appRouter.createCaller(createContext());
    const result = await caller.courses.list();
    expect(result).toHaveLength(DEFAULT_COURSES.filter(c => c.visible).length);
    expect(result.map(c => c.slug)).toContain("claude-code-mastery");
  });
});

describe("admin auth", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.ADMIN_PASSWORD = "test-secret-password";
  });

  it("rejects admin procedures without a session cookie", async () => {
    const caller = appRouter.createCaller(createContext());
    await expect(caller.admin.listOrders()).rejects.toThrow(/UNAUTHORIZED|Admin session required/);
  });

  it("rejects login with a wrong password", async () => {
    const caller = appRouter.createCaller(createContext());
    await expect(caller.admin.login({ password: "wrong" })).rejects.toThrow();
  });

  it("logs in with the correct password and sets the session cookie", async () => {
    const ctx = createContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.admin.login({ password: "test-secret-password" });
    expect(result).toEqual({ success: true });
    expect(ctx.res.cookie).toHaveBeenCalledWith(
      ADMIN_COOKIE_NAME,
      expect.any(String),
      expect.objectContaining({ httpOnly: true })
    );
  });

  it("accepts admin procedures with a valid session cookie", async () => {
    const token = createAdminToken();
    const ctx = createContext(`${ADMIN_COOKIE_NAME}=${token}`);
    const caller = appRouter.createCaller(ctx);
    const me = await caller.admin.me();
    expect(me.isAdmin).toBe(true);
  });

  it("rejects a tampered session token", async () => {
    const ctx = createContext(`${ADMIN_COOKIE_NAME}=9999999999999.deadbeef`);
    const caller = appRouter.createCaller(ctx);
    const me = await caller.admin.me();
    expect(me.isAdmin).toBe(false);
  });
});
