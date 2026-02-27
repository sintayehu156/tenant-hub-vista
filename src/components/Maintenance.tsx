import React, { useState } from 'react';
import { 
  Wrench, 
  Plus, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Image as ImageIcon,
  ChevronRight,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService, ApiResponse } from '../lib/api';
import { MaintenanceRequest } from '../types';
import { toast } from 'sonner';

export const Maintenance: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', category: 'plumbing', priority: 'medium', description: '' });
  const queryClient = useQueryClient();

  const { data: response, isLoading } = useQuery<ApiResponse<MaintenanceRequest[]>>({
    queryKey: ['maintenance'],
    queryFn: () => apiService.maintenance.getAll()
  });

  const requests = response?.data || [];

  const createMutation = useMutation({
    mutationFn: (data: any) => apiService.maintenance.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenance'] });
      toast.success('Maintenance request submitted successfully');
      setIsModalOpen(false);
      setFormData({ title: '', category: 'plumbing', priority: 'medium', description: '' });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate({ ...formData, tenantId: 'u1', unitId: 'un1', status: 'open', createdAt: new Date().toISOString() });
  };

  const statusColors = {
    open: 'bg-amber-100 text-amber-700 border-amber-200',
    in_progress: 'bg-blue-100 text-blue-700 border-blue-200',
    resolved: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    closed: 'bg-slate-100 text-slate-700 border-slate-200',
    assigned: 'bg-purple-100 text-purple-700 border-purple-200'
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Maintenance Requests</h2>
          <p className="text-slate-500">Track and manage your service requests</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-200"
        >
          <Plus size={20} />
          New Request
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center"><Wrench size={20} /></div>
          <div><div className="text-2xl font-bold">{requests.length}</div><div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total</div></div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center"><Clock size={20} /></div>
          <div><div className="text-2xl font-bold">{requests.filter(r => r.status === 'open').length}</div><div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending</div></div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Request Details</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading ? (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-400">Loading requests...</td></tr>
              ) : requests.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-400">No requests found.</td></tr>
              ) : requests.map((request) => (
                <tr key={request.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer group">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">{request.title}</div>
                    <div className="text-xs text-slate-500 truncate max-w-xs">{request.description}</div>
                  </td>
                  <td className="px-6 py-4 capitalize text-sm text-slate-600 font-medium">{request.category}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                      request.priority === 'high' || request.priority === 'emergency' ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {request.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusColors[request.status as keyof typeof statusColors]}`}>
                      {request.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{new Date(request.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors"><ChevronRight size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl w-full max-w-lg shadow-2xl relative z-10 overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h3 className="text-xl font-bold text-slate-900">New Maintenance Request</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold">X</button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-bold text-slate-700">Issue Title</label>
                  <input 
                    required type="text" placeholder="e.g., Leaky kitchen sink"
                    value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-700">Category</label>
                    <select 
                      value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                      <option value="plumbing">Plumbing</option>
                      <option value="electrical">Electrical</option>
                      <option value="hvac">HVAC / Cooling</option>
                      <option value="appliance">Appliance</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-700">Priority Level</label>
                    <select 
                      value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="emergency">Emergency</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-bold text-slate-700">Description</label>
                  <textarea 
                    required rows={4} placeholder="Please describe the issue in detail..."
                    value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                  />
                </div>
                <button 
                  type="submit" disabled={createMutation.isPending}
                  className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 disabled:opacity-50"
                >
                  {createMutation.isPending ? 'Submitting...' : 'Submit Request'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};