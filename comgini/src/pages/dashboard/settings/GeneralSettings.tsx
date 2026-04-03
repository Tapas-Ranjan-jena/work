import { useState } from "react";

export default function GeneralSettings() {
  const [formData, setFormData] = useState({
    siteName: "Comgini",
    siteEmail: "support@comgini.com",
    phone: "+91 9876543210",
    address: "Bhubaneswar, Odisha, India",
    currency: "INR",
    timezone: "(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="general-settings text-start max-width-800">
      <h5 className="fw-bold mb-4">General Settings</h5>

      <div className="card shadow-sm border-0 border-radius-12 overflow-hidden">
        <div className="card-body p-4 p-md-5">
          <div className="row g-4">
            {/* Site Name */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold text-dark mb-2" style={{ fontSize: "14px" }}>Site Name</label>
              <input 
                type="text" 
                name="siteName"
                className="form-control py-2 px-3 shadow-none bg-light border-0" 
                value={formData.siteName}
                onChange={handleInputChange}
                style={{ borderRadius: "8px", fontSize: "14px" }}
              />
            </div>

            {/* Site Email */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold text-dark mb-2" style={{ fontSize: "14px" }}>Site Email</label>
              <input 
                type="email" 
                name="siteEmail"
                className="form-control py-2 px-3 shadow-none bg-light border-0" 
                value={formData.siteEmail}
                onChange={handleInputChange}
                style={{ borderRadius: "8px", fontSize: "14px" }}
              />
            </div>

            {/* Phone */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold text-dark mb-2" style={{ fontSize: "14px" }}>Phone Number</label>
              <input 
                type="tel" 
                name="phone"
                className="form-control py-2 px-3 shadow-none bg-light border-0" 
                value={formData.phone}
                onChange={handleInputChange}
                style={{ borderRadius: "8px", fontSize: "14px" }}
              />
            </div>

            {/* Currency */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold text-dark mb-2" style={{ fontSize: "14px" }}>Currency</label>
              <select 
                name="currency"
                className="form-select py-2 px-3 shadow-none bg-light border-0" 
                value={formData.currency}
                onChange={handleInputChange}
                style={{ borderRadius: "8px", fontSize: "14px" }}
              >
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </div>

            {/* Timezone */}
            <div className="col-12">
              <label className="form-label fw-semibold text-dark mb-2" style={{ fontSize: "14px" }}>Timezone</label>
              <select 
                name="timezone"
                className="form-select py-2 px-3 shadow-none bg-light border-0" 
                value={formData.timezone}
                onChange={handleInputChange}
                style={{ borderRadius: "8px", fontSize: "14px" }}
              >
                <option value="(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi">(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
                <option value="(GMT+00:00) Greenwich Mean Time">Greenwich Mean Time</option>
              </select>
            </div>

            {/* Address */}
            <div className="col-12">
              <label className="form-label fw-semibold text-dark mb-2" style={{ fontSize: "14px" }}>Company Address</label>
              <textarea 
                name="address"
                className="form-control py-2 px-3 shadow-none bg-light border-0" 
                value={formData.address}
                onChange={(e: any) => handleInputChange(e)}
                rows={3}
                style={{ borderRadius: "8px", fontSize: "14px", resize: "none" }}
              ></textarea>
            </div>

            {/* Actions */}
            <div className="col-12 mt-5">
              <button 
                className="btn btn-primary d-flex align-items-center justify-content-center gap-2 px-5 py-3 shadow-sm border-0 w-100 w-sm-auto"
                style={{ borderRadius: "10px", background: "#3b82f6", fontWeight: "600" }}
              >
                <i className="bi bi-save fs-5"></i>
                Save General Settings
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
