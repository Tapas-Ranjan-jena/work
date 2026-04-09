import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import secretarialService from "../../../services/secretarialService";

type ViewType = "list" | "add";

export default function CompanyMCACredentials() {
  const [view, setView] = useState<ViewType>("list");
  const [showExcelModal, setShowExcelModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState<any[]>([]);

  const fetchCredentials = async () => {
    try {
      setLoading(true);
      const res = await secretarialService.getCompanyCredentials();
      const items = res.data?.data || res.data || [];
      const arrayData = Array.isArray(items) ? items : (items.items ? items.items : []);
      setCredentials(arrayData);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load credentials");
    } finally {
      setLoading(false);
    }
  };

  // Form state
  const [formState, setFormState] = useState({
    cin: "",
    company_name: "",
    user_id: "",
    password: "",
    pan: "",
    email: "",
    contact_no: "",
    director_name: "",
    director_email: "",
    director_phone: "",
    hint_question: "",
    hint_answer: ""
  });

  useEffect(() => {
    if (view === "list") {
      fetchCredentials();
    }
  }, [view]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        cin: formState.cin,
        companyName: formState.company_name,
        userId: formState.user_id,
        password: formState.password,
        pan: formState.pan,
        email: formState.email,
        contactNo: formState.contact_no,
        directorNameForOtp: formState.director_name,
        directorMailId: formState.director_email,
        directorPhNo: formState.director_phone,
        hintQuestion: formState.hint_question,
        hintAnswer: formState.hint_answer
      };
      await secretarialService.createCompanyCredentials(payload);
      toast.success("Company MCA Credentials saved successfully");
      setView("list");
      setFormState({
        cin: "", company_name: "", user_id: "", password: "", pan: "", email: "", contact_no: "",
        director_name: "", director_email: "", director_phone: "", hint_question: "", hint_answer: ""
      });
    } catch (error) {
      toast.error("Failed to save credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="company-mca-credentials p-2 p-md-4 text-start">
      {/* ⭐ BREADCRUMBS */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb mb-0 small">
          <li className="breadcrumb-item"><a href="#" className="text-decoration-none text-primary" onClick={() => setView("list")}>Home</a></li>
          {view === "list" ? (
             <li className="breadcrumb-item active" aria-current="page">Company MCA Credentials List</li>
          ) : (
             <>
               <li className="breadcrumb-item"><a href="#" className="text-decoration-none text-primary" onClick={() => setView("list")}>Company MCA Credentials</a></li>
               <li className="breadcrumb-item active" aria-current="page">Add Company MCA Credential</li>
             </>
          )}
        </ol>
      </nav>

      {/* ⭐ LIST VIEW */}
      {view === "list" && (
        <div className="card shadow-sm border-0 p-3 p-md-4">
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3 w-100">
               <h5 className="fw-bold mb-0 text-nowrap">Particulars of Company MCA Credentials</h5>
               <div className="d-flex align-items-center gap-2 ms-auto">
                  <button 
                      className="btn btn-outline-primary d-flex align-items-center justify-content-center px-3 py-1 shadow-sm text-nowrap" 
                      style={{ borderRadius: "6px", fontSize: "12px", height: "34px", width: "fit-content" }} 
                      onClick={() => setShowExcelModal(true)}
                  >
                     <i className="bi bi-file-earmark-excel me-2"></i> Import from excel
                  </button>
                  <button 
                      className="btn btn-primary d-flex align-items-center justify-content-center px-3 py-1 shadow-sm text-nowrap" 
                      style={{ borderRadius: "6px", background: "#2b4cb3", fontSize: "12px", height: "34px", width: "fit-content" }} 
                      onClick={() => setView("add")}
                  >
                     Add Company <i className="bi bi-plus-circle ms-2"></i>
                  </button>
               </div>
            </div>

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-3">
               <div className="d-flex flex-wrap gap-2 w-100 w-md-auto">
                  <button className="btn btn-outline-secondary btn-sm bg-white border flex-fill flex-md-grow-0">Show 10 rows</button>
                  <button className="btn btn-outline-secondary btn-sm bg-white border flex-fill flex-md-grow-0">Excel</button>
               </div>
               <div className="d-flex align-items-center gap-2 small w-100 w-md-auto">
                  <span className="text-nowrap">Search:</span> 
                  <input type="text" className="form-control form-control-sm border w-100" style={{ maxWidth: "220px" }} />
               </div>
            </div>

            <div className="table-responsive border rounded overflow-auto">
              <table className="table table-hover mb-0" style={{ fontSize: "11px" }}>
                <thead style={{ background: "#94a3b8", color: "white" }}>
                  <tr className="align-middle text-nowrap">
                    <th className="px-2 py-2 text-center border-end" style={{ minWidth: "50px" }}>#</th>
                    <th className="px-2 py-2 border-end" style={{ minWidth: "220px" }}>Name of Company</th>
                    <th className="px-2 py-2 border-end" style={{ minWidth: "150px" }}>CIN</th>
                    <th className="px-2 py-2 border-end" style={{ minWidth: "150px" }}>User ID</th>
                    <th className="px-2 py-2 border-end" style={{ minWidth: "120px" }}>PAN</th>
                    <th className="px-2 py-2 border-end" style={{ minWidth: "180px" }}>Phone/Email</th>
                    <th className="px-2 py-2 border-end" style={{ minWidth: "200px" }}>Director Name for OTP</th>
                    <th className="px-2 py-2 border-end" style={{ minWidth: "180px" }}>Director Phone/Email</th>
                    <th className="px-2 py-2 border-end" style={{ minWidth: "180px" }}>Hint Ques/Ans</th>
                    <th className="px-2 py-2" style={{ minWidth: "80px" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={10} className="text-center py-4 text-muted small">Loading...</td>
                    </tr>
                  ) : credentials.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="text-center py-4 text-muted small">No data available in table</td>
                    </tr>
                  ) : (
                    credentials.map((c, i) => (
                      <tr key={c.id || i} className="align-middle">
                        <td className="px-2 py-2 text-center border-end">{i + 1}</td>
                        <td className="px-2 py-2 border-end">{c.companyName}</td>
                        <td className="px-2 py-2 border-end">{c.cin}</td>
                        <td className="px-2 py-2 border-end">{c.userId}</td>
                        <td className="px-2 py-2 border-end">{c.pan}</td>
                        <td className="px-2 py-2 border-end">{c.contactNo} / {c.email}</td>
                        <td className="px-2 py-2 border-end">{c.directorNameForOtp}</td>
                        <td className="px-2 py-2 border-end">{c.directorPhNo} / {c.directorMailId}</td>
                        <td className="px-2 py-2 border-end">{c.hintQuestion} / {c.hintAnswer}</td>
                        <td className="px-2 py-2">
                           <button className="btn btn-sm btn-outline-info rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: "26px", height: "26px" }}>
                              <i className="bi bi-pencil" style={{ fontSize: "12px" }}></i>
                           </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mt-3 gap-3 small text-muted">
               <div>Showing {credentials.length > 0 ? 1 : 0} to {credentials.length} of {credentials.length} entries</div>
               <div className="d-flex gap-0 align-items-center">
                  <button className="btn btn-outline-secondary btn-sm px-3 border-end-0 rounded-start">Previous</button>
                  <button className="btn btn-outline-secondary btn-sm px-3 rounded-end">Next</button>
               </div>
            </div>
        </div>
      )}

      {/* ⭐ ADD FORM */}
      {view === "add" && (
        <div className="card shadow-sm border-0 p-3 p-md-4 position-relative">
            {/* Header with Back Button */}
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-5 border-bottom pb-3 gap-3 w-100">
               <h5 className="fw-bold mb-0 text-nowrap">Enter Particulars of your Company MCA account here.</h5>
               <div className="ms-auto">
                   <button className="btn btn-primary d-flex align-items-center justify-content-center px-3 py-1 shadow-sm text-nowrap" 
                           style={{ borderRadius: "6px", background: "#2b4cb3", fontSize: "12px", height: "34px", width: "fit-content", zIndex: 10 }}
                           onClick={() => setView("list")}>
                      <i className="bi bi-arrow-left-circle me-2"></i> Back
                   </button>
               </div>
            </div>
            
            <div className="row g-0">
               {/* Row 1 */}
               <div className="col-12 col-md-6 mb-4 px-0 px-md-3">
                  <div className="row g-2 align-items-start align-items-sm-center">
                     <label className="col-12 col-sm-4 fw-bold small">CIN</label>
                     <div className="col-12 col-sm-8">
                        <input type="text" 
                               className="form-control border-light shadow-sm py-2 px-3" 
                               placeholder="CIN"
                               value={formState.cin}
                               onChange={(e) => setFormState(prev => ({ ...prev, cin: e.target.value }))} />
                     </div>
                  </div>
               </div>
               <div className="col-12 col-md-6 mb-4 px-0 px-md-3">
                  <div className="row g-2 align-items-start align-items-sm-center">
                     <div className="col-12 text-end mb-1">
                        <a href="#" className="small text-primary text-decoration-none fw-bold" style={{ fontSize: "11px" }}>
                           PREFILL FROM MCA <i className="bi bi-arrow-right-circle"></i>
                        </a>
                     </div>
                     <label className="col-12 col-sm-4 fw-bold small pt-sm-2">Name of Company</label>
                     <div className="col-12 col-sm-8">
                        <input type="text" 
                               className="form-control border-light shadow-sm py-2 px-3" 
                               placeholder="Name of Company"
                               value={formState.company_name}
                               onChange={(e) => setFormState(prev => ({ ...prev, company_name: e.target.value }))} />
                     </div>
                  </div>
               </div>

               {/* Row 2 */}
               <div className="col-12 col-md-6 mb-4 px-0 px-md-3">
                  <div className="row g-2 align-items-start align-items-sm-center">
                     <label className="col-12 col-sm-4 fw-bold small">User ID</label>
                     <div className="col-12 col-sm-8">
                        <input type="text" 
                               className="form-control border-light shadow-sm py-2 px-3" 
                               placeholder="User ID"
                               value={formState.user_id}
                               onChange={(e) => setFormState(prev => ({ ...prev, user_id: e.target.value }))} />
                     </div>
                  </div>
               </div>
               <div className="col-12 col-md-6 mb-4 px-0 px-md-3">
                  <div className="row g-2 align-items-start align-items-sm-center">
                     <label className="col-12 col-sm-4 fw-bold small">Password</label>
                     <div className="col-12 col-sm-8">
                        <input type="password" 
                               className="form-control border-light shadow-sm py-2 px-3" 
                               placeholder="Password"
                               value={formState.password}
                               onChange={(e) => setFormState(prev => ({ ...prev, password: e.target.value }))} />
                     </div>
                  </div>
               </div>

               {/* Row 3 */}
               <div className="col-12 col-md-6 mb-4 px-0 px-md-3">
                  <div className="row g-2 align-items-start align-items-sm-center">
                     <label className="col-12 col-sm-4 fw-bold small">PAN</label>
                     <div className="col-12 col-sm-8">
                        <input type="text" 
                               className="form-control border-light shadow-sm py-2 px-3" 
                               placeholder="PAN"
                               value={formState.pan}
                               onChange={(e) => setFormState(prev => ({ ...prev, pan: e.target.value }))} />
                     </div>
                  </div>
               </div>
               <div className="col-12 col-md-6 mb-4 px-0 px-md-3">
                  <div className="row g-2 align-items-start align-items-sm-center">
                     <label className="col-12 col-sm-4 fw-bold small">Email Id</label>
                     <div className="col-12 col-sm-8">
                        <input type="email" 
                               className="form-control border-light shadow-sm py-2 px-3" 
                               placeholder="Email id"
                               value={formState.email}
                               onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))} />
                     </div>
                  </div>
               </div>

               {/* Row 4 */}
               <div className="col-12 col-md-6 mb-4 px-0 px-md-3">
                  <div className="row g-2 align-items-start align-items-sm-center">
                     <label className="col-12 col-sm-4 fw-bold small">Contact No.</label>
                     <div className="col-12 col-sm-8">
                        <input type="text" 
                               className="form-control border-light shadow-sm py-2 px-3" 
                               placeholder="Contact No."
                               value={formState.contact_no}
                               onChange={(e) => setFormState(prev => ({ ...prev, contact_no: e.target.value }))} />
                     </div>
                  </div>
               </div>
               <div className="col-12 col-md-6 mb-4 px-0 px-md-3">
                  <div className="row g-2 align-items-start align-items-sm-center">
                     <label className="col-12 col-sm-4 fw-bold small">Director Name for OTP</label>
                     <div className="col-12 col-sm-8">
                        <input type="text" 
                               className="form-control border-light shadow-sm py-2 px-3" 
                               placeholder="Director Name for OTP"
                               value={formState.director_name}
                               onChange={(e) => setFormState(prev => ({ ...prev, director_name: e.target.value }))} />
                     </div>
                  </div>
               </div>

               {/* Row 5 */}
               <div className="col-12 col-md-6 mb-4 px-0 px-md-3">
                  <div className="row g-2 align-items-start align-items-sm-center">
                     <label className="col-12 col-sm-4 fw-bold small">Director Mail ID</label>
                     <div className="col-12 col-sm-8">
                        <input type="email" 
                               className="form-control border-light shadow-sm py-2 px-3" 
                               placeholder="Director Mail ID"
                               value={formState.director_email}
                               onChange={(e) => setFormState(prev => ({ ...prev, director_email: e.target.value }))} />
                     </div>
                  </div>
               </div>
               <div className="col-12 col-md-6 mb-4 px-0 px-md-3">
                  <div className="row g-2 align-items-start align-items-sm-center">
                     <label className="col-12 col-sm-4 fw-bold small">Director Ph No.</label>
                     <div className="col-12 col-sm-8">
                        <input type="text" 
                               className="form-control border-light shadow-sm py-2 px-3" 
                               placeholder="Director Ph No."
                               value={formState.director_phone}
                               onChange={(e) => setFormState(prev => ({ ...prev, director_phone: e.target.value }))} />
                     </div>
                  </div>
               </div>

               {/* Row 6 */}
               <div className="col-12 col-md-6 mb-4 px-0 px-md-3">
                  <div className="row g-2 align-items-start align-items-sm-center">
                     <label className="col-12 col-sm-4 fw-bold small">Hint Questions</label>
                     <div className="col-12 col-sm-8">
                        <select className="form-select border-light shadow-sm py-2 px-3"
                                value={formState.hint_question}
                                onChange={(e) => setFormState(prev => ({ ...prev, hint_question: e.target.value }))}>
                           <option value="">Select Hint Question</option>
                           <option value="q1">What is your pet's name?</option>
                           <option value="q2">What is your mother's maiden name?</option>
                        </select>
                     </div>
                  </div>
               </div>
               <div className="col-12 col-md-6 mb-4 px-0 px-md-3">
                  <div className="row g-2 align-items-start align-items-sm-center">
                     <label className="col-12 col-sm-4 fw-bold small">Hint Answer</label>
                     <div className="col-12 col-sm-8">
                        <input type="text" 
                               className="form-control border-light shadow-sm py-2 px-3" 
                               placeholder="Hint Answer"
                               value={formState.hint_answer}
                               onChange={(e) => setFormState(prev => ({ ...prev, hint_answer: e.target.value }))} />
                     </div>
                  </div>
               </div>

               <div className="col-12 mt-4 px-0 px-md-3">
                  <button className="btn btn-primary px-5 py-2 shadow-sm w-100 w-md-auto" 
                          style={{ background: "#2b4cb3" }}
                          onClick={handleSubmit}
                          disabled={loading}>
                     {loading ? "Submitting..." : "Submit"}
                  </button>
               </div>
            </div>
        </div>
      )}

      {/* ⭐ EXCEL MODAL */}
      {showExcelModal && (
        <div className="modal show d-block" style={{ background: "rgba(0,0,0,0.5)", zIndex: 2000 }}>
           <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content overflow-hidden border-0 shadow">
                 <div className="modal-header bg-white py-3 border-bottom d-flex justify-content-center position-relative">
                    <h5 className="modal-title fw-bold">Upload Excel</h5>
                    <button className="btn-close position-absolute end-0 me-3" onClick={() => setShowExcelModal(false)}></button>
                 </div>
                 <div className="modal-body p-3 p-md-5">
                    <div className="bg-light p-3 p-md-4 rounded border">
                       <div className="row g-3 align-items-center">
                          <div className="col-12 col-md-3 fw-bold small text-center text-md-start">Choose file</div>
                          <div className="col-12 col-md-6">
                             <input type="file" className="form-control border py-2 shadow-sm" />
                             <div className="mt-2 text-center text-md-start"><a href="#" className="small text-primary text-decoration-none fw-semibold">Download template file</a></div>
                          </div>
                          <div className="col-12 col-md-3">
                             <button className="btn btn-primary w-100 py-2 shadow-sm" style={{ background: "#2b4cb3" }}>UPLOAD</button>
                          </div>
                       </div>
                    </div>
                 </div>
                 <div className="modal-footer bg-light p-2 text-end border-top">
                    <button className="btn btn-sm btn-outline-secondary px-3" onClick={() => setShowExcelModal(false)}>Close</button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
