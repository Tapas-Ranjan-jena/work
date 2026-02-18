import { Outlet } from "react-router-dom"
import { useState } from "react"
import Sidebar from "../components/layout/Sidebar"
import Topbar from "../components/layout/Topbar"
import "../styles/dashboard.css"

export default function DashboardLayout() {

  // ⭐ Sidebar state lives here
  const [open, setOpen] = useState(false)

  return (
    <div className="dashboard-wrapper">

      {/* ⭐ PASS open + setOpen */}
      <Topbar open={open} setOpen={setOpen} />

      <div className="dashboard-body">

        {/* ⭐ Sidebar already correct */}
        <Sidebar open={open} setOpen={setOpen} />

        <div className="dashboard-main">
          <main className="dashboard-content">
            <Outlet />
          </main>
        </div>

      </div>
    </div>
  )
}
