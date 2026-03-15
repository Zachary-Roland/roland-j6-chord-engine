import { genreFamilies } from '../data/genreConfig';
import './GenreFilter.css';

export default function GenreFilter({ activeGenre, onGenreChange }) {
  return (
    <div className="genre-filter-wrapper">
      <div className="genre-filter">
        <button
          className={`genre-pill${activeGenre === 'all' ? ' genre-pill--active' : ''}`}
          onClick={() => onGenreChange('all')}
        >
          All
        </button>
        {genreFamilies.map(family => (
          <button
            key={family.slug}
            className={`genre-pill${activeGenre === family.slug ? ' genre-pill--active' : ''}`}
            onClick={() => onGenreChange(family.slug)}
          >
            {family.label}
          </button>
        ))}
      </div>
    </div>
  );
}
