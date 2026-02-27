export type Organization = {
  id: string;
  name: string;
  logo?: string;
  address: string;
  taxId?: string;
  createdAt: string;
};

export type Property = {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  image: string;
  ownerId: string;
  organizationId: string;
  totalUnits: number;
  availableUnits: number;
  createdAt: string;
};

export type Building = {
  id: string;
  propertyId: string;
  name: string;
  floors: number;
  totalUnits: number;
  createdAt: string;
};

export type Unit = {
  id: string;
  buildingId: string;
  propertyId: string;
  unitNumber: string;
  type: 'studio' | '1br' | '2br' | '3br' | 'penthouse';
  status: 'available' | 'occupied' | 'maintenance' | 'reserved';
  rent: number;
  squareFootage: number;
  tenantId?: string;
  createdAt: string;
};

export type Tenant = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  unitId?: string;
  leaseId?: string;
  balance: number;
  createdAt: string;
};

export type Lease = {
  id: string;
  unitId: string;
  tenantId: string;
  startDate: string;
  endDate: string;
  rentAmount: number;
  depositAmount: number;
  status: 'active' | 'pending' | 'expired' | 'terminated';
  documentUrl?: string;
  createdAt: string;
};

export type Invoice = {
  id: string;
  tenantId: string;
  leaseId: string;
  amount: number;
  type: 'rent' | 'utility' | 'maintenance' | 'other';
  status: 'paid' | 'unpaid' | 'overdue' | 'void';
  dueDate: string;
  paidDate?: string;
  createdAt: string;
};

export type Payment = {
  id: string;
  invoiceId: string;
  tenantId: string;
  amount: number;
  method: 'credit_card' | 'bank_transfer' | 'check' | 'cash';
  status: 'completed' | 'pending' | 'failed';
  date: string;
  createdAt: string;
};

export type MaintenanceRequest = {
  id: string;
  unitId: string;
  tenantId: string;
  propertyId: string;
  category: 'plumbing' | 'electrical' | 'hvac' | 'appliance' | 'structural' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'new' | 'in_progress' | 'scheduled' | 'completed' | 'cancelled';
  title: string;
  description: string;
  images?: string[];
  vendorId?: string;
  scheduledAt?: string;
  completedAt?: string;
  createdAt: string;
};

export type Vendor = {
  id: string;
  name: string;
  specialty: string;
  email: string;
  phone: string;
  rating: number;
  createdAt: string;
};

export type Document = {
  id: string;
  name: string;
  url: string;
  type: 'lease' | 'insurance' | 'tax' | 'receipt' | 'other';
  relatedId: string; // Tenant, Property, or Lease ID
  uploadedBy: string;
  createdAt: string;
};

export type Notification = {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
};

export type AuditLog = {
  id: string;
  userId: string;
  action: string;
  details: string;
  entityType: string;
  entityId: string;
  createdAt: string;
};

export type UserRole = 'owner' | 'manager' | 'tenant';

export type User = {
  id: string;
  email: string;
  role: UserRole;
  profile: Tenant | { id: string; firstName: string; lastName: string; avatar?: string; organizationId: string };
};