import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Download, Search, Edit, Trash2, Eye, X } from 'lucide-react';

const initialData = [
  {id:"BP001", code:"TBLX-2026-024", projectId:"M001", projectName:"云港新能源装置 EPC 项目", projectLevel:"A", bidDeadline:"2026-05-20", bidReviewStatus:"评审中", bidReviewDate:"2026-05-12", bondRequired:1, bondPaidId:"BD001", bondPaidStatus:"已支付", preReviewId:"PR001", preReviewPassed:1, leader:"陈鹏", status:"标书编制中"},
  {id:"BP002", code:"TBLX-2026-023", projectId:"M002", projectName:"南京化工园 PTA 装置升级", projectLevel:"A", bidDeadline:"2026-04-12", bidReviewStatus:"通过", bidReviewDate:"2026-04-05", bondRequired:1, bondPaidId:"BD002", bondPaidStatus:"已支付", preReviewPassed:1, leader:"陈鹏", status:"已投标"},
  {id:"BP003", code:"TBLX-2026-022", projectId:"M003", projectName:"宁东能源化工基地 220kV 变电站", projectLevel:"B", bidDeadline:"2026-01-20", bidReviewStatus:"通过", bidReviewDate:"2026-01-10", bondRequired:1, bondPaidId:"BD003", bondPaidStatus:"已支付", preReviewId:"PR005", preReviewPassed:1, leader:"刘东", status:"已中标"},
  {id:"BP004", code:"TBLX-2026-021", projectId:"M005", projectName:"内蒙古某园区基础设施", projectLevel:"B", bidDeadline:"2026-03-10", bidReviewStatus:"通过", bidReviewDate:"2026-03-01", bondRequired:1, bondPaidStatus:"已支付", preReviewId:"PR004", preReviewPassed:1, leader:"赵国伟", status:"已投标"},
];

