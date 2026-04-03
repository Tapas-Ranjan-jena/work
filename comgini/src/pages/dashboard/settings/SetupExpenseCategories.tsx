import { useState } from "react";

export default function SetupExpenseCategories() {
  const [categories] = useState([
    { id: 1, title: "Comply Relax Renewal Fees" },
    { id: 2, title: "Credit Card payment" },
    { id: 3, title: "Digital Signature Software Purchase" },
    { id: 4, title: "Digital Signature Token Purchase" },
    { id: 5, title: "House Building Maintenance" },
  ]);

  return (
    <div className="setup-expense-categories text-start">
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-4 gap-3">
        <h5 className="fw-bold mb-0">Expense Categories</h5>
        <button className="btn btn-outline-dark btn-sm d-flex align-items-center justify-content-center gap-2 px-3 py-2 shadow-sm bg-white w-100 w-sm-auto" style={{ borderRadius: "8px", fontSize: "13px" }}>
          <i className="bi bi-plus-circle"></i> Add category
        </button>
      </div>

      <div className="card shadow-sm border-0 mb-4">
        <div className="card-header bg-white border-bottom p-2 d-flex flex-column flex-md-row justify-content-between align-items-stretch align-items-md-center gap-3">
          <div className="d-flex align-items-center gap-2">
            <select className="form-select form-select-sm" style={{ width: "75px" }}>
              <option value="100">100</option>
              <option value="50">50</option>
            </select>
            <button className="btn btn-sm btn-light border p-1 px-2 shadow-none"><i className="bi bi-eye"></i></button>
          </div>
          
          <div className="d-flex flex-column flex-sm-row align-items-stretch align-items-sm-center gap-2">
            <div className="position-relative flex-grow-1">
              <input type="text" className="form-control form-control-sm ps-3 pe-4 py-2" placeholder="Search" style={{ minWidth: "180px", background: "#fff" }} />
              <i className="bi bi-search position-absolute end-0 top-50 translate-middle-y me-2 text-muted" style={{ fontSize: "12px" }}></i>
            </div>
            <button className="btn btn-light border btn-sm px-4 py-2 bg-white flex-fill w-sm-auto" style={{ borderRadius: "8px", fontSize: "13px" }}>Print</button>
          </div>
        </div>

        <div className="table-responsive border rounded-bottom overflow-auto">
          <table className="table table-hover align-middle mb-0" style={{ fontSize: "13.5px" }}>
            <thead className="table-light">
              <tr className="text-nowrap">
                <th className="fw-semibold px-3 py-3" style={{ minWidth: "300px" }}>Title</th>
                <th className="fw-semibold text-center px-3" style={{ width: "120px", minWidth: "120px" }}><i className="bi bi-list"></i></th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id}>
                  <td className="px-3 py-3">
                    <span className="text-dark fw-medium">{cat.title}</span>
                  </td>
                  <td className="text-center px-3">
                    <div className="d-flex gap-2 justify-content-center">
                        <button className="btn btn-sm btn-white border rounded-circle p-1 shadow-none" style={{ width: '32px', height: '32px' }}><i className="bi bi-pencil fs-6 text-secondary"></i></button>
                        <button className="btn btn-sm btn-white border rounded-circle p-1 shadow-none" style={{ width: '32px', height: '32px' }}><i className="bi bi-x fs-5 text-secondary"></i></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .btn-white { background: #fff; }
        .btn-white:hover { background: #f8fafc; }
        ::-webkit-scrollbar { height: 6px; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .table-responsive { scrollbar-gutter: stable; }
        .table th { background-color: #f1f5f9; color: #475569; }
      `}</style>
    </div>
  );
}
