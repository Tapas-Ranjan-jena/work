import { useState } from "react";
import { NavLink } from "react-router-dom";
import AddLeadModal from "./components/AddLeadModal";

export default function LeadsList() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="leads-page p-1">
            {/* ⭐ HEADER & TABS ROW */}
            <div className="mb-4">
                <h4 className="fw-bold mb-3">Leads</h4>
                <div className="d-flex justify-content-between align-items-center border-bottom pb-1">
                    <div className="d-flex gap-4">
                        <NavLink
                            to="/leads"
                            end
                            style={({ isActive }) => ({
                                cursor: "pointer",
                                fontSize: "13px",
                                paddingBottom: "8px",
                                borderBottom: isActive ? "2px solid #3346a8" : "2px solid transparent",
                                color: isActive ? "#3346a8" : "#666",
                                fontWeight: isActive ? "500" : "400",
                                textDecoration: "none"
                            })}
                        >
                            List
                        </NavLink>
                        <NavLink
                            to="/leads/kanban"
                            style={({ isActive }) => ({
                                cursor: "pointer",
                                fontSize: "13px",
                                paddingBottom: "8px",
                                borderBottom: isActive ? "2px solid #3346a8" : "2px solid transparent",
                                color: isActive ? "#3346a8" : "#666",
                                fontWeight: isActive ? "500" : "400",
                                textDecoration: "none"
                            })}
                        >
                            Kanban
                        </NavLink>
                    </div>
                    <button
                        className="btn btn-outline-dark btn-sm d-flex align-items-center gap-2 px-3 mb-1"
                        style={{ borderRadius: "6px", fontSize: "12px" }}
                        onClick={() => setShowModal(true)}
                    >
                        <i className="bi bi-plus-circle"></i> Add Lead
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
                        <select className="form-select form-select-sm" style={{ width: "150px", fontSize: "12px", color: "#666" }}>
                            <option>- Owner -</option>
                        </select>
                        <select className="form-select form-select-sm" style={{ width: "150px", fontSize: "12px", color: "#666" }}>
                            <option>- Source -</option>
                        </select>
                        <select className="form-select form-select-sm" style={{ width: "150px", fontSize: "12px", color: "#666" }}>
                            <option>- Status -</option>
                        </select>

                        <div className="d-flex align-items-center gap-1">
                            <button className="btn btn-sm btn-light border bg-white px-3" style={{ fontSize: "12px", color: "#666" }}>Excel</button>
                            <button className="btn btn-sm btn-light border bg-white px-3" style={{ fontSize: "12px", color: "#666" }}>Print</button>
                        </div>

                        <div className="position-relative ms-1">
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
            <div className="card shadow-sm border-0 rounded-0">
                <div className="table-responsive">
                    <table className="table align-middle mb-0">
                        <thead className="table-light">
                            <tr style={{ borderBottom: "1px solid #eee" }}>
                                <th className="fw-semibold text-dark" style={{ fontSize: "12px" }}>
                                    Title <i className="bi bi-chevron-down ms-1 text-muted" style={{ fontSize: "10px" }}></i>
                                </th>
                                <th className="fw-semibold text-dark" style={{ fontSize: "12px" }}>Company name</th>
                                <th className="fw-semibold text-dark" style={{ fontSize: "12px" }}>Primary contact</th>
                                <th className="fw-semibold text-dark" style={{ fontSize: "12px" }}>Owner</th>
                                <th className="fw-semibold text-dark" style={{ fontSize: "12px" }}>Status</th>
                                <th style={{ width: "40px" }} className="text-center">
                                    <i className="bi bi-list"></i>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ height: '40px' }}>
                                <td className="text-center text-muted">-</td>
                                <td className="text-center text-muted">-</td>
                                <td className="text-center text-muted">-</td>
                                <td className="text-center text-muted">-</td>
                                <td className="text-center text-muted">-</td>
                                <td className="text-center text-muted">-</td>
                            </tr>
                            <tr>
                                <td colSpan={6} className="text-center py-4 text-muted" style={{ fontSize: "12px", border: 'none' }}>
                                    No record found.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* ⭐ PAGINATION */}
                <div className="card-footer bg-white border-top d-flex justify-content-between align-items-center py-1 px-3">
                    <span className="text-muted" style={{ fontSize: "11px" }}>0-0 / 0</span>
                    <nav>
                        <ul className="pagination pagination-sm mb-0">
                            <li className="page-item disabled">
                                <a className="page-link border bg-light text-muted px-2 py-1" href="#" style={{ fontSize: '10px' }}>«</a>
                            </li>
                            <li className="page-item disabled ms-1">
                                <a className="page-link border bg-light text-muted px-2 py-1" href="#" style={{ fontSize: '10px' }}>»</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <AddLeadModal show={showModal} onClose={() => setShowModal(false)} />

            <style>{`
                .leads-page .table thead th { background-color: #fcfcfc; border-bottom: 1px solid #eee; padding: 12px 8px; }
                .leads-page .table tbody td { padding: 12px 8px; border-bottom: 1px solid #eee; }
                .leads-page .form-control::placeholder { color: #aaa; }
                .leads-page .form-control-sm, .leads-page .form-select-sm { height: 32px; }
            `}</style>
        </div>
    );
}