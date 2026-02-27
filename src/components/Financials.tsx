import React from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar,
  Download,
  Filter,
  BarChart3,
  PieChart
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

const Financials: React.FC = () => {
  const summary = [
    { label: 'Total Revenue', value: '$142,500', trend: '+12.5%', isPositive: true },
    { label: 'Net Profit', value: '$84,200', trend: '+8.2%', isPositive: true },
    { label: 'Operating Costs', value: '$58,300', trend: '+4.1%', isPositive: false },
    { label: 'Outstanding Rent', value: '$6,400', trend: '-15%', isPositive: true },
  ];

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Financial Reports</h1>
          <p className="text-slate-500 mt-1">Detailed breakdown of income, expenses, and portfolio performance.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex gap-2">
            <Calendar size={18} /> Last 30 Days
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 flex gap-2">
            <Download size={18} /> Export PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summary.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="border-none shadow-sm">
              <CardContent className="p-6">
                <p className="text-sm font-medium text-slate-500 mb-1">{item.label}</p>
                <div className="flex items-end justify-between">
                  <h3 className="text-2xl font-bold text-slate-900">{item.value}</h3>
                  <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                    item.isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                  }`}>
                    {item.isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {item.trend}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 shadow-sm border-slate-100">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Revenue Distribution</CardTitle>
            <BarChart3 className="text-slate-400" size={20} />
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-4 pt-4">
              {[60, 45, 80, 55, 90, 70, 85].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-blue-100 rounded-t-lg relative group transition-all" style={{ height: `${h}%` }}>
                    <div className="absolute inset-0 bg-blue-600 rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold">MON</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-100">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Expense Breakdown</CardTitle>
            <PieChart className="text-slate-400" size={20} />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: 'Maintenance', value: '$22,400', color: 'bg-blue-500' },
                { label: 'Utilities', value: '$14,200', color: 'bg-emerald-500' },
                { label: 'Taxes', value: '$12,500', color: 'bg-violet-500' },
                { label: 'Management', value: '$9,200', color: 'bg-amber-500' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${item.color}`} />
                    <span className="text-sm font-medium text-slate-600">{item.label}</span>
                  </div>
                  <span className="text-sm font-bold text-slate-900">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Financials;