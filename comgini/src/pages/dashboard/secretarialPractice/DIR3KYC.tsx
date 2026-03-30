import { useState } from "react";
import toast from "react-hot-toast";

type KYCView = "status" | "web";

export default function DIR3KYC() {
  const [view, setView] = useState<KYCView>("status");
  const [showImportModal, setShowImportModal] = useState(false);

  const handleImport = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Excel imported successfully");
    setShowImportModal(false);
  };

  return (
    <div className="dir3-kyc p-4">
      {/* ⭐ BREADCRUMBS */}
      <nav aria-label="breadcrumb" className="mb-4 d-flex justify-content-between align-items-center">
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item small"><a href="#" className="text-decoration-none text-primary" onClick={() => setView("status")}>Home</a></li>
          {view === "status" ? (
             <li className="breadcrumb-item small active" aria-current="page">DIR-3-KYC Status</li>
          ) : (
             <li className="breadcrumb-item small active" aria-current="page">Particulars of DIR-3 KYC (Web)</li>
          )}
        </ol>

        <div className="d-flex gap-2">
           {view === "status" && (
             <>
               <button className="btn btn-primary btn-sm px-4" onClick={() => setShowImportModal(true)} style={{ background: "#1d4ed8", borderColor: "#1d4ed8" }}>
                  Bulk Assign
               </button>
               <button className="btn btn-primary btn-sm px-4" onClick={() => setView("web")} style={{ background: "#1d4ed8", borderColor: "#1d4ed8" }}>
                  DIR3-KYC (Web)
               </button>
               <button className="btn btn-primary btn-sm px-4" style={{ background: "#1d4ed8", borderColor: "#1d4ed8" }}>
                  DIR3-KYC E-form
               </button>
             </>
           )}
           {view === "web" && (
              <button className="btn btn-primary btn-sm px-4" onClick={() => setView("status")} style={{ background: "#1d4ed8", borderColor: "#1d4ed8" }}>
                 <i className="bi bi-arrow-left"></i> Back
              </button>
           )}
        </div>
      </nav>

      {/* ⭐ DASHBOARD VIEW (Screenshot 3) */}
      {view === "status" && (
        <div className="card shadow-sm border-0 p-4">
           <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0">DIR-3-KYC Status</h5>
              <div className="text-primary small fw-semibold">
                To download the email id / phone no. list of pending DIR3 KYC <a href="#" className="text-decoration-underline">Click here.</a>
              </div>
           </div>

           <div className="row g-3 mb-4 align-items-end">
              <div className="col-md-3">
                 <label className="small fw-bold mb-1">Enter Din here:</label>
                 <div className="input-group">
                    <input type="text" className="form-control form-control-sm py-2" placeholder="Enter Din here..." />
                    <button className="btn btn-primary btn-sm px-3" style={{ background: "#1d4ed8", borderColor: "#1d4ed8" }}>Check Status</button>
                 </div>
              </div>
              <div className="col-md-3">
                 <label className="small fw-bold mb-1">Company:</label>
                 <select className="form-select form-select-sm border py-2">
                    <option>Select Company</option>
                 </select>
              </div>
              <div className="col-md-3">
                 <label className="small fw-bold mb-1">Group:</label>
                 <select className="form-select form-select-sm border py-2">
                    <option>Select Group</option>
                 </select>
              </div>
              <div className="col-md-3">
                 <label className="small fw-bold mb-1">KYC Status:</label>
                 <select className="form-select form-select-sm border py-2">
                    <option>Select Status</option>
                 </select>
              </div>
           </div>

           <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex align-items-center gap-2">
                 <button className="btn btn-outline-secondary btn-sm border px-3">Show 10 rows</button>
                 <button className="btn btn-outline-secondary btn-sm border px-3">Excel</button>
              </div>
              <div className="d-flex align-items-center gap-2">
                 <span className="small">Search:</span>
                 <input type="text" className="form-control form-control-sm border" style={{ width: "200px" }} />
              </div>
           </div>

           <div className="table-responsive border rounded overflow-hidden">
             <table className="table table-hover mb-0" style={{ fontSize: "12px", minWidth: "1200px" }}>
               <thead style={{ background: "#94a3b8", color: "white" }}>
                 <tr className="align-middle">
                   <th className="px-3 py-3 text-center" style={{ width: "50px" }}><input type="checkbox" className="form-check-input" /></th>
                   <th className="px-3 py-3 text-center" style={{ width: "80px" }}>Sr. No</th>
                   <th className="px-3 py-3">Director Name (DIN)</th>
                   <th className="px-3 py-3">DIN Status</th>
                   <th className="px-3 py-3">KYC Status</th>
                   <th className="px-3 py-3">Assigned User</th>
                   <th className="px-3 py-3">User Status</th>
                   <th className="px-3 py-3">Remark</th>
                   <th className="px-3 py-3 text-center">Action</th>
                 </tr>
               </thead>
               <tbody>
                 <tr>
                   <td colSpan={9} className="text-center py-4 text-muted">No data available in table</td>
                 </tr>
               </tbody>
             </table>
           </div>

           <div className="d-flex justify-content-between align-items-center mt-3 small text-muted">
              <div>Showing 0 to 0 of 0 entries</div>
              <div className="d-flex gap-0 align-items-center">
                 <button className="btn btn-outline-secondary btn-sm px-3 rounded-start" style={{ fontSize: "12px" }}>Previous</button>
                 <span className="border-top border-bottom py-1 px-3 bg-light fw-semibold" style={{ fontSize: "12px", height: "31px", display: "flex", alignItems: "center" }}>1</span>
                 <button className="btn btn-outline-secondary btn-sm px-3 rounded-end" style={{ fontSize: "12px" }}>Next</button>
              </div>
           </div>
        </div>
      )}

      {/* ⭐ WEB PARTICULARS VIEW (Screenshot 5) */}
      {view === "web" && (
        <div className="card shadow-sm border-0 p-4">
           <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0">Particulars of DIR-3 KYC (Web)</h5>
              <div className="d-flex gap-2">
                 <button className="btn btn-primary btn-sm px-4" style={{ background: "#1d4ed8", borderColor: "#1d4ed8" }}>
                    Prepare DIR-3 KYC (Web)
                 </button>
                 <button className="btn btn-primary btn-sm px-4" onClick={() => setView("status")} style={{ background: "#1d4ed8", borderColor: "#1d4ed8" }}>
                    Back
                 </button>
              </div>
           </div>

           <div className="row g-3 mb-4 justify-content-center">
              <div className="col-md-3">
                 <label className="small fw-bold mb-1">From Date</label>
                 <input type="text" className="form-control form-control-sm py-2" defaultValue="01/04/2025" />
              </div>
              <div className="col-md-3">
                 <label className="small fw-bold mb-1">To Date</label>
                 <input type="text" className="form-control form-control-sm py-2" defaultValue="30/03/2026" />
              </div>
           </div>

           <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex align-items-center gap-2">
                 <button className="btn btn-outline-secondary btn-sm border px-3">Show 10 rows</button>
                 <button className="btn btn-outline-secondary btn-sm border px-3">Excel</button>
              </div>
              <div className="d-flex align-items-center gap-2">
                 <span className="small">Search:</span>
                 <input type="text" className="form-control form-control-sm border" style={{ width: "200px" }} />
              </div>
           </div>

           <div className="table-responsive border rounded overflow-hidden">
             <table className="table table-hover mb-0" style={{ fontSize: "12px", minWidth: "1200px" }}>
               <thead style={{ background: "#94a3b8", color: "white" }}>
                 <tr className="align-middle">
                   <th className="px-3 py-3 text-center" style={{ width: "80px" }}>Sr. No.</th>
                   <th className="px-3 py-3">DIN</th>
                   <th className="px-3 py-3">Name</th>
                   <th className="px-3 py-3">SRN of form</th>
                   <th className="px-3 py-3">MCA User</th>
                   <th className="px-3 py-3">Last updated on CR</th>
                   <th className="px-3 py-3">Last Submitted on MCA</th>
                   <th className="px-3 py-3">Action</th>
                   <th className="px-3 py-3">Submit on MCA</th>
                 </tr>
               </thead>
               <tbody>
                 <tr>
                   <td colSpan={9} className="text-center py-4 text-muted">No data available in table</td>
                 </tr>
               </tbody>
             </table>
           </div>

           <div className="d-flex justify-content-between align-items-center mt-3 small text-muted">
              <div>Showing 0 to 0 of 0 entries</div>
              <div className="d-flex gap-0 align-items-center">
                 <button className="btn btn-outline-secondary btn-sm px-3 rounded-start" style={{ fontSize: "12px" }}>Previous</button>
                 <span className="border-top border-bottom py-1 px-3 bg-light fw-semibold" style={{ fontSize: "12px", height: "31px", display: "flex", alignItems: "center" }}>1</span>
                 <button className="btn btn-outline-secondary btn-sm px-3 rounded-end" style={{ fontSize: "12px" }}>Next</button>
              </div>
           </div>
        </div>
      )}

      {/* ⭐ IMPORT EXCEL MODAL (Screenshot 4) */}
      {showImportModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 4000 }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: "8px" }}>
              <div className="modal-header border-bottom p-3">
                <h6 className="modal-title fw-semibold w-100 text-center text-muted">IMPORT EXCEL</h6>
                <button type="button" className="btn-close" onClick={() => setShowImportModal(false)}></button>
              </div>
              <div className="modal-body p-5">
                <div className="border rounded d-flex mb-4">
                    <div className="bg-light border-right p-3 fw-bold small d-flex align-items-center" style={{ width: "200px" }}>Upload Excel</div>
                    <div className="p-3 flex-grow-1">
                       <input type="file" className="form-control form-control-sm" />
                    </div>
                </div>
                <button className="btn btn-primary px-4 py-2" onClick={handleImport} style={{ background: "#1d4ed8", borderColor: "#1d4ed8" }}>
                  <i className="bi bi-download me-2"></i> Download Template
                </button>
              </div>
              <div className="modal-footer border-0 p-3 bg-light d-flex justify-content-end">
                <button type="button" className="btn-close opacity-50" onClick={() => setShowImportModal(false)} style={{ fontSize: "1.5rem" }}></button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
