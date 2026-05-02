import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Filter, ChevronDown } from 'lucide-react';

const COLORS = ['#3b82f6', '#f59e0b', '#10b981', '#6366f1', '#ec4899', '#8b5cf6', '#0ea5e9'];

// 1. 月度汇总趋势数据
const monthlyTrendData = [
  { month: '1月', market: 120, bid: 85, win: 15 },
  { month: '2月', market: 90, bid: 60, win: 10 },
  { month: '3月', market: 150, bid: 110, win: 22 },
  { month: '4月', market: 130, bid: 95, win: 18 },
  { month: '5月', market: 110, bid: 80, win: 14 }
];

// 2. 维度数据 (虚拟数据)
const dimensionData = {
  level: [
    { name: 'A级', value: 24 },
    { name: 'B级', value: 58 },
    { name: 'C级', value: 125 }
  ],
  profession: [
    { name: '化工能源', value: 45 },
    { name: '市政及道桥', value: 35 },
    { name: '房建工程', value: 25 },
    { name: '机电安装', value: 18 },
    { name: '其他', value: 10 }
  ],
  bidType: [
    { name: '正常公开投标', value: 120 },
    { name: '邀请招标', value: 45 },
    { name: '直接发包', value: 28 },
    { name: '竞争性谈判', value: 14 }
  ],
  coopMode: [
    { name: '纯自营', value: 140 },
    { name: '分包合作', value: 42 },
    { name: '联合体(我方牵头)', value: 15 },
    { name: '联合体(他方牵头)', value: 10 }
  ],
  units: [
    { name: '市场部/海外事业部', value: 35 },
    { name: '工程一处', value: 40 },
    { name: '工程二处', value: 35 },
    { name: '华东区域公司', value: 25 },
    { name: '华南区域公司', value: 18 },
    { name: '项目管理公司', value: 12 }
  ]
};

export function AnalysisReports() {
  const [activeDimension, setActiveDimension] = useState<keyof typeof dimensionData>('level');

  const dimensionTitles: Record<string, string> = {
    level: '按项目等级分布',
    profession: '按专业及业务板块分布',
    bidType: '按获取信息/投标类型分布',
    coopMode: '按自营与合作模式分布',
    units: '按跟踪开发单位分布'
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">全维度运营分析表</h2>
          <p className="text-slate-500 mt-1">综合市场信息、招投标与中标数据进行多维度切片分析。</p>
        </div>
        <div className="flex bg-white border border-slate-200 rounded-md p-1 shadow-sm">
          <button className="px-3 py-1.5 text-sm font-medium bg-slate-100 text-slate-900 rounded-sm">2026年度</button>
          <button className="px-3 py-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 rounded-sm">2025年度</button>
        </div>
      </div>

      {/* 第一部分：月度总览分析 */}
      <Card>
        <CardHeader className="pb-2 border-b border-slate-100">
          <CardTitle className="text-lg">全量业务月度趋势汇总</CardTitle>
          <CardDescription>对比各月新增市场信息数、实际投标数与成功中标数</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyTrendData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}} 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="market" name="市场登记信息" fill="#94a3b8" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar dataKey="bid" name="实际参与投标" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar dataKey="win" name="成功中标立项" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* 第二部分：多维切片交叉分析 */}
      <Card>
         <CardHeader className="pb-0 border-b border-slate-100 bg-slate-50/50">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-4">
              <div>
                <CardTitle className="text-lg">多维度数据透视与占比</CardTitle>
                <CardDescription className="mt-1">基于上述总量的拆解分析</CardDescription>
              </div>
              <div className="mt-3 md:mt-0 flex items-center gap-2">
                 <Filter className="h-4 w-4 text-slate-400" />
                 <span className="text-sm font-medium text-slate-600">切换分析维度：</span>
                 <select 
                    value={activeDimension}
                    onChange={(e) => setActiveDimension(e.target.value as any)}
                    className="h-9 rounded-md border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-blue-700 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                 >
                    <option value="level">项目确立等级 (A/B/C)</option>
                    <option value="profession">主营业务及专业分类</option>
                    <option value="bidType">获取信息与发包类型</option>
                    <option value="coopMode">自营与合作履约模式</option>
                    <option value="units">主责开发单位归属</option>
                 </select>
              </div>
            </div>
         </CardHeader>
         <CardContent className="pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="h-[300px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={dimensionData[activeDimension]}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={110}
                        paddingAngle={2}
                        dataKey="value"
                        labelLine={false}
                        label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                      >
                        {dimensionData[activeDimension].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', padding: '8px 12px' }} 
                        itemStyle={{ fontSize: '13px' }}
                      />
                    </PieChart>
                 </ResponsiveContainer>
              </div>
              <div>
                 <h4 className="text-base font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">{dimensionTitles[activeDimension]}明细</h4>
                 <div className="space-y-4">
                    {dimensionData[activeDimension].map((item, idx) => (
                       <div key={idx}>
                          <div className="flex justify-between text-sm mb-1.5">
                            <span className="font-medium text-slate-700 flex items-center">
                              <span className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                              {item.name}
                            </span>
                            <span className="font-bold text-slate-900">{item.value} <span className="text-slate-400 font-normal text-xs">项</span></span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div 
                               className="h-full rounded-full" 
                               style={{ 
                                  width: `${(item.value / dimensionData[activeDimension].reduce((acc, curr) => acc + curr.value, 0)) * 100}%`,
                                  backgroundColor: COLORS[idx % COLORS.length]
                               }}>
                            </div>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
            </div>
         </CardContent>
      </Card>
    </div>
  );
}
