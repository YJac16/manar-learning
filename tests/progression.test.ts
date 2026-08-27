import { describe, expect, it } from "vitest";
import {
  XP,
  applyStreak,
  checkStreakOnLoad,
  completeDailyLesson,
  getAccuracy,
  recordMathAnswer,
  recordWordAnswer,
} from "@/lib/progression";
import { createDefaultProgress } from "@/lib/storage";

describe("Progression", () => {
  it("awards XP for correct answers", () => {
    let p = createDefaultProgress();
    p = recordWordAnswer(p, "cat", true);
    expect(p.xp).toBe(XP.correctAnswer);
    expect(p.correctAnswers).toBe(1);
  });

  it("does not master a word after one correct answer", () => {
    let p = createDefaultProgress();
    p = recordWordAnswer(p, "cat", true);
    expect(p.wordMastery.cat.mastery).toBeLessThan(4);
    expect(p.wordsMastered).not.toContain("cat");
  });

  it("reaches mastery after repeated success", () => {
    let p = createDefaultProgress();
    for (let i = 0; i < 5; i++) {
      p = recordWordAnswer(p, "cat", true);
    }
    expect(p.wordMastery.cat.mastery).toBe(4);
    expect(p.wordsMastered).toContain("cat");
  });

  it("tracks maths answers", () => {
    let p = createDefaultProgress();
    p = recordMathAnswer(p, true);
    p = recordMathAnswer(p, false);
    expect(p.mathsQuestions).toBe(2);
    expect(p.mathsCorrect).toBe(1);
    expect(getAccuracy(p)).toBe(50);
  });

  it("increases streak on consecutive days", () => {
    let p = createDefaultProgress();
    p = applyStreak(p, new Date("2026-08-26T12:00:00"));
    expect(p.currentStreak).toBe(1);
    p = applyStreak(p, new Date("2026-08-27T12:00:00"));
    expect(p.currentStreak).toBe(2);
    expect(p.longestStreak).toBe(2);
  });

  it("resets streak after a missed day", () => {
    let p = createDefaultProgress();
    p = applyStreak(p, new Date("2026-08-20T12:00:00"));
    p = checkStreakOnLoad(p, new Date("2026-08-27T12:00:00"));
    expect(p.currentStreak).toBe(0);
  });

  it("completes a daily lesson once per day", () => {
    let p = createDefaultProgress();
    const day = new Date("2026-08-27T12:00:00");
    p = completeDailyLesson(p, "cat", day);
    const xpAfterFirst = p.xp;
    p = completeDailyLesson(p, "cat", day);
    expect(p.xp).toBe(xpAfterFirst);
  });

  it("levels up with XP thresholds", () => {
    let p = createDefaultProgress();
    p.xp = 80;
    p = recordMathAnswer(p, true, 0);
    expect(p.currentLevel).toBeGreaterThanOrEqual(2);
  });
});
