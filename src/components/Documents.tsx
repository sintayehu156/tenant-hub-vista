import React from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  Search, 
  Filter, 
  Plus, 
  Trash2,
  FileCheck,
  ShieldCheck,
  Receipt
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { motion } from 'framer-motion';

const Documents: React.FC = () => {
  const { user } = useApp();
  
  const docs = [
    { id: '1', name: 'Lease Agreement 2024', type: 'lease', size: '2.4 MB', date: '2024-01-15' },
    { id: '2', name: 'Insurance Certificate', type: 'insurance', size: '1.1 MB', date: '2024-02-10' },
    { id: '3', name: 'Property Rules & Regs', type: 'other', size: '0.8 MB', date: '2023-12-01' },
    { id: '4', name: 'Security Deposit Receipt', type: 'receipt', size: '0.3 MB', date: '2024-01-16' },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lease': return <FileCheck className="text-blue-600" size={20} />;
      case 'insurance': return <ShieldCheck className="text-emerald-600" size={20} />;
      case 'receipt': return <Receipt className="text-amber-600" size={20} />;
      default: return <FileText className="text-slate-600" size={20} />;
    }
  };

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Document Vault</h1>
          <p className="text-slate-500 mt-1">Secure storage for all your property related files.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 flex gap-2">
          <Plus size={18} /> Upload New
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input className="pl-10" placeholder="Search documents..." />
        </div>
        <Button variant="outline" className="flex gap-2">
          <Filter size={18} /> Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {docs.map((doc, i) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="hover:shadow-lg transition-all group border-slate-200 cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="p-3 rounded-xl bg-slate-50 mb-4 group-hover:bg-blue-50 transition-colors">
                    {getTypeIcon(doc.type)}
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600">
                      <Eye size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600">
                      <Download size={16} />
                    </Button>
                  </div>
                </div>
                <h3 className="font-bold text-slate-900 mb-1 truncate">{doc.name}</h3>
                <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                  <span className="uppercase">{doc.type}</span>
                  <span>•</span>
                  <span>{doc.size}</span>
                  <span>•</span>
                  <span>{new Date(doc.date).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Documents;