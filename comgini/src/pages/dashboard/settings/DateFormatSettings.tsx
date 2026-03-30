import { useState } from "react";
import toast from "react-hot-toast";

export default function DateFormatSettings() {
  const [formData, setFormData] = useState({
    officeDateFormat: "d-m-Y (30-03-2026)",
    secretarialDateFormat: "D/M/YY (30/03/2026)"
  });

  const handleSave = () => {
    toast.success("Date format settings saved successfully!");
  };

  return (
    <div className="date-format-settings">
      <h5 className="fw-bold mb-4">Date Format</h5>
      
      <div className="settings-form" style={{ maxWidth: "800px" }}>
        {/* Office Task Management Tool Date Format */}
        <div className="row mb-4 align-items-center">
          <div className="col-md-6">
            <label className="fw-semibold small text-dark">Date Format For Office Task Management Tool</label>
          </div>
          <div className="col-md-6">
            <select 
              className="form-select form-select-sm bg-light-subtle" 
              value={formData.officeDateFormat} 
              onChange={(e) => setFormData({...formData, officeDateFormat: e.target.value})}
            >
              <option value="d-m-Y (30-03-2026)">d-m-Y ({new Date().toLocaleDateString('en-GB').replace(/\//g, '-')})</option>
              <option value="Y-m-d">Y-m-d</option>
              <option value="m-d-Y">m-d-Y</option>
            </select>
          </div>
        </div>

        {/* Secretarial Tool Date Format */}
        <div className="row mb-5 align-items-center">
          <div className="col-md-6">
            <label className="fw-semibold small text-dark">Date Format For Secretarial Tool</label>
          </div>
          <div className="col-md-6">
            <select 
              className="form-select form-select-sm bg-light-subtle" 
              value={formData.secretarialDateFormat} 
              onChange={(e) => setFormData({...formData, secretarialDateFormat: e.target.value})}
            >
              <option value="D/M/YY (30/03/2026)">D/M/YY ({new Date().toLocaleDateString('en-GB')})</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
        </div>

        <button 
          className="btn btn-primary btn-sm px-4 py-2 mt-2 d-flex align-items-center gap-2"
          onClick={handleSave}
          style={{ background: "#4e73df", borderColor: "#4e73df" }}
        >
          <i className="bi bi-check-circle"></i> Save
        </button>
      </div>

      <style>{`
        .form-select-sm {
            padding-top: 0.4rem;
            padding-bottom: 0.4rem;
            font-size: 13px;
        }
        .bg-light-subtle {
            background-color: #f8f9fa !important;
        }
      `}</style>
    </div>
  );
}
