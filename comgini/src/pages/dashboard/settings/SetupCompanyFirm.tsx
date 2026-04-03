import { useState } from "react";

export default function SetupCompanyFirm() {
  const [formData, setFormData] = useState({
    companyName: "Comgini Private Limited",
    registrationNo: "U72900OR2026PTC045874",
    pan: "ABCDE1234F",
    gstin: "21ABCDE1234F1Z5",
    onboardingDate: "2026-04-01",
    companyType: "Private Limited",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="setup-company-firm text-start max-width-800">
      <h5 className="fw-bold mb-4">Company / Firm Setup</h5>

      <div className="card shadow-sm border-0 border-radius-12 overflow-hidden">
        <div className="card-body p-4 p-md-5">
          <div className="row g-4">
            {/* Company Name */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold text-dark mb-2" style={{ fontSize: "14px" }}>Company / Firm Name</label>
              <input 
                type="text" 
                name="companyName"
                className="form-control py-2 px-3 shadow-none bg-light border-0" 
                value={formData.companyName}
                onChange={handleInputChange}
                style={{ borderRadius: "8px", fontSize: "14px" }}
              />
            </div>

            {/* Company Type */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold text-dark mb-2" style={{ fontSize: "14px" }}>Entity Type</label>
              <select 
                name="companyType"
                className="form-select py-2 px-3 shadow-none bg-light border-0" 
                value={formData.companyType}
                onChange={handleInputChange}
                style={{ borderRadius: "8px", fontSize: "14px" }}
              >
                <option value="Private Limited">Private Limited</option>
                <option value="LLP">LLP</option>
                <option value="Proprietorship">Proprietorship</option>
                <option value="Partnership">Partnership</option>
              </select>
            </div>

            {/* Registration No */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold text-dark mb-2" style={{ fontSize: "14px" }}>Registration No / CIN</label>
              <input 
                type="text" 
                name="registrationNo"
                className="form-control py-2 px-3 shadow-none bg-light border-0" 
                value={formData.registrationNo}
                onChange={handleInputChange}
                style={{ borderRadius: "8px", fontSize: "14px" }}
              />
            </div>

            {/* PAN */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold text-dark mb-2" style={{ fontSize: "14px" }}>Permanent Account Number (PAN)</label>
              <input 
                type="text" 
                name="pan"
                className="form-control py-2 px-3 shadow-none bg-light border-0" 
                value={formData.pan}
                onChange={handleInputChange}
                style={{ borderRadius: "8px", fontSize: "14px" }}
              />
            </div>

            {/* GSTIN */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold text-dark mb-2" style={{ fontSize: "14px" }}>GSTIN</label>
              <input 
                type="text" 
                name="gstin"
                className="form-control py-2 px-3 shadow-none bg-light border-0" 
                value={formData.gstin}
                onChange={handleInputChange}
                style={{ borderRadius: "8px", fontSize: "14px" }}
              />
            </div>

            {/* Onboarding Date */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold text-dark mb-2" style={{ fontSize: "14px" }}>Onboarding Date</label>
              <input 
                type="date" 
                name="onboardingDate"
                className="form-control py-2 px-3 shadow-none bg-light border-0" 
                value={formData.onboardingDate}
                onChange={handleInputChange}
                style={{ borderRadius: "8px", fontSize: "14px" }}
              />
            </div>

            {/* Actions */}
            <div className="col-12 mt-5">
              <button 
                className="btn btn-primary d-flex align-items-center justify-content-center gap-2 px-5 py-3 shadow-sm border-0 w-100 w-sm-auto"
                style={{ borderRadius: "10px", background: "#3b82f6", fontWeight: "600" }}
              >
                <i className="bi bi-building-check fs-5"></i>
                Update Company Information
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
