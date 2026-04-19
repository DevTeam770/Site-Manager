import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck } from 'lucide-react';

export const LoginView = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ username, password });
    } catch (err) {
      setError("ACCESS DENIED: INVALID CREDENTIALS");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="bg-slate-900 p-10 rounded-3xl border border-slate-800 shadow-2xl w-full max-w-sm text-center">
        <ShieldCheck size={60} className="text-blue-500 mx-auto mb-6" />
        <h1 className="text-xl font-black text-white mb-8 uppercase tracking-widest">Meet Control Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500 text-[10px] font-black">{error}</p>}
          <input 
            value={username} 
            onChange={e => setUsername(e.target.value)} 
            placeholder="Username" 
            className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800 text-white text-center outline-none focus:ring-1 focus:ring-blue-500" 
          />
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            placeholder="Password" 
            className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800 text-white text-center outline-none focus:ring-1 focus:ring-blue-500" 
          />
          <button type="submit" className="w-full bg-blue-600 py-3 rounded-xl text-white font-black hover:bg-blue-500 transition-all uppercase tracking-widest">Authenticate</button>
        </form>
      </div>
    </div>
  );
};