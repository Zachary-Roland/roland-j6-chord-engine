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
  const [scratchpadMode, setScratchpadMode] = useState(() =>
    loadSetting('j6_scratchpad_mode', 'per-set')
  );

  const [defaultPlayMode, setDefaultPlayMode] = useState(() =>
    loadSetting('j6_default_play_mode', 'chord')
  );

  const [defaultBpm, setDefaultBpm] = useState(() =>
    loadSetting('j6_default_bpm', 90)
  );

  const [autoPlayOnTap, setAutoPlayOnTap] = useState(() =>
    loadSetting('j6_auto_play_on_tap', true)
  );

  const [scratchpadAutoAdd, setScratchpadAutoAdd] = useState(() =>
    loadSetting('j6_scratchpad_auto_add', true)
  );

  useEffect(() => { saveSetting('j6_scratchpad_mode', scratchpadMode); }, [scratchpadMode]);
  useEffect(() => { saveSetting('j6_default_play_mode', defaultPlayMode); }, [defaultPlayMode]);
  useEffect(() => { saveSetting('j6_default_bpm', defaultBpm); }, [defaultBpm]);
  useEffect(() => { saveSetting('j6_auto_play_on_tap', autoPlayOnTap); }, [autoPlayOnTap]);
  useEffect(() => { saveSetting('j6_scratchpad_auto_add', scratchpadAutoAdd); }, [scratchpadAutoAdd]);

  return {
    scratchpadMode, setScratchpadMode,
    defaultPlayMode, setDefaultPlayMode,
    defaultBpm, setDefaultBpm,
    autoPlayOnTap, setAutoPlayOnTap,
    scratchpadAutoAdd, setScratchpadAutoAdd,
  };
}
