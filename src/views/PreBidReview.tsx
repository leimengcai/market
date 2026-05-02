import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Save, CheckCircle, AlertTriangle, ArrowRight, ShieldAlert, Target, Activity, BrainCircuit, RefreshCw } from 'lucide-react';

export function PreBidReview() {
  const [analyzing, setAnalyzing] = useState(false);
  const [aiScore, setAiScore] = useState<number | null>(null);
  const [reviewResult, setReviewResult] = useState<string>('继续跟踪');

  const runAiAnalysis = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setAiScore(76);
    }, 1500);
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">苏南智造谷二期基础设施建设工程</h2>
            <Badge variant="destructive">A级项目</Badge>
            <Badge variant="outline" className="text-blue-700 border-blue-200 bg-blue-50">必须复盘</Badge>
          </div>
          <p className="text-slate-500 mt-1">项目编号：XM-2026-0511 | 预计金额：8500万 (提档A级) | 当前阶段：投标前决策</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline"><Save className="h-4 w-4 mr-2" /> 保存草稿</Button>
          <Button className="bg-blue-600 hover:bg-blue-700"><CheckCircle className="h-4 w-4 mr-2" /> 提交复盘结论</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - AI Analysis & Information Change */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-t-4 border-t-amber-500 bg-gradient-to-b from-amber-50/50 to-white">
            <CardHeader className="pb-3 border-b border-amber-100/50">
              <CardTitle className="text-base flex items-center text-amber-900">
                <BrainCircuit className="h-4 w-4 mr-2 text-amber-500" />
                智能预估与风险评分
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              {aiScore === null ? (
                <div className="text-center py-4">
                  <Button onClick={runAiAnalysis} disabled={analyzing} className="bg-amber-100 text-amber-700 hover:bg-amber-200 w-full mb-2">
                    {analyzing ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <BrainCircuit className="h-4 w-4 mr-2" />}
                    {analyzing ? '分析中...' : '生成智能投标准备度评估'}
                  </Button>
                  <p className="text-xs text-slate-400">基于跟踪记录、对手画像与我方历史数据</p>
                </div>
              ) : (
                <div className="animate-in fade-in zoom-in duration-300">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-medium text-slate-700">预计成功率</span>
                    <span className="text-3xl font-bold text-amber-600">{aiScore}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-4">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: `${aiScore}%` }}></div>
                  </div>
                  
                  <div className="space-y-2 mt-4 pt-4 border-t border-amber-100">
                    <h5 className="text-xs font-bold text-slate-700 uppercase">系统检出高风险项</h5>
                    <div className="flex items-start gap-2 text-sm text-rose-600 bg-rose-50 p-2 rounded-md">
                      <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                      <div>关键决策人偏好倾向不明确，缺乏高层对接记录。</div>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-amber-700 bg-amber-50 p-2 rounded-md">
                      <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                      <div>预计竞争对手包含【中建八局】，其历史平均下浮率低于我方目前核算底线。</div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-base flex items-center"><RefreshCw className="h-4 w-4 mr-2 text-slate-400"/>跟踪期信息变化核对</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
               <div>
                  <div className="text-xs text-slate-500 mb-1 flex items-center justify-between">业主开发单位 <Badge variant="outline" className="text-[10px] h-5 bg-green-50 text-green-700 border-green-200">无变化</Badge></div>
                  <div className="font-medium text-slate-900 text-sm">苏南智造谷投资发展有限公司</div>
               </div>
               <div>
                  <div className="text-xs text-slate-500 mb-1 flex items-center justify-between">项目等级 <Badge variant="outline" className="text-[10px] h-5 bg-amber-50 text-amber-700 border-amber-200">有调整</Badge></div>
                  <div className="flex items-center text-sm font-medium">
                    <span className="text-slate-400 line-through mr-2">B级</span> <ArrowRight className="h-3 w-3 mr-2 text-slate-400" /> <span className="text-red-600">A级</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">原因：战略特征叠加（首次进入新行业/客户长期合作）</div>
               </div>
               <div>
                  <div className="text-xs text-slate-500 mb-1 flex items-center justify-between">关键联系人 <Badge variant="outline" className="text-[10px] h-5 bg-amber-50 text-amber-700 border-amber-200">有变化</Badge></div>
                  <div className="text-sm">
                    <div className="line-through text-slate-400">张明 (工程部经理)</div>
                    <div className="font-medium text-slate-900 text-sm mt-0.5 min-h-[3.5rem] bg-slate-50 p-1.5 rounded-md border border-slate-100">
                      李总 (新任分管副总，原张明调离)<br/>
                      <span className="text-xs text-amber-600 font-normal">需重新建立高层对接通道</span>
                    </div>
                  </div>
               </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Content - Six Looks & Decision */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="border-t-4 border-t-blue-600">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">投标前决策复盘（六看）</CardTitle>
              <p className="text-sm text-slate-500">评估是否具备投标立项条件，发现短板并制定策略调整方案。</p>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="customer" className="mt-4">
                <TabsList className="mb-4 flex flex-wrap h-auto bg-slate-50 p-1">
                  <TabsTrigger value="process" className="flex-1 min-w-[100px]">1. 看过程</TabsTrigger>
                  <TabsTrigger value="decision" className="flex-1 min-w-[100px]">2. 看资源</TabsTrigger>
                  <TabsTrigger value="competitor" className="flex-1 min-w-[100px]">3. 看对手</TabsTrigger>
                  <TabsTrigger value="customer" className="flex-1 min-w-[100px] text-slate-700 bg-blue-100 hover:bg-blue-200">4. 看客户 (当前)</TabsTrigger>
                  <TabsTrigger value="partner" className="flex-1 min-w-[100px]">5. 合作方</TabsTrigger>
                  <TabsTrigger value="self" className="flex-1 min-w-[100px]">6. 看自己</TabsTrigger>
                </TabsList>
                
                <TabsContent value="customer" className="space-y-5">
                  <div className="bg-blue-50 rounded-lg p-3 mb-2 border border-blue-100 text-sm text-blue-800 flex items-start gap-2">
                    <Target className="h-5 w-5 shrink-0 text-blue-600" />
                    <div>
                      <span className="font-bold">分析重点：</span> 业主方真实决策链是否已经摸清？关键人对我方认可度如何？客户目前最关心的痛点（工期、质量、价格、资金）是什么？
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-900 block">业主决策链与关键人研判</label>
                    <Textarea 
                      placeholder="描述当前对决策链的掌握程度..." 
                      defaultValue="投资方李总享有最终否决权并关注工期；招标代理相对公正；暂未邀请李总进行专项考察，缺乏上层强力背书。" 
                      className="h-20"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-900 block">客户核心痛点挖掘</label>
                      <Input placeholder="" defaultValue="项目属于市属重点保交差工程，工期是绝对红线。"/>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-900 block">我方公关覆盖程度评估</label>
                      <select className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                        <option>中等 - 基层对接通畅，高层暂缺</option>
                        <option>良好 - 全面覆盖</option>
                        <option>较差 - 仅通过公开渠道对接</option>
                      </select>
                    </div>
                  </div>
                </TabsContent>

                {/* Other standard tabs omitted for brevity, showing process as placeholder */}
                <TabsContent value="process"><div className="p-8 text-center text-slate-500 border border-dashed border-slate-200 rounded-lg">请补充“看过程”相关跟踪及时性分析...</div></TabsContent>
                <TabsContent value="decision"><div className="p-8 text-center text-slate-500 border border-dashed border-slate-200 rounded-lg">请补充内部资源配置评估...</div></TabsContent>
                <TabsContent value="competitor"><div className="p-8 text-center text-slate-500 border border-dashed border-slate-200 rounded-lg">请链接竞争对手情报库，规划报价博弈方案...</div></TabsContent>
                <TabsContent value="partner"><div className="p-8 text-center text-slate-500 border border-dashed border-slate-200 rounded-lg">如果有联合体模式，请分析合作方情况...</div></TabsContent>
                <TabsContent value="self"><div className="p-8 text-center text-slate-500 border border-dashed border-slate-200 rounded-lg">请补充我方资质、业绩、商务等比较优势和弱点评估...</div></TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50">
              <CardTitle className="text-lg flex items-center">
                <Activity className="h-5 w-5 mr-2 text-blue-600"/> 
                复盘结论与策略调整
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-5 space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3">
                   <label className="text-sm font-semibold text-slate-900 block mb-3">定性结论 (复盘结果)</label>
                   <div className="flex flex-col gap-2">
                     <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${reviewResult === '继续跟踪' ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500' : 'border-slate-200 bg-white hover:bg-slate-50'}`}>
                        <input type="radio" name="result" className="hidden" checked={reviewResult === '继续跟踪'} onChange={() => setReviewResult('继续跟踪')} />
                        <div className={`w-4 h-4 rounded-full border mr-3 flex items-center justify-center ${reviewResult === '继续跟踪' ? 'border-blue-500' : 'border-slate-300'}`}>
                           {reviewResult === '继续跟踪' && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 text-sm">推进投标立项</p>
                          <p className="text-xs text-slate-500 mt-0.5">具备核心条件，进入下阶段</p>
                        </div>
                     </label>
                     <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${reviewResult === '暂缓' ? 'bg-amber-50 border-amber-500 ring-1 ring-amber-500' : 'border-slate-200 bg-white hover:bg-slate-50'}`}>
                        <input type="radio" name="result" className="hidden" checked={reviewResult === '暂缓'} onChange={() => setReviewResult('暂缓')} />
                        <div className={`w-4 h-4 rounded-full border mr-3 flex items-center justify-center ${reviewResult === '暂缓' ? 'border-amber-500' : 'border-slate-300'}`}>
                           {reviewResult === '暂缓' && <div className="w-2 h-2 rounded-full bg-amber-500"></div>}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 text-sm">暂缓且继续跟踪</p>
                          <p className="text-xs text-slate-500 mt-0.5">条件未成熟，需补充攻关</p>
                        </div>
                     </label>
                     <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${reviewResult === '放弃' ? 'bg-slate-100 border-slate-400 ring-1 ring-slate-400' : 'border-slate-200 bg-white hover:bg-slate-50'}`}>
                        <input type="radio" name="result" className="hidden" checked={reviewResult === '放弃'} onChange={() => setReviewResult('放弃')} />
                        <div className={`w-4 h-4 rounded-full border mr-3 flex items-center justify-center ${reviewResult === '放弃' ? 'border-slate-400' : 'border-slate-300'}`}>
                           {reviewResult === '放弃' && <div className="w-2 h-2 rounded-full bg-slate-500"></div>}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 text-sm">主动放弃跟踪</p>
                          <p className="text-xs text-slate-500 mt-0.5">风险过高或无竞争优势</p>
                        </div>
                     </label>
                   </div>
                </div>
                
                <div className="w-full md:w-2/3 space-y-4">
                   <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-900 block">高层介入资源需求申请</label>
                      <Textarea 
                        placeholder="如需公司领导配合对接，请写明需求和计划安排..." 
                        defaultValue="申请公司张总本周四前往拜访业主新任分管副总李总，以提升高层互信级别。"
                        className="h-16"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-900 block flex justify-between">
                        <span>标前短板改进措施下达 (A级/B级必须闭环)</span>
                        <span className="text-xs text-rose-500 font-normal">必须项</span>
                      </label>
                      <div className="group flex items-start gap-2 bg-slate-50 p-2 border border-slate-200 rounded-md">
                        <Input defaultValue="周三前完成关于工期保障方案的可视化模拟BIM策划，作为述标亮点" className="flex-1 bg-white" />
                        <Input defaultValue="技术部赵工" className="w-32 bg-white" placeholder="责任人" />
                        <Button variant="ghost" size="icon" className="shrink-0 text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity">×</Button>
                      </div>
                      <Button variant="outline" size="sm" className="w-full text-blue-600 border-blue-200 hover:bg-blue-50 mt-1">+ 新增改进任务</Button>
                   </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
