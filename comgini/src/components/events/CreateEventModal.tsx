import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import eventsService from "../../services/eventsService"
import api from "../../api/api"

type Props = {
    open: boolean
    onClose: () => void
    onSuccess?: () => void
}

export default function CreateEventModal({ open, onClose, onSuccess }: Props) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        event_type: 'meeting',
        start_datetime: '',
        end_datetime: '',
        location: '',
        company_id: ''
    })

    const [isLoading, setIsLoading] = useState(false)
    const [companies, setCompanies] = useState<any[]>([])

    useEffect(() => {
        if (open) {
            const fetchCompanies = async () => {
                try {
                    const response = await api.get('/clients?limit=100');
                    if (response.data && response.data.data) {
                        // Deduplicate companies by ID
                        const uniqueMap = new Map();
                        response.data.data.forEach((c: any) => {
                            if (c.id) uniqueMap.set(c.id, c);
                        });
                        setCompanies(Array.from(uniqueMap.values()));
                    }
                } catch (error) {
                    console.error("Failed to fetch companies", error);
                }
            };
            fetchCompanies();
        }
    }, [open]);

    if (!open) return null

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target as HTMLInputElement
        const val = type === 'checkbox'
            ? (e.target as HTMLInputElement).checked
            : (name === 'company_id' ? (value ? Number(value) : '') : value);

        setFormData(prev => ({ ...prev, [name]: val }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            // Use full ISO 8601 format as per user requirement
            const payload = {
                title: formData.title,
                description: formData.description || '',
                event_type: formData.event_type.toLowerCase().replace(/\s+/g, "_"),
                start_datetime: new Date(formData.start_datetime).toISOString(),
                end_datetime: new Date(formData.end_datetime).toISOString(),
                location: formData.location || '',
                company_id: Number(formData.company_id) || 1, // Fallback to 1 as per instruction
                attendee_ids: [1] // Ensure non-empty as per instruction
            }

            console.log("CREATE EVENT PAYLOAD (Postman Match):", payload);

            await eventsService.createEvent(payload as any)
            onSuccess?.()
            onClose()
        } catch (error: any) {
            console.error("Full Create Event Error:", error);
            console.log("Backend response:", error.response?.data);
            const serverMsg = error.response?.data?.message || error.message;
            alert(`Failed to create event: ${serverMsg}`);
        } finally {
            setIsLoading(false)
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
                overflowY: "auto",
            }}
        >
            <div
                className="d-flex justify-content-center"
                style={{ paddingTop: "80px", paddingBottom: "40px" }}
            >
                <div className="modal-dialog" style={{ maxWidth: "600px", width: "100%" }}>
                    <div className="modal-content shadow-lg border-0">
                        <div className="modal-header bg-light">
                            <h5 className="fw-semibold m-0">Add New Event</h5>
                            <button className="btn-close" onClick={onClose}></button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="modal-body px-4">
                                <div className="row g-3">
                                    <div className="col-12">
                                        <label className="form-label small fw-semibold">Event Title</label>
                                        <input
                                            className="form-control"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            placeholder="Enter event title"
                                            required
                                        />
                                    </div>

                                    <div className="col-6">
                                        <label className="form-label small fw-semibold">Start Date & Time</label>
                                        <input
                                            type="datetime-local"
                                            className="form-control"
                                            name="start_datetime"
                                            value={formData.start_datetime}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-6">
                                        <label className="form-label small fw-semibold">End Date & Time</label>
                                        <input
                                            type="datetime-local"
                                            className="form-control"
                                            name="end_datetime"
                                            value={formData.end_datetime}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label small fw-semibold">Event Type</label>
                                        <select
                                            className="form-select"
                                            name="event_type"
                                            value={formData.event_type}
                                            onChange={handleChange}
                                        >
                                            <option value="meeting">Meeting</option>
                                            <option value="board_meeting">Board Meeting</option>
                                            <option value="deadline">Deadline</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label small fw-semibold">Company</label>
                                        <select
                                            className="form-select"
                                            name="company_id"
                                            value={formData.company_id}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select Company (Optional)</option>
                                            {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                        </select>
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label small fw-semibold">Location</label>
                                        <input
                                            className="form-control"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            placeholder="Enter location"
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label small fw-semibold">Description</label>
                                        <textarea
                                            className="form-control"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            rows={3}
                                            placeholder="Add event description..."
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer bg-light">
                                <button type="button" className="btn btn-white border px-4" onClick={onClose}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary px-4" disabled={isLoading}>
                                    {isLoading ? 'Creating...' : 'Create Event'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    )
}
