import { useNavigate } from "react-router-dom"
import { useState } from "react"

type Props = {
  onClose: () => void
}

export default function AddCompanyModal({ onClose }: Props) {

  const navigate = useNavigate()

  const [companyName, setCompanyName] = useState("")
  const [cin, setCin] = useState("")

  const handleSubmit = () => {

    if (!companyName || !cin) {
      alert("Please enter Company Name and CIN")
      return
    }

    const fakeClientId = Date.now()

    onClose()

    navigate(`/clients/${fakeClientId}`, {
      state: {
        companyName,
        cin
      }
    })
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
          <h5 className="fw-bold mb-0">Add Company</h5>

          <span
            style={{ cursor: "pointer", fontSize: 18 }}
            onClick={onClose}
          >
            ✕
          </span>
        </div>


        {/* ===== FORM BODY (LEFT LABEL | RIGHT INPUT) ===== */}
        <div className="container-fluid">

          {/* Company Name */}
          <div className="row align-items-center mb-3">
            <div className="col-md-4 small">Company Name</div>

            <div className="col-md-8">
              <input
                className="form-control"
                placeholder="24 Moontimes News Private Limited"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
          </div>

          {/* CIN */}
          <div className="row align-items-center mb-3">
            <div className="col-md-4 small">CIN / LLPIN</div>

            <div className="col-md-8">
              <input
                className="form-control"
                placeholder="U74999KA2024PTC123456"
                value={cin}
                onChange={(e) => setCin(e.target.value)}
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
            className="btn btn-outline-secondary"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="btn btn-gradient"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>

      </div>
    </div>
  )
}
