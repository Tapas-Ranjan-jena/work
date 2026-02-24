import { useRef } from "react"
import { createPortal } from "react-dom"

type Props = {
  open: boolean
  onClose: () => void
}

export default function AddRegistrationModal({ open, onClose }: Props) {
  const fileRef = useRef<HTMLInputElement>(null)

  if (!open) return null

  return createPortal(
    <div
      className="modal d-block"
      style={{
        background: "#00000066",
        position: "fixed",
        inset: 0,
        zIndex: 3000,
        overflowY: "auto",
      }}
    >
      {/* ⭐ LOWERED + CENTERED */}
      <div
        className="d-flex justify-content-center"
        style={{ paddingTop: "80px", paddingBottom: "40px" }}
      >
        <div className="modal-dialog" style={{ maxWidth: "1100px", width: "100%" }}>
          <div className="modal-content">

            {/* ================= HEADER ================= */}
            <div className="modal-header">
              <h5 className="fw-semibold m-0">Add Registration</h5>
              <button className="btn-close" onClick={onClose}></button>
            </div>

            {/* ================= BODY ================= */}
            <div className="modal-body px-4">

              <div className="row g-4">

                {/* ===== LEFT COLUMN ===== */}
                <div className="col-lg-6 col-12">

                  <label className="form-label small">Company name</label>
                  <select className="form-select mb-3">
                    <option>Select</option>
                  </select>

                  <label className="form-label small">Status</label>
                  <select className="form-select mb-3">
                    <option>Select</option>
                  </select>

                  <label className="form-label small">Regn./Licence Name</label>
                  <input className="form-control mb-3" placeholder="Regn./Licence Name" />

                  <label className="form-label small">Regn./Licence Type</label>
                  <select className="form-select mb-3">
                    <option>Select</option>
                  </select>

                  <label className="form-label small">Expiry date</label>
                  <input type="date" className="form-control mb-3" />

                  <label className="form-label small">Alert User</label>
                  <input className="form-control" placeholder="Alert User" />

                </div>

                {/* ===== RIGHT COLUMN ===== */}
                <div className="col-lg-6 col-12">

                  <label className="form-label small">Registration / License</label>
                  <select className="form-select mb-3">
                    <option>Select</option>
                  </select>

                  <label className="form-label small">Applied On</label>
                  <input type="date" className="form-control mb-3" />

                  <label className="form-label small">Regn./Licence Number</label>
                  <input className="form-control mb-3" placeholder="Regn./Licence Number" />

                  <label className="form-label small">Valid Form</label>
                  <input className="form-control mb-3" placeholder="Valid Form" />

                  <label className="form-label small">Key Terms</label>
                  <input className="form-control mb-3" placeholder="Key Terms" />

                  <label className="form-label small">Alert Before</label>
                  <select className="form-select">
                    <option>Select</option>
                  </select>

                </div>

                {/* ===== REMARKS FULL WIDTH ===== */}
                <div className="col-12">
                  <label className="form-label small">Remarks</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    placeholder="Remarks"
                  />
                </div>

              </div>
            </div>

            {/* ================= FOOTER ================= */}
            <div className="modal-footer d-flex justify-content-between">

              {/* ⭐ REAL FILE PICKER */}
              <>
                <input
                  ref={fileRef}
                  type="file"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) console.log("Selected:", file.name)
                  }}
                />

                <button
                  className="btn btn-light border"
                  onClick={() => fileRef.current?.click()}
                >
                  <i className="bi bi-camera me-1"></i>
                  Upload File
                </button>
              </>

              <div className="d-flex gap-2">
                <button className="btn btn-outline-secondary" onClick={onClose}>
                  <i className="bi bi-x-circle me-1"></i>
                  Close
                </button>

                <button className="btn btn-primary">
                  <i className="bi bi-check-circle me-1"></i>
                  Save
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}