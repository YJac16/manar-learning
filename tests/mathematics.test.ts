import { describe, expect, it } from "vitest";
import {
  describeVisual,
  generateMathQuestion,
  getSumOfTheDay,
  isValidDivision,
} from "@/lib/mathematics";

describe("Maths engine", () => {
  it("generates deterministic sum of the day", () => {
    const a = getSumOfTheDay("2026-08-27", 1);
    const b = getSumOfTheDay("2026-08-27", 1);
    expect(a.id).toBe(b.id);
    expect(a.answer).toBe(b.answer);
  });

  it("addition answers are correct", () => {
    for (let i = 0; i < 20; i++) {
      const q = generateMathQuestion(1, null, `add-${i}`);
      if (q.operation === "+") {
        expect(q.answer).toBe(q.operands[0] + q.operands[1]);
      }
    }
  });

  it("subtraction stays non-negative", () => {
    for (let i = 0; i < 20; i++) {
      const q = generateMathQuestion(2, null, `sub-${i}`);
      if (q.operation === "-") {
        expect(q.operands[0]).toBeGreaterThanOrEqual(q.operands[1]);
        expect(q.answer).toBe(q.operands[0] - q.operands[1]);
      }
    }
  });

  it("multiplication answers are correct", () => {
    for (let i = 0; i < 20; i++) {
      const q = generateMathQuestion(3, null, `mul-${i}`);
      if (q.operation === "×") {
        expect(q.answer).toBe(q.operands[0] * q.operands[1]);
      }
    }
  });

  it("division has no remainder and no divide-by-zero", () => {
    for (let i = 0; i < 30; i++) {
      const q = generateMathQuestion(4, null, `div-${i}`);
      if (q.operation === "÷") {
        expect(q.operands[1]).not.toBe(0);
        expect(isValidDivision(q.operands[0], q.operands[1])).toBe(true);
        expect(q.answer).toBe(q.operands[0] / q.operands[1]);
      }
    }
  });

  it("maps visuals to operand counts", () => {
    const add = generateMathQuestion(1, null, "viz-add");
    // force by checking describeVisual structure
    const forced = {
      ...add,
      operation: "+" as const,
      operands: [3, 2] as [number, number],
      answer: 5,
    };
    const visual = describeVisual(forced);
    expect(visual.mode).toBe("addition");
    expect(visual.groups[0]).toHaveLength(3);
    expect(visual.groups[1]).toHaveLength(2);
  });

  it("respects level difficulty max operands for level 1", () => {
    for (let i = 0; i < 15; i++) {
      const q = generateMathQuestion(1, null, `lvl1-${i}`);
      expect(q.operands[0]).toBeLessThanOrEqual(5);
      expect(q.operands[1]).toBeLessThanOrEqual(5);
    }
  });
});
