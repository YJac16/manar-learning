"use client";

import { MagnetTile } from "@/components/learning/MagnetTile";
import type { VocabularyWord } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import { useMemo, useState } from "react";

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export interface MissingLetterProps {
  word: VocabularyWord | string;
  missingIndex?: number;
  onAnswer?: (correct: boolean) => void;
  onComplete?: (correct: boolean) => void;
  className?: string;
}

export function MissingLetter({
  word,
  missingIndex,
  onAnswer,
  onComplete,
  className,
}: MissingLetterProps) {
  const target =
    typeof word === "string" ? word.toUpperCase() : word.english.toUpperCase();
  const letters = target.split("");
  const gapIndex =
    missingIndex ?? Math.max(1, Math.floor(letters.length / 2) - (letters.length > 2 ? 0 : 0));
  const idx = Math.min(gapIndex, letters.length - 1);
  const correctLetter = letters[idx];

  const choices = useMemo(() => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const pool = alphabet.filter((l) => l !== correctLetter);
    return shuffle([correctLetter, ...shuffle(pool).slice(0, 3)]);
  }, [correctLetter]);

  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");

  const pick = (letter: string) => {
    if (status !== "idle") return;
    const correct = letter === correctLetter;
    setStatus(correct ? "correct" : "wrong");
    onAnswer?.(correct);
    onComplete?.(correct);
  };

  return (
    <div className={cn("flex flex-col items-center gap-6", className)}>
      <p className="font-display text-3xl font-bold tracking-[0.3em] text-[#073B3A]">
        {letters.map((l, i) => (
          <span key={i} className="inline-block min-w-[1.2ch] text-center">
            {i === idx ? (status === "correct" ? correctLetter : "_") : l}
          </span>
        ))}
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {choices.map((letter) => (
          <MagnetTile
            key={letter}
            label={letter}
            size="lg"
            disabled={status === "correct"}
            onClick={() => pick(letter)}
            wrong={status === "wrong"}
            colorScheme="gold"
          />
        ))}
      </div>
      <div aria-live="polite" className="min-h-8 font-medium">
        {status === "correct" && (
          <p className="flex items-center gap-2 text-[#073B3A]">
            <Check className="h-5 w-5" aria-hidden /> Well done!
          </p>
        )}
        {status === "wrong" && (
          <p className="flex items-center gap-2">
            <X className="h-5 w-5" aria-hidden /> Almost! Try another letter.
          </p>
        )}
      </div>
    </div>
  );
}
