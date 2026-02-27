import React from 'react';
import { User as UserIcon, Mail, Shield, Phone, MapPin, Edit3 } from 'lucide-react';
import { User } from '../types';

interface ProfileProps {
  user: User;
}

export const Profile: React.FC<ProfileProps> = ({ user }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
      <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="h-24 md:h-32 bg-gradient-to-r from-indigo-500 to-indigo-700" />
        <div className="px-6 md:px-8 pb-6 md:pb-8">
          <div className="relative -mt-10 md:-mt-12 mb-4 md:mb-6">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-24 h-24 md:w-32 md:h-32 rounded-2xl md:rounded-3xl object-cover border-4 border-white shadow-xl" 
            />
            <button className="absolute bottom-1 right-[-4px] md:bottom-2 md:right-[-8px] p-2 bg-white rounded-lg md:rounded-xl shadow-lg border border-slate-100 text-slate-600 hover:text-indigo-600 transition-colors">
              <Edit3 size={16} className="md:w-4 md:h-4" />
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 md:gap-6">
            <div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900">{user.name}</h2>
              <div className="flex items-center flex-wrap gap-3 md:gap-4 mt-2">
                <span className="px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] md:text-xs font-bold uppercase tracking-widest whitespace-nowrap">
                  {user.role}
                </span>
                <span className="flex items-center gap-1.5 text-xs md:text-sm text-slate-400">
                  <MapPin size={12} />
                  San Francisco, CA
                </span>
              </div>
            </div>
            <button className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs md:text-sm hover:bg-slate-800 transition-all">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
          <h3 className="text-base md:text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <UserIcon size={20} className="text-indigo-600 shrink-0" />
            Account Information
          </h3>
          <div className="space-y-5 md:space-y-6">
            <div>
              <label className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</label>
              <p className="font-bold text-slate-900 text-sm md:text-base mt-1">{user.name}</p>
            </div>
            <div>
              <label className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</label>
              <div className="flex items-center gap-2 mt-1 min-w-0">
                <Mail size={14} className="text-slate-400 shrink-0" />
                <p className="font-bold text-slate-900 text-sm md:text-base truncate">{user.email}</p>
              </div>
            </div>
            <div>
              <label className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone Number</label>
              <div className="flex items-center gap-2 mt-1">
                <Phone size={14} className="text-slate-400 shrink-0" />
                <p className="font-bold text-slate-900 text-sm md:text-base">+1 (555) 000-0000</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
          <h3 className="text-base md:text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Shield size={20} className="text-indigo-600 shrink-0" />
            Security & Privacy
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-xl md:rounded-2xl flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-xs md:text-sm font-bold text-slate-900">2FA Security</p>
                <p className="text-[10px] md:text-xs text-slate-500 mt-0.5 truncate">One-time password active</p>
              </div>
              <div className="w-8 h-4 md:w-10 md:h-5 bg-indigo-600 rounded-full relative shrink-0">
                <div className="absolute right-0.5 top-0.5 w-3 h-3 md:w-4 md:h-4 bg-white rounded-full" />
              </div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl md:rounded-2xl flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-xs md:text-sm font-bold text-slate-900">Biometric Login</p>
                <p className="text-[10px] md:text-xs text-slate-500 mt-0.5 truncate">FaceID or Fingerprint</p>
              </div>
              <div className="w-8 h-4 md:w-10 md:h-5 bg-slate-200 rounded-full relative shrink-0">
                <div className="absolute left-0.5 top-0.5 w-3 h-3 md:w-4 md:h-4 bg-white rounded-full" />
              </div>
            </div>
            <button className="w-full mt-2 py-3 border border-slate-200 rounded-xl md:rounded-2xl text-xs md:text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};