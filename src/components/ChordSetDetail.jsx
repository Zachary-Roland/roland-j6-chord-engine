import { useState } from 'react';
import KeyGrid from './KeyGrid';
import ChordPanel from './ChordPanel';
import ProgressionList from './ProgressionList';
import Scratchpad from './Scratchpad';
import SimilarSets from './SimilarSets';
import TheoryMode from './TheoryMode';
import { toast } from './Toast';
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
  playMode,
  togglePlayMode,
  scratchpadMode = 'per-set',
}) {
  const [selectedKey, setSelectedKey] = useState('C');
  const scratchpadId = scratchpadMode === 'global' ? 'global' : (set?.id ?? 0);
  const scratchpad = useScratchpad(scratchpadId);

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

  const handleClose = () => {
    if (isLooping) stopLoop();
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleSelectSimilar = (similarSet) => {
    if (isLooping) stopLoop();
    onClose();
    if (onSelectSet) onSelectSet(similarSet);
  };

  const handleAddToScratchpad = (chords) => {
    chords.forEach(c => scratchpad.addStep(c.key));
    toast(`Added ${chords.length} chords to scratchpad`);
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
              onClick={() => {
                onToggleFavorite(set.id);
                toast(isFavorite ? 'Removed from favorites' : 'Added to favorites');
              }}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite ? '♥' : '♡'}
            </button>
            <button
              className="detail-action-btn"
              onClick={toggleMute}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
              )}
            </button>
            <button
              className={`detail-action-btn${playMode === 'arp' ? ' detail-action-btn--active' : ''}`}
              onClick={() => {
                togglePlayMode();
                toast(playMode === 'chord' ? 'Arpeggio mode' : 'Chord mode');
              }}
              aria-label={playMode === 'chord' ? 'Switch to arpeggio' : 'Switch to chord'}
              title={playMode === 'chord' ? 'Arpeggio mode' : 'Chord mode'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 20h2v-4h2v-4h2v-4h2V4h2v4h2v4h2v4h2v4h2"/></svg>
            </button>
            <button
              className="detail-action-btn"
              onClick={handleClose}
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
            onAddToScratchpad={handleAddToScratchpad}
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
            playMode={playMode}
            onTogglePlayMode={togglePlayMode}
          />
        </div>

        {/* Similar Sets */}
        <div className="detail-section">
          <SimilarSets currentSet={set} onSelectSet={handleSelectSimilar} />
        </div>

        {/* Scale Suggestions */}
        {set.chords[selectedKey] && (
          <div className="detail-section">
            <div className="detail-section-title">Scale Suggestions</div>
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
