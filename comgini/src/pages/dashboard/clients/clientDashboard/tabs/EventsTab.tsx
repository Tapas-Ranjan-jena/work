import { useParams } from "react-router-dom"
import { useState } from "react"
import EventCalendar from "../../../../../components/events/EventCalendar"
import CreateEventModal from "../../../../../components/events/CreateEventModal"

export default function EventsTab() {
  const { clientId } = useParams<{ clientId: string }>()
  const [openModal, setOpenModal] = useState(false)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

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
            className="btn btn-primary btn-sm shadow-sm px-3"
            onClick={() => setOpenModal(true)}
            disabled={!clientId}
          >
            <i className="bi bi-plus-circle me-1"></i>
            Add Events
          </button>
        </div>
      </div>

      {!clientId ? (
        <div className="alert alert-warning">
          Please select a client to view events.
        </div>
      ) : (
        <>
          {/* CALENDAR CONTAINER */}
          <div className="card shadow-sm border-0 p-3">
            <EventCalendar
              clientId={Number(clientId)}
              refreshTrigger={refreshTrigger}
            />
          </div>

          {/* MODAL */}
          <CreateEventModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            onSuccess={() => {
              setRefreshTrigger(p => p + 1)
              setOpenModal(false)
            }}
          />
        </>
      )}
    </div>
  )
}
