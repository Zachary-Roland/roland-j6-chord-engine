import { useState, useEffect } from 'react';
import './InstallPrompt.css';

const DISMISSED_KEY = 'j6_install_dismissed';
const VISIT_COUNT_KEY = 'j6_visit_count';

const ShareIcon = () => (
  <svg className="install-prompt-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <polyline points="16 6 12 2 8 6" />
    <line x1="12" y1="2" x2="12" y2="15" />
  </svg>
);

function getDeviceType() {
  const ua = navigator.userAgent || '';
  if (/iPhone|iPad|iPod/.test(ua)) return 'ios';
  if (/Android/.test(ua)) return 'android';
  return null;
}

function isStandalone() {
  return (
    window.navigator.standalone === true ||
    window.matchMedia('(display-mode: standalone)').matches
  );
}

export default function InstallPrompt() {
  const [visible, setVisible] = useState(false);
  const [device, setDevice] = useState(null);

  useEffect(() => {
    // Already dismissed
    if (localStorage.getItem(DISMISSED_KEY)) return;

    // Not a mobile device or already installed
    const deviceType = getDeviceType();
    if (!deviceType || isStandalone()) return;

    // Track visit count — only show on second visit or later
    const count = parseInt(localStorage.getItem(VISIT_COUNT_KEY) || '0', 10) + 1;
    localStorage.setItem(VISIT_COUNT_KEY, String(count));
    if (count < 2) return;

    setDevice(deviceType);
    setVisible(true);
  }, []);

  function dismiss() {
    setVisible(false);
    localStorage.setItem(DISMISSED_KEY, 'true');
  }

  if (!visible) return null;

  return (
    <div className="install-prompt">
      <div className="install-prompt-card">
        <div className="install-prompt-header">
          <span className="install-prompt-title">Install this App</span>
          <button className="install-prompt-close" onClick={dismiss} aria-label="Dismiss">
            &times;
          </button>
        </div>

        {device === 'ios' ? (
          <div className="install-prompt-steps">
            1. Tap the <strong>Share</strong> button <ShareIcon /> in Safari<br />
            2. Scroll down and tap <strong>Add to Home Screen</strong><br />
            3. Tap <strong>Add</strong> — the app will work offline!
          </div>
        ) : (
          <div className="install-prompt-steps">
            1. Tap the <strong>&#8942; menu</strong> in Chrome<br />
            2. Tap <strong>Add to Home Screen</strong> or <strong>Install App</strong><br />
            3. Tap <strong>Add</strong> — the app will work offline!
          </div>
        )}
      </div>
    </div>
  );
}
