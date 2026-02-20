import { useState } from "react"
import DataTableCard from "../../../../../../components/common/DataTableCard"

export default function RegistrationLicense() {

  const [openModal,setOpenModal] = useState(false)

  return (
    <div>

      <DataTableCard
        title="Registration/License"
        addButton={
          <button
            className="btn btn-outline-dark btn-sm"
            onClick={()=>setOpenModal(true)}
          >
            + Add Registration
          </button>
        }
        showToolbar
        showEntries
        showSearch
        showExport={false}
      >

        <div className="table-responsive">
          <table className="table align-middle mb-0 table-bordered">

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

      </DataTableCard>


      {/* ⭐ MODAL */}
      {openModal && (
        <div
          className="modal-overlay"
          onClick={()=>setOpenModal(false)}
        >

          <div
            className="modal-box"
            onClick={(e)=>e.stopPropagation()}
          >

            {/* ===== HEADER ===== */}
            <div
              className="d-flex justify-content-between align-items-center"
              style={{
                borderBottom:"1px solid #e5e5e5",
                paddingBottom:12,
                marginBottom:16
              }}
            >
              <h5 className="fw-bold m-0">Add Registration</h5>

              <span
                style={{cursor:"pointer",fontSize:18}}
                onClick={()=>setOpenModal(false)}
              >
                ✕
              </span>
            </div>

            {/* ===== FORM BODY ===== */}
            <div className="container-fluid">

              {[
                {label:"Company name", type:"select"},
                {label:"Registration / License", type:"select"},
                {label:"Status", type:"select"},
                {label:"Applied On"},
                {label:"Regn./Licence Name"},
                {label:"Regn./Licence Number"},
                {label:"Regn./Licence Type", type:"select"},
                {label:"Valid From"},
                {label:"Expiry date"},
                {label:"Key Terms"},
                {label:"Alert User"},
                {label:"Alert Before", type:"select"}
              ].map((field,index)=>(
                <div key={index} className="row align-items-center mb-3">

                  <div className="col-md-4">
                    <label className="small">{field.label}</label>
                  </div>

                  <div className="col-md-8">
                    {field.type === "select" ? (
                      <select className="form-select">
                        <option>Select</option>
                      </select>
                    ) : (
                      <input
                        className="form-control"
                        placeholder={field.label}
                      />
                    )}
                  </div>

                </div>
              ))}

              <div className="row align-items-start mb-2">
                <div className="col-md-4">
                  <label className="small">Remarks</label>
                </div>

                <div className="col-md-8">
                  <textarea
                    className="form-control"
                    rows={3}
                    placeholder="Remarks"
                  />
                </div>
              </div>

            </div>

            {/* ===== FOOTER ===== */}
            <div
              className="d-flex justify-content-between align-items-center"
              style={{
                borderTop:"1px solid #e5e5e5",
                marginTop:20,
                paddingTop:14
              }}
            >

              <button className="btn btn-light btn-sm">
                📎 Upload File
              </button>

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
