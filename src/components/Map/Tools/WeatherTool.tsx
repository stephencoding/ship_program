import React from 'react';
import { useAppStore } from '../../../store/useAppStore';

const WeatherTool: React.FC = () => {
  const { currentTool } = useAppStore();

  // In a real app, this would add a TileLayer from a weather provider
  // For now, we just show an overlay
  
  if (currentTool !== 'weather') return null;

  return (
    <div className="leaflet-bottom leaflet-right" style={{ pointerEvents: 'none', bottom: '20px', right: '20px', zIndex: 1000 }}>
      <div className="leaflet-control bg-white p-2 rounded shadow text-xs text-gray-700">
          <p className="font-bold mb-1">气象水文 (Weather)</p>
          <p>气象图层已开启 (模拟)</p>
          <p>Wind: NE 15kts</p>
          <p>Wave: 1.2m</p>
      </div>
    </div>
  );
};

export default WeatherTool;
