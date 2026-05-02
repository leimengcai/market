import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Database, Users, LineChart as LineChartIcon, FileText, Download, Star, X, Eye, Sparkles, RefreshCw, BookOpen, Target, TrendingUp, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const comp1Data = [
  { month: '1月', winRate: 15, discount: 12.5, bids: 4 },
  { month: '2月', winRate: 20, discount: 13.0, bids: 5 },
  { month: '3月', winRate: 18, discount: 13.5, bids: 3 },
  { month: '4月', winRate: 25, discount: 14.2, bids: 6 },
  { month: '5月', winRate: 25, discount: 14.5, bids: 5 },
];

const comp2Data = [
  { month: '1月', winRate: 50, discount: 8.5, bids: 1 },
  { month: '2月', winRate: 60, discount: 9.0, bids: 2 },
  { month: '3月', winRate: 55, discount: 9.2, bids: 1 },
  { month: '4月', winRate: 65, discount: 8.8, bids: 2 },
  { month: '5月', winRate: 60, discount: 9.0, bids: 1 },
];

function CaseRating({ initialScore, initialVotes }: { initialScore: number, initialVotes: number }) {
  const [score, setScore] = useState(initialScore);
  const [votes, setVotes] = useState(initialVotes);
  const [userVote, setUserVote] = useState(0);
  const [hover, setHover] = useState(0);

  const handleVote = (rating: number) => {
    if (userVote === rating) return;
    const newTotalSum = (score * votes) - userVote + rating;
    const newVotes = userVote === 0 ? votes + 1 : votes;
    setScore(newTotalSum / newVotes);
    setVotes(newVotes);
    setUserVote(rating);
  };

  return (
    <div className="flex items-center gap-2 mt-1.5 mb-2">
      <div className="flex items-center" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = hover ? star <= hover : star <= (userVote || Math.round(score));
          return (
            <Star
              key={star}
              className={`h-4 w-4 cursor-pointer transition-colors ${
                isFilled ? "fill-amber-400 text-amber-400" : "text-slate-300"
              }`}
              onMouseEnter={() => setHover(star)}
              onClick={(e) => {
                e.stopPropagation();
                handleVote(star);
              }}
            />
          );
        })}
      </div>
      <span className="text-xs text-slate-500 font-medium">
        {score.toFixed(1)} 分 <span className="text-slate-400 font-normal">({votes}次评价)</span>
        {userVote > 0 && <span className="text-amber-600 ml-2">感谢反馈!</span>}
      </span>
    </div>
  );
}

interface PreviewCase {
  title: string;
  date: string;
  type: 'success' | 'failure';
  tags: string[];
  content: string;
}

