import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard as TenantDashboard } from './components/Dashboard';
import { Maintenance as TenantMaintenance } from './components/Maintenance';
import { Payments as TenantPayments } from './components/Payments';
import { Documents as TenantDocuments } from './components/Documents';
import { Profile } from './components/Profile';
import { ManagerDashboard } from './components/ManagerDashboard';
import { Portfolio } from './components/Portfolio';
import { Financials } from './components/Financials';
import { MaintenanceOperations } from './components/MaintenanceOperations';
import { Toaster } from 'sonner';
import { User, Role } from './types';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Bell } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { apiService } from './lib/api';

const queryClient = new QueryClient();

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userRole, setUserRole] = useState<Role>('tenant');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Fetch current user on mount
    apiService.auth.me().then((res: any) => {
      setUser(res.data);
    });
  }, []);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [activeTab, userRole]);

  if (!user) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  // Sync user role with selection for demo purposes
  const currentUser = { ...user, role: userRole };

  const renderContent = () => {
    if (userRole === 'tenant') {
      switch (activeTab) {
        case 'dashboard': return <TenantDashboard />;
        case 'maintenance': return <TenantMaintenance />;
        case 'payments': return <TenantPayments />;
        case 'documents': return <TenantDocuments />;
        case 'profile': return <Profile user={currentUser} />;
        default: return <TenantDashboard />;
      }
    } else {
      switch (activeTab) {
        case 'dashboard': return <ManagerDashboard />;
        case 'portfolio': return <Portfolio />;
        case 'financials': return <Financials />;
        case 'maintenance': return <MaintenanceOperations />;
        case 'profile': return <Profile user={currentUser} />;
        default: return <ManagerDashboard />;
      }
    }
  };

  const handleRoleToggle = () => {
    const newRole = userRole === 'tenant' ? 'manager' : 'tenant';
    setUserRole(newRole as Role);
    setActiveTab('dashboard');
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans relative">
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <div className={`
        fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          role={userRole} 
          onToggleRole={handleRoleToggle}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="sticky top-0 z-30 flex items-center justify-between bg-white/80 backdrop-blur-md px-4 md:px-8 py-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-500 hover:text-slate-900 transition-colors"
            >
              <Menu size={24} />
            </button>
            <div className="min-w-0">
              <h1 className="text-lg md:text-xl font-bold text-slate-900 capitalize leading-tight truncate">
                {activeTab.replace('-', ' ')}
              </h1>
              <p className="text-xs text-slate-500 hidden sm:block truncate">
                Welcome back, {currentUser.name} \u2022 {userRole.toUpperCase()}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              <Bell size={20} />
            </button>
            <div className="flex items-center gap-2 md:gap-3 md:pl-4 md:border-l md:border-slate-200">
              <span className="hidden sm:block text-sm font-semibold text-slate-700">{currentUser.name}</span>
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name} 
                className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-50 cursor-pointer"
                onClick={() => setActiveTab('profile')}
              />
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${userRole}-${activeTab}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
      <Toaster position="top-right" richColors />
    </div>
  );
};

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <AppContent />
  </QueryClientProvider>
);

export default App;