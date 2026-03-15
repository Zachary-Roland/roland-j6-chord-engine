import { useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { useSearch } from './hooks/useSearch';
import { useFavorites } from './hooks/useFavorites';
import { useAudio } from './hooks/useAudio';
import Header from './components/Header';
import TabBar from './components/TabBar';
import SearchBar from './components/SearchBar';
import GenreFilter from './components/GenreFilter';
import BrowseGrid from './components/BrowseGrid';
import ChordSetDetail from './components/ChordSetDetail';
import { RandomButton } from './components/RandomButton';

function App() {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('browse');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedSet, setSelectedSet] = useState(null);
  const { searchQuery, setSearchQuery, activeGenre, setActiveGenre, filteredSets } = useSearch();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { playChord, isMuted, toggleMute } = useAudio();

  return (
    <div className="app-shell">
      <Header theme={theme} toggleTheme={toggleTheme} viewMode={viewMode} setViewMode={setViewMode} />

      <main>
        {activeTab === 'browse' && (
          <>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <GenreFilter activeGenre={activeGenre} onGenreChange={setActiveGenre} />
            <BrowseGrid
              sets={filteredSets}
              viewMode={viewMode}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onSelectSet={setSelectedSet}
            />
          </>
        )}
        {activeTab === 'styles' && <div style={{ padding: '1rem' }}><p>Styles tab coming soon</p></div>}
        {activeTab === 'favorites' && <div style={{ padding: '1rem' }}><p>Favorites tab coming soon</p></div>}
      </main>

      {activeTab === 'browse' && (
        <RandomButton filteredSets={filteredSets} onSelectSet={setSelectedSet} />
      )}

      <ChordSetDetail
        set={selectedSet}
        isFavorite={selectedSet ? isFavorite(selectedSet.id) : false}
        onToggleFavorite={toggleFavorite}
        onClose={() => setSelectedSet(null)}
        playChord={playChord}
        isMuted={isMuted}
        toggleMute={toggleMute}
      />

      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;
