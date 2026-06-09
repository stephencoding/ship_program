import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Ruler,
  Square, 
  CloudRain, 
  BarChart2, 
  Layers, 
  Ship,
  MapPin,
  Bell,
  PlayCircle
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import clsx from 'clsx';

interface ToolItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const ToolItem: React.FC<ToolItemProps> = ({ icon, label, active, onClick }) => (
  <div 
    className={clsx(
      "flex flex-col items-center justify-center p-2 cursor-pointer hover:bg-gray-100 transition-colors w-full h-16 border-b border-gray-100 last:border-b-0",
      active && "bg-blue-50 text-secondary"
    )}
    onClick={onClick}
    title={label}
  >
    <div className={clsx("mb-1", active ? "text-secondary" : "text-gray-500")}>
      {icon}
    </div>
    <span className="text-xs text-gray-600 scale-90">{label}</span>
  </div>
);

const ToolsPanel: React.FC = () => {
  const navigate = useNavigate();
  const { currentTool, selectedVessel, setCurrentTool, toggleSidebar } = useAppStore();

  const handleTrajectoryPlayback = () => {
    if (!selectedVessel) {
      window.alert('请先在地图上选择一条船舶');
      return;
    }

    navigate(`/vessel/${selectedVessel.id}`);
  };

  return (
    <div className="absolute top-4 right-4 z-[1000] flex flex-col space-y-2">
      {/* Top Map Controls */}
      <div className="flex bg-white rounded shadow-sm overflow-hidden mb-2 self-end">
        <button className="px-3 py-1 text-xs text-gray-600 hover:bg-gray-100 border-r border-gray-100 flex items-center">
          <Bell className="w-3 h-3 mr-1" /> 关注
        </button>
        <button className="px-3 py-1 text-xs text-gray-600 hover:bg-gray-100 border-r border-gray-100 flex items-center">
          <MapPin className="w-3 h-3 mr-1" /> 标记
        </button>
        <button className="px-3 py-1 text-xs text-gray-600 hover:bg-gray-100 border-r border-gray-100 flex items-center">
          <Ship className="w-3 h-3 mr-1" /> 筛船
        </button>
        <button className="px-3 py-1 text-xs text-gray-600 hover:bg-gray-100 flex items-center">
          <Layers className="w-3 h-3 mr-1" /> 图层
        </button>
      </div>

      {/* Right Sidebar Utility Panel */}
      <div className="bg-white rounded shadow-md w-16 flex flex-col items-center py-2 self-end">
        <ToolItem 
          icon={<Bell className="w-5 h-5" />} 
          label="我的关注" 
          onClick={() => toggleSidebar()} 
        />
        <ToolItem 
          icon={<MapPin className="w-5 h-5" />} 
          label="我的标记" 
          onClick={() => toggleSidebar()} 
        />
        <ToolItem 
          icon={<Ship className="w-5 h-5" />} 
          label="船舶计划" 
          onClick={() => {}} 
        />
        <div className="w-full h-px bg-gray-200 my-1"></div>
        <ToolItem 
          icon={<Ruler className="w-5 h-5" />} 
          label="测距" 
          active={currentTool === 'distance'}
          onClick={() => setCurrentTool('distance')} 
        />
        <ToolItem 
          icon={<Square className="w-5 h-5" />} 
          label="测面" 
          active={currentTool === 'area'}
          onClick={() => setCurrentTool('area')} 
        />
        <ToolItem 
          icon={<CloudRain className="w-5 h-5" />} 
          label="气象水文" 
          active={currentTool === 'weather'}
          onClick={() => setCurrentTool('weather')} 
        />
        <ToolItem 
          icon={<BarChart2 className="w-5 h-5" />} 
          label="交通流" 
          active={currentTool === 'traffic'}
          onClick={() => setCurrentTool('traffic')} 
        />
        <ToolItem
          icon={<PlayCircle className="w-5 h-5" />}
          label="轨迹回放"
          onClick={handleTrajectoryPlayback}
        />
      </div>
    </div>
  );
};

export default ToolsPanel;
