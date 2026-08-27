import { cn } from "@/lib/utils";
import Link from "next/link";
import { Logo } from "./Logo";

export interface WordmarkProps {
  className?: string;
  showMark?: boolean;
  linkToHome?: boolean;
}

export function Wordmark({
  className,
  showMark = true,
  linkToHome = true,
}: WordmarkProps) {
  const content = (
    <div className={cn("inline-flex items-center gap-3", className)}>
      {showMark && <Logo width={36} height={36} />}
      <span className="flex flex-col leading-tight">
        <span className="font-display text-xl font-bold tracking-wide text-[#073B3A] sm:text-2xl">
          MANĀR
        </span>
        <span
          dir="rtl"
          className="font-arabic text-base text-[#0E625B] sm:text-lg"
        >
          مَنَار
        </span>
      </span>
    </div>
  );

  if (linkToHome) {
    return (
      <Link href="/" className="inline-flex" aria-label="MANĀR home">
        {content}
      </Link>
    );
  }

  return content;
}
