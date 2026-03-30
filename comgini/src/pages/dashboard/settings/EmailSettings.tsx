import { useState } from "react";
import toast from "react-hot-toast";

export default function EmailSettings() {
  const [formData, setFormData] = useState({
    emailFromAddress: "somemail@somedomain.com",
    emailFromName: "Company Name",
    useSMTP: false,
    testMailTo: ""
  });

  const handleSave = () => {
    toast.success("Email settings saved successfully!");
  };

  return (
    <div className="email-settings">
      <h5 className="fw-bold mb-4">Email Settings</h5>
      
      <div className="settings-form" style={{ maxWidth: "800px" }}>
        {/* Email From Address */}
        <div className="row mb-4 align-items-center">
          <div className="col-md-5">
            <label className="fw-semibold small text-dark">Email sent from address</label>
          </div>
          <div className="col-md-7">
            <input 
              type="email" 
              className="form-control form-control-sm" 
              value={formData.emailFromAddress} 
              onChange={(e) => setFormData({...formData, emailFromAddress: e.target.value})}
            />
          </div>
        </div>

        {/* Email From Name */}
        <div className="row mb-4 align-items-center">
          <div className="col-md-5">
            <label className="fw-semibold small text-dark">Email sent from name</label>
          </div>
          <div className="col-md-7">
            <input 
              type="text" 
              className="form-control form-control-sm" 
              value={formData.emailFromName} 
              onChange={(e) => setFormData({...formData, emailFromName: e.target.value})}
            />
          </div>
        </div>

        {/* Use SMTP */}
        <div className="row mb-4 align-items-center">
          <div className="col-md-5">
            <label className="fw-semibold small text-dark">Use SMTP</label>
          </div>
          <div className="col-md-7">
            <div className="form-check">
              <input 
                className="form-check-input" 
                type="checkbox" 
                checked={formData.useSMTP} 
                onChange={(e) => setFormData({...formData, useSMTP: e.target.checked})}
              />
            </div>
          </div>
        </div>

        {/* Send test mail to */}
        <div className="row mb-4 align-items-center">
          <div className="col-md-5">
            <label className="fw-semibold small text-dark">Send a test mail to</label>
            <p className="text-muted mb-0" style={{ fontSize: "11px" }}>Keep it blank if you are not interested to send test mail</p>
          </div>
          <div className="col-md-7">
            <input 
              type="email" 
              className="form-control form-control-sm" 
              placeholder="Enter email to test"
              value={formData.testMailTo} 
              onChange={(e) => setFormData({...formData, testMailTo: e.target.value})}
            />
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
