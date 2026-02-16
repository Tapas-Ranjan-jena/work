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


        {/* ===== FORM BODY (LABEL LEFT | INPUT RIGHT) ===== */}
        <div className="container-fluid">

          {/* First Name */}
          <div className="row align-items-center mb-3">
            <div className="col-md-3 small">First Name</div>
            <div className="col-md-9">
              <input className="form-control" />
            </div>
          </div>

          {/* Bill + Due */}
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

          {/* Invoice Type */}
          <div className="row align-items-center mb-3">
            <div className="col-md-3 small">Invoice Type</div>
            <div className="col-md-9">
              <input className="form-control" />
            </div>
          </div>

          {/* Client */}
          <div className="row align-items-center mb-3">
            <div className="col-md-3 small">Client</div>
            <div className="col-md-9">
              <input className="form-control" />
            </div>
          </div>

          {/* TAX */}
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

          {/* Recurring */}
          <div className="row align-items-center mb-3">
            <div className="col-md-3 small">Recurring</div>
            <div className="col-md-9">
              <input type="checkbox" />
            </div>
          </div>

          {/* Note */}
          <div className="row align-items-center mb-3">
            <div className="col-md-3 small">Note</div>
            <div className="col-md-9">
              <textarea className="form-control" />
            </div>
          </div>

          {/* Labels */}
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
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={onClose}
          >
            Close
          </button>

          <button className="btn btn-gradient btn-sm">
            Save
          </button>
        </div>

      </div>
    </div>
  )
}
