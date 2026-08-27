import { getLevelConfig } from "@/data/levels";
import type {
  CountingObjectKind,
  Difficulty,
  MathOperation,
  MathQuestion,
} from "@/lib/types";
import { hashString, localDateKey } from "@/lib/utils";

const OBJECT_KINDS: CountingObjectKind[] = [
  "apples",
  "stars",
  "blocks",
  "balls",
  "animals",
  "shapes",
];

function seededRandom(seed: number): () => number {
  let s = seed || 1;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

function pickObject(rand: () => number): CountingObjectKind {
  return OBJECT_KINDS[Math.floor(rand() * OBJECT_KINDS.length)];
}

function compute(op: MathOperation, a: number, b: number): number {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "×":
      return a * b;
    case "÷":
      return a / b;
  }
}

function makeValidOperands(
  op: MathOperation,
  maxOperand: number,
  rand: () => number
): [number, number] {
  if (op === "+") {
    const a = 1 + Math.floor(rand() * maxOperand);
    const b = 1 + Math.floor(rand() * Math.max(1, maxOperand - a + 1));
    const bb = Math.min(b, maxOperand);
    return [a, bb];
  }
  if (op === "-") {
    const a = 2 + Math.floor(rand() * (maxOperand - 1));
    const b = 1 + Math.floor(rand() * (a - 1));
    return [a, b];
  }
  if (op === "×") {
    const maxFactor = Math.min(5, maxOperand);
    const a = 2 + Math.floor(rand() * (maxFactor - 1));
    const b = 2 + Math.floor(rand() * (maxFactor - 1));
    return [a, b];
  }
  // Division: exact quotients only, no divide by zero
  const divisor = 2 + Math.floor(rand() * Math.min(4, maxOperand - 1));
  const quotient = 2 + Math.floor(rand() * Math.min(5, Math.floor(maxOperand / divisor)));
  const dividend = divisor * quotient;
  return [dividend, divisor];
}

export function generateMathQuestion(
  level: Difficulty,
  date?: Date | string | null,
  seed?: number | string
): MathQuestion {
  const config = getLevelConfig(level);
  const dateKey =
    date == null
      ? null
      : typeof date === "string"
        ? date
        : localDateKey(date);

  const seedSource =
    seed != null
      ? String(seed)
      : dateKey
        ? `manar-sum:${dateKey}:L${level}`
        : `manar-practice:${level}:${Date.now()}`;

  const numericSeed =
    typeof seed === "number" ? seed : hashString(seedSource);
  const rand = seededRandom(numericSeed);

  const ops = config.maths.operations;
  const operation = ops[Math.floor(rand() * ops.length)];
  const [a, b] = makeValidOperands(operation, config.maths.maxOperand, rand);
  const answer = compute(operation, a, b);

  if (operation === "÷" && (b === 0 || answer !== Math.floor(answer))) {
    // Safety: regenerate with addition
    return generateMathQuestion(level, date, numericSeed + 7);
  }

  const isWordProblem =
    config.maths.allowWordProblems && rand() > 0.55 && level >= 5;

  let prompt: string | undefined;
  if (isWordProblem) {
    if (operation === "+") {
      prompt = `You have ${a} apples and get ${b} more. How many apples now?`;
    } else if (operation === "-") {
      prompt = `There are ${a} stars. ${b} go away. How many are left?`;
    } else if (operation === "×") {
      prompt = `There are ${a} groups of ${b} balls. How many balls in total?`;
    } else {
      prompt = `Share ${a} blocks into ${b} equal groups. How many in each group?`;
    }
  }

  return {
    id: `math-${numericSeed.toString(16)}-${operation}`,
    operation,
    operands: [a, b],
    answer,
    level,
    objectKind: pickObject(rand),
    prompt,
    isWordProblem,
  };
}

export function getSumOfTheDay(
  date: Date | string = new Date(),
  level: Difficulty = 1
): MathQuestion {
  return generateMathQuestion(level, date);
}

export function getAnswerChoices(
  question: MathQuestion,
  count: number = 4
): number[] {
  const choices = new Set<number>([question.answer]);
  const rand = seededRandom(hashString(question.id));
  let guard = 0;
  while (choices.size < count && guard < 50) {
    guard += 1;
    const delta = 1 + Math.floor(rand() * 3);
    const sign = rand() > 0.5 ? 1 : -1;
    const candidate = question.answer + delta * sign;
    if (candidate > 0 && candidate !== question.answer) {
      choices.add(candidate);
    }
  }
  return Array.from(choices).sort(() => rand() - 0.5);
}

export function isValidDivision(a: number, b: number): boolean {
  return b !== 0 && a % b === 0;
}

export function describeVisual(question: MathQuestion): {
  mode: "addition" | "subtraction" | "multiplication" | "division";
  groups: number[][];
  removeCount?: number;
} {
  const [a, b] = question.operands;
  switch (question.operation) {
    case "+":
      return { mode: "addition", groups: [Array(a).fill(1), Array(b).fill(1)] };
    case "-":
      return {
        mode: "subtraction",
        groups: [Array(a).fill(1)],
        removeCount: b,
      };
    case "×":
      return {
        mode: "multiplication",
        groups: Array.from({ length: a }, () => Array(b).fill(1)),
      };
    case "÷":
      return {
        mode: "division",
        groups: Array.from({ length: b }, () =>
          Array(question.answer).fill(1)
        ),
      };
  }
}
