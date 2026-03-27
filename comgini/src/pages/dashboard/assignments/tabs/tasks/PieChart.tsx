import { useState, useEffect } from "react";
import { PieChart as RPieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import tasksService from "../../../../../services/tasksService";

export default function PieChart() {
    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await tasksService.getAllTasks(1, 200);
                if (res.data && Array.isArray(res.data.data)) {
                    setTasks(res.data.data);
                } else if (Array.isArray(res.data)) {
                    setTasks(res.data);
                } else if (res.data && Array.isArray(res.data.tasks)) {
                    setTasks(res.data.tasks);
                }
            } catch (error) {
                console.error("Failed to fetch tasks for PieChart", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, []);

    const getCount = (statuses: string[]) => tasks.filter(t => statuses.includes(t.status?.toLowerCase())).length;
    const starredCount = tasks.filter(t => t.is_starred).length;

    const data = [
        { name: "Starred", value: tasks.filter(t => t.is_starred).length, color: "#ffc107" },
        { name: "To Do", value: getCount(["todo", "pending", "pending_approval", "pending_review", "pending_signature"]), color: "#6c757d" },
        { name: "In Progress", value: getCount(["inprogress", "in_progress", "in_request", "further_processing"]), color: "#0d6efd" },
        { name: "Completed", value: getCount(["completed", "executed"]), color: "#198754" },
        { name: "Cancelled", value: getCount(["cancelled"]), color: "#dc3545" },
    ].filter(item => item.value > 0);

    // Fallback if no tasks
    const chartData = data.length > 0 ? data : [{ name: "No Data", value: 1, color: "#e9ecef" }];

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
        <div className="row g-4 pt-2">
            {/* Pie Chart */}
            <div className="col-md-6">
                <div className="card border-0 shadow-sm rounded-4">
                    <div className="card-body text-center p-4">
                        <h6 className="fw-bold mb-4">Tasks by Status</h6>
                        <div style={{ width: "100%", height: 260 }}>
                            <ResponsiveContainer>
                                <RPieChart>
                                    <Pie
                                        data={chartData}
                                        innerRadius={70}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </RPieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detailed Summary */}
            <div className="col-md-6">
                <div className="card border-0 shadow-sm rounded-4">
                    <div className="card-body p-4">
                        <h6 className="fw-bold mb-4">Task Analytics Summary</h6>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 py-2">
                                <span className="text-muted"><i className="bi bi-star-fill text-warning me-2"></i> Starred Tasks</span>
                                <span className="badge bg-warning-subtle text-warning rounded-pill px-3">{starredCount}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 py-2">
                                <span className="text-muted"><i className="bi bi-check-circle-fill text-success me-2"></i> Completed Tasks</span>
                                <span className="badge bg-success-subtle text-success rounded-pill px-3">{getCount(["completed", "executed"])}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 py-2">
                                <span className="text-muted"><i className="bi bi-x-circle-fill text-danger me-2"></i> Cancelled Tasks</span>
                                <span className="badge bg-danger-subtle text-danger rounded-pill px-3">{getCount(["cancelled"])}</span>
                            </li>
                            <div className="border-top my-3"></div>
                            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 py-2">
                                <span className="text-muted">In Progress</span>
                                <span className="fw-bold">{getCount(["inprogress", "in_progress", "in_request", "further_processing"])}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 py-2">
                                <span className="text-muted">To Do</span>
                                <span className="fw-bold">{getCount(["todo", "pending", "pending_approval", "pending_review", "pending_signature"])}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
