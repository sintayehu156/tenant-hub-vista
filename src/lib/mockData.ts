import { 
  User, Property, Unit, Tenant, Lease, Invoice, Payment, 
  MaintenanceRequest, Vendor, Document, Notification 
} from '../types';

export const mockUsers: User[] = [
  {
    id: 'u1', orgId: 'org1', name: 'Alex Thompson', email: 'alex.t@example.com', 
    role: 'tenant', avatar: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/c0d6dedb-b63d-4783-8d54-d7e42f60935e/user-avatar-9ab8231c-1772208890950.webp',
    createdAt: new Date().toISOString()
  },
  {
    id: 'u2', orgId: 'org1', name: 'Sarah Chen', email: 'sarah.c@example.com', 
    role: 'manager', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
    createdAt: new Date().toISOString()
  }
];

export const mockProperties: Property[] = [
  {
    id: 'p1', orgId: 'org1', name: 'Skyline Heights', address: '123 Elevation Way, San Francisco, CA',
    type: 'residential', image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/c0d6dedb-b63d-4783-8d54-d7e42f60935e/modern-property-exterior-eef466c9-1772208890975.webp',
    description: 'Modern luxury apartments in the heart of the city.'
  },
  {
    id: 'p2', orgId: 'org1', name: 'Oakwood Commons', address: '456 Timberline Dr, Austin, TX',
    type: 'residential', image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/c0d6dedb-b63d-4783-8d54-d7e42f60935e/modern-apartment-interior-f1f82cb5-1772208890369.webp',
    description: 'Peaceful garden style living.'
  }
];

export const mockUnits: Unit[] = [
  { id: 'un1', buildingId: 'b1', unitNumber: '402', floor: 4, type: '2br', rentAmount: 2400, status: 'occupied', size: 1100 },
  { id: 'un2', buildingId: 'b1', unitNumber: '101', floor: 1, type: 'studio', rentAmount: 1600, status: 'vacant', size: 600 },
  { id: 'un3', buildingId: 'b2', unitNumber: '12A', floor: 12, type: '3br', rentAmount: 3800, status: 'occupied', size: 1600 }
];

export const mockMaintenance: MaintenanceRequest[] = [
  {
    id: 'm1', unitId: 'un1', tenantId: 'u1', title: 'Leaky Faucet', 
    description: 'The kitchen faucet is dripping constantly.',
    category: 'plumbing', priority: 'medium', status: 'open', createdAt: new Date().toISOString()
  },
  {
    id: 'm2', unitId: 'un3', tenantId: 'u3', title: 'AC Not Cooling', 
    description: 'Thermostat shows 80 degrees but air is not cold.',
    category: 'hvac', priority: 'high', status: 'in_progress', createdAt: new Date().toISOString()
  }
];

export const mockInvoices: Invoice[] = [
  { id: 'i1', leaseId: 'l1', tenantId: 'u1', amount: 2400, dueDate: '2024-06-01', status: 'paid', type: 'rent' },
  { id: 'i2', leaseId: 'l1', tenantId: 'u1', amount: 2400, dueDate: '2024-07-01', status: 'unpaid', type: 'rent' }
];