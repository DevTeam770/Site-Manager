import { useState, useEffect } from "react";
import { siteAPI, deviceAPI } from "../services/api";

export default function SiteManager() {
  const [sites, setSites] = useState([]);
  const [selectedSite, setSelectedSite] = useState(null);
  const [sections, setSections] = useState([]);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    siteAPI.getSites().then(res => setSites(res.data));
  }, []);

  const handleSiteClick = async (site) => {
    setSelectedSite(site);
    const res = await siteAPI.getSections(site.id);
    setSections(res.data);
  };

  return (
    <div className="page">
      <h2 className="page-header">Infrastructure Overview</h2>
      
      <div className="dashboard-split-layout">
        {/* רשימת אתרים */}
        <div className="dashboard-main-col">
          <div className="card">
            <h3 className="card-title">Select Site</h3>
            <div className="meetings-list">
              {sites.map(site => (
                <div 
                  key={site.id} 
                  className={`meeting-row group-clickable ${selectedSite?.id === site.id ? 'active' : ''}`}
                  onClick={() => handleSiteClick(site)}
                >
                  <div className="meeting-title">{site.name}</div>
                  <div className="meeting-meta">{site.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* תאים ומכשירים */}
        <div className="dashboard-favorites-col">
          {selectedSite && (
            <div className="card fill">
              <h3 className="card-title">Sections in {selectedSite.name}</h3>
              {sections.map(sec => (
                <div key={sec.id} className="section-block">
                  <div className="formal-badge">{sec.name}</div>
                  <div className="device-mini-list">
                     {/* כאן אפשר להוסיף רשימת מכשירים פר תא */}
                     <small className="formal-muted">Classification: {sec.classification}</small>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}