export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'professional' | 'enterprise' | 'admin';
  avatar?: string;
}

export interface Vessel {
  id: string;
  mmsi: string;
  name: string;
  imo?: string;
  call_sign?: string;
  lat: number;
  lng: number;
  course: number;
  speed: number;
  heading: number;
  status: string;
  destination?: string;
  eta?: string;
  type?: string;
  flag?: string;
  length?: number;
  width?: number;
  last_update: string;
}

export interface TrajectoryPoint {
  lat: number;
  lng: number;
  course: number;
  speed: number;
  timestamp: string;
}

export type ToolType = 'distance' | 'area' | 'traffic' | 'weather' | 'search' | null;

export interface MapState {
  center: [number, number];
  zoom: number;
}

export type GisFeatureType = 'region' | 'density' | 'route' | 'hotspot';

export type GisGeometry =
  | { type: 'Point'; coordinates: [number, number] }
  | { type: 'LineString'; coordinates: [number, number][] }
  | { type: 'Polygon'; coordinates: [number, number][][] };

export interface GisFeatureProperties {
  featureType: GisFeatureType;
  name: string;
  description?: string;
  value?: number;
  count?: number;
  density?: number;
  level?: 'low' | 'medium' | 'high';
  color?: string;
}

export interface GisFeature {
  type: 'Feature';
  geometry: GisGeometry;
  properties: GisFeatureProperties;
}

export interface GisFeatureCollection {
  type: 'FeatureCollection';
  features: GisFeature[];
}

export interface GisAnalysisResult {
  id: string;
  name: string;
  description: string;
  timeRange: string;
  metrics: {
    vesselCount: number;
    avgSpeed: number;
    hotspotCount: number;
    areaKm2: number;
    routeCount: number;
  };
  features: GisFeatureCollection;
}
