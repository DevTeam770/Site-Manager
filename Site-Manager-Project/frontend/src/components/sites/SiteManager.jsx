import React, { useState, useEffect } from "react";
import { siteAPI } from "../services/api"; // וודא שהנתיב ל-api.js נכון
import "./SiteManager.css";

export default function SiteManager() {
  const [sites, setSites] = useState([]);
  const [selectedSite, setSelectedSite] = useState(null);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // טעינת רשימת האתרים בטעינת העמוד
  useEffect(() => {
    const fetchSites = async () => {
      try {
        setLoading(true);
        const res = await siteAPI.getSites();
        setSites(res.data);
      } catch (err) {
        setError("Failed to load sites.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSites();
  }, []);

  // פונקציה ללחיצה על אתר - טעינת התאים (Sections) שלו
  const handleSiteSelect = async (site) => {
    setSelectedSite(site);
    try {
      const res = await siteAPI.getSections(site.id);
      setSections(res.data);
    } catch (err) {
      console.error("Failed to load sections", err);
      setSections([]);
    }
  };

  if (loading && sites.length === 0) return <div className="loading-screen">Loading sites...</div>;

  return (
    <div className="page site-manager">
      <h2 className="page-header">Infrastructure Hierarchy</h2>
      
      {error && <div className="error-banner">{error}</div>}

      <div className="dashboard-split-layout">
        {/* עמודה שמאלית: רשימת אתרים */}
        <div className="dashboard-main-col">
          <div className="card">
            <h3 className="card-title">Select Physical Site</h3>
            <div className="meetings-list">
              {sites.map((site) => (
                <div
                  key={site.id}
                  className={`meeting-row group-clickable ${selectedSite?.id === site.id ? "active-site" : ""}`}
                  onClick={() => handleSiteSelect(site)}
                >
                  <div>
                    <div className="meeting-title">{site.name}</div>
                    <div className="meeting-meta">{site.description || "No description available"}</div>
                  </div>
                  <div className="badge-manage">Select</div>
                </div>
              ))}
              {sites.length === 0 && <p className="empty-state">No sites found in database.</p>}
            </div>
          </div>
        </div>

        {/* עמודה ימנית: הצגת תאים (Sections) של האתר שנבחר */}
        <div className="dashboard-favorites-col">
          {selectedSite ? (
            <div className="card fill">
              <h3 className="card-title">Sections in {selectedSite.name}</h3>
              <div className="sections-grid">
                {sections.length > 0 ? (
                  sections.map((section) => (
                    <div key={section.id} className="meeting-item">
                      <div className="meeting-info">
                        <span className="meeting-id">{section.name}</span>
                        <span className="meeting-group">Classification: {section.classification}</span>
                      </div>
                      <span className="meeting-badge">View Devices</span>
                    </div>
                  ))
                ) : (
                  <p className="empty-state">No sections assigned to this site.</p>
                )}
              </div>
            </div>
          ) : (
            <div className="card fill" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p className="formal-muted">Please select a site from the left to view its sections.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}