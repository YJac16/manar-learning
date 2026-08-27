"use client";

import { useProgress } from "@/components/progress/ProgressProvider";
import { GeometricPattern } from "@/components/branding/GeometricPattern";
import { getAccuracy } from "@/lib/progression";
import { getLevelConfig } from "@/data/levels";

export default function ProgressPage() {
  const { progress, isLoaded } = useProgress();

  if (!isLoaded) {
    return <p className="text-center text-[#0E625B]">Loading…</p>;
  }

  const level = getLevelConfig(progress.currentLevel);
  const accuracy = getAccuracy(progress);
  const xpToNext =
    progress.currentLevel >= 5
      ? null
      : ([0, 80, 200, 400, 700][progress.currentLevel] ?? 700) - progress.xp;

  return (
    <div className="space-y-6">
      <header className="relative overflow-hidden rounded-3xl manar-arch-frame bg-white/80 p-6">
        <GeometricPattern className="pointer-events-none absolute -right-4 top-0 opacity-30" />
        <p className="font-display text-sm tracking-wide text-[#C89B3C]">
          MANĀR
        </p>
        <h1 className="font-display text-3xl font-semibold text-[#073B3A]">
          Your Progress
        </h1>
        <p className="mt-1 text-[#172525]/80">
          Level {progress.currentLevel} — {level.name}
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <Stat label="XP" value={String(progress.xp)} />
        <Stat
          label="Current streak"
          value={`${progress.currentStreak} day${progress.currentStreak === 1 ? "" : "s"}`}
        />
        <Stat label="Longest streak" value={String(progress.longestStreak)} />
        <Stat label="Accuracy" value={`${accuracy}%`} />
        <Stat label="Words learned" value={String(progress.wordsSeen.length)} />
        <Stat
          label="Words mastered"
          value={String(progress.wordsMastered.length)}
        />
        <Stat
          label="Maths completed"
          value={String(progress.mathsQuestions)}
        />
        <Stat
          label="Maths correct"
          value={String(progress.mathsCorrect)}
        />
      </div>

      <div className="manar-arch-frame bg-white/80 p-5">
        <h2 className="font-display text-lg text-[#073B3A]">Level path</h2>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-[#DCCBA7]/50">
          <div
            className="h-full rounded-full bg-[#0E625B] transition-all"
            style={{
              width: `${Math.min(100, (progress.currentLevel / 5) * 100)}%`,
            }}
            role="progressbar"
            aria-valuenow={progress.currentLevel}
            aria-valuemin={1}
            aria-valuemax={5}
            aria-label="Current level"
          />
        </div>
        <p className="mt-2 text-sm text-[#172525]/70">
          {xpToNext == null
            ? "You have reached the highest introductory level."
            : `${Math.max(0, xpToNext)} XP until the next level.`}
        </p>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#DCCBA7]/70 bg-white/70 p-4">
      <p className="text-sm text-[#172525]/70">{label}</p>
      <p className="mt-1 font-display text-2xl font-semibold text-[#073B3A]">
        {value}
      </p>
    </div>
  );
}
