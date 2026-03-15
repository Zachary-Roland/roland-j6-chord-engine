# J-6 Chord Guide Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a mobile-first React PWA companion app for the Roland AIRA J-6 Chord Synth — browse 100 chord sets, preview chords with audio, discover progressions, and build custom sequences.

**Architecture:** Vite + React 18 with custom CSS (no framework). Static data modules for all 100 chord sets with voicings. Web Audio API triangle wave synthesis. localStorage for persistence. Firebase Hosting with PWA service worker.

**Tech Stack:** Vite, React 18, CSS custom properties, Web Audio API, localStorage, Firebase Hosting

**Spec:** `docs/superpowers/specs/2026-03-15-j6-chord-guide-design.md`

---

## Chunk 1: Project Setup + Data Layer

### Task 1: Scaffold Vite + React Project

**Files:**
- Create: `package.json`, `vite.config.js`, `index.html`
- Create: `src/main.jsx`, `src/styles/tokens.css`, `src/styles/global.css`

- [ ] **Step 1: Initialize Vite project**

```bash
npm create vite@latest . -- --template react
```

Accept overwriting existing files if prompted. This creates the base scaffold.

- [ ] **Step 2: Install dependencies**

```bash
npm install
```

- [ ] **Step 3: Clean up scaffold**

Remove default Vite boilerplate: `src/App.css`, `src/index.css`, `src/assets/react.svg`, default content in `src/App.jsx`.

- [ ] **Step 4: Create `src/styles/tokens.css`**

```css
:root {
  /* Brand */
  --orange: #E8470A;

  /* Dark theme (default) */
  --bg: #111111;
  --surface: #1A1A1A;
  --border: #2B2B2B;
  --text-pri: #F0F0F0;
  --text-sub: #888888;

  /* Genre colors */
  --genre-pop: #4A90D9;
  --genre-jazz: #D4A03E;
  --genre-blues: #7B68AE;
  --genre-cinematic: #5EAAA8;
  --genre-synthwave: #E84893;
  --genre-house: #44BBA4;
  --genre-soul-rnb: #E8A045;
  --genre-funk: #D94E4E;
  --genre-classical: #8B7D6B;
  --genre-utility: #888888;

  /* Typography */
  --font-ui: 'Outfit', system-ui, sans-serif;
  --font-mono: 'IBM Plex Mono', monospace;

  /* Spacing */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-full: 9999px;
}

[data-theme="light"] {
  --bg: #F4F3F1;
  --surface: #FFFFFF;
  --border: #E2E2E2;
  --text-pri: #111111;
  --text-sub: #666666;
}
```

- [ ] **Step 5: Create `src/styles/global.css`**

```css
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
@import './tokens.css';

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: transparent;
}

body {
  font-family: var(--font-ui);
  background: var(--bg);
  color: var(--text-pri);
  line-height: 1.4;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

button {
  font-family: inherit;
  cursor: pointer;
  border: none;
  background: none;
  color: inherit;
}

input {
  font-family: inherit;
  border: none;
  background: none;
  color: inherit;
  outline: none;
}
```

- [ ] **Step 6: Wire up `src/main.jsx`**

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

- [ ] **Step 7: Update `index.html`**

Set `<title>J-6 Chord Guide</title>`, add `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`, add `<meta name="theme-color" content="#E8470A">`.

- [ ] **Step 8: Create minimal `src/components/App.jsx`**

```jsx
export default function App() {
  return <div>J-6 Chord Guide</div>;
}
```

- [ ] **Step 9: Verify dev server runs**

```bash
npm run dev
```

Open in browser — should show "J-6 Chord Guide" on dark background with Outfit font.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "scaffold: Vite + React project with design tokens and global styles"
```

---

### Task 2: Genre Config Data

**Files:**
- Create: `src/data/genreConfig.js`

- [ ] **Step 1: Create `src/data/genreConfig.js`**

Contains the `genreFamilies` array and `genreToFamily` mapping exactly as defined in the spec (see spec `genreConfig.js` section). Also export a helper:

```js
export const getGenreFamily = (genre) => {
  const slug = genreToFamily[genre] || 'utility';
  return genreFamilies.find(f => f.slug === slug);
};
```

- [ ] **Step 2: Commit**

```bash
git add src/data/genreConfig.js
git commit -m "data: add genre family config with color mapping"
```

---

### Task 3: Chord Sets Data

**Files:**
- Create: `src/data/chordSets.js`
- Create: `src/data/sets/sets001-025.js`
- Create: `src/data/sets/sets026-050.js`
- Create: `src/data/sets/sets051-075.js`
- Create: `src/data/sets/sets076-100.js`

This is the largest data set — 100 sets × 12 keys × chord name + voicing notes. Split across 4 batch files to keep each under 1000 lines, then re-exported from a single index.

- [ ] **Step 1: Create `src/data/sets/sets001-025.js`**

Export an array of sets 1-25. Each set:

```js
{
  id: 1,
  genre: "Pop",
  genreFamily: "pop",
  chords: {
    "C": { name: "Cadd9", notes: ["E4", "D4", "G3", "C3"] },
    // ... all 12 keys
  },
  related: []
}
```

The `genreFamily` field is derived from the `genreToFamily` mapping in `genreConfig.js`. The `related` field starts as empty arrays — populated during polish phase.

Use the complete voicing data extracted from the Roland manual during brainstorming.

- [ ] **Step 2: Verify batch 1** — import in console, confirm 25 sets, each with 12 keys, valid chord names and notes arrays.

- [ ] **Step 3: Create `src/data/sets/sets026-050.js`** — same structure, sets 26-50.

- [ ] **Step 4: Verify batch 2** — 25 sets, 12 keys each.

- [ ] **Step 5: Create `src/data/sets/sets051-075.js`** — sets 51-75.

- [ ] **Step 6: Verify batch 3** — 25 sets, 12 keys each.

- [ ] **Step 7: Create `src/data/sets/sets076-100.js`** — sets 76-100.

- [ ] **Step 8: Verify batch 4** — 25 sets, 12 keys each.

- [ ] **Step 9: Create `src/data/chordSets.js`** — re-export index:

```js
import { sets001to025 } from './sets/sets001-025';
import { sets026to050 } from './sets/sets026-050';
import { sets051to075 } from './sets/sets051-075';
import { sets076to100 } from './sets/sets076-100';

