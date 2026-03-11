import { useState } from "react"
import clientService from "../../services/clients/client.service"

type Props = {
  onClose: () => void
  onContactAdded?: () => void
  clientId?: number // Optional prop if we're adding to a specific client
}

export default function AddContactModal({ onClose, onContactAdded, clientId: propClientId }: Props) {
  const [client_id, setClientId] = useState<number | null>(propClientId || null)
  const [name, setName] = useState("")
  const [designation, setDesignation] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [is_primary, setIsPrimary] = useState<0 | 1>(0)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (client_id === null) {
      alert("Please enter a client ID")
      return
    }
    if (!name || !email || !phone || !designation) {
      alert("Please fill in all required fields (Full Name, Email, Phone, Designation)")
      return
    }

    try {
      setLoading(true)
      await clientService.addClientContact(client_id as number, {
        name,
        designation,
        email,
        phone,
        is_primary: is_primary === 1
      })
      if (onContactAdded) onContactAdded()
      onClose()
    } catch (error: any) {
      alert(error.message || "Failed to add contact")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ===== HEADER ===== */}
        <div
          className="d-flex justify-content-between align-items-center"
          style={{
            borderBottom: "1px solid #e5e5e5",
            paddingBottom: 12,
            marginBottom: 18
          }}
        >
          <h5 className="fw-bold mb-0">Add Contact</h5>
          <span
            style={{ cursor: "pointer", fontSize: 18 }}
            onClick={onClose}
          >
            ✕
          </span>
        </div>

        {/* ===== FORM ===== */}
        <div className="container-fluid">
          <div className="row align-items-center mb-3">
            <div className="col-md-4 small">Client ID</div>
            <div className="col-md-8">
              <input
                type="number"
                className="form-control"
                placeholder="Enter Client ID"
                value={client_id || ""}
                onChange={(e) => setClientId(e.target.value ? parseInt(e.target.value) : null)}
                disabled={loading}
              />
            </div>
          </div>

          <div className="row align-items-center mb-3">
            <div className="col-md-4 small">Full Name</div>
            <div className="col-md-8">
              <input
                className="form-control"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          <div className="row align-items-center mb-3">
            <div className="col-md-4 small">Designation</div>
            <div className="col-md-8">
              <input
                className="form-control"
                placeholder="Designation"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          <div className="row align-items-center mb-3">
            <div className="col-md-4 small">Email</div>
            <div className="col-md-8">
              <input
                className="form-control"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          <div className="row align-items-center mb-3">
            <div className="col-md-4 small">Phone</div>
            <div className="col-md-8">
              <input
                className="form-control"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          <div className="row align-items-center mb-3">
            <div className="col-md-4 small">Primary Contact</div>
            <div className="col-md-8">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="is_primary"
                  checked={is_primary === 1}
                  onChange={(e) => setIsPrimary(e.target.checked ? 1 : 0)}
                  disabled={loading}
                />
                <label className="form-check-label small" htmlFor="is_primary">
                  Yes, make this the primary contact
                </label>
              </div>
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
            className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2"
            onClick={onClose}
            disabled={loading}
          >
            <span
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                border: "1.5px solid #000",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            Close
          </button>

          <button
            className="btn btn-gradient btn-sm d-flex align-items-center gap-2"
            onClick={handleSubmit}
            disabled={loading}
          >
            <span
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: "#fff",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {loading ? (
                <div className="spinner-border spinner-border-sm text-primary" role="status" style={{ width: 10, height: 10 }}></div>
              ) : (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="#2b4cb3"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  )
}
