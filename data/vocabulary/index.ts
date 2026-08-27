import type { Category, Difficulty, VocabularyWord } from "@/lib/types";

export { VOCABULARY } from "./words";
import { VOCABULARY } from "./words";

export function getWordById(id: string): VocabularyWord | undefined {
  return VOCABULARY.find((word) => word.id === id);
}

export function getWordsByDifficulty(maxDifficulty: Difficulty): VocabularyWord[] {
  return VOCABULARY.filter((word) => word.difficulty <= maxDifficulty);
}

export function getWordsByCategory(category: Category): VocabularyWord[] {
  return VOCABULARY.filter((word) => word.category === category);
}
