import React from 'react';
import { 
  LayoutDashboard, 
  Wrench, 
  CreditCard, 
  FileText, 
  User, 
  Building2, 
  BarChart3, 
  Users, 
  LogOut,
  ArrowLeftRight,
  X
} from 'lucide-react';
import { Role } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  role: Role;
  onToggleRole: () => void;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, role, onToggleRole, onClose }) => {
  const tenantItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'profile', label: 'My Account', icon: User },
  ];

  const managerItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'portfolio', label: 'Portfolio', icon: Building2 },
    { id: 'financials', label: 'Financials', icon: BarChart3 },
    { id: 'maintenance', label: 'Operations', icon: Wrench },
    { id: 'users', label: 'Tenants', icon: Users },
    { id: 'profile', label: 'Settings', icon: User },
  ];

  const menuItems = role === 'tenant' ? tenantItems : managerItems;

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    if (onClose) onClose();
  };

  return (
    <aside className="w-full lg:w-72 bg-white border-r border-slate-200 flex flex-col h-full overflow-y-auto">
      <div className="p-6 lg:p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shrink-0">
              <Building2 size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight leading-tight">PropStream</h2>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Enterprise SaaS</p>
            </div>
          </div>
          {onClose && (
            <button 
              onClick={onClose}
              className="lg:hidden p-2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={20} />
            </button>
          )}
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                activeTab === item.id
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <item.icon size={20} className={activeTab === item.id ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'} />
              <span className="font-medium">{item.label}</span>
              {activeTab === item.id && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600" />
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-slate-100">
        <div className="bg-slate-50 rounded-xl p-4 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-xs font-semibold text-slate-500 uppercase">System Status: Online</span>
          </div>
          <button 
            onClick={onToggleRole}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors shadow-sm"
          >
            <ArrowLeftRight size={14} />
            Switch to {role === 'tenant' ? 'Manager' : 'Tenant'}
          </button>
        </div>
        
        <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-600 transition-colors">
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};