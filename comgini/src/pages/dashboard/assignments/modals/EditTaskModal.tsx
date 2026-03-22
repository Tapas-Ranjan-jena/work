import { createPortal } from "react-dom"
import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import tasksService from "../../../../services/tasksService"
import mastersService from "../../../../services/mastersService"

type Props = {
    open: boolean
    onClose: () => void
    task: any
    onUpdate: () => void
}

export default function EditTaskModal({ open, onClose, task, onUpdate }: Props) {
    const [loading, setLoading] = useState(false)
    const [companies, setCompanies] = useState<any[]>([])

    // Form state matching the screenshot
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [assignment, setAssignment] = useState("")
    const [companyName, setCompanyName] = useState("")
    const [assignTo, setAssignTo] = useState("")
    const [collaborators, setCollaborators] = useState("")
    const [approver, setApprover] = useState("")
    const [status, setStatus] = useState("todo")
    const [price, setPrice] = useState("")
    const [labels, setLabels] = useState("")
    const [startDate, setStartDate] = useState("")
    const [deadline, setDeadline] = useState("")
    const [recurring, setRecurring] = useState(false)

    useEffect(() => {
        if (open && task) {
            setTitle(task.title || "")
            setDescription(task.description || "")
            setAssignment(task.assignment || "-")
            setCompanyName(task.company_name || "-")
            setAssignTo(task.assigned_to_name || "-")
            setCollaborators(task.collaborators || "")
            setApprover(task.approver || "-")
            setStatus(task.status?.toLowerCase() || "todo")
            setPrice(task.price || "")
            setLabels(task.labels || "")
            setStartDate(task.start_date || "")
            setDeadline(task.due_date || "")
            setRecurring(!!task.is_recurring)

            fetchCompanies()
        }
    }, [open, task])

    const fetchCompanies = async () => {
        try {
            const res = await mastersService.getCompanies(1, 100)
            setCompanies(res.data || [])
        } catch (error) {
            console.error("Failed to fetch companies", error)
        }
    }

    if (!open) return null

    const handleSave = async () => {
        if (!title.trim() || !deadline) {
            toast.error("Title and Deadline are required")
            return
        }

        try {
            setLoading(true)
            const payload = {
                title: title.trim(),
                description: description.trim(),
                priority: task.priority || "medium",
                status: status,
                due_date: deadline,
                estimated_hours: Number(task.estimated_hours) || 0,
                actual_hours: Number(task.actual_hours) || 0,
                category: task.category || "",
                // Note: The following might not be supported by current backend but included for UI consistency
                // start_date: startDate,
                // price: price,
                // labels: labels,
                // collaborators: collaborators,
                // approver: approver
            }
            await tasksService.updateTask(task.id, payload)
            toast.success("Task updated successfully")
            onUpdate()
            onClose()
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to update task")
        } finally {
            setLoading(false)
        }
    }

    return createPortal(
        <div className="modal d-block" style={{ background: "#00000066", position: "fixed", inset: 0, zIndex: 3000 }}>
            <div className="d-flex justify-content-center" style={{ paddingTop: "40px" }}>
                <div className="modal-dialog shadow-lg" style={{ maxWidth: "800px", width: "100%", borderRadius: "12px", overflow: "hidden" }}>
                    <div className="modal-content border-0">
                        {/* Header */}
                        <div className="modal-header border-bottom p-4">
                            <h5 className="fw-bold m-0" style={{ fontSize: "1.25rem" }}>Add task</h5>
                            <button className="btn-close" onClick={onClose}></button>
                        </div>

                        {/* Body */}
                        <div className="modal-body p-4" style={{ maxHeight: "75vh", overflowY: "auto" }}>
                            <div className="row g-4">
                                {/* Assignment */}
                                <div className="col-md-3 small fw-semibold text-muted d-flex align-items-center">Assignment</div>
                                <div className="col-md-9">
                                    <select className="form-select border rounded-3 bg-light-subtle" value={assignment} onChange={e => setAssignment(e.target.value)}>
                                        <option value="-">-</option>
                                        <option value="Audit">Audit</option>
                                        <option value="Compliance">Compliance</option>
                                    </select>
                                </div>

                                {/* Company name */}
                                <div className="col-md-3 small fw-semibold text-muted d-flex align-items-center">Company name</div>
                                <div className="col-md-9">
                                    <select className="form-select border rounded-3 bg-light-subtle" value={companyName} onChange={e => setCompanyName(e.target.value)}>
                                        <option value="-">-</option>
                                        {companies.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                    </select>
                                </div>

                                {/* Title */}
                                <div className="col-md-3 small fw-semibold text-muted d-flex align-items-center">Title</div>
                                <div className="col-md-9">
                                    <input className="form-control border rounded-3" value={title} onChange={e => setTitle(e.target.value)} placeholder="Task title" />
                                </div>

                                {/* Description */}
                                <div className="col-md-3 small fw-semibold text-muted d-flex align-items-start pt-2">Description</div>
                                <div className="col-md-9">
                                    <textarea className="form-control border rounded-3" rows={4} value={description} onChange={e => setDescription(e.target.value)} placeholder="Task description..." />
                                </div>

                                {/* Assign to */}
                                <div className="col-md-3 small fw-semibold text-muted d-flex align-items-center">Assign to</div>
                                <div className="col-md-9">
                                    <select className="form-select border rounded-3 bg-light-subtle" value={assignTo} onChange={e => setAssignTo(e.target.value)}>
                                        <option value="-">-</option>
                                        <option value="Member 1">Member 1</option>
                                    </select>
                                </div>

                                {/* Collaborators */}
                                <div className="col-md-3 small fw-semibold text-muted d-flex align-items-center">Collaborators</div>
                                <div className="col-md-9">
                                    <input className="form-control border rounded-3" value={collaborators} onChange={e => setCollaborators(e.target.value)} placeholder="Collaborators" />
                                </div>

                                {/* Approver */}
                                <div className="col-md-3 small fw-semibold text-muted d-flex align-items-center">Approver</div>
                                <div className="col-md-9">
                                    <select className="form-select border rounded-3 bg-light-subtle" value={approver} onChange={e => setApprover(e.target.value)}>
                                        <option value="Approver">Approver</option>
                                    </select>
                                </div>

                                {/* Status */}
                                <div className="col-md-3 small fw-semibold text-muted d-flex align-items-center">Status</div>
                                <div className="col-md-9">
                                    <select className="form-select border rounded-3 bg-light-subtle" value={status} onChange={e => setStatus(e.target.value)}>
                                        <option value="todo">To do</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="review">Review</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>

                                {/* Price */}
                                <div className="col-md-3 small fw-semibold text-muted d-flex align-items-center">Price</div>
                                <div className="col-md-9">
                                    <input className="form-control border rounded-3" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" />
                                </div>

                                {/* Labels */}
                                <div className="col-md-3 small fw-semibold text-muted d-flex align-items-center">Labels</div>
                                <div className="col-md-9">
                                    <input className="form-control border rounded-3" value={labels} onChange={e => setLabels(e.target.value)} placeholder="Labels" />
                                </div>

                                {/* Start date */}
                                <div className="col-md-3 small fw-semibold text-muted d-flex align-items-center">Start date</div>
                                <div className="col-md-9">
                                    <input type="date" className="form-control border rounded-3" value={startDate} onChange={e => setStartDate(e.target.value)} />
                                </div>

                                {/* Deadline */}
                                <div className="col-md-3 small fw-semibold text-muted d-flex align-items-center">Deadline</div>
                                <div className="col-md-9">
                                    <input type="date" className="form-control border rounded-3" value={deadline} onChange={e => setDeadline(e.target.value)} />
                                </div>

                                {/* Recurring */}
                                <div className="col-md-3 small fw-semibold text-muted d-flex align-items-center">Recurring</div>
                                <div className="col-md-9">
                                    <input type="checkbox" className="form-check-input ms-0 mt-0 shadow-none border" checked={recurring} onChange={e => setRecurring(e.target.checked)} style={{ width: "20px", height: "20px" }} />
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="modal-footer border-top p-4 d-flex justify-content-between align-items-center">
                            <button className="btn btn-outline-secondary border rounded-3 d-flex align-items-center gap-2 px-3 fw-medium small h-40">
                                <i className="bi bi-camera"></i> Upload File
                            </button>
                            <div className="d-flex gap-2 h-40">
                                <button className="btn btn-outline-dark border rounded-3 d-flex align-items-center gap-2 px-4 h-100 fw-medium small" onClick={onClose} disabled={loading}>
                                    <i className="bi bi-x-circle"></i> Close
                                </button>
                                <button className="btn btn-primary bg-indigo border-0 rounded-3 d-flex align-items-center gap-2 px-4 h-100 fw-medium small" onClick={() => handleSave()} style={{ backgroundColor: "#2D37A0" }} disabled={loading}>
                                    <i className="bi bi-check2-circle"></i> {loading ? "Updating..." : "Save & show"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                .h-40 { height: 40px; }
                .bg-indigo { background-color: #2D37A0 !important; }
                .form-control:focus, .form-select:focus {
                    box-shadow: none;
                    border-color: #2D37A0;
                }
            `}</style>
        </div>,
        document.body
    )
}
