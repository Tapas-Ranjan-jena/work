import { Outlet, NavLink, useLocation } from "react-router-dom"
import { useState } from "react"

export default function FillipLayout() {

  const location = useLocation()
  const isDeletedPage = location.pathname.includes("/deleted")

  const [openTrial, setOpenTrial] = useState(false)

  return (
    <div className="card border-0 p-3">

      {/* ⭐ HEADER (HIDE ON DELETED PAGE) */}
      {!isDeletedPage && (
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2">
          <h6 className="fw-semibold m-0">Particulars of FILLIP</h6>

          <div className="d-flex gap-2">
            <NavLink
              to="/incorporation/fillip/deleted"
              className="btn btn-sm text-white"
              style={{ background: "#2E388E" }}
            >
              Deleted Forms
            </NavLink>

            {/* ⭐ OPEN MCA USER MODAL */}
            <button
              onClick={() => setOpenTrial(true)}
              className="btn btn-sm text-white"
              style={{ background: "#2E388E" }}
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
            background: "#f4e3c1",
            borderLeft: "4px solid orange",
            padding: "14px"
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

            ComGini will not be held responsible for any issues arising due to
            frequent changes in MCA functionality. As MCA updates its systems regularly,
            some changes may not be immediately reflected on our software. While we
            continuously work to keep everything updated, occasional inconsistencies
            may occur.
          </small>

          <hr style={{ borderTop: "1px dashed #333" }} />

          <small className="text-danger">
            Re-submission is not supported on ComGini. If your form is under
            re-submission, please do not edit or submit it through ComGini.
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

      {/* ⭐ TABS — GREY BACKGROUND */}
      {!isDeletedPage && (
        <div
          className="mb-3"
          style={{
            background: "#f1f3f5",
            padding: "10px 12px",
            borderRadius: "6px"
          }}
        >
          <ul className="nav nav-tabs border-0">
            <li className="nav-item">
              <NavLink
                end
                to="."
                className={({ isActive }) =>
                  `nav-link border-0 ${isActive ? "fw-semibold" : ""}`
                }
              >
                In Progress
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="completed"
                className={({ isActive }) =>
                  `nav-link border-0 ${isActive ? "fw-semibold" : ""}`
                }
              >
                Completed
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="cancelled"
                className={({ isActive }) =>
                  `nav-link border-0 ${isActive ? "fw-semibold" : ""}`
                }
              >
                Cancelled/Rejected
              </NavLink>
            </li>
          </ul>
        </div>
      )}

      {/* ⭐ PAGE CONTENT */}
      <Outlet />

      {/* ⭐ MCA USER MODAL (UPDATED TO MATCH YOUR UI) */}
      {openTrial && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ background: "rgba(0,0,0,0.35)", zIndex: 1050 }}
        >
          <div
            className="bg-white"
            style={{
              width: "520px",
              borderRadius: "12px",
              overflow: "hidden"
            }}
          >
            {/* HEADER */}
            <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
              <h6 className="m-0 fw-semibold">Select MCA User ID</h6>

              <button className="btn btn-sm" onClick={() => setOpenTrial(false)}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            {/* BODY */}
            <div className="p-3">
              <select className="form-select">
                <option>Select MCA User</option>
              </select>
            </div>

            {/* FOOTER */}
            <div className="p-3 d-flex justify-content-end">
              <button
                onClick={() => setOpenTrial(false)}
                className="btn btn-sm text-white"
                style={{ background: "#2E388E" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}