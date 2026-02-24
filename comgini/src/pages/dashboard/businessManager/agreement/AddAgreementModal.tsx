import { useRef } from "react"
import { createPortal } from "react-dom"

type Props = {
  open: boolean
  onClose: () => void
}

export default function AddAgreementModal({ open, onClose }: Props) {
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
      <div className="d-flex justify-content-center" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
        <div className="modal-dialog modal-xl">
          <div className="modal-content">

            {/* ================= HEADER ================= */}
            <div className="modal-header">
              <h5 className="fw-semibold m-0">Add Agreement</h5>
              <button className="btn-close" onClick={onClose}></button>
            </div>

            {/* ================= BODY ================= */}
            <div className="modal-body px-4">

              <div className="row g-3">

                {/* LEFT COLUMN */}
                <div className="col-lg-6 col-12">

                  <div className="row align-items-center mb-3">
                    <label className="col-md-4 small">Company name</label>
                    <div className="col-md-8">
                      <select className="form-select">
                        <option>-</option>
                      </select>
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-md-4 small">Nature of Contract</label>
                    <div className="col-md-8">
                      <select className="form-select">
                        <option>Select</option>
                      </select>
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-md-4 small">Contract Period</label>
                    <div className="col-md-8">
                      <input className="form-control" placeholder="Contract Period" />
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-md-4 small">Date of Execution</label>
                    <div className="col-md-8">
                      <input type="date" className="form-control" />
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-md-4 small">Expiry Date</label>
                    <div className="col-md-8">
                      <input type="date" className="form-control" />
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-md-4 small">Alert User</label>
                    <div className="col-md-8">
                      <input className="form-control" placeholder="Alert User" />
                    </div>
                  </div>

                </div>

                {/* RIGHT COLUMN */}
                <div className="col-lg-6 col-12">

                  <div className="row align-items-center mb-3">
                    <label className="col-md-4 small">Contract Name</label>
                    <div className="col-md-8">
                      <input className="form-control" placeholder="Contract Name" />
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-md-4 small">Contract Value (In Rs.)</label>
                    <div className="col-md-8">
                      <input className="form-control" placeholder="Contract Value (In Rs.)" />
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-md-4 small">Name of Party</label>
                    <div className="col-md-8">
                      <input className="form-control" placeholder="Name of Party" />
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-md-4 small">Start From</label>
                    <div className="col-md-8">
                      <input type="date" className="form-control" />
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-md-4 small">Key Terms</label>
                    <div className="col-md-8">
                      <input className="form-control" placeholder="Key Terms" />
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-md-4 small">Alert Before</label>
                    <div className="col-md-8">
                      <select className="form-select">
                        <option>Select</option>
                      </select>
                    </div>
                  </div>

                </div>

                {/* FULL WIDTH REMARKS */}
                <div className="col-12">
                  <div className="row align-items-center">
                    <label className="col-md-2 small">Remarks</label>
                    <div className="col-md-10">
                      <textarea className="form-control" rows={3}></textarea>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* ================= FOOTER ================= */}
            <div className="modal-footer d-flex justify-content-between">

              <>
                <input
                  ref={fileRef}
                  type="file"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) console.log("Selected file:", file.name)
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
                  Close
                </button>

                <button className="btn btn-primary">
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