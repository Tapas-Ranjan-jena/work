import { createPortal } from "react-dom"

type Props = {
    open: boolean
    onClose: () => void
}

export default function AddTimesheetModal({ open, onClose }: Props) {
    if (!open) return null

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
            <div style={{ maxWidth: 560, width: "100%", background: "#fff", borderRadius: 8, boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}>

                {/* ================= HEADER ================= */}
                <div style={{ padding: "18px 24px 14px", borderBottom: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h5 style={{ margin: 0, fontWeight: 600, fontSize: 17 }}>Add Timesheets</h5>
                    <button
                        onClick={onClose}
                        style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#888", lineHeight: 1 }}
                    >×</button>
                </div>

                {/* ================= BODY ================= */}
                <div style={{ padding: "20px 24px" }}>

                    {/* Member */}
                    <div style={{ display: "flex", alignItems: "center", marginBottom: 14 }}>
                        <label style={{ minWidth: 110, fontSize: 13, color: "#333" }}>Member</label>
                        <select className="form-select form-select-sm" style={{ flex: 1 }}>
                            <option>Shakshi Rawat</option>
                        </select>
                    </div>

                    {/* Client */}
                    <div style={{ display: "flex", alignItems: "center", marginBottom: 14 }}>
                        <label style={{ minWidth: 110, fontSize: 13, color: "#333" }}>Client</label>
                        <select className="form-select form-select-sm" style={{ flex: 1 }}>
                            <option>-</option>
                        </select>
                    </div>

                    {/* Task */}
                    <div style={{ display: "flex", alignItems: "center", marginBottom: 14 }}>
                        <label style={{ minWidth: 110, fontSize: 13, color: "#333" }}>Task</label>
                        <select className="form-select form-select-sm" style={{ flex: 1 }}>
                            <option>Task</option>
                        </select>
                    </div>

                    {/* Start date + Start time */}
                    <div style={{ display: "flex", alignItems: "center", marginBottom: 14 }}>
                        <label style={{ minWidth: 110, fontSize: 13, color: "#333" }}>Start date</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="Start date"
                            style={{ flex: 1, marginRight: 8 }}
                        />
                        <label style={{ minWidth: 75, fontSize: 13, color: "#333" }}>Start time</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="Start time"
                            style={{ flex: 1 }}
                        />
                    </div>

                    {/* End date + End time */}
                    <div style={{ display: "flex", alignItems: "center", marginBottom: 14 }}>
                        <label style={{ minWidth: 110, fontSize: 13, color: "#333" }}>End date</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="End date"
                            style={{ flex: 1, marginRight: 8 }}
                        />
                        <label style={{ minWidth: 75, fontSize: 13, color: "#333" }}>End time</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="End time"
                            style={{ flex: 1 }}
                        />
                    </div>

                    {/* Note */}
                    <div style={{ display: "flex", alignItems: "flex-start", marginBottom: 4 }}>
                        <label style={{ minWidth: 110, fontSize: 13, color: "#333", paddingTop: 4 }}>Note</label>
                        <textarea
                            className="form-control form-control-sm"
                            placeholder="Note"
                            rows={3}
                            style={{ flex: 1, resize: "vertical" }}
                        />
                    </div>

                </div>

                {/* ================= FOOTER ================= */}
                <div style={{ padding: "12px 24px 16px", borderTop: "1px solid #f0f0f0", display: "flex", justifyContent: "flex-end", gap: 10 }}>
                    <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={onClose}
                        style={{ display: "flex", alignItems: "center", gap: 5 }}
                    >
                        <span style={{ fontSize: 16 }}>⊗</span> Close
                    </button>
                    <button
                        className="btn btn-primary btn-sm"
                        style={{ display: "flex", alignItems: "center", gap: 5, backgroundColor: "#1a3c6e", borderColor: "#1a3c6e" }}
                    >
                        <span style={{ fontSize: 16 }}>✓</span> Save
                    </button>
                </div>

            </div>
        </div>,
        document.body
    )
}
