import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, UserCheck, Shield } from 'lucide-react';

export const SettingsView = () => {
  const { currentUser, logout, login } = useAuth();

  return (
    <div className="dashboard-container">
      <header className="dashboard-header flex justify-between items-center">
        <div />
        <h1 className="text-left ltr uppercase">Settings</h1>
      </header>

      <main className="dashboard-main grid grid-cols-12 gap-4">
        <section className="dashboard-section col-span-12 xl:col-span-6">
          <h2 className="text-[10px] font-black uppercase opacity-40 mb-6 tracking-widest">Session Management</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-100 text-emerald-600 rounded-full"><UserCheck size={20}/></div>
                <div>
                  <p className="text-xs font-black uppercase opacity-40 leading-none mb-1">Authenticated As</p>
                  <p className="text-lg font-black text-slate-800 uppercase tracking-tight">{currentUser?.s_id}</p>
                </div>
              </div>
              <div className="text-[10px] font-black bg-emerald-500 text-white px-3 py-1 rounded-full uppercase">Active</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={logout} 
                className="flex items-center justify-center gap-3 bg-red-50 text-red-600 p-4 rounded-2xl font-black text-xs uppercase border border-red-100 hover:bg-red-100 transition-all"
              >
                <LogOut size={18}/> Sign Out
              </button>
              
              <button 
                disabled 
                className="flex items-center justify-center gap-3 bg-slate-100 text-slate-400 p-4 rounded-2xl font-black text-xs uppercase cursor-not-allowed"
              >
                <Shield size={18}/> Re-Auth
              </button>
            </div>
          </div>
        </section>

        <section className="dashboard-section col-span-12 xl:col-span-6 bg-slate-900 text-white border-none">
          <h2 className="text-[10px] font-black uppercase opacity-20 mb-6 tracking-widest text-white">System Security</h2>
          <p className="text-[11px] font-bold text-slate-400 leading-relaxed italic">
            Access to this console is restricted. Any modifications are logged per user session. 
            Ensure your superadmin credentials are not shared across unauthorized networks.
          </p>
        </section>
      </main>
    </div>
  );
};