import type { Difficulty, LevelConfig } from "@/lib/types";

export const LEVELS: LevelConfig[] = [
  {
    level: 1,
    name: "Discover",
    description: "Meet new words and count with pictures.",
    vocabMaxDifficulty: 1,
    maths: {
      operations: ["+", "-"],
      maxOperand: 5,
      allowWordProblems: false,
      visualMode: "visual",
    },
  },
  {
    level: 2,
    name: "Build",
    description: "Learn more words and add numbers together.",
    vocabMaxDifficulty: 2,
    maths: {
      operations: ["+", "-"],
      maxOperand: 10,
      allowWordProblems: false,
      visualMode: "visual+numbers",
    },
  },
  {
    level: 3,
    name: "Grow",
    description: "Grow your vocabulary and try times tables.",
    vocabMaxDifficulty: 3,
    maths: {
      operations: ["+", "-", "×"],
      maxOperand: 20,
      allowWordProblems: false,
      visualMode: "visual+equation",
    },
  },
  {
    level: 4,
    name: "Read",
    description: "Read harder words and solve mixed maths.",
    vocabMaxDifficulty: 4,
    maths: {
      operations: ["×", "÷"],
      maxOperand: 20,
      allowWordProblems: false,
      visualMode: "equation+help",
    },
  },
  {
    level: 5,
    name: "Understand",
    description: "Master all words and solve real-world maths problems.",
    vocabMaxDifficulty: 5,
    maths: {
      operations: ["+", "-", "×", "÷"],
      maxOperand: 20,
      allowWordProblems: true,
      visualMode: "equation+words",
    },
  },
];

export function getLevelConfig(level: Difficulty): LevelConfig {
  return LEVELS.find((l) => l.level === level) ?? LEVELS[0];
}
