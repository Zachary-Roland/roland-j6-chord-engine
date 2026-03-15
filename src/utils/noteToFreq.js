const NOTES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];

const FLAT_TO_SHARP = { 'Db': 'C#', 'Eb': 'D#', 'Fb': 'E', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#', 'Cb': 'B' };

function normalizeNote(str) {
  const m = str.match(/^([A-G][b#]?)(-?\d)$/);
  if (!m) return str;
  const noteName = FLAT_TO_SHARP[m[1]] || m[1];
  return noteName + m[2];
}

function noteToMidi(str) {
  const normalized = normalizeNote(str);
  const m = normalized.match(/^([A-G]#?)(-?\d)$/);
  if (!m) return 69; // fallback to A4
  return (parseInt(m[2]) + 1) * 12 + NOTES.indexOf(m[1]);
}

export const noteToFreq = (str) => 440 * Math.pow(2, (noteToMidi(str) - 69) / 12);
