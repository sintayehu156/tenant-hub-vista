import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  Building2, 
  Wrench, 
  TrendingUp, 
  TrendingDown,
  AlertCircle,
  MoreVertical,
  ArrowRight,
  Filter,
  Search
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { apiService, ApiResponse } from '../lib/api';
import { Property, MaintenanceRequest, Unit, Invoice } from '../types';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip 
} from 'recharts';

export const ManagerDashboard: React.FC = () => {
  const { data: propertiesResponse } = useQuery<ApiResponse<Property[]>>({ queryKey: ['properties'], queryFn: () => apiService.properties.getAll() });
  const { data: unitsResponse } = useQuery<ApiResponse<Unit[]>>({ queryKey: ['units'], queryFn: () => apiService.units.getAll() });
  const { data: maintenanceResponse } = useQuery<ApiResponse<MaintenanceRequest[]>>({ queryKey: ['maintenance'], queryFn: () => apiService.maintenance.getAll() });
  const { data: invoicesResponse } = useQuery<ApiResponse<Invoice[]>>({ queryKey: ['invoices'], queryFn: () => apiService.invoices.getAll() });

  const properties = propertiesResponse?.data || [];
  const maintenance = maintenanceResponse?.data || [];

  const chartData = [
    { name: 'Jan', income: 45000 },
    { name: 'Feb', income: 48000 },
    { name: 'Mar', income: 47000 },
    { name: 'Apr', income: 52000 },
    { name: 'May', income: 55000 },
    { name: 'Jun', income: 54000 },
  ];

  const stats = [
    { label: 'Total Revenue', value: '$248,500', change: '+12.5%', isPositive: true, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Occupancy Rate', value: '94.2%', change: '+2.1%', isPositive: true, icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Maintenance', value: maintenance.filter(m => m.status === 'open').length, change: '-4', isPositive: true, icon: Wrench, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Properties', value: properties.length, change: '+1', isPositive: true, icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50' },
  ];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Portfolio Overview</h2>
          <p className="text-slate-500">Real-time performance analytics across 12 properties</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" placeholder="Search property..."
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>
          <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-slate-900 transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={stat.label}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={22} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                {stat.change}
                {stat.isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <BarChart3 size={20} className="text-indigo-600" />
              Revenue Trends
            </h3>
            <select className="text-xs font-bold bg-slate-50 border-none rounded-lg px-3 py-1 outline-none text-slate-500">
              <option>Last 6 Months</option>
              <option>Year to Date</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 600 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 600 }}
                  tickFormatter={(value) => `$${value/1000}k`}
                />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="income" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <AlertCircle size={20} className="text-rose-500" />
              Urgent Attention
            </h3>
            <span className="bg-rose-50 text-rose-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Action Required</span>
          </div>
          <div className="space-y-4">
            {maintenance.filter(m => m.priority === 'high').map((item) => (
              <div key={item.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 group cursor-pointer hover:border-indigo-200 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.category}</span>
                  <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full uppercase">Urgent</span>
                </div>
                <h4 className="font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">{item.title}</h4>
                <p className="text-xs text-slate-500 line-clamp-1 mb-3">{item.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-slate-200/60">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-slate-300 overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" alt="tenant" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-600 uppercase">Unit 402</span>
                  </div>
                  <button className="text-indigo-600 font-bold text-[10px] uppercase flex items-center gap-1">Assign <ArrowRight size={10} /></button>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 text-xs font-bold text-slate-500 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors uppercase tracking-wider">
            View Operations Queue
          </button>
        </section>
      </div>

      <section className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
          <h3 className="font-bold text-slate-900">Property Performance</h3>
          <button className="text-indigo-600 text-sm font-semibold hover:underline">Download Report</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Property</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Occupancy</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Monthly Income</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Growth</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {properties.map((prop) => (
                <tr key={prop.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={prop.image} alt={prop.name} className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <div className="font-bold text-slate-900">{prop.name}</div>
                        <div className="text-xs text-slate-500">{prop.address}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: '92%' }}></div>
                      </div>
                      <span className="text-xs font-bold text-slate-700">92%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">$18,400</div>
                  </td>
                  <td className="px-6 py-4 text-emerald-600 font-bold text-sm">+4.2%</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-slate-600"><MoreVertical size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};