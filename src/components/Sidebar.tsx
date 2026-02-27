import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Building2, 
  Wrench, 
  CreditCard, 
  FileText, 
  UserCircle, 
  LogOut, 
  Menu, 
  X,
  Settings,
  Bell
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { cn } from '../lib/utils';
import { Button } from './ui/button';

interface SidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentTab, onTabChange }) => {
  const { user, updateUserRole } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const isManager = user?.role === 'manager' || user?.role === 'owner';

  const menuItems = isManager ? [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'portfolio', label: 'Portfolio', icon: Building2 },
    { id: 'maintenance', label: 'Operations', icon: Wrench },
    { id: 'financials', label: 'Financials', icon: CreditCard },
    { id: 'documents', label: 'Repository', icon: FileText },
  ] : [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench },
    { id: 'documents', label: 'Documents', icon: FileText },
  ];

  const handleNavClick = (id: string) => {
    onTabChange(id);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="icon" onClick={() => setIsOpen(!isOpen)} className="bg-white shadow-md">
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col h-screen",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Building2 className="text-white" size={20} />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-800">PropStack</span>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                  currentTab === item.id
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 mt-auto border-t border-slate-100">
          <div className="flex items-center gap-3 mb-6 p-2 rounded-lg bg-slate-50">
            <div className="relative">
              <img 
                src={user?.profile?.avatar} 
                className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover" 
                alt="Profile" 
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">
                {user?.profile?.firstName} {user?.profile?.lastName}
              </p>
              <p className="text-xs text-slate-500 truncate capitalize">{user?.role}</p>
            </div>
          </div>

          <div className="space-y-1">
            <button 
              onClick={() => onTabChange('profile')}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg"
            >
              <UserCircle size={18} />
              Profile Settings
            </button>
            <button 
              onClick={() => updateUserRole(user?.role === 'manager' ? 'tenant' : 'manager')}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg"
            >
              <Settings size={18} />
              Switch to {user?.role === 'manager' ? 'Tenant' : 'Manager'}
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;