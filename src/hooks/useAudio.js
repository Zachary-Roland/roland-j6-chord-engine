import { useRef, useCallback, useState } from 'react';
import { noteToFreq } from '../utils/noteToFreq';

// Module-level AudioContext (not in React state — avoids re-creation)
let audioCtx = null;
let audioUnlocked = false;

function getAudioContext() {
  if (!audioCtx || audioCtx.state === 'closed') {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    audioUnlocked = false;
  }
  // Always call resume synchronously within the user gesture
  // iOS Safari requires this to unlock audio
  if (!audioUnlocked || audioCtx.state === 'suspended') {
    audioCtx.resume();
    audioUnlocked = true;
  }
  return audioCtx;
}

// Pre-warm AudioContext on first user interaction anywhere in the app
// This ensures the context is unlocked before the user taps a key
if (typeof document !== 'undefined') {
  const unlock = () => {
    getAudioContext();
    // Play a silent buffer to fully unlock on iOS
    if (audioCtx) {
      const buffer = audioCtx.createBuffer(1, 1, 22050);
      const source = audioCtx.createBufferSource();
      source.buffer = buffer;
      source.connect(audioCtx.destination);
      source.start(0);
    }
    document.removeEventListener('touchstart', unlock, true);
    document.removeEventListener('click', unlock, true);
  };
  document.addEventListener('touchstart', unlock, true);
  document.addEventListener('click', unlock, true);
}

// Playback modes: 'chord' = all notes at once, 'arp' = arpeggiated
const ARP_NOTE_DURATION = 0.15; // each arp note rings for 150ms

export function useAudio(initialPlayMode = 'chord') {
  const [isMuted, setIsMuted] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [playMode, setPlayMode] = useState(initialPlayMode); // 'chord' | 'arp'
  const isLoopingRef = useRef(false);
  const isMutedRef = useRef(false);
  const loopTimeoutRef = useRef(null);
  const activeOscillators = useRef([]);

  const stopAll = useCallback(() => {
    activeOscillators.current.forEach(osc => {
      try { osc.stop(); } catch (e) {}
    });
    activeOscillators.current = [];
  }, []);

  // Play notes as a simultaneous chord
  const playNotesChord = useCallback((ctx, masterGain, notes, duration) => {
    return notes.map(note => {
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(noteToFreq(note), ctx.currentTime);

      noteGain.gain.setValueAtTime(0, ctx.currentTime);
      noteGain.gain.linearRampToValueAtTime(1, ctx.currentTime + 0.02);

      const releaseStart = ctx.currentTime + duration * 0.8;
      noteGain.gain.setValueAtTime(1, releaseStart);
      noteGain.gain.linearRampToValueAtTime(0, releaseStart + 0.4);

      osc.connect(noteGain);
      noteGain.connect(masterGain);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration + 0.4);

      return osc;
    });
  }, []);

  // Play notes as a simple arpeggio (bottom to top)
  const playNotesArp = useCallback((ctx, masterGain, notes, duration) => {
    // Sort notes low to high by frequency, then arpeggiate
    const sorted = [...notes].sort((a, b) => noteToFreq(a) - noteToFreq(b));
    const noteSpacing = Math.min(duration / sorted.length, 0.2);

    return sorted.map((note, i) => {
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();
      const noteStart = ctx.currentTime + i * noteSpacing;
      const noteDur = ARP_NOTE_DURATION;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(noteToFreq(note), noteStart);

      noteGain.gain.setValueAtTime(0, noteStart);
      noteGain.gain.linearRampToValueAtTime(1, noteStart + 0.01);
      noteGain.gain.setValueAtTime(1, noteStart + noteDur * 0.7);
      noteGain.gain.linearRampToValueAtTime(0, noteStart + noteDur);

      osc.connect(noteGain);
      noteGain.connect(masterGain);

      osc.start(noteStart);
      osc.stop(noteStart + noteDur + 0.1);

      return osc;
    });
  }, []);

  const playChord = useCallback((notes, duration = 0.8) => {
    if (isMutedRef.current || !notes || notes.length === 0) return;

    const ctx = getAudioContext();

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.15, ctx.currentTime);
    masterGain.connect(ctx.destination);

    const oscs = playMode === 'arp'
      ? playNotesArp(ctx, masterGain, notes, duration)
      : playNotesChord(ctx, masterGain, notes, duration);

    activeOscillators.current.push(...oscs);

    setTimeout(() => {
      activeOscillators.current = activeOscillators.current.filter(
        o => !oscs.includes(o)
      );
    }, (duration + 0.5) * 1000);
  }, [playMode, playNotesChord, playNotesArp]);

  const playLoop = useCallback((chordSequence, bpm = 90, repeat = 'once') => {
    if (!chordSequence || chordSequence.length === 0) return;

    const ctx = getAudioContext();
    ctx.resume();

    const beatDuration = 60 / bpm;
    let stepIndex = 0;
    const totalSteps = chordSequence.length;

    const scheduleNext = () => {
      if (!isLoopingRef.current) return;

      playChord(chordSequence[stepIndex].notes, beatDuration);
      stepIndex++;

      if (stepIndex >= totalSteps) {
        if (repeat === 'continuous') {
          stepIndex = 0;
          loopTimeoutRef.current = setTimeout(scheduleNext, beatDuration * 1000);
        } else {
          // 'once' — stop after finishing
          loopTimeoutRef.current = setTimeout(() => {
            isLoopingRef.current = false;
            setIsLooping(false);
          }, beatDuration * 1000);
        }
      } else {
        loopTimeoutRef.current = setTimeout(scheduleNext, beatDuration * 1000);
      }
    };

    isLoopingRef.current = true;
    setIsLooping(true);

    playChord(chordSequence[0].notes, beatDuration);
    stepIndex = 1;
    if (stepIndex < totalSteps) {
      loopTimeoutRef.current = setTimeout(scheduleNext, beatDuration * 1000);
    } else {
      // Single-chord sequence
      loopTimeoutRef.current = setTimeout(() => {
        isLoopingRef.current = false;
        setIsLooping(false);
      }, beatDuration * 1000);
    }
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
    setIsMuted(m => {
      isMutedRef.current = !m;
      return !m;
    });
  }, []);

  const togglePlayMode = useCallback(() => {
    setPlayMode(m => m === 'chord' ? 'arp' : 'chord');
  }, []);

  return {
    playChord,
    playLoop,
    stopLoop,
    isLooping,
    isMuted,
    toggleMute,
    playMode,
    togglePlayMode,
  };
}
