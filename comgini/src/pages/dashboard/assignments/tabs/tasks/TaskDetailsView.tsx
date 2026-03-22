import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import tasksService from "../../../../../services/tasksService";
import toast from "react-hot-toast";
import DeleteConfirmationModal from "../../modals/DeleteConfirmationModal";
import EditTaskModal from "../../modals/EditTaskModal";

export default function TaskDetailsView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);

    const fetchTask = async () => {
        if (!id) return;
        try {
            setLoading(true);
            const res = await tasksService.getTaskById(id);
            setTask(res.data || res);
        } catch (error) {
            console.error("Failed to fetch task details", error);
            toast.error("Failed to load task details");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTask();
    }, [id]);

    const handleStar = async () => {
        try {
            await tasksService.starTask(id!);
            toast.success("Task Starred Successfully");
            fetchTask();
        } catch (error) {
            toast.error("Failed to star task");
        }
    };

    const handleComplete = async () => {
        try {
            await tasksService.updateTaskStatus(id!, "completed");
            toast.success("Task Completed Successfully");
            fetchTask();
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const handleDelete = async () => {
        try {
            setDeleteLoading(true);
            await tasksService.deleteTask(id!);
            toast.success("Task Deleted Successfully");
            navigate("/assignments/tasks");
        } catch (error) {
            toast.error("Failed to delete task");
        } finally {
            setDeleteLoading(false);
            setShowDeleteModal(false);
        }
    };

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (!task) return <div className="text-center py-5">Task not found</div>;

    const isCompleted = task.status?.toLowerCase() === "completed";

    return (
        <div className="task-details-container px-3">
            <button className="btn btn-sm btn-light border mb-4" onClick={() => navigate(-1)}>
                <i className="bi bi-chevron-left me-1"></i> Back to List
            </button>

            {isCompleted && (
                <div className="alert alert-success d-flex align-items-center gap-2 mb-4 py-2" style={{ borderRadius: "8px" }}>
                    <i className="bi bi-check-circle-fill"></i> This task has been completed
                </div>
            )}

            <div className="card shadow-sm border-0" style={{ borderRadius: "16px" }}>
                <div className="card-body p-4 p-md-5">
                    <div className="row">
                        <div className="col-lg-8 border-end-lg pe-lg-5">
                            <div className="d-flex align-items-start justify-content-between mb-3">
                                <h3 className="fw-bold mb-0 text-dark">{task.title}</h3>
                                <span className={`badge px-3 py-2 rounded-pill small ${task.priority?.toLowerCase() === "high" ? "bg-danger-subtle text-danger" :
                                    task.priority?.toLowerCase() === "low" ? "bg-info-subtle text-info" : "bg-warning-subtle text-warning"
                                    }`}>
                                    {task.priority || "Medium"}
                                </span>
                            </div>

                            <p className="text-muted mb-5" style={{ lineHeight: "1.6" }}>
                                {task.description || "No description provided for this task."}
                            </p>

                            <div className="d-flex flex-wrap gap-2 mt-4 pt-4 border-top">
                                <button
                                    className={`btn ${task.is_starred ? 'btn-primary' : 'btn-outline-primary'} border px-4 fw-semibold small d-flex align-items-center gap-2`}
                                    onClick={handleStar}
                                    style={{ borderRadius: "8px" }}
                                >
                                    <i className={`bi ${task.is_starred ? 'bi-star-fill' : 'bi-star'}`}></i> {task.is_starred ? 'Starred Task' : 'Star Task'}
                                </button>

                                {!isCompleted && (
                                    <button
                                        className="btn btn-primary px-4 fw-semibold small d-flex align-items-center gap-2"
                                        style={{ borderRadius: "8px", background: "#303F9F" }}
                                        onClick={handleComplete}
                                    >
                                        <i className="bi bi-check-circle"></i> Completed Task
                                    </button>
                                )}

                                <button
                                    className="btn btn-light border px-4 fw-semibold small d-flex align-items-center gap-2 ms-auto"
                                    onClick={() => setOpenEditModal(true)}
                                    style={{ borderRadius: "8px" }}
                                >
                                    <i className="bi bi-pencil-square text-primary"></i>
                                </button>

                                <button
                                    className="btn btn-danger-subtle text-danger border-0 px-4 fw-semibold small d-flex align-items-center gap-2"
                                    onClick={() => setShowDeleteModal(true)}
                                    style={{ borderRadius: "8px", background: "#FFEBEB" }}
                                >
                                    <i className="bi bi-trash3"></i>
                                </button>
                            </div>
                        </div>

                        <div className="col-lg-4 ps-lg-5 mt-5 mt-lg-0">
                            <div className="timeline-container position-relative">
                                <div className="d-flex gap-3 mb-5 position-relative">
                                    <div className="dot rounded-circle bg-white border border-primary border-3" style={{ width: "20px", height: "20px", zIndex: 1 }}></div>
                                    <div className="line position-absolute bg-light-subtle" style={{ width: "2px", height: "60px", top: "20px", left: "9px", background: "#ddd" }}></div>
                                    <div>
                                        <div className="small fw-semibold text-muted">Date Create</div>
                                        <div className="fw-bold">{task.created_at ? new Date(task.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).split('/').join(' / ') : "-"}</div>
                                    </div>
                                </div>

                                <div className="d-flex gap-3 mt-5">
                                    <div className="dot rounded-circle bg-info border border-info border-3" style={{ width: "20px", height: "20px", zIndex: 1 }}></div>
                                    <div>
                                        <div className="small fw-semibold text-muted">Due Date</div>
                                        <div className="fw-bold">{task.due_date ? new Date(task.due_date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).split('/').join(' / ') : "-"}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <DeleteConfirmationModal
                open={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                loading={deleteLoading}
                taskTitle={task.title}
            />

            <EditTaskModal
                open={openEditModal}
                onClose={() => setOpenEditModal(false)}
                task={task}
                onUpdate={fetchTask}
            />
        </div>
    );
}
