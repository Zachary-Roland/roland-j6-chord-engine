// Roland J-6 phrase list, transcribed from the official manual:
// https://static.roland.com/manuals/J-6_manual_v102/eng/28645808.html
//
// 9 styles grouped into 3 categories. Each style has 12 variations.
// For PHRASE styles (6–9), the J-6 ships all 12 variation slots blank —
// they're user-programmable, so variations is null here and the UI shows
// a single explanatory note instead of a fabricated list.

export const styleGuide = [
  {
    style: 1,
    category: 'ARPEGGIO',
    name: 'Arpeggio (8th)',
    variations: [
      'UP1 (8th)',
      'UP&DOWN1 (8th)',
      'DOWN1 (8th)',
      'DOWN2 (8th)',
      'UP&DOWN2 (8th)',
      'UP2 (8th)',
      'UP1 (8th Triplet)',
      'UP&DOWN1 (8th Triplet)',
      'DOWN1 (8th Triplet)',
      'DOWN2 (8th Triplet)',
      'UP&DOWN2 (8th Triplet)',
      'UP2 (8th Triplet)',
    ],
  },
  {
    style: 2,
    category: 'ARPEGGIO',
    name: 'Arpeggio (16th)',
    variations: [
      'UP1 (16th)',
      'UP&DOWN1 (16th)',
      'DOWN1 (16th)',
      'DOWN2 (16th)',
      'UP&DOWN2 (16th)',
      'UP2 (16th)',
      'UP1 (16th Triplet)',
      'UP&DOWN1 (16th Triplet)',
      'DOWN1 (16th Triplet)',
      'DOWN2 (16th Triplet)',
      'UP&DOWN2 (16th Triplet)',
      'UP2 (16th Triplet)',
    ],
  },
  {
    style: 3,
    category: 'BEAT',
    name: 'Note Duration',
    variations: [
      'Double Whole note',
      'Whole note',
      'Half note',
      'Quarter note',
      'Eighth note',
      'Sixteenth note',
      'Double Whole note triplet',
      'Whole note triplet',
      'Half note triplet',
      'Quarter note triplet',
      'Eighth note triplet',
      'Sixteenth note triplet',
    ],
  },
  {
    style: 4,
    category: 'BEAT',
    name: '16th Pattern A',
    variations: [
      'o___ (16th)',
      '_o__ (16th)',
      '__o_ (16th)',
      '___o (16th)',
      'o~o_ (8th and 16th)',
      'o_o~ (16th and 8th)',
      'o~~o (dotted 8th and 16th)',
      '_o~o (8th and 16th)',
      'ooo_ (16th)',
      'oo_o (16th)',
      'o_oo (16th)',
      '_ooo (16th)',
    ],
  },
  {
    style: 5,
    category: 'BEAT',
    name: '16th Pattern B',
    variations: [
      'oo__ (16th)',
      'o_o_ (16th)',
      'o__o (16th)',
      '_oo_ (16th)',
      '_o_o (16th)',
      '__oo (16th)',
      'o__ (16th, Syncopation)',
      '_o_ (16th, Syncopation)',
      '__o (16th, Syncopation)',
      'oo_ (16th, Syncopation)',
      'o_o (16th, Syncopation)',
      '_oo (16th, Syncopation)',
    ],
  },
  { style: 6, category: 'PHRASE', name: 'Chord Phrases (Simple)', variations: null },
  { style: 7, category: 'PHRASE', name: 'Chord Phrases (Rhythmic)', variations: null },
  { style: 8, category: 'PHRASE', name: 'Strummed Chord Phrases (Simple)', variations: null },
  { style: 9, category: 'PHRASE', name: 'Strummed Chord Phrases (Rhythmic)', variations: null },
];

export const rhythmNotation = [
  { symbol: 'o', meaning: '16th note' },
  { symbol: '_', meaning: '16th rest' },
  { symbol: 'o~', meaning: 'eighth note' },
  { symbol: 'o~~', meaning: 'dotted eighth note' },
];
