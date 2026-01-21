'use client'

import { useState, useEffect } from 'react'
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

interface Data {
  customers: {
    total: number
    individual: number
    enterprise: number
  }
  businessTypes: {
    '代理合作伙伴': number
    '代售合作伙伴': number
  }
  staffStats: Array<{ name: string; count: number }>
  paidCustomers: Array<{ name: string; staff: string; amount: number }>
}

const COLORS = ['#8b5cf6', '#06b6d4', '#f59e0b', '#10b981']

export default function Dashboard() {
  const [data, setData] = useState<Data | null>(null)

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  if (!data) {
    return (
      <div className="text-center text-white text-xl">加载中...</div>
    )
  }

  const customerTypeData = [
    { name: '个人', value: data.customers.individual, percentage: ((data.customers.individual / data.customers.total) * 100).toFixed(1) },
    { name: '企业', value: data.customers.enterprise, percentage: ((data.customers.enterprise / data.customers.total) * 100).toFixed(1) }
  ]

  const businessTypeData = [
    { name: '代理合作伙伴', value: data.businessTypes['代理合作伙伴'], percentage: ((data.businessTypes['代理合作伙伴'] / data.customers.total) * 100).toFixed(1) },
    { name: '代售合作伙伴', value: data.businessTypes['代售合作伙伴'], percentage: ((data.businessTypes['代售合作伙伴'] / data.customers.total) * 100).toFixed(1) }
  ]

  return (
    <div className="space-y-8">
      {/* 概览卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <h3 className="text-slate-300 text-sm mb-2">总客户数</h3>
          <p className="text-4xl font-bold text-white">{data.customers.total}</p>
          <p className="text-slate-400 text-sm mt-2">全部来自官网平台</p>
        </div>
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <h3 className="text-slate-300 text-sm mb-2">本月有消费</h3>
          <p className="text-4xl font-bold text-emerald-400">{data.paidCustomers.length}</p>
          <p className="text-slate-400 text-sm mt-2">消费活跃度 {((data.paidCustomers.length / data.customers.total) * 100).toFixed(1)}%</p>
        </div>
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <h3 className="text-slate-300 text-sm mb-2">企业客户</h3>
          <p className="text-4xl font-bold text-cyan-400">{data.customers.enterprise}</p>
          <p className="text-slate-400 text-sm mt-2">占比 {((data.customers.enterprise / data.customers.total) * 100).toFixed(1)}%</p>
        </div>
      </div>

      {/* 图表区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 客户类型分布 */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <h2 className="text-xl font-semibold text-white mb-6">👤 客户类型分布</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={customerTypeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {customerTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: 'none', borderRadius: '8px' }}
                formatter={(value: number) => [`${value} 人`, '数量']}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-8 mt-4">
            {customerTypeData.map((item, index) => (
              <div key={item.name} className="text-center">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-slate-300">{item.name}</span>
                </div>
                <p className="text-white font-semibold">{item.percentage}%</p>
              </div>
            ))}
          </div>
        </div>

        {/* 业务类型分布 */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <h2 className="text-xl font-semibold text-white mb-6">💼 业务类型分布</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={businessTypeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {businessTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: 'none', borderRadius: '8px' }}
                formatter={(value: number) => [`${value} 人`, '数量']}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-8 mt-4">
            {businessTypeData.map((item, index) => (
              <div key={item.name} className="text-center">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[(index + 2) % COLORS.length] }} />
                  <span className="text-slate-300">{item.name}</span>
                </div>
                <p className="text-white font-semibold">{item.percentage}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 员工绩效 */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <h2 className="text-xl font-semibold text-white mb-6">👥 员工客户数统计</h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data.staffStats}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: 'none', borderRadius: '8px' }}
              formatter={(value: number) => [`${value} 个客户`, '客户数']}
            />
            <Bar dataKey="count" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 本月消费客户 */}
      {data.paidCustomers.length > 0 && (
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <h2 className="text-xl font-semibold text-white mb-6">💳 本月有消费的客户</h2>
          <div className="space-y-3">
            {data.paidCustomers.map((customer, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors"
              >
                <div>
                  <p className="text-white font-medium">{customer.name}</p>
                  <p className="text-slate-400 text-sm">负责员工: {customer.staff}</p>
                </div>
                <div className="text-right">
                  <p className="text-emerald-400 font-semibold">¥{customer.amount.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 企业客户列表 */}
      {data.customers.enterprise > 0 && (
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <h2 className="text-xl font-semibold text-white mb-6">🏢 企业客户 ({data.customers.enterprise} 家)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-white/5 rounded-lg p-3 text-slate-300">郑州市管城回族区抖推信息咨询服务部</div>
            <div className="bg-white/5 rounded-lg p-3 text-slate-300">北京挹江科技有限公司</div>
            <div className="bg-white/5 rounded-lg p-3 text-slate-300">广州橘猫电子科技有限公司</div>
            <div className="bg-white/5 rounded-lg p-3 text-slate-300">河南三两友网络科技有限公司</div>
            <div className="bg-white/5 rounded-lg p-3 text-slate-300">阳泉市云筑饰家电子科技有限公司</div>
            <div className="bg-white/5 rounded-lg p-3 text-slate-300">湖南鹊桥数字科技有限公司</div>
            <div className="bg-white/5 rounded-lg p-3 text-slate-300">绍兴市俊豪网络科技有限公司</div>
            <div className="bg-white/5 rounded-lg p-3 text-slate-300">杭州则见科技合伙企业（有限合伙）</div>
          </div>
        </div>
      )}
    </div>
  )
}
