import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Navigation, Pause, Play, RotateCcw, Ship, Timer } from 'lucide-react';
import { CircleMarker, MapContainer, Marker, Polyline, TileLayer, Tooltip, ZoomControl, useMap } from 'react-leaflet';
import { vesselService } from '../services/vesselService';
import { useAppStore } from '../store/useAppStore';
import type { TrajectoryPoint, Vessel } from '../types';

const playbackSpeeds = [1, 2, 4];

interface CurrentPointFollowerProps {
  point?: TrajectoryPoint;
}

const CurrentPointFollower: React.FC<CurrentPointFollowerProps> = ({ point }) => {
  const map = useMap();

  useEffect(() => {
    if (point) {
      map.panTo([point.lat, point.lng], { animate: true, duration: 0.4 });
    }
  }, [map, point]);

  return null;
};

const VesselDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const setSelectedVessel = useAppStore((state) => state.setSelectedVessel);
  const [vessel, setVessel] = useState<Vessel | undefined>();
  const [trajectory, setTrajectory] = useState<TrajectoryPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!id) return;

    const loadVessel = async () => {
      window.clearInterval(timerRef.current);
      timerRef.current = undefined;
      setIsPlaying(false);
      setCurrentIndex(0);
      setLoading(true);

      const [vesselData, trajectoryData] = await Promise.all([
        vesselService.getVesselById(id),
        vesselService.getTrajectory(id),
      ]);

      setVessel(vesselData);
      setTrajectory(trajectoryData);
      if (vesselData) {
        setSelectedVessel(vesselData);
      }
      setLoading(false);
    };

    loadVessel();
  }, [id, setSelectedVessel]);

  useEffect(() => {
    if (!isPlaying || trajectory.length <= 1) return;

    timerRef.current = window.setInterval(() => {
      setCurrentIndex((previousIndex) => {
        if (previousIndex >= trajectory.length - 1) {
          window.clearInterval(timerRef.current);
          timerRef.current = undefined;
          setIsPlaying(false);
          return previousIndex;
        }

        return previousIndex + 1;
      });
    }, 1000 / playbackSpeed);

    return () => {
      window.clearInterval(timerRef.current);
      timerRef.current = undefined;
    };
  }, [isPlaying, playbackSpeed, trajectory.length]);

  useEffect(() => {
    return () => {
      window.clearInterval(timerRef.current);
    };
  }, []);

  if (loading) {
    return <div className="p-6 text-gray-600">加载船舶信息中...</div>;
  }

  if (!vessel) {
    return (
      <div className="p-6">
        <Link className="text-secondary hover:underline" to="/">
          返回首页
        </Link>
        <div className="mt-4 text-gray-600">未找到船舶信息</div>
      </div>
    );
  }

  const trajectoryPositions = trajectory.map((point) => [point.lat, point.lng] as [number, number]);
  const playedPositions = trajectory
    .slice(0, currentIndex + 1)
    .map((point) => [point.lat, point.lng] as [number, number]);
  const currentPoint = trajectory[currentIndex];
  const hasTrajectory = trajectory.length > 0;

  const handleTogglePlayback = () => {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }

    if (trajectory.length <= 1) return;

    if (currentIndex >= trajectory.length - 1) {
      setCurrentIndex(0);
    }
    setIsPlaying(true);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentIndex(0);
  };

  return (
    <div className="h-full overflow-auto bg-slate-100 p-6">
      <div className="mb-4 flex items-center justify-between">
        <Link className="inline-flex items-center text-sm text-secondary hover:underline" to="/">
          <ArrowLeft className="mr-1 h-4 w-4" />
          返回地图
        </Link>
        <span className="rounded bg-blue-50 px-3 py-1 text-xs text-secondary">Mock Data</span>
      </div>

      <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
        <section className="rounded bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-bold text-primary">{vessel.name}</h1>
              <p className="mt-1 text-sm text-gray-500">{vessel.type} · {vessel.flag}</p>
            </div>
            <Ship className="h-8 w-8 text-secondary" />
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <InfoItem label="MMSI" value={vessel.mmsi} />
            <InfoItem label="IMO" value={vessel.imo ?? '-'} />
            <InfoItem label="呼号" value={vessel.call_sign ?? '-'} />
            <InfoItem label="状态" value={vessel.status} />
            <InfoItem label="航速" value={`${vessel.speed} kn`} />
            <InfoItem label="航向" value={`${vessel.course}°`} />
            <InfoItem label="船长" value={vessel.length ? `${vessel.length} m` : '-'} />
            <InfoItem label="船宽" value={vessel.width ? `${vessel.width} m` : '-'} />
          </div>

          <div className="mt-5 space-y-3 border-t border-gray-100 pt-4 text-sm">
            <div className="flex items-center text-gray-700">
              <Navigation className="mr-2 h-4 w-4 text-secondary" />
              目的地：{vessel.destination}
            </div>
            <div className="flex items-center text-gray-700">
              <Timer className="mr-2 h-4 w-4 text-secondary" />
              ETA：{vessel.eta}
            </div>
            <div className="text-xs text-gray-500">最后更新：{vessel.last_update}</div>
          </div>
        </section>

        <section className="overflow-hidden rounded bg-white shadow-sm">
          <div className="border-b border-gray-100 px-5 py-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-gray-800">历史轨迹回放</h2>
                <p className="mt-1 text-xs text-gray-500">基于 mock 轨迹点展示，后续可替换为真实 AIS 轨迹。</p>
              </div>
              <div className="text-xs text-gray-500">
                {hasTrajectory ? `${currentIndex + 1} / ${trajectory.length}` : '暂无轨迹'}
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  className="inline-flex items-center rounded bg-secondary px-3 py-1.5 text-sm text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                  disabled={trajectory.length <= 1}
                  onClick={handleTogglePlayback}
                >
                  {isPlaying ? <Pause className="mr-1 h-4 w-4" /> : <Play className="mr-1 h-4 w-4" />}
                  {isPlaying ? '暂停' : '播放'}
                </button>
                <button
                  className="inline-flex items-center rounded border border-gray-200 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-300"
                  disabled={!hasTrajectory}
                  onClick={handleReset}
                >
                  <RotateCcw className="mr-1 h-4 w-4" />
                  重置
                </button>
                <div className="flex items-center overflow-hidden rounded border border-gray-200 text-sm">
                  {playbackSpeeds.map((speed) => (
                    <button
                      key={speed}
                      className={`px-3 py-1.5 ${playbackSpeed === speed ? 'bg-blue-50 text-secondary' : 'text-gray-600 hover:bg-gray-50'}`}
                      onClick={() => setPlaybackSpeed(speed)}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  当前时间：{currentPoint?.timestamp ?? '-'}
                </span>
              </div>

              <input
                className="w-full accent-blue-600"
                disabled={!hasTrajectory}
                max={Math.max(trajectory.length - 1, 0)}
                min={0}
                type="range"
                value={currentIndex}
                onChange={(event) => setCurrentIndex(Number(event.target.value))}
              />
            </div>
          </div>
          <div className="h-[460px]">
            <MapContainer
              center={[vessel.lat, vessel.lng]}
              zoom={10}
              scrollWheelZoom={true}
              style={{ height: '100%', width: '100%' }}
              zoomControl={false}
            >
              <ZoomControl position="bottomright" />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {trajectoryPositions.length > 1 && (
                <Polyline positions={trajectoryPositions} color="#94a3b8" weight={3} opacity={0.6} />
              )}
              {playedPositions.length > 1 && (
                <Polyline positions={playedPositions} color="#1976d2" weight={5} opacity={0.9} />
              )}
              {trajectory.map((point, index) => (
                <CircleMarker
                  key={`${point.timestamp}-${index}`}
                  center={[point.lat, point.lng]}
                  radius={index === currentIndex ? 5 : 3}
                  pathOptions={{
                    color: index <= currentIndex ? '#1976d2' : '#94a3b8',
                    fillColor: index <= currentIndex ? '#1976d2' : '#94a3b8',
                    fillOpacity: 0.8,
                    weight: 1,
                  }}
                />
              ))}
              {currentPoint && (
                <Marker position={[currentPoint.lat, currentPoint.lng]}>
                  <Tooltip permanent direction="top" offset={[0, -32]}>
                    <div className="text-xs">
                      <div className="font-semibold">{vessel.name}</div>
                      <div>{currentPoint.timestamp}</div>
                      <div>{currentPoint.speed} kn · {currentPoint.course}°</div>
                    </div>
                  </Tooltip>
                </Marker>
              )}
              <CurrentPointFollower point={currentPoint} />
            </MapContainer>
          </div>
        </section>
      </div>

      <section className="mt-4 rounded bg-white p-5 shadow-sm">
        <h2 className="font-semibold text-gray-800">轨迹点</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs text-gray-500">
              <tr>
                <th className="px-3 py-2">时间</th>
                <th className="px-3 py-2">纬度</th>
                <th className="px-3 py-2">经度</th>
                <th className="px-3 py-2">航速</th>
                <th className="px-3 py-2">航向</th>
              </tr>
            </thead>
            <tbody>
              {trajectory.map((point, index) => (
                <tr
                  key={point.timestamp}
                  className={`border-t border-gray-100 ${index === currentIndex ? 'bg-blue-50 text-secondary' : ''}`}
                >
                  <td className="px-3 py-2">{point.timestamp}</td>
                  <td className="px-3 py-2">{point.lat}</td>
                  <td className="px-3 py-2">{point.lng}</td>
                  <td className="px-3 py-2">{point.speed} kn</td>
                  <td className="px-3 py-2">{point.course}°</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

interface InfoItemProps {
  label: string;
  value: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => (
  <div className="rounded bg-slate-50 p-3">
    <div className="text-xs text-gray-500">{label}</div>
    <div className="mt-1 font-medium text-gray-800">{value}</div>
  </div>
);

export default VesselDetail;
