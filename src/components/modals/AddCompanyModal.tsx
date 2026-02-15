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

    // ⭐ basic validation
    if(!companyName || !cin){
      alert("Please enter Company Name and CIN")
      return
    }

    // ⭐ Fake ID (later replace with backend ID)
    const fakeClientId = Date.now()

    onClose()

    // ⭐ Pass data to dashboard
    navigate(`/clients/${fakeClientId}`, {
      state: {
        companyName,
        cin
      }
    })
  }

  return (
    <div className="modal-overlay">

      <div className="modal-box">

        <h5 className="fw-bold mb-3">Add Company</h5>

        <div className="mb-2">
          <label className="form-label small">Company Name</label>
          <input
            className="form-control"
            placeholder="24 Moontimes News Private Limited"
            value={companyName}
            onChange={(e)=>setCompanyName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label small">CIN / LLPIN</label>
          <input
            className="form-control"
            placeholder="U74999KA2024PTC123456"
            value={cin}
            onChange={(e)=>setCin(e.target.value)}
          />
        </div>

        <div className="d-flex justify-content-end gap-2">
          <button className="btn btn-outline-secondary" onClick={onClose}>
            Cancel
          </button>

          <button
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>

      </div>
    </div>
  )
}
