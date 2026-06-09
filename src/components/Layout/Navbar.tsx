import React from 'react';
import { Link } from 'react-router-dom';
import { Ship, ChevronDown, User, LogIn } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="h-12 bg-primary text-white flex items-center justify-between px-4 shadow-md z-50 relative">
      {/* Left: Logo and Brand */}
      <Link className="flex items-center space-x-2" to="/">
        <Ship className="w-6 h-6 text-red-500" />
        <span className="font-bold text-lg tracking-wide">Maritime AIS</span>
        <span className="text-xs text-gray-300 ml-2 hidden md:inline-block">Professional Traffic Analysis</span>
      </Link>

      {/* Center: Navigation Menu */}
      <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
        <Link className="hover:text-secondary-DEFAULT transition-colors" to="/demo">Demo 引导</Link>
        <Link className="hover:text-secondary-DEFAULT transition-colors" to="/">船位地图</Link>
        <Link className="hover:text-secondary-DEFAULT transition-colors" to="/analysis">GIS 分析</Link>
        <div className="cursor-pointer hover:text-secondary-DEFAULT transition-colors">API</div>
        <div className="flex items-center cursor-pointer hover:text-secondary-DEFAULT transition-colors">
          <span>解决方案</span>
          <ChevronDown className="w-4 h-4 ml-1" />
        </div>
        <div className="flex items-center cursor-pointer hover:text-secondary-DEFAULT transition-colors">
          <span>关于我们</span>
          <ChevronDown className="w-4 h-4 ml-1" />
        </div>
      </div>

      {/* Right: User Actions */}
      <div className="flex items-center space-x-4 text-sm">
        <Link to="/auth/login" className="flex items-center hover:text-secondary-DEFAULT transition-colors">
          <User className="w-4 h-4 mr-1" />
          登录
        </Link>
        <Link to="/auth/register" className="flex items-center hover:text-secondary-DEFAULT transition-colors">
          <LogIn className="w-4 h-4 mr-1" />
          注册
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
