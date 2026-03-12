import { useState } from "react";
import AddMemberModal from "../../../components/modals/AddMemberModal.tsx";

export default function TeamMember() {
    const [showAddModal, setShowAddModal] = useState(false);

    // Dummy data for now
    const members = [
        {
            id: 1,
            name: "Shakshi Rawat",
            jobTitle: "Untitled",
            roles: "Admin",
            email: "ea2akspl@gmail.com",
            phone: "09220795356",
            avatar: null,
        },
    ];

    return (
        <div className="team-member-page p-1">
            {/* ⭐ HEADER & TOP BUTTONS */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0 fw-bold">Team Member</h4>
                <div className="d-flex align-items-center gap-2">
                    <div className="btn-group shadow-sm">
                        <button className="btn btn-light border bg-white px-2">
                            <i className="bi bi-list"></i>
                        </button>
                        <button className="btn btn-light border bg-white px-2 active">
                            <i className="bi bi-grid-3x3-gap"></i>
                        </button>
                    </div>
                    <button
                        className="btn btn-dark d-flex align-items-center px-3"
                        style={{ borderRadius: "8px", background: "#000" }}
                        onClick={() => setShowAddModal(true)}
                    >
                        <i className="bi bi-plus-circle me-2"></i> Add Member
                    </button>
                </div>
            </div>

            {/* ⭐ TOOLBAR */}
            <div className="card shadow-sm border-0 mb-3 overflow-visible">
                <div className="card-body p-2 d-flex flex-wrap align-items-center justify-content-between gap-2 bg-white rounded">
                    <div className="d-flex align-items-center gap-2">
                        <select className="form-select form-select-sm" style={{ width: "80px", color: "#666" }}>
                            <option value="100">100</option>
                            <option value="50">50</option>
                            <option value="25">25</option>
                        </select>
                        <button className="btn btn-sm btn-light border bg-white shadow-sm p-1 px-2">
                            <i className="bi bi-eye-slash"></i>
                        </button>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                        <div className="btn-group btn-group-sm">
                            <button className="btn btn-light border bg-white px-3" style={{ fontSize: "12px", color: "#666" }}>Active members</button>
                            <button className="btn btn-light border bg-white px-3" style={{ fontSize: "12px", color: "#666" }}>Inactive members</button>
                        </div>

                        <div className="d-flex align-items-center gap-2 ms-2">
                            <button className="btn btn-sm btn-light border bg-white px-3" style={{ fontSize: "12px", color: "#666" }}>Excel</button>
                            <button className="btn btn-sm btn-light border bg-white px-3" style={{ fontSize: "12px", color: "#666" }}>Print</button>
                        </div>

                        <div className="position-relative ms-2">
                            <input
                                type="text"
                                className="form-control form-control-sm ps-3 pe-4"
                                placeholder="Search"
                                style={{ width: "180px", background: "#fff" }}
                            />
                            <i className="bi bi-search position-absolute end-0 top-50 translate-middle-y me-2 text-muted" style={{ fontSize: "12px" }}></i>
                        </div>
                    </div>
                </div>
            </div>

            {/* ⭐ TABLE */}
            <div className="card shadow-sm border-0">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr style={{ borderBottom: "1px solid #eee" }}>
                                <th style={{ width: "60px" }}></th>
                                <th className="fw-semibold text-dark" style={{ fontSize: "13px" }}>
                                    Name <i className="bi bi-chevron-down ms-1 text-muted" style={{ fontSize: "10px" }}></i>
                                </th>
                                <th className="fw-semibold text-dark" style={{ fontSize: "13px" }}>Job Title</th>
                                <th className="fw-semibold text-dark" style={{ fontSize: "13px" }}>Roles</th>
                                <th className="fw-semibold text-dark" style={{ fontSize: "13px" }}>Email</th>
                                <th className="fw-semibold text-dark" style={{ fontSize: "13px" }}>Phone</th>
                                <th style={{ width: "40px" }} className="text-center">
                                    <i className="bi bi-list"></i>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map((member) => (
                                <tr key={member.id}>
                                    <td className="text-center">
                                        <div
                                            className="bg-light d-flex align-items-center justify-content-center mx-auto"
                                            style={{ width: "32px", height: "32px", borderRadius: "50%", border: "1px solid #eee" }}
                                        >
                                            <i className="bi bi-person text-muted"></i>
                                        </div>
                                    </td>
                                    <td className="fw-medium text-dark" style={{ fontSize: "13px" }}>{member.name}</td>
                                    <td className="text-muted" style={{ fontSize: "13px" }}>{member.jobTitle}</td>
                                    <td className="text-muted" style={{ fontSize: "13px" }}>{member.roles}</td>
                                    <td className="text-muted" style={{ fontSize: "13px" }}>{member.email}</td>
                                    <td className="text-muted" style={{ fontSize: "13px" }}>{member.phone}</td>
                                    <td className="text-center">
                                        <button className="btn btn-sm text-secondary border-0">
                                            {/* Empty action as per image */}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* ⭐ PAGINATION */}
                <div className="card-footer bg-white border-0 d-flex justify-content-between align-items-center py-2 px-3">
                    <span className="text-muted" style={{ fontSize: "12px" }}>1-1 / 1</span>
                    <nav>
                        <ul className="pagination pagination-sm mb-0">
                            <li className="page-item disabled">
                                <a className="page-link border bg-light text-muted" href="#">«</a>
                            </li>
                            <li className="page-item active">
                                <a className="page-link border text-dark bg-light px-3" href="#">1</a>
                            </li>
                            <li className="page-item disabled">
                                <a className="page-link border bg-light text-muted" href="#">»</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            {showAddModal && <AddMemberModal onClose={() => setShowAddModal(false)} />}
        </div>
    );
}
