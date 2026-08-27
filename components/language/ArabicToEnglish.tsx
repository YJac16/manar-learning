"use client";

import { MagnetTile } from "@/components/learning/MagnetTile";
import { getWordOptions } from "@/lib/learning/options";
import type { VocabularyWord } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import { useMemo, useState } from "react";

export interface ArabicToEnglishProps {
  word: VocabularyWord;
  options?: VocabularyWord[];
  onAnswer?: (correct: boolean) => void;
  onComplete?: (correct: boolean) => void;
  className?: string;
}

export function ArabicToEnglish({
  word,
  options,
  onAnswer,
  onComplete,
  className,
}: ArabicToEnglishProps) {
  const choices = useMemo(
    () => options ?? getWordOptions(word, 4),
    [options, word]
  );
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");

  const pick = (choice: VocabularyWord) => {
    if (status !== "idle") return;
    const correct = choice.id === word.id;
    setStatus(correct ? "correct" : "wrong");
    onAnswer?.(correct);
    onComplete?.(correct);
  };

  return (
    <div className={cn("flex flex-col items-center gap-6", className)}>
      <p
        className="font-arabic text-4xl font-bold text-[#0E625B]"
        dir="rtl"
        lang="ar"
      >
        {word.arabic}
      </p>
      <p className="text-[#172525]/80">Choose the English word</p>
      <div className="flex flex-wrap justify-center gap-3">
        {choices.map((c) => (
          <MagnetTile
            key={c.id}
            label={c.english.toUpperCase()}
            size="md"
            disabled={status !== "idle"}
            onClick={() => pick(c)}
            colorScheme="emerald"
          />
        ))}
      </div>
      <div aria-live="polite" className="min-h-8 font-medium">
        {status === "correct" && (
          <p className="flex items-center gap-2 text-[#073B3A]">
            <Check className="h-5 w-5" aria-hidden /> Correct!
          </p>
        )}
        {status === "wrong" && (
          <p className="flex items-center gap-2">
            <X className="h-5 w-5" aria-hidden /> Almost! Let&apos;s look again.
          </p>
        )}
      </div>
    </div>
  );
}
