"use client";

import { MagnetTile } from "@/components/learning/MagnetTile";
import { getWordOptions } from "@/lib/learning/options";
import type { VocabularyWord } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

export interface PictureToWordProps {
  word: VocabularyWord;
  options?: VocabularyWord[];
  onAnswer?: (correct: boolean) => void;
  onComplete?: (correct: boolean) => void;
  className?: string;
}

export function PictureToWord({
  word,
  options,
  onAnswer,
  onComplete,
  className,
}: PictureToWordProps) {
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
      <Image
        src={word.imageUrl}
        alt={word.imageAlt}
        width={180}
        height={180}
        className="rounded-2xl border-2 border-[#DCCBA7] bg-[#F8F4E8] p-3"
      />
      <p className="text-xl font-semibold text-[#073B3A]">What is this?</p>
      <div className="flex flex-wrap justify-center gap-3">
        {choices.map((c) => (
          <MagnetTile
            key={c.id}
            label={c.english.toUpperCase()}
            size="md"
            colorScheme={c.id === word.id && status !== "idle" ? "gold" : "emerald"}
            disabled={status !== "idle"}
            onClick={() => pick(c)}
            wrong={status === "wrong" && c.id !== word.id}
          />
        ))}
      </div>
      <div aria-live="polite" className="min-h-8 text-center font-medium">
        {status === "correct" && (
          <p className="flex items-center justify-center gap-2 text-[#073B3A]">
            <Check className="h-5 w-5" aria-hidden /> Correct!
          </p>
        )}
        {status === "wrong" && (
          <p className="flex items-center justify-center gap-2 text-[#172525]">
            <X className="h-5 w-5" aria-hidden /> Almost! Let&apos;s look again.
          </p>
        )}
      </div>
    </div>
  );
}
