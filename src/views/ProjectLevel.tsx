import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal, ArrowRight, Eye, Printer, X, Save } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const trackingProjects = [
  { id: 'XM-2026-0402', name: '南京江北新区新材料产业园一期总包', amount: '2.5亿', level: 'A级', reason: '金额>1亿', leader: '市场部/海外事业部', status: '跟进中 (每周汇报)', date: '2026-04-02', area: '国内' },
  { id: 'XM-2026-0511', name: '苏南智造谷二期基础设施建设工程', amount: '8500万', level: 'A级', reason: '提档：长期合作客户', leader: '市场部牵头', status: '投标策划中', date: '2026-05-11', area: '江苏' },
  { id: 'XM-2026-0524', name: '杭州湾科创中心实验室机电安装', amount: '4500万', level: 'B级', reason: '金额3000万-1亿', leader: '华东分公司', status: '前期对接', date: '2026-05-24', area: '浙江' },
  { id: 'XM-2026-0601', name: '合肥市某科技园研发楼内部改造', amount: '1200万', level: 'C级', reason: '金额<3000万', leader: '安徽分公司', status: '备案监督', date: '2026-06-01', area: '安徽' },
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
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [printOpen, setPrintOpen] = useState(false);
  const [adjustOpen, setAdjustOpen] = useState(false);
  const [selectedProj, setSelectedProj] = useState<any>(null);

  const filteredProjects = trackingProjects.filter((proj) => 
    filterLevel === '全部' ? true : proj.level === filterLevel
  );

  const openModal = (type: 'details' | 'print' | 'adjust', proj: any) => {
    setSelectedProj(proj);
    if (type === 'details') setDetailsOpen(true);
    if (type === 'print') setPrintOpen(true);
    if (type === 'adjust') setAdjustOpen(true);
  };

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
                  <th className="px-6 py-4 font-medium w-48">操作</th>
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
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-indigo-600" title="详情" onClick={() => openModal('details', proj)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-indigo-600" title="打印单据" onClick={() => openModal('print', proj)}>
                          <Printer className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-2" onClick={() => openModal('adjust', proj)}>
                          调整定级 <ArrowRight className="h-3 w-3 ml-1"/>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Details Modal */}
      {detailsOpen && selectedProj && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl flex flex-col animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                项目分级详情 <Badge className="ml-2">{selectedProj.level}</Badge>
              </h3>
              <button onClick={() => setDetailsOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
               <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                  <div>
                    <div className="text-sm font-medium text-slate-500 mb-1">项目名称</div>
                    <div className="font-semibold text-slate-900">{selectedProj.name}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-500 mb-1">项目编号</div>
                    <div className="font-mono text-slate-700">{selectedProj.id}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-500 mb-1">预计金额</div>
                    <div className="text-slate-900">{selectedProj.amount}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-500 mb-1">录入日期</div>
                    <div className="text-slate-900">{selectedProj.date}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-sm font-medium text-slate-500 mb-2">定级依据与战略特征</div>
                    <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-lg text-sm text-indigo-900">
                      该项目因 <strong className="mx-1">{selectedProj.reason}</strong> 被评定为 <strong className="text-indigo-700">{selectedProj.level}</strong>。
                      {selectedProj.level === 'A级' && " 系统建议：公司级响应，高管挂帅，每周通报进度。"}
                      {selectedProj.level === 'B级' && " 系统建议：部门级响应，核心骨干负责，定期跟进。"}
                      {selectedProj.level === 'C级' && " 系统建议：业务员常规跟进，低频监测。"}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-500 mb-1">跟踪牵头单位</div>
                    <div className="text-slate-900">{selectedProj.leader}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-500 mb-1">项目所处区域</div>
                    <div className="text-slate-900">{selectedProj.area}</div>
                  </div>
               </div>
            </div>
            <div className="p-5 border-t border-slate-100 flex justify-end gap-3 bg-slate-50 rounded-b-xl">
              <Button variant="outline" onClick={() => setDetailsOpen(false)}>关闭</Button>
              <Button onClick={() => { setDetailsOpen(false); setAdjustOpen(true); }} className="bg-indigo-600 hover:bg-indigo-700">进入调整定级</Button>
            </div>
          </div>
        </div>
      )}

      {/* Print Modal (A4 Preview) */}
      {printOpen && selectedProj && (
        <div className="fixed inset-0 z-50 flex items-center justify-center py-8 bg-slate-900/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-[794px] min-h-[1123px] bg-white shadow-2xl p-16 animate-in fade-in duration-300">
             <Button variant="secondary" size="icon" className="absolute top-4 right-4 rounded-full shadow-md print:hidden" onClick={() => setPrintOpen(false)}>
                <X className="h-5 w-5" />
             </Button>
             
             {/* A4 Content */}
             <div className="text-center border-b-[3px] border-double border-yellow-600 pb-4 mb-8">
               <div className="text-slate-600 tracking-widest text-sm mb-2">南京南化建设有限公司</div>
               <h1 className="text-3xl font-bold tracking-[0.3em] font-serif">项目分级认定书</h1>
             </div>

             <div className="mb-8">
               <h2 className="text-lg font-bold bg-amber-50 inline-block px-3 py-1 border-l-4 border-yellow-600 mb-4">一、信息概况</h2>
               <table className="w-full border-collapse text-sm">
                 <tbody>
                   <tr>
                     <td className="border border-slate-300 bg-slate-50 p-3 font-semibold w-32">项目名称</td>
                     <td className="border border-slate-300 p-3" colSpan={3}>{selectedProj.name}</td>
                   </tr>
                   <tr>
                     <td className="border border-slate-300 bg-slate-50 p-3 font-semibold">项目编号</td>
                     <td className="border border-slate-300 p-3">{selectedProj.id}</td>
                     <td className="border border-slate-300 bg-slate-50 p-3 font-semibold w-32">预计金额</td>
                     <td className="border border-slate-300 p-3">{selectedProj.amount}</td>
                   </tr>
                   <tr>
                     <td className="border border-slate-300 bg-slate-50 p-3 font-semibold">牵头单位</td>
                     <td className="border border-slate-300 p-3">{selectedProj.leader}</td>
                     <td className="border border-slate-300 bg-slate-50 p-3 font-semibold">区域</td>
                     <td className="border border-slate-300 p-3">{selectedProj.area}</td>
                   </tr>
                 </tbody>
               </table>
             </div>

             <div className="mb-12">
               <h2 className="text-lg font-bold bg-amber-50 inline-block px-3 py-1 border-l-4 border-yellow-600 mb-4">二、定级结论</h2>
               <div className="border border-slate-300 p-6 min-h-[150px]">
                 <div className="flex items-center gap-4 mb-4">
                   <span className="font-semibold text-slate-800">评定等级：</span>
                   <span className="text-2xl font-bold text-red-600 tracking-widest">【{selectedProj.level}】</span>
                 </div>
                 <div className="font-semibold text-slate-800 mb-2">定级依据：</div>
                 <p className="text-slate-700 leading-relaxed indent-8">
                   根据《市场开发项目分级管理办法》，本项目因符合“<span className="font-bold underline underline-offset-4">{selectedProj.reason}</span>”之条件，
                   现正式认定为公司 {selectedProj.level} 项目。后续有关该项目的跟踪频率、汇报要求与资源配置，均需严格遵守 {selectedProj.level} 对应的管理标准执行。
                 </p>
               </div>
             </div>

             <div className="mt-20 pt-8 border-t border-slate-300 grid grid-cols-4 gap-8 text-center text-sm font-medium text-slate-700">
               <div>认定人签字：<div className="mt-8 border-b border-slate-400 w-24 mx-auto"></div></div>
               <div>审核人签字：<div className="mt-8 border-b border-slate-400 w-24 mx-auto"></div></div>
               <div>分管审批：<div className="mt-8 border-b border-slate-400 w-24 mx-auto"></div></div>
               <div>归档确认：<div className="mt-8 border-b border-slate-400 w-24 mx-auto"></div></div>
             </div>

             <div className="absolute bottom-8 right-16 flex gap-4 print:hidden">
                <Button variant="outline" onClick={() => setPrintOpen(false)}>取消</Button>
                <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={() => window.print()}>
                  <Printer className="h-4 w-4 mr-2" /> 确认打印
                </Button>
             </div>
          </div>
        </div>
      )}

      {/* Adjust Level Modal */}
      {adjustOpen && selectedProj && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl flex flex-col animate-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">调整项目定级 <span className="text-slate-400 font-normal text-sm ml-2">({selectedProj.name})</span></h3>
              <button onClick={() => setAdjustOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <label className="text-sm font-semibold text-slate-900 block">1. 目标等级</label>
                <div className="grid grid-cols-3 gap-3">
                   <div className={`p-4 rounded-lg border-2 cursor-pointer text-center transition-all ${selectedProj.level === 'A级' ? 'border-red-500 bg-red-50 text-red-700' : 'border-slate-200 hover:border-slate-300'}`}>
                     <div className="text-xl font-bold mb-1">A级</div>
                     <div className="text-xs opacity-80">&ge; 1亿元</div>
                   </div>
                   <div className={`p-4 rounded-lg border-2 cursor-pointer text-center transition-all ${selectedProj.level === 'B级' ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-slate-200 hover:border-slate-300'}`}>
                     <div className="text-xl font-bold mb-1">B级</div>
                     <div className="text-xs opacity-80">3000万 - 1亿</div>
                   </div>
                   <div className={`p-4 rounded-lg border-2 cursor-pointer text-center transition-all ${selectedProj.level === 'C级' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 hover:border-slate-300'}`}>
                     <div className="text-xl font-bold mb-1">C级</div>
                     <div className="text-xs opacity-80">&lt; 3000万</div>
                   </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-900 block flex items-center justify-between">
                  2. 附加战略标签 (用于触发提档)
                  <span className="text-xs text-amber-600 font-normal bg-amber-50 px-2 py-0.5 rounded border border-amber-200">如果命中以下标签，可无视金额提升一档</span>
                </label>
                <div className="flex flex-wrap gap-2">
                   <Badge variant="outline" className="cursor-pointer hover:bg-slate-50 py-1.5 px-3">国际知名企业客户</Badge>
                   <Badge variant="outline" className={`cursor-pointer py-1.5 px-3 bg-indigo-50 text-indigo-700 border-indigo-200`}>长期合作客户 ✓</Badge>
                   <Badge variant="outline" className="cursor-pointer hover:bg-slate-50 py-1.5 px-3">行业领域龙头客户</Badge>
                   <Badge variant="outline" className="cursor-pointer hover:bg-slate-50 py-1.5 px-3">首次进入新行业</Badge>
                   <Badge variant="outline" className="cursor-pointer hover:bg-slate-50 py-1.5 px-3">重点发展行业</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-900 block">3. 调整原因说明</label>
                <Textarea 
                  placeholder="填写为何调整定级的详细依据..." 
                  defaultValue={selectedProj.reason}
                  className="h-24 bg-slate-50 focus:bg-white transition-colors"
                />
              </div>
            </div>

            <div className="p-5 border-t border-slate-100 flex justify-end gap-3 bg-slate-50 rounded-b-xl">
              <Button variant="outline" onClick={() => setAdjustOpen(false)}>取消</Button>
              <Button onClick={() => setAdjustOpen(false)} className="bg-indigo-600 hover:bg-indigo-700">
                <Save className="h-4 w-4 mr-2" />
                保存定级
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

