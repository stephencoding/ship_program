# Maritime AIS Demo 使用文档

这是一个面向海事通航选址和船舶交通流分析场景的 Web Demo。当前版本使用 mock 数据，主要用于演示船舶态势、搜索、详情、轨迹回放、地图工具和 GIS GeoJSON 分析结果展示能力。

## 1. 当前 Demo 功能

### 已支持

- 首页船舶态势地图
- 船舶搜索
- 船舶详情页
- 历史轨迹回放
- 测距工具
- 测面工具
- 交通流 mock 图层
- 气象水文 mock 信息
- GIS GeoJSON 分析结果展示
- 登录/注册占位页
- Demo 引导页

### 重要说明

当前系统为演示版本：

- 船舶数据为 mock 数据。
- GIS 分析结果为内置 mock GeoJSON。
- 登录、注册、真实 AIS、Supabase、预测推演、报告导出尚未正式接入。

## 2. 环境要求

建议环境：

- Node.js：建议 20.x 或更高版本
- npm：随 Node.js 一起安装
- 操作系统：macOS / Windows / Linux 均可

查看本机环境：

```bash
node -v
npm -v
```

如果没有安装 Node.js，可从 Node.js 官网下载安装 LTS 版本，或使用 nvm 管理 Node 版本。

macOS 使用 nvm 的示例：

```bash
# 安装 nvm 后
nvm install 20
nvm use 20
```

## 3. 安装依赖

进入项目目录：

```bash
cd /path/to/ship_program
```

安装依赖：

```bash
npm install
```

如果已经安装过依赖，通常不需要重复安装。

## 4. 本地开发运行

启动本地开发服务：

```bash
npm run dev
```

默认访问地址通常是：

```text
http://127.0.0.1:5173/
```

如果需要让同一局域网内其他设备访问，可以使用：

```bash
npm run dev -- --host 0.0.0.0
```

然后用本机局域网 IP 访问，例如：

```text
http://192.168.x.x:5173/
```

## 5. 生产构建

执行构建：

```bash
npm run build
```

构建产物会生成到：

```text
dist/
```

本地预览构建产物：

```bash
npm run preview
```

默认访问地址通常是：

```text
http://127.0.0.1:4173/
```

## 6. Demo 演示入口

推荐从 Demo 引导页开始：

```text
http://127.0.0.1:5173/demo
```

主要页面：

| 页面 | 路径 | 说明 |
|---|---|---|
| Demo 引导页 | `/demo` | 演示流程说明和快捷入口 |
| 首页地图 | `/` | 船舶态势、搜索、地图工具 |
| 船舶详情 | `/vessel/vessel-001` | 船舶详情和轨迹回放 |
| GIS 分析 | `/analysis` | GeoJSON 分析结果地图展示 |
| 登录占位 | `/auth/login` | 登录功能占位页 |
| 注册占位 | `/auth/register` | 注册功能占位页 |

## 7. 推荐演示流程

### 7.1 打开 Demo 引导页

访问：

```text
/demo
```

说明当前 Demo 覆盖：

- 船舶态势
- 船舶搜索
- 船舶详情
- 轨迹回放
- 地图工具
- GIS 分析结果展示

### 7.2 查看首页船舶态势

访问：

```text
/
```

可演示：

- 上海港附近船舶 mock 分布
- 点击船舶 marker 查看 popup
- 点击 popup 中的“查看详情”进入详情页

### 7.3 搜索船舶

在首页左上角搜索框输入：

```text
COSCO
```

或输入示例 MMSI：

```text
413000001
```

可演示：

- 搜索结果列表
- 点击搜索结果进入船舶详情
- 单一匹配结果自动选中船舶

### 7.4 查看船舶详情和轨迹回放

访问：

```text
/vessel/vessel-001
```

可演示：

- 船名、MMSI、IMO、呼号
- 航速、航向、状态、目的地、ETA
- 历史轨迹地图
- 播放 / 暂停 / 重置
- 1x / 2x / 4x 播放速度
- 轨迹点表格高亮

### 7.5 使用地图小工具

回到首页：

```text
/
```

右侧工具栏可演示：

- 测距：左键点击添加点，右键清除
- 测面：左键点击添加区域点，右键清除
- 交通流：显示 mock 交通热点
- 气象水文：显示 mock 风浪信息
- 轨迹回放：先点击船舶 marker，再点击轨迹回放进入详情页

### 7.6 查看 GIS GeoJSON 分析结果

访问：

```text
/analysis
```

可演示：

- GIS 分析统计卡片
- 分析区域 Polygon
- 密度分区 Polygon
- 主航迹 / 交通流线 LineString
- 热点 Point
- 图例
- tooltip 信息

这部分用于说明：

> 未来可以把 GIS 工具跑出的 GeoJSON 结果直接接入 Web 前端展示。

## 8. 临时分享给别人操作

### 方式一：局域网访问

启动服务：

```bash
npm run dev -- --host 0.0.0.0
```

把本机局域网地址发给同一网络下的人：

```text
http://你的局域网IP:5173/demo
```

### 方式二：临时公网隧道

可以使用 ngrok、Cloudflare Tunnel、localtunnel 等工具将本地 `5173` 端口临时暴露为公网地址。

基本思路：

1. 本地启动项目：

```bash
npm run dev
```

2. 使用隧道工具转发本地端口 `5173`。
3. 将生成的临时 URL 发给体验者。
4. 演示结束后关闭本地服务或隧道。

注意：当前是 mock 数据 demo，适合临时演示；不要在未做权限和安全控制前接入真实敏感数据。

### 方式三：静态预览部署

构建：

```bash
npm run build
```

将 `dist/` 部署到静态站点或内部测试服务器。

适合需要更稳定 Demo 链接的场景。

## 9. 常用命令

| 命令 | 说明 |
|---|---|
| `npm install` | 安装依赖 |
| `npm run dev` | 启动开发服务 |
| `npm run build` | 构建生产产物 |
| `npm run preview` | 本地预览生产构建 |
| `npm run lint` | 运行 ESLint 检查 |

## 10. 项目结构简要说明

```text
src/
  App.tsx                         路由入口
  pages/
    Demo.tsx                      Demo 引导页
    Home.tsx                      首页地图
    Analysis.tsx                  GIS 分析结果页
    VesselDetail.tsx              船舶详情和轨迹回放
    Login.tsx                     登录占位页
    Register.tsx                  注册占位页
  components/
    Layout/Navbar.tsx             顶部导航
    Map/Map.tsx                   首页主地图
    Map/AnalysisLayers.tsx        GIS GeoJSON 图层渲染
    Map/Tools/                    测距、测面、交通流、气象工具
    Overlay/                      搜索栏、工具栏、状态栏
  data/
    mockVessels.ts                mock 船舶和轨迹数据
    mockGisAnalysis.ts            mock GIS GeoJSON 分析结果
  services/
    vesselService.ts              船舶数据 service 层
  store/
    useAppStore.ts                Zustand 全局状态
  types/
    index.ts                      类型定义
```

## 11. 后续可扩展方向

建议后续优先级：

1. 接入真实 GIS 输出 GeoJSON。
2. 支持上传或选择分析结果文件。
3. 分析页支持时间范围、船型、区域筛选。
4. 接入 Supabase 或后端 API。
5. 增加报告生成和导出。
6. 增加用户登录、账号权限和客户隔离。
7. 增加预测推演页面和算法服务。
