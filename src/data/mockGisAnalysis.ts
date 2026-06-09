import type { GisAnalysisResult } from '../types';

export const mockGisAnalysisResult: GisAnalysisResult = {
  id: 'analysis-shanghai-port-2026-q2',
  name: '上海港通航选址交通流分析',
  description: '基于 mock AIS 轨迹和密度网格生成的 GIS 分析结果，用于演示网页端承载 GIS 出图能力。',
  timeRange: '2026-04-01 至 2026-06-30',
  metrics: {
    vesselCount: 1286,
    avgSpeed: 11.8,
    hotspotCount: 3,
    areaKm2: 186.4,
    routeCount: 2,
  },
  features: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [121.15, 30.92],
            [122.08, 30.92],
            [122.08, 31.62],
            [121.15, 31.62],
            [121.15, 30.92],
          ]],
        },
        properties: {
          featureType: 'region',
          name: '上海港外海分析区',
          description: '通航选址分析范围，覆盖主航道和外锚地周边水域。',
          value: 186.4,
          level: 'medium',
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [121.3, 31.05],
            [121.68, 31.05],
            [121.68, 31.32],
            [121.3, 31.32],
            [121.3, 31.05],
          ]],
        },
        properties: {
          featureType: 'density',
          name: '高密度通航网格 A',
          description: '船舶流量集中区域，建议重点评估通航安全影响。',
          density: 82,
          count: 524,
          level: 'high',
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [121.68, 31.02],
            [121.98, 31.02],
            [121.98, 31.42],
            [121.68, 31.42],
            [121.68, 31.02],
          ]],
        },
        properties: {
          featureType: 'density',
          name: '中密度通航网格 B',
          description: '进出港转换区，存在一定交汇流。',
          density: 47,
          count: 318,
          level: 'medium',
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [
            [121.18, 31.02],
            [121.38, 31.13],
            [121.58, 31.24],
            [121.82, 31.36],
            [122.02, 31.48],
          ],
        },
        properties: {
          featureType: 'route',
          name: '主通航流线：西南-东北向',
          description: '集装箱船和散货船主要进出港流线。',
          count: 682,
          level: 'high',
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [
            [121.92, 30.96],
            [121.74, 31.1],
            [121.55, 31.26],
            [121.34, 31.44],
          ],
        },
        properties: {
          featureType: 'route',
          name: '辅助通航流线：东南-西北向',
          description: '客运船舶、巡逻船和部分短途运输船流线。',
          count: 271,
          level: 'medium',
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [121.52, 31.22],
        },
        properties: {
          featureType: 'hotspot',
          name: '热点 1：主航道交汇区',
          description: '船舶交汇频次高，建议作为重点风险识别点。',
          count: 196,
          level: 'high',
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [121.78, 31.14],
        },
        properties: {
          featureType: 'hotspot',
          name: '热点 2：外锚地入口',
          description: '锚泊与进出港船舶叠加明显。',
          count: 132,
          level: 'medium',
        },
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [121.42, 31.42],
        },
        properties: {
          featureType: 'hotspot',
          name: '热点 3：北侧疏港通道',
          description: '局部时段存在短时高峰。',
          count: 88,
          level: 'medium',
        },
      },
    ],
  },
};
