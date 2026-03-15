import { useState } from 'react';
import { chordSets } from '../data/chordSets';
import BrowseGrid from './BrowseGrid';
import './FavoritesList.css';

export default function FavoritesList({ favorites, onToggleFavorite, onSelectSet, viewMode }) {
  const [copied, setCopied] = useState(false);

  const favoriteSets = chordSets.filter((set) => favorites.includes(set.id));

  function buildCopyText() {
    const keys = ['C', 'D', 'F', 'G'];
    const lines = favoriteSets.map((set) => {
      const chordNames = keys
        .map((k) => set.chords[k]?.name)
        .filter(Boolean)
        .slice(0, 4)
        .join(', ');
      return `Set ${String(set.id).padStart(2, '0')} (${set.genre}): ${chordNames}...`;
    });
    return `J-6 Chord Guide — Favorites\n---\n${lines.join('\n')}`;
  }

  function handleCopy() {
    navigator.clipboard.writeText(buildCopyText()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      // Clipboard API not available or permission denied
      setCopied(false);
      alert('Unable to copy to clipboard. Please copy manually.');
    });
  }

  return (
    <div className="favorites-tab">
      <div className="favorites-header">
        <div>
          <span className="favorites-title">Favorites</span>
          {favoriteSets.length > 0 && (
            <span className="favorites-count"> · {favoriteSets.length} set{favoriteSets.length !== 1 ? 's' : ''}</span>
          )}
        </div>
        {favoriteSets.length > 0 && (
          <button className="favorites-copy-btn" onClick={handleCopy}>
            {copied ? 'Copied!' : 'Copy as Text'}
          </button>
        )}
      </div>

      {favoriteSets.length === 0 ? (
        <div className="favorites-empty">
          Tap the heart on any chord set to save it here.
        </div>
      ) : (
        <BrowseGrid
          sets={favoriteSets}
          viewMode={viewMode}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
          onSelectSet={onSelectSet}
        />
      )}
    </div>
  );
}
