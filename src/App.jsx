import { useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { useSearch } from './hooks/useSearch';
import { useFavorites } from './hooks/useFavorites';
import { useAudio } from './hooks/useAudio';
import { useSettings } from './hooks/useSettings';
import Header from './components/Header';
import TabBar from './components/TabBar';
import SearchBar from './components/SearchBar';
import GenreFilter from './components/GenreFilter';
import BrowseGrid from './components/BrowseGrid';
import ChordSetDetail from './components/ChordSetDetail';
import { RandomButton } from './components/RandomButton';
import FavoritesList from './components/FavoritesList';
import StyleGuideTab from './components/StyleGuideTab';
import SettingsPage from './components/SettingsPage';
import Toast from './components/Toast';

function App() {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('browse');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedSet, setSelectedSet] = useState(null);
  const { searchQuery, setSearchQuery, activeGenre, setActiveGenre, filteredSets } = useSearch();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const {
    scratchpadMode, setScratchpadMode,
    defaultPlayMode, setDefaultPlayMode,
    defaultBpm, setDefaultBpm,
    autoPlayOnTap, setAutoPlayOnTap,
    scratchpadAutoAdd, setScratchpadAutoAdd,
    loopRepeat, setLoopRepeat,
  } = useSettings();
  const { playChord, playLoop, stopLoop, isLooping, isMuted, toggleMute, playMode, togglePlayMode } = useAudio(defaultPlayMode);

  return (
    <div className="app-shell">
      <div className="sticky-top">
        <Header theme={theme} toggleTheme={toggleTheme} viewMode={viewMode} setViewMode={setViewMode} />
        {activeTab === 'browse' && (
          <>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <GenreFilter activeGenre={activeGenre} onGenreChange={setActiveGenre} />
          </>
        )}
      </div>

      <main>
        {activeTab === 'browse' && (
          <>
            <BrowseGrid
              sets={filteredSets}
              viewMode={viewMode}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onSelectSet={setSelectedSet}
            />
          </>
        )}
        {activeTab === 'styles' && <StyleGuideTab />}
        {activeTab === 'favorites' && (
          <FavoritesList
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onSelectSet={setSelectedSet}
            viewMode={viewMode}
          />
        )}
        {activeTab === 'settings' && (
          <SettingsPage
            theme={theme}
            toggleTheme={toggleTheme}
            scratchpadMode={scratchpadMode}
            setScratchpadMode={setScratchpadMode}
            defaultPlayMode={defaultPlayMode}
            setDefaultPlayMode={setDefaultPlayMode}
            defaultBpm={defaultBpm}
            setDefaultBpm={setDefaultBpm}
            autoPlayOnTap={autoPlayOnTap}
            setAutoPlayOnTap={setAutoPlayOnTap}
            scratchpadAutoAdd={scratchpadAutoAdd}
            setScratchpadAutoAdd={setScratchpadAutoAdd}
            loopRepeat={loopRepeat}
            setLoopRepeat={setLoopRepeat}
          />
        )}
      </main>

      {activeTab === 'browse' && (
        <RandomButton filteredSets={filteredSets} onSelectSet={setSelectedSet} />
      )}

      <ChordSetDetail
        set={selectedSet}
        isFavorite={selectedSet ? isFavorite(selectedSet.id) : false}
        onToggleFavorite={toggleFavorite}
        onClose={() => setSelectedSet(null)}
        onSelectSet={setSelectedSet}
        playChord={playChord}
        playLoop={playLoop}
        stopLoop={stopLoop}
        isLooping={isLooping}
        isMuted={isMuted}
        toggleMute={toggleMute}
        playMode={playMode}
        togglePlayMode={togglePlayMode}
        scratchpadMode={scratchpadMode}
        autoPlayOnTap={autoPlayOnTap}
        scratchpadAutoAdd={scratchpadAutoAdd}
        defaultBpm={defaultBpm}
        loopRepeat={loopRepeat}
      />

      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
      <Toast />
    </div>
  );
}

export default App;
