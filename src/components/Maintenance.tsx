import React, { useState } from 'react';
import { 
  Wrench, 
  Plus, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  MoreVertical,
  Search,
  Building2,
  Settings as WrenchIcon
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { api } from '../lib/api-client';
import { toast } from 'sonner';
import { MaintenanceRequest } from '../types';
import { cn } from '../lib/utils';

const Maintenance: React.FC = () => {
  const { user, maintenanceRequests, refreshData } = useApp();
  const [filter, setFilter] = useState<MaintenanceRequest['status'] | 'all'>('all');

  const filteredRequests = maintenanceRequests.filter(req => {
    if (user?.role === 'tenant') {
      return req.tenantId === user.id && (filter === 'all' || req.status === filter);
    }
    return filter === 'all' || req.status === filter;
  });

  const handleUpdateStatus = async (id: string, status: MaintenanceRequest['status']) => {
    try {
      await api.updateMaintenanceStatus(id, status);
      toast.success('Status updated successfully');
      refreshData();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="text-emerald-500" size={16} />;
      case 'in_progress': return <WrenchIcon className="text-blue-500 animate-pulse" size={16} />;
      case 'new': return <AlertCircle className="text-amber-500" size={16} />;
      default: return <Clock className="text-slate-400" size={16} />;
    }
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-700';
      case 'high': return 'bg-amber-100 text-amber-700';
      case 'medium': return 'bg-blue-100 text-blue-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Maintenance & Repairs</h1>
          <p className="text-slate-500 mt-1">Manage and track service requests for your properties.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 flex gap-2">
          <Plus size={18} /> New Request
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input className="pl-10" placeholder="Search requests..." />
        </div>
        <div className="flex gap-2">
          {['all', 'new', 'in_progress', 'completed'].map((f) => (
            <Button
              key={f}
              variant={filter === f ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(f as any)}
              className="capitalize"
            >
              {f.replace('_', ' ')}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredRequests.length > 0 ? filteredRequests.map((req) => (
          <Card key={req.id} className="hover:shadow-md transition-shadow group border-slate-200">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className={cn("p-3 rounded-xl", 
                    req.status === 'completed' ? "bg-emerald-50" : "bg-slate-50"
                  )}>
                    <Wrench className={cn(
                      req.status === 'completed' ? "text-emerald-600" : "text-slate-600"
                    )} size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-lg text-slate-900">{req.title}</h3>
                      <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider", getPriorityClass(req.priority))}>
                        {req.priority}
                      </span>
                    </div>
                    <p className="text-slate-500 text-sm line-clamp-1">{req.description}</p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        {new Date(req.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Building2 size={14} />
                        Unit {req.unitId}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-4 md:pt-0">
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2 mb-1">
                      {getStatusIcon(req.status)}
                      <span className="text-sm font-semibold capitalize text-slate-700">{req.status.replace('_', ' ')}</span>
                    </div>
                    {user?.role === 'manager' && req.status !== 'completed' && (
                      <div className="flex gap-2 mt-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleUpdateStatus(req.id, 'in_progress')}
                          disabled={req.status === 'in_progress'}
                        >
                          Start
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 border-emerald-100"
                          onClick={() => handleUpdateStatus(req.id, 'completed')}
                        >
                          Complete
                        </Button>
                      </div>
                    )}
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical size={18} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )) : (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <div className="p-4 bg-white rounded-2xl shadow-sm inline-block mb-4">
              <Search className="text-slate-300" size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No requests found</h3>
            <p className="text-slate-500 mt-1">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Maintenance;