export const chordSets = [
  ...sets001to025,
  ...sets026to050,
  ...sets051to075,
  ...sets076to100,
];
```

- [ ] **Step 10: Verify full dataset** — `chordSets.length === 100`, every set has valid `genreFamily` from `genreFamilies`.

- [ ] **Step 11: Commit**

```bash
git add src/data/sets/ src/data/chordSets.js
git commit -m "data: add all 100 chord sets with voicing notes from Roland manual"
```

---

### Task 4: Progressions Data

**Files:**
- Create: `src/data/progressions.js`

- [ ] **Step 1: Create `src/data/progressions.js`**

All progressions from the spec's "Progression Data" section, encoded as semitone offsets:

```js
export const progressions = [
  // Pop
  { id: "pop-anthem", name: "The Anthem", genreFamilies: ["pop"], steps: [0, 7, 9, 5], roman: ["I", "V", "vi", "IV"], vibe: "The universal crowd-pleaser." },
  { id: "pop-minor-start", name: "Minor Start", genreFamilies: ["pop"], steps: [9, 5, 0, 7], roman: ["vi", "IV", "I", "V"], vibe: "Emotional opener." },
  { id: "pop-climber", name: "The Climber", genreFamilies: ["pop"], steps: [0, 5, 7, 5], roman: ["I", "IV", "V", "IV"], vibe: "Builds and resolves." },

  // Jazz
  { id: "jazz-ii-v-i", name: "ii–V–I", genreFamilies: ["jazz"], steps: [2, 7, 0], roman: ["ii", "V", "I"], vibe: "The foundation of jazz harmony." },
  { id: "jazz-rhythm-changes", name: "Rhythm Changes", genreFamilies: ["jazz"], steps: [0, 9, 2, 7], roman: ["I", "VI", "ii", "V"], vibe: "Bebop standard." },
  { id: "jazz-minor-turnaround", name: "Minor Turnaround", genreFamilies: ["jazz"], steps: [9, 2, 7, 0], roman: ["vi", "ii", "V", "I"], vibe: "Classic minor resolution." },

  // Neo Soul / R&B
  { id: "neo-soul-loop", name: "Neo-Soul Loop", genreFamilies: ["soul-rnb"], steps: [0, 3, 8, 10], roman: ["i", "bIII", "bVI", "bVII"], vibe: "Hypnotic. Lay back on the beat." },
  { id: "neo-soul-smooth", name: "Smooth Cycle", genreFamilies: ["soul-rnb"], steps: [0, 9, 2, 7], roman: ["I", "vi", "ii", "V"], vibe: "Warm and flowing." },
  { id: "neo-soul-slow-jam", name: "The Slow Jam", genreFamilies: ["soul-rnb"], steps: [0, 10, 8, 7], roman: ["i", "bVII", "bVI", "V"], vibe: "Late night. Low lights." },
  { id: "neo-soul-pocket", name: "Pocket Vamp", genreFamilies: ["soul-rnb"], steps: [0, 5], roman: ["i", "iv"], vibe: "Two chords. All rhythm." },

  // House / Synthwave
  { id: "house-hypnotic", name: "Hypnotic Vamp", genreFamilies: ["house", "synthwave"], steps: [9, 7, 5, 7], roman: ["vi", "V", "IV", "V"], vibe: "Driving. Relentless." },
  { id: "house-minimal", name: "Minimal Two", genreFamilies: ["house", "synthwave"], steps: [9, 7], roman: ["vi", "V"], vibe: "Strip it back." },
  { id: "house-lydian", name: "Lydian Drift", genreFamilies: ["house", "synthwave"], steps: [0, 2], roman: ["I", "II"], vibe: "Dreamy. Weightless." },

  // Cinematic
  { id: "cine-eno", name: "Eno Drift", genreFamilies: ["cinematic"], steps: [0, 4, 9], roman: ["I", "III", "VI"], vibe: "Ambient. Infinite space." },
  { id: "cine-colour", name: "Colour Field", genreFamilies: ["cinematic"], steps: [5, 0, 7], roman: ["IV", "I", "V"], vibe: "Warm wash of light." },
  { id: "cine-dark-tape", name: "Dark Tape", genreFamilies: ["cinematic"], steps: [9, 5, 3], roman: ["vi", "IV", "bIII"], vibe: "Hazy. Nostalgic." },

  // Gospel / R&B
  { id: "gospel-turnaround", name: "Gospel Turnaround", genreFamilies: ["soul-rnb"], steps: [0, 5, 7, 5], roman: ["I", "IV", "V", "IV"], vibe: "Sunday morning." },
  { id: "gospel-soul-cycle", name: "Soul Cycle", genreFamilies: ["soul-rnb"], steps: [9, 2, 7, 0], roman: ["vi", "ii", "V", "I"], vibe: "Full circle resolution." },

  // Bossa Nova (falls under jazz family)
  // Note: Bossa Core uses duplicate offsets [0, 0, 5, 5] — the progression relies on
  // chord quality changes (I→I7→IV→iv) which are baked into the chord set's voicings,
  // not the offset system. The display will show the same key twice, which is correct
  // behavior — the user sees which J-6 keys to press.
  { id: "bossa-core", name: "Bossa Core", genreFamilies: ["jazz"], steps: [0, 0, 5, 5], roman: ["I", "I7", "IV", "iv"], vibe: "Rio at sunset." },
  { id: "bossa-ii-v-i", name: "ii–V–I Bossa", genreFamilies: ["jazz"], steps: [2, 7, 0], roman: ["ii", "V", "I"], vibe: "Bossa standard." },

  // Funk
  { id: "funk-vamp", name: "Two-Chord Vamp", genreFamilies: ["funk"], steps: [0, 5], roman: ["I", "IV"], vibe: "Lock the groove." },
  { id: "funk-turnaround", name: "Funk Turnaround", genreFamilies: ["funk"], steps: [0, 5, 0, 7], roman: ["i", "iv", "i", "V"], vibe: "Tight. Punchy." },
];
```

- [ ] **Step 2: Commit**

```bash
git add src/data/progressions.js
git commit -m "data: add curated progressions for all genre families"
```

---

### Task 5: Style Guide Data

**Files:**
- Create: `src/data/styleGuide.js`

- [ ] **Step 1: Create `src/data/styleGuide.js`**

```js
export const styleGuide = [
  {
    bank: 1,
    name: "Arpeggio",
    character: "Ascending / descending at various speeds",
    bestWith: ["Ambient", "Cinematic", "Trance"],
    variations: "1–4: slow, sparse arps. 5–8: medium speed, more notes. 9–12: fast, dense patterns."
  },
  {
    bank: 2,
    name: "Arpeggio",
    character: "Reverse and random arpeggiation patterns",
    bestWith: ["Ambient", "Cinematic", "Synthwave"],
    variations: "1–4: simple reverse. 5–8: random note order. 9–12: complex interlocking patterns."
  },
  {
    bank: 3,
    name: "Beat",
    character: "Rhythmic chord hits with rests",
    bestWith: ["Pop", "House", "EDM"],
    variations: "1–4: quarter note hits. 5–8: offbeat accents. 9–12: syncopated patterns."
  },
  {
    bank: 4,
    name: "Beat",
    character: "Triplet feel, syncopated",
    bestWith: ["Neo Soul", "Funk", "R&B"],
    variations: "1–4: simple triplet. 5–8: swing feel. 9–12: complex syncopation."
  },
  {
    bank: 5,
    name: "Beat",
    character: "16th-note dense pattern",
    bestWith: ["Techno", "Synthwave", "EDM"],
    variations: "1–4: steady 16ths. 5–8: accented patterns. 9–12: fills and rolls."
  },
  {
    bank: 6,
    name: "Phrase",
    character: "Strummed chord pattern",
    bestWith: ["Jazz", "Bossa Nova", "Classical"],
    variations: "1–4: gentle strum. 5–8: rhythmic strum. 9–12: fast flamenco-style."
  },
  {
    bank: 7,
    name: "Phrase",
    character: "Sparse phrase with ghost notes",
    bestWith: ["Lofi", "Jazz House", "Ambient"],
    variations: "1–4: minimal, lots of space. 5–8: ghost notes fill gaps. 9–12: dense with dynamics."
  },
  {
    bank: 8,
    name: "Phrase",
    character: "Layered rhythmic phrase",
    bestWith: ["Gospel", "Neo Soul", "R&B"],
    variations: "1–4: single layer. 5–8: two layers interacting. 9–12: full polyphonic phrase."
  },
  {
    bank: 9,
    name: "Phrase",
    character: "Complex polyrhythmic phrase",
    bestWith: ["Funk", "Jazz", "Experimental"],
    variations: "1–4: simple polyrhythm. 5–8: cross-rhythm. 9–12: dense interlocking patterns."
  },
];
```

- [ ] **Step 2: Commit**

```bash
git add src/data/styleGuide.js
git commit -m "data: add J-6 style bank reference guide"
```

---

### Task 6: Utility Functions

**Files:**
- Create: `src/utils/noteToFreq.js`
- Create: `src/utils/transpose.js`

- [ ] **Step 1: Create `src/utils/noteToFreq.js`**

```js
const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

