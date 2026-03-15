import React, { useState, useEffect } from 'react';
import { useMap, Polygon, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { useAppStore } from '../../../store/useAppStore';

// Simple spherical polygon area calculation
// Returns area in square meters
function calculateArea(latLngs: L.LatLng[]) {
    if (latLngs.length < 3) return 0;
    
    const earthRadius = 6378137; // meters
    const points = latLngs.map(ll => ({
        lat: ll.lat * Math.PI / 180,
        lng: ll.lng * Math.PI / 180
    }));

    let area = 0;
    if (points.length > 2) {
        for (let i = 0; i < points.length; i++) {
            const j = (i + 1) % points.length;
            area += (points[j].lng - points[i].lng) * 
                    (2 + Math.sin(points[i].lat) + Math.sin(points[j].lat));
        }
        area = area * earthRadius * earthRadius / 2.0;
    }
    return Math.abs(area);
}

const AreaTool: React.FC = () => {
  const map = useMap();
  const { currentTool, setCurrentTool } = useAppStore();
  const [points, setPoints] = useState<L.LatLng[]>([]);
  const [area, setArea] = useState<number>(0);
  const [tempPoint, setTempPoint] = useState<L.LatLng | null>(null);

  useEffect(() => {
    if (currentTool !== 'area') return;

    const handleClick = (e: L.LeafletMouseEvent) => {
      const newPoint = e.latlng;
      setPoints((prev) => {
        const newPoints = [...prev, newPoint];
        setArea(calculateArea(newPoints));
        return newPoints;
      });
    };

    const handleMouseMove = (e: L.LeafletMouseEvent) => {
      if (points.length > 0) {
        setTempPoint(e.latlng);
        // Calculate potential area with temp point?
        // Maybe too heavy for mousemove, let's skip for now
      }
    };

    const handleRightClick = () => {
        setPoints([]);
        setArea(0);
        setTempPoint(null);
    };

    map.on('click', handleClick);
    map.on('mousemove', handleMouseMove);
    map.on('contextmenu', handleRightClick);

    map.getContainer().style.cursor = 'crosshair';

    return () => {
      map.off('click', handleClick);
      map.off('mousemove', handleMouseMove);
      map.off('contextmenu', handleRightClick);
      map.getContainer().style.cursor = '';
    };
  }, [map, currentTool]);

  if (currentTool !== 'area') return null;

  const formatArea = (sqMeters: number) => {
    if (sqMeters < 1000000) return `${Math.round(sqMeters).toLocaleString()} m²`;
    return `${(sqMeters / 1000000).toFixed(2)} km²`;
  };

  return (
    <>
      {points.map((pt, idx) => (
        <Marker key={idx} position={pt} interactive={false} opacity={0.7} />
      ))}
      
      {points.length > 0 && (
        <Polygon positions={[...points, ...(tempPoint ? [tempPoint] : [])]} color="orange" />
      )}

      {points.length > 2 && (
          <Marker position={points[0]} opacity={0}>
              <Tooltip permanent direction="center" className="bg-transparent border-0 shadow-none text-orange-600 font-bold text-lg">
                  {formatArea(area)}
              </Tooltip>
          </Marker>
      )}
      
      {/* Instructions Overlay */}
       <div className="leaflet-bottom leaflet-right" style={{ pointerEvents: 'none', bottom: '20px', right: '20px', zIndex: 1000 }}>
          <div className="leaflet-control bg-white p-2 rounded shadow text-xs text-gray-700">
             <p className="font-bold mb-1">测面工具 (Area)</p>
             <p>左键点击添加点 (Left click to add point)</p>
             <p>右键清除 (Right click to clear)</p>
             <p>当前面积: {formatArea(area)}</p>
             <button 
                className="mt-2 bg-orange-500 text-white px-2 py-1 rounded w-full pointer-events-auto"
                onClick={() => {
                    setPoints([]);
                    setArea(0);
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

export default AreaTool;
