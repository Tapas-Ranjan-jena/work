import { useState } from "react";

type Props = {
    onClose: () => void;
};

export default function AddMemberModal({ onClose }: Props) {
    const [step, setStep] = useState(1);

    const nextStep = () => setStep((s) => Math.min(s + 1, 3));
    const prevStep = () => setStep((s) => Math.max(s - 1, 1));

    return (
        <div className="modal-overlay">
            <div className="modal-box" style={{ maxWidth: "800px", padding: 0, overflow: "hidden" }}>
                {/* ⭐ HEADER */}
                <div className="d-flex justify-content-between align-items-center p-3 px-4 border-bottom bg-white">
                    <h5 className="fw-bold mb-0">Add Member</h5>
                    <span style={{ cursor: "pointer", fontSize: "20px" }} onClick={onClose} className="text-muted">
                        ✕
                    </span>
                </div>

                {/* ⭐ STEP PROGRESS */}
                <div className="p-4 py-3 bg-white">
                    <div className="d-flex justify-content-between mb-2 position-relative pt-2 px-3">
                        <div className="d-flex align-items-center gap-2 bg-white px-2" style={{ zIndex: 2 }}>
                            <div className={`step-circle ${step >= 1 ? "active" : ""}`}>
                                {step > 1 ? <i className="bi bi-check text-white"></i> : <div className="inner-dot"></div>}
                            </div>
                            <span className="small fw-medium">General Info</span>
                        </div>
                        <div className="d-flex align-items-center gap-2 bg-white px-2" style={{ zIndex: 2 }}>
                            <div className={`step-circle ${step >= 2 ? "active" : ""}`}>
                                {step > 2 ? <i className="bi bi-check text-white"></i> : <div className="inner-dot"></div>}
                            </div>
                            <span className="small fw-medium">Job Info</span>
                        </div>
                        <div className="d-flex align-items-center gap-2 bg-white px-2" style={{ zIndex: 2 }}>
                            <div className={`step-circle ${step >= 3 ? "active" : ""}`}>
                                <div className="inner-dot"></div>
                            </div>
                            <span className="small fw-medium">Account Settings</span>
                        </div>

                        {/* Progress Bar Background */}
                        <div className="position-absolute top-50 start-0 w-100 translate-middle-y bg-light" style={{ height: "4px", borderRadius: "2px", zIndex: 1, marginTop: "2px", left: "10px", right: "10px", width: "calc(100% - 20px)" }}></div>
                        {/* Active Progress Bar */}
                        <div
                            className="position-absolute top-50 start-0 translate-middle-y bg-success transition-all"
                            style={{
                                height: "4px",
                                borderRadius: "2px",
                                zIndex: 1,
                                marginTop: "2px",
                                left: "10px",
                                width: step === 1 ? "0%" : step === 2 ? "48%" : "95%"
                            }}
                        ></div>
                    </div>
                </div>

                {/* ⭐ STEP CONTENT */}
                <div className="modal-content-scroll px-4 py-3" style={{ maxHeight: "60vh", overflowY: "auto" }}>
                    {step === 1 && <Step1 />}
                    {step === 2 && <Step2 />}
                    {step === 3 && <Step3 />}
                </div>

                {/* ⭐ FOOTER */}
                <div className="p-3 px-4 border-top bg-white d-flex justify-content-end gap-2">
                    <button className="btn btn-white border px-4 h-40 d-flex align-items-center gap-2" onClick={onClose}>
                        <i className="bi bi-x-circle"></i> Close
                    </button>
                    {step > 1 && (
                        <button className="btn btn-white border px-4 h-40 d-flex align-items-center gap-2" onClick={prevStep}>
                            <i className="bi bi-arrow-left-circle"></i> Previous
                        </button>
                    )}
                    {step < 3 ? (
                        <button className="btn btn-primary px-4 h-40 d-flex align-items-center gap-2 bg-gradient-blue" onClick={nextStep}>
                            Next <i className="bi bi-arrow-right-circle"></i>
                        </button>
                    ) : (
                        <button className="btn btn-primary px-4 h-40 d-flex align-items-center gap-2 bg-gradient-blue" onClick={onClose}>
                            <i className="bi bi-check-circle"></i> Save
                        </button>
                    )}
                </div>
            </div>

            <style>{`
        .step-circle {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 1px solid #ddd;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff;
        }
        .step-circle.active {
          border-color: #28a745;
          background: #28a745;
        }
        .inner-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #ddd;
        }
        .step-circle.active .inner-dot {
          background: #fff;
        }
        .bg-gradient-blue {
          background: linear-gradient(90deg, #3346a8 0%, #2f64c6 100%);
          border: none;
        }
        .h-40 { height: 40px; }
        .form-label { font-size: 13px; font-weight: 500; }
        .transition-all { transition: width 0.3s ease; }
      `}</style>
        </div>
    );
}

