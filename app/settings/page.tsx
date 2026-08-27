"use client";

import { useProgress } from "@/components/progress/ProgressProvider";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function SettingsPage() {
  const { settings, updateSettings, resetProgress } = useProgress();
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <header>
        <h1 className="font-display text-2xl font-semibold text-[#073B3A]">
          Settings
        </h1>
        <p className="text-[#172525]/80">Make MANĀR comfortable for you.</p>
      </header>

      <section className="manar-arch-frame space-y-4 bg-white/80 p-5">
        <Toggle
          label="Sound"
          description="Pronunciation and gentle feedback"
          checked={settings.soundEnabled}
          onChange={(v) => updateSettings({ soundEnabled: v })}
        />
        <Toggle
          label="Reduced motion"
          description="Less animation for comfort"
          checked={settings.reducedMotion}
          onChange={(v) => {
            updateSettings({ reducedMotion: v });
            document.documentElement.classList.toggle("reduced-motion", v);
          }}
        />
      </section>

      <section className="manar-arch-frame space-y-3 bg-white/80 p-5">
        <h2 className="font-display text-lg text-[#073B3A]">Progress</h2>
        {!confirmReset ? (
          <Button variant="outline" onClick={() => setConfirmReset(true)}>
            Reset progress
          </Button>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-[#172525]">
              This clears local learning progress on this device. Continue?
            </p>
            <div className="flex gap-2">
              <Button
                variant="gold"
                onClick={() => {
                  resetProgress();
                  setConfirmReset(false);
                }}
              >
                Yes, reset
              </Button>
              <Button variant="ghost" onClick={() => setConfirmReset(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </section>

      <section className="manar-arch-frame space-y-2 bg-white/80 p-5">
        <h2 className="font-display text-lg text-[#073B3A]">About MANĀR</h2>
        <p className="font-arabic text-xl text-[#0E625B]" dir="rtl" lang="ar">
          مَنَار
        </p>
        <p className="text-[#172525]/90">
          MANĀR means beacon — a guiding light. This app is a small daily
          learning discovery for English, Arabic, reading and mathematics,
          inspired by the joy of physical learning magnets.
        </p>
        <p className="text-sm text-[#172525]/60">
          Introductory MVP · Progress saved on this device only · No accounts
        </p>
      </section>
    </div>
  );
}

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="font-semibold text-[#073B3A]">{label}</p>
        <p className="text-sm text-[#172525]/70">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative h-8 w-14 rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C89B3C] ${
          checked ? "bg-[#0E625B]" : "bg-[#DCCBA7]"
        }`}
      >
        <span
          className={`absolute top-1 left-1 h-6 w-6 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-6" : ""
          }`}
        />
      </button>
    </div>
  );
}
