export const progressions = [
  // Pop
  {
    id: "the-anthem",
    name: "The Anthem",
    genreFamilies: ["pop"],
    steps: [0, 7, 9, 5],
    roman: ["I", "V", "vi", "IV"],
    vibe: "The most popular progression in modern pop.",
  },
  {
    id: "minor-start",
    name: "Minor Start",
    genreFamilies: ["pop"],
    steps: [9, 5, 0, 7],
    roman: ["vi", "IV", "I", "V"],
    vibe: "Same chords, moodier starting point.",
  },
  {
    id: "the-climber",
    name: "The Climber",
    genreFamilies: ["pop"],
    steps: [0, 5, 7, 5],
    roman: ["I", "IV", "V", "IV"],
    vibe: "Builds tension and releases.",
  },

  // Jazz
  {
    id: "two-five-one",
    name: "ii–V–I",
    genreFamilies: ["jazz"],
    steps: [2, 7, 0],
    roman: ["ii", "V", "I"],
    vibe: "The foundation of jazz harmony.",
  },
  {
    id: "rhythm-changes",
    name: "Rhythm Changes",
    genreFamilies: ["jazz"],
    steps: [0, 9, 2, 7],
    roman: ["I", "VI", "ii", "V"],
    vibe: "Classic turnaround from the Great American Songbook.",
  },
  {
    id: "minor-turnaround",
    name: "Minor Turnaround",
    genreFamilies: ["jazz"],
    steps: [9, 2, 7, 0],
    roman: ["vi", "ii", "V", "I"],
    vibe: "Minor color resolving to major. Timeless.",
  },

  // Soul / R&B / Neo Soul
  {
    id: "neo-soul-loop",
    name: "Neo-Soul Loop",
    genreFamilies: ["soul-rnb"],
    steps: [0, 3, 8, 10],
    roman: ["i", "bIII", "bVI", "bVII"],
    vibe: "Hypnotic. Lay back on the beat.",
  },
  {
    id: "smooth-cycle",
    name: "Smooth Cycle",
    genreFamilies: ["soul-rnb"],
    steps: [0, 9, 2, 7],
    roman: ["I", "vi", "ii", "V"],
    vibe: "Warm and circular. Great for ballads.",
  },
  {
    id: "the-slow-jam",
    name: "The Slow Jam",
    genreFamilies: ["soul-rnb"],
    steps: [0, 10, 8, 7],
    roman: ["i", "bVII", "bVI", "V"],
    vibe: "Descending minor. Late night feels.",
  },
  {
    id: "pocket-vamp",
    name: "Pocket Vamp",
    genreFamilies: ["soul-rnb"],
    steps: [0, 5],
    roman: ["i", "iv"],
    vibe: "Two chords, all rhythm. Less is more.",
  },

  // House / Synthwave / EDM
  {
    id: "hypnotic-vamp",
    name: "Hypnotic Vamp",
    genreFamilies: ["house", "synthwave"],
    steps: [9, 7, 5, 7],
    roman: ["vi", "V", "IV", "V"],
    vibe: "Driving minor loop. Keeps the floor moving.",
  },
  {
    id: "minimal-two",
    name: "Minimal Two",
    genreFamilies: ["house", "synthwave"],
    steps: [9, 7],
    roman: ["vi", "V"],
    vibe: "Two-chord hypnosis. Add rhythm, not chords.",
  },
  {
    id: "lydian-drift",
    name: "Lydian Drift",
    genreFamilies: ["house", "synthwave"],
    steps: [0, 2],
    roman: ["I", "II"],
    vibe: "Floaty, ethereal. The raised 4th does the work.",
  },

  // Cinematic
  {
    id: "eno-drift",
    name: "Eno Drift",
    genreFamilies: ["cinematic"],
    steps: [0, 4, 9],
    roman: ["I", "III", "vi"],
    vibe: "Slow, spacious. Let each chord breathe.",
  },
  {
    id: "colour-field",
    name: "Colour Field",
    genreFamilies: ["cinematic"],
    steps: [5, 0, 7],
    roman: ["IV", "I", "V"],
    vibe: "Open fifths. Works with any texture.",
  },
  {
    id: "dark-tape",
    name: "Dark Tape",
    genreFamilies: ["cinematic"],
    steps: [9, 5, 3],
    roman: ["vi", "IV", "bIII"],
    vibe: "Minor and mysterious. Tape hiss optional.",
  },

  // Gospel / R&B (also applies to soul-rnb)
  {
    id: "gospel-turnaround",
    name: "Gospel Turnaround",
    genreFamilies: ["soul-rnb"],
    steps: [0, 5, 7, 5],
    roman: ["I", "IV", "V", "IV"],
    vibe: "Church chords. Play with conviction.",
  },
  {
    id: "soul-cycle",
    name: "Soul Cycle",
    genreFamilies: ["soul-rnb"],
    steps: [9, 2, 7, 0],
    roman: ["vi", "ii", "V", "I"],
    vibe: "Full circle. Every chord earns the next.",
  },

  // Bossa Nova (under jazz family)
  {
    id: "bossa-core",
    name: "Bossa Core",
    genreFamilies: ["jazz"],
    steps: [0, 0, 5, 5],
    roman: ["I", "I7", "IV", "iv"],
    vibe: "Classic bossa. The minor IV is the magic.",
  },

  // Funk
  {
    id: "two-chord-funk",
    name: "Two-Chord Vamp",
    genreFamilies: ["funk"],
    steps: [0, 5],
    roman: ["I", "IV"],
    vibe: "All about the groove, not the changes.",
  },
  {
    id: "funk-turnaround",
    name: "Funk Turnaround",
    genreFamilies: ["funk"],
    steps: [0, 5, 0, 7],
    roman: ["i", "iv", "i", "V"],
    vibe: "Minor funk with a dominant push.",
  },

  // Blues
  {
    id: "twelve-bar-short",
    name: "12-Bar (Short)",
    genreFamilies: ["blues"],
    steps: [0, 5, 0, 7],
    roman: ["I", "IV", "I", "V"],
    vibe: "The bones of the blues. Add your own story.",
  },

  // Classical
  {
    id: "classical-descent",
    name: "Descending Bass",
    genreFamilies: ["classical"],
    steps: [0, 11, 9, 7],
    roman: ["I", "vii", "vi", "V"],
    vibe: "Baroque-inspired stepwise descent.",
  },
  {
    id: "classical-circle",
    name: "Circle of Fifths",
    genreFamilies: ["classical"],
    steps: [0, 5, 10, 3],
    roman: ["I", "IV", "bVII", "bIII"],
    vibe: "Stately motion through the circle.",
  },

  // Utility — generic progressions that work with any set
  {
    id: "utility-major-basic",
    name: "Major Basics",
    genreFamilies: ["utility"],
    steps: [0, 5, 7, 0],
    roman: ["I", "IV", "V", "I"],
    vibe: "The most fundamental progression. Start here.",
  },
  {
    id: "utility-minor-basic",
    name: "Minor Basics",
    genreFamilies: ["utility"],
    steps: [0, 5, 7, 0],
    roman: ["i", "iv", "v", "i"],
    vibe: "Same shape, minor color. Mood shift.",
  },
  {
    id: "utility-chromatic-walk",
    name: "Chromatic Walk",
    genreFamilies: ["utility"],
    steps: [0, 1, 2, 3],
    roman: ["I", "bII", "II", "bIII"],
    vibe: "Step through the chromatic set. Hear what you have.",
  },
];
