import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, Marker, Popup, TileLayer, ZoomControl, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MapToolsManager from './Tools/MapToolsManager';
import { vesselService } from '../../services/vesselService';
import { useAppStore } from '../../store/useAppStore';
import type { Vessel } from '../../types';

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

const SelectedVesselFlyTo: React.FC = () => {
  const map = useMap();
  const selectedVessel = useAppStore((state) => state.selectedVessel);

  useEffect(() => {
    if (selectedVessel) {
      map.flyTo([selectedVessel.lat, selectedVessel.lng], 12, { duration: 0.8 });
    }
  }, [map, selectedVessel]);

  return null;
};

const VesselMarkers: React.FC = () => {
  const [vessels, setVessels] = useState<Vessel[]>([]);
  const { selectedVessel, setSelectedVessel } = useAppStore();

  useEffect(() => {
    vesselService.getVessels().then(setVessels);
  }, []);

  return (
    <>
      {vessels.map((vessel) => (
        <Marker
          key={vessel.id}
          position={[vessel.lat, vessel.lng]}
          eventHandlers={{ click: () => setSelectedVessel(vessel) }}
          opacity={selectedVessel?.id === vessel.id ? 1 : 0.85}
        >
          <Popup>
            <div className="min-w-48 text-sm text-gray-700">
              <div className="font-semibold text-primary">{vessel.name}</div>
              <div>MMSI: {vessel.mmsi}</div>
              <div>类型: {vessel.type}</div>
              <div>航速: {vessel.speed} kn</div>
              <div>目的地: {vessel.destination}</div>
              <Link className="mt-2 inline-block text-secondary hover:underline" to={`/vessel/${vessel.id}`}>
                查看详情
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

const MapComponent: React.FC = () => {
  return (
    <div className="h-full w-full relative z-0">
      <MapContainer
        center={[31.2304, 121.4737]}
        zoom={10}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <ZoomControl position="bottomright" />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <VesselMarkers />
        <SelectedVesselFlyTo />
        <MapToolsManager />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
