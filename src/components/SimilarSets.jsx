import { useMemo } from 'react';
import { chordSets } from '../data/chordSets';
import { getGenreColor } from '../data/genreConfig';
import './SimilarSets.css';

function needsDarkText(hexColor) {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5;
}

const getSimilarSets = (currentSet) => {
  const sameFamily = chordSets.filter(
    s => s.genreFamily === currentSet.genreFamily && s.id !== currentSet.id
  );

  // Shuffle and take up to 3
  const shuffled = [...sameFamily].sort(() => Math.random() - 0.5);
  const result = shuffled.slice(0, 3);

  // If we have fewer than 3, add from other families
  if (result.length < 3) {
    const others = chordSets.filter(
      s => s.genreFamily !== currentSet.genreFamily && s.id !== currentSet.id
    ).sort(() => Math.random() - 0.5);
    result.push(...others.slice(0, 3 - result.length));
  }

  return result;
};

export default function SimilarSets({ currentSet, onSelectSet }) {
  const similarSets = useMemo(
    () => getSimilarSets(currentSet),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentSet.id]
  );

  if (similarSets.length === 0) return null;

  return (
    <div className="similar-sets">
      <div className="similar-sets-title">Similar Sets</div>
      <div className="similar-sets-row">
        {similarSets.map(s => {
          const color = getGenreColor(s.genre);
          const dark = needsDarkText(color);
          const cChord = s.chords['C']?.name ?? '—';
          return (
            <button
              key={s.id}
              className="similar-set-card"
              style={{
                backgroundColor: color,
                '--card-text': dark ? '#111111' : '#ffffff',
                '--card-text-sub': dark ? 'rgba(0,0,0,0.65)' : 'rgba(255,255,255,0.75)',
                '--card-text-strong': dark ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.9)',
              }}
              onClick={() => onSelectSet(s)}
              aria-label={`Open chord set ${s.id}, ${s.genre}`}
            >
              <div className="similar-set-number">#{String(s.id).padStart(2, '0')}</div>
              <div className="similar-set-genre">{s.genre}</div>
              <div className="similar-set-chord">{cChord}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
