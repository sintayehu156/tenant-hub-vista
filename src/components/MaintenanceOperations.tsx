import React from 'react';
import { 
  Wrench, 
  Clock, 
  AlertTriangle,
  Users,
  Search,
  ChevronRight,
  MessageSquare
} from 'lucide-react';

export const MaintenanceOperations: React.FC = () => {
  const requests = [
    { id: 'REQ-4521', title: 'HVAC Unit Failure', unit: 'Oakwood #204', priority: 'Emergency', status: 'Assigned', vendor: 'ColdBreeze HVAC', time: '2h ago' },
    { id: 'REQ-4522', title: 'Leaking Dishwasher', unit: 'Tech Plaza #12', priority: 'High', status: 'In Progress', vendor: 'Swift Plumbing', time: '5h ago' },
    { id: 'REQ-4523', title: 'Broken Light Fixture', unit: 'Oakwood #101', priority: 'Low', status: 'Pending', vendor: 'Unassigned', time: '1d ago' },
    { id: 'REQ-4524', title: 'Garbage Disposal', unit: 'The Grand #502', priority: 'Medium', status: 'Resolved', vendor: 'Swift Plumbing', time: '2d ago' },
  ];

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'Emergency': return 'text-red-600 bg-red-50 border-red-100';
      case 'High': return 'text-amber-600 bg-amber-50 border-amber-100';
      default: return 'text-slate-500 bg-slate-50 border-slate-100';
    }
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Maintenance Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: 'Active Tasks', value: '24', icon: Wrench, color: 'text-indigo-600' },
          { label: 'SLA At Risk', value: '3', icon: AlertTriangle, color: 'text-red-500' },
          { label: 'Avg Resolution', value: '4.2h', icon: Clock, color: 'text-amber-500' },
          { label: 'Vendors Online', value: '12', icon: Users, color: 'text-emerald-500' },
        ].map((m, i) => (
          <div key={i} className="bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
            <div className={`p-2.5 md:p-3 rounded-xl bg-slate-50 shrink-0 ${m.color}`}>
              <m.icon size={18} className="md:w-5 md:h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">{m.label}</p>
              <h4 className="text-lg md:text-2xl font-black text-slate-900 leading-tight">{m.value}</h4>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-5 md:p-8 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 md:gap-6">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-slate-900">Service Queue</h3>
            <p className="text-xs md:text-sm text-slate-500 mt-1">Real-time maintenance monitoring</p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search requests..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs md:text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {requests.map((req) => (
            <div key={req.id} className="p-4 md:p-6 flex flex-col lg:flex-row lg:items-center justify-between hover:bg-slate-50/50 transition-all cursor-pointer group">
              <div className="flex items-start gap-3 md:gap-5">
                <div className={`mt-1 px-2 py-0.5 md:px-2.5 md:py-1 rounded-lg border text-[8px] md:text-[10px] font-black uppercase tracking-widest shrink-0 ${getPriorityStyle(req.priority)}`}>
                  {req.priority}
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors text-sm md:text-base">{req.title}</h4>
                  <p className="text-xs md:text-sm text-slate-500 mt-0.5 truncate">
                    {req.unit} \u2022 Assigned to: <span className="font-semibold text-slate-700">{req.vendor}</span>
                  </p>
                  <div className="flex items-center flex-wrap gap-2 md:gap-3 mt-2">
                    <span className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-wider">{req.time}</span>
                    <span className="hidden sm:block w-1 h-1 bg-slate-200 rounded-full" />
                    <div className="flex items-center gap-1 text-[8px] md:text-[10px] font-bold text-indigo-500 uppercase tracking-wider">
                      <MessageSquare size={10} />
                      3 Messages
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between sm:justify-end gap-4 md:gap-6 mt-4 lg:mt-0">
                <div className="lg:text-right">
                  <div className="flex items-center gap-2 lg:justify-end">
                    <div className={`w-2 h-2 rounded-full ${req.status === 'Resolved' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
                    <span className="text-xs md:text-sm font-bold text-slate-900">{req.status}</span>
                  </div>
                  <p className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">ID: {req.id}</p>
                </div>
                <div className="w-8 h-8 md:w-10 md:h-10 bg-slate-50 rounded-lg md:rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                  <ChevronRight size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};