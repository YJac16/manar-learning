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

const ARABIC_ALPHABET =
  "ابتثجحخدذرزسشصضطظعغفقكلمنهوي".split("");

function arabicDistractors(needed: string[], count: number): string[] {
  const pool = ARABIC_ALPHABET.filter((l) => !needed.includes(l));
  return shuffle(pool).slice(0, count);
}

function stripHarakat(text: string): string {
  return text.replace(/[\u064B-\u065F\u0670]/g, "");
}

export interface ArabicWordBuilderProps {
  word: string;
  onComplete?: (correct: boolean) => void;
  className?: string;
}

export function ArabicWordBuilder({
  word,
  onComplete,
  className,
}: ArabicWordBuilderProps) {
  const targetChars = useMemo(
    () => Array.from(stripHarakat(word)),
    [word]
  );

  const letters = useMemo(() => {
    const needed = [...targetChars];
    const extras = arabicDistractors(needed, Math.max(3, 6 - needed.length));
    return shuffle([...needed, ...extras]);
  }, [targetChars]);

  const [slots, setSlots] = useState<(string | null)[]>(
    () => Array(targetChars.length).fill(null)
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
      if (built === targetChars.join("")) {
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
    const found = used.findIndex((u, i) => u && letters[i] === letter);
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
    setSlots(Array(targetChars.length).fill(null));
    setUsed(letters.map(() => false));
    setStatus("building");
  };

  return (
    <div className={cn("flex flex-col items-center gap-6", className)}>
      <div
        dir="rtl"
        className="flex flex-wrap justify-center gap-2"
        role="group"
        aria-label={`Build the Arabic word ${word}`}
      >
        {slots.map((slot, i) => (
          <button
            key={i}
            type="button"
            onClick={() => removeSlot(i)}
            className={cn(
              "flex h-16 w-14 items-center justify-center rounded-xl border-2 border-dashed font-arabic text-2xl font-bold sm:h-20 sm:w-16 sm:text-3xl",
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

      <div dir="rtl" className="flex flex-wrap justify-center gap-3">
        {letters.map((letter, i) => (
          <MagnetTile
            key={`${letter}-${i}`}
            label={letter}
            variant="arabic"
            disabled={used[i] || status === "correct"}
            onClick={() => place(i)}
            colorScheme={i % 2 === 0 ? "emerald" : "gold"}
          />
        ))}
      </div>

      <div className="flex min-h-8 items-center gap-2 text-center" aria-live="polite">
        {status === "correct" && (
          <p className="flex items-center gap-2 text-lg font-semibold text-[#073B3A]">
            <Check className="h-5 w-5" aria-hidden />
            <span dir="rtl" className="font-arabic">
              {word}
            </span>
            — Excellent!
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
              <RotateCcw className="h-4 w-4" aria-hidden /> Reset
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
