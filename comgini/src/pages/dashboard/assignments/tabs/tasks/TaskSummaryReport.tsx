import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import tasksService from "../../../../../services/tasksService";

export default function TaskSummaryReport() {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await tasksService.getAllTasks(1, 300);
                if (res.data && Array.isArray(res.data.data)) {
                    setTasks(res.data.data);
                } else if (Array.isArray(res.data)) {
                    setTasks(res.data);
                } else if (res.data && Array.isArray(res.data.tasks)) {
                    setTasks(res.data.tasks);
                }
            } catch (error) {
                console.error("Failed to fetch tasks for report", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, []);

    const getStatusType = (status: string) => {
        const s = status?.toLowerCase();
        if (["completed", "executed"].includes(s)) return "completed";
        if (["inprogress", "in_progress", "in_request", "further_processing"].includes(s)) return "inprogress";
        if (["cancelled"].includes(s)) return "cancelled";
        return "todo";
    };

    // Calculate Summary
    const totalCount = tasks.length;
    const completedCount = tasks.filter(t => getStatusType(t.status) === "completed").length;
    const inProgressCount = tasks.filter(t => getStatusType(t.status) === "inprogress").length;
    const cancelledCount = tasks.filter(t => getStatusType(t.status) === "cancelled").length;

    // Group by Staff
    const staffMap: { [key: string]: any } = {};
    tasks.forEach(task => {
        const staffName = task.assigned_to_name || task.staff_name || (task.assigned_to ? `Staff #${task.assigned_to}` : "Unassigned");
        if (!staffMap[staffName]) {
            staffMap[staffName] = { name: staffName, total: 0, completed: 0, inprogress: 0, cancelled: 0 };
        }
        const s = staffMap[staffName];
        s.total++;
        const type = getStatusType(task.status);
        if (type === "completed") s.completed++;
        else if (type === "inprogress") s.inprogress++;
        else if (type === "cancelled") s.cancelled++;
    });

    const staffData = Object.values(staffMap);

    const [selectedStaff, setSelectedStaff] = useState<string | null>(null);

    const getStaffTasks = () => {
        if (!selectedStaff) return [];
        return tasks.filter(task => {
            const staffName = task.assigned_to_name || task.staff_name || (task.assigned_to ? `Staff #${task.assigned_to}` : "Unassigned");
            return staffName === selectedStaff;
        });
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center p-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-2">
            {/* Summary Cards */}
            <div className="row g-3 mb-4">
                {[
                    { label: "Total Tasks", value: totalCount, color: "primary" },
                    { label: "Completed", value: completedCount, color: "success" },
                    { label: "In Progress", value: inProgressCount, color: "warning" },
                    { label: "Cancelled", value: cancelledCount, color: "danger" },
                ].map((item) => (
                    <div key={item.label} className="col-6 col-md-3">
                        <div className={`card border-0 shadow-sm text-center rounded-4`}>
                            <div className="card-body py-4">
                                <div className={`fw-bold fs-2 text-${item.color}`}>{item.value}</div>
                                <div className="small text-muted fw-semibold">{item.label}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Report Table */}
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-5">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light">
                            <tr>
                                <th className="px-4 py-3 border-0">Staff</th>
                                <th className="text-center py-3 border-0">Total Tasks</th>
                                <th className="text-center py-3 border-0">Completed</th>
                                <th className="text-center py-3 border-0">In Progress</th>
                                <th className="text-center py-3 border-0">Cancelled</th>
                                <th className="text-center py-3 border-0">Completion %</th>
                            </tr>
                        </thead>
                        <tbody>
                            {staffData.length > 0 ? staffData.map((staff, idx) => {
                                const completionRate = staff.total > 0 ? Math.round((staff.completed / staff.total) * 100) : 0;
                                return (
                                    <tr key={idx}>
                                        <td className="px-4 py-3">
                                            <button 
                                                className="btn btn-link p-0 fw-bold text-decoration-none text-primary"
                                                onClick={() => setSelectedStaff(staff.name)}
                                            >
                                                {staff.name}
                                            </button>
                                        </td>
                                        <td className="text-center py-3">{staff.total}</td>
                                        <td className="text-center py-3 text-success fw-bold">{staff.completed}</td>
                                        <td className="text-center py-3 text-warning fw-bold">{staff.inprogress}</td>
                                        <td className="text-center py-3 text-danger fw-bold">{staff.cancelled}</td>
                                        <td className="text-center py-3">
                                            <div className="d-flex align-items-center justify-content-center gap-2">
                                                <div className="progress flex-grow-1" style={{ height: "6px", maxWidth: "100px", minWidth: "60px" }}>
                                                    <div
                                                        className={`progress-bar bg-${completionRate === 100 ? 'success' : 'primary'}`}
                                                        style={{ width: `${completionRate}%` }}
                                                    ></div>
                                                </div>
                                                <span className="small fw-bold">{completionRate}%</span>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            }) : (
                                <tr>
                                    <td colSpan={6} className="text-center py-5 text-muted">No data available for report</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Staff Tasks Modal */}
            {selectedStaff && (
                <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content border-0 shadow rounded-4">
                            <div className="modal-header border-0 px-4 pt-4">
                                <h5 className="modal-title fw-bold">Tasks for {selectedStaff}</h5>
                                <button type="button" className="btn-close" onClick={() => setSelectedStaff(null)}></button>
                            </div>
                            <div className="modal-body p-0">
                                <div className="list-group list-group-flush">
                                    {getStaffTasks().map(task => (
                                        <div 
                                            key={task.id} 
                                            className="list-group-item px-4 py-3 border-bottom d-flex justify-content-between align-items-center list-group-item-action cursor-pointer border-0"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => navigate(`/assignments/tasks/${task.id}`)}
                                        >
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="rounded-circle bg-primary-subtle p-2 text-primary">
                                                    <i className="bi bi-file-earmark-text"></i>
                                                </div>
                                                <div>
                                                    <div className="fw-bold text-dark">{task.title}</div>
                                                    <div className="small text-muted">ID: T-{task.id} • <span className="text-capitalize">{task.priority}</span> Priority</div>
                                                </div>
                                            </div>
                                            <span className={`badge rounded-pill px-3 py-2 ${
                                                getStatusType(task.status) === "completed" ? "bg-success-subtle text-success" :
                                                getStatusType(task.status) === "inprogress" ? "bg-warning-subtle text-warning" :
                                                getStatusType(task.status) === "cancelled" ? "bg-danger-subtle text-danger" :
                                                "bg-secondary-subtle text-secondary"
                                            }`}>
                                                {task.status?.replace("_", " ") || "No Status"}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="modal-footer border-0 p-4 pt-0">
                                <button type="button" className="btn btn-light rounded-pill px-4" onClick={() => setSelectedStaff(null)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
