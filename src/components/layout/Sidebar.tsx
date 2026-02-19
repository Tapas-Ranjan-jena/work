import { NavLink, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
}

export default function Sidebar({ open, setOpen }: Props) {

  const location = useLocation()

  /* ⭐ BULK SENDER DROPDOWN STATE */
  const [bulkOpen, setBulkOpen] = useState(false)

  /* ⭐ MASTERS DROPDOWN STATE */
  const [mastersOpen, setMastersOpen] = useState(false)

  /* ⭐ AUTO OPEN DROPDOWNS IF ROUTE ACTIVE */
  useEffect(() => {
    if (location.pathname.includes("/bulk-sender")) {
      setBulkOpen(true)
    }
    if (location.pathname.includes("/masters")) {
      setMastersOpen(true)
    }
  }, [location.pathname])

  /* ⭐ VERY IMPORTANT — close sidebar ONLY on mobile */
  const handleNavClick = () => {
    if (window.innerWidth < 992) {
      setOpen(false)
    }
  }

  return (
    <>
      {/* ⭐ BACKDROP FOR MOBILE */}
      {open && (
        <div
          className="sidebar-backdrop d-lg-none"
          onClick={() => setOpen(false)}
        />
      )}

      <div className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-menu">

          {/* ================= DASHBOARD ================= */}
          <NavLink
            to="/dashboard"
            onClick={handleNavClick}
            className={({ isActive }) => `sidebar-item ${isActive ? "active" : ""}`}
          >
            <span className="sidebar-left">
              <i className="bi bi-speedometer2"></i>
              Dashboard
            </span>
            <i className="bi bi-chevron-right sidebar-arrow"></i>
          </NavLink>

          {/* ================= BULK SENDER ================= */}
          <div
            className={`sidebar-item ${bulkOpen ? "active" : ""}`}
            onClick={() => setBulkOpen(!bulkOpen)}
            style={{ cursor: "pointer" }}
          >
            <span className="sidebar-left">
              <i className="bi bi-send"></i>
              Bulk Sender
            </span>
            <i className={`bi ${bulkOpen ? "bi-chevron-down" : "bi-chevron-right"} sidebar-arrow`}></i>
          </div>

          {bulkOpen && (
            <div style={{ paddingLeft: "36px", display: "flex", flexDirection: "column", gap: "4px" }}>

              <NavLink
                to="/bulk-sender/whatsapp"
                onClick={handleNavClick}
                className={({ isActive }) => `sidebar-item ${isActive ? "active" : ""}`}
              >
                <span className="sidebar-left">
                  <i className="bi bi-whatsapp"></i>
                  Bulk WhatsApp
                </span>
              </NavLink>

              <NavLink
                to="/bulk-sender/gmail"
                onClick={handleNavClick}
                className={({ isActive }) => `sidebar-item ${isActive ? "active" : ""}`}
              >
                <span className="sidebar-left">
                  <i className="bi bi-google"></i>
                  Bulk Gmail
                </span>
              </NavLink>

            </div>
          )}

          {/* ================= CLIENTS ================= */}
          <NavLink
            to="/clients"
            onClick={handleNavClick}
            className={({ isActive }) => `sidebar-item ${isActive ? "active" : ""}`}
          >
            <span className="sidebar-left">
              <i className="bi bi-folder2-open"></i>
              Clients
            </span>
            <i className="bi bi-chevron-right sidebar-arrow"></i>
          </NavLink>

          {/* ================= REQUESTED DOCUMENTS ================= */}
          <NavLink
            to="/requested-documents"
            onClick={handleNavClick}
            className={({ isActive }) => `sidebar-item ${isActive ? "active" : ""}`}
          >
            <span className="sidebar-left">
              <i className="bi bi-file-earmark-text"></i>
              Requested Documents
            </span>
            <i className="bi bi-chevron-right sidebar-arrow"></i>
          </NavLink>

          {/* ================= MASTERS DROPDOWN ================= */}
          <div
            className={`sidebar-item ${mastersOpen ? "active" : ""}`}
            onClick={() => setMastersOpen(!mastersOpen)}
            style={{ cursor: "pointer" }}
          >
            <span className="sidebar-left">
              <i className="bi bi-diagram-3"></i>
              Masters
            </span>
            <i className={`bi ${mastersOpen ? "bi-chevron-down" : "bi-chevron-right"} sidebar-arrow`}></i>
          </div>

          {mastersOpen && (
            <div style={{ paddingLeft: "36px", display: "flex", flexDirection: "column", gap: "4px" }}>

              <NavLink
                to="/masters/company-master"
                onClick={handleNavClick}
                className={({ isActive }) => `sidebar-item ${isActive ? "active" : ""}`}
              >
                Company Master
              </NavLink>

              <NavLink
                to="/masters/director-kmp"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `sidebar-item ${isActive ? "active" : ""}`
                }
              >
                <span className="sidebar-left">
                  <i className="bi bi-person-badge"></i>
                  Director/KMP Master
                </span>
              </NavLink>

              <div className="sidebar-item">Shareholder Master</div>
              <div className="sidebar-item">Debenture holder Master</div>
              <div className="sidebar-item">Auditor Master</div>
              <div className="sidebar-item">PCS Firm Master</div>
              <div className="sidebar-item">RTA Master</div>
              <div className="sidebar-item">Client groups</div>
              <div className="sidebar-item">MIS Report</div>

            </div>
          )}

          {/* ================= OTHER STATIC ITEMS ================= */}
          <div className="sidebar-item">
            <span className="sidebar-left">
              <i className="bi bi-building"></i>
              Incorporation
            </span>
            <i className="bi bi-chevron-right sidebar-arrow"></i>
          </div>

          <div className="sidebar-item">
            <span className="sidebar-left">
              <i className="bi bi-briefcase"></i>
              Secretarial Practice
            </span>
            <i className="bi bi-chevron-right sidebar-arrow"></i>
          </div>

          <div className="sidebar-item">
            <span className="sidebar-left">
              <i className="bi bi-check2-square"></i>
              Checklist
            </span>
            <i className="bi bi-chevron-right sidebar-arrow"></i>
          </div>

          <div className="sidebar-item">
            <span className="sidebar-left">
              <i className="bi bi-kanban"></i>
              Assignments
            </span>
            <i className="bi bi-chevron-right sidebar-arrow"></i>
          </div>

          <div className="sidebar-item">
            <span className="sidebar-left">
              <i className="bi bi-people"></i>
              HRMS
            </span>
            <i className="bi bi-chevron-right sidebar-arrow"></i>
          </div>

          <div className="sidebar-item">
            <span className="sidebar-left">
              <i className="bi bi-person-badge"></i>
              Business Manager
            </span>
            <i className="bi bi-chevron-right sidebar-arrow"></i>
          </div>

          <div className="sidebar-item">
            <span className="sidebar-left">
              <i className="bi bi-cash-stack"></i>
              Finance
            </span>
            <i className="bi bi-chevron-right sidebar-arrow"></i>
          </div>

          <div className="sidebar-item">
            <span className="sidebar-left">
              <i className="bi bi-question-circle"></i>
              Help & Support
            </span>
            <i className="bi bi-chevron-right sidebar-arrow"></i>
          </div>

          <div className="sidebar-item">
            <span className="sidebar-left">
              <i className="bi bi-megaphone"></i>
              Announcements
            </span>
            <i className="bi bi-chevron-right sidebar-arrow"></i>
          </div>

          <div className="sidebar-item">
            <span className="sidebar-left">
              <i className="bi bi-person-lines-fill"></i>
              Leads
            </span>
            <i className="bi bi-chevron-right sidebar-arrow"></i>
          </div>

          <div className="sidebar-item">
            <span className="sidebar-left">
              <i className="bi bi-gear"></i>
              Settings
            </span>
            <i className="bi bi-chevron-right sidebar-arrow"></i>
          </div>

        </div>
      </div>
    </>
  )
}
