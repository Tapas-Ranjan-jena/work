import { useState } from "react";
import toast from "react-hot-toast";

interface LeaveType {
  id: number;
  title: string;
  description: string;
  status: "Active" | "Inactive";
  color: string;
}

export default function SetupLeaveTypes() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([
    { 
      id: 1, 
      title: "Festive Leave", 
      description: "In case of any\n• Regional festivals,\n• National Festivals,\n• other government Holidays", 
      status: "Active",
      color: "#84cc16"
    },
    { 
      id: 2, 
      title: "Casual Leave", 
      description: "In Case Person want to Take leave", 
      status: "Active",
      color: "#f472b6"
    },
    { 
      id: 3, 
      title: "Exam Leave", 
      description: "In Case of,\n• Any college Related Issues,\n• Student exam,", 
      status: "Active",
      color: "#9ca3af"
    },
    { 
      id: 4, 
      title: "Leave on personal reasons", 
      description: "-", 
      status: "Active",
      color: "#a8817d"
    },
    { 
      id: 5, 
      title: "Sick Leave", 
      description: "If a person Seems to be Unhealthy like,\n• Cold\n• Fever\n• any Health Related issue", 
      status: "Active",
      color: "#3b82f6"
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Active" as "Active" | "Inactive",
    color: "#fbbf24"
  });

  const colors = [
    "#ffedd5", "#fbbf24", "#60a5fa", "#bfdbfe", "#84cc16", "#9ca3af", "#f472b6", "#1e293b", "#10b981", "#38bdf8", "#c084fc", "#a8817d"
  ];

  const handleSave = () => {
    if (!formData.title) {
      toast.error("Please enter a title");
      return;
    }
    const newLeaveType: LeaveType = {
      id: Date.now(),
      ...formData
    };
    setLeaveTypes([...leaveTypes, newLeaveType]);
    setFormData({ title: "", description: "", status: "Active", color: "#fbbf24" });
    setShowAddModal(false);
    toast.success("Leave type added successfully");
  };

  return (
    <div className="setup-leave-types">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold mb-0">Leave types</h5>
        <button className="btn btn-outline-dark btn-sm d-flex align-items-center gap-2" onClick={() => setShowAddModal(true)}>
          <i className="bi bi-plus-circle"></i> Add leave type
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
                <th className="px-4 py-3 border-bottom-0">Description</th>
                <th className="px-4 py-3 border-bottom-0">Status</th>
                <th className="px-4 py-3 border-bottom-0 text-end pe-4"><i className="bi bi-list"></i></th>
              </tr>
            </thead>
            <tbody>
              {leaveTypes.map((type) => (
                <tr key={type.id}>
                  <td className="px-4 py-3 align-middle">
                    <div className="d-flex align-items-center gap-2">
                      <div style={{ width: "16px", height: "16px", background: type.color, borderRadius: "2px" }}></div>
                      <span>{type.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 align-middle text-muted" style={{ whiteSpace: "pre-line" }}>{type.description}</td>
                  <td className="px-4 py-3 align-middle">
                    <span className="text-dark fw-medium">{type.status}</span>
                  </td>
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
          <div className="text-muted small">1-5 / 5</div>
          <div className="d-flex gap-1">
             <button className="btn btn-light btn-sm border"><i className="bi bi-chevron-double-left"></i></button>
             <button className="btn btn-primary btn-sm px-3">1</button>
             <button className="btn btn-light btn-sm border"><i className="bi bi-chevron-double-right"></i></button>
          </div>
        </div>
      </div>

      {/* ⭐ ADD LEAVE TYPE MODAL */}
      {showAddModal && (
        <>
          <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content border-0 shadow-lg">
                <div className="modal-header border-bottom">
                  <h5 className="modal-title" style={{ fontSize: "18px" }}>Add leave type</h5>
                  <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
                </div>
                <div className="modal-body p-4">
                  <div className="row mb-4 align-items-center">
                    <div className="col-md-3">
                      <label className="fw-semibold">Title</label>
                    </div>
                    <div className="col-md-9">
                      <input 
                        type="text" 
                        className="form-control bg-light border-0 py-2" 
                        placeholder="Title" 
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-md-3"></div>
                    <div className="col-md-9 d-flex flex-wrap gap-2">
                      {colors.map((color) => (
                        <div 
                          key={color}
                          className={`color-box ${formData.color === color ? "selected" : ""}`}
                          style={{ 
                            width: "20px", 
                            height: "20px", 
                            background: color, 
                            borderRadius: "2px", 
                            cursor: "pointer",
                            border: formData.color === color ? "2px solid #000" : "none"
                          }}
                          onClick={() => setFormData({ ...formData, color: color })}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-md-3">
                      <label className="fw-semibold">Description</label>
                    </div>
                    <div className="col-md-9">
                      <textarea 
                        className="form-control bg-light border-0 py-2" 
                        rows={4}
                        placeholder="Description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      ></textarea>
                    </div>
                  </div>

                  <div className="row align-items-center">
                    <div className="col-md-3">
                      <label className="fw-semibold">Status</label>
                    </div>
                    <div className="col-md-9">
                      <div className="d-flex gap-4">
                        <div className="form-check">
                          <input 
                            className="form-check-input" 
                            type="radio" 
                            name="status" 
                            id="active" 
                            checked={formData.status === "Active"}
                            onChange={() => setFormData({ ...formData, status: "Active" })}
                          />
                          <label className="form-check-label" htmlFor="active">Active</label>
                        </div>
                        <div className="form-check">
                          <input 
                            className="form-check-input" 
                            type="radio" 
                            name="status" 
                            id="inactive" 
                            checked={formData.status === "Inactive"}
                            onChange={() => setFormData({ ...formData, status: "Inactive" })}
                          />
                          <label className="form-check-label" htmlFor="inactive">Inactive</label>
                        </div>
                      </div>
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

      <style>{`
        .color-box:hover {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}
