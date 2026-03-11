import { useState } from "react"
import mastersService from "../../../../services/mastersService"
import type { CreateCompanyRequest } from "../../../../types/masters.types"

type Props = {
  show: boolean
  onClose: () => void
  onSuccess?: () => void
}

export default function AddCompanyModal({ show, onClose, onSuccess }: Props) {
  const [formData, setFormData] = useState({
    type: "company",
    cin: "",
    name: "",
    roc: "ROC-Mumbai",
    incorporationDate: "",
    email: "",
    authorizedCapital: "0",
    paidUpCapital: "0",
    address: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!show) return null

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    // Basic validation
    if (!formData.cin || !formData.name || !formData.email || !formData.incorporationDate || !formData.address) {
      setError("Please fill in all required fields (CIN, Name, Email, Date, Address).")
      return
    }

    setIsSubmitting(true)
    setError(null)
    try {
      // ⭐ TRANSFORMATION LOGIC
      const payload: CreateCompanyRequest = {
        name: formData.name,
        cin: formData.cin,
        company_type: formData.type as "company" | "llp",
        status: "Active",
        roc: formData.roc,
        registration_date: formData.incorporationDate,
        email: formData.email,
        address: formData.address,
        authorized_capital: Number(formData.authorizedCapital) || 0,
        paid_up_capital: Number(formData.paidUpCapital) || 0
      }

      await mastersService.createCompany(payload)

      if (onSuccess) onSuccess()
      onClose()
      // Reset form
      setFormData({
        type: "company",
        cin: "",
        name: "",
        roc: "ROC-Mumbai",
        incorporationDate: "",
        email: "",
        authorizedCapital: "0",
        paidUpCapital: "0",
        address: ""
      })
    } catch (err: any) {
      console.error("Failed to create company", err)
      setError(err.message || "Failed to create company. Please check your input.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999
      }}
    >
      <div
        className="card p-4"
        style={{
          width: "900px",
          borderRadius: "10px"
        }}
      >

        {/* ================= HEADER ================= */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="m-0">Add Company/LLP Manually</h6>

          <button
            onClick={onClose}
            className="btn btn-sm"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="alert alert-danger py-2 small mb-3">
            {error}
          </div>
        )}

        {/* ================= FORM GRID ================= */}
        <div className="row g-3">

          {/* ROW 1 */}
          <div className="col-md-4">
            <label className="form-label small mb-1">Type</label>
            <select
              className="form-select border-1"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
            >
              <option value="company">Company</option>
              <option value="llp">LLP</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label small mb-1">CIN / LLPIN</label>
            <input
              className="form-control"
              name="cin"
              placeholder="CIN/LLPIN"
              value={formData.cin}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label small mb-1">Company Name</label>
            <input
              className="form-control"
              name="name"
              placeholder="Company Name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          {/* ROW 2 */}
          <div className="col-md-4">
            <label className="form-label small mb-1">ROC</label>
            <input
              className="form-control"
              name="roc"
              placeholder="ROC"
              value={formData.roc}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label small mb-1">Registration Date</label>
            <input
              type="date"
              className="form-control"
              name="incorporationDate"
              placeholder="YYYY-MM-DD"
              value={formData.incorporationDate}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label small mb-1">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          {/* ROW 3 */}
          <div className="col-md-6">
            <label className="form-label small mb-1">Authorized Capital</label>
            <input
              className="form-control"
              name="authorizedCapital"
              type="number"
              placeholder="0"
              value={formData.authorizedCapital}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label small mb-1">Paid Up Capital</label>
            <input
              className="form-control"
              name="paidUpCapital"
              type="number"
              placeholder="0"
              value={formData.paidUpCapital}
              onChange={handleInputChange}
            />
          </div>

          {/* ROW 4 */}
          <div className="col-md-12">
            <label className="form-label small mb-1">Address</label>
            <input
              className="form-control"
              name="address"
              placeholder="Address Line"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>

        </div>

        {/* ================= FOOTER ================= */}
        <div className="d-flex justify-content-end mt-4">
          <button
            className="btn btn-sm"
            style={{ background: "#2E388E", color: "white" }}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                Submitting...
              </>
            ) : "Submit"}
          </button>
        </div>

      </div>
    </div>
  )
}
