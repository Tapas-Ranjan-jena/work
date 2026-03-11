import { createPortal } from "react-dom"
import { useState, useEffect } from "react"
import financeService from "../../../../../services/financeService"
import clientService from "../../../../../services/clients/client.service"
import mastersService from "../../../../../services/mastersService"
import type { Invoice } from "../../../../../types/finance.types"

type Props = {
    open: boolean
    invoiceId: number | null
    onClose: () => void
}

export default function InvoiceDetailsModal({ open, invoiceId, onClose }: Props) {
    const [invoice, setInvoice] = useState<Invoice | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [clientName, setClientName] = useState("")
    const [companyName, setCompanyName] = useState("")

    useEffect(() => {
        if (open && invoiceId) {
            const fetchDetails = async () => {
                setIsLoading(true)
                try {
                    const data = await financeService.getInvoiceById(invoiceId)
                    setInvoice(data)

                    // Fetch names
                    const [client, company] = await Promise.all([
                        clientService.getClientById(data.client_id),
                        mastersService.getCompanies().then(res => res.data.find(c => c.id === data.company_id))
                    ])
                    setClientName(client.name)
                    setCompanyName(company?.name || `ID: ${data.company_id}`)
                } catch (error) {
                    console.error("Failed to fetch invoice details:", error)
                } finally {
                    setIsLoading(false)
                }
            }
            fetchDetails()
        }
    }, [open, invoiceId])

    if (!open) return null

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
            <div className="d-flex justify-content-center" style={{ paddingTop: "50px", paddingBottom: "50px" }}>
                <div className="modal-dialog modal-lg" style={{ maxWidth: "700px", width: "100%" }}>
                    <div className="modal-content shadow-lg border-0">
                        <div className="modal-header bg-primary text-white">
                            <h5 className="fw-bold m-0">Invoice Details - {invoice?.invoice_number || 'Loading...'}</h5>
                            <button className="btn-close btn-close-white" onClick={onClose}></button>
                        </div>

                        <div className="modal-body p-4">
                            {isLoading ? (
                                <div className="text-center py-5">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            ) : invoice ? (
                                <div>
                                    <div className="row g-4 mb-4">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="text-muted small d-block">Client</label>
                                                <span className="fw-bold">{clientName}</span>
                                            </div>
                                            <div className="mb-3">
                                                <label className="text-muted small d-block">Company</label>
                                                <span className="fw-bold">{companyName}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-6 text-md-end">
                                            <div className="mb-3">
                                                <label className="text-muted small d-block">Issue Date</label>
                                                <span className="fw-bold">{new Date(invoice.issue_date).toLocaleDateString()}</span>
                                            </div>
                                            <div className="mb-3">
                                                <label className="text-muted small d-block">Due Date</label>
                                                <span className="fw-bold">{new Date(invoice.due_date).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <h6 className="fw-bold border-bottom pb-2 mb-3">Items</h6>
                                    <div className="table-responsive border rounded mb-4">
                                        <table className="table table-sm align-middle mb-0">
                                            <thead className="table-light">
                                                <tr>
                                                    <th>Description</th>
                                                    <th className="text-center">Qty</th>
                                                    <th className="text-end">Rate</th>
                                                    <th className="text-end">Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {invoice.items?.map((item, idx) => (
                                                    <tr key={idx}>
                                                        <td>{item.description}</td>
                                                        <td className="text-center">{item.quantity}</td>
                                                        <td className="text-end">₹{item.rate.toLocaleString()}</td>
                                                        <td className="text-end">₹{item.amount.toLocaleString()}</td>
                                                    </tr>
                                                )) || (
                                                        <tr><td colSpan={4} className="text-center py-3 text-muted">No items found</td></tr>
                                                    )}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-7">
                                            {invoice.notes && (
                                                <>
                                                    <label className="text-muted small d-block mb-1">Notes</label>
                                                    <div className="bg-light p-2 rounded small">{invoice.notes}</div>
                                                </>
                                            )}
                                        </div>
                                        <div className="col-md-5">
                                            <div className="bg-light p-3 rounded">
                                                <div className="d-flex justify-content-between mb-2">
                                                    <span className="text-muted small">Subtotal:</span>
                                                    <span className="fw-semibold">₹{invoice.subtotal.toLocaleString()}</span>
                                                </div>
                                                <div className="d-flex justify-content-between mb-2">
                                                    <span className="text-muted small">Tax Amount:</span>
                                                    <span className="fw-semibold">₹{invoice.tax_amount.toLocaleString()}</span>
                                                </div>
                                                <hr />
                                                <div className="d-flex justify-content-between fw-bold text-primary">
                                                    <span>Total:</span>
                                                    <span>₹{invoice.total_amount.toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 p-3 rounded d-flex justify-content-between align-items-center" style={{ background: invoice.payment_status === 'paid' ? '#e6f4ea' : '#fff4e5' }}>
                                        <div>
                                            <span className="text-muted small d-block">Payment Status</span>
                                            <span className={`fw-bold ${invoice.payment_status === 'paid' ? 'text-success' : 'text-warning'}`}>
                                                {invoice.payment_status?.toUpperCase() || 'UNPAID'}
                                            </span>
                                        </div>
                                        {invoice.payment_date && (
                                            <div className="text-end">
                                                <span className="text-muted small d-block">Payment Date</span>
                                                <span className="fw-bold">{new Date(invoice.payment_date).toLocaleDateString()}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-5 text-muted">Invoice not found.</div>
                            )}
                        </div>

                        <div className="modal-footer bg-light">
                            <button className="btn btn-secondary px-4" onClick={onClose}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    )
}
