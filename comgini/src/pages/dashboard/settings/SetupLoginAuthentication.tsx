import { useState } from "react";

export default function SetupLoginAuthentication() {
  const [twoFactor, setTwoFactor] = useState(false);
  const [socialLogin, setSocialLogin] = useState({
    google: true,
    microsoft: false,
    linkedin: false,
  });

  return (
    <div className="setup-login-auth-page text-start max-width-700">
      <h5 className="fw-bold mb-4">Login & Authentication</h5>

      <div className="card shadow-sm border-0 border-radius-12 overflow-hidden mb-4">
        <div className="card-body p-4 p-md-5">
            <div className="d-flex flex-column gap-5">
                {/* 2FA Section */}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 pb-4 border-bottom">
                    <div>
                        <h6 className="fw-bold mb-1">Two-Factor Authentication (2FA)</h6>
                        <p className="text-muted small mb-0">Add an extra layer of security to your account by requiring more than just a password to log in.</p>
                    </div>
                    <div className="form-check form-switch ps-0 d-flex align-items-center">
                        <input 
                            className="form-check-input ms-0 shadow-none" 
                            type="checkbox" 
                            role="switch" 
                            checked={twoFactor}
                            onChange={() => setTwoFactor(!twoFactor)}
                            style={{ width: '45px', height: '24px', cursor: 'pointer' }}
                        />
                    </div>
                </div>

                {/* Social Login Section */}
                <div>
                   <h6 className="fw-bold mb-3">Social Login Settings</h6>
                   <p className="text-muted small mb-4">Enable or disable social login providers for your organization.</p>
                   
                   <div className="d-flex flex-column gap-3">
                        {Object.entries(socialLogin).map(([provider, enabled]) => (
                            <div key={provider} className="d-flex align-items-center justify-content-between p-3 rounded-3 bg-light transition-all border border-transparent hover-border-primary">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="bg-white rounded p-2 shadow-sm d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                        <i className={`bi bi-${provider} fs-5 text-dark`}></i>
                                    </div>
                                    <span className="fw-medium text-capitalize">{provider} Login</span>
                                </div>
                                <div className="form-check form-switch ps-0">
                                    <input 
                                        className="form-check-input ms-0 shadow-none" 
                                        type="checkbox" 
                                        role="switch" 
                                        checked={enabled}
                                        onChange={() => setSocialLogin(prev => ({ ...prev, [provider]: !enabled }))}
                                        style={{ width: '40px', height: '20px', cursor: 'pointer' }}
                                    />
                                </div>
                            </div>
                        ))}
                   </div>
                </div>

                {/* Actions */}
                <div className="pt-3">
                    <button className="btn btn-primary d-flex align-items-center justify-content-center gap-2 px-5 py-3 shadow-sm border-0 w-100 w-sm-auto" style={{ borderRadius: "10px", background: "#3b82f6", fontWeight: "600" }}>
                        <i className="bi bi-shield-check fs-5"></i>
                        Save Auth Settings
                    </button>
                </div>
            </div>
        </div>
      </div>

      <style>{`
        .max-width-700 { max-width: 700px; margin: 0 auto; }
        .border-radius-12 { border-radius: 12px; }
        .form-check-input:checked { background-color: #3b82f6; border-color: #3b82f6; }
        .hover-border-primary:hover { border-color: #3b82f6 !important; background-color: #f8fafc !important; }
        .border-transparent { border-color: transparent !important; }
        .transition-all { transition: all 0.2s ease-in-out; }
      `}</style>
    </div>
  );
}
