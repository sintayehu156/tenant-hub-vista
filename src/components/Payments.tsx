import React, { useState } from 'react';
import { 
  CreditCard, 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  Building2,
  DollarSign
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { apiService, ApiResponse } from '../lib/api';
import { Invoice, Payment } from '../types';
import { toast } from 'sonner';

export const Payments: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'paid' | 'unpaid'>('all');

  const { data: invoicesResponse, isLoading } = useQuery<ApiResponse<Invoice[]>>({
    queryKey: ['invoices'],
    queryFn: () => apiService.invoices.getAll()
  });

  const { data: paymentsResponse } = useQuery<ApiResponse<Payment[]>>({
    queryKey: ['payments'],
    queryFn: () => apiService.payments.getAll()
  });

  const invoices = invoicesResponse?.data || [];
  
  const filteredInvoices = invoices.filter((inv) => {
    if (filter === 'all') return true;
    return inv.status === filter;
  });

  const nextPayment = invoices.find((inv) => inv.status === 'unpaid');

  const handlePay = (id: string) => {
    toast.success('Redirecting to secure payment portal...');
  };

  return (
    <div className="space-y-8">
      <div className="bg-indigo-600 rounded-[2rem] p-8 md:p-10 text-white relative overflow-hidden shadow-2xl shadow-indigo-200">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              <ShieldCheck size={14} />
              Secure Billing Portal
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Payment Due</h2>
            <p className="text-indigo-100 text-lg mb-8 max-w-sm">Your rent for June 2024 is due in 5 days. Set up autopay to never miss a payment.</p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => nextPayment && handlePay(nextPayment.id)}
                className="px-8 py-4 bg-white text-indigo-600 rounded-2xl font-bold hover:bg-indigo-50 transition-all shadow-xl"
              >
                Pay ${nextPayment?.amount || '0'} Now
              </button>
              <button className="px-8 py-4 bg-indigo-500/30 text-white border border-white/30 rounded-2xl font-bold hover:bg-indigo-500/50 transition-all backdrop-blur-sm">
                Autopay: Off
              </button>
            </div>
          </div>
          <div className="hidden md:grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10">
              <DollarSign className="text-indigo-200 mb-2" size={24} />
              <div className="text-3xl font-bold">$2,400</div>
              <div className="text-xs font-bold text-indigo-200 uppercase mt-1">Rent Amount</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10">
              <CreditCard className="text-indigo-200 mb-2" size={24} />
              <div className="text-lg font-bold">Visa •••• 4242</div>
              <div className="text-xs font-bold text-indigo-200 uppercase mt-1">Payment Method</div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h3 className="text-2xl font-bold text-slate-900">Billing History</h3>
        <div className="flex bg-white p-1 rounded-xl border border-slate-100 shadow-sm">
          {(['all', 'paid', 'unpaid'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                filter === t ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {isLoading ? (
          <div className="text-center py-20 text-slate-400 font-medium">Loading invoices...</div>
        ) : filteredInvoices.length === 0 ? (
          <div className="text-center py-20 text-slate-400 font-medium bg-white rounded-3xl border border-slate-100">No invoices found for this filter.</div>
        ) : filteredInvoices.map((invoice, i: number) => (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            key={invoice.id}
            className="group bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center gap-6"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
              invoice.status === 'paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
            }`}>
              {invoice.status === 'paid' ? <CheckCircle2 size={28} /> : <Clock size={28} />}
            </div>
            
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h4 className="font-bold text-slate-900 text-lg uppercase">{invoice.type}</h4>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                  invoice.status === 'paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {invoice.status}
                </span>
              </div>
              <p className="text-slate-500 font-medium flex items-center gap-2">
                <Building2 size={14} />
                Unit 402 - Skyline Heights
              </p>
            </div>

            <div className="md:text-center px-4 md:border-x md:border-slate-100">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Due Date</div>
              <div className="font-bold text-slate-900">{new Date(invoice.dueDate).toLocaleDateString()}</div>
            </div>

            <div className="md:text-right min-w-[120px]">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Amount</div>
              <div className="text-2xl font-black text-slate-900">${invoice.amount.toLocaleString()}</div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 md:flex-none p-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 transition-colors" title="Download Invoice">
                <Download size={20} />
              </button>
              {invoice.status === 'unpaid' && (
                <button 
                  onClick={() => handlePay(invoice.id)}
                  className="flex-1 md:flex-none px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                >
                  Pay <ArrowRight size={18} />
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};