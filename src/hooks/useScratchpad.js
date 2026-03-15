import { useState, useCallback, useEffect } from 'react';

export function useScratchpad(setId) {
  const storageKey = `j6_scratchpad_${setId}`;

  const [steps, setSteps] = useState(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [bpm, setBpm] = useState(90);

  // Reload steps when setId changes
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      setSteps(stored ? JSON.parse(stored) : []);
    } catch {
      setSteps([]);
    }
  }, [storageKey]);

  const addStep = useCallback((keyName) => {
    setSteps(prev => {
      if (prev.length >= 16) return prev;
      const next = [...prev, keyName];
      localStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    });
  }, [storageKey]);

  const removeStep = useCallback((index) => {
    setSteps(prev => {
      const next = prev.filter((_, i) => i !== index);
      localStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    });
  }, [storageKey]);

  const clearSteps = useCallback(() => {
    setSteps([]);
    localStorage.removeItem(storageKey);
  }, [storageKey]);

  const adjustBpm = useCallback((delta) => {
    setBpm(prev => Math.max(40, Math.min(200, prev + delta)));
  }, []);

  return { steps, bpm, addStep, removeStep, clearSteps, adjustBpm, setBpm };
}
