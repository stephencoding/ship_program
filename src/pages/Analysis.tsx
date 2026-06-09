import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, BarChart2, MapPinned, Route, Ship, Waves } from 'lucide-react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import AnalysisLayers from '../components/Map/AnalysisLayers';
import { mockGisAnalysisResult } from '../data/mockGisAnalysis';

const legendItems = [
  { label: '分析区域', color: '#1976d2', description: '通航选址研究范围' },
  { label: '密度分区', color: '#f97316', description: '船舶交通密集网格' },
  { label: '主航迹/流线', color: '#2563eb', description: '主要通航方向' },
  { label: '热点', color: '#dc2626', description: '高频交汇或聚集点' },
];

const Analysis: React.FC = () => {
  const result = mockGisAnalysisResult;

  return (
    <div className="h-full overflow-auto bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-primary">GIS 交通流分析结果</h1>
              <span className="rounded bg-blue-50 px-3 py-1 text-xs text-secondary">Mock GeoJSON</span>
            </div>
            <p className="mt-2 text-sm text-gray-500">{result.description}</p>
          </div>
          <Link className="rounded bg-secondary px-4 py-2 text-sm text-white hover:bg-blue-700" to="/">
            返回地图
          </Link>
        </div>

        <section className="mb-4 rounded bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{result.name}</h2>
              <p className="mt-1 text-sm text-gray-500">分析时间：{result.timeRange}</p>
            </div>
            <div className="rounded bg-slate-50 px-3 py-2 text-xs text-gray-500">
              数据源：内置 GIS mock 结果 · 坐标系：WGS84
            </div>
          </div>
        </section>

        <section className="mb-4 grid gap-4 md:grid-cols-5">
          <MetricCard icon={<Ship className="h-5 w-5" />} label="统计船舶" value={result.metrics.vesselCount.toLocaleString()} unit="艘次" />
          <MetricCard icon={<Activity className="h-5 w-5" />} label="平均航速" value={result.metrics.avgSpeed.toFixed(1)} unit="kn" />
          <MetricCard icon={<MapPinned className="h-5 w-5" />} label="热点数量" value={String(result.metrics.hotspotCount)} unit="个" />
          <MetricCard icon={<Waves className="h-5 w-5" />} label="分析面积" value={result.metrics.areaKm2.toFixed(1)} unit="km²" />
          <MetricCard icon={<Route className="h-5 w-5" />} label="主流线" value={String(result.metrics.routeCount)} unit="条" />
        </section>

        <section className="grid gap-4 lg:grid-cols-[1fr_280px]">
          <div className="overflow-hidden rounded bg-white shadow-sm">
            <div className="border-b border-gray-100 px-5 py-3">
              <div className="flex items-center gap-2">
                <BarChart2 className="h-5 w-5 text-secondary" />
                <h2 className="font-semibold text-gray-800">GeoJSON 结果图层</h2>
              </div>
              <p className="mt-1 text-xs text-gray-500">展示 Polygon、LineString、Point 三类 GIS 结果，可用于承载 GIS 跑图输出。</p>
            </div>
            <div className="h-[560px]">
              <MapContainer
                center={[31.25, 121.62]}
                scrollWheelZoom={true}
                style={{ height: '100%', width: '100%' }}
                zoom={10}
                zoomControl={false}
              >
                <ZoomControl position="bottomright" />
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <AnalysisLayers featureCollection={result.features} />
              </MapContainer>
            </div>
          </div>

          <aside className="space-y-4">
            <section className="rounded bg-white p-5 shadow-sm">
              <h2 className="font-semibold text-gray-800">图例</h2>
              <div className="mt-4 space-y-3">
                {legendItems.map((item) => (
                  <div key={item.label} className="flex gap-3">
                    <span className="mt-1 h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
                    <div>
                      <div className="text-sm font-medium text-gray-800">{item.label}</div>
                      <div className="text-xs text-gray-500">{item.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded bg-white p-5 shadow-sm">
              <h2 className="font-semibold text-gray-800">结果说明</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-gray-600">
                <li>当前结果为内置 mock GeoJSON，用于验证 GIS 出图上网页的展示链路。</li>
                <li>真实接入时可将 GIS 工具输出的 GeoJSON 替换为接口返回数据。</li>
                <li>后续可扩展区域选择、时间筛选、报告导出和多结果对比。</li>
              </ul>
            </section>
          </aside>
        </section>
      </div>
    </div>
  );
};

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, label, value, unit }) => (
  <article className="rounded bg-white p-4 shadow-sm">
    <div className="flex items-center justify-between">
      <div className="rounded bg-blue-50 p-2 text-secondary">{icon}</div>
      <span className="text-xs text-gray-400">GIS</span>
    </div>
    <div className="mt-4 text-sm text-gray-500">{label}</div>
    <div className="mt-1 flex items-end gap-1">
      <span className="text-2xl font-bold text-primary">{value}</span>
      <span className="pb-1 text-xs text-gray-500">{unit}</span>
    </div>
  </article>
);

export default Analysis;
