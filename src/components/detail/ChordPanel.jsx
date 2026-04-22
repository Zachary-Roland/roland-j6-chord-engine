import './ChordPanel.css';

export default function ChordPanel({ chord = null }) {
  if (!chord) {
    return (
      <div className="chord-panel">
        <p className="chord-panel-empty">Tap a key to preview</p>
      </div>
    );
  }

  return (
    <div className="chord-panel">
      <div className="chord-panel-name">{chord.name}</div>
      <div className="chord-panel-notes">
        {chord.notes.map((note, i) => (
          <span key={i} className="chord-panel-note">{note}</span>
        ))}
      </div>
    </div>
  );
}
