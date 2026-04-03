import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import logo from "../../assets/comgini-logo.png"

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
}

export default function Topbar({ open, setOpen }: Props) {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  // ⭐ DROPDOWN STATE
  const [showMenu, setShowMenu] = useState(false)
  const [showDesktopMenu, setShowDesktopMenu] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate("/login")
  }

  const initials = user ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase() : "U"
  const fullName = user ? `${user.firstName} ${user.lastName}` : "User"

  return (
    <div className="topbar">

      {/* ================= LEFT ================= */}
      <div className="topbar-left">

        <div className="topbar-logo" style={{ cursor: 'pointer' }} onClick={() => navigate("/dashboard")}>
          <img src={logo} alt="ComGini Logo" />
        </div>

        {/* DESKTOP SEARCH */}
        <div className="topbar-search-wrapper d-none d-lg-block">
          <i className="bi bi-search search-icon"></i>
          <input
            className="topbar-search"
            placeholder="Type to search..."
          />
        </div>

      </div>

      {/* ================= RIGHT ================= */}
      <div className="topbar-right">

        {/* ================= DESKTOP ICONS ================= */}
        <div className="topbar-icon-circle d-none d-lg-flex">
          <i className="bi bi-bell"></i>
        </div>

        <div className="topbar-icon-circle d-none d-lg-flex">
          <i className="bi bi-envelope"></i>
        </div>

        <div className="topbar-divider d-none d-lg-block"></div>

        {/* ================= MOBILE GROUP ================= */}
        <div
          className="d-flex align-items-center gap-2 d-lg-none"
          style={{ position: "relative" }}
        >

          {/* ⭐ MENU BUTTON */}
          <button
            type="button"
            className="topbar-icon-circle"
            onClick={() => setOpen(!open)}
          >
            <i className="bi bi-list"></i>
          </button>

          {/* ⭐ DROPDOWN BUTTON */}
          <button
            type="button"
            className="topbar-icon-circle"
            onClick={() => setShowMenu(!showMenu)}
          >
            <i className="bi bi-chevron-down"></i>
          </button>

          {/* ⭐ AVATAR */}
          <div className="avatar">{initials}</div>

          {/* ================= MOBILE DROPDOWN ================= */}
          {showMenu && (
            <div
              style={{
                position: "absolute",
                top: "46px",
                right: 0,
                background:
                  "linear-gradient(90deg,#3346a8 0%,#2f64c6 45%,#2fa0dc 100%)",
                borderRadius: 10,
                padding: "8px",
                minWidth: "180px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
                zIndex: 5000
              }}
            >

              {/* NOTIFICATIONS */}
              <div
                className="d-flex align-items-center gap-2"
                style={{
                  padding: "10px",
                  color: "#fff",
                  borderRadius: 6,
                  cursor: "pointer"
                }}
              >
                <i className="bi bi-bell"></i>
                Notifications
              </div>

              {/* MESSAGES */}
              <div
                className="d-flex align-items-center gap-2"
                style={{
                  padding: "10px",
                  color: "#fff",
                  borderRadius: 6,
                  cursor: "pointer"
                }}
              >
                <i className="bi bi-envelope"></i>
                Messages
              </div>

              {/* LOGOUT */}
              <div
                className="d-flex align-items-center gap-2"
                onClick={handleLogout}
                style={{
                  padding: "10px",
                  color: "#ffcccc",
                  borderRadius: 6,
                  cursor: "pointer"
                }}
              >
                <i className="bi bi-box-arrow-right"></i>
                Logout
              </div>

            </div>
          )}

        </div>

        {/* ================= DESKTOP PROFILE ================= */}
        <div
          className="topbar-profile d-none d-lg-flex"
          onClick={() => setShowDesktopMenu(!showDesktopMenu)}
          style={{ position: "relative", cursor: "pointer" }}
        >
          <div className="avatar">{initials}</div>
          <span className="profile-name">{fullName}</span>

          {showDesktopMenu && (
            <div
              className="shadow-sm border"
              style={{
                position: "absolute",
                top: "45px",
                right: 0,
                background: "#fff",
                borderRadius: 8,
                padding: "8px",
                minWidth: "150px",
                zIndex: 5000
              }}
            >
              <div
                className="d-flex align-items-center gap-2 text-danger logout-item"
                onClick={(e) => {
                  e.stopPropagation();
                  handleLogout();
                }}
                style={{
                  padding: "8px 12px",
                  borderRadius: 6,
                  cursor: "pointer",
                }}
              >
                <i className="bi bi-box-arrow-right"></i>
                <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>Logout</span>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  )
}
