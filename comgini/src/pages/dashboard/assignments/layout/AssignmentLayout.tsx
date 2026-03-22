import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import AddTaskModal from "../modals/AddTaskModal"
import tasksService from "../../../../services/tasksService"
import EmptyState from "../components/EmptyState"

export default function AssignmentLayout() {
    const [openTask, setOpenTask] = useState(false)
    const [loading, setLoading] = useState(true)
    const [hasTasks, setHasTasks] = useState(false)

    const location = useLocation()
    const navigate = useNavigate()

    const fetchTaskCount = async () => {
        try {
            setLoading(true)
            const res = await tasksService.getAllTasks(1, 1)
            let count = 0
            if (res.data && Array.isArray(res.data.data)) {
                count = res.data.data.length
            } else if (Array.isArray(res.data)) {
                count = res.data.length
            } else if (res.data && Array.isArray(res.data.tasks)) {
                count = res.data.tasks.length
            }
            setHasTasks(count > 0)
        } catch (error) {
            console.error("Failed to fetch task count", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchTaskCount()
        window.addEventListener("taskCreated", fetchTaskCount)
        return () => window.removeEventListener("taskCreated", fetchTaskCount)
    }, [])

    const activeTab = () => {
        if (location.pathname.includes("starred-task")) return "starred-task"
        if (location.pathname.includes("completed-task")) return "completed-task"
        if (location.pathname.includes("cancelled-task")) return "cancelled-task"
        if (location.pathname.includes("kanban")) return "kanban"
        if (location.pathname.includes("pie-chart")) return "pie-chart"
        if (location.pathname.includes("task-summary-report")) return "task-summary-report"
        return "tasks"
    }

    // If no tasks, show the EmptyState as the full page content (excluding Topbar/Sidebar already in DashboardLayout)
    if (!loading && !hasTasks && location.pathname === "/assignments/tasks") {
        return (
            <div>
                <EmptyState onCreateTask={() => setOpenTask(true)} />
                <AddTaskModal open={openTask} onClose={() => setOpenTask(false)} />
            </div>
        )
    }

    return (
        <div className="fade-in">

            {/* ================= TITLE ================= */}
            <h5 className="fw-bold mb-3">Assignments</h5>

            <div className="card shadow-sm border-0">

                {/* ================= TAB HEADER ================= */}
                <div className="card-body pb-0">

                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 border-bottom pb-2">

                        {/* ⭐ DESKTOP TABS */}
                        <div className="d-none d-md-flex gap-4 small fw-semibold">

                            <NavLink to="/assignments/tasks"
                                end
                                className={({ isActive }) =>
                                    `pb-2 text-decoration-none transition-all ${isActive ? "text-primary border-bottom border-primary" : "text-muted"
                                    }`}>
                                List
                            </NavLink>

                            <NavLink to="/assignments/tasks/starred-task"
                                className={({ isActive }) =>
                                    `pb-2 text-decoration-none transition-all ${isActive ? "text-primary border-bottom border-primary" : "text-muted"
                                    }`}>
                                Starred Task
                            </NavLink>

                            <NavLink to="/assignments/tasks/completed-task"
                                className={({ isActive }) =>
                                    `pb-2 text-decoration-none transition-all ${isActive ? "text-primary border-bottom border-primary" : "text-muted"
                                    }`}>
                                Completed Task
                            </NavLink>

                            <NavLink to="/assignments/tasks/cancelled-task"
                                className={({ isActive }) =>
                                    `pb-2 text-decoration-none transition-all ${isActive ? "text-primary border-bottom border-primary" : "text-muted"
                                    }`}>
                                Cancelled Task
                            </NavLink>

                            <NavLink to="/assignments/tasks/kanban"
                                className={({ isActive }) =>
                                    `pb-2 text-decoration-none transition-all ${isActive ? "text-primary border-bottom border-primary" : "text-muted"
                                    }`}>
                                Kanban
                            </NavLink>

                            <NavLink to="/assignments/tasks/pie-chart"
                                className={({ isActive }) =>
                                    `pb-2 text-decoration-none transition-all ${isActive ? "text-primary border-bottom border-primary" : "text-muted"
                                    }`}>
                                Pie Chart
                            </NavLink>

                            <NavLink to="/assignments/tasks/task-summary-report"
                                className={({ isActive }) =>
                                    `pb-2 text-decoration-none transition-all ${isActive ? "text-primary border-bottom border-primary" : "text-muted"
                                    }`}>
                                Task summary report
                            </NavLink>

                        </div>

                        {/* ⭐ MOBILE TAB DROPDOWN */}
                        <select
                            className="form-select form-select-sm d-md-none"
                            value={activeTab()}
                            onChange={(e) => navigate(`/assignments/tasks/${e.target.value === "tasks" ? "" : e.target.value}`)}
                            style={{ width: 180 }}
                        >
                            <option value="tasks">List</option>
                            <option value="starred-task">Starred Task</option>
                            <option value="completed-task">Completed Task</option>
                            <option value="cancelled-task">Cancelled Task</option>
                            <option value="kanban">Kanban</option>
                            <option value="pie-chart">Pie Chart</option>
                            <option value="task-summary-report">Task summary report</option>
                        </select>

                        {/* ACTION BUTTONS */}
                        <div className="d-flex gap-2">
                            <button
                                className="btn btn-outline-dark btn-sm rounded-2"
                                onClick={() => setOpenTask(true)}
                            >
                                + Add Task
                            </button>
                        </div>

                    </div>

                </div>

                {/* ================= CONTENT AREA ================= */}
                <div className="p-3">
                    <Outlet />
                </div>

            </div>

            <AddTaskModal open={openTask} onClose={() => setOpenTask(false)} />

        </div>
    )
}
