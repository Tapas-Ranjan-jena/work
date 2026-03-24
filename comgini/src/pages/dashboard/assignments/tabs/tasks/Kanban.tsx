import { useState, useEffect } from "react";
import tasksService from "../../../../../services/tasksService";
import TaskCard from "./components/TaskCard";

export default function Kanban() {
    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const columns = [
        { id: "todo", label: "To Do", color: "#6c757d", statuses: ["todo", "pending", "pending_approval", "pending_review", "pending_signature"] },
        { id: "inprogress", label: "In Progress", color: "#0d6efd", statuses: ["inprogress", "in_progress", "in_request", "further_processing"] },
        { id: "completed", label: "Completed", color: "#198754", statuses: ["completed", "executed"] },
        { id: "cancelled", label: "Cancelled", color: "#dc3545", statuses: ["cancelled"] },
    ]

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                // Fetch a large batch for Kanban
                const res = await tasksService.getAllTasks(1, 100);
                if (res.data && Array.isArray(res.data.data)) {
                    setTasks(res.data.data);
                } else if (Array.isArray(res.data)) {
                    setTasks(res.data);
                } else if (res.data && Array.isArray(res.data.tasks)) {
                    setTasks(res.data.tasks);
                }
            } catch (error) {
                console.error("Failed to fetch tasks for Kanban", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const getTasksByColumn = (columnStatuses: string[]) => {
        return tasks.filter(task => columnStatuses.includes(task.status?.toLowerCase()));
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
        <div className="d-flex gap-3 overflow-auto pb-4" style={{ minHeight: "70vh" }}>
            {columns.map((col) => {
                const columnTasks = getTasksByColumn(col.statuses);
                return (
                    <div
                        key={col.id}
                        className="flex-shrink-0 rounded border shadow-sm"
                        style={{ width: 300, background: "#f8f9fa" }}
                    >
                        {/* Column Header */}
                        <div
                            className="d-flex align-items-center gap-2 px-3 py-3 rounded-top bg-white"
                            style={{ borderBottom: `4px solid ${col.color}` }}
                        >
                            <span className="fw-bold" style={{ color: col.color }}>
                                {col.label}
                            </span>
                            <span className="badge rounded-pill text-bg-secondary ms-auto">{columnTasks.length}</span>
                        </div>

                        {/* Cards Area */}
                        <div className="p-3 d-flex flex-column gap-4 overflow-auto" style={{ maxHeight: "calc(100vh - 250px)" }}>
                            {columnTasks.length > 0 ? columnTasks.map((task, idx) => (
                                <div key={task.id}>
                                    <TaskCard task={task} index={idx} />
                                </div>
                            )) : (
                                <div className="text-center py-5 text-muted small">
                                    No tasks in {col.label}
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    )
}
