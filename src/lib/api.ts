import { supabase } from './supabase';
import { toast } from 'sonner';

export interface ApiResponse<T> {
  data: T | null;
  error?: any;
}

/**
 * API Service layer using Supabase client directly.
 * This refactors the application to use PostgreSQL via Supabase for production.
 */
export const apiService = {
  auth: {
    login: async (credentials: any) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });
      if (error) toast.error(error.message);
      return { data, error };
    },
    logout: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) toast.error(error.message);
      return { error };
    },
    me: async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) return { data: null, error };
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();
        
      return { data: profile, error };
    },
  },

  properties: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('properties')
        .select(`
          *,
          buildings (
            *,
            units (*)
          )
        `);
      if (error) toast.error('Failed to fetch properties');
      return { data, error };
    },
    getById: async (id: string) => {
      const { data, error } = await supabase
        .from('properties')
        .select('*, buildings(*, units(*))')
        .eq('id', id)
        .single();
      return { data, error };
    },
    create: async (property: any) => {
      const { data, error } = await supabase
        .from('properties')
        .insert(property)
        .select()
        .single();
      return { data, error };
    }
  },

  units: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('units')
        .select('*, buildings(property_id, name)');
      return { data, error };
    },
    updateStatus: async (id: string, status: string) => {
      const { data, error } = await supabase
        .from('units')
        .update({ status })
        .eq('id', id)
        .select()
        .single();
      return { data, error };
    }
  },

  maintenance: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('maintenance_requests')
        .select('*, units(*), profiles!tenant_id(*)');
      return { data, error };
    },
    create: async (request: any) => {
      const { data, error } = await supabase
        .from('maintenance_requests')
        .insert(request)
        .select()
        .single();
      return { data, error };
    },
    updateStatus: async (id: string, status: string) => {
      const { data, error } = await supabase
        .from('maintenance_requests')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      return { data, error };
    },
  },

  invoices: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('invoices')
        .select('*, leases(*), profiles!tenant_id(*)');
      return { data, error };
    },
    create: async (invoice: any) => {
      const { data, error } = await supabase
        .from('invoices')
        .insert(invoice)
        .select()
        .single();
      return { data, error };
    }
  },
  
  payments: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('payments')
        .select('*, invoices(*), profiles!tenant_id(*)');
      return { data, error };
    },
    create: async (payment: any) => {
      const { data, error } = await supabase
        .from('payments')
        .insert(payment)
        .select()
        .single();
      return { data, error };
    },
  },

  documents: {
    getAll: async (orgId: string) => {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('org_id', orgId);
      return { data, error };
    },
    upload: async (doc: any) => {
      const { data, error } = await supabase
        .from('documents')
        .insert(doc)
        .select()
        .single();
      return { data, error };
    }
  }
};