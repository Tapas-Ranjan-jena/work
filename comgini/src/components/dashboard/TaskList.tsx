import React from "react";
import { Link } from "react-router-dom";

interface Task {
    id?: number;
    title?: string;
    priority?: string;
    status?: string;
    // New API fields for recent activities
    activity?: string;
    timestamp?: string;
}

interface TaskListProps {
    tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
    const getPriorityBadge = (priority: string) => {
        const p = priority?.toLowerCase();
        if (p === "high") return <span className="badge rounded-pill bg-danger-subtle text-danger px-3 py-1 fw-bold small">High</span>;
        if (p === "medium") return <span className="badge rounded-pill bg-warning-subtle text-warning px-3 py-1 fw-bold small">Medium</span>;
        if (p === "low") return <span className="badge rounded-pill bg-info-subtle text-info px-3 py-1 fw-bold small">Low</span>;
        return <span className="badge rounded-pill bg-success-subtle text-success px-3 py-1 fw-bold small">Normal</span>;
    };

    const getActivityStyles = (activity: string) => {
        const a = activity?.toLowerCase() || "";
        if (a.includes("api") || a.includes("develop")) return { icon: "bi-code-square", color: "#0ea5e9", bg: "#f0f9ff" };
        if (a.includes("return") || a.includes("filing")) return { icon: "bi-file-earmark-check", color: "#10b981", bg: "#f0fdf4" };
        if (a.includes("meeting") || a.includes("it")) return { icon: "bi-people", color: "#8b5cf6", bg: "#f5f3ff" };
        if (a.includes("client")) return { icon: "bi-person-plus", color: "#f59e0b", bg: "#fffbeb" };
        return { icon: "bi-lightning-charge", color: "#64748b", bg: "#f8fafc" };
    };

    const formatDate = (dateStr: string) => {
        if (!dateStr) return "";
        try {
            const date = new Date(dateStr);
            return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
        } catch {
            return dateStr;
        }
    };

    return (
        <div className="h-100 d-flex flex-column">
            <div className="dash-card-header">
                <h5 className="dash-card-title" style={{ letterSpacing: "-0.3px" }}>Recent Activity</h5>
            </div>

            <div className="dash-card-body pb-0 position-relative flex-grow-1 overflow-y-auto overflow-x-hidden no-scrollbar">
                <div className="task-list position-relative">
                    {/* Timeline Line */}
                    <div 
                        className="position-absolute h-100" 
                        style={{ 
                            left: "22.5px", 
                            top: "20px", 
                            width: "1.5px", 
                            background: "linear-gradient(to bottom, #e2e8f0, #f8fafc)",
                            zIndex: 0
                        }} 
                    />

                    {tasks.length > 0 ? tasks.map((task, idx) => {
                        const styles = getActivityStyles(task.activity || task.title || "");
                        return (
                            <div 
                                key={task.id || idx} 
                                className="d-flex align-items-center justify-content-between py-3 px-2 rounded-3 transition-all"
                                style={{ 
                                    cursor: "pointer",
                                    transition: "background 0.2s ease",
                                    position: "relative",
                                    zIndex: 1
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f8fafc"}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                            >
                                <div className="d-flex align-items-center gap-3 flex-grow-1" style={{ minWidth: 0 }}>
                                    <div 
                                        className="shadow-sm rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" 
                                        style={{ 
                                            width: "45px", 
                                            height: "45px", 
                                            backgroundColor: styles.bg,
                                            border: `1px solid rgba(0,0,0,0.05)`
                                        }}
                                    >
                                        <i className={`bi ${styles.icon}`} style={{ fontSize: "18px", color: styles.color }}></i>
                                    </div>
                                    <div className="flex-grow-1" style={{ minWidth: 0 }}>
                                        <div 
                                            className="fw-bold text-dark text-capitalize dash-wrap-text" 
                                            style={{ 
                                                fontSize: "14px", 
                                                letterSpacing: "-0.2px",
                                                width: "100%"
                                            }}
                                            title={task.activity || task.title || ""}
                                        >
                                            {task.activity || task.title}
                                        </div>
                                        <div className="text-muted" style={{ fontSize: "11.5px", fontWeight: 500 }}>
                                            {task.timestamp ? formatDate(task.timestamp) : (task.id ? `ID: ${task.id}` : "Now")}
                                        </div>
                                    </div>
                                </div>
                                {task.priority && (
                                    <div className="flex-shrink-0 ms-2">
                                        {getPriorityBadge(task.priority)}
                                    </div>
                                )}
                            </div>
                        );
                    }) : (
                        <div className="text-center py-5 text-muted opacity-50">
                            <i className="bi bi-activity display-4 mb-2 d-inline-block"></i>
                            <p className="mb-0 fw-medium">No recent activity detected</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="dash-card-body pt-0 text-center mt-2 flex-grow-0">
                <Link to="/assignments/tasks/starred-task" className="text-decoration-none fw-bold text-primary small d-flex align-items-center justify-content-center hover-translate-x">
                    View All Activity <i className="bi bi-arrow-right ms-2 mt-0.5"></i>
                </Link>
            </div>
        </div>
    );
};

export default TaskList;
