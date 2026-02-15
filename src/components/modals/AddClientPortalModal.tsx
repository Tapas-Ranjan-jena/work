type Props = {
  onClose: () => void
}

export default function AddClientPortalModal({ onClose }: Props) {

  return (
    <div className="modal-overlay">

      <div className="modal-box">

        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold m-0">Add Client Portal</h5>
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

          <div className="col-md-6">
            <label className="form-label small">Email</label>
            <input className="form-control" placeholder="Email"/>
          </div>

          <div className="col-md-6">
            <label className="form-label small">Phone</label>
            <input className="form-control" placeholder="Phone"/>
          </div>

          <div className="col-md-6">
            <label className="form-label small">Skype</label>
            <input className="form-control" placeholder="Skype"/>
          </div>

          <div className="col-md-6">
            <label className="form-label small">Job Title</label>
            <input className="form-control" placeholder="Job Title"/>
          </div>

          <div className="col-12">
            <label className="form-label small">Gender</label>
            <div className="d-flex gap-3">
              <label>
                <input type="radio" name="gender" defaultChecked /> Male
              </label>
              <label>
                <input type="radio" name="gender" /> Female
              </label>
            </div>
          </div>

          <div className="col-12">
            <label className="form-label small">Hide menus from client portal</label>
            <input className="form-control" placeholder="Hidden menus"/>
          </div>

          <div className="col-md-9">
            <label className="form-label small">Password</label>
            <input className="form-control" placeholder="Password"/>
          </div>

          <div className="col-md-3 d-flex align-items-end">
            <button className="btn btn-outline-secondary w-100">
              Generate
            </button>
          </div>

          <div className="col-12">
            <label className="small">
              <input type="checkbox" defaultChecked className="me-2"/>
              Email login details to this user
            </label>
          </div>

        </div>

        {/* FOOTER */}
        <div className="d-flex justify-content-end gap-2 mt-4">

          <button className="btn btn-outline-secondary" onClick={onClose}>
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
