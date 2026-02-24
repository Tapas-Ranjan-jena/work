import { useRef } from "react"
import { createPortal } from "react-dom"

type Props = {
  open: boolean
  onClose: () => void
}

export default function AddInsuranceModal({ open, onClose }: Props) {
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
      {/* ⭐ LOWERED POSITION */}
      <div className="d-flex justify-content-center" style={{ paddingTop: "70px" }}>
        <div className="modal-dialog" style={{ maxWidth: "1200px" }}>
          <div className="modal-content">

            {/* ================= HEADER ================= */}
            <div className="modal-header">
              <h5 className="fw-semibold m-0">Add Insurance</h5>
              <button className="btn-close" onClick={onClose}></button>
            </div>

            {/* ================= BODY ================= */}
            <div className="modal-body px-4">
              <div className="row gy-3 gx-4">

                {/* ===== LEFT COLUMN ===== */}
                <div className="col-md-6">

                  <div className="row align-items-center mb-3">
                    <label className="col-4 small">Company name</label>
                    <div className="col-8">
                      <select className="form-select"><option>Select</option></select>
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-4 small">Name of Insurance Broker / Agent</label>
                    <div className="col-8">
                      <select className="form-select"><option>Select</option></select>
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-4 small">Sum Insured (In Rs.)</label>
                    <div className="col-8">
                      <input className="form-control" placeholder="Sum Insured (In Rs.)" />
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-4 small">Policy Commencement Date</label>
                    <div className="col-8">
                      <input type="date" className="form-control" />
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-4 small">Start From</label>
                    <div className="col-8">
                      <input type="date" className="form-control" />
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-4 small">Asset Insured</label>
                    <div className="col-8">
                      <input className="form-control" placeholder="Asset Insured" />
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-4 small">Payment date</label>
                    <div className="col-8">
                      <input type="date" className="form-control" />
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-4 small">Key Terms</label>
                    <div className="col-8">
                      <input className="form-control" placeholder="Key Terms" />
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-4 small">Alert User</label>
                    <div className="col-8">
                      <input className="form-control" placeholder="Alert User" />
                    </div>
                  </div>

                </div>

                {/* ===== RIGHT COLUMN ===== */}
                <div className="col-md-6">

                  <div className="row align-items-center mb-3">
                    <label className="col-4 small">Name of Insurance Company</label>
                    <div className="col-8">
                      <select className="form-select"><option>Select</option></select>
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-4 small">Policy Type</label>
                    <div className="col-8">
                      <select className="form-select"><option>Select</option></select>
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-4 small">Policy Number</label>
                    <div className="col-8">
                      <input className="form-control" placeholder="Policy Number" />
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-4 small">Policy/Renewal Date</label>
                    <div className="col-8">
                      <input type="date" className="form-control" />
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-4 small">Expiry Date</label>
                    <div className="col-8">
                      <input type="date" className="form-control" />
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-4 small">Amount Paid (In Rs.)</label>
                    <div className="col-8">
                      <input className="form-control" placeholder="Amount Paid (In Rs.)" />
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-4 small">Mode of Payment</label>
                    <div className="col-8">
                      <input className="form-control" placeholder="Mode of Payment" />
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-4 small">Remarks</label>
                    <div className="col-8">
                      <input className="form-control" placeholder="Remarks" />
                    </div>
                  </div>

                  <div className="row align-items-center mb-3">
                    <label className="col-4 small">Alert Before</label>
                    <div className="col-8">
                      <select className="form-select"><option>Select</option></select>
                    </div>
                  </div>

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