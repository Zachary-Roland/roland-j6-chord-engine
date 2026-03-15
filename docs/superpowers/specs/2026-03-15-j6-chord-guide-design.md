# J-6 Chord Guide — Design Specification

## Overview

A mobile-first React PWA that serves as an active session companion for the Roland AIRA J-6 Chord Synth. Designed to be open on your phone while programming the J-6 sequencer.

**Core workflow:** Browse 100 chord sets → find one that fits → pick a root key → discover a progression → program it into the J-6.

**Mental model:** Key-based thinking (C, F, Am) — actual note names, not Roman numerals.

## Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Framework | Vite + React, custom CSS | Specific visual identity (Roland orange, IBM Plex Mono) easier with custom CSS than fighting a framework |
| State management | React hooks + context | App state is simple: favorites, theme, settings — no need for Redux |
| Audio | Triangle wave OscillatorNode | Companion tool, not standalone instrument. J-6 provides the real sound |
| Genre taxonomy | Two-tier | Broad families (~10) for filter pills, granular labels on cards |
| Navigation | 3-tab bottom bar + slide-up modal | Browse, Styles, Favorites tabs. Detail view as modal overlay |
| Hosting | Firebase Hosting | Existing workflow. PWA-ready. Capacitor-ready for future iOS App Store |
| Data | Static JS modules | All 100 sets with voicings scraped from Roland manual. No backend needed |

## Architecture

### Tech Stack

- **Build:** Vite + React 18
- **Styling:** CSS custom properties (tokens.css) + component CSS modules
- **Fonts:** Outfit (UI), IBM Plex Mono (chord names, data)
- **Audio:** Web Audio API (OscillatorNode, triangle wave)
- **Storage:** localStorage (favorites, theme, settings, scratchpad)
- **Hosting:** Firebase Hosting with PWA service worker
- **Future:** Capacitor wrapper for iOS App Store

### File Structure

```
src/
  data/
    chordSets.js          # 100 sets × 12 keys × chord name + voicing notes
    progressions.js       # curated progressions by genreFamily
    genreConfig.js        # family slugs, labels, colors, genre→family mapping
    styleGuide.js         # J-6 style banks 1–9 documentation
  components/
    App.jsx               # root, theme provider, tab routing
    Header.jsx            # J6 badge, dark/light toggle, grid/list toggle
    SearchBar.jsx
    GenreFilter.jsx       # horizontally scrollable pills
    BrowseGrid.jsx        # 2-col mobile, 3-col iPad grid
    BrowseList.jsx        # single-column list view
    RandomButton.jsx      # floating FAB
    ChordSetCard.jsx      # card used in grid and list
    ChordSetDetail.jsx    # slide-up modal shell
    KeyGrid.jsx           # 3×4 J-6 mirror grid
    ChordPanel.jsx        # chord name + voicing note chips
    ProgressionList.jsx   # suggestion cards
    ProgressionCard.jsx   # single suggestion with play/scratchpad actions
    Scratchpad.jsx        # interactive sequence builder
    StyleGuideTab.jsx     # style bank cheat sheet
    FavoritesList.jsx
    ThemeToggle.jsx
    TheoryMode.jsx        # scale suggestions (opt-in, off by default)
    TabBar.jsx            # bottom navigation (Browse, Styles, Favorites)
  hooks/
    useFavorites.js       # localStorage favorites CRUD
    useTheme.js           # dark/light toggle + persist
    useAudio.js           # lazy AudioContext, playChord(), playLoop()
    useSearch.js          # filter + search logic across sets
    useScratchpad.js      # sequence state, add/remove/reorder, playback
    useSettings.js        # theory mode toggle + persist
  utils/
    noteToFreq.js         # note string → frequency (e.g., "E4" → 329.63 Hz)
    transpose.js          # semitone offset + root → key index → chord name
  styles/
    tokens.css            # CSS custom properties
    global.css            # resets, typography, base styles
```

## Data Architecture

