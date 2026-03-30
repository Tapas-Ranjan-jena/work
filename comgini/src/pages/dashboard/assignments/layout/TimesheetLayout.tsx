import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import AddTimesheetModal from "../modals/AddTimesheetModal"
import TimesheetFilters from "../components/TimesheetFilters"

export default function TimesheetLayout() {
    const [openTimesheet, setOpenTimesheet] = useState(false)
    const [refreshKey, setRefreshKey] = useState(0)

    // Default dates: Current month
    const now = new Date()
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0]
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0]

    const [filters, setFilters] = useState({
        fromDate: firstDay,
        toDate: lastDay,
        memberId: "",
        clientId: "",
        assignmentId: "",
        search: ""
    })

    const location = useLocation()
    const navigate = useNavigate()

    const activeTab = () => {
        if (location.pathname.includes("summary")) return "summary"
        return "details"
    }

    const handleRefresh = () => setRefreshKey(prev => prev + 1)

    return (
        <div>
            {/* ================= TITLE ROW ================= */}
            <div className="d-flex justify-content-between align-items-center mb-3 text-primary">
                <h5 className="fw-bold mb-0">Timesheets</h5>
            </div>

            <div className="card shadow-sm border-0">

                {/* ================= TAB HEADER ================= */}
                <div className="card-body pb-0 border-bottom">

                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 pb-2">

                        {/* ⭐ DESKTOP TABS */}
                        <div className="d-none d-md-flex gap-4 small fw-semibold">
                            <NavLink
                                to="/assignments/timesheets"
                                end
                                className={({ isActive }) =>
                                    `pb-2 text-decoration-none transition-all ${isActive ? "text-primary border-bottom border-primary border-2" : "text-muted hover-opacity"}`
                                }
                            >
                                Details
                            </NavLink>

                            <NavLink
                                to="/assignments/timesheets/summary"
                                className={({ isActive }) =>
                                    `pb-2 text-decoration-none transition-all ${isActive ? "text-primary border-bottom border-primary border-2" : "text-muted hover-opacity"}`
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
                            style={{ width: 140 }}
                        >
                            <option value="details">Details</option>
                            <option value="summary">Summary</option>
                        </select>

                        {/* ACTION BUTTONS */}
                        <div className="d-flex gap-2">
                            <button
                                className="btn btn-sm btn-primary d-flex align-items-center gap-1 shadow-sm"
                                style={{ backgroundColor: "#1a3c6e", borderColor: "#1a3c6e" }}
                                onClick={() => setOpenTimesheet(true)}
                            >
                                <i className="bi bi-plus-circle"></i> Add Timesheets
                            </button>
                        </div>
                    </div>

                </div>

                {/* ================= FILTERS ================= */}
                <div className="card-body pb-2 pt-3 bg-light bg-opacity-10">
                    <TimesheetFilters 
                        filters={filters} 
                        setFilters={setFilters} 
                    />
                </div>

                {/* ================= CONTENT AREA ================= */}
                <div className="px-3 pb-3">
                    <Outlet context={{ filters, refreshKey }} />
                </div>

            </div>

            <AddTimesheetModal 
                open={openTimesheet} 
                onClose={() => setOpenTimesheet(false)} 
                onSuccess={handleRefresh}
            />

        </div>
    )
}
