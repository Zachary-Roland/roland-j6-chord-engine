import { useState, useEffect } from 'react';

export function useSettings() {
  const [theoryMode, setTheoryMode] = useState(() => {
    try {
      return localStorage.getItem('j6_theory_mode') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem('j6_theory_mode', String(theoryMode));
  }, [theoryMode]);

  const toggleTheoryMode = () => setTheoryMode(prev => !prev);

  return { theoryMode, toggleTheoryMode };
}
