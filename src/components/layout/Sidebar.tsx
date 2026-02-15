import { NavLink } from "react-router-dom"
import { useState } from "react"

export default function Sidebar() {

  const [open, setOpen] = useState(false)

  return (
    <>
      {/* MOBILE TOGGLE BUTTON */}
      <button
        className="sidebar-toggle d-md-none"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      <div className={`sidebar ${open ? "open" : ""}`}>

        <div className="sidebar-menu">

          {/* ================= MENU ITEMS ================= */}

          <NavLink to="/dashboard" className={({isActive}) => `sidebar-item ${isActive ? "active" : ""}`}>
            <span className="sidebar-left">
              <i className="bi bi-speedometer2"></i>
              Dashboard
            </span>
            <i className="bi bi-chevron-right sidebar-arrow"></i>
          </NavLink>

          <NavLink to="/clients" className={({isActive}) => `sidebar-item ${isActive ? "active" : ""}`}>
            <span className="sidebar-left">
              <i className="bi bi-folder2-open"></i>
              Clients
            </span>
            <i className="bi bi-chevron-right sidebar-arrow"></i>
          </NavLink>

          <div className="sidebar-item">
            <span className="sidebar-left">
              <i className="bi bi-file-earmark-text"></i>
              Requested Documents
            </span>
            <i className="bi bi-chevron-right sidebar-arrow"></i>
          </div>

          <div className="sidebar-item">
            <span className="sidebar-left">
              <i className="bi bi-diagram-3"></i>
              Masters
            </span>
            <i className="bi bi-chevron-right sidebar-arrow"></i>
          </div>

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
