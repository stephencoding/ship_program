import React from 'react';
import { Circle, Tooltip } from 'react-leaflet';
import { useAppStore } from '../../../store/useAppStore';

const TrafficTool: React.FC = () => {
  const { currentTool } = useAppStore();

  if (currentTool !== 'traffic') return null;

  // Mock traffic density data
  const trafficHotspots = [
    { center: [31.2304, 121.4737], radius: 5000, density: 'High', color: 'red' },
    { center: [31.1, 121.8], radius: 8000, density: 'Medium', color: 'orange' },
    { center: [31.4, 121.5], radius: 6000, density: 'High', color: 'red' },
  ];

  return (
    <>
      {trafficHotspots.map((spot, idx) => (
        <Circle 
          key={idx}
          center={spot.center as [number, number]}
          radius={spot.radius}
          pathOptions={{ color: spot.color, fillColor: spot.color, fillOpacity: 0.3, stroke: false }}
        >
          <Tooltip direction="center" permanent>
            {spot.density} Traffic Area
          </Tooltip>
        </Circle>
      ))}
      
       <div className="leaflet-bottom leaflet-right" style={{ pointerEvents: 'none', bottom: '20px', right: '20px', zIndex: 1000 }}>
          <div className="leaflet-control bg-white p-2 rounded shadow text-xs text-gray-700">
             <p className="font-bold mb-1">交通流分析 (Traffic Flow)</p>
             <p>显示模拟的交通密度热力图</p>
          </div>
       </div>
    </>
  );
};

export default TrafficTool;
