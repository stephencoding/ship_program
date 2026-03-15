import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MapToolsManager from './Tools/MapToolsManager';

// Fix for default marker icon in React Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapComponent: React.FC = () => {
  return (
    <div className="h-full w-full relative z-0">
      <MapContainer 
        center={[31.2304, 121.4737]} 
        zoom={13} 
        scrollWheelZoom={true} 
        style={{ height: "100%", width: "100%" }}
        zoomControl={false} // We will add it manually to customize position if needed, or just let it be false and use buttons
      >
        <ZoomControl position="bottomright" />
        
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <Marker position={[31.2304, 121.4737]}>
          <Popup>
            Shanghai Port <br /> A major maritime hub.
          </Popup>
        </Marker>

        {/* Tools Manager */}
        <MapToolsManager />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
