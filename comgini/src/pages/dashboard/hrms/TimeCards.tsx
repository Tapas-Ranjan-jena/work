import { useState } from "react";
import AddTimeModal from "../../../components/modals/AddTimeModal";

export default function TimeCards() {
    const [activeTab, setActiveTab] = useState("Daily");
    const [showAddModal, setShowAddModal] = useState(false);

    const tabs = [
        "Daily",
        "Custom",
        "Summary",
        "Summary details",
        "User Report",
        "User Summary details",
        "Members Logged",
        "Logged in-out",
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
                        {activeTab === "Members Logged" ? (
                            <button className="btn btn-sm btn-light border bg-white shadow-sm p-1 px-2">
                                <i className="bi bi-arrow-clockwise"></i>
                            </button>
                        ) : (
                            <button className="btn btn-sm btn-light border bg-white shadow-sm p-1 px-2">
                                <i className="bi bi-eye-slash"></i>
                            </button>
                        )}
                    </div>

                    <div className="d-flex align-items-center gap-2">
                        {activeTab === "User Summary details" && (
                            <select className="form-select form-select-sm" style={{ width: "130px", fontSize: "12px", color: "#666" }}>
                                <option>- Status -</option>
                            </select>
                        )}

                        {activeTab === "Logged in-out" && (
                            <select className="form-select form-select-sm" style={{ width: "130px", fontSize: "12px", color: "#666" }}>
                                <option>- Status -</option>
                            </select>
                        )}

                        {(activeTab !== "Members Logged" && activeTab !== "Logged in-out") && (
                            <select className="form-select form-select-sm" style={{ width: "130px", fontSize: "12px", color: "#666" }}>
                                <option>- Member -</option>
                            </select>
                        )}

                        {activeTab === "Daily" || activeTab === "Members Logged" ? (
                            <div className="btn-group btn-group-sm ms-1">
                                <button className="btn btn-light border bg-white px-2">
                                    <i className="bi bi-chevron-left"></i>
                                </button>
                                <button className="btn btn-light border bg-white px-3" style={{ fontSize: "12px" }}>Today</button>
                                <button className="btn btn-light border bg-white px-2">
                                    <i className="bi bi-chevron-right"></i>
                                </button>
                            </div>
                        ) : activeTab === "Logged in-out" ? null : (
                            <div className="d-flex gap-0 ms-1">
                                <input type="text" className="form-control form-control-sm text-center" defaultValue="23rd February 2026" style={{ width: "140px", fontSize: "12px", borderRight: 0, borderRadius: "4px 0 0 4px" }} />
                                <input type="text" className="form-control form-control-sm text-center" defaultValue="23rd February 2026" style={{ width: "140px", fontSize: "12px", borderRadius: "0 4px 4px 0" }} />
                            </div>
                        )}

                        {(activeTab !== "Logged in-out") && (
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
                                style={{ width: "160px", background: "#fff" }}
                            />
                            <i className="bi bi-search position-absolute end-0 top-50 translate-middle-y me-2 text-muted" style={{ fontSize: "12px" }}></i>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderTableHeader = () => {
        switch (activeTab) {
            case "Summary":
                return (
                    <tr style={{ borderBottom: "1px solid #eee" }}>
                        <th className="fw-semibold text-dark" style={{ fontSize: "13px", borderRight: '1px solid #eee' }}>Team Member <i className="bi bi-chevron-down ms-1 text-muted" style={{ fontSize: "10px" }}></i></th>
                        <th className="fw-semibold text-dark text-center" style={{ fontSize: "13px", borderRight: '1px solid #eee', width: '20%' }}>Duration</th>
                        <th className="fw-semibold text-dark text-center" style={{ fontSize: "13px", width: '20%' }}>Hours</th>
                    </tr>
                );
            case "Summary details":
                return (
                    <tr style={{ borderBottom: "1px solid #eee" }}>
                        <th className="fw-semibold text-dark" style={{ fontSize: "13px", borderRight: '1px solid #eee' }}>Team Member <i className="bi bi-chevron-down ms-1 text-muted" style={{ fontSize: "10px" }}></i></th>
                        <th className="fw-semibold text-dark" style={{ fontSize: "13px", borderRight: '1px solid #eee', width: '20%' }}>Date</th>
                        <th className="fw-semibold text-dark text-center" style={{ fontSize: "13px", borderRight: '1px solid #eee', width: '20%' }}>Duration</th>
                        <th className="fw-semibold text-dark text-center" style={{ fontSize: "13px", width: '20%' }}>Hours</th>
                    </tr>
                );
            case "User Report":
                return (
                    <tr style={{ borderBottom: "1px solid #eee" }}>
                        <th className="fw-semibold text-dark" style={{ fontSize: "13px", borderRight: '1px solid #eee' }}>Team Member</th>
                        <th className="fw-semibold text-dark text-center" style={{ fontSize: "13px", borderRight: '1px solid #eee' }}>Total Days</th>
                        <th className="fw-semibold text-dark text-center" style={{ fontSize: "13px", borderRight: '1px solid #eee' }}>Working Days</th>
                        <th className="fw-semibold text-dark text-center" style={{ fontSize: "13px", borderRight: '1px solid #eee' }}>Present</th>
                        <th className="fw-semibold text-dark text-center" style={{ fontSize: "13px", borderRight: '1px solid #eee' }}>WFO</th>
                        <th className="fw-semibold text-dark text-center" style={{ fontSize: "13px", borderRight: '1px solid #eee' }}>WFH</th>
                        <th className="fw-semibold text-dark text-center" style={{ fontSize: "13px", borderRight: '1px solid #eee' }}>Absent</th>
                        <th className="fw-semibold text-dark text-center" style={{ fontSize: "13px", borderRight: '1px solid #eee' }}>Over Time</th>
                        <th className="fw-semibold text-dark text-center" style={{ fontSize: "13px" }}>Leave without pay</th>
                    </tr>
                );
            case "User Summary details":
                return (
                    <tr style={{ borderBottom: "1px solid #eee" }}>
                        <th className="fw-semibold text-dark" style={{ fontSize: "13px", borderRight: '1px solid #eee', width: '15%' }}>Date</th>
                        <th className="fw-semibold text-dark" style={{ fontSize: "13px", borderRight: '1px solid #eee', width: '15%' }}>In Time</th>
                        <th className="fw-semibold text-dark" style={{ fontSize: "13px", borderRight: '1px solid #eee', width: '15%' }}>Out Time</th>
                        <th className="fw-semibold text-dark" style={{ fontSize: "13px", borderRight: '1px solid #eee', width: '15%' }}>Duration</th>
                        <th className="fw-semibold text-dark" style={{ fontSize: "13px" }}>Description</th>
                    </tr>
                );
            case "Members Logged":
                return (
                    <tr style={{ borderBottom: "1px solid #eee" }}>
                        <th className="fw-semibold text-dark" style={{ fontSize: "13px", borderRight: '1px solid #eee' }}>Team member</th>
                        <th className="fw-semibold text-dark" style={{ fontSize: "13px", borderRight: '1px solid #eee', width: '30%' }}>
                            In Date <i className="bi bi-chevron-down ms-1 text-muted" style={{ fontSize: "10px" }}></i>
                        </th>
                        <th className="fw-semibold text-dark" style={{ fontSize: "13px", width: '30%' }}>In Time</th>
                    </tr>
                );
            case "Logged in-out":
                return (
                    <tr style={{ borderBottom: "1px solid #eee" }}>
                        <th className="fw-semibold text-dark" style={{ fontSize: "13px", borderRight: '1px solid #eee' }}>Team member <i className="bi bi-chevron-up ms-1 text-muted" style={{ fontSize: "10px" }}></i></th>
                        <th className="fw-semibold text-dark" style={{ fontSize: "13px", borderRight: '1px solid #eee', width: '25%' }}>Status <i className="bi bi-chevron-down ms-1 text-muted" style={{ fontSize: "10px" }}></i></th>
                        <th className="fw-semibold text-dark text-center" style={{ fontSize: "13px", width: '25%' }}>Logged in-out</th>
                    </tr>
                );
            case "Daily":
            case "Custom":
            default:
                return (
                    <tr style={{ borderBottom: "1px solid #eee" }}>
                        <th className="fw-semibold text-dark" style={{ fontSize: "13px", borderRight: '1px solid #eee' }}>Team Member</th>
                        <th className="fw-semibold text-dark" style={{ fontSize: "13px", borderRight: '1px solid #eee' }}>
                            In Date <i className="bi bi-chevron-down ms-1 text-muted" style={{ fontSize: "10px" }}></i>
                        </th>
                        <th className="fw-semibold text-dark" style={{ fontSize: "13px", borderRight: '1px solid #eee' }}>In Time</th>
                        <th className="fw-semibold text-dark" style={{ fontSize: "13px", borderRight: '1px solid #eee' }}>Out Date</th>
                        <th className="fw-semibold text-dark" style={{ fontSize: "13px", borderRight: '1px solid #eee' }}>Out Time</th>
                        <th className="fw-semibold text-dark text-center" style={{ fontSize: "13px", borderRight: '1px solid #eee' }}>Duration</th>
                        <th style={{ width: "40px", borderRight: '1px solid #eee' }} className="text-center"><i className="bi bi-chat-dots"></i></th>
                        <th style={{ width: "40px" }} className="text-center"><i className="bi bi-list"></i></th>
                    </tr>
                );
        }
    };

    const renderTableRows = () => {
        if (activeTab === "Logged in-out") {
            return (
                <tr>
                    <td className="p-2 border-end">
                        <div className="d-flex align-items-center gap-2">
                            <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '28px', height: '28px' }}>
                                <i className="bi bi-person text-secondary"></i>
                            </div>
                            <span style={{ fontSize: "13px" }}>Shakshi Rawat</span>
                        </div>
                    </td>
                    <td className="p-2 border-end text-muted" style={{ fontSize: "13px" }}>Not Logged in yet</td>
                    <td className="p-2 text-center">
                        <button className="btn btn-sm btn-white border px-3" style={{ fontSize: "12px" }}>
                            <i className="bi bi-box-arrow-in-right me-1"></i> Log In
                        </button>
                    </td>
                </tr>
            );
        }

        return (
            <tr>
                <td colSpan={15} className="text-center py-4 text-muted" style={{ fontSize: "13px" }}>
                    No record found.
                </td>
            </tr>
        );
    }

    return (
        <div className="time-cards-page p-1">
            {/* ⭐ HEADER & TOP BUTTON */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0 fw-bold">Time Cards</h4>
                <div className="d-flex align-items-center gap-4">
                    <button
                        className="btn btn-light border d-flex align-items-center px-3 shadow-sm bg-white"
                        style={{ borderRadius: "8px", fontSize: "13px" }}
                        onClick={() => setShowAddModal(true)}
                    >
                        <i className="bi bi-plus-circle me-2"></i> Add time manually
                    </button>
                </div>
            </div>

            {showAddModal && <AddTimeModal onClose={() => setShowAddModal(false)} />}

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

            {/* ⭐ LEGEND (ONLY FOR USER SUMMARY DETAILS) */}
            {activeTab === "User Summary details" && (
                <div className="d-flex justify-content-end mb-2">
                    <div className="d-flex align-items-center gap-3 pe-2">
                        <div className="d-flex align-items-center gap-1 small"><span className="badge p-1" style={{ width: '14px', height: '14px', background: '#00c38e', borderRadius: '4px' }}> </span> Overtime</div>
                        <div className="d-flex align-items-center gap-1 small"><span className="badge p-1" style={{ width: '14px', height: '14px', background: '#3498db', borderRadius: '4px' }}> </span> Sunday</div>
                        <div className="d-flex align-items-center gap-1 small"><span className="badge p-1" style={{ width: '14px', height: '14px', background: '#ff4d4d', borderRadius: '4px' }}> </span> Absent</div>
                        <div className="d-flex align-items-center gap-1 small"><span className="badge p-1" style={{ width: '14px', height: '14px', background: '#f39c12', borderRadius: '4px' }}> </span> Official leave</div>
                    </div>
                </div>
            )}

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
                            {renderTableRows()}
                        </tbody>
                    </table>
                </div>

                {/* ⭐ PAGINATION */}
                <div className="card-footer bg-white border-top d-flex justify-content-between align-items-center py-2 px-3">
                    <span className="text-muted" style={{ fontSize: "12px" }}>{activeTab === "Logged in-out" ? "1-1 / 1" : "0-0 / 0"}</span>
                    <nav>
                        <ul className="pagination pagination-sm mb-0">
                            <li className="page-item disabled">
                                <a className="page-link border bg-light text-muted" href="#" style={{ borderRadius: '4px 0 0 4px' }}>«</a>
                            </li>
                            <li className="page-item active">
                                <a className="page-link border text-dark bg-light px-2 fw-medium" href="#">1</a>
                            </li>
                            <li className="page-item disabled">
                                <a className="page-link border bg-light text-muted" href="#" style={{ borderRadius: '0 4px 4px 0' }}>»</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <style>{`
        .table-bordered th, .table-bordered td { border: 1px solid #eee !important; }
        .table-light { background-color: #fcfcfc; }
        .btn-white { background: #fff; color: #333; }
        .btn-white:hover { background: #f8f9fa; }
      `}</style>
        </div>
    );
}
