import { useState } from "react";
import toast from "react-hot-toast";

interface LeadStatus {
  id: number;
  title: string;
  color: string;
}

interface LeadSource {
  id: number;
  title: string;
}

export default function SetupLeads() {
  const [activeTab, setActiveTab] = useState<"status" | "source">("status");
  const [showAddStatusModal, setShowAddStatusModal] = useState(false);
  const [showAddSourceModal, setShowAddSourceModal] = useState(false);

  const [statuses, setStatuses] = useState<LeadStatus[]>([
    { id: 1, title: "DISCUSSION", color: "#2dd4bf" },
    { id: 2, title: "NEW", color: "#eab308" },
    { id: 3, title: "Negotiation", color: "#3b82f6" },
    { id: 4, title: "CONFIRMED", color: "#84cc16" },
    { id: 5, title: "CANCELLED", color: "#ef4444" },
    { id: 6, title: "delta", color: "#9ca3af" },
  ]);

  const [sources, setSources] = useState<LeadSource[]>([
    { id: 1, title: "Client Reference" },
    { id: 2, title: "Online" },
    { id: 3, title: "Walk In" },
  ]);

  const [newStatus, setNewStatus] = useState({ title: "", color: "#ffedd5" });
  const [newSource, setNewSource] = useState({ title: "" });

  const colors = [
    "#ffedd5", "#fbbf24", "#60a5fa", "#bfdbfe", "#84cc16", "#9ca3af", "#f472b6", "#1e293b", "#10b981", "#38bdf8", "#c084fc", "#a8817d"
  ];

  const handleSaveStatus = () => {
    if (!newStatus.title) {
      toast.error("Please enter a title");
      return;
    }
    const status: LeadStatus = {
      id: Date.now(),
      ...newStatus
    };
    setStatuses([...statuses, status]);
    setNewStatus({ title: "", color: "#ffedd5" });
    setShowAddStatusModal(false);
    toast.success("Lead status added successfully");
  };

  const handleSaveSource = () => {
    if (!newSource.title) {
      toast.error("Please enter a title");
      return;
    }
    const source: LeadSource = {
      id: Date.now(),
      ...newSource
    };
    setSources([...sources, source]);
    setNewSource({ title: "" });
    setShowAddSourceModal(false);
    toast.success("Lead source added successfully");
  };

  return (
    <div className="setup-leads">
      <div className="d-flex border-bottom mb-4">
        <button 
          className={`btn border-0 rounded-0 px-4 py-2 ${activeTab === "status" ? "border-bottom border-primary text-primary fw-semibold" : "text-secondary"}`}
          onClick={() => setActiveTab("status")}
          style={{ fontSize: "14px" }}
        >
          Lead status
        </button>
        <button 
          className={`btn border-0 rounded-0 px-4 py-2 ${activeTab === "source" ? "border-bottom border-primary text-primary fw-semibold" : "text-secondary"}`}
          onClick={() => setActiveTab("source")}
          style={{ fontSize: "14px" }}
        >
          Lead source
        </button>
      </div>

      {activeTab === "status" ? (
        <div className="lead-status-tab">
          <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-outline-dark btn-sm d-flex align-items-center gap-2" onClick={() => setShowAddStatusModal(true)}>
              <i className="bi bi-plus-circle"></i> Add lead status
            </button>
          </div>

          <div className="card shadow-sm border-0">
            <div className="bg-white">
              {statuses.map((status) => (
                <div key={status.id} className="d-flex align-items-center justify-content-between p-3 border-bottom hover-bg-light">
                  <div className="d-flex align-items-center gap-3">
                    <i className="bi bi-list text-muted" style={{ cursor: "grab" }}></i>
                    <div style={{ width: "16px", height: "16px", background: status.color, borderRadius: "2px" }}></div>
                    <span className="text-dark" style={{ fontSize: "14px", fontWeight: status.title === status.title.toUpperCase() ? "700" : "400" }}>{status.title}</span>
                  </div>
                  <div className="d-flex gap-2">
                    {/* Actions if needed */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="lead-source-tab">
          <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-outline-dark btn-sm d-flex align-items-center gap-2" onClick={() => setShowAddSourceModal(true)}>
              <i className="bi bi-plus-circle"></i> Add lead source
            </button>
          </div>

          <div className="card shadow-sm border-0">
            <div className="bg-white">
              {sources.map((source) => (
                <div key={source.id} className="d-flex align-items-center justify-content-between p-3 border-bottom hover-bg-light">
                  <div className="d-flex align-items-center gap-3">
                    <i className="bi bi-list text-muted" style={{ cursor: "grab" }}></i>
                    <span className="text-dark fw-medium" style={{ fontSize: "14px" }}>{source.title}</span>
                  </div>
                  <div className="d-flex gap-2">
                    {/* Actions if needed */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ⭐ ADD STATUS MODAL */}
      {showAddStatusModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header border-bottom">
                <h5 className="modal-title" style={{ fontSize: "18px" }}>Add lead status</h5>
                <button type="button" className="btn-close" onClick={() => setShowAddStatusModal(false)}></button>
              </div>
              <div className="modal-body p-4">
                <div className="row mb-4 align-items-center">
                  <div className="col-md-3">
                    <label className="fw-semibold small">Title</label>
                  </div>
                  <div className="col-md-9">
                    <input 
                      type="text" 
                      className="form-control bg-light border-0 py-2 shadow-none" 
                      placeholder="Title"
                      value={newStatus.title}
                      onChange={(e) => setNewStatus({ ...newStatus, title: e.target.value })}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-3"></div>
                  <div className="col-md-9 d-flex flex-wrap gap-2">
                    {colors.map((color) => (
                      <div 
                        key={color}
                        className={`color-box ${newStatus.color === color ? "selected" : ""}`}
                        style={{ 
                          width: "20px", 
                          height: "20px", 
                          background: color, 
                          borderRadius: "2px", 
                          cursor: "pointer",
                          border: newStatus.color === color ? "2px solid #000" : "none"
                        }}
                        onClick={() => setNewStatus({ ...newStatus, color: color })}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="modal-footer border-0 p-4">
                <button className="btn btn-outline-dark px-4 border" onClick={() => setShowAddStatusModal(false)}>
                  <i className="bi bi-x"></i> Close
                </button>
                <button className="btn btn-primary px-4 d-flex align-items-center gap-2" onClick={handleSaveStatus} style={{ background: "#3b82f6", borderColor: "#3b82f6" }}>
                  <i className="bi bi-check-circle"></i> Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ⭐ ADD SOURCE MODAL */}
      {showAddSourceModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header border-bottom">
                <h5 className="modal-title" style={{ fontSize: "18px" }}>Add lead source</h5>
                <button type="button" className="btn-close" onClick={() => setShowAddSourceModal(false)}></button>
              </div>
              <div className="modal-body p-4">
                <div className="row mb-3 align-items-center">
                  <div className="col-md-3">
                    <label className="fw-semibold small">Title</label>
                  </div>
                  <div className="col-md-9">
                    <input 
                      type="text" 
                      className="form-control bg-light border-0 py-2 shadow-none" 
                      placeholder="Title"
                      value={newSource.title}
                      onChange={(e) => setNewSource({ ...newSource, title: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer border-0 p-4">
                <button className="btn btn-outline-dark px-4 border" onClick={() => setShowAddSourceModal(false)}>
                  <i className="bi bi-x"></i> Close
                </button>
                <button className="btn btn-primary px-4 d-flex align-items-center gap-2" onClick={handleSaveSource} style={{ background: "#3b82f6", borderColor: "#3b82f6" }}>
                  <i className="bi bi-check-circle"></i> Save
                </button>
              </div>
            </div>
          </div>
        </div>
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
