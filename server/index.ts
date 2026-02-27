import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { PropertyModel, UnitModel, MaintenanceRequestModel, InvoiceModel, UserModel } from './models';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// --- MOCK AUTH MIDDLEWARE ---
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET || 'secret', (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// --- API ROUTES (RESTful) ---

/**
 * @route   GET /api/properties
 * @desc    Get all properties for the organization
 * @access  Private
 */
app.get('/api/properties', authenticateToken, async (req: any, res) => {
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

// --- ERPNext Integration Mock Endpoints ---
/**
 * These endpoints are designed for high interoperability, allowing external systems 
 * like ERPNext to sync financial data or property status.
 */
app.get('/api/v1/sync/finance', authenticateToken, async (req, res) => {
  // Logic to export data in a format ERPNext expects (e.g., JSON Schema specific to ERPNext API)
  const invoices = await InvoiceModel.find({ status: 'paid' });
  res.json({
    external_system: 'ERPNext',
    sync_date: new Date(),
    records: invoices.map(inv => ({
      naming_series: 'ACC-INV-.YYYY.-',
      posting_date: inv.updatedAt,
      customer: inv.tenantId,
      amount: inv.amount,
      status: 'Paid'
    }))
  });
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