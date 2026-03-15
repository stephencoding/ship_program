-- 创建用户表
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'professional', 'enterprise', 'admin')),
    profile_data JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- 创建船舶表
CREATE TABLE vessels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mmsi VARCHAR(9) UNIQUE NOT NULL,
    imo VARCHAR(7),
    name VARCHAR(255) NOT NULL,
    call_sign VARCHAR(10),
    vessel_type VARCHAR(50),
    length INTEGER,
    width INTEGER,
    flag_country VARCHAR(3),
    static_info JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_vessels_mmsi ON vessels(mmsi);
CREATE INDEX idx_vessels_name ON vessels(name);
CREATE INDEX idx_vessels_type ON vessels(vessel_type);

-- 创建轨迹点表
CREATE TABLE trajectory_points (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vessel_id UUID NOT NULL REFERENCES vessels(id),
    latitude DECIMAL(10,7) NOT NULL,
    longitude DECIMAL(10,7) NOT NULL,
    course DECIMAL(5,1),
    speed DECIMAL(5,1),
    heading DECIMAL(5,1),
    status VARCHAR(20),
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_trajectory_vessel_time ON trajectory_points(vessel_id, timestamp DESC);
-- 注意：PostGIS 函数 ST_MakePoint 需要 PostGIS 扩展，如果不可用则注释掉或使用普通索引
-- CREATE INDEX idx_trajectory_location ON trajectory_points USING GIST (
--     ST_MakePoint(longitude, latitude)
-- );
CREATE INDEX idx_trajectory_timestamp ON trajectory_points(timestamp DESC);

-- 创建分析报告表
CREATE TABLE analysis_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    report_type VARCHAR(50) NOT NULL,
    parameters JSONB NOT NULL,
    results JSONB,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
    generated_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_reports_user ON analysis_reports(user_id);
CREATE INDEX idx_reports_type ON analysis_reports(report_type);
CREATE INDEX idx_reports_status ON analysis_reports(status);
CREATE INDEX idx_reports_created ON analysis_reports(created_at DESC);

-- 创建关注船舶表
CREATE TABLE favorite_vessels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    vessel_id UUID NOT NULL REFERENCES vessels(id),
    group_name VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建自定义标记表
CREATE TABLE custom_markers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    name VARCHAR(100) NOT NULL,
    latitude DECIMAL(10,7) NOT NULL,
    longitude DECIMAL(10,7) NOT NULL,
    marker_type VARCHAR(50),
    properties JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 启用 RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorite_vessels ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_markers ENABLE ROW LEVEL SECURITY;
ALTER TABLE analysis_reports ENABLE ROW LEVEL SECURITY;

-- 权限配置
-- 授予匿名用户基础读取权限
GRANT SELECT ON vessels TO anon;
GRANT SELECT ON trajectory_points TO anon;

-- 授予认证用户完整权限
GRANT ALL PRIVILEGES ON users TO authenticated;
GRANT ALL PRIVILEGES ON vessels TO authenticated;
GRANT ALL PRIVILEGES ON trajectory_points TO authenticated;
GRANT ALL PRIVILEGES ON favorite_vessels TO authenticated;
GRANT ALL PRIVILEGES ON custom_markers TO authenticated;
GRANT ALL PRIVILEGES ON analysis_reports TO authenticated;

-- RLS 策略
-- 用户只能查看和修改自己的数据
CREATE POLICY users_own_data ON users FOR ALL USING (auth.uid() = id);
CREATE POLICY favorites_own_data ON favorite_vessels FOR ALL USING (auth.uid() = user_id);
CREATE POLICY markers_own_data ON custom_markers FOR ALL USING (auth.uid() = user_id);
CREATE POLICY reports_own_data ON analysis_reports FOR ALL USING (auth.uid() = user_id);
