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
  last_update: string;
}

export type ToolType = 'distance' | 'area' | 'traffic' | 'weather' | 'search' | null;

export interface MapState {
  center: [number, number];
  zoom: number;
}