export function BidProjectReview() {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal states
  const [editingItem, setEditingItem] = useState<any>(null);
  const [viewingItem, setViewingItem] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const filteredData = data.filter(p => JSON.stringify(p).toLowerCase().includes(searchTerm.toLowerCase()));

  const getStatusBadge = (status: string) => {
    switch (status) {
      case '已中标': return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">{status}</Badge>;
      case '已投标': return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">{status}</Badge>;
      case '未中标':
      case '已放弃': return <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200">{status}</Badge>;
      case '标书编制中': return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">{status}</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getReviewBadge = (status: string) => {
    if (status === '通过') return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">{status}</Badge>;
    if (status === '评审中') return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">{status}</Badge>;
    return <Badge variant="outline">{status}</Badge>;
  };

  const handleEdit = (item: any) => {
    setEditingItem({ ...item });
    setIsEditModalOpen(true);
  };

  const handleCreate = () => {
    setEditingItem({
      code: `TBLX-${new Date().getFullYear()}-${String(data.length + 1).padStart(3, '0')}`,
      projectName: '',
      projectLevel: 'B',
      bidDeadline: new Date().toISOString().slice(0, 10),
      bidReviewStatus: '评审中',
      bidReviewDate: '',
      bondRequired: 1,
      bondPaidStatus: '未支付',
      preReviewPassed: 1,
      leader: '',
      status: '标书编制中',
    });
    setIsEditModalOpen(true);
  };

  const handleSave = () => {
    if (editingItem.id) {
      setData(data.map(d => d.id === editingItem.id ? editingItem : d));
    } else {
      setData([{ ...editingItem, id: `BP${Date.now()}` }, ...data]);
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
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">投标立项与标书评审</h2>
          <p className="text-slate-500 mt-1">投标管理 · 合并增强</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="text-slate-600">
            <Download className="h-4 w-4 mr-2" />
            导出 CSV
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={handleCreate}>
            <Plus className="h-4 w-4 mr-2" />
            新增
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
                  <th className="px-4 py-3 font-medium">立项编号</th>
                  <th className="px-4 py-3 font-medium">项目名称</th>
                  <th className="px-4 py-3 font-medium">等级</th>
                  <th className="px-4 py-3 font-medium">投标截止日期</th>
                  <th className="px-4 py-3 font-medium">评审状态</th>
                  <th className="px-4 py-3 font-medium">保证金状态</th>
                  <th className="px-4 py-3 font-medium">负责人</th>
                  <th className="px-4 py-3 font-medium">整体状态</th>
                  <th className="px-4 py-3 font-medium text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.length > 0 ? filteredData.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3 text-center text-slate-400">{index + 1}</td>
                    <td className="px-4 py-3 text-slate-500 font-mono text-xs">{item.code}</td>
                    <td className="px-4 py-3 font-bold text-slate-900 cursor-pointer hover:underline text-blue-600 flex items-center gap-1">
                      {item.projectName} ↗
                    </td>
                    <td className="px-4 py-3">{item.projectLevel}</td>
                    <td className="px-4 py-3 text-slate-600">{item.bidDeadline}</td>
                    <td className="px-4 py-3">{getReviewBadge(item.bidReviewStatus)}</td>
                    <td className="px-4 py-3">
                      <span className={item.bondPaidStatus === '已支付' ? 'text-green-600' : 'text-amber-600'}>{item.bondPaidStatus}</span>
                      {item.bondPaidId && <span className="text-slate-400 text-xs ml-1 cursor-pointer">↗</span>}
                    </td>
                    <td className="px-4 py-3 text-slate-700">{item.leader}</td>
                    <td className="px-4 py-3">{getStatusBadge(item.status)}</td>
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
              <h3 className="text-lg font-bold text-slate-900">{editingItem.id ? '编辑' : '新增'}投标立项与标书评审</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-indigo-600 uppercase tracking-widest flex items-center">立项编号 <span className="text-rose-500 ml-1">*</span></label>
                  <Input value={editingItem.code || ''} onChange={e => setEditingItem({...editingItem, code: e.target.value})} />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-indigo-600 uppercase tracking-widest flex items-center">项目名称 <span className="text-rose-500 ml-1">*</span></label>
                  <Input value={editingItem.projectName || ''} onChange={e => setEditingItem({...editingItem, projectName: e.target.value})} />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-indigo-600 uppercase tracking-widest flex items-center">等级</label>
                  <select 
                    className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    value={editingItem.projectLevel || ''}
                    onChange={e => setEditingItem({...editingItem, projectLevel: e.target.value})}
                  >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-indigo-600 uppercase tracking-widest flex items-center">投标截止日期</label>
                  <Input type="date" value={editingItem.bidDeadline || ''} onChange={e => setEditingItem({...editingItem, bidDeadline: e.target.value})} />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-indigo-600 uppercase tracking-widest flex items-center">评审状态</label>
                  <select 
                    className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    value={editingItem.bidReviewStatus || ''}
                    onChange={e => setEditingItem({...editingItem, bidReviewStatus: e.target.value})}
                  >
                    <option value="未开始">未开始</option>
                    <option value="评审中">评审中</option>
                    <option value="通过">通过</option>
                    <option value="驳回">驳回</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-indigo-600 uppercase tracking-widest flex items-center">评审日期</label>
                  <Input type="date" value={editingItem.bidReviewDate || ''} onChange={e => setEditingItem({...editingItem, bidReviewDate: e.target.value})} />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-indigo-600 uppercase tracking-widest flex items-center">保证金状态</label>
                  <select 
                    className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    value={editingItem.bondPaidStatus || ''}
                    onChange={e => setEditingItem({...editingItem, bondPaidStatus: e.target.value})}
                  >
                    <option value="未支付">未支付</option>
                    <option value="处理中">处理中</option>
                    <option value="已支付">已支付</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-indigo-600 uppercase tracking-widest flex items-center">负责人</label>
                  <Input value={editingItem.leader || ''} onChange={e => setEditingItem({...editingItem, leader: e.target.value})} />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-indigo-600 uppercase tracking-widest flex items-center">整体状态</label>
                  <select 
                    className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    value={editingItem.status || ''}
                    onChange={e => setEditingItem({...editingItem, status: e.target.value})}
                  >
                    <option value="立项中">立项中</option>
                    <option value="标书编制中">标书编制中</option>
                    <option value="待签发">待签发</option>
                    <option value="已投标">已投标</option>
                    <option value="已中标">已中标</option>
                    <option value="未中标">未中标</option>
                    <option value="已放弃">已放弃</option>
                  </select>
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
                <h3 className="text-2xl font-bold text-indigo-400 tracking-tight pr-8">投标立项与标书评审</h3>
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
                  <div className="text-slate-500">项目等级</div><div className="text-slate-200">{viewingItem.projectLevel}</div>
                  <div className="text-slate-500">投标截止日期</div><div className="text-slate-200">{viewingItem.bidDeadline}</div>
                  <div className="text-slate-500">标书评审状态</div><div className="text-slate-200">{viewingItem.bidReviewStatus}</div>
                  <div className="text-slate-500">标书评审日期</div><div className="text-slate-200">{viewingItem.bidReviewDate || '—'}</div>
                  <div className="text-slate-500">保证金状态</div><div className="text-slate-200">{viewingItem.bondPaidStatus}</div>
                  <div className="text-slate-500">负责人</div><div className="text-slate-200">{viewingItem.leader}</div>
                  <div className="text-slate-500">整体状态</div><div className="text-slate-200">{viewingItem.status}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
