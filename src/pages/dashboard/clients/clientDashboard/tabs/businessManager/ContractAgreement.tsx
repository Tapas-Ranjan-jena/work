import { useState } from "react"

export default function ContractAgreement() {

  const [openModal,setOpenModal] = useState(false)

  return (
    <div>

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-bold m-0">Contract/Agreement</h6>

        <button
          className="btn btn-outline-dark btn-sm"
          onClick={()=>setOpenModal(true)}
        >
          + Add Agreement
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
                <th>Name of Party</th>
                <th>Contract Name</th>
                <th>Contract Value</th>
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

      {/* ⭐ FULL MODAL UI (MATCHED TO DESIGN) */}
      {openModal && (
        <div className="modal-overlay">
          <div className="modal-box">

            <h5 className="fw-bold mb-3">Add Agreement</h5>

            <div className="row g-3">

              {/* ROW 1 */}
              <div className="col-md-6">
                <select className="form-select">
                  <option>-</option>
                </select>
              </div>

              <div className="col-md-6">
                <input className="form-control" placeholder="Contract Name"/>
              </div>

              {/* ROW 2 */}
              <div className="col-md-6">
                <select className="form-select">
                  <option>Select</option>
                </select>
              </div>

              <div className="col-md-6">
                <input className="form-control" placeholder="Contract Value (in Rs.)"/>
              </div>

              {/* ROW 3 */}
              <div className="col-md-6">
                <input className="form-control" placeholder="Contract Period"/>
              </div>

              <div className="col-md-6">
                <input className="form-control" placeholder="Name of Party"/>
              </div>

              {/* ROW 4 */}
              <div className="col-md-6">
                <input className="form-control" placeholder="Date of Execution"/>
              </div>

              <div className="col-md-6">
                <input className="form-control" placeholder="Start From"/>
              </div>

              {/* ROW 5 */}
              <div className="col-md-6">
                <input className="form-control" placeholder="Expiry Date"/>
              </div>

              <div className="col-md-6">
                <input className="form-control" placeholder="Key Terms"/>
              </div>

              {/* ROW 6 */}
              <div className="col-md-6">
                <input className="form-control" placeholder="Alert User"/>
              </div>

              <div className="col-md-6">
                <select className="form-select">
                  <option>Select</option>
                </select>
              </div>

              {/* REMARKS */}
              <div className="col-12">
                <textarea className="form-control" placeholder="Remarks"/>
              </div>

            </div>

            {/* FOOTER */}
            <div className="d-flex justify-content-between align-items-center mt-4">

              <button className="btn btn-outline-secondary btn-sm">
                Upload File
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
