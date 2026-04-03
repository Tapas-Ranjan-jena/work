import { useState, useEffect } from "react";
import ApplyLeaveModal from "../../../components/modals/ApplyLeaveModal";
import AssignLeaveModal from "../../../components/modals/AssignLeaveModal";
import OfficialHolidayModal from "../../../components/modals/OfficialHolidayModal";
import hrmsService from "../../../services/hrms/hrms.service";
import type { LeaveRequest } from "../../../services/hrms/types";

export default function Leave() {
    const [activeTab, setActiveTab] = useState("Official Leave");
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [showHolidayModal, setShowHolidayModal] = useState(false);
    const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchLeaves = async () => {
        setIsLoading(true);
        try {
            const data = await hrmsService.getLeaves();
            setLeaves(data);
        } catch {
            // Silently fail if endpoint not available
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === "Pending approval" || activeTab === "All applications") {
            fetchLeaves();
        }
    }, [activeTab]);

    const handleApproveReject = async (id: number, status: 'approved' | 'rejected') => {
        try {
            await hrmsService.approveRejectLeave(id, status);
            fetchLeaves();
        } catch (err) {
            console.error("Failed to update leave:", err);
        }
    };

    const filteredLeaves = activeTab === "Pending approval"
        ? leaves.filter((l) => l.status === "pending")
        : leaves;

    const tabs = [
        "Official Leave",
        "Pending approval",
        "All applications",
        "Summary",
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
                        {activeTab === "Summary" && (
                            <div className="d-flex flex-column flex-sm-row gap-2 w-100 w-md-auto">
                                <select className="form-select form-select-sm flex-fill py-2 py-md-1" style={{ minWidth: "150px", fontSize: "12px", color: "#666" }}>
                                    <option>- Team member -</option>
                                </select>
                                <select className="form-select form-select-sm flex-fill py-2 py-md-1" style={{ minWidth: "130px", fontSize: "12px", color: "#666" }}>
                                    <option>- Leave type -</option>
                                </select>
                            </div>
                        )}

                        {(activeTab !== "Pending approval") && (
                            <div className="btn-group btn-group-sm w-100 w-md-auto">
                                <button className="btn btn-light border bg-white px-2 py-2 py-md-1">
                                    <i className="bi bi-chevron-left"></i>
                                </button>
                                <button className="btn btn-light border bg-white px-4 fw-medium py-2 py-md-1" style={{ fontSize: "12px" }}>
                                    {activeTab === "All applications" ? "February 2026" : "2026"}
                                </button>
                                <button className="btn btn-light border bg-white px-2 py-2 py-md-1">
                                    <i className="bi bi-chevron-right"></i>
                                </button>
                            </div>
                        )}

                        <div className="d-flex align-items-center gap-2 w-100 w-md-auto mt-2 mt-md-0">
                            <button className="btn btn-sm btn-light border bg-white px-3 flex-fill py-2 py-md-1" style={{ fontSize: "12px", color: "#666" }}>Excel</button>
                            <button className="btn btn-sm btn-light border bg-white px-3 flex-fill py-2 py-md-1" style={{ fontSize: "12px", color: "#666" }}>Print</button>
                        </div>

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
        switch (activeTab) {
            case "Summary":
                return (
                    <tr style={{ borderBottom: "1px solid #eee" }} className="text-nowrap">
                        <th className="fw-semibold text-dark px-3" style={{ fontSize: "13px", minWidth: "200px" }}>
                            Applicant <i className="bi bi-chevron-up ms-1 text-muted" style={{ fontSize: "10px" }}></i>
                        </th>
                        <th className="fw-semibold text-dark px-3" style={{ fontSize: "13px", minWidth: "150px" }}>Leave type</th>
                        <th className="fw-semibold text-dark px-3" style={{ fontSize: "13px", minWidth: "150px" }}>Total leave (Yearly)</th>
                    </tr>
                );
            case "Pending approval":
            case "All applications":
                return (
                    <tr style={{ borderBottom: "1px solid #eee" }} className="text-nowrap">
                        <th className="fw-semibold text-dark px-3" style={{ fontSize: "13px", minWidth: "200px" }}>
                            Applicant <i className="bi bi-chevron-up ms-1 text-muted" style={{ fontSize: "10px" }}></i>
                        </th>
                        <th className="fw-semibold text-dark px-3" style={{ fontSize: "13px", minWidth: "150px" }}>Leave type</th>
                        <th className="fw-semibold text-dark px-3" style={{ fontSize: "13px", minWidth: "200px" }}>Date Range</th>
                        <th className="fw-semibold text-dark px-3" style={{ fontSize: "13px", minWidth: "100px" }}>Duration</th>
                        <th className="fw-semibold text-dark px-3" style={{ fontSize: "13px", minWidth: "100px" }}>Status</th>
                        <th style={{ width: "60px", minWidth: "60px" }} className="text-center px-3">
                            <i className="bi bi-list"></i>
                        </th>
                    </tr>
                );
            case "Official Leave":
            default:
                return (
                    <tr style={{ borderBottom: "1px solid #eee" }} className="text-nowrap">
                        <th className="fw-semibold text-dark px-3" style={{ fontSize: "13px", minWidth: "300px" }}>Event</th>
                        <th className="fw-semibold text-dark px-3" style={{ fontSize: "13px", minWidth: "150px" }}>
                            Date <i className="bi bi-chevron-up ms-1 text-muted" style={{ fontSize: "10px" }}></i>
                        </th>
                        <th className="fw-semibold text-dark px-3" style={{ fontSize: "13px", minWidth: "150px" }}>Type</th>
                        <th style={{ width: "60px", minWidth: "60px" }} className="text-center px-3">
                            <i className="bi bi-list"></i>
                        </th>
                    </tr>
                );
        }
    };

    return (
        <div className="leave-page p-2 p-md-4 text-start">
            {/* ⭐ HEADER & TOP BUTTONS */}
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3 w-100">
                <h4 className="mb-0 fw-bold text-nowrap">Leave</h4>
                <div className="d-flex align-items-center gap-2 ms-auto">
                    <button
                        className="btn btn-light border d-flex align-items-center justify-content-center px-3 py-1 shadow-sm bg-white text-nowrap"
                        style={{ borderRadius: "6px", fontSize: "12px", height: "34px", width: "fit-content" }}
                        onClick={() => setShowApplyModal(true)}
                    >
                        Apply Leave <i className="bi bi-plus-circle ms-2"></i>
                    </button>
                    <button
                        className="btn btn-light border d-flex align-items-center justify-content-center px-3 py-1 shadow-sm bg-white text-nowrap"
                        style={{ borderRadius: "6px", fontSize: "12px", height: "34px", width: "fit-content" }}
                        onClick={() => setShowAssignModal(true)}
                    >
                        Assign Leave <i className="bi bi-plus-circle ms-2"></i>
                    </button>
                </div>
            </div>

            {/* ⭐ TABS - Scrollable on mobile */}
            <div className="d-flex gap-4 mb-3 border-bottom overflow-auto pb-1 flex-nowrap" style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
                {tabs.map((tab) => (
                    <div
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className="flex-shrink-0"
                        style={{
                            cursor: "pointer",
                            fontSize: "13.5px",
                            paddingBottom: "10px",
                            borderBottom: activeTab === tab ? "3px solid #3346a8" : "3px solid transparent",
                            color: activeTab === tab ? "#3346a8" : "#666",
                            fontWeight: activeTab === tab ? "600" : "400",
                            whiteSpace: "nowrap",
                            userSelect: "none"
                        }}
                    >
                        {tab}
                    </div>
                ))}
            </div>

            {/* ⭐ SUB-TOOLBAR - Modernized stacking */}
            {activeTab === "Official Leave" && (
                <div className="d-flex justify-content-end mb-3">
                    <button
                        className="btn btn-light border d-flex align-items-center justify-content-center px-3 py-1 shadow-sm bg-white text-nowrap"
                        style={{ borderRadius: "6px", fontSize: "12px", height: "34px", width: "fit-content", fontWeight: "500" }}
                        onClick={() => setShowHolidayModal(true)}
                    >
                        Official holiday <i className="bi bi-plus-circle ms-2 text-primary"></i>
                    </button>
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
                            {isLoading ? (
                                <tr>
                                    <td colSpan={10} className="text-center py-5">
                                        <div className="spinner-border spinner-border-sm text-primary me-2"></div>
                                        Fetching leave information...
                                    </td>
                                </tr>
                            ) : (activeTab === "Pending approval" || activeTab === "All applications") && filteredLeaves.length > 0 ? (
                                filteredLeaves.map((leave) => (
                                    <tr key={leave.id} className="text-nowrap">
                                        <td className="px-3" style={{ fontSize: "13.5px" }}>Employee #{leave.employee_id}</td>
                                        <td className="px-3" style={{ fontSize: "13.5px" }}>{leave.leave_type}</td>
                                        <td className="px-3" style={{ fontSize: "13.5px" }}>{new Date(leave.start_date).toLocaleDateString()} – {new Date(leave.end_date).toLocaleDateString()}</td>
                                        <td className="px-3" style={{ fontSize: "13.5px" }}>{leave.total_days} day(s)</td>
                                        <td className="px-3">
                                            <span className={`badge ${leave.status === 'approved' ? 'bg-success' : leave.status === 'rejected' ? 'bg-danger' : 'bg-warning text-dark'}`} style={{ fontSize: "11px" }}>
                                                {leave.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="text-center px-3">
                                            {leave.status === "pending" ? (
                                                <div className="d-flex gap-2 justify-content-center">
                                                    <button
                                                        className="btn btn-sm btn-success px-3 py-1 fw-bold shadow-sm"
                                                        onClick={() => handleApproveReject(leave.id, "approved")}
                                                    >
                                                        ✓
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-outline-danger px-3 py-1 fw-bold shadow-sm"
                                                        onClick={() => handleApproveReject(leave.id, "rejected")}
                                                    >
                                                        ✗
                                                    </button>
                                                </div>
                                            ) : (
                                                <button className="btn btn-sm text-secondary border-0"><i className="bi bi-three-dots-vertical"></i></button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={10} className="text-center py-5 text-muted" style={{ fontSize: "13.5px" }}>
                                        No leave records found for this category.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* ⭐ PAGINATION */}
                <div className="card-footer bg-white border-top d-flex flex-column flex-sm-row justify-content-between align-items-center py-3 px-3 gap-3">
                    <span className="text-muted" style={{ fontSize: "12px" }}>
                        {filteredLeaves.length > 0 ? `Showing 1 to ${filteredLeaves.length} of ${filteredLeaves.length}` : "0-0 / 0 entries"}
                    </span>
                    <nav>
                        <ul className="pagination pagination-sm mb-0">
                            <li className="page-item disabled">
                                <a className="page-link border bg-light text-muted px-3" href="#">« Previous</a>
                            </li>
                            <li className="page-item disabled">
                                <a className="page-link border bg-light text-muted px-3" href="#">Next »</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            {/* ⭐ MODALS */}
            {showApplyModal && <ApplyLeaveModal onClose={() => setShowApplyModal(false)} onSuccess={fetchLeaves} />}
            {showAssignModal && <AssignLeaveModal onClose={() => setShowAssignModal(false)} />}
            {showHolidayModal && <OfficialHolidayModal onClose={() => setShowHolidayModal(false)} />}

            <style>{`
                .table-bordered th, .table-bordered td { border: 1px solid #eee !important; }
                .leave-page .table-light { background-color: #f7f9fc; }
                ::-webkit-scrollbar { height: 6px; }
                ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
                .badge { font-weight: 500; }
            `}</style>
        </div>
    );
}
