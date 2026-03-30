import { useState } from "react";
import toast from "react-hot-toast";

interface ExpenseCategory {
  id: number;
  title: string;
}

export default function SetupExpenseCategories() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [categories, setCategories] = useState<ExpenseCategory[]>([
    { id: 1, title: "Comply Relax Renewal Fees" },
    { id: 2, title: "Credit Card payment" },
    { id: 3, title: "Digital Signature Software Purchase" },
    { id: 4, title: "Digital Signature Token Purchase" },
    { id: 5, title: "House Building Maintenance" },
    { id: 6, title: "House Electricity Bill" },
    { id: 7, title: "Miscellaneous Expense" },
    { id: 8, title: "Monthly office Expense" },
    { id: 9, title: "Office Electricity Bill" },
    { id: 10, title: "Office Expenses" },
    { id: 11, title: "Personal Expenses" },
  ]);

  const [newCategoryTitle, setNewCategoryTitle] = useState("");

  const handleSave = () => {
    if (!newCategoryTitle) {
      toast.error("Please enter a category title");
      return;
    }
    const newCategory: ExpenseCategory = {
      id: Date.now(),
      title: newCategoryTitle
    };
    setCategories([...categories, newCategory]);
    setNewCategoryTitle("");
    setShowAddModal(false);
    toast.success("Expense category added successfully");
  };

  return (
    <div className="setup-expense-categories">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold mb-0">Expense Categories</h5>
        <button className="btn btn-outline-dark btn-sm d-flex align-items-center gap-2" onClick={() => setShowAddModal(true)}>
          <i className="bi bi-plus-circle"></i> Add category
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
             <button className="btn btn-light btn-sm border px-3">Print</button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover mb-0" style={{ fontSize: "14px" }}>
            <thead className="bg-light">
              <tr>
                <th className="px-4 py-3 border-bottom-0">Title</th>
                <th className="px-4 py-3 border-bottom-0 text-end pe-4"><i className="bi bi-list"></i></th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id}>
                  <td className="px-4 py-3 align-middle text-dark">{cat.title}</td>
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
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-3 border-top d-flex justify-content-between align-items-center bg-light">
          <div className="text-muted small">1-{categories.length} / {categories.length}</div>
          <div className="d-flex gap-1">
             <button className="btn btn-light btn-sm border"><i className="bi bi-chevron-double-left"></i></button>
             <button className="btn btn-primary btn-sm px-3">1</button>
             <button className="btn btn-light btn-sm border"><i className="bi bi-chevron-double-right"></i></button>
          </div>
        </div>
      </div>

      {/* ⭐ ADD CATEGORY MODAL */}
      {showAddModal && (
        <>
          <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content border-0 shadow-lg">
                <div className="modal-header border-bottom">
                  <h5 className="modal-title" style={{ fontSize: "18px" }}>Add category</h5>
                  <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
                </div>
                <div className="modal-body p-4">
                  <div className="row mb-3 align-items-center">
                    <div className="col-md-3">
                      <label className="fw-semibold">Title</label>
                    </div>
                    <div className="col-md-9">
                      <input 
                        type="text" 
                        className="form-control bg-light border-0 py-2" 
                        placeholder="Title" 
                        value={newCategoryTitle}
                        onChange={(e) => setNewCategoryTitle(e.target.value)}
                      />
                    </div>
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
