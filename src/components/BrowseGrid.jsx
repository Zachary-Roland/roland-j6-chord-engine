import ChordSetCard from './ChordSetCard';
import './BrowseGrid.css';

export default function BrowseGrid({ sets, viewMode, favorites, onToggleFavorite, onSelectSet }) {
  if (!sets || sets.length === 0) {
    return (
      <div className="browse-empty">
        No chord sets match your search.
      </div>
    );
  }

  return (
    <div className={viewMode === 'list' ? 'browse-list' : 'browse-grid'}>
      {sets.map((set) => (
        <ChordSetCard
          key={set.id}
          set={set}
          viewMode={viewMode}
          isFavorite={favorites.includes(set.id)}
          onToggleFavorite={onToggleFavorite}
          onSelect={onSelectSet}
        />
      ))}
    </div>
  );
}