### chordSets.js

```js
export const chordSets = [
  {
    id: 1,
    genre: "Pop",                    // granular label from Roland manual
    genreFamily: "pop",              // broad family slug for filtering
    chords: {
      "C":  { name: "Cadd9",   notes: ["E4", "D4", "G3", "C3"] },
      "C#": { name: "C#M9/C",  notes: ["F4", "D#4", "C4", "C#3"] },
      // ... all 12 keys
    },
    related: [2, 29, 31]            // IDs of sets that chain well (hand-curated during data phase)
  },
  // ... 100 sets total
];
```

All chord data is sourced from the Roland AIRA J-6 Owner's Manual v1.02, including exact voicing notes for each chord in each set.

### genreConfig.js

```js
export const genreFamilies = [
  { slug: "pop",       label: "Pop",       color: "#4A90D9" },
  { slug: "jazz",      label: "Jazz",      color: "#D4A03E" },
  { slug: "blues",     label: "Blues",      color: "#7B68AE" },
  { slug: "cinematic", label: "Cinematic",  color: "#5EAAA8" },
  { slug: "synthwave", label: "Synthwave",  color: "#E84893" },
  { slug: "house",     label: "House",      color: "#44BBA4" },
  { slug: "soul-rnb",  label: "Soul/R&B",   color: "#E8A045" },
  { slug: "funk",      label: "Funk",       color: "#D94E4E" },
  { slug: "classical", label: "Classical",  color: "#8B7D6B" },
  { slug: "utility",   label: "Utility",    color: "#888888" },
];

// Granular genre → family mapping
export const genreToFamily = {
  "Pop": "pop",
  "Pop Min": "pop",
  "Pop/Synth": "pop",
  "Jazz": "jazz",
  "Jazz Min": "jazz",
  "Jazz/Bossa": "jazz",
  "Bossa Nova": "jazz",
  "Blues": "blues",
  "Cinematic": "cinematic",
  "Cinematic/Synthwave": "cinematic",
  "Cinematic/House": "cinematic",
  "New Age/Cinematic": "cinematic",
  "Synthwave": "synthwave",
  "Synthwave/House": "synthwave",
  "House": "house",
  "Jazz House": "house",
  "House/Techno": "house",
  "Trance": "house",
  "Techno": "house",
  "EDM": "house",
  "Neo Soul": "soul-rnb",
  "Neo-Soul": "soul-rnb",
  "Gospel/R&B": "soul-rnb",
  "Lofi R&B": "soul-rnb",
  "Funk": "funk",
  "Classical": "classical",
  "Modern": "classical",
  "Utility": "utility",
  "Trad Maj": "utility",
  "Trad Min": "utility",
  "Trad Min 2": "utility",
  "Oct Stack": "utility",
  "4th Stack": "utility",
  "5th Stack": "utility",
};
```

### progressions.js

Curated progressions per genre family. Stored as semitone offsets from root, rendered as actual chord names at display time.

```js
export const progressions = [
  {
    id: "neo-soul-loop",
    name: "Neo-Soul Loop",
    genreFamilies: ["soul-rnb"],
    steps: [0, 3, 8, 10],           // semitone offsets from root
    roman: ["i", "bIII", "bVI", "bVII"],
    vibe: "Hypnotic. Lay back on the beat.",
  },
  // ... ~20-25 progressions total across all genre families
];
```

Transposition logic: `selectedRoot + stepOffset (mod 12)` = key index. Key index maps to the NOTES array `['C','C#','D','D#','E','F','F#','G','G#','A','A#','B']` — index 0 = "C", index 3 = "D#", etc. The resulting key string looks up the chord name from the set's `chords` object. The chord name displayed is always the actual chord from the set.

### styleGuide.js

```js
export const styleGuide = [
  { bank: 1, name: "Arpeggio", character: "Ascending/descending at various speeds", bestWith: ["Ambient", "Cinematic", "Trance"] },
  // ... banks 1-9, each with 12 variations
];
```

