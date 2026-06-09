import React from 'react';
import { CircleMarker, Polygon, Polyline, Tooltip } from 'react-leaflet';
import type { GisFeature, GisFeatureCollection, GisFeatureProperties } from '../../types';

interface AnalysisLayersProps {
  featureCollection: GisFeatureCollection;
}

const levelColors: Record<string, string> = {
  low: '#22c55e',
  medium: '#f59e0b',
  high: '#ef4444',
};

const featureTypeColors: Record<string, string> = {
  region: '#1976d2',
  density: '#f97316',
  route: '#2563eb',
  hotspot: '#dc2626',
};

const lngLatToLatLng = ([lng, lat]: [number, number]): [number, number] => [lat, lng];

const getFeatureColor = (properties: GisFeatureProperties) => {
  return properties.color ?? (properties.level ? levelColors[properties.level] : undefined) ?? featureTypeColors[properties.featureType];
};

const getFeatureLabel = (properties: GisFeatureProperties) => {
  const details = [
    properties.count !== undefined ? `数量：${properties.count}` : undefined,
    properties.density !== undefined ? `密度：${properties.density}` : undefined,
    properties.value !== undefined ? `指标：${properties.value}` : undefined,
    properties.level ? `等级：${properties.level}` : undefined,
  ].filter(Boolean);

  return (
    <div className="max-w-56 text-xs leading-5">
      <div className="font-semibold text-gray-800">{properties.name}</div>
      {properties.description && <div className="mt-1 text-gray-600">{properties.description}</div>}
      {details.length > 0 && <div className="mt-1 text-gray-500">{details.join(' · ')}</div>}
    </div>
  );
};

const renderFeature = (feature: GisFeature, index: number) => {
  const { geometry, properties } = feature;
  const color = getFeatureColor(properties);
  const key = `${properties.featureType}-${properties.name}-${index}`;

  if (geometry.type === 'Point') {
    const radius = Math.min(Math.max((properties.count ?? 60) / 18, 6), 18);

    return (
      <CircleMarker
        key={key}
        center={lngLatToLatLng(geometry.coordinates)}
        pathOptions={{ color, fillColor: color, fillOpacity: 0.55, weight: 2 }}
        radius={radius}
      >
        <Tooltip direction="top" opacity={0.95} sticky>
          {getFeatureLabel(properties)}
        </Tooltip>
      </CircleMarker>
    );
  }

  if (geometry.type === 'LineString') {
    return (
      <Polyline
        key={key}
        pathOptions={{ color, opacity: 0.85, weight: properties.level === 'high' ? 6 : 4 }}
        positions={geometry.coordinates.map(lngLatToLatLng)}
      >
        <Tooltip direction="top" opacity={0.95} sticky>
          {getFeatureLabel(properties)}
        </Tooltip>
      </Polyline>
    );
  }

  const positions = geometry.coordinates.map((ring) => ring.map(lngLatToLatLng));
  const isDensity = properties.featureType === 'density';

  return (
    <Polygon
      key={key}
      pathOptions={{
        color,
        fillColor: color,
        fillOpacity: isDensity ? 0.28 : 0.08,
        opacity: 0.85,
        weight: isDensity ? 1 : 2,
      }}
      positions={positions}
    >
      <Tooltip direction="center" opacity={0.95} sticky>
        {getFeatureLabel(properties)}
      </Tooltip>
    </Polygon>
  );
};

const AnalysisLayers: React.FC<AnalysisLayersProps> = ({ featureCollection }) => {
  return <>{featureCollection.features.map(renderFeature)}</>;
};

export default AnalysisLayers;
