"use client";

import { getWordOptions } from "@/lib/learning/options";
import type { VocabularyWord } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

export interface MatchPictureProps {
  word: VocabularyWord;
  options?: VocabularyWord[];
  onAnswer?: (correct: boolean) => void;
  onComplete?: (correct: boolean) => void;
  className?: string;
}

export function MatchPicture({
  word,
  options,
  onAnswer,
  onComplete,
  className,
}: MatchPictureProps) {
  const choices = useMemo(
    () => options ?? getWordOptions(word, 3),
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
      <p className="font-display text-3xl font-bold text-[#073B3A]">
        {word.english.toUpperCase()}
      </p>
      <p className="text-[#172525]/80">Tap the matching picture</p>
      <div className="grid grid-cols-3 gap-3">
        {choices.map((c) => (
          <button
            key={c.id}
            type="button"
            disabled={status !== "idle"}
            onClick={() => pick(c)}
            className={cn(
              "rounded-2xl border-2 border-[#DCCBA7] bg-[#F8F4E8] p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C89B3C]",
              status !== "idle" && c.id === word.id && "border-[#0E625B] ring-2 ring-[#0E625B]"
            )}
            aria-label={c.english}
          >
            <Image
              src={c.imageUrl}
              alt={c.imageAlt}
              width={100}
              height={100}
              className="mx-auto"
            />
          </button>
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
