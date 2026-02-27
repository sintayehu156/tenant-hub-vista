import React from 'react';
import { 
  MapPin, 
  Plus, 
  Search, 
  ChevronRight,
  Home,
  Users
} from 'lucide-react';

export const Portfolio: React.FC = () => {
  const properties = [
    { 
      id: 1, 
      name: 'Oakwood Residences', 
      address: '1240 Market St, San Francisco', 
      units: 48, 
      occupancy: 96, 
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800' 
    },
    { 
      id: 2, 
      name: 'Tech Plaza Lofts', 
      address: '88 Bryant St, San Francisco', 
      units: 120, 
      occupancy: 92, 
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800' 
    },
    { 
      id: 3, 
      name: 'The Grand View', 
      address: '550 Skyline Blvd, San Francisco', 
      units: 75, 
      occupancy: 100, 
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800' 
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md w-full">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search properties..." 
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
          />
        </div>
        <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100">
          <Plus size={18} />
          Add Property
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((prop) => (
          <div key={prop.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all group cursor-pointer flex flex-col">
            <div className="relative h-40 sm:h-48 overflow-hidden">
              <img src={prop.image} alt={prop.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 left-3 md:top-4 md:left-4">
                <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-[10px] font-bold text-slate-900 shadow-sm">
                  {prop.units} Units
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4">
                <h3 className="text-white font-bold text-base md:text-lg leading-tight truncate">{prop.name}</h3>
                <div className="flex items-center gap-1 text-white/80 mt-1">
                  <MapPin size={10} className="md:w-3 md:h-3" />
                  <span className="text-[10px] md:text-xs truncate">{prop.address}</span>
                </div>
              </div>
            </div>
            
            <div className="p-5 md:p-6 flex-1 flex flex-col">
              <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <Home size={12} className="md:w-3.5 md:h-3.5" />
                    <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">Occupancy</span>
                  </div>
                  <p className="text-base md:text-lg font-bold text-slate-900">{prop.occupancy}%</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <Users size={12} className="md:w-3.5 md:h-3.5" />
                    <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-wider">Tenants</span>
                  </div>
                  <p className="text-base md:text-lg font-bold text-slate-900">{Math.floor(prop.units * (prop.occupancy / 100))}</p>
                </div>
              </div>

              <div className="mt-auto flex items-center justify-between text-indigo-600 font-bold text-xs md:text-sm">
                <span>Manage Details</span>
                <ChevronRight size={18} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};