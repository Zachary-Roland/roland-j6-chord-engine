import './KeyGrid.css';

const BLACK_KEYS = ['C#', 'D#', null, 'F#', 'G#', 'A#']; // null = spacer
const WHITE_KEYS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

export default function KeyGrid({ chords = {}, selectedKey = null, onKeyPress }) {
  return (
    <div className="key-grid">
      {/* Top row: black keys with spacer */}
      <div className="key-grid-row black-keys">
        {BLACK_KEYS.map((key, i) =>
          key === null
            ? <div key={i} className="key-grid-spacer" />
            : (
              <button
                key={key}
                className={`key-grid-key black ${selectedKey === key ? 'selected' : ''}`}
                onClick={() => onKeyPress(key)}
              >
                <span className="key-label">{key}</span>
                <span className="key-chord-name">{chords[key]?.name || key}</span>
              </button>
            )
        )}
      </div>

      {/* Bottom row: white keys */}
      <div className="key-grid-row white-keys">
        {WHITE_KEYS.map(key => (
          <button
            key={key}
            className={`key-grid-key white ${selectedKey === key ? 'selected' : ''}`}
            onClick={() => onKeyPress(key)}
          >
            <span className="key-label">{key}</span>
            <span className="key-chord-name">{chords[key]?.name || key}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
