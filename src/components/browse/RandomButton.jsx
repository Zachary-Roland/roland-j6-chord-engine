import './RandomButton.css';

export function RandomButton({ onSelectSet, filteredSets }) {
  const handleClick = () => {
    if (!filteredSets || filteredSets.length === 0) return;
    const randomIndex = Math.floor(Math.random() * filteredSets.length);
    onSelectSet(filteredSets[randomIndex]);
  };

  return (
    <button
      className="random-btn"
      onClick={handleClick}
      aria-label="Pick a random chord set"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <rect x="2" y="2" width="20" height="20" rx="4" fill="none" stroke="currentColor" strokeWidth="2"/>
        <circle cx="8" cy="8" r="1.5"/>
        <circle cx="16" cy="8" r="1.5"/>
        <circle cx="8" cy="16" r="1.5"/>
        <circle cx="16" cy="16" r="1.5"/>
        <circle cx="12" cy="12" r="1.5"/>
      </svg>
    </button>
  );
}
