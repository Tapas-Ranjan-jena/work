import { useState } from "react"

export default function Expenses() {

  const [openModal, setOpenModal] = useState(false)

  return (
    <div>

      {/* ================= HEADER ================= */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-bold m-0">Expenses</h6>

        <button
          className="btn btn-outline-dark btn-sm"
          onClick={() => setOpenModal(true)}
        >
          + Add Expense
        </button>
      </div>

      {/* ================= TABLE CARD ================= */}
      <div className="client-table">

        {/* ⭐ FIXED FILTER BAR (MAIN PROBLEM AREA) */}
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 p-2 border-bottom">

          {/* LEFT SIDE */}
          <div className="d-flex align-items-center gap-2 flex-wrap">

            <select className="form-select form-select-sm" style={{width:"80px"}}>
              <option>100</option>
            </select>

            <button className="btn btn-light btn-sm">👁</button>

            <select className="form-select form-select-sm" style={{width:"140px"}}>
              <option>-Assignment-</option>
            </select>

            <select className="form-select form-select-sm" style={{width:"130px"}}>
              <option>-Member-</option>
            </select>

            <select className="form-select form-select-sm" style={{width:"140px"}}>
              <option>-Category-</option>
            </select>

            <div className="d-flex align-items-center gap-1">
              <button className="btn btn-light btn-sm">◀</button>
              <button className="btn btn-light btn-sm">February 2026</button>
              <button className="btn btn-light btn-sm">▶</button>
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="d-flex align-items-center gap-2">
            <button className="btn btn-light btn-sm">Excel</button>
            <button className="btn btn-light btn-sm">Print</button>

            <input
              className="form-control form-control-sm"
              placeholder="Search"
              style={{width:"160px"}}
            />
          </div>

        </div>

        {/* ================= TABLE ================= */}
        <div className="table-responsive">
          <table className="table align-middle mb-0">

            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Title</th>
                <th>Description</th>
                <th>Files</th>
                <th>Amount</th>
                <th>TAX</th>
                <th>Second TAX</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan={9} className="text-center text-muted py-4">
                  No record found.
                </td>
              </tr>
            </tbody>

          </table>
        </div>

      </div>

      {/* ================= ADD EXPENSE MODAL ================= */}
      {openModal && (
        <div className="modal-overlay">
          <div className="modal-box" style={{maxWidth:"650px"}}>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold m-0">Add Expense</h5>
              <span style={{cursor:"pointer"}} onClick={()=>setOpenModal(false)}>✕</span>
            </div>

            <div className="row g-3">

              <div className="col-12">
                <label className="small">Date of expense</label>
                <input type="date" className="form-control"/>
              </div>

              <div className="col-12">
                <label className="small">Category</label>
                <select className="form-select">
                  <option>Comply Relax Renewal Fees</option>
                </select>
              </div>

              <div className="col-12">
                <label className="small">Amount</label>
                <input className="form-control" placeholder="Amount"/>
              </div>

              <div className="col-12">
                <label className="small">Title</label>
                <input className="form-control" placeholder="Title"/>
              </div>

              <div className="col-12">
                <label className="small">Description</label>
                <textarea className="form-control"/>
              </div>

              <div className="col-12">
                <label className="small">Client</label>
                <select className="form-select"><option>-</option></select>
              </div>

              <div className="col-12">
                <label className="small">Assignment</label>
                <select className="form-select"><option>-</option></select>
              </div>

              <div className="col-12">
                <label className="small">Team member</label>
                <select className="form-select"><option>-</option></select>
              </div>

              <div className="col-12">
                <label className="small">TAX</label>
                <select className="form-select"><option>-</option></select>
              </div>

              <div className="col-12">
                <label className="small">Second TAX</label>
                <select className="form-select"><option>-</option></select>
              </div>

            </div>

            <div className="d-flex justify-content-between mt-4">
              <button className="btn btn-light btn-sm">
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
