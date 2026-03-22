import { Link } from "react-router-dom";

interface TaskCardProps {
    task: any;
    index: number;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index }) => {
    // Determine priority badge color
    const getPriorityClass = (priority: string) => {
        switch (priority?.toLowerCase()) {
            case "high": return "bg-danger-subtle text-danger border-danger";
            case "medium": return "bg-warning-subtle text-warning border-warning";
            case "low": return "bg-info-subtle text-info border-info";
            default: return "bg-success-subtle text-success border-success";
        }
    };

    return (
        <div className="card h-100 border-0 shadow-sm rounded-4 p-3 position-relative">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted fw-medium small">T-{index + 1}</span>
                <span className={`badge border rounded-pill px-3 py-1 fw-semibold small ${getPriorityClass(task.priority)}`}>
                    {task.priority || "Status"}
                </span>
            </div>

            <div className="mb-4 mt-2">
                <h6 className="fw-bold text-dark lh-base mb-0" style={{ fontSize: "0.95rem" }}>
                    {task.title}
                </h6>
            </div>

            <div className="mt-auto pt-3 border-top">
                <Link to={`/assignments/tasks/${task.id}`} className="text-decoration-none fw-semibold small text-primary d-inline-flex align-items-center">
                    View Task <i className="bi bi-arrow-right ms-2"></i>
                </Link>
            </div>
        </div>
    );
};

export default TaskCard;
