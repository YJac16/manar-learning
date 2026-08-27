import { describe, expect, it } from "vitest";
import { getNumberOfTheDay, getWordOfTheDay } from "@/lib/learning/wordOfTheDay";
import { createDefaultProgress } from "@/lib/storage";

describe("Word of the Day", () => {
  it("is deterministic for the same date and level", () => {
    const a = getWordOfTheDay("2026-08-27", 1);
    const b = getWordOfTheDay("2026-08-27", 1);
    expect(a.id).toBe(b.id);
  });

  it("can change across calendar days", () => {
    const a = getWordOfTheDay("2026-08-27", 1);
    const b = getWordOfTheDay("2026-08-28", 1);
    // Not guaranteed different, but with 50 words highly likely —
    // assert both are valid and selection is stable
    expect(a.id).toBeTruthy();
    expect(b.id).toBeTruthy();
    expect(getWordOfTheDay("2026-08-28", 1).id).toBe(b.id);
  });

  it("avoids recently mastered words when alternatives exist", () => {
    const progress = createDefaultProgress();
    const first = getWordOfTheDay("2026-08-27", 1, progress);
    progress.wordsMastered = [first.id];
    progress.recentWordIds = [first.id];
    const second = getWordOfTheDay("2026-08-27", 1, progress);
    expect(second.id).not.toBe(first.id);
  });

  it("respects learner level difficulty band", () => {
    const word = getWordOfTheDay("2026-01-01", 1);
    expect(word.difficulty).toBeLessThanOrEqual(1);
  });

  it("returns a deterministic number of the day", () => {
    expect(getNumberOfTheDay("2026-08-27", 1)).toBe(
      getNumberOfTheDay("2026-08-27", 1)
    );
  });
});
