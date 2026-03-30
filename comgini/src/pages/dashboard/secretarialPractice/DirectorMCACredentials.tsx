import { useState } from "react";

type ViewType = "list" | "add";

export default function DirectorMCACredentials() {
  const [view, setView] = useState<ViewType>("list");
  const [showExcelModal, setShowExcelModal] = useState(false);

  return (
    <div className="director-mca-credentials p-4">
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
        <div className="card shadow-sm border-0 p-4">
           <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0">Particulars of Director MCA Credentials</h5>
              <div className="d-flex gap-2">
                 <button className="btn btn-primary btn-sm px-3" style={{ background: "#2b4cb3" }} onClick={() => setShowExcelModal(true)}>
                    Import from excel
                 </button>
                 <button className="btn btn-primary btn-sm px-3" style={{ background: "#2b4cb3" }} onClick={() => setView("add")}>
                    + Add Director
                 </button>
              </div>
           </div>

           <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex gap-2">
                 <button className="btn btn-outline-secondary btn-sm bg-white border">Show 10 rows</button>
                 <button className="btn btn-outline-secondary btn-sm bg-white border">Excel</button>
              </div>
              <div className="d-flex align-items-center gap-2 small">
                 Search: <input type="text" className="form-control form-control-sm border" />
              </div>
           </div>

           <div className="table-responsive border rounded overflow-hidden">
             <table className="table table-hover mb-0" style={{ fontSize: "11px" }}>
               <thead style={{ background: "#94a3b8", color: "white" }}>
                 <tr className="align-middle">
                   <th className="px-2 py-2 text-center border-end" style={{ width: "40px" }}>#</th>
                   <th className="px-2 py-2 border-end">Name of Director</th>
                   <th className="px-2 py-2 border-end">DIN</th>
                   <th className="px-2 py-2 border-end">Contact No./Email</th>
                   <th className="px-2 py-2 border-end">User ID/Password</th>
                   <th className="px-2 py-2 border-end">Hint Ques/Ans</th>
                   <th className="px-2 py-2">Action</th>
                 </tr>
               </thead>
               <tbody>
                 <tr>
                   <td colSpan={7} className="text-center py-4 text-muted small">No data available in table</td>
                 </tr>
               </tbody>
             </table>
           </div>

           <div className="d-flex justify-content-between align-items-center mt-3 small text-muted">
              <div>Showing 0 to 0 of 0 entries</div>
              <div className="d-flex gap-0 align-items-center">
                 <button className="btn btn-outline-secondary btn-sm px-3 border-end-0 rounded-0">Previous</button>
                 <button className="btn btn-outline-secondary btn-sm px-3 rounded-0">Next</button>
              </div>
           </div>
        </div>
      )}

      {/* ⭐ ADD FORM */}
      {view === "add" && (
        <div className="card shadow-sm border-0 p-4 position-relative">
           {/* Header with Back Button */}
           <div className="d-flex justify-content-between align-items-center mb-5 border-bottom pb-3">
              <h5 className="fw-bold mb-0">Enter Particulars of your Director MCA account here.</h5>
              <button className="btn btn-primary btn-sm px-3 d-flex align-items-center gap-2 shadow-sm" 
                      style={{ background: "#2b4cb3", zIndex: 10 }}
                      onClick={() => setView("list")}>
                 <i className="bi bi-arrow-left-circle"></i> Back
              </button>
           </div>
           
           <div className="row g-0 text-start">
              {/* Row 1 */}
              <div className="col-md-6 mb-4 px-3">
                 <div className="row align-items-center">
                    <label className="col-md-4 fw-bold small">DIN</label>
                    <div className="col-md-8">
                       <input type="text" className="form-control border-light shadow-sm" placeholder="DIN" />
                    </div>
                 </div>
              </div>
              <div className="col-md-6 mb-4 px-3">
                 <div className="row align-items-center">
                    <div className="col-md-12 text-end mb-1">
                       <a href="#" className="small text-primary text-decoration-none fw-bold" style={{ fontSize: "11px" }}>
                          PREFILL FROM MCA <i className="bi bi-arrow-right-circle"></i>
                       </a>
                    </div>
                    <label className="col-md-4 fw-bold small">Name of Director</label>
                    <div className="col-md-8">
                       <input type="text" className="form-control border-light shadow-sm" placeholder="Name of Director" />
                    </div>
                 </div>
              </div>

              {/* Row 2 */}
              <div className="col-md-6 mb-4 px-3">
                 <div className="row align-items-center">
                    <label className="col-md-4 fw-bold small">Contact No.</label>
                    <div className="col-md-8">
                       <input type="text" className="form-control border-light shadow-sm" placeholder="Contact No." />
                    </div>
                 </div>
              </div>
              <div className="col-md-6 mb-4 px-3">
                <div className="row align-items-center">
                    <label className="col-md-4 fw-bold small">Email id</label>
                    <div className="col-md-8">
                        <input type="email" className="form-control border-light shadow-sm" placeholder="Email id" />
                    </div>
                </div>
              </div>

              {/* Row 3 */}
              <div className="col-md-6 mb-4 px-3">
                 <div className="row align-items-center">
                    <label className="col-md-4 fw-bold small">User ID</label>
                    <div className="col-md-8">
                       <input type="text" className="form-control border-light shadow-sm" placeholder="User ID" />
                    </div>
                 </div>
              </div>
              <div className="col-md-6 mb-4 px-3">
                 <div className="row align-items-center">
                    <label className="col-md-4 fw-bold small">Password</label>
                    <div className="col-md-8">
                       <input type="password" className="form-control border-light shadow-sm" placeholder="Password" />
                    </div>
                 </div>
              </div>

              {/* Row 4 */}
              <div className="col-md-6 mb-4 px-3">
                 <div className="row align-items-center">
                    <label className="col-md-4 fw-bold small">Hint Questions</label>
                    <div className="col-md-8">
                       <select className="form-select border-light shadow-sm">
                          <option>Select Hint Question</option>
                       </select>
                    </div>
                 </div>
              </div>
              <div className="col-md-6 mb-4 px-3">
                 <div className="row align-items-center">
                    <label className="col-md-4 fw-bold small">Hint Answer</label>
                    <div className="col-md-8">
                       <input type="text" className="form-control border-light shadow-sm" placeholder="Hint Answer" />
                    </div>
                 </div>
              </div>

              <div className="col-12 mt-4 px-3 text-start">
                 <button className="btn btn-primary px-5 py-2 shadow-sm" style={{ background: "#2b4cb3" }}>Submit</button>
              </div>
           </div>
        </div>
      )}

      {/* ⭐ EXCEL MODAL */}
      {showExcelModal && (
        <div className="modal show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
           <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content overflow-hidden border-0 shadow">
                 <div className="modal-header bg-white py-3 border-bottom d-flex justify-content-center">
                    <h5 className="modal-title fw-bold">Upload Excel</h5>
                 </div>
                 <div className="modal-body p-5 text-start">
                    <div className="row align-items-center bg-light p-4 rounded border">
                       <div className="col-md-3 fw-bold small">Choose file</div>
                       <div className="col-md-6">
                          <input type="file" className="form-control border" />
                          <div className="mt-2"><a href="#" className="small text-primary text-decoration-none">Download template file</a></div>
                       </div>
                       <div className="col-md-3">
                          <button className="btn btn-primary w-100 py-2" style={{ background: "#2b4cb3" }}>UPLOAD</button>
                       </div>
                    </div>
                 </div>
                 <div className="modal-footer bg-light p-2 text-end border-top">
                    <button className="btn-close opacity-50" onClick={() => setShowExcelModal(false)}></button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
