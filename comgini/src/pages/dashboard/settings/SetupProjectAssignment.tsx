import { useState } from "react";
import toast from "react-hot-toast";

interface ProjectAssignment {
  id: number;
  title: string;
}

export default function SetupProjectAssignment() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [projects, setProjects] = useState<ProjectAssignment[]>([
    { id: 1, title: "Accounts related work" },
    { id: 2, title: "Annual Filing 2024-25" },
    { id: 3, title: "Auditor related working" },
    { id: 4, title: "Capital Structure" },
    { id: 5, title: "CCD Issue" },
    { id: 6, title: "Change of Name and Alteration of MOA" },
    { id: 7, title: "Charge Management" },
    { id: 8, title: "Conversion" },
    { id: 9, title: "Corporate Restructuring" },
    { id: 10, title: "Digital signature certificate (DSC)" },
    { id: 11, title: "DIN related working" },
    { id: 12, title: "Director & KMP" },
    { id: 13, title: "Dividend Working" },
    { id: 14, title: "Incorporation" },
    { id: 15, title: "LLP Working" },
    { id: 16, title: "Miscellaneous" },
    { id: 17, title: "Partnership Working" },
    { id: 18, title: "Registrations / Renewals" },
    { id: 19, title: "Search -View Public Document" },
    { id: 20, title: "Secretarial audit working" },
    { id: 21, title: "Statutory Compliances" },
  ]);

  const [newProject, setNewProject] = useState({ title: "", description: "", company: "", startDate: "", deadline: "", status: "", price: "" });

  const handleSave = () => {
    if (!newProject.title) {
      toast.error("Please enter a title");
      return;
    }
    const project: ProjectAssignment = {
      id: Date.now(),
      title: newProject.title
    };
    setProjects([...projects, project]);
    setNewProject({ title: "", description: "", company: "", startDate: "", deadline: "", status: "", price: "" });
    setShowAddModal(false);
    toast.success("Project assignment added successfully");
  };

  return (
    <div className="setup-project-assignment">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold mb-0">Project Assignment</h5>
        <button className="btn btn-outline-dark btn-sm d-flex align-items-center gap-2" onClick={() => setShowAddModal(true)}>
          <i className="bi bi-plus-circle"></i> Add Project Assignment
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
                <th className="px-4 py-3 border-bottom-0 text-end pe-4"><i className="bi bi-list"></i></th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={2} className="text-center py-4 text-muted">No record found.</td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project.id}>
                    <td className="px-4 py-3 align-middle text-dark fw-medium">{project.title}</td>
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
          <div className="text-muted small">{projects.length > 0 ? `1-${projects.length} / ${projects.length}` : "0-0 / 0"}</div>
          <div className="d-flex gap-1">
             <button className="btn btn-light btn-sm border"><i className="bi bi-chevron-double-left"></i></button>
             <button className="btn btn-light btn-sm border px-2">1</button>
             <button className="btn btn-light btn-sm border"><i className="bi bi-chevron-double-right"></i></button>
          </div>
        </div>
      </div>

      {/* ⭐ ADD PROJECT ASSIGNMENT MODAL */}
      {showAddModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header border-bottom">
                <h5 className="modal-title" style={{ fontSize: "18px" }}>Add Project Assignment</h5>
                <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
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
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-3">
                    <label className="fw-semibold small">Description</label>
                  </div>
                  <div className="col-md-9">
                    <textarea 
                      className="form-control bg-light border-0 py-2 shadow-none" 
                      rows={4} 
                      placeholder="Description"
                      value={newProject.description}
                      onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    ></textarea>
                  </div>
                </div>
                <div className="row mb-3 align-items-center">
                  <div className="col-md-3">
                    <label className="fw-semibold small">Company name</label>
                  </div>
                  <div className="col-md-9">
                    <select className="form-select bg-light border-0 py-2 shadow-none">
                      <option>Select company</option>
                    </select>
                  </div>
                </div>
                <div className="row mb-3 align-items-center">
                  <div className="col-md-3">
                    <label className="fw-semibold small">Start date</label>
                  </div>
                  <div className="col-md-9">
                    <input type="text" className="form-control bg-light border-0 py-2 shadow-none" placeholder="DD-MM-YYYY" />
                  </div>
                </div>
                <div className="row mb-3 align-items-center">
                  <div className="col-md-3">
                    <label className="fw-semibold small">Deadline</label>
                  </div>
                  <div className="col-md-9">
                    <input type="text" className="form-control bg-light border-0 py-2 shadow-none" placeholder="DD-MM-YYYY" />
                  </div>
                </div>
                <div className="row mb-3 align-items-center">
                  <div className="col-md-3">
                    <label className="fw-semibold small">Status</label>
                  </div>
                  <div className="col-md-9">
                    <select className="form-select bg-light border-0 py-2 shadow-none">
                      <option>- Select Status -</option>
                    </select>
                  </div>
                </div>
                <div className="row mb-3 align-items-center">
                  <div className="col-md-3">
                    <label className="fw-semibold small">Price</label>
                  </div>
                  <div className="col-md-9">
                    <input type="text" className="form-control bg-light border-0 py-2 shadow-none" placeholder="Price" />
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
      )}
    </div>
  );
}
