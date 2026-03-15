import { useRef, useCallback, useState } from 'react';
import { noteToFreq } from '../utils/noteToFreq';

// Module-level AudioContext (not in React state — avoids re-creation)
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

export function useAudio() {
  const [isMuted, setIsMuted] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const isLoopingRef = useRef(false);
  const loopTimeoutRef = useRef(null);
  const activeOscillators = useRef([]);

  // Stop all currently playing oscillators
  const stopAll = useCallback(() => {
    activeOscillators.current.forEach(osc => {
      try { osc.stop(); } catch (e) {}
    });
    activeOscillators.current = [];
  }, []);

  // Play a single chord (array of note strings like ["E4", "D4", "G3", "C3"])
  const playChord = useCallback((notes, duration = 0.8) => {
    if (isMuted || !notes || notes.length === 0) return;

    const ctx = getAudioContext();
    ctx.resume(); // iOS Safari requirement

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.15, ctx.currentTime);
    masterGain.connect(ctx.destination);

    // Subtle arpeggiation: stagger each note by 25ms for a strummed feel
    const stagger = 0.025;
    const oscs = notes.map((note, i) => {
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();
      const noteStart = ctx.currentTime + i * stagger;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(noteToFreq(note), noteStart);

      // Attack: 0 → 1 over 20ms
      noteGain.gain.setValueAtTime(0, noteStart);
      noteGain.gain.linearRampToValueAtTime(1, noteStart + 0.02);

      // Release: 1 → 0 over 400ms, starting at 80% of duration
      const releaseStart = noteStart + duration * 0.8;
      noteGain.gain.setValueAtTime(1, releaseStart);
      noteGain.gain.linearRampToValueAtTime(0, releaseStart + 0.4);

      osc.connect(noteGain);
      noteGain.connect(masterGain);

      osc.start(noteStart);
      osc.stop(noteStart + duration + 0.4);

      return osc;
    });

    activeOscillators.current.push(...oscs);

    // Clean up refs after playback
    setTimeout(() => {
      activeOscillators.current = activeOscillators.current.filter(
        o => !oscs.includes(o)
      );
    }, (duration + 0.5) * 1000);
  }, [isMuted]);

  // Play a loop of chords
  // chordSequence: array of { notes: string[] }
  // bpm: beats per minute
  const playLoop = useCallback((chordSequence, bpm = 90) => {
    if (!chordSequence || chordSequence.length === 0) return;

    const ctx = getAudioContext();
    ctx.resume();

    const beatDuration = 60 / bpm;
    let stepIndex = 0;

    const scheduleNext = () => {
      // Use ref instead of closure-captured state to avoid staleness
      if (!isLoopingRef.current) return;

      playChord(chordSequence[stepIndex].notes, beatDuration);
      stepIndex = (stepIndex + 1) % chordSequence.length;

      loopTimeoutRef.current = setTimeout(scheduleNext, beatDuration * 1000);
    };

    isLoopingRef.current = true;
    setIsLooping(true);

    // Start immediately with the first chord
    playChord(chordSequence[0].notes, beatDuration);
    stepIndex = 1 % chordSequence.length;
    loopTimeoutRef.current = setTimeout(scheduleNext, beatDuration * 1000);
  }, [playChord]);

  const stopLoop = useCallback(() => {
    isLoopingRef.current = false;
    setIsLooping(false);
    if (loopTimeoutRef.current) {
      clearTimeout(loopTimeoutRef.current);
      loopTimeoutRef.current = null;
    }
    stopAll();
  }, [stopAll]);

  const toggleMute = useCallback(() => {
    setIsMuted(m => !m);
  }, []);

  return {
    playChord,
    playLoop,
    stopLoop,
    isLooping,
    isMuted,
    toggleMute,
    stopAll,
  };
}
