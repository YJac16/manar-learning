import { VOCABULARY } from "@/data/vocabulary";
import type { VocabularyWord } from "@/lib/types";

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Correct word plus distractors from the same or nearby difficulty. */
export function getWordOptions(
  word: VocabularyWord,
  count: number = 4
): VocabularyWord[] {
  const pool = VOCABULARY.filter((w) => w.id !== word.id);
  const sameCat = pool.filter((w) => w.category === word.category);
  const rest = pool.filter((w) => w.category !== word.category);
  const distractors = shuffle([
    ...shuffle(sameCat).slice(0, Math.max(1, count - 2)),
    ...shuffle(rest),
  ]).slice(0, count - 1);
  return shuffle([word, ...distractors]);
}
