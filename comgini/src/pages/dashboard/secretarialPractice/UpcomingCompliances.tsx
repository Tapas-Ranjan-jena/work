import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import secretarialService from "../../../services/secretarialService";

export default function UpcomingCompliances() {
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showBulkUpdate, setShowBulkUpdate] = useState(false);
  const [showUploadExcel, setShowUploadExcel] = useState(false);
  const [reminders, setReminders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Modal states
  const [modalData, setModalData] = useState({
    compliance_type: "",
    due_date: "",
    reminder_date: "",
    email_recipients: "",
    email_subject: "Reminder: Upcoming Compliance Due Dates",
    email_body: "Dear User,\n\nThis is a gentle reminder of the upcoming compliance requirements for your attention:",
    send_whatsapp: false
  });

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      setLoading(true);
      const res = await secretarialService.getReminders();
      setReminders(res.data || []);
    } catch (error) {
      console.error("Failed to fetch reminders", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleBulk = () => {
    setShowBulkUpdate(!showBulkUpdate);
    setShowUploadExcel(false);
  };

  const handleToggleUpload = () => {
    setShowUploadExcel(!showUploadExcel);
    setShowBulkUpdate(false);
  };

  const handleSaveReminder = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await secretarialService.createComplianceReminder({
        compliance_id: 1, // Placeholder
        company_id: 1,    // Default or based on selection
        reminder_date: modalData.reminder_date,
        reminder_slot: "morning", // Placeholder
        emails: modalData.email_recipients.split(",").map(e => e.trim()),
        subject: modalData.email_subject,
        description: modalData.email_body
      });
      toast.success("Reminder set successfully");
      setShowReminderModal(false);
      fetchReminders();
    } catch (error) {
      toast.error("Failed to set reminder");
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr || dateStr === "-") return "-";
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="upcoming-compliances p-3 p-md-4">
      {/* ⭐ BREADCRUMBS & TOP ACTIONS */}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4 w-100">
        <div>
           <nav aria-label="breadcrumb">
             <ol className="breadcrumb mb-1">
               <li className="breadcrumb-item small"><a href="#" className="text-decoration-none text-primary">Home</a></li>
               <li className="breadcrumb-item small active" aria-current="page">Compliance Dashboard</li>
             </ol>
           </nav>
           <h5 className="fw-bold mb-0 text-dark d-none d-md-block text-nowrap">Upcoming Compliances Dashboard</h5>
        </div>
        <div className="d-flex align-items-center gap-2 ms-auto">
           <button className="btn btn-primary d-flex align-items-center justify-content-center px-3 py-1 shadow-sm text-nowrap" 
                   onClick={() => setShowReminderModal(true)} 
                   style={{ background: "#2563eb", borderColor: "#2563eb", borderRadius: "6px", fontSize: "12px", height: "34px", width: "fit-content" }}>
              <i className="bi bi-bell me-2"></i> Set Reminder
           </button>
           <button className={`btn d-flex align-items-center justify-content-center px-3 py-1 shadow-sm text-nowrap ${showBulkUpdate ? 'btn-dark' : 'btn-primary'}`} 
                   onClick={handleToggleBulk}
                   style={{ background: showBulkUpdate ? "#1e293b" : "#2563eb", borderColor: showBulkUpdate ? "#1e293b" : "#2563eb", borderRadius: "6px", fontSize: "12px", height: "34px", width: "fit-content" }}>
              <i className="bi bi-pencil-square me-2"></i> Bulk Update
           </button>
           <button className={`btn d-flex align-items-center justify-content-center px-3 py-1 shadow-sm text-nowrap ${showUploadExcel ? 'btn-dark' : 'btn-primary'}`} 
                   onClick={handleToggleUpload}
                   style={{ background: showUploadExcel ? "#1e293b" : "#2563eb", borderColor: showUploadExcel ? "#1e293b" : "#2563eb", borderRadius: "6px", fontSize: "12px", height: "34px", width: "fit-content" }}>
              <i className="bi bi-file-earmark-excel me-2"></i> Upload Excel
           </button>
        </div>
      </div>

      {/* ⭐ BULK UPDATE SECTION */}
      {showBulkUpdate && (
        <div className="card shadow-sm border-0 p-3 p-md-4 mb-4 bg-white" style={{ borderRadius: "12px" }}>
           <h6 className="fw-bold mb-3 small text-uppercase tracking-wider text-secondary">Bulk Management</h6>
           <div className="row g-3 align-items-end">
              <div className="col-12 col-md-3">
                 <label className="small fw-bold mb-1 text-muted">Select Companies</label>
                 <select className="form-select form-select-sm border py-2 shadow-none">
                    <option>Select</option>
                 </select>
              </div>
              <div className="col-6 col-md-2">
                 <label className="small fw-bold mb-1 text-muted">To Be Done This FY</label>
                 <select className="form-select form-select-sm border py-2 shadow-none">
                    <option>2026-27</option>
                 </select>
              </div>
              <div className="col-6 col-md-2">
                 <label className="small fw-bold mb-1 text-muted">Applicability</label>
                 <select className="form-select form-select-sm border py-2 shadow-none">
                    <option>Select Applicability</option>
                 </select>
              </div>
              <div className="col-12 col-md-3">
                 <label className="small fw-bold mb-1 text-muted">Compliance Type</label>
                 <select className="form-select form-select-sm border py-2 shadow-none">
                    <option>Select</option>
                 </select>
              </div>
              <div className="col-12 col-md-2">
                 <button className="btn btn-primary btn-sm w-100 py-2 fw-semibold" style={{ background: "#2563eb", borderColor: "#2563eb" }}>
                    Update
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* ⭐ UPLOAD EXCEL SECTION */}
      {showUploadExcel && (
        <div className="card shadow-sm border-0 p-3 p-md-4 mb-4 bg-white" style={{ borderRadius: "12px" }}>
           <h6 className="fw-bold mb-3 small text-uppercase tracking-wider text-secondary">Import Compliance Data</h6>
           <div className="row g-3 g-md-4 align-items-end">
              <div className="col-12 col-md-3">
                 <label className="small fw-bold mb-1 text-muted">To Be Done This FY</label>
                 <select className="form-select form-select-sm border py-2 shadow-none">
                    <option>2026-27</option>
                 </select>
              </div>
              <div className="col-12 col-md-6">
                 <label className="small fw-bold mb-1 text-muted">Upload File</label>
                 <div className="input-group input-group-sm">
                    <input type="file" className="form-control py-2 shadow-none" />
                 </div>
              </div>
              <div className="col-12 col-md-3">
                 <button className="btn btn-outline-primary btn-sm w-100 py-2 fw-semibold">
                    <i className="bi bi-cloud-download me-2"></i>Download Template
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* ⭐ FILTERS */}
      <div className="card shadow-sm border-0 p-3 p-md-4 mb-4 bg-white" style={{ borderRadius: "12px" }}>
        <div className="row g-3">
          <div className="col-6 col-md-2">
            <label className="small fw-bold mb-1 text-muted">To Be Done This FY</label>
            <select className="form-select form-select-sm bg-light border-0 py-2 shadow-none">
              <option>2026-27</option>
            </select>
          </div>
          <div className="col-6 col-md-2">
            <label className="small fw-bold mb-1 text-muted">Applicability</label>
            <select className="form-select form-select-sm bg-light border-0 py-2 shadow-none">
              <option>All</option>
            </select>
          </div>
          <div className="col-6 col-md-2">
            <label className="small fw-bold mb-1 text-muted">Compliance Type</label>
            <select className="form-select form-select-sm bg-light border-0 py-2 shadow-none">
              <option>All</option>
            </select>
          </div>
          <div className="col-6 col-md-2">
            <label className="small fw-bold mb-1 text-muted">Status</label>
            <select className="form-select form-select-sm bg-light border-0 py-2 shadow-none">
              <option>Select Status</option>
            </select>
          </div>
          <div className="col-6 col-md-2">
            <label className="small fw-bold mb-1 text-muted">Assigned Member</label>
            <select className="form-select form-select-sm bg-light border-0 py-2 shadow-none">
              <option>Select User</option>
            </select>
          </div>
          <div className="col-6 col-md-2">
            <label className="small fw-bold mb-1 text-muted">Due Date</label>
            <select className="form-select form-select-sm bg-light border-0 py-2 shadow-none">
              <option>All</option>
            </select>
          </div>
        </div>
      </div>

      {/* ⭐ SUMMARY TABLE */}
      <div className="table-responsive border-0 rounded-4 overflow-auto mb-5 shadow-sm" style={{ WebkitOverflowScrolling: "touch" }}>
        <table className="table mb-0" style={{ fontSize: "13px", minWidth: "900px" }}>
          <thead>
            <tr className="text-center align-middle">
              <th className="px-3 py-3 border-0 fw-bold text-uppercase tracking-wider" style={{ background: "#ef4444", color: "white", width: "25%" }}>Compliance</th>
              <th className="px-3 py-3 border-0 fw-bold text-uppercase tracking-wider" style={{ background: "#ef4444", color: "white" }}>Due Date</th>
              <th className="px-3 py-3 border-0 fw-bold text-uppercase tracking-wider" style={{ background: "#ef4444", color: "white" }}>Applicable</th>
              <th className="px-3 py-3 border-0 fw-bold text-uppercase tracking-wider" style={{ background: "#ef4444", color: "white" }}>Filed</th>
              <th className="px-3 py-3 border-0 fw-bold text-uppercase tracking-wider" style={{ background: "#ef4444", color: "white" }}>Ongoing</th>
              <th className="px-3 py-3 border-0 fw-bold text-uppercase tracking-wider" style={{ background: "#ef4444", color: "white" }}>Pending</th>
              <th className="px-3 py-3 border-0 fw-bold text-uppercase tracking-wider" style={{ background: "#ef4444", color: "white" }}>Overdue</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="text-center py-5 bg-white">
                <div className="spinner-border spinner-border-sm text-primary me-2"></div>Loading summary...
              </td></tr>
            ) : reminders.length === 0 ? (
              <tr><td colSpan={7} className="text-center py-5 bg-white text-muted">No summary available</td></tr>
            ) : (
                Array.from(new Set(reminders.map(r => r.compliance_type))).map((type, idx) => {
                    const typeReminders = reminders.filter(r => r.compliance_type === type);
                    const filed = typeReminders.filter(r => r.status === 'filed').length;
                    const ongoing = typeReminders.filter(r => r.status === 'ongoing').length;
                    const pending = typeReminders.filter(r => r.status === 'pending').length;
                    const overdue = typeReminders.filter(r => r.status === 'overdue').length;
                    const dueDate = typeReminders[0]?.due_date;

                    return (
                        <tr key={idx} className="text-center align-middle bg-white border-bottom">
                          <td className="px-4 py-3 text-start fw-bold text-dark">{type}</td>
                          <td className="text-secondary">{formatDate(dueDate)}</td>
                          <td className="fw-semibold">{typeReminders.length}</td>
                          <td className="text-success fw-bold">{filed}</td>
                          <td className="text-warning fw-bold">{ongoing}</td>
                          <td className="text-danger fw-bold">{pending}</td>
                          <td className="text-dark fw-bold">{overdue}</td>
                        </tr>
                    );
                })
            )}
          </tbody>
        </table>
      </div>

      {/* ⭐ DETAILED TABLE CARD */}
      <div className="card shadow-sm border-0 p-0 overflow-hidden bg-white" style={{ borderRadius: "12px" }}>
        <div className="p-4 border-bottom d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
          <h6 className="fw-bold mb-0 text-dark tracking-wide">UPCOMING COMPLIANCES LIST</h6>
          <div className="d-flex align-items-center gap-2 w-100 w-md-auto">
             <span className="small text-muted text-nowrap">Search:</span>
             <div className="position-relative w-100">
               <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted small"></i>
               <input type="text" className="form-control form-control-sm border ps-5 py-2 w-100" placeholder="Search compliance..." style={{ maxWidth: "300px", borderRadius: "8px" }} />
             </div>
          </div>
        </div>

        <div className="p-4 bg-light bg-opacity-10">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-3">
             <div className="d-flex align-items-center gap-2 w-100 w-md-auto">
                <button className="btn btn-white btn-sm border bg-white px-3 shadow-sm" style={{ fontSize: "12px", borderRadius: "6px" }}>Show 10 rows</button>
                <button className="btn btn-white btn-sm border bg-white px-3 shadow-sm" style={{ fontSize: "12px", borderRadius: "6px" }}>
                  <i className="bi bi-file-earmark-excel-fill text-success me-1"></i>Excel
                </button>
             </div>
          </div>

          <div className="table-responsive border rounded-3 bg-white no-scrollbar-on-desktop">
            <table className="table table-hover mb-0" style={{ fontSize: "12px" }}>
              <thead>
                <tr className="align-middle" style={{ background: "#f8fafc" }}>
                  <th className="px-3 py-3 text-center border-0 text-secondary" style={{ minWidth: "60px" }}>Sr. No.</th>
                  <th className="px-3 py-3 border-0 text-secondary" style={{ minWidth: "220px" }}>Company Name</th>
                  <th className="px-3 py-3 border-0 text-secondary" style={{ minWidth: "150px" }}>Compliance</th>
                  <th className="px-3 py-3 border-0 text-secondary" style={{ minWidth: "120px" }}>Applicability</th>
                  <th className="px-3 py-3 border-0 text-secondary text-center" style={{ minWidth: "100px" }}>Status</th>
                  <th className="px-3 py-3 border-0 text-secondary" style={{ minWidth: "120px" }}>SRN</th>
                  <th className="px-3 py-3 border-0 text-secondary" style={{ minWidth: "120px" }}>Date of Filing</th>
                  <th className="px-3 py-3 border-0 text-secondary" style={{ minWidth: "150px" }}>Assigned Member</th>
                  <th className="px-3 py-3 border-0 text-secondary" style={{ minWidth: "120px" }}>Due Date</th>
                  <th className="px-3 py-3 border-0 text-secondary" style={{ minWidth: "120px" }}>Last Updated</th>
                  <th className="px-3 py-3 border-0 text-secondary" style={{ minWidth: "200px" }}>Remarks</th>
                </tr>
              </thead>
              <tbody className="border-top-0">
                {loading ? (
                  <tr><td colSpan={11} className="text-center py-5">
                    <div className="spinner-border spinner-border-sm text-primary"></div>
                  </td></tr>
                ) : reminders.length === 0 ? (
                  <tr><td colSpan={11} className="text-center py-5 text-muted small">No upcoming compliances found</td></tr>
                ) : (
                  reminders.map((r, idx) => (
                      <tr key={r.id} className="align-middle">
                        <td className="px-3 py-3 text-center text-secondary">{idx + 1}</td>
                        <td className="px-3 py-3 fw-medium text-dark">{r.company_name}</td>
                        <td className="px-3 py-3">{r.compliance_type}</td>
                        <td className="px-3 py-3"><span className="badge bg-light text-dark fw-normal border">Common</span></td>
                        <td className="px-3 py-3 text-center">
                          <span className={`badge rounded-pill px-3 py-1 fw-semibold ${
                            r.status === 'pending' ? 'bg-danger bg-opacity-10 text-danger' : 
                            r.status === 'filed' ? 'bg-success bg-opacity-10 text-success' : 'bg-warning bg-opacity-10 text-warning'
                          }`} style={{ fontSize: "11px" }}>
                            {r.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-muted">{r.srn || "-"}</td>
                        <td className="px-3 py-3">{formatDate(r.filing_date)}</td>
                        <td className="px-3 py-3 text-secondary">Tapas</td>
                        <td className="px-3 py-3 fw-bold text-dark">{formatDate(r.due_date)}</td>
                        <td className="px-3 py-3 text-muted">{new Date(r.updated_at).toLocaleDateString()}</td>
                        <td className="px-3 py-3 text-muted small fst-italic">Reminder: {formatDate(r.reminder_date)}</td>
                      </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mt-4 gap-3 small text-muted">
             <div className="order-2 order-sm-1 fw-medium">Showing {reminders.length} entries</div>
             <div className="d-flex gap-0 align-items-center order-1 order-sm-2 shadow-sm rounded overflow-hidden border">
                <button className="btn btn-white btn-sm px-3 bg-white border-0" style={{ fontSize: "12px", borderRight: "1px solid #eee !important" }}>Previous</button>
                <span className="py-1 px-3 bg-primary text-white fw-bold" style={{ fontSize: "12px", height: "31px", display: "flex", alignItems: "center" }}>1</span>
                <button className="btn btn-white btn-sm px-3 bg-white border-0" style={{ fontSize: "12px", borderLeft: "1px solid #eee !important" }}>Next</button>
             </div>
          </div>
        </div>
      </div>

      {/* ⭐ SET REMINDER MODAL */}
      {showReminderModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(15, 23, 42, 0.6)", zIndex: 4000, backdropFilter: "blur(4px)" }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 shadow-2xl overflow-hidden" style={{ borderRadius: "16px" }}>
              <div className="modal-header border-bottom p-4 bg-light bg-opacity-50">
                <div className="text-center w-100">
                  <h6 className="modal-title fw-bold text-dark mb-1">Set Compliance Reminder</h6>
                  <p className="small text-muted mb-0">Schedule automated email alerts for upcoming due dates</p>
                </div>
                <button type="button" className="btn-close position-absolute end-0 me-4 shadow-none" onClick={() => setShowReminderModal(false)}></button>
              </div>
              <div className="modal-body p-4 p-md-5">
                <form onSubmit={handleSaveReminder}>
                  <div className="row g-4 mb-4">
                     <div className="col-12 col-md-6">
                        <label className="small fw-bold mb-2 text-secondary text-uppercase tracking-wider">Compliance Type</label>
                        <select 
                          className="form-select form-select-sm py-2 bg-light border-0 shadow-none"
                          value={modalData.compliance_type}
                          onChange={(e) => setModalData({...modalData, compliance_type: e.target.value})}
                          style={{ height: "48px", borderRadius: "10px" }}
                        >
                           <option value="">Select Compliance</option>
                           <option value="AOC-4 Filing">AOC-4 Filing</option>
                           <option value="MGT-7 Filing">MGT-7 Filing</option>
                        </select>
                     </div>
                     <div className="col-12 col-md-6">
                        <label className="small fw-bold mb-2 text-secondary text-uppercase tracking-wider">Target Company</label>
                        <select className="form-select form-select-sm py-2 bg-light border-0 shadow-none" disabled style={{ height: "48px", borderRadius: "10px" }}>
                           <option>Reliance Industries Ltd</option>
                        </select>
                     </div>
                  </div>

                  <div className="row g-4 mb-4">
                     <div className="col-12 col-sm-6 col-md-4">
                        <label className="small fw-bold mb-2 text-secondary text-uppercase tracking-wider">Due Date</label>
                        <input 
                          type="date" 
                          className="form-control form-control-sm py-2 bg-light border-0 shadow-none" 
                          value={modalData.due_date}
                          onChange={(e) => setModalData({...modalData, due_date: e.target.value})}
                          style={{ height: "48px", borderRadius: "10px" }}
                        />
                     </div>
                     <div className="col-12 col-sm-6 col-md-4">
                        <label className="small fw-bold mb-2 text-secondary text-uppercase tracking-wider">Alert Date</label>
                        <input 
                          type="date" 
                          className="form-control form-control-sm py-2 bg-light border-0 shadow-none" 
                          value={modalData.reminder_date}
                          onChange={(e) => setModalData({...modalData, reminder_date: e.target.value})}
                          style={{ height: "48px", borderRadius: "10px" }}
                        />
                     </div>
                     <div className="col-12 col-md-4">
                        <label className="small fw-bold mb-2 text-secondary text-uppercase tracking-wider">Recipients</label>
                        <input 
                          type="text" 
                          className="form-control form-control-sm py-2 bg-light border-0 shadow-none" 
                          placeholder="email@example.com, ..." 
                          value={modalData.email_recipients}
                          onChange={(e) => setModalData({...modalData, email_recipients: e.target.value})}
                          style={{ height: "48px", borderRadius: "10px" }}
                        />
                     </div>
                  </div>

                  <div className="mb-4">
                     <label className="small fw-bold mb-2 text-secondary text-uppercase tracking-wider">Email Subject</label>
                     <input 
                      type="text" 
                      className="form-control py-2 bg-light border-0 shadow-none" 
                      value={modalData.email_subject} 
                      onChange={(e) => setModalData({...modalData, email_subject: e.target.value})}
                      style={{ height: "48px", borderRadius: "10px" }}
                     />
                  </div>

                  <div className="mb-0">
                     <label className="small fw-bold mb-2 text-secondary text-uppercase tracking-wider">Message Content</label>
                     <div className="bg-light p-3" style={{ borderRadius: "12px" }}>
                        <textarea 
                          className="form-control border-0 bg-transparent shadow-none" 
                          style={{ minHeight: "120px", resize: "none" }}
                          value={modalData.email_body}
                          onChange={(e) => setModalData({...modalData, email_body: e.target.value})}
                        ></textarea>
                     </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer border-top-0 p-4 bg-light bg-opacity-50 d-flex justify-content-end gap-3">
                <button className="btn btn-link text-muted text-decoration-none fw-bold small px-4" onClick={() => setShowReminderModal(false)}>
                  CANCEL
                </button>
                <button className="btn btn-primary px-5 py-2 fw-bold shadow-sm" onClick={handleSaveReminder} style={{ background: "#2563eb", borderRadius: "8px" }}>
                  SAVE ALERT
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
