import { NavLink, Outlet } from "react-router-dom"
import { useState } from "react"
import AddExpiryModal from "../modals/AddExpiryModal"

export default function ExpiryLayout() {
  const [open, setOpen] = useState(false)

  return (
    <div>

      {/* TITLE */}
      <h5 className="fw-bold mb-3">Expiry Manager</h5>

      <div className="card shadow-sm">

        <div className="card-body pb-0">

          {/* TABS */}
          <div className="d-flex justify-content-between align-items-center border-bottom pb-2 flex-wrap gap-2">

            <div className="d-flex gap-4 small fw-semibold">
              <NavLink
                end
                to="/business-manager/expiry"
                className={({ isActive }) =>
                  `pb-2 text-decoration-none ${
                    isActive
                      ? "text-primary border-bottom border-primary"
                      : "text-muted"
                  }`
                }
              >
                Due for Expiry
              </NavLink>

              <NavLink
                to="/business-manager/expiry/history"
                className={({ isActive }) =>
                  `pb-2 text-decoration-none ${
                    isActive
                      ? "text-primary border-bottom border-primary"
                      : "text-muted"
                  }`
                }
              >
                Expiry
              </NavLink>
            </div>

            <button
              className="btn btn-outline-dark btn-sm"
              onClick={() => setOpen(true)}
            >
              <i className="bi bi-plus-circle me-1"></i>
              Add Expiry
            </button>

          </div>

          {/* CONTROLS */}
          <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">

            <div className="d-flex align-items-center gap-2">
              <select className="form-select form-select-sm" style={{ width: 80 }}>
                <option>100</option>
              </select>

              <button className="btn btn-light btn-sm border">
                <i className="bi bi-eye-slash"></i>
              </button>
            </div>

            <div className="d-flex gap-2">
              <button className="btn btn-light btn-sm border">Excel</button>
              <button className="btn btn-light btn-sm border">Print</button>

              <div className="input-group input-group-sm" style={{ width: 220 }}>
                <span className="input-group-text bg-white">
                  <i className="bi bi-search"></i>
                </span>
                <input className="form-control" placeholder="Search" />
              </div>
            </div>

          </div>

        </div>

        <div className="px-3 pb-3">
          <Outlet />
        </div>

      </div>

      <AddExpiryModal open={open} onClose={() => setOpen(false)} />

    </div>
  )
}