type Props = {
  onClose: () => void
}

export default function AddContactModal({ onClose }: Props) {

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
          <h5 className="fw-bold mb-0">Add Contact</h5>

          <span
            style={{ cursor: "pointer", fontSize: 18 }}
            onClick={onClose}
          >
            ✕
          </span>
        </div>


        {/* ===== FORM (LEFT LABEL | RIGHT INPUT) ===== */}
        <div className="container-fluid">

          {/* First Name */}
          <div className="row align-items-center mb-3">
            <div className="col-md-4 small">First Name</div>
            <div className="col-md-8">
              <input className="form-control" placeholder="First Name" />
            </div>
          </div>

          {/* Last Name */}
          <div className="row align-items-center mb-3">
            <div className="col-md-4 small">Last Name</div>
            <div className="col-md-8">
              <input className="form-control" placeholder="Last Name" />
            </div>
          </div>

          {/* Email */}
          <div className="row align-items-center mb-3">
            <div className="col-md-4 small">Email</div>
            <div className="col-md-8">
              <input className="form-control" placeholder="Email" />
            </div>
          </div>

          {/* Phone */}
          <div className="row align-items-center mb-3">
            <div className="col-md-4 small">Phone</div>
            <div className="col-md-8">
              <input className="form-control" placeholder="Phone" />
            </div>
          </div>

          {/* Skype */}
          <div className="row align-items-center mb-3">
            <div className="col-md-4 small">Skype</div>
            <div className="col-md-8">
              <input className="form-control" placeholder="Skype" />
            </div>
          </div>

          {/* Job Title */}
          <div className="row align-items-center mb-3">
            <div className="col-md-4 small">Job Title</div>
            <div className="col-md-8">
              <input className="form-control" placeholder="Job Title" />
            </div>
          </div>

          {/* Gender */}
          <div className="row align-items-center mb-3">
            <div className="col-md-4 small">Gender</div>

            <div className="col-md-8 d-flex gap-3">
              <label className="small">
                <input type="radio" name="gender" defaultChecked className="me-1"/>
                Male
              </label>

              <label className="small">
                <input type="radio" name="gender" className="me-1"/>
                Female
              </label>
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
