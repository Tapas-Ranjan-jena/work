import { useState, useEffect } from "react"
import clientService from "../../services/clients/client.service"
import type { Client } from "../../services/clients/types"

type Props = {
  onClose: () => void
  client?: Client
  onSuccess?: () => void
}

export default function AddCompanyModal({ onClose, client, onSuccess }: Props) {
  const [loading, setLoading] = useState(false)
  const isEditing = !!client

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cin: "",
    company_name: "",
    pan: "",
    gstin: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    client_group: "Corporate",
    risk_score: "low"
  })

  useEffect(() => {
    if (client) {
      setFormData({
        name: client.name || "",
        email: client.email || "",
        phone: client.phone || "",
        cin: client.cin || "",
        company_name: client.name || "",
        pan: "", // Not provided in Client type, keeping empty
        gstin: "",
        address: client.address || "",
        city: "",
        state: "",
        pincode: "",
        client_group: "Corporate",
        risk_score: "low"
      })
    }
  }, [client])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill in basic details (Name, Email, Phone)")
      return
    }

    try {
      setLoading(true)
      if (isEditing && client) {
        await clientService.updateClient(client.id, formData)
        alert(`Success: Company ${formData.name} updated!`)
        if (onSuccess) onSuccess()
      } else {
        const response = await clientService.createClient(formData)
        alert(`Success: Company ${response.name} created!`)
        if (onSuccess) onSuccess()
        onClose()
        // navigate(`/clients/${response.id}`) // Removing navigation as per latest requirement
        return
      }
      onClose()
    } catch (error: any) {
      alert(error.message || `Failed to ${isEditing ? 'update' : 'create'} company`)
    } finally {
      setLoading(false)
    }
  }

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
          <h5 className="fw-bold mb-0">{isEditing ? 'Edit' : 'Add'} Company</h5>
          <span
            style={{ cursor: "pointer", fontSize: 18 }}
            onClick={onClose}
          >
            ✕
          </span>
        </div>

        {/* ===== FORM BODY ===== */}
        <div className="container-fluid">
          <div className="row align-items-center mb-3">
            <div className="col-md-4 small">Company Name</div>
            <div className="col-md-8">
              <input
                name="name"
                className="form-control"
                placeholder="Enter Company Name"
                value={formData.name}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>

          <div className="row align-items-center mb-3">
            <div className="col-md-4 small">Email</div>
            <div className="col-md-8">
              <input
                name="email"
                type="email"
                className="form-control"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>

          <div className="row align-items-center mb-3">
            <div className="col-md-4 small">Phone</div>
            <div className="col-md-8">
              <input
                name="phone"
                className="form-control"
                placeholder="Enter Phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>

          <div className="row align-items-center mb-3">
            <div className="col-md-4 small">CIN</div>
            <div className="col-md-8">
              <input
                name="cin"
                className="form-control"
                placeholder="Enter CIN"
                value={formData.cin}
                onChange={handleChange}
                disabled={loading}
              />
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
            Cancel
          </button>

          <button
            className="btn btn-gradient d-flex align-items-center gap-2"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <div className="spinner-border spinner-border-sm text-light" role="status"></div>
            ) : isEditing ? "Update Company" : "Save Company"}
          </button>
        </div>
      </div>
    </div>
  )
}
