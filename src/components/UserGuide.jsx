import './UserGuide.css';

export default function UserGuide({ onClose }) {
  return (
    <div className="user-guide-overlay" onClick={onClose}>
      <div className="user-guide-modal" onClick={(e) => e.stopPropagation()}>
        <div className="user-guide-header">
          <span className="user-guide-title">User Guide</span>
          <button className="user-guide-close" onClick={onClose} aria-label="Close guide">
            &times;
          </button>
        </div>

        <div className="user-guide-content">
          <div className="user-guide-section">
            <div className="user-guide-section-title">Getting Started</div>
            <div className="user-guide-text">
              This app is a companion for the <strong>Roland AIRA J-6 Chord Synth</strong>. Open it on your phone while programming the J-6 sequencer. It includes all <strong>100 chord sets</strong> with exact voicings from the J-6 manual.
            </div>
          </div>

          <div className="user-guide-section">
            <div className="user-guide-section-title">Browsing Chord Sets</div>
            <div className="user-guide-text">
              Scroll the grid to browse all 100 sets. Use <strong>genre filter pills</strong> to narrow by style (Pop, Jazz, Neo Soul, etc.). Search by set number, genre, or chord name — try <strong>"m9"</strong> or <strong>"72"</strong>. Toggle grid/list view with the icon in the header. Tap the <strong>orange dice button</strong> for a random set.
            </div>
          </div>

          <div className="user-guide-section">
            <div className="user-guide-section-title">Playing Chords</div>
            <div className="user-guide-text">
              Tap any card to open the detail view. The <strong>piano keyboard</strong> shows all 12 chords in the set. Tap a key to hear the chord — toggle between <strong>chord and arpeggio mode</strong> with the arp icon. The chord name and individual voicing notes appear below the keyboard.
              <br /><br />
              <strong>No sound on iPhone?</strong> Make sure silent mode is off.
            </div>
          </div>

          <div className="user-guide-section">
            <div className="user-guide-section-title">Using Progression Suggestions</div>
            <div className="user-guide-text">
              Scroll down in the detail view to find <strong>curated progressions</strong> for that genre. Each shows the chord sequence with actual names from the set. Tap <strong>Play</strong> to hear it loop — tap again to stop. Tap <strong>"Add to Scratchpad"</strong> to copy it for editing.
            </div>
          </div>

          <div className="user-guide-section">
            <div className="user-guide-section-title">Building with the Scratchpad</div>
            <div className="user-guide-text">
              The scratchpad is your workspace for custom sequences. Tap keys on the keyboard to <strong>add chords</strong> (up to 16 steps). Tap a chord chip to remove it. Adjust <strong>BPM</strong> with +/&minus; buttons. Tap <strong>Play</strong> to hear your sequence. Toggle chord/arpeggio playback in the scratchpad.
            </div>
          </div>

          <div className="user-guide-section">
            <div className="user-guide-section-title">Favorites</div>
            <div className="user-guide-text">
              Tap the <strong>heart</strong> on any card or in the detail view to save it. Access favorites from the <strong>Favorites tab</strong>. Copy your list as text with the <strong>Copy button</strong>.
            </div>
          </div>

          <div className="user-guide-section">
            <div className="user-guide-section-title">Style Guide</div>
            <div className="user-guide-text">
              The <strong>Styles tab</strong> documents J-6 style banks 1–9. Each bank has 12 variations: <strong>1–4 sparse</strong>, <strong>5–8 medium</strong>, <strong>9–12 dense</strong>. Use this as a cheat sheet when choosing styles on the hardware.
            </div>
          </div>

          <div className="user-guide-section">
            <div className="user-guide-section-title">Scale Suggestions</div>
            <div className="user-guide-text">
              At the bottom of each detail view, <strong>compatible scales</strong> are shown for the selected chord. Useful if you play a melodic instrument alongside the J-6.
            </div>
          </div>

          <div className="user-guide-section">
            <div className="user-guide-section-title">Settings</div>
            <div className="user-guide-text">
              The <strong>gear icon</strong> in the header opens Settings. Configure theme, playback mode, BPM, scratchpad behavior, and install instructions.
            </div>
          </div>

          <div className="user-guide-section">
            <div className="user-guide-section-title">Install as an App</div>
            <div className="user-guide-text">
              Add to your home screen for a <strong>full-screen, offline experience</strong>. See <strong>Settings &rarr; Install</strong> for step-by-step instructions.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
