import { useState } from 'react';
import { useTheme } from './hooks/useTheme';
import TabBar from './components/TabBar';

function App() {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('browse');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedSet, setSelectedSet] = useState(null);

  return (
    <div className="app-shell">
      {/* Header placeholder */}
      <div style={{ padding: '1rem', textAlign: 'center', borderBottom: '1px solid var(--border)' }}>
        <h1 style={{ fontSize: '1.1rem', fontWeight: 600 }}>J-6 Chord Guide</h1>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-sub)', marginTop: '0.25rem' }}>
          Theme: {theme} | View: {viewMode}
        </div>
      </div>

      {/* Main content area */}
      <main style={{ padding: '1rem' }}>
        {activeTab === 'browse' && (
          <div>
            <p>Browse chord sets</p>
          </div>
        )}
        {activeTab === 'styles' && (
          <div>
            <p>Chord styles</p>
          </div>
        )}
        {activeTab === 'favorites' && (
          <div>
            <p>Favorite chord sets</p>
          </div>
        )}
      </main>

      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;
