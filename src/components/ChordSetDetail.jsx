import { useState } from 'react';
import KeyGrid from './KeyGrid';
import ChordPanel from './ChordPanel';
import ProgressionList from './ProgressionList';
import Scratchpad from './Scratchpad';
import SimilarSets from './SimilarSets';
import TheoryMode from './TheoryMode';
import { useScratchpad } from '../hooks/useScratchpad';
import { getGenreColor } from '../data/genreConfig';
import './ChordSetDetail.css';

export default function ChordSetDetail({
  set,
  isFavorite,
  onToggleFavorite,
  onClose,
  onSelectSet,
  playChord,
  playLoop,
  stopLoop,
  isLooping,
  isMuted,
  toggleMute,
  theoryMode,
  toggleTheoryMode,
}) {
  const [selectedKey, setSelectedKey] = useState('C');
  const scratchpad = useScratchpad(set?.id ?? 0);

  if (!set) return null;

  const genreColor = getGenreColor(set.genre);

  const handleKeyPress = (key) => {
    setSelectedKey(key);
    const chord = set.chords[key];
    if (chord?.notes) {
      playChord(chord.notes);
    }
    scratchpad.addStep(key);
  };

  const handlePlayScratchpad = () => {
    const chordSequence = scratchpad.steps
      .map(keyName => set.chords[keyName])
      .filter(c => c?.notes);
    if (chordSequence.length > 0) {
      playLoop(chordSequence, scratchpad.bpm);
    }
  };

  const handleStopScratchpad = () => {
    stopLoop();
  };

  const handleClearScratchpad = () => {
    if (isLooping) stopLoop();
    scratchpad.clearSteps();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSelectSimilar = (similarSet) => {
    onClose();
    if (onSelectSet) onSelectSet(similarSet);
  };

  return (
    <div className="detail-overlay" onClick={handleOverlayClick}>
      <div className="detail-modal">
        {/* Header */}
        <div className="detail-header">
          <div className="detail-header-left">
            <span className="detail-set-number">#{set.id}</span>
            <span
              className="detail-genre-tag"
              style={{ backgroundColor: genreColor + '26', color: genreColor }}
            >
              {set.genre}
            </span>
          </div>
          <div className="detail-header-actions">
            <button
              className="detail-action-btn"
              onClick={() => onToggleFavorite(set.id)}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite ? '♥' : '♡'}
            </button>
            <button
              className="detail-action-btn"
              onClick={toggleMute}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? '🔇' : '🔊'}
            </button>
            <button
              className={`detail-action-btn${theoryMode ? ' detail-action-btn--active' : ''}`}
              onClick={toggleTheoryMode}
              aria-label={theoryMode ? 'Disable Theory Mode' : 'Enable Theory Mode'}
              title="Theory Mode"
            >
              ♩
            </button>
            <button
              className="detail-action-btn"
              onClick={onClose}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Key Grid */}
        <div className="detail-section">
          <div className="detail-section-title">Keys</div>
          <KeyGrid
            chords={set.chords}
            selectedKey={selectedKey}
            onKeyPress={handleKeyPress}
          />
        </div>

        {/* Chord Panel */}
        <div className="detail-section">
          <div className="detail-section-title">Chord Detail</div>
          <ChordPanel chord={set.chords[selectedKey]} />
        </div>

        {/* Progression suggestions */}
        <div className="detail-section">
          <div className="detail-section-title">Progression Suggestions</div>
          <ProgressionList
            set={set}
            selectedKey={selectedKey}
            genreColor={genreColor}
            playLoop={playLoop}
            stopLoop={stopLoop}
            isLooping={isLooping}
            onAddToScratchpad={() => {}}
          />
        </div>

        {/* Scratchpad */}
        <div className="detail-section">
          <div className="detail-section-title">Scratchpad</div>
          <Scratchpad
            set={set}
            steps={scratchpad.steps}
            bpm={scratchpad.bpm}
            onRemoveStep={scratchpad.removeStep}
            onClear={handleClearScratchpad}
            onAdjustBpm={scratchpad.adjustBpm}
            onPlay={handlePlayScratchpad}
            onStop={handleStopScratchpad}
            isPlaying={isLooping}
            genreColor={genreColor}
          />
        </div>

        {/* Similar Sets */}
        <div className="detail-section">
          <SimilarSets currentSet={set} onSelectSet={handleSelectSimilar} />
        </div>

        {/* Theory Mode */}
        {theoryMode && set.chords[selectedKey] && (
          <div className="detail-section">
            <div className="detail-section-title">Theory Mode</div>
            <TheoryMode
              chordName={set.chords[selectedKey].name}
              keyName={selectedKey}
            />
          </div>
        )}
      </div>
    </div>
  );
}
