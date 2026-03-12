import { useState } from "react";

export default function Salary() {
    const [activeTab, setActiveTab] = useState("Salary Details");

    const tabs = [
        "Salary Details",
        "Salary Calculation",
    ];

    const members = [
        {
            id: 1,
            name: "Shakshi Rawat",
            jobTitle: "Untitled",
            salary: "",
            overtime: "",
            leaveDeduction: "",
            paidLeave: "",
        }
    ];

    const renderToolbar = () => {
        return (
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
                            <option>- Team member -</option>
                        </select>

                        {activeTab === "Salary Details" ? (
                            <select className="form-select form-select-sm" style={{ width: "120px", fontSize: "12px", color: "#666" }}>
                                <option>2025-2026</option>
                            </select>
                        ) : (
                            <div className="btn-group btn-group-sm ms-1">
                                <button className="btn btn-light border bg-white px-2">
                                    <i className="bi bi-chevron-left"></i>
                                </button>
                                <button className="btn btn-light border bg-white px-3" style={{ fontSize: "12px" }}>February 2026</button>
                                <button className="btn btn-light border bg-white px-2">
                                    <i className="bi bi-chevron-right"></i>
                                </button>
                            </div>
                        )}

                        {activeTab === "Salary Calculation" && (
                            <div className="d-flex align-items-center gap-1 ms-1">
                                <button className="btn btn-sm btn-light border bg-white px-3" style={{ fontSize: "12px", color: "#666" }}>Excel</button>
                                <button className="btn btn-sm btn-light border bg-white px-3" style={{ fontSize: "12px", color: "#666" }}>Print</button>
                            </div>
                        )}

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
        );
    };

    const renderTableHeader = () => {
        if (activeTab === "Salary Details") {
            return (
                <tr style={{ borderBottom: "1px solid #eee" }}>
                    <th style={{ width: "50px" }}></th>
                    <th className="fw-semibold text-dark" style={{ fontSize: "12px", borderRight: '1px solid #eee' }}>
                        Team member <i className="bi bi-chevron-up ms-1 text-muted" style={{ fontSize: "10px" }}></i>
                    </th>
                    <th className="fw-semibold text-dark" style={{ fontSize: "12px", borderRight: '1px solid #eee' }}>Job Title</th>
                    <th className="fw-semibold text-dark" style={{ fontSize: "12px", borderRight: '1px solid #eee' }}>Salary in hand per month</th>
                    <th className="fw-semibold text-dark" style={{ fontSize: "12px", borderRight: '1px solid #eee' }}>Overtime (per day)</th>
                    <th className="fw-semibold text-dark" style={{ fontSize: "12px", borderRight: '1px solid #eee' }}>Leave deduction (per leave)</th>
                    <th className="fw-semibold text-dark" style={{ fontSize: "12px" }}>Paid Leave</th>
                </tr>
            );
        } else {
            return (
                <tr style={{ borderBottom: "1px solid #eee" }}>
                    <th className="fw-semibold text-dark" style={{ fontSize: "11px", borderRight: '1px solid #eee' }}>Team member</th>
                    <th className="fw-semibold text-dark" style={{ fontSize: "11px", borderRight: '1px solid #eee' }}>Total Days</th>
                    <th className="fw-semibold text-dark" style={{ fontSize: "11px", borderRight: '1px solid #eee' }}>Working Days</th>
                    <th className="fw-semibold text-dark" style={{ fontSize: "11px", borderRight: '1px solid #eee' }}>Present</th>
                    <th className="fw-semibold text-dark" style={{ fontSize: "11px", borderRight: '1px solid #eee' }}>WFO</th>
                    <th className="fw-semibold text-dark" style={{ fontSize: "11px", borderRight: '1px solid #eee' }}>WFH</th>
                    <th className="fw-semibold text-dark" style={{ fontSize: "11px", borderRight: '1px solid #eee' }}>Absent</th>
                    <th className="fw-semibold text-dark" style={{ fontSize: "11px", borderRight: '1px solid #eee' }}>Over Time</th>
                    <th className="fw-semibold text-dark" style={{ fontSize: "11px", borderRight: '1px solid #eee' }}>Remaining Paid Leaves</th>
                    <th className="fw-semibold text-dark" style={{ fontSize: "11px", borderRight: '1px solid #eee' }}>Basic Salary</th>
                    <th className="fw-semibold text-dark" style={{ fontSize: "11px", borderRight: '1px solid #eee' }}>Over Time</th>
                    <th className="fw-semibold text-dark" style={{ fontSize: "11px", borderRight: '1px solid #eee' }}>Deduction</th>
                    <th className="fw-semibold text-dark" style={{ fontSize: "11px" }}>Final Salary</th>
                </tr>
            );
        }
    };

    return (
        <div className="salary-page p-1">
            {/* ⭐ HEADER */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0 fw-bold">Salary</h4>
            </div>

            {/* ⭐ TABS */}
            <div className="d-flex gap-4 mb-3 border-bottom overflow-auto pb-1" style={{ scrollbarWidth: "none" }}>
                {tabs.map((tab) => (
                    <div
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            cursor: "pointer",
                            fontSize: "13px",
                            paddingBottom: "8px",
                            borderBottom: activeTab === tab ? "2px solid #3346a8" : "2px solid transparent",
                            color: activeTab === tab ? "#3346a8" : "#666",
                            fontWeight: activeTab === tab ? "500" : "400",
                            whiteSpace: "nowrap"
                        }}
                    >
                        {tab}
                    </div>
                ))}
            </div>

            {/* ⭐ TOOLBAR */}
            {renderToolbar()}

            {/* ⭐ TABLE */}
            <div className="card shadow-sm border-0 rounded-0">
                <div className="table-responsive">
                    <table className="table table-bordered align-middle mb-0">
                        <thead className="table-light">
                            {renderTableHeader()}
                        </thead>
                        <tbody>
                            {activeTab === "Salary Details" ? (
                                members.map((member) => (
                                    <tr key={member.id}>
                                        <td className="text-center">
                                            <div
                                                className="bg-light d-flex align-items-center justify-content-center mx-auto"
                                                style={{ width: "28px", height: "28px", borderRadius: "50%", border: "1px solid #eee" }}
                                            >
                                                <i className="bi bi-person text-muted" style={{ fontSize: '14px' }}></i>
                                            </div>
                                        </td>
                                        <td style={{ fontSize: "12px", color: "#666" }}>{member.name}</td>
                                        <td style={{ fontSize: "12px", color: "#666" }}>{member.jobTitle}</td>
                                        <td>
                                            <input type="text" className="form-control form-control-sm border-light-subtle" placeholder="Salary in hand per month" style={{ fontSize: '11px' }} />
                                        </td>
                                        <td>
                                            <input type="text" className="form-control form-control-sm border-light-subtle" placeholder="Overtime (per day)" style={{ fontSize: '11px' }} />
                                        </td>
                                        <td>
                                            <input type="text" className="form-control form-control-sm border-light-subtle" placeholder="Leave deduction (per leave)" style={{ fontSize: '11px' }} />
                                        </td>
                                        <td>
                                            <input type="text" className="form-control form-control-sm border-light-subtle" placeholder="Paid Leave" style={{ fontSize: '11px' }} />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={13} className="text-center py-4 text-muted" style={{ fontSize: "12px" }}>
                                        No record found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* ⭐ PAGINATION */}
                <div className="card-footer bg-white border-top d-flex justify-content-between align-items-center py-2 px-3">
                    <span className="text-muted" style={{ fontSize: "12px" }}>{activeTab === "Salary Details" ? "1-1 / 1" : "0-0 / 0"}</span>
                    <nav>
                        <ul className="pagination pagination-sm mb-0">
                            <li className="page-item disabled">
                                <a className="page-link border bg-light text-muted" href="#" style={{ borderRadius: '4px 0 0 4px' }}>«</a>
                            </li>
                            {activeTab === "Salary Details" && (
                                <li className="page-item active">
                                    <a className="page-link border text-dark bg-light px-2" href="#" style={{ fontSize: '12px' }}>1</a>
                                </li>
                            )}
                            <li className="page-item disabled">
                                <a className="page-link border bg-light text-muted" href="#" style={{ borderRadius: '0 4px 4px 0' }}>»</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <style>{`
                .salary-page .table-bordered th, .salary-page .table-bordered td { border: 1px solid #eee !important; }
                .salary-page .table-light { background-color: #fcfcfc; }
                .salary-page .form-control::placeholder { color: #aaa; }
                .salary-page .form-control-sm { padding: 0.25rem 0.5rem; }
            `}</style>
        </div>
    );
}
