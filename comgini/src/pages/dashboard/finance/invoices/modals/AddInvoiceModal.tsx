import { createPortal } from "react-dom"
import { useState, useEffect } from "react"
import financeService from "../../../../../services/financeService"
import clientService from "../../../../../services/clients/client.service"
import mastersService from "../../../../../services/mastersService"
import type { Company } from "../../../../../types/masters.types"
import type { Client } from "../../../../../services/clients/types"
import type { CreateInvoiceRequest, InvoiceItem } from "../../../../../types/finance.types"

type Props = {
  open: boolean
  onClose: () => void
  onSuccess?: () => void
}

export default function AddInvoiceModal({ open, onClose, onSuccess }: Props) {
  const [formData, setFormData] = useState<CreateInvoiceRequest>({
    invoice_number: "",
    client_id: 0,
    company_id: 0,
    issue_date: new Date().toISOString().split('T')[0],
    due_date: "",
    subtotal: 0,
    tax_amount: 0,
    total_amount: 0,
    notes: "",
    items: [{ description: "", quantity: 1, rate: 0, amount: 0 }]
  })

  const [clients, setClients] = useState<Client[]>([])
  const [companies, setCompanies] = useState<Company[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (open) {
      const fetchInitialData = async () => {
        try {
          const [clientRes, compRes] = await Promise.all([
            clientService.getClients(1, 1000),
            mastersService.getCompanies(1, 1000)
          ])
          setClients(clientRes.data)
          setCompanies(compRes.data)
        } catch (error) {
          console.error("Failed to fetch initial data for invoice modal:", error)
        }
      }
      fetchInitialData()
    }
  }, [open])

  // Calculation Logic
  useEffect(() => {
    const subtotal = formData.items.reduce((acc, item) => acc + item.amount, 0)
    const total = subtotal + Number(formData.tax_amount)
    setFormData((prev: CreateInvoiceRequest) => ({ ...prev, subtotal, total_amount: total }))
  }, [formData.items, formData.tax_amount])

  if (!open) return null

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev: CreateInvoiceRequest) => ({
      ...prev,
      [name]: (name === 'client_id' || name === 'company_id' || name === 'tax_amount') ? Number(value) : value
    }))
  }

  const handleItemChange = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = [...formData.items]
    const item = { ...newItems[index], [field]: value }

    if (field === 'quantity' || field === 'rate') {
      item.amount = Number(item.quantity) * Number(item.rate)
    }

    newItems[index] = item
    setFormData((prev: CreateInvoiceRequest) => ({ ...prev, items: newItems }))
  }

  const addItem = () => {
    setFormData((prev: CreateInvoiceRequest) => ({
      ...prev,
      items: [...prev.items, { description: "", quantity: 1, rate: 0, amount: 0 }]
    }))
  }

  const removeItem = (index: number) => {
    if (formData.items.length > 1) {
      const newItems = formData.items.filter((_, i) => i !== index)
      setFormData((prev: CreateInvoiceRequest) => ({ ...prev, items: newItems }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await financeService.createInvoice(formData)
      onSuccess?.()
      onClose()
    } catch (error: any) {
      alert(error.message || "Failed to create invoice")
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
        overflowY: "auto"
      }}
    >
      <div className="d-flex justify-content-center" style={{ paddingTop: "50px", paddingBottom: "50px" }}>
        <div className="modal-dialog modal-xl" style={{ maxWidth: "1000px", width: "100%" }}>
          <div className="modal-content shadow-lg border-0">
            <div className="modal-header bg-light">
              <h5 className="fw-bold m-0 text-primary">Create New Invoice</h5>
              <button className="btn-close" onClick={onClose}></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body p-4">
                {/* Basic Info */}
                <div className="row g-3 mb-4">
                  <div className="col-md-3">
                    <label className="form-label small fw-semibold">Invoice Number</label>
                    <input
                      type="text"
                      className="form-control"
                      name="invoice_number"
                      value={formData.invoice_number}
                      onChange={handleInputChange}
                      placeholder="e.g. INV-2026-001"
                      required
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label small fw-semibold">Client</label>
                    <select
                      className="form-select"
                      name="client_id"
                      value={formData.client_id}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Client</option>
                      {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label small fw-semibold">Company</label>
                    <select
                      className="form-select"
                      name="company_id"
                      value={formData.company_id}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Company</option>
                      {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label small fw-semibold">Issue Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="issue_date"
                      value={formData.issue_date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label small fw-semibold">Due Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="due_date"
                      value={formData.due_date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                {/* Items Table */}
                <h6 className="fw-bold border-bottom pb-2 mb-3">Invoice Items</h6>
                <div className="table-responsive border rounded mb-3">
                  <table className="table table-sm align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th style={{ width: "45%" }}>Description</th>
                        <th className="text-center" style={{ width: "10%" }}>Qty</th>
                        <th className="text-center" style={{ width: "15%" }}>Rate</th>
                        <th className="text-center" style={{ width: "20%" }}>Amount</th>
                        <th style={{ width: "10%" }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.items.map((item, idx) => (
                        <tr key={idx}>
                          <td>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              value={item.description}
                              onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                              placeholder="Item description"
                              required
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control form-control-sm text-center"
                              value={item.quantity}
                              onChange={(e) => handleItemChange(idx, 'quantity', Number(e.target.value))}
                              min="1"
                              required
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control form-control-sm text-end"
                              value={item.rate}
                              onChange={(e) => handleItemChange(idx, 'rate', Number(e.target.value))}
                              min="0"
                              required
                            />
                          </td>
                          <td className="text-end pe-4">
                            ₹{item.amount.toLocaleString()}
                          </td>
                          <td className="text-center">
                            <button
                              type="button"
                              className="btn btn-sm text-danger"
                              onClick={() => removeItem(idx)}
                              disabled={formData.items.length === 1}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <button type="button" className="btn btn-sm btn-outline-primary mb-4" onClick={addItem}>
                  <i className="bi bi-plus-lg me-1"></i> Add Item
                </button>

                <div className="row">
                  <div className="col-md-7">
                    <label className="form-label small fw-semibold">Notes</label>
                    <textarea
                      className="form-control"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Special instructions or notes..."
                    ></textarea>
                  </div>
                  <div className="col-md-5">
                    <div className="card bg-light border-0 p-3 mt-4">
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted small">Subtotal:</span>
                        <span className="fw-semibold">₹{formData.subtotal.toLocaleString()}</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-muted small">Tax Amount:</span>
                        <input
                          type="number"
                          className="form-control form-control-sm text-end"
                          style={{ width: "120px" }}
                          name="tax_amount"
                          value={formData.tax_amount}
                          onChange={handleInputChange}
                        />
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between h5 fw-bold text-primary mb-0">
                        <span>Total:</span>
                        <span>₹{formData.total_amount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer bg-light p-3">
                <button type="button" className="btn btn-secondary px-4 me-2" onClick={onClose} disabled={isLoading}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary px-4" disabled={isLoading}>
                  {isLoading ? 'Creating...' : 'Create Invoice'}
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