interface SWOTReport {
  competitor: string;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export function KnowledgeBase() {
  const [previewCase, setPreviewCase] = useState<PreviewCase | null>(null);
  const [swotReport, setSwotReport] = useState<SWOTReport | null>(null);
  const [isGeneratingSWOT, setIsGeneratingSWOT] = useState<string | null>(null);
  const [showWhitepaper, setShowWhitepaper] = useState(false);
  const [generating, setGenerating] = useState(false);

  const handleGenerateSWOT = (competitor: string) => {
    setIsGeneratingSWOT(competitor);
    setTimeout(() => {
      setIsGeneratingSWOT(null);
      if (competitor.includes("中建")) {
        setSwotReport({
          competitor,
          strengths: ["雄厚的资金实力，常提供带资进场方案。", "政府公关能力强，擅长运作大型综合项目。", "品牌认可度极高，资质序列齐全。"],
          weaknesses: ["项目管理链条长，商务审批与决策相对迟缓。", "部分项目成本控制不佳，下浮率已接近其盈亏红线。", "团队对创新型或小众技术理解不够深入。"],
          opportunities: ["华东片区基建计划放量，适合其大型总包综合模式。", "近期可能通过本地重组并购进一步扩大市占率。"],
          threats: ["地方政府债务收紧可能影响其带资项目的长期回款。", "专业化细分市场的本土竞争者在单点发力。"]
        });
      } else {
        setSwotReport({
          competitor,
          strengths: ["深耕特定专业领域（如化工），拥有明显技术壁垒。", "属地供应链资源极度丰富，成本控制力强。", "技术方案往往精耕细作，评审得分长期居高。"],
          weaknesses: ["资金垫付与抗压能力一般，难以参与超大型带资项目。", "跨区域作战能力弱，业务高度依赖本地市场资源。", "品牌影响力走出特定区域或行业后明显下降。"],
          opportunities: ["本地对应专业园区的大规模翻新扩建项目即将上马。", "环保/质监政策趋严，使得其专业高标准方案更受业主青睐。"],
          threats: ["大型央企集团持续下沉，以资金优势抢占专精市场。", "单一行业依赖度过高，易受宏观产业周期波动冲击。"]
        });
      }
    }, 1500);
  };

  const handleGenerateWhitepaper = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setShowWhitepaper(true);
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">经验沉淀与知识库</h2>
          <p className="text-slate-500 mt-1">由系统从各类复盘报告中自动提取、结构化存储的战略级业务资产。</p>
        </div>
        <Button 
          className="bg-indigo-600 hover:bg-indigo-700 transition-all font-medium"
          disabled={generating}
          onClick={handleGenerateWhitepaper}
        >
          {generating ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <BookOpen className="h-4 w-4 mr-2" />}
          {generating ? 'AI 正在研判数据...' : '生成年度市场开发白皮书'}
        </Button>
      </div>

      <Tabs defaultValue="competitors" className="w-full">
        <TabsList className="bg-white border border-slate-200 w-full justify-start rounded-lg p-1 h-14 space-x-2">
          <TabsTrigger value="competitors" className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 data-[state=active]:shadow-none text-base h-10 px-6">
            <Users className="h-4 w-4 mr-2" />
            竞争对手情报库
          </TabsTrigger>
          <TabsTrigger value="cases" className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 data-[state=active]:shadow-none text-base h-10 px-6">
            <Database className="h-4 w-4 mr-2" />
            复盘案例库
          </TabsTrigger>
        </TabsList>

        <TabsContent value="competitors" className="mt-6 space-y-4">
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input className="pl-9 bg-white" placeholder="搜索竞争对手名称..." />
            </div>
            <Button variant="outline">筛选行业标签</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Competitor Card 1 */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">中建X局集团有限公司</CardTitle>
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">极高威胁</Badge>
                </div>
                <CardDescription>交手次数：12次 | 胜率：25%</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">核心打法标签</div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="font-normal">低价抢标</Badge>
                      <Badge variant="secondary" className="font-normal">带资进场</Badge>
                      <Badge variant="secondary" className="font-normal">政府公关强</Badge>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-md text-sm text-slate-700 border border-slate-100">
                    <span className="font-semibold block mb-1">近期AI情报：</span>
                    在华东片区商业综合体项目中，下浮率常锁定在 13%-15% 区间。倾向于找本地国企组建联合体。
                  </div>
                  
                  <div className="h-44 w-full mt-2">
                    <div className="text-xs font-semibold text-slate-500 mb-2 flex items-center justify-between">
                       <span>数据趋势 (近5月)</span>
                       <div className="flex gap-2 text-[10px]">
                          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-indigo-600"></span>中标率</span>
                          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span>下浮率</span>
                          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-slate-300"></span>投标次数</span>
                       </div>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={comp1Data} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                        <YAxis yAxisId="left" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                        <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '6px' }} />
                        <Bar yAxisId="right" dataKey="bids" name="投标次数" fill="#cbd5e1" radius={[2, 2, 0, 0]} barSize={16} />
                        <Line yAxisId="left" type="monotone" dataKey="winRate" name="中标率(%)" stroke="#4f46e5" strokeWidth={2} dot={{ r: 3 }} />
                        <Line yAxisId="left" type="monotone" dataKey="discount" name="下浮率(%)" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="flex gap-2 w-full mt-2">
                    <Button variant="link" className="px-0 flex-1 justify-center h-8 text-indigo-600">
                      档案详情 <LineChartIcon className="h-4 w-4 ml-1" />
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-[2] h-8 text-indigo-700 bg-indigo-50 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300"
                      onClick={() => handleGenerateSWOT('中建X局集团有限公司')}
                      disabled={isGeneratingSWOT === '中建X局集团有限公司'}
                    >
                      {isGeneratingSWOT === '中建X局集团有限公司' ? (
                        <RefreshCw className="h-3.5 w-3.5 mr-1.5 animate-spin text-indigo-600" />
                      ) : (
                        <Sparkles className="h-3.5 w-3.5 mr-1.5 text-indigo-600" />
                      )}
                      {isGeneratingSWOT === '中建X局集团有限公司' ? '生成中...' : '生成AI分析'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Competitor Card 2 */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">上海某建设工程集团</CardTitle>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">中等威胁</Badge>
                </div>
                <CardDescription>交手次数：5次 | 胜率：60%</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">核心打法标签</div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="font-normal">深耕化工领域</Badge>
                      <Badge variant="secondary" className="font-normal">属地资源丰富</Badge>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-md text-sm text-slate-700 border border-slate-100">
                    <span className="font-semibold block mb-1">近期AI情报：</span>
                    技术标得分一向很高。价格策略相对保守，一般不做低于成本价的竞标，在资质评审环节易获得加分。
                  </div>

                  <div className="h-44 w-full mt-2">
                    <div className="text-xs font-semibold text-slate-500 mb-2 flex items-center justify-between">
                       <span>数据趋势 (近5月)</span>
                       <div className="flex gap-2 text-[10px]">
                          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-indigo-600"></span>中标率</span>
                          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span>下浮率</span>
                          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-slate-300"></span>投标次数</span>
                       </div>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={comp2Data} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                        <YAxis yAxisId="left" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                        <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '6px' }} />
                        <Bar yAxisId="right" dataKey="bids" name="投标次数" fill="#cbd5e1" radius={[2, 2, 0, 0]} barSize={16} />
                        <Line yAxisId="left" type="monotone" dataKey="winRate" name="中标率(%)" stroke="#4f46e5" strokeWidth={2} dot={{ r: 3 }} />
                        <Line yAxisId="left" type="monotone" dataKey="discount" name="下浮率(%)" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="flex gap-2 w-full mt-2">
                    <Button variant="link" className="px-0 flex-1 justify-center h-8 text-indigo-600">
                      档案详情 <LineChartIcon className="h-4 w-4 ml-1" />
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-[2] h-8 text-indigo-700 bg-indigo-50 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300"
                      onClick={() => handleGenerateSWOT('上海某建设工程集团')}
                      disabled={isGeneratingSWOT === '上海某建设工程集团'}
                    >
                      {isGeneratingSWOT === '上海某建设工程集团' ? (
                        <RefreshCw className="h-3.5 w-3.5 mr-1.5 animate-spin text-indigo-600" />
                      ) : (
                        <Sparkles className="h-3.5 w-3.5 mr-1.5 text-indigo-600" />
                      )}
                      {isGeneratingSWOT === '上海某建设工程集团' ? '生成中...' : '生成AI分析'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cases" className="mt-6">
          <Card>
            <CardContent className="p-0">
               <div className="p-4 border-b border-slate-100 bg-slate-50 rounded-t-xl flex justify-between items-center">
                  <h3 className="font-semibold text-slate-800">精选成功复盘案例汇编</h3>
                  <Button variant="outline" size="sm" className="gap-2"><Download className="h-4 w-4" /> 打包下载 PDF</Button>
               </div>
               <div className="divide-y divide-slate-100">
                  <div className="p-4 hover:bg-slate-50 transition-colors flex items-start gap-4">
                     <div className="p-3 bg-green-100 text-green-700 rounded-lg"><FileText className="h-6 w-6"/></div>
                     <div className="flex-1">
                        <div className="flex justify-between items-start">
                           <h4 className="font-bold text-slate-900 text-base">以技术创新破局：如何在该大型新材料工厂投标中实现绝地反击</h4>
                           <span className="text-sm text-slate-500">2026-03-12</span>
                        </div>
                        <CaseRating initialScore={4.8} initialVotes={35} />
                        <div className="flex flex-wrap gap-2 my-2">
                           <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">成功案例</Badge>
                           <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">新材料</Badge>
                           <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">绿色技术破局</Badge>
                        </div>
                        <p className="text-sm text-slate-600 mt-1 line-clamp-2">本项目在商务价格无优势的情况下，技术团队独创的绿色施工环保方案赢得了业主专家组的极高评价...</p>
                        <div className="mt-3">
                           <Button variant="outline" size="sm" className="h-8 gap-1 text-slate-600 hover:text-indigo-600" onClick={() => setPreviewCase({
                             title: "以技术创新破局：如何在该大型新材料工厂投标中实现绝地反击",
                             date: "2026-03-12",
                             type: "success",
                             tags: ["成功案例", "新材料", "绿色技术破局"],
                             content: "本项目在商务价格无优势的情况下，技术团队独创的绿色施工环保方案赢得了业主专家组的极高评价。项目全生命周期的碳足迹分析为业主提供了超出预期的价值，成功弥补了报价上的劣势。这启示我们，在面对高端制造业客户时，技术方案的超额价值可以有效对冲价格战风险。并且必须在前期沟通中摸清专家组对于环保技术落地的关注程度。"
                           })}>
                             <Eye className="h-3.5 w-3.5" />
                             快速预览
                           </Button>
                        </div>
                     </div>
                  </div>
                  {/* Item 2 */}
                  <div className="p-4 hover:bg-slate-50 transition-colors flex items-start gap-4">
                     <div className="p-3 bg-red-100 text-red-700 rounded-lg"><FileText className="h-6 w-6"/></div>
                     <div className="flex-1">
                        <div className="flex justify-between items-start">
                           <h4 className="font-bold text-slate-900 text-base">警钟长鸣：XXX总包项目过程跟踪失效根因分析</h4>
                           <span className="text-sm text-slate-500">2026-01-28</span>
                        </div>
                        <CaseRating initialScore={4.5} initialVotes={18} />
                        <div className="flex flex-wrap gap-2 my-2">
                           <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">失利反思</Badge>
                           <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">客户高层变动</Badge>
                           <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">信息滞后</Badge>
                        </div>
                        <p className="text-sm text-slate-600 mt-1 line-clamp-2">项目前期对接极顺，但由于忽视了业主集团上层的架构变动，导致原对接人掌握话语权变弱，我方反应迟缓...</p>
                        <div className="mt-3">
                           <Button variant="outline" size="sm" className="h-8 gap-1 text-slate-600 hover:text-indigo-600" onClick={() => setPreviewCase({
                             title: "警钟长鸣：XXX总包项目过程跟踪失效根因分析",
                             date: "2026-01-28",
                             type: "failure",
                             tags: ["失利反思", "客户高层变动", "信息滞后"],
                             content: "项目前期对接极顺，但由于忽视了业主集团上层的架构变动，导致原对接人掌握话语权变弱。我方市场人员反应迟缓，未能在更换分管领导的第一黄金期建立新的高层沟通渠道，被竞争对手利用政策盲区弯道超车。核心教训：大客户营销必须建立多层级、立体化的信息网络，绝不能依赖单一接口人。需要在客户发生人事变动时，第一时间触发应急公关预案。"
                           })}>
                             <Eye className="h-3.5 w-3.5" />
                             快速预览
                           </Button>
                        </div>
                     </div>
                  </div>
               </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Preview Modal */}
      {previewCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between p-5 border-b border-slate-100">
              <div className="pr-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-slate-500 font-medium">{previewCase.date}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 leading-tight">{previewCase.title}</h3>
              </div>
              <button 
                onClick={() => setPreviewCase(null)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-5 overflow-y-auto flex-1">
              <div className="flex flex-wrap gap-2 mb-6">
                {previewCase.tags.map((tag, i) => (
                  <Badge 
                    key={i} 
                    variant="outline" 
                    className={
                      tag === '成功案例' ? "bg-green-50 text-green-700 border-green-200" :
                      tag === '失利反思' ? "bg-red-50 text-red-700 border-red-200" :
                      "bg-slate-50 text-slate-700 border-slate-200"
                    }
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="prose prose-sm prose-slate max-w-none">
                <h4 className="text-base font-semibold text-slate-800 mb-2">案例摘要</h4>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-slate-700 leading-relaxed">
                  {previewCase.content}
                </div>
              </div>
              
              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm font-medium text-slate-600">案例评级</div>
                <CaseRating initialScore={previewCase.type === 'success' ? 4.8 : 4.5} initialVotes={previewCase.type === 'success' ? 35 : 18} />
              </div>
            </div>
            
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 rounded-b-xl flex justify-end gap-3">
              <Button variant="outline" onClick={() => setPreviewCase(null)}>关闭</Button>
              <Button className="bg-indigo-600 hover:bg-indigo-700">阅读完整报告</Button>
            </div>
          </div>
        </div>
      )}

      {/* SWOT Report Modal */}
      {swotReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-indigo-50/50 rounded-t-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">AI 对手深度研判 (SWOT)</h3>
                  <div className="text-sm text-slate-500 font-medium">{swotReport.competitor}</div>
                </div>
              </div>
              <button 
                onClick={() => setSwotReport(null)}
                className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-green-50/50 rounded-xl p-4 border border-green-100">
                    <h4 className="flex items-center text-green-800 font-bold mb-3"><span className="w-6 h-6 mr-2 rounded-md bg-green-200 text-green-800 flex items-center justify-center text-sm">S</span>优势 (Strengths)</h4>
                    <ul className="space-y-2">
                      {swotReport.strengths.map((item, idx) => (
                        <li key={idx} className="flex items-start text-sm text-green-900/80">
                          <span className="mr-2 mt-1 min-w-[4px] h-1 w-1 bg-green-400 rounded-full"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-rose-50/50 rounded-xl p-4 border border-rose-100">
                    <h4 className="flex items-center text-rose-800 font-bold mb-3"><span className="w-6 h-6 mr-2 rounded-md bg-rose-200 text-rose-800 flex items-center justify-center text-sm">W</span>劣势 (Weaknesses)</h4>
                    <ul className="space-y-2">
                      {swotReport.weaknesses.map((item, idx) => (
                        <li key={idx} className="flex items-start text-sm text-rose-900/80">
                          <span className="mr-2 mt-1 min-w-[4px] h-1 w-1 bg-rose-400 rounded-full"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-sky-50/50 rounded-xl p-4 border border-sky-100">
                    <h4 className="flex items-center text-sky-800 font-bold mb-3"><span className="w-6 h-6 mr-2 rounded-md bg-sky-200 text-sky-800 flex items-center justify-center text-sm">O</span>机会 (Opportunities)</h4>
                    <ul className="space-y-2">
                      {swotReport.opportunities.map((item, idx) => (
                        <li key={idx} className="flex items-start text-sm text-sky-900/80">
                          <span className="mr-2 mt-1 min-w-[4px] h-1 w-1 bg-sky-400 rounded-full"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-amber-50/50 rounded-xl p-4 border border-amber-100">
                    <h4 className="flex items-center text-amber-800 font-bold mb-3"><span className="w-6 h-6 mr-2 rounded-md bg-amber-200 text-amber-800 flex items-center justify-center text-sm">T</span>威胁 (Threats)</h4>
                    <ul className="space-y-2">
                      {swotReport.threats.map((item, idx) => (
                        <li key={idx} className="flex items-start text-sm text-amber-900/80">
                          <span className="mr-2 mt-1 min-w-[4px] h-1 w-1 bg-amber-400 rounded-full"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-slate-50 border border-slate-100 rounded-lg p-4">
                <h4 className="text-sm font-bold text-slate-800 mb-2">AI 生成策略建议：</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  针对该竞争对手，建议在下一阶段的博弈中避开其极强的<span className="text-indigo-600 font-medium">资金垫付优势与主场公关主导权</span>。主攻其<span className="text-indigo-600 font-medium">响应速度与创新方案</span>的短板，在标前联合体架构、或高附加值子方案上提供更加灵活的响应，以此冲抵其综合资质上的降维打击。
                </p>
              </div>
            </div>
            
            <div className="p-4 border-t border-slate-100 bg-white rounded-b-xl flex justify-end gap-3">
              <Button variant="outline" onClick={() => setSwotReport(null)}>关闭</Button>
              <Button className="bg-indigo-600 hover:bg-indigo-700">导出此分析</Button>
            </div>
          </div>
        </div>
      )}

      {/* Whitepaper Modal */}
      {showWhitepaper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col animate-in zoom-in-95 duration-300 overflow-hidden border border-rose-100">
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:px-6 border-b border-rose-100 bg-gradient-to-r from-rose-50 to-white">
              <div className="flex items-center gap-3">
                <div className="bg-rose-100 text-rose-700 p-2 rounded-lg">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">2026年度 市场开发与投标管理白皮书</h3>
                  <div className="text-sm text-rose-700 font-medium">基于全年 450 条有效跟踪数据及 24 项中标工程深度生成</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="text-indigo-600 border-indigo-200 hover:bg-indigo-50">
                  <Download className="h-4 w-4 mr-2" /> 导出 PDF
                </Button>
                <button 
                  onClick={() => setShowWhitepaper(false)}
                  className="p-2 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            {/* Whitepaper Content Area */}
            <div className="flex-1 overflow-y-auto bg-slate-50 relative p-4 sm:p-8 space-y-8">
              
              {/* Cover/Intro Section */}
              <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm text-center space-y-4">
                 <h1 className="text-3xl font-black text-slate-900 tracking-tight">聚势谋局 · 破浪前行</h1>
                 <p className="text-lg text-slate-500 uppercase tracking-widest font-semibold">2026 年度营销与投标洞察报告</p>
                 <div className="w-16 h-1 bg-rose-500 mx-auto rounded-full mt-6 mb-4"></div>
                 <p className="max-w-3xl mx-auto text-slate-600 leading-relaxed text-sm">
                   本白皮书由业务中心平台 AIGC 引擎驱动，聚合 <strong className="text-slate-800">12 份月报</strong>、<strong className="text-slate-800">4 份季报</strong> 的全维度透视数据。
                   通过对 262 项投标立项档案及竞争对手模型的交叉比对，形成下一年度战术级指导方案。
                 </p>
              </div>

              {/* Data Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                       <span className="text-slate-500 font-medium">全口径中标率</span>
                       <Target className="h-5 w-5 text-indigo-500" />
                    </div>
                    <div className="text-3xl font-bold text-slate-900">11.8%</div>
                    <div className="text-sm text-green-600 font-medium mt-2 flex items-center">
                       <TrendingUp className="h-3 w-3 mr-1"/> 较去年提升 2.1 个百分点
                    </div>
                 </div>
                 <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                       <span className="text-slate-500 font-medium">优势承接领域 (榜首)</span>
                       <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">化工能源</Badge>
                    </div>
                    <div className="text-2xl font-bold text-slate-900">45 <span className="text-base text-slate-500 font-medium">项立项</span></div>
                    <div className="text-sm text-slate-600 mt-2">占整体资源的 35.5% 份额</div>
                 </div>
                 <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-rose-500">
                    <div className="flex items-center justify-between mb-4">
                       <span className="text-slate-500 font-medium text-sm">年平均下浮率探底</span>
                       <AlertTriangle className="h-5 w-5 text-rose-500" />
                    </div>
                    <div className="text-3xl font-bold text-slate-900">14.2%</div>
                    <div className="text-sm text-rose-600 mt-2 font-medium">市场价格战惨烈，触击成本红线极值</div>
                 </div>
              </div>

              {/* Strategy & Competitors */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 错题集与得失 */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                   <h3 className="text-lg font-bold border-b border-slate-100 pb-3 mb-4 flex items-center">
                      <FileText className="h-5 w-5 text-indigo-600 mr-2" />
                      核心错题集提取 (归因分析)
                   </h3>
                   <div className="space-y-4">
                      <div className="border-l-2 border-amber-400 pl-4 py-1">
                         <h4 className="font-semibold text-slate-800 text-sm">1. 业主高层变故引发公关盲区失标 (占比 18%)</h4>
                         <p className="text-xs text-slate-600 mt-1 max-w-sm">典型案例：XXX总包项目。长期过度依赖单一中层领导，未能在业主集团架构重组期第一时间对接新任决策层。</p>
                      </div>
                      <div className="border-l-2 border-rose-400 pl-4 py-1">
                         <h4 className="font-semibold text-slate-800 text-sm">2. 技术方案套模板与标书合并不充分 (占比 22%)</h4>
                         <p className="text-xs text-slate-600 mt-1 max-w-sm">多见于房建项目。未能精准提炼“保交差”等特定工期红线的工艺应对策略，技术标主观分评定垫底。</p>
                      </div>
                      <div className="border-l-2 border-blue-400 pl-4 py-1">
                         <h4 className="font-semibold text-slate-800 text-sm">3. 资质压制：带资进场资金劣势 (占比 45%)</h4>
                         <p className="text-xs text-slate-600 mt-1 max-w-sm">大型基建市场门槛变化，难以独立进行百亿级项目的资金过桥筹划，联合体模式我方话语权偏低。</p>
                      </div>
                   </div>
                </div>

                {/* 对手画像与明年策略 */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm bg-gradient-to-br from-indigo-50/30 to-white">
                   <h3 className="text-lg font-bold border-b border-slate-100 pb-3 mb-4 flex items-center">
                      <Target className="h-5 w-5 text-rose-600 mr-2" />
                      竞争态势与 2027 行动指南
                   </h3>
                   <div className="space-y-5">
                      <div>
                        <h4 className="text-sm font-bold text-slate-800 mb-2">主攻方向：避实击虚，专精特新化</h4>
                        <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-md border border-slate-100">
                          面对中建系等大型央企资金和区域资源的降维打击，<strong className="text-indigo-600">不建议在传统纯施工领域进行惨烈的价格肉搏</strong>。来年的战略重心必须倾斜至“化工能源”及“环保市政”等我们胜率极高 (22%) 的细分护城河。
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800 mb-2">联合体升级：由“被动跟随”走向“主动联姻”</h4>
                        <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-md border border-slate-100">
                          针对资金短板，商务中心应提前在华东、华南片区建立不少于 10 家的地方国资控股平台合作伙伴库，以“我们出专业技术与业绩 + 平台出国资背景与属地资源”的模式锁定大标。
                        </p>
                      </div>
                   </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