## Screen Designs

### Browse Screen (Home — Grid View)

- **Header:** J6 badge (Roland orange) + "Chord Guide" + "AIRA" mono subtitle. Dark/light toggle + grid/list toggle.
- **Search bar:** Real-time filter across set number, genre, chord names. Sticky below header.
- **Genre filter pills:** Horizontally scrollable. "All" pre-selected. Active = Roland orange fill. 10 broad families.
- **Grid:** 2-column on mobile (375–430px), 3-column on iPad (768px+). Each card: set number in genre color (mono), C-key chord name, genre pill, heart icon. Left border in genre color. Min height 72px.
- **List view:** Toggle from header. Single-column, shows set number + genre + C/G chord names.
- **Random FAB:** 56px orange circle, bottom-right corner. Opens random set detail. Primary cold-start action.
- **Bottom tab bar:** Browse (active), Styles, Favorites. Active tab in Roland orange.

### Detail View (Chord Set — Slide-Up Modal)

- **Header:** Set number + genre tag + heart + mute toggle + close (X).
- **Key Grid (piano-style, 2 rows):** Black keys (C#, D#, F#, G#, A#) offset above white keys (C, D, E, F, G, A, B), mimicking a real keyboard. Black keys darker background (#2A2A2A), slightly narrower. White keys lighter (#1A1A1A). Each button: key letter (small, above) + chord name (IBM Plex Mono). Tap = highlight orange + play chord. Min height 68px for comfortable thumb targets. Selected key = Roland orange fill.
- **Chord Panel:** Large chord name + voicing note chips (e.g., "D4 · A#3 · D#3 · C3") + one-line flavor description.
- **Progression Suggestions:** 3-4 cards per genre family. Key button chips in genre color → chord name → roman numeral (muted). Play Loop + Add to Scratchpad buttons.
- **Scratchpad:** Tap keys to build sequence. Chord chips with remove-on-tap. Play/Stop/Clear/Save + BPM control (default 90). Max 16 steps. Scoped per set.
- **Below the fold:** Similar Sets (2-3 cards), Theory Mode (if enabled).

### Styles Tab

Compact reference table for J-6 style banks 1–9. Columns: bank number, name, character description, best genre pairings. Each bank's 12 variations described (1–4 sparse, 5–8 medium, 9–12 dense).

### Favorites Tab

Grid/list of hearted sets. Saved scratchpad progressions shown under each set. "Copy as Text" export button. Empty state message.

## Audio Implementation

### Single AudioContext, Two Playback Patterns

One shared `AudioContext` instance, two usage patterns:

1. **Key Tap Preview:** Tap key → chord plays once. Instant, no UI state change.
2. **Loop Playback:** Play on suggestion/scratchpad → chords in sequence, looping. Play/Stop state, BPM control.

### Synthesis

- `OscillatorNode` (type: `triangle`) + `GainNode` per note
- Attack: 0 → 0.15 gain over 20ms. Release: 0 over 400ms.
- Loop: each slot = `60 / BPM` seconds. Release at 80% of slot duration.
- Schedule all steps via `audioContext.currentTime` offsets — no `setInterval`.
- Global mute toggle. Master gain 0–1.

### iOS Safari

- Create `AudioContext` lazily on first user gesture (tap/click)
- Call `audioContext.resume()` before every playback
- Store in module-level ref, not React state
- Key grid tap IS the user gesture — no separate "enable audio" modal

### noteToFreq.js

```js
const NOTES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
function noteToMidi(str) {
  const m = str.match(/^([A-G]#?)(-?\d)$/);
  return (parseInt(m[2]) + 1) * 12 + NOTES.indexOf(m[1]);
}
export const noteToFreq = str => 440 * Math.pow(2, (noteToMidi(str) - 69) / 12);
```

## Design System

### Colors

```css
--orange:        #E8470A;    /* Roland orange — primary accent */
--dark-bg:       #111111;
--dark-surface:  #1A1A1A;
--dark-border:   #2B2B2B;
--light-bg:      #F4F3F1;
--light-surface: #FFFFFF;
--light-border:  #E2E2E2;
--text-pri:      /* #F0F0F0 dark | #111111 light */
--text-sub:      /* #888888 dark | #666666 light */
```

Genre family colors defined in `genreConfig.js` (see above).

### Typography

- **UI:** Outfit (400, 500, 600) — Google Fonts
- **Data:** IBM Plex Mono (400, 500) — chord names, set numbers, key labels, voicing notes

### Touch Targets

- Key grid buttons: min 56×56px
- All interactive elements: min 44×44px (Apple HIG)
- Random FAB: 56px circle
- Genre filter pills: min 36px tall
- Scratchpad chord chips: 48px tall

### Responsive Breakpoints

- 375px: iPhone SE — 2-column grid, compact key grid
- 430px: iPhone Pro Max — same layout, more breathing room
- 768px: iPad — 3-column grid, wider key grid buttons
- 1024px: iPad landscape — max content width, centered

## State Management

All persisted to `localStorage`:

| Key | Data | Purpose |
|-----|------|---------|
| `j6_favorites` | Set ID array | Hearted chord sets |
| `j6_theme` | `"dark"` / `"light"` | Theme preference (dark default) |
| `j6_theory_mode` | boolean | Theory mode toggle (off default) |
| `j6_scratchpad_{setId}` | Chord sequence array | Per-set working draft (auto-persisted) |
| `j6_progressions` | Named progression objects | Explicitly saved/named sequences from scratchpad |

## PWA Configuration

- Service worker for offline caching (all static assets + data)
- Web app manifest with J-6 Chord Guide name, Roland orange theme color
- Icons for home screen installation
- Structured for future Capacitor wrapping (no browser-only API hard dependencies without fallbacks)

## Progression Data

Curated progressions by genre family (all defined in root key C, transposed at render time):

**Pop:** The Anthem (C→G→Am→F), Minor Start (Am→F→C→G), The Climber (C→F→G→F)

**Jazz:** ii–V–I (Dm7→G7→Cmaj7), Rhythm Changes (Cmaj7→A7→Dm7→G7), Minor Turnaround (Am7→Dm7→G7→Cmaj7)

**Neo Soul / R&B:** Neo-Soul Loop (Cm9→EbM7→AbM7→BbM7), Smooth Cycle (Cmaj9→Am9→Dm9→G9), The Slow Jam (Cm7→Bb9→Ab9→G9), Pocket Vamp (Cm9→Fm9)

**House / Synthwave:** Hypnotic Vamp (Am→G→F→G), Minimal Two (Am7→Gmaj7), Lydian Drift (Cmaj7#11→D)

**Cinematic:** Eno Drift (Cmaj9→Emaj7→Amaj7), Colour Field (Fmaj7→Cmaj7→Gmaj7), Dark Tape (Am9→Fmaj9→Ebmaj7)

**Gospel / R&B:** Gospel Turnaround (C7→F7→G7→F7), Soul Cycle (Am9→D9→G9→Cmaj9)

**Bossa Nova:** Bossa Core (Cmaj7→C7→Fmaj7→Fm7), ii–V–I Bossa (Dm7→G7→Cmaj7)

**Funk:** Two-Chord Vamp (C9→F9), Funk Turnaround (Cm7→Fm9→Cm7→G9)

## Build Phases

1. **Data** — chordSets.js, genreConfig.js, progressions.js, styleGuide.js
2. **Browse Screen** — App shell, grid, genre filter, search, random button, list view
3. **Detail View + Audio** — Modal, key grid, chord panel, audio engine
4. **Progressions** — Transposition logic, suggestion cards, loop playback
5. **Scratchpad** — Sequence builder, BPM control, save/load
6. **Polish** — Favorites, style guide tab, theory mode, similar sets, responsive audit, PWA setup, Firebase deploy config
