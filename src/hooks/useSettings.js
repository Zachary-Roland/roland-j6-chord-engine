import { useState, useEffect } from 'react';

function loadSetting(key, defaultValue) {
  try {
    const stored = localStorage.getItem(key);
    return stored !== null ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function saveSetting(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function useSettings() {
  // Scratchpad mode: 'per-set' = separate scratchpad per chord set, 'global' = one shared scratchpad
  const [scratchpadMode, setScratchpadMode] = useState(() =>
    loadSetting('j6_scratchpad_mode', 'per-set')
  );

  // Default playback mode: 'chord' or 'arp'
  const [defaultPlayMode, setDefaultPlayMode] = useState(() =>
    loadSetting('j6_default_play_mode', 'chord')
  );

  useEffect(() => {
    saveSetting('j6_scratchpad_mode', scratchpadMode);
  }, [scratchpadMode]);

  useEffect(() => {
    saveSetting('j6_default_play_mode', defaultPlayMode);
  }, [defaultPlayMode]);

  return {
    scratchpadMode,
    setScratchpadMode,
    defaultPlayMode,
    setDefaultPlayMode,
  };
}
