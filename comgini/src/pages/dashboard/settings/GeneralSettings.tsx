import { useState } from "react";
import toast from "react-hot-toast";

export default function GeneralSettings() {
  const [formData, setFormData] = useState({
    timezone: "Asia/Kolkata",
    dateFormat: "d-m-Y (30-03-2026)",
    timeFormat: "24 hours",
    firstDayOfWeek: "Monday",
    currency: "INR",
    currencySymbol: "INR",
    decimalSeparator: "Dot (.)",
    noOfDecimals: "2",
    rowsPerPage: "100",
    enableRichText: "Yes",
    showThemeChanger: "Yes",
    defaultThemeColor: "#1e293b"
  });

  const colors = [
    "#1e293b", "#0ea5e9", "#10b981", "#1e293b", "#0284c7", "#334155", "#38bdf8", "#475569", "#6366f1", "#8b5cf6", "#a1a1aa", "#84cc16", "#a855f7", "#d4d4d8", "#dc2626", "#ea580c"
  ];

  const handleSave = () => {
    toast.success("General settings saved successfully!");
  };

  return (
    <div className="general-settings">
      <h5 className="fw-bold mb-4">General Settings</h5>
      
      <div className="settings-form" style={{ maxWidth: "800px" }}>
        {/* Timezone */}
        <div className="row mb-4 align-items-center">
          <div className="col-md-5">
            <label className="fw-semibold small text-dark">Timezone</label>
          </div>
          <div className="col-md-7">
            <select className="form-select form-select-sm" value={formData.timezone} onChange={(e) => setFormData({...formData, timezone: e.target.value})}>
              <option value="Asia/Kolkata">Asia/Kolkata</option>
              <option value="UTC">UTC</option>
            </select>
          </div>
        </div>

        {/* Date Format */}
        <div className="row mb-4 align-items-center">
          <div className="col-md-5">
            <label className="fw-semibold small text-dark">Date Format For Office Task Management Tool</label>
          </div>
          <div className="col-md-7">
            <select className="form-select form-select-sm" value={formData.dateFormat} onChange={(e) => setFormData({...formData, dateFormat: e.target.value})}>
              <option value="d-m-Y (30-03-2026)">d-m-Y ({new Date().toLocaleDateString('en-GB').replace(/\//g, '-')})</option>
              <option value="Y-m-d">Y-m-d</option>
            </select>
          </div>
        </div>

        {/* Time Format */}
        <div className="row mb-4 align-items-center">
          <div className="col-md-5">
            <label className="fw-semibold small text-dark">Time Format</label>
          </div>
          <div className="col-md-7">
            <select className="form-select form-select-sm" value={formData.timeFormat} onChange={(e) => setFormData({...formData, timeFormat: e.target.value})}>
              <option value="24 hours">24 hours</option>
              <option value="12 hours">12 hours</option>
            </select>
          </div>
        </div>

        {/* First Day of Week */}
        <div className="row mb-4 align-items-center">
          <div className="col-md-5">
            <label className="fw-semibold small text-dark">First Day Of Week</label>
          </div>
          <div className="col-md-7">
            <select className="form-select form-select-sm" value={formData.firstDayOfWeek} onChange={(e) => setFormData({...formData, firstDayOfWeek: e.target.value})}>
              <option value="Monday">Monday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </div>
        </div>

        {/* Currency */}
        <div className="row mb-4 align-items-center">
          <div className="col-md-5">
            <label className="fw-semibold small text-dark">Currency</label>
          </div>
          <div className="col-md-7">
            <select className="form-select form-select-sm" value={formData.currency} onChange={(e) => setFormData({...formData, currency: e.target.value})}>
              <option value="INR">INR</option>
              <option value="USD">USD</option>
            </select>
          </div>
        </div>

        {/* Currency Symbol */}
        <div className="row mb-4 align-items-center">
          <div className="col-md-5">
            <label className="fw-semibold small text-dark">Currency Symbol</label>
          </div>
          <div className="col-md-7">
            <input type="text" className="form-control form-control-sm bg-light" value={formData.currencySymbol} readOnly />
          </div>
        </div>

        {/* Decimal Separator */}
        <div className="row mb-4 align-items-center">
          <div className="col-md-5">
            <label className="fw-semibold small text-dark">Decimal Separator</label>
          </div>
          <div className="col-md-7">
            <select className="form-select form-select-sm" value={formData.decimalSeparator} onChange={(e) => setFormData({...formData, decimalSeparator: e.target.value})}>
              <option value="Dot (.)">Dot (.)</option>
              <option value="Comma (,)">Comma (,)</option>
            </select>
          </div>
        </div>

        {/* No of Decimals */}
        <div className="row mb-4 align-items-center">
          <div className="col-md-5">
            <label className="fw-semibold small text-dark">No. of decimals</label>
          </div>
          <div className="col-md-7">
            <select className="form-select form-select-sm" value={formData.noOfDecimals} onChange={(e) => setFormData({...formData, noOfDecimals: e.target.value})}>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
        </div>

        {/* Rows per page */}
        <div className="row mb-4 align-items-center">
          <div className="col-md-5">
            <label className="fw-semibold small text-dark">Rows per page</label>
          </div>
          <div className="col-md-7">
            <select className="form-select form-select-sm" value={formData.rowsPerPage} onChange={(e) => setFormData({...formData, rowsPerPage: e.target.value})}>
              <option value="100">100</option>
              <option value="50">50</option>
              <option value="25">25</option>
            </select>
          </div>
        </div>

        {/* Enable rich text editor */}
        <div className="row mb-4 align-items-center">
          <div className="col-md-5">
            <label className="fw-semibold small text-dark">Enable rich text editor in comments/description</label>
          </div>
          <div className="col-md-7">
            <select className="form-select form-select-sm" value={formData.enableRichText} onChange={(e) => setFormData({...formData, enableRichText: e.target.value})}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>

        {/* Show theme color changer */}
        <div className="row mb-4 align-items-center">
          <div className="col-md-5">
            <label className="fw-semibold small text-dark">Show theme color changer</label>
          </div>
          <div className="col-md-7">
            <select className="form-select form-select-sm" value={formData.showThemeChanger} onChange={(e) => setFormData({...formData, showThemeChanger: e.target.value})}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>

        {/* Default theme color */}
        <div className="row mb-4 align-items-center">
          <div className="col-md-5">
            <label className="fw-semibold small text-dark">Default theme color</label>
          </div>
          <div className="col-md-7 d-flex flex-wrap gap-2">
            {colors.map((color, i) => (
              <div 
                key={i}
                className={`color-box ${formData.defaultThemeColor === color ? "selected" : ""}`}
                style={{ 
                  width: "16px", 
                  height: "16px", 
                  background: color, 
                  borderRadius: "2px", 
                  cursor: "pointer",
                  border: formData.defaultThemeColor === color ? "2px solid #000" : "none"
                }}
                onClick={() => setFormData({...formData, defaultThemeColor: color})}
              />
            ))}
          </div>
        </div>

        <button 
          className="btn btn-primary btn-sm px-4 py-2 mt-3 d-flex align-items-center gap-2"
          onClick={handleSave}
          style={{ background: "#4e73df", borderColor: "#4e73df" }}
        >
          <i className="bi bi-check-circle"></i> Save
        </button>
      </div>

      <style>{`
        .color-box:hover {
          transform: scale(1.2);
          transition: transform 0.1s;
        }
      `}</style>
    </div>
  );
}
