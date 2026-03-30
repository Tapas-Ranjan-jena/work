import { useState } from "react";
import toast from "react-hot-toast";

interface PaymentMethod {
  id: number;
  title: string;
  description: string;
}

export default function SetupPaymentMethods() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [newMethod, setNewMethod] = useState({ title: "", description: "" });

  const handleSave = () => {
    if (!newMethod.title) {
      toast.error("Please enter a title");
      return;
    }
    const method: PaymentMethod = {
      id: Date.now(),
      ...newMethod
    };
    setPaymentMethods([...paymentMethods, method]);
    setNewMethod({ title: "", description: "" });
    setShowAddModal(false);
    toast.success("Payment method added successfully");
  };

  return (
    <div className="setup-payment-methods">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold mb-0">Payment methods</h5>
        <button className="btn btn-outline-dark btn-sm d-flex align-items-center gap-2" onClick={() => setShowAddModal(true)}>
          <i className="bi bi-plus-circle"></i> Add payment method
        </button>
      </div>

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
                <th className="px-4 py-3 border-bottom-0">Title <i className="bi bi-caret-up-fill small"></i></th>
                <th className="px-4 py-3 border-bottom-0">Description</th>
                <th className="px-4 py-3 border-bottom-0 text-end pe-4"><i className="bi bi-list"></i></th>
              </tr>
            </thead>
            <tbody>
              {paymentMethods.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-4 text-muted">No record found.</td>
                </tr>
              ) : (
                paymentMethods.map((method) => (
                  <tr key={method.id}>
                    <td className="px-4 py-3 align-middle text-dark fw-medium">{method.title}</td>
                    <td className="px-4 py-3 align-middle text-muted">{method.description}</td>
                    <td className="px-4 py-3 align-middle text-end pe-4">
                      <div className="d-flex justify-content-end gap-2">
                        <button className="btn btn-light btn-sm rounded-circle border p-0 d-flex align-items-center justify-content-center" style={{ width: "28px", height: "28px" }}>
                          <i className="bi bi-pencil small"></i>
                        </button>
                        <button className="btn btn-light btn-sm rounded-circle border p-0 d-flex align-items-center justify-content-center" style={{ width: "28px", height: "28px" }}>
                          <i className="bi bi-x small"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-3 border-top d-flex justify-content-between align-items-center bg-light">
          <div className="text-muted small">{paymentMethods.length > 0 ? `1-${paymentMethods.length} / ${paymentMethods.length}` : "0-0 / 0"}</div>
          <div className="d-flex gap-1">
             <button className="btn btn-light btn-sm border"><i className="bi bi-chevron-double-left"></i></button>
             <button className="btn btn-light btn-sm border"><i className="bi bi-chevron-double-right"></i></button>
          </div>
        </div>
      </div>

      {/* ⭐ ADD PAYMENT METHOD MODAL */}
      {showAddModal && (
        <>
          <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content border-0 shadow-lg">
                <div className="modal-header border-bottom">
                  <h5 className="modal-title" style={{ fontSize: "18px" }}>Add payment method</h5>
                  <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
                </div>
                <div className="modal-body p-4">
                  <div className="mb-3">
                    <label className="fw-semibold small mb-2">Title</label>
                    <input 
                      type="text" 
                      className="form-control bg-light border-0 py-2 shadow-none" 
                      placeholder="Title"
                      value={newMethod.title}
                      onChange={(e) => setNewMethod({ ...newMethod, title: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="fw-semibold small mb-2">Description</label>
                    <textarea 
                      className="form-control bg-light border-0 py-2 shadow-none" 
                      rows={3} 
                      placeholder="Description"
                      value={newMethod.description}
                      onChange={(e) => setNewMethod({ ...newMethod, description: e.target.value })}
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer border-0 p-4">
                  <button className="btn btn-outline-dark px-4 border" onClick={() => setShowAddModal(false)}>
                    <i className="bi bi-x"></i> Close
                  </button>
                  <button className="btn btn-primary px-4 d-flex align-items-center gap-2" onClick={handleSave} style={{ background: "#3b82f6", borderColor: "#3b82f6" }}>
                    <i className="bi bi-check-circle"></i> Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
