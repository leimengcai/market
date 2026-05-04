import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Download, Search, Edit, Trash2, Eye, X } from 'lucide-react';

const initialMockData = [
  {id:"M001", code:"XX-2026-012", projectName:"云港新能源装置 EPC 项目", ownerId:"P002", ownerName:"云港石化", estimatedAmount:18800, industry:"新能源", region:"华东", contact:"周总", reviewResult:"通过", projectLevel:"A", projectLevelId:"L001", strategicFeatures:"国际客户;首次进入新行业", preReviewId:"PR001", preReviewStatus:"已完成", preReviewResult:"继续跟踪", status:"跟踪中", createDate:"2026-02-10", changeCount:2},
  {id:"M002", code:"XX-2026-011", projectName:"南京化工园 PTA 装置升级", ownerId:"P001", ownerName:"扬子石化", estimatedAmount:12860, industry:"化工", region:"华东", contact:"刘总", reviewResult:"通过", projectLevel:"A", projectLevelId:"L002", strategicFeatures:"长期合作客户", preReviewId:"", preReviewStatus:"已完成", preReviewResult:"继续跟踪", status:"已投标", createDate:"2025-09-10", changeCount:0},
  {id:"M003", code:"XX-2026-010", projectName:"宁东能源化工基地 220kV 变电站", ownerId:"P006", ownerName:"宁夏宝丰能源", estimatedAmount:9800, industry:"能源", region:"西北", contact:"马总", reviewResult:"通过", projectLevel:"B", projectLevelId:"L003", strategicFeatures:"行业龙头客户", preReviewId:"PR005", preReviewStatus:"已完成", preReviewResult:"继续跟踪", status:"已中标", createDate:"2025-12-05", changeCount:0},
  {id:"M004", code:"XX-2026-009", projectName:"惠州炼化乙烯三期", ownerId:"P004", ownerName:"中海石油", estimatedAmount:21500, industry:"石化", region:"华南", contact:"林总", reviewResult:"通过", projectLevel:"A", projectLevelId:"L004", strategicFeatures:"长期合作客户", preReviewId:"PR002", preReviewStatus:"复盘中", preReviewResult:"", status:"跟踪中", createDate:"2025-11-18", changeCount:1},
  {id:"M005", code:"XX-2026-008", projectName:"内蒙古某园区基础设施", ownerId:"", ownerName:"鄂尔多斯城建", estimatedAmount:6400, industry:"基建", region:"华北", contact:"赵总", reviewResult:"通过", projectLevel:"B", projectLevelId:"L005", strategicFeatures:"", preReviewId:"PR004", preReviewStatus:"已完成", preReviewResult:"继续跟踪", status:"已投标", createDate:"2026-01-20", changeCount:0},
  {id:"M006", code:"XX-2026-007", projectName:"印尼镍铁冶炼一期", ownerId:"", ownerName:"PT Lygend", estimatedAmount:32400, industry:"冶金", region:"海外", contact:"林志强", reviewResult:"通过", projectLevel:"A", projectLevelId:"L006", strategicFeatures:"海外项目;首次进入新行业", preReviewId:"PR003", preReviewStatus:"已完成", preReviewResult:"继续跟踪", status:"跟踪中", createDate:"2025-10-15", changeCount:0},
];

