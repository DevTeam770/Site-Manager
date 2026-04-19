import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// וודא שהשורה הזו קיימת ומפנה לנתיב הנכון:
import Sidebar from './components/Sidebar'; 
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
// ...
// ... שאר הייבואים

function App() {
  const { currentUser, login, loading: authLoading } = useAuth();
  const [sites, setSites] = useState([]);
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    const initApp = async () => {
      try {
        // 1. לוגין אוטומטי
        if (!currentUser) {
          await login({ username: 'superadmin', password: 'zaq12wsx' });
        }
        
        // 2. משיכת נתונים עם הגנה
        const response = await fetch('http://localhost:5000/api/sites').catch(() => null);
        if (response && response.ok) {
          const data = await response.json();
          setSites(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error("Initialization error:", err);
      } finally {
        setAppLoading(false);
      }
    };

    initApp();
  }, [currentUser, login]);

  if (authLoading || appLoading) {
    return <div style={{padding: '50px', textAlign: 'center'}}>Loading Site Manager...</div>;
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-wrapper">
        <Topbar />
        <main className="main-content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard sites={sites} />} />
            {/* ... שאר ה-Routes */}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;