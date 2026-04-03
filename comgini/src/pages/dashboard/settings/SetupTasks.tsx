import { useState } from "react";

export default function SetupTasks() {
    const [activeTab, setActiveTab] = useState("Task Status");

    const statuses = [
        { id: 1, name: "In progress", color: "#3b82f6" },
        { id: 2, name: "To do", color: "#ec4899" },
        { id: 3, name: "Under Review", color: "#f472b6" },
        { id: 4, name: "Pending with the Client", color: "#eab308" },
        { id: 5, name: "Pending for DSC", color: "#f97316" },
        { id: 6, name: "Pending for Approval", color: "#d97706" },
        { id: 7, name: "Pending for Billing", color: "#a8a29e" },
    ];

    const renderTabs = () => (
        <div className="d-flex gap-4 border-bottom mb-4 overflow-auto flex-nowrap scrollbar-hidden" style={{ WebkitOverflowScrolling: "touch" }}>
            {["Task Status", "Task settings"].map((tab) => (
                <div
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="flex-shrink-0"
                    style={{
                        cursor: "pointer",
                        fontSize: "14px",
                        paddingBottom: "12px",
                        borderBottom: activeTab === tab ? "3px solid #3346a8" : "3px solid transparent",
                        color: activeTab === tab ? "#3346a8" : "#64748b",
                        fontWeight: activeTab === tab ? "600" : "500",
                        whiteSpace: "nowrap",
                        userSelect: "none"
                    }}
                >
                    {tab}
                </div>
            ))}
        </div>
    );

    return (
        <div className="setup-tasks-page text-start">
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-4 gap-3">
                <h5 className="fw-bold mb-0">Tasks</h5>
                <button className="btn btn-outline-dark btn-sm d-flex align-items-center gap-2 px-3 py-2 shadow-sm bg-white w-100 w-sm-auto" style={{ borderRadius: "8px", fontSize: "13px" }}>
                    <i className="bi bi-plus-circle"></i> Add task status
                </button>
            </div>

            {renderTabs()}

            {activeTab === "Task Status" ? (
                <div className="card shadow-sm border-0 border-radius-10 overflow-hidden">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-light">
                                <tr className="text-nowrap">
                                    <th style={{ width: "50px" }} className="px-3 py-3"></th>
                                    <th className="fw-semibold px-3" style={{ minWidth: "250px", fontSize: "13.5px" }}>Status</th>
                                    <th style={{ width: "60px" }} className="text-center px-3"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {statuses.map((status) => (
                                    <tr key={status.id} className="text-nowrap">
                                        <td className="px-3 border-end">
                                            <div className="d-flex align-items-center justify-content-center" style={{ cursor: 'grab' }}>
                                                <i className="bi bi-list text-muted fs-5"></i>
                                            </div>
                                        </td>
                                        <td className="px-3 py-3">
                                            <div className="d-flex align-items-center gap-3">
                                                <div 
                                                    style={{ width: "16px", height: "16px", backgroundColor: status.color, borderRadius: "4px" }}
                                                    className="shadow-sm"
                                                ></div>
                                                <span className="fw-medium text-dark" style={{ fontSize: "14px" }}>{status.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-3 text-center">
                                            <button className="btn btn-sm text-secondary p-1 border-0"><i className="bi bi-pencil-square"></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="card shadow-sm border-0 border-radius-10 p-5 text-center text-muted">
                    Task settings configuration coming soon.
                </div>
            )}

            <style>{`
                .border-radius-10 { border-radius: 10px; }
                .scrollbar-hidden::-webkit-scrollbar { display: none; }
                .scrollbar-hidden { -ms-overflow-style: none; scrollbar-width: none; }
                .table-hover tbody tr:hover { background-color: #f8fafc; }
                .table th { background-color: #f1f5f9; color: #475569; }
                .table-responsive { border: 1px solid #e2e8f0; border-radius: 10px; }
            `}</style>
        </div>
    );
}
