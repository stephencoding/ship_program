import React from 'react';

const StatusBar: React.FC = () => {
  return (
    <div className="absolute bottom-4 left-4 z-[1000] flex flex-col items-start space-y-1">
      {/* Coordinates Display */}
      <div className="bg-gray-800 bg-opacity-70 text-white text-xs px-2 py-1 rounded shadow-sm">
        <div className="flex flex-col">
          <span>31° 13.824' N</span>
          <span>121° 28.422' E</span>
        </div>
        <div className="mt-1 border-t border-gray-600 pt-1 flex justify-between">
          <span className="text-gray-400">DDM</span>
          <span>Scale: 1000nm</span>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="text-[10px] text-gray-500 drop-shadow-md">
        ©2026 Maritime AIS Platform | 京ICP备12345678号
      </div>
    </div>
  );
};

export default StatusBar;
