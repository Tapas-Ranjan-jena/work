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
      <div
        style={{
          border:"1px solid #e2e2e2",
          borderRadius:"6px",
          overflow:"hidden",
          background:"#fff"
        }}
      >

        {/* ⭐ FILTER BAR */}
        <div
          className="d-flex align-items-center justify-content-between flex-wrap gap-2"
          style={{
            background:"#F5F5F6",
            borderBottom:"1px solid #e2e2e2",
            padding:"8px 10px"
          }}
        >

          <div className="d-flex align-items-center gap-2">
            <select className="form-select form-select-sm" style={{width:"80px"}}>
              <option>100</option>
            </select>

            <button className="btn btn-light btn-sm">👁</button>
          </div>

          <div className="d-flex align-items-center gap-2 flex-wrap">

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
          <table className="table align-middle mb-0 table-bordered">
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
        <div className="modal-overlay" onClick={()=>setOpenModal(false)}>
          <div
            className="modal-box"
            style={{maxWidth:"720px"}}
            onClick={(e)=>e.stopPropagation()}
          >

            {/* HEADER */}
            <div
              className="d-flex justify-content-between align-items-center"
              style={{
                borderBottom:"1px solid #e5e5e5",
                paddingBottom:12,
                marginBottom:16
              }}
            >
              <h5 className="fw-bold m-0">Add Expense</h5>
              <span style={{cursor:"pointer",fontSize:18}} onClick={()=>setOpenModal(false)}>✕</span>
            </div>

            {/* FORM BODY */}
            <div className="container-fluid">
              {[
                {label:"Date of expense", type:"date"},
                {label:"Category", type:"select"},
                {label:"Amount"},
                {label:"Title"},
                {label:"Description", type:"textarea"},
                {label:"Client", type:"select"},
                {label:"Assignment", type:"select"},
                {label:"Team member", type:"select"},
                {label:"TAX", type:"select"},
                {label:"Second TAX", type:"select"}
              ].map((field,index)=>(
                <div key={index} className="row align-items-start mb-3">

                  <div className="col-md-4">
                    <label className="small">{field.label}</label>
                  </div>

                  <div className="col-md-8">
                    {field.type === "select" ? (
                      <select className="form-select"><option>-</option></select>
                    ) : field.type === "textarea" ? (
                      <textarea className="form-control" />
                    ) : (
                      <input
                        type={field.type === "date" ? "date" : "text"}
                        className="form-control"
                        placeholder={field.label}
                      />
                    )}
                  </div>

                </div>
              ))}
            </div>

            {/* FOOTER */}
            <div
              className="d-flex justify-content-between align-items-center"
              style={{
                borderTop:"1px solid #e5e5e5",
                marginTop:20,
                paddingTop:14
              }}
            >
              <button className="btn btn-light btn-sm">Upload File</button>

              <div className="d-flex gap-2">

                {/* CLOSE BUTTON */}
                <button
                  className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2"
                  onClick={()=>setOpenModal(false)}
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
        </div>
      )}

    </div>
  )
}
