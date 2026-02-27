import React from 'react';
import { 
  Mail, 
  Camera, 
  Shield, 
  Bell, 
  Globe,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

const Profile: React.FC = () => {
  const { user } = useApp();
  const { signOut } = useAuth();

  return (
    <div className="p-6 lg:p-10 max-w-4xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Account Settings</h1>
        <p className="text-slate-500 mt-1">Manage your personal information and security preferences.</p>
      </header>

      <Card className="overflow-hidden border-none shadow-md">
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
          <div className="absolute -bottom-12 left-8">
            <div className="relative group">
              <img 
                src={user?.profile?.avatar} 
                className="w-24 h-24 rounded-2xl border-4 border-white shadow-lg object-cover" 
                alt="Avatar" 
              />
              <button className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="text-white" size={24} />
              </button>
            </div>
          </div>
        </div>
        <CardContent className="pt-16 pb-8 px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{user?.profile?.firstName} {user?.profile?.lastName}</h2>
              <p className="text-slate-500 flex items-center gap-1.5 mt-1">
                <Mail size={14} /> {user?.email}
              </p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">First Name</label>
              <Input defaultValue={user?.profile?.firstName} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Last Name</label>
              <Input defaultValue={user?.profile?.lastName} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Email Address</label>
              <Input defaultValue={user?.email} disabled />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Phone Number</label>
              <Input defaultValue="+1 (555) 000-0000" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6">
        {[
          { label: 'Security & Password', icon: Shield, desc: 'Two-factor authentication, login history', color: 'text-blue-600' },
          { label: 'Notifications', icon: Bell, desc: 'Email alerts, push notifications, billing reminders', color: 'text-amber-600' },
          { label: 'Language & Region', icon: Globe, desc: 'English (US), Timezone: CST', color: 'text-emerald-600' },
        ].map((item, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.01 }}
            className="flex items-center justify-between p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all text-left group"
          >
            <div className="flex items-center gap-4">
              <div className={cn("p-3 rounded-xl bg-slate-50", item.color)}>
                <item.icon size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{item.label}</h4>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-slate-300 group-hover:text-slate-900 transition-colors" />
          </motion.button>
        ))}
      </div>

      <div className="flex justify-center pt-4">
        <Button 
          variant="ghost" 
          onClick={() => signOut()}
          className="text-red-600 hover:text-red-700 hover:bg-red-50 flex gap-2 font-semibold"
        >
          <LogOut size={18} /> Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Profile;