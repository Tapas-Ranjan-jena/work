import { useState } from "react"

export default function RegistrationLicense() {

  const [openModal,setOpenModal] = useState(false)

  return (
    <div>

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-bold m-0">Registration/License</h6>

        <button
          className="btn btn-outline-dark btn-sm"
          onClick={()=>setOpenModal(true)}
        >
          + Add Registration
        </button>
      </div>

      {/* TABLE */}
      <div className="client-table">
        <div className="table-responsive">
          <table className="table align-middle mb-0">

            <thead>
              <tr>
                <th>Company Name</th>
                <th>Category</th>
                <th>Registration Name</th>
                <th>Registration Number</th>
                <th>Status</th>
                <th>Valid From</th>
                <th>Expires On</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan={7} className="text-center text-muted py-4">
                  No record found.
                </td>
              </tr>
            </tbody>

          </table>
        </div>
      </div>

      {/* ⭐ FULL MODAL */}
      {openModal && (
        <div className="modal-overlay">
          <div className="modal-box">

            {/* HEADER */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold m-0">Add Registration</h5>
              <span style={{cursor:"pointer"}} onClick={()=>setOpenModal(false)}>✕</span>
            </div>

            {/* FORM GRID */}
            <div className="row g-3">

              <div className="col-md-6">
                <label className="form-label small">Company name</label>
                <select className="form-select">
                  <option>Select</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label small">Registration / License</label>
                <select className="form-select">
                  <option>Select</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label small">Status</label>
                <select className="form-select">
                  <option>Select</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label small">Applied On</label>
                <input className="form-control" placeholder="Applied On"/>
              </div>

              <div className="col-md-6">
                <label className="form-label small">Regn./Licence Name</label>
                <input className="form-control" placeholder="Regn./Licence Name"/>
              </div>

              <div className="col-md-6">
                <label className="form-label small">Regn./Licence Number</label>
                <input className="form-control" placeholder="Regn./Licence Number"/>
              </div>

              <div className="col-md-6">
                <label className="form-label small">Regn./Licence Type</label>
                <select className="form-select">
                  <option>Select</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label small">Valid Form</label>
                <input className="form-control" placeholder="Valid Form"/>
              </div>

              <div className="col-md-6">
                <label className="form-label small">Expiry date</label>
                <input className="form-control" placeholder="Expiry Date"/>
              </div>

              <div className="col-md-6">
                <label className="form-label small">Key Terms</label>
                <input className="form-control" placeholder="Key Terms"/>
              </div>

              <div className="col-md-6">
                <label className="form-label small">Alert User</label>
                <input className="form-control" placeholder="Alert User"/>
              </div>

              <div className="col-md-6">
                <label className="form-label small">Alert Before</label>
                <select className="form-select">
                  <option>Select</option>
                </select>
              </div>

              <div className="col-12">
                <label className="form-label small">Remarks</label>
                <textarea className="form-control" rows={3} placeholder="Remarks"></textarea>
              </div>

            </div>

            {/* FOOTER */}
            <div className="d-flex justify-content-between align-items-center mt-4">

              <button className="btn btn-light btn-sm">
                📎 Upload File
              </button>

              <div className="d-flex gap-2">
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={()=>setOpenModal(false)}
                >
                  Close
                </button>

                <button className="btn btn-gradient btn-sm">
                  Save
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  )
}
