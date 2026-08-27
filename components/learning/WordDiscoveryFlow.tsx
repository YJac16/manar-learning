"use client";

import { ArabicWordBuilder } from "@/components/learning/ArabicWordBuilder";
import { PronunciationButton } from "@/components/learning/PronunciationButton";
import { VocabularyImage } from "@/components/learning/VocabularyImage";
import { WordBuilder } from "@/components/learning/WordBuilder";
import { Button } from "@/components/ui/button";
import type { VocabularyWord } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ArrowRight, Mic } from "lucide-react";
import { useState } from "react";

const STEPS = ["Look", "Listen", "Build", "Say", "Use"] as const;

export interface WordDiscoveryFlowProps {
  word: VocabularyWord;
  onComplete?: () => void;
  soundEnabled?: boolean;
  className?: string;
}

export function WordDiscoveryFlow({
  word,
  onComplete,
  soundEnabled = true,
  className,
}: WordDiscoveryFlowProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const step = STEPS[stepIndex];
  const isLast = stepIndex === STEPS.length - 1;

  const advance = () => {
    if (isLast) {
      onComplete?.();
      return;
    }
    setStepIndex((i) => i + 1);
  };

  return (
    <div className={cn("flex flex-col items-center gap-8", className)}>
      <nav aria-label="Discovery steps" className="flex flex-wrap justify-center gap-2">
        {STEPS.map((s, i) => (
          <span
            key={s}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold sm:text-base",
              i === stepIndex
                ? "bg-[#0E625B] text-[#F8F4E8]"
                : i < stepIndex
                  ? "bg-[#E5C77B] text-[#172525]"
                  : "bg-[#DCCBA7]/50 text-[#172525]/60"
            )}
            aria-current={i === stepIndex ? "step" : undefined}
          >
            {s}
          </span>
        ))}
      </nav>

      <div className="flex w-full max-w-lg flex-col items-center gap-6">
        {step === "Look" && (
          <>
            <h2 className="font-display text-2xl font-bold text-[#073B3A]">
              Look at this word
            </h2>
            <VocabularyImage word={word} priority />
          </>
        )}

        {step === "Listen" && (
          <>
            <h2 className="font-display text-2xl font-bold text-[#073B3A]">
              Listen carefully
            </h2>
            <VocabularyImage word={word} />
            <div className="flex flex-wrap justify-center gap-4">
              <PronunciationButton
                text={word.english}
                lang="en"
                soundEnabled={soundEnabled}
              />
              <PronunciationButton
                text={word.arabic}
                lang="ar"
                label="Hear Arabic"
                soundEnabled={soundEnabled}
              />
              <PronunciationButton
                text={word.english}
                lang="en"
                slow
                soundEnabled={soundEnabled}
              />
            </div>
          </>
        )}

        {step === "Build" && (
          <>
            <h2 className="font-display text-2xl font-bold text-[#073B3A]">
              Build the word
            </h2>
            <VocabularyImage word={word} className="scale-90" />
            <WordBuilder word={word.english} />
            <p className="text-center text-base text-[#172525]/80">
              Now build it in Arabic:
            </p>
            <ArabicWordBuilder word={word.arabic} />
          </>
        )}

        {step === "Say" && (
          <>
            <h2 className="font-display text-2xl font-bold text-[#073B3A]">
              Say it aloud
            </h2>
            <VocabularyImage word={word} />
            <div className="flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-[#C89B3C] bg-[#F8F4E8] p-8 text-center">
              <Mic className="h-12 w-12 text-[#0E625B]" aria-hidden />
              <p className="text-xl font-semibold text-[#073B3A]">
                Say &ldquo;{word.english}&rdquo; out loud!
              </p>
              <p dir="rtl" className="font-arabic text-2xl text-[#0E625B]">
                {word.arabic}
              </p>
              <p className="text-base text-[#172525]/70">
                No recording — just practice with your voice.
              </p>
            </div>
          </>
        )}

        {step === "Use" && (
          <>
            <h2 className="font-display text-2xl font-bold text-[#073B3A]">
              Use it in a sentence
            </h2>
            <VocabularyImage word={word} />
            <blockquote className="max-w-md rounded-2xl bg-[#F8F4E8] p-6 text-center">
              <p className="text-lg font-medium text-[#172525]">
                {word.exampleSentenceEn}
              </p>
              <p
                dir="rtl"
                className="mt-3 font-arabic text-lg text-[#0E625B]"
              >
                {word.exampleSentenceAr}
              </p>
            </blockquote>
          </>
        )}
      </div>

      <Button
        type="button"
        variant="gold"
        size="xl"
        onClick={advance}
        className="min-w-48"
      >
        {isLast ? "Finish" : "Next"}
        {!isLast && <ArrowRight className="h-5 w-5" aria-hidden />}
      </Button>
    </div>
  );
}
