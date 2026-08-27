import { cn } from "@/lib/utils";

export interface GeometricPatternProps {
  className?: string;
}

export function GeometricPattern({ className }: GeometricPatternProps) {
  return (
    <svg
      className={cn("pointer-events-none text-[#C89B3C]/20", className)}
      aria-hidden
      viewBox="0 0 400 120"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Eight-point star */}
      <path
        d="M50 60 L58 42 L50 24 L42 42 L24 50 L42 58 L50 76 L58 58 L76 50 Z"
        opacity="0.5"
      />
      <path
        d="M200 60 L210 36 L200 12 L190 36 L166 46 L190 56 L200 80 L210 56 L234 46 Z"
        opacity="0.35"
      />
      <path
        d="M350 60 L356 48 L350 36 L344 48 L332 54 L344 60 L350 72 L356 60 L368 54 Z"
        opacity="0.4"
      />
      {/* Arch motif */}
      <path
        d="M100 100 Q120 60 140 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.3"
      />
      <path
        d="M260 100 Q280 55 300 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.25"
      />
    </svg>
  );
}
