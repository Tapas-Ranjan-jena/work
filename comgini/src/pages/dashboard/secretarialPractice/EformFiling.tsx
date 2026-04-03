import { useState, useEffect } from "react";
import secretarialService from "../../../services/secretarialService";

type ViewLevel = "grid" | "detail" | "pending";

interface FiscalYear {
  year: string;
  color: string;
}

export default function EformFiling() {
  const [level, setLevel] = useState<ViewLevel>("grid");
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [filings, setFilings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });

  useEffect(() => {
    fetchFilings();
  }, []);

  const fetchFilings = async (page = 1) => {
    try {
      setLoading(true);
      const res = await secretarialService.getFilings({ page, limit: pagination.limit });
      setFilings(res.data || []);
      setPagination(prev => ({ 
        ...prev, 
        page, 
        total: res.total || (res.data?.length === 0 ? 0 : page * pagination.limit) // Fallback if API doesn't return total
      }));
    } catch (error) {
      console.error("Failed to fetch filings", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredFilings = selectedYear 
    ? filings.filter(f => f.financial_year === selectedYear)
    : filings;

  const pendingFilings = filings.filter(f => f.status.toLowerCase() === 'pending');

  const years: FiscalYear[] = [
    { year: "2019-20", color: "#0ea5e9" }, // Light Blue
    { year: "2020-21", color: "#10b981" }, // Green
    { year: "2021-22", color: "#f87171" }, // Salmon
    { year: "2022-23", color: "#f59e0b" }, // Orange
    { year: "2023-24", color: "#0d9488" }, // Teal
    { year: "2024-25", color: "#8b5cf6" }, // Purple
  ];

  const handleYearClick = (year: string) => {
    setSelectedYear(year);
    setLevel("detail");
  };

  const handlePendingClick = () => {
    setLevel("pending");
  };

  const handleBackToGrid = () => {
    setLevel("grid");
    setSelectedYear(null);
  };

  const handleBackToDetail = () => {
    setLevel("detail");
  };

  return (
    <div className="eform-filing p-2 p-md-4">
      {/* ⭐ BREADCRUMBS */}
      <nav aria-label="breadcrumb" className="mb-4 d-flex justify-content-between align-items-center">
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item small"><a href="#" className="text-decoration-none text-primary">Home</a></li>
          {level === "grid" ? (
             <li className="breadcrumb-item small active" aria-current="page">E-form Filing Management</li>
          ) : level === "detail" ? (
             <>
               <li className="breadcrumb-item small"><a href="#" className="text-decoration-none" onClick={handleBackToGrid}>E-form Filing Management</a></li>
               <li className="breadcrumb-item small active" aria-current="page">{selectedYear} Filing Status</li>
             </>
          ) : (
             <>
               <li className="breadcrumb-item small"><a href="#" className="text-decoration-none" onClick={handleBackToGrid}>E-form Filing Management</a></li>
               <li className="breadcrumb-item small"><a href="#" className="text-decoration-none" onClick={handleBackToDetail}>{selectedYear} Filing Status</a></li>
               <li className="breadcrumb-item small active" aria-current="page">Pending Forms</li>
             </>
          )}
        </ol>

        {level === "pending" && (
           <button className="btn btn-primary btn-sm px-4" onClick={handleBackToDetail} style={{ background: "#1d4ed8", borderColor: "#1d4ed8" }}>
              <i className="bi bi-arrow-left"></i> Back
           </button>
        )}
      </nav>

      {/* ⭐ LEVEL 1: YEAR GRID */}
      {level === "grid" && (
        <div className="row g-4">
          {years.map((y) => (
            <div key={y.year} className="col-6 col-sm-6 col-md-4 col-lg-3">
              <div className="card border-0 shadow-sm overflow-hidden" 
                   style={{ background: y.color, cursor: "pointer", transition: "transform 0.2s" }}
                   onClick={() => handleYearClick(y.year)}
                   onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                   onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <div className="card-body p-4 text-white">
                  <h2 className="fw-bold mb-0" style={{ fontSize: "2.5rem" }}>{y.year}</h2>
                </div>
                <div className="card-footer bg-black bg-opacity-25 border-0 text-white text-center py-2 small d-flex align-items-center justify-content-center gap-2">
                  More info <i className="bi bi-arrow-right-circle"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ⭐ LEVEL 2: YEAR DETAIL */}
      {level === "detail" && (
        <div className="detail-view">
          <div className="card shadow-sm border-0 p-4 mb-4">
            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center mb-4 gap-3">
              <div className="d-flex align-items-center gap-3 gap-md-4 flex-wrap">
                <div className="d-flex align-items-center gap-2">
                  <div style={{ width: "16px", height: "16px", background: "#c084fc", borderRadius: "2px" }}></div>
                  <span className="small fw-semibold">In Progress</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <div style={{ width: "16px", height: "16px", background: "#f87171", borderRadius: "2px" }}></div>
                  <span className="small fw-semibold">Pending</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <div style={{ width: "16px", height: "16px", background: "#4ade80", borderRadius: "2px" }}></div>
                  <span className="small fw-semibold">Completed</span>
                </div>
              </div>
              <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-2 w-100 w-lg-auto">
                 <div className="d-flex align-items-center gap-2 w-100 w-sm-auto">
                    <span className="small min-w-50">Status</span>
                    <select className="form-select form-select-sm border py-1 px-3 w-100 w-sm-auto" style={{ minWidth: "120px" }}>
                       <option>All</option>
                    </select>
                 </div>
                 <div className="d-flex align-items-center gap-2 w-100 w-sm-auto">
                    <span className="small min-w-80">Applicablity</span>
                    <select className="form-select form-select-sm border py-1 px-3 w-100 w-sm-auto" style={{ minWidth: "120px" }}>
                       <option>All</option>
                    </select>
                 </div>
                 <button className="btn btn-primary btn-sm px-4 w-100 w-sm-auto" onClick={handlePendingClick} style={{ background: "#1d4ed8", borderColor: "#1d4ed8" }}>
                    Pending Forms
                 </button>
              </div>
            </div>

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-3">
               <div className="d-flex align-items-center gap-2 w-100 w-md-auto">
                  <button className="btn btn-outline-secondary btn-sm border px-3 w-50 w-md-auto">Show 10 rows</button>
                  <button className="btn btn-outline-secondary btn-sm border px-3 w-50 w-md-auto">Excel</button>
               </div>
               <div className="d-flex align-items-center gap-2 w-100 w-md-auto">
                  <span className="small">Search:</span>
                  <input type="text" className="form-control form-control-sm border w-100" style={{ maxWidth: "200px" }} />
               </div>
            </div>

            <div className="table-responsive border rounded overflow-hidden">
              <table className="table table-hover mb-0" style={{ fontSize: "12px" }}>
                <thead className="bg-secondary bg-opacity-25" style={{ whiteSpace: "nowrap" }}>
                  <tr>
                    <th className="px-3 py-3 text-center">#</th>
                    <th className="px-3 py-3">Company Name</th>
                    <th className="px-3 py-3">Annual Filing Applicability</th>
                    <th className="px-3 py-3">Financial Year</th>
                    <th className="px-3 py-3">AGM Date</th>
                    <th className="px-3 py-3">Receipt Date</th>
                    <th className="px-3 py-3">Status</th>
                    <th className="px-3 py-3">Update Compliance Tracker</th>
                    <th className="px-3 py-3">Comments</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={9} className="text-center py-4">Loading filings...</td></tr>
                  ) : filteredFilings.length === 0 ? (
                    <tr><td colSpan={9} className="text-center py-4 text-muted">No data available for {selectedYear}</td></tr>
                  ) : (
                    filteredFilings.map((f, idx) => (
                      <tr key={f.id} className="text-center align-middle">
                        <td>{idx + 1}</td>
                        <td className="text-start">{f.company_name}</td>
                        <td>{f.form_type}</td>
                        <td>{f.financial_year}</td>
                        <td>{f.agm_date || "N/A"}</td>
                        <td>{f.receipt_date || "N/A"}</td>
                        <td>
                          <span className={`badge rounded-pill px-3 py-1 ${
                            f.status.toLowerCase() === 'completed' ? 'bg-success' :
                            f.status.toLowerCase() === 'in progress' ? 'bg-purple' : 'bg-danger'
                          }`} style={{ background: f.status.toLowerCase() === 'in progress' ? '#c084fc' : undefined }}>
                            {f.status}
                          </span>
                        </td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary py-0 shadow-none">View</button>
                        </td>
                        <td className="text-muted small">{f.remarks || "No remarks"}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mt-3 gap-3 small text-muted">
               <div className="order-2 order-sm-1">Showing {(pagination.page - 1) * pagination.limit + 1} to {Math.min(pagination.page * pagination.limit, pagination.total || filings.length)} of {pagination.total || filings.length} entries</div>
            <div className="d-flex gap-0 align-items-center order-1 order-sm-2">
               <button 
                className="btn btn-outline-secondary btn-sm px-3 rounded-start" 
                style={{ fontSize: "12px" }}
                disabled={pagination.page === 1 || loading}
                onClick={() => fetchFilings(pagination.page - 1)}
               >
                Previous
               </button>
               <span className="border-top border-bottom py-1 px-3 bg-light fw-semibold" style={{ fontSize: "12px", height: "31px", display: "flex", alignItems: "center" }}>
                {pagination.page}
               </span>
               <button 
                className="btn btn-outline-secondary btn-sm px-3 rounded-end" 
                style={{ fontSize: "12px" }}
                disabled={filings.length < pagination.limit || loading}
                onClick={() => fetchFilings(pagination.page + 1)}
               >
                Next
               </button>
            </div>
            </div>
          </div>
        </div>
      )}

      {/* ⭐ LEVEL 3: PENDING FORMS */}
      {level === "pending" && (
        <div className="pending-forms-view">
           <div className="card shadow-sm border-0 p-4">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-3">
                 <div className="d-flex align-items-center gap-2 w-100 w-md-auto">
                    <button className="btn btn-outline-secondary btn-sm border px-3 w-50 w-md-auto">Show 10 rows</button>
                    <button className="btn btn-outline-secondary btn-sm border px-3 w-50 w-md-auto">Excel</button>
                 </div>
                 <div className="d-flex align-items-center gap-2 w-100 w-md-auto">
                    <span className="small">Search:</span>
                    <input type="text" className="form-control form-control-sm border w-100" style={{ maxWidth: "200px" }} />
                 </div>
              </div>

              <div className="table-responsive border rounded overflow-hidden">
                <table className="table table-hover mb-0" style={{ fontSize: "12px" }}>
                  <thead className="bg-secondary bg-opacity-25" style={{ whiteSpace: "nowrap" }}>
                    <tr>
                      <th className="px-3 py-3 text-center">Sr. no.</th>
                      <th className="px-3 py-3">Company Name</th>
                      <th className="px-3 py-3">Form Name</th>
                      <th className="px-3 py-3">Due Date</th>
                      <th className="px-3 py-3">Remarks</th>
                    </tr>
                  </thead>
                   <tbody>
                    {pendingFilings.length === 0 ? (
                      <tr><td colSpan={5} className="text-center py-4 text-muted">No pending forms found</td></tr>
                    ) : (
                      pendingFilings.map((f, idx) => (
                        <tr key={f.id} className="text-center align-middle">
                          <td>{idx + 1}</td>
                          <td className="text-start">{f.company_name}</td>
                          <td>{f.form_type}</td>
                          <td>{f.due_date}</td>
                          <td className="text-muted small">{f.remarks || "N/A"}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mt-3 gap-3 small text-muted">
                 <div className="order-2 order-sm-1">Showing 0 to 0 of 0 entries</div>
               <div className="d-flex gap-0 align-items-center order-1 order-sm-2">
                  <button className="btn btn-outline-secondary btn-sm px-3 rounded-start" style={{ fontSize: "12px" }}>Previous</button>
                  <span className="border-top border-bottom py-1 px-3 bg-light fw-semibold" style={{ fontSize: "12px", height: "31px", display: "flex", alignItems: "center" }}>1</span>
                  <button className="btn btn-outline-secondary btn-sm px-3 rounded-end" style={{ fontSize: "12px" }}>Next</button>
               </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
