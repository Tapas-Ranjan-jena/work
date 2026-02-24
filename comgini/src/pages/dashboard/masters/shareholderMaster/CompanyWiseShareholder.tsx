import { useNavigate } from "react-router-dom"

export default function CompanyWiseShareholder(){

  const navigate = useNavigate()

  return(
    <div className="container-fluid">

      <div className="card p-3">

        {/* ================= BREADCRUMB (TOP WITH UNDERLINE) ================= */}
        <small className="text-muted d-block border-bottom pb-2 mb-3">
          <span className="text" style={{cursor:"pointer"}}>
            Home
          </span>
          {" / "}
          <span className="text" style={{cursor:"pointer"}}>
            Shareholder list
          </span>
          {" / "}
          Company wise shareholder list
        </small>

        {/* ================= HEADER ROW ================= */}
        <div className="d-flex justify-content-between align-items-center mb-2">

          <h6 className="m-0">
            Company wise shareholder list
          </h6>

          <button
            onClick={()=>navigate("/masters/shareholder")}
            className="btn btn-sm"
            style={{background:"#2E388E",color:"#fff"}}
          >
            <i className="bi bi-arrow-left me-1"></i>
            Back
          </button>

        </div>

        {/* ================= ACTION BAR ================= */}
        <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">

          <div className="d-flex gap-2">
            <button className="btn btn-light btn-sm">
              Show 10 rows
            </button>
            <button className="btn btn-light btn-sm">
              Excel
            </button>
          </div>

          {/* SEARCH WITH ICON */}
          <div style={{position:"relative"}}>
            <i
              className="bi bi-search"
              style={{
                position:"absolute",
                left:"10px",
                top:"50%",
                transform:"translateY(-50%)",
                fontSize:"13px",
                color:"#888",
                pointerEvents:"none"
              }}
            />
            <input
              className="form-control form-control-sm"
              placeholder="Search"
              style={{width:"180px",paddingLeft:"28px"}}
            />
          </div>

        </div>

        {/* ================= TABLE ================= */}
        <div style={{overflowX:"auto"}}>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Company Name</th>
                <th>Shareholder's Number</th>
                <th>PAN</th>
                <th>Father's Name</th>
                <th>Type of shares</th>
                <th>Folio no./DP ID</th>
                <th>No of shares</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan={8} className="text-center">
                  No data available in table
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ================= FOOTER ================= */}
        <div className="d-flex justify-content-between align-items-center mt-2">

          <small>Showing 0 to 0 of 0 entries</small>

          <div className="d-flex gap-2">
            <button className="btn btn-light btn-sm">Previous</button>
            <button className="btn btn-light btn-sm">Next</button>
          </div>

        </div>

      </div>
    </div>
  )
}