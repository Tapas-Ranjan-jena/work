import { useState, useEffect } from "react"
import AddCallLogModal from "./modals/AddCallLogModal"
import CallLogsFilters from "./components/CallLogsFilters"
import tasksService from "../../../services/tasksService"

export default function CallLogs() {
    const [openModal, setOpenModal] = useState(false)
    const [logs, setLogs] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const fetchLogs = async () => {
        try {
            setLoading(true)
            const res = await tasksService.getCallLogs()
            if (res.success && res.data) {
                setLogs(res.data)
            }
        } catch (error) {
            console.error("Failed to fetch call logs", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchLogs()
    }, [])

    return (
        <div>

            {/* ================= TITLE ROW ================= */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0">Call Logs</h5>
                <button
                    className="btn btn-sm"
                    style={{ backgroundColor: "#1a3c6e", color: "#fff", display: "flex", alignItems: "center", gap: 5 }}
                    onClick={() => setOpenModal(true)}
                >
                    <span style={{ fontSize: 16 }}>⊕</span> Add Log
                </button>
            </div>

            <div className="card shadow-sm">
                <div className="card-body">

                    {/* ================= FILTERS ================= */}
                    <div className="mb-3">
                        <CallLogsFilters />
                    </div>

                    {/* ================= TABLE ================= */}
                    <div className="table-responsive border rounded">
                        <table className="table table-sm table-bordered align-middle mb-0" style={{ fontSize: 13 }}>
                            <thead style={{ background: "#f4f5f7" }}>
                                <tr>
                                    <th style={{ whiteSpace: "nowrap" }}>Member</th>
                                    <th style={{ whiteSpace: "nowrap" }}>Client</th>
                                    <th style={{ whiteSpace: "nowrap" }}>Created date</th>
                                    <th style={{ whiteSpace: "nowrap" }}>Start time</th>
                                    <th style={{ whiteSpace: "nowrap" }}>End time</th>
                                    <th style={{ whiteSpace: "nowrap" }}>Total</th>
                                    <th style={{ width: 36, textAlign: "center" }}>
                                        <i className="bi bi-list"></i>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={7} className="text-center text-muted py-4">Loading call logs...</td>
                                    </tr>
                                ) : logs.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="text-center text-muted py-4">No record found.</td>
                                    </tr>
                                ) : (
                                    logs.map((log, index) => (
                                        <tr key={index}>
                                            <td>{log.contact_person || "-"}</td>
                                            <td>{log.client_name || "-"}</td>
                                            <td>{log.created_at ? new Date(log.created_at).toLocaleDateString() : "-"}</td>
                                            <td>{log.start_time ? new Date(log.start_time).toLocaleTimeString() : "-"}</td>
                                            <td>{log.end_time ? new Date(log.end_time).toLocaleTimeString() : "-"}</td>
                                            <td>{log.duration_minutes || "0"} min</td>
                                            <td className="text-center">
                                                <i className="bi bi-three-dots"></i>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* FOOTER */}
                    <div className="d-flex justify-content-between align-items-center mt-2 small text-muted">
                        <span>0-0 / 0</span>
                        <div className="btn-group btn-group-sm">
                            <button className="btn btn-light border">
                                <i className="bi bi-chevron-left"></i>
                            </button>
                            <button className="btn btn-light border">
                                <i className="bi bi-chevron-right"></i>
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            <AddCallLogModal open={openModal} onClose={() => setOpenModal(false)} />

        </div>
    )
}
