import { 
  User, Property, Unit, Tenant, Lease, Invoice, Payment, 
  MaintenanceRequest, Vendor, Document, Notification 
} from '../types';

export const mockUsers: User[] = [
  {
    id: 'u1', 
    email: 'alex.t@example.com', 
    role: 'tenant', 
    profile: {
      id: 't1',
      firstName: 'Alex',
      lastName: 'Thompson',
      email: 'alex.t@example.com',
      phone: '555-0101',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
      balance: 0,
      createdAt: new Date().toISOString()
    }
  },
  {
    id: 'u2', 
    email: 'sarah.c@example.com', 
    role: 'manager', 
    profile: {
      id: 'm1',
      firstName: 'Sarah',
      lastName: 'Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      organizationId: 'org1'
    }
  }
];

export const mockProperties: Property[] = [
  {
    id: 'p1', 
    organizationId: 'org1', 
    name: 'Skyline Heights', 
    address: '123 Elevation Way',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94105',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800',
    ownerId: 'u2',
    totalUnits: 50,
    availableUnits: 5,
    createdAt: new Date().toISOString()
  },
  {
    id: 'p2', 
    organizationId: 'org1', 
    name: 'Oakwood Commons', 
    address: '456 Timberline Dr',
    city: 'Austin',
    state: 'TX',
    zipCode: '78701',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    ownerId: 'u2',
    totalUnits: 30,
    availableUnits: 2,
    createdAt: new Date().toISOString()
  }
];

export const mockUnits: Unit[] = [
  { 
    id: 'un1', 
    buildingId: 'b1', 
    propertyId: 'p1',
    unitNumber: '402', 
    type: '2br', 
    rent: 2400, 
    status: 'occupied', 
    squareFootage: 1100,
    createdAt: new Date().toISOString()
  },
  { 
    id: 'un2', 
    buildingId: 'b1', 
    propertyId: 'p1',
    unitNumber: '101', 
    type: 'studio', 
    rent: 1600, 
    status: 'available', 
    squareFootage: 600,
    createdAt: new Date().toISOString()
  }
];

export const mockMaintenance: MaintenanceRequest[] = [
  {
    id: 'm1', 
    unitId: 'un1', 
    tenantId: 'u1', 
    propertyId: 'p1',
    title: 'Leaky Faucet', 
    description: 'The kitchen faucet is dripping constantly.',
    category: 'plumbing', 
    priority: 'medium', 
    status: 'new', 
    createdAt: new Date().toISOString()
  }
];

export const mockInvoices: Invoice[] = [
  { 
    id: 'i1', 
    leaseId: 'l1', 
    tenantId: 'u1', 
    amount: 2400, 
    dueDate: '2024-06-01', 
    status: 'paid', 
    type: 'rent',
    createdAt: new Date().toISOString()
  },
  { 
    id: 'i2', 
    leaseId: 'l1', 
    tenantId: 'u1', 
    amount: 2400, 
    dueDate: '2024-07-01', 
    status: 'unpaid', 
    type: 'rent',
    createdAt: new Date().toISOString()
  }
];

export const mockLeases: Lease[] = [
  {
    id: 'l1',
    unitId: 'un1',
    tenantId: 'u1',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    rentAmount: 2400,
    depositAmount: 2400,
    status: 'active',
    createdAt: new Date().toISOString()
  }
];

export const mockPayments: Payment[] = [
  {
    id: 'pay1',
    invoiceId: 'i1',
    tenantId: 'u1',
    amount: 2400,
    method: 'bank_transfer',
    status: 'completed',
    date: '2024-06-02',
    createdAt: new Date().toISOString()
  }
];