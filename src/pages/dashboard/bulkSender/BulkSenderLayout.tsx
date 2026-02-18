import { Outlet } from "react-router-dom"

export default function BulkSenderLayout() {

  return (
    <div className="container-fluid pt-0">

      {/* ================= PAGE HEADER ================= */}
      <div className="d-flex justify-content-between align-items-center mb-3">
      </div>

      {/* ================= PAGE CONTENT ================= */}
      {/* ⭐ WhatsApp or Gmail page loads here */}
      <Outlet />

    </div>
  )
}
