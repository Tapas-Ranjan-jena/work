import { Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import Sidebar from "../components/layout/Sidebar"
import Topbar from "../components/layout/Topbar"
import "../styles/dashboard.css"

export default function DashboardLayout() {

  /* ⭐ OPEN BY DEFAULT ON DESKTOP */
  const [open, setOpen] = useState(window.innerWidth >= 992)

  /* ⭐ OPTIONAL — keep responsive when resizing */
  useEffect(() => {

    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setOpen(true)
      } else {
        setOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)

  }, [])

  return (
    <div className={`dashboard-wrapper ${open ? "sidebar-open" : "sidebar-closed"}`}>

      {/* GLOBAL TOPBAR */}
      <Topbar open={open} setOpen={setOpen} />

      <div className="dashboard-body">

        {/* GLOBAL SIDEBAR */}
        <Sidebar open={open} setOpen={setOpen} />

        <div className="dashboard-main">
          <main className="dashboard-content">

            {/* ⭐ PASS CONTROL TO INNER PAGES */}
            <Outlet context={{ open, setOpen }} />

          </main>
        </div>

      </div>
    </div>
  )
}
