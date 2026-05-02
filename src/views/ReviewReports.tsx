import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area, ComposedChart } from 'recharts';
import { Download, FileText, AlertCircle, CheckCircle2, FileSpreadsheet, FileBarChart2, X, RefreshCw } from 'lucide-react';

const funnelData = [
  { stage: '信息跟踪 (市场)', value: 450, fill: '#94a3b8' },
  { stage: '招标文件评审', value: 310, fill: '#64748b' },
  { stage: '投标立项', value: 262, fill: '#eab308' },
  { stage: '标书评审', value: 203, fill: '#f59e0b' },
  { stage: '开标结果登记', value: 203, fill: '#3b82f6' },
  { stage: '成功中标', value: 24, fill: '#10b981' }
];

const qualityData = [
  { unit: '工程一处', total: 12, completed: 12, score: 92 },
  { unit: '工程二处', total: 15, completed: 12, score: 85 },
  { unit: '华东分公司', total: 8, completed: 8, score: 88 },
  { unit: '安徽分公司', total: 10, completed: 9, score: 81 },
  { unit: '海外事业部', total: 5, completed: 5, score: 95 },
];

export function ReviewReports() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">复盘报表与分析</h2>
          <p className="text-slate-500 mt-1">自动生成各级复盘报告，监控复盘执行质量与业务漏斗转化效率。</p>
        </div>
      </div>

      <Tabs defaultValue="auto-report" className="w-full">
        <TabsList className="bg-white border border-slate-200 w-full justify-start rounded-lg p-1 h-12 space-x-2">
          <TabsTrigger value="efficiency" className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 data-[state=active]:shadow-none text-sm h-10 px-6">
            投标效率分析仪表板
          </TabsTrigger>
          <TabsTrigger value="quality" className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 data-[state=active]:shadow-none text-sm h-10 px-6">
            复盘执行质量统计
          </TabsTrigger>
          <TabsTrigger value="auto-report" className="data-[state=active]:bg-rose-50 data-[state=active]:text-rose-700 data-[state=active]:shadow-none text-sm h-10 px-6">
            自动报表生成 (AIGC)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="efficiency" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">转化漏斗分析 (年度累计)</CardTitle>
                <CardDescription>从市场信息跟踪到最终中标的逐级流失情况</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={funnelData} layout="vertical" margin={{ top: 5, right: 30, left: 30, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                      <XAxis type="number" />
                      <YAxis dataKey="stage" type="category" width={100} tick={{fill: '#64748b', fontSize: 12}} />
                      <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{ fontSize: '12px', borderRadius: '6px' }} />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24} label={{ position: 'right', fill: '#64748b', fontSize: 12 }} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">改进措施闭环落实情况</CardTitle>
                <CardDescription>A/B级项目复盘产出的改进任务执行跟踪</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6 mt-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-medium text-slate-700">商务报价策略调整准时率</span>
                      <span className="font-bold text-green-600">85%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-medium text-slate-700">重点客户高层覆盖计划执行率</span>
                      <span className="font-bold text-amber-600">62%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: '62%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-medium text-slate-700">专家库技术方案预演覆盖率</span>
                      <span className="font-bold text-blue-600">90%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-100">
                    <div className="bg-slate-50 p-3 rounded-lg flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                      <div className="text-sm text-slate-700">
                        <span className="font-semibold block mb-1">系统提示：</span>
                        本月有 15 项改进措施逾期未处理，主要集中在"资源协调"与"分包商拓展"大类。
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="quality" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">各单位复盘考核大屏</CardTitle>
              <CardDescription>统计各二级单位的复盘完成率与平均复盘质量得分（依据新考核机制）</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                    <tr>
                      <th className="px-6 py-4 font-medium">考核单位</th>
                      <th className="px-6 py-4 font-medium">应复盘项目数</th>
                      <th className="px-6 py-4 font-medium">已复盘金额</th>
                      <th className="px-6 py-4 font-medium">复盘完成率</th>
                      <th className="px-6 py-4 font-medium">月度预警</th>
                      <th className="px-6 py-4 font-medium text-right">平均复盘评分</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {qualityData.map((unit, idx) => {
                      const rate = Math.round((unit.completed / unit.total) * 100);
                      return (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-slate-900">{unit.unit}</td>
                          <td className="px-6 py-4 text-slate-600">{unit.total}</td>
                          <td className="px-6 py-4 text-slate-600">{unit.completed}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                                <div className={`h-full ${rate === 100 ? 'bg-green-500' : 'bg-blue-500'}`} style={{ width: `${rate}%` }}></div>
                              </div>
                              <span className="text-xs font-semibold">{rate}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {unit.total > unit.completed ? (
                               <Badge variant="outline" className="text-rose-600 border-rose-200 bg-rose-50">{unit.total - unit.completed} 项逾期</Badge>
                            ) : (
                               <span className="text-slate-400 text-xs">无预警</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className={`font-bold ${unit.score >= 90 ? 'text-green-600' : 'text-slate-700'}`}>{unit.score} 分</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="auto-report" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                 <FileText className="h-24 w-24 text-blue-600"/>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-blue-800">项目跟踪复盘报告</CardTitle>
                <CardDescription className="text-xs">单项目维度的自动生成</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-slate-600 relative z-10 h-10 line-clamp-2">直接导出系统内的六看分析与改进任务明细。</p>
                <Button className="w-full bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 relative z-10">配置模板导出</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                 <FileSpreadsheet className="h-24 w-24 text-indigo-600"/>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-indigo-800">月度市场开发简报</CardTitle>
                <CardDescription className="text-xs">每月数据自动汇总聚合</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-slate-600 relative z-10 h-10 line-clamp-2">含当月重点项目进展、新增、结果及风险预警。</p>
                <Button className="w-full bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50 relative z-10"><Download className="h-4 w-4 mr-2"/> 一键导出</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                 <FileBarChart2 className="h-24 w-24 text-violet-600"/>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-violet-800">季度市场深度分析</CardTitle>
                <CardDescription className="text-xs">经营数据的中周期深度复盘</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-slate-600 relative z-10 h-10 line-clamp-2">包含季度漏斗转化、最佳案例提取、管理建议。</p>
                <Button className="w-full bg-white text-violet-600 border border-violet-200 hover:bg-violet-50 relative z-10 text-xs">导出季度报表</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

