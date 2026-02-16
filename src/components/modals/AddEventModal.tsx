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


        {/* ===== FORM BODY (LABEL LEFT | INPUT RIGHT) ===== */}
        <div className="container-fluid">

          {/* Title */}
          <div className="row align-items-center mb-3">
            <div className="col-md-3 small">Title</div>
            <div className="col-md-9">
              <input className="form-control" placeholder="Title" />
            </div>
          </div>

          {/* Description */}
          <div className="row align-items-center mb-3">
            <div className="col-md-3 small">Description</div>
            <div className="col-md-9">
              <textarea className="form-control" rows={2} placeholder="Description"/>
            </div>
          </div>

          {/* Start */}
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

          {/* End */}
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

          {/* Location */}
          <div className="row align-items-center mb-3">
            <div className="col-md-3 small">Location</div>
            <div className="col-md-9">
              <input className="form-control" placeholder="Location"/>
            </div>
          </div>

          {/* Labels */}
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
