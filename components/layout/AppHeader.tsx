"use client";

import { Wordmark } from "@/components/branding/Wordmark";
import { AppNav } from "@/components/layout/AppNav";
import { cn } from "@/lib/utils";

export interface AppHeaderProps {
  title?: string;
  className?: string;
  showNav?: boolean;
}

export function AppHeader({
  title,
  className,
  showNav = true,
}: AppHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-[#DCCBA7]/60 bg-[#F8F4E8]/95 backdrop-blur-sm",
        className
      )}
    >
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Wordmark showMark className="shrink-0" />
        {title && (
          <h1 className="truncate font-display text-lg font-semibold text-[#073B3A] sm:text-xl">
            {title}
          </h1>
        )}
      </div>
      {showNav && <AppNav variant="header" />}
    </header>
  );
}
