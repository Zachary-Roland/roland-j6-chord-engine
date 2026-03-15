import './TheoryMode.css';

const getScaleSuggestions = (chordName, keyName) => {
  const name = chordName.toLowerCase();

  if (name.includes('dim')) {
    return [
      { scale: 'Diminished (H-W)', tip: 'Half-whole pattern. Dark, tense.' },
      { scale: 'Locrian', tip: 'Natural minor with flat 2 and flat 5.' },
    ];
  }
  if (name.includes('aug')) {
    return [
      { scale: 'Whole Tone', tip: 'Symmetric, dreamy. Every note works.' },
      { scale: 'Lydian #5', tip: 'Bright and otherworldly.' },
    ];
  }
  if (name.includes('m7b5') || name.includes('m7♭5')) {
    return [
      { scale: 'Locrian', tip: 'The natural choice. Flat 2 adds tension.' },
      { scale: 'Locrian #2', tip: 'Slightly brighter. Natural 2nd.' },
    ];
  }
  if (name.includes('7#9') || name.includes('7alt') || name.includes('alt')) {
    return [
      { scale: 'Altered (Super Locrian)', tip: 'All tensions altered. Maximum color.' },
      { scale: 'Half-Whole Diminished', tip: 'Dominant diminished. Blues-jazz hybrid.' },
    ];
  }
  if (name.includes('m9') || name.includes('m7') || name.includes('m11') || name.includes('min')) {
    return [
      { scale: 'Dorian', tip: 'Natural 6th gives warmth. Neo-soul staple.' },
      { scale: 'Aeolian (Natural Minor)', tip: 'Safe, dark. Works everywhere.' },
      { scale: 'Pentatonic Minor', tip: "Can't miss. 5 notes, all good." },
    ];
  }
  if (name.includes('sus')) {
    return [
      { scale: 'Mixolydian', tip: 'Dominant sound without the leading tone.' },
      { scale: 'Pentatonic Major', tip: 'Open, airy. Float over the sus.' },
    ];
  }
  if (name.includes('9') || name.includes('7') || name.includes('13')) {
    return [
      { scale: 'Mixolydian', tip: 'The dominant scale. Flat 7 is key.' },
      { scale: 'Blues Scale', tip: 'Add the blue note for grit.' },
      { scale: 'Pentatonic Major', tip: 'Safe and soulful over dominants.' },
    ];
  }
  // Default: major chords (M7, M9, add9, 6, etc.)
  return [
    { scale: 'Ionian (Major)', tip: 'Home base. Bright and resolved.' },
    { scale: 'Lydian', tip: 'Raised 4th floats. Cinematic, dreamy.' },
    { scale: 'Pentatonic Major', tip: "Can't go wrong. 5 bulletproof notes." },
  ];
};

export default function TheoryMode({ chordName, keyName }) {
  if (!chordName) return null;

  const suggestions = getScaleSuggestions(chordName, keyName);

  return (
    <div className="theory-mode">
      <div className="theory-mode-title">Scale Suggestions — {keyName} {chordName}</div>
      {suggestions.map((item, i) => (
        <div key={i} className="theory-scale-card">
          <div className="theory-scale-name">{item.scale}</div>
          <div className="theory-scale-tip">{item.tip}</div>
        </div>
      ))}
    </div>
  );
}
