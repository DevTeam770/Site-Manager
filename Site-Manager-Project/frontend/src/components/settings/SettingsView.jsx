import React from "react";
import { useAuth } from "../../context/AuthContext";

export default function SettingsView() {
  const { user } = useAuth();

  return (
    <div className="page settings-page">
      <h2 className="page-header">System Settings</h2>
      
      <div className="card" style={{ maxWidth: '600px' }}>
        <h3 className="card-title">User Profile</h3>
        <div style={{ marginBottom: '20px' }}>
          <p><strong>Username:</strong> {user?.username}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Role:</strong> <span className="badge-manage">{user?.role}</span></p>
        </div>
        
        <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '20px 0' }} />
        
        <h3 className="card-title">Preferences</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input type="checkbox" defaultChecked /> Receive system alerts
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input type="checkbox" defaultChecked /> Dark mode (Coming soon)
          </label>
        </div>

        <button 
          className="btn-primary" 
          style={{ marginTop: '24px', backgroundColor: '#64748b' }}
          onClick={() => alert("Settings saved locally")}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}