function noteToMidi(str) {
  const m = str.match(/^([A-G]#?)(-?\d)$/);
  if (!m) throw new Error(`Invalid note: ${str}`);
  return (parseInt(m[2]) + 1) * 12 + NOTES.indexOf(m[1]);
}

export const noteToFreq = (str) => {
  // Handle flat notation by converting to sharp equivalent
  const normalized = str
    .replace('Db', 'C#').replace('Eb', 'D#').replace('Fb', 'E')
    .replace('Gb', 'F#').replace('Ab', 'G#').replace('Bb', 'A#').replace('Cb', 'B');
  return 440 * Math.pow(2, (noteToMidi(normalized) - 69) / 12);
};

export { NOTES };
```

- [ ] **Step 2: Create `src/utils/transpose.js`**

```js
import { NOTES } from './noteToFreq';

/**
 * Given a root key index and a semitone offset, return the key name.
 * rootIndex: 0=C, 1=C#, ..., 11=B
 * offset: semitones from root
 * Returns: key string like "C", "D#", etc.
 */
export const getKeyFromOffset = (rootIndex, offset) => {
  return NOTES[(rootIndex + offset) % 12];
};

/**
 * Get the chord name from a chord set for a given root + offset.
 * chords: the set's chords object { "C": { name, notes }, ... }
 * rootIndex: index of the selected root key (0-11)
 * offset: semitone offset from root
 * Returns: { key, name, notes } or null
 */
export const getChordAtOffset = (chords, rootIndex, offset) => {
  const key = getKeyFromOffset(rootIndex, offset);
  const chord = chords[key];
  return chord ? { key, ...chord } : null;
};

/**
 * Get the index of a key name in the NOTES array.
 */
export const keyToIndex = (key) => NOTES.indexOf(key);
```

- [ ] **Step 3: Commit**

```bash
git add src/utils/noteToFreq.js src/utils/transpose.js
git commit -m "utils: add noteToFreq and transposition helpers"
```

---

## Chunk 2: Browse Screen

### Task 7: Theme Hook + App Shell

**Files:**
- Create: `src/hooks/useTheme.js`
- Modify: `src/components/App.jsx`
- Create: `src/components/App.css`
- Create: `src/components/TabBar.jsx`
- Create: `src/components/TabBar.css`

- [ ] **Step 1: Create `src/hooks/useTheme.js`**

```js
import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('j6_theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('j6_theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return { theme, toggleTheme };
}
```

- [ ] **Step 2: Create `src/components/TabBar.jsx` and `TabBar.css`**

Three tabs: Browse, Styles, Favorites. Active tab highlighted in `--orange`. Fixed to bottom of viewport. Safe area padding for iPhone notch.

```jsx
import './TabBar.css';

export default function TabBar({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'browse', label: 'Browse', icon: '⊞' },
    { id: 'styles', label: 'Styles', icon: '♫' },
    { id: 'favorites', label: 'Favorites', icon: '♡' },
  ];

  return (
    <nav className="tab-bar">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`tab-bar__item ${activeTab === tab.id ? 'tab-bar__item--active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          <span className="tab-bar__icon">{tab.icon}</span>
          <span className="tab-bar__label">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
```

CSS: fixed bottom, flexbox row, `--orange` for active, safe-area-inset-bottom padding, background `--surface`, border-top `--border`.

- [ ] **Step 3: Build `src/components/App.jsx` shell**

```jsx
import { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import TabBar from './TabBar';
import './App.css';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('browse');

  return (
    <div className="app">
      <main className="app__content">
        {activeTab === 'browse' && <div>Browse</div>}
        {activeTab === 'styles' && <div>Styles</div>}
        {activeTab === 'favorites' && <div>Favorites</div>}
      </main>
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
```

- [ ] **Step 4: Verify** — dev server shows tab bar at bottom, tabs switch content, dark theme applied.

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useTheme.js src/components/App.jsx src/components/App.css src/components/TabBar.jsx src/components/TabBar.css
git commit -m "feat: app shell with tab bar and theme switching"
```

---

### Task 8: Header Component

**Files:**
- Create: `src/components/Header.jsx`
- Create: `src/components/Header.css`

- [ ] **Step 1: Create `Header.jsx` and `Header.css`**

Header with: J6 badge (orange background, white mono text), "Chord Guide" title, "AIRA" mono subtitle. Right side: dark/light toggle icon, grid/list toggle icon.

```jsx
import './Header.css';

export default function Header({ theme, onToggleTheme, viewMode, onToggleView }) {
  return (
    <header className="header">
      <div className="header__left">
        <span className="header__badge">J6</span>
        <span className="header__title">Chord Guide</span>
        <span className="header__subtitle">AIRA</span>
      </div>
      <div className="header__right">
        <button className="header__icon-btn" onClick={onToggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? '◐' : '◑'}
        </button>
        <button className="header__icon-btn" onClick={onToggleView} aria-label="Toggle view">
          {viewMode === 'grid' ? '☰' : '⊞'}
        </button>
      </div>
    </header>
  );
}
```

CSS: sticky top, flex row, `--surface` background, border-bottom. Badge: `--orange` bg, mono font, small rounded. Subtitle: `--text-sub`, monospace, letter-spacing 2px.

- [ ] **Step 2: Wire into App.jsx** — add `viewMode` state, pass props to Header.

- [ ] **Step 3: Verify** — header sticks on scroll, toggles work.

- [ ] **Step 4: Commit**

```bash
git add src/components/Header.jsx src/components/Header.css src/components/App.jsx
git commit -m "feat: header with J6 badge, theme toggle, view mode toggle"
```

---

### Task 9: Search + Genre Filter

**Files:**
- Create: `src/components/SearchBar.jsx`, `src/components/SearchBar.css`
- Create: `src/components/GenreFilter.jsx`, `src/components/GenreFilter.css`
- Create: `src/hooks/useSearch.js`

- [ ] **Step 1: Create `src/hooks/useSearch.js`**

```js
import { useState, useMemo } from 'react';
import { chordSets } from '../data/chordSets';

export function useSearch() {
  const [query, setQuery] = useState('');
  const [activeGenre, setActiveGenre] = useState('all');

  const filtered = useMemo(() => {
    let results = chordSets;

    if (activeGenre !== 'all') {
      results = results.filter(s => s.genreFamily === activeGenre);
    }

    if (query.trim()) {
      const q = query.toLowerCase().trim();
      results = results.filter(s =>
        String(s.id).includes(q) ||
        s.genre.toLowerCase().includes(q) ||
        Object.values(s.chords).some(c => c.name.toLowerCase().includes(q))
      );
    }

    return results;
  }, [query, activeGenre]);

  return { query, setQuery, activeGenre, setActiveGenre, filtered };
}
```

- [ ] **Step 2: Create `SearchBar.jsx`**

Input with search icon, `--surface` background, `--border` border, rounded. `onChange` fires `setQuery`. Placeholder: "Search sets, genres, chords..."

- [ ] **Step 3: Create `GenreFilter.jsx`**

Horizontal scrollable row of pills. "All" first, then each genre family from `genreFamilies`. Active pill: `--orange` background, white text. Inactive: `--surface` background, `--border` border. Min height 36px. Hide scrollbar.

- [ ] **Step 4: Wire into App.jsx** — `useSearch()` at browse tab level, pass props down.

- [ ] **Step 5: Verify** — typing filters cards, genre pills filter, "All" resets.

- [ ] **Step 6: Commit**

```bash
git add src/hooks/useSearch.js src/components/SearchBar.jsx src/components/SearchBar.css src/components/GenreFilter.jsx src/components/GenreFilter.css src/components/App.jsx
git commit -m "feat: search bar and genre filter pills with real-time filtering"
```

---

### Task 10: Chord Set Cards + Grid/List Views

**Files:**
- Create: `src/components/ChordSetCard.jsx`, `src/components/ChordSetCard.css`
- Create: `src/components/BrowseGrid.jsx`, `src/components/BrowseGrid.css`
- Create: `src/components/BrowseList.jsx`, `src/components/BrowseList.css`

- [ ] **Step 1: Create `ChordSetCard.jsx`**

Two modes via `variant` prop: "grid" and "list".

Grid mode: set number (genre color, mono, 18px), C-key chord name (mono, small, muted), genre pill (genre color bg at 12% opacity, genre color text), heart icon (top-right). Left border 3px in genre color. Min height 72px.

List mode: single row — set number, genre, C + G chord names. Same heart icon.

Props: `set`, `isFavorite`, `onToggleFavorite`, `onSelect`, `variant`.

- [ ] **Step 2: Create `BrowseGrid.jsx`**

CSS Grid: 2 columns on mobile, 3 on 768px+. Gap 10px. Padding 0 12px. Renders `ChordSetCard` in grid variant. Bottom padding for tab bar + FAB clearance (80px+).

- [ ] **Step 3: Create `BrowseList.jsx`**

Single column list. Same `ChordSetCard` in list variant.

- [ ] **Step 4: Wire into App.jsx** — render `BrowseGrid` or `BrowseList` based on `viewMode` state. Pass `filtered` from `useSearch`.

- [ ] **Step 5: Verify** — grid shows 2-col cards, list shows single-col rows, favorites heart toggles, genre colors display correctly.

- [ ] **Step 6: Commit**

```bash
git add src/components/ChordSetCard.jsx src/components/ChordSetCard.css src/components/BrowseGrid.jsx src/components/BrowseGrid.css src/components/BrowseList.jsx src/components/BrowseList.css src/components/App.jsx
git commit -m "feat: chord set cards with grid and list browse views"
```

---

### Task 11: Random Button + Favorites Hook

**Files:**
- Create: `src/components/RandomButton.jsx`, `src/components/RandomButton.css`
- Create: `src/hooks/useFavorites.js`

- [ ] **Step 1: Create `src/hooks/useFavorites.js`**

```js
import { useState } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('j6_favorites')) || [];
    } catch { return []; }
  });

  const toggle = (setId) => {
    setFavorites(prev => {
      const next = prev.includes(setId)
        ? prev.filter(id => id !== setId)
        : [...prev, setId];
      localStorage.setItem('j6_favorites', JSON.stringify(next));
      return next;
    });
  };

  const isFavorite = (setId) => favorites.includes(setId);

  return { favorites, toggle, isFavorite };
}
```

- [ ] **Step 2: Create `RandomButton.jsx`**

56px orange circle, fixed bottom-right (above tab bar). Dice emoji or "RND" text. On click: pick random set from current filtered list, call `onSelect` with that set.

```jsx
import './RandomButton.css';

