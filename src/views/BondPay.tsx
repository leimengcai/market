import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Download, Search, Edit, Trash2, Eye, X } from 'lucide-react';

const initialData = [
  {id:"BD001", code:"BZJ-2026-018", projectId:"M001", projectName:"云港新能源装置 EPC 项目", amount:188, payTo:"云港石化", method:"保函", payDate:"2026-04-22", status:"已支付"},
  {id:"BD002", code:"BZJ-2026-017", projectId:"M002", projectName:"南京化工园 PTA 装置升级", amount:128.6, payTo:"扬子石化", method:"电汇", payDate:"2026-03-20", status:"已支付"},
  {id:"BD003", code:"BZJ-2026-016", projectId:"M003", projectName:"宁东能源化工基地 220kV 变电站", amount:98, payTo:"宁夏宝丰能源", method:"保函", payDate:"2025-12-25", status:"已支付"},
];

export function BondPay() {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal states
  const [editingItem, setEditingItem] = useState<any>(null);
  const [viewingItem, setViewingItem] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const filteredData = data.filter(p => JSON.stringify(p).toLowerCase().includes(searchTerm.toLowerCase()));

  const getStatusBadge = (status: string) => {
    if (status === '已支付') return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">已支付</Badge>;
    if (status === '处理中') return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">处理中</Badge>;
    return <Badge variant="outline">{status}</Badge>;
  };

  const handleEdit = (item: any) => {
    setEditingItem({ ...item });
    setIsEditModalOpen(true);
  };

  const handleCreate = () => {
    setEditingItem({
      code: `BZJ-${new Date().getFullYear()}-${String(data.length + 1).padStart(3, '0')}`,
      projectName: '',
      amount: 0,
      payTo: '',
      method: '电汇',
      payDate: new Date().toISOString().slice(0, 10),
      status: '处理中',
    });
    setIsEditModalOpen(true);
  };

  const handleSave = () => {
    if (editingItem.id) {
      setData(data.map(d => d.id === editingItem.id ? editingItem : d));
    } else {
      setData([{ ...editingItem, id: `BD${Date.now()}` }, ...data]);
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
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">投标保证金支付</h2>
          <p className="text-slate-500 mt-1">投标管理 · 保留</p>
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
                  <th className="px-4 py-3 font-medium">编号</th>
                  <th className="px-4 py-3 font-medium">项目名称</th>
                  <th className="px-4 py-3 font-medium">金额(万)</th>
                  <th className="px-4 py-3 font-medium">收款方</th>
                  <th className="px-4 py-3 font-medium">支付方式</th>
                  <th className="px-4 py-3 font-medium">支付日期</th>
                  <th className="px-4 py-3 font-medium">状态</th>
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
                    <td className="px-4 py-3 text-emerald-600 font-mono">{item.amount}</td>
                    <td className="px-4 py-3 text-slate-700">{item.payTo}</td>
                    <td className="px-4 py-3 text-slate-700">{item.method}</td>
                    <td className="px-4 py-3 text-slate-600">{item.payDate}</td>
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
                    <td colSpan={9} className="px-4 py-12 text-center text-slate-500">
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
              <h3 className="text-lg font-bold text-slate-900">{editingItem.id ? '编辑' : '新增'}投标保证金支付</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-indigo-600 uppercase tracking-widest flex items-center">编号 <span className="text-rose-500 ml-1">*</span></label>
                  <Input value={editingItem.code || ''} onChange={e => setEditingItem({...editingItem, code: e.target.value})} />
                </div>
                
                <div className="space-y-2 col-span-1 md:col-span-2">
                  <label className="text-xs font-semibold text-indigo-600 uppercase tracking-widest flex items-center">项目名称 <span className="text-rose-500 ml-1">*</span></label>
                  <Input value={editingItem.projectName || ''} onChange={e => setEditingItem({...editingItem, projectName: e.target.value})} />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-indigo-600 uppercase tracking-widest flex items-center">金额(万)</label>
                  <Input type="number" step="0.01" value={editingItem.amount || ''} onChange={e => setEditingItem({...editingItem, amount: Number(e.target.value)})} />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-indigo-600 uppercase tracking-widest flex items-center">收款方</label>
                  <Input value={editingItem.payTo || ''} onChange={e => setEditingItem({...editingItem, payTo: e.target.value})} />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-indigo-600 uppercase tracking-widest flex items-center">支付方式</label>
                  <select 
                    className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    value={editingItem.method || ''}
                    onChange={e => setEditingItem({...editingItem, method: e.target.value})}
                  >
                    <option value="电汇">电汇</option>
                    <option value="保函">保函</option>
                    <option value="支票">支票</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-indigo-600 uppercase tracking-widest flex items-center">支付日期</label>
                  <Input type="date" value={editingItem.payDate || ''} onChange={e => setEditingItem({...editingItem, payDate: e.target.value})} />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-indigo-600 uppercase tracking-widest flex items-center">状态</label>
                  <select 
                    className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    value={editingItem.status || ''}
                    onChange={e => setEditingItem({...editingItem, status: e.target.value})}
                  >
                    <option value="处理中">处理中</option>
                    <option value="已支付">已支付</option>
                    <option value="支付失败">支付失败</option>
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
                <h3 className="text-2xl font-bold text-indigo-400 tracking-tight pr-8">投标保证金支付</h3>
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
                  <div className="text-slate-500">金额(万)</div><div className="text-emerald-400 font-mono">{viewingItem.amount}</div>
                  <div className="text-slate-500">收款方</div><div className="text-slate-200">{viewingItem.payTo}</div>
                  <div className="text-slate-500">支付方式</div><div className="text-slate-200">{viewingItem.method}</div>
                  <div className="text-slate-500">支付日期</div><div className="text-slate-200">{viewingItem.payDate}</div>
                  <div className="text-slate-500">状态</div><div className="text-slate-200">{viewingItem.status}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
