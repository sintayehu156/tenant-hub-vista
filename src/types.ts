export type Role = 'admin' | 'manager' | 'staff' | 'tenant' | 'vendor';

export interface User {
  id: string;
  orgId: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  phone?: string;
  createdAt: string;
}

export interface Organization {
  id: string;
  name: string;
  logo?: string;
  address: string;
  subscription: 'basic' | 'pro' | 'enterprise';
}

export interface Property {
  id: string;
  orgId: string;
  name: string;
  address: string;
  type: 'residential' | 'commercial' | 'industrial' | 'mixed';
  image: string;
  description?: string;
}

export interface Building {
  id: string;
  propertyId: string;
  name: string;
  floors: number;
  unitsCount: number;
}

export interface Unit {
  id: string;
  buildingId: string;
  unitNumber: string;
  floor: number;
  type: 'studio' | '1br' | '2br' | '3br' | 'commercial';
  rentAmount: number;
  status: 'vacant' | 'occupied' | 'maintenance' | 'reserved';
  size?: number; // in sq ft
}

export interface Tenant {
  id: string;
  userId: string;
  orgId: string;
  unitId: string;
  leaseId?: string;
  status: 'active' | 'former' | 'pending';
  moveInDate: string;
  moveOutDate?: string;
}

export interface Lease {
  id: string;
  tenantId: string;
  unitId: string;
  startDate: string;
  endDate: string;
  rentAmount: number;
  depositAmount: number;
  status: 'active' | 'pending' | 'expired' | 'terminated';
  terms?: string;
}

export interface Invoice {
  id: string;
  leaseId: string;
  tenantId: string;
  amount: number;
  dueDate: string;
  status: 'unpaid' | 'paid' | 'overdue' | 'void';
  type: 'rent' | 'utility' | 'maintenance' | 'deposit' | 'other';
  description?: string;
}

export interface Payment {
  id: string;
  invoiceId: string;
  tenantId: string;
  amount: number;
  date: string;
  method: 'bank_transfer' | 'credit_card' | 'cash' | 'check';
  status: 'completed' | 'pending' | 'failed';
  transactionId?: string;
}

export interface MaintenanceRequest {
  id: string;
  unitId: string;
  tenantId: string;
  title: string;
  description: string;
  category: 'plumbing' | 'electrical' | 'hvac' | 'appliance' | 'structural' | 'other';
  priority: 'low' | 'medium' | 'high' | 'emergency';
  status: 'open' | 'assigned' | 'in_progress' | 'resolved' | 'closed';
  assignedVendorId?: string;
  createdAt: string;
  resolvedAt?: string;
  images?: string[];
}

export interface Vendor {
  id: string;
  orgId: string;
  name: string;
  category: string;
  contactName: string;
  email: string;
  phone: string;
  rating: number;
  status: 'active' | 'inactive';
}

export interface Document {
  id: string;
  orgId: string;
  userId?: string;
  propertyId?: string;
  unitId?: string;
  leaseId?: string;
  title: string;
  url: string;
  type: 'lease_agreement' | 'invoice' | 'id_proof' | 'maintenance_report' | 'other';
  uploadedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  content: string;
  type: 'info' | 'warning' | 'success' | 'alert';
  read: boolean;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  metadata?: any;
  timestamp: string;
}