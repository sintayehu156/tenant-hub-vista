import React from 'react';
import { 
  Building2, 
  CreditCard, 
  Wrench, 
  Calendar,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { apiService, ApiResponse } from '../lib/api';
import { Property, MaintenanceRequest, Invoice } from '../types';

export const Dashboard: React.FC = () => {
  const { data: propertiesResponse, isLoading: loadingProperties } = useQuery<ApiResponse<Property[]>>({
    queryKey: ['properties'],
    queryFn: () => apiService.properties.getAll()
  });

  const { data: maintenanceResponse, isLoading: loadingMaintenance } = useQuery<ApiResponse<MaintenanceRequest[]>>({
    queryKey: ['maintenance', 'recent'],
    queryFn: () => apiService.maintenance.getAll({ limit: 3 })
  });

  const { data: invoicesResponse } = useQuery<ApiResponse<Invoice[]>>({
    queryKey: ['invoices'],
    queryFn: () => apiService.invoices.getAll()
  });

  const properties = propertiesResponse?.data || [];
  const maintenance = maintenanceResponse?.data || [];
  const invoices = invoicesResponse?.data || [];

  const stats = [
    { label: 'Current Rent', value: '$2,400', sub: 'Due in 5 days', icon: CreditCard, color: 'bg-blue-500' },
    { label: 'Active Requests', value: maintenance.filter(r => r.status !== 'resolved').length, sub: '1 in progress', icon: Wrench, color: 'bg-amber-500' },
    { label: 'Lease Status', value: 'Active', sub: 'Ends Oct 2024', icon: Calendar, color: 'bg-emerald-500' },
  ];

  if (loadingProperties || loadingMaintenance) return <div className="animate-pulse space-y-4">
    <div className="h-40 bg-slate-200 rounded-xl w-full" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="h-32 bg-slate-200 rounded-xl" />
      <div className="h-32 bg-slate-200 rounded-xl" />
      <div className="h-32 bg-slate-200 rounded-xl" />
    </div>
  </div>;

  const mainProperty = properties[0];

  return (
    <div className="space-y-8">
      <section className="relative h-64 md:h-80 rounded-3xl overflow-hidden group">
        <img 
          src={mainProperty?.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200'} 
          alt="My Home" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 md:p-10">
          <div className="flex items-center gap-2 text-indigo-300 mb-2">
            <Building2 size={18} />
            <span className="text-sm font-semibold uppercase tracking-wider">My Residence</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{mainProperty?.name || 'Skyline Heights'}</h2>
          <p className="text-slate-200 text-sm md:text-base max-w-md">{mainProperty?.address || '123 Elevation Way, San Francisco, CA'}</p>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={stat.label}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.color} text-white`}>
                <stat.icon size={24} />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</span>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
              <p className="text-sm text-slate-500 font-medium">{stat.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Maintenance Requests</h3>
            <button className="text-indigo-600 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              View All <ArrowRight size={16} />
            </button>
          </div>
          <div className="divide-y divide-slate-50">
            {maintenance.map((request) => (
              <div key={request.id} className="p-6 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                  request.status === 'open' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                }`}>
                  {request.status === 'open' ? <Clock size={22} /> : <AlertCircle size={22} />}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-slate-900 truncate">{request.title}</h4>
                  <p className="text-sm text-slate-500">Requested {new Date(request.createdAt).toLocaleDateString()}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
                  request.status === 'open' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {request.status.replace('_', ' ')}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Recent Payments</h3>
            <button className="text-indigo-600 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              History <ArrowRight size={16} />
            </button>
          </div>
          <div className="divide-y divide-slate-50">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 size={22} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">{invoice.type.toUpperCase()} - {new Date(invoice.dueDate).toLocaleString('default', { month: 'long' })}</h4>
                    <p className="text-sm text-slate-500">Paid on {new Date(invoice.dueDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-900">${invoice.amount.toLocaleString()}</div>
                  <div className="text-xs font-bold text-emerald-600 uppercase">Successful</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};