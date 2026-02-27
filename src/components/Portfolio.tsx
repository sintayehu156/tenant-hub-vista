import React from 'react';
import { 
  Building2, 
  MapPin, 
  Users, 
  TrendingUp, 
  MoreVertical, 
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

const Portfolio: React.FC = () => {
  const { properties } = useApp();

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Property Portfolio</h1>
          <p className="text-slate-500 mt-1">Manage all your buildings and assets from a single view.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 flex gap-2">
          <Plus size={18} /> Add Property
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property, i) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow group">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={property.image} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  alt={property.name} 
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 backdrop-blur-md text-blue-600 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                    {property.totalUnits} Units
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white">{property.name}</h3>
                  <div className="flex items-center gap-1.5 text-white/80 text-sm mt-1">
                    <MapPin size={14} />
                    {property.address}, {property.city}
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-slate-50">
                    <p className="text-xs text-slate-500 mb-1">Occupancy</p>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">
                        {Math.round(((property.totalUnits - property.availableUnits) / property.totalUnits) * 100)}%
                      </span>
                      <ArrowUpRight size={14} className="text-emerald-500" />
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50">
                    <p className="text-xs text-slate-500 mb-1">Rev. (M)</p>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">$124.5k</span>
                      <TrendingUp size={14} className="text-blue-500" />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">View Details</Button>
                  <Button variant="outline" size="icon">
                    <MoreVertical size={18} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {/* Placeholder for Add New */}
        <button className="h-full min-h-[400px] border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center gap-4 hover:border-blue-400 hover:bg-blue-50/50 transition-all group">
          <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-blue-100 transition-colors">
            <Plus size={32} className="text-slate-400 group-hover:text-blue-600" />
          </div>
          <div className="text-center">
            <p className="font-bold text-slate-700">Add New Property</p>
            <p className="text-xs text-slate-500 mt-1">Scale your portfolio</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Portfolio;