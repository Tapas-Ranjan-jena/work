type Props = {
  onClose: () => void
}

export default function AddEventModal({ onClose }: Props) {

  return (
    <div className="modal-overlay">

      <div className="modal-box">

        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold m-0">Add Event</h5>
          <span style={{cursor:"pointer"}} onClick={onClose}>✕</span>
        </div>

        <div className="row g-3">

          <div className="col-12">
            <input className="form-control" placeholder="Title" />
          </div>

          <div className="col-12">
            <textarea className="form-control" rows={2} placeholder="Description"/>
          </div>

          <div className="col-md-6">
            <input className="form-control" placeholder="Start date"/>
          </div>

          <div className="col-md-6">
            <input className="form-control" placeholder="Start time"/>
          </div>

          <div className="col-md-6">
            <input className="form-control" placeholder="End date"/>
          </div>

          <div className="col-md-6">
            <input className="form-control" placeholder="End time"/>
          </div>

          <div className="col-12">
            <input className="form-control" placeholder="Location"/>
          </div>

          <div className="col-12">
            <input className="form-control" placeholder="Labels"/>
          </div>

          {/* Visibility */}
          <div className="col-12">
            <label className="small">Visibility</label>

            <div className="mt-2 d-flex flex-column gap-1">
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

          <div className="col-12">
            <label className="small">
              <input type="checkbox" className="me-2"/>
              Repeat
            </label>
          </div>

          {/* COLORS */}
          <div className="col-12 d-flex gap-2">
            {["#f6b26b","#ffd966","#9fc5e8","#93c47d","#c27ba0","#00a2a8","#76a5af"].map((c,i)=>(
              <div key={i} style={{
                width:18,
                height:18,
                background:c,
                borderRadius:3,
                cursor:"pointer"
              }} />
            ))}
          </div>

        </div>

        {/* FOOTER */}
        <div className="d-flex justify-content-end gap-2 mt-4">

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
