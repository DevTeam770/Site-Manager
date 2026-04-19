import React, { useState } from 'react';
import { Lock, Unlock, Trash2, Edit3, ArrowRight, Check, X } from 'lucide-react';

export const SiteManager = ({ sites, setSites, navLevel, setNavLevel }) => {
  const [selectedSiteId, setSelectedSiteId] = useState(null);
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [unlockedIds, setUnlockedIds] = useState([]);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  
  const activeSite = sites.find(s => s.id === selectedSiteId);
  const activeSection = activeSite?.sections?.find(sec => sec.id === selectedSectionId);
  const list = navLevel === 'list' ? sites : navLevel === 'sections' ? activeSite?.sections : activeSection?.phones;

  const handleUnlock = (item) => {
    if (unlockedIds.includes(item.id)) {
      if (navLevel === 'list') { setSelectedSiteId(item.id); setNavLevel('sections'); }
      else if (navLevel === 'sections') { setSelectedSectionId(item.id); setNavLevel('phones'); }
    } else {
      const pass = prompt("Enter Access Key:");
      if (pass === "zaq12wsx") setUnlockedIds([...unlockedIds, item.id]);
    }
  };

  const executeDelete = (id) => {
    const filter = (arr) => arr.filter(i => i.id !== id);
    if (navLevel === 'list') setSites(filter(sites));
    else if (navLevel === 'sections') {
      setSites(sites.map(s => s.id === selectedSiteId ? { ...s, sections: filter(s.sections) } : s));
    } else {
      setSites(sites.map(s => s.id === selectedSiteId ? { ...s, sections: s.sections.map(sec => sec.id === selectedSectionId ? { ...sec, phones: filter(sec.phones) } : sec) } : s));
    }
    setConfirmDeleteId(null);
  };

  const saveEdit = (id) => {
    const update = (arr) => arr.map(i => i.id === id ? { ...i, name: editValue.toUpperCase() } : i);
    if (navLevel === 'list') setSites(update(sites));
    else if (navLevel === 'sections') setSites(sites.map(s => s.id === selectedSiteId ? { ...s, sections: update(s.sections) } : s));
    else setSites(sites.map(s => s.id === selectedSiteId ? { ...s, sections: s.sections.map(sec => sec.id === selectedSectionId ? { ...sec, phones: update(sec.phones) } : sec) } : s));
    setEditingId(null);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header flex justify-between items-center">
        <h1>{navLevel === 'list' ? 'Sites' : navLevel.toUpperCase()}</h1>
        {navLevel !== 'list' && (
          <button onClick={() => setNavLevel(navLevel === 'phones' ? 'sections' : 'list')} className="text-blue-600 font-bold text-[11px] uppercase flex items-center gap-2">
            Back <ArrowRight size={14} />
          </button>
        )}
      </header>

      <main className="flex gap-12 mt-10">
        <div className="w-2/3 dashboard-section border-none">
          <div className="space-y-8">
            {list?.map(item => (
              <div key={item.id} className="flex items-center justify-between border-b border-slate-50 pb-8 group">
                <div className="flex items-center gap-6 cursor-pointer flex-1" onClick={() => !editingId && handleUnlock(item)}>
                  {unlockedIds.includes(item.id) ? <Unlock className="text-green-500" size={24} /> : <Lock className="text-slate-200" size={24} />}
                  
                  {editingId === item.id ? (
                    <input autoFocus value={editValue} onChange={(e) => setEditValue(e.target.value)} className="entry-name-large border-b-2 border-blue-500 outline-none w-full" />
                  ) : (
                    <span className="entry-name-large group-hover:text-blue-600 transition-colors">{item.name}</span>
                  )}
                </div>

                {unlockedIds.includes(item.id) && (
                  <div className="flex items-center gap-4">
                    {confirmDeleteId === item.id ? (
                      <div className="delete-confirm-box flex items-center gap-3">
                        <span>Are you sure?</span>
                        <button onClick={() => executeDelete(item.id)} className="bg-red-600 text-white px-3 py-1 rounded text-[10px] font-bold">YES</button>
                        <button onClick={() => setConfirmDeleteId(null)} className="text-slate-400 font-bold">NO</button>
                      </div>
                    ) : editingId === item.id ? (
                      <div className="flex gap-2">
                        <Check className="text-green-500 cursor-pointer" onClick={() => saveEdit(item.id)} />
                        <X className="text-red-500 cursor-pointer" onClick={() => setEditingId(null)} />
                      </div>
                    ) : (
                      <>
                        <Edit3 size={18} className="text-slate-300 hover:text-blue-500 cursor-pointer" 
                               onClick={(e) => { e.stopPropagation(); setEditingId(item.id); setEditValue(item.name); }} />
                        <Trash2 size={18} className="text-slate-300 hover:text-red-500 cursor-pointer" 
                               onClick={(e) => { e.stopPropagation(); setConfirmDeleteId(item.id); }} />
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};