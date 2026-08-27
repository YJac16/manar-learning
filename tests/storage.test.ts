import { afterEach, describe, expect, it } from "vitest";
import {
  LocalStorageService,
  STORAGE_KEY,
  createDefaultProgress,
} from "@/lib/storage";

describe("LocalStorageService", () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  it("returns null for a new user", () => {
    const storage = new LocalStorageService();
    expect(storage.getProgress()).toBeNull();
  });

  it("saves and loads returning user progress", () => {
    const storage = new LocalStorageService();
    const progress = createDefaultProgress();
    progress.xp = 42;
    storage.saveProgress(progress);
    expect(storage.getProgress()?.xp).toBe(42);
  });

  it("resets progress", () => {
    const storage = new LocalStorageService();
    storage.saveProgress(createDefaultProgress());
    storage.reset();
    expect(storage.getProgress()).toBeNull();
  });

  it("handles corrupt storage", () => {
    window.localStorage.setItem(STORAGE_KEY, "{not-json");
    const storage = new LocalStorageService();
    expect(storage.getProgress()).toBeNull();
  });

  it("rejects invalid schema versions", () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: 99, xp: 10 })
    );
    const storage = new LocalStorageService();
    expect(storage.getProgress()).toBeNull();
  });

  it("createDefaultProgress has expected defaults", () => {
    const p = createDefaultProgress();
    expect(p.version).toBe(1);
    expect(p.currentLevel).toBe(1);
    expect(p.settings.soundEnabled).toBe(true);
  });
});
