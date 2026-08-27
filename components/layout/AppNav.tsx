"use client";

import { cn } from "@/lib/utils";
import {
  BookOpen,
  Home,
  Settings,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/learn", label: "Learn", icon: BookOpen },
  { href: "/practice", label: "Practice", icon: Sparkles },
  { href: "/progress", label: "Progress", icon: TrendingUp },
  { href: "/settings", label: "Settings", icon: Settings },
] as const;

export interface AppNavProps {
  variant?: "header" | "bottom";
  className?: string;
}

export function AppNav({ variant = "bottom", className }: AppNavProps) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main navigation"
      className={cn(
        variant === "bottom"
          ? "fixed bottom-0 left-0 right-0 z-50 border-t border-[#DCCBA7]/60 bg-[#F8F4E8]/95 backdrop-blur-sm pb-[env(safe-area-inset-bottom)] md:hidden"
          : "hidden border-t border-[#DCCBA7]/40 md:block",
        className
      )}
    >
      <ul
        className={cn(
          "mx-auto flex max-w-4xl items-stretch justify-around gap-1 px-2",
          variant === "bottom" ? "py-2" : "py-1"
        )}
      >
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={cn(
                  "flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-xs font-semibold touch-manipulation sm:text-sm",
                  "transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C89B3C]",
                  active
                    ? "bg-[#0E625B] text-[#F8F4E8]"
                    : "text-[#073B3A] hover:bg-[#DCCBA7]/40"
                )}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="h-6 w-6 shrink-0" aria-hidden />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
