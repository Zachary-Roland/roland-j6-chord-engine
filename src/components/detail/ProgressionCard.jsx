import './ProgressionCard.css';

export default function ProgressionCard({
  progression,
  chords,
  genreColor,
  onPlay,
  onStop,
  isPlaying,
  onAddToScratchpad,
}) {
  return (
    <div className="progression-card">
      <div className="progression-name">{progression.name}</div>
      <div className="progression-vibe">{progression.vibe}</div>

      <div className="progression-steps">
        {chords.map((chord, i) => (
          <span key={i} style={{ display: 'contents' }}>
            {i > 0 && <span className="progression-arrow">&rarr;</span>}
            <div
              className="progression-step"
              style={{
                backgroundColor: genreColor + '26',
                color: genreColor,
              }}
            >
              <span className="progression-step-key">{chord.key}</span>
              <span className="progression-step-chord">{chord.name}</span>
              <span className="progression-step-roman">
                {progression.roman[i]}
              </span>
            </div>
          </span>
        ))}
      </div>

      <div className="progression-actions">
        {isPlaying ? (
          <button
            className="progression-btn progression-btn--playing"
            onClick={onStop}
          >
            &#9632; Stop
          </button>
        ) : (
          <button className="progression-btn" onClick={() => onPlay(chords)}>
            &#9654; Play Loop
          </button>
        )}
        <button
          className="progression-btn"
          onClick={() => onAddToScratchpad(chords)}
        >
          + Add to Scratchpad
        </button>
      </div>
    </div>
  );
}
