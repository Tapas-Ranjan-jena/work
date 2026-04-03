import { useState } from "react"
import toast from "react-hot-toast"

export default function ISINDetailsTab() {
  const [formData, setFormData] = useState({
    cin: "",
    depository: "CDSL",
    security_type: "Equity",
    security_name: "",
    face_value: "",
    paid_up_value: "",
    approval_mode: "In Board meeting",
    meeting_date: "",
    meeting_time: "10:26 AM",
    authorized_signatory1: "",
    authorized_signatory2: "",
    signing_signatory1: "",
    signing_signatory2: "",
    signing_date: "",
    signing_place: "",
    declaration_signatory: "",
    declaration_date: "",
    declaration_place: ""
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    toast.success("ISIN Details saved locally. Proceed to next tab.")
  }

  return (
    <form onSubmit={handleSubmit} className="text-start">
      <div className="row g-0 border rounded overflow-hidden">
        {/* CIN & Depository */}
        <div className="col-md-6 border-end border-bottom d-flex align-items-stretch">
          <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>CIN</div>
          <div className="flex-grow-1 p-2 d-flex gap-2">
            <input 
              name="cin"
              type="text" 
              className="form-control form-control-sm border shadow-none" 
              placeholder="CIN"
              value={formData.cin}
              onChange={handleChange}
            />
            <button type="button" className="btn btn-sm btn-white border shadow-none"><i className="bi bi-search"></i></button>
          </div>
        </div>
        <div className="col-md-6 border-bottom d-flex align-items-stretch">
          <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Depository</div>
          <div className="flex-grow-1 p-2 d-flex align-items-center gap-4 px-3">
             {["CDSL", "NSDL", "Both"].map((opt) => (
                <div key={opt} className="form-check form-check-inline mb-0">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="depository" 
                        value={opt}
                        checked={formData.depository === opt}
                        onChange={handleChange}
                    />
                    <label className="form-check-label small">{opt}</label>
                </div>
             ))}
          </div>
        </div>

        {/* Security Type & Name */}
        <div className="col-md-6 border-end border-bottom d-flex align-items-stretch">
          <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Type of Security</div>
          <div className="flex-grow-1 p-2 d-flex align-items-center gap-3 px-3">
             {["Equity", "Preference", "Debenture"].map((opt) => (
                <div key={opt} className="form-check form-check-inline mb-0">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="security_type" 
                        value={opt}
                        checked={formData.security_type === opt}
                        onChange={handleChange}
                    />
                    <label className="form-check-label small">{opt}</label>
                </div>
             ))}
          </div>
        </div>
        <div className="col-md-6 border-bottom d-flex align-items-stretch">
          <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Name of Security</div>
          <div className="flex-grow-1 p-2">
            <input 
              name="security_name"
              type="text" 
              className="form-control form-control-sm border shadow-none" 
              value={formData.security_name}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Values */}
        <div className="col-md-6 border-end border-bottom d-flex align-items-stretch">
          <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Face value per share</div>
          <div className="flex-grow-1 p-2">
            <input 
              name="face_value"
              type="text" 
              className="form-control form-control-sm border shadow-none" 
              value={formData.face_value}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-6 border-bottom d-flex align-items-stretch">
          <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Paid-up value per share</div>
          <div className="flex-grow-1 p-2">
            <input 
              name="paid_up_value"
              type="text" 
              className="form-control form-control-sm border shadow-none" 
              value={formData.paid_up_value}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* Particulars of resolution */}
      <div className="mt-5 border rounded overflow-hidden">
        <div className="col-12 bg-light px-3 py-2 fw-bold border-bottom">Particulars of resolution - Appointment of RTA</div>
        <div className="col-12 border-bottom d-flex align-items-stretch">
          <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Approval Mode</div>
          <div className="flex-grow-1 p-2 d-flex align-items-center gap-4 px-3">
             {["In Board meeting", "By Circular Resolution"].map((opt) => (
                <div key={opt} className="form-check form-check-inline mb-0">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="approval_mode" 
                        value={opt}
                        checked={formData.approval_mode === opt}
                        onChange={handleChange}
                    />
                    <label className="form-check-label small">{opt}</label>
                </div>
             ))}
          </div>
        </div>

        <div className="row g-0">
          <div className="col-md-6 border-end border-bottom d-flex align-items-stretch">
            <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Date of Meeting/Resolution</div>
            <div className="flex-grow-1 p-2"><input type="text" name="meeting_date" className="form-control form-control-sm border shadow-none" placeholder="d/m/Y" value={formData.meeting_date} onChange={handleChange} /></div>
          </div>
          <div className="col-md-6 border-bottom d-flex align-items-stretch">
            <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Time of Meeting</div>
            <div className="flex-grow-1 p-2 d-flex align-items-center gap-2">
                 <input type="text" name="meeting_time" className="form-control form-control-sm border shadow-none" value={formData.meeting_time} onChange={handleChange} />
                 <i className="bi bi-clock"></i>
            </div>
          </div>

          <div className="col-md-6 border-end border-bottom d-flex align-items-stretch">
            <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Authorized Signatory 1</div>
            <div className="flex-grow-1 p-2">
              <select name="authorized_signatory1" className="form-select form-select-sm border shadow-none" value={formData.authorized_signatory1} onChange={handleChange}>
                <option value="">Select Director</option>
              </select>
            </div>
          </div>
          <div className="col-md-6 border-bottom d-flex align-items-stretch">
            <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Authorized Signatory 2</div>
            <div className="flex-grow-1 p-2">
              <select name="authorized_signatory2" className="form-select form-select-sm border shadow-none" value={formData.authorized_signatory2} onChange={handleChange}>
                <option value="">Select Director</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* SIGNING OF CTC */}
      <div className="mt-5 border rounded overflow-hidden">
        <div className="col-12 bg-light px-3 py-2 fw-bold border-bottom">SIGNING OF CTC</div>
        <div className="row g-0">
          <div className="col-md-6 border-end border-bottom d-flex align-items-stretch">
            <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Signing Signatory 1</div>
            <div className="flex-grow-1 p-2">
              <select name="signing_signatory1" className="form-select form-select-sm border shadow-none" value={formData.signing_signatory1} onChange={handleChange}>
                <option value="">Select Director</option>
              </select>
            </div>
          </div>
          <div className="col-md-6 border-bottom d-flex align-items-stretch">
            <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Address of signatory 1</div>
            <div className="flex-grow-1 p-2"><input type="text" className="form-control form-control-sm border shadow-none bg-light" disabled /></div>
          </div>

          <div className="col-md-6 border-end border-bottom d-flex align-items-stretch">
            <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Signing Signatory 2</div>
            <div className="flex-grow-1 p-2">
              <select name="signing_signatory2" className="form-select form-select-sm border shadow-none" value={formData.signing_signatory2} onChange={handleChange}>
                <option value="">Select Director</option>
              </select>
            </div>
          </div>
          <div className="col-md-6 border-bottom d-flex align-items-stretch">
            <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Address of signatory 2</div>
            <div className="flex-grow-1 p-2"><input type="text" className="form-control form-control-sm border shadow-none bg-light" disabled /></div>
          </div>

          <div className="col-md-6 border-end d-flex align-items-stretch">
            <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Date of Signing of CTC</div>
            <div className="flex-grow-1 p-2"><input type="text" name="signing_date" className="form-control form-control-sm border shadow-none" placeholder="d/m/Y" value={formData.signing_date} onChange={handleChange} /></div>
          </div>
          <div className="col-md-6 d-flex align-items-stretch">
            <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "180px" }}>Place of Signing of CTC</div>
            <div className="flex-grow-1 p-2"><input type="text" name="signing_place" className="form-control form-control-sm border shadow-none" value={formData.signing_place} onChange={handleChange} /></div>
          </div>
        </div>
      </div>

       {/* Declaration undertaking */}
       <div className="mt-5 border rounded overflow-hidden">
        <div className="col-12 bg-light px-3 py-2 fw-bold border-bottom">Declaration undertaking for Private/Public Co.</div>
        <div className="row g-0">
          <div className="col-md-4 border-end d-flex align-items-stretch">
            <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "150px" }}>Signing Person</div>
            <div className="flex-grow-1 p-2">
              <select name="declaration_signatory" className="form-select form-select-sm border shadow-none" value={formData.declaration_signatory} onChange={handleChange}>
                <option value="">Select Director</option>
              </select>
            </div>
          </div>
          <div className="col-md-4 border-end d-flex align-items-stretch">
            <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "150px" }}>Signing Date</div>
            <div className="flex-grow-1 p-2"><input type="text" name="declaration_date" className="form-control form-control-sm border shadow-none" placeholder="d/m/Y" value={formData.declaration_date} onChange={handleChange} /></div>
          </div>
          <div className="col-md-4 d-flex align-items-stretch">
            <div className="bg-light px-3 py-2 fw-bold small border-end d-flex align-items-center" style={{ minWidth: "150px" }}>Signing Place</div>
            <div className="flex-grow-1 p-2"><input type="text" name="declaration_place" className="form-control form-control-sm border shadow-none" value={formData.declaration_place} onChange={handleChange} /></div>
          </div>
        </div>
      </div>

      <div className="mt-4 pb-5">
         <button type="submit" className="btn btn-primary px-5 py-2 fw-bold" style={{ background: "#2b4cb3" }}>Submit</button>
      </div>
    </form>
  )
}