export function MarketInfo() {
  const [data, setData] = useState(initialMockData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  
  // Modal states
  const [editingItem, setEditingItem] = useState<any>(null);
  const [viewingItem, setViewingItem] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const filteredData = data.filter(p => {
    const matchesSearch = JSON.stringify(p).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus ? p.status === filterStatus : true;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case '已中标':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">{status}</Badge>;
      case '未中标':
      case '已放弃':
        return <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200">{status}</Badge>;
      case '跟踪中':
      case '已投标':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">{status}</Badge>;
      default:
        return <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">{status}</Badge>;
    }
  };

  const getPreReviewBadge = (status: string) => {
    if (status === '已完成') return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">{status} ↗</Badge>;
    if (status === '复盘中') return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">{status} ↗</Badge>;
    if (status === '未开始' || !status) return <Badge variant="outline" className="bg-slate-50 text-slate-500 border-slate-200">未开始</Badge>;
    return <Badge variant="outline">{status}</Badge>;
  };

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'A': return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">A 级</Badge>;
      case 'B': return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">B 级</Badge>;
      case 'C': return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">C 级</Badge>;
      default: return <Badge variant="outline">{level}</Badge>;
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem({ ...item });
    setIsEditModalOpen(true);
  };

  const handleCreate = () => {
    setEditingItem({
      code: `XX-${new Date().getFullYear()}-${String(data.length + 1).padStart(3, '0')}`,
      projectName: '',
      ownerName: '',
      estimatedAmount: '',
      industry: '',
      region: '',
      contact: '',
      reviewResult: '通过',
      projectLevel: 'B',
      strategicFeatures: '',
      status: '跟踪中',
    });
    setIsEditModalOpen(true);
  };

  const handleSave = () => {
    if (editingItem.id) {
      setData(data.map(d => d.id === editingItem.id ? editingItem : d));
    } else {
      setData([{ ...editingItem, id: `M${Date.now()}`, createDate: new Date().toISOString().slice(0, 10), changeCount: 0 }, ...data]);
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
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">市场信息评审与跟踪</h2>
          <p className="text-slate-500 mt-1">市场管理 · 合并增强</p>
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
            <div className="flex w-full sm:w-auto items-center gap-3">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder="搜索项目名称/编号/业主..." 
                  className="pl-9 bg-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select 
                className="h-9 rounded-md border border-slate-200 bg-white px-3 py-1 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="">全部状态</option>
                <option value="跟踪中">跟踪中</option>
                <option value="已投标">已投标</option>
                <option value="已中标">已中标</option>
                <option value="未中标">未中标</option>
                <option value="已放弃">已放弃</option>
              </select>
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
                  <th className="px-4 py-3 font-medium">业主</th>
                  <th className="px-4 py-3 font-medium">合同额(万)</th>
                  <th className="px-4 py-3 font-medium">等级</th>
                  <th className="px-4 py-3 font-medium">投标前复盘</th>
                  <th className="px-4 py-3 font-medium">跟踪状态</th>
                  <th className="px-4 py-3 font-medium text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.length > 0 ? filteredData.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3 text-center text-slate-400">{index + 1}</td>
                    <td className="px-4 py-3 text-slate-500 font-mono text-xs">{item.code}</td>
                    <td className="px-4 py-3 font-bold text-slate-900">{item.projectName}</td>
                    <td className="px-4 py-3">
                      <span className="text-blue-600 hover:underline cursor-pointer">
                        {item.ownerName}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-700 font-medium">{item.estimatedAmount?.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 cursor-pointer hover:opacity-80">
                         {getLevelBadge(item.projectLevel)} {item.projectLevelId && <span className="text-[10px] text-slate-400">↗</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3 cursor-pointer hover:opacity-80">
                      {getPreReviewBadge(item.preReviewStatus)}
                    </td>
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
              <h3 className="text-lg font-bold text-slate-900">{editingItem.id ? '编辑' : '新增'}市场信息</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-amber-600 uppercase tracking-widest flex items-center">编号 <span className="text-rose-500 ml-1">*</span> <span className="text-slate-400 ml-2 normal-case font-normal">Code</span></label>
                  <Input 
                    value={editingItem.code || ''} 
                    onChange={e => setEditingItem({...editingItem, code: e.target.value})} 
                  />
                </div>
                
                <div className="space-y-2 col-span-1 md:col-span-2">
                  <label className="text-xs font-semibold text-amber-600 uppercase tracking-widest flex items-center">项目名称 <span className="text-rose-500 ml-1">*</span> <span className="text-slate-400 ml-2 normal-case font-normal">ProjectName</span></label>
                  <Input 
                    value={editingItem.projectName || ''} 
                    onChange={e => setEditingItem({...editingItem, projectName: e.target.value})} 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-amber-600 uppercase tracking-widest flex items-center">业主单位 <span className="text-slate-400 ml-2 normal-case font-normal">OwnerName</span></label>
                  <Input 
                    value={editingItem.ownerName || ''} 
                    onChange={e => setEditingItem({...editingItem, ownerName: e.target.value})} 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-amber-600 uppercase tracking-widest flex items-center">预计合同额(万) <span className="text-rose-500 ml-1">*</span> <span className="text-slate-400 ml-2 normal-case font-normal">EstimatedAmount</span></label>
                  <Input 
                    type="number"
                    value={editingItem.estimatedAmount || ''} 
                    onChange={e => setEditingItem({...editingItem, estimatedAmount: e.target.value})} 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-amber-600 uppercase tracking-widest flex items-center">行业 <span className="text-slate-400 ml-2 normal-case font-normal">Industry</span></label>
                  <Input 
                    value={editingItem.industry || ''} 
                    onChange={e => setEditingItem({...editingItem, industry: e.target.value})} 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-amber-600 uppercase tracking-widest flex items-center">区域 <span className="text-slate-400 ml-2 normal-case font-normal">Region</span></label>
                  <Input 
                    value={editingItem.region || ''} 
                    onChange={e => setEditingItem({...editingItem, region: e.target.value})} 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-amber-600 uppercase tracking-widest flex items-center">联系人 <span className="text-slate-400 ml-2 normal-case font-normal">Contact</span></label>
                  <Input 
                    value={editingItem.contact || ''} 
                    onChange={e => setEditingItem({...editingItem, contact: e.target.value})} 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-amber-600 uppercase tracking-widest flex items-center">评审结果 <span className="text-slate-400 ml-2 normal-case font-normal">ReviewResult</span></label>
                  <select 
                    className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    value={editingItem.reviewResult || ''}
                    onChange={e => setEditingItem({...editingItem, reviewResult: e.target.value})}
                  >
                    <option value="">(空)</option>
                    <option value="通过">通过</option>
                    <option value="不通过">不通过</option>
                    <option value="暂缓">暂缓</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-amber-600 uppercase tracking-widest flex items-center">项目等级 <span className="text-slate-400 ml-2 normal-case font-normal">ProjectLevel</span></label>
                  <select 
                    className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    value={editingItem.projectLevel || ''}
                    onChange={e => setEditingItem({...editingItem, projectLevel: e.target.value})}
                  >
                    <option value="">(空)</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-amber-600 uppercase tracking-widest flex items-center">跟踪状态 <span className="text-slate-400 ml-2 normal-case font-normal">Status</span></label>
                  <select 
                    className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    value={editingItem.status || ''}
                    onChange={e => setEditingItem({...editingItem, status: e.target.value})}
                  >
                    <option value="跟踪中">跟踪中</option>
                    <option value="已投标">已投标</option>
                    <option value="已中标">已中标</option>
                    <option value="未中标">未中标</option>
                    <option value="已放弃">已放弃</option>
                  </select>
                </div>

                <div className="space-y-2 col-span-1 md:col-span-2">
                  <label className="text-xs font-semibold text-amber-600 uppercase tracking-widest flex items-center">战略特征 <span className="text-slate-400 ml-2 normal-case font-normal">StrategicFeatures</span></label>
                  <Input 
                    value={editingItem.strategicFeatures || ''} 
                    onChange={e => setEditingItem({...editingItem, strategicFeatures: e.target.value})} 
                    placeholder="分号分隔"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">分号分隔</p>
                </div>
              </div>
            </div>
            
            <div className="p-5 border-t border-slate-100 flex justify-end gap-3 bg-slate-50/50 rounded-b-xl">
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>取消</Button>
              <Button className="bg-amber-500 hover:bg-amber-600 text-white" onClick={handleSave}>保存</Button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal (Detail Pane) */}
      {isViewModalOpen && viewingItem && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-slate-950 border-l border-amber-900/30 w-full max-w-2xl h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-slate-800 flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-amber-400 tracking-tight pr-8">{viewingItem.projectName}</h3>
                <div className="text-slate-400 text-sm mt-2">市场信息 · {viewingItem.code} · ID: {viewingItem.id}</div>
              </div>
              <button onClick={() => setIsViewModalOpen(false)} className="text-amber-500/70 hover:text-amber-400 transition-colors absolute top-6 right-6">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="bg-amber-500 text-slate-900 border-amber-500 hover:bg-amber-400">🖨 打印单据</Button>
                <Button variant="outline" size="sm" className="bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white" onClick={() => { setIsViewModalOpen(false); handleEdit(viewingItem); }}>✎ 编辑</Button>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-lg p-5">
                <h5 className="text-amber-500 text-xs font-semibold tracking-wider mb-4 flex justify-between items-center">
                  基础字段
                </h5>
                <div className="grid grid-cols-[130px_1fr] gap-y-3 gap-x-4 text-sm">
                  <div className="text-slate-500">编号</div><div className="text-slate-200">{viewingItem.code}</div>
                  <div className="text-slate-500">项目名称</div><div className="text-slate-200 font-medium">{viewingItem.projectName}</div>
                  <div className="text-slate-500">预计合同额(万)</div><div className="text-amber-400 font-mono">{viewingItem.estimatedAmount?.toLocaleString()}</div>
                  <div className="text-slate-500">行业</div><div className="text-slate-200">{viewingItem.industry || '—'}</div>
                  <div className="text-slate-500">区域</div><div className="text-slate-200">{viewingItem.region || '—'}</div>
                  <div className="text-slate-500">联系人</div><div className="text-slate-200">{viewingItem.contact || '—'}</div>
                  <div className="text-slate-500">评审结果</div><div className="text-slate-200">{viewingItem.reviewResult || '—'}</div>
                  <div className="text-slate-500">战略特征</div><div className="text-slate-200">{viewingItem.strategicFeatures || '—'}</div>
                  <div className="text-slate-500">状态</div><div className="text-slate-200">{viewingItem.status}</div>
                  <div className="text-slate-500">创建日期</div><div className="text-slate-200">{viewingItem.createDate}</div>
                  <div className="text-slate-500">变更次数</div><div className="text-slate-200">{viewingItem.changeCount}</div>
                  <div className="text-slate-500">项目等级</div><div className="text-slate-200">{viewingItem.projectLevel}</div>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-lg p-5">
                <h5 className="text-amber-500 text-xs font-semibold tracking-wider mb-4">
                  ↗ 关联记录（外键引用）
                </h5>
                <div className="space-y-3 text-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="text-slate-500 w-32">业主单位：</span>
                    <button className="bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500 hover:text-slate-900 px-2 py-1 rounded text-xs inline-flex items-center transition-colors">
                      ↗ 关联单位 · {viewingItem.ownerName || viewingItem.ownerId || '—'}
                    </button>
                  </div>
                  {viewingItem.projectLevelId && (
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <span className="text-slate-500 w-32">项目分级记录：</span>
                      <button className="bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500 hover:text-slate-900 px-2 py-1 rounded text-xs inline-flex items-center transition-colors">
                        ↗ 项目分级 · {viewingItem.projectLevelId}
                      </button>
                    </div>
                  )}
                  {viewingItem.preReviewId && (
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <span className="text-slate-500 w-32">投标前复盘：</span>
                      <button className="bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500 hover:text-slate-900 px-2 py-1 rounded text-xs inline-flex items-center transition-colors">
                        ↗ 投标前复盘 · {viewingItem.preReviewId}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-lg p-5">
                <h5 className="text-amber-500 text-xs font-semibold tracking-wider mb-4">
                  ★ 项目全景
                </h5>
                <Button className="bg-amber-500 hover:bg-amber-400 text-slate-900 text-xs w-auto">
                  📊 查看完整生命周期
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
