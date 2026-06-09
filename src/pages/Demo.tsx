import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart2, Map, MousePointerClick, PlayCircle, Ruler, Search, Ship } from 'lucide-react';

const demoSteps = [
  {
    title: '1. 查看船舶态势地图',
    description: '进入首页查看上海港附近的 mock 船舶分布，点击船舶 marker 可查看基础信息。',
    action: '打开首页地图',
    to: '/',
    icon: <Map className="h-5 w-5" />,
  },
  {
    title: '2. 搜索船舶',
    description: '在首页左上角搜索 COSCO、MMSI 或目的地，查看搜索结果并进入船舶详情。',
    action: '去首页搜索',
    to: '/',
    icon: <Search className="h-5 w-5" />,
  },
  {
    title: '3. 查看船舶详情',
    description: '查看船舶基础动态，包括航速、航向、目的地、ETA 和历史轨迹。',
    action: '查看示例船舶',
    to: '/vessel/vessel-001',
    icon: <Ship className="h-5 w-5" />,
  },
  {
    title: '4. 体验轨迹回放',
    description: '在船舶详情页点击播放按钮，查看轨迹点、已播放路径和地图跟随效果。',
    action: '打开轨迹回放',
    to: '/vessel/vessel-001',
    icon: <PlayCircle className="h-5 w-5" />,
  },
  {
    title: '5. 体验地图小工具',
    description: '回到首页使用右侧工具栏，尝试测距、测面、交通流和气象水文 mock 图层。',
    action: '返回首页工具栏',
    to: '/',
    icon: <Ruler className="h-5 w-5" />,
  },
  {
    title: '6. 查看 GIS 分析结果',
    description: '进入分析页查看 GeoJSON 承载的分析区域、密度分区、交通流线和热点。',
    action: '打开 GIS 分析',
    to: '/analysis',
    icon: <BarChart2 className="h-5 w-5" />,
  },
];

const Demo: React.FC = () => {
  return (
    <div className="h-full overflow-auto bg-slate-100 p-6">
      <div className="mx-auto max-w-6xl">
        <section className="rounded bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-primary">Maritime AIS Demo 引导</h1>
                <span className="rounded bg-blue-50 px-3 py-1 text-xs text-secondary">Mock Data</span>
              </div>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600">
                这是一个用于演示的最小可操作 Demo，覆盖船舶态势、船舶搜索、详情动态、轨迹回放、地图小工具和 GIS 分析结果展示。
              </p>
            </div>
            <Link className="rounded bg-secondary px-4 py-2 text-sm text-white hover:bg-blue-700" to="/">
              直接进入地图
            </Link>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {demoSteps.map((step) => (
            <article key={step.title} className="flex flex-col rounded bg-white p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="rounded bg-blue-50 p-2 text-secondary">{step.icon}</div>
                <div>
                  <h2 className="font-semibold text-gray-800">{step.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{step.description}</p>
                </div>
              </div>
              <div className="mt-auto pt-4">
                <Link className="inline-flex items-center text-sm text-secondary hover:underline" to={step.to}>
                  <MousePointerClick className="mr-1 h-4 w-4" />
                  {step.action}
                </Link>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-6 rounded bg-white p-5 shadow-sm">
          <h2 className="font-semibold text-gray-800">推荐演示话术</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-gray-600">
            <li>首页展示 Web 端船舶态势图，模拟小型船讯网能力。</li>
            <li>搜索并点击船舶，展示船舶实时动态和基础档案。</li>
            <li>进入详情页播放历史轨迹，说明后续可接真实 AIS 轨迹。</li>
            <li>返回首页演示测距、测面、交通流和气象水文工具。</li>
            <li>进入 GIS 分析页，说明 GeoJSON 可承载 GIS 跑图结果上网页展示。</li>
          </ol>
        </section>
      </div>
    </div>
  );
};

export default Demo;
