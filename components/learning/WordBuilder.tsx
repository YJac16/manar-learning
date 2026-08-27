"use client";

import { MagnetTile } from "@/components/learning/MagnetTile";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import { Check, RotateCcw } from "lucide-react";

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function distractors(word: string, count: number): string[] {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const needed = word.toUpperCase().split("");
  const pool = alphabet.filter((l) => !needed.includes(l));
  return shuffle(pool).slice(0, count);
}

export interface WordBuilderProps {
  word: string;
  onComplete?: (correct: boolean) => void;
  className?: string;
}

export function WordBuilder({ word, onComplete, className }: WordBuilderProps) {
  const target = word.toUpperCase();
  const letters = useMemo(() => {
    const needed = target.split("");
    const extras = distractors(target, Math.max(3, 6 - needed.length));
    return shuffle([...needed, ...extras]);
  }, [target]);

  const [slots, setSlots] = useState<(string | null)[]>(
    () => Array(target.length).fill(null)
  );
  const [used, setUsed] = useState<boolean[]>(() => letters.map(() => false));
  const [status, setStatus] = useState<"building" | "correct" | "wrong">(
    "building"
  );

  const place = (index: number) => {
    if (used[index] || status === "correct") return;
    const nextEmpty = slots.findIndex((s) => s === null);
    if (nextEmpty === -1) return;
    const nextSlots = [...slots];
    nextSlots[nextEmpty] = letters[index];
    const nextUsed = [...used];
    nextUsed[index] = true;
    setSlots(nextSlots);
    setUsed(nextUsed);
    setStatus("building");

    if (nextSlots.every((s) => s !== null)) {
      const built = nextSlots.join("");
      if (built === target) {
        setStatus("correct");
        onComplete?.(true);
      } else {
        setStatus("wrong");
        onComplete?.(false);
      }
    }
  };

  const removeSlot = (slotIndex: number) => {
    if (status === "correct") return;
    const letter = slots[slotIndex];
    if (!letter) return;
    const poolIndex = letters.findIndex((l, i) => l === letter && used[i]);
    // find the used instance matching this letter that was placed
    let found = -1;
    for (let i = 0; i < letters.length; i++) {
      if (letters[i] === letter && used[i]) {
        // prefer matching from end of used sequence - simpler: first unused reverse
        found = i;
      }
    }
    // Better: track placement order. Simpler approach - find first used matching letter
    found = used.findIndex((u, i) => u && letters[i] === letter);
    if (found === -1) return;
    const nextSlots = [...slots];
    nextSlots[slotIndex] = null;
    const nextUsed = [...used];
    nextUsed[found] = false;
    setSlots(nextSlots);
    setUsed(nextUsed);
    setStatus("building");
  };

  const reset = () => {
    setSlots(Array(target.length).fill(null));
    setUsed(letters.map(() => false));
    setStatus("building");
  };

  return (
    <div className={cn("flex flex-col items-center gap-6", className)}>
      <div
        className="flex flex-wrap justify-center gap-2"
        role="group"
        aria-label={`Spell ${word}`}
      >
        {slots.map((slot, i) => (
          <button
            key={i}
            type="button"
            onClick={() => removeSlot(i)}
            className={cn(
              "flex h-16 w-14 items-center justify-center rounded-xl border-2 border-dashed text-2xl font-bold sm:h-20 sm:w-16",
              slot
                ? "border-[#0E625B] bg-[#F8F4E8] text-[#073B3A]"
                : "border-[#DCCBA7] bg-white/50 text-[#DCCBA7]",
              status === "correct" && "border-[#0E625B] bg-[#0E625B]/10",
              status === "wrong" &&
                slot &&
                "border-red-700/60 motion-safe:animate-[magnet-shake_0.4s_ease-in-out]"
            )}
            aria-label={slot ? `Remove ${slot}` : `Empty letter slot ${i + 1}`}
          >
            {slot ?? "·"}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {letters.map((letter, i) => (
          <MagnetTile
            key={`${letter}-${i}`}
            label={letter}
            disabled={used[i] || status === "correct"}
            onClick={() => place(i)}
            colorScheme={i % 2 === 0 ? "emerald" : "teal"}
          />
        ))}
      </div>

      <div className="flex min-h-8 items-center gap-2 text-center" aria-live="polite">
        {status === "correct" && (
          <p className="flex items-center gap-2 text-lg font-semibold text-[#073B3A]">
            <Check className="h-5 w-5" aria-hidden />
            Excellent! You built {word.toUpperCase()}!
          </p>
        )}
        {status === "wrong" && (
          <p className="text-lg font-medium text-[#172525]">
            Almost! Let&apos;s try again.
            <button
              type="button"
              onClick={reset}
              className="ml-3 inline-flex items-center gap-1 text-[#0E625B] underline"
            >
              <RotateCcw className="h-4 w-4" /> Reset
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
