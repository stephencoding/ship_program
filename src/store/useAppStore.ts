import { create } from 'zustand';
import type { ToolType, Vessel } from '../types';

interface AppState {
  selectedVessel: Vessel | null;
  setSelectedVessel: (vessel: Vessel | null) => void;
  
  currentTool: ToolType;
  setCurrentTool: (tool: ToolType) => void;
  
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  selectedVessel: null,
  setSelectedVessel: (vessel) => set({ selectedVessel: vessel }),
  
  currentTool: null,
  setCurrentTool: (tool) => set({ currentTool: tool }),
  
  sidebarOpen: false,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));
