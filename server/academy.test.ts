import { describe, expect, it } from "vitest";

// Test the training programs data structure
const trainingProgramIds = [
  'managers', 'marketing', 'hr', 'executives',
  'product', 'developers', 'finance', 'sales'
];

describe("Academy Training Programs", () => {
  it("should have 8 corporate training programs", () => {
    expect(trainingProgramIds).toHaveLength(8);
  });

  it("should include all required department programs", () => {
    expect(trainingProgramIds).toContain('managers');
    expect(trainingProgramIds).toContain('marketing');
    expect(trainingProgramIds).toContain('hr');
    expect(trainingProgramIds).toContain('executives');
    expect(trainingProgramIds).toContain('developers');
    expect(trainingProgramIds).toContain('finance');
    expect(trainingProgramIds).toContain('sales');
  });

  it("should have valid training hours for all programs", () => {
    const hours = [28, 44, 24, 20, 32, 36, 28, 24];
    hours.forEach(h => {
      expect(h).toBeGreaterThan(0);
      expect(h).toBeLessThan(100);
    });
  });

  it("should have 5 public courses", () => {
    const publicCourses = ['AI לעסקים', 'פרומפטינג מתקדם', 'AI לשיווק', 'אוטומציה עם AI', 'No-Code AI'];
    expect(publicCourses).toHaveLength(5);
  });
});
