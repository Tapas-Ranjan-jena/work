import { Outlet, NavLink, useLocation } from "react-router-dom"
import { useState } from "react"

export default function SpiceLayout() {

  const location = useLocation()
  const isDeletedPage = location.pathname.includes("/deleted")

  const [openTrial, setOpenTrial] = useState(false)

  return (
    <div className="card border-0 p-3">

      {/* ⭐ HEADER */}
      {!isDeletedPage && (
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2">
          <h6 className="fw-semibold m-0">Particulars of SPICE</h6>

          <div className="d-flex gap-2">
            <NavLink
              to="/incorporation/spice/deleted"
              className="btn btn-sm text-white"
              style={{ background:"#2E388E" }}
            >
              Deleted Forms
            </NavLink>

            <button
              onClick={() => setOpenTrial(true)}
              className="btn btn-sm text-white"
              style={{ background:"#2E388E" }}
            >
              Avail free trial
            </button>
          </div>
        </div>
      )}

      {/* ⭐ IMPORTANT NOTICE */}
{!isDeletedPage && (
  <div
    className="mb-3"
    style={{
      background:"#f4e3c1",
      borderLeft:"4px solid orange",
      padding:"14px"
    }}
  >
    <div className="fw-semibold mb-2">
      <i className="bi bi-exclamation-triangle text-danger me-2"></i>
      Important Notice
    </div>

    <small>
      Please review all forms and entered data carefully before submission.
      If you notice any missing information, unnecessary fields, or discrepancies,
      kindly reach out to us after completing the form.
      <br /><br />

      CompyRelaxis will not be held responsible for any issues arising due to
      frequent changes in MCA functionality. As MCA updates its systems regularly,
      some changes may not be immediately reflected on our software. While we
      continuously work to keep everything updated, occasional inconsistencies
      may occur.
    </small>

    <hr style={{ borderTop:"1px dashed #333" }} />

    <small className="text-danger">
      Re-submission is not supported on CompyRelaxis. If your form is under
      re-submission, please do not edit or submit it through CompyRelaxis.
    </small>

    <ul className="mb-1">
      <li>Create a new entry on the MCA portal.</li>
      <li>Prevent you from re-submitting the form on MCA portal.</li>
    </ul>

    <small>
      We cannot be held responsible for any additional charges or issues caused
      by such actions. Thank you for your understanding.
    </small>
  </div>
)}

      {/* ⭐ TABS */}
      {!isDeletedPage && (
        <div
          className="mb-3"
          style={{background:"#f1f3f5",padding:"10px 12px",borderRadius:"6px"}}
        >
          <ul className="nav nav-tabs border-0">
            <li className="nav-item">
              <NavLink end to="." className="nav-link border-0">In Progress</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="completed" className="nav-link border-0">Completed</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="cancelled" className="nav-link border-0">Cancelled/Rejected</NavLink>
            </li>
          </ul>
        </div>
      )}

      {/* ⭐ PAGE CONTENT */}
      <Outlet />

      {/* ⭐ SPICE TRIAL MODAL */}
      {openTrial && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ background:"rgba(0,0,0,0.35)", zIndex:1050 }}
        >
          <div className="bg-white p-3" style={{width:"420px",borderRadius:"10px"}}>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="m-0 fw-semibold">Start your free trial</h6>
              <button className="btn btn-sm" onClick={()=>setOpenTrial(false)}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <p style={{fontSize:"13px"}}>
              Are you sure you want to start this 3 days free trial for E-Form Module?
              You can avail this trial only once.
            </p>

            <div className="d-flex justify-content-end gap-2">
              <button className="btn btn-sm text-white" style={{background:"#2E388E"}}>
                Start
              </button>
              <button onClick={()=>setOpenTrial(false)} className="btn btn-sm btn-light border">
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}