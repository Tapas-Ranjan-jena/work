import { NavLink, Outlet } from "react-router-dom"
import { useState } from "react"

import AssignChecklistModal from "../modals/AssignChecklistModal"
import ImportExcelModal from "../modals/ImportExcelModal"

export default function AssignChecklistLayout() {

  const [openAssign, setOpenAssign] = useState(false)
  const [openImport, setOpenImport] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleSuccess = () => {
    setRefreshKey(prev => prev + 1)
  }

  return (
    <div className="card border-0 p-3">

      <div className="d-flex justify-content-between align-items-center mb-3">

        <div className="d-flex gap-3">
          <NavLink end to="." className="nav-link">
            Pending
          </NavLink>

          <NavLink to="completed" className="nav-link">
            Completed
          </NavLink>
        </div>

        <div className="d-flex gap-2">
          {/* ✅ ASSIGN */}
          <button
            onClick={() => setOpenAssign(true)}
            className="btn btn-sm text-white"
            style={{ background: "#2E388E" }}
          >
            Assign
          </button>

          {/* ✅ IMPORT EXCEL */}
          <button
            onClick={() => setOpenImport(true)}
            className="btn btn-sm text-white"
            style={{ background: "#2E388E" }}
          >
            Import Excel
          </button>
        </div>
      </div>

      <Outlet context={{ refreshKey }} />

      {/* ⭐ MODALS */}
      <AssignChecklistModal
        show={openAssign}
        onClose={() => setOpenAssign(false)}
        onSuccess={handleSuccess}
      />

      <ImportExcelModal
        show={openImport}
        onClose={() => setOpenImport(false)}
        onSuccess={handleSuccess}
      />

    </div>
  )
}