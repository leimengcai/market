import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Download, Search, Edit, Trash2, Eye } from 'lucide-react';

const mockPartners = [
  {id:"P001", code:"PA-001", name:"扬子石化", type:"业主", industry:"石化", region:"华东", contact:"刘总", phone:"138****1234", dealCount:8, status:"合作中"},
  {id:"P002", code:"PA-002", name:"云港石化", type:"业主", industry:"石化", region:"华东", contact:"周总", phone:"139****5678", dealCount:2, status:"合作中"},
  {id:"P003", code:"PA-003", name:"江苏东方机械", type:"分包方", industry:"机械", region:"华东", contact:"吴总", phone:"137****9012", dealCount:15, status:"合作中"},
  {id:"P004", code:"PA-004", name:"中海石油", type:"业主", industry:"石化", region:"华南", contact:"林总", phone:"136****3456", dealCount:5, status:"合作中"},
  {id:"P005", code:"PA-005", name:"中石化炼化工程", type:"竞争对手", industry:"炼化", region:"华北", contact:"—", phone:"—", dealCount:0, status:"对手"},
  {id:"P006", code:"PA-006", name:"宁夏宝丰能源", type:"业主", industry:"能源", region:"西北", contact:"马总", phone:"135****7890", dealCount:3, status:"合作中"},
];

export function PartnerDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');

  const filteredPartners = mockPartners.filter(p => {
    const matchesSearch = JSON.stringify(p).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType ? p.type === filterType : true;
    return matchesSearch && matchesType;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case '合作中':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">{status}</Badge>;
      case '对手':
        return <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200">{status}</Badge>;
      case '暂停':
      case '终止':
        return <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">{status}</Badge>;
      default:
        return <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case '业主':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">{type}</Badge>;
      case '分包方':
      case '供应商':
      case '合作方':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">{type}</Badge>;
      case '竞争对手':
        return <Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-300">{type}</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">关联单位台账</h2>
          <p className="text-slate-500 mt-1">市场管理 · 所有业务往来单位的统一全景视图。</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="text-slate-600">
            <Download className="h-4 w-4 mr-2" />
            导出 CSV
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="h-4 w-4 mr-2" />
            新增记录
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
                  placeholder="搜索单位名称/编号/联系人..." 
                  className="pl-9 bg-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select 
                className="h-9 rounded-md border border-slate-200 bg-white px-3 py-1 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="">所有类型</option>
                <option value="业主">业主</option>
                <option value="分包方">分包方</option>
                <option value="供应商">供应商</option>
                <option value="合作方">合作方</option>
                <option value="竞争对手">竞争对手</option>
              </select>
            </div>
            <div className="text-sm text-slate-500 font-medium whitespace-nowrap">
              共发现 <span className="text-indigo-600 font-bold">{filteredPartners.length}</span> 条记录
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-slate-500 bg-slate-50/50 border-b border-slate-100">
                <tr>
                  <th className="px-4 py-3 font-medium w-12 text-center">#</th>
                  <th className="px-4 py-3 font-medium">编号</th>
                  <th className="px-4 py-3 font-medium">单位名称</th>
                  <th className="px-4 py-3 font-medium">类型</th>
                  <th className="px-4 py-3 font-medium">行业 / 区域</th>
                  <th className="px-4 py-3 font-medium">联系人 (电话)</th>
                  <th className="px-4 py-3 font-medium">合作</th>
                  <th className="px-4 py-3 font-medium">状态</th>
                  <th className="px-4 py-3 font-medium text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPartners.length > 0 ? filteredPartners.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3 text-center text-slate-400">{index + 1}</td>
                    <td className="px-4 py-3 text-slate-500 font-mono text-xs">{item.code}</td>
                    <td className="px-4 py-3 font-bold text-slate-900">{item.name}</td>
                    <td className="px-4 py-3">{getTypeBadge(item.type)}</td>
                    <td className="px-4 py-3 text-slate-600">{item.industry} / <span className="text-slate-500">{item.region}</span></td>
                    <td className="px-4 py-3">
                      <div className="text-slate-700">{item.contact}</div>
                      <div className="text-xs text-slate-400">{item.phone}</div>
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-700">{item.dealCount} <span className="text-xs text-slate-400 font-normal">次</span></td>
                    <td className="px-4 py-3">{getStatusBadge(item.status)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-amber-600 hover:bg-amber-50">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-rose-600 hover:bg-rose-50">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={9} className="px-4 py-12 text-center text-slate-500">
                      无符合条件的关联单位。
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
