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
                        <select className="form-select form-select-sm w-100 w-md-auto py-2 py-md-1" style={{ minWidth: "160px", fontSize: "12.5px", color: "#666" }}>
                            <option>- Team member -</option>
                        </select>

                        {activeTab === "Salary Details" ? (
                            <select className="form-select form-select-sm w-100 w-md-auto py-2 py-md-1" style={{ minWidth: "130px", fontSize: "12.5px", color: "#666" }}>
                                <option>2025-2026</option>
                            </select>
                        ) : (
                            <div className="btn-group btn-group-sm w-100 w-md-auto">
                                <button className="btn btn-light border bg-white px-3 py-2 py-md-1">
                                    <i className="bi bi-chevron-left"></i>
                                </button>
                                <button className="btn btn-light border bg-white px-4 fw-medium py-2 py-md-1" style={{ fontSize: "12.5px" }}>February 2026</button>
                                <button className="btn btn-light border bg-white px-3 py-2 py-md-1">
                                    <i className="bi bi-chevron-right"></i>
                                </button>
                            </div>
                        )}

                        {activeTab === "Salary Calculation" && (
                            <div className="d-flex align-items-center gap-2 w-100 w-md-auto mt-2 mt-md-0">
                                <button className="btn btn-sm btn-light border bg-white px-3 flex-fill py-2 py-md-1" style={{ fontSize: "12.5px", color: "#666" }}>Excel</button>
                                <button className="btn btn-sm btn-light border bg-white px-3 flex-fill py-2 py-md-1" style={{ fontSize: "12.5px", color: "#666" }}>Print</button>
                            </div>
                        )}

                        <div className="position-relative w-100 w-md-auto mt-2 mt-md-0">
                            <input
                                type="text"
                                className="form-control form-control-sm ps-3 pe-4 py-2"
                                placeholder="Search"
                                style={{ background: "#fff", width: "100%", minWidth: "180px" }}
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
                <tr style={{ borderBottom: "1px solid #eee" }} className="text-nowrap">
                    <th style={{ width: "60px", minWidth: "60px" }}></th>
                    <th className="fw-semibold text-dark px-3" style={{ fontSize: "13px", minWidth: "200px" }}>
                        Team member <i className="bi bi-chevron-up ms-1 text-muted" style={{ fontSize: "10px" }}></i>
                    </th>
                    <th className="fw-semibold text-dark px-3" style={{ fontSize: "13px", minWidth: "150px" }}>Job Title</th>
                    <th className="fw-semibold text-dark px-3" style={{ fontSize: "13px", minWidth: "200px" }}>Salary in hand per month</th>
                    <th className="fw-semibold text-dark px-3" style={{ fontSize: "13px", minWidth: "150px" }}>Overtime (per day)</th>
                    <th className="fw-semibold text-dark px-3" style={{ fontSize: "13px", minWidth: "200px" }}>Leave deduction (per leave)</th>
                    <th className="fw-semibold text-dark px-3" style={{ fontSize: "13px", minWidth: "120px" }}>Paid Leave</th>
                </tr>
            );
        } else {
            return (
                <tr style={{ borderBottom: "1px solid #eee" }} className="text-nowrap">
                    <th className="fw-semibold text-dark px-3" style={{ fontSize: "12.5px", minWidth: "200px" }}>Team member</th>
                    <th className="fw-semibold text-dark text-center px-3" style={{ fontSize: "12.5px", minWidth: "100px" }}>Total Days</th>
                    <th className="fw-semibold text-dark text-center px-3" style={{ fontSize: "12.5px", minWidth: "100px" }}>Working Days</th>
                    <th className="fw-semibold text-dark text-center px-3" style={{ fontSize: "12.5px", minWidth: "80px" }}>Present</th>
                    <th className="fw-semibold text-dark text-center px-3" style={{ fontSize: "12.5px", minWidth: "80px" }}>WFO</th>
                    <th className="fw-semibold text-dark text-center px-3" style={{ fontSize: "12.5px", minWidth: "80px" }}>WFH</th>
                    <th className="fw-semibold text-dark text-center px-3" style={{ fontSize: "12.5px", minWidth: "80px" }}>Absent</th>
                    <th className="fw-semibold text-dark text-center px-3" style={{ fontSize: "12.5px", minWidth: "100px" }}>Over Time</th>
                    <th className="fw-semibold text-dark text-center px-3" style={{ fontSize: "12.5px", minWidth: "180px" }}>Remaining Paid Leaves</th>
                    <th className="fw-semibold text-dark text-center px-3" style={{ fontSize: "12.5px", minWidth: "120px" }}>Basic Salary</th>
                    <th className="fw-semibold text-dark text-center px-3" style={{ fontSize: "12.5px", minWidth: "120px" }}>Over Time</th>
                    <th className="fw-semibold text-dark text-center px-3" style={{ fontSize: "12.5px", minWidth: "120px" }}>Deduction</th>
                    <th className="fw-semibold text-dark text-center px-3" style={{ fontSize: "12.5px", minWidth: "120px" }}>Final Salary</th>
                </tr>
            );
        }
    };

    return (
        <div className="salary-page p-2 p-md-4 text-start">
            {/* ⭐ HEADER */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0 fw-bold text-dark">Salary</h4>
            </div>

            {/* ⭐ TABS - Scrollable on mobile */}
            <div className="d-flex gap-4 mb-3 border-bottom overflow-auto pb-1 flex-nowrap" style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
                {tabs.map((tab) => (
                    <div
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            cursor: "pointer",
                            fontSize: "13.5px",
                            paddingBottom: "10px",
                            borderBottom: activeTab === tab ? "3px solid #3346a8" : "3px solid transparent",
                            color: activeTab === tab ? "#3346a8" : "#666",
                            fontWeight: activeTab === tab ? "600" : "400",
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
            <div className="card shadow-sm border-0 rounded overflow-hidden mb-4">
                <div className="table-responsive overflow-auto">
                    <table className="table table-bordered align-middle mb-0">
                        <thead className="table-light">
                            {renderTableHeader()}
                        </thead>
                        <tbody>
                            {activeTab === "Salary Details" ? (
                                members.map((member) => (
                                    <tr key={member.id} className="text-nowrap">
                                        <td className="text-center px-3">
                                            <div
                                                className="bg-light d-flex align-items-center justify-content-center mx-auto"
                                                style={{ width: "32px", height: "32px", borderRadius: "50%", border: "1px solid #e2e8f0" }}
                                            >
                                                <i className="bi bi-person text-secondary" style={{ fontSize: '14px' }}></i>
                                            </div>
                                        </td>
                                        <td className="px-3" style={{ fontSize: "13.5px", color: "#334155", fontWeight: "500" }}>{member.name}</td>
                                        <td className="px-3" style={{ fontSize: "13.5px", color: "#64748b" }}>{member.jobTitle}</td>
                                        <td className="px-3">
                                            <input type="number" className="form-control form-control-sm border shadow-none py-2" placeholder="Salary/mo" style={{ fontSize: '13px', minWidth: "150px" }} />
                                        </td>
                                        <td className="px-3">
                                            <input type="number" className="form-control form-control-sm border shadow-none py-2" placeholder="Overtime" style={{ fontSize: '13px', minWidth: "120px" }} />
                                        </td>
                                        <td className="px-3">
                                            <input type="number" className="form-control form-control-sm border shadow-none py-2" placeholder="Deduction" style={{ fontSize: '13px', minWidth: "140px" }} />
                                        </td>
                                        <td className="px-3">
                                            <input type="number" className="form-control form-control-sm border shadow-none py-2" placeholder="Paid Days" style={{ fontSize: '13px', minWidth: "120px" }} />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={13} className="text-center py-5 text-muted" style={{ fontSize: "13.5px" }}>
                                        No transaction records found for this period.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* ⭐ PAGINATION */}
                <div className="card-footer bg-white border-top d-flex flex-column flex-sm-row justify-content-between align-items-center py-3 px-3 gap-3">
                    <span className="text-muted" style={{ fontSize: "12px" }}>{activeTab === "Salary Details" ? "Showing 1 of 1 records" : "0-0 / 0 entries"}</span>
                    <nav>
                        <ul className="pagination pagination-sm mb-0">
                            <li className="page-item disabled">
                                <a className="page-link border bg-light text-muted px-3" href="#">« Previous</a>
                            </li>
                            {activeTab === "Salary Details" && (
                                <li className="page-item active">
                                    <a className="page-link border text-white bg-dark px-3 shadow-none border-dark" href="#">1</a>
                                </li>
                            )}
                            <li className="page-item disabled">
                                <a className="page-link border bg-light text-muted px-3" href="#">Next »</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div className="mt-4">
                <button className="btn btn-primary px-5 py-3 fw-bold w-100 w-md-auto shadow-sm" style={{ background: "#2b4cb3" }}>Save Salary Configuration</button>
            </div>

            <style>{`
                .salary-page .table-bordered th, .salary-page .table-bordered td { border: 1px solid #eee !important; }
                .salary-page .table-light { background-color: #f7f9fc; }
                .salary-page .form-control::placeholder { color: #94a3b8; }
                ::-webkit-scrollbar { height: 6px; }
                ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
            `}</style>
        </div>
    );
}
