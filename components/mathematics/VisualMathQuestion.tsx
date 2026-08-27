"use client";

import { CountingObjects } from "@/components/learning/CountingObjects";
import { MagnetTile } from "@/components/learning/MagnetTile";
import { describeVisual, getAnswerChoices } from "@/lib/mathematics";
import type { MathQuestion } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import { useMemo, useState } from "react";

export interface VisualMathQuestionProps {
  question: MathQuestion;
  onAnswer: (correct: boolean, selected: number) => void;
  showVisual?: boolean;
  explained?: boolean;
  className?: string;
}

export function VisualMathQuestion({
  question,
  onAnswer,
  showVisual = true,
  explained = false,
  className,
}: VisualMathQuestionProps) {
  const [a, b] = question.operands;
  const visual = useMemo(() => describeVisual(question), [question]);
  const choices = useMemo(() => getAnswerChoices(question), [question]);
  const [selected, setSelected] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");

  const showExplanation =
    explained || status === "wrong" || (showVisual && status === "idle");

  const handleSelect = (value: number) => {
    if (status === "correct") return;
    setSelected(value);
    const correct = value === question.answer;
    setStatus(correct ? "correct" : "wrong");
    onAnswer(correct, value);
  };

  return (
    <div className={cn("flex flex-col items-center gap-6", className)}>
      {question.prompt && (
        <p className="max-w-md text-center text-lg font-medium text-[#172525]">
          {question.prompt}
        </p>
      )}

      {showExplanation && (
        <div className="w-full max-w-lg rounded-2xl border border-[#DCCBA7] bg-[#F8F4E8]/60 p-4">
          {visual.mode === "addition" && (
            <div className="flex flex-col items-center gap-3">
              <CountingObjects
                count={a}
                kind={question.objectKind}
                size="md"
              />
              <span className="text-2xl font-bold text-[#C89B3C]" aria-hidden>
                +
              </span>
              <CountingObjects
                count={b}
                kind={question.objectKind}
                size="md"
              />
            </div>
          )}

          {visual.mode === "subtraction" && (
            <div className="flex flex-col items-center gap-2">
              <CountingObjects
                count={a}
                kind={question.objectKind}
                removedCount={visual.removeCount ?? b}
                size="md"
              />
            </div>
          )}

          {visual.mode === "multiplication" && (
            <div className="flex flex-col items-center gap-3">
              <p className="text-base font-semibold text-[#073B3A]">
                {a} groups of {b}
              </p>
              {visual.groups.map((group, row) => (
                <CountingObjects
                  key={row}
                  count={group.length}
                  kind={question.objectKind}
                  size="sm"
                />
              ))}
            </div>
          )}

          {visual.mode === "division" && (
            <div className="flex flex-col items-center gap-3">
              <p className="text-base font-semibold text-[#073B3A]">
                Share into {b} groups
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {visual.groups.map((group, gi) => (
                  <div
                    key={gi}
                    className="rounded-xl border border-[#DCCBA7] bg-white/70 p-2"
                  >
                    <CountingObjects
                      count={group.length}
                      kind={question.objectKind}
                      size="sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div
        className="flex flex-wrap items-center justify-center gap-2"
        role="group"
        aria-label="Math equation"
      >
        <MagnetTile
          label={String(a)}
          variant="number"
          colorScheme="sand"
          disabled
          className="cursor-default"
        />
        <MagnetTile
          label={question.operation}
          variant="symbol"
          colorScheme="gold"
          disabled
          className="cursor-default"
        />
        <MagnetTile
          label={String(b)}
          variant="number"
          colorScheme="sand"
          disabled
          className="cursor-default"
        />
        <MagnetTile
          label="="
          variant="symbol"
          colorScheme="teal"
          disabled
          className="cursor-default"
        />
        <MagnetTile
          label="?"
          variant="symbol"
          colorScheme="emerald"
          disabled
          selected={status === "idle"}
          className="cursor-default"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {choices.map((choice) => (
          <MagnetTile
            key={choice}
            label={String(choice)}
            variant="number"
            colorScheme={
              selected === choice
                ? status === "correct"
                  ? "emerald"
                  : status === "wrong"
                    ? "gold"
                    : "emerald"
                : "teal"
            }
            selected={selected === choice}
            wrong={selected === choice && status === "wrong"}
            disabled={status === "correct"}
            onClick={() => handleSelect(choice)}
            aria-label={`Answer ${choice}`}
          />
        ))}
      </div>

      <div className="flex min-h-10 items-center gap-2 text-center" aria-live="polite">
        {status === "correct" && (
          <p className="flex items-center gap-2 text-lg font-semibold text-[#073B3A]">
            <Check className="h-6 w-6 text-[#0E625B]" aria-hidden />
            Correct! {a} {question.operation} {b} = {question.answer}
          </p>
        )}
        {status === "wrong" && (
          <p className="flex items-center gap-2 text-lg font-medium text-[#172525]">
            <X className="h-6 w-6 text-[#C89B3C]" aria-hidden />
            Almost! Let&apos;s look again.
          </p>
        )}
      </div>
    </div>
  );
}
