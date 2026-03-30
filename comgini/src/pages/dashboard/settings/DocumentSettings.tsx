import { useState } from "react";
import toast from "react-hot-toast";

export default function DocumentSettings() {
  const [formData, setFormData] = useState({
    fontStyle: "Arial",
    fontSize: "11pt",
    defaultSalutation: "Mr./Mrs./Ms.",
    dateFormat: "D/M/YY (30/03/2026)"
  });

  const handleSave = () => {
    toast.success("Document settings saved successfully!");
  };

  return (
    <div className="document-settings">
      <h5 className="fw-bold mb-4">Document Settings</h5>
      
      <div className="settings-form" style={{ maxWidth: "800px" }}>
        {/* Font Style & Size */}
        <div className="row mb-4 align-items-center">
          <div className="col-md-3">
            <label className="fw-semibold small text-dark">Font Style</label>
          </div>
          <div className="col-md-3">
            <select className="form-select form-select-sm" value={formData.fontStyle} onChange={(e) => setFormData({...formData, fontStyle: e.target.value})}>
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
            </select>
          </div>
          <div className="col-md-3 text-end">
            <label className="fw-semibold small text-dark">Font Size</label>
          </div>
          <div className="col-md-3">
            <div className="input-group input-group-sm">
                <input type="text" className="form-control" value={formData.fontSize} readOnly />
            </div>
          </div>
        </div>

        {/* Default Salutation */}
        <div className="row mb-4 align-items-center">
          <div className="col-md-5">
            <label className="fw-semibold small text-dark">Default Salutation For Director/Shareholder/Debentureholder</label>
          </div>
          <div className="col-md-7 d-flex gap-3">
            <div className="form-check">
              <input className="form-check-input" type="radio" name="salutation" checked={formData.defaultSalutation === "Mr./Mrs./Ms."} onChange={() => setFormData({...formData, defaultSalutation: "Mr./Mrs./Ms."})} />
              <label className="form-check-label small">Mr./Mrs./Ms.</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="salutation" checked={formData.defaultSalutation === "Shri/Smt./Sushri"} onChange={() => setFormData({...formData, defaultSalutation: "Shri/Smt./Sushri"})} />
              <label className="form-check-label small">Shri/Smt./Sushri</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="salutation" checked={formData.defaultSalutation === "Shri/Smt./Ms."} onChange={() => setFormData({...formData, defaultSalutation: "Shri/Smt./Ms."})} />
              <label className="form-check-label small">Shri/Smt./Ms.</label>
            </div>
          </div>
        </div>

        {/* Date Format For Secretarial Tool */}
        <div className="row mb-4 align-items-center">
          <div className="col-md-5">
            <label className="fw-semibold small text-dark">Date Format For Secretarial Tool</label>
          </div>
          <div className="col-md-7">
            <select className="form-select form-select-sm" value={formData.dateFormat} onChange={(e) => setFormData({...formData, dateFormat: e.target.value})}>
              <option value="D/M/YY (30/03/2026)">D/M/YY ({new Date().toLocaleDateString('en-GB')})</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
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
    </div>
  );
}
