import { useState } from "react";
import toast from "react-hot-toast";

export default function SetupLoginAuthentication() {
  const [option, setOption] = useState<"not-applicable" | "applicable">("not-applicable");

  const handleSave = () => {
    toast.success("Login authentication settings saved successfully");
  };

  return (
    <div className="setup-login-auth">
      <div className="mb-4">
        <h5 className="fw-bold mb-3">Login Authentication</h5>
        <div className="alert border-0 p-0 mb-4" style={{ backgroundColor: "transparent", fontSize: "13px", lineHeight: "1.6" }}>
          This facility is added to enhance the security of the user account and the database associated with the same. If you enable this, all your team members will be required to enter the OTP received on their respective email addresses to login into the portal. If you do not wish to enable this facility please select "Not applicable".
        </div>
      </div>

      <div className="card shadow-sm border-0 p-4 mb-4">
        <div className="mb-4">
           <div className="d-flex align-items-center gap-2 mb-3">
              <i className="bi bi-key-fill text-muted"></i>
              <span className="fw-bold text-dark" style={{ fontSize: "14px" }}>Email OTP Verification Required for Login Authentication</span>
           </div>
           
           <div className="d-flex flex-column gap-3 ms-4">
              <div className="form-check">
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="otpOption" 
                  id="notApplicable" 
                  checked={option === "not-applicable"}
                  onChange={() => setOption("not-applicable")}
                />
                <label className="form-check-label text-dark fs-6" htmlFor="notApplicable">
                  Not Applicable
                </label>
              </div>
              <div className="form-check">
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="otpOption" 
                  id="applicable" 
                  checked={option === "applicable"}
                  onChange={() => setOption("applicable")}
                />
                <label className="form-check-label text-dark fs-6" htmlFor="applicable">
                  Applicable
                </label>
              </div>
           </div>
        </div>
      </div>

      <div className="mt-4">
        <button className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2" onClick={handleSave} style={{ background: "#3b82f6", borderColor: "#3b82f6" }}>
          <i className="bi bi-check-circle"></i> Save
        </button>
      </div>
    </div>
  );
}
