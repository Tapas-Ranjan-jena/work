import { Outlet } from "react-router-dom"

export default function ChecklistLayout() {
  return (
    <div className="container-fluid">

      {/* Breadcrumb */}
      <div className="mb-3 small text-muted">
        Home / Checklist
      </div>

      <Outlet />
    </div>
  )
}