# MANĀR (مَنَار)

**A Beacon for Learning**

MANĀR is a modern educational web app for children to explore **English**, **Arabic**, **reading**, and **mathematics**. It is inspired by Arabic and Islamic visual heritage and by the joy of physical learning magnets — large tactile tiles you tap to build words and solve sums.

Pronunciation: **Ma-nār** · Meaning: **beacon / guiding light**

> The goal is a small daily discovery a child looks forward to: *“What’s today’s word?”*

## Technology

- Next.js (App Router) + TypeScript + React
- Tailwind CSS
- Browser `localStorage` (`manar:v1`)
- Web Speech API for pronunciation
- Vitest for unit tests
- SVG illustrations (no audio files in MVP)

## Local setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm test
npm run build
```

## Brand

| Token | Hex |
|-------|-----|
| Deep Emerald | `#073B3A` |
| Rich Teal | `#0E625B` |
| Gold | `#C89B3C` |
| Light Gold | `#E5C77B` |
| Ivory | `#F8F4E8` |
| Sand | `#DCCBA7` |
| Charcoal | `#172525` |

Logo and favicon assets live in [`public/brand/`](public/brand/). The circular emblem is used for the in-app logo, browser favicons (`favicon.ico` / PNG / SVG), Apple touch icon, Android Chrome icons, and [`public/site.webmanifest`](public/site.webmanifest).

## Architecture

```
app/                 # Routes (Home, Learn, Practice, Progress, Settings)
components/
  branding/          # Logo, wordmark, geometric accents
  learning/          # Magnets, word builders, pronunciation, counting
  language/          # Picture→Word, missing letter, EN↔AR
  mathematics/       # VisualMathQuestion
  progress/          # ProgressProvider (local storage)
  layout/            # Header + nav
data/                # Vocabulary + level configs
lib/
  learning/          # Word of the Day
  mathematics/       # Question generator + visual mapping
  progression/       # XP, mastery, streak
  storage/           # StorageService → LocalStorageService
  pronunciation/     # Browser TTS abstraction
public/brand|images|icons/
```

**Separation:** DATA → BUSINESS LOGIC → UI.

## Vocabulary system

Each word includes English, Arabic, transliteration, phonetic spelling, definition, category, difficulty, image, and example sentences.

Add a word in [`data/vocabulary/words.ts`](data/vocabulary/words.ts) and an SVG at `public/images/vocabulary/{id}.svg`.

## Word of the Day

`getWordOfTheDay(date, level, progress?)` is **deterministic** per calendar day. It prefers words within the learner’s level and avoids recently mastered/recent words when possible.

## Maths engine

`generateMathQuestion(level, date?, seed?)` supports `+ − × ÷` with:

- no division by zero
- no remainders initially
- level-capped operands
- deterministic Sum of the Day when a date is provided

Visual maths uses `CountingObjects` and `describeVisual()` so children can count groups.

## Magnet interaction

`MagnetTile` powers letter, Arabic, and number tiles — large touch targets with subtle lift/snap feedback (respects reduced motion).

## Pronunciation

`PronunciationService` / `BrowserPronunciationService` under `lib/pronunciation`. Future audio providers can replace the browser implementation.

## Progress storage

Key: **`manar:v1`**

Tracks level, XP, questions, word mastery (0–4), maths stats, streaks, and settings. Abstraction:

- `StorageService` interface
- `LocalStorageService` (MVP)
- Future: `CloudStorageService`

## Levels

1. Discover · 2. Build · 3. Grow · 4. Read · 5. Understand  

See [`data/levels.ts`](data/levels.ts).

## Adding languages (future)

Keep content in language packs under `data/`. Activity engines should take language-agnostic word objects. Do not hard-code English-only assumptions into maths or progress.

## Deployment

Deploy to Vercel from the GitHub repository `manar-learning`. No secrets required for the MVP.

## Roadmap

See [`ROADMAP.md`](ROADMAP.md).

## License

Educational project · Original MANĀR brand assets.
