import { Outlet } from "react-router-dom"
import { useState } from "react"
import AddCallLogModal from "../modals/AddCallLogModal"

export default function CallLogsLayout() {
    const [openCallLog, setOpenCallLog] = useState(false)

    return (
        <div>

            {/* ================= TITLE ================= */}
            <h5 className="fw-bold mb-3">Call Logs</h5>

            <div className="card shadow-sm">

                {/* ================= HEADER ================= */}
                <div className="card-body pb-0">
                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 border-bottom pb-2">

                        <span className="small fw-semibold text-muted">All Call Logs</span>

                        {/* ACTION BUTTONS */}
                        <div className="d-flex gap-2">
                            <button
                                className="btn btn-outline-dark btn-sm"
                                onClick={() => setOpenCallLog(true)}
                            >
                                + Add Call Log
                            </button>
                        </div>

                    </div>
                </div>

                {/* ================= CONTENT AREA ================= */}
                <div className="p-3">
                    <Outlet />
                </div>

            </div>

            <AddCallLogModal open={openCallLog} onClose={() => setOpenCallLog(false)} />

        </div>
    )
}
