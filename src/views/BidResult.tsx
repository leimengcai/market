import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Download, Search, Edit, Trash2, Eye, X } from 'lucide-react';

const initialData = [
  {id:"BR001", code:"TBJG-2026-018", bidProjectId:"BP002", projectName:"南京化工园 PTA 装置升级", isBidSuccess:0, openBidDate:"2026-04-15", openBidLocation:"扬子石化总部", competitorCount:5, ourBidPrice:12860, winningBidPrice:11920, priceRanking:2, postReviewStatus:"已审批", failureReasons:"报价偏高8%,关系深度不足,设备成本失控,技术亮点呈现弱"},
  {id:"BR002", code:"TBJG-2026-017", bidProjectId:"BP003", projectName:"宁东能源化工基地 220kV 变电站", isBidSuccess:1, openBidDate:"2026-02-08", openBidLocation:"宁夏宝丰总部", competitorCount:6, ourBidPrice:9800, winningBidPrice:9800, priceRanking:1, postReviewStatus:"已审批"},
  {id:"BR003", code:"TBJG-2026-016", bidProjectId:"BP004", projectName:"内蒙古某园区基础设施", isBidSuccess:0, openBidDate:"2026-03-25", openBidLocation:"鄂尔多斯城建中心", competitorCount:4, ourBidPrice:6400, winningBidPrice:5980, priceRanking:3, postReviewStatus:"待复盘"},
];

