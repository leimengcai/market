import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, Flag, Database, ListFilter, FileCheck, Search, Menu, Building2,
  Target, UserCheck, CircleDollarSign, BookOpen, Award, ArrowLeftRight, BarChart3, Box
} from 'lucide-react';
import { Dashboard } from './views/Dashboard';
import { ProjectLevel } from './views/ProjectLevel';
import { PostBidReview } from './views/PostBidReview';
import { PreBidReview } from './views/PreBidReview';
import { KnowledgeBase } from './views/KnowledgeBase';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navSections = [
    {
      title: '概览',
      items: [
        { id: 'dashboard', name: '驾驶舱总览', icon: LayoutDashboard },
      ]
    },
    {
      title: '市场管理',
      items: [
        { id: 'partner', name: '关联单位台账', icon: Users },
        { id: 'market-info', name: '市场信息评审与跟踪', icon: Target },
        { id: 'level', name: '项目分级管理', icon: ListFilter },
        { id: 'pre-review', name: '投标前复盘', icon: Box },
      ]
    },
    {
      title: '投标管理',
      items: [
        { id: 'prequal', name: '资格预审', icon: UserCheck },
        { id: 'doc-review', name: '招标文件评审', icon: FileCheck },
        { id: 'bond-pay', name: '投标保证金支付', icon: CircleDollarSign },
        { id: 'bid-review', name: '投标立项与标书评审', icon: BookOpen },
        { id: 'bid-result', name: '投标结果与通知书', icon: Award },
        { id: 'post-review', name: '投标后复盘', icon: Flag, badge: 1 },
        { id: 'bond-return', name: '保证金退回管理', icon: ArrowLeftRight },
      ]
    },
    {
      title: '数据中心',
      items: [
        { id: 'reports', name: '复盘报表与分析', icon: BarChart3 },
        { id: 'knowledge', name: '数据与知识库沉淀', icon: Database },
      ]
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'level': return <ProjectLevel />;
      case 'post-review': return <PostBidReview />;
      case 'pre-review': return <PreBidReview />;
      case 'knowledge': return <KnowledgeBase />;
      default: return (
        <div className="flex h-full items-center justify-center text-slate-500 flex-col gap-4 animate-in fade-in duration-500">
          <Box className="h-12 w-12 text-slate-300" />
          <div className="text-xl font-medium">功能开发中 (WIP)</div>
          <p className="text-sm">这是一个占位页面，该功能菜单正在开发中。</p>
        </div>
      );
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 flex-col border-r border-slate-200 bg-white">
        <div className="flex h-16 items-center px-6 border-b border-slate-200">
          <div className="flex items-center gap-2 font-bold text-lg text-blue-800">
            <Building2 className="h-6 w-6 text-blue-600" />
            <span>业务中心</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-4">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-3">核心应用演示版</div>
            <div className="space-y-4">
              {navSections.map((section, idx) => (
                <div key={idx} className="space-y-1">
                   {section.title !== '概览' && <div className="px-3 text-[11px] font-medium text-slate-400 mb-1 mt-2">{section.title}</div>}
                   {section.items.map(item => (
                     <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center justify-start gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                          activeTab === item.id 
                            ? 'bg-blue-50 text-blue-700' 
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.name}
                        {"badge" in item && (
                          <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">{item.badge}</span>
                        )}
                      </button>
                   ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm">
              领
            </div>
            <div className="text-sm">
              <p className="font-medium">领导视图演示</p>
              <p className="text-xs text-slate-500">管理员权限</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header - Mobile */}
        <header className="md:hidden flex items-center justify-between h-16 px-4 bg-white border-b border-slate-200">
          <div className="flex items-center gap-2 font-bold text-blue-800">
             <Building2 className="h-5 w-5 text-blue-600" />
             <span>业务中心</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 -mr-2 text-slate-600">
            <Menu className="h-6 w-6" />
          </button>
        </header>

        {/* Global Toolbar */}
        <header className="hidden md:flex h-16 items-center justify-between px-6 bg-white border-b border-slate-200 shrink-0">
           <div className="flex items-center gap-4 flex-1">
             <div className="relative w-96">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="全局搜索项目名称、客户或对手..." 
                  className="h-9 w-full rounded-md border border-slate-200 bg-slate-50 pl-9 pr-4 text-sm outline-none focus:border-blue-500 focus:bg-white"
                />
             </div>
           </div>
           <div className="flex items-center gap-4 text-sm font-medium text-slate-600">
             <span>2026-05-02</span>
           </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>

      {/* Mobile Drawer (simplified toggle) */}
      {isMobileMenuOpen && (
        <div className="absolute inset-0 bg-white z-50 p-4 md:hidden">
          <div className="flex justify-end mb-4">
             <button onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2 bg-slate-100 rounded-md">关闭</button>
          </div>
          <div className="space-y-4">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2">核心应用演示版</div>
            {navSections.map((section, idx) => (
              <div key={idx} className="space-y-1">
                {section.title !== '概览' && <div className="px-4 text-[11px] font-medium text-slate-400 mb-1 mt-2">{section.title}</div>}
                {section.items.map(item => (
                  <button
                    key={item.id}
                    onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                    className={`w-full flex items-center justify-start gap-3 rounded-md px-4 py-3 text-sm font-medium transition-colors ${
                      activeTab === item.id 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                    {"badge" in item && (
                      <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">{item.badge}</span>
                    )}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

