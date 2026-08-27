import { VOCABULARY } from "@/data/vocabulary";
import type { Difficulty, LearnerProgress, VocabularyWord } from "@/lib/types";
import { hashString, localDateKey } from "@/lib/utils";

export function getWordOfTheDay(
  date: Date | string = new Date(),
  level: Difficulty = 1,
  progress?: Pick<LearnerProgress, "wordsMastered" | "recentWordIds"> | null
): VocabularyWord {
  const dateKey = typeof date === "string" ? date : localDateKey(date);
  const mastered = new Set(progress?.wordsMastered ?? []);
  const recent = new Set(progress?.recentWordIds ?? []);

  let pool = VOCABULARY.filter(
    (w) => w.difficulty <= level && !mastered.has(w.id) && !recent.has(w.id)
  );

  if (pool.length === 0) {
    pool = VOCABULARY.filter((w) => w.difficulty <= level && !mastered.has(w.id));
  }
  if (pool.length === 0) {
    pool = VOCABULARY.filter((w) => w.difficulty <= level);
  }
  if (pool.length === 0) {
    pool = [...VOCABULARY];
  }

  const index = hashString(`manar-wotd:${dateKey}:L${level}`) % pool.length;
  return pool[index];
}

export function getNumberOfTheDay(
  date: Date | string = new Date(),
  level: Difficulty = 1
): number {
  const dateKey = typeof date === "string" ? date : localDateKey(date);
  const max = level <= 1 ? 5 : level <= 2 ? 10 : level <= 3 ? 20 : 12;
  const n = (hashString(`manar-number:${dateKey}`) % max) + 1;
  return n;
}
