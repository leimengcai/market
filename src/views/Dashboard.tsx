import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { ArrowUpRight, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';

const levelData = [
  { name: 'A级项目', value: 24, percent: '18%' },
  { name: 'B级项目', value: 58, percent: '44%' },
  { name: 'C级项目', value: 49, percent: '38%' },
];

const lossData = [
  { name: '价格劣势', value: 45 },
  { name: '技术方案弱', value: 25 },
  { name: '商务条款', value: 20 },
  { name: '其他', value: 10 },
];
const COLORS = ['#ef4444', '#f59e0b', '#3b82f6', '#94a3b8'];

export function Dashboard() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">领导驾驶舱</h2>
          <p className="text-slate-500 mt-1">市场开发与投标管理全景数据（2026年度）</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">累计目标达成额</CardTitle>
            <TrendingUp className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">¥ 45.2 亿</div>
            <p className="text-xs text-slate-500 mt-1 flex items-center">
              <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
              同比去年增长 <span className="text-green-500 font-medium ml-1">12.5%</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">综合中标率</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">18.5%</div>
            <p className="text-xs text-slate-500 mt-1 flex items-center">
              <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
              较新机制前提升 <span className="text-green-500 font-medium ml-1">9.3%</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">投标后复盘率</CardTitle>
            <TrendingUp className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">96.5%</div>
            <p className="text-xs text-slate-500 mt-1 flex items-center">
              <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
              A/B级项目复盘率 <span className="text-green-500 font-medium ml-1">100%</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">逾期未复盘预警</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">3 个</div>
            <p className="text-xs text-slate-500 mt-1">
              由工程二处跟踪的C级项目
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Project Levels */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">在跟项目层级分布 (转化漏斗前)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={levelData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={80} tick={{fill: '#64748b', fontSize: 13}} />
                  <RechartsTooltip cursor={{fill: '#f1f5f9'}} />
                  <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Chart 2: Loss Reasons */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">AI分析结论：未中标核心原因解析</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={lossData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    labelLine={false}
                  >
                    {lossData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
