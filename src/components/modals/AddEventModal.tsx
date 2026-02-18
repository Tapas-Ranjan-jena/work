type Props = {
  onClose: () => void
}

export default function AddEventModal({ onClose }: Props) {

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
          <h5 className="fw-bold mb-0">Add Event</h5>

          <span
            style={{ cursor: "pointer", fontSize: 18 }}
            onClick={onClose}
          >
            ✕
          </span>
        </div>

        {/* ===== FORM BODY ===== */}
        <div className="container-fluid">

          <div className="row align-items-center mb-3">
            <div className="col-md-3 small">Title</div>
            <div className="col-md-9">
              <input className="form-control" placeholder="Title" />
            </div>
          </div>

          <div className="row align-items-center mb-3">
            <div className="col-md-3 small">Description</div>
            <div className="col-md-9">
              <textarea className="form-control" rows={2} placeholder="Description"/>
            </div>
          </div>

          <div className="row align-items-center mb-3">
            <div className="col-md-3 small">Start date</div>

            <div className="col-md-4">
              <input className="form-control" placeholder="Start date"/>
            </div>

            <div className="col-md-1 small text-md-end">
              Start time
            </div>

            <div className="col-md-4">
              <input className="form-control" placeholder="Start time"/>
            </div>
          </div>

          <div className="row align-items-center mb-3">
            <div className="col-md-3 small">End date</div>

            <div className="col-md-4">
              <input className="form-control" placeholder="End date"/>
            </div>

            <div className="col-md-1 small text-md-end">
              End time
            </div>

            <div className="col-md-4">
              <input className="form-control" placeholder="End time"/>
            </div>
          </div>

          <div className="row align-items-center mb-3">
            <div className="col-md-3 small">Location</div>
            <div className="col-md-9">
              <input className="form-control" placeholder="Location"/>
            </div>
          </div>

          <div className="row align-items-center mb-3">
            <div className="col-md-3 small">Labels</div>
            <div className="col-md-9">
              <input className="form-control" placeholder="Labels"/>
            </div>
          </div>

          {/* Visibility */}
          <div className="row mb-3">
            <div className="col-md-3 small">Visibility</div>

            <div className="col-md-9 d-flex flex-column gap-1">
              <label className="small">
                <input type="radio" name="visibility" defaultChecked className="me-2"/>
                Only me
              </label>

              <label className="small">
                <input type="radio" name="visibility" className="me-2"/>
                All team members
              </label>

              <label className="small">
                <input type="radio" name="visibility" className="me-2"/>
                Specific members and teams
              </label>
            </div>
          </div>

          {/* Repeat */}
          <div className="row mb-3">
            <div className="col-md-3 small">Repeat</div>

            <div className="col-md-9">
              <label className="small">
                <input type="checkbox" className="me-2"/>
                Repeat
              </label>
            </div>
          </div>

          {/* Colors */}
          <div className="row mb-2">
            <div className="col-md-3"></div>

            <div className="col-md-9 d-flex gap-2">
              {["#f6b26b","#ffd966","#9fc5e8","#93c47d","#c27ba0","#00a2a8","#76a5af"].map((c,i)=>(
                <div
                  key={i}
                  style={{
                    width:18,
                    height:18,
                    background:c,
                    borderRadius:3,
                    cursor:"pointer"
                  }}
                />
              ))}
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
