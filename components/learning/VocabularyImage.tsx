import type { VocabularyWord } from "@/lib/types";
import { cn } from "@/lib/utils";
import Image from "next/image";

type VocabularyImageProps =
  | {
      word: VocabularyWord;
      imageUrl?: never;
      imageAlt?: never;
      english?: never;
      className?: string;
      priority?: boolean;
    }
  | {
      word?: never;
      imageUrl: string;
      imageAlt: string;
      english: string;
      className?: string;
      priority?: boolean;
    };

export function VocabularyImage(props: VocabularyImageProps) {
  const imageUrl = props.word?.imageUrl ?? props.imageUrl;
  const imageAlt = props.word?.imageAlt ?? props.imageAlt;
  const english = props.word?.english ?? props.english;

  return (
    <figure
      className={cn(
        "inline-flex flex-col items-center gap-2 rounded-2xl border-2 border-[#DCCBA7] bg-[#F8F4E8] p-4 shadow-sm",
        props.className
      )}
    >
      <div className="relative overflow-hidden rounded-xl bg-white p-3">
        <Image
          src={imageUrl!}
          alt={imageAlt!}
          width={200}
          height={200}
          unoptimized
          priority={props.priority}
          className="h-36 w-36 object-contain sm:h-44 sm:w-44"
        />
      </div>
      <figcaption className="font-display text-xl font-semibold text-[#073B3A] sm:text-2xl">
        {english}
      </figcaption>
    </figure>
  );
}
