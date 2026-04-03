import { useState, useEffect } from "react";
import AddMemberModal from "../../../components/modals/AddMemberModal.tsx";
import hrmsService from "../../../services/hrms/hrms.service";
import type { Employee } from "../../../services/hrms/types";

export default function TeamMember() {
    const [showAddModal, setShowAddModal] = useState(false);
    const [members, setMembers] = useState<Employee[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const fetchRef = useState({ active: false })[0];

    const fetchEmployees = async () => {
        if (fetchRef.active) return;
        fetchRef.active = true;

        setIsLoading(true);
        setError("");
        try {
            const data = await hrmsService.getEmployees();
            setMembers(data);
        } catch (err: any) {
            setError(err.message || "Failed to fetch employees");
        } finally {
            setIsLoading(false);
            fetchRef.active = false;
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const filteredMembers = members.filter((m) =>
        `${m.first_name} ${m.last_name} ${m.email} ${m.designation}`.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="team-member-page p-2 p-md-4 text-start">
            {/* ⭐ HEADER & TOP BUTTONS */}
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3 w-100">
                <h4 className="mb-0 fw-bold text-nowrap">Team Member</h4>
                <div className="d-flex align-items-center gap-2 ms-auto">
                    <div className="btn-group shadow-sm">
                        <button className="btn btn-light border bg-white px-3 py-2">
                            <i className="bi bi-list"></i>
                        </button>
                        <button className="btn btn-light border bg-white px-3 py-2 active">
                            <i className="bi bi-grid-3x3-gap"></i>
                        </button>
                    </div>
                    <button
                        className="btn btn-dark d-flex align-items-center justify-content-center px-3 py-1 shadow-sm text-nowrap"
                        style={{ borderRadius: "6px", background: "#000", fontSize: "12px", height: "34px", width: "fit-content" }}
                        onClick={() => setShowAddModal(true)}
                    >
                        Add Member <i className="bi bi-plus-circle ms-2"></i>
                    </button>
                </div>
            </div>

            {error && <div className="alert alert-danger small py-2">{error}</div>}

            {/* ⭐ TOOLBAR */}
            <div className="card shadow-sm border-0 mb-3 overflow-visible">
                <div className="card-body p-2 d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center justify-content-between gap-3 bg-white rounded">
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

                    <div className="d-flex flex-column flex-md-row align-items-stretch align-items-md-center gap-2 flex-grow-1 justify-content-lg-end">
                        <div className="btn-group btn-group-sm w-100 w-md-auto">
                            <button className="btn btn-light border bg-white px-3 py-2 py-md-1" style={{ fontSize: "12px", color: "#666" }}>Active members</button>
                            <button className="btn btn-light border bg-white px-3 py-2 py-md-1" style={{ fontSize: "12px", color: "#666" }}>Inactive members</button>
                        </div>

                        <div className="d-flex align-items-center gap-2 w-100 w-md-auto">
                            <button className="btn btn-sm btn-light border bg-white px-3 flex-fill py-2 py-md-1" style={{ fontSize: "12px", color: "#666" }}>Excel</button>
                            <button className="btn btn-sm btn-light border bg-white px-3 flex-fill py-2 py-md-1" style={{ fontSize: "12px", color: "#666" }}>Print</button>
                        </div>

                        <div className="position-relative w-100 w-md-auto">
                            <input
                                type="text"
                                className="form-control form-control-sm ps-3 pe-4 py-2 py-md-1"
                                placeholder="Search"
                                style={{ background: "#fff", minWidth: "180px" }}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <i className="bi bi-search position-absolute end-0 top-50 translate-middle-y me-2 text-muted" style={{ fontSize: "12px" }}></i>
                        </div>
                    </div>
                </div>
            </div>

            {/* ⭐ TABLE */}
            <div className="card shadow-sm border-0">
                <div className="table-responsive border rounded overflow-auto">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr style={{ borderBottom: "1px solid #eee" }} className="text-nowrap">
                                <th style={{ width: "60px", minWidth: "60px" }}></th>
                                <th className="fw-semibold text-dark px-3" style={{ fontSize: "13px", minWidth: "180px" }}>
                                    Name <i className="bi bi-chevron-down ms-1 text-muted" style={{ fontSize: "10px" }}></i>
                                </th>
                                <th className="fw-semibold text-dark px-3" style={{ fontSize: "13px", minWidth: "150px" }}>Designation</th>
                                <th className="fw-semibold text-dark px-3" style={{ fontSize: "13px", minWidth: "150px" }}>Department</th>
                                <th className="fw-semibold text-dark px-3" style={{ fontSize: "13px", minWidth: "220px" }}>Email</th>
                                <th className="fw-semibold text-dark px-3" style={{ fontSize: "13px", minWidth: "150px" }}>Phone</th>
                                <th className="fw-semibold text-dark px-3" style={{ fontSize: "13px", minWidth: "100px" }}>Status</th>
                                <th style={{ width: "40px", minWidth: "40px" }} className="text-center px-3">
                                    <i className="bi bi-list"></i>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={8} className="text-center py-4">
                                        <div className="spinner-border spinner-border-sm text-primary me-2"></div>
                                        Loading employees...
                                    </td>
                                </tr>
                            ) : filteredMembers.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="text-center py-4 text-muted" style={{ fontSize: "13px" }}>
                                        No records found.
                                    </td>
                                </tr>
                            ) : (
                                filteredMembers.map((member) => (
                                    <tr key={member.id} className="text-nowrap">
                                        <td className="text-center">
                                            <div
                                                className="bg-primary d-flex align-items-center justify-content-center mx-auto text-white fw-bold"
                                                style={{ width: "32px", height: "32px", borderRadius: "50%", fontSize: "13px" }}
                                            >
                                                {member.first_name?.[0]?.toUpperCase() || "?"}
                                            </div>
                                        </td>
                                        <td className="fw-medium text-dark px-3" style={{ fontSize: "13px" }}>{member.first_name} {member.last_name}</td>
                                        <td className="text-muted px-3" style={{ fontSize: "13px" }}>{member.designation}</td>
                                        <td className="text-muted px-3" style={{ fontSize: "13px" }}>{member.department}</td>
                                        <td className="text-muted px-3" style={{ fontSize: "13px" }}>{member.email}</td>
                                        <td className="text-muted px-3" style={{ fontSize: "13px" }}>{member.phone}</td>
                                        <td className="px-3">
                                            <span className={`badge ${member.status === 'active' ? 'bg-success' : 'bg-secondary'}`} style={{ fontSize: "11px" }}>
                                                {member.status?.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="text-center px-3">
                                            <button className="btn btn-sm text-secondary border-0"><i className="bi bi-three-dots-vertical"></i></button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* ⭐ PAGINATION */}
                <div className="card-footer bg-white border-0 d-flex flex-column flex-sm-row justify-content-between align-items-center py-3 px-3 gap-3">
                    <span className="text-muted" style={{ fontSize: "12px" }}>
                        {filteredMembers.length} / {members.length} records
                    </span>
                    <nav>
                        <ul className="pagination pagination-sm mb-0">
                            <li className="page-item disabled">
                                <a className="page-link border bg-light text-muted px-3" href="#">« Previous</a>
                            </li>
                            <li className="page-item active">
                                <a className="page-link border text-white bg-dark px-3 shadow-none border-dark" href="#">1</a>
                            </li>
                            <li className="page-item disabled">
                                <a className="page-link border bg-light text-muted px-3" href="#">Next »</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            {showAddModal && <AddMemberModal onClose={() => { setShowAddModal(false); fetchEmployees(); }} />}
        </div>
    );
}
