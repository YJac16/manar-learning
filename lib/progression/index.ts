import type {
  Difficulty,
  LearnerProgress,
  MasteryLevel,
  WordMastery,
} from "@/lib/types";
import { localDateKey } from "@/lib/utils";

export const XP = {
  correctAnswer: 10,
  wordOfTheDay: 20,
  sumOfTheDay: 20,
  completedLesson: 30,
} as const;

export function ensureWordMastery(
  progress: LearnerProgress,
  wordId: string
): WordMastery {
  if (!progress.wordMastery[wordId]) {
    progress.wordMastery[wordId] = {
      wordId,
      mastery: 0,
      correctCount: 0,
      incorrectCount: 0,
      lastPracticed: null,
    };
  }
  return progress.wordMastery[wordId];
}

export function recordWordSeen(
  progress: LearnerProgress,
  wordId: string
): LearnerProgress {
  const next = structuredClone(progress);
  if (!next.wordsSeen.includes(wordId)) {
    next.wordsSeen.push(wordId);
  }
  const mastery = ensureWordMastery(next, wordId);
  if (mastery.mastery === 0) {
    mastery.mastery = 1;
  }
  return next;
}

function computeMastery(
  correct: number,
  incorrect: number,
  current: MasteryLevel
): MasteryLevel {
  const net = correct - incorrect * 0.5;
  if (correct >= 5 && net >= 4) return 4;
  if (correct >= 3 && net >= 2) return 3;
  if (correct >= 2) return 2;
  if (correct >= 1 || current >= 1) return Math.max(current, 1) as MasteryLevel;
  return current;
}

export function recordWordAnswer(
  progress: LearnerProgress,
  wordId: string,
  correct: boolean,
  xpAward: number = XP.correctAnswer
): LearnerProgress {
  const next = structuredClone(progress);
  const mastery = ensureWordMastery(next, wordId);

  if (!next.wordsSeen.includes(wordId)) next.wordsSeen.push(wordId);
  if (!next.wordsPracticed.includes(wordId)) next.wordsPracticed.push(wordId);

  next.totalQuestions += 1;
  if (correct) {
    next.correctAnswers += 1;
    mastery.correctCount += 1;
    next.xp += xpAward;
  } else {
    next.incorrectAnswers += 1;
    mastery.incorrectCount += 1;
  }

  mastery.lastPracticed = new Date().toISOString();
  mastery.mastery = computeMastery(
    mastery.correctCount,
    mastery.incorrectCount,
    mastery.mastery
  );

  if (mastery.mastery === 4 && !next.wordsMastered.includes(wordId)) {
    next.wordsMastered.push(wordId);
  } else if (mastery.mastery < 4) {
    next.wordsMastered = next.wordsMastered.filter((id) => id !== wordId);
  }

  next.activityHistory.push({
    date: localDateKey(),
    type: "word",
    xp: correct ? xpAward : 0,
    correct,
  });

  return maybeLevelUp(next);
}

export function recordMathAnswer(
  progress: LearnerProgress,
  correct: boolean,
  xpAward: number = XP.correctAnswer
): LearnerProgress {
  const next = structuredClone(progress);
  next.totalQuestions += 1;
  next.mathsQuestions += 1;
  if (correct) {
    next.correctAnswers += 1;
    next.mathsCorrect += 1;
    next.xp += xpAward;
  } else {
    next.incorrectAnswers += 1;
  }
  next.activityHistory.push({
    date: localDateKey(),
    type: "maths",
    xp: correct ? xpAward : 0,
    correct,
  });
  return maybeLevelUp(next);
}

export function completeDailyLesson(
  progress: LearnerProgress,
  wordId: string,
  date: Date = new Date()
): LearnerProgress {
  let next = structuredClone(progress);
  const today = localDateKey(date);

  if (next.lastCompletedDate === today) {
    return next;
  }

  next = applyStreak(next, date);
  next.xp += XP.completedLesson;
  next.recentWordIds = [wordId, ...next.recentWordIds.filter((id) => id !== wordId)].slice(0, 14);
  next = recordWordSeen(next, wordId);
  next.activityHistory.push({
    date: today,
    type: "lesson",
    xp: XP.completedLesson,
    correct: true,
  });
  return maybeLevelUp(next);
}

export function applyStreak(
  progress: LearnerProgress,
  date: Date = new Date()
): LearnerProgress {
  const next = structuredClone(progress);
  const today = localDateKey(date);
  const yesterday = localDateKey(new Date(date.getTime() - 86400000));

  if (next.lastCompletedDate === today) {
    return next;
  }

  if (next.lastCompletedDate === yesterday) {
    next.currentStreak += 1;
  } else {
    next.currentStreak = 1;
  }

  next.longestStreak = Math.max(next.longestStreak, next.currentStreak);
  next.lastCompletedDate = today;
  return next;
}

export function checkStreakOnLoad(
  progress: LearnerProgress,
  date: Date = new Date()
): LearnerProgress {
  const next = structuredClone(progress);
  if (!next.lastCompletedDate) return next;
  const today = localDateKey(date);
  const yesterday = localDateKey(new Date(date.getTime() - 86400000));
  if (
    next.lastCompletedDate !== today &&
    next.lastCompletedDate !== yesterday
  ) {
    next.currentStreak = 0;
  }
  return next;
}

function maybeLevelUp(progress: LearnerProgress): LearnerProgress {
  const thresholds: Array<{ level: Difficulty; xp: number }> = [
    { level: 1, xp: 0 },
    { level: 2, xp: 80 },
    { level: 3, xp: 200 },
    { level: 4, xp: 400 },
    { level: 5, xp: 700 },
  ];
  let level: Difficulty = 1;
  for (const t of thresholds) {
    if (progress.xp >= t.xp) level = t.level;
  }
  progress.currentLevel = level;
  return progress;
}

export function getAccuracy(progress: LearnerProgress): number {
  if (progress.totalQuestions === 0) return 0;
  return Math.round((progress.correctAnswers / progress.totalQuestions) * 100);
}
