import { mockTrajectories, mockVessels } from '../data/mockVessels';
import type { TrajectoryPoint, Vessel } from '../types';

export const vesselService = {
  async getVessels(): Promise<Vessel[]> {
    return mockVessels;
  },

  async getVesselById(id: string): Promise<Vessel | undefined> {
    return mockVessels.find((vessel) => vessel.id === id);
  },

  async searchVessels(query: string): Promise<Vessel[]> {
    const keyword = query.trim().toLowerCase();

    if (!keyword) {
      return mockVessels;
    }

    return mockVessels.filter((vessel) => {
      const values = [
        vessel.name,
        vessel.mmsi,
        vessel.imo,
        vessel.call_sign,
        vessel.destination,
        vessel.type,
        vessel.flag,
      ];

      return values.some((value) => value?.toLowerCase().includes(keyword));
    });
  },

  async getTrajectory(vesselId: string): Promise<TrajectoryPoint[]> {
    return mockTrajectories[vesselId] ?? [];
  },
};
