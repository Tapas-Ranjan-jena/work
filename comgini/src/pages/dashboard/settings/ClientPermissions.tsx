import { useState } from "react";
import toast from "react-hot-toast";

export default function ClientPermissions() {
  const [permissions, setPermissions] = useState({
    messageToFromClients: "",
    hideMenus: ["Tickets", "Estimates", "Announcements", "Events", "Updates"],
    canCreateAssignment: true,
    canEditAssignments: true,
    canViewTasks: true,
    canCreateTasks: true,
    canEditTasks: true,
    canCommentOnTasks: true,
    canViewAssignmentFiles: true,
    canCommentOnFiles: true,
    canViewGantt: true,
    canViewAssignmentOverview: true,
    canSendMessageToContacts: true,
    canViewAssignmentActivity: true,
    canViewFiles: true,
    canAddFiles: true,
    disableUserInvitation: true,
  });

  const handleToggle = (key: keyof typeof permissions) => {
    if (typeof permissions[key] === 'boolean') {
      setPermissions({ ...permissions, [key]: !permissions[key] });
    }
  };

  const handleSave = () => {
    toast.success("Client permissions saved successfully!");
  };

  const permissionItems = [
    { label: "Client can create Assignment?", key: "canCreateAssignment" },
    { label: "Client can edit Assignments?", key: "canEditAssignments" },
    { label: "Client can view tasks?", key: "canViewTasks" },
    { label: "Client can create tasks?", key: "canCreateTasks" },
    { label: "Client can edit tasks?", key: "canEditTasks" },
    { label: "Client can comment on tasks?", key: "canCommentOnTasks" },
    { label: "Client can view Assignment files?", key: "canViewAssignmentFiles" },
    { label: "Client can comment of files?", key: "canCommentOnFiles" },
    { label: "Client can view gantt?", key: "canViewGantt" },
    { label: "Client can view Assignment overview?", key: "canViewAssignmentOverview" },
    { label: "Client can send/receive message to/from own contacts?", key: "canSendMessageToContacts" },
    { label: "Client can view Assignment activity?", key: "canViewAssignmentActivity" },
    { label: "Client can view files?", key: "canViewFiles", info: true },
    { label: "Client can add files?", key: "canAddFiles", info: true },
    { label: "Disable user invitation option by clients", key: "disableUserInvitation" },
  ];

  return (
    <div className="client-permissions">
      <h5 className="fw-bold mb-4">Client permissions</h5>
      
      <div className="settings-form" style={{ maxWidth: "900px" }}>
        {/* Who can send/receive message */}
        <div className="row mb-4 align-items-start">
          <div className="col-md-4">
            <label className="fw-semibold small text-dark">Who can send/receive message to/from clients</label>
          </div>
          <div className="col-md-8">
            <div className="bg-light p-2 rounded" style={{ minHeight: "38px" }}></div>
          </div>
        </div>

        {/* Hide menus from client portal */}
        <div className="row mb-5 align-items-start">
          <div className="col-md-4">
            <label className="fw-semibold small text-dark">Hide menus from client portal</label>
          </div>
          <div className="col-md-8">
            <div className="d-flex flex-wrap gap-2 p-2 bg-light rounded">
              {permissions.hideMenus.map(menu => (
                <span key={menu} className="badge bg-white text-dark border py-2 px-3 fw-normal d-flex align-items-center gap-2" style={{ fontSize: "13px" }}>
                  <i className="bi bi-x text-muted" style={{ fontSize: "16px", cursor: "pointer" }}></i> {menu}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Checkbox permissions */}
        <div className="permissions-list border-top pt-3">
          {permissionItems.map((item) => (
            <div key={item.key} className="row mb-4 align-items-center border-bottom pb-3">
              <div className="col-md-4">
                <label className="fw-semibold small text-dark d-flex align-items-center gap-2">
                  {item.label}
                  {item.info && <i className="bi bi-question-circle-fill text-dark" style={{ fontSize: "12px" }}></i>}
                </label>
              </div>
              <div className="col-md-8">
                <div className="form-check">
                  <input 
                    className="form-check-input border-primary" 
                    type="checkbox" 
                    checked={permissions[item.key as keyof typeof permissions] as boolean} 
                    onChange={() => handleToggle(item.key as keyof typeof permissions)}
                    style={{ width: "18px", height: "18px" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button 
          className="btn btn-primary btn-sm px-4 py-2 mt-3 d-flex align-items-center gap-2"
          onClick={handleSave}
          style={{ background: "#4e73df", borderColor: "#4e73df" }}
        >
          <i className="bi bi-check-circle"></i> Save
        </button>
      </div>
    </div>
  );
}
