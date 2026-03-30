import { useState } from "react";
import toast from "react-hot-toast";

interface Role {
  id: number;
  name: string;
}

export default function SetupRoles() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [roles, setRoles] = useState<Role[]>([
    { id: 1, name: "Accounts" },
    { id: 2, name: "Article" },
    { id: 3, name: "Manager" },
    { id: 4, name: "Partner" },
    { id: 5, name: "Sales" },
    { id: 6, name: "Support Staff" },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newRoleName, setNewRoleName] = useState("");

  const handleSaveRole = () => {
    if (!newRoleName) {
      toast.error("Please enter a role name");
      return;
    }
    const role: Role = {
      id: Date.now(),
      name: newRoleName
    };
    setRoles([...roles, role]);
    setNewRoleName("");
    setShowAddModal(false);
    toast.success("Role added successfully");
  };

  return (
    <div className="setup-roles h-100 d-flex flex-column">
      <div className="row flex-grow-1 g-4">
        {/* ⭐ ROLES LIST (LEFT) */}
        <div className="col-md-4">
          <div className="card shadow-sm border-0 h-100 overflow-hidden">
            <div className="p-3 border-bottom d-flex justify-content-between align-items-center bg-white">
              <h6 className="mb-0 fw-bold">Roles</h6>
              <button className="btn btn-outline-dark btn-sm d-flex align-items-center gap-2" onClick={() => setShowAddModal(true)}>
                <i className="bi bi-plus-circle"></i> Add role
              </button>
            </div>
            
            <div className="p-3 border-bottom bg-light d-flex gap-2">
              <select className="form-select form-select-sm" style={{ width: "80px" }}>
                <option>100</option>
              </select>
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-white border-end-0"><i className="bi bi-search text-muted"></i></span>
                <input type="text" className="form-control border-start-0" placeholder="Search" />
              </div>
            </div>

            <div className="p-3 border-bottom bg-light d-flex">
               <button className="btn btn-light btn-sm border"><i className="bi bi-eye"></i></button>
            </div>

            <div className="list-group list-group-flush overflow-auto flex-grow-1" style={{ maxHeight: "calc(100vh - 350px)" }}>
              {roles.map((role) => (
                <div 
                  key={role.id} 
                  className={`list-group-item list-group-item-action d-flex align-items-center justify-content-between p-3 border-bottom-0 ${selectedRole?.id === role.id ? "bg-light-primary" : ""}`}
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedRole(role)}
                >
                  <span className="text-primary fw-medium" style={{ fontSize: "14px" }}>{role.name}</span>
                  <div className="d-flex gap-2">
                    <button className="btn btn-light btn-xs border rounded-circle p-0 d-flex align-items-center justify-content-center" style={{ width: "24px", height: "24px" }}>
                      <i className="bi bi-check-lg small text-success"></i>
                    </button>
                    <button className="btn btn-light btn-xs border rounded-circle p-0 d-flex align-items-center justify-content-center" style={{ width: "24px", height: "24px" }}>
                      <i className="bi bi-pencil small"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 border-top d-flex justify-content-between align-items-center bg-light mt-auto">
              <div className="text-muted small">1-6 / 6</div>
              <div className="d-flex gap-1">
                 <button className="btn btn-light btn-sm border"><i className="bi bi-chevron-double-left"></i></button>
                 <button className="btn btn-light btn-sm border px-2">1</button>
                 <button className="btn btn-light btn-sm border"><i className="bi bi-chevron-double-right"></i></button>
              </div>
            </div>
          </div>
        </div>

        {/* ⭐ ROLE DETAIL (RIGHT) */}
        <div className="col-md-8">
          <div className="card shadow-sm border-0 h-100 d-flex align-items-center justify-content-center bg-light">
            {selectedRole ? (
               <div className="text-center">
                 <h5 className="fw-bold text-dark mb-2">{selectedRole.name} Permissions</h5>
                 <p className="text-muted small">Configure access permissions for this role here.</p>
                 {/* Detail content would go here */}
               </div>
            ) : (
              <div className="text-center opacity-50">
                <h6 className="fw-bold text-dark mb-2">Select a role</h6>
                <div className="mb-4 mt-3">
                  <i className="bi bi-gear-fill text-muted" style={{ fontSize: "64px" }}></i>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ⭐ ADD ROLE MODAL */}
      {showAddModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header border-bottom">
                <h5 className="modal-title" style={{ fontSize: "18px" }}>Add role</h5>
                <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
              </div>
              <div className="modal-body p-4">
                <div className="mb-4 row align-items-center">
                  <div className="col-md-4">
                    <label className="fw-semibold small">Title</label>
                  </div>
                  <div className="col-md-8">
                    <input 
                      type="text" 
                      className="form-control bg-light border-0 py-2 shadow-none" 
                      placeholder="Title"
                      value={newRoleName}
                      onChange={(e) => setNewRoleName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-md-4">
                    <label className="fw-semibold small">Use settings from</label>
                  </div>
                  <div className="col-md-8">
                    <select className="form-select bg-light border-0 py-2 shadow-none">
                      <option value="">-</option>
                      {roles.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer border-0 p-4">
                <button className="btn btn-outline-dark px-4 border" onClick={() => setShowAddModal(false)}>
                  <i className="bi bi-x"></i> Close
                </button>
                <button className="btn btn-primary px-4" onClick={handleSaveRole} style={{ background: "#3b82f6", borderColor: "#3b82f6" }}>
                   Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .bg-light-primary {
          background-color: #f1f5f9;
        }
        .btn-xs {
          padding: 1px 5px;
          font-size: 10px;
        }
      `}</style>
    </div>
  );
}
