import React from 'react';
import { useAuth } from "../../context/AuthContext";

export const Dashboard = ({ sites = [] }) => {
  const { currentUser } = useAuth();

  // הגנה: אם sites הוא לא מערך, נגדיר אותו כמערך ריק כדי למנוע קריסה
  const safeSites = Array.isArray(sites) ? sites : [];

  const stats = {
    sites: safeSites.length,
    sections: safeSites.reduce((a, s) => a + (s.sections?.length || 0), 0),
    phones: safeSites.reduce((a, s) => a + (s.sections?.reduce((a2, sec) => a2 + (sec.phones?.length || 0), 0) || 0), 0)
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        {currentUser && <p style={{color: '#64748b'}}>Welcome back, {currentUser.s_id}</p>}
      </header>

      <div className="stats-grid">
        <div className="v57-stat-card">
          <span className="v57-label">Active Sites</span>
          <div className="v57-number-row">
            <span className="v57-number stat-red">{stats.sites}</span>
            <span className="v57-unit">Units</span>
          </div>
        </div>

        <div className="v57-stat-card">
          <span className="v57-label">Infrastructure</span>
          <div className="v57-number-row">
            <span className="v57-number stat-green">{stats.sections}</span>
            <span className="v57-unit">Sections</span>
          </div>
        </div>

        <div className="v57-stat-card">
          <span className="v57-label">Endpoints</span>
          <div className="v57-number-row">
            <span className="v57-number stat-blue">{stats.phones}</span>
            <span className="v57-unit">Devices</span>
          </div>
        </div>
      </div>
    </div>
  );
};