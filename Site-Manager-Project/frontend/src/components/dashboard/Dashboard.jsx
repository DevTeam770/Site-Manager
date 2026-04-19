import React, { useEffect, useState } from "react";
import { siteAPI, deviceAPI, userAPI } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ sites: 0, devices: 0, users: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [sitesRes, devicesRes, usersRes] = await Promise.all([
          siteAPI.getSites(),
          deviceAPI.getDevices(),
          user.role === 'superadmin' ? userAPI.getAll() : Promise.resolve({ data: [] })
        ]);

        setStats({
          sites: sitesRes.data.length,
          devices: devicesRes.data.length,
          users: usersRes.data.length
        });
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, [user]);

  if (loading) return <div>Loading statistics...</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.username}</h1>
        <p>System Overview & Infrastructure Status</p>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Active Sites</div>
          <div className="kpi-value">{stats.sites}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Total Devices</div>
          <div className="kpi-value">{stats.devices}</div>
        </div>
        {user?.role === 'superadmin' && (
          <div className="kpi-card">
            <div className="kpi-label">Registered Users</div>
            <div className="kpi-value">{stats.users}</div>
          </div>
        )}
      </div>

      <div className="card" style={{ marginTop: '24px' }}>
        <h3 className="card-title">Recent Activity</h3>
        <p className="formal-muted">Connected to Backend: http://localhost:8080</p>
      </div>
    </div>
  );
}