function Step1() {
    return (
        <div className="row g-4">
            <div className="col-12 d-flex align-items-center gap-3">
                <label className="text-muted w-150-px">First Name</label>
                <input className="form-control" placeholder="First Name" />
            </div>
            <div className="col-12 d-flex align-items-center gap-3">
                <label className="text-muted w-150-px">Last Name</label>
                <input className="form-control" placeholder="Last Name" />
            </div>
            <div className="col-12 d-flex align-items-center gap-3">
                <label className="text-muted w-150-px">Mailing address</label>
                <textarea className="form-control" placeholder="Mailing address" rows={3}></textarea>
            </div>
            <div className="col-12 d-flex align-items-center gap-3">
                <label className="text-muted w-150-px">Phone</label>
                <input className="form-control" placeholder="ea2akspl@gmail.com" />
            </div>
            <div className="col-12 d-flex align-items-center gap-3">
                <label className="text-muted w-150-px">Gender</label>
                <div className="d-flex gap-4">
                    <label className="d-flex align-items-center gap-2">
                        <input type="radio" name="gender" defaultChecked /> Male
                    </label>
                    <label className="d-flex align-items-center gap-2">
                        <input type="radio" name="gender" /> Female
                    </label>
                </div>
            </div>
            <style>{`.w-150-px { width: 150px; flex-shrink: 0; }`}</style>
        </div>
    );
}

function Step2() {
    return (
        <div className="row g-4">
            <div className="col-12 d-flex align-items-center gap-3">
                <label className="text-muted w-150-px">Job Title</label>
                <input className="form-control" placeholder="Job Title" />
            </div>
            <div className="col-12 d-flex align-items-center gap-3">
                <label className="text-muted w-150-px">Salary in hand per month</label>
                <input className="form-control" placeholder="Salary in hand per month" />
            </div>
            <div className="col-12 d-flex align-items-center gap-3">
                <label className="text-muted w-150-px">Salary team</label>
                <input className="form-control" placeholder="Salary team" />
            </div>
            <div className="col-12 d-flex align-items-center gap-3">
                <label className="text-muted w-150-px">Date of hire</label>
                <input className="form-control" type="text" placeholder="Date of hire" onFocus={(e) => (e.target.type = "date")} />
            </div>
            <style>{`.w-150-px { width: 150px; flex-shrink: 0; }`}</style>
        </div>
    );
}

function Step3() {
    return (
        <div className="row g-4">
            <div className="col-12 d-flex align-items-center gap-3">
                <label className="text-muted w-150-px">Email</label>
                <input className="form-control" placeholder="Email" />
            </div>
            <div className="col-12 d-flex align-items-center gap-3">
                <label className="text-muted w-150-px">Password</label>
                <div className="input-group">
                    <input className="form-control" placeholder="Password" />
                    <button className="btn btn-outline-secondary d-flex align-items-center gap-2 small">
                        <i className="bi bi-key"></i> Generate
                    </button>
                    <button className="btn btn-outline-secondary">
                        <i className="bi bi-eye"></i>
                    </button>
                </div>
            </div>
            <div className="col-12 d-flex align-items-center gap-3">
                <label className="text-muted w-150-px">Role</label>
                <select className="form-select">
                    <option>Select Role</option>
                    <option>Admin</option>
                    <option>Team Member</option>
                </select>
            </div>
            <div className="col-12">
                <div className="d-flex align-items-center gap-2 ms-150-px">
                    <input type="checkbox" id="email-details" defaultChecked />
                    <label htmlFor="email-details" className="small">Email login details to this user</label>
                </div>
            </div>
            <style>{`
        .w-150-px { width: 150px; flex-shrink: 0; }
        .ms-150-px { margin-left: 150px; }
      `}</style>
        </div>
    );
}
