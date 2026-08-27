"use client";

import {
  checkStreakOnLoad,
  recordMathAnswer,
  recordWordAnswer,
} from "@/lib/progression";
import {
  LocalStorageService,
  createDefaultProgress,
} from "@/lib/storage";
import type { LearnerProgress, LearnerSettings } from "@/lib/types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface ProgressContextValue {
  progress: LearnerProgress;
  settings: LearnerSettings;
  isLoaded: boolean;
  updateProgress: (
    updater: (prev: LearnerProgress) => LearnerProgress
  ) => void;
  resetProgress: () => void;
  updateSettings: (patch: Partial<LearnerSettings>) => void;
  recordWord: (wordId: string, correct: boolean) => void;
  recordMath: (correct: boolean) => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

const storage = new LocalStorageService();

export interface ProgressProviderProps {
  children: ReactNode;
}

export function ProgressProvider({ children }: ProgressProviderProps) {
  const [progress, setProgress] = useState<LearnerProgress>(
    createDefaultProgress
  );
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = storage.getProgress() ?? createDefaultProgress();
    const withStreak = checkStreakOnLoad(stored);
    setProgress(withStreak);
    if (withStreak !== stored) {
      storage.saveProgress(withStreak);
    }
    setIsLoaded(true);
  }, []);

  const updateProgress = useCallback(
    (updater: (prev: LearnerProgress) => LearnerProgress) => {
      setProgress((prev) => {
        const next = updater(prev);
        storage.saveProgress(next);
        return next;
      });
    },
    []
  );

  const resetProgress = useCallback(() => {
    storage.reset();
    setProgress(createDefaultProgress());
  }, []);

  const updateSettings = useCallback(
    (patch: Partial<LearnerSettings>) => {
      updateProgress((prev) => ({
        ...prev,
        settings: { ...prev.settings, ...patch },
      }));
    },
    [updateProgress]
  );

  const recordWord = useCallback(
    (wordId: string, correct: boolean) => {
      updateProgress((prev) => recordWordAnswer(prev, wordId, correct));
    },
    [updateProgress]
  );

  const recordMath = useCallback(
    (correct: boolean) => {
      updateProgress((prev) => recordMathAnswer(prev, correct));
    },
    [updateProgress]
  );

  const value = useMemo<ProgressContextValue>(
    () => ({
      progress,
      settings: progress.settings,
      isLoaded,
      updateProgress,
      resetProgress,
      updateSettings,
      recordWord,
      recordMath,
    }),
    [
      progress,
      isLoaded,
      updateProgress,
      resetProgress,
      updateSettings,
      recordWord,
      recordMath,
    ]
  );

  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  );
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error("useProgress must be used within ProgressProvider");
  }
  return ctx;
}
