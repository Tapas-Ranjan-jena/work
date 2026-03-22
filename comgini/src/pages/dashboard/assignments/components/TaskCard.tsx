import React from "react";
import { useNavigate } from "react-router-dom";

interface TaskCardProps {
    task: {
        id: string | number;
        title: string;
        priority: string;
        status: string;
        is_starred?: boolean;
    };
    onDelete?: (id: string | number, title: string) => void;
    onEdit?: (id: string | number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onEdit }) => {
    const navigate = useNavigate();
    const getPriorityBadgeClass = (priority: string) => {
        switch (priority?.toLowerCase()) {
            case "high": return "bg-danger-subtle text-danger";
            case "medium": return "bg-success-subtle text-success"; // Greenish-cyan in screenshot
            case "low": return "bg-info-subtle text-info";
            default: return "bg-success-subtle text-success";
        }
    };

    const isCompleted = task.status?.toLowerCase() === "completed";

    return (
        <div className="card h-100 shadow-sm border-0 position-relative" style={{ borderRadius: "24px", background: "#fff", padding: "24px" }}>
            <div className="card-body p-0 d-flex flex-column">
                
                {/* Header: Title and Priority */}
                <div className="d-flex justify-content-between align-items-start mb-3">
                    <h5 className="fw-bold text-dark mb-0" style={{ maxWidth: "70%", fontSize: "1.5rem", lineHeight: "1.2" }}>
                        {task.title}
                    </h5>
                    <span 
                        className={`badge rounded-pill px-3 py-1 small fw-medium ${getPriorityBadgeClass(task.priority)}`}
                        style={{ fontSize: "0.75rem" }}
                    >
                        {task.priority || "Medium"}
                    </span>
                </div>

                {/* Content: Description */}
                <p className="text-muted small mb-4" style={{ fontSize: "0.85rem", lineHeight: "1.6" }}>
                    Develop and document RESTful endpoints for user login, registration, and profile management. Ensure JWT authentication is implemented and integrated with the mobile frontend.
                </p>

                {/* Timeline UI */}
                <div className="ms-auto mb-4 p-3 d-flex flex-column align-items-end" style={{ background: "#f8f9fa", borderRadius: "16px", minWidth: "140px" }}>
                    <div className="d-flex flex-column align-items-end text-end position-relative">
                        {/* Timeline Line */}
                        <div style={{ 
                            position: "absolute", 
                            right: "10px", 
                            top: "15px", 
                            bottom: "15px", 
                            width: "2px", 
                            background: "#dee2e6" 
                        }}></div>

                        <div className="d-flex align-items-center gap-2 mb-4 position-relative">
                            <div className="text-end">
                                <div className="text-muted" style={{ fontSize: "0.7rem", fontWeight: "600" }}>Date Create</div>
                                <div className="fw-bold" style={{ fontSize: "0.85rem" }}>26 / 02 / 2026</div>
                            </div>
                            <div style={{ width: "22px", height: "22px", borderRadius: "50%", border: "2px solid #303f9f", background: "#fff", zIndex: 1 }}></div>
                        </div>

                        <div className="d-flex align-items-center gap-2 position-relative">
                            <div className="text-end">
                                <div className="text-muted" style={{ fontSize: "0.7rem", fontWeight: "600" }}>Due Date</div>
                                <div className="fw-bold" style={{ fontSize: "0.85rem" }}>04 / 03 / 2026</div>
                            </div>
                            <div style={{ 
                                width: "22px", 
                                height: "22px", 
                                borderRadius: "50%", 
                                border: "2px solid #4facfe", 
                                background: "#4facfe", 
                                zIndex: 1,
                                boxShadow: "0 0 0 4px rgba(79, 172, 254, 0.2)"
                            }}></div>
                        </div>
                    </div>
                </div>

                <div className="mt-auto pt-3 border-top d-flex align-items-center justify-content-between">
                    {isCompleted ? (
                        <button 
                            className="btn py-2 px-4 text-white d-flex align-items-center gap-2"
                            onClick={() => navigate(`/assignments/tasks/view/${task.id}`)}
                            style={{ 
                                background: "#00c853", 
                                borderRadius: "12px", 
                                fontSize: "0.9rem", 
                                fontWeight: "600",
                                border: "none"
                            }}
                        >
                            <i className="bi bi-check2-circle fs-5"></i> This task has been completed
                        </button>
                    ) : (
                        <button 
                            className="btn py-2 px-4 text-white"
                            onClick={() => navigate(`/assignments/tasks/view/${task.id}`)}
                            style={{ 
                                background: "linear-gradient(90deg, #303f9f 0%, #4facfe 100%)", 
                                borderRadius: "12px", 
                                fontSize: "0.9rem", 
                                fontWeight: "600",
                                border: "none"
                            }}
                        >
                            {task.is_starred ? "Starred Task" : "Completed Task"}
                        </button>
                    )}

                    <div className="d-flex gap-2">
                        <button 
                            className="btn p-2 d-flex align-items-center justify-content-center shadow-none" 
                            style={{ background: "#ffebee", borderRadius: "10px", color: "#ff5252", width: "40px", height: "40px" }}
                            onClick={() => onDelete?.(task.id, task.title)}
                        >
                            <i className="bi bi-trash3"></i>
                        </button>
                        <button 
                            className="btn p-2 d-flex align-items-center justify-content-center shadow-none" 
                            style={{ background: "#e8eaf6", borderRadius: "10px", color: "#303f9f", width: "40px", height: "40px" }}
                            onClick={() => onEdit?.(task.id)}
                        >
                            <i className="bi bi-pencil-square"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
