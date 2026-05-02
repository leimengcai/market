import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';

const trackingProjects = [
  { id: 'XM-2026-0402', name: '南京江北新区新材料产业园一期总包', amount: '2.5亿', level: 'A级', reason: '金额>1亿', leader: '市场部/海外事业部', status: '跟进中 (每周汇报)' },
  { id: 'XM-2026-0511', name: '苏南智造谷二期基础设施建设工程', amount: '8500万', level: 'A级', reason: '提档：长期合作客户', leader: '市场部牵头', status: '投标策划中' },
  { id: 'XM-2026-0524', name: '杭州湾科创中心实验室机电安装', amount: '4500万', level: 'B级', reason: '金额3000万-1亿', leader: '华东分公司', status: '前期对接' },
  { id: 'XM-2026-0601', name: '合肥市某科技园研发楼内部改造', amount: '1200万', level: 'C级', reason: '金额<3000万', leader: '安徽分公司', status: '备案监督' },
];

const getStatusDisplay = (status: string) => {
  let colorClass = 'text-slate-700 bg-slate-100';
  let dotClass = 'bg-slate-500';
  
  if (status.includes('跟进中')) {
    colorClass = 'text-blue-700 bg-blue-50 border border-blue-100';
    dotClass = 'bg-blue-600';
  } else if (status.includes('策划中')) {
    colorClass = 'text-amber-700 bg-amber-50 border border-amber-100';
    dotClass = 'bg-amber-500';
  } else if (status.includes('对接')) {
    colorClass = 'text-indigo-700 bg-indigo-50 border border-indigo-100';
    dotClass = 'bg-indigo-500';
  } else if (status.includes('备案')) {
    colorClass = 'text-slate-600 bg-slate-50 border border-slate-200';
    dotClass = 'bg-slate-400';
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${colorClass}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dotClass}`}></span>
      {status}
    </span>
  );
};

export function ProjectLevel() {
  const [filterLevel, setFilterLevel] = useState('全部');

  const filteredProjects = trackingProjects.filter((proj) => 
    filterLevel === '全部' ? true : proj.level === filterLevel
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">项目分级管理</h2>
          <p className="text-slate-500 mt-1">落实“抓大不放小”，对A/B/C级项目进行动态定级与资源分配。</p>
        </div>
        <Button>+ 录入新项目</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="flex items-center gap-4 p-4 border-b border-slate-100 bg-slate-50 rounded-t-xl">
            <div className="relative max-w-sm flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input className="pl-9" placeholder="搜索项目名称或编号..." />
            </div>
            
            <select 
              value={filterLevel} 
              onChange={(e) => setFilterLevel(e.target.value)}
              className="flex h-10 w-[180px] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <option value="全部">全部定级</option>
              <option value="A级">A级项目</option>
              <option value="B级">B级项目</option>
              <option value="C级">C级项目</option>
            </select>

            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              筛选条件
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-white border-b border-slate-100 text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-medium">项目编号 / 名称</th>
                  <th className="px-6 py-4 font-medium">预计金额</th>
                  <th className="px-6 py-4 font-medium">当前定级</th>
                  <th className="px-6 py-4 font-medium">定级依据</th>
                  <th className="px-6 py-4 font-medium">牵头单位</th>
                  <th className="px-6 py-4 font-medium">状 态</th>
                  <th className="px-6 py-4 font-medium text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredProjects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{proj.name}</div>
                      <div className="text-xs text-slate-500 mt-1">{proj.id}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{proj.amount}</td>
                    <td className="px-6 py-4">
                      <Badge variant={proj.level === 'A级' ? 'destructive' : proj.level === 'B级' ? 'warning' : 'secondary'}>
                        {proj.level}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{proj.reason}</td>
                    <td className="px-6 py-4 text-slate-600">{proj.leader}</td>
                    <td className="px-6 py-4">
                      {getStatusDisplay(proj.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm" className="text-blue-600">调整定级 <ArrowRight className="h-3 w-3 ml-1"/></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
