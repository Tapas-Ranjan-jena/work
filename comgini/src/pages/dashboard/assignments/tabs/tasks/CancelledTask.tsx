import { useState, useEffect } from "react";
import tasksService from "../../../../../services/tasksService";
import TaskCard from "./components/TaskCard";
import TaskFilterBar from "./components/TaskFilterBar";

export default function CancelledTask() {
    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const res = await tasksService.getAllTasks(1, 100, "cancelled");
            let cancelled = [];
            if (res.data && Array.isArray(res.data.data)) {
                cancelled = res.data.data;
            } else if (Array.isArray(res.data)) {
                cancelled = res.data;
            } else if (res.data && Array.isArray(res.data.tasks)) {
                cancelled = res.data.tasks;
            }
            setTasks(cancelled);
        } catch (error) {
            console.error("Failed to fetch cancelled tasks", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTasks = tasks.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(tasks.length / itemsPerPage);

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    return (
        <div className="task-list-container">
            <TaskFilterBar />
            <div className="p-4 rounded-4" style={{ backgroundColor: "#f3f4f7", minHeight: "60vh" }}>
                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : tasks.length === 0 ? (
                    <div className="text-center py-5 text-muted">
                        <i className="bi bi-x-circle display-4"></i>
                        <p className="mt-3">No cancelled tasks found.</p>
                    </div>
                ) : (
                    <>
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mb-4">
                            {currentTasks.map((task, idx) => (
                                <div className="col" key={task.id || idx}>
                                    <TaskCard task={task} index={indexOfFirstItem + idx} />
                                </div>
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
                                <button
                                    className={`btn btn-white shadow-sm border rounded-circle d-flex align-items-center justify-content-center ${currentPage === 1 ? 'opacity-50' : ''}`}
                                    style={{ width: 40, height: 40 }}
                                    onClick={handlePrev}
                                    disabled={currentPage === 1}
                                >
                                    <i className="bi bi-chevron-left"></i>
                                </button>
                                <span className="fw-semibold text-muted small">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button
                                    className={`btn btn-white shadow-sm border rounded-circle d-flex align-items-center justify-content-center ${currentPage === totalPages ? 'opacity-50' : ''}`}
                                    style={{ width: 40, height: 40 }}
                                    onClick={handleNext}
                                    disabled={currentPage === totalPages}
                                >
                                    <i className="bi bi-chevron-right"></i>
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
