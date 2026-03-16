import { useState } from 'react';
import { InstallInstructions, resetInstallPrompt } from './InstallPrompt';
import './SettingsPage.css';

function SettingsInstallSection() {
  const [showInstructions, setShowInstructions] = useState(false);

  function handleResetPrompt() {
    resetInstallPrompt();
    setShowInstructions(false);
  }

  return (
    <div className="settings-section">
      <h3 className="settings-section-title">Install</h3>

      <div className="settings-row">
        <div className="settings-row-label">
          <span className="settings-row-name">Add to Home Screen</span>
          <span className="settings-row-desc">Install as a standalone app on your phone</span>
        </div>
        <button
          className="settings-toggle-btn settings-toggle-btn--active"
          onClick={() => setShowInstructions(!showInstructions)}
        >
          {showInstructions ? 'Hide' : 'Show'}
        </button>
      </div>

      {showInstructions && (
        <div className="settings-install-instructions">
          <InstallInstructions />
          <button className="settings-reset-prompt-btn" onClick={handleResetPrompt}>
            Re-enable install popup
          </button>
        </div>
      )}
    </div>
  );
}

export default function SettingsPage({
  theme,
  toggleTheme,
  scratchpadMode,
  setScratchpadMode,
  defaultPlayMode,
  setDefaultPlayMode,
  defaultBpm,
  setDefaultBpm,
  autoPlayOnTap,
  setAutoPlayOnTap,
  scratchpadAutoAdd,
  setScratchpadAutoAdd,
  loopRepeat,
  setLoopRepeat,
}) {
  return (
    <div className="settings-page">
      <h2 className="settings-title">Settings</h2>

      <div className="settings-section">
        <h3 className="settings-section-title">Appearance</h3>

        <div className="settings-row">
          <div className="settings-row-label">
            <span className="settings-row-name">Theme</span>
            <span className="settings-row-desc">Dark mode is easier on the eyes in the studio</span>
          </div>
          <div className="settings-toggle-group">
            <button
              className={`settings-toggle-btn${theme === 'dark' ? ' settings-toggle-btn--active' : ''}`}
              onClick={() => theme !== 'dark' && toggleTheme()}
            >
              Dark
            </button>
            <button
              className={`settings-toggle-btn${theme === 'light' ? ' settings-toggle-btn--active' : ''}`}
              onClick={() => theme !== 'light' && toggleTheme()}
            >
              Light
            </button>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h3 className="settings-section-title">Audio</h3>

        <div className="settings-row">
          <div className="settings-row-label">
            <span className="settings-row-name">Default playback</span>
            <span className="settings-row-desc">How chords sound when you tap keys</span>
          </div>
          <div className="settings-toggle-group">
            <button
              className={`settings-toggle-btn${defaultPlayMode === 'chord' ? ' settings-toggle-btn--active' : ''}`}
              onClick={() => setDefaultPlayMode('chord')}
            >
              Chord
            </button>
            <button
              className={`settings-toggle-btn${defaultPlayMode === 'arp' ? ' settings-toggle-btn--active' : ''}`}
              onClick={() => setDefaultPlayMode('arp')}
            >
              Arpeggio
            </button>
          </div>
        </div>

        <div className="settings-row">
          <div className="settings-row-label">
            <span className="settings-row-name">Default BPM</span>
            <span className="settings-row-desc">Starting tempo for loop playback</span>
          </div>
          <div className="settings-bpm-control">
            <button
              className="settings-bpm-btn"
              onClick={() => setDefaultBpm(Math.max(40, defaultBpm - 5))}
              aria-label="Decrease BPM"
            >
              &minus;
            </button>
            <span className="settings-bpm-value">{defaultBpm}</span>
            <button
              className="settings-bpm-btn"
              onClick={() => setDefaultBpm(Math.min(200, defaultBpm + 5))}
              aria-label="Increase BPM"
            >
              +
            </button>
          </div>
        </div>

        <div className="settings-row">
          <div className="settings-row-label">
            <span className="settings-row-name">Auto-play on tap</span>
            <span className="settings-row-desc">Play chord audio when tapping a key on the keyboard</span>
          </div>
          <div className="settings-toggle-group">
            <button
              className={`settings-toggle-btn${autoPlayOnTap ? ' settings-toggle-btn--active' : ''}`}
              onClick={() => setAutoPlayOnTap(true)}
            >
              On
            </button>
            <button
              className={`settings-toggle-btn${!autoPlayOnTap ? ' settings-toggle-btn--active' : ''}`}
              onClick={() => setAutoPlayOnTap(false)}
            >
              Off
            </button>
          </div>
        </div>

        <div className="settings-row">
          <div className="settings-row-label">
            <span className="settings-row-name">Loop playback</span>
            <span className="settings-row-desc">
              {loopRepeat === 'once'
                ? 'Play through the progression once and stop'
                : 'Loop the progression continuously until stopped'}
            </span>
          </div>
          <div className="settings-toggle-group">
            <button
              className={`settings-toggle-btn${loopRepeat === 'once' ? ' settings-toggle-btn--active' : ''}`}
              onClick={() => setLoopRepeat('once')}
            >
              Once
            </button>
            <button
              className={`settings-toggle-btn${loopRepeat === 'continuous' ? ' settings-toggle-btn--active' : ''}`}
              onClick={() => setLoopRepeat('continuous')}
            >
              Loop
            </button>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h3 className="settings-section-title">Scratchpad</h3>

        <div className="settings-row">
          <div className="settings-row-label">
            <span className="settings-row-name">Scratchpad mode</span>
            <span className="settings-row-desc">
              {scratchpadMode === 'per-set'
                ? 'Each chord set keeps its own scratchpad'
                : 'One shared scratchpad across all sets'}
            </span>
          </div>
          <div className="settings-toggle-group">
            <button
              className={`settings-toggle-btn${scratchpadMode === 'per-set' ? ' settings-toggle-btn--active' : ''}`}
              onClick={() => setScratchpadMode('per-set')}
            >
              Per Set
            </button>
            <button
              className={`settings-toggle-btn${scratchpadMode === 'global' ? ' settings-toggle-btn--active' : ''}`}
              onClick={() => setScratchpadMode('global')}
            >
              Global
            </button>
          </div>
        </div>

        <div className="settings-row">
          <div className="settings-row-label">
            <span className="settings-row-name">Auto-add to scratchpad</span>
            <span className="settings-row-desc">
              {scratchpadAutoAdd
                ? 'Every key tap adds a step to the scratchpad'
                : 'Key taps only preview — add steps manually'}
            </span>
          </div>
          <div className="settings-toggle-group">
            <button
              className={`settings-toggle-btn${scratchpadAutoAdd ? ' settings-toggle-btn--active' : ''}`}
              onClick={() => setScratchpadAutoAdd(true)}
            >
              On
            </button>
            <button
              className={`settings-toggle-btn${!scratchpadAutoAdd ? ' settings-toggle-btn--active' : ''}`}
              onClick={() => setScratchpadAutoAdd(false)}
            >
              Off
            </button>
          </div>
        </div>
      </div>

      <SettingsInstallSection />

      <div className="settings-section">
        <h3 className="settings-section-title">About</h3>
        <p className="settings-about">
          J-6 Chord Guide — companion app for the Roland AIRA J-6 Chord Synth.
          <br />
          Chord data from the Roland AIRA J-6 Owner's Manual v1.02.
        </p>
      </div>
    </div>
  );
}
