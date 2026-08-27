"use client";

import { getPronunciationService } from "@/lib/pronunciation";
import type { SpeechLanguage } from "@/lib/pronunciation";
import { cn } from "@/lib/utils";
import { Volume2 } from "lucide-react";
import { useCallback, useState } from "react";

export interface PronunciationButtonProps {
  text: string;
  lang: SpeechLanguage;
  label?: string;
  slow?: boolean;
  soundEnabled?: boolean;
  className?: string;
}

export function PronunciationButton({
  text,
  lang,
  label,
  slow = false,
  soundEnabled = true,
  className,
}: PronunciationButtonProps) {
  const [speaking, setSpeaking] = useState(false);

  const speak = useCallback(async () => {
    if (!soundEnabled) return;
    const service = getPronunciationService();
    if (!service.isAvailable()) return;
    setSpeaking(true);
    try {
      await service.speak({ text, lang, slow });
    } finally {
      setSpeaking(false);
    }
  }, [text, lang, slow, soundEnabled]);

  const displayLabel = label ?? (slow ? "Slow" : "Hear it");

  return (
    <button
      type="button"
      onClick={speak}
      disabled={!soundEnabled || speaking}
      aria-label={`${displayLabel}: ${text}`}
      className={cn(
        "inline-flex min-h-14 items-center gap-3 rounded-2xl border-2 border-[#0E625B] bg-[#F8F4E8] px-6 py-3",
        "text-lg font-semibold text-[#073B3A] shadow-md",
        "touch-manipulation transition-[transform,opacity] active:scale-[0.98]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C89B3C]",
        "disabled:cursor-not-allowed disabled:opacity-40",
        className
      )}
    >
      <Volume2 className="h-6 w-6 shrink-0 text-[#0E625B]" aria-hidden />
      {displayLabel}
    </button>
  );
}
