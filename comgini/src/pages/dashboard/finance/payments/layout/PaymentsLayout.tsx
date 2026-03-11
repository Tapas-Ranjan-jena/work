import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"

export default function PaymentsLayout() {

  const location = useLocation()
  const navigate = useNavigate()

  const [month, setMonth] = useState("2026-02")

  const activeTab = () => {
    if (location.pathname.includes("/yearly")) return "yearly"
    if (location.pathname.includes("/custom")) return "custom"
    return "monthly"
  }

  return (
    <div>

      {/* ================= TITLE ================= */}
      <h5 className="fw-bold mb-3">Payments Received</h5>

      <div className="card shadow-sm">

        {/* ================= TAB HEADER ================= */}
        <div className="card-body pb-0">

          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 border-bottom pb-2">

            {/* DESKTOP TABS */}
            <div className="d-none d-md-flex gap-4 small fw-semibold">

              <NavLink
                to="/finance/payments/monthly"
                className={({ isActive }) =>
                  `pb-2 text-decoration-none ${
                    isActive
                      ? "text-primary border-bottom border-primary"
                      : "text-muted"
                  }`
                }
              >
                Monthly
              </NavLink>

              <NavLink
                to="/finance/payments/yearly"
                className={({ isActive }) =>
                  `pb-2 text-decoration-none ${
                    isActive
                      ? "text-primary border-bottom border-primary"
                      : "text-muted"
                  }`
                }
              >
                Yearly
              </NavLink>

              <NavLink
                to="/finance/payments/custom"
                className={({ isActive }) =>
                  `pb-2 text-decoration-none ${
                    isActive
                      ? "text-primary border-bottom border-primary"
                      : "text-muted"
                  }`
                }
              >
                Custom
              </NavLink>

            </div>

            {/* MOBILE TABS */}
            <select
              className="form-select form-select-sm d-md-none"
              value={activeTab()}
              onChange={(e)=>navigate(`/finance/payments/${e.target.value}`)}
              style={{width:180}}
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
              <option value="custom">Custom</option>
            </select>

          </div>

          {/* ================= CONTROL ROW ================= */}
          <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">

            {/* LEFT CONTROLS */}
            <div className="d-flex gap-2">
              <select className="form-select form-select-sm" style={{width:80}}>
                <option>100</option>
              </select>

              <button className="btn btn-light btn-sm border">
                <i className="bi bi-eye-slash"></i>
              </button>
            </div>

            {/* RIGHT FILTERS */}
            <div className="d-flex align-items-center gap-2 flex-wrap">

              <select
                className="form-select form-select-sm"
                style={{width:170}}
              >
                <option>- Assignment -</option>
              </select>

              <select
                className="form-select form-select-sm"
                style={{width:190}}
              >
                <option>- Payment methods -</option>
              </select>

              {/* REAL MONTH PICKER */}
              <input
                type="month"
                value={month}
                onChange={(e)=>setMonth(e.target.value)}
                className="form-control form-control-sm"
                style={{width:160}}
              />

              <button className="btn btn-light btn-sm border">Excel</button>
              <button className="btn btn-light btn-sm border">Print</button>

              <div className="input-group input-group-sm" style={{width:200}}>
                <span className="input-group-text bg-white">
                  <i className="bi bi-search"></i>
                </span>
                <input className="form-control" placeholder="Search"/>
              </div>

            </div>

          </div>

        </div>

        {/* ================= TABLE ================= */}
        <div className="px-3 pb-3">

          <div className="table-responsive border rounded mt-3">

            <table className="table table-sm table-bordered align-middle mb-0">

              <thead style={{background:"#f4f5f7"}}>
                <tr>
                  <th>Invoice ID</th>
                  <th>Payment date</th>
                  <th>Payment method</th>
                  <th>Note</th>
                  <th>Amount</th>
                  <th style={{width:40}}>
                    <i className="bi bi-list"></i>
                  </th>
                </tr>
              </thead>

              <tbody>
                {/* ⭐ IMPORTANT: Outlet must render <tr> rows */}
                <Outlet />
              </tbody>

            </table>

          </div>

          {/* FOOTER */}
          <div className="d-flex justify-content-between align-items-center mt-2 small text-muted">
            <span>0-0 / 0</span>

            <div className="btn-group btn-group-sm">
              <button className="btn btn-light border">
                <i className="bi bi-chevron-left"></i>
              </button>
              <button className="btn btn-light border">
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}