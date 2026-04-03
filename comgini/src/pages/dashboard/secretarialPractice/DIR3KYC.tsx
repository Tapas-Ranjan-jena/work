import { useState } from "react";
import toast from "react-hot-toast";
import secretarialService from "../../../services/secretarialService";

type KYCView = "status" | "web";

export default function DIR3KYC() {
  const [view, setView] = useState<KYCView>("status");
  const [showImportModal, setShowImportModal] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Form state for Web view
  const [formState, setFormState] = useState({
    din: "",
    pan: "",
    is_kyc_done: true,
    status: "filed",
    remarks: ""
  });

  const handleImport = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Excel imported successfully");
    setShowImportModal(false);
  };

  const handleWebSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await secretarialService.postDir3Kyc(formState);
      toast.success("DIR-3 KYC (Web) details saved successfully");
    } catch (error) {
      toast.error("Failed to save DIR-3 KYC details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dir3-kyc p-2 p-md-4">
      {/* ⭐ BREADCRUMBS */}
      <nav aria-label="breadcrumb" className="mb-4 d-flex flex-wrap justify-content-between align-items-center gap-3 w-100">
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item small"><a href="#" className="text-decoration-none text-primary" onClick={() => setView("status")}>Home</a></li>
          {view === "status" ? (
             <li className="breadcrumb-item small active text-nowrap" aria-current="page">DIR-3-KYC Status</li>
          ) : (
             <li className="breadcrumb-item small active text-nowrap" aria-current="page">Particulars of DIR-3 KYC (Web)</li>
          )}
        </ol>

        <div className="d-flex align-items-center gap-2 ms-auto">
           {view === "status" && (
             <>
               <button className="btn btn-outline-primary d-flex align-items-center justify-content-center px-3 py-1 shadow-sm text-nowrap" 
                       onClick={() => setShowImportModal(true)} 
                       style={{ borderRadius: "6px", fontSize: "12px", height: "34px", width: "fit-content" }}>
                  Bulk Assign
               </button>
               <button className="btn btn-primary d-flex align-items-center justify-content-center px-3 py-1 shadow-sm text-nowrap" 
                       onClick={() => setView("web")} 
                       style={{ background: "#2b4cb3", borderColor: "#2b4cb3", borderRadius: "6px", fontSize: "12px", height: "34px", width: "fit-content" }}>
                  DIR3-KYC (Web)
               </button>
               <button className="btn btn-primary d-flex align-items-center justify-content-center px-3 py-1 shadow-sm text-nowrap" 
                       style={{ background: "#2b4cb3", borderColor: "#2b4cb3", borderRadius: "6px", fontSize: "12px", height: "34px", width: "fit-content" }}>
                  DIR3-KYC E-form
               </button>
             </>
           )}
           {view === "web" && (
              <button className="btn btn-primary d-flex align-items-center justify-content-center px-3 py-1 shadow-sm text-nowrap" 
                      onClick={() => setView("status")} 
                      style={{ background: "#2b4cb3", borderColor: "#2b4cb3", borderRadius: "6px", fontSize: "12px", height: "34px", width: "fit-content" }}>
                 <i className="bi bi-arrow-left-circle me-2"></i> Back
              </button>
           )}
        </div>
      </nav>

      {/* ⭐ DASHBOARD VIEW (Screenshot 3) */}
      {view === "status" && (
        <div className="card shadow-sm border-0 p-3 p-md-4 mb-4">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-2 text-start">
               <h5 className="fw-bold mb-0">DIR-3-KYC Status</h5>
               <div className="text-primary small fw-semibold">
                 To download the email id / phone no. list of pending DIR3 KYC <a href="#" className="text-decoration-underline">Click here.</a>
               </div>
            </div>

            <div className="row g-3 mb-4 align-items-end">
               <div className="col-12 col-md-4 col-lg-3">
                  <label className="small fw-bold mb-1">Enter Din here:</label>
                  <div className="input-group">
                     <input type="text" className="form-control form-control-sm py-2" placeholder="Enter Din here..." />
                     <button className="btn btn-primary btn-sm px-3" style={{ background: "#1d4ed8", borderColor: "#1d4ed8" }}>Check Status</button>
                  </div>
               </div>
               <div className="col-12 col-md-4 col-lg-3">
                  <label className="small fw-bold mb-1">Company:</label>
                  <select className="form-select form-select-sm border py-2">
                     <option>Select Company</option>
                  </select>
               </div>
               <div className="col-12 col-md-4 col-lg-3">
                  <label className="small fw-bold mb-1">Group:</label>
                  <select className="form-select form-select-sm border py-2">
                     <option>Select Group</option>
                  </select>
               </div>
               <div className="col-12 col-md-4 col-lg-3">
                  <label className="small fw-bold mb-1">KYC Status:</label>
                  <select className="form-select form-select-sm border py-2">
                     <option>Select Status</option>
                  </select>
               </div>
            </div>

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-3">
               <div className="d-flex align-items-center gap-2 w-100 w-md-auto">
                  <button className="btn btn-outline-secondary btn-sm border px-3 flex-fill flex-md-grow-0" style={{ minWidth: "100px" }}>Show 10 rows</button>
                  <button className="btn btn-outline-secondary btn-sm border px-3 flex-fill flex-md-grow-0" style={{ minWidth: "80px" }}>Excel</button>
               </div>
               <div className="d-flex align-items-center gap-2 w-100 w-md-auto">
                  <span className="small text-nowrap">Search:</span>
                  <input type="text" className="form-control form-control-sm border w-100" style={{ maxWidth: "220px" }} />
               </div>
            </div>

            <div className="table-responsive border rounded overflow-auto">
              <table className="table table-hover mb-0" style={{ fontSize: "12px", minWidth: "1200px" }}>
                <thead style={{ background: "#94a3b8", color: "white" }}>
                  <tr className="align-middle">
                    <th className="px-3 py-3 text-center" style={{ minWidth: "50px" }}><input type="checkbox" className="form-check-input" /></th>
                    <th className="px-3 py-3 text-center" style={{ minWidth: "80px" }}>Sr. No</th>
                    <th className="px-3 py-3" style={{ minWidth: "200px" }}>Director Name (DIN)</th>
                    <th className="px-3 py-3" style={{ minWidth: "120px" }}>DIN Status</th>
                    <th className="px-3 py-3" style={{ minWidth: "120px" }}>KYC Status</th>
                    <th className="px-3 py-3" style={{ minWidth: "150px" }}>Assigned User</th>
                    <th className="px-3 py-3" style={{ minWidth: "120px" }}>User Status</th>
                    <th className="px-3 py-3" style={{ minWidth: "150px" }}>Remark</th>
                    <th className="px-3 py-3 text-center" style={{ minWidth: "80px" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={9} className="text-center py-4 text-muted">No data available in table</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mt-3 gap-3 small text-muted">
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
        <div className="card shadow-sm border-0 p-3 p-md-4">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3 text-start">
               <h5 className="fw-bold mb-0">Particulars of DIR-3 KYC (Web)</h5>
               <div className="d-flex flex-wrap gap-2 w-100 w-md-auto">
                  <button className="btn btn-primary btn-sm px-4 flex-grow-1 flex-md-grow-0" 
                          style={{ background: "#1d4ed8", borderColor: "#1d4ed8" }}
                          onClick={handleWebSubmit}
                          disabled={loading}>
                     {loading ? "Saving..." : "Prepare DIR-3 KYC (Web)"}
                  </button>
                  <button className="btn btn-primary btn-sm px-4 flex-grow-1 flex-md-grow-0" onClick={() => setView("status")} style={{ background: "#1d4ed8", borderColor: "#1d4ed8" }}>
                     Back
                  </button>
               </div>
            </div>

            <div className="row g-3 mb-4 text-start">
               <div className="col-12 col-md-4">
                  <label className="small fw-bold mb-1">DIN</label>
                  <input type="text" 
                         className="form-control form-control-sm py-2" 
                         value={formState.din}
                         onChange={(e) => setFormState(prev => ({ ...prev, din: e.target.value }))}
                         placeholder="Enter DIN" />
               </div>
               <div className="col-12 col-md-4">
                  <label className="small fw-bold mb-1">PAN</label>
                  <input type="text" 
                         className="form-control form-control-sm py-2" 
                         value={formState.pan}
                         onChange={(e) => setFormState(prev => ({ ...prev, pan: e.target.value }))}
                         placeholder="Enter PAN" />
               </div>
               <div className="col-12 col-md-4">
                  <label className="small fw-bold mb-1">Remarks</label>
                  <input type="text" 
                         className="form-control form-control-sm py-2" 
                         value={formState.remarks}
                         onChange={(e) => setFormState(prev => ({ ...prev, remarks: e.target.value }))}
                         placeholder="Optional" />
               </div>
            </div>

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-3">
               <div className="d-flex align-items-center gap-2 w-100 w-md-auto">
                  <button className="btn btn-outline-secondary btn-sm border px-3 flex-fill flex-md-grow-0" style={{ minWidth: "100px" }}>Show 10 rows</button>
                  <button className="btn btn-outline-secondary btn-sm border px-3 flex-fill flex-md-grow-0" style={{ minWidth: "80px" }}>Excel</button>
               </div>
               <div className="d-flex align-items-center gap-2 w-100 w-md-auto">
                  <span className="small text-nowrap">Search:</span>
                  <input type="text" className="form-control form-control-sm border w-100" style={{ maxWidth: "220px" }} />
               </div>
            </div>

            <div className="table-responsive border rounded overflow-auto">
              <table className="table table-hover mb-0" style={{ fontSize: "12px", minWidth: "1200px" }}>
                <thead style={{ background: "#94a3b8", color: "white" }}>
                  <tr className="align-middle">
                    <th className="px-3 py-3 text-center" style={{ minWidth: "80px" }}>Sr. No.</th>
                    <th className="px-3 py-3" style={{ minWidth: "100px" }}>DIN</th>
                    <th className="px-3 py-3" style={{ minWidth: "220px" }}>Name</th>
                    <th className="px-3 py-3" style={{ minWidth: "150px" }}>SRN of form</th>
                    <th className="px-3 py-3" style={{ minWidth: "150px" }}>MCA User</th>
                    <th className="px-3 py-3" style={{ minWidth: "150px" }}>Last updated on CR</th>
                    <th className="px-3 py-3" style={{ minWidth: "150px" }}>Last Submitted on MCA</th>
                    <th className="px-3 py-3" style={{ minWidth: "80px" }}>Action</th>
                    <th className="px-3 py-3" style={{ minWidth: "120px" }}>Submit on MCA</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={9} className="text-center py-4 text-muted">No data available in table</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mt-3 gap-3 small text-muted">
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
              <div className="modal-body p-4 p-md-5">
                <div className="border rounded d-flex flex-column flex-sm-row mb-4 overflow-hidden">
                    <div className="bg-light border-bottom border-sm-bottom-0 border-sm-right p-3 fw-bold small d-flex align-items-center justify-content-center justify-content-sm-start" style={{ minWidth: "180px" }}>Upload Excel</div>
                    <div className="p-3 flex-grow-1">
                       <input type="file" className="form-control form-control-sm" />
                    </div>
                </div>
                <button className="btn btn-primary px-4 py-2 w-100 w-sm-auto" onClick={handleImport} style={{ background: "#1d4ed8", borderColor: "#1d4ed8" }}>
                  <i className="bi bi-download me-2"></i> Download Template
                </button>
              </div>
              <div className="modal-footer border-0 p-3 bg-light d-flex justify-content-end">
                <button type="button" className="btn btn-light btn-sm border opacity-50" onClick={() => setShowImportModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
