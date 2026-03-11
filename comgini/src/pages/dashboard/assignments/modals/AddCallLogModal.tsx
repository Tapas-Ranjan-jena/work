import { createPortal } from "react-dom"
import { useRef, useState } from "react"
import toast from "react-hot-toast"
import tasksService from "../../../../services/tasksService"

type Props = {
    open: boolean
    onClose: () => void
}

export default function AddCallLogModal({ open, onClose }: Props) {
    const fileRef = useRef<HTMLInputElement>(null)

    const [contactPerson, setContactPerson] = useState("")
    const [mobileNumber, setMobileNumber] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [notes, setNotes] = useState("")
    const [loading, setLoading] = useState(false)

    if (!open) return null

    const handleSave = async () => {
        if (!contactPerson || !startTime || !endTime) {
            toast.error("Contact person, start time, and end time are required")
            return
        }
        try {
            setLoading(true)
            await tasksService.createCallLog({
                client_id: null,
                contact_person: contactPerson,
                mobile_number: mobileNumber,
                start_time: startTime,
                end_time: endTime,
                duration_minutes: 0,
                notes
            })
            toast.success("Operation successful")
            onClose()
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to add call log")
        } finally {
            setLoading(false)
        }
    }

    return createPortal(
        <div
            style={{
                background: "#00000066",
                position: "fixed",
                inset: 0,
                zIndex: 3000,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "16px",
            }}
            onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
        >
            <div style={{ maxWidth: 540, width: "100%", background: "#fff", borderRadius: 8, boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}>

                {/* ================= HEADER ================= */}
                <div style={{ padding: "18px 24px 14px", borderBottom: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h5 style={{ margin: 0, fontWeight: 600, fontSize: 17 }}>Add Log</h5>
                    <button
                        onClick={onClose}
                        style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#888", lineHeight: 1 }}
                    >×</button>
                </div>

                {/* ================= BODY ================= */}
                <div style={{ padding: "20px 24px" }}>

                    {/* Company name */}
                    <div style={{ display: "flex", alignItems: "center", marginBottom: 14 }}>
                        <label style={{ minWidth: 140, fontSize: 13, color: "#333" }}>Company name</label>
                        <select className="form-select form-select-sm" style={{ flex: 1 }}>
                            <option>-</option>
                        </select>
                    </div>

                    {/* Person with whom Connected */}
                    <div style={{ display: "flex", alignItems: "center", marginBottom: 14 }}>
                        <label style={{ minWidth: 140, fontSize: 13, color: "#333", lineHeight: "1.3" }}>
                            Person with whom<br />Connected
                        </label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="Person with whom connected"
                            style={{ flex: 1 }}
                            value={contactPerson}
                            onChange={(e) => setContactPerson(e.target.value)}
                        />
                    </div>

                    {/* Person Number */}
                    <div style={{ display: "flex", alignItems: "center", marginBottom: 14 }}>
                        <label style={{ minWidth: 140, fontSize: 13, color: "#333" }}>Person Number</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="Person Number"
                            style={{ flex: 1 }}
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                        />
                    </div>

                    {/* Start time + End time */}
                    <div style={{ display: "flex", alignItems: "center", marginBottom: 14 }}>
                        <label style={{ minWidth: 140, fontSize: 13, color: "#333" }}>Start time</label>
                        <input
                            type="datetime-local"
                            className="form-control form-control-sm"
                            placeholder="Start time"
                            style={{ flex: 1, marginRight: 8 }}
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                        />
                        <label style={{ minWidth: 70, fontSize: 13, color: "#333" }}>End time</label>
                        <input
                            type="datetime-local"
                            className="form-control form-control-sm"
                            placeholder="End time"
                            style={{ flex: 1 }}
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                        />
                    </div>

                    {/* Conversation Details */}
                    <div style={{ display: "flex", alignItems: "flex-start", marginBottom: 4 }}>
                        <label style={{ minWidth: 140, fontSize: 13, color: "#333", paddingTop: 4 }}>Conversation Details</label>
                        <textarea
                            className="form-control form-control-sm"
                            placeholder="Conversation Details"
                            rows={3}
                            style={{ flex: 1, resize: "vertical" }}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>

                </div>

                {/* ================= FOOTER ================= */}
                <div style={{ padding: "12px 24px 16px", borderTop: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                        <input ref={fileRef} type="file" hidden />
                        <button
                            className="btn btn-light btn-sm border"
                            onClick={() => fileRef.current?.click()}
                            style={{ display: "flex", alignItems: "center", gap: 5 }}
                        >
                            <i className="bi bi-camera"></i> Upload File
                        </button>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                        <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={onClose}
                            style={{ display: "flex", alignItems: "center", gap: 5 }}
                            disabled={loading}
                        >
                            <span style={{ fontSize: 16 }}>⊗</span> Close
                        </button>
                        <button
                            className="btn btn-primary btn-sm"
                            style={{ display: "flex", alignItems: "center", gap: 5, backgroundColor: "#1a3c6e", borderColor: "#1a3c6e" }}
                            onClick={handleSave}
                            disabled={loading}
                        >
                            <span style={{ fontSize: 16 }}>✓</span> {loading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </div>

            </div>
        </div>,
        document.body
    )
}
