# J-6 Chord Guide

A mobile-first web app companion for the **Roland AIRA J-6 Chord Synth**. Open it on your phone while programming the J-6 sequencer — browse all 100 chord sets, discover progressions, and build sequences.

## Features

- **Browse 100 Chord Sets** — Grid or list view with genre-colored cards, search across set numbers, genres, and chord names
- **Genre Filters** — 10 genre families (Pop, Jazz, Blues, Cinematic, Synthwave, House, Soul/R&B, Funk, Classical, Utility)
- **Piano Keyboard** — Tap keys to hear chords with exact voicings from the J-6 manual. Chord and arpeggio playback modes
- **Progression Suggestions** — Curated progressions per genre, rendered with actual chord names from each set. Loop playback with one tap
- **Interactive Scratchpad** — Build your own chord sequence by tapping keys, adjust BPM, play it back as a loop
- **Style Guide** — Reference for J-6 style banks 1–9 with variation density descriptions
- **Favorites** — Heart any set, export your list as plain text
- **Similar Sets** — Discover sets that chain well together
- **Scale Suggestions** — Compatible scales for each chord to guide melodic playing
- **Settings** — Theme (dark/light), playback mode, default BPM, scratchpad behavior
- **PWA** — Installable to your home screen, works offline
- **Accessible** — WCAG AA compliant contrast, focus indicators, keyboard navigation, touch targets

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build & Deploy

```bash
npm run build        # Production build to dist/
npm run deploy       # Build + deploy to Firebase Hosting
```

Requires [Firebase CLI](https://firebase.google.com/docs/cli) for deployment.

## Tech Stack

- **React 18** + **Vite**
- **Web Audio API** — Triangle wave synthesis with chord and arpeggio modes
- **CSS Custom Properties** — Dark/light theming with Roland-inspired design tokens
- **localStorage** — Favorites, settings, scratchpad persistence
- **vite-plugin-pwa** — Service worker for offline support
- **Firebase Hosting** — Static deployment

## Data Source

All 100 chord sets with exact voicing notes are sourced from the [Roland AIRA J-6 Owner's Manual v1.02](https://www.roland.com/global/products/j-6/).

## License

MIT
