import { useState } from "react";

export default function EmailSettings() {
  const [formData, setFormData] = useState({
    protocol: "SMTP",
    smtpHost: "smtp.gmail.com",
    smtpUser: "support@comgini.com",
    smtpPassword: "••••••••",
    smtpPort: "587",
    encryption: "TLS",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="email-settings text-start max-width-800">
      <h5 className="fw-bold mb-4">Email Settings</h5>

      <div className="card shadow-sm border-0 border-radius-12 overflow-hidden">
        <div className="card-body p-4 p-md-5">
          <div className="row g-4">
            {/* Protocol */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold text-dark mb-2" style={{ fontSize: "14px" }}>Email Protocol</label>
              <select 
                name="protocol"
                className="form-select py-2 px-3 shadow-none bg-light border-0" 
                value={formData.protocol}
                onChange={handleInputChange}
                style={{ borderRadius: "8px", fontSize: "14px" }}
              >
                <option value="SMTP">SMTP</option>
                <option value="Mailgun">Mailgun</option>
                <option value="SendGrid">SendGrid</option>
              </select>
            </div>

            {/* SMTP Host */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold text-dark mb-2" style={{ fontSize: "14px" }}>SMTP Host</label>
              <input 
                type="text" 
                name="smtpHost"
                className="form-control py-2 px-3 shadow-none bg-light border-0" 
                value={formData.smtpHost}
                onChange={handleInputChange}
                style={{ borderRadius: "8px", fontSize: "14px" }}
              />
            </div>

            {/* SMTP User */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold text-dark mb-2" style={{ fontSize: "14px" }}>SMTP Username</label>
              <input 
                type="text" 
                name="smtpUser"
                className="form-control py-2 px-3 shadow-none bg-light border-0" 
                value={formData.smtpUser}
                onChange={handleInputChange}
                style={{ borderRadius: "8px", fontSize: "14px" }}
              />
            </div>

            {/* SMTP Password */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold text-dark mb-2" style={{ fontSize: "14px" }}>SMTP Password</label>
              <input 
                type="password" 
                name="smtpPassword"
                className="form-control py-2 px-3 shadow-none bg-light border-0" 
                value={formData.smtpPassword}
                onChange={handleInputChange}
                style={{ borderRadius: "8px", fontSize: "14px" }}
              />
            </div>

            {/* SMTP Port */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold text-dark mb-2" style={{ fontSize: "14px" }}>SMTP Port</label>
              <input 
                type="text" 
                name="smtpPort"
                className="form-control py-2 px-3 shadow-none bg-light border-0" 
                value={formData.smtpPort}
                onChange={handleInputChange}
                style={{ borderRadius: "8px", fontSize: "14px" }}
              />
            </div>

            {/* Encryption */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold text-dark mb-2" style={{ fontSize: "14px" }}>Encryption</label>
              <select 
                name="encryption"
                className="form-select py-2 px-3 shadow-none bg-light border-0" 
                value={formData.encryption}
                onChange={handleInputChange}
                style={{ borderRadius: "8px", fontSize: "14px" }}
              >
                <option value="TLS">TLS</option>
                <option value="SSL">SSL</option>
                <option value="None">None</option>
              </select>
            </div>

            {/* Actions */}
            <div className="col-12 mt-5 d-flex flex-column flex-sm-row gap-3">
              <button 
                className="btn btn-primary d-flex align-items-center justify-content-center gap-2 px-5 py-3 shadow-sm border-0 w-100 w-sm-auto"
                style={{ borderRadius: "10px", background: "#3b82f6", fontWeight: "600" }}
              >
                <i className="bi bi-save fs-5"></i>
                Save Configuration
              </button>
              <button 
                className="btn btn-light border d-flex align-items-center justify-content-center gap-2 px-4 py-3 shadow-sm w-100 w-sm-auto"
                style={{ borderRadius: "10px", color: "#64748b", fontWeight: "600" }}
              >
                <i className="bi bi-send-check fs-5"></i>
                Send Test Email
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .max-width-800 { max-width: 800px; margin: 0 auto; }
        .form-select, .form-control { transition: all 0.2s ease; }
        .form-select:focus, .form-control:focus { background-color: #f1f5f9 !important; box-shadow: none !important; }
        .border-radius-12 { border-radius: 12px; }
      `}</style>
    </div>
  );
}
