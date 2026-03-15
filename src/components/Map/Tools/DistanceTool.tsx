import React, { useState, useEffect } from 'react';
import { useMap, Polyline, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { useAppStore } from '../../../store/useAppStore';

const DistanceTool: React.FC = () => {
  const map = useMap();
  const { currentTool, setCurrentTool } = useAppStore();
  const [points, setPoints] = useState<L.LatLng[]>([]);
  const [totalDistance, setTotalDistance] = useState<number>(0);
  const [tempPoint, setTempPoint] = useState<L.LatLng | null>(null);

  useEffect(() => {
    if (currentTool !== 'distance') return;

    const handleClick = (e: L.LeafletMouseEvent) => {
      const newPoint = e.latlng;
      setPoints((prev) => {
        const newPoints = [...prev, newPoint];
        // Calculate distance
        if (newPoints.length > 1) {
          let dist = 0;
          for (let i = 0; i < newPoints.length - 1; i++) {
            dist += newPoints[i].distanceTo(newPoints[i + 1]);
          }
          setTotalDistance(dist);
        }
        return newPoints;
      });
    };

    const handleMouseMove = (e: L.LeafletMouseEvent) => {
      if (points.length > 0) {
        setTempPoint(e.latlng);
      }
    };

    const handleRightClick = () => {
        // Finish measurement or clear last point? 
        // Let's make right click clear/cancel for now, or double click to finish.
        // For simplicity: Right click clears all.
        setPoints([]);
        setTotalDistance(0);
        setTempPoint(null);
    };

    map.on('click', handleClick);
    map.on('mousemove', handleMouseMove);
    map.on('contextmenu', handleRightClick);

    // Change cursor
    map.getContainer().style.cursor = 'crosshair';

    return () => {
      map.off('click', handleClick);
      map.off('mousemove', handleMouseMove);
      map.off('contextmenu', handleRightClick);
      map.getContainer().style.cursor = '';
    };
  }, [map, currentTool, points]);

  // If tool is not active, don't render anything (though parent should handle this too)
  if (currentTool !== 'distance') return null;
  
  const formatNauticalMiles = (meters: number) => {
      return `${(meters / 1852).toFixed(2)} nm`;
  }

  return (
    <>
      {points.map((pt, idx) => (
        <Marker key={idx} position={pt} interactive={false}>
             {/* Only show tooltip on the last point or start */}
             {idx === points.length - 1 && (
                 <Tooltip permanent direction="right" offset={[10, 0]}>
                     {idx === 0 ? 'Start' : formatNauticalMiles(totalDistance)}
                 </Tooltip>
             )}
        </Marker>
      ))}
      
      {points.length > 0 && (
        <Polyline positions={points} color="red" dashArray="5, 10" />
      )}

      {/* Dynamic line to cursor */}
      {points.length > 0 && tempPoint && (
        <Polyline positions={[points[points.length - 1], tempPoint]} color="red" dashArray="5, 10" opacity={0.5} />
      )}
      
      {/* Instructions Overlay */}
       <div className="leaflet-bottom leaflet-right" style={{ pointerEvents: 'none', bottom: '20px', right: '20px', zIndex: 1000 }}>
          <div className="leaflet-control bg-white p-2 rounded shadow text-xs text-gray-700">
             <p className="font-bold mb-1">测距工具 (Distance)</p>
             <p>左键点击添加点 (Left click to add point)</p>
             <p>右键清除 (Right click to clear)</p>
             <p>当前总长: {formatNauticalMiles(totalDistance)}</p>
             <button 
                className="mt-2 bg-red-500 text-white px-2 py-1 rounded w-full pointer-events-auto"
                onClick={() => {
                    setPoints([]);
                    setTotalDistance(0);
                    setCurrentTool(null);
                }}
             >
                退出 (Exit)
             </button>
          </div>
       </div>
    </>
  );
};

export default DistanceTool;