export default function RandomButton({ sets, onSelect }) {
  const handleClick = () => {
    if (sets.length === 0) return;
    const randomSet = sets[Math.floor(Math.random() * sets.length)];
    onSelect(randomSet);
  };

  return (
    <button className="random-btn" onClick={handleClick} aria-label="Random chord set">
      🎲
    </button>
  );
}
```

CSS: position fixed, bottom 80px, right 20px. 56px circle, `--orange` background, white text, box-shadow with orange glow. z-index above content.

- [ ] **Step 3: Wire into App.jsx** — lift `useFavorites` to App, pass down to cards. Add RandomButton. Add `selectedSet` state and `onSelect` handler.

- [ ] **Step 4: Verify** — random button picks a set, favorites persist across page reload, heart icon reflects state.

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useFavorites.js src/components/RandomButton.jsx src/components/RandomButton.css src/components/App.jsx
git commit -m "feat: random set button and localStorage favorites"
```

---

## Chunk 3: Detail View + Audio

### Task 12: Audio Hook

**Files:**
- Create: `src/hooks/useAudio.js`

- [ ] **Step 1: Create `src/hooks/useAudio.js`**

Module-level AudioContext ref (not in React state). Lazy init on first user gesture.

```js
import { useRef, useCallback } from 'react';
import { noteToFreq } from '../utils/noteToFreq';

let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

export function useAudio() {
  const loopRef = useRef(null);
  const mutedRef = useRef(false);

  const playChord = useCallback((notes) => {
    if (mutedRef.current) return;
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.15, ctx.currentTime);
    masterGain.connect(ctx.destination);

    notes.forEach(note => {
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(noteToFreq(note), ctx.currentTime);
      osc.connect(masterGain);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.5);
    });

    // Release
    masterGain.gain.setValueAtTime(0.15, ctx.currentTime + 0.1);
    masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
  }, []);

  const playLoop = useCallback((chordSequence, bpm = 90) => {
    stopLoop();
    if (mutedRef.current) return;
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    const stepDuration = 60 / bpm;
    const loopDuration = chordSequence.length * stepDuration;
    let nextLoopStart = ctx.currentTime + 0.05;
    let isPlaying = true;
    loopRef.current = { stop: () => { isPlaying = false; } };

    const scheduleOneLoop = (startTime) => {
      chordSequence.forEach((notes, i) => {
        const time = startTime + i * stepDuration;
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0, time);
        masterGain.gain.linearRampToValueAtTime(0.15, time + 0.02);
        masterGain.gain.setValueAtTime(0.15, time + stepDuration * 0.8);
        masterGain.gain.linearRampToValueAtTime(0, time + stepDuration);
        masterGain.connect(ctx.destination);

        notes.forEach(note => {
          const osc = ctx.createOscillator();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(noteToFreq(note), time);
          osc.connect(masterGain);
          osc.start(time);
          osc.stop(time + stepDuration);
        });
      });
    };

    // Web Audio lookahead scheduler — no setInterval
    // Schedule ahead in chunks, use requestAnimationFrame to keep scheduling
    const lookaheadTime = loopDuration * 2; // schedule 2 loops ahead
    const scheduleAhead = () => {
      if (!isPlaying) return;
      while (nextLoopStart < ctx.currentTime + lookaheadTime) {
        scheduleOneLoop(nextLoopStart);
        nextLoopStart += loopDuration;
      }
      requestAnimationFrame(scheduleAhead);
    };
    scheduleAhead();
  }, []);

  const stopLoop = useCallback(() => {
    if (loopRef.current) {
      loopRef.current.stop();
      loopRef.current = null;
    }
  }, []);

  const setMuted = useCallback((muted) => {
    mutedRef.current = muted;
    if (muted) stopLoop();
  }, [stopLoop]);

  return { playChord, playLoop, stopLoop, setMuted };
}
```

