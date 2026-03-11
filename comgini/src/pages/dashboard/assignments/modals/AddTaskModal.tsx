import { createPortal } from "react-dom"
import { useRef, useState } from "react"
import toast from "react-hot-toast"
import tasksService from "../../../../services/tasksService"

type Props = {
    open: boolean
    onClose: () => void
}

export default function AddTaskModal({ open, onClose }: Props) {
    const fileRef = useRef<HTMLInputElement>(null)

    // Form state
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [clientId, setClientId] = useState<number | "">("")
    const [companyId, setCompanyId] = useState<number | "">("")
    const [priority, setPriority] = useState("high")
    const [dueDate, setDueDate] = useState("")
    const [estimatedHours, setEstimatedHours] = useState<number | "">("")
    const [category, setCategory] = useState("")
    const [loading, setLoading] = useState(false)

    if (!open) return null

    const handleSave = async () => {
        if (!title.trim() || !dueDate) {
            toast.error("Title and Due Date are required")
            return
        }

        try {
            setLoading(true)
            const payload = {
                title: title,
                description: description,
                client_id: Number(clientId),
                company_id: Number(companyId),
                priority: priority,
                due_date: dueDate,
                estimated_hours: Number(estimatedHours),
                category: category
            }
            await tasksService.createTask(payload)
            toast.success("Task created successfully")
            window.dispatchEvent(new Event("taskCreated"))
            onClose()
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to create task")
        } finally {
            setLoading(false)
        }
    }

    return createPortal(
        <div
            className="modal d-block"
            style={{
                background: "#00000066",
                position: "fixed",
                inset: 0,
                zIndex: 3000,
            }}
        >
            <div className="d-flex justify-content-center" style={{ paddingTop: "80px" }}>
                <div className="modal-dialog" style={{ maxWidth: "700px", width: "100%" }}>
                    <div className="modal-content">

                        {/* ================= HEADER ================= */}
                        <div className="modal-header">
                            <h5 className="fw-semibold m-0">Add Task</h5>
                            <button className="btn-close" onClick={onClose}></button>
                        </div>

                        {/* ================= BODY ================= */}
                        <div className="modal-body">

                            <div className="row g-3 align-items-center">

                                {/* Task Title */}
                                <div className="col-md-4">
                                    <label className="small mb-0">Task Title</label>
                                </div>
                                <div className="col-md-8">
                                    <input
                                        className="form-control"
                                        placeholder="Enter task title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>

                                {/* Client */}
                                <div className="col-md-4">
                                    <label className="small mb-0">Client ID</label>
                                </div>
                                <div className="col-md-8">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Enter client ID"
                                        value={clientId}
                                        onChange={(e) => setClientId(Number(e.target.value))}
                                    />
                                </div>

                                {/* Company */}
                                <div className="col-md-4">
                                    <label className="small mb-0">Company ID</label>
                                </div>
                                <div className="col-md-8">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Enter company ID"
                                        value={companyId}
                                        onChange={(e) => setCompanyId(Number(e.target.value))}
                                    />
                                </div>

                                {/* Priority */}
                                <div className="col-md-4">
                                    <label className="small mb-0">Priority</label>
                                </div>
                                <div className="col-md-8">
                                    <select
                                        className="form-select"
                                        value={priority}
                                        onChange={(e) => setPriority(e.target.value)}
                                    >
                                        <option value="high">High</option>
                                        <option value="medium">Medium</option>
                                        <option value="low">Low</option>
                                    </select>
                                </div>

                                {/* Due Date */}
                                <div className="col-md-4">
                                    <label className="small mb-0">Due Date</label>
                                </div>
                                <div className="col-md-8">
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={dueDate}
                                        onChange={(e) => setDueDate(e.target.value)}
                                    />
                                </div>

                                {/* Description */}
                                <div className="col-md-4">
                                    <label className="small mb-0">Description</label>
                                </div>
                                <div className="col-md-8">
                                    <textarea
                                        className="form-control"
                                        rows={2}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Task description..."
                                    ></textarea>
                                </div>

                                {/* Estimated Hours */}
                                <div className="col-md-4">
                                    <label className="small mb-0">Estimated Hours</label>
                                </div>
                                <div className="col-md-8">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="0"
                                        value={estimatedHours}
                                        onChange={(e) => setEstimatedHours(Number(e.target.value))}
                                    />
                                </div>

                                {/* Category */}
                                <div className="col-md-4">
                                    <label className="small mb-0">Category</label>
                                </div>
                                <div className="col-md-8">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter category"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    />
                                </div>

                            </div>

                        </div>

                        {/* ================= FOOTER ================= */}
                        <div className="modal-footer d-flex justify-content-between">

                            <>
                                <input ref={fileRef} type="file" hidden />
                                <button
                                    className="btn btn-light border"
                                    onClick={() => fileRef.current?.click()}
                                >
                                    <i className="bi bi-paperclip me-1"></i>
                                    Attach File
                                </button>
                            </>

                            <div className="d-flex gap-2">
                                <button className="btn btn-outline-secondary" onClick={onClose} disabled={loading}>
                                    Close
                                </button>
                                <button className="btn btn-primary" onClick={handleSave} disabled={loading}>
                                    {loading ? "Saving..." : "Save"}
                                </button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>,
        document.body
    )
}
