const NOTES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];

// Given a root key name (e.g., "C") and a semitone offset, return the target key name
export const transposeKey = (rootKey, semitones) => {
  const rootIndex = NOTES.indexOf(rootKey);
  if (rootIndex === -1) return rootKey;
  return NOTES[(rootIndex + semitones) % 12];
};

// Given a chord set and a progression (array of semitone offsets),
// return the chord names for a given root key
export const getProgressionChords = (chordSet, rootKey, steps) => {
  return steps.map(offset => {
    const targetKey = transposeKey(rootKey, offset);
    const chord = chordSet.chords[targetKey];
    return {
      key: targetKey,
      name: chord ? chord.name : targetKey,
      notes: chord ? chord.notes : [],
    };
  });
};
