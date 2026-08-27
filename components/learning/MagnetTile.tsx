"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

export interface MagnetTileProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  selected?: boolean;
  placed?: boolean;
  wrong?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "letter" | "number" | "symbol" | "arabic";
  colorScheme?: "emerald" | "gold" | "teal" | "sand";
}

const sizeClasses = {
  sm: "min-w-10 h-10 text-lg",
  md: "min-w-14 h-14 text-2xl",
  lg: "min-w-16 h-16 text-3xl sm:min-w-20 sm:h-20 sm:text-4xl",
};

const colorClasses = {
  emerald: "bg-[#0E625B] text-[#F8F4E8] border-[#073B3A]",
  gold: "bg-[#C89B3C] text-[#172525] border-[#A67B2A]",
  teal: "bg-[#073B3A] text-[#F8F4E8] border-[#052928]",
  sand: "bg-[#E5C77B] text-[#172525] border-[#C89B3C]",
};

export const MagnetTile = forwardRef<HTMLButtonElement, MagnetTileProps>(
  function MagnetTile(
    {
      label,
      selected,
      placed,
      wrong,
      size = "lg",
      variant = "letter",
      colorScheme = "emerald",
      className,
      disabled,
      ...props
    },
    ref
  ) {
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        aria-pressed={selected}
        aria-label={props["aria-label"] ?? `Magnet ${label}`}
        className={cn(
          "relative inline-flex items-center justify-center rounded-2xl border-b-4 px-3 font-bold shadow-md",
          "touch-manipulation select-none",
          "transition-[transform,box-shadow,opacity] duration-150",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C89B3C]",
          "active:translate-y-0.5 active:border-b-2",
          "motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-lg",
          sizeClasses[size],
          colorClasses[colorScheme],
          variant === "arabic" && "font-arabic",
          selected && "z-10 -translate-y-1 shadow-xl ring-2 ring-[#E5C77B]",
          placed && "border-b-2 translate-y-0.5",
          wrong && "motion-safe:animate-[magnet-shake_0.4s_ease-in-out]",
          disabled && "opacity-40 cursor-not-allowed",
          className
        )}
        {...props}
      >
        <span className="drop-shadow-sm" dir={variant === "arabic" ? "rtl" : "ltr"}>
          {label}
        </span>
      </button>
    );
  }
);
