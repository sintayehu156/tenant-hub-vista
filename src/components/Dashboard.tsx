import React, { useState } from 'react';
import { 
  CreditCard, 
  Wrench, 
  FileText, 
  MessageSquare,
  Home,
  AlertTriangle,
  ChevronRight,
  Clock,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const Dashboard: React.FC = () => {
  const { user, properties, maintenanceRequests } = useApp();
  
  const tenantProperty = properties[0]; // Simplified for demo
  const userRequests = maintenanceRequests.filter(r => r.tenantId === user?.id);

  const stats = [
    { label: 'Next Rent Due', value: 'May 1, 2024', icon: Calendar, color: 'text-blue-600', sub: '$1,850' },
    { label: 'Open Requests', value: userRequests.length.toString(), icon: Wrench, color: 'text-amber-600', sub: 'In Progress' },
    { label: 'Rewards Points', value: '1,240', icon: CreditCard, color: 'text-emerald-600', sub: 'Gold Tier' },
  ];

  const handlePayRent = () => {
    toast.success('Redirecting to payment portal...');
  };

  return (
    <div className="space-y-8 p-6 lg:p-10 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Welcome Home, {user?.profile?.firstName}!</h1>
          <p className="text-slate-500 mt-1">{tenantProperty?.name || 'Loading building details...'}</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handlePayRent} className="bg-blue-600 hover:bg-blue-700 font-semibold shadow-lg shadow-blue-200">
            Pay Rent Now
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="border-none shadow-md bg-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={cn("p-3 rounded-2xl bg-slate-50", stat.color)}>
                    <stat.icon size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-xl font-bold text-slate-900">{stat.value}</h3>
                      <span className="text-xs text-slate-400 font-medium">{stat.sub}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-sm border-slate-100 overflow-hidden">
          <div className="relative h-48 overflow-hidden">
            <img 
              src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/c0d6dedb-b63d-4783-8d54-d7e42f60935e/apartment-interior-de5cd035-1772209164769.webp" 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              alt="My Apartment"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
              <div className="text-white">
                <p className="text-xs font-medium uppercase tracking-wider opacity-80">Your Unit</p>
                <h3 className="text-xl font-bold">Suite 402, Building A</h3>
              </div>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-xs text-slate-500 mb-1">Status</p>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  <span className="font-semibold text-sm">Lease Active</span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-xs text-slate-500 mb-1">Renewal</p>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-amber-500" />
                  <span className="font-semibold text-sm">124 Days Left</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-100">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Maintenance', icon: Wrench, color: 'bg-orange-50 text-orange-600', tab: 'maintenance' },
                { label: 'Documents', icon: FileText, color: 'bg-blue-50 text-blue-600', tab: 'documents' },
                { label: 'Contact Mgr', icon: MessageSquare, color: 'bg-violet-50 text-violet-600', tab: 'profile' },
                { label: 'Amenities', icon: Home, color: 'bg-emerald-50 text-emerald-600', tab: 'dashboard' },
              ].map((action, i) => (
                <button
                  key={i}
                  className="flex flex-col items-center justify-center p-6 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all group"
                >
                  <div className={cn("p-3 rounded-xl mb-3 group-hover:scale-110 transition-transform", action.color)}>
                    <action.icon size={24} />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">{action.label}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
import { cn } from '../lib/utils';