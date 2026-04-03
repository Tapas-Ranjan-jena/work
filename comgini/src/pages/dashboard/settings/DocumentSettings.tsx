import { useState } from "react";

export default function DocumentSettings() {
  const [fontStyle, setFontStyle] = useState("Arial");
  const [fontSize, setFontSize] = useState("11pt");
  const [salutation, setSalutation] = useState("Mr./Mrs./Ms.");
  const [dateFormat, setDateFormat] = useState("D/M/YY (01/04/2026)");

  const handleSave = () => {
    // Save logic
    console.log("Settings saved");
  };

  return (
    <div className="document-settings text-start max-width-700">
      <h5 className="fw-bold mb-4">Document Settings</h5>

      <div className="card shadow-sm border-0 border-radius-12 overflow-hidden">
        <div className="card-body p-4 p-md-5">
          <div className="row g-4">
            {/* Font Style */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold text-dark mb-2" style={{ fontSize: "14px" }}>Font Style</label>
              <select 
                className="form-select py-2 px-3 shadow-none bg-light border-0" 
                value={fontStyle}
                onChange={(e) => setFontStyle(e.target.value)}
                style={{ borderRadius: "8px", fontSize: "14px" }}
              >
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Roboto">Roboto</option>
                <option value="Helvetica">Helvetica</option>
              </select>
            </div>

            {/* Font Size */}
            <div className="col-12 col-md-6 text-md-end">
              <label className="form-label fw-semibold text-dark mb-2 w-100 text-md-start" style={{ fontSize: "14px" }}>Font Size</label>
              <input 
                type="text" 
                className="form-control py-2 px-3 shadow-none bg-light border-0" 
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                style={{ borderRadius: "8px", fontSize: "14px" }}
              />
            </div>

            {/* Salutation */}
            <div className="col-12 mt-4">
              <label className="form-label fw-semibold text-dark mb-3 d-block" style={{ fontSize: "14px" }}>
                Default Salutation For Director/Shareholder/Debentureholder
              </label>
              <div className="d-flex flex-column flex-sm-row gap-4 flex-wrap">
                <div className="form-check d-flex align-items-center gap-2 mb-0">
                  <input 
                    className="form-check-input mt-0" 
                    type="radio" 
                    name="salutation" 
                    id="salt1" 
                    checked={salutation === "Mr./Mrs./Ms."}
                    onChange={() => setSalutation("Mr./Mrs./Ms.")}
                    style={{ width: '18px', height: '18px' }}
                  />
                  <label className="form-check-label text-secondary mb-0" htmlFor="salt1" style={{ fontSize: "14px", cursor: 'pointer' }}>Mr./Mrs./Ms.</label>
                </div>
                <div className="form-check d-flex align-items-center gap-2 mb-0">
                  <input 
                    className="form-check-input mt-0" 
                    type="radio" 
                    name="salutation" 
                    id="salt2" 
                    checked={salutation === "Shri/Smt./Sushri"}
                    onChange={() => setSalutation("Shri/Smt./Sushri")}
                    style={{ width: '18px', height: '18px' }}
                  />
                  <label className="form-check-label text-secondary mb-0" htmlFor="salt2" style={{ fontSize: "14px", cursor: 'pointer' }}>Shri/Smt./Sushri</label>
                </div>
                <div className="form-check d-flex align-items-center gap-2 mb-0">
                  <input 
                    className="form-check-input mt-0" 
                    type="radio" 
                    name="salutation" 
                    id="salt3" 
                    checked={salutation === "Shri/Smt./"}
                    onChange={() => setSalutation("Shri/Smt./")}
                    style={{ width: '18px', height: '18px' }}
                  />
                  <label className="form-check-label text-secondary mb-0" htmlFor="salt3" style={{ fontSize: "14px", cursor: 'pointer' }}>Shri/Smt./</label>
                </div>
              </div>
            </div>

            {/* Date Format */}
            <div className="col-12 mt-4 pt-1">
              <label className="form-label fw-semibold text-dark mb-2" style={{ fontSize: "14px" }}>Date Format For Secretarial Tool</label>
              <select 
                className="form-select py-2 px-3 shadow-none bg-light border-0" 
                value={dateFormat}
                onChange={(e) => setDateFormat(e.target.value)}
                style={{ borderRadius: "8px", fontSize: "14px" }}
              >
                <option value="D/M/YY (01/04/2026)">D/M/YY (01/04/2026)</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              </select>
            </div>

            {/* Actions */}
            <div className="col-12 mt-5">
              <button 
                className="btn btn-primary d-flex align-items-center justify-content-center gap-2 px-5 py-3 shadow-sm border-0 w-100 w-sm-auto"
                onClick={handleSave}
                style={{ borderRadius: "10px", background: "#3b82f6", fontWeight: "600" }}
              >
                <i className="bi bi-check2-circle fs-5"></i>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .max-width-700 { max-width: 700px; margin: 0 auto; }
        .form-select, .form-control { transition: all 0.2s ease; }
        .form-select:focus, .form-control:focus { background-color: #f8fafc !important; box-shadow: none !important; }
        .form-check-input:checked { background-color: #3b82f6; border-color: #3b82f6; }
        .border-radius-12 { border-radius: 12px; }
      `}</style>
    </div>
  );
}
