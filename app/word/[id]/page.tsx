"use client";

import { WordDiscoveryFlow } from "@/components/learning/WordDiscoveryFlow";
import { useProgress } from "@/components/progress/ProgressProvider";
import { getWordById } from "@/data/vocabulary";
import { XP, recordWordAnswer, recordWordSeen } from "@/lib/progression";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function WordPage() {
  const params = useParams<{ id: string }>();
  const word = getWordById(params.id);
  const { updateProgress, settings } = useProgress();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (word) {
      updateProgress((p) => recordWordSeen(p, word.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [word?.id]);

  if (!word) {
    return (
      <div className="space-y-4 text-center">
        <p>Word not found.</p>
        <Link href="/" className={cn(buttonVariants())}>
          Home
        </Link>
      </div>
    );
  }

  if (done) {
    return (
      <div className="manar-arch-frame space-y-4 bg-white/80 p-8 text-center">
        <h1 className="font-display text-2xl text-[#073B3A]">
          You built {word.english.toUpperCase()}!
        </h1>
        <p className="text-[#172525]/80">
          Come back tomorrow for a new word.
        </p>
        <Link href="/" className={cn(buttonVariants({ variant: "gold" }))}>
          Home
        </Link>
      </div>
    );
  }

  return (
    <WordDiscoveryFlow
      word={word}
      soundEnabled={settings.soundEnabled}
      onComplete={() => {
        updateProgress((p) =>
          recordWordAnswer(p, word.id, true, XP.wordOfTheDay)
        );
        setDone(true);
      }}
    />
  );
}
