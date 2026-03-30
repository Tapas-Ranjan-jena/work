import { useState } from "react";
import toast from "react-hot-toast";

interface TaskStatus {
  id: number;
  title: string;
  color: string;
}

export default function SetupTasks() {
  const [activeTab, setActiveTab] = useState("status");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStatusTitle, setNewStatusTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState("#60a5fa");

  const [statuses, setStatuses] = useState<TaskStatus[]>([
    { id: 1, title: "In progress", color: "#60a5fa" },
    { id: 2, title: "To do", color: "#f472b6" },
    { id: 3, title: "Under Review", color: "#f472b6" },
    { id: 4, title: "Pending with the Client", color: "#eab308" },
    { id: 5, title: "Pending for DSC", color: "#fb923c" },
    { id: 6, title: "Pending for Approval", color: "#eab308" },
    { id: 7, title: "Pending for Billing", color: "#a8817d" },
    { id: 8, title: "Done", color: "#10b981" },
    { id: 9, title: "Cancel", color: "#334155" },
    { id: 10, title: "Re-Assign", color: "#2dd4bf" },
    { id: 11, title: "Pending for payment", color: "#84cc16" },
  ]);

  const colors = [
    "#fb923c", "#eab308", "#60a5fa", "#93c5fd", "#84cc16", "#9ca3af", "#f472b6", "#334155", "#2dd4bf", "#38bdf8", "#c084fc", "#a8817d"
  ];

  const handleAddStatus = () => {
    if (!newStatusTitle) {
      toast.error("Please enter a title");
      return;
    }
    const newStatus: TaskStatus = {
      id: Date.now(),
      title: newStatusTitle,
      color: selectedColor
    };
    setStatuses([...statuses, newStatus]);
    setNewStatusTitle("");
    setShowAddModal(false);
    toast.success("Task status added successfully");
  };

  return (
    <div className="setup-tasks">
      <h5 className="fw-bold mb-4">Tasks</h5>

      <div className="d-flex border-bottom mb-4">
        <button 
          className={`btn border-0 rounded-0 px-4 py-2 ${activeTab === "status" ? "border-bottom border-primary text-primary fw-semibold" : "text-secondary"}`}
          onClick={() => setActiveTab("status")}
          style={{ fontSize: "14px" }}
        >
          Task Status
        </button>
        <button 
          className={`btn border-0 rounded-0 px-4 py-2 ${activeTab === "settings" ? "border-bottom border-primary text-primary fw-semibold" : "text-secondary"}`}
          onClick={() => setActiveTab("settings")}
          style={{ fontSize: "14px" }}
        >
          Task settings
        </button>
      </div>

      {activeTab === "status" && (
        <div className="task-status-tab">
          <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2" onClick={() => setShowAddModal(true)}>
              <i className="bi bi-plus-circle"></i> Add task status
            </button>
          </div>

          <div className="card shadow-sm border-0">
            <div className="bg-white">
              {statuses.map((status) => (
                <div key={status.id} className="d-flex align-items-center justify-content-between p-3 border-bottom hover-bg-light">
                  <div className="d-flex align-items-center gap-3">
                    <i className="bi bi-list text-muted" style={{ cursor: "grab" }}></i>
                    <div style={{ width: "16px", height: "16px", background: status.color, borderRadius: "2px" }}></div>
                    <span className="text-dark" style={{ fontSize: "14px" }}>{status.title}</span>
                  </div>
                  <div className="d-flex gap-2">
                    {/* Placeholder for Edit/Delete icons if needed */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "settings" && (
        <div className="task-settings-tab">
          <div className="card shadow-sm border-0 p-4">
            <div className="row align-items-center mb-4">
              <div className="col-md-5">
                <label className="text-dark small fw-medium">Enable recurring option for tasks <i className="bi bi-question-circle text-muted ms-1" title="Enable recurring tasks"></i></label>
              </div>
              <div className="col-md-4">
                <select className="form-select form-select-sm bg-light border-0 py-2">
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>

            <div className="row align-items-center mb-4">
              <div className="col-md-5">
                <label className="text-dark small fw-medium">Send task deadline pre reminder <i className="bi bi-question-circle text-muted ms-1" title="Send reminder before deadline"></i></label>
              </div>
              <div className="col-md-4">
                <select className="form-select form-select-sm bg-light border-0 py-2">
                  <option value="1">1 Day</option>
                  <option value="2">2 Days</option>
                  <option value="3">3 Days</option>
                  <option value="4">4 Days</option>
                  <option value="5">5 Days</option>
                </select>
              </div>
            </div>

            <div className="row align-items-center mb-4">
              <div className="col-md-5">
                <label className="text-dark small fw-medium">Send task reminder on the day of deadline <i className="bi bi-question-circle text-muted ms-1" title="Send reminder on the day of deadline"></i></label>
              </div>
              <div className="col-md-4">
                <select className="form-select form-select-sm bg-light border-0 py-2">
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>

            <div className="row align-items-center mb-4">
              <div className="col-md-5">
                <label className="text-dark small fw-medium">Send task deadline overdue reminder <i className="bi bi-question-circle text-muted ms-1" title="Send reminder after deadline"></i></label>
              </div>
              <div className="col-md-4">
                <select className="form-select form-select-sm bg-light border-0 py-2">
                  <option value="1">1 Day</option>
                  <option value="2">2 Days</option>
                  <option value="3">3 Days</option>
                </select>
              </div>
            </div>

            <div className="row align-items-center mb-4">
              <div className="col-md-5">
                <label className="text-dark small fw-medium">Task point range</label>
              </div>
              <div className="col-md-4">
                <select className="form-select form-select-sm bg-light border-0 py-2">
                  <option value="5">5</option>
                  <option value="10">10</option>
                </select>
              </div>
            </div>

            <div className="mt-4 pt-3 border-top">
              <button className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2" style={{ background: "#3b82f6", borderColor: "#3b82f6" }}>
                <i className="bi bi-check-circle"></i> Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ⭐ ADD STATUS MODAL */}
      {showAddModal && (
        <>
          <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content border-0 shadow-lg">
                <div className="modal-header border-0 pb-0">
                  <h5 className="modal-title" style={{ fontSize: "18px" }}>Add task status</h5>
                  <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
                </div>
                <div className="modal-body pt-4">
                  <div className="row mb-4">
                    <div className="col-md-3">
                      <label className="fw-semibold small">Title</label>
                    </div>
                    <div className="col-md-9">
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Title" 
                        value={newStatusTitle}
                        onChange={(e) => setNewStatusTitle(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-md-3"></div>
                    <div className="col-md-9 d-flex flex-wrap gap-2">
                      {colors.map((color) => (
                        <div 
                          key={color}
                          className={`color-box ${selectedColor === color ? "selected" : ""}`}
                          style={{ 
                            width: "20px", 
                            height: "20px", 
                            background: color, 
                            borderRadius: "2px", 
                            cursor: "pointer",
                            border: selectedColor === color ? "2px solid #000" : "none"
                          }}
                          onClick={() => setSelectedColor(color)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="modal-footer border-0 pt-0">
                  <button className="btn btn-outline-dark btn-sm px-4 py-2 border-0" onClick={() => setShowAddModal(false)}>
                    <i className="bi bi-x"></i> Close
                  </button>
                  <button className="btn btn-primary btn-sm px-4 py-2" onClick={handleAddStatus} style={{ background: "#4e73df", borderColor: "#4e73df" }}>
                    <i className="bi bi-check-circle"></i> Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <style>{`
        .hover-bg-light:hover {
          background-color: #f8f9fa;
        }
        .color-box:hover {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}
