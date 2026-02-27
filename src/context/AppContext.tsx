import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Property, MaintenanceRequest, Invoice } from '../types';
import { api } from '../lib/api-client';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

interface AppState {
  user: User | null;
  properties: Property[];
  maintenanceRequests: MaintenanceRequest[];
  invoices: Invoice[];
  loading: boolean;
  refreshData: () => Promise<void>;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user: authUser, role, loading: authLoading } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [maintenanceRequests, setMaintenanceRequests] = useState<MaintenanceRequest[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!authUser) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const [props, requests, invs] = await Promise.all([
        api.getProperties(),
        api.getMaintenanceRequests(),
        api.getInvoices()
      ]);
      setProperties(props);
      setMaintenanceRequests(requests);
      setInvoices(invs);
    } catch (error) {
      console.error('Data fetch failed:', error);
      toast.error('Failed to load real-time data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      fetchData();
      
      // Setup Real-time Subscriptions if user is logged in
      if (authUser) {
        const maintenanceSub = api.subscribeToUpdates('maintenance_requests', () => {
          fetchData(); // Simplest way: refresh all on change
        });
        
        const invoiceSub = api.subscribeToUpdates('invoices', () => {
          fetchData();
        });

        return () => {
          maintenanceSub.unsubscribe();
          invoiceSub.unsubscribe();
        };
      }
    }
  }, [authUser, authLoading]);

  const appUser: User | null = authUser ? {
    id: authUser.id,
    email: authUser.email,
    role: (role as any) || 'tenant',
    profile: {
      id: authUser.id,
      firstName: authUser.first_name || 'User',
      lastName: authUser.last_name || '',
      organizationId: authUser.org_id || '',
      avatar: authUser.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${authUser.email}`,
      email: authUser.email,
      phone: '',
      balance: 0,
      createdAt: new Date().toISOString()
    }
  } : null;

  return (
    <AppContext.Provider value={{ 
      user: appUser, 
      properties, 
      maintenanceRequests, 
      invoices, 
      loading: loading || authLoading, 
      refreshData: fetchData
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};