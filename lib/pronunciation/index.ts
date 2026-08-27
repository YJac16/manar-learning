export type SpeechLanguage = "en" | "ar";

export interface SpeakOptions {
  text: string;
  lang: SpeechLanguage;
  rate?: number;
  slow?: boolean;
}

export interface PronunciationService {
  isAvailable(): boolean;
  speak(options: SpeakOptions): Promise<void>;
  cancel(): void;
}

const LANG_MAP: Record<SpeechLanguage, string> = {
  en: "en-US",
  ar: "ar-SA",
};

export class BrowserPronunciationService implements PronunciationService {
  isAvailable(): boolean {
    return (
      typeof window !== "undefined" &&
      typeof window.speechSynthesis !== "undefined"
    );
  }

  cancel(): void {
    if (this.isAvailable()) {
      window.speechSynthesis.cancel();
    }
  }

  speak(options: SpeakOptions): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.isAvailable()) {
        resolve();
        return;
      }
      try {
        this.cancel();
        const utter = new SpeechSynthesisUtterance(options.text);
        utter.lang = LANG_MAP[options.lang];
        utter.rate = options.slow ? 0.65 : options.rate ?? 0.9;
        utter.onend = () => resolve();
        utter.onerror = () => resolve(); // fail gracefully
        window.speechSynthesis.speak(utter);
      } catch (err) {
        reject(err);
      }
    });
  }
}

/** Future: CloudAudioPronunciationService */

let singleton: PronunciationService | null = null;

export function getPronunciationService(): PronunciationService {
  if (!singleton) {
    singleton = new BrowserPronunciationService();
  }
  return singleton;
}
