import { useState, useEffect, useCallback } from 'react';
import './Toast.css';

let showToastGlobal = null;

export function toast(message) {
  if (showToastGlobal) showToastGlobal(message);
}

export default function Toast() {
  const [message, setMessage] = useState(null);
  const [visible, setVisible] = useState(false);

  const show = useCallback((msg) => {
    setMessage(msg);
    setVisible(true);
    setTimeout(() => setVisible(false), 1800);
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
