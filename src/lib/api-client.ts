import { 
  Property, Building, Unit, Tenant, Lease, Invoice, 
  Payment, MaintenanceRequest, Vendor, Document, 
  Notification, AuditLog, User 
} from '../types';
import { supabase } from './supabase';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiClient {
  private async getHeaders() {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;
    
    return {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers = await this.getHeaders();
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API Request failed: ${response.status}`);
    }

    return response.json();
  }

  // Initialize data - no longer needed with real backend but keeping for compatibility
  async initialize() {}

  // User
  async getCurrentUser(): Promise<User> {
    return this.request<User>('/user/me');
  }

  // Properties
  async getProperties(): Promise<Property[]> {
    return this.request<Property[]>('/properties');
  }

  async addProperty(property: Omit<Property, 'id' | 'createdAt'>): Promise<Property> {
    return this.request<Property>('/properties', {
      method: 'POST',
      body: JSON.stringify(property),
    });
  }

  // Maintenance
  async getMaintenanceRequests(): Promise<MaintenanceRequest[]> {
    return this.request<MaintenanceRequest[]>('/maintenance');
  }

  async createMaintenanceRequest(req: Omit<MaintenanceRequest, 'id' | 'createdAt'>): Promise<MaintenanceRequest> {
    return this.request<MaintenanceRequest>('/maintenance', {
      method: 'POST',
      body: JSON.stringify(req),
    });
  }

  async updateMaintenanceStatus(id: string, status: MaintenanceRequest['status']): Promise<void> {
    await this.request(`/maintenance/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  // Invoices
  async getInvoices(): Promise<Invoice[]> {
    return this.request<Invoice[]>('/invoices');
  }

  // Payments
  async getPayments(): Promise<Payment[]> {
    return this.request<Payment[]>('/payments');
  }

  async processPayment(payment: Omit<Payment, 'id' | 'createdAt'>): Promise<Payment> {
    return this.request<Payment>('/payments', {
      method: 'POST',
      body: JSON.stringify(payment),
    });
  }
}

export const api = new ApiClient();