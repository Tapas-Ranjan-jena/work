import { useState } from "react";

type ViewType = "list" | "add";

export default function DirectorMCACredentials() {
  const [view, setView] = useState<ViewType>("list");
  const [showExcelModal, setShowExcelModal] = useState(false);

  return (
    <div className="director-mca-credentials p-2 p-md-4 text-start">
      {/* ⭐ BREADCRUMBS */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb mb-0 small">
          <li className="breadcrumb-item"><a href="#" className="text-decoration-none text-primary" onClick={() => setView("list")}>Home</a></li>
          {view === "list" ? (
             <li className="breadcrumb-item active" aria-current="page">Director MCA Credentials List</li>
          ) : (
             <>
               <li className="breadcrumb-item"><a href="#" className="text-decoration-none text-primary" onClick={() => setView("list")}>Director MCA Credentials</a></li>
               <li className="breadcrumb-item active" aria-current="page">Add Director MCA Credential</li>
             </>
          )}
        </ol>
      </nav>

      {/* ⭐ LIST VIEW */}
      {view === "list" && (
        <div className="card shadow-sm border-0 p-3 p-md-4">
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3 w-100 text-start">
               <h5 className="fw-bold mb-0 text-nowrap">Particulars of Director MCA Credentials</h5>
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
                     Add Director <i className="bi bi-plus-circle ms-2"></i>
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
                    <th className="px-2 py-2 border-end" style={{ minWidth: "220px" }}>Name of Director</th>
                    <th className="px-2 py-2 border-end" style={{ minWidth: "120px" }}>DIN</th>
                    <th className="px-2 py-2 border-end" style={{ minWidth: "200px" }}>Contact No./Email</th>
                    <th className="px-2 py-2 border-end" style={{ minWidth: "180px" }}>User ID/Password</th>
                    <th className="px-2 py-2 border-end" style={{ minWidth: "180px" }}>Hint Ques/Ans</th>
                    <th className="px-2 py-2" style={{ minWidth: "80px" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={7} className="text-center py-4 text-muted small">No data available in table</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mt-3 gap-3 small text-muted">
               <div>Showing 0 to 0 of 0 entries</div>
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
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-5 border-bottom pb-3 gap-3 w-100 text-start">
               <h5 className="fw-bold mb-0 text-nowrap">Enter Particulars of your Director MCA account here.</h5>
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
                  <div className="row g-2 align-items-start align-items-sm-center text-start">
                     <label className="col-12 col-sm-4 fw-bold small">DIN</label>
                     <div className="col-12 col-sm-8">
                        <input type="text" className="form-control border-light shadow-sm py-2 px-3" placeholder="DIN" />
                     </div>
                  </div>
               </div>
               <div className="col-12 col-md-6 mb-4 px-0 px-md-3">
                  <div className="row g-2 align-items-start align-items-sm-center text-start">
                     <div className="col-12 text-end mb-1">
                        <a href="#" className="small text-primary text-decoration-none fw-bold" style={{ fontSize: "11px" }}>
                           PREFILL FROM MCA <i className="bi bi-arrow-right-circle"></i>
                        </a>
                     </div>
                     <label className="col-12 col-sm-4 fw-bold small pt-sm-2">Name of Director</label>
                     <div className="col-12 col-sm-8">
                        <input type="text" className="form-control border-light shadow-sm py-2 px-3" placeholder="Name of Director" />
                     </div>
                  </div>
               </div>

               {/* Row 2 */}
               <div className="col-12 col-md-6 mb-4 px-0 px-md-3">
                  <div className="row g-2 align-items-start align-items-sm-center text-start">
                     <label className="col-12 col-sm-4 fw-bold small">Contact No.</label>
                     <div className="col-12 col-sm-8">
                        <input type="text" className="form-control border-light shadow-sm py-2 px-3" placeholder="Contact No." />
                     </div>
                  </div>
               </div>
               <div className="col-12 col-md-6 mb-4 px-0 px-md-3">
                 <div className="row g-2 align-items-start align-items-sm-center text-start">
                     <label className="col-12 col-sm-4 fw-bold small">Email id</label>
                     <div className="col-12 col-sm-8">
                         <input type="email" className="form-control border-light shadow-sm py-2 px-3" placeholder="Email id" />
                     </div>
                 </div>
               </div>

               {/* Row 3 */}
               <div className="col-12 col-md-6 mb-4 px-0 px-md-3">
                  <div className="row g-2 align-items-start align-items-sm-center text-start">
                     <label className="col-12 col-sm-4 fw-bold small">User ID</label>
                     <div className="col-12 col-sm-8">
                        <input type="text" className="form-control border-light shadow-sm py-2 px-3" placeholder="User ID" />
                     </div>
                  </div>
               </div>
               <div className="col-12 col-md-6 mb-4 px-0 px-md-3">
                  <div className="row g-2 align-items-start align-items-sm-center text-start">
                     <label className="col-12 col-sm-4 fw-bold small">Password</label>
                     <div className="col-12 col-sm-8">
                        <input type="password" className="form-control border-light shadow-sm py-2 px-3" placeholder="Password" />
                     </div>
                  </div>
               </div>

               {/* Row 4 */}
               <div className="col-12 col-md-6 mb-4 px-0 px-md-3">
                  <div className="row g-2 align-items-start align-items-sm-center text-start">
                     <label className="col-12 col-sm-4 fw-bold small">Hint Questions</label>
                     <div className="col-12 col-sm-8">
                        <select className="form-select border-light shadow-sm py-2 px-3">
                           <option>Select Hint Question</option>
                        </select>
                     </div>
                  </div>
               </div>
               <div className="col-12 col-md-6 mb-4 px-0 px-md-3">
                  <div className="row g-2 align-items-start align-items-sm-center text-start">
                     <label className="col-12 col-sm-4 fw-bold small">Hint Answer</label>
                     <div className="col-12 col-sm-8">
                        <input type="text" className="form-control border-light shadow-sm py-2 px-3" placeholder="Hint Answer" />
                     </div>
                  </div>
               </div>

               <div className="col-12 mt-4 px-0 px-md-3 text-start">
                  <button className="btn btn-primary px-5 py-2 shadow-sm w-100 w-md-auto" style={{ background: "#2b4cb3" }}>Submit</button>
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
                 <div className="modal-body p-3 p-md-5 text-start">
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
