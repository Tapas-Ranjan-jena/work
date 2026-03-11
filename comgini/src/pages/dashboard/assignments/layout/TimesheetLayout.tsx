import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import AddTimesheetModal from "../modals/AddTimesheetModal"
import TimesheetFilters from "../components/TimesheetFilters"

export default function TimesheetLayout() {
    const [openTimesheet, setOpenTimesheet] = useState(false)

    const location = useLocation()
    const navigate = useNavigate()

    const activeTab = () => {
        if (location.pathname.includes("summary")) return "summary"
        return "details"
    }

    return (
        <div>

            {/* ================= TITLE ROW ================= */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0">Timesheets</h5>
            </div>

            <div className="card shadow-sm">

                {/* ================= TAB HEADER ================= */}
                <div className="card-body pb-0">

                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 border-bottom pb-2">

                        {/* ⭐ DESKTOP TABS */}
                        <div className="d-none d-md-flex gap-4 small fw-semibold">

                            <NavLink
                                to="/assignments/timesheets"
                                end
                                className={({ isActive }) =>
                                    `pb-2 text-decoration-none ${isActive ? "text-primary border-bottom border-primary" : "text-muted"}`
                                }
                            >
                                Details
                            </NavLink>

                            <NavLink
                                to="/assignments/timesheets/summary"
                                className={({ isActive }) =>
                                    `pb-2 text-decoration-none ${isActive ? "text-primary border-bottom border-primary" : "text-muted"}`
                                }
                            >
                                Summary
                            </NavLink>

                        </div>

                        {/* ⭐ MOBILE TAB DROPDOWN */}
                        <select
                            className="form-select form-select-sm d-md-none"
                            value={activeTab()}
                            onChange={(e) => navigate(`/assignments/timesheets/${e.target.value === "details" ? "" : e.target.value}`)}
                            style={{ width: 160 }}
                        >
                            <option value="details">Details</option>
                            <option value="summary">Summary</option>
                        </select>

                        {/* ACTION BUTTONS */}
                        <div className="d-flex gap-2">
                            <button
                                className="btn btn-sm"
                                style={{ backgroundColor: "#1a3c6e", color: "#fff", display: "flex", alignItems: "center", gap: 5 }}
                                onClick={() => setOpenTimesheet(true)}
                            >
                                <span style={{ fontSize: 16 }}>⊕</span> Add Timesheets
                            </button>
                        </div>

                    </div>

                </div>

                {/* ================= FILTERS ================= */}
                <div className="card-body pb-2 pt-3">
                    <TimesheetFilters />
                </div>

                {/* ================= CONTENT AREA ================= */}
                <div className="px-3 pb-3">
                    <Outlet />
                </div>

            </div>

            <AddTimesheetModal open={openTimesheet} onClose={() => setOpenTimesheet(false)} />

        </div>
    )
}
