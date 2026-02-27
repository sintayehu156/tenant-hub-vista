import { 
  Property, Building, Unit, Tenant, Lease, Invoice, 
  Payment, MaintenanceRequest, Vendor, Document, 
  Notification, AuditLog, User 
} from '../types';
import { supabase } from './supabase';
import { apiService } from './api';

/**
 * ApiClient refactored to use Supabase instead of a mock/proxy.
 * This provides the frontend with a direct, secure interface to the persistence layer.
 */
class ApiClient {
  
  // User Profile
  async getCurrentUser(): Promise<User | null> {
    const { data, error } = await apiService.auth.me();
    if (error) return null;
    return data as unknown as User;
  }

  // Properties & Buildings
  async getProperties(): Promise<Property[]> {
    const { data, error } = await apiService.properties.getAll();
    return (data || []) as Property[];
  }

  async addProperty(property: Omit<Property, 'id' | 'createdAt'>): Promise<Property | null> {
    const { data, error } = await apiService.properties.create(property);
    return data as Property;
  }

  // Units
  async getUnits(): Promise<Unit[]> {
    const { data, error } = await apiService.units.getAll();
    return (data || []) as Unit[];
  }

  // Maintenance Requests
  async getMaintenanceRequests(): Promise<MaintenanceRequest[]> {
    const { data, error } = await apiService.maintenance.getAll();
    return (data || []) as MaintenanceRequest[];
  }

  async createMaintenanceRequest(req: any): Promise<MaintenanceRequest | null> {
    const { data, error } = await apiService.maintenance.create(req);
    return data as MaintenanceRequest;
  }

  async updateMaintenanceStatus(id: string, status: string): Promise<void> {
    await apiService.maintenance.updateStatus(id, status);
  }

  // Invoices & Financials
  async getInvoices(): Promise<Invoice[]> {
    const { data, error } = await apiService.invoices.getAll();
    return (data || []) as Invoice[];
  }

  async getPayments(): Promise<Payment[]> {
    const { data, error } = await apiService.payments.getAll();
    return (data || []) as Payment[];
  }

  async processPayment(payment: any): Promise<Payment | null> {
    const { data, error } = await apiService.payments.create(payment);
    return data as Payment;
  }

  // Documents
  async getDocuments(orgId: string): Promise<Document[]> {
    const { data, error } = await apiService.documents.getAll(orgId);
    return (data || []) as Document[];
  }

  // Real-time Subscription Helper
  subscribeToUpdates(table: string, callback: (payload: any) => void) {
    return supabase
      .channel(`public:${table}`)
      .on('postgres_changes', { event: '*', schema: 'public', table }, callback)
      .subscribe();
  }
}

export const api = new ApiClient();