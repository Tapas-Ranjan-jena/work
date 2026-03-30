import { useState } from "react";
import toast from "react-hot-toast";

export default function SetupInvoices() {
  const [activeView, setActiveView] = useState<"list" | "form">("list");
  
  const handleAddNew = () => {
    setActiveView("form");
  };

  const handleSave = () => {
    toast.success("Invoice settings saved successfully");
    setActiveView("list");
  };

  return (
    <div className="setup-invoices">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold mb-0">{activeView === "list" ? "Invoice Setting" : "Invoice Settings"}</h5>
        {activeView === "list" && (
          <button className="btn btn-outline-dark btn-sm d-flex align-items-center gap-2" onClick={handleAddNew}>
            <i className="bi bi-plus-circle"></i> Add Invoice Setting
          </button>
        )}
      </div>

      {activeView === "list" ? (
        <div className="card shadow-sm border-0 mb-4 overflow-hidden">
          <div className="p-3 border-bottom d-flex justify-content-between gap-3 bg-light">
            <div className="d-flex gap-2">
              <select className="form-select form-select-sm border-0" style={{ width: "80px" }}>
                <option>100</option>
              </select>
              <button className="btn btn-light btn-sm border">
                 <i className="bi bi-eye"></i>
              </button>
            </div>
            <div className="d-flex gap-2 flex-grow-1">
               <div className="input-group input-group-sm ms-auto" style={{ maxWidth: "250px" }}>
                  <span className="input-group-text bg-white border-end-0"><i className="bi bi-search text-muted"></i></span>
                  <input type="text" className="form-control border-start-0" placeholder="Search" />
               </div>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover mb-0" style={{ fontSize: "14px" }}>
              <thead className="bg-light">
                <tr>
                  <th className="px-4 py-3 border-bottom-0">Sr No <i className="bi bi-caret-up-fill small"></i></th>
                  <th className="px-4 py-3 border-bottom-0 text-center">Start Invoice Date</th>
                  <th className="px-4 py-3 border-bottom-0 text-center">Tax Invoice Prefix</th>
                  <th className="px-4 py-3 border-bottom-0 text-center">Tax Invoice Initial Number</th>
                  <th className="px-4 py-3 border-bottom-0 text-center">Firm Name</th>
                  <th className="px-4 py-3 border-bottom-0 text-end pe-4"><i className="bi bi-list"></i></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={6} className="text-center py-4 text-muted">No record found.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-3 border-top d-flex justify-content-between align-items-center bg-light">
            <div className="text-muted small">0-0 / 0</div>
            <div className="d-flex gap-1">
               <button className="btn btn-light btn-sm border"><i className="bi bi-chevron-double-left"></i></button>
               <button className="btn btn-light btn-sm border"><i className="bi bi-chevron-double-right"></i></button>
            </div>
          </div>
        </div>
      ) : (
        <div className="card shadow-sm border-0 p-4">
          <div className="row mb-4">
            <div className="col-md-3">
              <label className="fw-semibold small">Invoice Logo</label>
            </div>
            <div className="col-md-9">
              <div className="d-flex align-items-center gap-2">
                <div className="border rounded bg-light d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}>
                  <i className="bi bi-image text-muted"></i>
                </div>
                <button className="btn btn-light btn-sm border">...</button>
              </div>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-3 text-dark small fw-medium">Proforma invoice prefix</div>
            <div className="col-md-9">
              <input type="text" className="form-control bg-light border-0 py-2 shadow-none" placeholder="INVOICE #" />
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-3 text-dark small fw-medium">Initial number of the proforma invoice</div>
            <div className="col-md-9">
              <input type="text" className="form-control bg-light border-0 py-2 shadow-none" />
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-3 text-dark small fw-medium">Tax invoice prefix</div>
            <div className="col-md-9">
              <input type="text" className="form-control bg-light border-0 py-2 shadow-none" placeholder="INVOICE #" />
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-3 text-dark small fw-medium">Initial number of the tax invoice</div>
            <div className="col-md-9">
              <input type="text" className="form-control bg-light border-0 py-2 shadow-none" />
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-3 text-dark small fw-medium">Start date</div>
            <div className="col-md-9">
              <input type="text" className="form-control bg-light border-0 py-2 shadow-none" placeholder="Start date" />
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-3 text-dark small fw-medium">Firm Name</div>
            <div className="col-md-9">
              <select className="form-select bg-light border-0 py-2 shadow-none">
                <option>Select Firm Name</option>
              </select>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-3 text-dark small fw-medium">Default due date after billing date</div>
            <div className="col-md-9">
              <div className="input-group">
                <input type="text" className="form-control bg-light border-0 py-2 shadow-none" />
                <span className="input-group-text bg-transparent border-0 text-dark small fw-medium">Days</span>
              </div>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-3 text-dark small fw-medium">When sending invoice to client, send BCC to</div>
            <div className="col-md-9">
              <input type="text" className="form-control bg-light border-0 py-2 shadow-none" placeholder="Email" />
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-3 text-dark small fw-medium">Send invoice overdue reminder after <i className="bi bi-question-circle text-muted ms-1"></i></div>
            <div className="col-md-9">
              <select className="form-select bg-light border-0 py-2 shadow-none">
                <option>-</option>
              </select>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-3 text-dark small fw-medium">Send recurring invoice reminder before creation <i className="bi bi-question-circle text-muted ms-1"></i></div>
            <div className="col-md-9">
              <select className="form-select bg-light border-0 py-2 shadow-none">
                <option>-</option>
              </select>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-3 text-dark small fw-medium">Client can pay invoices without login <i className="bi bi-question-circle text-muted ms-1"></i></div>
            <div className="col-md-9">
              <select className="form-select bg-light border-0 py-2 shadow-none">
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-3 text-dark small fw-medium">Please select the content that you want to be displayed on the invoice. <i className="bi bi-question-circle text-muted ms-1"></i></div>
            <div className="col-md-9">
              <input type="text" className="form-control bg-light border-0 py-2 shadow-none" placeholder="Please select the content that you want to be displayed on the invoice." />
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-3">
              <label className="fw-semibold small">Sign Image</label>
            </div>
            <div className="col-md-9">
              <div className="d-flex align-items-center gap-2">
                <div className="border rounded bg-light d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}>
                  <i className="bi bi-image text-muted"></i>
                </div>
                <button className="btn btn-light btn-sm border">...</button>
              </div>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-3 text-dark small fw-medium">Terms & Condition</div>
            <div className="col-md-9">
              <textarea className="form-control bg-light border-0 py-2 shadow-none" rows={3} placeholder="Terms & Condition"></textarea>
            </div>
          </div>

          <div className="mt-4 pt-3 border-top">
            <button className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2" onClick={handleSave} style={{ background: "#3b82f6", borderColor: "#3b82f6" }}>
              <i className="bi bi-check-circle"></i> Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
