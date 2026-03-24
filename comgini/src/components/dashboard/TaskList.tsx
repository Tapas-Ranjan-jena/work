import React from "react";
import { Link } from "react-router-dom";

interface Task {
    id: number;
    title: string;
    priority: string;
    status: string;
}

interface TaskListProps {
    tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
    const getPriorityBadge = (priority: string) => {
        const p = priority?.toLowerCase();
        if (p === "high") return <span className="badge rounded-pill bg-danger-subtle text-danger px-3 py-1 fw-semibold small">High</span>;
        if (p === "medium") return <span className="badge rounded-pill bg-warning-subtle text-warning px-3 py-1 fw-semibold small">Medium</span>;
        if (p === "low") return <span className="badge rounded-pill bg-info-subtle text-info px-3 py-1 fw-semibold small">Low</span>;
        return <span className="badge rounded-pill bg-success-subtle text-success px-3 py-1 fw-semibold small">Normal</span>;
    };



    return (
        <div className="card shadow-sm border-0 p-4" style={{ borderRadius: "16px" }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0">Action Task Management</h5>
                <i className="bi bi-caret-up-fill small"></i>
            </div>

            <div className="task-list">
                {tasks.length > 0 ? tasks.map((task, idx) => (
                    <div key={task.id} className={`d-flex align-items-center justify-content-between py-3 ${idx < tasks.length - 1 ? "border-bottom" : ""}`}>
                        <div className="d-flex align-items-center gap-3 flex-grow-1 min-width-0" style={{ minWidth: 0 }}>
                            <div className="bg-primary-subtle text-primary rounded-circle p-2 d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: "45px", height: "45px" }}>
                                <i className="bi bi-file-earmark-text" style={{ fontSize: "20px" }}></i>
                            </div>
                            <div className="flex-grow-1 min-width-0 text-truncate">
                                <div className="small text-muted fw-medium" style={{ fontSize: "12px" }}>T-{task.id}</div>
                                <div className="fw-bold text-dark text-truncate" style={{ fontSize: "14px" }}>{task.title}</div>
                            </div>
                        </div>
                        <div className="flex-shrink-0 ms-2">
                            {getPriorityBadge(task.priority)}
                        </div>
                    </div>
                )) : (
                    <div className="text-center py-4 text-muted">No starred tasks</div>
                )}
            </div>

            <div className="text-center mt-3 pt-3 border-top">
                <Link to="/assignments/tasks/starred-task" className="text-decoration-none fw-bold text-primary small d-flex align-items-center justify-content-center">
                    View All Task <i className="bi bi-arrow-right ms-2"></i>
                </Link>
            </div>
        </div>
    );
};

export default TaskList;
