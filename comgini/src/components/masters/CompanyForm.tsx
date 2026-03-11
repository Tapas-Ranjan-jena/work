import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import mastersService from "../../services/mastersService"
import type { Company, CreateCompanyRequest } from "../../types/masters.types"

type Props = {
    open: boolean
    onClose: () => void
    onSuccess?: () => void
    company?: Company | null // If provided, we are in Edit mode
}

export default function CompanyForm({ open, onClose, onSuccess, company }: Props) {
    const [formData, setFormData] = useState<CreateCompanyRequest>({
        name: '',
        cin: '',
        company_type: 'company',
        status: 'Active',
        roc: '',
        registration_date: '',
        email: '',
        address: '',
        authorized_capital: 0,
        paid_up_capital: 0
    })

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (company) {
            setFormData({
                name: company.name,
                cin: company.cin,
                company_type: (company.company_type.toLowerCase() === 'llp' ? 'llp' : 'company') as any,
                status: (company.status === 'Inactive' ? 'Inactive' : 'Active') as any,
                roc: company.roc,
                registration_date: company.registration_date,
                email: company.email,
                address: company.address,
                authorized_capital: Number(company.authorized_capital),
                paid_up_capital: Number(company.paid_up_capital)
            })
        } else {
            setFormData({
                name: '',
                cin: '',
                company_type: 'company',
                status: 'Active',
                roc: '',
                registration_date: '',
                email: '',
                address: '',
                authorized_capital: 0,
                paid_up_capital: 0
            })
        }
    }, [company, open])

    if (!open) return null

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target as HTMLInputElement
        const val = type === 'number' ? (value ? Number(value) : 0) : value

        setFormData(prev => ({ ...prev, [name]: val }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            if (company) {
                await mastersService.updateCompany(company.id, formData)
            } else {
                await mastersService.createCompany(formData)
            }
            onSuccess?.()
            onClose()
        } catch (error: any) {
            console.error("Company Save Error:", error)
            alert(error.message || "Failed to save company")
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
                <div className="modal-dialog" style={{ maxWidth: "700px", width: "100%" }}>
                    <div className="modal-content shadow-lg border-0">
                        <div className="modal-header bg-light">
                            <h5 className="fw-semibold m-0">{company ? 'Edit Company' : 'Add New Company'}</h5>
                            <button className="btn-close" onClick={onClose}></button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="modal-body px-4">
                                <div className="row g-3">
                                    <div className="col-md-12">
                                        <label className="form-label small fw-semibold">Company Name</label>
                                        <input
                                            className="form-control"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter company name"
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label small fw-semibold">CIN / LLPIN</label>
                                        <input
                                            className="form-control"
                                            name="cin"
                                            value={formData.cin}
                                            onChange={handleChange}
                                            placeholder="Enter CIN"
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label small fw-semibold">Type</label>
                                        <select
                                            className="form-select"
                                            name="company_type"
                                            value={formData.company_type}
                                            onChange={handleChange}
                                        >
                                            <option value="company">Company</option>
                                            <option value="llp">LLP</option>
                                        </select>
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label small fw-semibold">ROC</label>
                                        <input
                                            className="form-control"
                                            name="roc"
                                            value={formData.roc}
                                            onChange={handleChange}
                                            placeholder="Enter ROC"
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label small fw-semibold">Registration Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="registration_date"
                                            value={formData.registration_date}
                                            onChange={handleChange}
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
                                        <label className="form-label small fw-semibold">Status</label>
                                        <select
                                            className="form-select"
                                            name="status"
                                            value={formData.status}
                                            onChange={handleChange}
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label small fw-semibold">Authorized Capital</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="authorized_capital"
                                            value={formData.authorized_capital}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label small fw-semibold">Paid up Capital</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="paid_up_capital"
                                            value={formData.paid_up_capital}
                                            onChange={handleChange}
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
                                <button type="submit" className="btn btn-primary px-4" disabled={isLoading}>
                                    {isLoading ? 'Saving...' : (company ? 'Update' : 'Create')}
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
