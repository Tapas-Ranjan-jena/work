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

  const [incOpen, setIncOpen] = useState(false)

  const [checklistOpen, setChecklistOpen] = useState(false)

  const [openMenu, setOpenMenu] = useState(false)

  /* ⭐ AUTO OPEN DROPDOWNS IF ROUTE ACTIVE */
  useEffect(() => {
    if (location.pathname.includes("/bulk-sender")) {
      setBulkOpen(true)
    }
    if (location.pathname.includes("/masters")) {
      setMastersOpen(true)
    }
    if (location.pathname.includes("/incorporation")) {
      setIncOpen(true)
    }
    if (location.pathname.includes("/checklist")) {
      setChecklistOpen(true)
    }
    if (location.pathname.startsWith("/business-manager")) {
      setOpenMenu(true)
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
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `sidebar-item ${isActive ? "active" : ""}`
                }
              >
                <span className="sidebar-left">
                  <i className="bi bi-person-badge"></i>
                  Director/KMP Master
                </span>
              </NavLink>

              <NavLink
                to="/masters/shareholder"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `sidebar-item ${isActive ? "active" : ""}`
                }
              >
                <span className="sidebar-left">
                  <i className="bi bi-people"></i>
                  Shareholder Master
                </span>
              </NavLink>
              <NavLink
                to="/masters/debenture-holder"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `sidebar-item ${isActive ? "active" : ""}`
                }
              >
                <span className="sidebar-left">
                  <i className="bi bi-journal-text"></i>
                  Debenture holder Master
                </span>
              </NavLink>
              <NavLink
                to="/masters/auditors"
                onClick={handleNavClick}
                className={({ isActive }) => `sidebar-item ${isActive ? "active" : ""}`}
              >
                Auditor Master
              </NavLink>
              <NavLink
                to="/masters/pcs-firm-master"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `sidebar-item ${isActive ? "active" : ""}`
                }
              >
                <span className="sidebar-left">
                  <i className="bi bi-building"></i>
                  PCS Firm Master
                </span>
              </NavLink>
              <NavLink
                to="/masters/rta-master"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `sidebar-item ${isActive ? "active" : ""}`
                }
              >
                <span className="sidebar-left">
                  <i className="bi bi-building"></i>
                  RTA Master
                </span>
              </NavLink>
              <NavLink
                to="/masters/client-groups"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `sidebar-item ${isActive ? "active" : ""}`
                }
              >
                <span className="sidebar-left">
                  <i className="bi bi-building"></i>
                  Client groups
                </span>
              </NavLink>
              <NavLink
                to="/masters/mis"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `sidebar-item ${isActive ? "active" : ""}`
                }
              >
                <span className="sidebar-left">
                  <i className="bi bi-graph-up"></i>
                  MIS Report
                </span>
              </NavLink>

            </div>
          )}

          {/* ================= OTHER STATIC ITEMS ================= */}
          {/* ================= INCORPORATION DROPDOWN ================= */}
          <div
            className={`sidebar-item ${incOpen ? "active" : ""}`}
            onClick={() => setIncOpen(!incOpen)}
            style={{ cursor: "pointer" }}
          >
            <span className="sidebar-left">
              <i className="bi bi-folder2-open"></i>
              Incorporation
            </span>

            <i className={`bi ${incOpen ? "bi-chevron-down" : "bi-chevron-right"} sidebar-arrow`} />
          </div>

          {incOpen && (
            <div style={{ paddingLeft: "36px", display: "flex", flexDirection: "column", gap: "4px" }}>

              <NavLink
                to="/incorporation/run-llp"
                onClick={handleNavClick}
                className={({ isActive }) => `sidebar-item ${isActive ? "active" : ""}`}
              >
                RUN LLP
              </NavLink>

              <NavLink
                to="/incorporation/fillip"
                onClick={handleNavClick}
                className={({ isActive }) => `sidebar-item ${isActive ? "active" : ""}`}
              >
                FILLIP
              </NavLink>

              <NavLink
                to="/incorporation/spice"
                onClick={handleNavClick}
                className={({ isActive }) => `sidebar-item ${isActive ? "active" : ""}`}
              >
                SPICE
              </NavLink>

              <NavLink
                to="/incorporation/check-company"
                onClick={handleNavClick}
                className={({ isActive }) => `sidebar-item ${isActive ? "active" : ""}`}
              >
                Check Company Name
              </NavLink>

            </div>
          )}

          <div className="sidebar-item">
            <span className="sidebar-left">
              <i className="bi bi-briefcase"></i>
              Secretarial Practice
            </span>
            <i className="bi bi-chevron-right sidebar-arrow"></i>
          </div>

          {/* ================= CHECKLIST DROPDOWN ================= */}
          <div
            className={`sidebar-item ${checklistOpen ? "active" : ""}`}
            onClick={() => setChecklistOpen(!checklistOpen)}
            style={{ cursor: "pointer" }}
          >
            <span className="sidebar-left">
              <i className="bi bi-check2-square"></i>
              Checklist
            </span>

            <i
              className={`bi ${checklistOpen ? "bi-chevron-down" : "bi-chevron-right"
                } sidebar-arrow`}
            />
          </div>

          {checklistOpen && (
            <div
              style={{
                paddingLeft: "36px",
                display: "flex",
                flexDirection: "column",
                gap: "4px"
              }}
            >
              <NavLink
                to="/checklist"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `sidebar-item ${isActive ? "active" : ""}`
                }
              >
                Standard Checklist
              </NavLink>

              <NavLink
                to="/checklist/assign"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `sidebar-item ${isActive ? "active" : ""}`
                }
              >
                Assign Checklist
              </NavLink>
            </div>
          )}

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

          <div
            className={`sidebar-item ${openMenu ? "active" : ""}`}
            onClick={() => setOpenMenu(!openMenu)}
            style={{ cursor: "pointer" }}
          >
            <span className="sidebar-left">
              <i className="bi bi-person-badge"></i>
              Business Manager
            </span>

            <i
              className={`bi ${openMenu ? "bi-chevron-down" : "bi-chevron-right"
                } sidebar-arrow`}
            ></i>
          </div>

          {openMenu && (
            <div
              style={{
                paddingLeft: "36px",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <NavLink
                to="/business-manager/registration"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `sidebar-item ${isActive ? "active" : ""}`
                }
              >
                <span className="sidebar-left">
                  Registration/Licence
                </span>
              </NavLink>

              <NavLink
                to="/business-manager/insurance"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `sidebar-item ${isActive ? "active" : ""}`
                }
              >
                <span className="sidebar-left">
                  Insurance
                </span>
              </NavLink>

              <NavLink
                to="/business-manager/agreement"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `sidebar-item ${isActive ? "active" : ""}`
                }
              >
                <span className="sidebar-left">
                  Contract/Agreement
                </span>
              </NavLink>

              <NavLink
                to="/business-manager/expiry"
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `sidebar-item ${isActive ? "active" : ""}`
                }
              >
                <span className="sidebar-left">
                  Expiry Manager
                </span>
              </NavLink>
            </div>
          )}

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
