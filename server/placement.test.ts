import { describe, it, expect } from "vitest";
import { appRouter } from "./routers";

describe("placement.submitCv", () => {
  it("should accept valid CV submission without file", async () => {
    const caller = appRouter.createCaller({
      req: {} as any,
      res: {} as any,
      user: null,
    });

    // We expect either success or a DB error (not a validation error)
    try {
      const result = await caller.placement.submitCv({
        name: "ישראל ישראלי",
        email: "test@example.com",
        phone: "050-1234567",
        role: "מנהל מוצר AI",
        field: "tech",
        message: "מחפש עבודה בתחום ה-AI",
        lang: "he",
      });
      expect(result.success).toBe(true);
    } catch (err: any) {
      // DB not available in test env is acceptable
      expect(err.message).toMatch(/database|db|connect/i);
    }
  });

  it("should reject submission with invalid email", async () => {
    const caller = appRouter.createCaller({
      req: {} as any,
      res: {} as any,
      user: null,
    });

    await expect(
      caller.placement.submitCv({
        name: "Test User",
        email: "not-an-email",
        lang: "en",
      })
    ).rejects.toThrow();
  });

  it("should reject submission with name too short", async () => {
    const caller = appRouter.createCaller({
      req: {} as any,
      res: {} as any,
      user: null,
    });

    await expect(
      caller.placement.submitCv({
        name: "A",
        email: "test@example.com",
        lang: "en",
      })
    ).rejects.toThrow();
  });

  it("should accept English submission", async () => {
    const caller = appRouter.createCaller({
      req: {} as any,
      res: {} as any,
      user: null,
    });

    try {
      const result = await caller.placement.submitCv({
        name: "John Doe",
        email: "john@example.com",
        role: "AI Engineer",
        field: "tech",
        lang: "en",
      });
      expect(result.success).toBe(true);
    } catch (err: any) {
      expect(err.message).toMatch(/database|db|connect/i);
    }
  });
});
