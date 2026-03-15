import { getGenreColor } from '../data/genreConfig';
import { needsDarkText } from '../utils/color';
import './ChordSetCard.css';

const HeartIcon = ({ filled }) => (
  <svg
    className={`heart-icon${filled ? ' heart-icon--filled' : ''}`}
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill={filled ? 'var(--orange)' : 'none'}
    stroke={filled ? 'var(--orange)' : 'currentColor'}
    strokeWidth="2"
    aria-hidden="true"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

export default function ChordSetCard({ set, viewMode, isFavorite, onToggleFavorite, onSelect }) {
  const color = getGenreColor(set.genre);
  const darkText = needsDarkText(color);
  const textColor = darkText ? '#111111' : '#ffffff';
  const textColorSub = darkText ? 'rgba(0,0,0,0.65)' : 'rgba(255,255,255,0.75)';
  const textColorStrong = darkText ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.9)';
  const pillBg = darkText ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.2)';
  const pillColor = darkText ? 'rgba(0,0,0,0.75)' : 'rgba(255,255,255,0.9)';
  const cardStyle = {
    backgroundColor: color,
    '--card-text': textColor,
    '--card-text-sub': textColorSub,
    '--card-text-strong': textColorStrong,
    '--card-pill-bg': pillBg,
    '--card-pill-color': pillColor,
  };
  const cChord = set.chords['C']?.name ?? '—';
  const gChord = set.chords['G']?.name ?? '—';

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite(set.id);
  };

  if (viewMode === 'list') {
    return (
      <div
        className="chord-set-card chord-set-card--list"
        style={cardStyle}
        onClick={() => onSelect(set)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onSelect(set)}
        aria-label={`Chord Set ${set.id}, ${set.genre}`}
      >
        <span className="card-set-number card-set-number--list">
          {String(set.id).padStart(2, '0')}
        </span>
        <span className="card-genre-pill">
          {set.genre}
        </span>
        <span className="card-chord-preview card-chord-preview--c">{cChord}</span>
        <span className="card-chord-preview card-chord-preview--g">{gChord}</span>
        <button
          className="card-favorite-btn"
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <HeartIcon filled={isFavorite} />
        </button>
      </div>
    );
  }

  return (
    <div
      className="chord-set-card chord-set-card--grid"
      style={cardStyle}
      onClick={() => onSelect(set)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(set)}
      aria-label={`Chord Set ${set.id}, ${set.genre}`}
    >
      <div className="card-top-row">
        <span className="card-set-number">
          {String(set.id).padStart(2, '0')}
        </span>
        <button
          className="card-favorite-btn"
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <HeartIcon filled={isFavorite} />
        </button>
      </div>
      <div className="card-c-chord">{cChord}</div>
      <div className="card-bottom-row">
        <span className="card-genre-pill">
          {set.genre}
        </span>
      </div>
    </div>
  );
}
