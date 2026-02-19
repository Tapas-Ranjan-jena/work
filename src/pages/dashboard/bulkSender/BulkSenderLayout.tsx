import { Outlet, useOutletContext } from "react-router-dom"
import PageTopBar from "../../../components/common/PageTopBar"

type LayoutContext = {
  open: boolean
  setOpen: (val:boolean)=>void
}

export default function BulkSenderLayout() {

  /* ⭐ RECEIVE sidebar control from DashboardLayout */
  const { open, setOpen } = useOutletContext<LayoutContext>()

  return (
    <div className="container-fluid pt-0">

      {/* ================= PAGE TOP BAR ================= */}
      <PageTopBar onMenuClick={() => setOpen(!open)} />

      {/* ================= PAGE HEADER ================= */}
      <div className="d-flex justify-content-between align-items-center mb-3">
      </div>

      {/* ================= PAGE CONTENT ================= */}
      <Outlet />

    </div>
  )
}
