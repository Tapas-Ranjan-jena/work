import { useState } from "react";

type UserView = "main" | "v2-list" | "v2-add" | "v3-list" | "v3-add";

export default function MCAV2V3User() {
  const [view, setView] = useState<UserView>("main");

  const SummaryCard = ({ title, color, onClick }: { title: string, color: string, onClick: () => void }) => (
    <div className="col-md-5">
      <div className="card text-white border-0 shadow-sm overflow-hidden" style={{ background: color, borderRadius: "2px" }}>
        <div className="card-body p-5 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "220px" }}>
          <h1 className="fw-bold mb-0 text-center" style={{ fontSize: "2.8rem", letterSpacing: "1px" }}>{title}</h1>
        </div>
        <div className="card-footer bg-black bg-opacity-10 border-0 text-white text-center py-2 small d-flex align-items-center justify-content-center gap-2" 
             style={{ cursor: "pointer" }}
             onClick={onClick}>
          More info <i className="bi bi-arrow-right-circle"></i>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mca-user-mgmt p-4">
      {/* ⭐ BREADCRUMBS */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item small"><a href="#" className="text-decoration-none text-primary" onClick={() => setView("main")}>Home</a></li>
          {view === "main" ? (
             <li className="breadcrumb-item small active" aria-current="page">MCA User</li>
          ) : (view === "v2-list" || view === "v2-add") ? (
             <>
               <li className="breadcrumb-item small"><a href="#" className="text-decoration-none text-primary" onClick={() => setView("main")}>MCA User</a></li>
               <li className="breadcrumb-item small active" aria-current="page">V2 MCA User</li>
             </>
          ) : (
             <>
               <li className="breadcrumb-item small"><a href="#" className="text-decoration-none text-primary" onClick={() => setView("main")}>MCA User</a></li>
               <li className="breadcrumb-item small active" aria-current="page">V3 MCA User</li>
             </>
          )}
        </ol>
      </nav>

      {/* ⭐ MAIN VIEW (Screenshot 1) */}
      {view === "main" && (
        <div className="card shadow-sm border-0 p-5 mt-4">
           <div className="row g-5 justify-content-center">
              <SummaryCard title="V2 MCA User" color="#00bcd4" onClick={() => setView("v2-list")} />
              <SummaryCard title="V3 MCA User" color="#00a65a" onClick={() => setView("v3-list")} />
           </div>
        </div>
      )}

      {/* ⭐ V2 LIST VIEW (Screenshot 2) */}
      {view === "v2-list" && (
        <div className="card shadow-sm border-0 p-4">
           <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0">Particulars of your MCA V2 Account</h5>
              <div className="d-flex gap-2">
                 <button className="btn btn-outline-secondary btn-sm bg-white px-3 d-flex align-items-center gap-2 border" onClick={() => setView("v2-add")}>
                    <i className="bi bi-plus-lg"></i> Add MCA User
                 </button>
              </div>
           </div>

           <div className="d-flex justify-content-between align-items-center mb-3 text-muted">
              <div className="d-flex align-items-center gap-2 small">
                 Show 
                 <select className="form-select form-select-sm border" style={{ width: "70px" }}>
                    <option>10</option>
                 </select> 
                 entries
              </div>
              <div className="d-flex align-items-center gap-2 small">
                 Search:
                 <input type="text" className="form-control form-control-sm border" style={{ width: "200px" }} />
              </div>
           </div>

           <div className="table-responsive border rounded overflow-hidden">
             <table className="table table-hover mb-0" style={{ fontSize: "12px" }}>
               <thead style={{ background: "#94a3b8", color: "white" }}>
                 <tr className="align-middle">
                   <th className="px-3 py-3 text-center" style={{ width: "70px" }}>#</th>
                   <th className="px-3 py-3 border-start">User Name</th>
                   <th className="px-3 py-3 border-start">Last Updated On</th>
                   <th className="px-3 py-3 border-start">Password</th>
                   <th className="px-3 py-3 border-start">Action</th>
                 </tr>
               </thead>
               <tbody>
                 <tr>
                   <td colSpan={5} className="text-center py-4 text-muted">No data available in table</td>
                 </tr>
               </tbody>
             </table>
           </div>

           <div className="d-flex justify-content-between align-items-center mt-3 small text-muted">
              <div>Showing 0 to 0 of 0 entries</div>
              <div className="d-flex gap-0 align-items-center">
                 <button className="btn btn-outline-secondary btn-sm px-3 rounded-0 border-end-0">Previous</button>
                 <button className="btn btn-outline-secondary btn-sm px-3 rounded-0">Next</button>
              </div>
           </div>
        </div>
      )}

      {/* ⭐ V3 LIST VIEW (Screenshot 4) */}
      {view === "v3-list" && (
        <div className="card shadow-sm border-0 p-4">
           <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0">Particulars of your MCA V3 Account</h5>
              <div className="d-flex gap-2">
                 <button className="btn btn-outline-secondary btn-sm bg-white px-3 d-flex align-items-center gap-2 border" onClick={() => setView("v3-add")}>
                    <i className="bi bi-plus-lg"></i> Add MCA V3 User
                 </button>
              </div>
           </div>

           <div className="table-responsive border rounded overflow-hidden">
             <table className="table table-hover mb-0" style={{ fontSize: "12px" }}>
               <thead style={{ background: "#94a3b8", color: "white" }}>
                 <tr className="align-middle">
                   <th className="px-3 py-3 text-center" style={{ width: "70px" }}>#</th>
                   <th className="px-3 py-3 border-start">User Name</th>
                   <th className="px-3 py-3 border-start">Last Updated On</th>
                   <th className="px-3 py-3 border-start">Password</th>
                   <th className="px-3 py-3 border-start">Action</th>
                 </tr>
               </thead>
               <tbody>
                 <tr>
                   <td colSpan={5} className="text-center py-4 text-muted">No data available in table</td>
                 </tr>
               </tbody>
             </table>
           </div>
        </div>
      )}

      {/* ⭐ V2 ADD FORM (Screenshot 3) */}
      {view === "v2-add" && (
        <div className="card shadow-sm border-0 p-4">
           <div className="d-flex justify-content-between align-items-center mb-5">
              <h5 className="fw-bold mb-0">Enter Particulars of your MCA account here.</h5>
              <button className="btn btn-primary btn-sm px-3 d-flex align-items-center gap-2" 
                      style={{ background: "#2b4cb3", borderColor: "#2b4cb3" }}
                      onClick={() => setView("v2-list")}>
                 <i className="bi bi-arrow-left-circle"></i> Go Back to MCA User
              </button>
           </div>
           
           <div className="row justify-content-start">
              <div className="col-md-8">
                 <div className="row mb-4 align-items-center text-start">
                    <label className="col-md-3 fw-bold small">Username <span className="text-danger">*</span></label>
                    <div className="col-md-9">
                       <input type="text" className="form-control border-light shadow-sm bg-white" placeholder="Enter username" />
                    </div>
                 </div>
                 <div className="row mb-4 align-items-center text-start">
                    <label className="col-md-3 fw-bold small">Password <span className="text-danger">*</span></label>
                    <div className="col-md-9">
                       <input type="password" className="form-control border-light shadow-sm bg-white" placeholder="Enter password" />
                    </div>
                 </div>
                 <div className="row mb-5 align-items-center text-start">
                    <label className="col-md-3 fw-bold small">Confirm Password <span className="text-danger">*</span></label>
                    <div className="col-md-9">
                       <input type="password" className="form-control border-light shadow-sm bg-white" placeholder="Confirm password" />
                    </div>
                 </div>
                 <div className="row text-start">
                    <div className="col-md-3"></div>
                    <div className="col-md-9">
                       <button className="btn btn-primary px-4 py-2" style={{ background: "#2b4cb3", borderColor: "#2b4cb3" }}>
                          Submit
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* ⭐ V3 ADD FORM (Screenshot 5) */}
      {view === "v3-add" && (
        <div className="card shadow-sm border-0 p-4">
           <div className="d-flex justify-content-between align-items-center mb-5">
              <h5 className="fw-bold mb-0">Enter Particulars of your MCA account here.</h5>
              <button className="btn btn-primary btn-sm px-3 d-flex align-items-center gap-2" 
                      style={{ background: "#2b4cb3", borderColor: "#2b4cb3" }}
                      onClick={() => setView("v3-list")}>
                 <i className="bi bi-arrow-left-circle"></i> Go Back to MCA User
              </button>
           </div>
           
           <div className="row justify-content-start">
              <div className="col-md-8">
                 <div className="row mb-4 align-items-center text-start">
                    <label className="col-md-3 fw-bold small">Email <span className="text-danger">*</span></label>
                    <div className="col-md-7">
                       <input type="email" className="form-control border-light shadow-sm bg-white" placeholder="Enter email" />
                    </div>
                    <div className="col-md-2">
                       <button className="btn btn-primary w-100" style={{ background: "#2b4cb3", borderColor: "#2b4cb3" }}>
                          Send OTP
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
