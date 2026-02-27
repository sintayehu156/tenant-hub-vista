import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ManagerDashboard from './components/ManagerDashboard';
import Maintenance from './components/Maintenance';
import Portfolio from './components/Portfolio';
import Payments from './components/Payments';
import Financials from './components/Financials';
import Documents from './components/Documents';
import Profile from './components/Profile';
import Login from './components/Login';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider, useApp } from './context/AppContext';
import { Toaster } from 'sonner';

const AppContent: React.FC = () => {
  const { user, loading } = useApp();
  const [currentTab, setCurrentTab] = useState('dashboard');

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium">Authenticating...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <Login />
        <Toaster position="top-right" />
      </>
    );
  }

  const renderContent = () => {
    const isManager = user?.role === 'manager' || user?.role === 'owner';

    switch (currentTab) {
      case 'dashboard':
        return isManager ? <ManagerDashboard /> : <Dashboard />;
      case 'portfolio':
        return <Portfolio />;
      case 'maintenance':
        return <Maintenance />;
      case 'financials':
        return <Financials />;
      case 'payments':
        return <Payments />;
      case 'documents':
        return <Documents />;
      case 'profile':
        return <Profile />;
      default:
        return isManager ? <ManagerDashboard /> : <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar currentTab={currentTab} onTabChange={setCurrentTab} />
      <main className="flex-1 overflow-y-auto scroll-smooth">
        {renderContent()}
      </main>
      <Toaster position="top-right" />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;