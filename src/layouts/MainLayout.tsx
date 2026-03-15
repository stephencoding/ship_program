import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <Navbar />
      <main className="flex-1 relative">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
