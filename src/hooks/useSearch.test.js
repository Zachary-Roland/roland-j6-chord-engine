import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSearch } from './useSearch';

describe('useSearch', () => {
  it('returns all chord sets by default', () => {
    const { result } = renderHook(() => useSearch());
    expect(result.current.filteredSets.length).toBeGreaterThan(0);
    expect(result.current.searchQuery).toBe('');
    expect(result.current.activeGenre).toBe('all');
  });

  it('filters by search query', () => {
    const { result } = renderHook(() => useSearch());
    const initialCount = result.current.filteredSets.length;

    act(() => result.current.setSearchQuery('jazz'));

    expect(result.current.filteredSets.length).toBeLessThan(initialCount);
    expect(result.current.searchQuery).toBe('jazz');
  });

  it('returns empty array for impossible search query', () => {
    const { result } = renderHook(() => useSearch());
    act(() => result.current.setSearchQuery('zzznonexistentzzz'));
    expect(result.current.filteredSets).toEqual([]);
  });

  it('filters by genre family when activeGenre is not "all"', () => {
    const { result } = renderHook(() => useSearch());
    const initialCount = result.current.filteredSets.length;

    const firstGenreFamily = result.current.filteredSets[0]?.genreFamily;
    if (!firstGenreFamily) throw new Error('Test fixture: no genreFamily in chordSets');

    act(() => result.current.setActiveGenre(firstGenreFamily));

    expect(result.current.filteredSets.every(s => s.genreFamily === firstGenreFamily)).toBe(true);
    expect(result.current.filteredSets.length).toBeLessThanOrEqual(initialCount);
  });

  it('trims whitespace from search queries', () => {
    const { result } = renderHook(() => useSearch());
    act(() => result.current.setSearchQuery('   '));
    expect(result.current.filteredSets.length).toBeGreaterThan(0);
  });
});
