# J-6 Chord Guide

A mobile-first web app companion for the **Roland AIRA J-6 Chord Synth**. Designed to be open on your phone while you program the J-6 sequencer — browse all 100 chord sets, discover progressions, build sequences, and hear everything before you play it.

**Live app:** [roland-j6-chord-guide.web.app](https://roland-j6-chord-guide.web.app)

---

## What This App Does

The J-6 has 100 built-in chord sets, each with 12 chords mapped to keys C through B. That's 1,200 chords — and the owner's manual buries them in a long table. This app makes them browsable, searchable, audible, and useful.

The core workflow:
1. **Find a chord set** that fits your vibe
2. **Pick a root key** and hear the chords
3. **Discover a progression** that works within those 12 chords
4. **Program it** into your J-6 sequencer

---

## Features

### Browse All 100 Chord Sets

The home screen shows all 100 chord sets as color-coded cards organized by genre. You can switch between a compact **grid view** (for scanning) and a **list view** (for detail).

Each card shows the set number, genre, and the chord on the C key as a quick preview. Tap any card to open its full detail view.

**Search** works across set numbers, genre names, and chord names within sets — type "m9" to find every set that contains a minor 9th chord, or "72" to jump to Set 72.

### Genre Filters

Ten genre families let you narrow down fast:

**Pop** · **Jazz** · **Blues** · **Cinematic** · **Synthwave** · **House** · **Soul/R&B** · **Funk** · **Classical** · **Utility**

The genre pills are scrollable and sticky — they follow you as you scroll through the grid. Each genre has its own color inspired by the Roland AIRA product line.

### Random Button

The orange dice button in the bottom-right corner opens a random chord set. If you have a genre filter active, it picks randomly within that genre. This is the best way to discover sets you wouldn't have tried otherwise.

### Favorites

Tap the heart icon on any card or in the detail view to save it. Your favorites are accessible from the Favorites tab in the bottom navigation. You can also **copy your favorites as plain text** — useful for keeping a list in your notes app or sharing with someone.

Favorites persist in your browser's local storage, so they'll still be there next time you open the app.

### Piano Keyboard

When you open a chord set, you'll see a **piano-style keyboard** with two rows — black keys on top, white keys below — just like the J-6's key layout. Each key shows the chord name assigned to it in that set.

Tap a key to:
- **Hear the chord** played with the exact voicing from the J-6 manual
- **See the chord name** and individual voicing notes displayed below the keyboard
- **Add it to the scratchpad** (if auto-add is enabled in Settings)

You can toggle between **chord mode** (all notes at once) and **arpeggio mode** (notes played one at a time) using the arpeggio icon in the detail header.

### Progression Suggestions

Below the keyboard, you'll find **curated chord progressions** tailored to each genre family. Each suggestion shows:

- The progression name and a short description of its character
- The chord sequence as colored pills showing the key, chord name, and Roman numeral
- A **Play Loop** button that plays the progression in sequence

Progressions are displayed using the actual chord names from the current set — not generic names. If you're in Set 72 (Neo Soul) looking at the "Neo-Soul Loop" progression, you'll see the real chords: Cm9 → EbM7 → AbM7 → BbM7.

Tap **Add to Scratchpad** to copy any suggestion into the scratchpad for editing.

### Interactive Scratchpad

The scratchpad is your workspace for building custom chord sequences. It sits below the progression suggestions in the detail view.

**How to use it:**
1. Tap keys on the piano keyboard — each tap adds that chord as a step
2. Your sequence builds left to right as a row of chord chips
3. Tap **Play** to hear the sequence loop at the current BPM
4. Tap any chip to remove it from the sequence
5. Use the **+/−** buttons to adjust tempo (BPM)
6. Tap **Clear** to start over

The scratchpad supports up to 16 steps — matching the J-6's pattern step capacity. You can toggle between chord and arpeggio playback directly in the scratchpad.

**Scratchpad modes** (configurable in Settings):
- **Per Set** — each chord set has its own scratchpad, saved separately
- **Global** — one scratchpad shared across all sets

### Scale Suggestions

At the bottom of each chord set detail, you'll find **compatible scales and modes** for the currently selected chord. This helps if you're playing a melodic instrument alongside the J-6.

Each suggestion includes the scale name and a practical tip — for example, selecting a Cm9 chord suggests Dorian ("Natural 6th gives warmth. Neo-soul staple.") and Pentatonic Minor ("Can't miss. 5 notes, all good.").

### Similar Sets

Below the scale suggestions, the app recommends **2–3 other chord sets** that work well in the same context. These are drawn from the same genre family. Tap one to jump to that set's detail view — useful for exploring when you're not sure which set to commit to.

### Style Guide

The **Styles tab** (accessible from the bottom navigation) is a reference for the J-6's 9 style banks and their 12 variations. Each bank card shows:

- The bank number and name (Arpeggio, Beat, Phrase)
- A description of the sonic character
- Which genres it pairs well with
- A density breakdown: variations 1–4 are sparse, 5–8 medium, 9–12 dense/complex

This information is scattered across the J-6 manual and doesn't exist in a clean, scannable format anywhere else online.

### Settings

Accessible via the gear icon in the header:

- **Theme** — Dark or light mode. Defaults to your system preference.
- **Default playback** — Chord (all notes at once) or arpeggio
- **Default BPM** — Starting tempo for loop playback (40–200)
- **Auto-play on tap** — Whether tapping a key plays audio immediately
- **Loop playback** — Play once or loop continuously
- **Scratchpad mode** — Per set or global
- **Auto-add to scratchpad** — Whether every key tap adds a step automatically
- **Add to Home Screen** — Install instructions for iOS and Android

### Install as an App

The J-6 Chord Guide is a **Progressive Web App (PWA)** — you can install it to your phone's home screen and it works offline.

On first visit, a banner at the bottom will walk you through the install steps. If you dismiss it, you can always find the instructions again in **Settings → Install**.

---

## Data Source

All 100 chord sets with exact voicing notes are sourced from the [Roland AIRA J-6 Owner's Manual v1.02](https://www.roland.com/global/products/j-6/).

## License

MIT
