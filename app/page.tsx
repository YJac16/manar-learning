"use client";

import { GeometricPattern } from "@/components/branding/GeometricPattern";
import { VocabularyImage } from "@/components/learning/VocabularyImage";
import { PronunciationButton } from "@/components/learning/PronunciationButton";
import { VisualMathQuestion } from "@/components/mathematics/VisualMathQuestion";
import { CountingObjects } from "@/components/learning/CountingObjects";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/components/progress/ProgressProvider";
import { getNumberOfTheDay, getWordOfTheDay } from "@/lib/learning/wordOfTheDay";
import { getSumOfTheDay } from "@/lib/mathematics";
import {
  XP,
  recordMathAnswer,
  recordWordSeen,
} from "@/lib/progression";
import { cn, localDateKey } from "@/lib/utils";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Sparkles } from "lucide-react";

export default function HomePage() {
  const { progress, isLoaded, updateProgress, settings } = useProgress();
  const today = useMemo(() => localDateKey(), []);
  const word = useMemo(
    () => getWordOfTheDay(today, progress.currentLevel, progress),
    [today, progress]
  );
  const number = useMemo(
    () => getNumberOfTheDay(today, progress.currentLevel),
    [today, progress.currentLevel]
  );
  const sum = useMemo(
    () => getSumOfTheDay(today, progress.currentLevel),
    [today, progress.currentLevel]
  );
  const [sumDone, setSumDone] = useState(false);
  const [showSum, setShowSum] = useState(false);

  if (!isLoaded) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-[#0E625B]">
        Loading MANĀR…
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl manar-arch-frame bg-white/70 px-5 py-8 sm:px-8">
        <GeometricPattern className="pointer-events-none absolute -right-6 -top-6 opacity-40" />
        <p className="font-display text-sm font-semibold tracking-wide text-[#C89B3C]">
          TODAY
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-[#073B3A] sm:text-4xl">
          Assalamu Alaikum!
        </h1>
        <p className="mt-2 max-w-xl text-lg text-[#172525]/80">
          Ready to learn something new today?
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm text-[#0E625B]">
          <span className="rounded-full bg-[#0E625B]/10 px-3 py-1">
            Level {progress.currentLevel}
          </span>
          <span className="rounded-full bg-[#C89B3C]/15 px-3 py-1">
            {progress.xp} XP
          </span>
          <span className="rounded-full bg-[#DCCBA7]/50 px-3 py-1">
            Streak {progress.currentStreak}
          </span>
        </div>
      </section>

      <section className="space-y-3" aria-labelledby="wotd-heading">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#C89B3C]" aria-hidden />
          <h2
            id="wotd-heading"
            className="font-display text-xl font-semibold text-[#073B3A]"
          >
            Word of the Day
          </h2>
        </div>
        <article className="manar-arch-frame bg-white/80 p-5 sm:p-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <VocabularyImage word={word} className="shrink-0" />
            <div className="flex-1 text-center sm:text-left">
              <p className="font-display text-4xl font-bold tracking-wide text-[#073B3A]">
                {word.english.toUpperCase()}
              </p>
              <p
                className="font-arabic mt-1 text-3xl text-[#0E625B]"
                dir="rtl"
                lang="ar"
              >
                {word.arabic}
              </p>
              <p className="mt-1 text-[#C89B3C]">{word.transliteration}</p>
              <p className="text-sm text-[#172525]/70">
                &ldquo;{word.phonetic}&rdquo;
              </p>
              <p className="mt-3 text-[#172525]/90">{word.definition}</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
                <PronunciationButton
                  text={word.english}
                  lang="en"
                  soundEnabled={settings.soundEnabled}
                />
                <PronunciationButton
                  text={word.arabic}
                  lang="ar"
                  label="Arabic"
                  soundEnabled={settings.soundEnabled}
                />
                <Link
                  href={`/word/${word.id}`}
                  className={cn(buttonVariants({ variant: "gold" }))}
                  onClick={() =>
                    updateProgress((p) => recordWordSeen(p, word.id))
                  }
                >
                  Build it
                </Link>
                <Link
                  href="/learn"
                  className={cn(buttonVariants({ variant: "outline" }))}
                >
                  Start today&apos;s lesson
                </Link>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <article className="manar-arch-frame bg-white/80 p-5">
          <h2 className="font-display text-lg font-semibold text-[#073B3A]">
            Number of the Day
          </h2>
          <p className="mt-2 font-display text-5xl font-bold text-[#0E625B]">
            {number}
          </p>
          <div className="mt-4">
            <CountingObjects count={number} kind="stars" />
          </div>
          <Link
            href="/practice?mode=maths"
            className={cn(buttonVariants({ variant: "outline" }), "mt-4 inline-flex")}
          >
            Explore
          </Link>
        </article>

        <article className="manar-arch-frame bg-white/80 p-5">
          <h2 className="font-display text-lg font-semibold text-[#073B3A]">
            Sum of the Day
          </h2>
          {!showSum ? (
            <div className="mt-4 space-y-4">
              <p className="text-[#172525]/80">
                A little maths discovery awaits.
              </p>
              <Button variant="gold" onClick={() => setShowSum(true)}>
                Solve
              </Button>
            </div>
          ) : (
            <div className="mt-4">
              <VisualMathQuestion
                question={sum}
                showVisual
                onAnswer={(correct) => {
                  if (sumDone) return;
                  setSumDone(true);
                  updateProgress((p) =>
                    recordMathAnswer(p, correct, correct ? XP.sumOfTheDay : 0)
                  );
                }}
              />
            </div>
          )}
        </article>
      </section>
    </div>
  );
}
