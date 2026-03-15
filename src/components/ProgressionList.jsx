import { useState } from 'react';
import { progressions } from '../data/progressions';
import { getProgressionChords } from '../utils/transpose';
import ProgressionCard from './ProgressionCard';
import './ProgressionList.css';

export default function ProgressionList({
  set,
  selectedKey,
  genreColor,
  playLoop,
  stopLoop,
  isLooping,
  loopRepeat = 'once',
  onAddToScratchpad,
}) {
  const [playingId, setPlayingId] = useState(null);

  const matching = progressions.filter(p =>
    p.genreFamilies.includes(set.genreFamily)
  );

  if (matching.length === 0) {
    return (
      <p className="progression-list-empty">
        No curated progressions for this genre family.
      </p>
    );
  }

  const handlePlay = (progressionId, chords) => {
    // Stop any existing loop first
    if (isLooping) {
      stopLoop();
    }
    setPlayingId(progressionId);
    playLoop(chords, 90, loopRepeat);
  };

  const handleStop = () => {
    stopLoop();
    setPlayingId(null);
  };

  return (
    <div>
      {matching.map(prog => {
        const chords = getProgressionChords(set, selectedKey, prog.steps);
        return (
          <ProgressionCard
            key={prog.id}
            progression={prog}
            chords={chords}
            genreColor={genreColor}
            onPlay={(chds) => handlePlay(prog.id, chds)}
            onStop={handleStop}
            isPlaying={isLooping && playingId === prog.id}
            onAddToScratchpad={onAddToScratchpad}
          />
        );
      })}
    </div>
  );
}
