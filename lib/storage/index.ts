import type { LearnerProgress } from "@/lib/types";

export const STORAGE_KEY = "manar:v1";

export function createDefaultProgress(): LearnerProgress {
  return {
    version: 1,
    currentLevel: 1,
    xp: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    wordsSeen: [],
    wordsPracticed: [],
    wordsMastered: [],
    wordMastery: {},
    mathsQuestions: 0,
    mathsCorrect: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastCompletedDate: null,
    activityHistory: [],
    settings: {
      soundEnabled: true,
      reducedMotion: false,
    },
    recentWordIds: [],
  };
}

export interface StorageService {
  getProgress(): LearnerProgress | null;
  saveProgress(progress: LearnerProgress): void;
  reset(): void;
  isAvailable(): boolean;
}

export class LocalStorageService implements StorageService {
  private key: string;

  constructor(key: string = STORAGE_KEY) {
    this.key = key;
  }

  isAvailable(): boolean {
    try {
      if (typeof window === "undefined" || !window.localStorage) return false;
      const test = "__manar_test__";
      window.localStorage.setItem(test, "1");
      window.localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  getProgress(): LearnerProgress | null {
    try {
      if (!this.isAvailable()) return null;
      const raw = window.localStorage.getItem(this.key);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as Partial<LearnerProgress>;
      if (parsed.version !== 1 || typeof parsed.xp !== "number") {
        return null;
      }
      return { ...createDefaultProgress(), ...parsed, version: 1 };
    } catch {
      return null;
    }
  }

  saveProgress(progress: LearnerProgress): void {
    try {
      if (!this.isAvailable()) return;
      window.localStorage.setItem(this.key, JSON.stringify(progress));
    } catch {
      // Fail gracefully when storage is full or blocked.
    }
  }

  reset(): void {
    try {
      if (!this.isAvailable()) return;
      window.localStorage.removeItem(this.key);
    } catch {
      // ignore
    }
  }
}

/** Future: CloudStorageService implementing StorageService */

let singleton: StorageService | null = null;

export function getStorageService(): StorageService {
  if (!singleton) {
    singleton = new LocalStorageService();
  }
  return singleton;
}

export function getOrCreateProgress(): LearnerProgress {
  const storage = getStorageService();
  return storage.getProgress() ?? createDefaultProgress();
}
