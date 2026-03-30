import { useState } from "react";
import { useNavigate } from "react-router-dom";

type DscView = "dashboard" | "box" | "active" | "expiring" | "expired";

export default function DSCManagement() {
  const [view, setView] = useState<DscView>("dashboard");
  const navigate = useNavigate();

  const handleAddDsc = () => {
    navigate("/masters/director-kmp/add-director");
  };

  const SummaryCard = ({ title, count, color, icon, onClick }: any) => (
    <div className="col-md-3">
      <div className="card border-0 shadow-sm overflow-hidden" 
           style={{ background: color, cursor: "pointer" }}
           onClick={onClick}>
        <div className="card-body p-4 text-white d-flex justify-content-between align-items-center">
          <div>
            <h2 className="fw-bold mb-0" style={{ fontSize: "2.5rem" }}>{count}</h2>
            <div className="small fw-semibold">{title}</div>
          </div>
          <div className="opacity-50" style={{ fontSize: "3rem" }}>
             <i className={`bi ${icon}`}></i>
          </div>
        </div>
        <div className="card-footer bg-black bg-opacity-10 border-0 text-white text-center py-2 small d-flex align-items-center justify-content-center gap-2">
          More info <i className="bi bi-arrow-right-circle"></i>
        </div>
      </div>
    </div>
  );

  return (
    <div className="dsc-management p-4">
      {/* ⭐ BREADCRUMBS */}
      <nav aria-label="breadcrumb" className="mb-4 d-flex justify-content-between align-items-center">
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item small"><a href="#" className="text-decoration-none text-primary" onClick={() => setView("dashboard")}>Home</a></li>
          {view === "dashboard" ? (
             <li className="breadcrumb-item small active" aria-current="page">DSC Records</li>
          ) : view === "box" ? (
             <li className="breadcrumb-item small active" aria-current="page">Box</li>
          ) : (
             <li className="breadcrumb-item small active" aria-current="page">DSC {view.charAt(0).toUpperCase() + view.slice(1)}</li>
          )}
        </ol>

        <div className="d-flex gap-2">
           {view === "dashboard" && (
             <>
               <button className="btn btn-outline-secondary btn-sm bg-white px-3 d-flex align-items-center gap-2" onClick={handleAddDsc}>
                  <i className="bi bi-plus-lg"></i> Add DSC
               </button>
               <button className="btn btn-outline-secondary btn-sm bg-white px-3 d-flex align-items-center gap-2" onClick={() => setView("box")}>
                  <i className="bi bi-plus-lg"></i> Add Box
               </button>
             </>
           )}
           {view !== "dashboard" && (
              <button className="btn btn-primary btn-sm px-4" onClick={() => setView("dashboard")} style={{ background: "#1d4ed8", borderColor: "#1d4ed8" }}>
                 <i className="bi bi-arrow-left"></i> Back
              </button>
           )}
        </div>
      </nav>

      {view !== "box" && (
         <div className="row g-4 mb-5">
            <SummaryCard title="Total" count="0" color="#0ea5e9" icon="bi-pie-chart-fill" onClick={() => setView("dashboard")} />
            <SummaryCard title="Active" count="0" color="#10b981" icon="bi-bar-chart-fill" onClick={() => setView("active")} />
            <SummaryCard title="Expiring in 15 Days" count="0" color="#f59e0b" icon="bi-exclamation-triangle-fill" onClick={() => setView("expiring")} />
            <SummaryCard title="Expired" count="0" color="#f472b6" icon="bi-info-circle-fill" onClick={() => setView("expired")} />
         </div>
      )}

      {/* ⭐ DASHBOARD / LIST VIEW */}
      {view !== "box" && (
        <div className="card shadow-sm border-0 p-4">
           <h5 className="fw-bold mb-4">{view === "dashboard" ? "DSC Records" : (view.charAt(0).toUpperCase() + view.slice(1) + " DSCs")}</h5>
           
           <div className="text-danger small mb-4 italic fw-medium">
             *Quick Hint: To review the DSC in-out records click on the respective name of the person.
           </div>

           <div className="row g-3 mb-4">
              <div className="col-md-3">
                 <select className="form-select form-select-sm border py-2">
                    <option>Select Company</option>
                 </select>
              </div>
              <div className="col-md-3">
                 <select className="form-select form-select-sm border py-2">
                    <option>Select Group</option>
                 </select>
              </div>
              <div className="col-md-2">
                 <button className="btn btn-primary btn-sm w-100 py-2" style={{ background: "#1d4ed8", borderColor: "#1d4ed8" }}>
                    Refresh
                 </button>
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

           <div className="table-responsive border rounded overflow-hidden" style={{ minHeight: "200px" }}>
             <table className="table table-hover mb-0" style={{ fontSize: "12px", minWidth: (view === "expiring" || view === "expired") ? "1000px" : "1200px" }}>
               <thead style={{ background: "#94a3b8", color: "white" }}>
                 <tr className="align-middle">
                   <th className="px-3 py-3 text-center" style={{ width: "60px" }}>#</th>
                   <th className="px-3 py-3">Director Name</th>
                   <th className="px-3 py-3">DIN</th>
                   {(view === "expiring" || view === "expired") ? (
                      <>
                        <th className="px-3 py-3">Email ID</th>
                        <th className="px-3 py-3">DSC Expiry</th>
                      </>
                   ) : (
                      <>
                        <th className="px-3 py-3">DSC Expiry</th>
                        <th className="px-3 py-3">DSC Status</th>
                        <th className="px-3 py-3">Availability</th>
                        <th className="px-3 py-3">Location</th>
                        <th className="px-3 py-3">In/Out</th>
                      </>
                   )}
                   <th className="px-3 py-3 text-center">Action</th>
                 </tr>
               </thead>
               <tbody>
                 <tr>
                   <td colSpan={(view === "expiring" || view === "expired") ? 6 : 9} className="text-center py-4 text-muted">No data available in table</td>
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

      {/* ⭐ ADD BOX VIEW (Screenshot 4) */}
      {view === "box" && (
        <div className="row g-4">
           <div className="col-md-7">
              <div className="card shadow-sm border-0 p-4">
                 <h5 className="fw-bold mb-4">Box</h5>
                 <div className="d-flex justify-content-end mb-3 gap-2">
                    <button className="btn btn-primary btn-sm px-3" style={{ background: "#1d4ed8", borderColor: "#1d4ed8" }}>Refresh</button>
                    <button className="btn btn-primary btn-sm px-3" style={{ background: "#1d4ed8", borderColor: "#1d4ed8" }} onClick={() => setView("dashboard")}>Back</button>
                 </div>
                 <div className="table-responsive border rounded">
                    <table className="table table-hover mb-0" style={{ fontSize: "12px" }}>
                       <thead style={{ background: "#94a3b8", color: "white" }}>
                          <tr>
                             <th className="px-3 py-3 text-center">#</th>
                             <th className="px-3 py-3">Box Name</th>
                             <th className="px-3 py-3 text-center">Action</th>
                          </tr>
                       </thead>
                       <tbody>
                          <tr>
                             <td colSpan={3} className="text-center py-4 text-muted">No boxes added yet</td>
                          </tr>
                       </tbody>
                    </table>
                 </div>
              </div>
           </div>
           <div className="col-md-5">
              <div className="card shadow-sm border-0 p-4">
                 <h6 className="fw-bold mb-4 border-bottom pb-2">Add Box</h6>
                 <form>
                    <div className="mb-4">
                       <label className="small fw-bold mb-2">Box Name <span className="text-danger">*</span></label>
                       <input type="text" className="form-control form-control-sm py-2" placeholder="Enter box name" />
                    </div>
                    <div className="d-flex justify-content-end">
                       <button type="submit" className="btn btn-primary px-4 py-2" style={{ background: "#1d4ed8", borderColor: "#1d4ed8" }}>
                          Submit
                       </button>
                    </div>
                 </form>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
