import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import AddTaskModal from "../modals/AddTaskModal"

export default function AssignmentLayout() {
    const [openTask, setOpenTask] = useState(false)

    const location = useLocation()
    const navigate = useNavigate()

    const activeTab = () => {
        if (location.pathname.includes("starred-task")) return "starred-task"
        if (location.pathname.includes("completed-task")) return "completed-task"
        if (location.pathname.includes("cancelled-task")) return "cancelled-task"
        if (location.pathname.includes("kanban")) return "kanban"
        if (location.pathname.includes("pie-chart")) return "pie-chart"
        if (location.pathname.includes("task-summary-report")) return "task-summary-report"
        return "tasks"
    }

    return (
        <div>

            {/* ================= TITLE ================= */}
            <h5 className="fw-bold mb-3">Assignments</h5>

            <div className="card shadow-sm">

                {/* ================= TAB HEADER ================= */}
                <div className="card-body pb-0">

                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 border-bottom pb-2">

                        {/* ⭐ DESKTOP TABS */}
                        <div className="d-none d-md-flex gap-4 small fw-semibold">

                            <NavLink to="/assignments/tasks"
                                end
                                className={({ isActive }) =>
                                    `pb-2 text-decoration-none ${isActive ? "text-primary border-bottom border-primary" : "text-muted"
                                    }`}>
                                Task List
                            </NavLink>

                            <NavLink to="/assignments/tasks/starred-task"
                                className={({ isActive }) =>
                                    `pb-2 text-decoration-none ${isActive ? "text-primary border-bottom border-primary" : "text-muted"
                                    }`}>
                                Starred
                            </NavLink>

                            <NavLink to="/assignments/tasks/completed-task"
                                className={({ isActive }) =>
                                    `pb-2 text-decoration-none ${isActive ? "text-primary border-bottom border-primary" : "text-muted"
                                    }`}>
                                Completed
                            </NavLink>

                            <NavLink to="/assignments/tasks/cancelled-task"
                                className={({ isActive }) =>
                                    `pb-2 text-decoration-none ${isActive ? "text-primary border-bottom border-primary" : "text-muted"
                                    }`}>
                                Cancelled
                            </NavLink>

                            <NavLink to="/assignments/tasks/kanban"
                                className={({ isActive }) =>
                                    `pb-2 text-decoration-none ${isActive ? "text-primary border-bottom border-primary" : "text-muted"
                                    }`}>
                                Kanban
                            </NavLink>

                            <NavLink to="/assignments/tasks/pie-chart"
                                className={({ isActive }) =>
                                    `pb-2 text-decoration-none ${isActive ? "text-primary border-bottom border-primary" : "text-muted"
                                    }`}>
                                Pie Chart
                            </NavLink>

                            <NavLink to="/assignments/tasks/task-summary-report"
                                className={({ isActive }) =>
                                    `pb-2 text-decoration-none ${isActive ? "text-primary border-bottom border-primary" : "text-muted"
                                    }`}>
                                Summary Report
                            </NavLink>

                        </div>

                        {/* ⭐ MOBILE TAB DROPDOWN */}
                        <select
                            className="form-select form-select-sm d-md-none"
                            value={activeTab()}
                            onChange={(e) => navigate(`/assignments/tasks/${e.target.value === "tasks" ? "" : e.target.value}`)}
                            style={{ width: 180 }}
                        >
                            <option value="tasks">Task List</option>
                            <option value="starred-task">Starred</option>
                            <option value="completed-task">Completed</option>
                            <option value="cancelled-task">Cancelled</option>
                            <option value="kanban">Kanban</option>
                            <option value="pie-chart">Pie Chart</option>
                            <option value="task-summary-report">Summary Report</option>
                        </select>

                        {/* ACTION BUTTONS */}
                        <div className="d-flex gap-2">
                            <button
                                className="btn btn-outline-dark btn-sm"
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
