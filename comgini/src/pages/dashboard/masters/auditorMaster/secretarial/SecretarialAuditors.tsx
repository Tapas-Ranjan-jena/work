import { useNavigate } from "react-router-dom"

export default function SecretarialAuditors(){

  const navigate = useNavigate()

  return(
    <>
      {/* ===== ACTION ROW ===== */}
      <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">

        {/* LEFT */}
        <div className="d-flex gap-2">
          <button className="btn btn-light btn-sm">Show 10 rows</button>
          <button className="btn btn-light btn-sm">Excel</button>
        </div>

        {/* RIGHT */}
        <button
          onClick={()=>navigate("add")}
          className="btn btn-sm"
          style={{background:"#2E388E",color:"#fff"}}
        >
          + Add Auditors
        </button>

      </div>

      {/* ===== SEARCH ===== */}
      <div className="d-flex justify-content-end mb-2">
        <div style={{position:"relative"}}>
          <i className="bi bi-search"
            style={{
              position:"absolute",
              left:"10px",
              top:"50%",
              transform:"translateY(-50%)",
              fontSize:"13px",
              color:"#888"
            }}
          />
          <input
            className="form-control form-control-sm"
            placeholder="Search"
            style={{width:"180px",paddingLeft:"28px"}}
          />
        </div>
      </div>

      {/* ===== TABLE ===== */}
      <div style={{overflowX:"auto"}}>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Firm Name</th>
              <th>Auditor Name</th>
              <th>Address</th>
              <th>Email</th>
              <th>Phone no.</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td colSpan={7} className="text-center">
                No data available in table
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ===== FOOTER ===== */}
      <div className="d-flex justify-content-between mt-2 align-items-center flex-wrap gap-2">
        <small className="text-muted">
          Showing 0 to 0 of 0 entries
        </small>

        <div className="d-flex gap-2">
          <button className="btn btn-light btn-sm text-muted">
            Previous
          </button>
          <button className="btn btn-light btn-sm text-muted">
            Next
          </button>
        </div>
      </div>
    </>
  )
}