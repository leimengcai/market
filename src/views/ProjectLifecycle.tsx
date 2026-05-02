import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, SearchCode, History, AlertTriangle, ArrowRight, Flag } from 'lucide-react';

const mockProjects = [
  { value: "M001", label: "云港新能源装置 EPC 项目 [XX-2026-012]" },
  { value: "M002", label: "南京化工园 PTA 装置升级 [XX-2026-011]" },
  { value: "M003", label: "宁东能源化工基地 220kV 变电站 [XX-2026-010]" },
  { value: "M004", label: "惠州炼化乙烯三期 [XX-2026-009]" },
  { value: "M005", label: "内蒙古某园区基础设施 [XX-2026-008]" },
  { value: "M006", label: "印尼镍铁冶炼一期 [XX-2026-007]" },
];

const mockDataMap: Record<string, any> = {
  "M001": {
    baseInfo: {
      code: "XX-2026-012",
      owner: "云港石化",
      amount: "18,800 万",
      industryRegion: "新能源 / 华东",
      level: "A",
      status: "跟踪中",
      customerRel: "关系分 68 (客户画像)",
    },
    lifecycle: [
      { stage: "Stage 1 · 市场信息", title: "M001 云港新能源装置 EPC 项目", date: "创建：2026-02-10 · 评审：通过", active: true },
      { stage: "Stage 2 · 项目分级", title: "L001 XMFJ-2026-0012", date: "2026-04-12 · 韩雨 · 国际知名客户首次进入，叠加战略特征提档至 A 级", active: true },
      { stage: "Stage 3 · 投标前复盘", title: "PR001 TBQFP-2026-0024", date: "综合分 80 · 预测成功率 42% · 结论 继续跟踪", active: true },
      { stage: "Stage 4 · 资格预审", title: "Q001 ZG-2026-001", date: "2026-04-08 · 陈鹏 · 通过", active: true },
      { stage: "Stage 5 · 招标文件评审", title: "D001 ZBPS-2026-018", date: "2026-04-15 · 风险 中 · 通过", active: true },
      { stage: "Stage 6 · 保证金支付", title: "BD001 BZJ-2026-018", date: "188 万 · 保函 · 已支付", active: true },
      { stage: "Stage 7 · 投标立项 + 标书评审", title: "BP001 TBLX-2026-024", date: "截止 2026-05-20 · 标书 评审中 · 状态 标书编制中", active: true },
      { stage: "Stage 8 · 投标结果", title: "— 该阶段暂无记录 —", empty: true },
      { stage: "Stage 9 · 投标后复盘", title: "— 该阶段暂无记录 —", empty: true },
      { stage: "Stage 10 · 保证金退回", title: "— 该阶段暂无记录 —", empty: true },
    ],
    actions: [],
    competitors: ["中石化炼化工程", "东华工程"]
  },
  "M002": {
    baseInfo: {
      code: "XX-2026-011",
      owner: "扬子石化",
      amount: "12,860 万",
      industryRegion: "化工 / 华东",
      level: "A",
      status: "已投标",
      customerRel: "关系分 78 (客户画像)",
    },
    lifecycle: [
      { stage: "Stage 1 · 市场信息", title: "M002 南京化工园 PTA 装置升级", date: "创建：2025-09-10 · 评审：通过", active: true },
      { stage: "Stage 2 · 项目分级", title: "L002 XMFJ-2026-0011", date: "2025-09-15 · 韩雨 · 合同额 1.28 亿，符合 A 级标准", active: true },
      { stage: "Stage 3 · 投标前复盘", title: "— 该阶段暂无记录 —", empty: true },
      { stage: "Stage 4 · 资格预审", title: "— 该阶段暂无记录 —", empty: true },
      { stage: "Stage 5 · 招标文件评审", title: "D002 ZBPS-2026-017", date: "2026-03-08 · 风险 低 · 通过", active: true },
      { stage: "Stage 6 · 保证金支付", title: "BD002 BZJ-2026-017", date: "128.6 万 · 电汇 · 已支付", active: true },
      { stage: "Stage 7 · 投标立项 + 标书评审", title: "BP002 TBLX-2026-023", date: "截止 2026-04-12 · 标书 通过 · 状态 已投标", active: true },
      { stage: "Stage 8 · 投标结果", title: "BR001 TBJG-2026-018", date: "开标 2026-04-15 · 报价 12,860 · 中标价 11,920 · 排名 2 · 未中标", active: true, failed: true },
      { stage: "Stage 9 · 投标后复盘", title: "PO001 TBHFP-2026-0018", date: "2026-04-29 · 陈鹏 · 质量 85 · 已审批", active: true },
      { stage: "Stage 10 · 保证金退回", title: "BT001 BZJTH-2026-008", date: "2026-05-15 · 已退回", active: true },
    ],
    actions: [
      { code: "GJCS-001", title: "启动备选设备分包方接洽", user: "王峰", deadline: "2026-05-08", progress: 80, status: "进行中" },
      { code: "GJCS-002", title: "报价策略二次评审", user: "孙财", deadline: "2026-05-10", progress: 60, status: "进行中" },
      { code: "GJCS-004", title: "关键人长期维护计划", user: "陈鹏", deadline: "2026-06-01", progress: 40, status: "进行中" }
    ],
    competitors: ["中石化炼化", "东华工程", "我方", "中冶赛迪", "五环科技"]
  },
  "M003": {
    baseInfo: {
      code: "XX-2026-010",
      owner: "宁夏宝丰能源",
      amount: "9,800 万",
      industryRegion: "能源 / 西北",
      level: "B",
      status: "已中标",
      customerRel: "关系分 82 (客户画像)",
    },
    lifecycle: [
      { stage: "Stage 1 · 市场信息", title: "M003 宁东能源化工基地 220kV 变电站", date: "创建：2025-12-05 · 评审：通过", active: true },
      { stage: "Stage 2 · 项目分级", title: "L003 XMFJ-2026-0010", date: "2025-12-08 · 韩雨 · 合同额 9800 万，符合 B 级标准", active: true },
      { stage: "Stage 3 · 投标前复盘", title: "PR005 TBQFP-2026-0018", date: "综合分 85 · 预测成功率 72% · 结论 继续跟踪", active: true },
      { stage: "Stage 4 · 资格预审", title: "— 该阶段暂无记录 —", empty: true },
      { stage: "Stage 5 · 招标文件评审", title: "D003 ZBPS-2026-016", date: "2025-12-15 · 风险 低 · 通过", active: true },
      { stage: "Stage 6 · 保证金支付", title: "BD003 BZJ-2026-016", date: "98 万 · 保函 · 已支付", active: true },
      { stage: "Stage 7 · 投标立项 + 标书评审", title: "BP003 TBLX-2026-022", date: "截止 2026-01-20 · 标书 通过 · 状态 已中标", active: true },
      { stage: "Stage 8 · 投标结果", title: "BR002 TBJG-2026-017", date: "开标 2026-02-08 · 报价 9,800 · 中标价 9,800 · 排名 1 · 中标", active: true },
      { stage: "Stage 9 · 投标后复盘", title: "PO002 TBHFP-2026-0017", date: "2026-03-05 · 刘东 · 质量 88 · 已审批", active: true },
      { stage: "Stage 10 · 保证金退回", title: "— 该阶段暂无记录 —", empty: true },
    ],
    actions: [
      { code: "GJCS-003", title: "成功案例编入案例库", user: "韩雨", deadline: "2026-05-15", progress: 100, status: "已完成" }
    ],
    competitors: []
  }
};

