import { useState, useMemo } from 'react';
import { chordSets } from '../data/chordSets';
import { genreToFamily } from '../data/genreConfig';

export function useSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGenre, setActiveGenre] = useState('all'); // 'all' or a genreFamily slug

  const filteredSets = useMemo(() => {
    let results = chordSets;

    // Filter by genre family
    if (activeGenre !== 'all') {
      results = results.filter(set => set.genreFamily === activeGenre);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      results = results.filter(set => {
        // Match set number
        if (String(set.id).includes(q)) return true;
        // Match genre
        if (set.genre.toLowerCase().includes(q)) return true;
        // Match chord names within the set
        const chordNames = Object.values(set.chords).map(c => c.name.toLowerCase());
        if (chordNames.some(name => name.includes(q))) return true;
        return false;
      });
    }

    return results;
  }, [searchQuery, activeGenre]);

  return {
    searchQuery,
    setSearchQuery,
    activeGenre,
    setActiveGenre,
    filteredSets,
  };
}
