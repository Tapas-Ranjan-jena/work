type Props = {
  onClose: () => void
}

export default function AddInvoiceModal({ onClose }: Props) {

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
          <h5 className="fw-bold mb-0">Add Invoice</h5>

          <span
            style={{ cursor: "pointer", fontSize: 18 }}
            onClick={onClose}
          >
            ✕
          </span>
        </div>

        {/* ===== NOTE TEXT ===== */}
        <p
          className="small text-danger"
          style={{ marginBottom: 18 }}
        >
          Note:
          <br />
          1. Please update your invoice setup before generating invoice.
          <br />
          2. Please update your company / firm profile before generating invoice.
        </p>

        {/* ===== FORM BODY ===== */}
        <div className="container-fluid">

          <div className="row align-items-center mb-3">
            <div className="col-md-3 small">First Name</div>
            <div className="col-md-9">
              <input className="form-control" />
            </div>
          </div>

          <div className="row align-items-center mb-3">
            <div className="col-md-3 small">Bill date</div>

            <div className="col-md-4">
              <input className="form-control" placeholder="Bill date" />
            </div>

            <div className="col-md-1 small text-md-end">
              Due date
            </div>

            <div className="col-md-4">
              <input className="form-control" placeholder="Due date" />
            </div>
          </div>

          <div className="row align-items-center mb-3">
            <div className="col-md-3 small">Invoice Type</div>
            <div className="col-md-9">
              <input className="form-control" />
            </div>
          </div>

          <div className="row align-items-center mb-3">
            <div className="col-md-3 small">Client</div>
            <div className="col-md-9">
              <input className="form-control" />
            </div>
          </div>

          <div className="row align-items-center mb-3">
            <div className="col-md-3 small">TAX</div>

            <div className="col-md-4">
              <input className="form-control" />
            </div>

            <div className="col-md-1 small text-md-end">
              Second TAX
            </div>

            <div className="col-md-4">
              <input className="form-control" />
            </div>
          </div>

          <div className="row align-items-center mb-3">
            <div className="col-md-3 small">Recurring</div>
            <div className="col-md-9">
              <input type="checkbox" />
            </div>
          </div>

          <div className="row align-items-center mb-3">
            <div className="col-md-3 small">Note</div>
            <div className="col-md-9">
              <textarea className="form-control" />
            </div>
          </div>

          <div className="row align-items-center mb-2">
            <div className="col-md-3 small">Labels</div>
            <div className="col-md-9">
              <input className="form-control" />
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
          {/* CLOSE BUTTON */}
          <button
            className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2"
            onClick={onClose}
          >
            <span
              style={{
                width:18,
                height:18,
                borderRadius:"50%",
                border:"1.5px solid #000",
                display:"inline-flex",
                alignItems:"center",
                justifyContent:"center"
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

          {/* SAVE BUTTON */}
          <button className="btn btn-gradient btn-sm d-flex align-items-center gap-2">
            <span
              style={{
                width:18,
                height:18,
                borderRadius:"50%",
                background:"#fff",
                display:"inline-flex",
                alignItems:"center",
                justifyContent:"center"
              }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 6L9 17L4 12"
                  stroke="#2b4cb3"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            Save
          </button>
        </div>

      </div>
    </div>
  )
}
