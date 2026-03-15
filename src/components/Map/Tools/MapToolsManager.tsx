import React from 'react';
import { useAppStore } from '../../../store/useAppStore';
import DistanceTool from './DistanceTool';
import AreaTool from './AreaTool';
import TrafficTool from './TrafficTool';
import WeatherTool from './WeatherTool';

const MapToolsManager: React.FC = () => {
  const { currentTool } = useAppStore();

  return (
    <>
      {currentTool === 'distance' && <DistanceTool />}
      {currentTool === 'area' && <AreaTool />}
      {currentTool === 'traffic' && <TrafficTool />}
      {currentTool === 'weather' && <WeatherTool />}
    </>
  );
};

export default MapToolsManager;
