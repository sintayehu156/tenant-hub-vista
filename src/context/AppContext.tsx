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
  updateUserRole: (role: 'owner' | 'manager' | 'tenant') => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user: authUser, role, loading: authLoading } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [maintenanceRequests, setMaintenanceRequests] = useState<MaintenanceRequest[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!authUser) return;
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
      toast.error('Failed to load data from server');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && authUser) {
      fetchData();
    } else if (!authLoading && !authUser) {
      setLoading(false);
    }
  }, [authUser, authLoading]);

  const updateUserRole = (role: 'owner' | 'manager' | 'tenant') => {
    // Note: In a real Supabase app, role is managed in the profiles table.
    // This function can be kept for UI toggling if needed, but the true role is from AuthContext.
    toast.info(`View switched to ${role} (UI simulation)`);
  };

  const appUser: User | null = authUser ? {
    id: authUser.id,
    email: authUser.email || '',
    role: (role as any) || 'tenant',
    profile: {
      id: authUser.id,
      firstName: authUser.user_metadata?.first_name || 'User',
      lastName: authUser.user_metadata?.last_name || '',
      organizationId: authUser.user_metadata?.org_id || ''
    }
  } : null;

  return (
    <AppContext.Provider value={{ 
      user: appUser, 
      properties, 
      maintenanceRequests, 
      invoices, 
      loading: loading || authLoading, 
      refreshData: fetchData,
      updateUserRole
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