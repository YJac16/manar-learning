"use client";

import { useProgress } from "@/components/progress/ProgressProvider";
import { PictureToWord } from "@/components/language/PictureToWord";
import { MissingLetter } from "@/components/language/MissingLetter";
import { MatchPicture } from "@/components/language/MatchPicture";
import { EnglishToArabic } from "@/components/language/EnglishToArabic";
import { ArabicToEnglish } from "@/components/language/ArabicToEnglish";
import { WordBuilder } from "@/components/learning/WordBuilder";
import { ArabicWordBuilder } from "@/components/learning/ArabicWordBuilder";
import { VisualMathQuestion } from "@/components/mathematics/VisualMathQuestion";
import { Button } from "@/components/ui/button";
import { VOCABULARY } from "@/data/vocabulary";
import { generateMathQuestion } from "@/lib/mathematics";
import { recordMathAnswer, recordWordAnswer } from "@/lib/progression";
import { hashString } from "@/lib/utils";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

type Mode =
  | "menu"
  | "picture"
  | "missing"
  | "match"
  | "spell"
  | "en-ar"
  | "ar-en"
  | "ar-build"
  | "maths";

function PracticeInner() {
  const { progress, updateProgress } = useProgress();
  const params = useSearchParams();
  const initial = params.get("mode") === "maths" ? "maths" : "menu";
  const [mode, setMode] = useState<Mode>(initial as Mode);
  const [round, setRound] = useState(0);

  const word = useMemo(() => {
    const pool = VOCABULARY.filter(
      (w) => w.difficulty <= progress.currentLevel
    );
    const idx =
      hashString(`practice-${mode}-${round}-${progress.xp}`) % pool.length;
    return pool[idx] ?? VOCABULARY[0];
  }, [mode, round, progress.currentLevel, progress.xp]);

  const maths = useMemo(
    () =>
      generateMathQuestion(
        progress.currentLevel,
        null,
        `practice-math-${round}`
      ),
    [progress.currentLevel, round]
  );

  const next = () => setRound((r) => r + 1);

  if (mode === "menu") {
    return (
      <div className="space-y-6">
        <header>
          <h1 className="font-display text-2xl font-semibold text-[#073B3A]">
            Practice
          </h1>
          <p className="text-[#172525]/80">
            Pick an activity — tap the magnets and learn.
          </p>
        </header>
        <div className="grid gap-3 sm:grid-cols-2">
          {(
            [
              ["picture", "Picture → Word"],
              ["missing", "Missing Letter"],
              ["spell", "Build the Word"],
              ["match", "Match Picture"],
              ["en-ar", "English → Arabic"],
              ["ar-en", "Arabic → English"],
              ["ar-build", "Build Arabic"],
              ["maths", "Visual Maths"],
            ] as const
          ).map(([id, label]) => (
            <Button
              key={id}
              variant={id === "maths" ? "gold" : "primary"}
              className="min-h-16 justify-start text-left"
              onClick={() => setMode(id)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <Button variant="ghost" size="sm" onClick={() => setMode("menu")}>
          ← Menu
        </Button>
        <Button variant="outline" size="sm" onClick={next}>
          Next
        </Button>
      </div>
      <div className="manar-arch-frame bg-white/80 p-5">
        {mode === "picture" && (
          <PictureToWord
            word={word}
            onComplete={(c) => {
              updateProgress((p) => recordWordAnswer(p, word.id, c));
              setTimeout(next, 700);
            }}
          />
        )}
        {mode === "missing" && (
          <MissingLetter
            word={word}
            onComplete={(c) => {
              updateProgress((p) => recordWordAnswer(p, word.id, c));
              setTimeout(next, 700);
            }}
          />
        )}
        {mode === "match" && (
          <MatchPicture
            word={word}
            onComplete={(c) => {
              updateProgress((p) => recordWordAnswer(p, word.id, c));
              setTimeout(next, 700);
            }}
          />
        )}
        {mode === "spell" && (
          <WordBuilder
            word={word.english}
            onComplete={(c) => {
              updateProgress((p) => recordWordAnswer(p, word.id, c));
              if (c) setTimeout(next, 700);
            }}
          />
        )}
        {mode === "en-ar" && (
          <EnglishToArabic
            word={word}
            onComplete={(c) => {
              updateProgress((p) => recordWordAnswer(p, word.id, c));
              setTimeout(next, 700);
            }}
          />
        )}
        {mode === "ar-en" && (
          <ArabicToEnglish
            word={word}
            onComplete={(c) => {
              updateProgress((p) => recordWordAnswer(p, word.id, c));
              setTimeout(next, 700);
            }}
          />
        )}
        {mode === "ar-build" && (
          <ArabicWordBuilder
            word={word.arabic}
            onComplete={(c) => {
              updateProgress((p) => recordWordAnswer(p, word.id, c));
              if (c) setTimeout(next, 700);
            }}
          />
        )}
        {mode === "maths" && (
          <VisualMathQuestion
            key={maths.id}
            question={maths}
            showVisual
            onAnswer={(c) => {
              updateProgress((p) => recordMathAnswer(p, c));
              setTimeout(next, 900);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default function PracticePage() {
  return (
    <Suspense fallback={<p className="text-center">Loading practice…</p>}>
      <PracticeInner />
    </Suspense>
  );
}
