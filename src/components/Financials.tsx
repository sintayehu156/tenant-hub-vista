import React from 'react';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Search, 
  Filter, 
  Download,
  MoreHorizontal
} from 'lucide-react';

export const Financials: React.FC = () => {
  return (
    <div className="space-y-6 md:space-y-8">
      {/* Financial Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Gross Revenue (MTD)</p>
          <div className="flex items-center justify-between mt-2">
            <h3 className="text-2xl md:text-3xl font-black text-slate-900">$124,500</h3>
            <span className="flex items-center gap-1 text-[10px] md:text-xs font-bold text-emerald-500">
              <ArrowUpRight size={14} /> 8.2%
            </span>
          </div>
        </div>
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Accounts Receivable</p>
          <div className="flex items-center justify-between mt-2">
            <h3 className="text-2xl md:text-3xl font-black text-amber-600">$12,840</h3>
            <span className="flex items-center gap-1 text-[10px] md:text-xs font-bold text-red-500">
              <ArrowDownRight size={14} /> 4.1%
            </span>
          </div>
        </div>
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200 shadow-sm sm:col-span-2 lg:col-span-1">
          <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">Operating Expenses</p>
          <div className="flex items-center justify-between mt-2">
            <h3 className="text-2xl md:text-3xl font-black text-slate-900">$42,120</h3>
            <span className="text-[10px] md:text-xs font-bold text-slate-400">Fixed Costs</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-5 md:p-8 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4 md:gap-6">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-slate-900">Invoices & Billing</h3>
            <p className="text-xs md:text-sm text-slate-500 mt-1">Manage tenant invoices and reconciliation</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="relative flex-1 sm:flex-none sm:w-64">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search invoices..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs md:text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>
            <button className="p-2 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors shrink-0">
              <Filter size={18} className="text-slate-500" />
            </button>
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs md:text-sm font-bold hover:bg-indigo-700 transition-all shrink-0">
              <Download size={16} />
              Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-4 md:px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Invoice</th>
                <th className="px-4 md:px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Tenant</th>
                <th className="hidden md:table-cell px-4 md:px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Property</th>
                <th className="px-4 md:px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="hidden sm:table-cell px-4 md:px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Due Date</th>
                <th className="px-4 md:px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right whitespace-nowrap">Amount</th>
                <th className="px-4 md:px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { id: 'INV-0801', tenant: 'Michael S.', prop: 'Oakwood #102', status: 'Pending', due: 'Aug 01', amount: 2450.00 },
                { id: 'INV-0802', tenant: 'Jim H.', prop: 'Oakwood #405', status: 'Paid', due: 'Aug 01', amount: 1850.00 },
                { id: 'INV-0803', tenant: 'Pam B.', prop: 'Tech Plaza #88', status: 'Overdue', due: 'Jul 01', amount: 3200.00 },
              ].map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer">
                  <td className="px-4 md:px-8 py-4 font-mono text-[10px] md:text-xs font-bold text-indigo-600">{inv.id}</td>
                  <td className="px-4 md:px-8 py-4 font-bold text-slate-900 text-xs md:text-sm">{inv.tenant}</td>
                  <td className="hidden md:table-cell px-4 md:px-8 py-4 text-xs text-slate-500">{inv.prop}</td>
                  <td className="px-4 md:px-8 py-4">
                    <span className={`px-2 py-0.5 md:px-2.5 md:py-1 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest whitespace-nowrap ${
                      inv.status === 'Paid' ? 'bg-emerald-50 text-emerald-600' : 
                      inv.status === 'Overdue' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="hidden sm:table-cell px-4 md:px-8 py-4 text-xs text-slate-500 whitespace-nowrap">{inv.due}</td>
                  <td className="px-4 md:px-8 py-4 text-right font-black text-slate-900 text-xs md:text-sm">${inv.amount.toLocaleString()}</td>
                  <td className="px-4 md:px-8 py-4 text-right">
                    <button className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};