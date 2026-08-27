"use client";

import { useProgress } from "@/components/progress/ProgressProvider";
import { VocabularyImage } from "@/components/learning/VocabularyImage";
import { PronunciationButton } from "@/components/learning/PronunciationButton";
import { PictureToWord } from "@/components/language/PictureToWord";
import { MissingLetter } from "@/components/language/MissingLetter";
import { EnglishToArabic } from "@/components/language/EnglishToArabic";
import { WordBuilder } from "@/components/learning/WordBuilder";
import { VisualMathQuestion } from "@/components/mathematics/VisualMathQuestion";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { getWordOfTheDay } from "@/lib/learning/wordOfTheDay";
import { generateMathQuestion } from "@/lib/mathematics";
import {
  XP,
  completeDailyLesson,
  recordMathAnswer,
  recordWordAnswer,
  recordWordSeen,
} from "@/lib/progression";
import { cn, localDateKey } from "@/lib/utils";
import Link from "next/link";
import { useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";

type Step =
  | "welcome"
  | "picture"
  | "spell"
  | "arabic"
  | "maths"
  | "done";

export default function LearnPage() {
  const { progress, isLoaded, updateProgress, settings } = useProgress();
  const today = useMemo(() => localDateKey(), []);
  const word = useMemo(
    () => getWordOfTheDay(today, progress.currentLevel, progress),
    [today, progress]
  );
  const maths = useMemo(
    () => generateMathQuestion(progress.currentLevel, null, `lesson-${today}`),
    [progress.currentLevel, today]
  );
  const [step, setStep] = useState<Step>("welcome");
  const [mathDone, setMathDone] = useState(false);

  if (!isLoaded) {
    return <p className="text-center text-[#0E625B]">Loading…</p>;
  }

  const finish = () => {
    updateProgress((p) => {
      let next = recordWordSeen(p, word.id);
      next = completeDailyLesson(next, word.id);
      next = {
        ...next,
        xp: next.xp + XP.wordOfTheDay,
      };
      return next;
    });
    setStep("done");
  };

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <header className="text-center">
        <p className="text-sm font-semibold tracking-wide text-[#C89B3C]">
          TODAY&apos;S LESSON
        </p>
        <h1 className="font-display text-2xl font-semibold text-[#073B3A]">
          A small discovery
        </h1>
      </header>

      {step === "welcome" && (
        <section className="manar-arch-frame space-y-4 bg-white/80 p-6 text-center">
          <VocabularyImage word={word} />
          <p className="font-display text-4xl font-bold text-[#073B3A]">
            {word.english.toUpperCase()}
          </p>
          <p className="font-arabic text-3xl text-[#0E625B]" dir="rtl" lang="ar">
            {word.arabic}
          </p>
          <PronunciationButton
            text={word.english}
            lang="en"
            soundEnabled={settings.soundEnabled}
          />
          <p className="text-[#172525]/80">{word.definition}</p>
          <Button
            variant="gold"
            className="w-full"
            onClick={() => {
              updateProgress((p) => recordWordSeen(p, word.id));
              setStep("picture");
            }}
          >
            Let&apos;s practise
          </Button>
        </section>
      )}

      {step === "picture" && (
        <section className="manar-arch-frame bg-white/80 p-6">
          <h2 className="mb-4 text-center font-display text-xl text-[#073B3A]">
            What is this?
          </h2>
          <PictureToWord
            word={word}
            onComplete={(correct) => {
              updateProgress((p) =>
                recordWordAnswer(p, word.id, correct, XP.correctAnswer)
              );
              setTimeout(() => setStep("spell"), 800);
            }}
          />
        </section>
      )}

      {step === "spell" && (
        <section className="manar-arch-frame space-y-4 bg-white/80 p-6">
          <h2 className="text-center font-display text-xl text-[#073B3A]">
            Build the word
          </h2>
          <MissingLetter
            word={word}
            onComplete={(correct) => {
              updateProgress((p) =>
                recordWordAnswer(p, word.id, correct, XP.correctAnswer)
              );
            }}
          />
          <div className="border-t border-[#DCCBA7]/60 pt-4">
            <WordBuilder
              word={word.english}
              onComplete={(correct) => {
                updateProgress((p) =>
                  recordWordAnswer(p, word.id, correct, XP.correctAnswer)
                );
                if (correct) setTimeout(() => setStep("arabic"), 600);
              }}
            />
          </div>
        </section>
      )}

      {step === "arabic" && (
        <section className="manar-arch-frame bg-white/80 p-6">
          <h2 className="mb-4 text-center font-display text-xl text-[#073B3A]">
            English → Arabic
          </h2>
          <EnglishToArabic
            word={word}
            onComplete={(correct) => {
              updateProgress((p) =>
                recordWordAnswer(p, word.id, correct, XP.correctAnswer)
              );
              setTimeout(() => setStep("maths"), 800);
            }}
          />
        </section>
      )}

      {step === "maths" && (
        <section className="manar-arch-frame bg-white/80 p-6">
          <h2 className="mb-4 text-center font-display text-xl text-[#073B3A]">
            A little maths
          </h2>
          <VisualMathQuestion
            question={maths}
            showVisual
            onAnswer={(correct) => {
              if (mathDone) return;
              setMathDone(true);
              updateProgress((p) => recordMathAnswer(p, correct));
              setTimeout(finish, 900);
            }}
          />
        </section>
      )}

      {step === "done" && (
        <section className="manar-arch-frame space-y-4 bg-white/80 p-8 text-center motion-safe:animate-soft-pop">
          <CheckCircle2
            className="mx-auto h-14 w-14 text-[#0E625B]"
            aria-hidden
          />
          <h2 className="font-display text-2xl font-semibold text-[#073B3A]">
            Today&apos;s word complete!
          </h2>
          <p className="text-lg text-[#172525]">
            You learned:{" "}
            <strong className="text-[#073B3A]">
              {word.english.toUpperCase()}
            </strong>
          </p>
          <p className="text-[#C89B3C]">+{XP.completedLesson + XP.wordOfTheDay} XP</p>
          <p className="text-[#172525]/80">
            Come back tomorrow for a new word!
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Link href="/" className={cn(buttonVariants({ variant: "gold" }))}>
              Home
            </Link>
            <Link
              href="/progress"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              See progress
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
