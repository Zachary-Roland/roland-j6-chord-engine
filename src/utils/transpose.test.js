import { describe, it, expect } from 'vitest';
import { transposeKey, getProgressionChords } from './transpose';

describe('transposeKey', () => {
  it('returns the same key for 0 semitones', () => {
    expect(transposeKey('C', 0)).toBe('C');
  });

  it('transposes up by semitones', () => {
    expect(transposeKey('C', 2)).toBe('D');
    expect(transposeKey('C', 7)).toBe('G');
  });

  it('wraps octaves correctly', () => {
    expect(transposeKey('C', 12)).toBe('C');
    expect(transposeKey('A', 3)).toBe('C');
  });

  it('handles negative offsets', () => {
    expect(transposeKey('C', -1)).toBe('B');
    expect(transposeKey('C', -12)).toBe('C');
  });

  it('returns input unchanged for unknown root', () => {
    expect(transposeKey('H', 2)).toBe('H');
  });
});

describe('getProgressionChords', () => {
  const fakeSet = {
    chords: {
      C: { name: 'Cmaj7', notes: ['C4', 'E4', 'G4', 'B4'] },
      F: { name: 'Fmaj7', notes: ['F4', 'A4', 'C5', 'E5'] },
      G: { name: 'G7', notes: ['G3', 'B3', 'D4', 'F4'] },
    },
  };

  it('maps progression steps to chords in the set', () => {
    const result = getProgressionChords(fakeSet, 'C', [0, 5, 7]);
    expect(result).toHaveLength(3);
    expect(result[0].name).toBe('Cmaj7');
    expect(result[1].name).toBe('Fmaj7');
    expect(result[2].name).toBe('G7');
  });

  it('falls back to key name when chord is missing from set', () => {
    const result = getProgressionChords(fakeSet, 'C', [1]);
    expect(result[0].key).toBe('C#');
    expect(result[0].name).toBe('C#');
    expect(result[0].notes).toEqual([]);
  });
});
