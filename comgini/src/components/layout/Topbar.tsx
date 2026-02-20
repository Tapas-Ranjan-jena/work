import { useState } from "react"

type Props = {
  open: boolean
  setOpen: (val: boolean) => void
}

export default function Topbar({ open, setOpen }: Props) {

  // ⭐ DROPDOWN STATE
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div className="topbar">

      {/* ================= LEFT ================= */}
      <div className="topbar-left">

        <div className="topbar-logo">
          <img src="../../assets/comgini-logo-nav.jpg" alt="logo" />
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
          <div className="avatar">JC</div>

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

            </div>
          )}

        </div>

        {/* ================= DESKTOP PROFILE ================= */}
        <div className="topbar-profile d-none d-lg-flex">
          <div className="avatar">JC</div>
          <span className="profile-name">Jessie Cosenza</span>
        </div>

      </div>

    </div>
  )
}
