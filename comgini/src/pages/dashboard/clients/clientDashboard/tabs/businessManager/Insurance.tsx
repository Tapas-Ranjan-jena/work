import { useState } from "react"
import DataTableCard from "../../../../../../components/common/DataTableCard"

export default function Insurance() {

  const [openModal,setOpenModal] = useState(false)

  return (
    <div>

      <DataTableCard
        title="Insurance"
        addButton={
          <button
            className="btn btn-outline-dark btn-sm"
            onClick={()=>setOpenModal(true)}
          >
            + Add Insurance
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
              <h5 className="fw-bold m-0">Add Insurance</h5>

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
                "Company name",
                "Name of Insurance Company",
                "Name of Insurance Broker / Agent",
                "Policy Type",
                "Sum Insured (In Rs.)",
                "Policy Number",
                "Policy Commencement Date",
                "Policy/Renewal Date",
                "Start From",
                "Expiry Date",
                "Asset Insured",
                "Amount Paid (In Rs.)",
                "Payment date",
                "Mode of Payment",
                "Key Terms",
                "Remarks",
                "Alert User",
                "Alert Before"
              ].map((label,index)=>(
                <div key={index} className="row align-items-center mb-3">

                  <div className="col-md-4">
                    <label className="small">{label}</label>
                  </div>

                  <div className="col-md-8">
                    <input
                      className="form-control"
                      placeholder={label}
                    />
                  </div>

                </div>
              ))}

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
                 Upload File
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
