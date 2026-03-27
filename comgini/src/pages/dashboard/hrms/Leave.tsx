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
                        {activeTab === "Summary" && (
                            <>
                                <select className="form-select form-select-sm" style={{ width: "150px", fontSize: "12px", color: "#666" }}>
                                    <option>- Team member -</option>
                                </select>
                                <select className="form-select form-select-sm" style={{ width: "130px", fontSize: "12px", color: "#666" }}>
                                    <option>- Leave type -</option>
                                </select>
                            </>
                        )}

                        {(activeTab !== "Pending approval") && (
                            <div className="btn-group btn-group-sm ms-1">
                                <button className="btn btn-light border bg-white px-2">
                                    <i className="bi bi-chevron-left"></i>
                                </button>
                                <button className="btn btn-light border bg-white px-3" style={{ fontSize: "12px" }}>
                                    {activeTab === "All applications" ? "February 2026" : "2026"}
                                </button>
                                <button className="btn btn-light border bg-white px-2">
                                    <i className="bi bi-chevron-right"></i>
                                </button>
                            </div>
                        )}

                        <div className="d-flex align-items-center gap-1 ms-1">
                            <button className="btn btn-sm btn-light border bg-white px-3" style={{ fontSize: "12px", color: "#666" }}>Excel</button>
                            <button className="btn btn-sm btn-light border bg-white px-3" style={{ fontSize: "12px", color: "#666" }}>Print</button>
                        </div>

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
                        <th className="fw-semibold text-dark" style={{ fontSize: "13px", borderRight: '1px solid #eee' }}>
                            Applicant <i className="bi bi-chevron-up ms-1 text-muted" style={{ fontSize: "10px" }}></i>
                        </th>
                        <th className="fw-semibold text-dark" style={{ fontSize: "13px", borderRight: '1px solid #eee' }}>Leave type</th>
                        <th className="fw-semibold text-dark" style={{ fontSize: "13px" }}>Total leave (Yearly)</th>
                    </tr>
                );
            case "Pending approval":
            case "All applications":
                return (
                    <tr style={{ borderBottom: "1px solid #eee" }}>
                        <th className="fw-semibold text-dark" style={{ fontSize: "13px", borderRight: '1px solid #eee' }}>
                            Applicant <i className="bi bi-chevron-up ms-1 text-muted" style={{ fontSize: "10px" }}></i>
                        </th>
                        <th className="fw-semibold text-dark" style={{ fontSize: "13px", borderRight: '1px solid #eee' }}>Leave type</th>
                        <th className="fw-semibold text-dark" style={{ fontSize: "13px", borderRight: '1px solid #eee' }}>Date</th>
                        <th className="fw-semibold text-dark" style={{ fontSize: "13px", borderRight: '1px solid #eee' }}>Duration</th>
                        <th className="fw-semibold text-dark" style={{ fontSize: "13px", borderRight: '1px solid #eee' }}>Status</th>
                        <th style={{ width: "40px" }} className="text-center">
                            <i className="bi bi-list"></i>
                        </th>
                    </tr>
                );
            case "Official Leave":
            default:
                return (
                    <tr style={{ borderBottom: "1px solid #eee" }}>
                        <th className="fw-semibold text-dark" style={{ fontSize: "13px", borderRight: '1px solid #eee' }}>Event</th>
                        <th className="fw-semibold text-dark" style={{ fontSize: "13px", borderRight: '1px solid #eee' }}>
                            Date <i className="bi bi-chevron-up ms-1 text-muted" style={{ fontSize: "10px" }}></i>
                        </th>
                        <th className="fw-semibold text-dark" style={{ fontSize: "13px", borderRight: '1px solid #eee' }}>Type</th>
                        <th style={{ width: "40px" }} className="text-center">
                            <i className="bi bi-list"></i>
                        </th>
                    </tr>
                );
        }
    };

    return (
        <div className="leave-page p-1">
            {/* ⭐ HEADER & TOP BUTTONS */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0 fw-bold">Leave</h4>
                <div className="d-flex gap-2">
                    <button
                        className="btn btn-light border d-flex align-items-center px-3 shadow-sm bg-white"
                        style={{ borderRadius: "8px", fontSize: "13px" }}
                        onClick={() => setShowApplyModal(true)}
                    >
                        <i className="bi bi-plus-circle me-2"></i> Apply Leave
                    </button>
                    <button
                        className="btn btn-light border d-flex align-items-center px-3 shadow-sm bg-white"
                        style={{ borderRadius: "8px", fontSize: "13px" }}
                        onClick={() => setShowAssignModal(true)}
                    >
                        <i className="bi bi-plus-circle me-2"></i> Assign Leave
                    </button>
                </div>
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

            {/* ⭐ SUB-TOOLBAR */}
            {activeTab === "Official Leave" && (
                <div className="d-flex justify-content-end mb-3">
                    <button
                        className="btn btn-light border d-flex align-items-center px-3 shadow-sm bg-white"
                        style={{ borderRadius: "8px", fontSize: "13px" }}
                        onClick={() => setShowHolidayModal(true)}
                    >
                        <i className="bi bi-plus-circle me-2"></i> Official holiday
                    </button>
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
                            {isLoading ? (
                                <tr>
                                    <td colSpan={10} className="text-center py-4">
                                        <div className="spinner-border spinner-border-sm text-primary me-2"></div>
                                        Loading...
                                    </td>
                                </tr>
                            ) : (activeTab === "Pending approval" || activeTab === "All applications") && filteredLeaves.length > 0 ? (
                                filteredLeaves.map((leave) => (
                                    <tr key={leave.id}>
                                        <td style={{ fontSize: "13px" }}>Employee #{leave.employee_id}</td>
                                        <td style={{ fontSize: "13px" }}>{leave.leave_type}</td>
                                        <td style={{ fontSize: "13px" }}>{new Date(leave.start_date).toLocaleDateString()} – {new Date(leave.end_date).toLocaleDateString()}</td>
                                        <td style={{ fontSize: "13px" }}>{leave.total_days} day(s)</td>
                                        <td>
                                            <span className={`badge ${leave.status === 'approved' ? 'bg-success' : leave.status === 'rejected' ? 'bg-danger' : 'bg-warning text-dark'}`}>
                                                {leave.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            {leave.status === "pending" && (
                                                <div className="d-flex gap-1 justify-content-center">
                                                    <button
                                                        className="btn btn-sm btn-success py-0 px-2"
                                                        onClick={() => handleApproveReject(leave.id, "approved")}
                                                    >
                                                        ✓
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-outline-danger py-0 px-2"
                                                        onClick={() => handleApproveReject(leave.id, "rejected")}
                                                    >
                                                        ✗
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={10} className="text-center py-4 text-muted" style={{ fontSize: "13px" }}>
                                        No record found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* ⭐ PAGINATION */}
                <div className="card-footer bg-white border-top d-flex justify-content-between align-items-center py-2 px-3">
                    <span className="text-muted" style={{ fontSize: "12px" }}>
                        {filteredLeaves.length > 0 ? `1-${filteredLeaves.length} / ${filteredLeaves.length}` : "0-0 / 0"}
                    </span>
                    <nav>
                        <ul className="pagination pagination-sm mb-0">
                            <li className="page-item disabled">
                                <a className="page-link border bg-light text-muted" href="#" style={{ borderRadius: '4px 0 0 4px' }}>«</a>
                            </li>
                            <li className="page-item disabled">
                                <a className="page-link border bg-light text-muted" href="#" style={{ borderRadius: '0 4px 4px 0' }}>»</a>
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
                .table-light { background-color: #fcfcfc; }
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                }
                .modal-box {
                    background: white;
                    border-radius: 12px;
                    width: 100%;
                    max-width: 600px;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                }
            `}</style>
        </div>
    );
}
