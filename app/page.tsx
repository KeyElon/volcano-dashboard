import Dashboard from '@/components/Dashboard'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">🌋 火山数据分析</h1>
          <p className="text-slate-300 text-lg">客户数据可视化仪表盘</p>
        </header>
        <Dashboard />
      </div>
    </main>
  )
}
