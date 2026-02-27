import React from 'react';
import { 
  Download, 
  FileText, 
  AlertCircle, 
  Clock,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

export const Documents: React.FC = () => {
  const docs = [
    { title: 'Lease Agreement 2024-2025', category: 'Lease', size: '2.4 MB', date: 'Jan 15, 2024', status: 'Active' },
    { title: 'Building Rules & Regulations', category: 'Policy', size: '1.1 MB', date: 'Jan 15, 2024', status: 'Current' },
    { title: 'Renters Insurance Proof', category: 'Insurance', size: '450 KB', date: 'Feb 02, 2024', status: 'Verified' },
    { title: 'Move-in Inspection Report', category: 'Inspection', size: '3.8 MB', date: 'Jan 20, 2024', status: 'Signed' },
  ];

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Featured Document Card */}
      <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl md:rounded-3xl p-6 md:p-8 text-white shadow-xl shadow-indigo-100 flex flex-col md:flex-row items-center gap-6 md:gap-8">
        <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shrink-0">
          <FileText size={48} className="w-10 h-10 md:w-12 md:h-12" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-bold">Active Lease Agreement</h2>
          <p className="text-indigo-100 mt-2 max-w-md text-sm md:text-base">Your lease for Unit 402 at Oakwood Residences is active until January 31, 2025.</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-6">
            <button className="flex-1 sm:flex-none px-6 py-2.5 bg-white text-indigo-600 rounded-xl font-bold text-xs md:text-sm hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2 shadow-sm">
              <Download size={18} />
              Download
            </button>
            <button className="flex-1 sm:flex-none px-6 py-2.5 bg-indigo-500/50 text-white rounded-xl font-bold text-xs md:text-sm hover:bg-indigo-500/70 transition-colors flex items-center justify-center gap-2">
              <ExternalLink size={18} />
              View
            </button>
          </div>
        </div>
        <div className="hidden lg:block border-l border-white/20 pl-8 space-y-4 shrink-0">
          <div className="flex items-center gap-3">
            <ShieldCheck size={20} className="text-indigo-300" />
            <span className="text-sm font-medium">Legally Binding</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock size={20} className="text-indigo-300" />
            <span className="text-sm font-medium">Signed Jan 15</span>
          </div>
        </div>
      </div>

      {/* Document Library */}
      <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-5 md:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="font-bold text-slate-900 text-base md:text-lg">Document Library</h3>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-bold uppercase tracking-wider">All</span>
            <span className="px-3 py-1 text-slate-400 rounded-full text-[10px] font-bold uppercase tracking-wider cursor-pointer hover:text-slate-600 transition-colors">Leases</span>
            <span className="px-3 py-1 text-slate-400 rounded-full text-[10px] font-bold uppercase tracking-wider cursor-pointer hover:text-slate-600 transition-colors">Policies</span>
          </div>
        </div>
        <div className="divide-y divide-slate-50">
          {docs.map((doc, i) => (
            <div key={i} className="p-4 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-slate-50 transition-all group gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors shrink-0">
                  <FileText size={20} className="md:w-6 md:h-6" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-slate-900 text-sm md:text-base truncate">{doc.title}</h4>
                  <div className="flex items-center flex-wrap gap-2 md:gap-3 text-[10px] text-slate-400 mt-1">
                    <span className="font-bold text-indigo-600 uppercase">{doc.category}</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full" />
                    <span>{doc.size}</span>
                    <span className="hidden sm:inline w-1 h-1 bg-slate-300 rounded-full" />
                    <span className="hidden sm:inline">{doc.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded">
                  {doc.status}
                </span>
                <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                  <Download size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100 flex items-start gap-4">
        <AlertCircle className="text-amber-600 shrink-0" size={24} />
        <div className="min-w-0">
          <h4 className="font-bold text-amber-900 text-sm">Missing Documents?</h4>
          <p className="text-xs md:text-sm text-amber-800/80 mt-1 leading-relaxed">
            If you can't find a specific document, contact your property manager directly through the messaging center.
          </p>
        </div>
      </div>
    </div>
  );
};