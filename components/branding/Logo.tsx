import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export interface LogoProps {
  variant?: "mark" | "logo";
  dark?: boolean;
  className?: string;
  width?: number;
  height?: number;
  linked?: boolean;
}

export function Logo({
  variant = "mark",
  dark = false,
  className,
  width = 40,
  height = 40,
  linked = false,
}: LogoProps) {
  const src =
    variant === "mark"
      ? dark
        ? "/brand/manar-mark-dark.png"
        : "/brand/manar-mark.png"
      : dark
        ? "/brand/manar-logo-dark.png"
        : "/brand/manar-logo.png";

  const image = (
    <Image
      src={src}
      alt={linked ? "" : "MANĀR"}
      width={width}
      height={height}
      className="shrink-0 object-contain"
      style={{ width, height }}
      priority
    />
  );

  if (linked) {
    return (
      <Link
        href="/"
        className={cn("inline-flex shrink-0 items-center", className)}
        aria-label="MANĀR home"
      >
        {image}
      </Link>
    );
  }

  return (
    <span className={cn("inline-flex shrink-0 items-center", className)}>
      {image}
    </span>
  );
}
