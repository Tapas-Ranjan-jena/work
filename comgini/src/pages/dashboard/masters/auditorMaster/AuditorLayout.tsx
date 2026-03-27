import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"

export default function AuditorLayout() {

    const location = useLocation()
    const navigate = useNavigate()

    // ⭐ Hide subtabs on add & company-wise pages
    const hideTabs =
        location.pathname.includes("/add") ||
        location.pathname.includes("company-wise")

    return (
        <div className="container-fluid">

            <div className="card p-3">

                {/* PATH */}
                <small className="text-muted d-block border-bottom pb-2 mb-3">
                    <span className="text-primary">Home</span> / Auditors
                </small>

                {/* ⭐ HIDE HEADER ON ADD & COMPANYWISE PAGES */}
                {!hideTabs && (
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="m-0">Auditors List</h6>

                        <button
                            onClick={() => {
                                const activeTab = location.pathname.split("/").pop() || "statutory"
                                navigate(`${activeTab}/company-wise`)
                            }}
                            className="btn btn-sm shadow-sm px-3"
                            style={{ background: "#2E388E", color: "#fff" }}
                        >
                            Company wise Auditor's List
                        </button>
                    </div>
                )}

                {/* ⭐ SUBTABS — HIDDEN ON ADD PAGES */}
                {!hideTabs && (
                    <div
                        className="d-flex gap-3 mb-3"
                        style={{ borderBottom: "1px solid #e5e7eb" }}
                    >
                        <NavLink to="statutory"
                            className={({ isActive }) => isActive ? "text-primary pb-2" : "text-muted pb-2"}
                            style={{ textDecoration: "none", borderBottom: "2px solid" }}
                        >
                            Statutory Auditors
                        </NavLink>

                        <NavLink to="secretarial"
                            className={({ isActive }) => isActive ? "text-primary pb-2" : "text-muted pb-2"}
                            style={{ textDecoration: "none", borderBottom: "2px solid" }}
                        >
                            Secretarial Auditors
                        </NavLink>

                        <NavLink to="cost"
                            className={({ isActive }) => isActive ? "text-primary pb-2" : "text-muted pb-2"}
                            style={{ textDecoration: "none", borderBottom: "2px solid" }}
                        >
                            Cost Auditors
                        </NavLink>

                        <NavLink to="internal"
                            className={({ isActive }) => isActive ? "text-primary pb-2" : "text-muted pb-2"}
                            style={{ textDecoration: "none", borderBottom: "2px solid" }}
                        >
                            Internal Auditors
                        </NavLink>
                    </div>
                )}

                <Outlet />

            </div>
        </div>
    )
}