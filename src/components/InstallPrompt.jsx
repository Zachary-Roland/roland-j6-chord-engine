import { useState, useEffect } from 'react';
import './InstallPrompt.css';

const NEVER_SHOW_KEY = 'j6_install_never_show';

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
  return 'desktop';
}

function isStandalone() {
  return (
    window.navigator.standalone === true ||
    window.matchMedia('(display-mode: standalone)').matches
  );
}

export function InstallInstructions({ device }) {
  const effectiveDevice = device || getDeviceType();

  if (effectiveDevice === 'ios') {
    return (
      <div className="install-prompt-steps">
        1. Tap the <strong>Share</strong> button <ShareIcon /> in Safari<br />
        2. Scroll down and tap <strong>Add to Home Screen</strong><br />
        3. Tap <strong>Add</strong> — the app will work offline!
      </div>
    );
  }

  if (effectiveDevice === 'android') {
    return (
      <div className="install-prompt-steps">
        1. Tap the <strong>&#8942; menu</strong> in Chrome<br />
        2. Tap <strong>Add to Home Screen</strong> or <strong>Install App</strong><br />
        3. Tap <strong>Add</strong> — the app will work offline!
      </div>
    );
  }

  return (
    <div className="install-prompt-steps">
      On <strong>iPhone/iPad</strong>: open in Safari → tap <ShareIcon /> Share → <strong>Add to Home Screen</strong><br />
      On <strong>Android</strong>: open in Chrome → tap <strong>&#8942; menu</strong> → <strong>Install App</strong>
    </div>
  );
}

export default function InstallPrompt() {
  const [visible, setVisible] = useState(false);
  const [device, setDevice] = useState(null);

  useEffect(() => {
    if (localStorage.getItem(NEVER_SHOW_KEY)) return;
    if (isStandalone()) return;

    const deviceType = getDeviceType();

    // Only show install prompt on mobile in production
    // Desktop prompt is only for local dev testing
    if (deviceType === 'desktop' && import.meta.env.PROD) return;

    setDevice(deviceType);
    setVisible(true);
  }, []);

  function dismissForNow() {
    setVisible(false);
  }

  function neverShowAgain() {
    setVisible(false);
    localStorage.setItem(NEVER_SHOW_KEY, 'true');
  }

  if (!visible) return null;

  return (
    <div className="install-prompt">
      <div className="install-prompt-card">
        <div className="install-prompt-header">
          <span className="install-prompt-title">Add to Home Screen</span>
          <button className="install-prompt-close" onClick={dismissForNow} aria-label="Dismiss">
            &times;
          </button>
        </div>

        <p className="install-prompt-subtitle">
          Use this app like a native app — works offline from your home screen.
        </p>

        <InstallInstructions device={device} />

        <div className="install-prompt-actions">
          <button className="install-prompt-btn install-prompt-btn--later" onClick={dismissForNow}>
            Maybe Later
          </button>
          <button className="install-prompt-btn install-prompt-btn--never" onClick={neverShowAgain}>
            Don't Show Again
          </button>
        </div>
      </div>
    </div>
  );
}

// Allow settings to reset the "never show" preference
export function resetInstallPrompt() {
  localStorage.removeItem(NEVER_SHOW_KEY);
}
