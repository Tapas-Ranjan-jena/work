import { useState } from "react";

type TransactionView = "main" | "v2-list" | "v2-fetch" | "v3-list" | "v3-fetch";

export default function MCATransaction() {
  const [view, setView] = useState<TransactionView>("main");

  const SummaryCard = ({ title, color, onClick }: { title: string, color: string, onClick: () => void }) => (
    <div className="col-md-5">
      <div className="card text-white border-0 shadow-sm overflow-hidden" style={{ background: color, borderRadius: "2px" }}>
        <div className="card-body p-5 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "220px" }}>
          <h1 className="fw-bold mb-0 text-center" style={{ fontSize: "2.4rem" }}>{title}</h1>
        </div>
        <div className="card-footer bg-black bg-opacity-10 border-0 text-white text-center py-2 small d-flex align-items-center justify-content-center gap-2" 
             style={{ cursor: "pointer" }}
             onClick={onClick}>
          More Info <i className="bi bi-arrow-right-circle"></i>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mca-transaction-mgmt p-4">
      {/* ⭐ BREADCRUMBS */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item small"><a href="#" className="text-decoration-none text-primary" onClick={() => setView("main")}>Home</a></li>
          {view === "main" ? (
             <li className="breadcrumb-item small active" aria-current="page">MCA Transaction</li>
          ) : (view === "v2-list" || view === "v2-fetch") ? (
             <>
               <li className="breadcrumb-item small"><a href="#" className="text-decoration-none text-primary" onClick={() => setView("main")}>Transactions</a></li>
               <li className="breadcrumb-item small active" aria-current="page">V-2 Transactions</li>
             </>
          ) : (
             <>
               <li className="breadcrumb-item small"><a href="#" className="text-decoration-none text-primary" onClick={() => setView("main")}>Transactions</a></li>
               <li className="breadcrumb-item small active" aria-current="page">V-3 Transactions</li>
             </>
          )}
        </ol>
      </nav>

      {/* ⭐ MAIN DASHBOARD (Screenshot 1) */}
      {view === "main" && (
        <div className="card shadow-sm border-0 p-5 mt-4">
           <div className="row g-5 justify-content-center">
              <SummaryCard title="MCA V2 Transaction" color="#00bcd4" onClick={() => setView("v2-list")} />
              <SummaryCard title="MCA V3 Transaction" color="#00a65a" onClick={() => setView("v3-list")} />
           </div>
        </div>
      )}

      {/* ⭐ V2 LIST VIEW (Screenshot 2) */}
      {view === "v2-list" && (
        <div className="v2-list-view">
           <div className="d-flex justify-content-end gap-2 mb-4">
              <div className="text-end me-3">
                 <button className="btn btn-primary px-3 btn-sm" style={{ background: "#2b4cb3" }} onClick={() => setView("v2-fetch")}>Fetch Transaction</button>
                 <button className="btn btn-primary px-3 ms-2 btn-sm" style={{ background: "#2b4cb3" }}>Get SRN Details</button>
                 <div className="text-danger small mt-1" style={{ fontSize: "10px" }}>
                   Quick Hint: Click on the SRN to view the Challan.<br/>
                   Last Transaction fetched date: -
                 </div>
              </div>
           </div>

           <div className="card shadow-sm border-0 p-4">
              <h6 className="fw-bold mb-4">Particulars of MCA V2-Transactions</h6>
              
              <div className="row g-3 mb-4 text-start">
                 <div className="col-md-2">
                    <label className="fw-bold small d-block mb-1">Status:</label>
                    <select className="form-select form-select-sm border">
                       <option>All</option>
                    </select>
                 </div>
                 <div className="col-md-2">
                    <label className="fw-bold small d-block mb-1">User ID:</label>
                    <select className="form-select form-select-sm border">
                       <option>All</option>
                    </select>
                 </div>
                 <div className="col-md-2">
                    <label className="fw-bold small d-block mb-1">Due Date:</label>
                    <input type="date" className="form-control form-control-sm border" />
                 </div>
                 <div className="col-md-3">
                    <label className="fw-bold small d-block mb-1">Transaction Date:</label>
                    <input type="date" className="form-control form-control-sm border" />
                 </div>
                 <div className="col-md-2">
                    <label className="fw-bold small d-block mb-1">Payment Date:</label>
                    <input type="date" className="form-control form-control-sm border" />
                 </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                 <div className="d-flex gap-2">
                    <button className="btn btn-outline-secondary btn-sm bg-white border">Show 10 rows</button>
                    <button className="btn btn-outline-secondary btn-sm bg-white border">Excel</button>
                    <button className="btn btn-outline-secondary btn-sm bg-white border">Column Visibility</button>
                 </div>
                 <div className="d-flex align-items-center gap-2 small">
                    Search: <input type="text" className="form-control form-control-sm border" />
                 </div>
              </div>

              <div className="table-responsive border rounded overflow-hidden">
                 <table className="table table-hover mb-0" style={{ fontSize: "11px" }}>
                    <thead style={{ background: "#94a3b8", color: "white" }}>
                       <tr className="align-middle">
                          <th className="px-2 py-2 text-center border-end">#</th>
                          <th className="px-2 py-2 border-end">Company Name</th>
                          <th className="px-2 py-2 border-end">SRN</th>
                          <th className="px-2 py-2 border-end">Form Name</th>
                          <th className="px-2 py-2 border-end">Amount</th>
                          <th className="px-2 py-2 border-end">Pymt Status</th>
                          <th className="px-2 py-2 border-end">TXN Status</th>
                          <th className="px-2 py-2 border-end">TXN Date</th>
                          <th className="px-2 py-2 border-end">Pymt Date</th>
                          <th className="px-2 py-2 border-end">Assigned Member</th>
                          <th className="px-2 py-2 border-end">Pymt Details</th>
                          <th className="px-2 py-2 border-end">Due Date</th>
                          <th className="px-2 py-2 border-end">MCA User</th>
                          <th className="px-2 py-2">Remark</th>
                       </tr>
                    </thead>
                    <tbody>
                       <tr>
                          <td colSpan={14} className="text-center py-4 text-muted small">No data available in table</td>
                       </tr>
                    </tbody>
                 </table>
              </div>
           </div>
        </div>
      )}

      {/* ⭐ V2 FETCH VIEW (Screenshot 3) */}
      {view === "v2-fetch" && (
        <div className="v2-fetch-view">
           <div className="card shadow-sm border-0 p-4">
              <div className="mb-4 small"><a href="#" className="text-primary text-decoration-none" onClick={() => setView("v2-list")}>Back to List</a></div>
              <h6 className="fw-bold mb-4">Fetch MCA Transactions</h6>
              <div className="row g-3 align-items-center bg-light p-3 rounded text-start">
                 <div className="col-md-4">
                    <select className="form-select border-light">
                       <option>Select User Name</option>
                    </select>
                 </div>
                 <div className="col-md-3">
                    <input type="text" className="form-control border-light" placeholder="From (YYYY-MM-DD)" />
                 </div>
                 <div className="col-md-3">
                    <input type="text" className="form-control border-light" placeholder="To (YYYY-MM-DD)" />
                 </div>
                 <div className="col-md-2">
                    <button className="btn btn-primary w-100" style={{ background: "#2b4cb3" }}>Submit</button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* ⭐ V3 LIST VIEW (Screenshot 4) */}
      {view === "v3-list" && (
        <div className="v3-list-view">
           <div className="d-flex justify-content-end gap-2 mb-4">
              <button className="btn btn-primary px-3 btn-sm" style={{ background: "#2b4cb3" }} onClick={() => setView("v3-fetch")}>Fetch Transaction</button>
           </div>

           <div className="card shadow-sm border-0 p-4">
              <h6 className="fw-bold mb-4">Particulars of MCA V3-Transactions</h6>
              
              <div className="row g-3 mb-4 text-start">
                 <div className="col-md-3">
                    <label className="fw-bold small d-block mb-1">From Date:</label>
                    <input type="date" className="form-control form-control-sm border" value="2026-01-30" readOnly />
                 </div>
                 <div className="col-md-3">
                    <label className="fw-bold small d-block mb-1">To Date:</label>
                    <input type="date" className="form-control form-control-sm border" value="2026-03-30" readOnly />
                 </div>
                 <div className="col-md-3">
                    <label className="fw-bold small d-block mb-1">MCA User:</label>
                    <select className="form-select form-select-sm border">
                       <option>View All</option>
                    </select>
                 </div>
                 <div className="col-md-3">
                    <label className="fw-bold small d-block mb-1">Status:</label>
                    <select className="form-select form-select-sm border">
                       <option>All</option>
                    </select>
                 </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                 <div className="d-flex gap-2">
                    <button className="btn btn-outline-secondary btn-sm bg-white border">Show 10 rows</button>
                    <button className="btn btn-outline-secondary btn-sm bg-white border">Excel</button>
                    <button className="btn btn-outline-secondary btn-sm bg-white border">Column Visibility</button>
                 </div>
                 <div className="d-flex align-items-center gap-2 small">
                    Search: <input type="text" className="form-control form-control-sm border" />
                 </div>
              </div>

              <div className="table-responsive border rounded overflow-hidden">
                 <table className="table table-hover mb-0" style={{ fontSize: "11px" }}>
                    <thead style={{ background: "#94a3b8", color: "white" }}>
                       <tr className="align-middle">
                          <th className="px-2 py-2 text-center border-end">Sr. No.</th>
                          <th className="px-2 py-2 border-end">Company Name</th>
                          <th className="px-2 py-2 border-end">Form Name</th>
                          <th className="px-2 py-2 border-end">SRN</th>
                          <th className="px-2 py-2 border-end">Status of the form</th>
                          <th className="px-2 py-2 border-end">Last modification date</th>
                          <th className="px-2 py-2 border-end">Expiry date</th>
                          <th className="px-2 py-2 border-end">Pymt Date</th>
                          <th className="px-2 py-2 border-end">Account Details</th>
                          <th className="px-2 py-2 border-end">Assigned member</th>
                          <th className="px-2 py-2 border-end">Amount</th>
                          <th className="px-2 py-2">MCA user</th>
                       </tr>
                    </thead>
                    <tbody>
                       <tr>
                          <td colSpan={12} className="text-center py-4 text-muted small">No data available in table</td>
                       </tr>
                    </tbody>
                 </table>
              </div>
           </div>
        </div>
      )}

      {/* ⭐ V3 FETCH VIEW (Screenshot 5) */}
      {view === "v3-fetch" && (
        <div className="v3-fetch-view d-flex align-items-center justify-content-center">
           <div className="card shadow border p-0 overflow-hidden" style={{ width: "940px" }}>
              <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
                 <h6 className="fw-bold mb-0 w-100 text-center">Fetch MCA Transactions</h6>
                 <button className="btn-close" onClick={() => setView("v3-list")}></button>
              </div>
              <div className="card-body p-4 text-start">
                 <div className="text-danger small mb-4 text-end" style={{ fontSize: "11px", fontWeight: "300" }}>
                    * Hint: Only 50 transactions can be fetched at a time, so please specify the filter accordingly.
                 </div>

                 <div className="row mb-5 align-items-center">
                    <label className="col-md-3 fw-bold small">USER ID <span className="text-danger">*</span></label>
                    <div className="col-md-9 border-start ps-4">
                       <select className="form-select border">
                          <option>Select MCA User</option>
                       </select>
                    </div>
                 </div>

                 <h6 className="fw-bold small border-bottom pb-2 mb-4" style={{ letterSpacing: "1px" }}>ADVANCE FILTER</h6>
                 
                 <div className="row g-4 mb-4">
                    <div className="col-md-3">
                       <label className="fw-bold small d-block mb-1">Last Modified Date - From</label>
                       <input type="text" className="form-control border-light shadow-sm" placeholder="d/m/Y" />
                    </div>
                    <div className="col-md-3">
                       <label className="fw-bold small d-block mb-1">Last Modified Date - To</label>
                       <input type="text" className="form-control border-light shadow-sm" placeholder="d/m/Y" />
                    </div>
                    <div className="col-md-3">
                       <label className="fw-bold small d-block mb-1">Identification Number</label>
                       <input type="text" className="form-control border-light shadow-sm" placeholder="Search CIN/LLPIN/Name" />
                    </div>
                    <div className="col-md-3">
                       <label className="fw-bold small d-block mb-1">SRN of E-Form</label>
                       <input type="text" className="form-control border-light shadow-sm" placeholder="Search SRN number" />
                    </div>
                 </div>

                 <div className="row mb-5">
                    <div className="col-md-3">
                       <label className="fw-bold small d-block mb-1">Status</label>
                       <select className="form-select border-light shadow-sm">
                          <option>Select Status</option>
                       </select>
                    </div>
                 </div>

                 <div className="border-top pt-4 text-start">
                    <button className="btn btn-primary px-4" style={{ background: "#2b4cb3" }}>Fetch</button>
                 </div>
              </div>
              <div className="bg-light p-2 text-end border-top">
                 <button className="btn-close opacity-50" style={{ fontSize: "12px" }} onClick={() => setView("v3-list")}></button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
