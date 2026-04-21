import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Topbar.css";

export default function Topbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="topbar">
      <div className="topbar-left">
        <span className="topbar-logo">SITE MANAGER</span>
      </div>
      <div className="topbar-right">
        {currentUser?.s_id && (
          <div className="topbar-user">
            <span className="topbar-sid">{currentUser.s_id}</span>
            <span className="topbar-role-badge">ADMIN</span>
          </div>
        )}
        <button className="topbar-logout" onClick={() => { logout(); navigate("/login"); }}>
          Sign out
        </button>
      </div>
    </header>
  );
}