import { useState } from "react";
import toast from "react-hot-toast";

export default function UpcomingCompliances() {
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showBulkUpdate, setShowBulkUpdate] = useState(false);
  const [showUploadExcel, setShowUploadExcel] = useState(false);

  const handleToggleBulk = () => {
    setShowBulkUpdate(!showBulkUpdate);
    setShowUploadExcel(false);
  };

  const handleToggleUpload = () => {
    setShowUploadExcel(!showUploadExcel);
    setShowBulkUpdate(false);
  };

  const handleSaveReminder = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Reminder set successfully");
    setShowReminderModal(false);
  };

  return (
    <div className="upcoming-compliances p-4">
      {/* ⭐ BREADCRUMBS */}
      <nav aria-label="breadcrumb" className="mb-4 d-flex justify-content-between align-items-center">
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item small"><a href="#" className="text-decoration-none text-primary">Home</a></li>
          <li className="breadcrumb-item small active" aria-current="page">Compliance Dashboard</li>
        </ol>
        <div className="d-flex gap-2">
           <button className="btn btn-primary btn-sm px-4" onClick={() => setShowReminderModal(true)} style={{ background: "#1d4ed8", borderColor: "#1d4ed8" }}>
              Set Reminder
           </button>
           <button className={`btn btn-sm px-4 ${showBulkUpdate ? 'btn-dark' : 'btn-primary'}`} 
                   onClick={handleToggleBulk}
                   style={{ background: showBulkUpdate ? "#334155" : "#1d4ed8", borderColor: showBulkUpdate ? "#334155" : "#1d4ed8" }}>
              Bulk Update
           </button>
           <button className={`btn btn-sm px-4 ${showUploadExcel ? 'btn-dark' : 'btn-primary'}`} 
                   onClick={handleToggleUpload}
                   style={{ background: showUploadExcel ? "#334155" : "#1d4ed8", borderColor: showUploadExcel ? "#334155" : "#1d4ed8" }}>
              Upload Excel
           </button>
        </div>
      </nav>

      {/* ⭐ BULK UPDATE SECTION (Screenshot 1) */}
      {showBulkUpdate && (
        <div className="card shadow-sm border-0 p-4 mb-4">
           <div className="row g-3 align-items-end">
              <div className="col-md-3">
                 <label className="small fw-bold mb-1">Select Companies:</label>
                 <select className="form-select form-select-sm border py-2">
                    <option>Select</option>
                 </select>
              </div>
              <div className="col-md-2">
                 <label className="small fw-bold mb-1">To Be Done This FY:</label>
                 <select className="form-select form-select-sm border py-2">
                    <option>2026-27</option>
                 </select>
              </div>
              <div className="col-md-2">
                 <label className="small fw-bold mb-1">Applicablity:</label>
                 <select className="form-select form-select-sm border py-2">
                    <option>Select Applicability</option>
                 </select>
              </div>
              <div className="col-md-3">
                 <label className="small fw-bold mb-1">Compliance Type:</label>
                 <select className="form-select form-select-sm border py-2">
                    <option>Select</option>
                 </select>
              </div>
              <div className="col-md-2">
                 <button className="btn btn-primary btn-sm w-100 py-2" style={{ background: "#1d4ed8", borderColor: "#1d4ed8" }}>
                    Update
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* ⭐ UPLOAD EXCEL SECTION (Screenshot 1 - Middle) */}
      {showUploadExcel && (
        <div className="card shadow-sm border-0 p-4 mb-4">
           <div className="row g-4 align-items-end">
              <div className="col-md-3">
                 <label className="small fw-bold mb-1">To Be Done This FY:</label>
                 <select className="form-select form-select-sm border py-2">
                    <option>2026-27</option>
                 </select>
              </div>
              <div className="col-md-6">
                 <label className="small fw-bold mb-1">Upload File:</label>
                 <div className="input-group input-group-sm">
                    <input type="file" className="form-control" />
                 </div>
              </div>
              <div className="col-md-3">
                 <button className="btn btn-primary btn-sm w-100 py-2" style={{ background: "#1d4ed8", borderColor: "#1d4ed8" }}>
                    Download Template
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* ⭐ FILTERS */}
      <div className="card shadow-sm border-0 p-4 mb-4">
        <div className="row g-3">
          <div className="col-md-2">
            <label className="small fw-bold mb-1">To Be Done This FY:</label>
            <select className="form-select form-select-sm bg-light border-0 py-2">
              <option>2026-27</option>
            </select>
          </div>
          <div className="col-md-2">
            <label className="small fw-bold mb-1">Applicablity:</label>
            <select className="form-select form-select-sm bg-light border-0 py-2">
              <option>All</option>
            </select>
          </div>
          <div className="col-md-2">
            <label className="small fw-bold mb-1">Compliance Type:</label>
            <select className="form-select form-select-sm bg-light border-0 py-2">
              <option>All</option>
            </select>
          </div>
          <div className="col-md-2">
            <label className="small fw-bold mb-1">Status:</label>
            <select className="form-select form-select-sm bg-light border-0 py-2">
              <option>Select Status</option>
            </select>
          </div>
          <div className="col-md-2">
            <label className="small fw-bold mb-1">Assigned Member:</label>
            <select className="form-select form-select-sm bg-light border-0 py-2">
              <option>Select User</option>
            </select>
          </div>
          <div className="col-md-2">
            <label className="small fw-bold mb-1">Due Date:</label>
            <select className="form-select form-select-sm bg-light border-0 py-2">
              <option>All</option>
            </select>
          </div>
        </div>
      </div>

      {/* ⭐ SUMMARY TABLE */}
      <div className="table-responsive border rounded overflow-hidden mb-5">
        <table className="table mb-0" style={{ fontSize: "13px" }}>
          <thead style={{ background: "#f1f5f9", color: "#64748b" }}>
            <tr className="text-center align-middle" style={{ background: "#e2e8f0" }}>
              <th className="px-3 py-3 border-0 bg-opacity-25" style={{ background: "#ef4444", color: "white" }}>Compliance</th>
              <th className="px-3 py-3 border-0 bg-opacity-25" style={{ background: "#ef4444", color: "white" }}>Due Date</th>
              <th className="px-3 py-3 border-0 bg-opacity-25" style={{ background: "#ef4444", color: "white" }}>Applicable</th>
              <th className="px-3 py-3 border-0 bg-opacity-25" style={{ background: "#ef4444", color: "white" }}>Filed</th>
              <th className="px-3 py-3 border-0 bg-opacity-25" style={{ background: "#ef4444", color: "white" }}>Ongoing</th>
              <th className="px-3 py-3 border-0 bg-opacity-25" style={{ background: "#ef4444", color: "white" }}>Pending</th>
              <th className="px-3 py-3 border-0 bg-opacity-25" style={{ background: "#ef4444", color: "white" }}>Overdue</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={7} className="text-center py-4 bg-light bg-opacity-50 text-muted">No data available in table</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="card shadow-sm border-0 p-4">
        <h6 className="fw-bold mb-4 border-bottom pb-2">UPCOMING COMPLIANCES</h6>
        
        <div className="d-flex justify-content-between align-items-center mb-3">
           <div className="d-flex align-items-center gap-2">
              <button className="btn btn-outline-secondary btn-sm border px-3" style={{ fontSize: "12px" }}>Show 10 rows</button>
              <button className="btn btn-outline-secondary btn-sm border px-3" style={{ fontSize: "12px" }}>Excel</button>
           </div>
           <div className="d-flex align-items-center gap-2">
              <span className="small">Search:</span>
              <input type="text" className="form-control form-control-sm border" style={{ width: "220px" }} />
           </div>
        </div>

        <div className="table-responsive border rounded overflow-hidden">
          <table className="table table-hover mb-0" style={{ fontSize: "12px" }}>
            <thead style={{ background: "#e2e8f0", whiteSpace: "nowrap" }}>
              <tr style={{ background: "#f87171", color: "white" }}>
                <th className="px-3 py-3 text-center border-0">Sr. No.</th>
                <th className="px-3 py-3 border-0">Company Name</th>
                <th className="px-3 py-3 border-0">Compliance</th>
                <th className="px-3 py-3 border-0">Applicability</th>
                <th className="px-3 py-3 border-0">Status</th>
                <th className="px-3 py-3 border-0">SRN</th>
                <th className="px-3 py-3 border-0">Date of Filing</th>
                <th className="px-3 py-3 border-0">Assigned member</th>
                <th className="px-3 py-3 border-0">Due Date</th>
                <th className="px-3 py-3 border-0">Last Updated</th>
                <th className="px-3 py-3 border-0">Remarks</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={11} className="text-center py-4 text-muted">No data available in table</td>
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

      {/* ⭐ SET REMINDER MODAL */}
      {showReminderModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 4000 }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: "8px" }}>
              <div className="modal-header border-bottom p-3">
                <h6 className="modal-title fw-semibold w-100 text-center text-muted">Set Reminder For Upcoming Compliances</h6>
                <button type="button" className="btn-close" onClick={() => setShowReminderModal(false)}></button>
              </div>
              <div className="modal-body p-4">
                <form onSubmit={handleSaveReminder}>
                  <div className="row g-4 mb-4">
                     <div className="col-md-4">
                        <label className="small fw-bold mb-2">Compliance</label>
                        <select className="form-select form-select-sm py-2">
                           <option>Select Compliance</option>
                        </select>
                     </div>
                     <div className="col-md-4">
                        <label className="small fw-bold mb-2">Company Name</label>
                        <select className="form-select form-select-sm py-2" disabled>
                           <option>Select</option>
                        </select>
                     </div>
                     <div className="col-md-4"></div>
                  </div>

                  <div className="row g-4 mb-4">
                     <div className="col-md-4">
                        <label className="small fw-bold mb-2">Reminder Date</label>
                        <input type="text" className="form-control form-control-sm py-2" placeholder="d/m/Y" />
                     </div>
                     <div className="col-md-4">
                        <label className="small fw-bold mb-2">Reminder Slot</label>
                        <select className="form-select form-select-sm py-2">
                           <option>Morning (Between 8 AM to 10 AM)</option>
                        </select>
                     </div>
                     <div className="col-md-4">
                        <label className="small fw-bold mb-2">Reminder To (Email)</label>
                        <input type="text" className="form-control form-control-sm py-2" placeholder="test@gmail.com,test1@gmail.com,..." />
                        <div className="text-danger small mt-1">You can enter multiple emails with comma separation.</div>
                     </div>
                  </div>

                  <div className="mb-4">
                     <label className="small fw-bold mb-2">Mail Subject</label>
                     <input type="text" className="form-control py-2 shadow-none" defaultValue="Reminder: Upcoming Compliance Due Dates" />
                  </div>

                  <div className="mb-4">
                     <label className="small fw-bold mb-2">Mail Description</label>
                     <div className="border rounded">
                        {/* ⭐ DUMMY RICH TEXT EDITOR TOOLBAR */}
                        <div className="bg-light border-bottom p-2 d-flex flex-wrap gap-2">
                           <button type="button" className="btn btn-sm btn-white border px-2 py-1 small">B</button>
                           <button type="button" className="btn btn-sm btn-white border px-2 py-1 small"><i>I</i></button>
                           <button type="button" className="btn btn-sm btn-white border px-2 py-1 small"><u>U</u></button>
                           <span className="vr mx-1"></span>
                           <button type="button" className="btn btn-sm btn-white border px-2 py-1 small"><i className="bi bi-list-ul"></i></button>
                           <button type="button" className="btn btn-sm btn-white border px-2 py-1 small"><i className="bi bi-list-ol"></i></button>
                        </div>
                        <div className="p-3 bg-white" style={{ minHeight: "200px" }}>
                           <p className="mb-2">Dear User,</p>
                           <p>This is a gentle reminder of the upcoming compliance requirements for your attention:</p>
                        </div>
                     </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer border-top p-3 bg-light d-flex justify-content-end gap-2">
                <button className="btn btn-light border px-4" onClick={() => setShowReminderModal(false)}>
                  <i className="bi bi-x-lg"></i>
                </button>
                <button className="btn btn-primary px-4" onClick={handleSaveReminder} style={{ background: "#3b82f6", borderColor: "#3b82f6" }}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
