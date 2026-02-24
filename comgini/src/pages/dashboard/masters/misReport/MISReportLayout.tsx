import { NavLink, Outlet } from "react-router-dom"

export default function MISReportLayout() {

  return (
    <div className="container-fluid">

      <div className="card p-3">

        {/* ===== PATH ===== */}
        <small className="text-muted d-block border-bottom pb-2 mb-3">
          <span className="text-primary">Home</span> / MIS
        </small>

        {/* ===== WARNINGS ===== */}
        <div className="mb-3" style={{color:"#dc2626",fontSize:"12px"}}>
          <div>1. We recommend generating report for a maximum of 100 companies in a single attempt.</div>
          <div>2. Report for up to 30 companies can be generated within a few minutes. For more than 30 companies, the report will be generated within 24 hours.</div>
        </div>

        <h6 className="mb-2">GENERATE MIS REPORT</h6>

        {/* ===== SUB TABS ===== */}
        <div
          className="d-flex gap-3 mb-3"
          style={{ borderBottom:"1px solid #e5e7eb" }}
        >

          <NavLink
            to="company"
            className={({isActive}) =>
              isActive ? "text-primary pb-2" : "text-muted pb-2"
            }
            style={{textDecoration:"none",borderBottom:"2px solid"}}
          >
            Company
          </NavLink>

          {/* ⭐ FIXED HERE — missing } */}
          <NavLink
            to="llp"
            className={({isActive}) =>
              isActive ? "text-primary pb-2" : "text-muted pb-2"
            }
            style={{textDecoration:"none",borderBottom:"2px solid"}}
          >
            LLP
          </NavLink>

        </div>

        {/* ===== CHILD PAGE ===== */}
        <Outlet />

      </div>

    </div>
  )
}