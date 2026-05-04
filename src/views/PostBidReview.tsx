import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Sparkles, Save, CheckCircle, FileText, UploadCloud, Users, Target, Activity, ShieldAlert, Check, Plus, Search, X } from 'lucide-react';

export function PostBidReview() {
  const [analyzing, setAnalyzing] = useState(false);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const projectList = [
    "南京江北新区新材料产业园总包项目",
    "云港新能源装置 EPC 项目",
    "惠州炼化乙烯三期",
    "印尼镍铁冶炼一期",
    "内蒙古某园区基础设施",
    "宁东能源化工基地 220kV 变电站"
  ];

  const extractInsight = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setAiInsight("AI智能分析完成：根据上传的开标记录和对手报价，当前区域主要竞争对手【中建八局】采取了激进报价策略（下浮率约14.5%）。我方商务标得分较高，但总价高出均值4%。建议后续针对此类业主，在分包资源整合上进一步压降成本。");
    }, 1500);
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-6xl mx-auto">
      {/* 顶部搜索与新增区域 */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="搜索投标项目名称或编号..." className="pl-9 bg-slate-50 border-slate-200" />
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto" onClick={() => setIsAddModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          新增复盘
        </Button>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">南京江北新区新材料产业园总包项目</h2>
            <Badge variant="destructive">A级项目</Badge>
            <Badge variant="secondary" className="bg-red-100 text-red-700">未中标</Badge>
          </div>
          <p className="text-slate-500 mt-1">项目编号：XM-2026-0402 | 牵头单位：公司市场部</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline"><Save className="h-4 w-4 mr-2" /> 保存草稿</Button>
          <Button><CheckCircle className="h-4 w-4 mr-2" /> 提交复盘审批</Button>
        </div>
      </div>

      {aiInsight && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-4">
          <div className="bg-blue-100 p-2 rounded-lg text-blue-600 mt-0.5">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-blue-900 mb-1">AI 知识沉淀建议</h4>
            <p className="text-sm text-blue-800 leading-relaxed">{aiInsight}</p>
            <div className="mt-3 flex gap-2">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs h-7"><Check className="h-3 w-3 mr-1"/> 采纳并编入对手情报库</Button>
              <Button size="sm" variant="outline" className="text-blue-700 border-blue-300 hover:bg-blue-100 text-xs h-7">忽略</Button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Process Timeline & Data */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-base flex items-center"><Activity className="h-4 w-4 flex-shrink-0 mr-2 text-slate-400"/>基础打底信息</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div>
                <div className="text-xs text-slate-500 mb-1">预计合同额 vs 实际中标价</div>
                <div className="font-semibold text-slate-900">2.5亿 / 2.38亿</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 mb-1">我方报价 / 排名</div>
                <div className="font-semibold text-red-600">2.48亿 (第3名)</div>
              </div>
              <div className="pt-2 border-t border-slate-100">
                <Button size="sm" variant="secondary" className="w-full justify-between" onClick={extractInsight}>
                  <span className="flex items-center"><FileText className="h-3.5 w-3.5 mr-2"/>开标记录单</span>
                  {analyzing ? <span className="animate-pulse text-blue-600 text-xs">分析中...</span> : <span className="text-blue-600 text-xs">AI提取</span>}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-base flex items-center"><Target className="h-4 w-4 mr-2 text-slate-400"/>参与人员协同</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">公司分管领导</span>
                  <span className="font-medium text-slate-900">张总</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">跟踪负责人</span>
                  <span className="font-medium text-slate-900">李雷 (市场部)</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">商务/技术标负责</span>
                  <span className="font-medium text-slate-900">王海 / 赵工</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Content - Six Looks (六看) */}
        <div className="lg:col-span-3">
          <Card className="h-full border-t-4 border-t-blue-600">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">核心复盘区（深入“六看”）</CardTitle>
              <p className="text-sm text-slate-500">实事求是，深挖根因。每项必填，总结至少一条可落地的改进措施。</p>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="look1" className="mt-4">
                <TabsList className="mb-4 flex flex-wrap h-auto bg-slate-50 p-1">
                  <TabsTrigger value="look1" className="flex-1 min-w-[100px]">1. 看过程</TabsTrigger>
                  <TabsTrigger value="look2" className="flex-1 min-w-[100px]">2. 看决策</TabsTrigger>
                  <TabsTrigger value="look3" className="flex-1 min-w-[100px]">3. 看对手</TabsTrigger>
                  <TabsTrigger value="look4" className="flex-1 min-w-[100px] text-slate-700 bg-blue-100 hover:bg-blue-200">4. 看客户 (当前)</TabsTrigger>
                  <TabsTrigger value="look5" className="flex-1 min-w-[100px]">5. 合作方</TabsTrigger>
                  <TabsTrigger value="look6" className="flex-1 min-w-[100px]">6. 看自己</TabsTrigger>
                </TabsList>
                
                <TabsContent value="look4" className="space-y-4">
                  <div className="bg-slate-50 rounded-lg p-4 mb-4 border border-slate-100 text-sm text-slate-600">
                    <span className="font-semibold text-slate-800">指引：</span> 分析业主决策链、关键人偏好、真实需求、对我方及对手的评价。是否有信息盲区？
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-900 block">业主决策链与关键人分析</label>
                    <Textarea placeholder="描述对接过程中的业主态度，关键人诉求..." defaultValue="前期对接较好，但中后期由于设计变更，业主对工期提出了更苛刻要求。关键人更倾向于有相似化工园区施工经验且能垫资的单位。" className="h-24"/>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-900 block">客户对我方评价</label>
                      <Input placeholder="例如：技术方案认可，但认为财务略保守" defaultValue="技术可信赖，但报价偏高"/>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-900 block">需求匹配度反思</label>
                      <Input placeholder="" defaultValue="未能完全匹配业主低成本快速交付的核心诉求"/>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="look3">
                  <div className="py-12 text-center text-slate-500">
                     对手分析卡片（演示占位）
                  </div>
                </TabsContent>
                <TabsContent value="look1"><div className="p-4 text-center text-slate-500">请选择并填写其他标签卡...</div></TabsContent>
                <TabsContent value="look2"><div className="p-4 text-center text-slate-500">请选择并填写其他标签卡...</div></TabsContent>
                <TabsContent value="look5"><div className="p-4 text-center text-slate-500">请选择并填写其他标签卡...</div></TabsContent>
                <TabsContent value="look6"><div className="p-4 text-center text-slate-500">请选择并填写其他标签卡...</div></TabsContent>
              </Tabs>

              <div className="mt-8 border-t border-slate-200 pt-6 space-y-4">
                <h4 className="font-bold text-slate-900 flex items-center"><ShieldAlert className="h-5 w-5 mr-2 text-rose-500"/> 改进措施清单 (强制闭环)</h4>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
                  <div className="md:col-span-8">
                     <Input placeholder="具体改进措施内容..." defaultValue="针对化工园区类总包，提前锁定优质分包商，将分包让利空间纳入主标书测算。"/>
                  </div>
                  <div className="md:col-span-2">
                    <Input placeholder="责任人" defaultValue="王海" />
                  </div>
                  <div className="md:col-span-2">
                    <Button variant="outline" className="w-full">增加一条</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md flex flex-col animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">新增投标后复盘</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <label className="text-sm font-medium text-slate-700">选择要复盘的投标项目</label>
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                {projectList.map((item, idx) => (
                  <div key={idx} className="p-3 border border-slate-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 cursor-pointer transition-colors" onClick={() => setIsAddModalOpen(false)}>
                    <div className="font-medium text-slate-900 text-sm">{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
