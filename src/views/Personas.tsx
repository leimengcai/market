import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Building2, Activity, Users, Handshake, BrainCircuit, 
  Search, Target, TrendingUp, AlertTriangle, ShieldAlert,
  ArrowUpRight, BarChart, CheckCircle2, Clock, XCircle
} from 'lucide-react';

export function Personas() {
  const [activeTab, setActiveTab] = useState('customer');

  // Placeholder data for Customer Persona
  const customerData = {
    name: "中国建筑一局（集团）有限公司",
    industry: "建筑施工/总承包",
    location: "全国",
    strategicLevel: "战略合作客户",
    isNewTrack: false,
    decisionNodes: ["集团集采", "分公司总经理审批", "区域总承接"],
    competitorFeedback: "倾向于低报价",
    loyaltyHistory: [
      { project: "深圳湾超级总部", rating: "满意", sensitivity: "中等" },
      { project: "北京CBD核心区", rating: "极好", sensitivity: "低" }
    ]
  };

  // Placeholder data for Project Health Persona
  const projectHealthData = {
    name: "云港新能源装置 EPC 项目",
    baseValueLevel: "A", 
    contractValue: "1.85亿",
    strategicValueLevel: "S",
    trackingFrequency: "偏低 (连续2周未更新)",
    timelineWarning: "首次接触后48小时内未完成录入",
    status: "观察状态", // 连续3个月无实质性进展
    risks: ["业主资信风险(待确认)", "对手A资金优势显著"]
  };

  // Placeholder data for Competitor Persona
  const competitorData = {
    name: "某建工集团",
    strengths: ["本地化资源丰富", "报价通常低于基准线5%"],
    tactics: ["倾向于低价入围", "重点跟进华东区域A级项目"],
    winRate: "我方胜率 45%",
    lossReasons: "报价劣势、联合体力较弱",
    gapAnalysis: "需要提升属地化服务保障承诺"
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">市场开发多维画像</h2>
          <p className="text-slate-500 mt-1">数据中心 · 多维画像</p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <BrainCircuit className="h-4 w-4 mr-2" />
            AI 画像分析引擎
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 w-full h-auto p-1 bg-slate-100 rounded-xl">
          <TabsTrigger value="customer" className="py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg flex flex-col items-center gap-1.5 transition-all">
            <Building2 className="h-4 w-4 text-emerald-600" />
            <span className="text-xs sm:text-sm font-medium">业主画像</span>
          </TabsTrigger>
          <TabsTrigger value="project" className="py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg flex flex-col items-center gap-1.5 transition-all">
            <Activity className="h-4 w-4 text-blue-600" />
            <span className="text-xs sm:text-sm font-medium">项目健康度</span>
          </TabsTrigger>
          <TabsTrigger value="competitor" className="py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg flex flex-col items-center gap-1.5 transition-all">
            <Target className="h-4 w-4 text-rose-600" />
            <span className="text-xs sm:text-sm font-medium">对手画像</span>
          </TabsTrigger>
          <TabsTrigger value="partner" className="py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg flex flex-col items-center gap-1.5 transition-all">
            <Handshake className="h-4 w-4 text-amber-600" />
            <span className="text-xs sm:text-sm font-medium">合作方画像</span>
          </TabsTrigger>
          <TabsTrigger value="team" className="py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg flex flex-col items-center gap-1.5 transition-all">
            <Users className="h-4 w-4 text-indigo-600" />
            <span className="text-xs sm:text-sm font-medium">组织智商</span>
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          {/* Customer Persona */}
          <TabsContent value="customer" className="space-y-4 m-0 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex bg-white p-4 rounded-xl border border-slate-200 shadow-sm gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input placeholder="搜索业主单位名称..." className="pl-9 bg-slate-50 border-slate-200" />
              </div>
              <Button variant="outline">搜索</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 space-y-6">
                <Card className="border-emerald-100 shadow-sm bg-gradient-to-b from-emerald-50/50 to-white">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                       <Building2 className="h-5 w-5 text-emerald-600" />
                       基础身份标签
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-xs text-slate-500 mb-1">单位名称</div>
                      <div className="font-bold text-slate-900">{customerData.name}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                         <div className="text-xs text-slate-500 mb-1">所属行业</div>
                         <div className="text-sm font-medium text-slate-700">{customerData.industry}</div>
                      </div>
                      <div>
                         <div className="text-xs text-slate-500 mb-1">项目地点</div>
                         <div className="text-sm font-medium text-slate-700">{customerData.location}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                       <TrendingUp className="h-5 w-5 text-indigo-600" />
                       战略分级标签
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">世界 500 强客户</Badge>
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">{customerData.strategicLevel}</Badge>
                      {customerData.isNewTrack && (
                        <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200">首次进入的新赛道</Badge>
                      )}
                    </div>
                    <div className="text-xs text-slate-500 mt-2">
                      系统自动打标：识别新赛道溢价及区域布局重要项目。
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="md:col-span-2 space-y-6">
                <Card className="shadow-sm">
                  <CardHeader className="pb-3 border-b border-slate-100">
                    <CardTitle className="text-base font-bold flex items-center gap-2">
                       决策偏好画像
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-slate-700">
                        <ArrowUpRight className="h-4 w-4 text-slate-400" /> 结构化决策链条
                      </h4>
                      <div className="flex items-center gap-2">
                        {customerData.decisionNodes.map((node, idx) => (
                           <React.Fragment key={idx}>
                             <div className="px-3 py-1.5 bg-slate-100 rounded-md text-sm font-medium text-slate-700 border border-slate-200">{node}</div>
                             {idx < customerData.decisionNodes.length - 1 && <span className="text-slate-400">→</span>}
                           </React.Fragment>
                        ))}
                      </div>
                    </div>
                    <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                      <div className="text-xs font-semibold text-amber-800 mb-1">对竞争对手的评价与需求倾向</div>
                      <div className="text-sm text-amber-900">{customerData.competitorFeedback}，对技术方案创新度要求较高（大于对工期的敏感度）。</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-sm">
                  <CardHeader className="pb-3 border-b border-slate-100">
                    <CardTitle className="text-base font-bold flex items-center gap-2">
                       合作忠诚度轨迹
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <table className="w-full text-sm text-left">
                      <thead className="text-slate-500 border-b border-slate-100">
                        <tr>
                          <th className="pb-2 font-medium">历史项目</th>
                          <th className="pb-2 font-medium text-center">业务评价</th>
                          <th className="pb-2 font-medium text-center">报价敏感度</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {customerData.loyaltyHistory.map((item, idx) => (
                          <tr key={idx}>
                            <td className="py-3 font-medium text-slate-800">{item.project}</td>
                            <td className="py-3 text-center">
                              <Badge variant="outline" className={`${item.rating === '极好' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>{item.rating}</Badge>
                            </td>
                            <td className="py-3 text-center text-slate-600">{item.sensitivity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Project Health Persona */}
          <TabsContent value="project" className="space-y-4 m-0 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-blue-100 shadow-sm">
                <CardHeader className="pb-3 bg-gradient-to-r from-blue-50/50 to-white">
                  <CardTitle className="text-lg flex items-center gap-2">
                     价值等级特征
                  </CardTitle>
                  <CardDescription>基础定级与战略提级算法</CardDescription>
                </CardHeader>
                <CardContent className="p-5 space-y-6">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                      <div className="text-xs text-slate-500 mb-1">预计合同额</div>
                      <div className="text-xl font-mono font-bold text-slate-800">{projectHealthData.contractValue}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">基础定级</div>
                      <div className="text-xl font-bold text-indigo-600">级 {projectHealthData.baseValueLevel}</div>
                    </div>
                    <div className="text-slate-300">→</div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1 flex items-center gap-1">战略提级 <SparklesIcon className="w-3 h-3 text-amber-500" /></div>
                      <div className="text-xl font-bold flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white shadow-md shadow-indigo-200 text-center">
                        S
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-slate-600 p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                    <span className="font-semibold text-blue-800">AI 逻辑权重：</span>系统检测到该项目包含"战略性新赛道"标签，自动执行<span className="font-bold">提级逻辑</span>，确保核心圈资源倾斜配置。
                  </div>
                </CardContent>
              </Card>

              <Card className="border-amber-100 shadow-sm">
                <CardHeader className="pb-3 bg-gradient-to-r from-amber-50/50 to-white">
                  <CardTitle className="text-lg flex items-center gap-2 text-amber-900">
                     <Clock className="h-5 w-5 text-amber-600" /> 执行力监控预警
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 space-y-4">
                   <div className="p-3 bg-rose-50 border border-rose-100 rounded-lg flex items-start gap-3">
                     <AlertTriangle className="h-5 w-5 text-rose-500 mt-0.5" />
                     <div>
                       <div className="font-semibold text-rose-800 text-sm">频次偏差告警</div>
                       <div className="text-sm text-rose-700 mt-1">{projectHealthData.trackingFrequency}。按规则，A/B级项目需达每周1次更新。</div>
                     </div>
                   </div>
                   <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg flex items-start gap-3">
                     <ShieldAlert className="h-5 w-5 text-amber-500 mt-0.5" />
                     <div>
                       <div className="font-semibold text-amber-800 text-sm">时效预警</div>
                       <div className="text-sm text-amber-700 mt-1">{projectHealthData.timelineWarning}。</div>
                     </div>
                   </div>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2 shadow-sm border-slate-200">
                <CardHeader className="pb-0">
                  <CardTitle className="text-base flex items-center justify-between">
                    生命周期动态预测
                    <Badge variant="outline" className="bg-slate-100 text-slate-500">{projectHealthData.status}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <h5 className="text-sm font-medium text-slate-700 flex items-center gap-2"><Activity className="w-4 h-4 text-emerald-500" /> 系统观察结论 (AI)</h5>
                       <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-sm text-slate-600 leading-relaxed min-h-[80px]">
                         预测性预警触发：<br/>
                         系统检测到本项目<strong className="text-rose-600 mx-1">连续 3 个月</strong>无实质性阶段推进记录，已自动触发“降为观察状态”的逻辑信号。建议停止非必要资源投入或发起重新评估。
                       </div>
                    </div>
                    <div className="space-y-2">
                       <h5 className="text-sm font-medium text-slate-700 flex items-center gap-2"><ShieldAlert className="w-4 h-4 text-rose-500" /> 实时风险标签</h5>
                       <div className="flex flex-col gap-2">
                         {projectHealthData.risks.map((risk, idx) => (
                           <div key={idx} className="flex items-center gap-2 bg-rose-50 px-3 py-2 rounded-md border border-rose-100 text-sm text-rose-800">
                             <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                             {risk}
                           </div>
                         ))}
                       </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Competitor Persona */}
          <TabsContent value="competitor" className="space-y-4 m-0 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Card className="shadow-sm">
                <CardHeader className="border-b border-slate-100 pb-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-xl text-rose-900 flex items-center gap-2">
                                <Target className="w-5 h-5 text-rose-600"/> 竞争对手知己知彼画像
                            </CardTitle>
                            <CardDescription className="mt-1">行为模式与胜率分析预测</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                           <Input placeholder="输入竞争对手名称..." className="w-64" defaultValue="某建工集团"/>
                           <Button variant="outline">分析</Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                   <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
                       <div className="p-6 space-y-6">
                           <div>
                               <div className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">核心竞争力模型</div>
                               <ul className="space-y-2">
                                  {competitorData.strengths.map((str, idx) => (
                                     <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" /> {str}
                                     </li>
                                  ))}
                               </ul>
                           </div>
                           <div>
                               <div className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">战术行为预测 (AI)</div>
                               <ul className="space-y-2">
                                  {competitorData.tactics.map((tac, idx) => (
                                     <li key={idx} className="text-sm text-slate-600 flex items-start gap-2 bg-slate-50 p-2 rounded-md">
                                        <BrainCircuit className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" /> {tac}
                                     </li>
                                  ))}
                               </ul>
                           </div>
                       </div>
                       <div className="p-6 col-span-2 bg-slate-50/50">
                          <div className="flex flex-col h-full">
                              <div className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">胜率对比矩阵</div>
                              <div className="flex-1 grid grid-cols-2 gap-4">
                                 <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-center items-center">
                                    <div className="text-sm text-slate-500 mb-2">对战同类项目我方胜率</div>
                                    <div className="text-3xl font-bold font-mono text-emerald-600">45%</div>
                                    <div className="text-xs text-slate-400 mt-2">基于最近 20 次交手记录</div>
                                 </div>
                                 <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 space-y-3">
                                    <div className="text-sm text-slate-700 font-medium border-l-2 border-rose-500 pl-2">败因聚类 (AI分析)</div>
                                    <div className="text-sm text-slate-600">{competitorData.lossReasons}</div>
                                    <div className="text-sm text-slate-700 font-medium border-l-2 border-indigo-500 pl-2 mt-4">针对性弥补点</div>
                                    <div className="text-sm text-slate-600">{competitorData.gapAnalysis}</div>
                                 </div>
                              </div>
                          </div>
                       </div>
                   </div>
                </CardContent>
            </Card>
          </TabsContent>

          {/* Partner Persona */}
          <TabsContent value="partner" className="space-y-4 m-0 animate-in fade-in slide-in-from-bottom-2 duration-300">
             <Card className="shadow-sm">
                <CardHeader className="pb-3 border-b border-slate-100 bg-gradient-to-r from-amber-50/50 to-white">
                  <CardTitle className="text-lg flex items-center gap-2">
                     合作方（居间人）诚信与效能画像
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                   <div className="flex justify-between items-center mb-6">
                      <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input placeholder="搜索合作方..." className="pl-9 bg-white" defaultValue="张某某 (中介)" />
                      </div>
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-sm py-1">平台白名单推荐级别：高</Badge>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
                       {[
                         {label: "可靠性", score: 85},
                         {label: "忠诚度", score: 70},
                         {label: "控盘能力", score: 92},
                         {label: "物有所值", score: 88},
                         {label: "尽心尽力", score: 80},
                       ].map((dim, idx) => (
                          <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col items-center justify-center">
                             <div className="text-2xl font-bold text-indigo-900">{dim.score}<span className="text-xs text-slate-400 font-normal ml-1">分</span></div>
                             <div className="text-sm font-medium text-slate-500 mt-1">{dim.label}</div>
                          </div>
                       ))}
                   </div>

                   <div className="bg-amber-50/50 p-5 rounded-xl border border-amber-100">
                      <h4 className="text-sm font-semibold flex items-center gap-2 text-amber-900 mb-3">
                         <BrainCircuit className="w-4 h-4 text-amber-600" /> AI 历史表现联想分析
                      </h4>
                      <p className="text-sm text-amber-800 leading-relaxed">
                        基于复盘报告“成功/失败原因分析”记录：该合作方在“江浙地带政府市政类项目”中控盘能力极强，近两年参与运作的 3 个同类项目有 2 个中标。但在涉及“大型化工装置”类项目中，由于其对技术工艺理解不足，曾有 1 次失误导致资格预审未通过。
                      </p>
                   </div>
                </CardContent>
             </Card>
          </TabsContent>

          {/* Internal Team/Process Persona */}
          <TabsContent value="team" className="space-y-4 m-0 animate-in fade-in slide-in-from-bottom-2 duration-300">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="shadow-sm">
                   <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50">
                      <CardTitle className="text-base flex items-center gap-2">团队响应能力评估</CardTitle>
                   </CardHeader>
                   <CardContent className="p-5 space-y-4">
                      <div className="space-y-3">
                         <div className="flex justify-between items-center text-sm">
                           <span className="text-slate-600">信息传递及时性</span>
                           <span className="font-bold text-slate-800">92% 达标</span>
                         </div>
                         <div className="w-full bg-slate-100 rounded-full h-2.5">
                           <div className="bg-indigo-600 h-2.5 rounded-full" style={{width: '92%'}}></div>
                         </div>
                      </div>
                      <div className="space-y-3">
                         <div className="flex justify-between items-center text-sm">
                           <span className="text-slate-600">团队配合顺畅度 (内部评价)</span>
                           <span className="font-bold text-slate-800">4.2 / 5.0</span>
                         </div>
                         <div className="w-full bg-slate-100 rounded-full h-2.5">
                           <div className="bg-emerald-500 h-2.5 rounded-full" style={{width: '84%'}}></div>
                         </div>
                      </div>
                      <div className="space-y-3">
                         <div className="flex justify-between items-center text-sm">
                           <span className="text-slate-600">资源配置合理度 (复盘反馈)</span>
                           <span className="font-bold text-rose-600">偏低，经常性缺造价人员</span>
                         </div>
                         <div className="w-full bg-slate-100 rounded-full h-2.5">
                           <div className="bg-rose-500 h-2.5 rounded-full" style={{width: '50%'}}></div>
                         </div>
                      </div>
                   </CardContent>
                </Card>

                <Card className="shadow-sm">
                   <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50">
                      <CardTitle className="text-base flex items-center gap-2">改进任务闭环率分析</CardTitle>
                   </CardHeader>
                   <CardContent className="p-5 flex flex-col justify-center">
                      <div className="flex items-center justify-around">
                          <div className="flex flex-col items-center">
                              <div className="text-4xl font-bold font-mono text-slate-800">45</div>
                              <div className="text-sm text-slate-500 mt-2">年度生成改进建议</div>
                          </div>
                          <div className="h-16 w-px bg-slate-200"></div>
                          <div className="flex flex-col items-center">
                              <div className="flex items-baseline gap-1 text-emerald-600">
                                <span className="text-4xl font-bold font-mono">68</span>
                                <span className="text-lg font-bold">%</span>
                              </div>
                              <div className="text-sm text-slate-500 mt-2">任务闭环率</div>
                          </div>
                      </div>
                      <div className="mt-6 p-3 bg-indigo-50 border border-indigo-100 rounded-lg text-sm text-indigo-800">
                          <strong className="font-semibold block mb-1">系统提示：</strong>
                          本季度有 14 项源自《项目跟踪复盘报告》的改进清单已逾期未能落实，主要集中在“技术方案模板更新”和“历史报价库标准化”方面。
                      </div>
                   </CardContent>
                </Card>
             </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

// Sparkle Icon component that I can reuse in the UI
function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
      <path d="M4 17v2" />
      <path d="M5 18H3" />
    </svg>
  );
}