- [ ] **Step 2: Commit**

```bash
git add src/hooks/useAudio.js
git commit -m "feat: audio hook with chord preview and loop playback"
```

---

### Task 13: Key Grid Component (Piano Layout)

**Files:**
- Create: `src/components/KeyGrid.jsx`
- Create: `src/components/KeyGrid.css`

- [ ] **Step 1: Create `KeyGrid.jsx`**

Piano-style layout: 5 black keys (C#, D#, F#, G#, A#) in top row offset above 7 white keys (C, D, E, F, G, A, B) in bottom row.

Props: `chords` (the set's chords object), `selectedKey`, `onKeyPress`.

Each button shows key letter (small, above) and chord name (mono). Selected key = `--orange` background. Black keys have darker background (#2A2A2A), white keys have `--surface` background. Min height 68px.

```jsx
import './KeyGrid.css';

const BLACK_KEYS = ['C#', 'D#', 'F#', 'G#', 'A#'];
const WHITE_KEYS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

export default function KeyGrid({ chords, selectedKey, onKeyPress }) {
  const renderKey = (key) => {
    const chord = chords[key];
    if (!chord) return null;
    const isSelected = selectedKey === key;
    const isBlack = BLACK_KEYS.includes(key);

    return (
      <button
        key={key}
        className={`key-grid__key ${isBlack ? 'key-grid__key--black' : 'key-grid__key--white'} ${isSelected ? 'key-grid__key--selected' : ''}`}
        onClick={() => onKeyPress(key)}
      >
        <span className="key-grid__label">{key}</span>
        <span className="key-grid__chord">{chord.name}</span>
      </button>
    );
  };

  return (
    <div className="key-grid">
      <div className="key-grid__black-row">
        {BLACK_KEYS.map(renderKey)}
      </div>
      <div className="key-grid__white-row">
        {WHITE_KEYS.map(renderKey)}
      </div>
    </div>
  );
}
```

CSS: black row uses flex with padding to offset keys between white keys (gaps after E/B). White row uses 7-column grid. Both rows have gap. Keys have `--radius-md` border-radius. Mono font for chord name, auto font-size reduction for long names.

- [ ] **Step 2: Commit**

```bash
git add src/components/KeyGrid.jsx src/components/KeyGrid.css
git commit -m "feat: piano-style key grid component"
```

---

### Task 14: Chord Panel Component

**Files:**
- Create: `src/components/ChordPanel.jsx`
- Create: `src/components/ChordPanel.css`

- [ ] **Step 1: Create `ChordPanel.jsx`**

Displays the selected chord's details: large chord name (28px, mono, orange) and voicing note chips (mono, muted, small rounded pills). No flavor text — the data source doesn't include descriptions for individual chords.

Props: `chord` (the selected chord object `{ name, notes }`), `keyName`.

```jsx
import './ChordPanel.css';

export default function ChordPanel({ chord, keyName }) {
  if (!chord) return null;

  return (
    <div className="chord-panel">
      <div className="chord-panel__name">{chord.name}</div>
      <div className="chord-panel__notes">
        {chord.notes.map((note, i) => (
          <span key={i} className="chord-panel__note">{note}</span>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ChordPanel.jsx src/components/ChordPanel.css
git commit -m "feat: chord panel with voicing note display"
```

---

### Task 15: Detail View Modal

**Files:**
- Create: `src/components/ChordSetDetail.jsx` — modal shell (overlay, header, close)
- Create: `src/components/ChordSetDetail.css`
- Create: `src/components/DetailContent.jsx` — scrollable inner content (key grid, panel, progressions, scratchpad)
- Create: `src/components/DetailContent.css`

`ChordSetDetail.jsx` handles: overlay/backdrop, modal animation, header (set number, genre tag, heart, mute, close). Delegates all content to `DetailContent.jsx`.

`DetailContent.jsx` handles: `useAudio`, `selectedKey` state, `useScratchpad`, and renders KeyGrid, ChordPanel, ProgressionList, Scratchpad, SimilarSets, TheoryMode. This keeps the modal shell thin and the content area self-contained.

- [ ] **Step 1: Create `ChordSetDetail.jsx` and `DetailContent.jsx`**

`ChordSetDetail.jsx` — thin modal shell:

Props: `set`, `isFavorite`, `onToggleFavorite`, `onClose`, `onSelectSet` (for similar sets navigation).

```jsx
import { useState } from 'react';
import { useAudio } from '../hooks/useAudio';
import { getGenreFamily } from '../data/genreConfig';
import KeyGrid from './KeyGrid';
import ChordPanel from './ChordPanel';
import './ChordSetDetail.css';

export default function ChordSetDetail({ set, isFavorite, onToggleFavorite, onClose }) {
  const [selectedKey, setSelectedKey] = useState('C');
  const [muted, setMuted] = useState(false);
  const { playChord, setMuted: setAudioMuted } = useAudio();
  const genreFamily = getGenreFamily(set.genre);

  const handleKeyPress = (key) => {
    setSelectedKey(key);
    const chord = set.chords[key];
    if (chord) playChord(chord.notes);
  };

  const handleMuteToggle = () => {
    setMuted(!muted);
    setAudioMuted(!muted);
  };

  const selectedChord = set.chords[selectedKey];

  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-modal" onClick={e => e.stopPropagation()}>
        <div className="detail-header">
          <div className="detail-header__left">
            <span className="detail-header__number" style={{ color: genreFamily.color }}>
              {String(set.id).padStart(2, '0')}
            </span>
            <span className="detail-header__genre" style={{
              background: genreFamily.color + '20',
              color: genreFamily.color
            }}>
              {set.genre}
            </span>
          </div>
          <div className="detail-header__right">
            <button onClick={() => onToggleFavorite(set.id)}>
              {isFavorite ? '♥' : '♡'}
            </button>
            <button onClick={handleMuteToggle}>
              {muted ? '🔇' : '🔊'}
            </button>
            <button onClick={onClose}>✕</button>
          </div>
        </div>

        <div className="detail-content">
          <KeyGrid chords={set.chords} selectedKey={selectedKey} onKeyPress={handleKeyPress} />
          <ChordPanel chord={selectedChord} keyName={selectedKey} />
        </div>
      </div>
    </div>
  );
}
```

CSS: overlay fills viewport with semi-transparent dark backdrop. Modal slides up from bottom, `--surface` background, rounded top corners, max-height 90vh, overflow-y scroll. Smooth slide-up animation on mount.

- [ ] **Step 2: Wire into App.jsx** — render `ChordSetDetail` when `selectedSet` is not null. Pass through favorites state. Ensure `stopLoop` is called when modal closes (via `onClose` handler or `useEffect` cleanup in `DetailContent`).

- [ ] **Step 3: Verify** — tap a card → detail slides up, keys play audio, chord panel updates, close/backdrop dismisses, audio stops on close.

- [ ] **Step 4: Commit**

```bash
git add src/components/ChordSetDetail.jsx src/components/ChordSetDetail.css src/components/App.jsx
git commit -m "feat: chord set detail modal with key grid and audio preview"
```

---

## Chunk 4: Progressions + Scratchpad

### Task 16: Progression Cards

**Files:**
- Create: `src/components/ProgressionCard.jsx`
- Create: `src/components/ProgressionCard.css`
- Create: `src/components/ProgressionList.jsx`
- Create: `src/components/ProgressionList.css`

- [ ] **Step 1: Create `ProgressionCard.jsx`**

Renders one progression suggestion for the current set + selected key. Shows: progression name, key button chips in genre color with chord names below and roman numerals (muted), vibe text, Play Loop + Add to Scratchpad buttons.

Props: `progression`, `chords` (set's chords), `rootIndex`, `genreColor`, `onPlayLoop`, `onStopLoop`, `isPlaying`, `onAddToScratchpad`.

Uses `getChordAtOffset` from `transpose.js` to render actual chord names.

- [ ] **Step 2: Create `ProgressionList.jsx`**

Filters `progressions` by the set's `genreFamily`. Renders section header "Suggested Progressions" + list of `ProgressionCard` components.

Props: `set`, `selectedKey`, `onPlayLoop`, `onStopLoop`, `playingId`, `onAddToScratchpad`.

- [ ] **Step 3: Wire into `DetailContent.jsx`** — add ProgressionList below ChordPanel. Connect audio loop playback.

- [ ] **Step 4: Verify** — progressions show correct chord names for selected key, play loop works, stop works.

- [ ] **Step 5: Commit**

```bash
git add src/components/ProgressionCard.jsx src/components/ProgressionCard.css src/components/ProgressionList.jsx src/components/ProgressionList.css src/components/ChordSetDetail.jsx
git commit -m "feat: progression suggestions with loop playback"
```

---

### Task 17: Scratchpad

**Files:**
- Create: `src/hooks/useScratchpad.js`
- Create: `src/components/Scratchpad.jsx`
- Create: `src/components/Scratchpad.css`

- [ ] **Step 1: Create `src/hooks/useScratchpad.js`**

```js
import { useState, useEffect } from 'react';

export function useScratchpad(setId) {
  const storageKey = `j6_scratchpad_${setId}`;

  const [sequence, setSequence] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || [];
    } catch { return []; }
  });

  const [bpm, setBpm] = useState(90);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(sequence));
  }, [sequence, storageKey]);

  const addChord = (key) => {
    if (sequence.length >= 16) return;
    setSequence(prev => [...prev, key]);
  };

  const removeChord = (index) => {
    setSequence(prev => prev.filter((_, i) => i !== index));
  };

  const clear = () => setSequence([]);

  const setFromProgression = (keys) => {
    setSequence(keys.slice(0, 16));
  };

  return { sequence, bpm, setBpm, addChord, removeChord, clear, setFromProgression };
}
```

- [ ] **Step 2: Create `Scratchpad.jsx`**

Shows sequence as chord chips (chord name + key letter). Tap chip to remove. Play/Stop/Clear/Save buttons. BPM control with +/- buttons.

Props: `chords` (set's chords), `sequence`, `bpm`, `onBpmChange`, `onAdd`, `onRemove`, `onClear`, `onPlay`, `onStop`, `isPlaying`.

The "+" dashed button toggles "scratchpad recording mode" — a boolean state. When recording mode is ON, key grid taps add to the scratchpad AND preview the chord. When OFF (default), key grid taps only preview. A visible indicator (pulsing border or "Recording" label on scratchpad) shows when recording is active. Tapping "+" again exits recording mode.

- [ ] **Step 3: Wire into `DetailContent.jsx`**

Add `useScratchpad(set.id)` and `scratchpadRecording` boolean state. Key grid `onKeyPress` handler: always preview chord, additionally call `addChord` if `scratchpadRecording` is true. ProgressionList's "Add to Scratchpad" calls `setFromProgression`. Play button builds the note array from sequence keys and calls `playLoop`.

- [ ] **Step 4: Verify** — tap keys to build sequence, chips appear, tap to remove, play loops, BPM adjusts speed, clear resets, sequence persists on reopen.

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useScratchpad.js src/components/Scratchpad.jsx src/components/Scratchpad.css src/components/ChordSetDetail.jsx
git commit -m "feat: interactive scratchpad with sequence builder and BPM control"
```

---

### Task 18: Save Scratchpad Progressions

**Files:**
- Modify: `src/hooks/useScratchpad.js`
- Modify: `src/components/Scratchpad.jsx`

- [ ] **Step 1: Add save functionality to `useScratchpad.js`**

Add `save(name)` function that stores `{ name, setId, sequence, createdAt }` to `j6_progressions` in localStorage. Add `savedProgressions` state loaded from localStorage.

- [ ] **Step 2: Update `Scratchpad.jsx`**

Save button prompts for a name (simple `window.prompt`), then calls `save(name)`. Show saved progressions below the scratchpad as a compact list.

- [ ] **Step 3: Verify** — save works, saved progressions appear, persist across reloads.

- [ ] **Step 4: Commit**

```bash
git add src/hooks/useScratchpad.js src/components/Scratchpad.jsx
git commit -m "feat: save named progressions from scratchpad"
```

---

## Chunk 5: Polish + Remaining Features

### Task 19: Favorites Tab

**Files:**
- Create: `src/components/FavoritesList.jsx`
- Create: `src/components/FavoritesList.css`

- [ ] **Step 1: Create `FavoritesList.jsx`**

Renders favorited chord sets using `ChordSetCard` in grid view. Shows saved scratchpad progressions under each set. Empty state: "Tap the ♡ on any chord set to save it here." "Copy as Text" button copies plain-text list to clipboard via `navigator.clipboard.writeText()`.

- [ ] **Step 2: Wire into App.jsx** — render FavoritesList for favorites tab.

- [ ] **Step 3: Verify** — favorites show up, empty state renders, copy works.

- [ ] **Step 4: Commit**

```bash
git add src/components/FavoritesList.jsx src/components/FavoritesList.css src/components/App.jsx
git commit -m "feat: favorites tab with copy-to-clipboard export"
```

---

### Task 20: Styles Tab

**Files:**
- Create: `src/components/StyleGuideTab.jsx`
- Create: `src/components/StyleGuideTab.css`

- [ ] **Step 1: Create `StyleGuideTab.jsx`**

Compact reference table for J-6 style banks 1–9. Each bank as a card: bank number, name, character description, best-with genre tags, variation density description (1–4 sparse, 5–8 medium, 9–12 dense).

- [ ] **Step 2: Wire into App.jsx** — render StyleGuideTab for styles tab.

- [ ] **Step 3: Verify** — all 9 banks display, scrollable, readable.

- [ ] **Step 4: Commit**

```bash
git add src/components/StyleGuideTab.jsx src/components/StyleGuideTab.css src/components/App.jsx
git commit -m "feat: style guide reference tab for J-6 banks 1-9"
```

---

### Task 21: Similar Sets Panel

**Files:**
- Modify: `src/data/chordSets.js` (populate `related` arrays)
- Create: `src/components/SimilarSets.jsx`
- Create: `src/components/SimilarSets.css`

- [ ] **Step 1: Add `getRelatedSets` utility function**

Instead of hand-curating `related` arrays (impractical for an agent), create `src/utils/relatedSets.js` with an algorithmic approach:

```js
import { chordSets } from '../data/chordSets';

export function getRelatedSets(setId, limit = 3) {
  const set = chordSets.find(s => s.id === setId);
  if (!set) return [];

  // Same genre family, excluding self, sorted by proximity in set number
  return chordSets
    .filter(s => s.id !== setId && s.genreFamily === set.genreFamily)
    .sort((a, b) => Math.abs(a.id - set.id) - Math.abs(b.id - set.id))
    .slice(0, limit);
}
```

This gives related sets from the same genre family. Can be refined later with hand-curation if desired.

- [ ] **Step 2: Create `SimilarSets.jsx`**

Small horizontal scroll of set cards at the bottom of the detail view. Tap opens that set's detail view.

- [ ] **Step 3: Wire into `DetailContent.jsx`**

- [ ] **Step 4: Commit**

```bash
git add src/data/chordSets.js src/components/SimilarSets.jsx src/components/SimilarSets.css src/components/ChordSetDetail.jsx
git commit -m "feat: similar sets panel in detail view"
```

---

### Task 22: Theory Mode

**Files:**
- Create: `src/hooks/useSettings.js`
- Create: `src/components/TheoryMode.jsx`
- Create: `src/components/TheoryMode.css`

- [ ] **Step 1: Create `src/hooks/useSettings.js`**

```js
import { useState } from 'react';

export function useSettings() {
  const [theoryMode, setTheoryMode] = useState(() => {
    return localStorage.getItem('j6_theory_mode') === 'true';
  });

  const toggleTheoryMode = () => {
    setTheoryMode(prev => {
      localStorage.setItem('j6_theory_mode', String(!prev));
      return !prev;
    });
  };

  return { theoryMode, toggleTheoryMode };
}
```

- [ ] **Step 2: Create `TheoryMode.jsx`**

When enabled, shows 2-3 compatible scales/modes below the chord panel. Static mapping from genreFamily to suggested scales. Example: Neo Soul → "Dorian — flattened 3rd and 7th", "Pentatonic Minor".

- [ ] **Step 3: Add toggle to detail view header or settings**

- [ ] **Step 4: Commit**

```bash
git add src/hooks/useSettings.js src/components/TheoryMode.jsx src/components/TheoryMode.css src/components/ChordSetDetail.jsx
git commit -m "feat: opt-in theory mode with scale suggestions"
```

---

### Task 23: Responsive Audit + Final Polish

**Files:**
- Modify: Various CSS files

- [ ] **Step 1: Test at 375px (iPhone SE)**

Verify: 2-col grid, key grid buttons thumb-reachable, modal doesn't overflow, tab bar clear of safe area.

- [ ] **Step 2: Test at 430px (iPhone Pro Max)**

Verify: same layout with more breathing room.

- [ ] **Step 3: Test at 768px (iPad)**

Verify: 3-col grid, wider key grid, modal centered.

- [ ] **Step 4: Test at 1024px (iPad landscape)**

Verify: max content width, centered layout.

- [ ] **Step 5: Fix any responsive issues found**

- [ ] **Step 6: Add CSS transitions**

Modal slide-up animation, theme toggle fade, grid/list toggle crossfade.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "polish: responsive audit and CSS transitions"
```

---

### Task 24: PWA + Firebase Setup

**Files:**
- Create: `public/manifest.json`
- Create: `public/sw.js` (or use vite-plugin-pwa)
- Create: `firebase.json`, `.firebaserc`
- Modify: `index.html`

- [ ] **Step 1: Install vite-plugin-pwa**

```bash
npm install -D vite-plugin-pwa
```

- [ ] **Step 2: Configure PWA in `vite.config.js`**

```js
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'J-6 Chord Guide',
        short_name: 'J-6 Guide',
        description: 'Companion app for the Roland AIRA J-6 Chord Synth',
        theme_color: '#E8470A',
        background_color: '#111111',
        display: 'standalone',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
  ],
});
```

- [ ] **Step 3: Create app icons**

Create `public/icon.svg` — "J6" text on orange circle:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <circle cx="256" cy="256" r="256" fill="#E8470A"/>
  <text x="256" y="290" text-anchor="middle" font-family="monospace" font-weight="bold" font-size="200" fill="white">J6</text>
</svg>
```

Then generate PNG versions using a build script or manual conversion. Add `public/icon-192.png` and `public/icon-512.png`. If PNG generation isn't possible at build time, use the SVG directly in the manifest (supported by modern browsers) and create PNGs manually later.

- [ ] **Step 4: Create Firebase config files**

Create `firebase.json`:

```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [{ "source": "**", "destination": "/index.html" }]
  }
}
```

Create `.firebaserc`:

```json
{
  "projects": {
    "default": ""
  }
}
```

Note: The user will need to run `firebase login` and set the project ID in `.firebaserc` before deploying. This is a manual step.

- [ ] **Step 5: Test production build**

```bash
npm run build
npm run preview
```

Verify: app works from dist, service worker registers, "Add to Home Screen" prompt available.

- [ ] **Step 6: Deploy to Firebase**

```bash
firebase deploy
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "deploy: PWA config and Firebase hosting setup"
```
