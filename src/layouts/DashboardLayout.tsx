import { Outlet } from "react-router-dom"
import Sidebar from "../components/layout/Sidebar"
import Topbar from "../components/layout/Topbar"
import "../styles/dashboard.css"

export default function DashboardLayout() {

  return (
    <div className="dashboard-wrapper">

      {/* ⭐ TOPBAR NOW ABOVE EVERYTHING */}
      <Topbar />

      {/* ⭐ BODY AREA (SIDEBAR + CONTENT) */}
      <div className="dashboard-body">

        {/* SIDEBAR */}
        <Sidebar />

        {/* MAIN AREA */}
        <div className="dashboard-main">

          {/* PAGE CONTENT */}
          <main className="dashboard-content">
            <Outlet />
          </main>

        </div>

      </div>

    </div>
  )
}
