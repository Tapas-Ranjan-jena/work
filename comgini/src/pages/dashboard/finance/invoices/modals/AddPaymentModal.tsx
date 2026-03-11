import { createPortal } from "react-dom"
import { useRef } from "react"

type Props = {
  open: boolean
  onClose: () => void
}

export default function AddPaymentModal({ open, onClose }: Props) {
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
      }}
    >
      <div className="d-flex justify-content-center" style={{ paddingTop: "100px" }}>
        <div className="modal-dialog" style={{ maxWidth: "700px", width: "100%" }}>
          <div className="modal-content">

            {/* ================= HEADER ================= */}
            <div className="modal-header">
              <h5 className="fw-semibold m-0">Add Payment</h5>
              <button className="btn-close" onClick={onClose}></button>
            </div>

            {/* ================= BODY ================= */}
            <div className="modal-body">

              <div className="row g-3 align-items-center">

                {/* Invoice */}
                <div className="col-md-4">
                  <label className="small mb-0">Invoice</label>
                </div>
                <div className="col-md-8">
                  <select className="form-select">
                    <option>Select</option>
                  </select>
                </div>

                {/* Payment Method */}
                <div className="col-md-4">
                  <label className="small mb-0">Payment method</label>
                </div>
                <div className="col-md-8">
                  <select className="form-select">
                    <option>Select</option>
                  </select>
                </div>

                {/* Payment Date */}
                <div className="col-md-4">
                  <label className="small mb-0">Payment date</label>
                </div>
                <div className="col-md-8">
                  <input type="date" className="form-control" />
                </div>

                {/* Amount */}
                <div className="col-md-4">
                  <label className="small mb-0">Amount</label>
                </div>
                <div className="col-md-8">
                  <input className="form-control" />
                </div>

                {/* Note */}
                <div className="col-md-4">
                  <label className="small mb-0">Note</label>
                </div>
                <div className="col-md-8">
                  <textarea className="form-control" rows={3}></textarea>
                </div>

              </div>

            </div>

            {/* ================= FOOTER ================= */}
            <div className="modal-footer d-flex justify-content-between">

              {/* Upload Button */}
              <>
                <input ref={fileRef} type="file" hidden />

                <button
                  className="btn btn-light border"
                  onClick={() => fileRef.current?.click()}
                >
                  <i className="bi bi-camera me-1"></i>
                  Upload File
                </button>
              </>

              <div className="d-flex gap-2">
                <button
                  className="btn btn-outline-secondary"
                  onClick={onClose}
                >
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