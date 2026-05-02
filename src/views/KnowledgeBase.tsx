import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Database, Users, LineChart as LineChartIcon, FileText, Download, Star, X, Eye } from 'lucide-react';
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

export function KnowledgeBase() {
  const [previewCase, setPreviewCase] = useState<PreviewCase | null>(null);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">经验沉淀与知识库</h2>
          <p className="text-slate-500 mt-1">由系统从各类复盘报告中自动提取、结构化存储的战略级业务资产。</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700">生成年度市场开发白皮书</Button>
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

                  <Button variant="link" className="px-0 w-full justify-between h-8 text-indigo-600 mt-2">
                    查看详细档案 <LineChartIcon className="h-4 w-4" />
                  </Button>
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

                  <Button variant="link" className="px-0 w-full justify-between h-8 text-indigo-600 mt-2">
                    查看详细档案 <LineChartIcon className="h-4 w-4" />
                  </Button>
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
    </div>
  );
}
