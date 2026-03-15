import { useState, useCallback } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem('j6_favorites');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const toggleFavorite = useCallback((setId) => {
    setFavorites(prev => {
      const next = prev.includes(setId)
        ? prev.filter(id => id !== setId)
        : [...prev, setId];
      localStorage.setItem('j6_favorites', JSON.stringify(next));
      return next;
    });
  }, []);

  const isFavorite = useCallback((setId) => {
    return favorites.includes(setId);
  }, [favorites]);

  return { favorites, toggleFavorite, isFavorite };
}
