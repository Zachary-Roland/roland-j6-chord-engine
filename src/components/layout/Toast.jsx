import { useState, useEffect, useCallback, useRef } from 'react';
import './Toast.css';

let showToastGlobal = null;

export function toast(message) {
  if (showToastGlobal) showToastGlobal(message);
}

export default function Toast() {
  const [message, setMessage] = useState(null);
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef(null);

  const show = useCallback((msg) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setMessage(msg);
    setVisible(true);
    timeoutRef.current = setTimeout(() => setVisible(false), 1800);
  }, []);

  useEffect(() => {
    showToastGlobal = show;
    return () => { showToastGlobal = null; };
  }, [show]);

  if (!message) return null;

  return (
    <div className={`toast ${visible ? 'toast--visible' : 'toast--hidden'}`}>
      {message}
    </div>
  );
}
