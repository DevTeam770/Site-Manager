import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// ייבוא רכיבי פריסה (Layout) - שימי לב לנתיב המדויק!
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";

// ייבוא דפים וקומפוננטות
import Dashboard from "./components/dashboard/Dashboard";
import LoginView from "./components/auth/LoginView";
import SiteManager from "./pages/SiteManager"; // או "./components/sites/SiteManager" לפי הצורך
import SettingsView from "./components/settings/SettingsView";

// עיצוב
import "./App.css";

export default function App() {
  const { user, loading } = useAuth();

  // בזמן שהמערכת בודקת אם המשתמש מחובר
  if (loading) {
    return <div className="loading-screen">Loading system...</div>;
  }

  return (
    <Routes>
      {/* דף התחברות - ללא סיידבר */}
      <Route 
        path="/login" 
        element={!user ? <LoginView /> : <Navigate replace to="/dashboard" />} 
      />

      {/* מסלולים מוגנים - דורשים התחברות */}
      <Route
        path="*"
        element={
          user ? (
            <div style={{ display: "flex", minHeight: "100vh" }}>
              {/* סיידבר קבוע בצד שמאל */}
              <Sidebar />
              
              <div style={{ flex: 1, marginLeft: "240px", background: "#f4f6fc" }}>
                {/* טופבר קבוע למעלה */}
                <Topbar />
                
                {/* תוכן העמוד המשתנה */}
                <main style={{ paddingTop: "80px", padding: "24px" }}>
                  <Routes>
                    <Route path="/" element={<Navigate replace to="/dashboard" />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/sites" element={<SiteManager />} />
                    <Route path="/devices" element={<div>Devices Page (TBD)</div>} />
                    <Route path="/users" element={<div>User Management (TBD)</div>} />
                    <Route path="/settings" element={<SettingsView />} />
                    <Route path="/help" element={<div>Help Center</div>} />
                    
                    {/* דף 404 אם הנתיב לא קיים */}
                    <Route path="*" element={<Navigate to="/dashboard" />} />
                  </Routes>
                </main>
              </div>
            </div>
          ) : (
            <Navigate replace to="/login" />
          )
        }
      />
    </Routes>
  );
}