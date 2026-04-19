import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// וודא שהשורות האלו קיימות:
import Sidebar from './components/Sidebar'; // <--- זה מה שחסר לך!
import Topbar from './components/Topbar';
import Dashboard from './pages/Dashboard';
import SiteManager from './pages/SiteManager';
// ... שאר הייבואים
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Sidebar.css";

export default function Sidebar() {
  const { user, isAdmin, logout } = useAuth();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="logo-text">SITE MANAGER</span>
      </div>
      
      <nav className="sidebar-nav">
        <div className="nav-group">
          <span className="group-title">MONITORING</span>
          <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
          <NavLink to="/sites" className="nav-link">Site Map</NavLink>
        </div>

        {(isAdmin || user?.role === 'operator') && (
          <div className="nav-group">
            <span className="group-title">MANAGEMENT</span>
            <NavLink to="/devices" className="nav-link">Devices</NavLink>
            {isAdmin && <NavLink to="/users" className="nav-link">User Access</NavLink>}
            {isAdmin && <NavLink to="/groups" className="nav-link">Groups</NavLink>}
          </div>
        )}
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <span className="username">{user?.username}</span>
          <span className="role-badge">{user?.role}</span>
        </div>
        <button onClick={logout} className="logout-btn">Sign Out</button>
      </div>
    </aside>
  );
}