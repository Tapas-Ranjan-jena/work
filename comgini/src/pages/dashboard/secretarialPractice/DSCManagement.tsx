import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import secretarialService from "../../../services/secretarialService";
import toast from "react-hot-toast";

type DscView = "dashboard" | "box" | "active" | "expiring" | "expired";

export default function DSCManagement() {
  const [view, setView] = useState<DscView>("dashboard");
  const [dscTokens, setDscTokens] = useState<any[]>([]);
  const [dscBoxes, setDscBoxes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [boxFormData, setBoxFormData] = useState({ name: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [tokensRes, boxesRes] = await Promise.all([
        secretarialService.getDscTokens(),
        secretarialService.getDscBoxes()
      ]);
      setDscTokens(tokensRes.data || []);
      setDscBoxes(boxesRes.data || []);
    } catch (error) {
      console.error("Failed to fetch DSC data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddDsc = () => {
    navigate("/masters/director-kmp/add-director");
  };

  const handleToggleStatus = async (token: any) => {
    const newStatus = token.current_status === 'in' ? 'out' : 'in';
    let checkedOutTo = "";
    
    if (newStatus === 'out') {
        checkedOutTo = window.prompt("Who is this DSC being checked out to?") || "";
        if (!checkedOutTo) return;
    }

    try {
        await secretarialService.toggleDscStatus(token.id, newStatus, checkedOutTo);
        toast.success(`DSC status updated to ${newStatus}`);
        fetchData();
    } catch (error) {
        toast.error("Failed to update status");
    }
  };

  const handleAddBox = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!boxFormData.name) {
        toast.error("Box name is required");
        return;
    }
    try {
        await secretarialService.createDscBox(boxFormData);
        toast.success("Box added successfully");
        setBoxFormData({ name: "" });
        fetchData();
    } catch (error) {
        toast.error("Failed to add box");
    }
  };

  const counts = {
    total: dscTokens.length,
    active: dscTokens.filter(t => t.days_to_expiry > 0).length,
    expiring: dscTokens.filter(t => t.days_to_expiry > 0 && t.days_to_expiry <= 15).length,
    expired: dscTokens.filter(t => t.days_to_expiry <= 0).length
  };

  const SummaryCard = ({ title, count, color, icon, onClick }: any) => (
    <div className="col-6 col-md-3">
      <div className="card border-0 shadow-sm overflow-hidden h-100" 
           style={{ background: color, cursor: "pointer" }}
           onClick={onClick}>
        <div className="card-body p-3 p-md-4 text-white d-flex flex-column flex-lg-row justify-content-between align-items-center text-center text-lg-start">
          <div>
            <h2 className="fw-bold mb-0" style={{ fontSize: "min(2.5rem, 8vw)" }}>{count}</h2>
            <div className="small fw-semibold mt-1">{title}</div>
          </div>
          <div className="opacity-50 mt-2 mt-lg-0" style={{ fontSize: "2.5rem" }}>
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
    <div className="dsc-management p-2 p-md-4">
      {/* ⭐ BREADCRUMBS */}
      <nav aria-label="breadcrumb" className="mb-4 d-flex flex-wrap justify-content-between align-items-center gap-3 w-100">
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item small"><a href="#" className="text-decoration-none text-primary" onClick={() => setView("dashboard")}>Home</a></li>
          {view === "dashboard" ? (
             <li className="breadcrumb-item small active text-nowrap" aria-current="page">DSC Records</li>
          ) : view === "box" ? (
             <li className="breadcrumb-item small active text-nowrap" aria-current="page">Box</li>
          ) : (
             <li className="breadcrumb-item small active text-nowrap" aria-current="page">DSC {view.charAt(0).toUpperCase() + view.slice(1)}</li>
          )}
        </ol>
        <div className="d-flex align-items-center gap-2 ms-auto">
           {view === "dashboard" && (
             <>
               <button className="btn btn-light border d-flex align-items-center justify-content-center px-3 py-1 shadow-sm bg-white text-nowrap" 
                       onClick={handleAddDsc}
                       style={{ borderRadius: "6px", fontSize: "12px", height: "34px", width: "fit-content" }}>
                  Add DSC <i className="bi bi-plus-circle ms-2"></i>
               </button>
               <button className="btn btn-light border d-flex align-items-center justify-content-center px-3 py-1 shadow-sm bg-white text-nowrap" 
                       onClick={() => setView("box")}
                       style={{ borderRadius: "6px", fontSize: "12px", height: "34px", width: "fit-content" }}>
                  Add Box <i className="bi bi-plus-circle ms-2"></i>
               </button>
             </>
           )}
           {view !== "dashboard" && (
              <button className="btn btn-primary d-flex align-items-center justify-content-center px-3 py-1 shadow-sm text-nowrap" 
                      onClick={() => setView("dashboard")} 
                      style={{ background: "#2b4cb3", borderColor: "#2b4cb3", borderRadius: "6px", fontSize: "12px", height: "34px", width: "fit-content", zIndex: 10 }}>
                 <i className="bi bi-arrow-left-circle me-2"></i> Back
              </button>
           )}
        </div>
      </nav>

      {view !== "box" && (
         <div className="row g-4 mb-5">
            <SummaryCard title="Total" count={counts.total} color="#0ea5e9" icon="bi-pie-chart-fill" onClick={() => setView("dashboard")} />
            <SummaryCard title="Active" count={counts.active} color="#10b981" icon="bi-bar-chart-fill" onClick={() => setView("active")} />
            <SummaryCard title="Expiring in 15 Days" count={counts.expiring} color="#f59e0b" icon="bi-exclamation-triangle-fill" onClick={() => setView("expiring")} />
            <SummaryCard title="Expired" count={counts.expired} color="#f472b6" icon="bi-info-circle-fill" onClick={() => setView("expired")} />
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
              <div className="col-12 col-md-4 col-lg-3">
                 <select className="form-select form-select-sm border py-2">
                    <option>Select Company</option>
                 </select>
              </div>
              <div className="col-12 col-md-4 col-lg-3">
                 <select className="form-select form-select-sm border py-2">
                    <option>Select Group</option>
                 </select>
              </div>
              <div className="col-12 col-md-4 col-lg-2">
                 <button className="btn btn-primary btn-sm w-100 py-2" style={{ background: "#1d4ed8", borderColor: "#1d4ed8" }} onClick={fetchData}>
                    Refresh
                 </button>
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

           <div className="table-responsive border rounded overflow-auto" style={{ minHeight: "200px" }}>
             <table className="table table-hover mb-0" style={{ fontSize: "12px", minWidth: (view === "expiring" || view === "expired") ? "1000px" : "1200px" }}>
               <thead style={{ background: "#94a3b8", color: "white" }}>
                 <tr className="align-middle">
                   <th className="px-3 py-3 text-center" style={{ minWidth: "60px" }}>#</th>
                   <th className="px-3 py-3" style={{ minWidth: "220px" }}>Director Name</th>
                   <th className="px-3 py-3" style={{ minWidth: "120px" }}>DIN</th>
                   {(view === "expiring" || view === "expired") ? (
                      <>
                        <th className="px-3 py-3" style={{ minWidth: "200px" }}>Email ID</th>
                        <th className="px-3 py-3" style={{ minWidth: "120px" }}>DSC Expiry</th>
                      </>
                   ) : (
                      <>
                        <th className="px-3 py-3" style={{ minWidth: "120px" }}>DSC Expiry</th>
                        <th className="px-3 py-3" style={{ minWidth: "100px" }}>DSC Status</th>
                        <th className="px-3 py-3" style={{ minWidth: "100px" }}>Availability</th>
                        <th className="px-3 py-3" style={{ minWidth: "120px" }}>Location</th>
                        <th className="px-3 py-3" style={{ minWidth: "80px" }}>In/Out</th>
                      </>
                   )}
                   <th className="px-3 py-3 text-center" style={{ minWidth: "80px" }}>Action</th>
                 </tr>
               </thead>
               <tbody>
                  {loading && dscTokens.length === 0 ? (
                    <tr><td colSpan={(view === "expiring" || view === "expired") ? 6 : 9} className="text-center py-4">Loading DSC tokens...</td></tr>
                  ) : dscTokens.length === 0 ? (
                    <tr><td colSpan={(view === "expiring" || view === "expired") ? 6 : 9} className="text-center py-4 text-muted">No data available in table</td></tr>
                  ) : (
                    dscTokens
                        .filter(t => {
                            if (view === "active") return t.days_to_expiry > 0;
                            if (view === "expiring") return t.days_to_expiry > 0 && t.days_to_expiry <= 15;
                            if (view === "expired") return t.days_to_expiry <= 0;
                            return true;
                        })
                        .map((t, idx) => (
                      <tr key={idx} className="align-middle text-center">
                        <td>{idx + 1}</td>
                        <td className="text-start pe-3">
                           <div className="fw-bold text-primary" style={{ cursor: "pointer" }}>{t.holder_name}</div>
                           <div className="small text-muted">{t.company_name}</div>
                        </td>
                        <td>{t.din}</td>
                        {(view === "expiring" || view === "expired") ? (
                           <>
                             <td>{t.email || "N/A"}</td>
                             <td>{t.expiry_date}</td>
                           </>
                        ) : (
                           <>
                             <td>{t.expiry_date}</td>
                             <td>
                               <span className={`badge rounded-pill px-2 py-1 ${t.days_to_expiry > 0 ? "bg-success" : "bg-danger"}`}>
                                 {t.days_to_expiry > 0 ? "Active" : "Expired"}
                               </span>
                             </td>
                             <td className="text-capitalize fw-semibold" style={{ color: t.current_status === 'in' ? '#10b981' : '#f87171' }}>
                                {t.current_status}
                             </td>
                             <td>{t.box_location}</td>
                             <td>
                                <div className="form-check form-switch d-flex justify-content-center">
                                   <input 
                                     className="form-check-input" 
                                     type="checkbox" 
                                     checked={t.current_status === 'in'} 
                                     onChange={() => handleToggleStatus(t)}
                                     style={{ cursor: "pointer" }}
                                   />
                                </div>
                             </td>
                           </>
                        )}
                        <td className="text-center">
                           <button className="btn btn-sm btn-outline-secondary py-0 px-2 border-0"><i className="bi bi-three-dots"></i></button>
                        </td>
                      </tr>
                    ))
                  )}
               </tbody>
             </table>
           </div>

           <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mt-3 gap-3 small text-muted">
              <div>Showing {dscTokens.length} entries</div>
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
           <div className="col-12 col-md-7">
              <div className="card shadow-sm border-0 p-3 p-md-4">
                 <h5 className="fw-bold mb-4">Box</h5>
                 <div className="d-flex flex-wrap justify-content-end mb-3 gap-2">
                    <button className="btn btn-primary btn-sm px-3 flex-fill flex-md-grow-0" style={{ background: "#1d4ed8", borderColor: "#1d4ed8" }} onClick={fetchData}>Refresh</button>
                    <button className="btn btn-primary btn-sm px-3 flex-fill flex-md-grow-0" style={{ background: "#1d4ed8", borderColor: "#1d4ed8" }} onClick={() => setView("dashboard")}>Back</button>
                 </div>
                 <div className="table-responsive border rounded">
                    <table className="table table-hover mb-0" style={{ fontSize: "12px" }}>
                       <thead style={{ background: "#94a3b8", color: "white" }}>
                          <tr>
                             <th className="px-3 py-3 text-center" style={{ minWidth: "60px" }}>#</th>
                             <th className="px-3 py-3" style={{ minWidth: "200px" }}>Box Name</th>
                             <th className="px-3 py-3 text-center" style={{ minWidth: "100px" }}>Action</th>
                          </tr>
                       </thead>
                       <tbody>
                          {loading && dscBoxes.length === 0 ? (
                             <tr><td colSpan={3} className="text-center py-4">Loading boxes...</td></tr>
                          ) : dscBoxes.length === 0 ? (
                             <tr><td colSpan={3} className="text-center py-4 text-muted">No boxes added yet</td></tr>
                          ) : (
                             dscBoxes.map((box, idx) => (
                                <tr key={box.id} className="align-middle">
                                   <td className="text-center">{idx + 1}</td>
                                   <td>{box.name}</td>
                                   <td className="text-center">
                                      <button className="btn btn-sm btn-outline-danger border-0 py-0"><i className="bi bi-trash"></i></button>
                                   </td>
                                </tr>
                             ))
                          )}
                       </tbody>
                    </table>
                 </div>
              </div>
           </div>
           <div className="col-12 col-md-5">
              <div className="card shadow-sm border-0 p-3 p-md-4">
                 <h6 className="fw-bold mb-4 border-bottom pb-2">Add Box</h6>
                 <form onSubmit={handleAddBox}>
                    <div className="mb-4">
                       <label className="small fw-bold mb-2">Box Name <span className="text-danger">*</span></label>
                       <input 
                         type="text" 
                         className="form-control form-control-sm py-2" 
                         placeholder="Enter box name" 
                         value={boxFormData.name}
                         onChange={(e) => setBoxFormData({ name: e.target.value })}
                       />
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
