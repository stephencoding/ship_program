import React from 'react';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  return (
    <div className="flex h-full items-center justify-center bg-slate-100 p-6">
      <section className="w-full max-w-md rounded bg-white p-6 shadow-sm">
        <h1 className="text-xl font-bold text-primary">注册</h1>
        <p className="mt-2 text-sm text-gray-500">用户注册和权限体系暂未接入，当前为占位页面。</p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm text-gray-600">邮箱</label>
            <input
              className="w-full rounded border border-gray-200 px-3 py-2 text-sm outline-none focus:border-secondary"
              disabled
              placeholder="user@example.com"
              type="email"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-600">用户类型</label>
            <select
              className="w-full rounded border border-gray-200 px-3 py-2 text-sm outline-none focus:border-secondary"
              disabled
            >
              <option>普通用户</option>
              <option>专业用户</option>
              <option>企业用户</option>
            </select>
          </div>
          <button className="w-full rounded bg-secondary px-4 py-2 text-sm text-white opacity-60" disabled>
            注册功能开发中
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm">
          <Link className="text-secondary hover:underline" to="/">
            返回首页
          </Link>
          <Link className="text-secondary hover:underline" to="/auth/login">
            去登录
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Register;