export function BidResult() {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal states
  const [editingItem, setEditingItem] = useState<any>(null);
  const [viewingItem, setViewingItem] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const filteredData = data.filter(p => JSON.stringify(p).toLowerCase().includes(searchTerm.toLowerCase()));

  const getResultBadge = (success: number) => {
    if (success === 1) return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">已中标</Badge>;
    if (success === 0) return <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200">未中标</Badge>;
    return <Badge variant="outline">待定</Badge>;
  };

  const handleEdit = (item: any) => {
    setEditingItem({ ...item });
    setIsEditModalOpen(true);
  };

  const handleCreate = () => {
    setEditingItem({
      code: `TBJG-${new Date().getFullYear()}-${String(data.length + 1).padStart(3, '0')}`,
      projectName: '',
      isBidSuccess: 1,
      openBidDate: new Date().toISOString().slice(0, 10),
      openBidLocation: '',
      competitorCount: 0,
      ourBidPrice: 0,
      winningBidPrice: 0,
      priceRanking: 1,
      postReviewStatus: '待复盘',
      failureReasons: '',
    });
    setIsEditModalOpen(true);
  };

  const handleSave = () => {
    if (editingItem.id) {
      setData(data.map(d => d.id === editingItem.id ? editingItem : d));
    } else {
      setData([{ ...editingItem, id: `BR${Date.now()}` }, ...data]);
    }
    setIsEditModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('确认删除该条记录？')) {
      setData(data.filter(d => d.id !== id));
    }
  };

  const handleView = (item: any) => {
    setViewingItem(item);
    setIsViewModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">投标结果与通知书</h2>
          <p className="text-slate-500 mt-1">投标管理 · 核心反馈</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="text-slate-600">
            <Download className="h-4 w-4 mr-2" />
            导出 CSV
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={handleCreate}>
            <Plus className="h-4 w-4 mr-2" />
            登记结果
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50 rounded-t-xl">
             <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder="搜索项目名称/编号..." 
                  className="pl-9 bg-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            <div className="text-sm text-slate-500 font-medium whitespace-nowrap">
              共 <span className="text-indigo-600 font-bold">{filteredData.length}</span> 条
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-slate-500 bg-slate-50/50 border-b border-slate-100">
                <tr>
                  <th className="px-4 py-3 font-medium w-12 text-center">#</th>
                  <th className="px-4 py-3 font-medium">结果编号</th>
                  <th className="px-4 py-3 font-medium">项目名称</th>
                  <th className="px-4 py-3 font-medium">开标日期</th>
                  <th className="px-4 py-3 font-medium text-right">我方报价</th>
                  <th className="px-4 py-3 font-medium text-right">中标价</th>
                  <th className="px-4 py-3 font-medium text-center">价格排名</th>
                  <th className="px-4 py-3 font-medium">结果</th>
                  <th className="px-4 py-3 font-medium">复盘状态</th>
                  <th className="px-4 py-3 font-medium text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.length > 0 ? filteredData.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3 text-center text-slate-400">{index + 1}</td>
                    <td className="px-4 py-3 text-slate-500 font-mono text-xs">{item.code}</td>
                    <td className="px-4 py-3 font-bold text-slate-900 cursor-pointer hover:underline text-blue-600">
                      {item.projectName}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{item.openBidDate}</td>
                    <td className="px-4 py-3 text-right font-mono text-slate-700">{item.ourBidPrice?.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right font-mono text-slate-700">{item.winningBidPrice?.toLocaleString()}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${item.priceRanking === 1 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'}`}>
                        {item.priceRanking}
                      </span>
                    </td>
                    <td className="px-4 py-3">{getResultBadge(item.isBidSuccess)}</td>
                    <td className="px-4 py-3 text-slate-600">
                      {item.postReviewStatus}
                      {item.postReviewStatus !== '无' && <span className="text-slate-400 text-xs ml-1 cursor-pointer hover:text-indigo-500">↗</span>}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50" onClick={() => handleView(item)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-amber-600 hover:bg-amber-50" onClick={() => handleEdit(item)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-rose-600 hover:bg-rose-50" onClick={() => handleDelete(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={10} className="px-4 py-12 text-center text-slate-500">
                      无符合条件的记录。
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      {isEditModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">{editingItem.id ? '编辑' : '新增'}投标结果与通知书</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-indigo-600 uppercase tracking-widest flex items-center">结果编号 <span className="text-rose-500 ml-1">*</span></label>
                  <Input value={editingItem.code || ''} onChange={e => setEditingItem({...editingItem, code: e.target.value})} />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-indigo-600 uppercase tracking-widest flex items-center">项目名称 <span className="text-rose-500 ml-1">*</span></label>
                  <Input value={editingItem.projectName || ''} onChange={e => setEditingItem({...editingItem, projectName: e.target.value})} />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-indigo-600 uppercase tracking-widest flex items-center">开标日期</label>
                  <Input type="date" value={editingItem.openBidDate || ''} onChange={e => setEditingItem({...editingItem, openBidDate: e.target.value})} />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-indigo-600 uppercase tracking-widest flex items-center">开标地点</label>
                  <Input value={editingItem.openBidLocation || ''} onChange={e => setEditingItem({...editingItem, openBidLocation: e.target.value})} />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-indigo-600 uppercase tracking-widest flex items-center">竞争对手数量</label>
                  <Input type="number" value={editingItem.competitorCount || 0} onChange={e => setEditingItem({...editingItem, competitorCount: Number(e.target.value)})} />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-indigo-600 uppercase tracking-widest flex items-center">我方报价(万)</label>
                  <Input type="number" value={editingItem.ourBidPrice || 0} onChange={e => setEditingItem({...editingItem, ourBidPrice: Number(e.target.value)})} />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-indigo-600 uppercase tracking-widest flex items-center">中标价格(万)</label>
                  <Input type="number" value={editingItem.winningBidPrice || 0} onChange={e => setEditingItem({...editingItem, winningBidPrice: Number(e.target.value)})} />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-indigo-600 uppercase tracking-widest flex items-center">价格排名</label>
                  <Input type="number" value={editingItem.priceRanking || 1} onChange={e => setEditingItem({...editingItem, priceRanking: Number(e.target.value)})} />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-indigo-600 uppercase tracking-widest flex items-center">是否中标</label>
                  <select 
                    className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    value={editingItem.isBidSuccess}
                    onChange={e => setEditingItem({...editingItem, isBidSuccess: Number(e.target.value)})}
                  >
                    <option value={1}>已中标</option>
                    <option value={0}>未中标</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-indigo-600 uppercase tracking-widest flex items-center">复盘状态</label>
                  <select 
                    className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    value={editingItem.postReviewStatus || ''}
                    onChange={e => setEditingItem({...editingItem, postReviewStatus: e.target.value})}
                  >
                    <option value="无">无</option>
                    <option value="待复盘">待复盘</option>
                    <option value="已复盘">已复盘</option>
                    <option value="已审批">已审批</option>
                  </select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-semibold text-indigo-600 uppercase tracking-widest flex items-center">失败/失分原因</label>
                  <textarea 
                    className="w-full min-h-[80px] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    value={editingItem.failureReasons || ''} 
                    onChange={e => setEditingItem({...editingItem, failureReasons: e.target.value})} 
                  />
                </div>
              </div>
            </div>
            
            <div className="p-5 border-t border-slate-100 flex justify-end gap-3 bg-slate-50/50 rounded-b-xl">
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>取消</Button>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick={handleSave}>保存</Button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {isViewModalOpen && viewingItem && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-slate-950 border-l border-indigo-900/30 w-full max-w-2xl h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-slate-800 flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-indigo-400 tracking-tight pr-8">投标结果</h3>
                <div className="text-slate-400 text-sm mt-2">{viewingItem.code} · ID: {viewingItem.id}</div>
              </div>
              <button onClick={() => setIsViewModalOpen(false)} className="text-indigo-500/70 hover:text-indigo-400 transition-colors absolute top-6 right-6">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-500">🖨 打印单据</Button>
                <Button variant="outline" size="sm" className="bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white" onClick={() => { setIsViewModalOpen(false); handleEdit(viewingItem); }}>✎ 编辑</Button>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-lg p-5">
                <h5 className="text-indigo-400 text-xs font-semibold tracking-wider mb-4 flex justify-between items-center">
                  基础字段
                </h5>
                <div className="grid grid-cols-[130px_1fr] gap-y-3 gap-x-4 text-sm">
                  <div className="text-slate-500">编号</div><div className="text-slate-200">{viewingItem.code}</div>
                  <div className="text-slate-500">项目名称</div><div className="text-slate-200 font-medium">{viewingItem.projectName}</div>
                  <div className="text-slate-500">开标日期</div><div className="text-slate-200">{viewingItem.openBidDate}</div>
                  <div className="text-slate-500">开标地点</div><div className="text-slate-200">{viewingItem.openBidLocation}</div>
                  <div className="text-slate-500">对手数量</div><div className="text-slate-200">{viewingItem.competitorCount} 家</div>
                  <div className="text-slate-500">我方报价</div><div className="text-indigo-400 font-mono">{viewingItem.ourBidPrice}</div>
                  <div className="text-slate-500">中标报价</div><div className="text-emerald-400 font-mono">{viewingItem.winningBidPrice}</div>
                  <div className="text-slate-500">价格排名</div><div className="text-slate-200">第 {viewingItem.priceRanking} 名</div>
                  <div className="text-slate-500">中标结果</div><div className="text-slate-200">{viewingItem.isBidSuccess === 1 ? '中标' : '未中标'}</div>
                  <div className="text-slate-500">复盘状态</div><div className="text-slate-200">{viewingItem.postReviewStatus}</div>
                  <div className="text-slate-500">失败原因</div><div className="text-slate-200">{viewingItem.failureReasons || '—'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
