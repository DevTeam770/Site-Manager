import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./LoginView.css";

export default function LoginView() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      await login(username, password);
      navigate("/dashboard");
    } catch (err) {
      setError("פרטי ההתחברות אינם נכונים");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="split-login-container">
      {/* צד שמאל: טופס התחברות */}
      <div className="login-form-section">
        <div className="login-content-box">
          <div className="brand-logo">
            <div className="logo-icon"></div>
            <span>SiteManager</span>
          </div>
          
          <div className="welcome-text">
            <h2>ברוכים הבאים</h2>
            <p>התחבר למערכת כדי לנהל את התשתית שלך</p>
          </div>

          <form onSubmit={handleSubmit} className="modern-form">
            <div className="floating-input">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder=" "
                required
              />
              <label>שם משתמש / ID</label>
            </div>

            <div className="floating-input">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" "
                required
              />
              <label>סיסמה</label>
            </div>

            {error && <div className="error-badge">{error}</div>}

            <button type="submit" className="prime-btn" disabled={loading}>
              {loading ? "מאמת נתונים..." : "התחברות למערכת"}
            </button>
          </form>

          <footer className="form-footer">
            <p>© 2026 Infrastructure Control Systems</p>
          </footer>
        </div>
      </div>

      {/* צד ימין: תוכן ויזואלי (תמונה או גרדיאנט טכנולוגי) */}
      <div className="login-visual-section">
        <div className="visual-overlay"></div>
        <div className="visual-content">
          <h3>Real-time Infrastructure Monitoring</h3>
          <div className="status-pills">
            <span className="pill">Cloud</span>
            <span className="pill">On-Prem</span>
            <span className="pill">Security</span>
          </div>
        </div>
      </div>
    </div>
  );
}