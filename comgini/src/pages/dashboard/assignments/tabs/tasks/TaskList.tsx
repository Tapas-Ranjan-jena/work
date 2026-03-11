import { useState, useEffect } from "react";
import tasksService from "../../../../../services/tasksService";

export default function TaskList() {
    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const res = await tasksService.getAllTasks(1, 100);
            console.log("Tasks response:", res);
            let parsedTasks = [];
            if (res.data && Array.isArray(res.data.data)) {
                parsedTasks = res.data.data;
            } else if (Array.isArray(res.data)) {
                parsedTasks = res.data;
            } else if (res.data && Array.isArray(res.data.tasks)) {
                parsedTasks = res.data.tasks;
            }
            setTasks(parsedTasks);
        } catch (error) {
            console.error("Failed to fetch tasks", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();

        const handleChildCreatedTask = () => fetchTasks();
        window.addEventListener("taskCreated", handleChildCreatedTask);

        return () => window.removeEventListener("taskCreated", handleChildCreatedTask);
    }, []);

    return (
        <div className="table-responsive border rounded">
            <table className="table table-sm table-bordered align-middle mb-0">
                <thead style={{ background: "#f4f5f7" }}>
                    <tr>
                        <th style={{ width: 40 }}>
                            <input type="checkbox" />
                        </th>
                        <th>Task</th>
                        <th>Assignee</th>
                        <th>Client</th>
                        <th>Priority</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th style={{ width: 40 }}>
                            <i className="bi bi-list"></i>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={8} className="text-center py-4">Loading tasks...</td>
                        </tr>
                    ) : tasks.length === 0 ? (
                        <tr>
                            <td colSpan={8} className="text-center py-4 text-muted">No tasks found.</td>
                        </tr>
                    ) : (
                        tasks.map((task) => (
                            <tr key={task.id}>
                                <td>
                                    <input type="checkbox" />
                                </td>
                                <td>
                                    <div className="fw-semibold text-primary">{task.title}</div>
                                </td>
                                <td>{task.assigned_to_name || "-"}</td>
                                <td>{task.client_name || "-"}</td>
                                <td>
                                    <span className={`badge ${task.priority === "high" ? "bg-danger" : task.priority === "low" ? "bg-info" : "bg-warning"}`}>
                                        {task.priority || "-"}
                                    </span>
                                </td>
                                <td>{task.due_date ? new Date(task.due_date).toLocaleDateString() : "-"}</td>
                                <td>
                                    <span className={`badge ${task.status === "completed" ? "bg-success" : task.status === "todo" ? "bg-secondary" : "bg-primary"}`}>
                                        {task.status || "-"}
                                    </span>
                                </td>
                                <td>
                                    <button className="btn btn-sm btn-light border" title="Actions are currently unsupported">
                                        <i className="bi bi-three-dots-vertical"></i>
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}
