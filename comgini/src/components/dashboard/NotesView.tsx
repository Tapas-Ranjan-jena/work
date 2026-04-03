import React, { useState } from "react";
import AddNoteModal from "./modals/AddNoteModal";

const NotesView: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [entries, setEntries] = useState(100);
    const [showAddNoteModal, setShowAddNoteModal] = useState(false);

    return (
        <div className="card shadow-sm border-0 p-4" style={{ borderRadius: "16px" }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold mb-0">Notes (Private)</h4>
                <button 
                    className="btn btn-outline-dark btn-sm rounded-pill px-3"
                    onClick={() => setShowAddNoteModal(true)}
                >
                    <i className="bi bi-plus-circle me-1"></i> Add note
                </button>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center gap-2">
                    <select 
                        className="form-select form-select-sm" 
                        value={entries} 
                        onChange={(e) => setEntries(Number(e.target.value))}
                        style={{ width: "80px" }}
                    >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                    <button className="btn btn-light btn-sm">
                        <i className="bi bi-eye-slash-fill"></i>
                    </button>
                </div>
                <div className="position-relative">
                    <input 
                        type="text" 
                        className="form-control form-control-sm ps-4" 
                        placeholder="Search" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: "200px" }}
                    />
                    <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-2 text-muted small"></i>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-bordered align-middle">
                    <thead className="bg-light">
                        <tr>
                            <th className="fw-semibold small">Created date</th>
                            <th className="fw-semibold small">Title</th>
                            <th className="fw-semibold small">Files</th>
                            <th className="text-center"><i className="bi bi-list"></i></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={4} className="text-center py-5 text-muted small">
                                No record found.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="small text-muted">0-0 / 0</div>
                <div className="btn-group btn-group-sm">
                    <button className="btn btn-outline-secondary px-2"><i className="bi bi-chevron-double-left"></i></button>
                    <button className="btn btn-outline-secondary px-2"><i className="bi bi-chevron-double-right"></i></button>
                </div>
            </div>

            <AddNoteModal 
                open={showAddNoteModal} 
                onClose={() => setShowAddNoteModal(false)} 
            />
        </div>
    );
};

export default NotesView;
