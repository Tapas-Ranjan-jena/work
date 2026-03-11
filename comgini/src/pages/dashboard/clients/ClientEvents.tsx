import { useParams } from "react-router-dom"
import { useState } from "react"
import EventCalendar from "../../../components/events/EventCalendar"
import CreateEventModal from "../../../components/events/CreateEventModal"

export default function ClientEvents() {
    const { clientId } = useParams<{ clientId: string }>()
    const [openModal, setOpenModal] = useState(false)
    const [refreshTrigger, setRefreshTrigger] = useState(0)

    if (!clientId) return <div>Client ID not found</div>

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold m-0">Client Events</h6>
                <div className="d-flex gap-2">
                    <button className="btn btn-outline-primary btn-sm">Sync calendar</button>
                    <button
                        className="btn btn-primary btn-sm px-3 shadow-sm"
                        onClick={() => setOpenModal(true)}
                    >
                        <i className="bi bi-plus-circle me-1"></i>
                        Add Event
                    </button>
                </div>
            </div>

            <div className="card shadow-sm border-0 p-3">
                <EventCalendar
                    clientId={Number(clientId)}
                    refreshTrigger={refreshTrigger}
                />
            </div>

            <CreateEventModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                onSuccess={() => {
                    setRefreshTrigger(prev => prev + 1)
                    setOpenModal(false)
                }}
                clientId={Number(clientId)}
            />
        </div>
    )
}
