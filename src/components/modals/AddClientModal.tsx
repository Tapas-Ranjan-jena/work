type Props = {
  onClose: () => void
}

export default function AddClientModal({ onClose }: Props) {

  return (
    <div className="modal-overlay">

      <div className="modal-box">

        {/* ===== HEADER ===== */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold mb-0">Add Client</h5>

          <span
            style={{ cursor: "pointer", fontSize: 18 }}
            onClick={onClose}
          >
            ✕
          </span>
        </div>

        {/* ===== RED HINT TEXT ===== */}
        <p
          className="text-center mb-3"
          style={{ color: "red", fontSize: 12 }}
        >
          *Quick Hint: If you have a valid CIN/LLPIN, please use the
          "Add company" button instead.
        </p>

        {/* ===== FORM FIELDS ===== */}

        <div className="mb-2">
          <label className="form-label small">Client Name</label>
          <input className="form-control" placeholder="Client Name" />
        </div>

        <div className="mb-2">
          <label className="form-label small">Address</label>
          <input className="form-control" placeholder="Address" />
        </div>

        <div className="mb-2">
          <label className="form-label small">Phone No.</label>
          <input className="form-control" placeholder="Phone No." />
        </div>

        <div className="mb-2">
          <label className="form-label small">Website</label>
          <input className="form-control" placeholder="Website" />
        </div>

        <div className="mb-2">
          <label className="form-label small">GSTIN</label>
          <input className="form-control" placeholder="GSTIN" />
        </div>

        <div className="mb-2">
          <label className="form-label small">Client Groups</label>
          <input className="form-control" placeholder="Client Groups" />
        </div>

        <div className="mb-3">
          <label className="form-label small">Assign Members</label>
          <input className="form-control" placeholder="Assign Members" />
        </div>

        {/* ===== FOOTER BUTTONS ===== */}

        <div className="d-flex justify-content-end gap-2">

          <button
            className="btn btn-outline-secondary"
            onClick={onClose}
          >
            Close
          </button>

          <button className="btn btn-gradient">
            Save
          </button>

        </div>

      </div>
    </div>
  )
}
