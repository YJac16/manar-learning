import type { CountingObjectKind } from "@/lib/types";
import { cn } from "@/lib/utils";
import Image from "next/image";

const KIND_TO_ICON: Record<CountingObjectKind, string> = {
  apples: "apple",
  stars: "star",
  blocks: "block",
  balls: "ball",
  animals: "animal",
  shapes: "shape",
};

const SIZE_CLASSES = {
  sm: "h-8 w-8 sm:h-10 sm:w-10",
  md: "h-10 w-10 sm:h-12 sm:w-12",
  lg: "h-12 w-12 sm:h-16 sm:w-16",
};

export interface CountingObjectsProps {
  count: number;
  kind: CountingObjectKind;
  size?: "sm" | "md" | "lg";
  removedCount?: number;
  className?: string;
}

export function CountingObjects({
  count,
  kind,
  size = "lg",
  removedCount = 0,
  className,
}: CountingObjectsProps) {
  const icon = KIND_TO_ICON[kind];
  const src = `/icons/math/${icon}.svg`;
  const remaining = Math.max(0, count - removedCount);
  const label =
    removedCount > 0
      ? `${remaining} of ${count} ${kind}, ${removedCount} removed`
      : `${count} ${kind}`;

  return (
    <div
      className={cn("flex flex-wrap justify-center gap-2 sm:gap-3", className)}
      role="img"
      aria-label={label}
    >
      {Array.from({ length: count }, (_, i) => {
        const isRemoved = i >= remaining;
        return (
          <div
            key={i}
            className={cn(
              "relative flex items-center justify-center rounded-xl p-1",
              isRemoved && "opacity-30 line-through decoration-2 decoration-[#172525]"
            )}
          >
            <Image
              src={src}
              alt=""
              width={64}
              height={64}
              className={cn(SIZE_CLASSES[size], "pointer-events-none select-none")}
              aria-hidden
            />
          </div>
        );
      })}
    </div>
  );
}