export function ProjectLifecycle() {
  const [selectedProjectId, setSelectedProjectId] = useState<string>("M002");
  
  const data = selectedProjectId ? mockDataMap[selectedProjectId] : null;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            项目全景查询
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 ml-2 font-normal text-xs">关联查询</Badge>
          </h2>
          <p className="text-slate-500 mt-1">从市场信息→分级→复盘→立项→结果→后复盘→改进措施 全链路追踪</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-4 flex items-center gap-3">
          <span className="text-sm text-slate-500">选择项目：</span>
          <select 
            className="flex-1 max-w-sm h-9 rounded-md border border-slate-200 bg-white px-3 py-1 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
          >
            <option value="">(请选择)</option>
            {mockProjects.map(p => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
          <span className="text-xs text-slate-400 ml-auto flex items-center gap-1">
            <SearchCode className="h-4 w-4" />
            全景视图自动跨 10 张表关联检索数据
          </span>
        </CardContent>
      </Card>

      {data ? (
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-lg flex justify-between items-center">
                <span>📊 项目全景：{mockProjects.find(p => p.value === selectedProjectId)?.label?.split(' [')[0]}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-5">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-8 text-sm">
                <div>
                  <div className="text-slate-500 mb-1">项目编号</div>
                  <div className="font-semibold text-slate-900">{data.baseInfo.code}</div>
                </div>
                <div>
                  <div className="text-slate-500 mb-1">业主</div>
                  <div className="font-semibold text-blue-600 flex items-center gap-1 cursor-pointer hover:underline">
                     关联单位 · {data.baseInfo.owner}
                  </div>
                </div>
                <div>
                  <div className="text-slate-500 mb-1">合同额</div>
                  <div className="font-semibold text-slate-900">{data.baseInfo.amount}</div>
                </div>
                <div>
                  <div className="text-slate-500 mb-1">行业 / 区域</div>
                  <div className="font-semibold text-slate-900">{data.baseInfo.industryRegion}</div>
                </div>
                <div>
                  <div className="text-slate-500 mb-1">项目等级</div>
                  <div>
                    <Badge variant="outline" className={
                      data.baseInfo.level === 'A' ? 'bg-red-50 text-red-700 border-red-200' : 
                      data.baseInfo.level === 'B' ? 'bg-amber-50 text-amber-700 border-amber-200' : 
                      'bg-blue-50 text-blue-700 border-blue-200'
                    }>{data.baseInfo.level} 级</Badge>
                  </div>
                </div>
                <div>
                  <div className="text-slate-500 mb-1">跟踪状态</div>
                  <div>
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">{data.baseInfo.status}</Badge>
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="text-slate-500 mb-1">客户画像</div>
                  <div className="font-semibold text-blue-600 flex items-center gap-1 cursor-pointer hover:underline">
                    客户画像 · {data.baseInfo.customerRel}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* 时间线 */}
            <Card>
              <CardHeader className="pb-3 border-b border-slate-100">
                <CardTitle className="text-base">📅 项目生命周期（时间线）</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="relative pl-8 border-l-2 border-amber-500 border-dashed space-y-6">
                  {data.lifecycle.map((stage: any, index: number) => (
                    <div key={index} className="relative">
                      {/* Timeline dot */}
                      <div className={`absolute -left-[39px] w-4 h-4 rounded-full border-2 border-white ${stage.empty ? 'bg-slate-300' : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]'}`}></div>
                      
                      <div className="text-xs font-semibold text-amber-600 uppercase tracking-widest mb-1">
                         {stage.stage}
                      </div>
                      
                      <div className={`p-4 rounded-lg border ${stage.empty ? 'border-slate-200 bg-slate-50' : 'border-amber-200 bg-amber-50/30'}`}>
                         {stage.empty ? (
                           <div className="text-slate-400 text-sm italic">— 该阶段暂无记录 —</div>
                         ) : (
                           <div>
                              <div className="flex justify-between items-center mb-2">
                                 <span className="font-bold text-amber-900">{stage.title}</span>
                                 <button className="text-xs px-2 py-1 bg-white border border-slate-200 rounded text-slate-600 hover:bg-slate-50 transition-colors">详情</button>
                              </div>
                              <div className="text-xs text-slate-600">
                                {stage.date.split('·').map((part: string, idx: number) => (
                                  <React.Fragment key={idx}>
                                    {idx > 0 && <span className="mx-1.5 text-slate-300">·</span>}
                                    <span dangerouslySetInnerHTML={{ __html: part.includes('中标') && !part.includes('未中标') ? part.replace('中标', '<span class="text-green-600 font-bold">中标</span>') : part.includes('未中标') ? part.replace('未中标', '<span class="text-rose-600 font-bold">未中标</span>') : part }} />
                                  </React.Fragment>
                                ))}
                              </div>
                           </div>
                         )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 改进措施与竞争对手 */}
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-3 border-b border-slate-100">
                  <CardTitle className="text-base flex items-center justify-between">
                     <span>🛠 改进措施清单 ({data.actions.length})</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  {data.actions.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <thead className="text-slate-500 border-b border-slate-200">
                          <tr>
                            <th className="pb-2 font-medium">编号 / 措施</th>
                            <th className="pb-2 font-medium">责任人 / 截止</th>
                            <th className="pb-2 font-medium w-24">进度</th>
                            <th className="pb-2 font-medium">状态</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {data.actions.map((act: any, idx: number) => (
                            <tr key={idx}>
                              <td className="py-3">
                                <div className="text-xs text-slate-400">{act.code}</div>
                                <div className="font-semibold text-slate-800">{act.title}</div>
                              </td>
                              <td className="py-3">
                                <div>{act.user}</div>
                                <div className="text-xs text-slate-500">{act.deadline}</div>
                              </td>
                              <td className="py-3 pr-4">
                                <div className="h-3.5 w-full bg-slate-100 rounded-full relative overflow-hidden flex items-center">
                                  <div className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-amber-300 to-amber-500 transition-all" style={{ width: `${act.progress}%` }}></div>
                                  <div className="relative z-10 w-full text-center text-[10px] font-bold text-slate-800 mix-blend-difference">{act.progress}%</div>
                                </div>
                              </td>
                              <td className="py-3">
                                <Badge variant="outline" className={act.status === '已完成' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'}>
                                  {act.status}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-slate-400 text-sm italic py-4">— 该项目暂无改进措施 —</div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3 border-b border-slate-100">
                  <CardTitle className="text-base">⚔ 主要竞争对手</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  {data.competitors && data.competitors.length > 0 ? (
                     <div className="flex flex-wrap gap-2">
                       {data.competitors.map((comp: string, idx: number) => (
                         <Badge key={idx} variant="outline" className="bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer text-sm py-1 px-3">
                           {comp}
                         </Badge>
                       ))}
                     </div>
                  ) : (
                    <div className="text-slate-400 text-sm italic">— 暂无对手信息 —</div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <Card>
          <CardContent className="p-16 flex flex-col items-center justify-center text-slate-400">
            <History className="h-12 w-12 text-slate-200 mb-4" />
            <p>请选择一个项目以查看其全生命周期记录</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
