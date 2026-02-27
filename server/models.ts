import { Schema, model, Document, Types } from 'mongoose';

// --- SHARED ---
const AddressSchema = new Schema({
  street: String,
  city: String,
  state: String,
  zip: String,
  country: String,
});

// --- MODELS ---

// 1. Organization
const OrganizationSchema = new Schema({
  name: { type: String, required: true },
  logo: String,
  address: AddressSchema,
  subscription: { type: String, enum: ['basic', 'pro', 'enterprise'], default: 'basic' },
}, { timestamps: true });

// 2. User (aligned with Role-Based Access)
const UserSchema = new Schema({
  orgId: { type: Types.ObjectId, ref: 'Organization', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'manager', 'staff', 'tenant', 'vendor'], required: true },
  avatar: String,
  phone: String,
}, { timestamps: true });

// 3. Property
const PropertySchema = new Schema({
  orgId: { type: Types.ObjectId, ref: 'Organization', required: true },
  name: { type: String, required: true },
  address: AddressSchema,
  type: { type: String, enum: ['residential', 'commercial', 'industrial', 'mixed'], required: true },
  image: String,
  description: String,
}, { timestamps: true });

// 4. Building
const BuildingSchema = new Schema({
  propertyId: { type: Types.ObjectId, ref: 'Property', required: true },
  name: { type: String, required: true },
  floors: Number,
  unitsCount: Number,
}, { timestamps: true });

// 5. Unit
const UnitSchema = new Schema({
  buildingId: { type: Types.ObjectId, ref: 'Building', required: true },
  unitNumber: { type: String, required: true },
  floor: Number,
  type: { type: String, enum: ['studio', '1br', '2br', '3br', 'commercial'], required: true },
  rentAmount: { type: Number, required: true },
  status: { type: String, enum: ['vacant', 'occupied', 'maintenance', 'reserved'], default: 'vacant' },
  size: Number,
}, { timestamps: true });

// 6. Tenant
const TenantSchema = new Schema({
  userId: { type: Types.ObjectId, ref: 'User', required: true },
  orgId: { type: Types.ObjectId, ref: 'Organization', required: true },
  unitId: { type: Types.ObjectId, ref: 'Unit' },
  leaseId: { type: Types.ObjectId, ref: 'Lease' },
  status: { type: String, enum: ['active', 'former', 'pending'], default: 'pending' },
  moveInDate: Date,
  moveOutDate: Date,
}, { timestamps: true });

// 7. Lease
const LeaseSchema = new Schema({
  tenantId: { type: Types.ObjectId, ref: 'Tenant', required: true },
  unitId: { type: Types.ObjectId, ref: 'Unit', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  rentAmount: { type: Number, required: true },
  depositAmount: { type: Number, required: true },
  status: { type: String, enum: ['active', 'pending', 'expired', 'terminated'], default: 'pending' },
  terms: String,
}, { timestamps: true });

// 8. Invoice
const InvoiceSchema = new Schema({
  leaseId: { type: Types.ObjectId, ref: 'Lease', required: true },
  tenantId: { type: Types.ObjectId, ref: 'Tenant', required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['unpaid', 'paid', 'overdue', 'void'], default: 'unpaid' },
  type: { type: String, enum: ['rent', 'utility', 'maintenance', 'deposit', 'other'], default: 'rent' },
  description: String,
}, { timestamps: true });

// 9. Payment
const PaymentSchema = new Schema({
  invoiceId: { type: Types.ObjectId, ref: 'Invoice', required: true },
  tenantId: { type: Types.ObjectId, ref: 'Tenant', required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  method: { type: String, enum: ['bank_transfer', 'credit_card', 'cash', 'check'], required: true },
  status: { type: String, enum: ['completed', 'pending', 'failed'], default: 'completed' },
  transactionId: String,
}, { timestamps: true });

// 10. Maintenance Request
const MaintenanceRequestSchema = new Schema({
  unitId: { type: Types.ObjectId, ref: 'Unit', required: true },
  tenantId: { type: Types.ObjectId, ref: 'Tenant', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: ['plumbing', 'electrical', 'hvac', 'appliance', 'structural', 'other'], required: true },
  priority: { type: String, enum: ['low', 'medium', 'high', 'emergency'], required: true },
  status: { type: String, enum: ['open', 'assigned', 'in_progress', 'resolved', 'closed'], default: 'open' },
  assignedVendorId: { type: Types.ObjectId, ref: 'Vendor' },
  images: [String],
  resolvedAt: Date,
}, { timestamps: true });

// 11. Vendor
const VendorSchema = new Schema({
  orgId: { type: Types.ObjectId, ref: 'Organization', required: true },
  name: { type: String, required: true },
  category: String,
  contactName: String,
  email: String,
  phone: String,
  rating: { type: Number, default: 0 },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, { timestamps: true });

// Export Models
export const OrganizationModel = model('Organization', OrganizationSchema);
export const UserModel = model('User', UserSchema);
export const PropertyModel = model('Property', PropertySchema);
export const BuildingModel = model('Building', BuildingSchema);
export const UnitModel = model('Unit', UnitSchema);
export const TenantModel = model('Tenant', TenantSchema);
export const LeaseModel = model('Lease', LeaseSchema);
export const InvoiceModel = model('Invoice', InvoiceSchema);
export const PaymentModel = model('Payment', PaymentSchema);
export const MaintenanceRequestModel = model('MaintenanceRequest', MaintenanceRequestSchema);
export const VendorModel = model('Vendor', VendorSchema);