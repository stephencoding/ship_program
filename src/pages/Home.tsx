import React from 'react';
import MapComponent from '../components/Map/Map';
import SearchBar from '../components/Overlay/SearchBar';
import ToolsPanel from '../components/Overlay/ToolsPanel';
import StatusBar from '../components/Overlay/StatusBar';

const Home: React.FC = () => {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Map Background */}
      <div className="absolute inset-0 z-0">
        <MapComponent />
      </div>
      
      {/* Overlays */}
      <SearchBar />
      <ToolsPanel />
      <StatusBar />
    </div>
  );
};

export default Home;
