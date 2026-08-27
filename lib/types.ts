export type Category =
  | "animals"
  | "family"
  | "food"
  | "colours"
  | "numbers"
  | "home"
  | "nature"
  | "body"
  | "actions"
  | "objects";

export type Difficulty = 1 | 2 | 3 | 4 | 5;

export type MasteryLevel = 0 | 1 | 2 | 3 | 4; // unseen, introduced, practicing, familiar, mastered

export type MathOperation = "+" | "-" | "×" | "÷";

export type CountingObjectKind =
  | "apples"
  | "stars"
  | "blocks"
  | "balls"
  | "animals"
  | "shapes";

export interface VocabularyWord {
  id: string;
  english: string;
  arabic: string;
  transliteration: string;
  phonetic: string;
  definition: string;
  category: Category;
  difficulty: Difficulty;
  imageUrl: string;
  imageAlt: string;
  exampleSentenceEn: string;
  exampleSentenceAr: string;
  tags: string[];
}

export interface WordMastery {
  wordId: string;
  mastery: MasteryLevel;
  correctCount: number;
  incorrectCount: number;
  lastPracticed: string | null;
}

export interface ActivityHistoryEntry {
  date: string;
  type: string;
  xp: number;
  correct: boolean;
}

export interface LearnerSettings {
  soundEnabled: boolean;
  reducedMotion: boolean;
}

export interface LearnerProgress {
  version: 1;
  currentLevel: Difficulty;
  xp: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  wordsSeen: string[];
  wordsPracticed: string[];
  wordsMastered: string[];
  wordMastery: Record<string, WordMastery>;
  mathsQuestions: number;
  mathsCorrect: number;
  currentStreak: number;
  longestStreak: number;
  lastCompletedDate: string | null;
  activityHistory: ActivityHistoryEntry[];
  settings: LearnerSettings;
  recentWordIds: string[];
}

export interface MathQuestion {
  id: string;
  operation: MathOperation;
  operands: [number, number];
  answer: number;
  level: Difficulty;
  objectKind: CountingObjectKind;
  prompt?: string;
  isWordProblem?: boolean;
}

export interface LevelConfig {
  level: Difficulty;
  name: string;
  description: string;
  vocabMaxDifficulty: Difficulty;
  maths: {
    operations: MathOperation[];
    maxOperand: number;
    allowWordProblems: boolean;
    visualMode:
      | "visual"
      | "visual+numbers"
      | "visual+equation"
      | "equation+help"
      | "equation+words";
  };
}
