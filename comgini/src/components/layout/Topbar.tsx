import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import logo from "../../assets/comgini-logo.png"
import LogoutModal from "../common/LogoutModal"

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
}

export default function Topbar({ open, setOpen }: Props) {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  // ⭐ UI STATE
  const [showMenu, setShowMenu] = useState(false)
  const [showDesktopMenu, setShowDesktopMenu] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)
      await logout()
      setShowLogoutModal(false)
      navigate("/login")
    } catch (error) {
      console.error("Logout failed:", error)
    } finally {
      setIsLoggingOut(false)
    }
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
              className="mobile-dropdown-menu"
              style={{
                position: "absolute",
                top: "46px",
                right: 0,
                background: "linear-gradient(90deg,#3346a8 0%,#2f64c6 45%,#2fa0dc 100%)",
                borderRadius: 10,
                padding: "8px",
                minWidth: "180px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
                zIndex: 5000
              }}
            >
              <div
                className="dropdown-item-custom"
                onClick={() => { navigate("/profile"); setShowMenu(false); }}
              >
                <i className="bi bi-person-gear"></i>
                Edit Profile
              </div>
              <div
                className="dropdown-item-custom mt-2"
                onClick={() => setShowLogoutModal(true)}
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
          <span className="profile-name text-white">{fullName}</span> {/* Ensure text is white or high contrast */}
          <i className="bi bi-chevron-down text-white small ms-1"></i>

          {showDesktopMenu && (
            <div
              className="desktop-dropdown shadow-lg border-0"
              style={{
                position: "absolute",
                top: "55px",
                right: 0,
                background: "#fff",
                borderRadius: "12px",
                padding: "10px",
                minWidth: "200px",
                zIndex: 5000,
                animation: 'fadeInDown 0.2s ease-out'
              }}
            >
              {/* EDIT PROFILE */}
              <div
                className="d-flex align-items-center gap-3 profile-dropdown-item"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDesktopMenu(false);
                  navigate("/profile");
                }}
                style={{
                  padding: "12px 15px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  color: "#333",
                  transition: 'all 0.2s'
                }}
              >
                <i className="bi bi-pencil-square fs-5 text-muted"></i>
                <span style={{ fontSize: "0.95rem", fontWeight: 500 }}>Edit Profile</span>
              </div>

              {/* LOGOUT */}
              <div
                className="d-flex align-items-center gap-3 profile-dropdown-item logout-red mt-1"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDesktopMenu(false);
                  setShowLogoutModal(true);
                }}
                style={{
                  padding: "12px 15px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  color: "#ff4d4d",
                  transition: 'all 0.2s'
                }}
              >
                <i className="bi bi-box-arrow-right fs-5"></i>
                <span style={{ fontSize: "0.95rem", fontWeight: 500 }}>Log Out</span>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Global Logout Confirmation */}
      <LogoutModal 
        show={showLogoutModal} 
        onHide={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        isLoading={isLoggingOut}
      />

      <style>{`
        .profile-dropdown-item:hover {
          background-color: #f8f9fa;
        }
        .logout-red:hover {
          background-color: #fff1f1;
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .dropdown-item-custom {
            padding: 10px;
            color: #fff;
            border-radius: 6px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .dropdown-item-custom:hover {
            background-color: rgba(255,255,255,0.1);
        }
      `}</style>

    </div>
  )
}

