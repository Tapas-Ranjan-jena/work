import { useState, useEffect } from "react";
import AddTimeModal from "../../../components/modals/AddTimeModal";
import hrmsService from "../../../services/hrms/hrms.service";
import type { AttendanceRecord } from "../../../services/hrms/types";

export default function TimeCards() {
    const [activeTab, setActiveTab] = useState("Daily");
    const [showAddModal, setShowAddModal] = useState(false);
    const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
    const [isLoadingAttendance, setIsLoadingAttendance] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const fetchAttendance = async () => {
        setIsLoadingAttendance(true);
        try {
            const data = await hrmsService.getAttendance(selectedMonth, selectedYear);
            setAttendance(data);
        } catch {
            // Silently fail
        } finally {
            setIsLoadingAttendance(false);
        }
    };

    useEffect(() => {
        if (activeTab === "Daily") {
            fetchAttendance();
        }
    }, [activeTab, selectedMonth, selectedYear]);

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
            <div className="card shadow-sm border-0 mb-4 overflow-visible">
                <div className="card-body p-3 bg-white rounded">
                    <div className="row g-3 align-items-center">
                        {/* ROWS PER PAGE & EYE ICON */}
                        <div className="col-auto d-flex align-items-center gap-2">
                            <select className="form-select form-select-sm border-light-subtle shadow-sm" style={{ width: "75px", height: "38px" }}>
                                <option value="100">100</option>
                                <option value="50">50</option>
                                <option value="25">25</option>
                            </select>
                            <button className="btn btn-sm btn-light border bg-white shadow-sm d-flex align-items-center justify-content-center" style={{ height: "38px", width: "38px" }}>
                                <i className={activeTab === "Members Logged" ? "bi bi-arrow-clockwise" : "bi bi-eye-slash"}></i>
                            </button>
                        </div>

                        {/* FILTERS CONTAINER */}
                        <div className="col flex-grow-1">
                            <div className="d-flex flex-wrap align-items-center justify-content-md-end gap-2 text-nowrap">
                                {(activeTab === "User Summary details" || activeTab === "Logged in-out") && (
                                    <select className="form-select form-select-sm border-light-subtle shadow-sm" style={{ width: "130px", height: "38px" }}>
                                        <option>- Status -</option>
                                    </select>
                                )}

                                {(activeTab !== "Members Logged" && activeTab !== "Logged in-out") && (
                                    <select className="form-select form-select-sm border-light-subtle shadow-sm" style={{ width: "150px", height: "38px" }}>
                                        <option>- Member -</option>
                                    </select>
                                )}

                                {activeTab === "Daily" || activeTab === "Members Logged" ? (
                                    activeTab === "Daily" ? (
                                        <div className="d-flex gap-2 align-items-center">
                                            <select
                                                className="form-select form-select-sm border-light-subtle shadow-sm"
                                                style={{ width: "85px", height: "38px" }}
                                                value={selectedMonth}
                                                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                                            >
                                                {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m, i) => (
                                                    <option key={i+1} value={i+1}>{m}</option>
                                                ))}
                                            </select>
                                            <select
                                                className="form-select form-select-sm border-light-subtle shadow-sm"
                                                style={{ width: "85px", height: "38px" }}
                                                value={selectedYear}
                                                onChange={(e) => setSelectedYear(Number(e.target.value))}
                                            >
                                                {[2023, 2024, 2025, 2026].map((y) => (
                                                    <option key={y} value={y}>{y}</option>
                                                ))}
                                            </select>
                                        </div>
                                    ) : (
                                        <div className="btn-group btn-group-sm shadow-sm" style={{ height: "38px" }}>
                                            <button className="btn btn-light border bg-white px-3"><i className="bi bi-chevron-left"></i></button>
                                            <button className="btn btn-light border bg-white px-3 fw-medium">Today</button>
                                            <button className="btn btn-light border bg-white px-3"><i className="bi bi-chevron-right"></i></button>
                                        </div>
                                    )
                                ) : activeTab === "Logged in-out" ? null : (
                                    <div className="d-flex gap-2">
                                        <input type="text" className="form-control form-control-sm border-light-subtle shadow-sm text-center" defaultValue="23rd Feb 2026" style={{ width: "120px", height: "38px" }} />
                                        <input type="text" className="form-control form-control-sm border-light-subtle shadow-sm text-center" defaultValue="23rd Feb 2026" style={{ width: "120px", height: "38px" }} />
                                    </div>
                                )}

                                {(activeTab !== "Logged in-out") && (
                                    <div className="d-flex gap-2">
                                        <button className="btn btn-sm btn-light border bg-white px-3 shadow-sm" style={{ height: "38px" }}>Excel</button>
                                        <button className="btn btn-sm btn-light border bg-white px-3 shadow-sm" style={{ height: "38px" }}>Print</button>
                                    </div>
                                )}

                                <div className="position-relative">
                                    <input
                                        type="text"
                                        className="form-control form-control-sm border-light-subtle shadow-sm ps-3 pe-5"
                                        placeholder="Search"
                                        style={{ width: "220px", height: "38px" }}
                                    />
                                    <i className="bi bi-search position-absolute end-0 top-50 translate-middle-y me-3 text-muted"></i>
                                </div>
                            </div>
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
                    <tr style={{ borderBottom: "1px solid #eee" }} className="text-nowrap">
                        <th className="fw-semibold text-dark px-3" style={{ fontSize: "13px", minWidth: "200px" }}>Team Member <i className="bi bi-chevron-down ms-1 text-muted" style={{ fontSize: "10px" }}></i></th>
                        <th className="fw-semibold text-dark text-center px-3" style={{ fontSize: "13px", minWidth: "120px" }}>Duration</th>
                        <th className="fw-semibold text-dark text-center px-3" style={{ fontSize: "13px", minWidth: "120px" }}>Hours</th>
                    </tr>
                );
            case "Summary details":
                return (
                    <tr style={{ borderBottom: "1px solid #eee" }} className="text-nowrap">
                        <th className="fw-semibold text-dark px-3" style={{ fontSize: "13px", minWidth: "200px" }}>Team Member <i className="bi bi-chevron-down ms-1 text-muted" style={{ fontSize: "10px" }}></i></th>
                        <th className="fw-semibold text-dark px-3" style={{ fontSize: "13px", minWidth: "150px" }}>Date</th>
                        <th className="fw-semibold text-dark text-center px-3" style={{ fontSize: "13px", minWidth: "120px" }}>Duration</th>
                        <th className="fw-semibold text-dark text-center px-3" style={{ fontSize: "13px", minWidth: "120px" }}>Hours</th>
                    </tr>
                );
            case "User Report":
                return (
                    <tr style={{ borderBottom: "1px solid #eee" }} className="text-nowrap">
                        <th className="fw-semibold text-dark px-3" style={{ fontSize: "13px", minWidth: "200px" }}>Team Member</th>
                        <th className="fw-semibold text-dark text-center px-3" style={{ fontSize: "13px", minWidth: "100px" }}>Total Days</th>
                        <th className="fw-semibold text-dark text-center px-3" style={{ fontSize: "13px", minWidth: "100px" }}>Working Days</th>
                        <th className="fw-semibold text-dark text-center px-3" style={{ fontSize: "13px", minWidth: "80px" }}>Present</th>
                        <th className="fw-semibold text-dark text-center px-3" style={{ fontSize: "13px", minWidth: "80px" }}>WFO</th>
                        <th className="fw-semibold text-dark text-center px-3" style={{ fontSize: "13px", minWidth: "80px" }}>WFH</th>
                        <th className="fw-semibold text-dark text-center px-3" style={{ fontSize: "13px", minWidth: "80px" }}>Absent</th>
                        <th className="fw-semibold text-dark text-center px-3" style={{ fontSize: "13px", minWidth: "100px" }}>Over Time</th>
                        <th className="fw-semibold text-dark text-center px-3" style={{ fontSize: "13px", minWidth: "150px" }}>Leave without pay</th>
                    </tr>
                );
            case "User Summary details":
                return (
                    <tr style={{ borderBottom: "1px solid #eee" }} className="text-nowrap">
                        <th className="fw-semibold text-dark px-3" style={{ fontSize: "13px", minWidth: "150px" }}>Date</th>
                        <th className="fw-semibold text-dark px-3" style={{ fontSize: "13px", minWidth: "150px" }}>In Time</th>
                        <th className="fw-semibold text-dark px-3" style={{ fontSize: "13px", minWidth: "150px" }}>Out Time</th>
                        <th className="fw-semibold text-dark px-3" style={{ fontSize: "13px", minWidth: "150px" }}>Duration</th>
                        <th className="fw-semibold text-dark px-3" style={{ fontSize: "13px", minWidth: "300px" }}>Description</th>
                    </tr>
                );
            case "Members Logged":
                return (
                    <tr style={{ borderBottom: "1px solid #eee" }} className="text-nowrap">
                        <th className="fw-semibold text-dark px-3" style={{ fontSize: "13px", minWidth: "200px" }}>Team member</th>
                        <th className="fw-semibold text-dark px-3" style={{ fontSize: "13px", minWidth: "150px" }}>
                            In Date <i className="bi bi-chevron-down ms-1 text-muted" style={{ fontSize: "10px" }}></i>
                        </th>
                        <th className="fw-semibold text-dark px-3" style={{ fontSize: "13px", minWidth: "150px" }}>In Time</th>
                    </tr>
                );
            case "Logged in-out":
                return (
                    <tr style={{ borderBottom: "1px solid #eee" }} className="text-nowrap">
                        <th className="fw-semibold text-dark px-3" style={{ fontSize: "13px", minWidth: "200px" }}>Team member <i className="bi bi-chevron-up ms-1 text-muted" style={{ fontSize: "10px" }}></i></th>
                        <th className="fw-semibold text-dark text-center px-3" style={{ fontSize: "13px", minWidth: "150px" }}>Status <i className="bi bi-chevron-down ms-1 text-muted" style={{ fontSize: "10px" }}></i></th>
                        <th className="fw-semibold text-dark text-center px-3" style={{ fontSize: "13px", minWidth: "150px" }}>Logged in-out</th>
                    </tr>
                );
            case "Daily":
            case "Custom":
            default:
                return (
                    <tr style={{ borderBottom: "1px solid #eee" }} className="text-nowrap">
                        <th className="fw-semibold text-dark px-3" style={{ fontSize: "13px", minWidth: "200px" }}>Team Member</th>
                        <th className="fw-semibold text-dark px-3" style={{ fontSize: "13px", minWidth: "150px" }}>
                            In Date <i className="bi bi-chevron-down ms-1 text-muted" style={{ fontSize: "10px" }}></i>
                        </th>
                        <th className="fw-semibold text-dark px-3" style={{ fontSize: "13px", minWidth: "120px" }}>In Time</th>
                        <th className="fw-semibold text-dark px-3" style={{ fontSize: "13px", minWidth: "150px" }}>Out Date</th>
                        <th className="fw-semibold text-dark px-3" style={{ fontSize: "13px", minWidth: "120px" }}>Out Time</th>
                        <th className="fw-semibold text-dark text-center px-3" style={{ fontSize: "13px", minWidth: "120px" }}>Duration</th>
                        <th style={{ width: "60px", minWidth: "60px" }} className="text-center px-3"><i className="bi bi-chat-dots"></i></th>
                        <th style={{ width: "60px", minWidth: "60px" }} className="text-center px-3"><i className="bi bi-list"></i></th>
                    </tr>
                );
        }
    };

    const renderTableRows = () => {
        if (activeTab === "Logged in-out") {
            return (
                <tr className="text-nowrap">
                    <td className="p-3 border-end">
                        <div className="d-flex align-items-center gap-2">
                            <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                                <i className="bi bi-person text-secondary"></i>
                            </div>
                            <span style={{ fontSize: "13px" }} className="fw-medium">Shakshi Rawat</span>
                        </div>
                    </td>
                    <td className="p-3 border-end text-center text-muted" style={{ fontSize: "13px" }}>Not Logged in yet</td>
                    <td className="p-3 text-center">
                        <button className="btn btn-sm btn-white border px-4 py-2 shadow-none" style={{ fontSize: "12px", borderRadius: "6px" }}>
                            <i className="bi bi-box-arrow-in-right me-1"></i> Log In
                        </button>
                    </td>
                </tr>
            );
        }

        if (activeTab === "Daily") {
            if (isLoadingAttendance) {
                return (
                    <tr>
                        <td colSpan={8} className="text-center py-5">
                            <div className="spinner-border spinner-border-sm text-primary me-2"></div>
                            Loading attendance records...
                        </td>
                    </tr>
                );
            }
            if (attendance.length === 0) {
                return (
                    <tr>
                        <td colSpan={8} className="text-center py-5 text-muted" style={{ fontSize: "13.5px" }}>
                            No attendance records for this period.
                        </td>
                    </tr>
                );
            }
            return (
                <>
                    {attendance.map((record) => (
                        <tr key={record.id} className="text-nowrap">
                            <td className="px-3 py-3" style={{ fontSize: "13px" }}>{record.first_name} {record.last_name}</td>
                            <td className="px-3" style={{ fontSize: "13px" }}>{record.date ? new Date(record.date).toLocaleDateString() : "-"}</td>
                            <td className="px-3" style={{ fontSize: "13px" }}>{record.in_time ? new Date(record.in_time).toLocaleTimeString() : "-"}</td>
                            <td className="px-3" style={{ fontSize: "13px" }}>{record.date ? new Date(record.date).toLocaleDateString() : "-"}</td>
                            <td className="px-3" style={{ fontSize: "13px" }}>{record.out_time ? new Date(record.out_time).toLocaleTimeString() : "-"}</td>
                            <td className="text-center px-3" style={{ fontSize: "13px" }}>{record.working_hours || "-"}</td>
                            <td className="text-center px-3">
                                <span className={`badge ${record.status === 'present' ? 'bg-success' : record.status === 'absent' ? 'bg-danger' : 'bg-warning text-dark'}`} style={{ fontSize: "11px" }}>
                                    {record.status?.toUpperCase()}
                                </span>
                            </td>
                            <td className="text-center px-3">
                                <button className="btn btn-sm text-secondary border-0"><i className="bi bi-three-dots-vertical"></i></button>
                            </td>
                        </tr>
                    ))}
                </>
            );
        }

        return (
            <tr>
                <td colSpan={15} className="text-center py-5 text-muted" style={{ fontSize: "13.5px" }}>
                    No records found for the selected view.
                </td>
            </tr>
        );
    }

    return (
        <div className="time-cards-page p-2 p-md-4 text-start">
            {/* ⭐ HEADER & TOP BUTTON */}
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3 w-100">
                <h4 className="mb-0 fw-bold text-nowrap">Time Cards</h4>
                <div className="d-flex align-items-center ms-auto">
                    <button
                        className="btn btn-light border d-flex align-items-center justify-content-center px-3 py-1 shadow-sm bg-white text-nowrap"
                        style={{ borderRadius: "6px", fontSize: "12px", height: "34px", width: "fit-content" }}
                        onClick={() => setShowAddModal(true)}
                    >
                        Add time manually <i className="bi bi-plus-circle ms-2"></i>
                    </button>
                </div>
            </div>

            {showAddModal && <AddTimeModal onClose={() => setShowAddModal(false)} />}

            {/* ⭐ TABS - Scrollable & Modern */}
            <div 
                className="d-flex gap-4 mb-4 border-bottom overflow-auto pb-1 scrollbar-hidden" 
                style={{ WebkitOverflowScrolling: "touch" }}
            >
                {tabs.map((tab) => (
                    <div
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className="flex-shrink-0"
                        style={{
                            cursor: "pointer",
                            fontSize: "14px",
                            padding: "8px 4px 12px 4px",
                            borderBottom: activeTab === tab ? "3px solid #3346a8" : "3px solid transparent",
                            color: activeTab === tab ? "#3346a8" : "#718096",
                            fontWeight: activeTab === tab ? "700" : "500",
                            transition: "all 0.2s ease",
                            whiteSpace: "nowrap"
                        }}
                    >
                        {tab}
                    </div>
                ))}
            </div>

            {/* ⭐ LEGEND (ONLY FOR USER SUMMARY DETAILS) */}
            {activeTab === "User Summary details" && (
                <div className="d-flex justify-content-start justify-content-md-end mb-3 overflow-auto pb-2 scrollbar-hidden">
                    <div className="d-flex align-items-center gap-4 pe-2 flex-nowrap">
                        <div className="d-flex align-items-center gap-2 small text-nowrap"><span className="badge p-1" style={{ width: '10px', height: '10px', background: '#00c38e', borderRadius: '50%' }}> </span> Overtime</div>
                        <div className="d-flex align-items-center gap-2 small text-nowrap"><span className="badge p-1" style={{ width: '10px', height: '10px', background: '#3498db', borderRadius: '50%' }}> </span> Sunday</div>
                        <div className="d-flex align-items-center gap-2 small text-nowrap"><span className="badge p-1" style={{ width: '10px', height: '10px', background: '#ff4d4d', borderRadius: '50%' }}> </span> Absent</div>
                        <div className="d-flex align-items-center gap-2 small text-nowrap"><span className="badge p-1" style={{ width: '10px', height: '10px', background: '#f39c12', borderRadius: '50%' }}> </span> Official leave</div>
                    </div>
                </div>
            )}

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
                            {renderTableRows()}
                        </tbody>
                    </table>
                </div>

                {/* ⭐ PAGINATION */}
                <div className="card-footer bg-white border-top d-flex flex-column flex-sm-row justify-content-between align-items-center py-3 px-3 gap-3">
                    <span className="text-muted" style={{ fontSize: "12px" }}>{activeTab === "Logged in-out" ? "1-1 / 1" : "0-0 / 0"} records</span>
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

            <style>{`
        .table-bordered th, .table-bordered td { border: 1px solid #eee !important; }
        .table-light { background-color: #f7f9fc; }
        .btn-white { background: #fff; color: #333; }
        .btn-white:hover { background: #f8f9fa; }
        .form-select-sm, .form-control-sm { border-color: #e2e8f0; }
        ::-webkit-scrollbar { height: 6px; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>
        </div>
    );
}
