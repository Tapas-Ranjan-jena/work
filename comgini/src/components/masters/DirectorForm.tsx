import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import mastersService from "../../services/mastersService"
import type { Director, CreateDirectorRequest } from "../../types/masters.types"

type Props = {
    open: boolean
    onClose: () => void
    onSuccess?: () => void
    companyId: number
    director?: Director | null // If provided, we are in Edit mode
}

export default function DirectorForm({ open, onClose, onSuccess, companyId, director }: Props) {
    const [formData, setFormData] = useState<CreateDirectorRequest & { is_active?: boolean }>({
        din: '',
        name: '',
        designation: '',
        appointment_date: '',
        tenure_years: 0
    })

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (director) {
            setFormData({
                din: director.din,
                name: director.name,
                designation: director.designation,
                appointment_date: director.appointment_date,
                tenure_years: director.tenure_years,
                is_active: director.is_active
            })
        } else {
            setFormData({
                din: '',
                name: '',
                designation: '',
                appointment_date: '',
                tenure_years: 0
            })
        }
    }, [director, open])

    if (!open) return null

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement
        const val = type === 'number' ? (value ? Number(value) : 0) : (type === 'checkbox' ? (e.target as HTMLInputElement).checked : value)

        setFormData(prev => ({ ...prev, [name]: val }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            if (director) {
                await mastersService.updateDirector(director.id, formData as any)
            } else {
                await mastersService.createDirector(companyId, formData as any)
            }
            onSuccess?.()
            onClose()
        } catch (error: any) {
            console.error("Director Save Error:", error)
            alert(error.message || "Failed to save director")
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
                <div className="modal-dialog" style={{ maxWidth: "500px", width: "100%" }}>
                    <div className="modal-content shadow-lg border-0">
                        <div className="modal-header bg-light">
                            <h5 className="fw-semibold m-0">{director ? 'Edit Director' : 'Add New Director'}</h5>
                            <button className="btn-close" onClick={onClose}></button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="modal-body px-4">
                                <div className="row g-3">
                                    <div className="col-12">
                                        <label className="form-label small fw-semibold">DIN</label>
                                        <input
                                            className="form-control"
                                            name="din"
                                            value={formData.din}
                                            onChange={handleChange}
                                            placeholder="Enter DIN"
                                            required
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label small fw-semibold">Full Name</label>
                                        <input
                                            className="form-control"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter full name"
                                            required
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label small fw-semibold">Designation</label>
                                        <input
                                            className="form-control"
                                            name="designation"
                                            value={formData.designation}
                                            onChange={handleChange}
                                            placeholder="e.g. Director, MD"
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label small fw-semibold">Appointment Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="appointment_date"
                                            value={formData.appointment_date}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label small fw-semibold">Tenure Years</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="tenure_years"
                                            value={formData.tenure_years}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {director && (
                                        <div className="col-12">
                                            <div className="form-check form-switch mt-2">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    name="is_active"
                                                    checked={formData.is_active}
                                                    onChange={handleChange}
                                                    id="directorActiveStatus"
                                                />
                                                <label className="form-check-label small fw-semibold" htmlFor="directorActiveStatus">
                                                    Is Active
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="modal-footer bg-light">
                                <button type="button" className="btn btn-white border px-4" onClick={onClose}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn text-white px-4" style={{ background: "#2E388E" }} disabled={isLoading}>
                                    {isLoading ? 'Saving...' : (director ? 'Update' : 'Create')}
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
