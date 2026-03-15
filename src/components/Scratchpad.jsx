import './Scratchpad.css';

export default function Scratchpad({
  set,
  steps,
  bpm,
  onRemoveStep,
  onClear,
  onAdjustBpm,
  onPlay,
  onStop,
  isPlaying,
  genreColor,
}) {
  const chipBg = genreColor + '26'; // 15% opacity

  return (
    <div className="scratchpad">
      <div className="scratchpad-steps">
        {steps.length === 0 ? (
          <div className="scratchpad-empty">
            Tap keys above to build a progression
          </div>
        ) : (
          steps.map((keyName, i) => {
            const chord = set.chords[keyName];
            const chordName = chord?.name ?? keyName;
            return (
              <span key={`${i}-${keyName}`}>
                {i > 0 && <span className="scratchpad-arrow">{' \u2192 '}</span>}
                <button
                  className="scratchpad-chip"
                  style={{ backgroundColor: chipBg, color: genreColor }}
                  onClick={() => onRemoveStep(i)}
                  aria-label={`Remove ${chordName}`}
                >
                  <span className="scratchpad-chip-chord">{chordName}</span>
                  <span className="scratchpad-chip-key">{keyName}</span>
                </button>
              </span>
            );
          })
        )}
      </div>

      {steps.length > 0 && (
        <>
          <div className="scratchpad-controls">
            {isPlaying ? (
              <button className="scratchpad-btn scratchpad-btn--playing" onClick={onStop}>
                Stop
              </button>
            ) : (
              <button className="scratchpad-btn" onClick={onPlay}>
                Play
              </button>
            )}
            <button className="scratchpad-btn" onClick={onClear}>
              Clear
            </button>
          </div>

          <div className="scratchpad-tempo">
            <button
              className="scratchpad-tempo-btn"
              onClick={() => onAdjustBpm(-5)}
              aria-label="Decrease BPM"
            >
              &minus;
            </button>
            <span className="scratchpad-tempo-value">{bpm} BPM</span>
            <button
              className="scratchpad-tempo-btn"
              onClick={() => onAdjustBpm(5)}
              aria-label="Increase BPM"
            >
              +
            </button>
          </div>
        </>
      )}

      <div className="scratchpad-step-count">
        {steps.length}/16 steps
      </div>
    </div>
  );
}
