import React from 'react';
import { 
  CreditCard, 
  DollarSign, 
  CheckCircle2, 
  Plus,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { toast } from 'sonner';

const Payments: React.FC = () => {
  const handlePay = () => {
    toast.success('Payment portal opened in a new tab');
  };

  const history = [
    { id: '1', date: '2024-04-01', amount: 1850, status: 'completed', type: 'Rent' },
    { id: '2', date: '2024-03-01', amount: 1850, status: 'completed', type: 'Rent' },
    { id: '3', date: '2024-02-15', amount: 45.20, status: 'completed', type: 'Late Fee' },
  ];

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Payments & Billing</h1>
          <p className="text-slate-500 mt-1">Manage your rent, utilities, and payment methods.</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 flex gap-2">
          <ShieldCheck size={18} /> Manage Auto-pay
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 shadow-md border-none bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="text-blue-600" /> Current Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center justify-between p-8 rounded-3xl bg-slate-900 text-white gap-8 relative overflow-hidden">
              <div className="relative z-10 text-center md:text-left">
                <p className="text-slate-400 font-medium mb-1">Due by May 1, 2024</p>
                <h2 className="text-5xl font-bold tracking-tight">$1,850.00</h2>
                <div className="flex items-center gap-2 mt-4 text-emerald-400 text-sm font-semibold">
                  <CheckCircle2 size={16} />
                  No overdue payments
                </div>
              </div>
              <div className="flex flex-col gap-3 w-full md:w-auto relative z-10">
                <Button onClick={handlePay} size="lg" className="bg-white text-slate-900 hover:bg-slate-100 font-bold px-12 h-14 rounded-2xl">
                  Pay Now
                </Button>
                <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800 rounded-2xl h-14">
                  Download Statement
                </Button>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-bold text-slate-900 mb-4">Payment History</h4>
              <div className="space-y-3">
                {history.map((h) => (
                  <div key={h.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                        <CheckCircle2 size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{h.type}</p>
                        <p className="text-xs text-slate-500">{new Date(h.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-900">${h.amount.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="shadow-sm border-slate-100">
            <CardHeader>
              <CardTitle className="text-lg">Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-2xl border-2 border-blue-100 bg-blue-50/30">
                <div className="flex items-center justify-between mb-4">
                  <CreditCard className="text-blue-600" size={24} />
                  <span className="text-xs font-bold text-blue-600 uppercase">Primary</span>
                </div>
                <p className="text-slate-900 font-bold">•••• •••• •••• 4242</p>
              </div>
              <Button variant="outline" className="w-full mt-4 border-dashed rounded-xl py-6 flex gap-2">
                <Plus size={18} /> Add New Method
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-blue-600 text-white border-none overflow-hidden relative">
            <CardContent className="p-6">
              <TrendingUp className="mb-4 opacity-50" size={32} />
              <h4 className="text-lg font-bold mb-2">Build Your Credit</h4>
              <p className="text-blue-100 text-sm mb-4">On-time rent payments are now reported to major credit bureaus.</p>
              <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 font-bold">Learn More</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Payments;