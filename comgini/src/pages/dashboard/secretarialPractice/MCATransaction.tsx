import { useState, useEffect } from "react";
import secretarialService from "../../../services/secretarialService";
import toast from "react-hot-toast";


type TransactionView = "main" | "v2-list" | "v2-fetch" | "v3-list" | "v3-fetch";

export default function MCATransaction() {
  const [view, setView] = useState<TransactionView>("main");
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [mcaUsers, setMcaUsers] = useState<any[]>([]);

  // Fetch form state
  const [fetchForm, setFetchForm] = useState({
    userId: "",
    fromDate: "",
    toDate: ""
  });


  useEffect(() => {
    if (view === "v3-list" || view === "v2-list") {
      fetchTransactions();
    }
    if (view === "v2-fetch" || view === "v3-fetch" || view === "v3-list") {
      fetchMcaUsers();
    }
  }, [view]);

  const fetchMcaUsers = async () => {
    try {
      const res = await secretarialService.getMcaV2Users();
      setMcaUsers(res.data || []);
    } catch (error) {
      console.error("Failed to fetch MCA users", error);
    }
  };

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await secretarialService.getMcaTransactions();
      const items = res.data?.data || res.data || [];
      setTransactions(Array.isArray(items) ? items : (items.items || []));
    } catch (error) {
      console.error("Failed to fetch transactions", error);
    } finally {
      setLoading(false);
    }
  };

  const handleV2FetchSubmit = async () => {
    if (!fetchForm.userId || !fetchForm.fromDate || !fetchForm.toDate) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      setLoading(true);
      await secretarialService.fetchMcaV2Transactions({
        userId: Number(fetchForm.userId),
        fromDate: fetchForm.fromDate,
        toDate: fetchForm.toDate
      });
      toast.success("Fetch process initiated");
      setView("v2-list");
    } catch (error: any) {
      toast.error(error.message || "Failed to initiate fetch");
    } finally {
      setLoading(false);
    }
  };


  const SummaryCard = ({ title, color, onClick }: { title: string, color: string, onClick: () => void }) => (
    <div className="col-12 col-md-5">
      <div className="card text-white border-0 shadow-sm overflow-hidden" style={{ background: color, borderRadius: "2px" }}>
        <div className="card-body p-4 p-md-5 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "180px" }}>
          <h1 className="fw-bold mb-0 text-center" style={{ fontSize: "clamp(1.5rem, 5vw, 2.4rem)" }}>{title}</h1>
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
    <div className="mca-transaction-mgmt p-2 p-md-4">
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
        <div className="card shadow-sm border-0 p-4 p-md-5 mt-4">
           <div className="row g-4 g-md-5 justify-content-center">
              <SummaryCard title="MCA V2 Transaction" color="#00bcd4" onClick={() => setView("v2-list")} />
              <SummaryCard title="MCA V3 Transaction" color="#00a65a" onClick={() => setView("v3-list")} />
           </div>
        </div>
      )}

      {/* ⭐ V2 LIST VIEW (Screenshot 2) */}
      {view === "v2-list" && (
        <div className="v2-list-view">
           <div className="d-flex flex-column flex-md-row justify-content-end gap-2 mb-4 align-items-end align-items-md-center">
               <div className="w-100 w-md-auto d-flex flex-wrap justify-content-end gap-2">
                  <button className="btn btn-primary px-3 btn-sm flex-fill flex-md-grow-0" style={{ background: "#2b4cb3" }} onClick={() => setView("v2-fetch")}>Fetch Transaction</button>
                  <button className="btn btn-primary px-3 btn-sm flex-fill flex-md-grow-0" style={{ background: "#2b4cb3" }}>Get SRN Details</button>
               </div>
               <div className="text-end text-danger small mt-1 mt-md-0" style={{ fontSize: "10px" }}>
                 Quick Hint: Click on the SRN to view the Challan.<br/>
                 Last Transaction fetched date: -
               </div>
           </div>

           <div className="card shadow-sm border-0 p-3 p-md-4">
              <h6 className="fw-bold mb-4">Particulars of MCA V2-Transactions</h6>
              
              <div className="row g-3 mb-4 text-start">
                 <div className="col-12 col-md-4 col-lg-2">
                    <label className="fw-bold small d-block mb-1">Status:</label>
                    <select className="form-select form-select-sm border py-2">
                       <option>All</option>
                    </select>
                 </div>
                 <div className="col-12 col-md-4 col-lg-2">
                    <label className="fw-bold small d-block mb-1">User ID:</label>
                    <select className="form-select form-select-sm border py-2">
                       <option>All</option>
                    </select>
                 </div>
                 <div className="col-12 col-md-4 col-lg-2">
                    <label className="fw-bold small d-block mb-1">Due Date:</label>
                    <input type="date" className="form-control form-control-sm border py-2" />
                 </div>
                 <div className="col-12 col-md-6 col-lg-3">
                    <label className="fw-bold small d-block mb-1">Transaction Date:</label>
                    <input type="date" className="form-control form-control-sm border py-2" />
                 </div>
                 <div className="col-12 col-md-6 col-lg-3">
                    <label className="fw-bold small d-block mb-1">Payment Date:</label>
                    <input type="date" className="form-control form-control-sm border py-2" />
                 </div>
              </div>

              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-3">
                 <div className="d-flex flex-wrap gap-2 w-100 w-md-auto">
                    <button className="btn btn-outline-secondary btn-sm bg-white border flex-fill flex-md-grow-0">Show 10 rows</button>
                    <button className="btn btn-outline-secondary btn-sm bg-white border flex-fill flex-md-grow-0">Excel</button>
                    <button className="btn btn-outline-secondary btn-sm bg-white border flex-fill flex-md-grow-0">Column Visibility</button>
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
                          <th className="px-2 py-2 border-end" style={{ minWidth: "220px" }}>Company Name</th>
                          <th className="px-2 py-2 border-end" style={{ minWidth: "150px" }}>SRN</th>
                          <th className="px-2 py-2 border-end" style={{ minWidth: "150px" }}>Form Name</th>
                          <th className="px-2 py-2 border-end" style={{ minWidth: "100px" }}>Amount</th>
                          <th className="px-2 py-2 border-end" style={{ minWidth: "120px" }}>Pymt Status</th>
                          <th className="px-2 py-2 border-end" style={{ minWidth: "120px" }}>TXN Status</th>
                          <th className="px-2 py-2 border-end" style={{ minWidth: "120px" }}>TXN Date</th>
                          <th className="px-2 py-2 border-end" style={{ minWidth: "120px" }}>Pymt Date</th>
                          <th className="px-2 py-2 border-end" style={{ minWidth: "150px" }}>Assigned Member</th>
                          <th className="px-2 py-2 border-end" style={{ minWidth: "150px" }}>Pymt Details</th>
                          <th className="px-2 py-2 border-end" style={{ minWidth: "120px" }}>Due Date</th>
                          <th className="px-2 py-2 border-end" style={{ minWidth: "120px" }}>MCA User</th>
                          <th className="px-2 py-2" style={{ minWidth: "150px" }}>Remark</th>
                       </tr>
                    </thead>
                     <tbody>
                        {loading && transactions.length === 0 ? (
                           <tr><td colSpan={14} className="text-center py-4 text-muted small">Loading transactions...</td></tr>
                        ) : transactions.length === 0 ? (
                           <tr><td colSpan={14} className="text-center py-4 text-muted small">No data available in table</td></tr>
                        ) : (
                           transactions.map((t, idx) => (
                              <tr key={t.id || idx} className="align-middle text-start">
                                 <td className="text-center border-end">{idx + 1}</td>
                                 <td className="border-end px-2">{t.company_name || "-"}</td>
                                 <td className="border-end px-2">{t.srn || "-"}</td>
                                 <td className="border-end px-2">{t.form_name || "-"}</td>
                                 <td className="border-end px-2">{t.amount || "-"}</td>
                                 <td className="border-end px-2">{t.payment_status || "-"}</td>
                                 <td className="border-end px-2">{t.status || "-"}</td>
                                 <td className="border-end px-2">{t.transaction_date || "-"}</td>
                                 <td className="border-end px-2">{t.payment_date || "-"}</td>
                                 <td className="border-end px-2">{t.assigned_member || "-"}</td>
                                 <td className="border-end px-2 text-truncate" style={{maxWidth: "120px"}}>{t.payment_details || "-"}</td>
                                 <td className="border-end px-2">{t.due_date || "-"}</td>
                                 <td className="border-end px-2">{t.mca_user || "-"}</td>
                                 <td className="px-2">{t.remark || "-"}</td>
                              </tr>
                           ))
                        )}
                     </tbody>
                 </table>
              </div>
           </div>
        </div>
      )}

      {/* ⭐ V2 FETCH VIEW (Screenshot 3) */}
      {view === "v2-fetch" && (
        <div className="v2-fetch-view">
           <div className="card shadow-sm border-0 p-3 p-md-4">
              <div className="mb-4 small"><a href="#" className="text-primary text-decoration-none" onClick={() => setView("v2-list")}><i className="bi bi-arrow-left"></i> Back to List</a></div>
              <h6 className="fw-bold mb-4">Fetch MCA Transactions</h6>
              <div className="row g-3 align-items-center bg-light p-3 rounded text-start mx-0">
                  <div className="col-12 col-md-4">
                     <select 
                        className="form-select border-light py-2"
                        value={fetchForm.userId}
                        onChange={(e) => setFetchForm(prev => ({ ...prev, userId: e.target.value }))}
                     >
                        <option value="">Select User Name</option>
                        {mcaUsers.map(u => <option key={u.id} value={u.id}>{u.username || u.label || u.firstName || u.email}</option>)}
                     </select>
                  </div>
                  <div className="col-12 col-sm-6 col-md-3">
                     <input 
                        type="date" 
                        className="form-control border-light py-2 shadow-sm" 
                        placeholder="From (YYYY-MM-DD)" 
                        value={fetchForm.fromDate}
                        onChange={(e) => setFetchForm(prev => ({ ...prev, fromDate: e.target.value }))}
                     />
                  </div>
                  <div className="col-12 col-sm-6 col-md-3">
                     <input 
                        type="date" 
                        className="form-control border-light py-2 shadow-sm" 
                        placeholder="To (YYYY-MM-DD)" 
                        value={fetchForm.toDate}
                        onChange={(e) => setFetchForm(prev => ({ ...prev, toDate: e.target.value }))}
                     />
                  </div>
                  <div className="col-12 col-md-2">
                     <button 
                        className="btn btn-primary w-100 py-2" 
                        style={{ background: "#2b4cb3" }}
                        onClick={handleV2FetchSubmit}
                        disabled={loading}
                     >
                        {loading ? "Fetching..." : "Submit"}
                     </button>
                  </div>
               </div>
           </div>
        </div>
      )}

      {/* ⭐ V3 LIST VIEW (Screenshot 4) */}
      {view === "v3-list" && (
        <div className="v3-list-view">
           <div className="d-flex justify-content-end gap-2 mb-4 text-start">
              <button className="btn btn-primary px-4 btn-sm w-100 w-md-auto" style={{ background: "#2b4cb3" }} onClick={() => setView("v3-fetch")}>Fetch Transaction</button>
           </div>

           <div className="card shadow-sm border-0 p-3 p-md-4">
              <h6 className="fw-bold mb-4">Particulars of MCA V3-Transactions</h6>
              
              <div className="row g-3 mb-4 text-start">
                 <div className="col-12 col-md-4 col-lg-3">
                    <label className="fw-bold small d-block mb-1">From Date:</label>
                    <input type="date" className="form-control form-control-sm border py-2" value="2026-01-30" readOnly />
                 </div>
                 <div className="col-12 col-md-4 col-lg-3">
                    <label className="fw-bold small d-block mb-1">To Date:</label>
                    <input type="date" className="form-control form-control-sm border py-2" value="2026-03-30" readOnly />
                 </div>
                 <div className="col-12 col-md-4 col-lg-3">
                    <label className="fw-bold small d-block mb-1">MCA User:</label>
                    <select className="form-select form-select-sm border py-2">
                       <option value="">View All</option>
                       {mcaUsers.map(u => <option key={u.id} value={u.id}>{u.label || u.firstName || u.email}</option>)}
                    </select>
                 </div>
                 <div className="col-12 col-md-4 col-lg-3">
                    <label className="fw-bold small d-block mb-1">Status:</label>
                    <select className="form-select form-select-sm border py-2">
                       <option>All</option>
                    </select>
                 </div>
              </div>

              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-3">
                 <div className="d-flex flex-wrap gap-2 w-100 w-md-auto">
                    <button className="btn btn-outline-secondary btn-sm bg-white border flex-fill flex-md-grow-0">Show 10 rows</button>
                    <button className="btn btn-outline-secondary btn-sm bg-white border flex-fill flex-md-grow-0">Excel</button>
                    <button className="btn btn-outline-secondary btn-sm bg-white border flex-fill flex-md-grow-0">Column Visibility</button>
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
                          <th className="px-2 py-2 text-center border-end" style={{ minWidth: "60px" }}>Sr. No.</th>
                          <th className="px-2 py-2 border-end" style={{ minWidth: "220px" }}>Company Name</th>
                          <th className="px-2 py-2 border-end" style={{ minWidth: "200px" }}>Form Name</th>
                          <th className="px-2 py-2 border-end" style={{ minWidth: "150px" }}>SRN</th>
                          <th className="px-2 py-2 border-end" style={{ minWidth: "150px" }}>Status of the form</th>
                          <th className="px-2 py-2 border-end" style={{ minWidth: "150px" }}>Last modification date</th>
                          <th className="px-2 py-2 border-end" style={{ minWidth: "120px" }}>Expiry date</th>
                          <th className="px-2 py-2 border-end" style={{ minWidth: "120px" }}>Pymt Date</th>
                          <th className="px-2 py-2 border-end" style={{ minWidth: "200px" }}>Account Details</th>
                          <th className="px-2 py-2 border-end" style={{ minWidth: "150px" }}>Assigned member</th>
                          <th className="px-2 py-2 border-end" style={{ minWidth: "100px" }}>Amount</th>
                          <th className="px-2 py-2" style={{ minWidth: "120px" }}>MCA user</th>
                       </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                           <tr><td colSpan={12} className="text-center py-4 text-muted small">Loading transactions...</td></tr>
                        ) : transactions.length === 0 ? (
                           <tr><td colSpan={12} className="text-center py-4 text-muted small">No data available in table</td></tr>
                        ) : (
                           transactions.map((t, idx) => {
                               const meta = t.metadata ? (typeof t.metadata === 'string' ? JSON.parse(t.metadata) : t.metadata) : {};
                               return (
                                  <tr key={idx} className="align-middle text-start small">
                                     <td className="text-center border-end">{idx + 1}</td>
                                     <td className="border-end px-2">{t.company_name || t.company?.name || "-"}</td>
                                     <td className="border-end px-2">{t.description || t.form_name || "-"}</td>
                                     <td className="border-end px-2 text-center">{t.srn || "-"}</td>
                                     <td className="border-end px-2 text-center">
                                        <span className={`badge ${t.status === 'synced' ? 'bg-success' : 'bg-warning'} px-2 py-1`}>
                                           {t.status || "pending"}
                                        </span>
                                     </td>
                                     <td className="border-end px-2 text-center small">
                                        {t.created_at ? new Date(t.created_at).toLocaleDateString('en-IN', {
                                           day: '2-digit', month: '2-digit', year: 'numeric'
                                        }) : "-"}
                                     </td>
                                     <td className="border-end px-2 text-center">{meta.expiry_date || "-"}</td>
                                     <td className="border-end px-2 text-center">{meta.payment_date || "-"}</td>
                                     <td className="border-end px-2 text-center small">{meta.account_details || "-"}</td>
                                     <td className="border-end px-2 text-center">{meta.assigned_member || "-"}</td>
                                     <td className="border-end px-2 text-center fw-bold">{t.amount || "-"}</td>
                                     <td className="px-2 text-center">{meta.mca_user || "-"}</td>
                                  </tr>
                               );
                           })
                        )}
                    </tbody>
                 </table>
              </div>
           </div>
        </div>
      )}

      {/* ⭐ V3 FETCH VIEW (Screenshot 5) */}
      {view === "v3-fetch" && (
        <div className="v3-fetch-view d-flex align-items-center justify-content-center">
           <div className="card shadow border p-0 overflow-hidden w-100" style={{ maxWidth: "940px" }}>
              <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
                 <h6 className="fw-bold mb-0 w-100 text-center">Fetch MCA Transactions</h6>
                 <button className="btn-close" onClick={() => setView("v3-list")}></button>
              </div>
              <div className="card-body p-3 p-md-4 text-start">
                 <div className="text-danger small mb-4 text-end" style={{ fontSize: "11px", fontWeight: "300" }}>
                    * Hint: Only 50 transactions can be fetched at a time, so please specify the filter accordingly.
                 </div>

                 <div className="row mb-4 align-items-start align-items-md-center gap-2 gap-md-0">
                    <label className="col-12 col-md-3 fw-bold small">USER ID <span className="text-danger">*</span></label>
                    <div className="col-12 col-md-9 border-start-md ps-md-4">
                       <select className="form-select border py-2">
                          <option value="">Select MCA User</option>
                          {mcaUsers.map(u => (
                            <option key={u.id} value={u.id}>{u.label || u.firstName || u.email}</option>
                          ))}
                       </select>
                    </div>
                 </div>

                 <h6 className="fw-bold small border-bottom pb-2 mb-4 mt-5" style={{ letterSpacing: "1px" }}>ADVANCE FILTER</h6>
                 
                 <div className="row g-4 mb-4">
                    <div className="col-12 col-sm-6 col-md-3">
                       <label className="fw-bold small d-block mb-1">Last Modified Date - From</label>
                       <input type="text" className="form-control border-light shadow-sm py-2" placeholder="d/m/Y" />
                    </div>
                    <div className="col-12 col-sm-6 col-md-3">
                       <label className="fw-bold small d-block mb-1">Last Modified Date - To</label>
                       <input type="text" className="form-control border-light shadow-sm py-2" placeholder="d/m/Y" />
                    </div>
                    <div className="col-12 col-sm-6 col-md-3">
                       <label className="fw-bold small d-block mb-1">Identification Number</label>
                       <input type="text" className="form-control border-light shadow-sm py-2" placeholder="Search CIN/LLPIN/Name" />
                    </div>
                    <div className="col-12 col-sm-6 col-md-3">
                       <label className="fw-bold small d-block mb-1">SRN of E-Form</label>
                       <input type="text" className="form-control border-light shadow-sm py-2" placeholder="Search SRN number" />
                    </div>
                 </div>

                 <div className="row mb-5">
                    <div className="col-12 col-sm-6 col-md-3">
                       <label className="fw-bold small d-block mb-1">Status</label>
                       <select className="form-select border-light shadow-sm py-2">
                          <option>Select Status</option>
                       </select>
                    </div>
                 </div>

                 <div className="border-top pt-4 text-start">
                    <button className="btn btn-primary px-5 py-2 w-100 w-md-auto" style={{ background: "#2b4cb3" }}>Fetch</button>
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
