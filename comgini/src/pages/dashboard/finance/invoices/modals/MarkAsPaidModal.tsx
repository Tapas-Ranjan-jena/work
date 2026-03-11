import { createPortal } from "react-dom"
import { useState } from "react"
import financeService from "../../../../../services/financeService"
import type { Invoice } from "../../../../../types/finance.types"

type Props = {
    open: boolean
    invoice: Invoice | null
    onClose: () => void
    onSuccess?: () => void
}

export default function MarkAsPaidModal({ open, invoice, onClose, onSuccess }: Props) {
    const [formData, setFormData] = useState({
        payment_status: "paid" as "paid" | "unpaid",
        payment_date: new Date().toISOString().split('T')[0]
    })
    const [isLoading, setIsLoading] = useState(false)

    if (!open || !invoice) return null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            await financeService.updateInvoicePayment(invoice.id, formData)
            onSuccess?.()
            onClose()
        } catch (error: any) {
            alert(error.message || "Failed to update payment status")
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
            }}
        >
            <div className="d-flex justify-content-center" style={{ paddingTop: "100px" }}>
                <div className="modal-dialog shadow-lg border-0" style={{ maxWidth: "450px", width: "100%" }}>
                    <div className="modal-content">
                        <div className="modal-header bg-light">
                            <h5 className="fw-bold m-0 text-success">Mark as Paid</h5>
                            <button className="btn-close" onClick={onClose}></button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="modal-body p-4">
                                <p className="small text-muted mb-4">
                                    Updating payment status for Invoice: <strong>{invoice.invoice_number}</strong>
                                </p>

                                <div className="mb-3">
                                    <label className="form-label small fw-semibold">Payment Status</label>
                                    <select
                                        className="form-select"
                                        value={formData.payment_status}
                                        onChange={(e) => setFormData((prev: any) => ({ ...prev, payment_status: e.target.value as any }))}
                                        required
                                    >
                                        <option value="paid">Paid</option>
                                        <option value="unpaid">Unpaid</option>
                                    </select>
                                </div>

                                <div className="mb-0">
                                    <label className="form-label small fw-semibold">Payment Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={formData.payment_date}
                                        onChange={(e) => setFormData((prev: any) => ({ ...prev, payment_date: e.target.value }))}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="modal-footer bg-light p-3">
                                <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isLoading}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-success px-4" disabled={isLoading}>
                                    {isLoading ? 'Updating...' : 'Update Status'}
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
