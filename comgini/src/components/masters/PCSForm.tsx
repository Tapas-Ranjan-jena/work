import { useState } from "react"
import { createPortal } from "react-dom"
import mastersService from "../../services/mastersService"
import type { CreatePCSFirmRequest } from "../../types/masters.types"

type Props = {
    open: boolean
    onClose: () => void
    onSuccess?: () => void
}

export default function PCSForm({ open, onClose, onSuccess }: Props) {
    const [formData, setFormData] = useState<CreatePCSFirmRequest>({
        firm_name: '',
        urn: '',
        address: '',
        gstin: '',
        pan: '',
        contact_person: '',
        phone: '',
        email: '',
        firm_type: 'pcs'
    })

    const [isLoading, setIsLoading] = useState(false)

    if (!open) return null

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            await mastersService.createPCSFirm(formData)
            onSuccess?.()
            onClose()
        } catch (error: any) {
            console.error("PCS Firm Save Error:", error)
            alert(error.message || "Failed to save PCS Firm")
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
                            <h5 className="fw-semibold m-0">Add New PCS Firm</h5>
                            <button className="btn-close" onClick={onClose}></button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="modal-body px-4">
                                <div className="row g-3">
                                    <div className="col-12">
                                        <label className="form-label small fw-semibold">Firm Name</label>
                                        <input
                                            className="form-control"
                                            name="firm_name"
                                            value={formData.firm_name}
                                            onChange={handleChange}
                                            placeholder="Enter firm name"
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label small fw-semibold">URN</label>
                                        <input
                                            className="form-control"
                                            name="urn"
                                            value={formData.urn}
                                            onChange={handleChange}
                                            placeholder="Enter URN"
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label small fw-semibold">Contact Person</label>
                                        <input
                                            className="form-control"
                                            name="contact_person"
                                            value={formData.contact_person}
                                            onChange={handleChange}
                                            placeholder="Enter contact person"
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label small fw-semibold">Phone</label>
                                        <input
                                            className="form-control"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Enter phone"
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label small fw-semibold">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter email"
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label small fw-semibold">GSTIN</label>
                                        <input
                                            className="form-control"
                                            name="gstin"
                                            value={formData.gstin}
                                            onChange={handleChange}
                                            placeholder="Enter GSTIN"
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label small fw-semibold">PAN</label>
                                        <input
                                            className="form-control"
                                            name="pan"
                                            value={formData.pan}
                                            onChange={handleChange}
                                            placeholder="Enter PAN"
                                            required
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label small fw-semibold">Address</label>
                                        <textarea
                                            className="form-control"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            rows={2}
                                            placeholder="Enter address"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer bg-light">
                                <button type="button" className="btn btn-white border px-4" onClick={onClose}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn text-white px-4" style={{ background: "#2E388E" }} disabled={isLoading}>
                                    {isLoading ? 'Saving...' : 'Create Firm'}
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
