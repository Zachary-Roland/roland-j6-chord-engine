import './SettingsPage.css';

export default function SettingsPage({
  theme,
  toggleTheme,
  scratchpadMode,
  setScratchpadMode,
  defaultPlayMode,
  setDefaultPlayMode,
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
      </div>

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
