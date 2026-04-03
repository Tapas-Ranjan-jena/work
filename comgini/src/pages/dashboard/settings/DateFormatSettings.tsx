import { useState } from "react";

export default function DateFormatSettings() {
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");
  const [timeFormat, setTimeFormat] = useState("12-hour (hh:mm AM/PM)");

  const handleSave = () => {
    console.log("Date/Time format saved");
  };

  return (
    <div className="date-format-settings text-start max-width-700">
      <h5 className="fw-bold mb-4">Date & Time Format</h5>

      <div className="card shadow-sm border-0 border-radius-12 overflow-hidden">
        <div className="card-body p-4 p-md-5">
            <div className="row g-4">
                {/* Date Format */}
                <div className="col-12">
                    <label className="form-label fw-semibold text-dark mb-2" style={{ fontSize: "14px" }}>Date Format</label>
                    <p className="text-muted small mb-3">Choose how dates should be displayed across the application.</p>
                    <div className="d-flex flex-column gap-2">
                        {[
                            "DD/MM/YYYY (e.g. 01/04/2026)",
                            "MM/DD/YYYY (e.g. 04/01/2026)",
                            "YYYY-MM-DD (e.g. 2026-04-01)",
                            "DD-MMM-YYYY (e.g. 01-Apr-2026)"
                        ].map((format) => (
                            <div key={format} className="form-check d-flex align-items-center gap-2 px-3 py-3 rounded-3 border-0 bg-light" style={{ cursor: 'pointer' }} onClick={() => setDateFormat(format)}>
                                <input 
                                    className="form-check-input mt-0 shadow-none" 
                                    type="radio" 
                                    name="dateFormat" 
                                    checked={dateFormat === format}
                                    readOnly
                                    style={{ width: "18px", height: "18px" }}
                                />
                                <label className="form-check-label text-dark mb-0 ms-1" style={{ fontSize: "14px", cursor: 'pointer' }}>{format}</label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Time Format */}
                <div className="col-12 mt-5">
                    <label className="form-label fw-semibold text-dark mb-2" style={{ fontSize: "14px" }}>Time Format</label>
                    <select 
                        className="form-select py-2 px-3 shadow-none bg-light border-0" 
                        value={timeFormat}
                        onChange={(e) => setTimeFormat(e.target.value)}
                        style={{ borderRadius: "8px", fontSize: "14px" }}
                    >
                        <option value="12-hour (hh:mm AM/PM)">12-hour (hh:mm AM/PM)</option>
                        <option value="24-hour (HH:mm)">24-hour (HH:mm)</option>
                    </select>
                </div>

                {/* Actions */}
                <div className="col-12 mt-5">
                    <button 
                        className="btn btn-primary d-flex align-items-center justify-content-center gap-2 px-5 py-3 shadow-sm border-0 w-100 w-sm-auto"
                        onClick={handleSave}
                        style={{ borderRadius: "10px", background: "#3b82f6", fontWeight: "600" }}
                    >
                        <i className="bi bi-calendar-check fs-5"></i>
                        Save Format Settings
                    </button>
                </div>
            </div>
        </div>
      </div>

      <style>{`
        .max-width-700 { max-width: 700px; margin: 0 auto; }
        .form-check { transition: all 0.2s ease; border: 1px solid transparent !important; }
        .form-check:hover { background-color: #eef2ff !important; border-color: #3b82f6 !important; }
        .form-check-input:checked { background-color: #3b82f6; border-color: #3b82f6; }
        .border-radius-12 { border-radius: 12px; }
      `}</style>
    </div>
  );
}
