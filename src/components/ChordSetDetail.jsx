import { useState } from 'react';
import KeyGrid from './KeyGrid';
import ChordPanel from './ChordPanel';
import { getGenreColor } from '../data/genreConfig';
import './ChordSetDetail.css';

export default function ChordSetDetail({
  set,
  isFavorite,
  onToggleFavorite,
  onClose,
  playChord,
  isMuted,
  toggleMute,
}) {
  const [selectedKey, setSelectedKey] = useState('C');

  if (!set) return null;

  const genreColor = getGenreColor(set.genre);

  const handleKeyPress = (key) => {
    setSelectedKey(key);
    const chord = set.chords[key];
    if (chord?.notes) {
      playChord(chord.notes);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="detail-overlay" onClick={handleOverlayClick}>
      <div className="detail-modal">
        {/* Header */}
        <div className="detail-header">
          <div className="detail-header-left">
            <span className="detail-set-number">#{set.id}</span>
            <span
              className="detail-genre-tag"
              style={{ backgroundColor: genreColor + '26', color: genreColor }}
            >
              {set.genre}
            </span>
          </div>
          <div className="detail-header-actions">
            <button
              className="detail-action-btn"
              onClick={() => onToggleFavorite(set.id)}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite ? '♥' : '♡'}
            </button>
            <button
              className="detail-action-btn"
              onClick={toggleMute}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? '🔇' : '🔊'}
            </button>
            <button
              className="detail-action-btn"
              onClick={onClose}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Key Grid */}
        <div className="detail-section">
          <div className="detail-section-title">Keys</div>
          <KeyGrid
            chords={set.chords}
            selectedKey={selectedKey}
            onKeyPress={handleKeyPress}
          />
        </div>

        {/* Chord Panel */}
        <div className="detail-section">
          <div className="detail-section-title">Chord Detail</div>
          <ChordPanel chord={set.chords[selectedKey]} />
        </div>

        {/* Placeholder: Progression suggestions */}
        <div className="detail-section">
          <div className="detail-section-title">Progression Suggestions</div>
          <p style={{ color: 'var(--text-sub)', fontSize: 14 }}>Coming soon</p>
        </div>

        {/* Placeholder: Scratchpad */}
        <div className="detail-section">
          <div className="detail-section-title">Scratchpad</div>
          <p style={{ color: 'var(--text-sub)', fontSize: 14 }}>Coming soon</p>
        </div>
      </div>
    </div>
  );
}
