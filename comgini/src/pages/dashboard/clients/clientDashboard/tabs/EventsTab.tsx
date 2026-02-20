import { useState } from "react"
import AddEventModal from "../../../../../components/modals/AddEventModal"

export default function EventsTab() {

  const [openModal, setOpenModal] = useState(false)

  return (
    <div>

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">

        <h6 className="fw-bold m-0">Events</h6>

        <div className="d-flex gap-2">

          <button className="btn btn-outline-primary btn-sm">
            Sync calendar
          </button>

          <button
            className="btn btn-gradient btn-sm"
            onClick={() => setOpenModal(true)}
          >
            + Add Events
          </button>

        </div>

      </div>

      {/* ⭐ CALENDAR UI (STATIC DESIGN LIKE IMAGE) */}
      <div className="card p-3">

        <div className="d-flex justify-content-between align-items-center mb-3">

          <div className="d-flex gap-2">
            <button className="btn btn-outline-secondary btn-sm">&lt;</button>
            <button className="btn btn-outline-secondary btn-sm">&gt;</button>
            <button className="btn btn-outline-secondary btn-sm">Today</button>
          </div>

          <h5 className="m-0">February 2026</h5>

          <div className="d-flex gap-2">
            <button className="btn btn-outline-secondary btn-sm">month</button>
            <button className="btn btn-outline-secondary btn-sm">week</button>
            <button className="btn btn-outline-secondary btn-sm">day</button>
          </div>

        </div>

        {/* SIMPLE GRID CALENDAR */}
        <div className="row text-center fw-bold border-bottom pb-2">
          <div className="col">Mon</div>
          <div className="col">Tue</div>
          <div className="col">Wed</div>
          <div className="col">Thu</div>
          <div className="col">Fri</div>
          <div className="col">Sat</div>
          <div className="col">Sun</div>
        </div>

        {/* Calendar body placeholder */}
        <div style={{height:"400px"}} className="d-flex align-items-center justify-content-center text-muted">
          Calendar grid here (you can later integrate FullCalendar)
        </div>

      </div>

      {/* MODAL */}
      {openModal && (
        <AddEventModal onClose={() => setOpenModal(false)} />
      )}

    </div>
  )
}
