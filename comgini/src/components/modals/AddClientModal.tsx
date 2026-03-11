import { useState } from "react"
import clientService from "../../services/clients/client.service"

type Props = {
  onClose: () => void
  onSuccess?: () => void
}

export default function AddClientModal({ onClose, onSuccess }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company_name: "",
    cin: "",
    pan: "",
    gstin: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    client_group: "",
    risk_score: "low"
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    const requiredFields = Object.keys(formData).filter(key => key !== 'risk_score' && key !== 'client_group')
    const missingFields = requiredFields.filter(key => !formData[key as keyof typeof formData])

    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(", ")}`)
      return
    }

    try {
      setLoading(true)
      await clientService.createClient(formData)
      if (onSuccess) onSuccess()
      onClose()
      // navigate(`/clients/${response.id}`) // Removing navigation to focus on table visibility as per latest requirement
    } catch (error: any) {
      alert(error.message || "Failed to create client")
    } finally {
      setLoading(false)
    }
  }

  const fields = [
    { name: "name", label: "Client Name", placeholder: "Acme Corp" },
    { name: "email", label: "Email", placeholder: "contact@acme.com", type: "email" },
    { name: "phone", label: "Phone", placeholder: "9876543210" },
    { name: "company_name", label: "Company Name", placeholder: "Acme Corporation Pvt Ltd" },
    { name: "cin", label: "CIN", placeholder: "U12345MH2020PTC123456" },
    { name: "pan", label: "PAN", placeholder: "AAACA1234A" },
    { name: "gstin", label: "GSTIN", placeholder: "27AAACA1234A1Z5" },
    { name: "address", label: "Address", placeholder: "123 Business Park, Mumbai" },
    { name: "city", label: "City", placeholder: "Mumbai" },
    { name: "state", label: "State", placeholder: "Maharashtra" },
    { name: "pincode", label: "Pincode", placeholder: "400001" },
  ]

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        {/* ===== HEADER ===== */}
        <div
          className="d-flex justify-content-between align-items-center"
          style={{
            borderBottom: "1px solid #e5e5e5",
            paddingBottom: 12,
            marginBottom: 18
          }}
        >
          <h5 className="fw-bold mb-0">Add Client</h5>
          <span
            style={{ cursor: "pointer", fontSize: 18 }}
            onClick={onClose}
          >
            ✕
          </span>
        </div>

        {/* ===== FORM GRID ===== */}
        <div className="container-fluid" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          {fields.map(field => (
            <div className="row align-items-center mb-3" key={field.name}>
              <div className="col-md-4 small">{field.label}</div>
              <div className="col-md-8">
                <input
                  name={field.name}
                  type={field.type || "text"}
                  className="form-control"
                  placeholder={field.placeholder}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>
          ))}

          <div className="row align-items-center mb-3">
            <div className="col-md-4 small">Client Group</div>
            <div className="col-md-8">
              <select
                name="client_group"
                className="form-select"
                value={formData.client_group}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="">Select Group</option>
                <option value="Corporate">Corporate</option>
                <option value="Individual">Individual</option>
              </select>
            </div>
          </div>

          <div className="row align-items-center mb-3">
            <div className="col-md-4 small">Risk Score</div>
            <div className="col-md-8">
              <select
                name="risk_score"
                className="form-select"
                value={formData.risk_score}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </div>

        {/* ===== FOOTER ===== */}
        <div
          className="d-flex justify-content-end gap-2"
          style={{
            borderTop: "1px solid #e5e5e5",
            paddingTop: 14,
            marginTop: 18
          }}
        >
          <button
            className="btn btn-outline-secondary d-flex align-items-center gap-2"
            onClick={onClose}
            disabled={loading}
          >
            Close
          </button>

          <button
            className="btn btn-gradient d-flex align-items-center gap-2"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <div className="spinner-border spinner-border-sm text-light" role="status"></div>
            ) : "Save"}
          </button>
        </div>
      </div>
    </div>
  )
}



