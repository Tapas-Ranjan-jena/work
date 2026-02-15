import { useState } from "react"

export default function Insurance() {

  const [openModal,setOpenModal] = useState(false)

  return (
    <div>

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-bold m-0">Insurance</h6>

        <button
          className="btn btn-outline-dark btn-sm"
          onClick={()=>setOpenModal(true)}
        >
          + Add Insurance
        </button>
      </div>

      {/* TABLE */}
      <div className="client-table">
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Name of Insurance Company</th>
                <th>Name of Insurance Broker</th>
                <th>Policy Type</th>
                <th>Policy Number</th>
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

      {/* ⭐ MODAL */}
      {openModal && (
        <div className="modal-overlay">
          <div className="modal-box">

            <h5 className="fw-bold mb-3">Add Insurance</h5>

            {/* FORM GRID */}
            <div className="row g-3">

              <div className="col-md-6">
                <input className="form-control" placeholder="Company name" />
              </div>

              <div className="col-md-6">
                <input className="form-control" placeholder="Name of Insurance Company" />
              </div>

              <div className="col-md-6">
                <input className="form-control" placeholder="Name of Insurance Broker / Agent" />
              </div>

              <div className="col-md-6">
                <input className="form-control" placeholder="Policy Type" />
              </div>

              <div className="col-md-6">
                <input className="form-control" placeholder="Sum Insured (In Rs.)" />
              </div>

              <div className="col-md-6">
                <input className="form-control" placeholder="Policy Number" />
              </div>

              <div className="col-md-6">
                <input className="form-control" placeholder="Policy Commencement Date" />
              </div>

              <div className="col-md-6">
                <input className="form-control" placeholder="Policy/Renewal Date" />
              </div>

              <div className="col-md-6">
                <input className="form-control" placeholder="Start From" />
              </div>

              <div className="col-md-6">
                <input className="form-control" placeholder="Expiry Date" />
              </div>

              <div className="col-md-6">
                <input className="form-control" placeholder="Asset Insured" />
              </div>

              <div className="col-md-6">
                <input className="form-control" placeholder="Amount Paid (In Rs.)" />
              </div>

              <div className="col-md-6">
                <input className="form-control" placeholder="Payment date" />
              </div>

              <div className="col-md-6">
                <input className="form-control" placeholder="Mode of Payment" />
              </div>

              <div className="col-md-6">
                <input className="form-control" placeholder="Key Terms" />
              </div>

              <div className="col-md-6">
                <input className="form-control" placeholder="Remarks" />
              </div>

              <div className="col-md-6">
                <input className="form-control" placeholder="Alert User" />
              </div>

              <div className="col-md-6">
                <input className="form-control" placeholder="Alert Before" />
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
