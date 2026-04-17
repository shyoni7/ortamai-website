import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the database and notification modules
vi.mock("./db", () => ({
  getDb: vi.fn().mockResolvedValue({
    insert: vi.fn().mockReturnValue({
      values: vi.fn().mockResolvedValue(undefined),
    }),
  }),
}));

vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("contact.submit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("submits a valid contact form successfully", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      name: "ישראל ישראלי",
      email: "israel@example.com",
      phone: "050-000-0000",
      company: "חברת AI",
      message: "אני מעוניין לשמוע עוד על השירותים שלכם",
      lang: "he",
    });

    expect(result).toEqual({ success: true });
  });

  it("submits a valid English contact form successfully", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.submit({
      name: "John Doe",
      email: "john@example.com",
      message: "I am interested in your AI services",
      lang: "en",
    });

    expect(result).toEqual({ success: true });
  });

  it("rejects a form with an invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        name: "John Doe",
        email: "not-an-email",
        message: "Hello there",
        lang: "en",
      })
    ).rejects.toThrow();
  });

  it("rejects a form with a name that is too short", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        name: "J",
        email: "john@example.com",
        message: "Hello there",
        lang: "en",
      })
    ).rejects.toThrow();
  });

  it("rejects a form with a message that is too short", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        name: "John Doe",
        email: "john@example.com",
        message: "Hi",
        lang: "en",
      })
    ).rejects.toThrow();
  });
});
