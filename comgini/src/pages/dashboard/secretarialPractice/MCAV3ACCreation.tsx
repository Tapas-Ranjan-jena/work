import { useState } from "react";
import toast from "react-hot-toast";
import secretarialService from "../../../services/secretarialService";

type Step = 1 | 2 | 3;

export default function MCAV3ACCreation() {
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState({
    userCategory: "REGISTERED",
    firstName: "",
    lastName: "",
    pan: "",
    dob: "",
    address: "",
    email: "",
    mobile: "",
    username: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    try {
      setLoading(true);
      const payload = { ...formData };
      delete (payload as any).confirmPassword;
      await secretarialService.createMcaV3Account(payload);
      toast.success("MCA V3 Account Created Successfully");
      setStep(1); // Reset
      setFormData({
        userCategory: "REGISTERED", firstName: "", lastName: "", pan: "",
        dob: "", address: "", email: "", mobile: "", username: "", password: "", confirmPassword: ""
      });
    } catch (error: any) {
      toast.error(error.message || "Failed to create MCA V3 account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mca-v3-ac-creation p-4">
      {/* ⭐ BREADCRUMBS */}
      <nav aria-label="breadcrumb" className="mb-4 text-start">
        <ol className="breadcrumb mb-0 small">
          <li className="breadcrumb-item"><a href="#" className="text-decoration-none text-primary">Home</a></li>
          <li className="breadcrumb-item active" aria-current="page">MCA V3 A/C Creation</li>
        </ol>
      </nav>

      <div className="card shadow-sm border-0 p-5 overflow-hidden">
         <h4 className="fw-bold mb-5 text-start">MCA V-3 Account Creation</h4>

         {/* ⭐ PROGRESS BAR */}
         <div className="d-flex justify-content-between mb-5 position-relative">
            <div className="position-absolute top-50 start-0 translate-middle-y w-100 bg-light" style={{ height: "2px", zIndex: 0 }}></div>
            <div className="position-absolute top-50 start-0 translate-middle-y bg-primary" style={{ height: "2px", zIndex: 0, width: step === 1 ? "0%" : step === 2 ? "50%" : "100%", transition: "0.3s" }}></div>
            
            {[1, 2, 3].map((s) => (
              <div key={s} className="d-flex flex-column align-items-center position-relative" style={{ zIndex: 1, width: "33.33%" }}>
                 <div className={`rounded-circle d-flex align-items-center justify-content-center shadow-sm ${step >= s ? "bg-primary text-white" : "bg-white text-muted border"}`} style={{ width: "40px", height: "40px", fontWeight: "bold" }}>
                    {s}
                 </div>
                 <span className={`small mt-2 fw-bold ${step >= s ? "text-primary" : "text-muted"}`}>
                    {s === 1 ? "User Category" : s === 2 ? "Personal Details" : "Login Details"}
                 </span>
              </div>
            ))}
         </div>

         {/* ⭐ STEP 1: CATEGORY */}
         {step === 1 && (
           <div className="step-content text-start">
              <h5 className="fw-bold mb-4">Step 1: Select User Category</h5>
              <div className="row g-4 mb-5">
                 <div className="col-md-6">
                    <div 
                      className={`card p-4 border text-center shadow-hover h-100 cursor-pointer ${formData.userCategory === 'REGISTERED' ? 'border-primary bg-light bg-opacity-10' : ''}`} 
                      style={{ cursor: "pointer" }}
                      onClick={() => setFormData({...formData, userCategory: 'REGISTERED'})}
                    >
                       <i className={`bi bi-person-check h1 mb-3 ${formData.userCategory === 'REGISTERED' ? 'text-primary' : 'text-muted'}`}></i>
                       <h6 className={`fw-bold mb-2 ${formData.userCategory === 'REGISTERED' ? '' : 'text-muted'}`}>Registered User</h6>
                       <p className="small text-muted mb-0">For individuals who want to access basic services and view data.</p>
                    </div>
                 </div>
                 <div className="col-md-6">
                    <div 
                      className={`card p-4 border text-center shadow-hover h-100 cursor-pointer ${formData.userCategory === 'BUSINESS' ? 'border-primary bg-light bg-opacity-10' : ''}`}
                      style={{ cursor: "pointer" }}
                      onClick={() => setFormData({...formData, userCategory: 'BUSINESS'})}
                    >
                       <i className={`bi bi-briefcase h1 mb-3 ${formData.userCategory === 'BUSINESS' ? 'text-primary' : 'text-muted'}`}></i>
                       <h6 className={`fw-bold mb-2 ${formData.userCategory === 'BUSINESS' ? '' : 'text-muted'}`}>Business User</h6>
                       <p className="small text-muted mb-0">For Professionals, Directors, and Authorized Representatives.</p>
                    </div>
                 </div>
              </div>
              <div className="text-end">
                 <button className="btn btn-primary px-5 py-2" style={{ background: "#2b4cb3" }} onClick={() => setStep(2)}>Next</button>
              </div>
           </div>
         )}

         {/* ⭐ STEP 2: PERSONAL */}
         {step === 2 && (
           <div className="step-content text-start">
              <h5 className="fw-bold mb-4">Step 2: Enter Personal Details</h5>
              <div className="row g-4 mb-5">
                 <div className="col-md-6">
                    <label className="fw-bold small mb-2">First Name <span className="text-danger">*</span></label>
                    <input type="text" className="form-control border-light shadow-sm" placeholder="First Name" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                 </div>
                 <div className="col-md-6">
                    <label className="fw-bold small mb-2">Last Name <span className="text-danger">*</span></label>
                    <input type="text" className="form-control border-light shadow-sm" placeholder="Last Name" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
                 </div>
                 <div className="col-md-6">
                    <label className="fw-bold small mb-2">PAN <span className="text-danger">*</span></label>
                    <input type="text" className="form-control border-light shadow-sm" placeholder="Enter PAN" value={formData.pan} onChange={e => setFormData({...formData, pan: e.target.value})} />
                 </div>
                 <div className="col-md-6">
                    <label className="fw-bold small mb-2">Date of Birth <span className="text-danger">*</span></label>
                    <input type="date" className="form-control border-light shadow-sm" value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} />
                 </div>
                 <div className="col-md-12">
                    <label className="fw-bold small mb-2">Address <span className="text-danger">*</span></label>
                    <textarea className="form-control border-light shadow-sm" rows={3} placeholder="Full Address" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})}></textarea>
                 </div>
              </div>
              <div className="d-flex justify-content-between">
                 <button className="btn btn-outline-secondary px-5" onClick={() => setStep(1)}>Back</button>
                 <button className="btn btn-primary px-5 py-2" style={{ background: "#2b4cb3" }} onClick={() => setStep(3)}>Next</button>
              </div>
           </div>
         )}

         {/* ⭐ STEP 3: LOGIN */}
         {step === 3 && (
           <div className="step-content text-start">
              <h5 className="fw-bold mb-4">Step 3: Setup Login Details</h5>
              <div className="row g-4 mb-5">
                 <div className="col-md-6">
                    <label className="fw-bold small mb-2">Email Address <span className="text-danger">*</span></label>
                    <input type="email" className="form-control border-light shadow-sm" placeholder="email@example.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                 </div>
                 <div className="col-md-6">
                    <label className="fw-bold small mb-2">Mobile Number <span className="text-danger">*</span></label>
                    <input type="text" className="form-control border-light shadow-sm" placeholder="+91" value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} />
                 </div>
                 <div className="col-md-6">
                    <label className="fw-bold small mb-2">Desired Username <span className="text-danger">*</span></label>
                    <input type="text" className="form-control border-light shadow-sm" placeholder="Enter Username" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} />
                 </div>
                 <div className="col-md-6"></div>
                 <div className="col-md-6">
                    <label className="fw-bold small mb-2">Password <span className="text-danger">*</span></label>
                    <input type="password" className="form-control border-light shadow-sm" placeholder="Password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                 </div>
                 <div className="col-md-6">
                    <label className="fw-bold small mb-2">Confirm Password <span className="text-danger">*</span></label>
                    <input type="password" className="form-control border-light shadow-sm" placeholder="Confirm Password" value={formData.confirmPassword} onChange={e => setFormData({...formData, confirmPassword: e.target.value})} />
                 </div>
              </div>
              <div className="d-flex justify-content-between">
                 <button className="btn btn-outline-secondary px-5" onClick={() => setStep(2)}>Back</button>
                 <button className="btn btn-primary px-5 py-2" style={{ background: "#2b4cb3" }} onClick={handleSubmit} disabled={loading}>{loading ? "Submitting..." : "Submit"}</button>
              </div>
           </div>
         )}
      </div>
    </div>
  );
}
