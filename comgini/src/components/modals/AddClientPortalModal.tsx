import { useState } from "react"
import { createPortal } from "react-dom"
import clientService from "../../services/clients/client.service"
import type { CreateClientPortalUserRequest } from "../../services/clients/types"

type Props = {
  onClose: () => void
  clientId: number
  onSuccess?: () => void
}

export default function AddClientPortalModal({ onClose, clientId, onSuccess }: Props) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<CreateClientPortalUserRequest>({
    clientId,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    skype: "",
    jobTitle: "",
    gender: "male",
    password: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
    let password = ""
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setFormData(prev => ({ ...prev, password }))
  }

  const handleSubmit = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      alert("Please fill in all required fields (Name, Email, Password)")
      return
    }

    try {
      setLoading(true)
      await clientService.createClientPortalUser(formData)
      alert("Client portal user created successfully!")
      if (onSuccess) onSuccess()
      onClose()
    } catch (error: any) {
      alert(error.message || "Failed to create portal user")
    } finally {
      setLoading(false)
    }
  }

  return createPortal(
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
          <h5 className="fw-bold mb-0">Add Client Portal</h5>
          <span
            style={{ cursor: "pointer", fontSize: 18 }}
            onClick={onClose}
          >
            ✕
          </span>
        </div>

        {/* ===== FORM GRID ===== */}
        <div className="container-fluid" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          <div className="row align-items-center mb-3">
            <div className="col-md-4 small">First Name</div>
            <div className="col-md-8">
              <input
                name="firstName"
                className="form-control"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>

          <div className="row align-items-center mb-3">
            <div className="col-md-4 small">Last Name</div>
            <div className="col-md-8">
              <input
                name="lastName"
                className="form-control"
                placeholder="Last Name"
                value={formData.lastName}
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
                placeholder="Email"
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
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>

          <div className="row align-items-center mb-3">
            <div className="col-md-4 small">Skype</div>
            <div className="col-md-8">
              <input
                name="skype"
                className="form-control"
                placeholder="Skype"
                value={formData.skype}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>

          <div className="row align-items-center mb-3">
            <div className="col-md-4 small">Job Title</div>
            <div className="col-md-8">
              <input
                name="jobTitle"
                className="form-control"
                placeholder="Job Title"
                value={formData.jobTitle}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>

          {/* GENDER */}
          <div className="row align-items-center mb-3">
            <div className="col-md-4 small">Gender</div>
            <div className="col-md-8 d-flex gap-3">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                  disabled={loading}
                /> Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                  disabled={loading}
                /> Female
              </label>
            </div>
          </div>

          {/* PASSWORD */}
          <div className="row align-items-center mb-3">
            <div className="col-md-4 small">Password</div>
            <div className="col-md-8 d-flex gap-2">
              <input
                name="password"
                className="form-control"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
              />
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={generatePassword}
                disabled={loading}
              >
                Generate
              </button>
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
    </div>,
    document.body
  )
}
