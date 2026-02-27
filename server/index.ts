import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { PropertyModel, UnitModel, MaintenanceRequestModel, InvoiceModel, UserModel } from './models';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Supabase Admin for verifying tokens and handling role/user lookups
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

app.use(cors());
app.use(express.json());

// --- SUPABASE AUTH MIDDLEWARE ---
const authenticateToken = async (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
    
    if (error || !user) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    // Fetch user profile from Supabase profiles table for role/orgId
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('role, org_id')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      return res.status(403).json({ message: 'User profile not found' });
    }

    // Attach user, role, and orgId to request
    req.user = {
      id: user.id,
      email: user.email,
      role: profile.role,
      orgId: profile.org_id
    };
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ message: 'Authentication error' });
  }
};

// --- AUTHORIZATION MIDDLEWARE (RBAC) ---
const checkRole = (roles: string[]) => {
  return (req: any, res: any, next: any) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }
    next();
  };
};

// --- API ROUTES (RESTful) ---

/**
 * @route   GET /api/properties
 * @desc    Get all properties for the organization
 * @access  Private (Owner, Manager, Staff)
 */
app.get('/api/properties', authenticateToken, checkRole(['owner', 'manager', 'staff']), async (req: any, res) => {
  try {
    const properties = await PropertyModel.find({ orgId: req.user.orgId });
    res.json(properties);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   POST /api/maintenance
 * @desc    Create a new maintenance request
 * @access  Private (Tenant/Manager)
 */
app.post('/api/maintenance', authenticateToken, async (req: any, res) => {
  try {
    const newRequest = new MaintenanceRequestModel({
      ...req.body,
      tenantId: req.user.role === 'tenant' ? req.user.id : req.body.tenantId,
    });
    const saved = await newRequest.save();
    res.status(201).json(saved);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @route   GET /api/invoices
 * @desc    Get invoices for the current user/tenant
 * @access  Private
 */
app.get('/api/invoices', authenticateToken, async (req: any, res) => {
  try {
    const query = req.user.role === 'tenant' ? { tenantId: req.user.id } : { orgId: req.user.orgId };
    const invoices = await InvoiceModel.find(query).sort({ dueDate: -1 });
    res.json(invoices);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Database Connection
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});