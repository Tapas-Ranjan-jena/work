type Props = {
  onClose: () => void
}

export default function AddClientPortalModal({ onClose }: Props) {

  return (
    <div className="modal-overlay">

      <div className="modal-box">

        {/* ===== HEADER ===== */}
        <div
          className="d-flex justify-content-between align-items-center"
          style={{
            borderBottom: "1px solid #e5e5e5",
            paddingBottom: 12,
            marginBottom: 18
          }}
        >
          <h5 className="fw-bold mb-0">Add Client Portal</h5>

          <span
            style={{ cursor: "pointer", fontSize: 18 }}
            onClick={onClose}
          >
            ✕
          </span>
        </div>

        {/* ===== FORM GRID ===== */}
        <div className="container-fluid">

          <div className="row align-items-center mb-3">
            <div className="col-md-4 small">First Name</div>
            <div className="col-md-8">
              <input className="form-control" placeholder="First Name" />
            </div>
          </div>

          <div className="row align-items-center mb-3">
            <div className="col-md-4 small">Last Name</div>
            <div className="col-md-8">
              <input className="form-control" placeholder="Last Name" />
            </div>
          </div>

          <div className="row align-items-center mb-3">
            <div className="col-md-4 small">Email</div>
            <div className="col-md-8">
              <input className="form-control" placeholder="Email" />
            </div>
          </div>

          <div className="row align-items-center mb-3">
            <div className="col-md-4 small">Phone</div>
            <div className="col-md-8">
              <input className="form-control" placeholder="Phone" />
            </div>
          </div>

          <div className="row align-items-center mb-3">
            <div className="col-md-4 small">Skype</div>
            <div className="col-md-8">
              <input className="form-control" placeholder="Skype" />
            </div>
          </div>

          <div className="row align-items-center mb-3">
            <div className="col-md-4 small">Job Title</div>
            <div className="col-md-8">
              <input className="form-control" placeholder="Job Title" />
            </div>
          </div>

          {/* GENDER */}
          <div className="row align-items-center mb-3">
            <div className="col-md-4 small">Gender</div>
            <div className="col-md-8 d-flex gap-3">
              <label>
                <input type="radio" name="gender" defaultChecked /> Male
              </label>
              <label>
                <input type="radio" name="gender" /> Female
              </label>
            </div>
          </div>

          {/* HIDDEN MENU */}
          <div className="row align-items-center mb-3">
            <div className="col-md-4 small">
              Hide menus from client portal
            </div>
            <div className="col-md-8">
              <input className="form-control" placeholder="Hidden menus" />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="row align-items-center mb-3">
            <div className="col-md-4 small">Password</div>

            <div className="col-md-8 d-flex gap-2">
              <input className="form-control" placeholder="Password" />

              <button className="btn btn-outline-secondary">
                Generate
              </button>
            </div>
          </div>

          {/* CHECKBOX */}
          <div className="row mb-2">
            <div className="col-md-4"></div>
            <div className="col-md-8 small">
              <label>
                <input
                  type="checkbox"
                  defaultChecked
                  className="me-2"
                />
                Email login details to this user
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
          {/* CLOSE BUTTON */}
          <button
            className="btn btn-outline-secondary d-flex align-items-center gap-2"
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
          <button className="btn btn-gradient d-flex align-items-center gap-2">
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
