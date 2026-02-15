type Props = {
  onClose: () => void
}

export default function AddContactModal({ onClose }: Props) {

  return (
    <div className="modal-overlay">

      <div className="modal-box">

        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold m-0">Add Contact</h5>
          <span style={{cursor:"pointer"}} onClick={onClose}>✕</span>
        </div>

        {/* FORM */}
        <div className="row g-3">

          <div className="col-md-6">
            <label className="form-label small">First Name</label>
            <input className="form-control" placeholder="First Name"/>
          </div>

          <div className="col-md-6">
            <label className="form-label small">Last Name</label>
            <input className="form-control" placeholder="Last Name"/>
          </div>

          <div className="col-12">
            <label className="form-label small">Email</label>
            <input className="form-control" placeholder="Email"/>
          </div>

          <div className="col-12">
            <label className="form-label small">Phone</label>
            <input className="form-control" placeholder="Phone"/>
          </div>

          <div className="col-12">
            <label className="form-label small">Skype</label>
            <input className="form-control" placeholder="Skype"/>
          </div>

          <div className="col-12">
            <label className="form-label small">Job Title</label>
            <input className="form-control" placeholder="Job Title"/>
          </div>

          <div className="col-12">
            <label className="form-label small">Gender</label>

            <div className="d-flex gap-3 mt-1">
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
