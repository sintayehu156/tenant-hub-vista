import React from 'react';
import { 
  Building2, 
  Users, 
  TrendingUp, 
  Clock, 
  Plus, 
  ChevronRight,
  DollarSign,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

const ManagerDashboard: React.FC = () => {
  const { properties, maintenanceRequests } = useApp();

  const stats = [
    { label: 'Total Portfolio Value', value: '$4.2M', icon: TrendingUp, trend: '+12%', color: 'text-emerald-600' },
    { label: 'Occupancy Rate', value: '94%', icon: Building2, trend: '-2%', color: 'text-blue-600' },
    { label: 'Active Leases', value: '108', icon: Users, trend: '+5', color: 'text-violet-600' },
    { label: 'Pending Repairs', value: maintenanceRequests.length.toString(), icon: Clock, trend: 'High', color: 'text-amber-600' },
  ];

  const recentRequests = maintenanceRequests.slice(0, 4);

  return (
    <div className="space-y-8 p-6 lg:p-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Operations Hub</h1>
          <p className="text-slate-500 mt-1">Real-time overview of your property portfolio.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex gap-2">
            <FileText className="w-4 h-4" /> Reports
          </Button>
          <Button className="flex gap-2 bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4" /> New Property
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={cn("p-2 rounded-lg bg-slate-50", stat.color)}>
                    <stat.icon size={24} />
                  </div>
                  <span className={cn("text-xs font-bold px-2 py-1 rounded-full bg-slate-100", 
                    stat.trend.startsWith('+') ? "text-emerald-600" : "text-amber-600"
                  )}>
                    {stat.trend}
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold">Priority Maintenance</CardTitle>
            <Button variant="ghost" size="sm" className="text-blue-600">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRequests.length > 0 ? recentRequests.map((req) => (
                <div key={req.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-2 h-12 rounded-full",
                      req.priority === 'urgent' ? "bg-red-500" : req.priority === 'high' ? "bg-amber-500" : "bg-blue-500"
                    )} />
                    <div>
                      <h4 className="font-semibold text-slate-900">{req.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                        <span className="capitalize">{req.category}</span>
                        <span>•</span>
                        <span>{new Date(req.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight size={18} />
                  </Button>
                </div>
              )) : (
                <div className="text-center py-10 text-slate-400">
                  <AlertCircle className="mx-auto mb-2 opacity-20" size={48} />
                  <p>No active maintenance requests</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Financial Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-100 rounded-2xl">
                <div className="p-4 bg-emerald-50 rounded-full mb-4">
                  <DollarSign className="text-emerald-600" size={32} />
                </div>
                <h4 className="text-3xl font-bold text-slate-900">$24,400</h4>
                <p className="text-sm text-slate-500 mt-1">Collected this month</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Total Invoiced</span>
                  <span className="font-semibold text-slate-900">$28,500</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '85.6%' }} />
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>85.6% Completion</span>
                  <span className="text-amber-600">$4,100 Outstanding</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManagerDashboard;
import { FileText } from 'lucide-react';
import { cn } from '../lib/utils';