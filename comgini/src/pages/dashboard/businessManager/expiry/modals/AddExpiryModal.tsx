import { createPortal } from "react-dom"

type Props = {
  open: boolean
  onClose: () => void
}

export default function AddExpiryModal({ open, onClose }: Props) {
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
      {/* ⭐ CENTER + LOWER POSITION */}
      <div
        className="d-flex justify-content-center"
        style={{ paddingTop: "100px", paddingBottom: "40px" }}
      >
        {/* ⭐ WIDER MODAL */}
        <div className="modal-dialog" style={{ maxWidth: "800px", width: "100%" }}>
          <div className="modal-content">

            {/* ================= HEADER ================= */}
            <div className="modal-header">
              <h5 className="fw-semibold m-0">Add Expiry</h5>
              <button className="btn-close" onClick={onClose}></button>
            </div>

            {/* ================= BODY ================= */}
            <div className="modal-body px-4">

              <div className="row g-3">

                {/* Company Name */}
                <div className="col-12">
                  <div className="row align-items-center">
                    <label className="col-md-4 small">Company name</label>
                    <div className="col-md-8">
                      <select className="form-select">
                        <option>Select</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Particulars */}
                <div className="col-12">
                  <div className="row align-items-center">
                    <label className="col-md-4 small">Particulars</label>
                    <div className="col-md-8">
                      <input className="form-control" placeholder="Particulars" />
                    </div>
                  </div>
                </div>

                {/* Expiry Date */}
                <div className="col-12">
                  <div className="row align-items-center">
                    <label className="col-md-4 small">Expiry Date</label>
                    <div className="col-md-8">
                      <input type="date" className="form-control" />
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* ================= FOOTER ================= */}
            <div className="modal-footer">
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
    </div>,
    document.body
  )
}