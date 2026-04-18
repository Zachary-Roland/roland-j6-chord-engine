import { describe, it, expect } from 'vitest';
import { noteToFreq } from './noteToFreq';

describe('noteToFreq', () => {
  it('returns 440 Hz for A4 (concert pitch reference)', () => {
    expect(noteToFreq('A4')).toBeCloseTo(440, 2);
  });

  it('returns ~261.63 Hz for C4 (middle C)', () => {
    expect(noteToFreq('C4')).toBeCloseTo(261.63, 2);
  });

  it('returns double the frequency one octave up', () => {
    expect(noteToFreq('A5')).toBeCloseTo(noteToFreq('A4') * 2, 2);
  });

  it('treats flat and sharp enharmonic equivalents as equal', () => {
    expect(noteToFreq('Db4')).toBeCloseTo(noteToFreq('C#4'), 4);
    expect(noteToFreq('Bb3')).toBeCloseTo(noteToFreq('A#3'), 4);
  });

  it('falls back to A4 (440 Hz) for malformed input', () => {
    expect(noteToFreq('nonsense')).toBeCloseTo(440, 2);
  });
});
