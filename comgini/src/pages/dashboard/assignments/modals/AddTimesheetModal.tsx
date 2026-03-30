import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import assignmentService from "../../../../services/assignmentService"
import timesheetService from "../../../../services/timesheetService"
import type { UserLookup, CompanyLookup } from "../../../../services/assignmentTypes"
import toast from "react-hot-toast"

type Props = {
    open: boolean
    onClose: () => void
    onSuccess?: () => void
}

export default function AddTimesheetModal({ open, onClose, onSuccess }: Props) {
    const [members, setMembers] = useState<UserLookup[]>([])
    const [clients, setClients] = useState<CompanyLookup[]>([])
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        memberId: "",
        clientId: "",
        task: "",
        startDate: new Date().toISOString().split('T')[0],
        startTime: "09:00",
        endDate: new Date().toISOString().split('T')[0],
        endTime: "18:00",
        note: ""
    })

    useEffect(() => {
        if (open) {
            const fetchLookups = async () => {
                try {
                    const [memRes, clientRes] = await Promise.all([
                        assignmentService.lookupUsers('maker'),
                        assignmentService.lookupCompanies()
                    ])
                    if (memRes.success) {
                        setMembers(memRes.data)
                        if (memRes.data.length > 0 && !formData.memberId) {
                            setFormData(prev => ({ ...prev, memberId: memRes.data[0].id.toString() }))
                        }
                    }
                    if (clientRes.success) setClients(clientRes.data)
                } catch (err) {
                    console.error("Failed to fetch lookups", err)
                }
            }
            fetchLookups()
        }
    }, [open])

    const handleSave = async () => {
        if (!formData.memberId || !formData.clientId || !formData.startDate || !formData.startTime) {
            toast.error("Please fill in required fields")
            return
        }

        setLoading(true)
        try {
            const res = await timesheetService.createTimesheet(formData)
            if (res.success) {
                toast.success("Timesheet added successfully")
                if (onSuccess) onSuccess()
                onClose()
            } else {
                toast.error(res.message || "Failed to add timesheet")
            }
        } catch (err) {
            console.error("Failed to save timesheet", err)
            toast.error("An error occurred while saving")
        } finally {
            setLoading(false)
        }
    }

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
            <div style={{ maxWidth: 560, width: "100%", background: "#fff", borderRadius: 8, boxShadow: "0 12px 40px rgba(0,0,0,0.2)" }}>

                {/* ================= HEADER ================= */}
                <div style={{ padding: "18px 24px", borderBottom: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h5 style={{ margin: 0, fontWeight: 600, fontSize: 17, color: "#1a3c6e" }}>Add Timesheets</h5>
                    <button
                        onClick={onClose}
                        style={{ background: "none", border: "none", fontSize: 24, cursor: "pointer", color: "#aaa", lineHeight: 1 }}
                    >×</button>
                </div>

                {/* ================= BODY ================= */}
                <div style={{ padding: "24px", maxHeight: "70vh", overflowY: "auto" }}>

                    {/* Member */}
                    <div className="mb-3">
                        <label className="form-label small fw-bold text-muted text-uppercase" style={{ fontSize: 11 }}>Member</label>
                        <select 
                            className="form-select form-select-sm"
                            value={formData.memberId}
                            onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
                        >
                            <option value="">Select Member</option>
                            {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                        </select>
                    </div>

                    {/* Client */}
                    <div className="mb-3">
                        <label className="form-label small fw-bold text-muted text-uppercase" style={{ fontSize: 11 }}>Client</label>
                        <select 
                            className="form-select form-select-sm"
                            value={formData.clientId}
                            onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                        >
                            <option value="">Select Client</option>
                            {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>

                    {/* Task */}
                    <div className="mb-3">
                        <label className="form-label small fw-bold text-muted text-uppercase" style={{ fontSize: 11 }}>Task / Purpose</label>
                        <input 
                            className="form-control form-control-sm" 
                            placeholder="Briefly describe the task"
                            value={formData.task}
                            onChange={(e) => setFormData({ ...formData, task: e.target.value })}
                        />
                    </div>

                    {/* Start date + Start time */}
                    <div className="row g-2 mb-3">
                        <div className="col-md-6">
                            <label className="form-label small fw-bold text-muted text-uppercase" style={{ fontSize: 11 }}>Start Date</label>
                            <input
                                type="date"
                                className="form-control form-control-sm"
                                value={formData.startDate}
                                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label small fw-bold text-muted text-uppercase" style={{ fontSize: 11 }}>Start Time</label>
                            <input
                                type="time"
                                className="form-control form-control-sm"
                                value={formData.startTime}
                                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* End date + End time */}
                    <div className="row g-2 mb-3">
                        <div className="col-md-6">
                            <label className="form-label small fw-bold text-muted text-uppercase" style={{ fontSize: 11 }}>End Date</label>
                            <input
                                type="date"
                                className="form-control form-control-sm"
                                value={formData.endDate}
                                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label small fw-bold text-muted text-uppercase" style={{ fontSize: 11 }}>End Time</label>
                            <input
                                type="time"
                                className="form-control form-control-sm"
                                value={formData.endTime}
                                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Note */}
                    <div className="mb-0">
                        <label className="form-label small fw-bold text-muted text-uppercase" style={{ fontSize: 11 }}>Detailed Note</label>
                        <textarea
                            className="form-control form-control-sm"
                            placeholder="Add any additional details or remarks..."
                            rows={3}
                            value={formData.note}
                            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                        />
                    </div>

                </div>

                {/* ================= FOOTER ================= */}
                <div style={{ padding: "16px 24px 20px", borderTop: "1px solid #f0f0f0", display: "flex", justifyContent: "flex-end", gap: 12 }}>
                    <button
                        className="btn btn-light btn-sm px-3 border"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-primary btn-sm px-4 shadow-sm"
                        style={{ backgroundColor: "#1a3c6e", borderColor: "#1a3c6e" }}
                        onClick={handleSave}
                        disabled={loading}
                    >
                        {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : <i className="bi bi-check2-circle me-1"></i>}
                        Save Timesheet
                    </button>
                </div>

            </div>
        </div>,
        document.body
    )
}
