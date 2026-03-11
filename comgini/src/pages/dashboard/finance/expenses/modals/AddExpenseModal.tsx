import { createPortal } from "react-dom"
import { useState } from "react"
import financeService from "../../../../../services/financeService"
import type { CreateExpenseRequest } from "../../../../../types/finance.types"

type Props = {
  open: boolean
  onClose: () => void
  onSuccess?: () => void
}

export default function AddExpenseModal({ open, onClose, onSuccess }: Props) {
  const [formData, setFormData] = useState<CreateExpenseRequest>({
    expense_date: new Date().toISOString().split('T')[0],
    amount: 0,
    category: "",
    payment_mode: "upi",
    description: ""
  })

  const [isLoading, setIsLoading] = useState(false)

  // Demo categories
  const categories = ["Marketing", "Operations", "Salaries", "Software", "Miscellaneous"]

  if (!open) return null

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev: CreateExpenseRequest) => ({
      ...prev,
      [name]: name === 'amount' ? Number(value) : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await financeService.createExpense(formData)
      onSuccess?.()
      onClose()
      alert("Expense created successfully!")
    } catch (error: any) {
      alert(error.message || "Failed to create expense")
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
        <div className="modal-dialog shadow-lg border-0" style={{ maxWidth: "550px", width: "100%" }}>
          <div className="modal-content">
            <div className="modal-header bg-light">
              <h5 className="fw-bold m-0 text-primary">Add New Expense</h5>
              <button className="btn-close" onClick={onClose} disabled={isLoading}></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body p-4">
                <div className="row g-3">

                  {/* Row 1 */}
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Date of Expense</label>
                    <input
                      type="date"
                      className="form-control"
                      name="expense_date"
                      value={formData.expense_date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Amount</label>
                    <div className="input-group">
                      <span className="input-group-text">₹</span>
                      <input
                        type="number"
                        className="form-control"
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Category</label>
                    <select
                      className="form-select"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Payment Mode</label>
                    <select
                      className="form-select"
                      name="payment_mode"
                      value={formData.payment_mode}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="upi">UPI</option>
                      <option value="cash">Cash</option>
                      <option value="bank">Bank</option>
                    </select>
                  </div>

                  {/* Row 3 */}
                  <div className="col-12">
                    <label className="form-label small fw-semibold">Description</label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Enter expense details..."
                      required
                    ></textarea>
                  </div>

                </div>
              </div>

              <div className="modal-footer bg-light p-3">
                <button type="button" className="btn btn-secondary px-4 me-2" onClick={onClose} disabled={isLoading}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary px-4" disabled={isLoading}>
                  {isLoading ? 'Submitting...' : 'Add Expense'}
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